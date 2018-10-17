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
            yeshivaPrincipal: { required: false, dependsOn: 'yeshiva' },
            yeshivaLocation: { required: false, dependsOn: 'yeshiva' },
            israelStudy: { required: false },
            isrealDuration: { required: false, dependsOn: 'israelStudy' },
            secularEducationLevel: { required: false },
            collegeBachelors: { required: false },
            collegeMasters: { required: false },
            collegeDoctorate: { required: false },
            degreeBachelors: { required: false, dependsOn: 'collegeBachelors' },
            degreeMasters: { required: false, dependsOn: 'collegeMasters' },
            degreeDoctorate: { required: false, dependsOn: 'collegeDoctorate' },
            companyName: { required: false, dependsOn: 'occupationTypes.working' },
            jobTitle: { required: false, dependsOn: 'occupationTypes.working' },
            occupationTypes: { required: false },
            occupationTypeOther: {
                required: function (value, attr, computedState) {
                    return (this.get('occupationTypes') || []).some(function (type) {
                        return type === 'other';
                    });
                },
                msg: 'Please, enter an occupation or uncheck \'Other\'',
                dependsOn: 'occupationTypes.other'
            }
        }
    });
});