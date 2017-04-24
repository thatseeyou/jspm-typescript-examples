import '../css/calculator.css!css';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

//
//    1 + 1   + 1   +
// => 1 + 1 = + 1 = +
//    1 + 1 =    1 + 1 =
// => 1 + 1 = AC 1 + 1 =
//    1 + 1 = 3     = 4     =
// => 1 + 1 = 3 + 1 = 4 + 1 =

const enum KeyType {
    Number,   // Zero, ..., Nine, Point, PlusMinus, Percent
    Operator, // Add, Substract, Multiply, Divide
    Clear,    // C
    Enter     // Enter
}

const enum KeyValue {
    Zero = 0,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Point,
    PlusMinus,
    Percent,
    Add,
    Subtract,
    Multiply,
    Divide,
    C,
    Enter
}

const enum Step {
    WaitFirst,
    ChangeFirst,
    WaitSecond,
    ChangeSecond
}
// let keypad:[KeyType, KeyValue, string][]= [
const keyDescriptions: [KeyType, KeyValue, string][] = [
    [KeyType.Clear, KeyValue.C, 'AC'],
    [KeyType.Number, KeyValue.PlusMinus, '±'],
    [KeyType.Number, KeyValue.Percent, '%'],
    [KeyType.Operator, KeyValue.Add, '÷'],

    [KeyType.Number, KeyValue.Seven, '7'],
    [KeyType.Number, KeyValue.Eight, '8'],
    [KeyType.Number, KeyValue.Nine, '9'],
    [KeyType.Operator, KeyValue.Multiply, '×'],

    [KeyType.Number, KeyValue.Four, '4'],
    [KeyType.Number, KeyValue.Five, '5'],
    [KeyType.Number, KeyValue.Six, '6'],
    [KeyType.Operator, KeyValue.Subtract, '-'],

    [KeyType.Number, KeyValue.One, '1'],
    [KeyType.Number, KeyValue.Two, '2'],
    [KeyType.Number, KeyValue.Three, '3'],
    [KeyType.Operator, KeyValue.Add, '+'],

    [KeyType.Number, KeyValue.Zero, '0'],
    [KeyType.Number, KeyValue.Point, '.'],
    [KeyType.Enter, KeyValue.Enter, '=']
];

export class Calculator {
    private firstOperandEl: HTMLDivElement;
    private operatorEl: HTMLDivElement;
    private secondOperandEl: HTMLDivElement;

    private keyObservable: Observable<[KeyType, KeyValue]>;

    constructor(private container: HTMLElement) {
        this.render();
        this.makeObservables();
        this.subscribe();
    }

    // 0, 1, ~ 9, ., C/AC, +, -, X, /, =
    private render() {
        let buttonsHTML = keyDescriptions.map((keypad) => {
            let [keytype, keyvalue, text] = keypad;
            let optionalClass = keyvalue === KeyValue.Zero ? ' calc-double' : '';
            return `<button class="calc-button${optionalClass}" >${text}</button>`;
        })
            .join('');

        this.container.innerHTML = `
            <div class="calc-container">
                    <div class="calc-display">
                        <div class="calc-first">
                        </div>
                    </div>
                    <div class="calc-display">
                        <div class="calc-operator">
                        </div>
                        <div class="calc-second">
                        </div>
                    </div>
                    <div class="calc-keypad">
                        ${buttonsHTML}
                    </div>
            </div>
        `

        this.firstOperandEl = this.container.querySelector('.calc-first') as HTMLDivElement;
        this.operatorEl = this.container.querySelector('.calc-operator') as HTMLDivElement;
        this.secondOperandEl = this.container.querySelector('.calc-second') as HTMLDivElement;
    }
    private makeObservables() {
        let buttons = Observable.from(this.container.querySelectorAll('.calc-button'));
        let descs = Observable.from(keyDescriptions);

        this.keyObservable = Observable
            .zip(buttons, descs, (button, desc) => {
                return Observable.fromEvent<MouseEvent>(button, 'click')
                    .map((ev) => {
                        let keyType = desc[0];
                        let keyValue = desc[1];
                        return [keyType, keyValue];
                    });
            })
            .mergeAll();
    }

    private subscribe() {
        this.keyObservable
            .filter(([keyType, _]) => keyType == KeyType.Number ? true : false)
            .map(([_, keyValue]) => keyValue)
            .scan((number, keyValue) => {
                return number * 10 + keyValue;
            }, 0)
            .subscribe(number => {
                this.updateSecondOperand(`${number}`);
            });
    }

    private updateFirstOperand(value: string) {
        this.firstOperandEl.innerText = value;
    }

    private updateOperator(value: string) {
        this.operatorEl.innerText = value;
    }

    private updateSecondOperand(value: string) {
        this.secondOperandEl.innerText = value;
    }
}



