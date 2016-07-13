define([
    'masterlayout'
    , 'templates'
    , 'slider'
],

function (MasterLayout, templates) {
    return MasterLayout.extend({
        template: templates.apply.layout,

        id: 'apply-regions',

        regions: {
            registration: '#apply-registration',
            demographics: '#apply-demographics',
            background: '#apply-background',
            essays: '#apply-essays',
            lifestyle: '#apply-lifestyle',
            occupation: '#apply-occupation',
            personal: '#apply-personal',
            references: '#apply-references',
            spouse: '#apply-spouse'
        },

        ui: {
            //** REGIONS
            registration: '#apply-registration',
            demographics: '#apply-demographics',
            background: '#apply-background',
            essays: '#apply-essays',
            lifestyle: '#apply-lifestyle',
            occupation: '#apply-occupation',
            personal: '#apply-personal',
            references: '#apply-references',
            spouse: '#apply-spouse',
            //** UI
            slider: 'input[type=range]'
        },

        events: {
            'change @ui.slider': 'onSliderChange'
        },

        viewOptions: ['page'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);

            this.pageOrder = this.pageOrder();
        },

        onBeforeShow: function () {
            // TODO: If registered ? go to this.page : register
            //this.showView('views/apply/Register', this.getRegion('registration'));
            this.showQuestionnaireModule(this.page);
        },

        onAttach: function () {
            this.ui.slider.rangeslider({ polyfill: false });
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
                , 'models/bindings/' + type
                , 'events/' + type], this.getRegion(type), { type: type, $el: this.ui[type] });

            this.seekSlider(type);
        },

        onSliderChange: function (e) {
            location = '#apply/' + this.pageOrder[(this.currentSlidePos = this.ui.slider.val())];
        },

        onSlide: function (e) {
            if (!false) {
                this.ui.slider.val(this.currentSlidePos);
                this.ui.slider.rangeslider('handleEnd', e);
            }
        },

        seekSlider: function (type) {
            this.ui.slider.val(this.pageOrder.indexOf(type));
        },

        pageOrder: function () {
            return [
                'demographics',
                'background',
                'lifestyle',
                'occupation',
                'personal',
                'spouse',
                'references',
                'essays'
            ]
        }
    });
});
