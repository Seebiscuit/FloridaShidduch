define(['app', 'backbone', 'models/AuthenticatedModel'], function (app, Backbone, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        idAttribute: 'userId',

        urlRoot: function () {
            return app.getApiRoot + 'Occupations/';
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id + '?occupationtype=' + this.get('occupationType');
        }
    });
});