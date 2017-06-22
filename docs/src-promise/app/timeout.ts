export function test1() {
    setTimeout(() => {
        console.log('1');
        setTimeout(() => {
            console.log('2');
            setTimeout(() => {
                console.log('3');

            }, 1000);
        }, 1000);
    }, 1000);
}

export function test2() {
    function makePromise(delay: number, msg: string) {
        let p = new Promise<number>(function(resolve, reject) {
            window.setTimeout(() => { console.log(msg); resolve(delay) }, delay);
        });
        return p;
    }

    makePromise(1000, '1')
    .then(value => makePromise(5000, '2'))
    .then(value => makePromise(1000, '3'));
}

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/concatMap';

export function test3() {

    Observable
        .of(1000, 1000, 1000)
        .concatMap(delay => Observable.of(delay).delay(delay))
        .subscribe(value => {
            console.log(value);
        });

    // Observable.concat(
    //     Observable.timer(1000).mapTo(1),
    //     Observable.of(2).delay(1000),
    //     Observable.of(3).delay(1000)
    // )
    // .subscribe(value => {
    //     console.log(value);
    // })
}