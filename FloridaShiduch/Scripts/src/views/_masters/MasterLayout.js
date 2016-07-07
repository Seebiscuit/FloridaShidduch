define([
    'marionette'
    , 'when'
],

function (Marionette, when) {
    return Marionette.LayoutView.extend({
        showView: function (modulearray, region, options) {
            return when.promise(function (resolve, reject) {
                if (!region.view || options.swap) {
                    require(modulearray, function (View, Model, bindings) {
                        options.model = new Model;
                        if (bindings) options.bindings = bindings;

                        region.view = new View(options);
                        region.show(region.view);

                        resolve();
                    });
                } else
                    resolve();
            })
        }
    });
});
