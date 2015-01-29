<?php

/* !!
 * Console
 * ** *** **** ***** **** *** ** *
 */
function console( $obj, $debug = false ){
	echo('<pre>');
	empty( $debug ) ? print_r( $obj ) : var_dump( $obj );
	exit('</pre>');
}


/* !!
 * SQL
 * ----- ----- ----- ----- ----- ----- -----
 * doQuery: 原生接口
 * init: 初始化数据库对象
 *
 * ** *** **** ***** **** *** ** *
 */
class SQL{

	static function doQuery( $query ){
		$connect = mysql_connect(DB_host.':'.DB_port, DB_account, DB_password);
		if (!$connect){
			die('Could not connect: ' . mysql_error());
		}

		mysql_select_db(DB_name, $connect);

		mysql_query("SET NAMES 'UTF8'");
		mysql_query("SET CHARACTER SET UTF8");
		mysql_query("SET CHARACTER_SET_RESULTS=UTF8'");

		$result = mysql_query( $query );

		mysql_close( $connect );

		if($result && $result != '1'){
			$date = array();
			while( $row = mysql_fetch_object( $result ) ){
				$date[] = get_object_vars($row);
			}
			return $date;
		}
		else{
			return $result;
		}
	}

	static function init( $table = false ){
		$manifest = 'mysql:host='.DB_host.';port='.DB_port.';dbname='.DB_name;
		$account = DB_account;
		$password = DB_password;

		$db = new DB\SQL( $manifest, $account, $password );

		return empty( $table ) ? $db : new DB\SQL\Mapper( $db, $table );
	}

	static function query( $query, $options = array() ){
		$db = self::init();
		return $db->exec( $query, $options );
	}

	static function select( $table, $options = array() ){
		$db = self::init( $table );

		return $db -> load( $options );
	}

	static function insert( $table, $options = array() ){
		$db = self::init( $table );

		foreach( $options as $index => $value ){
			$db -> $index = $value;
		}
		return $db -> save();
	}

	static function update( $table, $options, $condition ){
		$db = self::init( $table );

		foreach( $options as $index => $value ){
			$db -> $index = $value;
		}
		foreach( $condition as $index => $value ){
			$db -> $index = $value;
		}
		return $db -> update();
	}
}

class REQ{
	static function init(){
		// Do Some Thing
	}

	static function option( $options, $property, $default = '' ){
		return !isset( $options[ $property ] ) ? $default : $options[ $property ];
	}

	static function request( $result, $msg = false ){
		$return = array();

		$return['error'] = empty( $result ) ? true : false;
		$return['msg'] = $msg;

		return json_encode( $return );
	}
}
