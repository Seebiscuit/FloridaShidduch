define(['marionette'], function (Marionette) {
    return Marionette.Behavior.extend({
        onRender: function () {
            this.invokeModelEvents();
        },

        invokeModelEvents: function () {
            if (this.modelEvents) {
                Object.keys(this.modelEvents)
                    .filter(function (key) {
                        return key.indexOf("change:") === 0
                    })
                    .forEach(function (key) {
                        var attr = key.substr("change:".length);
                        var fn = this[this.modelEvents[key]];

                        if (typeof fn === "function")
                            fn.call(this, this.view.model, this.view.model.get(attr));
                    }.bind(this))
            }
        }
    });
});