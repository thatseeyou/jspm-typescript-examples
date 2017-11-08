export function traceFactory(enable: boolean, prefix: string = '') {
    console.log('trace called');
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('inner trace called');

        // console.log('target =');
        // console.dir(target);
        // console.dir(target.constructor.prototype);

        // console.log('propertyKey =');
        // console.dir(propertyKey);

        // console.log('descriptor =');
        // console.dir(descriptor);

        if (enable == false)
            return;

        let orgMethod = descriptor.value;
        descriptor.value = function() {
            console.log(`${prefix}>>> ENTER ${target.constructor.name}::${propertyKey}`)
            let retValue = orgMethod.apply(this, arguments);
            console.log(`${prefix}<<< EXIT  ${target.constructor.name}::${propertyKey}`)

            return retValue
        }
    };
}

export function trace(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log('trace2 called');
    // console.log('target =');
    // console.dir(target);
    // console.dir(target.constructor.prototype);

    // console.log('propertyKey =');
    // console.dir(propertyKey);

    // console.log('descriptor =');
    // console.dir(descriptor);

    let orgMethod = descriptor.value;
    descriptor.value = function () {
        console.log(`>>> ENTER ${target.constructor.name}::${propertyKey}`)
        let retValue = orgMethod.apply(this, arguments);
        console.log(`<<< EXIT  ${target.constructor.name}::${propertyKey}`)

        return retValue
    }
};