define(['app', 'backbone'], function (app, Backbone) {
    return Backbone.Model.extend({
        idAttribute: 'userId',

        urlRoot: '/api/Occupation/',

        url: function () {
            return _.result(this, 'urlRoot') + this.get('occupationType');
        }
    });
});