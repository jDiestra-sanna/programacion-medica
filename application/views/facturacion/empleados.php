<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

<script src="/assets/js/vue2.js"></script>
<script src="/assets/js/vue-router.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  
 

  <div> 
 <input type="button"  class="btn btn btn-primary btn-sm"  id="nuevoempleado" name="nuevoempleado" value="Nuevo"> 

 <div style = "border:1px solid black;">
<h4>Modificar Codigo Siteds</h4>
Atencion:<br>
<input type="text" id="codsiteds" name="codsiteds"  value=""><br>
Codigo autorizacion siteds:<br>
<input type="text" id="codautorizacion" name="codautorizacion"  value=""><br>
<button class="btn btn btn-primary btn-sm"  onclick="actualizarsiteds();"  id="actualizar" name="actualizar"> <i class="fa fa-sync" aria-hidden="true"></i> Actualizar siteds </button>

<br>
<br>
</div>

</body>
   



