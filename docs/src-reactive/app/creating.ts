// alternative import method
// import * as Rx from 'rxjs';
// Rx.Observable.from(args);

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

export function testFrom1() {
    function f(...args:any[]) {
        return Observable.from(args);
    }

    f(1, 2, 3).subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ' + err); },
        function () { console.log('Completed'); });

    Observable.from(['a','b','c']).subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ' + err); },
        function () { console.log('Completed'); });
}
