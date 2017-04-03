import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/return';

export function zip() {
    // 1. make left, right button
    let [leftClickObservable, rightClickObservable] = ['left', 'right']
    .map(function(text) {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = text;
        buttonElement.style.height = '50px';
        
        // side effect
        document.body.appendChild(buttonElement);

        return Observable.fromEvent<MouseEvent>(buttonElement, 'click');
    });

    let zippedObservable = Observable.zip(leftClickObservable, rightClickObservable, function(leftClick, rightClick):[number, number] {
        let leftTime = leftClick.timeStamp;
        let rightTime = rightClick.timeStamp;

        console.log(`zip: ${leftTime - rightTime}`);

        return [ leftTime, rightTime ];
    });

    zippedObservable.subscribe((value) => {
        let [leftTime, rightTime] = value;

        console.log(`subscribe1: ${leftTime - rightTime}`);
    });

    zippedObservable.subscribe((value) => {
        let [leftTime, rightTime] = value;

        console.log(`subscribe2: ${leftTime - rightTime}`);
    });

    zippedObservable.forEach((value) => {
        let [leftTime, rightTime] = value;

        console.log(`forEach: ${leftTime - rightTime}`);
    });
}

