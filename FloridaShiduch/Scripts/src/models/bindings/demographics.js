define(['bindings', 'behaviors/demographics'], function (Bindings, DemographicsBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.firstName': 'firstName',
        '@ui.lastName': 'lastName',
        '@ui.gender': {
            observe: 'gender',
            afterUpdate: 'setGender'
        },
        '@ui.address': 'address',
        '@ui.apartment': 'apartment',
        '@ui.city': 'city',
        '@ui.state': 'state',
        '@ui.zip': 'zip',
        //countryId: 'countryId',
        '@ui.homePhone': 'homePhone',
        '@ui.workPhone': 'workPhone',
        '@ui.mobilePhone': 'mobilePhone'
    }, DemographicsBehavior.prototype.ui);

    bindings.setGender = function ($el, val, options) {
        var gender = ['male', 'female'],
            index = gender.indexOf(val);

        $el.removeClass(gender[Number(!index)]).addClass(val);
    };

    return bindings;
});