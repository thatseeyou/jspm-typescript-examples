import '../css/calculator.css!css';
import * as Decimal from 'decimal.js';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/zip';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/share';

import { numberWithCommas } from './utility';

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
const buttonsConfig: [KeyType, KeyValue, string][] = [
    [KeyType.Clear,    KeyValue.C,         'C'],
    [KeyType.Number,   KeyValue.PlusMinus, '±'],
    [KeyType.Number,   KeyValue.Percent,   '%'],
    [KeyType.Operator, KeyValue.Divide,    '÷'],

    [KeyType.Number,   KeyValue.Seven,     '7'],
    [KeyType.Number,   KeyValue.Eight,     '8'],
    [KeyType.Number,   KeyValue.Nine,      '9'],
    [KeyType.Operator, KeyValue.Multiply,  '×'],

    [KeyType.Number,   KeyValue.Four,      '4'],
    [KeyType.Number,   KeyValue.Five,      '5'],
    [KeyType.Number,   KeyValue.Six,       '6'],
    [KeyType.Operator, KeyValue.Subtract,  '-'],

    [KeyType.Number,   KeyValue.One,       '1'],
    [KeyType.Number,   KeyValue.Two,       '2'],
    [KeyType.Number,   KeyValue.Three,     '3'],
    [KeyType.Operator, KeyValue.Add,       '+'],

    [KeyType.Number,   KeyValue.Zero,      '0'],
    [KeyType.Number,   KeyValue.Point,     '.'],
    [KeyType.Enter,    KeyValue.Enter,     '=']
];

export class Calculator {
    private firstOperandEl: HTMLDivElement;
    private operatorEl: HTMLDivElement;
    private secondOperandEl: HTMLDivElement;
    private firstDisplayEl: HTMLDivElement;
    private secondDisplayEl: HTMLDivElement;

    private buttonsObservable: Observable<[KeyType, KeyValue]>;
    private operandObservable: Observable<string>;

    constructor(private container: HTMLElement) {
        this.render();
        this.initObservables();
        this.subscribe();
    }

