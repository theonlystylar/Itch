(() => {
    "use strict";
    angular
        .module("app.blocks")
        .config(config);
    config.$inject = ["$provide"];
    function config($provide) {
        $provide.decorator("$log", extendLog);
    }
    extendLog.$inject = ["$delegate"];
    function extendLog($delegate) {
        let debugFunction = $delegate.debug;
        $delegate.debug = (...args) => {
            let now = (new Date()).toLocaleTimeString();
            args[0] = now + " - " + args[0];
            debugFunction.apply(null, args);
        };
        return $delegate;
    }
})();

//# sourceMappingURL=logdecorator.config.js.map
