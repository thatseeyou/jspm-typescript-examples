import { Map, List, fromJS } from 'immutable';

// module augmentation for missing declaration
declare module 'immutable' {
    interface Map<K, V> extends Collection.Keyed<K, V> {
        merge(...iterables: (Iterable<K, V> | {[key: string]: V})[]): Map<K, V>;
    }
}

export function test1() {
    const map1 = Map({ a: 1, b: 2, c: 3 })
    const map2 = map1.set('b', 50)
    console.log(`${map1.get('b')}`); // 2
    console.log(`${map2.get('b')}`); // 50
}

export function test2() {
    const map1 = Map({ a: 1, b: 2, c: 3, d: 4 })
    const map2 = Map({ c: 10, a: 20, t: 30 })
    const obj = { d: 100, o: 200, g: 300 }
    const map3 = map1.merge(map2, obj);

    console.log(`${map3}`); // 50
}

export function test3() {
    const list1 = List([1, 2]);
    const list2 = list1.push(3, 4, 5);
    const list3 = list2.unshift(0);
    const list4 = list1.concat(list2, list3);

    console.log(list1);
    console.log(list2);
    console.log(list3);
    console.log(list4);
}

export function test4() {
    const deep = Map({ a: 1, b: 2, c: List([3, 4, 5]) })
    console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
    console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
    console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
    console.log(JSON.stringify(deep)); // '{"a":1,"b":2,"c":[3,4,5]}'
}

export function test5() {
    const nested:Map<string, { b: { c?: number[]; d?: number;}}> = fromJS({ a: { b: { c: [3, 4, 5] } } })
    //const nested = Map({ a: { b: { c: [3, 4, 5] } } })
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
    const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } })
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

    nested2.getIn(['a', 'b', 'd']) // 6

    const nested3 = nested2.updateIn(['a', 'b', 'd'], (value:number) => value + 1)
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

    const nested4 = nested3.updateIn(['a', 'b', 'c'], (list:List<number>) => list.push(6))
    // Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }

    console.log(nested);
    console.log(nested2);
    console.log(nested3);
    console.log(nested4);
}