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
            background: '#apply-background',
            essays: '#apply-essays',
            lifestyle: '#apply-lifestyle',
            occupation: '#apply-occupation',
            personal: '#apply-personal',
            references: '#apply-references',
            spouse: '#apply-spouse',
        },

        viewOptions: ['page'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);
        },

        onBeforeShow: function () {
            // TODO: If registered ? go to this.page : register
            //this.showView('views/apply/Register', this.getRegion('registration'));
            this.showQuestionnaireModule(this.page);
        },

        onShowPage: function (page) {
            this.page = page;
            // TODO Check if regsitered then go to page
            // TODO: No page == default ==> current progress
            this.showQuestionnaireModule(page);
        },

        showQuestionnaireModule: function (type) {
            var modelType = _.capitalize(type, true);

            this.showView([
                'views/apply/Questionnaire'
                , 'models/' + modelType
                , 'models/bindings/' + type], this.getRegion(type), { type: type });
        }
    });
});
