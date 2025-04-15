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
  height: 80vh;
  overflow: auto;
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
<table border style="border-right:0px;width: 100%;" id="tpruebas" >
      <thead   id = "tbodyhead" style="background-color: blue;color:white; ">
      <tr >
              
              <th scope="col">CODIGO</th>
              <th scope="col" >PRUEBA</th>
              <th scope="col" >UNIDAD</th>
              <th scope="col" >CLASIFICACION</th>

          </tr>
      </thead>
      <tbody  id="tbodypruebas">
    <?php foreach ($body as $value) {?>
    <tr  >
            <td style = "display:none"> 
            <?php echo $value ["cod_pruebas"];?>
            </td>
            <td > 
            <input type ="text"   style = "width: 10vw;text-transform: uppercase;" value=' <?php echo $value ["codigo_segus"];?>'  />
            </td>
            <td> 
            <input type ="text"  style = "width: 30vw;text-transform: uppercase;" value=' <?php echo $value["des_prueba"];?>'  />
            </td>
            <td > 
            <input type ="text"  style = "width: 10vw;text-transform: uppercase;" value=' <?php echo $value ["unidad"];?>'  />
            </td>
            <td > 
            <input type ="text" style = "width: 10vw;text-transform: uppercase;" value=' <?php echo $value ["clasificacion"];?>'  />
            <input type ="button"  id="actualizarprueba" name="actualizarprueba" value ="Actualizar"  onclick="actualizarprueba_click(this);"/>

            </td>
  
        <!--     <td style = "display:none"> 
            
            </td> -->
          
<!--             <td style="border:0"><input type="button"  class="btn btn btn-primary btn-sm"  id="actualizartablet" name="actualizartablet" value="Actualizar"  onclick="actualizartablet(this);">
            <input type="button"  class="btn btn btn-danger btn-sm"  id="eliminartablet" name="eliminartablet" value="Eliminar"  onclick="eliminartablet(this);"> </td>
            <td style="border:0"></td> -->
    </tr>
    <?php }?>
   
      </tbody>
</table>

</div>
<div style="grid-row-start:3;grid-row-end:3;grid-column-start:1;grid-column-end:5">
            
            <input type ="text"   placeholder = "codigo" maxlength = 8  oninput="this.value=this.value.replace(/[^0-9.]/g,'');"  style = "width: 10vw;text-transform: uppercase;"   />
              
            <input type ="text" placeholder = "prueba" style = "width: 30vw;text-transform: uppercase;"    />
             
            <input type ="text"  id="unidad2" oninput="this.value=this.value.replace(/[^0-9.]/g,'');" style = "width: 10vw;text-transform: uppercase;"    />
            
            <input type ="text"  placeholder = "clasificacion" maxlength = 1 style = "width: 10vw;text-transform: uppercase;"    />
             
          
             <input type="button"  class="btn btn btn-success btn-sm"  id="agregarprueba" name="agregarprueba" value="Agregar"  onclick="agregarprueba(this);"> 
     </div>
</body>
<script type="text/javascript">

 
</script>





