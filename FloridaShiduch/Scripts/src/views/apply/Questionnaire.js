define([
    'backbone'
    , 'marionette'
    , 'templates'
],

function (Backbone, Marionette, templates) {
    return Marionette.LayoutView.extend({
        constructor: function (options) {
            // Deep extend events and handlers and bindings without writing to _proto_ refrences
            var clone, extensions = Marionette.getOption(options, 'bindings');

            this._addStaticProps(extensions);

            this.behaviors = this._createBehaviorClass(Marionette.getOption(options, 'behaviors'), options);

            Marionette.LayoutView.prototype.constructor.apply(this, arguments);
        },

        getTemplate: function () {
            return templates.apply[this.getOption('type')];
        },

        events: {},

        modelEvents: {
            change: 'onChange'
        },

        regions: {

        },

        viewOptions: ['$parentEl'],

        initialize: function (options) {
            this.mergeOptions(options, this.viewOptions);
        },

        onRender: function () {
            this.stickit();
        },

        onChange: function () {
        },

        updateBoolean: function (val, classes) {
            val = JSON.parse(val); //Converts to actual boolean
            // Number(true) = 1, Number(false) = 0;
            this.updateParentContainerClass(classes[Number(!val)], classes[Number(val)]);
        },

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
