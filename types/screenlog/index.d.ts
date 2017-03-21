interface ScreenLogOptions {
    bgColor?: string;
    logColor?: string;
    infoColor?: string;
    warnColor?: string;
    errorColor?: string;
    freeConsole?: boolean;
    css?: string;
    autoScroll?: boolean;
}

interface ScreenLog {
    init(options:ScreenLogOptions):void;
    debug(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    destory():void;
}

declare var screenLog:ScreenLog;

