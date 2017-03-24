export class NSNotificationCenter {
    private readonly useCapture = true;
    private readonly el:Node = document;
    static nc:NSNotificationCenter = null;

    static defaultCenter() {
        return NSNotificationCenter.nc === null ? new NSNotificationCenter() : NSNotificationCenter.nc;
    }

    addObserver(name:string, observer:(name:string, value?:any) => void) {
        // add an appropriate event listener
        let listener = function (e:CustomEvent) { 
            observer(e.type, e.detail) 
            e.stopPropagation();
        };
        this.el.addEventListener(name, listener, this.useCapture);

        return listener;
    }

    removeObserver(name:string, listener:(e:CustomEvent) => void) {
        this.el.removeEventListener(name, listener, this.useCapture);
    }

    post(name:string, userInfo?:any) {
        // create and dispatch the event
        var event = new CustomEvent(name, {
            detail: userInfo
        });

        this.el.dispatchEvent(event);
    }
}