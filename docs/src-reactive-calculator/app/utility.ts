export function numberWithCommas(x:number):string;
export function numberWithCommas(x:string):string; 
export function numberWithCommas(x:any) {
    if (typeof x !== 'string') {
        x = x.toString();
    }
    var parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}