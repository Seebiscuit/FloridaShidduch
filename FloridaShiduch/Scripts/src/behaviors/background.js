define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: {
            bornJewish: 'input[name="register-background-jfb"]',
            conversionInfo: '#register-background-conversion',
            baalTeshuva: 'input[name="register-background-bt"]',
            btTime: '#register-background-bt-years',
            isKohen: 'input[name="register-background-kohen"]',
            marryCohen: 'input[name="register-background-marrykohen"]',
            ethnicity: '#register-background-ethnicity',
            observance: '#register-background-observance'
        }
    });

});