<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

 <script src="/assets/js/vue2.js"></script>
 <script src="/assets/js/vue-router.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  
 

  <div> 
  <input type="radio" id="fecha_recepcion" name="cambio" checked value="fecha_recepcion">
<label for="fecha_recepcion">Fecha recepcion</label><br>
<button class="btn btn-info btn-sm" type="button" onclick="fecharecepcion();">
<i class="fas fa-sync"></i> Actualizar
</button>
<textarea id ="facturas" rows="10" cols="50">
 
 
 </textarea>
 
  </div>
</body>
   

<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js'>"></script>




