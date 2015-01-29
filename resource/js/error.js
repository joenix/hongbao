;(function(_, $, undefined){

var tip = $('section.error bdo');

$.timeout({
	time: 1000,
	count: 3,
	callback: function( options ){
		if( !~-options.count ){
			root ? _.location.href = root : _.history.back();
		}
		tip.text( Number( tip.text() ) - 1 );
	}
});

})(window, jQuery);