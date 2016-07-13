define([], function () {
    return {
        modelEvents: {
            'change:bornJewish': 'updateBornJewish',
            'change:baalTeshuva': 'updateBornJewish',
            'change:isKohen': 'updateIsBT'
        },

        updateBornJewish: function (model, val, options) {
            this.updateBoolean(val, ['', 'convert']);
        },

        updateIsKohen: function (model, val, options) {
            this.updateBoolean(val, ['kohen', '']);
        },

        updateIsBT: function (model, val, options) {
            this.updateBoolean(val, ['bt', '']);
        }
    };
});