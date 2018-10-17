define(['marionette'], function (Marionette) {
    'use strict';
    return Marionette.Behavior.extend({
        ui: function () {
            var template = {
                rank: '#rank',
                name: '#register-reference-#-fullname',
                cityAndState: '#register-reference-1-location',
                phone: '#register-reference-1-phone',
                relationship: '#register-reference-1-relationship'
            };

            return [1, 2, 3].map(function (n) {
                var ui = {};

                Object.keys(template).forEach(function (key) {
                    ui[key + n] = template[key].replace('#', n);
                })

                return ui;
            })
        }
    });
});