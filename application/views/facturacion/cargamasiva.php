<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

 <script src="/assets/js/vue2.js')?>"</script>
 <script src="/assets/js/vue-router.js"</script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  
 

  <div> 
  <form enctype="multipart/form-data" method="post" role="form" action="<?=base_url('facturacion/importdata')?>">
<div class="form-group">
 <input type="file" name="file" id="file" size="150">
 </div>
<button type="submit" class="btn btn-success" name="cargarmasiva"  value="cargarmasiva">Cargar Masiva</button>
<?php   
if(empty($d)){
 
}else{
echo $d;

}

?>
</form>
</body>
   

<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js'>"></script>




