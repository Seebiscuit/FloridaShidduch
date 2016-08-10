define(['bindings', 'behaviors/demographics'], function (Bindings, DemographicsBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.firstName': {
            observe: 'firstName',
            setOps: { validate: true }
        },
        '@ui.lastName': {
            observe: 'lastName',
            setOps: { validate: true }
        },
        '@ui.gender': {
            observe: 'gender',
            setOps: { validate: true }
        },
        '@ui.address': {
            observe: 'address',
            setOps: { validate: true }
        },
        '@ui.apartment': {
            observe: 'apartment',
            setOps: { validate: true }
        },
        '@ui.city': {
            observe: 'city',
            setOps: { validate: true }
        },
        '@ui.state': {
            observe: 'state',
            setOps: { validate: true }
        },
        '@ui.zip': {
            observe: 'zip',
            setOps: { validate: true }
        },
        //countryId: 'countryId',
        '@ui.homePhone': {
            observe: 'homePhone',
            setOps: { validate: true }
        },
        '@ui.workPhone': {
            observe: 'workPhone',
            setOps: { validate: true }
        },
        '@ui.mobilePhone': {
            observe: 'mobilePhone',
            setOps: { validate: true }
        }
    }, DemographicsBehavior.prototype.ui);

    return bindings;
});