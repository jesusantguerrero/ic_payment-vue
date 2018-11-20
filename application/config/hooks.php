<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/

// Set timezone for PHP
$hook['pre_system'][] = function(){
    // Los Angeles, California, USA
    date_default_timezone_set('America/Santo_Domingo');
    $dotenv = new Dotenv\Dotenv(APPPATH . "../");
    $dotenv->load();
};
// Set timezone for MySQL based on PHP timezone
$hook['post_controller_constructor'] = function(){
    $CI =& get_instance();
    // Assuming DB is autoloaded
    $CI->db->query('SET time_zone = "' . date('P') . '"');
    $CI->db->query('SET lc_time_names = "es_DO"');
};
