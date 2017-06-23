import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as t from './tests';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'basic', action: t.test1},
    {text: 'real sample', action: t.test2}
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});

