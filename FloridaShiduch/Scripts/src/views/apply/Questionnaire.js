define([ 'app'
    , 'backbone'
    , 'marionette'
    , 'templates'
],

function (app, Backbone, Marionette, templates) {
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

        className: 'row',

        getTemplate: function () {
            return templates.apply[this.getOption('module')];
        },

        events: {},

        modelEvents: {
            change: 'onChange'
        },

        viewOptions: ['$parentEl', 'module'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);

            this.saveModel = _.debounce(this.saveModel.bind(this), 1000);

            Backbone.Validation.bind(this);
        },

        onRender: function () {
            this.stickit();
        },

        onChange: function () {
            this.saveModel();
        },

        saveModel: function () {
            this.model.save();
            app.radio.view.rootRadio.vent.trigger('module:set-status', this.module, this.model.isValid())
        },
        // Used by Behaviors
        updateBoolean: function (val, classes) {
            val = JSON.parse(val); //Converts to actual boolean
            // Number(true) = 1, Number(false) = 0;
            this.updateParentContainerClass(classes[Number(val)], classes[Number(!val)]);
        },
        // Used by Behaviors
        updateParentContainerClass: function (add, remove) {
            this.$parentEl.removeClass(remove).addClass(add);
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

            behaviors = behaviors.length ? behaviors : [ behaviors ];

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
