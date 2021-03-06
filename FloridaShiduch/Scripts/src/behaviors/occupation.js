define(['marionette', "behaviors/ModelBehavior"], function (Marionette, ModelBehavior) {
    'use strict';
    return ModelBehavior.extend({
        ui: {
            hebrewEducationLevel: 'input[name="register-education-hebrew"]',
            yeshiva: '#register-education-hebrew-yeshsemi',
            yeshivaPrincipal: '#register-education-hebrew-yeshsemi-principal',
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
            occupationTypes: 'input[name="register-occupation"]',
            occupationTypeOther: '#register-occupation-other-describe'
        },

        modelEvents: {
            'change:hebrewEducationLevel': 'updateYeshiva',
            'change:israelStudy': 'updateIsraelStudy',
            'change:secularEducationLevel': 'updateCollege',
            'change:occupationTypes': 'updateOccupation',
        },

        updateYeshiva: function (model, val, options) {
            val = val == 'yeshiva';

            this.view.updateBoolean(val, ['', 'toggle-yeshiva']);

            this.view.saveUserPrefs('yeshiva', val ? 'toggle-yeshiva' : '');
        },

        updateIsraelStudy: function (model, val, options) {
            this.view.updateBoolean(val, ['', 'toggle-israel-study']);

            this.view.saveUserPrefs('israel-study', val ? 'toggle-israel-study' : '');
        },

        updateCollege: function (model, val, options) {
            var index, classes, remove,
                colleges = ['toggle-bachelors', 'toggle-masters', 'toggle-doctorate'];

            val = 'toggle-' + val;

            if ((index = colleges.indexOf(val)) + 1) {
                remove = colleges.slice(), remove.splice(index, 1);
                classes = [val, remove.join(' ')];
                val = false;
            } else {
                classes = [colleges.join(' '), ''];
                val = true;
            }

            this.view.updateBoolean(val, classes);

            this.view.saveUserPrefs('college', classes[Number(val)]);
        },

        updateOccupation: function (model, val, options) {
            var isWorking = val.some(function(o) { return o.type === 'working'; });
            var isOther = val.some(function(o) { return o.type === 'other'; });
            // Update 'working' inputs
            this.view.updateBoolean(isWorking, ['', 'toggle-working']);
            // Update 'other' inputs
            this.view.updateBoolean(isOther, ['', 'toggle-other-occupation']);

            this.view.saveUserPrefs('working', isWorking ? 'toggle-working' : '');
            this.view.saveUserPrefs('working',  isOther ? 'toggle-other-occupation' : '');
        }
    });
});