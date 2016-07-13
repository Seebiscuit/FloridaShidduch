define(['app', 'backbone'], function (app, Backbone) {
    return Backbone.Model.extend({
        idAttribute: 'userId',

        urlRoot: '/api/Personal/'
    });
});