import { buttonForTest, inputForTest } from './helper';

export function stringType(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    type lit = "A" | "B" | "C";
    let uni: lit;
    let str = "C";

    function isLit(str: string): str is lit {
        return str == "A" || str == "B" || str == "C";
    }
    function doSomething(str: string) {
        
    }

    if (isLit(str)) {
        uni = str;
    }
    else {
        doSomething(str);
    }
}

export function stringType2(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    class Lit {
        constructor(public A = 0, public B = 0, public C = 0) {}
    }
    type lit = keyof Lit;
    let uni: lit;

    function isLit(str: string): str is lit {
        let lit = new Lit();
        return (str in lit) ? true : false;
    }
    function doSomething(str: string) {
    }

    let str = "C";
    if (isLit(str)) {
        console.log(`${str} is lit`);
        uni = str;
    }
    else {
        console.log(`${str} is not lit`);
        doSomething(str);
    }
}