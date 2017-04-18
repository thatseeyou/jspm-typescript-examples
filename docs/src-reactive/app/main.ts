import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as creating from './creating';
import * as converting from './converting';
import * as operator from './operator';
import * as learnrx from './learnrx';
import * as playground from './playground';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},

    {text: 'converting: add/observable/from', action: converting.testFrom},
    {text: 'creating:   add/observable/create - 1', action: creating.testCreate1},
    {text: 'creating:   add/observable/create - 2', action: creating.testCreate2},
    {text: 'creating:   Subject - 1', action: creating.testSubject1},
    {text: 'creating:   Subject - 2', action: creating.testSubject2},
    {text: 'creating:   Subject - 3', action: creating.testSubject3},
    {text: 'creating:   ReplaySubject - 1', action: creating.testReplaySubject1},
    {text: 'creating:   ReplaySubject - 2', action: creating.testReplaySubject2},
    {text: 'creating:   ReplaySubject - 3', action: creating.testReplaySubject3},
    {text: 'creating:   ReplaySubject - 4', action: creating.testReplaySubject4},
    {text: 'creating:   Merge', action: creating.testMerge},
    {text: 'creating:   add/observable/range', action: creating.testRange},
    {text: 'creating:   add/observable/zip', action: creating.testZip},
    {text: 'operator:   add/operator/pluck', action: operator.testPluck},
    {text: 'operator:   add/operator/mergeMap', action: operator.testMergeMap},
    {text: 'operator:   add/operator/concatMap', action: operator.testConcatMap},
    {text: 'operator:   add/operator/merge', action: operator.testMerge},

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

    {text: 'playground: pluck and zip', action: playground.pluckAndZip},
    {text: 'playground: stateStore', action: playground.stateStore},
    {text: 'playground: immutableStore', action: playground.immutableStore},
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
