define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '#birthday': 'birthday',
        '#register-personal-height-feet': 'feet',
        '#register-personal-height-inches': 'inches',
        'input[name="register-build"]': 'build',
        '#register-personal-martialstatus': 'maritalStatus',
        '#input[name="register-personal-children"]': 'children',
        '#register-personal-children-number': 'childrenNumber',
        'input[name="register-personal-pet"]': 'pets',
        'input[name="register-personal-smoker"]': 'smoke'
    });


    return bindings;
});