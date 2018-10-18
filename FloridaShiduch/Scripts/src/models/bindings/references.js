define(['bindings', 'behaviors/references'], function (Bindings, ReferencesBehavior) {
    'use strict';
    // Singleton
    var bindingsTemplate = {
        '@ui.rank': {
            observe: 'rank#',
            setOps: { validate: true }
        },
        '@ui.name': {
            observe: 'name#',
            setOps: { validate: true }
        },
        '@ui.cityAndState': {
            observe: 'cityAndState#',
            setOps: { validate: true }
        },
        '@ui.phone': {
            observe: 'phone#',
            setOps: { validate: true }
        },
        '@ui.relationship': {
            observe: 'relationship#',
            setOps: { validate: true }
        }
    };

    var bindings = [1, 2, 3].reduce(function (b, n) {
        Object.keys(bindingsTemplate).forEach(function (key) {
            b[key + n] = bindingsTemplate[key];

            b[key + n].observe = bindingsTemplate[key].observe.replace('#', n)
        })

        return b;
    }, {})


    bindings = new Bindings(bindings, ReferencesBehavior.prototype.ui);


    return bindings;
});