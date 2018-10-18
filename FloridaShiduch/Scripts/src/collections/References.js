define(['app', 'backbone', 'collections/AuthenticatedCollection', 'models/Reference'], function (app, Backbone, AuthenticatedCollection, Reference) {
    return AuthenticatedCollection.extend({
        model: Reference,

        url: function () {
            return app.getApiRoot + 'References/' + this.user.id;
        }
    })
})