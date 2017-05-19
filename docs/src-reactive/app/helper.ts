import { Observer } from 'rxjs/Observer';

export function buttonForTest(text: string, parent?:HTMLElement) {
    let button = document.createElement('button');
    button.innerText = text;
    button.style.height = '80px';

    let p = parent ? parent : document.body; 
    p.appendChild(button);

    return button;
}

export function inputForTest(label: string, parent?:HTMLElement) {
    let labelEl = document.createElement('label');
    labelEl.innerText = label;
    let inputEl = document.createElement('input');
    labelEl.appendChild(inputEl);

    let p = parent ? parent : document.body; 
    p.appendChild(labelEl);

    return inputEl;
}

export function simpleObserver<T>(prefix: string):Observer<T> {
    return {
        next: (value) => {
            console.log(`${prefix}: NEXT: ${value}`)
        },
        error: (err) => {
            console.log(`${prefix}: ERROR:`)
            console.log(err)
        },
        complete: () => console.log(`${prefix}: Completed`)
    }
}

export function simpleValueObserver<T>(prefix: string):Observer<T> {
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