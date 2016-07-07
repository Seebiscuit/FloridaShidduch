define([
    'backbone'
    ,'marionette'
    , 'templates'
],

function (Backbone, Marionette, templates) {
    return Marionette.LayoutView.extend({
        getTemplate: function () {
            return templates.apply[this.getOption('type')];
        },

        modelEvents: {
            change: 'onChange'
        },

        regions: {

        },

        initialize: function (options) {
            var bindings = this.getOption('bindings');
            _.extend(this, bindings.getBindings());

            this.model = new Backbone.Model;
        },

        onRender: function () {
            this.stickit();
        },

        onChange: function () {

        }

    });
});
