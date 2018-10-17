define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        url: function () {
            return app.getApiRoot + 'Backgrounds/' + this.user.id;
        },

        idAttribute: 'userId',

        validation: {
            bornJewish: {
                required: true
            },
            conversionInfo: {
                required: function (value, attr, computedState) {
                    return !this.get('bornJewish');
                },
                dependsOn: 'bornJewish'
            },
            baalTeshuva: { required: true },
            btTime: {
                required: function (value, attr, computedState) {
                    return this.get('baalTeshuva');
                },
                pattern: 'number',
                msg: 'Please, enter number of years',
                dependsOn: 'baalTeshuva'
            },
            isKohen: {
                required: function (value, attr, computedState) {
                    return $('body').hasClass('male');
                },
                dependsOn: 'Demographics.gender.male'
            },
            marryCohen: {
                required: function (value, attr, computedState) {
                    return $('body').hasClass('female');
                },
                dependsOn: 'Demographics.gender.female'
            },
            ethnicity: { required: false },
            observance: {
                required: true,
                fn: function (value, attr, computedState) {
                    if (value == 0) {
                        return 'Please select the style of observance you keep';
                    }
                }
            }
        }
    });
});