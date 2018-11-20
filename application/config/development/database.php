<?php
defined('BASEPATH') or exit('No direct script access allowed');
// hello from local
$active_group = 'default';
$query_builder = true;

$db['default'] = array(
    'dsn'	=> '',
	'hostname' => getenv('DB_HOST'),
	'username' => getenv('DB_USERNAME'),
	'password' => getenv('DB_PASSWORD'),
	'database' => getenv('DB_NAME'),
    'dbdriver' => 'mysqli',
    'dbprefix' => '',
    'pconnect' => false,
    'db_debug' => false, //(ENVIRONMENT !== 'production'),
    'cache_on' => false,
    'cachedir' => '',
    'char_set' => 'utf8',
    'dbcollat' => 'utf8_general_ci',
    'swap_pre' => '',
    'encrypt' => false,
    'compress' => false,
    'stricton' => false,
    'failover' => array(),
    'save_queries' => (ENVIRONMENT !== 'production')
);
