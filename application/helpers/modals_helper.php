<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('get_modals'))
{
	/**
	 * Get Modals
	 *
	 * Generates headers that force a download to happen
	 *
	 * @param	{String}	filename
	 * @return	{Array}
	 */

	function get_modals($filename)
	{
    $modals;
    switch($filename){
      case 'home':
         $modals[0] = 'modales/clientes_modals';
         break;
      case 'clientes':
        $modals[0] = 'modales/clientes_modals';
        break;
      case 'servicios':
         $modals[0] = 'modales/services_modals';
        break;
      // case 'contratos':
      //   break;
      // case 'reportes':
      //   break;
      // case 'notificaciones':
      //   # code...
      //   break;
      case 'administrador':
        $modals[0] = 'modales/newuser';
        break;
      default:
        $modals = FALSE;
    }

    return $modals;
  }
}