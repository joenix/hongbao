;(function(_, $, undefined){

    $.adaptive(function( width, height ){
        $('.board dd').height( height - 135 );
    });

    $.http({
        trigger: true,
        param: {
            envid: $.param.envid,
            actid: active || 0
        },
        dataType: 'jsonp',
        ready: function(){
            return true;
        },
        callback: function( result, option ){

            if( $.result( result ) ){

                !function( board, data ){

                    board.find('p').text( data.say );

                }( $('.board'), result.data );

            };
        }
    });

    $('.board button').on('click', function(){

        $.http({
            param: {
                envid: $.param.envid,
                actid: active || 0,
                action: 'do'
            },
            dataType: 'jsonp',
            ready: function(){
                return true;
            },
            callback: function( result, option ){

                if( $.result( result ) ){

                    console.log( result );

                }

            }
        });

    });

})(window, jQuery);
