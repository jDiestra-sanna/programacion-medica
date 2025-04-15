<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?> 
  
 <div>
fecha inicial
   <input type="date" id="fecinicio" name="fecinicio"  value="<?php echo date("Y-m-d");?>"></div>
 
   <div>  fecha final
   <input type="date" id="fecfinal" name="fecfinal"  value="<?php echo date("Y-m-d");?>">
</div>
<div>  <button class="btn btn btn-primary btn-sm"  onclick="generarreporteatenciones();"  id="busqueda" name="busqueda"> <i class="far fa-file-excel" aria-hidden="true"></i> Generar reporte</button>
</div>
<div>
  <input type ="radio" name="fechas" id="fecha_creacion" checked value="creacion" ><label for="fecha_creacion">Fecha creación</label>
  <input type ="radio" name="fechas" id="fecha_atencion"  value="atencion" ><label for="fecha_atencion">Fecha atención</label>

</div>
 <div>
</div>
   
</body>
   
<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>

<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>



