import { Observable } from 'rxjs/Observable';
import { Observer, PartialObserver } from 'rxjs/Observer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/mergeMap'; // flatMap
import 'rxjs/add/operator/concatMap'; 
import 'rxjs/add/operator/merge'; 
// import 'rxjs/add/observable/return';

import { buttonForTest, inputForTest } from './helper';

export function testPluck() {
    Observable.from([
        { name: { first: 'jaein', last: 'moon' }},
        { name: { first: 'cheolsu', last: 'ahn' }},
        { name: { first: 'sangjeong', last: 'shim' }},
    ])
        .pluck('name', 'first')
        .subscribe(value => console.log(`${value}`));
}

export function testMergeMap() {
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

export function testConcatMap() {
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

    key1.merge(key2, key3)
        .scan((sum, current) => sum * 10 + current, 0)
        .subscribe((value) => console.log(`Digit: ${value}`));
}