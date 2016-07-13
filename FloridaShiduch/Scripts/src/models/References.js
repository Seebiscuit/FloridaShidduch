define(['app', 'backbone'], function (app, Backbone) {
    return Backbone.Model.extend({
        urlRoot: '/api/References/'
    });
});