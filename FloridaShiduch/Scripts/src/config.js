requirejs.config({
    deps: ['main', 'jquery', 'picturefill', 'bootstrap', 'bootstrap-form', 'unslider', 'backbone.stickit', 'backbone.validate'],
    paths: {
        backbone: 'bower_components/backbone/backbone',
        jquery: 'bower_components/jquery/dist/jquery',
        marionette: 'bower_components/marionette/lib/core/backbone.marionette',
        underscore: 'bower_components/lodash/lodash',
        'underscore.string': 'bower_components/underscore.string/dist/underscore.string', // Exports 's' to global scope
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        'bootstrap-select': 'bower_components/bootstrap-select/dist/js/bootstrap-select',
        'bootstrap-form': 'bower_components/bootstrap-formhelpers/dist/js/bootstrap-formhelpers',
        'backbone.wreqr' : 'bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/backbone.babysitter',
        'backbone.stickit': 'bower_components/backbone.stickit/backbone.stickit',
        'backbone.validate': 'bower_components/backbone.validation/dist/backbone-validation-amd',
        text: 'bower_components/requirejs-text/text',
        'extend-marionette-view': 'lib/extend-marionette-view',
        state: 'lib/app-state',
        masterlayout: 'views/_masters/MasterLayout',
        bindings: 'lib/Stickit.Bindings',
        presentation: 'bower_components/legacy/script',
        scroll: 'bower_components/legacy/scroll',
        slider: 'bower_components/rangeslider.js/dist/rangeslider',
        unslider: 'bower_components/unslider/src/js/unslider',
        picturefill: 'bower_components/picturefill/dist/picturefill',
        'user-login': 'lib/user-login',
        'upload-file': 'lib/upload-file/behavior/UploadFile',
        'store': 'lib/store',
        'radios': 'lib/radios'

    },
    shim: {
        underscore: {
            exports: '_'
        },
        presentation: ['jquery'],
        scroll: ['jquery'],
        'bootstrap': ['jquery'],
        'bootstrap-select': ['jquery', 'bootstrap'],
        'bootstrap-form': ['jquery', 'bootstrap'],
        unslider: ['jquery']
    },
    packages: [
      { name: 'when', location: 'bower_components/when', main: 'when' }
    ]
});
