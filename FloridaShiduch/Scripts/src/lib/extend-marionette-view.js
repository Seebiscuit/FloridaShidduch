define(['app', 'marionette', 'state'], function (app, Marionette, state) {
    var View = Marionette.View;

    Marionette.View = View.extend({
        constructor: function () {

            this.state = state;
            
            state.user.on('all', this.triggerMethod, this);

            View.prototype.constructor.apply(this, arguments);
        }
    });
});