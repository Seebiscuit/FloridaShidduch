define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        url: function () {
            return app.getApiRoot + 'Lifestyles/' + this.user.id;
        },

        idAttribute: 'userId',

        validation: {
            learnFrequency: { required: false },
            shulFrequency: { required: false },
            kashrus: { required: false },
            dressCodeSkirt: { required: false, dependsOn: 'Demographics.gender.female' },
            dressCodeSleeve: { required: false, dependsOn: 'Demographics.gender.female' },
            hairCovering: { required: false, dependsOn: 'Demographics.gender.female' }
        }
    });
});