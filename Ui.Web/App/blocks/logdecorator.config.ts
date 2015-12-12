((): void => {
    "use strict";

    angular
        .module("app.blocks")
        .config(config);

    config.$inject = ["$provide"];

    function config($provide: ng.auto.IProvideService): void {
        $provide.decorator("$log", extendLog);
    }

    extendLog.$inject = ["$delegate"];

    function extendLog($delegate: any): ng.ILogService {
        let debugFunction: angular.ILogCall = $delegate.debug;
        $delegate.debug = (...args: any[]): void => {
            let now: string = (new Date()).toLocaleTimeString();
            args[0] = now + " - " + args[0];
            debugFunction.apply(null, args);
        };
        return $delegate;
    }
})();
