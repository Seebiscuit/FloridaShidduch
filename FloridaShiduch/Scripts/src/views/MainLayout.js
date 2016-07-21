define([
    'marionette'
],

function (Marionette) {

    return Marionette.LayoutView.extend({
        el: '#main',

        template: false,

        onAttach: function (options) {
            // Start slider
            $('header #main-slider').unslider({
                animation: 'fade',
                autoplay: true,
                arrows: false,
                infinite: true,
                dots: true
            });
        }

    });
});
