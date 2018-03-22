define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: {
            learnFrequency: 'input[name="learnfrequency"]',
            shulFrequency: 'input[name="shulfrequency"]',
            kashrus: 'input[name="kashrus"]',
            dressCodeSkirt: 'input[name="skirtlength"]',
            dressCodeSleeve: 'input[name="sleevelength"]',
            hairCovering: 'input[name="haircovering"]'
        },

        modelEvents: {
            'change:shulFrequency': 'updateShulFrequency'
        },

        updateShulFrequency: function (model, val, options) {
            val = val == 'other' ? true : false;

            this.view.updateBoolean(val, ['', 'toggle-shul-other']);

            this.view.saveUserPrefs('shul', val ? 'toggle-shul-other' : '');
        }
    });
});