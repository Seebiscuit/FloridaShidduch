define(['app', 'marionette', 'text!lib/upload-file/upload-file.html'], function UploadFile(app, Mn, template) {
    "use strict"
    const HEIGHT = 350, WIDTH = 300;
    const animateClasses = 'uf-upload uf-uploading uf-complete uf-uploaded uf-error';

    return Mn.LayoutView.extend({
        template: _.template(template),

        className: 'file-upload-component uf-upload',

        regions: {
            imagePreview: '@ui.imagePreview'
        },

        ui: {
            imagePreview: '[data-hook="image-preview"]',
            options: 'select',
            imageInput: 'input[name="image"]',
            urlInput: 'input[name="image"]',
            uploadButton: '[data-hook="upload"]',
            uploadingButton: '[data-hook="uploading"]',
            doneButton: '[data-hook="done"]',
            changeButton: '[data-hook="change"]',
            errorButton: '[data-hook="error"]'
        },

        events: {
            'change @ui.imageInput': 'handleFileSelect',
            'change @ui.options': 'handleOption',
            'click @ui.uploadButton': 'upload',
            'click @ui.changeButton': 'reset',
            'click @ui.errorButton': 'reset'
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
            this.$el.removeClass(animateClasses);
            this.$el.addClass('uf-uploading');
            var image = this.imagePreview.ui.canvas.get(0).toDataURL("image/jpeg").replace('data:image/jpeg;base64,', '');
            if (image) {
                //    var formData = new FormData();
                //    formData.append('file', file);
                $.ajax({
                    url: app.getApiRoot + 'UserFiles/',
                    type: "post",
                    data: JSON.stringify({ image: image }),// formData,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    error: function () {
                    }
                })
                .success(function () {
                    this.$el.removeClass(animateClasses);
                    this.$el.addClass('uf-complete');
                    this.ui.doneButton.addClass('fadeIn');
                    setTimeout(function () {
                        this.$el.removeClass(animateClasses);
                        this.$el.addClass('uf-uploaded');
                    }.bind(this), 1500);
                }.bind(this))
                .error(function () {
                    $("#file_upload_result").html('there was an error while submitting');
                    this.$el.removeClass(animateClasses);
                    this.$el.addClass('uf-error');
                }.bind(this));
            }
        },

        previewImage: function previewImage(file, e) {
            var region = this.getRegion('imagePreview');
            require(['lib/upload-file/ImagePreview'], function showImagePreview(ImagePreview) {
                this.imagePreview = region.view = new ImagePreview({ src: e.target.result, file: file });
                region.show(region.view);
            }.bind(this));
            this.$el.addClass('uf-preview');
        },
        
        reset: function (e) {
            this.getRegion('imagePreview').reset();
            this.$el.removeClass('uf-preview');
            this.$el.removeClass(animateClasses);
            // Show buttons on file select
            this.$el.addClass('uf-upload');
            // Reset input element
            this.ui.imageInput.val('');
        },

        handleFileSelect: function (e) {
            var files = e.target.files,
                f = files[0],
                reader = new FileReader();

            if (f) {
                reader.onload = this.previewImage.bind(this, f);

                reader.readAsDataURL(f);
            }
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