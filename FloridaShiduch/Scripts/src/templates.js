define(function (require) {
    "use strict";
    return {
        apply: {
            start: _.template(require('text!templates/start-profile.html')),
            edit: _.template(require('text!templates/edit-profile.html')),

            layout: _.template(require('text!templates/apply/apply-layout.html')),
            register: _.template(require('text!templates/apply/apply-register.html')),
            questionnaireCollectionLayout: _.template(require('text!templates/apply/apply-questionnaire-layout.html')),

            demographics: _.template(require('text!templates/apply/apply-demographics.html')),
            background: _.template(require('text!templates/apply/apply-background.html')),
            essays: _.template(require('text!templates/apply/apply-essays.html')),
            lifestyle: _.template(require('text!templates/apply/apply-lifestyle.html')),
            occupation: _.template(require('text!templates/apply/apply-occupation.html')),
            reference: _.template(require('text!templates/apply/apply-reference.html')),
            spouse: _.template(require('text!templates/apply/apply-spouse.html')),
            personal: _.template(require('text!templates/apply/apply-personal.html')),
        }
    };
});
