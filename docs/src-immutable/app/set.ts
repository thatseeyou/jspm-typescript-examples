import { Set, Map } from 'immutable';

export function testAdd1() {
    let s1 = Set([1, 2, 3]);

    let s2 = s1.add(4);
    let s3 = s2.add(1);

    console.log(s1);
    console.log(s2);
    console.log(s3);
}

export function testAdd2() {
    let s1 = Set<number>();

    let s2 = s1.add(4);
    let s3 = s2.add(1);

    console.log(s1);
    console.log(s2);
    console.log(s3);
}

export function testHas() {
    let s1 = Set([1, 2, 3]);

    console.log(`1 exists ? ${s1.has(1)}`);
    console.log(`4 exists ? ${s1.has(4)}`);

    let s2 = Set([{key:1}, {key:2}, {key:3}]);
    console.log(s2);

    console.log(`{key:1} exists ? ${s2.has({key:1})}`);
    console.log(`{key:4} exists ? ${s2.has({key:4})}`);

    let s3 = Set([Map({key:1}), Map({key:2}), Map({key:3})]);
    console.log(s3);

    console.log(`Map({key:1}) exists ? ${s3.has(Map({key:1}))}`);
    console.log(`Map({key:4}) exists ? ${s3.has(Map({key:4}))}`);
}