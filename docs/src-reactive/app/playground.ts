import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Map, fromJS } from 'immutable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/empty';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/publishReplay';

import { simpleObserver, buttonForTest, inputForTest } from './helper';

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
        .map(() => (state: State):State => Object.assign({}, state, { count: state.count + 1 }));

    let decreaseButton = buttonForTest('decrease', placeholder);
    let decrease = Observable.fromEvent<MouseEvent>(decreaseButton, 'click')
        // We map to a function that will change our state
        .map(() => (state: State):State => Object.assign({}, state, { count: state.count - 1 }));

    let inputElement = inputForTest('input', placeholder);
    let input = Observable.fromEvent<KeyboardEvent>(inputElement, 'keyup')
        // Let us also map the keypress events to produce an inputValue state
        .map(event => {
            //console.log(`keyup ${event.key}`);
            return (state: State):State => Object.assign({}, state, { inputValue: (event.target as HTMLInputElement).value})
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

export function zipUnbalancedMultipath(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let generator = Observable.interval(500).take(5).share();

    let path1 = generator
        .do(() => { console.log('path1: before map'); })
        .map((value) => value + 100)

    let path2 = generator
        .do(() => { console.log('path2: before delay'); })
        .delay(1000)
        .do(() => { console.log('path2: after delay'); })

    Observable
        .zip(path1, path2, (value1, value2) => {
            return `${value1} - ${value2}`;
        })
        .subscribe(simpleObserver('zipped'));
}

export function fromPromise(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    function idExists(id:string) { 
        return id === 'exist' ? true : false;
    }

    function deleteUser(id: string) {
        if (idExists(id)) {
            return Observable.fromPromise(Promise.resolve('delete user'));
        } else {
            return Observable.of('user not exist');
        }
    }

    deleteUser('exist').subscribe((value) => {
        console.log(value);
    })

    deleteUser('not exist').subscribe((value) => {
        console.log(value);
    })
}

export function fromPromise2(testButton:HTMLButtonElement, placeholder:HTMLElement) {

    function idExists(id:string) { 
        return id === 'exist' ? true : false;
    }

    function deleteUser(id: string) {
        Observable.defer(() => {
            if (idExists(id)) {
                return Observable.fromPromise(Promise.resolve('delete user'));
            } else {
                return Observable.of('user not exist');
            }
        }).subscribe((value) => {
            console.log(value);
        })
    }

    deleteUser('exist');
    deleteUser('not exist');
}

export function selfWindow(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.interval(500).take(5).share();

    source.subscribe(value => console.log(`source = ${value}`));

    source.window(source).mergeAll().subscribe(value => console.log(`cut = ${value}`));
}

// http://stackoverflow.com/questions/43991496/how-to-get-throttled-value-in-rxjs
export function inverseThrottle(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var times = [
        { value: 0, time: 100 },
        { value: 1, time: 600 },
        { value: 2, time: 400 },
        { value: 3, time: 900 },
        { value: 4, time: 200 }
    ];

    // Delay each item by time and project value;
    var source = Observable.from(times)
        .mergeMap(function (item) {
            return Observable
                .of(item.value)
                .delay(item.time);
        });

    var indexedSource = source
        .scan((_: [number, number], value, index) => {
            // console.log(`value = ${value}, index = ${index}`)
            return [value, index];
        }, undefined)
        .share();

    var indexedThrottled = indexedSource
        .throttleTime(300 /* ms */);

    var throttled = indexedThrottled
        .map(value => value[0]);

    var notThrottled = Observable.combineLatest(indexedThrottled, indexedSource)
        .filter(combined => {
            var filteredIndex = combined[0][1];
            var sourceIndex = combined[1][1];

            return sourceIndex > filteredIndex ? true : false;
        })
        .map(combined => {
            return combined[1][0];
        });

    source.subscribe(value => console.log(`source : ${value}`));
    throttled.subscribe(value => console.log(`++++++ : ${value}`));
    notThrottled.subscribe(value => console.log(`------ : ${value}`));
}

// http://stackoverflow.com/questions/43978581/handle-different-conditions-with-observables
export function conditional(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    function registerTask(task:string, forceError = false) {
        // console.log('registerTask called');
        return Observable.defer(() => {
            return Observable.of(1).delay(1000)
                .map(value => {
                    if (forceError)
                        throw 'ERROR';
                    return value;
                });
        });
    }

    function registerUser(user:string) {
        // console.log('registerUser called');
        return Observable.of('userID').delay(1000);
    }

    function searchTaskByName(task:string) {
        // console.log('searchTaskByName called');
        return Observable.of(2).delay(1000);
    }

    // registerTask('task', true)  // forceError
    registerTask('task')
        .catch((err, caught) => {
            return searchTaskByName('task');
        })
        .mergeMap(taskID => {
            console.log(`taskID = ${taskID}`)
            return registerUser('user');
        })
        .subscribe(userID => console.log(userID));
}


// http://stackoverflow.com/questions/43995864/rxjs-skip-functions-if-some-condition-is-met
export function conditionalSkip(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    function getClients(city:string) {
        return Observable.of(city == 'Seoul' ? ['c1', 'c2'] : []).delay(100);
    }
    function getSales(client:string, article:string) {
        let sales:any = {
            'c1': {
                'item1': 10,
                'item2': 20
            },
            'c2': {
                'item1': 30,
                'item2': 40
            }
        };

        return Observable.of(sales[client][article]).delay(100);
    }

    let city = 'Seou';
    let article = 'item2';

    // getClients(city)
    //     .mergeMap(clients => {
    //         console.log('>> mergeMap');
    //         let salesObs = clients.map<Observable<number>>(client => getSales(client, article));
    //         return Observable.merge(salesObs).mergeAll();
    //     })
    //     .reduce((sum, sales) => {
    //         console.log('>> reduce');
    //         return sum + sales;
    //     }, 0)
    //     .subscribe(value => console.log(`sum = ${value}`));

    getClients(city)
        .map(clients => {
            // some skip condition
            if (clients.length == 0)
                throw 0 /* default value */;

            return clients;
        })
        .mergeMap(clients => {
            console.log('>> mergeMap');
            let salesObs = clients.map<Observable<number>>(client => getSales(client, article));
            return Observable.merge(salesObs).mergeAll();
        })
        .reduce((sum, sales) => {
            console.log('>> reduce');
            return sum + sales;
        }, 0)
        .catch((err, caught) => {
            console.log('>> catch');
            // default value
            return Observable.of(err);
        })
        .subscribe(value => console.log(`sum = ${value}`));
}

// http://stackoverflow.com/questions/44004144/how-to-wait-for-two-observables-in-rxjs
export function waitTwo(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    function getName() {
        return Observable.of('some name').delay(100);
    }

    function getDocument() {
        return Observable.of('some document').delay(200);
    }

    // CASE1 : concurrent requests
    Observable.zip(getName(), getDocument(), (name, document) => {
        return `${name}-${document}`;
    })
        .subscribe(value => console.log(`concurrent: ${value}`));

    // CASE2 : sequencial requests
    getName().concat(getDocument())
        .bufferCount(2)
        .map(values => `${values[0]}-${values[1]}`)
        .subscribe(value => console.log(`sequential: ${value}`));
}

export function countDown(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button= buttonForTest('start', placeholder);
    let start = Observable.fromEvent<MouseEvent>(button, 'click');

    let duration = 10;

    start
        .switchMap(() => {
            return Observable
                .timer(0, 1000)
                .take(duration + 1)
        })
        .map((value) => {
            let remain = duration - value;
            return 'Timer (second): ' + remain;
        })
        .subscribe(simpleObserver('countDown'));
}

// http://stackoverflow.com/questions/44033322/chaining-rx-interval-and-delay
export function interval_delay(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let interval = Observable.interval(1000).take(10).startWith(-1);
    let interval_delay = Observable.interval(1000).delay(1000).take(10).startWith(-2);

    interval.subscribe(value       => console.log('interval         : ' + value));
    interval_delay.subscribe(value => console.log('interval + delay : ' + value));
}

// http://stackoverflow.com/questions/44036533/queue-operator-for-rxjs
export function window_queue(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    // let button= buttonForTest('fire', placeholder);
    // let signal = Observable.fromEvent<MouseEvent>(button, 'click');

    let signal = Observable.interval(1000).take(4);

    let input = Observable.interval(300).take(10).share();

    let output = input
        .do(value => console.log(`input = ${value}`))
        .window(signal)
        .do(() => console.log(`*** signal : end OLD and start NEW subObservable`))
        .mergeMap(subObservable => {
            return subObservable.takeLast(100);
        })
        .share()

    output.subscribe(value => console.log(`    output = ${value}`));

    Observable.merge(input.mapTo(1), output.mapTo(-1))
        .scan((count, diff) => {
            return count + diff;
        }, 0)
        .subscribe(count => console.log(`            count = ${count}`));
}

// NOTICE: delay observable(not value) has the problems
//         Observable can not be delayed.
export function delayObservable(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.concat(Observable.interval(1000).take(10), Observable.empty().delay(3000));

    source
        .do(value => console.log(`source = ${value}`))
        .window(Observable.interval(3000).do(value => console.log('***** signal')))
        .do(value => console.log('>>> start concatAll dead zone'))
        .delay(1000)
        .do(value => console.log('<<< end concatAll dead zone'))
        .concatAll()
        .startWith(999)
        .subscribe(simpleObserver('subscribe'));
}

export function completedWhileDelay(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.interval(100).take(3);

    source
        .delay(1000)
        .subscribe(simpleObserver('completed while long delay'));

    source
        .delay(1)
        .subscribe(simpleObserver('completed while short delay'));
}

// RxJS: How to emit original values, then reduce upon completion?
// http://stackoverflow.com/questions/44059390/rxjs-how-to-emit-original-values-then-reduce-upon-completion
export function summary(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.range(1, 3).share();

    let totalOb = source
        .reduce((total, value) => total + value, 0);

    source
        .concat(totalOb)
        .subscribe( value => console.log(`Next: ${value}`) );
}

export function summary2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.range(1, 3).share();

    let totalOb = source
        .reduce((total, value) => total + value, 0)
        .mergeMap(total => Observable.throw(total));

    source
        .concat(totalOb)
        .subscribe(
            value => console.log(`Next: ${value}`),
            value => console.log(`Total: ${value}`)
        );
}

export function loadImage(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    var image = new Image();

    Observable
        .fromEvent(image, 'load')
        .subscribe(simpleObserver('load'));

    image.src = 'https://placehold.it/500x100';
}

export function loadImages(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let imagesDOM = placeholder;

    var imageURLList = [
        'https://placehold.it/500x100',
        'https://placehold.it/500x200',
        'https://placehold.it/500x300',
        'https://placehold.it/500x400',
        'https://placehold.it/500x500'
    ];

    Observable
        .from(imageURLList)
        .concatMap(function (imageURL) {
            console.log(`imageURL = ${imageURL}`);
            var image = new Image();

            var loadedImageStream = Observable
                .fromEvent(image, 'load')
                .mapTo(image)
                .take(1);

            image.src = imageURL;

            return loadedImageStream;
        })
        .subscribe(
            image => { console.log('NEXT'); imagesDOM.appendChild(image)},
            // image => console.log(`NEXT: `),
            error => console.log(`ERROR : ${error}`),
            () => console.log('Completed')
        );
        
}

export function loadImages2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let imageContainer = placeholder;

    var imageURLList = [
        'https://placehold.it/500x100',
        'https://placehold.it/500x200',
        'https://xplacehold.it/500x300',
        'https://placehold.it/500x400',
        'https://placehold.it/500x500'
    ];

    Observable
        .from(imageURLList)
        .do(() => {
            imageContainer.appendChild(new Image() /* placeholder */); 
        })
        .mergeMap<string, [HTMLImageElement, number]>((imageURL, index) => {
            let image = new Image();

            var loadedImageStream = Observable
                .fromEvent(image, 'load')
                .mapTo([image, index])
                .take(1);

            image.src = imageURL;
            return loadedImageStream;
        })
        .subscribe(([image, index]) =>{
            imageContainer.replaceChild(image, imageContainer.childNodes[index]);
        })
}

