define(['app', 'marionette'],
    function (app, Mn) {
        "use strict";

        var radios, modelRadios, RadioCentral

        RadioCentral = function () {
            // List of radio channels. Each name will be suffixed with 'Radio'
            // So for example, the 'case' channel can be found as: app.radio.caseRadio
            // Or using the Backbone.Wreqer.radio.channel('case') method
            radios = [
                'root'
            ];

            modelRadios = [
                'login'
            ]

            app.radio = {
                view: {},
                model: {}
            };

            this.setupRadios(radios);
        }

        RadioCentral.prototype.createRadio = function (type, name) {
            var radio = app.radio[type][(name + 'Radio')] = Backbone.Wreqr.radio.channel(name);
            radio.vent = new Backbone.Wreqr.EventAggregator();
            radio.reqres = new Backbone.Wreqr.RequestResponse();
            radio.commands = new Backbone.Wreqr.Commands();
        };

        RadioCentral.prototype.setupRadios = function (radios) {
            radios.map(_.partial(this.createRadio, 'view'));
            modelRadios.map(_.partial(this.createRadio, 'model'));
        };

        return new RadioCentral;
    });