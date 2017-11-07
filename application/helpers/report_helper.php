<?php
/**
* IC Payment
*@author Jesus Guerrero
*@copyright Copyright (c) 2017 Insane Code
*@version 1.0.0
*
*/

defined('BASEPATH') OR exit('No direct script access allowed');


if ( ! function_exists('make_payment_report')){
  /**
  * create a table for the data from users to display in the interface
  * @param array $data the result of an select in a query 
  * @param int the number for start counting the rows the that is for my custom pagination
  *@return string the tbody with rows of a table 
  */ 

  function make_payment_report($data,$concept,$context){
    $cont = 0 + 1;
    $context->table->set_heading("Num","Cont","Cliente","Concepto","Total","Hora"); 

    foreach ($data as $line) {
      $hora = new DATETIME($line['complete_date']);
      $context->table->add_row($cont,
      $line['id_contrato'],
      $line['cliente'],
      "<p>".$line['concepto']."</p>",
      "RD$ ".CurrencyFormat($line['total']),
      $hora->format('g:i a'));
     $cont+=1;
    }

    $html_text = $context->table->generate();
    $more['total'] = $context->report_model->get_total_payments("date(now())");
    $html_text .= "<div class='ganancia-total'>TOTAL DEL DIA: RD$ ".CurrencyFormat($more['total'])."<div>";
    set_report($html_text,$concept,$more);
   
  }
}

if ( ! function_exists('make_installation_report')){

  function make_installation_report($data,$concept,$context,$for_print){
    $cont = 0 + 1;
    $context->table->set_heading("Num","Cliente","Direccion","Celular","Requerimiento","Servicio"); 
    foreach ($data as $line) {
      $context->table->add_row($cont,
      $line['cliente'],
      $line['direccion'],
      $line['celular'],
      $line['fecha'],
      $line['servicio']);

     $cont+=1;
    }

    $html_text = $context->table->generate();
    if($for_print):
      set_report($html_text,$concept);
    else:
      return $html_text;
    endif;
  }
}

if ( ! function_exists('make_averias_report')){

  function make_averias_report($data,$concept,$context,$for_print){
    $cont = 1;
    $context->table->set_heading("Num","IP","Cliente","Dirección",['data' => 'Numero de Celular', 'width' => '150px'],"Descripcion",['data' => 'Fecha del Reporte', 'width' => '150px']); 
    foreach ($data as $line) {
      $context->table->add_row($cont,
      $line['codigo'],
      $line['cliente'],
      $line['direccion'],
      phone_format($line['celular']),
      $line['descripcion'],
      $line['fecha']);
     $cont+=1;
    }

    $html_text = $context->table->generate()."<div class='real-end'></div>";
    if ($for_print) {
      set_report($html_text,$concept);
    } else {
      return $html_text;
    }
  }
}

if ( ! function_exists('make_general_report')){
    function make_general_report($data,$concept,$context,$fields, $header, $extra = false){
      $cont = 1;
      $context->table->set_heading($header); 
      foreach ($data as $line) {
        $table_fields = array($cont);
        foreach ($fields as $field) {
          if ($field == 'celular') {
            array_push($table_fields,phone_format($line[$field]));
          } else {
            array_push($table_fields,$line[$field]);
          }
        }
        $context->table->add_row($table_fields);
       $cont+=1;
      }

      $html_text = $context->table->generate();
      if ($extra) {
        $html_text .= $extra;
      }
      $html_text .= "<div class='real-end'></div>";
      set_report($html_text,$concept);
    }
  }

if ( ! function_exists('make_clients_report')){
  
  function make_clients_report($data,$concept,$context,$for_print){
    $cont = 1;
    $context->table->set_heading("Num","IP","Cliente",["data"=>"Cedula", "width"=> "155px"],"Dirección",["data" => "Celular", 'width'=> '150px']); 
    
    foreach ($data as $line) {
      $context->table->add_row(
        $cont,
        $line['codigo'],
        $line['nombres']." ".$line['apellidos'],
        dni_format($line['cedula']),
        "{$line['calle']} #{$line['casa']}, {$line['sector']}",
        phone_format($line['celular'])
      );
     $cont+=1;
    }
  
    $html_text = $context->table->generate()."<div class='real-end'></div>";
    if ($for_print) {
      set_report($html_text,$concept);
    } else {
      return $html_text;
    
    }
  }
}

if ( ! function_exists('make_moras_report')){

  function make_moras_report($data,$concept,$context,$for_print){
    $cont = 0 + 1;
    $context->table->set_heading("Contrato","Codigo","Cliente","Celular","Pagos Pendientes","Meses"); 
    $spanish_months = $GLOBALS['spanish_months'];
    $in_english = array_keys($spanish_months);
    $in_spanish = array_values($spanish_months);

    foreach ($data as $line) {
      $context->table->add_row(
      $line['id_contrato'],
      $line['codigo'],
      $line['cliente'],
      phone_format($line['celular']),
      $line['pagos_pendientes'],
      $line['meses']
      );

     $cont+=1;
    }

    $html_text = $context->table->generate();
    if($for_print):
      set_report($html_text,$concept,$more = '');
    else:
      return $html_text;
    endif;
  }
}

