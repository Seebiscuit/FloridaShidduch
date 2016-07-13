define([], function () {
    return {
        modelEvents: {
            'change:shulFrequency': 'updateShulFrequency'
        },

        updateShulFrequency: function (model, val, options) {
            val = val == 'other' ? true : false;
            this.updateBoolean(val, ['other-shul', '']);
        },
    };
});