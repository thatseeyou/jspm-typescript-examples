import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as cases from './cases';
import t2 = require('./emitter-observer');
import * as t3 from './eventlistener';
import t4  = require ('./function2promise');

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'simple cases - 1', action: cases.test1},
    {text: 'simple cases - 2', action: cases.test2},
    {text: 'simple cases - 3', action: cases.test3},
    {text: 'emitter-observer', action: t2},
    {text: 'function to promise', action: t4},
    {text: 'eventlistener to one-time promise', action: t3.test1},
    {text: 'eventlistener to continuous promise', action: t3.test2},
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});