define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: {
            hebrewEducationLevel: 'input[name="register-education-hebrew"]',
            yeshiva: '#register-education-hebrew-yeshsemi-principal',
            yeshivaLocation: '#register-education-hebrew-yeshsemi-location',
            israelStudy: '#register-education-hebrew-israel',
            isrealDuration: '#register-education-hebrew-israel-duration',
            secularEducationLevel: 'input[name="register-education-secular"]',
            collegeBachelors: '#register-education-secular-bachelors-name',
            collegeMasters: '#register-education-secular-masters-name',
            collegeDoctorate: '#register-education-secular-doctorate-name',
            degreeBachelors: '#register-education-secular-bachelors-degree',
            degreeMasters: '#register-education-secular-masters-degree',
            degreeDoctorate: '#register-education-secular-doctorate-degree',
            companyName: '#register-occupation-working-firm',
            jobTitle: '#register-occupation-working-title',
            jobType: 'input[name="register-occupation"]',
            jobTypeOther: '#register-occupation-other-describe'
        },

        modelEvents: {
            'change:hebrewEducationLevel': 'updateYeshiva',
            'change:israelStudy': 'updateIsraelStudy',
            'change:secularEducationLevel': 'updateCollege',
            'change:jobType': 'updateOccupation'
        },

        updateYeshiva: function (model, val, options) {
            val = val == 'yeshiva' ? true : false;
            this.view.updateBoolean(val, ['yeshiva', '']);
        },

        updateIsraelStudy: function (model, val, options) {
            this.view.updateBoolean(val, ['israel-study', '']);
        },

        updateCollege: function (model, val, options) {
            var index, classes, remove,
                colleges = ['bachelors', 'masters', 'doctorate'];

            if ((index = colleges.indexOf(val)) + 1) {
                remove = colleges.slice(), remove.splice(index, 1);
                classes = [val, remove.join(' ')];
                val = true;
            } else {
                classes = [colleges.join(' '), ''];
                val = false;
            }

            this.view.updateBoolean(val, classes);
        },

        updateOccupation: function (model, val, options) {
            // Update 'working' inputs
            this.view.updateBoolean(!!(val.indexOf('working') + 1), ['working', '']);
            // Update 'other' inputs
            this.view.updateBoolean(!!(val.indexOf('other') + 1), ['other-occupation', '']);
        }
    });
});