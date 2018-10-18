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
            dressCodeSkirt: { required: false },
            dressCodeSleeve: { required: false },
            hairCovering: { required: false }
        },

        validationDependencies: {
            dressCodeSkirt: 'demographics.gender.female',
            dressCodeSleeve: 'demographics.gender.female',
            hairCovering: 'demographics.gender.female'
        }
    });
});