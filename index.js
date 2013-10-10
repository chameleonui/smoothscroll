var $ = require('jquery');
var Emitter = require('emitter');

module.exports = Smoothscroll;

var defaults = {
	clickEvent: 'click.smoothscroll',
	topOffset: '85',
	speed: 400
};

function Smoothscroll(Element, options){
	this.options = options || {};
	for (var i in defaults) {
		if (!(this.options[i])) this.options[i] = defaults[i];
	}

	Emitter.call(this);

	this._element = Element;

    if (document.querySelectorAll(this._element)[0]) {
        this._onCLick();
    }
}

Emitter(Smoothscroll.prototype);

Smoothscroll.prototype._onCLick = function() {
    $('body').on(this.options.clickEvent, this._element, this, function(e){
        e.preventDefault();
        var link = this;
        if (link.hash) {
            e.data._pageScroll(link.hash);
        }
    });

    return this;
};

Smoothscroll.prototype._pageScroll = function(targetHash) {
	var _this = this;
    if (targetHash === '#top') {
        var offset = 0;
    } else {
        if (document.querySelectorAll(targetHash)[0]) {
            var offset = ($(targetHash).offset().top) - this.options.topOffset;
        }
    }
    $('html, body').animate(
        { scrollTop : offset },
        {
            duration: this.options.speed,
            easing: 'swing',
            complete: function(){
                _this.emit('end');
            }
        }
    );

    return this;
};
