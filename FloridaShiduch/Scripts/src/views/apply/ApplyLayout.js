define([
    'masterlayout'
    , 'templates'
],

function (MasterLayout, templates) {
    return MasterLayout.extend({
        template: templates.apply.layout,

        regions: {
            registration: '#apply-registration'
        },

        initialize: function (options) {

        },

        onBeforeShow: function () {
            this.showView('views/apply/Register', this.getRegion('registration'));
        }



    });
});
