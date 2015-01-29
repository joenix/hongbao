define(function(require, exports, module) {

_ = window, _.onerror = function(msg, url, line){
	alert('msg: ' + msg + '\n' + 'url: ' + url + '\n' + 'line: ' + line);
	// return true;
};

/* Object Extend */
Array.prototype.min = function(){
	return Math.min.apply( Math, this );
}
Array.prototype.max = function(){
	return Math.max.apply( Math, this );
}
Array.prototype.remove = function( i ){
	return i < 0 ? this : this.slice(0, i).concat( this.slice(++i, this.length) );
}
Array.prototype.index = function( v ){
	for( var i=this.length; i--; ){
		if( this[i] == v ){
			return i;
		}
	}
}

/* jQuery Extend */
$.extend({

	bindShare: function(options){

		if( !options.type ){
			console.log('unknow share type');
			return;
		}

		options = options || {}
	  ,	options.uid = options.uid || ''
	  ,	options.title = options.title || ''
	  ,	options.image = options.image || ''
	  ,	options.description = options.description || ''
	  ,	options.url = options.url || ''

	  ,	options.appid = options.appid || 'wxc81bc3d270e46d21'
	  ,	options.width = options.width || 120
	  ,	options.height = options.height || 120

	  ,	options.callback = options.callback || $.noop;

		switch( options.type ){
			case 'web':

				var link = ''
						 + './?yjJumpClientPage=share'
						 + '&uid=' + options.uid
						 + '&shareTitle=' + options.title
						 + '&shareImageUrl=' + options.image
						 + '&shareDesc=' + options.description
						 + '&shareUrl=' + options.url;

				options.button.attr('href', link);

				break;
			case 'wx':
			
				function validateShare(result, share){
					if(result.err_msg != 'send_app_msg:cancel' && result.err_msg != 'share_timeline:cancel'){
						// The Share Callback: share == 1 ? timeline : friend
						options.callback( result, share );
					}
				}

				function onBridgeReady(){

					WeixinJSBridge.on('menu:share:appmessage', function(argv){
						WeixinJSBridge.invoke('sendAppMessage',
							{
								'appid'      : options.appid,
								'img_url'    : options.image,
								'img_width'  : options.width,
								'img_height' : options.height,
								'link'       : options.url,
								'title'      : options.title,
								'desc'       : options.description 
							},
							function(result){
								validateShare(result, 0);
							});
					});

					WeixinJSBridge.on('menu:share:timeline', function(argv){         
						WeixinJSBridge.invoke('shareTimeline',
							{
								'appid'      : options.appid,
								'img_url'    : options.image,
								'img_width'  : options.width,
								'img_height' : options.height,
								'link'       : options.url,
								'title'      : options.title,
								'desc'       : options.description
							},
							function(result){
								validateShare(result, 1);
							});
					});
				};

				if( document.addEventListener ){
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				}
				else{
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}

				break;
		}
	},

	timeout: function(options){
		options = options || {}
	  ,	options.callback = options.callback || $.noop
	  ,	options.time = options.time || 100
	  ,	options.result = options.time
	  ,	options.def = $.type(options.def) === 'boolean' ? options.def : false
	  ,	options.count = Math.abs( options.count || 1 )
	  ,	options.timeout
	  ,	options.action = function(){

			if( options.count ){

				options.timeout = _.setTimeout(function(){

					options.result = options.callback( options );

					if( $.isNumeric( options.result ) ){
						options.count = options.result;
					}

					--options.count, _.clearTimeout( options.timeout ), options.action();

				}, options.time);

				return;
			}

			_.clearTimeout( options.timeout );
		};

		if( options.def ){
			options.callback( options );
		}

		options.action();
	},

	emotion: function(options){

		options         = options         || {}
	  ,	options.insert  = options.insert  || {}
	  ,	options.delete  = options.delete  || {}
	  ,	options.onStart = options.onStart || $.noop
	  ,	options.onEnd   = options.onEnd   || $.noop;

		var _;
			_           = this
		  ,	_.timer
		  ,	_.inter     = options.inter || 100
		  ,	_.count     = 0
		  ,	_.stop
		  ,	_.line      = []
		  ,	_.func        = []
		  ,	_.cache     = {
		  		line: [], fn: []
			}
		  ,	_.comb      = function(arr, fn, callback){

		  		if( arr.length && fn.length && arr.length == fn.length ){

		  			var index = arr.index( arr.min() );

		  			_.cache.line.push( arr[ index ] ), _.cache.fn.push( fn[ index ] );

		  			return _.comb( arr = arr.remove( index ), fn = fn.remove( index ), callback );
		  		}

		  		return callback = callback || $.noop, callback( _.line = _.cache.line, _.func = _.cache.fn );
			}
		  ,	_.doCall    = function(count, arr, fn, callback){

				if( arr[0] == count ){
					return _.doCall(count, _.arr = arr.remove(0), (fn[0](), _.func = fn.remove(0)));
				}

				return callback = callback || $.noop, callback( _.line = arr, _.func = fn ), false;
			};

		// Push Prop From Insert
		$.each( options.insert, function(time, call){

			_.line.push( time || 0 ), _.func.push( call || $.noop );

		});

		// Push Prop From Delete
		$.each( options.delete, function(time, call){

			_.line.push( time || 0 ), _.func.push( call || $.noop );

		});

		// Comb Array + Fn
		_.comb( _.line, _.func);

		// For The Stop Condition
		_.stop = _.line.max();

		// Do Call
		$.timeout({
			time: _.inter,
			count: (_.QQ, 312272592),
			callback: function( option ){

				if( _.count > _.stop ){
					return option.count = !~0;
				}

				_.doCall( _.count, _.line, _.func, function(line, fn){
					_.count += _.inter;
				});

			}
		});
		
		return;
		// Can Do Too
		_.timer = setInterval(function(){

			if( _.count > _.stop ){
				return clearInterval( _.timer );
			}

			_.doCall( _.count, _.line, _.func, function(line, fn){

				_.count += _.inter;

			});

		}, _.inter);
	},

	runner: function(item, start, effect, time, callback){
		return item
			.css( start )
			.animate( effect, time, function(){
				if( callback ) callback();
				$.runner( item, start, effect, time );
			}), false;
	},

	txtWrite: function(text, board, speed){
		if( !text || !board ){
			return;
		}

		var length = text.length;

		$.timeout({
			time: speed || 138,
			count: length,
			callback: function(e){
				board.text( text.substr(0, length - e.count + 1) );
			}
		});
	}

});

});