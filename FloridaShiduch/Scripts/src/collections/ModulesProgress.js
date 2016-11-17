define(['app', 'backbone', 'collections/AuthenticatedCollection', 'models/ModuleProgress'], function (app, Backbone, AuthenticatedCollection, Progress) {
    return AuthenticatedCollection.extend({
        model: Progress,

        url: function () {
            return app.getApiRoot + 'Progress/' + this.user.id;
        }
    });
})