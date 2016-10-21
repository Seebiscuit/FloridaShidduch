define(['app', 'backbone'], function AuthenticatedModel(app, Backbone) {
    return Backbone.Model.extend({
        constructor: function (attr, options) {
            if (!options || options.user) throw new Error('Authenticated model must have user')
            this.user = options.user;

            Backbone.Model.prototype.constructor.apply(this, arguments);
        },

        sync: function (method, collection, options) {
            if (!this.user.isLoggedIn()) {
                alert('You are not logged in. You will be directed to the login page.')
                location = '#login'
            }
            options = options || {};
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Authorization', ("Bearer " + this.user.getUserToken()));
            };
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }

    });
})