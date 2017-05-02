import domready = require('domready');
import 'screenlog';
import { TestItem, makeTestButtons } from '../../libs/testbutton';

import * as Decimal from 'decimal.js';

const tests:TestItem[] = [
    {text: '---- clear log ----', action: screenLog.clear},

    {text: 'allowed type', action: allowedType},
    {text: 'binarya/hexa/octal', action: binaryRepresentation},
    {text: 'immutability', action: immutability},
    {text: 'chaning', action: chaining},
    {text: 'minus zero', action: minusZero},
    {text: 'from string', action: fromString},
];

domready(() => {
    screenLog.init({ autoScroll: true });

    makeTestButtons(tests);
});

function allowedType() {
    let x = new Decimal(123.4567)
    let y = new Decimal('123456.7e-3')
    let z = new Decimal(x)
    
    let result = x.equals(y) && y.equals(z) && x.equals(z)        // true
    console.log(result);
}

function binaryRepresentation() {
    let x = new Decimal('0xff.f');            // '255.9375'
    let y = new Decimal('0b10101100');        // '172'
    let z = x.plus(y);                        // '427.9375'

    console.log(z.toBinary());                // '0b110101011.1111'
    console.log(z.toBinary(13));              // '0b1.101010111111p+8'
}

function immutability() {
    console.log(0.3 - 0.1);                    // 0.19999999999999998
    let x = new Decimal(0.3)
    console.log(x.minus(0.1))                  // '0.2'
    console.log(x);                            // '0.3'
}

function chaining() {
    let x = new Decimal(100);
    let y = new Decimal(10);
    let z = new Decimal(3);

    console.log(x.squareRoot().dividedBy(y).toPower(3).equals(x.sqrt().div(y).pow(3)));         // true
    console.log(x.cmp(y.mod(z).neg()) == 1 && x.comparedTo(y.modulo(z).negated()) == 1);        // true
}

function minusZero() {
    let zero = new Decimal(0);
    let minusZero = new Decimal(-0);

    console.log(zero.toString());
    console.log(zero.valueOf());

    console.log(minusZero.toString());
    console.log(minusZero.valueOf());

    let negatedZero = zero.neg();
    console.log(negatedZero.toString());
    console.log(negatedZero.valueOf());
}

function fromString() {
    console.log(new Decimal('100100').valueOf());
    console.log(new Decimal('100,100').valueOf());
}
