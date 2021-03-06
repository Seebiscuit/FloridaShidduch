define(['marionette', "behaviors/ModelBehavior", 'upload-file'], function (Marionette, ModelBehavior, UploadFile) {
    'use strict';
    return ModelBehavior.extend({
        ui: {
            firstName: '#register-fname',
            lastName: '#register-lname',
            gender: 'input[name="register-gender"]',
            address: '#register-address-home',
            apartment: '#register-address-apt',
            city: '#register-address-city',
            state: '#register-address-state',
            zip: '#register-address-zip',
            homePhone: '#register-contact-home',
            workPhone: '#register-contact-work',
            mobilePhone: '#register-contact-mobile'
        },

        modelEvents: {
            'change:gender': 'updateGender'
        },

        updateGender: function (model, val, options) {
            var gender = ['male', 'female'],
                index = gender.indexOf(val);

            this.view.updateBoolean(!!index, gender);

            this.view.saveUserPrefs('gender', val);
        },

        behaviors: function () { 
            return {
                UploadFile: {
                    behaviorClass: UploadFile
                }
            }
        }
    });
});