function make_moras_report_smart($data,$concept,$context,$for_print){ 
  $spanish_months = $GLOBALS['spanish_months'];
  $in_english = array_keys($spanish_months);
  $in_spanish = array_values($spanish_months);
  $html_text = '';

    foreach ($data as $line) {
      $html_text .= "
      <tr>
        <td>{$line['id_contrato']}</td>
        <td><a href='".base_url()."process/details/{$line['id_cliente']}'>{$line['cliente']}</a></td>
        <td>".phone_format($line['celular'])." </td>
        <td>RD$".CurrencyFormat($line['cuota'])."</td>
        <td>RD$".CurrencyFormat($line['mora'])."</td>
        <td>RD$".CurrencyFormat($line['monto_extra'])."</td>
        <td>RD$".CurrencyFormat($line['total'])."</td>
        <td>{$line['pagos_pendientes']}</td>
        <td><p>".str_replace($in_english,$in_spanish,$line['meses'])."</p></td>
      </tr>";
    }
    return $html_text;
}

if( ! function_exists('set_report')){
  function set_report($report_body,$concept,$more = ''){
     $_SESSION['reporte'] = array('cuerpo' => $report_body, 'concepto' => $concept, 'mas' => $more);
  }

}

if( ! function_exists('get_report')){
 function get_report(){
    return $_SESSION['reporte'];
  }

}

if( ! function_exists('erase_report')){
  function erase_report(){
    session_unset($_SESSION['reporte']);
  }
}

function get_rich_text($remark,$message,$colors = array('remark'=>'0066ff','message'=>'0066ff'),$size = 30){
  $objRichText = new PHPExcel_RichText();
  $companyName= $objRichText->createTextRun($remark." ");
  $companyName->getFont()->setBold(true);
  $companyName->getFont()->applyFromArray(array(
    'color' => array('rgb'=> $colors['remark']),
    'size' => $size
    ));
  $objPayable = $objRichText->createTextRun($message);
  $objPayable->getFont()->setBold(true);
  $objPayable->getFont()->setItalic(true);
  $objPayable->getFont()->applyFromArray(array(
    'color' => array('rgb'=> $colors['message']),
    'size' => $size
    ));
  return $objRichText;
}

function set_image($sheet,$cell,$imagename){
  // Add a drawing to the worksheet
  $objDrawing = new PHPExcel_Worksheet_Drawing();
  $objDrawing->setName('Terms and conditions');
  $objDrawing->setDescription('Terms and conditions');
  $objDrawing->setPath('./assets/img/'.$imagename);
  $objDrawing->setWidth(100);
  $objDrawing->setCoordinates($cell);
  $objDrawing->setWorksheet($sheet);
}

function create_excel_file($report){
  $row_number = count($report['data']);
		$table_range = 'B5:'.$report['end'][0].($row_number + 5);

		$myStyles = array(
			'fill' => array(
				'type'  => 'solid',
        'color' => array('rgb'=>'0066ff'),
			),
			'font' => array(
				'name'  => 'Arial',
				'color' => array('rgb'=>'ffffff'),
				'bold'  => 'true',
				'size'  => '14'
			),
			'borders' => array(
					'bottom'  => array(
     				'style' => 'thin',
      			'color' => array(
     					'rgb' => '999999'
						)
					)
			),
			'alignment' =>	array(
	 			'horizontal' => 'center',
	 			'vertical'   => 'center',
	 			'rotation'   => 0,
	 			'wrap'			=> TRUE
	 		)
		);

		$myreport_sheet = new PHPExcel();
		$myreport_sheet->getProperties()->setTitle('Primera prueba')->setDescription('my first document');
		// Assign cell values
		$myreport_sheet->setActiveSheetIndex(0);
		$sheet = $myreport_sheet->getActiveSheet();
		$sheet->getStyle($report['start'].':'.$report['end'])->applyFromArray($myStyles);
		$sheet->getStyle($table_range)->getAlignment()->applyFromArray($myStyles['alignment']);
		$sheet->getStyle('C5:C'.($row_number + 5))->getAlignment()->setHorizontal('left');
		$sheet->getStyle('C5:C'.($row_number + 5))->getAlignment()->setShrinkToFit(true);
		$sheet->getRowDimension('4')->setRowHeight(50);
		$sheet->getDefaultColumnDimension()->setWidth(30);
		$sheet->getColumnDimension('A')->setWidth(2);
    $sheet->getColumnDimension('B')->setWidth(13);
		$sheet->setShowGridLines(false);
		$sheet->getCell('C2')->setValue(get_rich_text('ISC Service:',"Contratos Vigentes",array('remark'=>'ff2200','message'=> '0066ff'))); 
    $sheet->getCell('C3')->setValue(get_rich_text('Reporte Tecnico',"",array('remark'=>'333333','message'=> '333333'),16)); 
		set_image($sheet,'B2','icsservice_logo.png');
																										
		$myreport_sheet->getActiveSheet()->fromArray(
			$report['header'],
			'',
			$report['start']
		);

		$myreport_sheet->getActiveSheet()->fromArray(
			$report['data'],
			'',
			$report['start'][0].($report['start'][1] + 1)
		);

    return $myreport_sheet;
}

  

  