define(["require", "exports"], function (require, exports) {
    var App = (function () {
        function App(name) {
            this._name = name;
        }
        App.prototype.getName = function () {
            return this._name;
        };
        return App;
    })();
    exports.App = App;
});

//# sourceMappingURL=app.js.map
