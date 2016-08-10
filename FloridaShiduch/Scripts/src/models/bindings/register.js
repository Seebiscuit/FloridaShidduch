define(['bindings', 'views/apply/Register'], function (Bindings, Register) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.email': {
            observe: 'email',
            setOptions: {
                validate: true
            }
        },
        '@ui.password': {
            observe: 'password',
            setOptions: {
                validate: true
            }
        },
        '@ui.confirmPassword': {
            observe: 'confirmPass',
            setOptions: {
                validate: true
            }
        },
    }, Register.prototype.ui);

    return bindings;
});