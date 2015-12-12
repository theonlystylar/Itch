interface ICurrentUser {
    userId: string;
}

((): void => {
    "use strict";

    let currentUser: ICurrentUser = {
        userId: ""
    };

    angular
        .module("app")
        .value("currentUser", currentUser);
})();
