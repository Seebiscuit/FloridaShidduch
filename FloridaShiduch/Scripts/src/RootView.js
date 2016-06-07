define(['app', 'marionette'],
    function (app, Marionette) {
    return Marionette.LayoutView.extend({
        el: '#content',

        regions: {
            main: '#main',
            apply: '#apply',
            login: '#login'
        },

        initialize: function () {
            this.setupHandlers();
        },

        setupHandlers: function () {
        },

        appChange: function ($current) {
            this.$previous = this.$current;
            this.$current = $current;
            if (this.$previous)
                this.$previous.hide();
            this.$current.show();
        },

        gotoBookmark: function (bookmark) {
            if (bookmark)
                location = '#' + bookmark;
        },

        showMain: function (bookmark) {
            var region = this.getRegion('main');
            if (!region.view) {
                require(['views/MainLayout'], _.bind(function (MainLayout) {
                    region.view = new MainLayout;
                    //region.show(region.view);
                    this.appChange(region.$el);
                    this.gotoBookmark(bookmark);
                }, this));
            }
            else {
                this.appChange(region.$el);
                this.gotoBookmark(bookmark);
            }
        },

        showApply: function () {
            var region = this.getRegion('apply');
            if (!region.view) {
                require(['views/apply/ApplyLayout'], _.bind(function (ApplyLayout) {
                    region.view = new ApplyLayout;
                    region.show(region.view);
                    this.appChange(region.$el);
                }, this));
            }
            else
                this.appChange(region.$el);
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