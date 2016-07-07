define(function (require) {
    "use strict";
    return {
        apply: {
            layout: _.template(require('text!templates/apply/apply-layout.html')),
            register: _.template(require('text!templates/apply/apply-register.html')),
            demographics: _.template(require('text!templates/apply/apply-demographics.html')),
        }
    };
});
