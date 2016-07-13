define([], function () {
    return {
        modelEvents: {
            'change:gender': 'updateGender'
        },

        updateGender: function (model, val, options) {
            var gender = ['male', 'female'],
                index = gender.indexOf(val);

            this.updateBoolean(!!index, gender);
        }
    };
});