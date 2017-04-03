// alternative import method
// import * as Rx from 'rxjs';
// Rx.Observable.from(args);

import { Observable } from 'rxjs/Observable';
import { Observer, PartialObserver } from 'rxjs/Observer';
import 'rxjs/add/observable/from';

export function testCreate1() {
    /* Using a function */
    var source: Observable<number> = Observable.create(function (observer: PartialObserver<number>) {
        observer.next(42);
        observer.complete();

        // Note that this is optional, you do not have to return this if you require no cleanup
        return () => { console.log('disposed'); };
    });

    var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ' + err); },
        function () { console.log('Completed'); }
    );
}

export function testFrom1() {
    function f(...args: any[]) {
        return Observable.from(args);
    }

    (f(1, 2, 3) as Observable<number>).subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ' + err); },
        function () { console.log('Completed'); }
    );

    Observable.from(['a', 'b', 'c']).subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ' + err); },
        function () { console.log('Completed'); });
}
