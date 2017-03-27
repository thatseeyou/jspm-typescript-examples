/// <reference types="codemirror/codemirror-matchbrackets" />
import '../css/codemirror.css!css';

import domready = require('domready');
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';

domready(() => {
    let myCodeMirror = CodeMirror.fromTextArea(document.getElementsByTagName('textarea')[0], {
        lineNumbers: true,
        mode: "text/typescript",
        tabSize: 2,
        indentWithTabs: false,
        matchBrackets: true
    });
});



