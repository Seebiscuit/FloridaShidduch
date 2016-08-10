define(['bindings', 'behaviors/lifestyle'], function (Bindings, LifestyleBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.learnFrequency': {
            observe: 'learnFrequency',
            setOps: { validate: true }
        },
        '@ui.shulFrequency': {
            observe: 'shulFrequency',
            setOps: { validate: true }
        },
        '@ui.kashrus': {
            observe: 'kashrus',
            setOps: { validate: true }
        },
        '@ui.dressCodeSkirt': {
            observe: 'dressCode',
            setOps: { validate: true }
        },
        '@ui.dressCodeSleeve': {
            observe: 'dressCode',
            setOps: { validate: true }
        },
        '@ui.hairCovering': {
            observe: 'hairCovering',
            setOps: { validate: true }
        }
    }, LifestyleBehavior.prototype.ui);

    return bindings;
});