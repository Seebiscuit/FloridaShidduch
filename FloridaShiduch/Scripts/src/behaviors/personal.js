define(['marionette', "behaviors/ModelBehavior"], function (Marionette, ModelBehavior) {
    'use strict';
    return ModelBehavior.extend({
        ui: {
            birthday: '#birthday',
            feet: '#register-personal-height-feet',
            inches: '#register-personal-height-inches',
            build: 'input[name="register-build"]',
            maritalStatus: '#register-personal-martialstatus',
            children: 'input[name="register-personal-children"]',
            childrenNumber: '#register-personal-children-number',
            pets: 'input[name="register-personal-pet"]',
            smoke: 'input[name="register-personal-smoker"]'
        },

        modelEvents: {
            'change:children': 'updateChildren'
        },

        updateChildren: function (model, val, options) {
            this.view.updateBoolean(val, ['', 'toggle-children']);
        },
    });
});