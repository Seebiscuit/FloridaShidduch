define(['app'
    , 'store'
    , 'backbone'
    , 'marionette'
    , 'templates'
],
function (app, store, Backbone, Marionette, templates) {
    var PREFSPATH = 'preferences.';

    return Marionette.LayoutView.extend({
        constructor: function (options) {
            // Deep extend events and handlers and bindings without writing to _proto_ references
            var clone, extensions = Marionette.getOption(options, 'bindings');

            this._addStaticProps(extensions);

            this.behaviors = this._createBehaviorClass(Marionette.getOption(options, 'behaviors'), options);

            Marionette.LayoutView.prototype.constructor.apply(this, arguments);

            this.onChange = _.debounce(this.onChange.bind(this), 250);
        },

        regions: {

        },

        className: function (view) {
            var className = 'row pagination-control';

            if (this.model && this.model.validate) {
                this.model.validate();
                if (this.model.isValid())
                    return className + ' valid'
            }
            else
                return className;
        },

        getTemplate: function () {
            return templates.apply[this.getOption('module')];
        },

        events: {},

        modelEvents: {
            change: 'onChange'
        },

        viewOptions: ['$parentEl', 'module', 'modules', 'position', 'title'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);

            this.saveModel = _.debounce(this.saveModel.bind(this), 500);

            this.listenTo(app.radio.view.rootRadio.vent, 'module:set-status', this.handleNavigation);

            Backbone.Validation.bind(this);

            this.$el.addClass(_.result(this, 'className'));
        },

        ui: {
            title: '[data-hook="title"]'
        },

        onRender: function () {
            this.stickit();
        },

        handleNavigation: function (module, status) {
            if (status)
                this.$el.addClass('valid');
            else
                this.$el.removeClass('valid');
        },

        onChange: function () {
            this.saveModel();
        },

        saveModel: function () {
            var isValid = this.model.isValid(true);

            if (isValid) this.model.save();

            app.radio.view.rootRadio.vent.trigger('module:set-status', this.module, isValid)
        },
        //**=_ Used by Stick It (behaviors) _=**//
        updateBoolean: function (val, classes) {
            val = JSON.parse(val); //Converts to actual boolean
            // Number(true) = 1, Number(false) = 0;
            this.updateParentContainerClass(classes[Number(val)], classes[Number(!val)]);
        },

        updateParentContainerClass: function (add, remove) {
            this.$parentEl.removeClass(remove).addClass(add);
        },

        saveUserPrefs: function (key, value) {
            return store.setItem(PREFSPATH + this.state.user.get('userName').replace('.', '\\.') + '.' + key, value);
        },
        //**================================**//

        templateHelpers: function () {
            var view = this;

            return {
                printTitle: function () {
                    return view.title || view.module[0].toUpperCase() + view.module.substr(1);
                },

                addControls: function (title) {
                    var prev = Backbone.$('<a><i class="fa fa-caret-left pagination pagination-left"></i></a>'),
                        next = Backbone.$('<a><i class="fa fa-caret-right pagination pagination-right"></i></a>'),
                        titleEl = Backbone.$('<h2 class="component-title inline"/>'),
                        container = Backbone.$('<div class="component-title-container"/>').append(titleEl);

                    titleEl.text(this.printTitle())

                    if (view.position !== 0)
                        titleEl.before(prev.prop('href', '#apply/' + view.modules[view.position - 1]));

                    if (view.position !== view.modules.length - 1)
                        titleEl.after(next.prop('href', '#apply/' + view.modules[view.position + 1]));

                    return Backbone.$('<div/>').append(container).html();
                },

                model: view.model
            }
        },

        _addStaticProps: function (obj) {
            for (var name in obj) {
                if (_.isString(obj[name]) || _.isFunction(obj[name]))
                    clone = obj[name];
                else if (name in this)
                    clone = $.extend({}, this[name], obj[name]);
                else
                    clone = $.extend({}, obj[name]);

                this[name] = clone;
            }
        },

        _createBehaviorClass: function (behaviors, options) {
            var _behaviors = {};

            behaviors = behaviors.length ? behaviors : [behaviors];

            _.each(behaviors, function (b) {
                _behaviors[b.name] = {
                    behaviorClass: b.behavior,
                    options: options
                };

            });

            return _behaviors;
        }

    });
});
