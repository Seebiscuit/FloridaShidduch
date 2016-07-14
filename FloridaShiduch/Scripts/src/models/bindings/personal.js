define(['bindings', 'behaviors/personal'], function (Bindings, PersonalBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.birthday': 'birthday',
        '@ui.feet': 'feet',
        '@ui.inches': 'inches',
        '@ui.build': 'build',
        '@ui.maritalStatus': 'maritalStatus',
        '@ui.children': 'children',
        '@ui.childrenNumber': 'childrenNumber',
        '@ui.pets': 'pets',
        '@ui.smoke': 'smoke'
    }, PersonalBehavior.prototype.ui);


    return bindings;
});