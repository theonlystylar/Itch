define(["require", "exports"], function (require, exports) {
    var Data = (function () {
        function Data(name) {
            this._name = name;
        }
        Data.prototype.getName = function () {
            return this._name;
        };
        return Data;
    })();
    exports.Data = Data;
});

//# sourceMappingURL=data.js.map
