define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: {
            rank: '#rank',
            name: '#register-reference-1-fullname',
            cityAndState: '#register-reference-1-location',
            phone: '#register-reference-1-phone',
            relationship: '#register-reference-1-relationship'
        }
    });
});