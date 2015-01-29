<?php

// Detect Mobile
define( 'isMobile', strpos( strtolower( $_SERVER['HTTP_USER_AGENT'] ), 'applewebkit' ) );

// DB
define( 'DB_host', 'localhost' );
define( 'DB_port', '3306' );
define( 'DB_account', 'root' );
define( 'DB_password', 'root' );
define( 'DB_name', 'pf_message' );

// Kickstart the framework
$u = require('lib/base.php');

// Project: /blank
$project = empty( $project ) ? '' : $project;

// Load configuration
$u -> config('config.ini');

// Set Cache
$u -> set('CACHE', FALSE);

// Define Url
$host = $u -> get('HOST');

define( 'host', 'http://' . ( empty( $host ) || $host == '_' ? $_SERVER['HTTP_HOST'] : $host ) . $project );
define( 'root', $u -> get('ROOT') );

require_once('lib/class/init.php');

// No Error Report
// error_reporting(0);
