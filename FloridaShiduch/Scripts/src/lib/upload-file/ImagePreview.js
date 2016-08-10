define(['app', 'marionette', 'text!lib/upload-file/image-preview.html'],
    function (app, Marionette, template) {
        "use strict"

        const HEIGHT = 350, WIDTH = 300;
        var debouncedResample = _.debounce(resampleHermite, 500);

        return Marionette.LayoutView.extend({
            template: _.template(template),

            tagName: 'figure',

            className: 'image-preview center-block editing',

            attributes: {
                style: ['height:', HEIGHT, 'width:', WIDTH].join('')
            },

            ui: {
                canvas: 'canvas',
                caption: 'figcaption',
                captionInput: '.caption-input',
                sizeSlider: 'input[name="size-slider"]',
                sizePercent: '.size-percent',
                removeable: '.removeable'
            },

            events: {
                'mousedown @ui.canvas': 'onMouseDown',
                'click @ui.caption': 'enableWriteCaption',
                'change @ui.captionInput': 'writeCaption',
                'input @ui.sizeSlider': 'changeDimensions'
            },

            viewOptions: ['src', 'file'],

            initialize: function imagePreviewInitialize(options) {
                this.mergeOptions(options, this.viewOptions);

                $(window).on('mousemove.image-preview', this.onMouseMove.bind(this));
                $(window).on('mouseup.image-preview', this.onMouseUp.bind(this));
            },

            PADDING: 30,

            onAttach: function imagePreviewOnRender() {
                this.loadCanvas();
            },

            loadCanvas: function () {
                var canvas = this.ui.canvas[0],
                    ctx = this.ctx = canvas.getContext("2d"),
                    img = this.img = new Image;

                img.onload = function () {
                    var ratio,
                        W = img.width,
                        H = img.height,
                        ratios = {
                            x: WIDTH / W,
                            y: HEIGHT / H
                        };

                    canvas.width = WIDTH;
                    canvas.height = HEIGHT;

                    ctx.drawImage(img, 0, 0); 
                    
                    this.axis = {
                            // Smaller ratio, larger side. This axis we can move
                            free:  ratios.x < ratios.y ? 'x' : 'y',
                            getRange: function (delta, curr) {
                                var margin =  this['margin_' + this.axis.free];

                                // See if the current mouse drag will overflow, relative
                                // to last position
                                delta += curr; 
                                
                                console.log('delta', delta, 'margin', margin, '         curr', curr)
                                if (delta < 0) {
                                    if (delta > margin * 2)
                                        return delta;
                                    else
                                        return margin * 2;
                                } else 
                                        return 0;
                                        
                            }.bind(this), 
                            // Larger ratio, smaller side
                            fixed: ratios.x > ratios.y ? 'x' : 'y'
                    };

                    // Always take the largest ratio, it comes from the smaller side
                    // And corrects the image so that the smaller side fits exactly
                    ratio = this.ratio = ratios[this.axis.fixed];

                    this.width = Math.round(W * ratio), this.height = Math.round(H * ratio);
                    this.margin_x = (WIDTH - this.width) / 2, this.margin_y = (HEIGHT - this.height) / 2;

                    ctx.clearRect(0, 0, WIDTH, HEIGHT);
                    ctx.drawImage( img, this.margin_x, this.margin_y, this.width, this.height);
                    //resampleHermite(canvas, W, H, this.width, this.height);
                    
                    this.initState();
                }.bind(this);

                img.src = this.src;
            },

            initState: function () {
                this.canvasOffsets = this.ui.canvas.offset();
                // Prepare utility function
                this.moveResampledImage = _.partial(debouncedResample, this.ui.canvas.get(0), this.img.width, this.img.height, this.width, this.height);
                // Init position
                this.dx = this.dy = this.dLimit_x = this.dLimit_y = 0;
                this['dLimit_' + this.axis.free] = this['margin_' + this.axis.free];
            },

            onMouseDown: function (e) {
//                this['d' + this.axis.free] = this['dLimit_' + this.axis.free];
                
                this['p' + this.axis.free] = e['page' + this.axis.free.toUpperCase()]; console.log('onMouseDown | p' + this.axis.free, this['p' + this.axis.free])

                this.isDragging = true;
            },

            onMouseUp: function (e) {
                this.isDragging = false;
            },

            onMouseMove: function (e) {
                if (this.isDragging) { 
                this['d' + this.axis.free] = e['page' + this.axis.free.toUpperCase()] - this['p' + this.axis.free],
                // Apply limit
                this['dLimit_' + this.axis.free] = this.axis.getRange(this['d' + this.axis.free], this['dLimit_' + this.axis.free]);
                console.log('onMouseMove | dx/y', this.dx, this.dy, 'dLimit_x/y', this.dLimit_x, this.dLimit_y, 'prevMouse', this.px, this.py)

                this['p' + this.axis.free] = e['page' + this.axis.free.toUpperCase()];

                console.log('image w/h:', this.width, this.height);
                    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
                    this.ctx.drawImage(this.img, this.dLimit_x, this.dLimit_y, this.width, this.height);

                    //if (this.ratio > 1) this.moveResampledImage(this.dx, this.dy);
                }
            },

            onBeforeDestroy: function () {
                $(window).off('.image-preview');
            }
        });

        function resampleHermite(canvas, W, H, W2, H2, mx, my) {
            var time1 = Date.now();
            W2 = Math.round(W2);
            H2 = Math.round(H2);
            var img = canvas.getContext("2d").getImageData(0, 0, W, H);
            var img2 = canvas.getContext("2d").getImageData(0, 0, W2, H2);
            var data = img.data;
            var data2 = img2.data;
            var ratio_w = W / W2;
            var ratio_h = H / H2;
            var ratio_w_half = Math.ceil(ratio_w / 2);
            var ratio_h_half = Math.ceil(ratio_h / 2);

            for (var j = 0; j < H2; j++) {
                for (var i = 0; i < W2; i++) {
                    var x2 = (i + j * W2) * 4;
                    var weight = 0;
                    var weights = 0;
                    var weights_alpha = 0;
                    var gx_r, gx_g, gx_b, gx_a;
                    var center_y = (j + 0.5) * ratio_h;

                    gx_r = gx_g = gx_b = gx_a = 0;

                    for (var yy = Math.floor(j * ratio_h) ; yy < (j + 1) * ratio_h; yy++) {
                        var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                        var center_x = (i + 0.5) * ratio_w;
                        var w0 = dy * dy //pre-calc part of w
                        for (var xx = Math.floor(i * ratio_w) ; xx < (i + 1) * ratio_w; xx++) {
                            var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                            var w = Math.sqrt(w0 + dx * dx);
                            if (w >= -1 && w <= 1) {
                                //hermite filter
                                weight = 2 * w * w * w - 3 * w * w + 1;
                                if (weight > 0) {
                                    dx = 4 * (xx + yy * W);
                                    //alpha
                                    gx_a += weight * data[dx + 3];
                                    weights_alpha += weight;
                                    //colors
                                    if (data[dx + 3] < 255)
                                        weight = weight * data[dx + 3] / 250;
                                    gx_r += weight * data[dx];
                                    gx_g += weight * data[dx + 1];
                                    gx_b += weight * data[dx + 2];
                                    weights += weight;
                                }
                            }
                        }
                    }
                    data2[x2] = gx_r / weights;
                    data2[x2 + 1] = gx_g / weights;
                    data2[x2 + 2] = gx_b / weights;
                    data2[x2 + 3] = gx_a / weights_alpha;
                }
            }

            canvas.getContext("2d").clearRect(0, 0, Math.max(W, W2), Math.max(H, H2));
            canvas.width = W2;
            canvas.height = H2;

            mx = mx || 0, my = my || 0;

            canvas.getContext("2d").putImageData(img2, mx, my);
        }
    });