<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

  
  <link href="/assets/css/scheduler.css" rel="stylesheet" />
  <script type="text/javascript" src="/assets/js/scheduler.js"></script>

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
 

<label id="resultado"></label>
</div>
<div class="prueba">
<table border style="border-right:0px" id="tablaemails" >
      <thead   id = "tablaemailshead" style="background-color: green;color:white; ">
      <tr >
              
              <th scope="col">CODIGO</th>
              <th scope="col">DOCTOR</th>
              <th scope="col">CMP</th>
              <th scope="col">NUMERO</th> 
              <th scope="col">EMAIL</th>
             
              <th scope="col"></th>
     
          </tr>
      </thead>
      <tbody  id="tablaemailsbody">
    <?php foreach ($body as $value) {?>
    <tr  >
            
            <td > 
            <?php echo $value ["login"];?>
            </td>
            <td> 
            <?php echo $value ["nom_doc"];?>
            </td>
            <td> 
            <?php echo $value ["cmp_doc"];?>
            </td>
            <td>
            <?php echo $value ["beeper_doc"];?>
            </td>
            <td> 
            <input type = "text" value="<?php echo $value ["medico_email"];?>" size = 50 >
            </td>
            <td> 
            <?php if ($value ["flg_envio_disponibilidad"]=='t'){?>
              <input type="checkbox" checked >
            <?php }else{?>
              <input type="checkbox"  >
            <?php }?>
            </td>
            <!-- <td style="border:0"><input type="button"  class="btn btn btn-primary btn-sm"  id="actualizaremail" name="actualizaremail" value="Actualizar"  onclick="actualizaremails(this);">  --></td>
            <td style="border:0"></td>
    </tr>
    <?php }?>
      </tbody>
</table>
</div>
 
</body>
<script type="text/javascript">
 
</script>





