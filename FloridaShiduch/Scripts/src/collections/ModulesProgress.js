define(['app', 'backbone', 'collections/AuthenticatedCollection', 'models/ModuleProgress'], function (app, Backbone, AuthenticatedCollection, Progress) {
    return AuthenticatedCollection.extend({
        model: Progress,

        url: function () {
            return app.getApiRoot + 'Progress/' + this.user.id;
        },

        //add: function (model) {
        //    var cModel;
            
        //    if ((cModel = this.find(function (m) { return m.get('module') == model.module })))
        //        return cModel.save('status', model.status);
        //    else
        //        return Backbone.Collection.prototype.add.call(this, model, { user: this.user }).save(null, { method: 'POST' });
        //}
    });
})