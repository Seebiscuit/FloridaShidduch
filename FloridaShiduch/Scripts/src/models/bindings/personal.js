define(['bindings', 'behaviors/personal'], function (Bindings, PersonalBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.birthday': {
            observe: 'birthday',
            setOps: { validate: true }
        },
        '@ui.feet': {
            observe: 'feet',
            setOps: { validate: true }
        },
        '@ui.inches': {
            observe: 'inches',
            setOps: { validate: true }
        },
        '@ui.build': {
            observe: 'build',
            setOps: { validate: true }
        },
        '@ui.maritalStatus': {
            observe: 'maritalStatus',
            setOps: { validate: true }
        },
        '@ui.children': {
            observe: 'children',
            setOps: { validate: true }
        },
        '@ui.childrenNumber': {
            observe: 'childrenNumber',
            setOps: { validate: true }
        },
        '@ui.pets': {
            observe: 'pets',
            setOps: { validate: true }
        },
        '@ui.smoke': {
            observe: 'smoke',
            setOps: { validate: true }
        }
    }, PersonalBehavior.prototype.ui);


    return bindings;
});