import { buttonForTest, inputForTest, simpleObserver } from './helper';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { Observer, PartialObserver } from 'rxjs/Observer';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/defer';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/mergeMap'; // flatMap
import 'rxjs/add/operator/mergeMapTo'; 
import 'rxjs/add/operator/concatMap'; 
import 'rxjs/add/operator/concatMapTo'; 
import 'rxjs/add/operator/merge'; 
import 'rxjs/add/operator/buffer'; 
import 'rxjs/add/operator/bufferCount'; 
import 'rxjs/add/operator/bufferWhen'; 
import 'rxjs/add/operator/bufferToggle'; 
import 'rxjs/add/operator/pairwise'; 
import 'rxjs/add/operator/take'; 
import 'rxjs/add/operator/partition'; 
import 'rxjs/add/operator/mapTo'; 
import 'rxjs/add/operator/expand'; 
import 'rxjs/add/operator/combineLatest'; 
import 'rxjs/add/operator/withLatestFrom'; 
import 'rxjs/add/operator/audit'; 
import 'rxjs/add/operator/debounce'; 
import 'rxjs/add/operator/sample'; 
import 'rxjs/add/operator/delayWhen';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/operator/repeatWhen';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/windowCount';
import 'rxjs/add/operator/windowWhen';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/isEmpty';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/single';
import 'rxjs/add/operator/race';
import 'rxjs/add/operator/timeoutWith';


export function testPluck(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    Observable.from([
        { name: { first: 'jaein', last: 'moon' }},
        { name: { first: 'cheolsu', last: 'ahn' }},
        { name: { first: 'sangjeong', last: 'shim' }},
    ])
        .pluck('name', 'first')
        .subscribe(simpleObserver('pluck'));
}

export function testMergeMap(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    Observable.interval(100)
        .timeInterval()
        .take(2)
        .map(mainInterval => mainInterval.value)
        .mergeMap(mainIndex => {
            return Observable.interval(1000)
                .timeInterval()
                .take(2)
                .map(subInterval => {
                    return {
                        main: mainIndex,
                        sub: subInterval.value
                    }
                });
        })
        .subscribe(indexGroup => console.log(`${indexGroup.main}/${indexGroup.sub}`));
}

export function testConcatMap(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    Observable.interval(100)
        .timeInterval()
        .take(2)
        .map(mainInterval => mainInterval.value)
        .concatMap(mainIndex => {
            return Observable.interval(1000)
                .timeInterval()
                .take(2)
                .map(subInterval => {
                    return {
                        main: mainIndex,
                        sub: subInterval.value
                    }
                });
        })
        .subscribe(indexGroup => console.log(`${indexGroup.main}/${indexGroup.sub}`));
}

export function testExpand(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('1,,,2,,,4,,,', placeholder);
    let clicks = Observable.fromEvent(button, 'click');
    let powersOfTwo = clicks
        .map<MouseEvent, [number, number]>((value, index) => [index, 1])
        .expand(([index, value]) => {
            console.log('expand called');
            return Observable.of([index, 2 * value]).filter(([index, value]) => value < 1024).delay(500);
        })
    powersOfTwo.subscribe(([index, value]) => console.log(`${index} - ${value}`));
}

export function testMerge(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let key1Button = buttonForTest('1', placeholder);
    let key1 = Observable.fromEvent<MouseEvent>(key1Button, 'click')
        .mapTo(1);

    let key2Button = buttonForTest('2', placeholder);
    let key2 = Observable.fromEvent<MouseEvent>(key2Button, 'click')
        .mapTo(2);

    let key3Button = buttonForTest('3', placeholder);
    let key3 = Observable.fromEvent<MouseEvent>(key3Button, 'click')
        .mapTo(3);

    // key1.merge<number, number>([key2, key3])
    key1.merge(key2, key3)
        .scan((sum, current) => sum * 10 + current, 0)
        .subscribe(simpleObserver('merge'));
}

