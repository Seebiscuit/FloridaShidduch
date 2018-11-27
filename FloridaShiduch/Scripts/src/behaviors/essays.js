define(['marionette', "behaviors/ModelBehavior"], function (Marionette, ModelBehavior) {
    'use strict';
    return ModelBehavior.extend({
        ui: {
            character: '#register-essays-character',
            spouseCharacter: '#register-essays-spouse-character',
            specialInterests: '#register-essays-specialinterests'
        }
    });
});