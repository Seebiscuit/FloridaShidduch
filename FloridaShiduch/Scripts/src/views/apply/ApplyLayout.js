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
            tracker: '.progress-meter > li'
            //slider: 'input[type=range]'
        },

        //events: {
        //    //'change @ui.slider': 'onSliderChange'
        //},

        viewOptions: ['page'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);

            this.pageOrder = this.pageOrder();
        },

        onBeforeShow: function () {
            // TODO: If registered ? go to this.page : register
            this.showRegister();
        },

        onAttach: function () {
            this.setupTracker();
            //this.ui.slider.rangeslider({ polyfill: false });
        },

        setupTracker: function () {
            var tracker = this.ui.tracker,
                eventSuffix = '.fsi.apply',
                view = this;

            tracker.on('click' + eventSuffix, function onTrackerClick(e) {
                var $el = $(this);
                $el.addClass('highlight');
                location = '#apply/' + view.pageOrder[(view.currentSlidePos = $(this).index())];
            })
        },

        onShowPage: function (page) {
            this.page = page;
            // TODO Check if registered then go to page
            // TODO: No page == default ==> current progress
            this.showQuestionnaireModule(page);
        },

        showRegister: function (type) {
            this.showView(['views/apply/Register'], this.getRegion('registration'), { $el: this.ui.registration });
        },

        showQuestionnaireModule: function (type) {
            var modelType = _.capitalize(type, true);

            if (this.pageOrder.indexOf(type) < 0)
                // If the page isn't an application page, return
                return;

            this.showView([
                'views/apply/Questionnaire'
                , 'models/' + modelType
                , 'behaviors/' + type
                , 'models/bindings/' + type], this.getRegion(type), { type: type, $el: this.ui[type] });

            this.seekTracker(type);
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

        seekTracker: function (type) {
            this.ui.tracker.eq(this.pageOrder.indexOf(type)).addClass('highlight');
        },

        pageOrder: function () {
            return [
                'demographics',
                'background',
                'lifestyle',
                'occupation',
                'personal',
                'essays',
                'spouse',
                'references'
            ]
        },

        onDestroy: function () {
            this.ui.tracker.off('fsi.apply');
        }
    });
});
