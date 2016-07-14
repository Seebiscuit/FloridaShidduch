define(['bindings', 'behaviors/background'], function (Bindings, BackgroundBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.bornJewish': 'bornJewish',
        '@ui.conversionInfo': 'conversionInfo',
        '@ui.baalTeshuva': 'baalTeshuva',
        '@ui.btTime': 'btTime',
        '@ui.isKohen': 'isKohen',
        '@ui.marryCohen': 'marryCohen',
        '@ui.ethnicity': 'ethnicity',
        '@ui.observance': 'observance'
    }, BackgroundBehavior.prototype.ui);

    return bindings;
});