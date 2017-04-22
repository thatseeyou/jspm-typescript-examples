
// alternative import method
import * as Rx from 'rxjs';
// Rx.Observable.from(args);


import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/timestamp';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';

import { buttonForTest, inputForTest, simpleObserver } from './helper';

export function testSubject1(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var myObservable = new Subject();
    myObservable.subscribe(value => console.log(value));
    myObservable.next('after subscribe');
}

export function testSubject2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var myObservable = new Subject();
    myObservable.next('before subscribe');
    myObservable.subscribe(value => console.log(value));
}

export function testSubject3(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var myObservable = new Subject();
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
    myObservable.next('multiple subscribe');
}

export function testReplaySubject1(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var myObservable = new ReplaySubject();
    myObservable.next('before subscribe');
    myObservable.subscribe(value => console.log(value));
}

export function testReplaySubject2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var myObservable = new ReplaySubject();
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.next('multiple subscribe');
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
}

export function testReplaySubject3(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var myObservable = new ReplaySubject();
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.next('multiple subscribe');
    myObservable.complete();
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
}

export function testReplaySubject4(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var myObservable = new ReplaySubject(2);
    myObservable.subscribe(value => console.log(`1: ${value}`));
    myObservable.next('multiple subscribe 1');
    myObservable.next('multiple subscribe 2');
    myObservable.next('multiple subscribe 3');
    myObservable.subscribe(value => console.log(`2: ${value}`));
    myObservable.subscribe(value => console.log(`3: ${value}`));
}

export function testMulticast(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    (() => {
        let button = buttonForTest('Observable(num of handler = 2)', placeholder)
        let buttonObservable = Observable.fromEvent(button, 'click')
            .do((value) => {
                console.log('do Called');
            });

        buttonObservable.subscribe(simpleObserver('click from Observable - 1'));
        buttonObservable.subscribe(simpleObserver('click from Observable - 2'));
    })();

    (() => {
        let button = buttonForTest('ConnectableObservable(num of handler = 1)', placeholder)
        let buttonObservable = Observable.fromEvent(button, 'click')
            .do((value) => {
                console.log('do Called');
            })
            .multicast(new Subject());

        buttonObservable.subscribe(simpleObserver('click from ConnectableObservable - 1'));
        buttonObservable.subscribe(simpleObserver('click from ConnectableObservable - 2'));

        buttonObservable.connect();
    })();
}

export function testMulticast2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('ConnectableObservable(num of handler = 1)', placeholder)
    let buttonObservable = Observable.fromEvent<MouseEvent>(button, 'click')
        .do((ev) => {
            console.log('do Called');
        })
        .multicast<MouseEvent>(new Subject());

    buttonObservable
        .map((ev) => {
            return (<HTMLButtonElement>ev.target).innerText;
        })
        .subscribe((value) => console.log(`[1] click from ${value}`));

    buttonObservable
        .map((ev) => (<HTMLButtonElement>ev.target).innerText)
        .subscribe((value) => console.log(`[2] click from ${value}`));

    buttonObservable.connect();
}

export function testMulticast3(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('ConnectableObservable(num of handler = 1)', placeholder)
    let buttonObservable = Observable.fromEvent<MouseEvent>(button, 'click')
        .do((ev) => {
            console.log('do Called');
        })
        .multicast<MouseEvent>(new Subject())
        .refCount();;

    buttonObservable
        .map((ev) => {
            return (<HTMLButtonElement>ev.target).innerText;
        })
        .subscribe((value) => console.log(`[1] click from ${value}`));

    buttonObservable
        .map((ev) => (<HTMLButtonElement>ev.target).innerText)
        .subscribe((value) => console.log(`[2] click from ${value}`));
}

export function testPublish(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('ConnectableObservable(num of handler = 1)', placeholder)
    let buttonObservable = Observable.fromEvent(button, 'click').take(2)
        .do((value) => {
            console.log('do Called');
        })
        .publish()
        .refCount();;

    buttonObservable.subscribe(simpleObserver('click from ConnectableObservable - 1'));
    buttonObservable.subscribe(simpleObserver('click from ConnectableObservable - 2'));
}
