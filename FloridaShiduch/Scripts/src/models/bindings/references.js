define(['bindings', 'behaviors/references'], function (Bindings, ReferencesBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.rank': 'rank',
        '@ui.name': 'name',
        '@ui.cityAndState': 'cityAndState',
        '@ui.phone': 'phone',
        '@ui.relationship': 'relationship',
    }, ReferencesBehavior.prototype.ui);


    return bindings;
});