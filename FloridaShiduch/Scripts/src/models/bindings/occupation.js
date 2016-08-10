define(['bindings', 'behaviors/occupation'], function (Bindings, OccupationBehavior) {
    'use strict';
    // Singleton
    var bindings, jobTypeChecks, jobTypeOtherInput;

    bindings = new Bindings({
        '@ui.hebrewEducationLevel': {
            observe: 'hebrewEducationLevel',
            setOps: { validate: true }
        },
        '@ui.yeshiva': {
            observe: 'yeshiva',
            setOps: { validate: true }
        },
        '@ui.yeshivaPrincipal': {
            observe: 'yeshivaPrincipal',
            setOps: { validate: true }
        },
        '@ui.yeshivaLocation': {
            observe: 'yeshivaLocation',
            setOps: { validate: true }
        },
        '@ui.israelStudy': {
            observe: 'israelStudy',
            setOps: { validate: true }
        },
        '@ui.isrealDuration': {
            observe: 'isrealDuration',
            setOps: { validate: true }
        },
        '@ui.secularEducationLevel': {
            observe: 'secularEducationLevel',
            setOps: { validate: true }
        },
        '@ui.collegeBachelors': {
            observe: 'college',
            updateView: false,
            setOps: { validate: true }
        },
        '@ui.collegeMasters': {
            observe: 'college',
            updateView: false,
            setOps: { validate: true }
        },
        '@ui.collegeDoctorate': {
            observe: 'college',
            updateView: false,
            setOps: { validate: true }
        },
        '@ui.degreeBachelors': {
            observe: 'degree',
            updateView: false,
            setOps: { validate: true }
        },
        '@ui.degreeMasters': {
            observe: 'degree',
            updateView: false,
            setOps: { validate: true }
        },
        '@ui.degreeDoctorate': {
            observe: 'degree',
            updateView: false,
            setOps: { validate: true }
        },
        '@ui.companyName': {
            observe: 'companyName',
            setOps: { validate: true }
        },
        '@ui.jobTitle': {
            observe: 'jobTitle',
            setOps: { validate: true }
        },
        '@ui.jobType': {
            observe: 'jobType',
            updateView: false,
            onSet: function (val, options) {
                return val;
               /* var other = options.view.ui.jobTypeOtherDesc.val()

                val = _.without(val, 'other');
                return (other && options.view.$('#register-occupation-other').is(':checked')) ? val.concat(other) : val; */
            },
            setOps: { validate: true }
        },
        '@ui.jobTypeOther': {
            observe: 'jobType',
            updateView: false,
            onSet: function (val, options) {
                return val;
               /* var checks = options.view.ui.jobType.filter(':checked').map(function () { return this.value }).get();

                return checks ? checks.push(val) : [val]; */
            },
            setOps: { validate: true }
        }
    }, OccupationBehavior.prototype.ui);

    return bindings;
});