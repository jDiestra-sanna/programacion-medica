<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <?php if ( $this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')):?>
    <title>LABORATORIO</title>
      <?php elseif ( $this->ion_auth->is_admin('FACTURACION - EMPLEADO')):?>
        <title>PROGRAMACIÓN MEDICA</title>
      <?php elseif ( $this->ion_auth->is_admin('DRONLINE - CIE10')):?>
        <title>PROGRAMACIÓN MEDICA</title>
        <?php elseif ( $this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')):?>
          <title>ATENCION AL CLIENTE</title>
		  <?php else:?>
        <title>PROGRAMACIÓN MEDICA</title>

       <?php endif;?>
  <!-- Custom fonts for this template-->

   <script src="<?php echo base_url()."assets/"; ?>vendor/jquery/jquery.min.js" type="text/javascript"></script>  
  <link href="<?=base_url('assets/')?>css/TimeSheet.css" rel="stylesheet" />
 

  <link href="<?php echo base_url()."assets/"; ?>vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">



  <!-- Custom styles for this template-->
   
  <link href="<?php echo base_url()."assets/"; ?>css/sb-admin-2.min.css" rel="stylesheet">
 

  <link href="<?=base_url('assets/')?>css/TimeSheet.css" rel="stylesheet" />
 
  <link rel="icon" type="image/png" href="<?php echo base_url()."assets/img/"; ?>logo.png" />

  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>



</head>

<body id="page-top">
<!--<div id="menu">
      <ul id="ulmenu">
            <li id="Agregardescripcion">Agregar Descripcion</li>
        </ul>
</div>-->
  <!-- Page Wrapper -->
  <div id="wrapper">