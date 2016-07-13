define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '#register-fname': 'firstName',
        '#register-lname': 'lastName',
        'input[name="register-gender"]': {
            observe: 'gender',
            afterUpdate: 'setGender'
        },
        '#register-address-home': 'address',
        '#register-address-apt': 'apartment',
        '#register-address-city': 'city',
        '#register-address-state': 'state',
        '#register-address-zip': 'zip',
        //countryId: 'countryId',
        '#register-contact-home': 'homePhone',
        '#register-contact-work': 'workPhone',
        '#register-contact-mobile': 'mobilePhone'
    });

    bindings.setGender = function ($el, val, options) {
        var gender = ['male', 'female'],
            index = gender.indexOf(val);

        $el.removeClass(gender[Number(!index)]).addClass(val);
    };

    return bindings;
});