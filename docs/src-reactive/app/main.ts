import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as creating from './creating';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'add/observable/from - 1', action: creating.testFrom1}
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
