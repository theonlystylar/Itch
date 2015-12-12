(() => {
    "use strict";
    angular
        .module("app")
        .run(run);
    run.$inject = [
        "$rootScope",
        "$cookies",
        "currentUser"
    ];
    function run($rootScope, $cookies, currentUser) {
        $rootScope.$on("$routeChangeError", () => {
            currentUser.userId = "";
        });
        currentUser.userId = $cookies.userId;
    }
})();

//# sourceMappingURL=app.run.js.map
