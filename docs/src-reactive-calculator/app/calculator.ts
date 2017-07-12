import '../css/calculator.css!css';
import * as Decimal from 'decimal.js';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/timer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/timeoutWith';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/operator/timestamp';

import { numberWithCommas } from './utility';

function simpleObserver<T>(prefix: string):Observer<T> {
    return {
        next: (value) => {
            console.log(`${prefix}: NEXT:`)
            console.log(value)
        },
        error: (err) => {
            console.log(`${prefix}: ERROR:`)
            console.log(err)
        },
        complete: () => console.log(`${prefix}: Completed`)
    }
}

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
    [KeyType.Clear,    KeyValue.C,         'AC'],
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
    private clearButtonEl: HTMLButtonElement;

    private buttonsObservable: Observable<[KeyType, KeyValue]>;
    private operandObservable: Observable<string>;

    private readonly timeout = 5000;

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
        this.clearButtonEl = this.container.querySelector('button') as HTMLButtonElement;
    }
    private initObservables() {
        this.initButtonsObservable();
        this.initOperandObservable();
    }

    private initButtonsObservable() {
        let buttonObservables = buttonsConfig.map(([keyType, keyValue, _], index) => {
            let button = this.container.querySelectorAll('.calc-button')[index];
            return Observable.fromEvent<MouseEvent>(button, 'click').mapTo([keyType, keyValue] as [KeyType, KeyValue]);
        });
        let buttonsOb = Observable.merge(buttonObservables).mergeAll();

        this.buttonsObservable = buttonsOb
            // send C button event twice when timeout
            // .mergeMap(([keyType, keyValue]) => {
            //     let fired = Observable.of([keyType, keyValue]);
            //     let timeout = Observable
            //         .timer(1000)
            //         .takeUntil(buttonsOb)
            //         .mergeMapTo( Observable.of([KeyType.Clear, KeyValue.C]).repeat(2) )

            //     return Observable.merge(fired, timeout);
            // })
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
            propagate: boolean;
        }

        let resetFnOb = this.buttonsObservable
            .filter(([keyType, _]) => (keyType == KeyType.Operator || keyType == KeyType.Enter) ? true : false)
            .mapTo((state: OperandState) => {
                state.inputMode = InputMode.Decimal;
                state.valueString = '0';
                state.propagate = false;
                return state;
            });

        let clearFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue == KeyValue.C) ? true : false)
            .mapTo((state: OperandState) => {
                state.inputMode = InputMode.Decimal;
                state.valueString = '0';
                state.propagate = true;
                return state;
            })

        let percentFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue == KeyValue.Percent) ? true : false)
            .mapTo((state: OperandState):OperandState => {
                state.inputMode = InputMode.Percent;
                state.valueString = new Decimal(state.valueString).div(100).valueOf();
                state.propagate = true;
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
                state.propagate = true;
                return state;
            })

        let signFnOb = this.buttonsObservable
            .filter(([_, keyValue]) => (keyValue == KeyValue.PlusMinus) ? true : false)
            .mapTo((state: OperandState) => {
                let isPlus = state.valueString[0] != '-';
                state.valueString = isPlus ? '-' + state.valueString : state.valueString.slice(1);
                state.propagate = true;
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

                    state.propagate = true;
                    return state;
                };
            })
        
        this.operandObservable = Observable
            .merge(resetFnOb, percentFnOb, clearFnOb, pointFnOb, signFnOb, numberFnOb)
            .mergeMap(changeFn => {
                let source = Observable.of(changeFn);
                let timeout = Observable
                    .timer(this.timeout)
                    .mapTo((state: OperandState) => {
                        state.inputMode = InputMode.Decimal;
                        state.valueString = '0';
                        state.propagate = false;
                        return state;
                    })
                    .do(value => console.log('timeout => C'))
                    .takeUntil(this.buttonsObservable);

                return Observable.merge(source, timeout);
            })
            .scan((state, changeFn) => {
                let newState = changeFn(state);
                return newState;
            }, {
                inputMode: InputMode.Decimal,
                isMinus: false,
                valueString: '0',
                propagate: true
            })
            .do(state => {
                this.updateClearButtonText(state.valueString == '0' || state.valueString == '-0' ? 'AC' : 'C');
            })
            .mergeMap(state => {
                return state.propagate ? Observable.of(state.valueString) : Observable.empty();
            })
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
            skipOperand: boolean;
        }

        let operand = this.operandObservable
            .map(operand => (state:CalculatorState) => {
                console.log(`---- operand : ${operand}`);
                if (state.skipOperand) {
                    state.skipOperand = false;
                    return state;
                }
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

        let clear = this.buttonsObservable
            .filter(([keyType, _]) => (keyType == KeyType.Clear) ? true : false)
            .map(([_, keyValue]) => (state:CalculatorState) => {
                console.log(`---- clear`);
                if ( (state.step == Step.WaitFirst || state.step == Step.ChangeFirst) && (state.first == '0' || state.first == '-0') || 
                     (state.step == Step.WaitSecond || state.step == Step.ChangeSecond) && (state.second == '0' || state.second == '-0')) {
                    state.first = '0';
                    state.second = '0'
                    state.step = Step.WaitFirst;
                    state.operator = KeyValue.Add;
                    state.skipOperand = true;
                }
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
            .merge(clear, enter, operator, operand)
            .mergeMap(changeFn => {
                let source = Observable.of(changeFn);
                let timeout = Observable
                    .timer(this.timeout)
                    .mapTo((state: CalculatorState) => {
                        state.first = '0';
                        state.second = '0'
                        state.step = Step.WaitFirst;
                        state.operator = KeyValue.Add;
                        state.skipOperand = false;
                        return state;
                    })
                    .do(value => console.log('timeout => AC'))
                    .takeUntil(this.buttonsObservable);

                return Observable.merge(source, timeout);
            })
            .scan((state, changeFn) => {
                // console.log('\n>>>> BEFORE ');
                // console.log(state);
                let newState = changeFn(state);
                // console.log('<<<< AFTER ');
                // console.log(newState);
                return newState;
            }, {
                step: Step.WaitFirst,
                first: '0',
                second: '0',
                operator: KeyValue.Add,
                skipOperand: false
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

    private updateClearButtonText(value: string) {
        this.clearButtonEl.innerText = value;
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
