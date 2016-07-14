define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: {
            character: '#register-essays-character',
            spouseCharacter: '#register-essays-spouse-character',
            specialInterests: '#register-essays-specialinterests'
        }
    });
});