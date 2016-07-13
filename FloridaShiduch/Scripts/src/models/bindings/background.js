define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        'input[name="register-background-jfb"]': 'bornJewish',
        '#register-background-conversion': 'conversionInfo',
        'input[name="register-background-bt"]': 'baalTeshuva',
        '#register-background-bt-years': 'btTime',
        'input[name="register-background-kohen"]': 'isKohen',
        'input[name="register-background-marrykohen"]': 'marryCohen',
        '#register-background-ethnicity': 'ethnicity',
        '#register-background-observance': 'observance'
    });

    return bindings;
});