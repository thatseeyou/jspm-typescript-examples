import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as t from './tests';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},
    {text: 'Selection.html()', action: t.testHtml},
    {text: 'Selection.style()', action: t.testStyle},
    {text: 'Selection.node()', action: t.testNode},
    {text: 'Selection.append()', action: t.testAppend},
    {text: 'Selection.insert()', action: t.testInsert},
    {text: 'Prepend: insertBefore with select', action: t.testPrepend},
    {text: 'Selection.data()/enter()/exit()', action: t.testData},
    {text: 'Selection.datum()', action: t.testDatum}
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});
