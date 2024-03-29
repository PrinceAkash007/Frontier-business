! function(e, i, t) {
    function s(i, t, s, h) {
        this.slider = window[i], this.slider.started(e.proxy(this.start, this, i, t, s, h))
    }
    s.prototype.start = function(i, t, s, h) {
        return this.slider.sliderElement.data("arrow") ? !1 : (this.slider.sliderElement.data("arrow", this), this.deferred = e.Deferred(), this.slider.sliderElement.on("SliderDevice", e.proxy(this.onDevice, this)).trigger("addWidget", this.deferred), this.previous = e("#" + i + "-arrow-previous").on("click", e.proxy(function(e) {
            e.stopPropagation(), this.slider[nextend.rtl.previous]()
        }, this)), this.previousResize = this.previous.find(".n2-resize"), 0 == this.previousResize.length && (this.previousResize = this.previous), this.next = e("#" + i + "-arrow-next").on("click", e.proxy(function(e) {
            e.stopPropagation(), this.slider[nextend.rtl.next]()
        }, this)), this.nextResize = this.next.find(".n2-resize"), 0 == this.nextResize.length && (this.nextResize = this.next), this.desktopRatio = t, this.tabletRatio = s, this.mobileRatio = h, void e.when(this.previous.n2imagesLoaded(), this.next.n2imagesLoaded()).always(e.proxy(this.loaded, this)))
    }, s.prototype.loaded = function() {
        this.previousWidth = this.previousResize.width(), this.previousHeight = this.previousResize.height(), this.nextWidth = this.nextResize.width(), this.nextHeight = this.nextResize.height(), this.onDevice(null, {
            device: this.slider.responsive.getDeviceMode()
        }), this.deferred.resolve()
    }, s.prototype.onDevice = function(e, i) {
        var t = 1;
        switch (i.device) {
            case "tablet":
                t = this.tabletRatio;
                break;
            case "mobile":
                t = this.mobileRatio;
                break;
            default:
                t = this.desktopRatio
        }
        this.previousResize.width(this.previousWidth * t), this.previousResize.height(this.previousHeight * t), this.nextResize.width(this.nextWidth * t), this.nextResize.height(this.nextHeight * t)
    }, i.NextendSmartSliderWidgetArrowImage = s
}(n2, window);