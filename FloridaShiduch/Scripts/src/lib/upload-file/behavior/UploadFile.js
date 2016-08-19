define(['marionette', 'lib/upload-file/UploadFile'], function (Marionette, UploadFile) {
    'use strict';
    return Marionette.Behavior.extend({
        onRender: function () {
            // Inject region...
            this.view.addRegions({
                upload: '[data-hook="file-upload"]'
            });
            // ...and add view
            var region = this.view.getRegion('upload');

            region.view = new UploadFile;
            region.show(region.view);
        }
    });
});