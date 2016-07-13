define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        'input[name="register-lifestyle-learning"]': 'learnFrequency',
        'input[name="register-lifestyle-shul"]': 'shulFrequency',
        'input[name="register-lifestyle-kashrus"]': 'kashrus',
        'input[name="register-lifestyle-dress-skirt"]': 'dressCode',
        'input[name="register-lifestyle-dress-sleeve"]': 'dressCode',
        'input[name="register-lifestyle-hair"]': 'hairCovering'
    });

    return bindings;
});