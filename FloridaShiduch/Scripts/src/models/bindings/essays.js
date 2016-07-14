define(['bindings', 'behaviors/essays'], function (Bindings, EssaysBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.character': 'character',
        '@ui.spouseCharacter': 'spouseCharacter',
        '@ui.specialInterests': 'specialInterests'
    }, EssaysBehavior.prototype.ui);

    return bindings;
});