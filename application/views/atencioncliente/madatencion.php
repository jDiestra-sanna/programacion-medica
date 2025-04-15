<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  
 <div>
fecha inicial
   <input type="date" id="fecinicio" name="fecinicio"  value="<?php echo date("Y-m-d");?>"><br>
   fecha final

   <input type="date" id="fecfinal" name="fecfinal"  value="<?php echo date("Y-m-d");?>"><br>
</div>
<div></div>
<div></div>
 <div>
  <button class="btn btn btn-primary btn-sm"  onclick="generarreportemadatencion();"  id="busqueda" name="busqueda"> <i class="far fa-file-excel" aria-hidden="true"></i> Generar reporte</button>
</div>
   
</body>
   
<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>

<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>



