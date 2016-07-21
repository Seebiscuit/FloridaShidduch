define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: {
            learnFrequency: 'input[name="register-lifestyle-learning"]',
            shulFrequency: 'input[name="register-lifestyle-shul"]',
            kashrus: 'input[name="register-lifestyle-kashrus"]',
            dressCodeSkirt: 'input[name="register-lifestyle-dress-skirt"]',
            dressCodeSleeve: 'input[name="register-lifestyle-dress-sleeve"]',
            hairCovering: 'input[name="register-lifestyle-hair"]'
        },

        modelEvents: {
            'change:shulFrequency': 'updateShulFrequency'
        },

        updateShulFrequency: function (model, val, options) {
            val = val == 'other' ? true : false;
            this.updateBoolean(val, ['other-shul', '']);
        }
    });
});