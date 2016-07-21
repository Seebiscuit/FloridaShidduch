define(['app', 'backbone', 'store'], function User(app, Backbone, store) {
    "use strict"
    var LoggedInUser = Backbone.Model.extend({
        initialize: function initUser() {
            if (this.isLoggedIn())
                this.set(this.getUserFromStore());
        },

        register: function (email, password, confirmpassword) {
            this.url = app.getApiRoot + 'Account/Register';
            return this.postUser({
                email: email,
                password: password,
                confirmPassword: confirmpassword
            }, null, 'registration');
        },
        /**
         * Logs a registered user in
         *
         * @param {User} user - username, password
         * @return {Promise} ajax 
         */
        login: function userLogin(user) {
            this.url = '/Token';
            return this.postUser(_.extend(user, { grant_type: 'password' }), {
                data: "userName=" + user.username + "&password=" + user.password +  // Nasty hack to get /Token to accept payload
                  "&grant_type=password",
                contentType: "application/x-www-form-urlencoded"
            });
        },
        /**
         * Logs the signed in user out
         *
         * @return {Promise} ajax 
         */
        logout: function userLogin(user) {
            this.clear();
            this.removeLogin();
            window.location.reload();
        },

        postUser: function (user, options, type) {
            return this.save(user, options)
                        .then(_.bind(function (userdata) {
                            // Login successful remove password
                            this.unset('password')
                            if (type == 'registration') this.unset('confirmPassword');
                            this.setLogin();
                            app.radios.rootChannel.request('reload:nav');
                            return userdata;
                        }, this));
        },

        getUserFromStore: function () {
            return store.getStore().login;
        },

        isLoggedIn: function () {
            var user;

            if ((user = this.getUserFromStore()))
                return new Date() < new Date(user['.expires']);

            return false;
        },

        isLoggedInAdminUser: function () {
            if (this.isLoggedIn())
                return this.get('userName') == app.adminUserId;

            return false;
        },

        getUserToken: function getUsetToken() {
            return (this.getUserFromStore() || {}).access_token;
        },

        getAuthorization: function () {
            var token = this.getUserToken();
            var headers = {};
            if (token) 
                headers.Authorization = 'Bearer ' + token;

            return headers;
            
        },

        setLogin: function setLogin() {
            store.setItem('login', this.toJSON());
        },

        removeLogin: function setLogin() {
            store.setItem('login', '');
        },

        validateEmail: function (email) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return regex.test(email);
        },

        validatePasswordConfirm: function (password, repassword) {
            return password.length > 0 && password === repassword;
        }
    });

    return new LoggedInUser;
});