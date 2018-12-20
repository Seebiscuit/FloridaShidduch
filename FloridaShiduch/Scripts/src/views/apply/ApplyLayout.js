define(['app'
    , 'backbone'
    , 'masterlayout'
    , 'templates'
    , 'collections/ModulesProgress'
    , 'models/ModuleProgress'
    , 'store'
    , 'slider'
],

function (app, Backbone, MasterLayout, templates, ModulesProgress, ModuleProgress, store) {
    var PREFSPATH = 'preferences.';
    var START_PAGE = 'start';
    var COMPLETE_PAGE = 'edit';
    
    return MasterLayout.extend({
        template: templates.apply.layout,

        id: 'apply-regions',

        pageOrder: [
                START_PAGE,
                'demographics',
                'background',
                'lifestyle',
                'occupation',
                'personal',
                'essays',
                'spouse',
                'reference',
                COMPLETE_PAGE
        ],

        pageMeta: {
            reference: {
                title: 'References',
                collection: 'References'
            }
        },

        regions: function () {
            var regions = {
                registration: '@ui.registration'
            };

            this.pageOrder.forEach(function (page) {
                //** REGIONS
                regions[page] = '@ui.' + page;
            })

            return regions;
        },

        ui: function () {

            var ui = {
                //** REGIONS
                registration: '#apply-registration',
                //** UI
                tracker: '.progress-meter > li'
            };

            this.pageOrder.forEach(function (page) {
                //** REGIONS
                ui[page] = '#apply-' + page;
                //** Tracker
                ui[page + 'Meter'] = '#meter-' + page;
            })

            return ui;
        },

        viewOptions: ['page'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);

            this.user = this.state.login;

            this.listenTo(app.radio.view.rootRadio.vent, 'module:set-status', this.setProgress);
            //this.listenTo(this.state.user, 'logout', this._resetApplication)

            this.initUserPrefs();
        },

        onBeforeShow: function () {
            this.onShowPage(this.page);
        },

        goToLastProgress: function (isinit) {
            this._setTrackerStatus().then(function (todo) {
                if (todo == START_PAGE || todo == COMPLETE_PAGE) 
                    this["showProfile" + _.capitalize(todo)](todo);
                else if (location.hash.indexOf('#apply/' + todo) > -1)
                    // already at this todo, just show it
                    this.showQuestionnaireModule(todo);
                else
                    location = '#apply/' + todo;
            }.bind(this));

        },

        setProgress: function (module, status) {
            if (status) this.ui[(module + 'Meter')].removeClass('incomplete').addClass('complete');

            return  this._initProgress().then(function () {
                // Backbone.add() overridden to persist changes
                return this.state.progress
                    .add({ module: module, status: status }, { parse:true, merge:true })
                    .save(); 
            }.bind(this));
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
                location = '#apply/' + view.pageOrder[(view.currentSlidePos = $(this).index() + 1)];
            })
        },
        
        initUserPrefs: function () {
            if (this.state.user.get('userName')) {
                var prefs = store.getItem(PREFSPATH + this.state.user.get('userName').replace('.', '\\.')) || {};

                this.$el.addClass(_.values(prefs).join(' '));
            }
        },

        onShowPage: function (module) {
            // Navigation guard: goto module, unless we have not started or already finished application
            this._initProgress().then(function () {
                progress = this.state.progress;
                if ((progress.get(nextModule = START_PAGE) && !progress.get(START_PAGE).get('status')) || 
                    (progress.get(nextModule = COMPLETE_PAGE) && progress.get(COMPLETE_PAGE).get('status')))
                    module = nextModule; 

                this.showQuestionnaireModule(module);
            }.bind(this));
        },

        showRegister: function (module) {
            this.$el.removeClass('applying');
            this.showView(['views/apply/Register', 'models/bindings/register'], this.getRegion('registration'), { $el: this.ui.registration, wantsLogin: module == "login" });
        },

        showQuestionnaireModule: function (module, isinit) {
            var modelName = _.capitalize(module, true)
            index = this.pageOrder.indexOf(module),
            transition = [];

            if (module == 'login' || module == 'register' || !this.state.user.isLoggedIn())
                return this.showRegister(module);
            else if (module == START_PAGE || module == COMPLETE_PAGE) 
                return this["showProfile" + _.capitalize(module)](module);
            else if (index < 0)
                // If the page isn't an application page...
                return this.goToLastProgress();

            this.$el.addClass('applying');
            if (!index) this.$el.addClass('first');
            if (index == this.pageOrder.length - 1) this.$el.addClass('last');

            this.index = index; // Know the last index

            var view = 'views/apply/Questionnaire';
            var model = 'models/' + modelName;
            var meta = this.pageMeta[module] || {};
            if (meta.collection) {
                view = 'views/apply/QuestionnaireCollectionLayout';
                model = 'collections/' + meta.collection
            }


            this.showView([
                view
                , model
                , 'behaviors/' + module
                , 'models/bindings/' + module], 
                this.getRegion(module), 
                { module: module, modules: this.pageOrder, position: index, $el: this.ui[module], title: meta.title });

            if (!isinit) this.seekTracker(module);  // Tracker set on init;
        },

        showProfileStart: function () {
            var fadeOut,
                region = this.getRegion('start');

            this.$el.removeClass('applying');

            app.router.navigate('#apply/start'); 

            require(['views/StartProfile'], _.bind(function (ProfileStart) {
                this.$('#apply-views > div.fadeIn').removeClass('fadeIn').addClass('fadeOut');

                region.view = new ProfileStart;
                region.show(region.view);

                region.$el.removeClass('fadeOut').addClass('fadeIn');
            }, this));
        },

        showProfileEdit: function (module) {
            var region = this.getRegion('edit');

            this.$el.removeClass('applying')
            $('body').addClass('edit-application');

            app.router.navigate('#apply/edit'); 
            
            require(['views/EditProfileView'], _.bind(function (EditProfileView) {
                this.$('#apply-views > div.fadeIn').removeClass('fadeIn').addClass('fadeOut');

                region.view = new EditProfileView({ module:module });
                region.show(region.view);

                region.$el.removeClass('fadeOut').addClass('fadeIn');

            }, this));
        },

        showView: function (modulearray, region, options) {
            var fadeOut;
            return new Promise(function (resolve, reject) {
                require(modulearray, function (View, Model, Behavior, bindings) {

                    fadeOut = this.$('#apply-views > div.fadeIn')

                    _.defer(loadView.bind(this, View, Model, Behavior, bindings, options));

                    fadeOut.removeClass('fadeIn').addClass('fadeOut');

                }.bind(this));

                function loadView(View, Model, Behavior, bindings, options) {
                    var _this = this;
                    if (Model.getBindings)
                        // Register uses this pattern
                        bindings = Model, Model = null;

                    _.extend(options || {}, {
                        model: Model && new Model,
                        bindings: bindings && bindings.getBindings(),
                        behaviors: { behavior: Behavior, name: options.module },
                        $parentEl: this.$el
                    });

                    if (options.model)
                        options.model.fetch().complete(showView.bind(this));
                    else
                        showView();

                    function showView() {
                        region.view = new View(options);
                        region.show(region.view);

                        options.$el.removeClass('fadeOut').addClass('fadeIn');

                        app.radio.view.rootRadio.commands.execute('update:nav');

                        $("body")
                            .removeClass (function (index, className) {
                                return (className.match (/(^|\s)meter-\S+/g) || []).join(' ');
                            })
                            .addClass('meter-' + options.module);

                        _.delay(function () {
                            $('html, body').animate({
                                scrollTop: this.$el.parent().siblings('h3').get(0).getBoundingClientRect().top
                            }, 900);
                        }.bind(_this), 10);

                        //_.delay(options.$el[0].scrollIntoView.bind(this.$el.parent().siblings('h3').get(0)), 10);
                        
                        resolve();
                    }
                }
            }.bind(this));
        },

        seekTracker: function (module) {
            this._setTrackerStatus(module);
        },

        _setTrackerStatus: function (module) {
            var nextModule, progress;
          return this._initProgress().then(function () {
            progress = this.state.progress;
            if (progress.length < 1) {
              return this.setProgress(this.pageOrder[0], false)
                .then(this._setTrackerStatus.bind(this));
            }
            else {
              if ((progress.get(nextModule = START_PAGE) && !progress.get(START_PAGE).get('status')) ||
                (progress.get(nextModule = COMPLETE_PAGE) && progress.get(COMPLETE_PAGE).get('status')))
                return nextModule;

              nextModule = null;
              _.each(this.pageOrder, function (mod, i) {
                var progressMod = progress.get(mod);

                if (isCurrentModuleInApply(mod)) {
                  if (progressMod) {
                    if (!progressMod.get('status')) {
                      // False status, started but not finished
                      if (!nextModule)
                        nextModule = mod;

                      this.ui[(mod + 'Meter')].addClass('incomplete').removeClass('complete');
                    }
                    else
                      this.ui[(mod + 'Meter')].removeClass('incomplete').addClass('complete');
                  } else {
                    // Not visited. Mark as 'todo'
                    this.ui[(mod + 'Meter')].removeClass('incomplete complete active');
                    // First visit, save progress as incomplete
                    if (mod == module) this.setProgress(mod, false);

                    if (!nextModule)
                      nextModule = mod;
                  }

                  if (mod == module || (!module && nextModule == mod))
                    this.ui[(mod + 'Meter')].addClass('active');
                  else
                    this.ui[(mod + 'Meter')].removeClass('active');
                }
              }.bind(this));
            }


            return nextModule ||
              (
                areAllModulesComplete(this.pageOrder, progress) ?
                  // all modules completed
                  'edit' :
                  // Not started?
                  'start'
              );
          }.bind(this));
        },

        _initProgress: function () {
            if (!this.progressLoaded || this.progressLoaded.statusCode().status != 200) {
                this.state.progress = new ModulesProgress;
                this.progressLoaded = this.state.progress.fetch();
            }

            return this.progressLoaded;
        },

        _resetApplication: function () {
            delete this.progressLoaded;
        },

        onDestroy: function () {
            this.ui.tracker.off('fsi.apply');
        }
    });

    function isCurrentModuleInApply(mod) {
        return [START_PAGE, COMPLETE_PAGE].indexOf(mod) < 0
    }

    function areAllModulesComplete(modules, progress) {
        return modules.every(function (module) {
            var progressMod;
                        
            if (!isCurrentModuleInApply(module)) return true;

            if (!(progressMod = progress.get(module))) return false;
                        
            return  progressMod.get('status');
        }) 
    }
});
