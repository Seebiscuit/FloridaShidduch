define([
    'marionette'
    , 'when'
],

function (Marionette, when) {
    return Marionette.LayoutView.extend({
        showView: function (modulearray, region, options) {
            return when.promise(function (resolve, reject) {
                if (!region.view || options.swap) {
                    require(modulearray, function (View, Model, Behavior, bindings) {
                        if (Model.getBindings)
                            // Register uses this pattern
                            bindings = Model, Model = null;

                        _.extend(options || {}, {
                            model: Model && new Model,
                            bindings: bindings && bindings.getBindings(),
                            behaviors: { behavior: Behavior, name: options.module },
                            $parentEl: this.$el
                        });

                        region.view = new View(options);
                        region.show(region.view);
                        _.delay(options.$el[0].scrollIntoView.bind(options.$el[0]), 10);
                        
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
