define([
    'marionette'
    , 'templates'
    , 'user-login'
],

function (Marionette, templates, userLogin) {
    return Marionette.LayoutView.extend({
        template: templates.apply.register,

        tagName: 'form',

        className: 'nobottommargin',

        ui: {
            email: '#register-form-email',
            password: '#register-form-password',
            confirmPassword: '#register-form-repassword',
            inputs: 'input',
            registerButton: '#register-form-submit',
            confirmPasswordOk: '.confirm-password-ok',
            emailOk: '.email-ok'
        },

        events: {
            'input @ui.email': 'validateEmail',
            'input @ui.confirmPassword': 'validatePassword',
            'keypress @ui.inputs': 'validateInputs',
            'click @ui.registerButton': 'validateInputs'
        },

        initialize: function () {

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
            if (e.which == 13 || e.which == 1) {
                e.preventDefault();
                if (this.isEmailValid && this.isPasswordValid)
                    this.register(
                        this.ui.email.val(),
                        this.ui.password.val(),
                        this.ui.confirmPassword.val()
                    );
                else
                    alert("Please check your registration information and try again.");
            }
        },

        register: function (email, password, confirmpassword) {
            userLogin.register(email, password, confirmpassword)
                .then(function () {
                    document.location = '#home';
                });
        }

    });
});
