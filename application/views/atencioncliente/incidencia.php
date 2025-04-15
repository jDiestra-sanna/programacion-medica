<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
   
 <div>
fecha inicial
   <input type="date" id="fecinicio" name="fecinicio"  value="<?php echo date("Y-m-d");?>"><br>
   fecha final

   <input type="date" id="fecfinal" name="fecfinal"  value="<?php echo date("Y-m-d");?>"><br>
</div>
<div></div>
<div><input type="text" id="cod_ate"  ><input type="button"  class="btn btn btn-success btn-sm"  id="btn_seguimiento" name="btn_seguimiento"  onclick ="modalseguimiento();" value="Incidencia"  > 
</div>
 <div>
  <button class="btn btn btn-primary btn-sm"  onclick="generarreporte();"  id="busqueda" name="busqueda"> <i class="fa fa-search" aria-hidden="true"></i> Generar reporte</button>
</div>
   
</body>

<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>



