define(['bindings', 'behaviors/background'], function (Bindings, BackgroundBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.bornJewish': {
            observe: 'bornJewish',
            setOps: { validate: true }
        },
        '@ui.conversionInfo': {
            observe: 'conversionInfo',
            setOps: { validate: true }
        },
        '@ui.baalTeshuva': {
            observe: 'baalTeshuva',
            setOps: { validate: true }
        },
        '@ui.btTime': {
            observe: 'btTime',
            setOps: { validate: true }
        },
        '@ui.isKohen': {
            observe: 'isKohen',
            setOps: { validate: true }
        },
        '@ui.marryCohen': {
            observe: 'marryCohen',
            setOps: { validate: true }
        },
        '@ui.ethnicity': {
            observe: 'ethnicity',
            setOps: { validate: true }
        },
        '@ui.observance': {
            observe: 'observance',
            setOps: { validate: true }
        }
    }, BackgroundBehavior.prototype.ui);

    return bindings;
});