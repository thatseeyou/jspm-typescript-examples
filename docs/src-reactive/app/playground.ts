import { Observable } from 'rxjs/Observable';
import { Map, fromJS } from 'immutable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';

import { buttonForTest, inputForTest } from './helper';

export function pluckAndZip() {
    let contacts = Observable.from([
        {
            name: {
                first: 'eunji',
                second: 'oh'
            },
            email: {
                home: 'eunji@home',
                work: 'eunji@work'
            }
        },
        {
            name: {
                first: 'rahee',
                second: 'kang'
            },
            email: {
                home: 'rahee@home',
                work: 'rahee@work'
            }
        }
    ]);

    let firsts = contacts.pluck('name', 'first');
    let homes = contacts.pluck('email', 'home');

    let merged = Observable.zip(firsts, homes, (first, home) => {
        return `${first} - ${home}'` 
    });

    merged.subscribe(value => console.log(`${value}`));
}

// excerpt from http://reactivex.io/rxjs/manual/tutorial.html
export function stateStore(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    interface State {
        count:number;
        inputValue: string;
        isSecond: boolean;
        //[key:string]: any;
    }
    
    let increaseButton = buttonForTest('increase', placeholder);
    let increase = Observable.fromEvent<MouseEvent>(increaseButton, 'click')
        // We map to a function that will change our state
        .map(() => (state: State) => Object.assign({}, state, { count: state.count + 1 }));

    let decreaseButton = buttonForTest('decrease', placeholder);
    let decrease = Observable.fromEvent<MouseEvent>(decreaseButton, 'click')
        // We map to a function that will change our state
        .map(() => (state: State) => Object.assign({}, state, { count: state.count - 1 }));

    let inputElement = inputForTest('input', placeholder);
    let input = Observable.fromEvent<KeyboardEvent>(inputElement, 'keyup')
        // Let us also map the keypress events to produce an inputValue state
        .map(event => {
            //console.log(`keyup ${event.key}`);
            return (state: State) => Object.assign({}, state, { inputValue: (event.target as HTMLInputElement).value})
        });

    // let state = increase.scan((state, changeFn) => changeFn(state), { count: 0 });

    // We merge the three state change producing observables
    let stateObservable = Observable.merge(
        [increase, decrease, input]
    )
        .mergeAll()
        .scan((state:State, changeFn) => changeFn(state), {
            count: 0,
            inputValue: '',
            isSecond: false
        });

    // We subscribe to state changes and update the DOM
    stateObservable.subscribe((state) => {
        console.log(`state1: ${state.count}, inputValue1: ${state.inputValue}`);

        if (state.count > 5 && state.isSecond === false) {
            console.log(`Start another subscribe`);
            stateObservable.subscribe((state) => {
                console.log(`state2: ${state.count}, inputValue2: ${state.inputValue}`);
            });
            // undesiable: change back state
            state.isSecond = true;
        }
    });
}

export function immutableStore(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    type State = Map<string, any>;

    // interface State {
    //     count:number;
    //     inputValue: string;
    //     isSecond: boolean;
    //     //[key:string]: any;
    // }
    
    let increaseButton = buttonForTest('increase', placeholder);
    let increase = Observable.fromEvent<MouseEvent>(increaseButton, 'click')
        // We map to a function that will change our state
        .map(event => (state: State) => state.update('count', value => value + 1));

    let decreaseButton = buttonForTest('decrease', placeholder);
    let decrease = Observable.fromEvent<MouseEvent>(decreaseButton, 'click')
        // We map to a function that will change our state
        .map(event => (state: State) => state.update('count', value => value - 1));

    let inputElement = inputForTest('input', placeholder);
    let input = Observable.fromEvent<KeyboardEvent>(inputElement, 'keyup')
        // Let us also map the keypress events to produce an inputValue state
        .map(event => (state: State) => state.update('inputValue', () => (event.target as HTMLInputElement).value));

    // let state = increase.scan((state, changeFn) => changeFn(state), { count: 0 });

    // We merge the three state change producing observables
    let stateObservable = Observable.merge(
        increase,
        decrease,
        input
    )
        .scan((state: State, changeFn) => {
            let newState = changeFn(state);
            if (newState.get('isSecond') === true && newState.get('fired') === false) {
                newState = newState.set('fired', true);
            }
            if (newState.get('count') > 5 && newState.get('isSecond') === false) {
                newState = newState.set('isSecond', true);
            }

            return newState;
        }, Map({
            count: 0,
            inputValue: '',
            isSecond: false,
            fired: false
        }));

    // We subscribe to state changes and update the DOM
    stateObservable.subscribe((state) => {
        console.log(`state1: ${state.get('count')}, inputValue1: ${state.get('inputValue')}`);

        if (state.get('isSecond') === true && state.get('fired') === false) {
            console.log(`Start another subscribe`);
            stateObservable.subscribe((state) => {
                console.log(`state2: ${state.get('count')}, inputValue2: ${state.get('inputValue')}`);
            });
        }
    });
}