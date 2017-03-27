export = function test() {
    let output = add(10, 20);
    console.log(`output is ${output}`);

    let p1 = fn2promise(add, 10, 20); 
    p1.then((value) => {
        console.log(`${value} received`);
    });

    let p2 = fn2promise(add, 1, 2); 
    p2.then((value) => {
        console.log(`${value} received`);
        return fn2promise(add, value, 3);
    }).then((value) => {
        console.log(`${value} received`);
        return fn2promise(add, value, 4);
    }).then((value) => {
        console.log(`${value} received`);
        return value + 5;
    }).then((value) => {
        /* nothing received */
        console.log(`${value} received`);
    });
}

function add(left:number, right:number) {
    return left + right;
}

function fn2promise<OUT>(fn:(...input:any[])=>OUT, ...input:any[]) {
    let pipe = new Promise<OUT>(function open(stdout /* resolve */, stderr /* reject */) {
        let output:OUT = fn.apply(this, input);
        try{
            console.log(`${output} sent`);
            stdout(output);
        }
        catch(e) {
            stderr(e);
        }
    });

    return pipe;
}
