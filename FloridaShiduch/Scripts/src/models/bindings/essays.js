define(['bindings', 'behaviors/essays'], function (Bindings, EssaysBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.character': {
            observe: 'character',
            setOps: { validate: true }
        },
        '@ui.spouseCharacter': {
            observe: 'spouseCharacter',
            setOps: { validate: true }
        },
        '@ui.specialInterests': {
            observe: 'specialInterests',
            setOps: { validate: true }
        }
    }, EssaysBehavior.prototype.ui);

    return bindings;
});