define(['bindings', 'behaviors/references'], function (Bindings, ReferencesBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.rank': {
            observe: 'rank',
            setOps: { validate: true }
        },
        '@ui.name': {
            observe: 'name',
            setOps: { validate: true }
        },
        '@ui.cityAndState': {
            observe: 'cityAndState',
            setOps: { validate: true }
        },
        '@ui.phone': {
            observe: 'phone',
            setOps: { validate: true }
        },
        '@ui.relationship': {
            observe: 'relationship',
            setOps: { validate: true }
        },
    }, ReferencesBehavior.prototype.ui);


    return bindings;
});