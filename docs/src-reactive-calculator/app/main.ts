import domready = require('domready');
import { Calculator } from './calculator';

domready(() => {
    let container = document.body.querySelector('#calculator') as HTMLElement;

    let calculator = new Calculator(container);
});
