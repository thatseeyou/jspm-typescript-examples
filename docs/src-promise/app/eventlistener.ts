export = function test() {
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
    });

    clickPromise.then((value) => {
        console.log('2. first clicked');
    });

    clickPromise.then((value) => {
        console.log('3. first clicked');
    });
}