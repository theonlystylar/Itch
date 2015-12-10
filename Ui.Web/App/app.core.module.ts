((): void => {
    "use strict";

    angular
        .module("app.core", [
            /*
             * angular modules
             */
            "ngRoute",
            "ngSanitize",
            "ngCookies",
            /*
             * 3rd party modules
             */
            "hc.marked"
        ]);
})();