    // 0, 1, ~ 9, ., C/AC, +, -, X, /, =
    private render() {
        let buttonsHTML = buttonsConfig.map((keypad) => {
            let [keytype, keyvalue, text] = keypad;
            let optionalClass = keyvalue === KeyValue.Zero ? ' calc-double' : '';
            return `<button class="calc-button${optionalClass}" >${text}</button>`;
        })
            .join('');

        this.container.innerHTML = `
            <div class="calc-container">
                    <div class="calc-display calc-active-display">
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
        this.firstDisplayEl = this.container.querySelectorAll('.calc-display').item(0) as HTMLDivElement;
        this.secondDisplayEl = this.container.querySelectorAll('.calc-display').item(1) as HTMLDivElement;;
    }
    private initObservables() {
        this.initButtonsObservable();
        this.initOperandObservable();
        // this.initStepObservable();
    }

    private initButtonsObservable() {
        let buttonsOb = Observable.from(this.container.querySelectorAll('.calc-button'));
        let buttonsConfigOb = Observable.from(buttonsConfig);

        this.buttonsObservable = Observable
            .zip(buttonsOb, buttonsConfigOb, (button, [keyType, keyValue, _]) => {
                return Observable.fromEvent<MouseEvent>(button, 'click')
                    .mapTo([keyType, keyValue]);
            })
            .mergeAll()
            .share()
    }

    private initOperandObservable() {
        const enum InputMode {
            Decimal,
            Percent,
            Point
        }
        interface OperandState {
            inputMode: InputMode;
            isMinus: boolean;
            valueString: string;
            byReset: boolean;
        }

        let resetFnOb = this.buttonsObservable
            .filter(([keyType, _]) => (keyType == KeyType.Operator || keyType == KeyType.Enter) ? true : false)
            .mapTo((state: OperandState) => {
                state.inputMode = InputMode.Decimal;
                state.valueString = '0';
                state.byReset = true;
                return state;
            });

        let clearFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue == KeyValue.C) ? true : false)
            .mapTo((state: OperandState) => {
                state.inputMode = InputMode.Decimal;
                state.valueString = '0';
                state.byReset = false;
                return state;
            });

        let percentFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue == KeyValue.Percent) ? true : false)
            .mapTo((state: OperandState):OperandState => {
                state.inputMode = InputMode.Percent;
                state.valueString = new Decimal(state.valueString).div(100).valueOf();
                state.byReset = false;
                return state;
            });

        let pointFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue == KeyValue.Point) ? true : false)
            .mapTo((state: OperandState) => {
                if (state.inputMode == InputMode.Decimal) {
                    state.inputMode = InputMode.Point;
                    state.valueString = state.valueString + '.';
                }
                else if (state.inputMode == InputMode.Percent) {
                    state.inputMode = InputMode.Point;
                    state.valueString = '0.';
                }
                else {
                    // ignore
                }
                state.byReset = false;
                return state;
            });

        let signFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue == KeyValue.PlusMinus) ? true : false)
            .mapTo((state: OperandState) => {
                let isPlus = state.valueString[0] != '-';
                state.valueString = isPlus ? '-' + state.valueString : state.valueString.slice(1);
                state.byReset = false;
                return state;
            });

        let numberFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue >= KeyValue.Zero && keyValue <= KeyValue.Nine) ? true : false)
            .map(([_, keyValue]) => {
                return (state:OperandState) => {
                    switch (state.inputMode) {
                        case InputMode.Decimal:
                            if (state.valueString == '0' || state.valueString == '-0')
                                state.valueString = state.valueString.slice(state.valueString.length - 0);
                        // pass through
                        case InputMode.Point:
                            state.valueString += keyValue.toString();
                        break;
                        
                        case InputMode.Percent:
                            state.valueString = keyValue.toString();
                            state.inputMode = InputMode.Decimal;
                        break;
                    }

                    state.byReset = false;
                    return state;
                };
            });
        
        this.operandObservable = Observable
            .merge(resetFnOb, percentFnOb, clearFnOb, pointFnOb, signFnOb, numberFnOb)
            .scan((state, changeFn) => {
                let newState = changeFn(state);
                return newState;
            }, {
                inputMode: InputMode.Decimal,
                isMinus: false,
                valueString: '0',
                byReset: false
            })
            .mergeMap(state => {
                return state.byReset ? Observable.empty() : Observable.of(state.valueString);
            })
            // .publishReplay().refCount()
    }

    private subscribe() {
        //                      N            +         = 
        //  WaitFirst      ChangeFirst  WaitSecond     -
        //  ChangeFirst         -       WaitSecond  WaitFirst
        //  WaitSecond     ChangeSecond      -      WaitFirst
        //  ChangeSecond        -       WaitSecond  WaitFirst

        interface CalculatorState {
            step: Step
            first: string;
            second: string;
            operator: KeyValue;
        }

        let operand = this.operandObservable
            .map(operand => (state:CalculatorState) => {
                console.log(`---- operand : ${operand}`);
                switch (state.step) {
                    case Step.WaitFirst:
                        state.step = Step.ChangeFirst;
                        // path through
                    case Step.ChangeFirst:
                        state.first = operand;
                    break;

                    case Step.WaitSecond:
                        state.step = Step.ChangeSecond;
                        // path through
                    case Step.ChangeSecond:
                        state.second = operand;
                    break;
                }
                return state;
            })

        let enter = this.buttonsObservable
            .filter(([keyType, _]) => (keyType == KeyType.Enter) ? true : false)
            .map(([_, keyValue]) => (state:CalculatorState) => {
                console.log(`---- enter`);
                if (state.step == Step.WaitSecond)
                    state.second = state.first;

                state.first = this.decimalOperation(state.first, state.second, state.operator);
                state.step = Step.WaitFirst;
                return state;
            })


        let operator = this.buttonsObservable
            .filter(([keyType, _]) => (keyType == KeyType.Operator) ? true : false)
            .map(([_, keyValue]) => (state:CalculatorState) => {
                console.log(`---- operator ${keyValue}`);
                if (state.step == Step.ChangeSecond)
                    state.first = this.decimalOperation(state.first, state.second, keyValue);

                state.step = Step.WaitSecond;
                state.operator = keyValue;
                return state;
            })

        Observable
            .merge(enter, operator, operand)
            .scan((state, changeFn) => {
                console.log('\n>>>> BEFORE ');
                console.log(state);
                let newState = changeFn(state);
                console.log('<<<< AFTER ');
                console.log(newState);
                return newState;
            }, {
                step: Step.WaitFirst,
                first: '0',
                second: '0',
                operator: KeyValue.Add
            })
            .startWith({
                step: Step.WaitFirst,
                first: '0',
                second: '0',
                operator: KeyValue.Add
            })
            .subscribe((state:CalculatorState) => {
                this.changeActiveDisplay(state.step == Step.WaitFirst || state.step == Step.ChangeFirst ? true : false)
                this.updateFirstOperand(state.first);
                this.updateOperator(state.operator == KeyValue.Add ? '+' : 
                    state.operator == KeyValue.Subtract ? '-' : 
                    state.operator == KeyValue.Multiply ? '×' : 
                    '÷');
                this.updateSecondOperand(state.second);
            });
    }

    private updateFirstOperand(value: string) {
        this.firstOperandEl.innerText = numberWithCommas(value);
    }

    private updateOperator(value: string) {
        this.operatorEl.innerText = value;
    }

    private updateSecondOperand(value: string) {
        this.secondOperandEl.innerText = numberWithCommas(value);
    }

    private changeActiveDisplay(isFirst: boolean) {
        if (isFirst) {
            this.firstDisplayEl.classList.add('calc-active-display');
            this.secondDisplayEl.classList.remove('calc-active-display');
        }
        else {
            this.secondDisplayEl.classList.add('calc-active-display');
            this.firstDisplayEl.classList.remove('calc-active-display');
        }
    }
    
    private decimalOperation(first:string, second:string, operator:KeyValue)
    {
        let result:string;

        switch (operator) {
            case KeyValue.Add:
                result = new Decimal(first).plus(second).valueOf();
            break;

            case KeyValue.Subtract:
                result = new Decimal(first).minus(second).valueOf();
            break;

            case KeyValue.Multiply:
                result = new Decimal(first).times(second).valueOf();
            break;

            case KeyValue.Divide:
                result = new Decimal(first).dividedBy(second).valueOf();
            break;

            default:
                console.log('ERROR: unexpected operator');
            break;
        }

        return result;
    }
}



