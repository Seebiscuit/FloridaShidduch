define(['backbone'], function (Backbone) {
    var extend = Backbone.Model.extend;

    function Bindings(bindings, ui, options) {
        this.options = options || {};

        // Store original @ui sticking bindings hash
        this._bindings = bindings;

        this.ui = _.result({ ui: ui }, 'ui')
        // Normalized
        this.bindings = Bindings.normalizeUIKeys(this._bindings, this.ui);

        if (this.options.methods)
            this.bindings = _.extend(this.bindings, options.methods);
    };

    Bindings.prototype.getBindings = function () {
        var env = {};
        for (var prop in this) {
            if (this.hasOwnProperty(prop))
                env[prop] = this[prop];
        }

        return env;
    };

    Bindings.normalizeUIKeys = function (hash, ui) {
        return _.reduce(hash, function (memo, val, key) {
            var normalizedKey = Bindings.normalizeUIString(key, ui);
            memo[normalizedKey] = val;
            return memo;
        }, {});
    };

    Bindings.normalizeUIString = function (uiString, ui) {
        return uiString.replace(/@ui\.[a-zA-Z-_$0-9]*/g, function (r) {
            return ui[r.slice(4)];
        });
    };

    return Bindings;
});