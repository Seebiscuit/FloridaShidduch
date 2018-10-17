define(['app', 'models/AuthenticatedModel'], function (app, AuthenticatedModel) {
    var validationTemplate = {
        rank: { required: false },
        name: { required: false },
        cityAndState: { required: false },
        phone: { required: false },
        relationship: { required: false }
    };

    var validation = [1, 2, 3].map(function (n) {
        var v = {};

        Object.keys(template).forEach(function (key) {
            v[key + n] = validationTemplate[key];
        })

        return v;
    });

    return AuthenticatedModel.extend({
        idAttribute: 'userId',

        urlRoot: function () {
            return app.getApiRoot + 'References/';
        },

        url: function () {
            return _.result(this, 'urlRoot') + this.user.id;
        },

        parse: function (response, options) {
            return response.reduce(function (memo, reference, index) {
                Object.keys(reference).forEach(function (key) {
                    memo[key + index + 1] = reference[key];
                });

                return memo;
            }, {})
        },

        toJSON: function (options) {
            var references = [];

            Object.keys(this.attributes).forEach(function (key) {
                var attrKey = key.substr(0, key.length - 2);
                var n = parseInt(key[key.length - 1]);

                if (references[n] === undefined)
                    references[n] = {};

                references[n][attrKey] = this.attributes[key];
            });

            return references;
        },

        validation: validation
    });
});