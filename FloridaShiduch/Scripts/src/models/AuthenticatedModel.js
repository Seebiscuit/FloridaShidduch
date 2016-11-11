define(['app', 'backbone', 'state'], function AuthenticatedModel(app, Backbone, state) {
    return Backbone.Model.extend({
        constructor: function (attr, options) {
            this.user = state.user

            Backbone.Model.prototype.constructor.apply(this, arguments);
            
            this.attributes.applicationUser = this.user;
        },

        sync: function (method, collection, options) {
            var user = this.get('applicationUser');
            if (!this.user.isLoggedIn()) {
                alert('You are not logged in. You will be directed to the login page.')
                return location = '#login';
            }

            options = options || {};
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Authorization', ("Bearer " + user.getUserToken()));
            }.bind(this);
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }

    });
})