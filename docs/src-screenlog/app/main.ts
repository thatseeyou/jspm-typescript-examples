import domready = require('domready');
import 'screenlog';

// excerpt from https://github.com/chinchang/screenlog.js/blob/master/example.html 

domready(() => {
    screenLog.init({ autoScroll: false });
    screenLog.log('String: Hello world');
    screenLog.log('Numbers: ' + 124);
    screenLog.log(21, 'multiple arguments');
    screenLog.log('Arrays', [1, 2, 3]);
    screenLog.log('Objects', { a: 3 });
    console.log('console.log also gets logged.')
    var i = 10;
    function log() {
        console.log('Future log', Date.now());
        console.error('Future error', Date.now());
        console.warn('Future warn', Date.now());
        console.info('Future info', Date.now());
        if (--i) { setTimeout(log, 1000); }
    }
    log();
});


