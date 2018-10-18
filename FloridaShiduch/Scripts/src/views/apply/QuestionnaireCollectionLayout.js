define(['app', 'marionette', 'templates', 'views/apply/QuestionnaireCollectionView'],
    function (app, Marionette, templates, QuestionnaireCollectionView) {
        return Marionette.LayoutView.extend({
            template: templates.apply.questionnaireCollectionLayout,

            attributes: {
                style: "position:relative;"
            },

            ui: {
                listRegion: '[data-region="list"]',
                add: '[data-hook="add-item"]'
            },

            regions: {
                list: '@ui.listRegion'
            },

            events: {
                'click @ui.add': 'onClickAddItem'
            },

            initialize: function (options) {
                this.options = _.clone(options);

                this.collection = this.options.model;
                this.options.collection = this.collection;
                delete this.options.model;
            },

            onBeforeShow: function () {
                this.showCollectionView();
            },

            showCollectionView: function () {
                var region = this.getRegion('list');

                region.view = new QuestionnaireCollectionView(this.options);
                region.show(region.view);

                if (!this.collection.length) this.addItem();
            },

            onClickAddItem: function (e) {
                this.addItem();
            },

            addItem: function () {
                this.collection.add({ rank: this.collection.length + 1 });
            }

        });
    });