
// alternative import method
import * as Rx from 'rxjs';
// Rx.Observable.from(args);


import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/timestamp';

import { buttonForTest, inputForTest } from './helper';

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

export function testMulticast() {
    (() => {
        let button = buttonForTest('Observable(num of handler = 2')
        let buttonObservable = Observable.fromEvent(button, 'click').map((value) => {
            console.log('map Called');
            return value;
        });

        buttonObservable.subscribe((ev) => console.log(`click from Observable - 1`));
        buttonObservable.subscribe((ev) => console.log(`click from Observable - 2`));
    })();

    (() => {
        let button = buttonForTest('ConnectableObservable(num of handler = 1')
        let buttonObservable = Observable.fromEvent(button, 'click').map((value) => {
            console.log('map Called');
            return value;
        })
            .multicast(new Subject());

        buttonObservable.subscribe((ev) => console.log(`click from ConnectableObservable - 1`));
        buttonObservable.subscribe((ev) => console.log(`click from ConnectableObservable - 2`));

        buttonObservable.connect();
    })();
}