// https://stackoverflow.com/questions/44195200/is-it-possible-to-use-observables-in-a-way-where-i-can-constant-feedback
export function progress(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    interface Route {
        length: number;
    }

    let routeSubject = new Subject<Route>();

    function update(route:Route) {
        routeSubject.next(route);
    }

    function doThing(route:Route) {
        route.length++;
    }

    function calculateBestRoute(observable: Observable<Route>) {
        let bestRoute:Route = { length: 0};

        doThing(bestRoute);
        update(bestRoute);
        doThing(bestRoute);
        update(bestRoute);
        doThing(bestRoute);
        update(bestRoute);
        doThing(bestRoute);
        update(bestRoute);
    }

    routeSubject.subscribe(value => console.log(`updated: ${value.length}`));
    calculateBestRoute(routeSubject); 
}

// https://stackoverflow.com/questions/44230511/how-to-pipe-observables
export function validateWithCatch(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let source = Observable.of(1,2,3);

    source
        .mergeMap(value => {
            if (value > 1) {  // condition
                return Observable.throw(`Out Of Condifition: ${value}`);
            }
            return Observable.of(value);
        })
        .subscribe(
            value => console.log(`Next: ${value}`),
            error => console.log(`Error: ${error}`),
            () => console.log('completed')
        );
}

