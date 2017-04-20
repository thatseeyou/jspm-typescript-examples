import { Observable } from 'rxjs/Observable';
import { Observer, PartialObserver } from 'rxjs/Observer';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/mergeMap'; // flatMap
import 'rxjs/add/operator/concatMap'; 
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
// import 'rxjs/add/observable/return';

import { buttonForTest, inputForTest } from './helper';

export function testPluck(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    Observable.from([
        { name: { first: 'jaein', last: 'moon' }},
        { name: { first: 'cheolsu', last: 'ahn' }},
        { name: { first: 'sangjeong', last: 'shim' }},
    ])
        .pluck('name', 'first')
        .subscribe(value => console.log(`${value}`));
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
        .map(() => 1);

    let key2Button = buttonForTest('2', placeholder);
    let key2 = Observable.fromEvent<MouseEvent>(key2Button, 'click')
        .map(() => 2);

    let key3Button = buttonForTest('3', placeholder);
    let key3 = Observable.fromEvent<MouseEvent>(key3Button, 'click')
        .map(() => 3);

    key1.merge(key2, key3)
        .scan((sum, current) => sum * 10 + current, 0)
        .subscribe((value) => console.log(`Digit: ${value}`));
}

export function testBuffer(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('emit when down', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown');

    Observable.interval(200)
        .buffer(down)
        .subscribe((value) => console.log(value));
}

export function testBufferWhen(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('emit when down', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown');

    Observable.interval(200)
        .bufferWhen(() => down)
        .subscribe((value) => console.log(value));
}

export function testBufferToggle(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('from mousedown to mouseup', placeholder);
    let down = Observable.fromEvent<MouseEvent>(button, 'mousedown');
    let up = Observable.fromEvent<MouseEvent>(button, 'mouseup');

    Observable.interval(200)
        .bufferToggle(down, () => up)
        .subscribe((value) => console.log(value));
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

    even.subscribe((value) => console.log(`even: ${value}`));
    odd.subscribe((value) => console.log(`odd: ${value}`));
}
