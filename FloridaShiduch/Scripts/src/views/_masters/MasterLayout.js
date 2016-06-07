define([
    'marionette'
    , 'when'
],

function (Marionette, when) {
    return Marionette.LayoutView.extend({
        showView: function (view, region, options) {
            return when.promise(function (resolve, reject) {
                if (!region.view || options.swap) {
                    require([view], function (View) {
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
