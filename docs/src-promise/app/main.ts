import t1 = require('./cases');
import t2 = require('./emitter-observer');
import t3  = require('./eventlistener');

setTimeout(() => {
    console.log('---- test1 ----')
    t1();
}, 0);

setTimeout(() => {
    console.log('---- test2 ----')
    t2();
}, 2000);

t3();
