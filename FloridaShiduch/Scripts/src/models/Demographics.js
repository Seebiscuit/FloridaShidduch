define(['app', 'backbone'], function (app, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            apartment: '',
            city: '',
            state: '',
            zip: '',
            countryId: '',
            homePhone: '',
            workPhone: '',
            cellPhone: ''
        }
    });
});