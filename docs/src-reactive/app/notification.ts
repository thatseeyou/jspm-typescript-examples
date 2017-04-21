import { Notification } from 'rxjs/Notification';
import { Observable } from 'rxjs/Observable';

import { simpleObserver } from './helper';

export function testNotification1() {
    let next = Notification.createNext(10);
    let complete = Notification.createComplete();

    // no complete
    let observer = simpleObserver('observe');
    next.observe(observer);
    complete.observe(observer);

    let ten = next.toObservable();
    ten.subscribe(simpleObserver('toObservable'));
}