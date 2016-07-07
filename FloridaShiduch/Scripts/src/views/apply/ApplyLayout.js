define([
    'masterlayout'
    , 'templates'
],

function (MasterLayout, templates) {
    return MasterLayout.extend({
        template: templates.apply.layout,

        regions: {
            registration: '#apply-registration',
            demographics: '#apply-demographics',
        },

        initialize: function (options) {

        },

        onBeforeShow: function () {
            //this.showView('views/apply/Register', this.getRegion('registration'));
            var type = 'demographics';
            this.showView([
                'views/apply/Questionnaire'
                ,'models/Demographics'
                , 'models/bindings/' + type], this.getRegion(type), { type: type });
        }
    });
});