export function testBuffer(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('emit when down', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown');

    Observable.interval(200)
        .buffer(down)
        .subscribe(simpleObserver('buffer'));
}

export function testBufferWhen(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('emit when down', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown');

    Observable.interval(200)
        .bufferWhen(() => down)
        .subscribe(simpleObserver('bufferWhen'));
}

export function testBufferToggle(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('from mousedown to mouseup', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown');
    let up = Observable.fromEvent<MouseEvent>(button, 'mouseup');

    Observable.interval(200)
        .bufferToggle(down, () => up)
        .subscribe(simpleObserver('bufferToggle'));
}

export function testPairwise(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let series = Observable.of(1,3,5,7,9);

    series.bufferCount(2, 1)
        .subscribe((value) => {
            console.log(`bufferCount(2,1): ${value[1]} - ${value[0]} = ${value[1] - value[0]}`);
        });

    series.pairwise()
        .subscribe((value) => {
            console.log(`pairwise:         ${value[1]} - ${value[0]} = ${value[1] - value[0]}`);
        });
}

export function testPartition(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('down to left, up to right', placeholder);

    let [even, odd] = Observable.interval(200)
        .take(10)
        .partition((value) => value % 2 == 0 ? true : false);

    even.subscribe(simpleObserver('even'));
    odd.subscribe(simpleObserver('odd'));
}

export function testCombineLatest(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let input1 = inputForTest('left trigger', placeholder);
    let input2 = inputForTest('right trigger', placeholder);

    let inputOb1 = Observable.fromEvent<Event>(input1, 'input')
        .map((ev) => (ev.target as HTMLInputElement).value);
    let inputOb2 = Observable.fromEvent<Event>(input2, 'input')
        .map((ev) => (ev.target as HTMLInputElement).value);

    inputOb1.combineLatest(inputOb2, (left, right) => `${left} + ${right}`)
        .subscribe(simpleObserver('combineLates'));
}

export function testWithLatestFrom(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let input1 = inputForTest('left only trigger', placeholder);
    let input2 = inputForTest('right', placeholder);

    let inputOb1 = Observable.fromEvent<Event>(input1, 'input')
        .map((ev) => (ev.target as HTMLInputElement).value);
    let inputOb2 = Observable.fromEvent<Event>(input2, 'input')
        .map((ev) => (ev.target as HTMLInputElement).value);

    inputOb1.withLatestFrom(inputOb2, (left, right) => `${left} + ${right}`)
        .subscribe((value) => console.log(value));
}

export function testRace(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let input1 = inputForTest('left trigger', placeholder);
    let input2 = inputForTest('right trigger', placeholder);

    let inputOb1 = Observable.fromEvent<Event>(input1, 'input')
        .do((ev) => { console.log('input1 to map'); })
        .map((ev) => (ev.target as HTMLInputElement).value);
    let inputOb2 = Observable.fromEvent<Event>(input2, 'input')
        .do((ev) => { console.log('input2 to map'); })
        .map((ev) => (ev.target as HTMLInputElement).value);

    inputOb1.race(inputOb2)
        .subscribe(simpleObserver('winner takes all'));
}

export function testDebounce(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('emit last value', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown'); //.take(3);

    Observable.interval(1000)
        .debounce((value) => {
            console.log('debounce called');
            return down
        })
        .subscribe(simpleObserver('debounce'));

    Observable.interval(1000)
        .audit((value) => {
            console.log('new audit called');
            return down;
        })
        .subscribe(simpleObserver('audit'));

    Observable.interval(1000)
        .sample(down)
        .subscribe(simpleObserver('sample'));

    // main time line completed by down completition
    Observable.interval(1000)
        .buffer(down)
        .concatMap((numbers) => {
            return numbers.length > 0 ? Observable.of(numbers[numbers.length - 1]) : Observable.empty();
        })
        .subscribe(simpleObserver('buffer and last'));
}

export function testDelayWhen(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('emit when down', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown');

    let delayedClicks = down
        .delayWhen(event => {
            console.log('duration selector called');
            //return Observable.interval(1000); // first event only is used
            return Observable.timer(1000);  
        });

    delayedClicks.subscribe(simpleObserver('delayWhen'));
}

export function testDistinct(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    Observable.of(1,2,1,2,1,2)
    .distinct()
    .subscribe(simpleObserver('distinct'));
}

export function testRepeat(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.defer(() => {
        let delay = Math.floor(Math.random() * 400 + 100);
        console.log(`defer called: delay = ${delay}`);
        return Observable.interval(delay).take(3);
    });
    
    source
        .repeat(3)
        .subscribe(simpleObserver('repeat'));
}

export function testRepeatWhen1(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('resubscribe after source completed', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown').take(3);

    let source = Observable.defer(() => {
        let delay = Math.floor(Math.random() * 400 + 100);
        console.log(`defer called: delay = ${delay}`);
        return Observable.interval(delay).take(3);
    });
    
    source
        .repeatWhen((notification) => {
            console.log('notification:');
            console.log(notification);
            return down;
        })
        .subscribe(simpleObserver('repeatWhen'));
}

export function testRepeatWhen2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('resubscribe after source completed', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown').take(3);

    let source = Observable.concat(
        Observable.interval(500).take(3),
        Observable.throw('throw')
    );
    
    source
        .repeatWhen((notification) => {
            console.log('notification:');
            console.log(notification);
            return down;
        })
        .subscribe(simpleObserver('repeatWhen'));
}

export function testWindow(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('new window', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown').take(3);

    let source = Observable.interval(300);

    let windowed = source
        .window(down)
        .mergeMap((value) => {
            console.log('new Window');
            return value;
        });
        // .mergeAll();

    windowed.subscribe(simpleObserver('window'));
}

export function testWindowWhen(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('new window', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown').take(3);

    let source = Observable.interval(300);

    let windowed = source
        .windowWhen(() => {
            console.log('when close?');
            return down.take(1);
            // return down
        })
        .mergeMap((value) => {
            console.log('new window');
            return value;
        });
        // .mergeAll();

    windowed.subscribe(simpleObserver('window'));
}


export function testWindowCount1(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.interval(300).take(10);

    let windowed = source
        .windowCount(5, 3)
        .do((value) => console.log('new window'))
        .mergeAll();
        // .mergeAll();

    windowed.subscribe(simpleObserver('window'));
}

export function testWindowCount2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.interval(300).take(10);

    let windowed = source
        .windowCount(3, 5)
        .do((value) => console.log('new window'))
        .mergeAll();
        // .mergeAll();

    windowed.subscribe(simpleObserver('window'));
}

export function testGroupBy(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.interval(300).take(10);

    let grouped = source
        .groupBy((value) => value % 3)
        .map((value) => {
            console.log(`new grourp key = ${value.key}`)
            return value.take(2).map((innerValue) => {
                return `${value.key} / ${innerValue}`;
            });
        })
        .mergeAll();
        // .mergeAll();

    grouped.subscribe(simpleObserver('groupBy'));
}


export function testIgnoreElements(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.interval(300).take(3);

    let end = source
        .do((value) => console.log(`interval[${value}]`))
        .ignoreElements()
        .isEmpty();

    end.subscribe(simpleObserver('isEmpty'));
}

export function testSingle(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button1 = buttonForTest('source', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button1, 'mousedown');

    let button2 = buttonForTest('complete', placeholder);
    let complete = Observable.fromEvent<MouseEvent>(button2, 'mousedown');

    let single = down
        .takeUntil(complete)
        .single()

    single.subscribe(simpleObserver('single'));
}

export function testTimeoutWith(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let timeout = Observable
        .of(100)
        .delay(2000)
        .timeoutWith(1000, Observable.of(42))
        .subscribe(simpleObserver('timeout'));
}

export function testRepeat2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button1 = buttonForTest('click', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button1, 'mousedown');

    let merge:any = down.mergeMap(key => {
        let keyOb = Observable.of(key);
        let timeout = Observable
            .timer(1000)
            .mergeMapTo(Observable.of(42).repeat(2))
            .takeUntil(down)

        return Observable.merge(keyOb, timeout);
    })

    merge.subscribe(simpleObserver('repeat2'));
}

