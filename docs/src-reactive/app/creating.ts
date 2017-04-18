// alternative import method
// import * as Rx from 'rxjs';
// Rx.Observable.from(args);

import { Observable } from 'rxjs/Observable';
import { Observer, PartialObserver } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/merge';

import { buttonForTest, inputForTest } from './helper';

export function testCreate1() {
    /* Using a function */
    var source: Observable<number> = Observable.create(function (observer: PartialObserver<number>) {
        console.log(`2. > subscriber function called`)

        console.log(`3. > before next() called`)
        observer.next(42);
        console.log(`5. > after next() called`)

        console.log(`6. > before next() called`)
        observer.next(43);
        console.log(`8. > after next() called`)

        console.log(`9. > before complete() called`)
        observer.complete();
        console.log(`11. > after complete() called`)

        // Note that this is optional, you do not have to return this if you require no cleanup
        return () => { console.log('12. disposed'); };
    });

    console.log(`1. Start subscribe`);
    var subscription = source.subscribe(
        (x) => { console.log(`4(7). observer Next: ${x}`); },
        (err) => { console.log(`observer Error: ${err}`); },
        () => { console.log(`10. observer Completed`); }
    );

    console.log(`1. Start subscribe2`);
    let subscription2 = source.subscribe(
        (x) => { console.log(`4(7). observer2 Next: ${x}`); },
        (err) => { console.log(`observer2 Error: ${err}`); },
        () => { console.log(`10. observer2 Completed`); }
    );
}

export function testCreate2() {
    /* Using a function */
    var source: Observable<number> = Observable.create(function (observer: PartialObserver<number>) {
        let startCount = 42;
        console.log(`2. > subscriber function called`)

        console.log(`3. > before next() called`)
        observer.next(startCount++);
        console.log(`5. > after next() called`)

        setTimeout(() => {
            console.log(`6. > before next() called`)
            observer.next(startCount++);
            console.log(`8. > after next() called`)

            console.log(`9. > before complete() called`)
            observer.complete();
            console.log(`12. > after complete() called`)
        }, 1000)

        // Note that this is optional, you do not have to return this if you require no cleanup
        return () => { console.log('11. disposed'); };
    });

    console.log(`1. Start subscribe`);
    var subscription = source.subscribe(
        (x) => { console.log(`4(7). observer Next: ${x}`); },
        (err) => { console.log(`observer Error: ${err}`); },
        () => { console.log(`10. observer Completed`); }
    );

    console.log(`1. Start subscribe2`);
    let subscription2 = source.subscribe(
        (x) => { console.log(`4(7). observer2 Next: ${x}`); },
        (err) => { console.log(`observer2 Error: ${err}`); },
        () => { console.log(`10. observer2 Completed`); }
    );
}

export function testSubject1() {
    var myObservable = new Subject();
    myObservable.subscribe(value => console.log(value));
    myObservable.next('after subscribe');
}

export function testSubject2() {
    var myObservable = new Subject();
    myObservable.next('before subscribe');
    myObservable.subscribe(value => console.log(value));
}

export function testSubject3() {
    var myObservable = new Subject();
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
    myObservable.next('multiple subscribe');
}

export function testReplaySubject1() {
    var myObservable = new ReplaySubject();
    myObservable.next('before subscribe');
    myObservable.subscribe(value => console.log(value));
}

export function testReplaySubject2() {
    var myObservable = new ReplaySubject();
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.next('multiple subscribe');
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
}

export function testReplaySubject3() {
    var myObservable = new ReplaySubject();
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.next('multiple subscribe');
    myObservable.complete();
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
}

export function testReplaySubject4() {
    var myObservable = new ReplaySubject(2);
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.next('multiple subscribe 1');
    myObservable.next('multiple subscribe 2');
    myObservable.next('multiple subscribe 3');
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
}

export function testRange() {
    Observable.range(1, 3)
    .subscribe(number => console.log(`${number}`));
}

export function testZip() {
    // 1. make left, right button
    let [leftClickObservable, rightClickObservable] = ['left', 'right']
    .map(function(text) {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = text;
        buttonElement.style.height = '50px';
        
        // side effect
        document.body.appendChild(buttonElement);

        return Observable.fromEvent<MouseEvent>(buttonElement, 'click');
    });

    let zippedObservable = Observable.zip(leftClickObservable, rightClickObservable, function(leftClick, rightClick):[number, number] {
        let leftTime = leftClick.timeStamp;
        let rightTime = rightClick.timeStamp;

        console.log(`zip: ${leftTime - rightTime}`);

        return [ leftTime, rightTime ];
    });

    zippedObservable.subscribe((value) => {
        let [leftTime, rightTime] = value;

        console.log(`subscribe1: ${leftTime - rightTime}`);
    });

    zippedObservable.subscribe((value) => {
        let [leftTime, rightTime] = value;

        console.log(`subscribe2: ${leftTime - rightTime}`);
    });

    zippedObservable.forEach((value) => {
        let [leftTime, rightTime] = value;

        console.log(`forEach: ${leftTime - rightTime}`);
    });
}

export function testMerge() {
    let key1Button = buttonForTest('1');
    let key1 = Observable.fromEvent<MouseEvent>(key1Button, 'click')
        .map(() => 1);

    let key2Button = buttonForTest('2');
    let key2 = Observable.fromEvent<MouseEvent>(key2Button, 'click')
        .map(() => 2);

    let key3Button = buttonForTest('3');
    let key3 = Observable.fromEvent<MouseEvent>(key3Button, 'click')
        .map(() => 3);

    Observable.merge(key1, key2, key3)
        .scan((sum, current) => sum * 10 + current, 0)
        .subscribe((value) => console.log(`Digit: ${value}`));
}

