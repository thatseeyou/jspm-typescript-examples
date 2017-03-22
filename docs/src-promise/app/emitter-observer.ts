let count = 0;

export = function test() {
    let queue1 = new Promise(emitter);

    let queue2 = queue1.then(observer1_resolve, observer1_reject);
    let queue3 = queue2.then(observer2_resolve, observer2_reject);

    let queue23 = queue1.then(observer1_resolve, observer1_reject)
                        .then(observer2_resolve, observer2_reject);
}

function emitter(resolve:(value?:number)=>void, reject:(reason:any)=>void) {
    setTimeout(() => {
        console.log(`sent value: ${count}`);
        resolve(count++);
    }, 500);

    // setTimeout(()=> {
    //     reject(new Error('error at ' + count));
    // }, 2000)
};

function observer1_resolve(value:number) {
    console.log(`[1] received value: ${value}`);
    return new Promise(emitter);
};
function observer1_reject(reason:any) {
    console.log(`[1] received error: ${reason}`);
    return reason;
};

function observer2_resolve(value:number) {
    console.log(`[2] received value: ${value}`);
    return new Promise(emitter);
};
function observer2_reject(reason:any) {
    console.log(`[2] received error: ${reason}`);
    return reason;
};
