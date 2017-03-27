export function test1() {
    let button = document.createElement('button');
    button.innerText = 'Click to resolve one-time promise';
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(button);

    let clickPromise = new Promise<MouseEvent>((resolve, reject) => {
        button.addEventListener('click', (event) => {
            resolve(event);
        });
    });

    clickPromise.then((value) => {
        console.log('1. first clicked');
        return Promise.resolve(value);
    });

    clickPromise.then((value) => {
        console.log('2. first clicked');
    });

    clickPromise.then((value) => {
        console.log('3. first clicked');
    });
}

export function test2() {
    let button = document.createElement('button');
    button.innerText = 'Click to resolve one-time promise';
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(button);

    button.addEventListener('click', (event) => {
        let clickPromise = new Promise<MouseEvent>((resolve, reject) => {
            resolve(event);
        });

        clickPromise.then(observer1);
        clickPromise.then(observer2);
        clickPromise.then(observer3);
    });

    function observer1(value:MouseEvent) {
        console.log('1. first clicked');
    }

    function observer2(value:MouseEvent) {
        console.log('2. first clicked');
    }

    function observer3(value:MouseEvent) {
        console.log('3. first clicked');
    }
}