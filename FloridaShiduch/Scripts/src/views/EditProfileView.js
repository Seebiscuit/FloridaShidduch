define(['app', 'templates', 'marionette'], function (app, templates, Mn) {
    var EXCLUDED_FIELDS = ['userId', 'ApplicationUser'];

    return Mn.LayoutView.extend({
        template: templates.apply.edit,

        pageOrder: [
            'demographics',
            'background',
            'lifestyle',
            'occupation',
            'personal',
            'essays',
            'spouse',
            'reference'
        ],

        pageMeta: {
            reference: {
                collection: {
                    className: 'References',
                    complete: 3
                }
            }
        },

        viewOptions: ['module'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);

            this.modelReferences = {};
        },

        ui: function () {
            var ui = _.reduce(this.pageOrder, function (memo, module) {
                memo[module] = '[data-region="' + module + '"]';
                memo[module + 'Progress'] = '[data-hook="' + module + '-progress"]';

                return memo;
            }, {});

            ui.headers = 'h4';

            return ui;
        },

        regions: function () {
            return _.reduce(this.pageOrder, function (memo, module) {
                memo[module] = '@ui.' + module;

                return memo;
            }, {});
        },

        events: {
            'click @ui.headers': 'onClickHeader'
        },

        onClickHeader: function (e) {
            var el = $(e.currentTarget);

            el.toggleClass("open");
            this.ui.headers.not(el).removeClass("open");
        },

        onRender: function () {
            this.showViews();
            
            app.radio.view.rootRadio.vent.trigger('module:set-status', this.module, true);
        },

        showViews: function () {
            this.pageOrder.forEach(function (module, index) {
                var view = 'views/apply/Questionnaire';
                var model = 'models/' + _.capitalize(module, true);

                var meta = this.pageMeta[module] || {};

                if (meta.collection) {
                    view = 'views/apply/QuestionnaireCollectionLayout';
                    model = 'collections/' + meta.collection.className
                }

                this.showView([
                    view
                    , model
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
            require(moduleArray, function (View, Model, Behavior, bindings) {
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
                if (options.model) {
                    this.modelReferences[options.module] = options.model;

                    this.listenTo(options.model, 'sync', this._setModuleProgress.bind(this, options.module));

                    readyToShowView = options.model.fetch();
                }

                readyToShowView.then(showView.bind(this), showView.bind(this));

                function showView() {
                    region.view = new View(options);
                    region.show(region.view);
                }
            }.bind(this));
        },

        _setModuleProgress: function (module, model) {
            calculateViewProgress(model, module, this.modelReferences, this.pageMeta[module]).done(function (percent) {
                this.ui[module + 'Progress'].val(percent);
            }.bind(this))
        }
    });

    function calculateViewProgress(model, module, modelReferences, meta) {
        var deferred = $.Deferred();

        if (meta && meta.collection) {
            var progress = model.length;
            var totalPossible = meta.collection.complete || 1;

            return deferred.resolve(progress / totalPossible);
        }

        if (!(model && model.attributes))
            return deferred.resolve(0);

        return calculatePossibleFields(model, module, modelReferences)
            .then(function (totalPossibleFields) {
                return calculateCompletedFields(model.attributes) / totalPossibleFields;
            });
    }

    function calculateCompletedFields(attr) {
        return Object.keys(attr).reduce(function (sum, prop) {
            if (EXCLUDED_FIELDS.find(function (f) { return f === prop }))
                return sum;

            return sum + (attr[prop] ? 1 : 0);
        }, 0);
    }

    function calculatePossibleFields(model, module, modelReferences) {
        var v = model.validation;
        var vD = model.validationDependencies;

        var deps = model.validationDependencies ?
            Object.keys(vD)
                .map(function (key) { return parseDependencies(vD[key]) }) :
            [];
        var indep = model.validationDependencies ?
            Object.keys(v)
                .filter(function (key) {
                    return !Object.keys(vD).some(function (depKey) { return depKey === key });
                }) :
            Object.keys(v);

        var modelPromises = Object.keys(modelReferences)
            .filter(function (refKey) {
                return deps.some(function (dep) { dep.model === refKey })
            })
            .map(function (refKey) {
                return modelReferences[refKey].fetch()
                    .then(function () {
                        return {
                            name: dep.model,
                            attributes: model.attributes
                        };
                    });
            })

        return $.when(modelPromises).then(function () {
            var totalPossibleFields = indep.length;

            var models = Array.prototype.slice.call(arguments)

            deps.forEach(function (dep) {
                var attributes = model.attributes;

                if (dep.model)
                    attributes =
                        (models.find(function (model) { return model.name === dep.model }) || {}).attributes ||
                        {};

                totalPossibleFields += (attributes[dep.key] === dep.value ? 1 : 0);
            })

            return totalPossibleFields;
        })
    }

    function parseDependencies(deps) {
        if (!deps) return null;

        var path = deps.split('.');

        var comp = {};

        switch (path.length) {
            case 1:
                // Depends on boolean
                comp.key = path[0];
                comp.value = true;
                break;
            case 2:
                // Depends on certain value
                comp.key = path[0];
                comp.value = path[1];
                break;
            case 3:
                // Depends on value in different model
                comp.model = path[0];
                comp.key = path[1];
                comp.value = path[2];
                break;
        }

        return comp;
    }
});