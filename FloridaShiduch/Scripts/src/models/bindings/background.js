define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        bindings: {
            'input[name="register-background-jfb"]': 'bornJewish',
            '#register-background-conversion': 'conversionInfo',
            'input[name="register-background-time"]': 'baalTeshuva',
            '#register-background-fyear': 'btTime',
            'input[name="register-background-kohen"]': 'isKohen',
            'input[name="register-background-marrykohen"]': 'marryCohen',
            '#register-background-ethnicity': 'ethnicity',
            '#register-background-observance': 'observance'
        }
    });

    return bindings;
});