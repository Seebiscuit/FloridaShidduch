define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        bindings: {
            '#register-fname': 'firstName',
            '#register-lname': 'lastName',
            'input[name="register-gender"]': 'gender',
            '#register-address-home': 'address',
            '#register-address-apt': 'apartment',
            '#register-address-city': 'city',
            '#register-address-state': 'state',
            '#register-address-zip': 'zip',
            //countryId: 'countryId',
            '#register-contact-home': 'homePhone',
            '#register-contact-work': 'workPhone',
            '#register-contact-mobile': 'mobilePhone'
        }
    });


    return bindings;
});