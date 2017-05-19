import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as playground from './playground';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},

    {text: 'playground: stringType', action: playground.stringType},
    {text: 'playground: stringType2', action: playground.stringType2},
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
