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
        actid: active || 0,
        jump: true // $.root + '/hongbao/excrete.html?envid={{envid}}'
    },
    dataType: 'jsonp',
    ready: function(){

        var result = true;

        $.each( $('.board input, .board textarea'), function(i, one){
            if( !$.trim(one.value).length ){
                return result = false;
            }
        });

        return result ? result : ( alert('请完整填写内容!'), result );
    },
    callback: function( result, option ){

        if( $.result( result ) ){

            $.share({
                type: 'youja',
                uid: 0,
                title: '友加新年红包',
                description: '我发了一个红包，赶紧去拆！祝大家新年快乐！',
            //  image: '',
                url: $.root + '/excrete.html?envid=' + result.envid,
                callback: function( options ){
                    alert( result.msg || '创建红包成功！' ), _.location.href = options.link;
                }
            });

        };
    }
});

})(window, jQuery);
