<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-success sidebar sidebar-dark accordion" id="accordionSidebar">


  <img src="<?php echo base_url() . "assets/img/sanna.PNG"; ?>" height='70px' width: 'auto' />




  <!-- Divider -->
  <hr class="sidebar-divider">

  <!-- Heading --> 
  <div class="sidebar-heading">

    <?php if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')) : ?>
      <span style="font-size: 15px; color: white;  ">GESTION DE EXAMENES</span>
    <?php elseif ($this->ion_auth->is_admin('FACTURACION - EMPLEADO')) : ?>
      <span style="font-size: 15px; color: white;  ">FACTURACION</span>
    <?php elseif ($this->ion_auth->is_admin('DRONLINE - CIE10')) : ?>
      <span style="font-size: 15px; color: white;  ">DR ONLINE</span>
    <?php elseif ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')) : ?>
      <span style="font-size: 15px; color: white;  ">CONTACT CENTER</span>
    <?php elseif ($this->ion_auth->is_admin('NUTRICION - CONSULTA')) : ?>
      <span style="font-size: 15px; color: white;  ">NUTRICION</span>
   
    <?php else : ?>
      <span style=" font-size: 15px; color: white;  ">PROGRAMACION MEDICA</span>

    <?php endif; ?>
  </div>
  <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR')) : ?>
    <!-- Nav Item - medicos -->
    <li class="nav-item <?= $this->uri->segment(1) == 'horarios'  && $this->uri->segment(2) == '' ? 'active' : ''; ?>">
      <a class="nav-link  " href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-book-medical"></i>
        <span>Disponibilidad</span>
      </a>
      <div id="collapseTwo" class="collapse  <?= $this->uri->segment(1) == 'horarios' && $this->uri->segment(2) == ''  ? 'show' : ''; ?>" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('horarios') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'horarios' && $this->uri->segment(2) == ''  ? 'active' : ''; ?>" style="font-size:10px;"> Horarios</a>
        </div>
      </div>
    </li>

  <?php endif; ?>



  <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR')) : ?>
    <!--Nav Item supervisor-->
    <li class="nav-item <?= $this->uri->segment(1) == 'horarios' && $this->uri->segment(2) == 'sinconfirmar' ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseUsuarios" aria-expanded="true" aria-controls="collapseUsuarios">
        <i class="fas fa-calendar-check"></i>
        <span>Horarios</span>
      </a>
      <div id="collapseUsuarios" class="collapse   <?= $this->uri->segment(1) == 'horarios'  ? 'show' : ''; ?>" aria-labelledby="headingUsuarios" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('horarios/sinconfirmar') ?>" class="collapse-item <?= $this->uri->segment(1) == 'horarios' && $this->uri->segment(2) == 'sinconfirmar' ? 'active' : ''; ?>" style="font-size:  10px;">Búsqueda de Horarios</a>
          <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - TABLET')) : ?><a href="<?= base_url('horarios/correo') ?>" class="collapse-item <?= $this->uri->segment(1) == 'horarios' && $this->uri->segment(2) == 'correo' ? 'active' : ''; ?>" style="font-size:  10px;">Configurar correo</a> <?php endif; ?>
 
        </div>

      </div>
    </li>

  <?php endif; ?>
  <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - TABLET')) : ?>
    <li class="nav-item <?= $this->uri->segment(1) == 'mantenimiento'  ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseMantenimiento" aria-expanded="true" aria-controls="collapseMantenimiento">
        <i class="fas fa-tools"></i>
        <span>Mantenimiento</span>
      </a>
      <div id="collapseMantenimiento" class="collapse   <?= $this->uri->segment(1) == 'mantenimiento'  ? 'show' : ''; ?>" aria-labelledby="headingUsuarios" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('mantenimiento/tablet') ?>" class="collapse-item <?= $this->uri->segment(1) == 'mantenimiento' && $this->uri->segment(2) == 'tablet' ? 'active' : ''; ?>" style="font-size:  10px;">Tablets</a>
          <a href="<?= base_url('mantenimiento/maletin') ?>" class="collapse-item <?= $this->uri->segment(1) == 'mantenimiento' && $this->uri->segment(2) == 'maletin' ? 'active' : ''; ?>" style="font-size:  10px;">Maletines</a>
          <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - EMAILS')) : ?><a href="<?= base_url('horarios/configurarlistaemails') ?>" class="collapse-item <?= $this->uri->segment(1) == 'horarios' && $this->uri->segment(2) == 'configurarlistaemails' ? 'active' : ''; ?>" style="font-size:  10px;">Configurar lista emails</a> <?php endif; ?>

        </div>

      </div>

    </li>


  <?php endif; ?>



  <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')) : ?>
    <!--Nav Item Coordinacion-->
    <li class="nav-item  <?= $this->uri->segment(1) == 'coordi' && $this->uri->segment(2) == 'horarios' ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseCoordi" aria-expanded="true" aria-controls="collapseCoordi">
        <i class="fas fa-calendar-check"></i>
        <span>Horarios</span>
      </a>
      <div id="collapseCoordi" class="collapse <?= $this->uri->segment(1) == 'coordi' && $this->uri->segment(2) == 'horarios' ? 'show' : ''; ?>" aria-labelledby="headingReportes" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('coordi/horarios') ?>" class="collapse-item <?= $this->uri->segment(1) == 'coordi' && $this->uri->segment(2) == 'horarios' ? 'active' : ''; ?>" style="font-size:  10px;">Confirmación de Horarios</a>

        </div>
      </div>

    </li>
    <li class="nav-item <?= $this->uri->segment(1) == 'mantenimiento'  ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseMantenimiento" aria-expanded="true" aria-controls="collapseMantenimiento">
        <i class="fas fa-tools"></i>
        <span>Mantenimiento</span>
      </a>
      <div id="collapseMantenimiento" class="collapse   <?= ($this->uri->segment(1) == 'mantenimiento'  || $this->uri->segment(1) == 'horarios' ) && ($this->uri->segment(2) == 'configurarlistaemails' || $this->uri->segment(2) == 'tablet'  || $this->uri->segment(2) == 'maletin' ) ? 'show' : ''; ?>" aria-labelledby="headingUsuarios" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('mantenimiento/tablet') ?>" class="collapse-item <?= $this->uri->segment(1) == 'mantenimiento' && $this->uri->segment(2) == 'tablet' ? 'active' : ''; ?>" style="font-size:  10px;">Tablets</a>
          <a href="<?= base_url('mantenimiento/maletin') ?>" class="collapse-item <?= $this->uri->segment(1) == 'mantenimiento' && $this->uri->segment(2) == 'maletin' ? 'active' : ''; ?>" style="font-size:  10px;">Maletines</a>
         <a href="<?= base_url('horarios/configurarlistaemails') ?>" class="collapse-item <?= $this->uri->segment(1) == 'horarios' && $this->uri->segment(2) == 'configurarlistaemails' ? 'active' : ''; ?>" style="font-size:  10px;">Configurar lista emails</a> 

        </div>

      </div>

    </li>
  <?php endif; ?>


  <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')) : ?>

    <!--Nav Item proveedor remisse-->
    <li class="nav-item <?= $this->uri->segment(1) == 'proveedor' && ($this->uri->segment(2) == 'horarios' ||  $this->uri->segment(2) == 'busquedahorarios') ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseProveedor" aria-expanded="true" aria-controls="collapseProveedor">
        <i class="fas fa-calendar-check"></i>
        <span>Horarios</span>
      </a>
      <div id="collapseProveedor" class="collapse <?= $this->uri->segment(1) == 'proveedor' /* && $this->uri->segment(2) == 'horarios' */ ? 'show' : ''; ?>" aria-labelledby="headingProveedor" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('proveedor/horarios') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'proveedor' && $this->uri->segment(2) == 'horarios' ? 'active' : ''; ?>" style="font-size:10px;">Confirmacion de recojo</a>
          <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR-EDITAR')) : ?>
          <a href="<?= base_url('proveedor/busquedahorarios') ?>" class="collapse-item <?= $this->uri->segment(1) == 'proveedor' && $this->uri->segment(2) == 'busquedahorarios' ? 'active' : ''; ?>" style="font-size:  10px;">Confirmación de Horarios</a>
          <?php endif; ?>
        </div>
      </div>
    </li>

  <?php endif; ?>

  <?php if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')) : ?>

    <!--Nav Item proveedor remisse-->
    <li class="nav-item <?= $this->uri->segment(1) == 'migracion' && ($this->uri->segment(2) == 'horarios') ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseMigracion" aria-expanded="true" aria-controls="collapseMigracion">
        <i class="fas fa-calendar-check"></i>
        <span>Horarios</span>
      </a>
      <div id="collapseMigracion" class="collapse <?= $this->uri->segment(1) == 'migracion' && $this->uri->segment(2) == 'horarios' ? 'show' : ''; ?>" aria-labelledby="headingMigracion" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('migracion/horarios') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'migracion' && $this->uri->segment(2) == 'horarios' ? 'active' : ''; ?>" style="font-size:10px;">Migracion de horarios</a>

        </div>
      </div>
    </li>

  <?php endif; ?>

  <?php if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')) : ?>

    <!--Nav Item laboratorio  -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseLaboratorio" aria-expanded="true" aria-controls="collapseLaboratorio">
        <i class="fas fa-flask"></i>
        <span>Examenes</span>
      </a>
      <div id="collapseLaboratorio" class="collapse <?= $this->uri->segment(1) == 'laboratorio'/*  && $this->uri->segment(2) == 'examenes' */ ? 'show' : ''; ?>" aria-labelledby="headingLaboratorio" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('laboratorio/examenes') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'examenes' ? 'active' : ''; ?>" style="font-size:10px;">Gestion de Examenes</a>
          <?php if ($this->ion_auth->is_admin('GESTION EXAMENES - CAMBIOS')) : ?>

            <a href="<?= base_url('laboratorio/cambios') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'cambios' ? 'active' : ''; ?>" style="font-size:10px;">cambios</a>
          <?php endif; ?>
          <?php if ($this->ion_auth->is_admin('GESTION EXAMENES - CAMBIOS')) : ?>

            <a href="<?= base_url('laboratorio/reporte_registro_snc') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'reporte_registro_snc' ? 'active' : ''; ?>" style="font-size:10px;">Reporte de Registros y SNC</a>
            <a href="<?= base_url('laboratorio/snc') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'snc' ? 'active' : ''; ?>" style="font-size:10px;"> SNC</a>

          <?php endif; ?>
          <?php if ($this->ion_auth->is_admin('GESTION EXAMENES - PRUEBAS')) : ?>

            <a href="<?= base_url('laboratorio/prueba') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'prueba' ? 'active' : ''; ?>" style="font-size:10px;">Pruebas</a>
          <?php endif; ?>
          <?php if ($this->ion_auth->is_admin('GESTION EXAMENES - FLEBOTOMISTA')) : ?>

          <a href="<?= base_url('laboratorio/flebotomista') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'flebotomista' ? 'active' : ''; ?>" style="font-size:10px;">Flebotomista</a>
          <?php endif; ?>
        </div>
      </div>
    </li>

  <?php endif; ?>
  <?php if ($this->ion_auth->is_admin('FACTURACION - EMPLEADO')) : ?>

    <!--Nav Item facturacion  -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseEmpleado" aria-expanded="true" aria-controls="collapseEmpleado">
        <i class="far fa-registered"></i>
        <span>Empleado</span>
      </a>
      <div id="collapseEmpleado" class="collapse <?= $this->uri->segment(1) == 'facturacion' && $this->uri->segment(2) == 'empleadonuevo' ? 'show' : ''; ?>" aria-labelledby="headingEmpleado" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('facturacion/empleadonuevo') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'facturacion' && $this->uri->segment(2) == 'empleadonuevo' ? 'active' : ''; ?>" style="font-size:10px;">Registrar empleado</a>

        </div>
      </div>
    </li>
  <?php endif; ?>
  <?php if ($this->ion_auth->is_admin('FACTURACION - CARGA MASIVA')) : ?>

    <!--Nav Item facturacion  -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseCargamasiva" aria-expanded="true" aria-controls="collapseCargamasiva">
        <i class="far fa-registered"></i>
        <span>Procesos</span>
      </a>
      <div id="collapseCargamasiva" class="collapse <?= $this->uri->segment(1) == 'facturacion' && $this->uri->segment(2) == 'cargamasiva' ? 'show' : ''; ?>" aria-labelledby="headingCargamasiva" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('facturacion/cargamasiva') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'facturacion' && $this->uri->segment(2) == 'cargamasiva' ? 'active' : ''; ?>" style="font-size:10px;">Carga Masiva</a>
          <a href="<?= base_url('facturacion/actualizaciones') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'facturacion' && $this->uri->segment(2) == 'actualizaciones' ? 'active' : ''; ?>" style="font-size:10px;">Actualizaciones</a>

        </div>
      </div>
    </li>
  <?php endif; ?>

  <?php if ($this->ion_auth->is_admin('DRONLINE - CIE10')) : ?>
    <!--Nav Item Coordinacion-->
    <li class="nav-item">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseCIE10" aria-expanded="true" aria-controls="collapseCIE10">
        <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
        <span>CAMBIOS</span>
      </a>
      <div id="collapseCIE10" class="collapse <?= $this->uri->segment(1) == 'dronline'/*  && $this->uri->segment(2) == 'cie10' */ ? 'show' : ''; ?>" aria-labelledby="headingReportes" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('dronline/cie10') ?>" class="collapse-item <?= $this->uri->segment(1) == 'dronline' && $this->uri->segment(2) == 'cie10' ? 'active' : ''; ?>" style="font-size:  10px;">CAMBIOS</a>
          <a href="<?= base_url('dronline/diagnostico') ?>" class="collapse-item <?= $this->uri->segment(1) == 'dronline' && $this->uri->segment(2) == 'diagnostico' ? 'active' : ''; ?>" style="font-size:  10px;">CIE 10</a>

        </div>
      </div>
  
    </li>

  <?php endif; ?>
  <?php if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')) : ?>
    <!--Nav Item Coordinacion-->
    <li class="nav-item">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseincidencia" aria-expanded="true" aria-controls="collapseincidencia">
        <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
        <span>REPORTES</span>
      </a>
      <div id="collapseincidencia" class="collapse <?= $this->uri->segment(1) == 'atencioncliente'   ? 'show' : ''; ?>" aria-labelledby="headingReportes" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('atencioncliente/incidencia') ?>" class="collapse-item <?= $this->uri->segment(1) == 'atencioncliente' && $this->uri->segment(2) == 'incidencia' ? 'active' : ''; ?>" style="font-size:  10px;">Reporte incidencia</a>
          <a href="<?= base_url('atencioncliente/atenciones') ?>" class="collapse-item <?= $this->uri->segment(1) == 'atencioncliente' && $this->uri->segment(2) == 'atenciones' ? 'active' : ''; ?>" style="font-size:  10px;">Reporte atenciones</a>
          <a href="<?= base_url('atencioncliente/madvnr') ?>" class="collapse-item <?= $this->uri->segment(1) == 'atencioncliente' && $this->uri->segment(2) == 'madvnr' ? 'active' : ''; ?>" style="font-size:  10px;">Reporte VNRs MAD</a>
          <a href="<?= base_url('atencioncliente/madatencion') ?>" class="collapse-item <?= $this->uri->segment(1) == 'atencioncliente' && $this->uri->segment(2) == 'madatencion' ? 'active' : ''; ?>" style="font-size:  10px;">Reporte MAD Atenciones</a>
          <a href="<?= base_url('atencioncliente/madpedido') ?>" class="collapse-item <?= $this->uri->segment(1) == 'atencioncliente' && $this->uri->segment(2) == 'madpedido' ? 'active' : ''; ?>" style="font-size:  10px;">Reporte MAD Pedidos</a>
          <a href="<?= base_url('laboratorio/reporte_registro_snc') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'reporte_registro_snc' ? 'active' : ''; ?>" style="font-size:10px;">Reporte de Registros y SNC</a>
          <a href="<?= base_url('laboratorio/snc') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'laboratorio' && $this->uri->segment(2) == 'snc' ? 'active' : ''; ?>" style="font-size:10px;"> Agregar registros SNC</a>

        </div>
      </div>

    </li>

  <?php endif; ?>
  
  <?php if ($this->ion_auth->is_admin('NUTRICION - CONSULTA')) : ?>
    
    <li class="nav-item <?= $this->uri->segment(1) == 'nutricion' && $this->uri->segment(2) == 'consulta' ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapsenutricion" aria-expanded="true" aria-controls="collapsenutricion">
      <i class="fab fa-nutritionix"></i>
        <span>CONSULTA MEDICA</span>
      </a>
      <div id="collapsenutricion" class="collapse   <?= $this->uri->segment(1) == 'nutricion'  ? 'show' : ''; ?>" aria-labelledby="headingnutricion" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('nutricion/consulta') ?>" class="collapse-item <?= $this->uri->segment(1) == 'nutricion' && $this->uri->segment(2) == 'consulta' ? 'active' : ''; ?>" style="font-size:  10px;">Atencion</a>

        </div>

      </div>
    </li>

  <?php endif; ?>
  <?php if ($this->ion_auth->is_admin('SM - INGRESO A ENCUESTA DOLOR ABDOMINAL')) : ?>
    
    <li class="nav-item <?= $this->uri->segment(1) == 'postventa' && $this->uri->segment(2) == 'encuestaabdominal' ? 'active' : ''; ?>">
      <a class="nav-link collapsed" href="<?php echo base_url() . "assets/"; ?>#" data-toggle="collapse" data-target="#collapseencuestaabdominal" aria-expanded="true" aria-controls="collapseencuestaabdominal">
      <i class="fas fa-clipboard-list"></i>
        <span>POST - VENTA</span>
      </a>
      <div id="collapseencuestaabdominal" class="collapse   <?= $this->uri->segment(1) == 'postventa'  ? 'show' : ''; ?>" aria-labelledby="headingencuestaabdominal" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('postventa/encuestaabdominal') ?>" class="collapse-item <?= $this->uri->segment(1) == 'postventa' && $this->uri->segment(2) == 'encuestaabdominal' ? 'active' : ''; ?>" style="font-size:  10px;">Encuesta Abdominal</a>
          <a href="<?= base_url('postventa/reporteabdominal') ?>" class="collapse-item <?= $this->uri->segment(1) == 'postventa' && $this->uri->segment(2) == 'reporteabdominal' ? 'active' : ''; ?>" style="font-size:  10px;">Reporte</a>
        </div>

      </div>
    </li>

  <?php endif; ?>


  <?php if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')) : ?>
    <!-- Nav Item - medicos -->
    <li class="nav-item <?= $this->uri->segment(1) == 'delivery'   ? 'active' : ''; ?>">
      <a class="nav-link  " href="#" data-toggle="collapse" data-target="#collapsedelivery" aria-expanded="true" aria-controls="collapsedelivery">
        <i class="fas fa-book-medical"></i>
        <span>VISOR-MEDICAMENTOS</span>
      </a>
      <div id="collapsedelivery" class="collapse  <?= $this->uri->segment(1) == 'delivery'  ? 'show' : ''; ?>" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a href="<?= base_url('delivery/medicamento') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'delivery' && $this->uri->segment(2) == 'medicamento'  ? 'active' : ''; ?>" style="font-size:10px;"> Medicamentos</a>
          <a href="<?= base_url('delivery/estructura') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'delivery' && $this->uri->segment(2) == 'estructura'  ? 'active' : ''; ?>" style="font-size:10px;"> Estructura Tabla</a>
          <a href="<?= base_url('delivery/tablapadre') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'delivery' && $this->uri->segment(2) == 'tablapadre'  ? 'active' : ''; ?>" style="font-size:10px;"> Tabla Padre</a>
          <a href="<?= base_url('delivery/tablahijo') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'delivery' && $this->uri->segment(2) == 'tablahijo'  ? 'active' : ''; ?>" style="font-size:10px;"> Tabla Hijo</a>
          <a href="<?= base_url('delivery/categoria') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'delivery' && $this->uri->segment(2) == 'categoria'  ? 'active' : ''; ?>" style="font-size:10px;"> Categoria</a>
          <a href="<?= base_url('delivery/subcategoria') ?>" class="collapse-item  <?= $this->uri->segment(1) == 'delivery' && $this->uri->segment(2) == 'subcategoria'  ? 'active' : ''; ?>" style="font-size:10px;"> Subcategoria</a>

        </div>
      </div>
    </li>

  <?php endif; ?>
  <!-- Divider -->
  <hr class="sidebar-divider d-none d-md-block">

  <!-- Sidebar Toggler (Sidebar) -->
  <div class="text-center d-none d-md-inline">
    <button class="rounded-circle border-0" id="sidebarToggle"></button>
  </div>

</ul>
<!-- End of Sidebar -->