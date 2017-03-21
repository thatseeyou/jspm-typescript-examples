let p1 = new Promise<number>(function(resolve, reject) {
    console.log('p1: RUN resolve');
    resolve(100);
});

p1.then((value) => { console.log('p1:return value: ' + value); return value + 1;})
  .then((value) => { console.log('p1:return value -> then: ' + value); });

p1.then((value) => { console.log('p1:return undefined:' + value);})
  .then((value) => { console.log('p1:return undefined -> then: ' + value); });

p1.then((value) => { console.log('p1:return Promise: ' + value); return Promise.resolve(value + 1);})
  .then((value) => { console.log('p1:return Promise -> then: ' + value); });

console.log('p1: END OF DEFINITION');

let p2 = new Promise<number>(function(resolve, reject) {
    window.setTimeout(() => { console.log('p2: RUN resolve'); resolve(100) }, 1000);
});

p2.then((value) => { console.log('p2:return value: ' + value); return value + 1;})
  .then((value) => { console.log('p2:return value -> then: ' + value); });

p2.then((value) => { console.log('p2:return value: ' + value); return value + 1;})
  .catch((reason) => { console.log('p2:MUST NOT CALLED');})
  .then((value) => { console.log('p2:return value -> catch -> then: ' + value); });

console.log('p2: END OF DEFINITION');

let p3 = new Promise<number>((resolve, reject) => {
    try {
        throw new Error('intened exception');
    }
    catch (e) {
        reject(e);
    }
});

p3.then(
    (value) => { return value; }, 
    (reason) => { console.log('p3:reject return undefined: ' + reason); }
).then(
    (value) => { console.log('p3:reject return undefined -> then: ' + value); }, 
    (reason) => { console.log('p3:reject return undeined -> reject: ' + reason); }
);

p3.then(
    (value) => { return value; }, 
    (reason) => { console.log('p3:reject return reject: ' + reason); return Promise.reject(reason);}
).then(
    (value) => { console.log('p3:reject return reject -> then: ' + value); }, 
    (reason) => { console.log('p3:reject return reject -> reject: ' + reason); }
);

p3.then(
    (value) => { return value; } 
).catch(
    (reason) => { console.log('p3:catch return undefined : ' + reason); }
).then(
    (reason) => { console.log('p3:catch return undeined -> then: ' + reason); }
);

p3.then(
    (value) => { return value; } 
).catch(
    (reason) => { console.log('p3:catch return reject: ' + reason); return Promise.reject(reason);}
).catch(
    (reason) => { console.log('p3:catch return reject -> catch: ' + reason); }
);

console.log('p3: END OF DEFINITION');
