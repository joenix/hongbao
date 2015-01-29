;(function(_, $, undefined){

/* !!
 * Constant
 * ** *** **** ***** **** *** ** *
 */
$.extend({

	// 环境信息
	ua: _.navigator.userAgent.toLowerCase(),

	// 根
	root: function( loc ){
		return _.root || loc.protocol + '//' + ( loc.host || (loc.hostname + ':' + loc.port) ) + '/'
	}( $.loc = _.location ),

	// 路由
	path: $.loc.pathname.replace(/\.(.*)/, '').match(/\w+/g) || [],

	// 参数
	param: function( param ){

		var result = {};

		if( param ){

			$.each( param.split('&'), function(i, p){

				!function( p ){
					result[ p[0] ] = p[1] || '';
				}( p.split('=') );

			});

		}

		return result;

	}( $.loc.search.toLowerCase().substr(1) ),

	// 事件集
	evt: function( evts ){
		var json = {};
		return $.each( evts, function(i, e){ json[ e ] = e }), json;
	}(
		(
			'blur focus focusin focusout load resize scroll unload click dblclick ' +
			'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
			'change select submit keydown keypress keyup error contextmenu'
		).split(' ')
	),

	// 对象集
	dom: {
		window:   $(window)
	  ,	document: $(document)
	  ,	body:     $(document.body)
	  , head:     $('head')
	}

	// Constant End
});


/* !!
 * Core
 * ** *** **** ***** **** *** ** *
 */
$.extend({

	// JS错误调试
	console: function( obj ){

		var
			// 信息内容
			info  = '',
			// 调试板
			board = $('<pre></pre>')
				.addClass('fixed z-max').css({
				width: '30%',
				height: '70%',
				overflow: 'auto',
				right: 5,
				top: 5,
				padding: 5,
				borderRadius: 5,
				color: 'black',
				background: 'rgba(255, 255, 255, .75)',
				border: '1px solid gray'
			});

		$.each(obj, function(i, prop){
			info += i + ': ' + prop + '\n';
		});

		board.html( info ).appendTo( $.dom.body );
	},

	// Js Error Log
	log: function(){

		_.onerror = function(msg, url, line){

			$.console({
				msg: msg,
				url: url,
				line: line
			});

			return true;
		}
	},

	// 检测环境
	monitor: function( type ){

		var
			// 预置结果
			result = false,
			// 检测
			exp = function( reg ){
				return new RegExp( reg ).exec( $.ua );
			};

		if( type ){

			// 神快捷: 微信
			if( type == 'weixin' ){
				result = exp('micromessenger');

				// 使用微信JS.API校验
				if( !result ){

					try{
						// 非微信运行不能
						wx.checkJsApi({
							jsApiList: ['ready'],
							success: function( res ){
								$.isWeixin = !!res;
							}
						});
					}
					catch(e){
						console.log(e);
					}

				}

				return !!result;
			}

			// 神快捷: 友加
			if( type == 'uplus' ){
				return !!( result = exp('youjiawebview') );
			}

			// 快捷
			if( ~$.inArray( type, 'iphone,ipad,mac,android,windows mobile'.split(',') ) ){
				result = exp( type );
			}
			else{

				result = exp('mobile') || exp('applewebkit');

				if( type != 'mobile' ){

					// 移动设备
					if( result ){

						// Ios || Android
						switch( type ){
							case 'ie':
								result = exp('msie');
								break;
							case 'firefox':
								result = exp('mercury') || exp('firefox');
								break;
							case 'chrome':
								result = exp('crios') || exp('chrome');
								break;
							case 'safari':
								result = exp('safari');
								break;
							case 'opera':
								result = exp('opios') || exp('opr');
								break;
						}

					}
					// 电脑设备
					else{

						switch( type ){
							case 'ie':
								result = exp('msie');
								break;
							case 'firefox':
								result = exp('firefox');
								break;
							case 'chrome':
								result = exp('chrome') && !exp('opr');
								break;
							case 'safari':
								result = exp('safari') && !exp('chrome');
								break;
							case 'opera':
								result = exp('opr');
								break;
						}

					}

				}

			}

			return !!result;
		}

		return $.monitor('iphone') ? 'ios' : ( $.monitor('android') ? 'android' : 'other' );
	}

	// Core End
});


/* !!
 * Constant Extend
 * ** *** **** ***** **** *** ** *
 */
$.extend({

	// 环境判断: Iphone
	isIphone: $.monitor('iphone'),

	// 环境判断: Ipad
	isIpad: $.monitor('ipad'),

	// 环境判断: Mac
	isMac: $.monitor('mac'),

	// 环境判断: Android
	isAndroid: $.monitor('android'),

	// 环境判断: Win Phone
	isWinphone: $.monitor('windows mobile'),

	// 花镜判断: 移动设备
	isMobile: $.monitor('mobile'),

	// 浏览器判断: Internet Explorer
	isMsie: $.monitor('ie'),

	// 浏览器判断: Firefox
	isFirefox: $.monitor('firefox'),

	// 浏览器判断: Chrome
	isChrome: $.monitor('chrome'),

	// 浏览器判断: Safari
	isSafari: $.monitor('safari'),

	// 浏览器判断: Opera
	isOpera: $.monitor('opera'),

	// 环境判断: 微信
	isWeixin: $.monitor('weixin'),

	// 环境判断: 友加
	isUplus: $.monitor('uplus')

	// Constant Extend End
});


/* !!
 * Extend
 * ** *** **** ***** **** *** ** *
 */
$.extend({

	// Array To Json
	toJSON: function( array ){
		var json = {};
		$.each( array, function(index, value){
			json[ $.isNumber( index ) ? value : index ] = value;
		});
		return json;
	},

	// 获取对象Data属性
	dataget: function( obj ){
		var json = {}, it = $(obj);

		if( !it.length ){
			return json;
		}

		it.prop('outerHTML').replace(/data-\w+/g, function(attr){
			json[ attr.substr(5) ] = it.attr( attr );
		});
		return json;
	},

	// 判断字符串
	isString: function( obj ){
		return $.type(obj) === 'string';
	},

	// 判断布尔
	isBoolean: function( obj ){
		return $.type(obj) === 'boolean';
	},

	// 判断方法
	isFunction: function( obj ){
		return $.type(obj) === 'function';
	},

	// 编码HTML
	escapeHTML: function( html ){
		return html
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '%22')
				.replace(/'/g, '%27')
				.replace(/\'/g, '"');
	},

	// 解码HTML
	unescapeHTML: function( html ){
		return html
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/%22/g, '"')
				.replace(/%27/g, "'");
	}

	// Extend End
});


/* !!
 * Plugin
 * ** *** **** ***** **** *** ** *
 */
$.extend({

	// 渲染EJS
	renderEjs: function( ele, data, cache ){

		var
			name = $.isString(cache) ? cache : 'renderEjs',
			json = ele.data( name ),
			html = $.unescapeHTML( ele.html() ),
			text = cache ? (json || html) : html;

		return ele.html( ejs.render( (ele.data(name, text), text), data ) );
	},

	// 计时器
	timeout: function( options ){

		// 参数容错
		options          = options || {}

		// 回调函数
	  ,	options.callback = options.callback || $.noop

		// 时间间隔
	  ,	options.time     = options.time || 100

		// 计数器更替量
	  ,	options.result   = options.time

		// 初始化执行
	  ,	options.def      = $.type(options.def) === 'boolean' ? options.def : false

		// 计数器
	  ,	options.count    = Math.abs( options.count || 1 )

		// 计时器对象
	  ,	options.timeout

		// 执行动作
	  ,	options.action   = function(){

			// 计数器依据
			if( options.count ){

				options.timeout = _.setTimeout(function(){

					// 回调函数内可返回result, 如为数字, 则可更替计数器当前值
					options.result = options.callback( options );

					// 如result为数字, 则更替计数器
					if( $.isNumeric( options.result ) ){
						options.count = options.result;
					}

					// 递减次数
					--options.count, _.clearTimeout( options.timeout ), options.action();

				}, options.time);

				return;
			}

			// 清除计时器
			_.clearTimeout( options.timeout );
		};

		// 初始化执行
		if( options.def ){
			options.callback( options );
		}

		// 执行动作
		options.action();
	},

	// 弹出层
	popup: function( options ){

		// 参数容错
		options             = options           || {}
		// 于容器内
	  ,	options.container   = options.container || undefined
		// 可视区域
	  ,	options.screen      = {}
		// 可视区域, x坐标
	  ,	options.screen.x    = options.container ? options.container.width()  : $.dom.window.width()
		// 可视区域, y坐标
	  ,	options.screen.y    = options.container ? options.container.height() : $.dom.window.height()
		// 方向
	  ,	options.coor        = options.coor      || {}
		// 方向, x坐标
	  ,	options.coor.x      = options.coor.x    || 'center'
		// 方向, y坐标
	  ,	options.coor.y      = options.coor.y    || 'center'
		// 尺寸
	  ,	options.size        = $.isString( options.size ) ? eval('(' + options.size + ')') : ( options.size || {} )
		// 尺寸, x坐标
	  ,	options.size.w      = options.size.w    || options.screen.x * .8
		// 尺寸, y坐标
	  ,	options.size.h      = options.size.h    || options.screen.y * .6
		// 标题
	  ,	options.title       = options.title     || false
		// 内容
	  , options.content     = options.content   || ''
		// 模式: default | fade | top | left | right | bottom
	  ,	options.mode        = options.mode      || 'default'
		// 速度: slow | normal | fast | number
	  ,	options.speed       = Number( options.speed ) || 300
		// 提交方法: 如submit参数为function, 则显示submit按钮
	  ,	options.submit      = $.isFunction( options.submit ) ? options.submit : false
		// 取消按钮: 布尔
	  ,	options.cancel      = $.isBoolean( options.cancel )  ? options.cancel : true
		// 遮罩层: 布尔
	  ,	options.mask        = $.isBoolean( options.mask )    ? options.mask   : true
		// 回调(特殊): 用于替换submit方法
	  ,	options.callback    = options.callback  || options.submit || $.noop
		// 回调: 打开前
	  ,	options.beforeOpen  = $.isFunction( options.beforeOpen )  ? options.beforeOpen  : $.noop
		// 回调: 打开后
	  ,	options.afterOpen   = $.isFunction( options.afterOpen )   ? options.afterOpen   : $.noop
		// 回调: 关闭前
	  ,	options.beforeClose = $.isFunction( options.beforeClose ) ? options.beforeClose : $.noop
		// 回调: 关闭后
	  ,	options.afterClose  = $.isFunction( options.afterClose )  ? options.afterClose  : $.noop
		// 对象集容错
	  ,	options.element     = options.element   || {}
		// 对象集
	  ,	options.element     = {
	  		// 弹出层
			popup:   $('<div></div>').addClass('popup').addClass('fixed z-max'),
			// 遮罩
			mask:    $('<div></div>').addClass('popup-mask').addClass('screen-max z-max').css('zIndex', '-='+1),
			// 标题
			title:   $('<div></div>').addClass('popup-title').html( options.title ),
			// 内容
			content: $('<div></div>').addClass('popup-content').html( options.content ),
			// 按钮集
			menus:   $('<div></div>').addClass('popup-menu'),
			// 提交按钮
			submit:  $('<button type="submit">' + ($.isString(options.element.submit) ? options.element.submit : '确定') + '</button>'),
			// 取消按钮
			cancel:  $('<button type="button">' + ($.isString(options.element.cancel) ? options.element.cancel : '取消') + '</button>')
		}
		// 中心点
	  ,	options.center = {
			x: options.screen.x / 2,
			y: options.screen.y / 2
		}
		// 移动目标点
	  ,	options.move = {
			x: options.center.x - options.size.w / 2,
			y: options.center.y - options.size.h / 2
		}
		// 初始css标记
	  ,	options.css = {}
		// 对象存储
	  ,	options.it = this

		// 诞生啦: 置入
	  ,	options.born = function(){
			$.dom.body.append( options.element.popup );

			if( options.mask ){
				$.dom.body.append( options.element.mask );
			}
		}
		// 死亡啦: 销毁
	  ,	options.dead = function(){
			options.element.mask.remove(),
			options.element.popup.remove();
		}
		// API: 打开
	  ,	options.it.open = function(){

			// 回调函数 -- 打开前
			options.beforeOpen( options );

			// 置入
			options.born();

			// 预留, 模式
			switch( options.mode ){
				case 'fade':
					break;
				case 'top':
					break;
				case 'left':
					break;
				case 'right':
					break;
				case 'bottom':
					break;
				default:
					options.element.popup.show();
					break;
			}

			// css动画
			options.element.popup
				.animate(
					{
						left: options.move.x
						,top: options.move.y
						,opacity: 1
					},
					options.speed,
					function(){

						// 绑定移除事件
						options.element.cancel.on( $.evt.click, options.it.close );

						// 绑定提交事件
						options.element.submit.on( $.evt.click, function(e){
							options.callback( options );
						});
					}
				);

			// 移除事件拓展
			options.element.mask.on( $.evt.click, options.it.close );

			// 回调函数 -- 打开后
			options.afterOpen( options );
		}
		// API: 关闭
	  ,	options.it.close = function(){

			// 回调函数 -- 关闭前
			options.beforeClose( options );

			// css归位
			options.element.popup.animate( options.css, options.speed, function(){

				// 销毁
				options.dead();

				// 回调函数 -- 关闭后
				options.afterClose( options );
			});
		}
		// API: 初始化(重置)
	  ,	options.it.init = function(){

			if( options.cancel ){
				options.element.cancel.appendTo( options.element.menus );
			}
			if( options.submit ){
				options.element.submit.appendTo( options.element.menus );
			}

			// 结构整理
			options.element.popup
				.append( options.element.title   )
				.append( options.element.content )
				.append( options.element.menus   );

			// 初始化css
			options.css = {
				width:  options.size.w,
				height: options.size.h,
				left:   options.move.x,
				top:    options.move.y
			};

			// 初始化css, 模式
			switch( options.mode ){
				case 'fade':
					options.css.opacity = 0;
					break;
				case 'top':
					options.css.top = 0 - options.size.h;
					break;
				case 'left':
					options.css.left = 0 - options.size.w;
					break;
				case 'right':
					options.css.left = options.screen.x;
					break;
				case 'bottom':
					options.css.top = options.screen.y;
					break;
				default:
					options.element.popup.hide();
					break;
			}

			// 初始css, 打开弹出层, 放出接口
			return options.element.popup.css( options.css ), options.it.open(), options.it;
		};

		// 执行初始化
		return options.it.init();

	},

	// 渲染Popup
	renderPopup: function( elements ){

		$.each(elements, function(i, element){

			var	data = $.dataget( element ),
				option = {
					event: data.event || $.evt.click
				};

			data.mode = data.mode || data.popup;

			data.submit = _[ data.submit ] || undefined;

			$(element).on( option.event, function(){
				$.popup( data );
			});

		});

	},

	// 切换
	tab: function( options ){
		options = options || {};

		$( options.container || $.dom.document ).each(function(i, container){

			var option = {};

			option.container = $(container)
		  ,	option.menus     = option.container.find( options.menus || ( options.menus = '[data-menu]' ) )
		  ,	option.contents  = function( contents ){
		  		if( !contents ){
		  			contents = '';
		  			option.menus.length ? $.each( option.menus, function(i, menu){
		  				contents += (i ? ',' : '') + $(menu).attr( options.menus.match(/(\w|\-)+/g)[0] );
		  			}) : ( options.contents = '[data-content]' );
		  		}
		  		return option.container.find( contents );
			}( options.contents )
		  ,	option.active    = options.active || 'active'
		  ,	option.index     = options.index  || 0
		  ,	option.def       = options.def    || true;

			option.menus.on( $.evt.click, function(){
				option.index = option.menus.index( this ),
				option.menus.removeClass( option.active ).eq( option.index ).addClass( option.active ),
				option.contents.hide().eq( option.index ).show();
			});

			if( option.def ){
				option.menus.eq( option.index ).trigger( $.evt.click );
			}

		});
	},

	// Drag & Drop
	DD: function( options ){
		options = options || {}

		// Drag对象集
	  ,	options.targets = $( options.targets || '[data-drag-target]' )
		// Drop区域集
	  ,	options.areas   = $( options.areas   || '[data-drag-area]' )
		// 文件集合
	  ,	options.files   = []
		// 阻止浏览器默认行为
	  ,	options.stopDefault = function( areas, stop ){

			areas.on({
				dragleave: stop,
				drop: stop,
				dragenter: stop,
				dragover: stop
			});

		}( options.areas, function(e){ e.preventDefault() } )
		// Drop 句柄
	  ,	dropHandle = function(e){
			options.files = e.dataTransfer.files;
		}
	  ,	init = function(){

			options.areas.get(0).addEventListener( 'drop', dropHandle);

		}();

	},

	// 结果
	result: function( result ){
		return result = result || {}, result.error ? ( alert( result.msg || '错误' ), false ) : true;
	}

	// Plugin End
});


/* !!
 * 友加Preset
 * ** *** **** ***** **** *** ** *
 */
$.extend({

	// 版本 Version
	version: $.param['client_ver'],

	// 客户端(Client) Token
	clientToken: function( callback ){

		var result = '';

		/*
		// Android
		try{
			result = _.jscall.getSession();
		}
		// Ios & Other
		catch(e){
			_.location.href = 'js-call:getSession';
		}
		*/

		return callback ? arguments.callee : result;

	}( _.callbackSession = function( token ){ result = token }),

	// 客户端 来源: 0 => banner, 1 => 官方活动, 2 => 微信, 3 => other
	referrer: function( token ){

		var result = $.param['user_type'] ? 3 : 0;

		if( result ){

			if( $.isWeixin ){
				result = 2;
			}

			if( token.length ){
				result = 1;
			}

		}

		return result;

	}( $.token ),

	// 环境 Environment
	env: $.monitor(),

	// Token
	token: $.param['token'] || ( $.param['session_id'] + '-' + $.param['user_id'] ),

	// Session ID
	session_id: function( token ){

		return (function( split ){

			return split.length ? split[0] : $.param['session_id'];

		})( token ? token.split('-') : [] );

	}( $.token ),

	// User ID
	user_id: function( token ){

		return (function( split ){

			return split.length ? split[1] : $.param['user_id'];

		})( token ? token.split('-') : [] );

	}( $.param['token'] ),

	// Target ID
	target_id: $.param['target_id'] || $.user_id,

	// 性别: Gender
	gender: $.param['gender']

	// Constant End
});


})(window, jQuery);
