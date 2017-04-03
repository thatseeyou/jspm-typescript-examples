import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

export function testInput() {
    var button = document.querySelector('button');
    Observable.fromEvent(button, 'click')
        // scan (reduce) to a stream of counts
        .scan<number>(count => count + 1, 0)
        // Set the count on an element each time it changes
        .subscribe(count => console.log(`count = ${count}`));
}

export function testMap() {
    let numbers = 
    Observable
    .of(1, 2, 3)
    .map((value) => {
        console.log(`map: ${value}`);
        return value * 2;
    });

    console.log(`--- before forEach`);

    numbers
    .forEach((value) => {
        console.log(`forEach: ${value}`);
    });

    console.log(`--- after forEach`);
}