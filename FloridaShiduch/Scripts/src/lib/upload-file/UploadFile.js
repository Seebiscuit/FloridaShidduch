define(['app', 'marionette', 'text!lib/upload-file/upload-file.html'], function UploadFile(app, Mn, template) {
    "use strict"
    const HEIGHT = 350, WIDTH = 300;
    
    return Mn.LayoutView.extend({
        template: _.template(template),

        className: 'file-upload-component upload',

        regions: {
            imagePreview: '@ui.imagePreview'
        },

        ui: {
            imagePreview: '[data-hook="image-preview"]',
            options: 'select',
            imageInput: 'input[name="image"]',
            urlInput: 'input[name="image"]',
            uploadButton: '[data-hook="upload"]'
        },

        events: {
            'change @ui.imageInput': 'handleFileSelect',
            'change @ui.options': 'handleOption',
            'click @ui.uploadButton': 'upload',
        },

        viewOptions: [],

        initialize: function uploadFileInitialize(options) {
            this.mergeOptions(options, this.viewOptions);
        },

        onAttach: function () {
            this.ui.imagePreview.css({ height: HEIGHT, width: WIDTH });
        },

        focusInput: function (e) {
            this.ui.imageInput.focus();
        },

        upload: function (e) {
            var file = this.imagePreview.ui.canvas.get(0).toDataURL("image/jpeg").replace('data:image/jpeg;base64,', '');
            if (file) {
                var formData = new FormData();
                formData.append('file', file);
                $.ajax({
                    url: app.getApiRoot + 'UserFiles/',
                    type: "post",
                    data: formData,
                    processData: false,
                    contentType: false,
                    error: function () {
                        $("#file_upload_result").html('there was an error while submitting');
                    }
                });
            }
        },

        previewImage: function previewImage(file, e) {
            var region = this.getRegion('imagePreview');
            require(['lib/upload-file/ImagePreview'], function showImagePreview(ImagePreview) {
                this.imagePreview = region.view = new ImagePreview({ src: e.target.result, file: file });
                region.show(region.view);
            }.bind(this));
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