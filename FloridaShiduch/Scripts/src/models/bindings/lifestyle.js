define(['bindings', 'behaviors/lifestyle'], function (Bindings, LifestyleBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.learnFrequency': 'learnFrequency',
        '@ui.shulFrequency': 'shulFrequency',
        '@ui.kashrus': 'kashrus',
        '@ui.dressCode': 'dressCode',
        '@ui.dressCode': 'dressCode',
        '@ui.hairCovering': 'hairCovering'
    }, LifestyleBehavior.prototype.ui);

    return bindings;
});