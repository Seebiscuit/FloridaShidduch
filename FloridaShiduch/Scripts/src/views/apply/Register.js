define(['app'
    , 'marionette'
    , 'templates'
    , 'models/User'
    , 'user-login'
],

function (app, Marionette, templates, User, userLogin) {
    return Marionette.LayoutView.extend({
        constructor: function (options) {
            // Deep extend events and handlers and bindings without writing to _proto_ references
            var clone, extensions = Marionette.getOption(options, 'bindings');

            this._addStaticProps(extensions);

            Marionette.LayoutView.prototype.constructor.apply(this, arguments);
        },

        template: templates.apply.register,

        id: 'register',

        className: 'nobottommargin',

        ui: {
            email: '#register-form-email',
            password: '#register-form-password',
            confirmPassword: '#register-form-confirmpass',
            inputs: 'input',
            submit: '#register-form-submit',
            confirmPasswordOk: '.confirm-password-ok',
            emailOk: '.email-ok',
            login: '[data-hook="login"]',
            register: '[data-hook="register"]'
        },

        events: function () {
            var base = {
                'keypress @ui.inputs': 'validateInputs',
                'click @ui.submit': 'validateInputs',
                'click @ui.login': 'showLogin',
                'click @ui.register': 'showRegister'
            },
            noBindings = {
                'input @ui.email': 'validateEmail',
                'input @ui.confirmPassword': 'validatePassword',
            };

            if (!this.bindings) _.extend(base, noBindings);

            return base;
        },

        initialize: function () {
        },

        onRender: function () {
            if (this.isLoggedIn)
                return app.radio.view.root.reqres.request('show:apply');

            if (this.userModel)
                Backbone.Validation.unbind(this, { model: this.userModel });

            this.userModel = new User(null, { withConf: !this.isLoggingIn });

            Backbone.Validation.bind(this, { model: this.userModel });
            this.stickit(this.userModel);
        },

        showLogin: function () {
            this.isLoggingIn = true;
            this.$el.addClass('login');
            this.render();
        },

        showRegister: function () {
            this.isLoggingIn = false;
            this.$el.removeClass('login');
            this.render();
        },

        validateEmail: function (e) {
            if ((this.isEmailValid = userLogin.validateEmail(this.ui.email.val())))
                this.ui.emailOk.removeClass('icon-remove').addClass('icon-ok');
            else
                this.ui.emailOk.addClass('icon-remove').removeClass('icon-ok');
        },

        validatePassword: function (e) {
            if ((this.isPasswordValid = userLogin.validatePasswordConfirm(this.ui.password.val(), this.ui.confirmPassword.val())))
                this.ui.confirmPasswordOk.removeClass('icon-remove').addClass('icon-ok');
            else
                this.ui.confirmPasswordOk.addClass('icon-remove').removeClass('icon-ok');
        },

        validateInputs: function (e) {
            var method, args;
            if (e.which == 13 || e.which == 1) {
                e.preventDefault();

                this.userModel.validate();

                if (this.userModel.isValid() || this.isEmailValid && this.isPasswordValid) {
                    args = [this.ui.email.val(), this.ui.password.val(), this.ui.confirmPassword.val()];
                    method = 'register';

                    if (this.isLoggingIn)
                        method = 'login';

                    this[method].apply(this, args);
                } else
                    alert("Please check your registration information and try again.");
            }
        },

        register: function (email, password, confirmpassword) {
            userLogin.register(email, password, confirmpassword)
                .then(function () {
                    app.radio.view.rootRadio.reqres.request('apply:show');
                }.bind(this));
        },

        login: function (email, password, confirmpassword) {
            userLogin.login(email, password)
            .then(function () {
                app.radio.view.rootRadio.reqres.request('apply:show');
            }.bind(this));
        },

        _addStaticProps: function (obj) {
            for (var name in obj) {
                if (_.isString(obj[name]) || _.isFunction(obj[name]))
                    clone = obj[name];
                else if (name in this)
                    clone = $.extend({}, this[name], obj[name]);
                else
                    clone = $.extend({}, obj[name]);

                this[name] = clone;
            }
        },

    });
});
