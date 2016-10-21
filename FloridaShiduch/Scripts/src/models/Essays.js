define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        idAttribute: 'userId',

        urlRoot: '/api/Occupation/'
    });
});