// https://stackoverflow.com/questions/44230511/how-to-pipe-observables
export function validateWithError(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    const stdout = 1;
    const stderr = 2;
    let source = Observable.of(1,2,3);

    source
        .map(value => {
            if (value > 1) {  // condition
                return [stderr, value];
            }
            return [stdout, value];
        })
        .subscribe(channel_value => {
            let channel = channel_value[0];
            let value = channel_value[1];

            if (channel == stdout) {
                console.log(`stdout: ${value}`);
            }
            else if (channel == stderr) {
                console.log(`stderr: ${value}`);
            }
        });
}

// https://stackoverflow.com/questions/41364814/how-to-loop-in-rxjs-v5
export function requestLoop(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    interface RSP {
        header:string;
        value:string;
    };

    function requestMaker(numChunk:number) {
        return () => {
            numChunk > 0 ? numChunk-- : 0;
            return Observable.of(numChunk > 0 ? ['CONT', 'value'] : ['END', 'value']).delay(300);
        }
    }

    let simulateRequest = requestMaker(5);

    simulateRequest()
        .expand(([header, value]) => {
            if (header == 'CONT') {
                return simulateRequest();
            }
            else {
                return Observable.empty();
            }
        })
        .subscribe(
            ([header, value]) => console.log(`NEXT: ${header}-${value}`),
            error => console.log(`ERROR: ${error}`),
            () => console.log('completed')
        )
}