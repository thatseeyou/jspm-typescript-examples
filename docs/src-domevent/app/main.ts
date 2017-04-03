import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as t from './tests';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'click / mousedown / mousemove / mouseup', action: t.test1}
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
