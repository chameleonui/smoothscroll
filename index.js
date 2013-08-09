var $ = require('jquery');
var Emitter = require('emitter');

module.exports = Smoothscroll;

var defaults = {
	clickEvent: 'click.smoothscroll',
	topOffset: '85',
	speed: 300
};

function Smoothscroll(Element, options){
	this.options = options || {};
	for (var i in defaults) {
		if (!(this.options[i])) this.options[i] = defaults[i];
	}

	Emitter.call(this);

	this._element = Element;
	this._onCLick();
}

Emitter(Smoothscroll.prototype);

Smoothscroll.prototype._onCLick = function() {
    $('body').on(this.options.clickEvent, this._element, this, function(e){
        e.preventDefault();
        var link = this;
        e.data._pageScroll(link.hash);
    });

    return this;
};

Smoothscroll.prototype._pageScroll = function(targetHash) {
	var _this = this;
	var offset = ($(targetHash).offset().top) - this.options.topOffset;
    $('body').animate(
    	{ scrollTop : offset },
    	{ 
    		duration: this.options.speed, 
    		complete: function(){
	    		_this.emit('end');
    		} 
    	});

    return this;
};