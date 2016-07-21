define([
    'marionette'
],

function (Marionette) {

    return Marionette.AppRouter.extend({

        // Format is "route": "methodName" where the router's controller
        // must have the method methodName
        appRoutes: {
            ":bookmark": "navRoutes",
            "apply/:page": "showApply",
            "*any": "showMain"
        },

        // Standard backbone routes. Methods called must be in this object.
        routes: {},

    });

});
