import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/range';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/audit';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/mergeScan';
import 'rxjs/add/operator/multicast';

import { Set, fromJS } from 'immutable';

import { buttonForTest, inputForTest, simpleObserver } from './helper';

export function mapAsScan(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let numbers = Observable.range(1, 3);

    let doubleAsMap = numbers.map((value) => value * 2);

    let doubleAsScan = numbers.scan((ignore, value) => value * 2, undefined);

    doubleAsMap.subscribe(simpleObserver<number>('map'));
    doubleAsScan.subscribe(simpleObserver<number>('scan'));
}

export function bufferAsScan1(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let generator = Observable.interval(500);
    let clicks = Observable.fromEvent(buttonForTest('flush', placeholder), 'click');

    let asBuffer = generator.buffer(clicks)

    interface State<T> {
        nextflush: boolean;
        storage: T[];
    }

    let asScan = Observable.merge<number, 'flush'>(generator, clicks.mapTo('flush'))
        .scan((state:State<number>, value) => {
            if (state.nextflush) {
                state.storage = [];
                state.nextflush = false;
            }

            if (value === 'flush') {
                state.nextflush = true;
            }
            else {
                state.storage.push(value)
            }
            return state;
        }, {nextflush:false, storage:[]})
        .mergeMap((state) => {
            return state.nextflush ? Observable.of(state.storage) : Observable.empty();
        });

    asBuffer.subscribe(simpleObserver<number[]>('buffer'));
    asScan.subscribe(simpleObserver<number[]>('scan'));
}

export function bufferAsScan2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let generator = Observable.interval(500);
    let clicks = Observable.fromEvent(buttonForTest('flush', placeholder), 'click');
    
    let asBuffer = generator.buffer(clicks)

    interface State<T> {
        nextflush: boolean;
        storage: T[];
    }

    let asScan = Observable
        .merge (
            generator.map((value) => (state: State<number>) => { state.storage.push(value) }),
            clicks.map((value) => (state: State<number>) => { state.nextflush = true })
        )
        .scan((state: State<number>, changeFn) => {
            if (state.nextflush) {
                state.storage = [];
                state.nextflush = false;
            }

            changeFn(state);

            return state;
        }, { nextflush: false, storage: [] })
        .mergeMap((state) => {
            return state.nextflush ? Observable.of(state.storage) : Observable.empty();
        });

    asBuffer.subscribe(simpleObserver<number[]>('buffer'));
    asScan.subscribe(simpleObserver<number[]>('scan'));
}

export function auditAsScan(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let generator = Observable.interval(500);
    let clicks = Observable.fromEvent(buttonForTest('sampleing latest', placeholder), 'click');

    let asAudit = generator.audit((value) => clicks);

    interface State<T> {
        nextflush: boolean;
        last: T;
    }

    let asScan1 = Observable.merge<number, 'sample'>(generator, clicks.mapTo('sample'))
        .scan((state:State<number>, value) => {
            if (state.nextflush) {
                state.nextflush = false;
                state.last = null;
            }

            if (value === 'sample') {
                state.nextflush = true;
            }
            else {
                state.last = value
            }
            return state;
        }, {nextflush:false, last:null})
        .mergeMap((state) => {
            return state.nextflush && state.last !== null ? Observable.of(state.last) : Observable.empty();
        });

    let selector = generator.mergeMap((value => {
        return clicks.mapTo('sample');
    }));

    let asScan2 = Observable.merge<number, 'sample'>(generator, selector)
        .scan((state:State<number>, value) => {
            if (state.nextflush) {
                state.nextflush = false;
                state.last = null;
            }

            if (value === 'sample') {
                state.nextflush = true;
            }
            else {
                state.last = value
            }
            return state;
        }, {nextflush:false, last:null})
        .mergeMap((state) => {
            return state.nextflush && state.last !== null ? Observable.of(state.last) : Observable.empty();
        });


    asAudit.subscribe(simpleObserver<number>('audit'));
    asScan1.subscribe(simpleObserver<number>('scan1'));
    asScan2.subscribe(simpleObserver<number>('scan2'));
}

export function countAsScan(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let generator = Observable.interval(500).take(3);

    let asCount = generator.count();

    interface State {
        count: number;
        isLast: boolean;
    }

    let asScan = generator
        .materialize()
        .scan((state:State, value) => {
            if (value.kind === 'C')
                state.isLast = true;
            else if (value.kind === 'N')
                state.count += 1;

            return state;
        }, { count: 0, isLast: false })
        .mergeMap((state) => {
            return state.isLast ? Observable.of(state.count) : Observable.empty();
        });

    asCount.subscribe(simpleObserver<number>('count'));
    asScan.subscribe(simpleObserver<number>('scan'));
}

export function filterAsScan(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let generator = Observable.interval(200).take(10);

    let asFilter = generator.filter(value => value % 2 == 0 ? true : false)

    let asScan = generator.mergeScan((ignore, value) => {
        return value % 2 == 0 ? Observable.of(value) : Observable.empty();
    }, null)

    asFilter.subscribe(simpleObserver('filter'));
    asScan.subscribe(simpleObserver('scan'));
}

export function distinctAsScan(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let generator = Observable.interval(100)
        .map((ignore) => Math.floor(Math.random() * 10))
        // .do((value) => console.log(`gen: ${value}`))
        .take(20)
        .multicast<number>(new Subject()).refCount();

    let asDistinct = generator.distinct();

    interface State<T> {
        isNew: boolean;
        newValue: T;
        storage: Set<T>;
    }

    let asScan = generator
        .scan((state: State<number>, value) => {
            if (state.isNew) {
                state.isNew = false;
                state.newValue = undefined;
            }

            let immutableValue = fromJS(value);

            if (!state.storage.has(immutableValue)) {
                state.storage = state.storage.add(immutableValue);
                state.newValue = value;
                state.isNew = true;
            }

            return state;
        }, { isNew: false, newValue: undefined, storage: Set<number>() })
        .mergeMap((state) => state.isNew ? Observable.of(state.newValue) : Observable.empty());

    asDistinct.subscribe(simpleObserver('distinct'));
    asScan.subscribe(simpleObserver('scan'));
}