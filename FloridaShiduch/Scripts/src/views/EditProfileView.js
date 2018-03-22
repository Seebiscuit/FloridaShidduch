define(['app', 'marionette'], function (app, Mn) {
    return Mn.LayoutView.extend({
        pageOrder: [
            'demographics',
            'background',
            'lifestyle',
            'occupation',
            'personal',
            'essays',
            'spouse',
            'references'
        ],

        ui: function () {
            return _.reduce(this.pageOrder, function (memo, module) {
                memo[module] = '[data-region="' + module + '"]';

                return memo;
            }, {});
        },

        regions: function () {
            return _.reduce(this.pageOrder, function (memo, module) {
                memo[module] = '@ui.' + module;

                return memo;
            }, {});
        },

        onRender: function () {

        },

        showViews: function () {
            _each(this.pageOrder, function (module, index) {
                this.showView([
                    'views/apply/Questionnaire'
                    , 'models/' + _.capitalize(module, true)
                    , 'behaviors/' + module
                    , 'models/bindings/' + module], 
                    this.getRegion(module), 
                    { 
                        module: module, 
                        modules: this.pageOrder, 
                        position: index, 
                        $el: this.ui[module] 
                    })
            }.bind(this));
        },

        showView: function (moduleArray, region, options) {
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

                var readyToShowView = Promise.resolve();
                if (options.model)
                    readyToShowView = options.model.fetch();
                
                readyToShowView.then(showView.bind(this), showView.bind(this));

                function showView() {
                    region.view = new View(options);
                    region.show(region.view);
                }
            }.bind(this));
        }
    });
})