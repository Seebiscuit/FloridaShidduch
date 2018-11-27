define(['marionette', "behaviors/ModelBehavior"], function (Marionette, ModelBehavior) {
    'use strict';
    return ModelBehavior.extend({
        ui: {
            bornJewish: 'input[name="bornjewish"]',
            conversionInfo: '#register-background-conversion',
            baalTeshuva: 'input[name="baalteshuva"]',
            btTime: '#register-background-bt-years',
            isKohen: 'input[name="iskohen"]',
            marryCohen: 'input[name="marrykohen"]',
            ethnicity: '#register-background-ethnicity',
            observance: '#register-background-observance'
        },

        modelEvents: {
            'change:bornJewish': 'updateBornJewish',
            'change:baalTeshuva': 'updateIsBT',
        },

        updateBornJewish: function (model, val, options) {
            this.view.updateBoolean(val, ['toggle-convert', '']);
        },

        updateIsBT: function (model, val, options) {
            this.view.updateBoolean(val, ['', 'toggle-bt']);
        }
    });

});