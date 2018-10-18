define(['bindings', 'behaviors/reference'], function (Bindings, ReferenceBehavior) {
    'use strict';
    // Singleton
    return new Bindings({
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
        }
    }, ReferenceBehavior.prototype.ui);
});