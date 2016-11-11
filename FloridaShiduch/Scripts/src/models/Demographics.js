define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        urlRoot: function () {
            return app.getApiRoot + 'Demographics/'
        },

        idAttribute: 'userId',

        validation: {
            firstName: { required: true },
            lastName: { required: true },
            gender: { required: true },
            address: { required: true },
            city: { required: true },
            state: { required: true },
            zip: {
                pattern: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                required: true,
                msg: 'Please provide a United States zip code. Zip + 4 are also accepted'
        },
            countryId: { required: false },
            homePhone: {
                pattern: /^[\W_]?\d?[\W_]{0,2}\d{3}[\W_]?\d{3}[\W_]?\d{4}/,
                required: false,
                msg: 'The number must include the area code, and must be a United States number'
            },
            workPhone: {
                pattern: /^[\W_]?\d?[\W_]{0,2}\d{3}[\W_]?\d{3}[\W_]?\d{4}/,
                required: false,
                msg: 'The number must include the area code, and must be a United States number'
            },
            mobilePhone: {
                pattern: /^[\W_]?\d?[\W_]{0,2}\d{3}[\W_]?\d{3}[\W_]?\d{4}/,
                required: true,
                msg: 'The number must include the area code, and must be a United States number'
            }
        }
    });
});