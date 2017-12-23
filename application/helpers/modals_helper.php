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
    $modals = array('modales/global_modals');
    switch($filename){
      case 'home':
         array_push($modals,'modales/contract_modals');
         break;
      case 'servicios':
         array_push($modals,'modales/service_modals');
        break;
      case 'contratos':
        array_push($modals, 'modales/contract_modals');
        break;
      case 'detalles':
        array_push($modals, 'modales/contract_modals');
        break;
    }

    return $modals;
  }
}
