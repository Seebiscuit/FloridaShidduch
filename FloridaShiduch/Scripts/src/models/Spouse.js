define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        idAttribute: 'userId',

        urlRoot: function () {
            return app.getApiRoot + 'Spouses/';
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id;
        },

        validation: {
            minAge: { required: false },
            maxAge: { required: false },
            minFeet: { required: false },
            minInches: { required: false },
            maxFeet: { required: false },
            maxInches: { required: false },
            maritalStatus: { required: false },
            allowChildren: { required: false },
            hebrewEducationLevel: { required: false },
            secularEducationLevel: { required: false },
            tv: { required: false },
            relocate: { required: false },
            aliyah: { required: false }
        }
    });
});