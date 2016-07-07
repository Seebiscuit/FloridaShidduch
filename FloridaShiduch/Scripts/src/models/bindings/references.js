define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        bindings: {
            '#rank': 'rank',
            '#register-reference-1-fullname': 'name',
            '#register-reference-1-location': 'cityAndState',
            '#register-reference-1-phone': 'phone',
            '#register-reference-1-relationship': 'relationship',
        }
    });


    return bindings;
});