import { NSNotificationCenter } from './notificatoncenter'; 

const eventString = 'evString';
const eventObject = 'evObject';

let listeners:{
    name: string;
    listener: (e:CustomEvent) => void;
}[] = [];

export function addObservers() {
    const listener1 = NSNotificationCenter.defaultCenter().addObserver(eventString, stringObserver1);
    listeners.push({name: eventString, listener: listener1});
    console.log('add stringObserver1');

    const listener2 = NSNotificationCenter.defaultCenter().addObserver(eventString, stringObserver2);
    listeners.push({name: eventString, listener: listener2});
    console.log('add stringObserver2');

    const listener3 = NSNotificationCenter.defaultCenter().addObserver(eventObject, objectObserver);
    listeners.push({name: eventObject, listener: listener3});
    console.log('add objectObserver');
}

export function removeObservers() {
    listeners.forEach((value) => {
        console.log(`remove ${value.name}`);
        NSNotificationCenter.defaultCenter().removeObserver(value.name, value.listener);
    });
}

export function postString() {
    console.log('post eventString with \'userInfo\'');
    NSNotificationCenter.defaultCenter().post(eventString, 'userInfo');
}
export function postObject() {
    console.log('post eventObject with object');
    NSNotificationCenter.defaultCenter().post(eventObject, { a: '123' });
}

function stringObserver1(name:string, value?:any) {
    console.log(`[stringObserver1] event '${name}' received with ${value}`);
}

function stringObserver2(name:string, value?:any) {
    console.log(`[stringObserver2] event '${name}' received with ${value}`);
}

function objectObserver(name:string, value?:any) {
    console.log(`[objectObserver] event '${name}' received with ${value.a}`);
}