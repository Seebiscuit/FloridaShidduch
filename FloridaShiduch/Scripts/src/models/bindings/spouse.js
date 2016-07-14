define(['bindings', 'behaviors/spouse'], function (Bindings, SpouseBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.minAge': 'minAge',
        '@ui.maxAge': 'maxAge',
        '@ui.minFeet': 'minFeet',
        '@ui.minInches': 'minInches',
        '@ui.maxFeet': 'maxFeet',
        '@ui.maxInches': 'maxInches',
        '@ui.maritalStatus': 'maritalStatus',
        '@ui.allowChildren': 'allowChildren',
        '@ui.hebrewEducationLevel': 'hebrewEducationLevel',
        '@ui.secularEducationLevel': 'secularEducationLevel',
        '@ui.tv': 'tv',
        '@ui.relocate': 'relocate',
        '@ui.aliyah': 'aliyah'
    }, SpouseBehavior.prototype.ui);


    return bindings;
});