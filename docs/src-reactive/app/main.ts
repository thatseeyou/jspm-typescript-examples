import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as creating from './creating';
import * as operator from './operator';
import * as learnrx from './learnrx';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'add/observable/create - 1', action: creating.testCreate1},
    {text: 'add/observable/from - 1', action: creating.testFrom1},
    {text: 'add/observable/zip - 1', action: operator.zip},
    {text: 'learnrx: ex5 - map', action: learnrx.ex5},
    {text: 'learnrx: ex8 - filter', action: learnrx.ex8},
    {text: 'learnrx: ex12 - concatAll', action: learnrx.ex12},
    {text: 'learnrx: ex14 - concatMap', action: learnrx.ex14},
    {text: 'learnrx: ex17 - reduce', action: learnrx.ex17},
    {text: 'learnrx: ex20 - reduce', action: learnrx.ex20},
    {text: 'learnrx: ex24 - zip', action: learnrx.ex24},
    {text: 'learnrx: ex29 - unsubscribe', action: learnrx.ex29},
    {text: 'learnrx: ex30 - take', action: learnrx.ex30},
    {text: 'learnrx: ex33 - takeUntil', action: learnrx.ex33},
    {text: 'learnrx: ex38 - throttle', action: learnrx.ex38},
    {text: 'learnrx: ex40 - distinctUntilChanged', action: learnrx.ex40},
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
