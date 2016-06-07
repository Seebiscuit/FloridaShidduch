define([
    'marionette'
],

function (Marionette) {

    return Marionette.AppRouter.extend({

        // Format is "route": "methodName" where the router's controller
        // must have the method methodName
        appRoutes: {
            "": "showMain",
            "main/:bookmark": "showMain",
            "apply": "showApply"
        },

        // Standard backbone routes. Methods called must be in this object.
        routes: {},

    });

});
