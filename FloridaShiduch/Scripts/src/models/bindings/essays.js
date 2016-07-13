define(['bindings'], function (Bindings) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '#register-essays-character': 'character',
        '#register-essays-spouse-character': 'spouseCharacter',
        '#register-essays-specialinterests': 'specialInterests'
    });

    return bindings;
});