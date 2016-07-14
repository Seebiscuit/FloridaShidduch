define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: {
            minAge: '#register-spouse-age-min',
            maxAge: '#register-spouse-age-max',
            minFeet: '#register-spouse-height-min-feet',
            minInches: '#register-spouse-height-min-inches',
            maxFeet: '#register-spouse-height-max-feet',
            maxInches: '#register-spouse-height-max-inches',
            maritalStatus: 'input[name="register-spouse-maritalstatus"]',
            allowChildren: 'input[name="register-spouse-children"]',
            hebrewEducationLevel: 'input[name="register-spouse-hebrew-education"]',
            secularEducationLevel: 'input[name="register-spouse-education"]',
            tv: 'input[name="register-spouse-tv"]',
            relocate: 'input[name="register-spouse-relocate"]',
            aliyah: 'input[name="register-spouse-aliyah"]'
        }
    });
});