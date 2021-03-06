<?php

// Project: /blank
$project = '/hongbao';

// Load Manifest
require_once('manifest.php');

// Page Array
$pages = array('index', 'excrete', 'excrete_in', 'excrete_un', 'excrete_has', 'history');


// Web Init
class Init {
	// Require General
	function init( $u ){
		// Do ...
	}

	// Require Template
	static function template( $u, $page ){

		$u -> set('resource', 'public/resource.html');
		$u -> set('header',   'public/header.html');
		$u -> set('page',     $page . '.html');
		$u -> set('footer',   'public/footer.html');
		$u -> set('init',     'public/init.html');

		$view = new Template;
		echo $view -> render('public/render.html');
	}

	// Page Render
	static function render( $u, $page ){
		$u -> set('active', $page);
		self::template( $u, $page );
	}
}

// Web Class
class Web extends Init {

	// Page Index
	static function index( $u ){
		self::render( $u, 'index' );
	}

	// Page Excrete
	static function excrete( $u ){
		self::render( $u, 'excrete' );
	}

	// Page Excrete In
	static function excrete_in( $u ){
		self::render( $u, 'excrete_in' );
	}

	// Page Excrete Un
	static function excrete_un( $u ){
		self::render( $u, 'excrete_un' );
	}

	// Page Excrete Has
	static function excrete_has( $u ){
		self::render( $u, 'excrete_has' );
	}

	// Page History
	static function history( $u ){
		self::render( $u, 'history' );
	}

	// Page Error
	static function error( $u ){
		self::render( $u, 'error' );
	}

}

// On Error
$u -> set('ONERROR', function( $u ){
	// ERROR -> status | code | text
	// Web::error($u, 'error');

	// Error Report Debug
	console($u -> ERROR);
});

// Route Page
foreach( $pages as $page ){
	$u -> route('GET ' . ( $page == 'index' ? '/' : '/' . $page . '.html' ), 'Web->' . $page);
};

$u -> run();
