import { Observable } from 'rxjs/Observable';
import { Observer, PartialObserver } from 'rxjs/Observer';
import 'rxjs/add/observable/from';

export function testFrom() {
    // case 1
    function f(...args: number[]) {
        return Observable.from<number>(args);
    }

    f(1, 2, 3).subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ' + err); },
        function () { console.log('Completed'); }
    );

    // case 2
    Observable.from(['a', 'b', 'c']).subscribe(
        (x) => { console.log('Next: ' + x); },
        (err) => { console.log('Error: ' + err); },
        () => { console.log('Completed'); }
    );
}
