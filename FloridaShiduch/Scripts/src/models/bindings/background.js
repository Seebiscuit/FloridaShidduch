define(['bindings', 'behaviors/background'], function (Bindings, BackgroundBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.bornJewish': {
            observe: 'bornJewish',
            onSet: 'bindings.returnBool',
            setOps: { validate: true }
        },
        '@ui.conversionInfo': {
            observe: 'conversionInfo',
            setOps: { validate: true }
        },
        '@ui.baalTeshuva': {
            observe: 'baalTeshuva',
            onSet: 'bindings.returnBool',
            setOps: { validate: true }
        },
        '@ui.btTime': {
            observe: 'btTime',
            setOps: { validate: true }
        },
        '@ui.isKohen': {
            observe: 'isKohen',
            onSet: 'bindings.returnBool',
            setOps: { validate: true }
        },
        '@ui.marryCohen': {
            observe: 'marryCohen',
            onSet: 'bindings.returnBool',
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
    },
    BackgroundBehavior.prototype.ui,
    {
        methods: {
            returnBool: function (val, options) {
                if (val === "false" || val === "0" || val === 0 || val === false)
                    return false;

                return true;
            }
        }
    });

    return bindings;
});