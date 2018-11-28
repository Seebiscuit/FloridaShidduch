define(['app', 'models/AuthenticatedModel', 'backbone'], function (app, AuthenticatedModel, Backbone) {
    return AuthenticatedModel.extend({
        defaults: function () {
            return {
                name: "",
                cityAndState: "",
                phone: "",
                relationship: ""
            }
        },

        urlRoot: function () {
            return app.getApiRoot + 'References/';
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id;
        },

        validation: {
            rank: { required: false },
            name: { required: false },
            cityAndState: { required: false },
            phone: { required: false },
            relationship: { required: false }
        }
    });
});