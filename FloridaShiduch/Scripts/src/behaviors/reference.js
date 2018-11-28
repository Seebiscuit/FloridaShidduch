define(['marionette', "behaviors/ModelBehavior"], function (Marionette, ModelBehavior) {
    'use strict';
    return ModelBehavior.extend({
        ui: {
            name: '#register-reference-fullname',
            cityAndState: '#register-reference-location',
            phone: '#register-reference-phone',
            relationship: '#register-reference-relationship'
        }
    });
});