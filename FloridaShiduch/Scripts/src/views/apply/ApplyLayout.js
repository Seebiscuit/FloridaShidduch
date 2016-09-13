define(['app'
    , 'masterlayout'
    , 'templates'
    , 'store'
    , 'slider'
],

function (app, MasterLayout, templates, store) {
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
            //** Tracker
            registrationMeter: '#meter-registration',
            demographicsMeter: '#meter-demographics',
            backgroundMeter: '#meter-background',
            essaysMeter: '#meter-essays',
            lifestyleMeter: '#meter-lifestyle',
            occupationMeter: '#meter-occupation',
            personalMeter: '#meter-personal',
            referencesMeter: '#meter-references',
            spouseMeter: '#meter-spouse',
            //** UI
            tracker: '.progress-meter > li'
        },

        viewOptions: ['page'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);

            this.user = this.state.login;

            this.pageOrder = _.result(this, 'pageOrder');

            this.listenTo(app.radio.view.rootRadio.vent, 'module:set-status', this.setProgress);
        },

        onBeforeShow: function () {
            this.showQuestionnaireModule(this.page);
        },

        goToLastProgress: function (isinit) {
            var firstTodo;

            firstTodo = this._setTrackerStatus() || this.pageOrder[0];

            if (location.hash.indexOf('#apply/' + firstTodo) > -1)
                // already at this todo, just show it
                this.showQuestionnaireModule(firstTodo);
            else
                location = '#apply/' + firstTodo;
        },

        setProgress: function (module, status) {
            store.setItem('progress.' + this.user.get('escapedUserName') + '.' + module + '.status', status);

            if (status) this.ui[(module + 'Meter')].addClass('complete');
        },

        onAttach: function () {
            this.setupTracker();
        },

        setupTracker: function () {
            var tracker = this.ui.tracker,
                eventSuffix = '.fsi.apply',
                view = this;

            tracker.on('click' + eventSuffix, function onTrackerClick(e) {
                var $el = $(this);
                $el.addClass('active');
                location = '#apply/' + view.pageOrder[(view.currentSlidePos = $(this).index())];
            })
        },

        onShowPage: function (module) {
            this.showQuestionnaireModule(module);
        },

        showRegister: function (module) {
            this.$el.removeClass('applying');
            this.showView(['views/apply/Register', 'models/bindings/register'], this.getRegion('registration'), { $el: this.ui.registration, wantsLogin: module == "login"});
        },

        showQuestionnaireModule: function (module, isinit) {
            var modelName = _.capitalize(module, true)
            index = this.pageOrder.indexOf(module),
            transition = [];

            if (module == 'login' || module == 'register' || !this.user.isLoggedIn())
                return this.showRegister(module);
            else if (index < 0)
                // If the page isn't an application page...
                return this.goToLastProgress();

            this.$el.addClass('applying');

            this.index = index; // Know the last index

            this.showView([
                'views/apply/Questionnaire'
                , 'models/' + modelName
                , 'behaviors/' + module
                , 'models/bindings/' + module], this.getRegion(module), { module: module, $el: this.ui[module] });

            if (!isinit) this.seekTracker(module);  // Tracker set on init;
        },

        showView: function (modulearray, region, options) {
            var fadeOut;
            return new Promise(function (resolve, reject) {
                require(modulearray, function (View, Model, Behavior, bindings) {
                    
                    fadeOut = this.$('> div.fadeIn')
                    
                    _.defer(showView.bind(this, View, Model, Behavior, bindings));

                    fadeOut.removeClass('fadeIn').addClass('fadeOut');

                }.bind(this));

                function showView(View, Model, Behavior, bindings) {
                    if (Model.getBindings)
                        // Register uses this pattern
                        bindings = Model, Model = null;

                    _.extend(options || {}, {
                        model: Model && new Model,
                        bindings: bindings && bindings.getBindings(),
                        behaviors: { behavior: Behavior, name: options.module },
                        $parentEl: this.$el
                    });

                    region.view = new View(options);
                    region.show(region.view);

                    _.delay(options.$el[0].scrollIntoView.bind(options.$el[0]), 10);

                    options.$el.removeClass('fadeOut').addClass('fadeIn');

                    resolve();
                }
            }.bind(this));
        },

        seekTracker: function (module) {
            this._setTrackerStatus(module);
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

        _setTrackerStatus: function (module) {
            var firstTodo, progress = store.getItem('progress.' + this.user.get('escapedUserName'));

            if (!progress) {
                this.setProgress(this.pageOrder[0], false);
                return this._setTrackerStatus();
            }
            else {
                _.each(this.pageOrder, function (mod, i) {
                    if (progress[mod]) {
                        if (!progress[mod].status) {
                            // False status, started but not finished
                            if (!firstTodo) {
                                firstTodo = mod;

                                if (!module) // Highlight the first todo
                                    this.ui[(mod + 'Meter')].addClass('active');
                            }

                            this.ui[(mod + 'Meter')].addClass('incomplete');
                        }
                        else
                            this.ui[(mod + 'Meter')].addClass('complete');
                    } else {
                        // Not visited. Mark as 'todo'
                        this.ui[(mod + 'Meter')].removeClass('incomplete complete active');
                        // First visit, save progress as incomplete
                        if (mod == module) this.setProgress(mod, false);
                    }
                    if (mod == module) this.ui[(mod + 'Meter')].addClass('active');
                }.bind(this));
            }

            return firstTodo;
        },

        onDestroy: function () {
            this.ui.tracker.off('fsi.apply');
        }
    });
});
