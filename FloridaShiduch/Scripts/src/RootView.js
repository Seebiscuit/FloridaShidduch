define(['app'
    , 'marionette'
    , 'views/MainLayout'
    , 'bootstrap'],
    function (app, Marionette, MainLayout) {
        return Marionette.LayoutView.extend({
            template: false,

            el: 'body',

            regions: {
                main: '#main',
                apply: '#apply-region',
                login: '#login'
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
                this.render();
            },

            onRender: function () {
                this.setBoostrapFns();
            },

            setBoostrapFns: function () {
                var top = this.ui.header.outerHeight(true),
                    bottom = $('footer').outerHeight(!0);
                
                this.ui.nav.affix({
                    offset: { top: top, bottom: bottom }
                });

                this.$el.scrollspy({ target: this.ui.nav.selector.replace(/body\s+/, '') });

                this.ui.nav.on('activate.bs.scrollspy', function () {
                    location = '#' + $(this).find('li.active > a').prop('href').replace(/^.*#/, ''); console.log(location);
                })
            },

            appChange: function ($current) {
                this.$previous = this.$current;
                this.$current = $current;
                if (this.$previous)
                    this.$previous.hide();
                this.$current.show();
                // UI Change, update scroll position
                this.ui.nav.affix('checkPosition');
                this.ui.nav.scrollspy('refresh');
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
                        this.appChange(this.ui.apply);
                    }, this));
                }
                else {
                    region.view.triggerMethod('show:page', page);
                    this.appChange(this.ui.apply);
                }
            },


            getLoggedIn: function () {
                var region = this.getRegion('login')
                require(['views/login-register/LoginLayout'], _.bind(function (LoginLayout) {
                    this.showHomeBanner();
                    region.view = new LoginLayout;
                    region.show(region.view)
                    this.appChange(region.$el);
                }, this));
            }

        });
    })