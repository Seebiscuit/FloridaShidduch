define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        urlRoot: function () {
            return app.getApiRoot + 'Backgrounds/'
        }
    });
})