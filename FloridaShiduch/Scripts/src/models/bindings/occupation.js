define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings, jobTypeChecks, jobTypeOtherInput;

    bindings = new Bindings({
        'input[name="register-education-hebrew"]': 'hebrewEducationLevel',
        '#register-education-hebrew-yeshsemi-principal': 'yeshiva',
        '#register-education-hebrew-yeshsemi-location': 'yeshivaLocation',
        '#register-education-hebrew-israel': 'israelStudy',
        '#register-education-hebrew-israel-duration': 'isrealDuration',
        'input[name="register-education-secular"]': 'secularEducationLevel',
        '#register-education-secular-bachelors-name': 'college',
        '#register-education-secular-masters-name': 'college',
        '#register-education-secular-doctorate-name': 'college',
        '#register-education-secular-bachelors-degree': 'degree',
        '#register-education-secular-masters-degree': 'degree',
        '#register-education-secular-doctorate-degree': 'degree',
        '#register-occupation-working-firm': 'companyName',
        '#register-occupation-working-title': 'jobTitle'
    });

    jobTypeChecks = 'input[name="register-occupation"]',
    jobTypeOtherInput = '#register-occupation-other-describe';

    bindings.bindings[jobTypeChecks] = {
        observe: 'jobType',
        updateView: false,
        onSet: function (val, options) {
            var other = options.view.$(jobTypeOtherInput).val()

            val = _.without(val, 'other');
            return other && options.view.$('#register-occupation-other').is(':checked') ? val.concat(other) : val;
        }
    };

    bindings.bindings[jobTypeOtherInput] = {
        observe: 'jobType',
        updateView: false,
        onSet: function (val, options) {
            var checks = options.view.$(jobTypeChecks).filter(':checked').map(function () { return this.value }).get();

            return checks ? checks.push(val) : [val];
        }
    };

    return bindings;
});