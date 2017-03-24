import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as cases from './cases';
import t2 = require('./emitter-observer');
import t3  = require ('./eventlistener');

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'simple cases - 1', action: cases.test1},
    {text: 'simple cases - 2', action: cases.test2},
    {text: 'simple cases - 3', action: cases.test3},
    {text: 'emitter-observer', action: t2},
    {text: 'eventlistner to promise', action: t3}
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
