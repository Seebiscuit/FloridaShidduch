define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        bindings: {
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
            'input[name="register-occupation"]': 'jobType',
            'input[name="register-other-describe"]': 'jobType',
            '#register-occupation-working-firm': 'companyName',
            '#register-occupation-working-title': 'jobTitle'
        }
    });

    return bindings;
});