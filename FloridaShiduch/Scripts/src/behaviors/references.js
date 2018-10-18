define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: function () {
            var template = {
                rank: '#rank',
                name: '#register-reference-_-fullname',
                cityAndState: '#register-reference-_-location',
                phone: '#register-reference-_-phone',
                relationship: '#register-reference-_-relationship'
            };

            return [1, 2, 3].reduce(function (ui, n) {
                Object.keys(template).forEach(function (key) {
                    ui[key + n] = template[key].replace('_', n);
                })

                return ui;
            }, {});
        }
    });
});