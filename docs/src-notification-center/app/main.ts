import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as notification from './tests';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'add observers', action: notification.addObservers},
    {text: 'post string ', action: notification.postString},
    {text: 'post object', action: notification.postObject},
    {text: 'remove all observers', action: notification.removeObservers}
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
