define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        idAttribute: 'userId',

        urlRoot: function () {
            return app.getApiRoot + 'Personals/'
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id;
        },

        validation: {
            birthday: { required: false },
            feet: { required: false },
            inches: { required: false },
            build: { required: false },
            maritalStatus: { required: false },
            children: { required: false },
            childrenNumber: { required: false,
                pattern: 'number',
                msg: 'Please, enter number of children',
                dependsOn: 'children'
            },
            pets: { required: false },
            smoke: { required: false }
        }
    });
});