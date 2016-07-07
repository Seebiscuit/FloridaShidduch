define(['backbone'], function (Backbone) {
    var extend = Backbone.Model.extend;

    function Bindings(bindings) {
        this.bindings = bindings;
    };

    Bindings.prototype.getBindings = function () {
        var env = {};
        for (var prop in this) {
            if (this.hasOwnProperty(prop))
                env[prop] = this[prop];
        }

        return env;
    };

    return Bindings;
});