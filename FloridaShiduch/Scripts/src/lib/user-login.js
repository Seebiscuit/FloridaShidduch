define(['app', 'backbone', 'store'], function User(app, Backbone, store) {
    "use strict"
    var LOGINGPATH = 'login.',
        UserLogin = Backbone.Model.extend({
        initialize: function initUser(attrs, options) {
            this.on('change', this.setLogin);
        },

        register: function (email, password, confirmpassword) {
            this.url = app.getApiRoot + 'Account/Register';
            return this.postUser({
                email: email,
                password: password,
                confirmPassword: confirmpassword
            }, null, 'registration');
        },

        login: function userLogin(email, password) {
            this.url = '/Token';
            return this.postUser({
                userName: email,
                password: password
            },
                {
                    emulateJSON: true,
                    data: "userName=" + email + "&password=" + password +  // Nasty hack to get /Token to accept payload
                      "&grant_type=password"
                })
            // .then(function () { /* app.radios.rootChannel.request('user:login')*/ })
            ;

            //TODO: Set up activity listener and logout user after inactivity;
        },
        /**
         * Logs the signed in user out
         *
         * @return {Promise} ajax 
         */
        logout: function userLogin(user) {
            this.removeLogin();
            this.attributes =  this._previousAttributes = {};
        },

        postUser: function (user, options, type) {
            return this.save(user, _.extend({}, options, { wait: true }))
                        .then(_.bind(function (userdata) {
                            //app.radios.rootChannel.request('user:registered');
                            // Login successful remove password
                            var password = this.get('password');
                            this.unset('password')

                            if (type == 'registration') {
                                this.unset('confirmPassword');
                               return this.login(this.get('userName'), password);
                            } 

                            return userdata;
                        }, this));
        },

        isLoggedIn: function () {
            var user, users;

            if (this.get('userName')) {
                if ((user = this.getUserFromStore(this.get('userName'))))
                    return new Date() < new Date(user['.expires']) && user;
            } else {
                users = store.getItem(LOGINGPATH.substring(0, LOGINGPATH.length - 1));
                if ((user = _.find(users, function (u) {
                    return new Date() < new Date(u['.expires']);
                }))) {
                    this.set(user);
                    return this.setLogin(user);
                }
            }

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

        getUserFromStore: function (username) {
            var userData;

            if ((userData = store.getItem(LOGINGPATH + username.replace('.', '\\.'))))
                return userData;
        },

        setLogin: function setLogin() {
            return store.setItem(LOGINGPATH + this.get('userName').replace('.', '\\.'), this.toJSON());
        },

        removeLogin: function setLogin() {
            if (this.get('userName'))
                store.setItem(LOGINGPATH + this.get('userName').replace('.', '\\.'), '');
        },

        parse: function (resp) {
            resp.escapedUserName = resp.userName.replace('.', '\\.');

            return resp;
        },

        validateEmail: function (email) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return regex.test(email);
        },

        validatePasswordConfirm: function (password, repassword) {
            return password.length > 0 && password === repassword;
        }
    });

    return new UserLogin;
});