define(['app', 'backbone'], function (app, Backbone) {
    return Backbone.Model.extend({
        urlRoot: function () {
            return app.getApiRoot + 'Backgrounds/'
        },

        idAttribute: 'userId',

        validation: {
            bornJewish: {
                required: true
            },
            conversionInfo: {
                required: function (value, attr, computedState) {
                    return !this.get('bornJewish');
                }
            },
            baalTeshuva: { required: true },
            btTime: {
                required: function (value, attr, computedState) {
                    return !this.get('baalTeshuva');
                }
            },
            isKohen: {
                required: function (value, attr, computedState) {
                    return !$('body').hasClass('male');
                }
            },
            marryCohen: {
                required: function (value, attr, computedState) {
                    return !$('body').hasClass('female');
                }
            },
            ethnicity: { required: false },
            observance: { required: true }
        }
    });
});