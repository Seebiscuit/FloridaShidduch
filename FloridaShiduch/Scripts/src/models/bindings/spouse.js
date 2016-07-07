define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        bindings: {
            '#register-spouse-age-min': 'minAge',
            '#register-spouse-age-max': 'maxAge',
            '#register-spouse-height-min-feet': 'minFeet',
            '#register-spouse-height-min-inches': 'minInches',
            '#register-spouse-height-max-feet': 'maxFeet',
            '#register-spouse-height-max-inches': 'maxInches',
            'input[name="register-spouse-maritalstatus"]': 'maritalStatus',
            'input[name="register-spouse-children"]': 'allowChildren',
            'input[name="register-spouse-hebrew-education"]': 'hebrewEducationLevel',
            'input[name="register-spouse-education"]': 'secularEducationLevel',
            'input[name="register-spouse-tv"]': 'tv',
            'input[name="register-spouse-relocate"]': 'relocate',
            'input[name="register-spouse-aliyah"]': 'aliyah'
        }
    });


    return bindings;
});