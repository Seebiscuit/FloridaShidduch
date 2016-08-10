define(['app', 'marionette', 'text!lib/upload-file/upload-file.html'], function UploadFile(app, Mn, template) {
    "use strict"
    return Mn.LayoutView.extend({
        template: _.template(template),

        className: 'file-upload-component upload',

        regions: {
            imagePreview: '[data-hook="image-preview"]'
        },

        ui: {
            options: 'select',
            imageInput: 'input[name="image"]',
            urlInput: 'input[name="image"]',
            uploadButton: 'button.upload'
        },

        events: {
            'change @ui.imageInput': 'handleFileSelect',
            'change @ui.options': 'handleOption',
            'click @ui.uploadButton': 'upload',
        },

        viewOptions: [],

        initialize: function uploadFileInitialize(options) {
            this.mergeOptions(options, this.viewOptions)
        },

        onAttach: function () {
        },

        focusInput: function (e) {
            this.ui.imageInput.focus();
        },

        upload: function (e) {
            var file = this.ui.imageInput.get(0).files[0]
            if (file) {
                var formData = new FormData();
                formData.append('file', file);
                $.ajax({
                    url: app.getApiRoot + 'SaveFile/',
                    type: "post",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: _.bind(this.previewImage, this),
                    error: function () {
                        $("#file_upload_result").html('there was an error while submitting');
                    }
                });
            }
        },

        previewImage: function previewImage(file, e) {
            var region = this.getRegion('imagePreview');
            require(['lib/upload-file/ImagePreview'], function showImagePreview(ImagePreview) {
                region.view = new ImagePreview({ src: e.target.result, file: file });
                region.show(region.view);
            });
            this.$el.addClass('preview');
        },

        handleFileSelect: function (e) {
            var files = e.target.files,
                f = files[0],
                reader = new FileReader();

            reader.onload = this.previewImage.bind(this, f);

            reader.readAsDataURL(f);
        },

        handleOption: function (e) {
            switch (this.ui.options.val()) {
                case 'File':
                    this.$el.removeClass('upload-url');
                    break;
                case 'URL':
                    this.$el.addClass('upload-url');
                    break;
            }
        }
    });
});