;(function(_, undefined){

!function( location ){

	// Project Root
	_.root = _.root || (location.protocol + '//' + location.hostname + ':' + location.port + location.pathname).replace(/\/+$/, ''),
	// Document.Head
	_.head = _.document.querySelector('head'),
	// Document.Body
	_.body = _.document.body,
	// Is Internet Explorer
	_.isIE = !!~_.navigator.userAgent.indexOf('MSIE'),

	// Preload Manifest
	_.preloadMenifest = [
		{ src: _.root + '/library/preload/preloadjs-NEXT.min.js' },
		// { src: _.root + '/library/less/less.min.js' },
		{ src: _.root + '/library/jquery/jQuery.min.js' },
		{ src: _.root + '/library/weixin/api.js' },
		{ src: _.root + '/library/ejs/ejs.min.js' },
		{ src: _.root + '/library/extend/extend.js' }
	].concat( _.manifest || [] ),

	/* Console Object
	_.console = function( obj ){
		var info = '', i, board = document.createElement('div');

		board.style.cssText = 'position: fixed;'
							+ 'top: 1em;'
							+ 'right: 1em;'
							+ 'z-index: 2147483584;'
							+ 'width: 20em;'
							+ 'height: 30em;'
							+ 'overflow-x: hidden;'
							+ 'overflow-y: auto;'
							+ 'border: 1px solid ghostwhite;'
							+ 'border-radius: 3px;'
							+ 'background: rgba(255, 255, 255, .25);';

		for( i in obj ){
			info += i + ':' + obj[i] + '<br />';
		}
		board.innerHTML = info, document.body.appendChild( board );
	},
	*/

	// Create Element
	_.create = function( type ){
		return document.createElement( type );
	},

	// Sound Noise
	_.noise = function( url, type, callback ){

		// Property Tolerance
		url = url || '', type = type || url.match(/\w+$/), type = type ? type.toString() : undefined, callback = callback || function(){};

		var one = undefined, knot = false;

		if( type ){

			switch( type ){
				case 'js':
					one = _.create('script');

					one.type     = 'text/javascript',
					one.language = 'javascript',
					one.src      = url;

					one.onload = one.onreadystatechange = function(){

						if( one.ready ){
							return;
						}
						if( !one.readyState || one.readyState == 'loaded' || one.readyState == 'complete' ){
							one.onload = one.onreadystatechange = null;
							one.ready = true;

							callback( one );
						}

					}

					break;

				case 'css':
					one = _.create('link');

					one.type = 'text/css',
					one.rel  = 'stylesheet/less',
					one.href = url;

					knot = true;

					break;

				case 'less':
					one = _.create('link');

					one.type = 'text/css',
					one.rel  = 'stylesheet/less',
					one.href = url;

					knot = true;

					break;

				default:
					one = new Image();

					one.src = url;

					one.onload = function(){

						if( one.ready ){
							return;
						}
						if( one.complete == true ){
							one.onload = null, one.ready = true;
							callback( one );
						}

					}

					break;
			}

		}

		if( _.isIE ){
			for( var x in _.preloadMenifest ){
				_.document.write('<script type="text/javascript" src="' + _.preloadMenifest[x].src + '"></script>');
			}
			return;
		}

		if( one ){
			_.head.appendChild( one );
		}
		if( knot ){
			callback( one );
		}

	}( _.preloadMenifest.shift().src, 'js', function(){

		if( !_.createjs ){
			return;
		}

		// After Noise
		!function( preload ){

			if( _.loader === false ){
				return _.loader;
			}

			var loader   = _.create('div'),
				progress = _.create('progress'),
				display  = _.create('em');

				loader.className = 'loader';
				progress.value = 0, progress.max = 1;

			// 开始加载
			preload.on('fileload', function(e){
				loader.appendChild( progress ), loader.appendChild( display ), _.body.appendChild( loader );
			});

			// 加载中
			preload.on('progress', function(e){
				if( !e.progress ){
					return;
				}
				progress.value = e.progress, display.innerHTML = Math.floor( e.progress * 100 ) + '%';
			});

			// 加载完毕
			preload.on('complete', function(e){
				loader.removeChild( progress ), loader.removeChild( display ), _.body.removeChild( loader );
			});

			// 加载错误
			preload.on('error', function(e){
				console.log( e );
			});

			// 读取配置项
			preload.loadManifest( _.preloadMenifest, true, _.root );

		}( new createjs.LoadQueue(true) );

	});

}( _.location );

})(window);