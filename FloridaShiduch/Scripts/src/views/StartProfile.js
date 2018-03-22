define(["app", "templates", "marionette"], function (app, templates, Marionette) {
    return Marionette.LayoutView.extend({
        template: templates.apply.start,

        ui: {
            getStartedLink: '[data-hook="get-started"]'
        },

        triggers:{
            'click @ui.getStartedLink': 'click:get:started'
        },

        onClickGetStarted: function () {
            this.state.progress.add({ module: 'start', status: true }, { parse: true, merge: true }).save();

            location = '#apply/demographics';
        }
    });
});