define(['bindings', 'behaviors/spouse'], function (Bindings, SpouseBehavior) {
    'use strict';
    // Singleton
    var bindings = new Bindings({
        '@ui.minAge': {
            observe: 'minAge',
            setOps: { validate: true }
        },
        '@ui.maxAge': {
            observe: 'maxAge',
            setOps: { validate: true }
        },
        '@ui.minFeet': {
            observe: 'minFeet',
            setOps: { validate: true }
        },
        '@ui.minInches': {
            observe: 'minInches',
            setOps: { validate: true }
        },
        '@ui.maxFeet': {
            observe: 'maxFeet',
            setOps: { validate: true }
        },
        '@ui.maxInches': {
            observe: 'maxInches',
            setOps: { validate: true }
        },
        '@ui.maritalStatus': {
            observe: 'maritalStatus',
            updateView: true,
            onSet: function (val, options) {
                if (Array.isArray(val))
                    return val.join(",");

                return val
            },
            onGet: function (val, options) {
                return (val || "").split(",")
            },
            setOps: { validate: true }
        },
        '@ui.allowChildren': {
            observe: 'allowChildren',
            setOps: { validate: true }
        },
        '@ui.hebrewEducationLevel': {
            observe: 'hebrewEducationLevel',
            setOps: { validate: true }
        },
        '@ui.secularEducationLevel': {
            observe: 'secularEducationLevel',
            setOps: { validate: true }
        },
        '@ui.tv': {
            observe: 'tv',
            setOps: { validate: true }
        },
        '@ui.relocate': {
            observe: 'relocate',
            setOps: { validate: true }
        },
        '@ui.aliyah': {
            observe: 'aliyah',
            setOps: { validate: true }
        }
    }, SpouseBehavior.prototype.ui);


    return bindings;
});