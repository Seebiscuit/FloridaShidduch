﻿define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        idAttribute: 'userId',
        
        urlRoot: function () {
            return app.getApiRoot + 'References/';
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id;
        }
    });
});