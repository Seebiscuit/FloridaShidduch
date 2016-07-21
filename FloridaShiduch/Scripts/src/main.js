require([
    "backbone",
    "app",
    "routers/routes",
    "RootView",
    'user-login',
    "underscore.string",
    "marionette"
],

function (Backbone, App, Router, RootView, userLogin, s) {
    // Fires after the Application has started and after the initializers have been executed
    App.on("start", function (options) {
        initRadio
        .then(function () {
            initSecurity(userLogin);
    
            App.router = new Router({
                controller: new RootView
            });

            if (Backbone.history){
                // Trigger the initial route
                Backbone.history.start({ root: App.root });
            }
        });
    });

    //Integrate underscore string into underscore
    _.mixin(s.exports());

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function (e) {
        // Get the absolute anchor href.
        var href = {
                prop: $(this).prop("href"),
                attr: $(this).attr("href")
            },
            root = location.protocol + "//" + location.host + App.root;

        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop && href.prop.slice(0, root.length) === root) {
            e.preventDefault();
            Backbone.history.navigate(href.attr, true);
        }
    });

    $(document).on("click", "a[data-bypass]", function (e) {
        e.preventDefault();
    });

    var initRadio = new Promise(function (resolve) { require(['radios'], resolve) });

    // Add loggin-check to the base Marionette.View constructor to invoke it on all views
    var initSecurity = function (userlogin) {
        var ViewConstructor = Backbone.Marionette.View;
        Backbone.Marionette.View = Backbone.Marionette.View.extend({
            constructor: function (options) {
                this.isLoggedIn = userlogin.isLoggedIn();
                this.isAdmin = userlogin.isLoggedInAdminUser();
                ViewConstructor.apply(this, arguments);
            }
        });
        var BehaviorConstructor = Backbone.Marionette.Behavior;
        Backbone.Marionette.Behavior = Backbone.Marionette.Behavior.extend({
            constructor: function (options) {
                this.isLoggedIn = userlogin.isLoggedIn();
                this.isAdmin = userlogin.isLoggedInAdminUser();
                BehaviorConstructor.apply(this, arguments);
            }
        });
    };
    
    App.start();

});
