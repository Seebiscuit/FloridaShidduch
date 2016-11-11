require([
    "backbone",
    "app",
    "routers/routes",
    "RootView",
    "state",
    'user-login',
    "underscore.string",
    "marionette"
],

function (Backbone, App, Router, RootView, state, userLogin, s) {
    // Fires after the Application has started and after the initializers have been executed
    App.on("start", function (options) {
        initRadio
        .then(function () {
            state.user = userLogin;
        })
        .then(function () {
            return new Promise(function (resolve) {
                require(['extend-marionette-view'], resolve);
            });
        })
        .then(function () {
    
            App.router = new Router({
                controller: new RootView
            });

            if (Backbone.history){
                // Trigger the initial route
                Backbone.history.start({ root: App.root });
            }

            mixinBackboneValidation();
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

    // Extend the callbacks to work with Bootstrap, as used in this example
    // See: http://thedersen.com/projects/backbone-validation/#configuration/callbacks
    var mixinBackboneValidation = function () {
        _.extend(Backbone.Validation.callbacks, {
            valid: function (view, attr, selector) {
                var $el = view.$('[name$=' + attr.toLowerCase() + ']'),
                    $group = $el.closest('.form-group');

                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error, selector) {
                var $el = view.$('[name$=' + attr.toLowerCase() + ']'),
                    $group = $el.closest('.form-group');

                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
    }

    App.start();

});
