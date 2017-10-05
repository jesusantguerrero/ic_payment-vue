 alter VIEW `v_morosos`
 AS select `p`.`id_pago` AS `id_pago`,
 `p`.`id_contrato` AS `id_contrato`,
 `vc`.`codigo` AS `codigo`,
 `cli`.`id_cliente` AS `id_cliente`,
 `vc`.`cliente` AS `cliente`,
 `cli`.`celular` AS `celular`,
 `p`.`fecha_pago` AS `fecha_pago`,
 `p`.`concepto` AS `concepto`,
 `p`.`detalles_extra` AS `detalles_extra`,
 `p`.`cuota` AS `cuota`,
 `p`.`mora` AS `mora`,
 `p`.`monto_extra` AS `monto_extra`,
 `p`.`total` AS `total`,
 `p`.`estado` AS `estado`,`p`.`fecha_limite` AS `fecha_limite`,`p`.`complete_date` AS `complete_date`,`cli`.`estado` AS `estado_cliente`,str_to_date(concat(year((`p`.`fecha_limite` + interval 1 month)),'-',month((`p`.`fecha_limite` + interval 1 month)),'-',`s`.`fecha_corte`),'%Y-%m-%d') AS `fecha_corte` from (((`ic_pagos` `p` join `ic_settings` `s` on((`s`.`id` = 1))) join `v_contratos` `vc` on((`vc`.`id_contrato` = `p`.`id_contrato`))) join `ic_clientes` `cli` on((`cli`.`id_cliente` = `vc`.`id_cliente`))) where ((str_to_date(concat(year((`p`.`fecha_limite` + interval 1 month)),'-',month((`p`.`fecha_limite` + interval 1 month)),'-',`s`.`fecha_corte`),'%Y-%m-%d') < cast(now() as date)) and (`p`.`estado` = 'no pagado'))



 CREATE ALGORITHM=UNDEFINED DEFINER=`grupofcs_jguerrero`@`localhost` SQL SECURITY DEFINER VIEW `v_averias` 
 AS select `a`.`id_averia` AS `id_averia`,
 `c`.`id_cliente` AS `id_cliente`,
 concat(`c`.`nombres`,' ',`c`.`apellidos`) AS `cliente`,
 concat(`c`.`calle`,' #',`c`.`casa`,', ',`c`.`sector`,', ',`c`.`provincia`) AS `direccion`,
 `a`.`descripcion` AS `descripcion`,`c`.`celular` AS `celular`,`a`.`fecha` AS `fecha`,`a`.`estado` AS `estado`,
 `a`.`fecha_reparacion` AS `fecha_reparacion`,
 `a`.`tecnico` as `tecnico`
  from (`ic_averias` `a` join `ic_clientes` `c` on((`a`.`id_cliente` = `c`.`id_cliente`)))