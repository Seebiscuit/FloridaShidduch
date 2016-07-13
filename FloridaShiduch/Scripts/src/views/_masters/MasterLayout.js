define([
    'marionette'
    , 'when'
],

function (Marionette, when) {
    return Marionette.LayoutView.extend({
        showView: function (modulearray, region, options) {
            return when.promise(function (resolve, reject) {
                if (!region.view || options.swap) {
                    require(modulearray, function (View, Model, bindings, events) {
                        _.extend(options || {}, {
                            model: new Model,
                            bindings: bindings && bindings.getBindings(),
                            events: events,
                            $parentEl: this.$el 
                        });

                        region.view = new View(options);
                        region.show(region.view);

                        resolve();
                    }.bind(this));
                } else
                    resolve();

                this.$('> div.active').removeClass('active');
                options.$el.addClass('active');
            }.bind(this));
        }
    });
});
