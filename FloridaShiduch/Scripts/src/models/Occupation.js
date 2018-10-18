define(['app', 'backbone', 'models/AuthenticatedModel'], function (app, Backbone, AuthenticatedModel) {
    return AuthenticatedModel.extend({
        idAttribute: 'userId',

        urlRoot: function () {
            return app.getApiRoot + 'Occupations/';
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id + '?occupationtype=' + this.get('occupationType');
        },

        validation: {
            hebrewEducationLevel: { required: false },
            yeshiva: { required: false },
            yeshivaPrincipal: { required: false },
            yeshivaLocation: { required: false },
            israelStudy: { required: false },
            isrealDuration: { required: false },
            secularEducationLevel: { required: false },
            collegeBachelors: { required: false },
            collegeMasters: { required: false },
            collegeDoctorate: { required: false },
            degreeBachelors: { required: false },
            degreeMasters: { required: false },
            degreeDoctorate: { required: false },
            companyName: { required: false },
            jobTitle: { required: false },
            occupationTypes: { required: false },
            occupationTypeOther: {
                required: function (value, attr, computedState) {
                    return (this.get('occupationTypes') || []).some(function (type) {
                        return type === 'other';
                    });
                },
                msg: 'Please, enter an occupation or uncheck \'Other\''
            }
        },

        validationDependencies: {
            yeshivaPrincipal: 'yeshiva',
            yeshivaLocation: 'yeshiva',
            degreeBachelors: 'collegeBachelors',
            degreeMasters: 'collegeMasters',
            degreeDoctorate: 'collegeDoctorate',
            companyName: 'occupationTypes.working',
            jobTitle: 'occupationTypes.working',
            occupationTypeOther:'occupationTypes.other'
        }
    });
});