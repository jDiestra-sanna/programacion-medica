<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

  
<link href="/assets/css/scheduler.css" rel="stylesheet" />
<script type="text/javascript" src="/assets/js/scheduler.js"></script>

<script type="text/javascript">
  
 
  <?php $cod =   is_null($this->session->userdata('cod_doc'))?$this->session->userdata('cod_usu'):$this->session->userdata('cod_doc');   ?>
     var myvar='<?php echo $cod;?>';   
   
</script>
  
 
 <style>
 
 .prueba{
  grid-column-start:1;
  grid-column-end:5;
  height: 55vh;
 } 
  .cuerpo1{
grid-column-start:1;
  grid-column-end:5;
  }  
 
</style>
 
 
 

<div class="cuerpo1">
 
<input type="button"  class="btn btn btn-primary btn-sm"  id="guardarcorreo" name="guardarcorreo" value="Actualizar"  onclick="guardarcorreo();">
<label id="resultado"></label>
</div>
<div class="prueba">
<b>Titulo Confirmacion</b><br>
<input type="text" id="tituloconfirmacion" size = 125 value="<?php echo $valor3;?>"><br>
Correo de Confirmacion<br>
<textarea id="cuerpocorreo" cols="130" rows ="9"><?php echo $valor1;    ?>
</textarea>
<br>
<b>Titulo ReConfirmacion</b><br>
<input type="text" id="tituloreconfirmacion" size = 125 value="<?php echo $valor4;?>"><br>
Correo de Re-confirmacion<br>
<textarea id="cuerpocorreo2" cols="130" rows ="9"><?php echo $valor2;    ?>
</textarea>
<br>
<b>Titulo Disponibilidad</b><br>
<input type="text" id="titulodisponibilidad" size = 125 value="<?php echo $valor5;?>"><br>
Correo de Disponibilidad<br>
<textarea id="cuerpodisponibilidad" cols="130" rows ="9"><?php echo $valor6;    ?>
</textarea>
</div>
 
</body>
<script type="text/javascript">
 
</script>





