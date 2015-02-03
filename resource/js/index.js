;(function(_, $, undefined){

$.adaptive(function( width, height ){
    $('.board dd').height( height - 136 );

    $.tab({
        menus: '.board bdo',
        callback: function( option ){
            option.menus.closest('span').attr('data-value', option.it.attr('data-value') );
        }
    });
});

$.http({
    param: {
        token: $.param.token || 0,
        jump: $.root + '/hongbao/excrete.html?envid={{envid}}'
    },
    dataType: 'jsonp',
    success: function( result ){
        console.log( result );
    }
});

})(window, jQuery);
