define(['app', 'backbone', 'state'], function (app, Backbone, state) {
    return Backbone.Collection.extend({
        constructor: function (models, options) {
            this.user = state.user

            Backbone.Collection.prototype.constructor.apply(this, arguments);
        },
    });
})