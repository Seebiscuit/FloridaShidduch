define([
    'backbone'
    , 'marionette'
    , 'templates'
],

function (Backbone, Marionette, templates) {
    return Marionette.LayoutView.extend({
        constructor: function (options) {
            // Deep extend events and handlers and bindings without writing to _proto_ refrences
            var clone, extensions = _.extend(Marionette.getOption(options, 'events') || {}, Marionette.getOption(options, 'bindings'))

            for (var name in extensions) {
                if (_.isString(extensions[name]) || _.isFunction(extensions[name]))
                    clone = extensions[name];
                else if (name in this)
                    clone = $.extend({}, this[name], extensions[name]);
                else
                    clone = $.extend({}, extensions[name]);

                this[name] = clone;
            }

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
        }

    });
});
