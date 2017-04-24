import domready = require('domready');
import 'screenlog';

import { Calculator } from './calculator';

domready(() => {
    screenLog.init({ autoScroll: true });

    let container = document.createElement('div');
    document.body.appendChild(container);

    let calculator = new Calculator(container);
});
