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
        }
    });
});