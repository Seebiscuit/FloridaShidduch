define(['app'
    , 'marionette'
    , 'views/MainLayout'
    , 'bootstrap'],
    function (app, Marionette, MainLayout) {
        return Marionette.LayoutView.extend({
            template: false,

            el: 'body',

            regions: {
                main: '@ui.main',
                apply: '#apply-region',
                login: '@ui.login'
            },

            ui: {
                // Sections
                main: '#main',
                apply: '#apply',
                login: '#login',

                nav: 'nav#menu-nav',
                header: 'header'
            },

            initialize: function () {
                this.showApply = _.debounce(this.showApply.bind(this), 100);

                this.setupHandlers();
                this.render();
            },

            setupHandlers: function () {
                var radio = app.radio.view.rootRadio,
                    _this = this;

                radio.commands.setHandlers({
                    'update:nav': {
                        callback: _.debounce(function () { this.ui.nav.affix('checkPosition'); }.bind(this), 100),
                        context: _this
                    }
                });

                radio.reqres.setHandlers({
                    'apply:show': {
                        callback: _this.showApply,
                        context: _this
                    }
                });

                this.listenTo(this.state.user, 'login', this.onLogin)
            },

            onRender: function () {
                this.appChange(this.ui.main);

                if ((this.isLoggedIn = this.state.user.isLoggedIn()))
                    this.onLogin();

                this.setBoostrapFns();

                // Start slider
                setTimeout(function () {
                    $('header #main-slider').unslider({
                        animation: 'fade',
                        autoplay: true,
                        arrows: false,
                        infinite: true,
                        dots: false
                    });
                }, 0);
            },

            setBoostrapFns: function () {
                var top = this.ui.header.outerHeight(true),
                    bottom = $('footer').outerHeight(!0);

                this.ui.nav.affix({
                    offset: { top: top, bottom: bottom }
                });

                //this.$el.scrollspy({ target: this.ui.nav.selector.replace(/body\s+/, '') });

                //this.ui.nav.on('activate.bs.scrollspy', function () {
                //var loc = $(this).find('li.active > a').prop('href').replace(/^.*#/, '');
                // if (loc.indexOf('apply') < 0) location = '#' + loc; console.log(loc);
                //})
            },

            appChange: function ($current) {
                this.$previous = this.$current;
                this.$current = $current;
                if (this.$previous)
                    this.$previous.hide();
                this.$current.show();
                //this.ui.nav.scrollspy('refresh');
            },

            gotoBookmark: function (bookmark) {
                if (bookmark)
                    location = '#' + bookmark;
            },

            navRoutes: function (bookmark) {
                if (bookmark == 'apply') {
                    if (!this.getRegion('main').view)
                        // Init main if we fell here at site load
                        this.showMain(bookmark);

                    this.showApply(bookmark);
                } else
                    this.showMain(bookmark);
            },

            showMain: function (bookmark) {
                var region = this.getRegion('main');
                if (!region.view) {
                    region.view = new MainLayout;
                    this.gotoBookmark(bookmark);
                    this.appChange(this.ui.main);
                    region.view.triggerMethod('attach');
                }
                else {
                    this.gotoBookmark(bookmark);
                    this.appChange(this.ui.main);
                }
            },

            showApply: function (page) {
                var region = this.getRegion('apply');
                if (!region.view) {
                    require(['views/apply/ApplyLayout'], _.bind(function (ApplyLayout) {
                        region.view = new ApplyLayout({ page: page });
                        region.show(region.view);
                    }, this));
                }
                else {
                    region.view.triggerMethod('show:page', page);
                }

                this.appChange(this.ui.apply);
            },

            onLogin: function () {
                this.$el.addClass('logged-in');
                this.showApply();
            },

            onLogout: function () {
                this.$el.removeClass('logged-in');
                location = '#initiative';

                this.resetViews();
            },

            resetViews: function () {
                var applyLayoutRegion = this.getRegion('apply');
                if (applyLayoutRegion)
                    delete applyLayoutRegion.view;
            },

            logout: function () {
                this.state.user.logout();
            }
        });
    })