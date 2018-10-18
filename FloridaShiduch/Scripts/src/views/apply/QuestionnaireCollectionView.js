define(['app', 'marionette', 'views/apply/Questionnaire'], function (app, Marionette, Questionnaire) {
    return Marionette.CollectionView.extend({
        className: 'apply-questionnaire-collection',

        initialize: function (options) {
            this.options = options;
        },

        childView: Questionnaire,

        childViewOptions: function () {
            var options = _.clone(this.options);

            delete options.collection;

            return options;
        }
    });
});