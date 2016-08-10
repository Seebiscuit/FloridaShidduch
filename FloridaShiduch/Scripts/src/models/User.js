define(['app', 'backbone'], function User(app, Backbone) {
    return Backbone.Model.extend({
        initialize: function (options) {
            options = options || {};

            this.validation = validation(options.withConf);
        }
    });

    function validation(withConf) {
        var base = {
            email: [{
                required: true,
                msg: 'Please enter an email address'
            }, {
                pattern: 'email',
                msg: 'Please enter a valid email'
            }]
        },
        confirm = {
            password: [{
                required: true,
                msg: 'Please enter an password'
            }, {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
                msg: 'Your password must be between 6 and 12 characters long and must include at least one letter and one number'
            }],
            confirmPass: {
                equalTo: 'password',
                msg: 'Your passwords don\'t match'
            }
        };

        return withConf ? _.extend(base, confirm) : base;
    };
});