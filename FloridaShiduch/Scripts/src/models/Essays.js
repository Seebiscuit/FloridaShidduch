define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        url: function () {
            return app.getApiRoot + 'Essays/' + this.user.id;
        },

        idAttribute: 'userId'
    });
});