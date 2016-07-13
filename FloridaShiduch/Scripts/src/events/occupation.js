define([], function () {
    return {
        modelEvents: {
            'change:hebrewEducationLevel': 'updateYeshiva',
            'change:israelStudy': 'updateIsraelStudy',
            'change:secularEducationLevel': 'updateCollege',
            'change:jobType': 'updateOccupation'
        },

        updateYeshiva: function (model, val, options) {
            val = val == 'yeshiva' ? true : false;
            this.updateBoolean(val, ['yeshiva', '']);
        },

        updateIsraelStudy: function (model, val, options) {
            this.updateBoolean(val, ['israel-study', '']);
        },

        updateCollege: function (model, val, options) {
            var index, classes, remove,
                colleges = ['bachelors', 'masters', 'doctorate'];

            if ((index = colleges.indexOf(val)) + 1) {
                remove = colleges.slice(), remove.splice(index, 1);
                classes = [val, remove.join(' ')];
                val = true;
            } else {
                classes = [colleges.join(' '), ''];
                val = false;
            }

            this.updateBoolean(val, classes);
        },

        updateOccupation: function (model, val, options) {
            // Update 'working' inputs
            this.updateBoolean(!!(val.indexOf('working') + 1), ['working', '']);
            // Update 'other' inputs
            this.updateBoolean(!!(val.indexOf('other') + 1), ['other-occupation', '']);
        }
    };
});