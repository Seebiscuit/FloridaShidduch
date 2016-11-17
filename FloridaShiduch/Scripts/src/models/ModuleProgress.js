define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        idAttribute: 'module',

        urlRoot: function () {
            return app.getApiRoot + 'Progress/'
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id;
        },

        parse: function (attr) {
            if (attr) attr.userId = this.user.id;

            return attr;
        }
    });
})