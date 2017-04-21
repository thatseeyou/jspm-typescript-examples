import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as started from './gettingstarted';
import * as set from './set';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},

    {text: 'gettingstarted: Map', action: started.test1},
    {text: 'gettingstarted: Map.merge', action: started.test2},
    {text: 'gettingstarted: List', action: started.test3},
    {text: 'gettingstarted: back to raw', action: started.test4},
    {text: 'gettingstarted: nested', action: started.test5},

    {text: 'set: add', action: set.testAdd1},
    {text: 'set: add', action: set.testAdd2},
    {text: 'set: has', action: set.testHas},
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
