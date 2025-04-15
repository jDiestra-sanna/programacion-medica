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
 

<label id="proveedorname">Proveedor</label>
<?=form_dropdown('proveedor',utf8_converter(get_combo_query( "select cod_prov_motorizado,descripcion from m_proveedor_motorizado",'cod_prov_motorizado','descripcion' ,array("Seleccione"))),"0",array( 'style'=>"width:280px;",'id'=>"proveedor",'onchange'=>"filtrarproveedor('tablatabletsbody')"))?>

</div>
<div class="prueba">
<table border style="border-right:0px" id="tablatablets" >
      <thead   id = "tablatabletshead" style="background-color: green;color:white; ">
      <tr >
              
              <th scope="col">CODIGO</th>
              <th scope="col">PROVEEDOR</th>
          
          </tr>
      </thead>
      <tbody  id="tablatabletsbody">
    <?php foreach ($body as $value) {?>
    <tr  >
            <td style = "display:none"> 
            <?php echo $value ["cod_tablet"];?>
            </td>
            <td > 
            <input type ="text" style = "text-transform: uppercase;" value=' <?php echo $value ["cod_tablet"];?>'  />
            </td>
            <td> 
            <?=form_dropdown('proveedor',utf8_converter(get_combo_query( "select cod_prov_motorizado,descripcion from m_proveedor_motorizado where activo =true order by descripcion asc",'cod_prov_motorizado','descripcion' ,array("Seleccione"))), $value ["cod_prov_motorizado"],array( 'style'=>"width:250px;",'id'=>"proveedor"))?>

     
            </td>
            <td style = "display:none"> 
            <?php echo $value ["cod_prov_motorizado"];?>
            </td>
          
            <td style="border:0"><input type="button"  class="btn btn btn-primary btn-sm"  id="actualizartablet" name="actualizartablet" value="Actualizar"  onclick="actualizartablet(this);">
            <input type="button"  class="btn btn btn-danger btn-sm"  id="eliminartablet" name="eliminartablet" value="Eliminar"  onclick="eliminartablet(this);"> </td>
            <td style="border:0"></td>
    </tr>
    <?php }?>
    <tr  >
            <td style = "display:none"> 
            
            </td>
            <td > 
            <input type ="text" style = "text-transform: uppercase;" />
            </td>
            <td> 
            <?=form_dropdown('proveedor',utf8_converter(get_combo_query( "select cod_prov_motorizado,descripcion from m_proveedor_motorizado where activo =true order by descripcion asc",'cod_prov_motorizado','descripcion' ,array("Seleccione"))),0,array( 'style'=>"width:250px;",'id'=>"proveedor"))?>
            </td>
      
          
            <td style="border:0"><input type="button"  class="btn btn btn-success btn-sm"  id="agregartablet" name="agregartablet" value="Agregar"  onclick="agregartablet(this);"> </td>
            <td style="border:0"></td>
    </tr>
      </tbody>
</table>
</div>
 
</body>
<script type="text/javascript">
 
</script>





