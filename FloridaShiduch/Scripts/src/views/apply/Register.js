define([
    'marionette'
    ,'templates'
],

function (Marionette, templates) {
    return Marionette.LayoutView.extend({
        template: templates.apply.register,

        regions: {

        },

        initialize: function (options) {

        }

    });
});
