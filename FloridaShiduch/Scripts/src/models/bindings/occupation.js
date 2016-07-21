define(['bindings', 'behaviors/occupation'], function (Bindings, OccupationBehavior) {
    'use strict';
    // Singleton
    var bindings, jobTypeChecks, jobTypeOtherInput;

    bindings = new Bindings({
        '@ui.hebrewEducationLevel': 'hebrewEducationLevel',
        '@ui.yeshiva': 'yeshiva',
        '@ui.yeshivaLocation': 'yeshivaLocation',
        '@ui.israelStudy': 'israelStudy',
        '@ui.isrealDuration': 'isrealDuration',
        '@ui.secularEducationLevel': 'secularEducationLevel',
        '@ui.collegeBachelors': {
            observe: 'college',
            updateView: false
        },
        '@ui.collegeMasters': {
            observe: 'college',
            updateView: false
        },
        '@ui.collegeDoctorate': {
            observe: 'college',
            updateView: false
        },
        '@ui.degreeBachelors': {
            observe: 'degree',
            updateView: false
        },
        '@ui.degreeMasters': {
            observe: 'degree',
            updateView: false
        },
        '@ui.degreeDoctorate': {
            observe: 'degree',
            updateView: false
        },
        '@ui.companyName': 'companyName',
        '@ui.jobTitle': 'jobTitle',
        '@ui.jobType': {
            observe: 'jobType',
            updateView: false,
            onSet: function (val, options) {
                var other = options.view.$(jobTypeOtherInput).val()

                val = _.without(val, 'other');
                return other && options.view.$('#register-occupation-other').is(':checked') ? val.concat(other) : val;
            }
        },
        '@ui.jobTypeOther': {
            observe: 'jobType',
            updateView: false,
            onSet: function (val, options) {
                var checks = options.view.$(jobTypeChecks).filter(':checked').map(function () { return this.value }).get();

                return checks ? checks.push(val) : [val];
            }
        }
    }, OccupationBehavior.prototype.ui);

    return bindings;
});