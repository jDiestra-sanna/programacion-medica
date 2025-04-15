<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

  
  
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
<?=form_dropdown('proveedor',utf8_converter(get_combo_query( "select cod_prov_motorizado,descripcion from m_proveedor_motorizado",'cod_prov_motorizado','descripcion' ,array("Seleccione"))),"0",array( 'style'=>"width:280px;",'id'=>"proveedor",'onchange'=>"filtrarproveedor('tablamaletinesbody')"))?>

</div>
<div class="prueba">
<table border style="border-right:0px" id="tablamaletines" >
      <thead   id = "tablamaletineshead" style="background-color: green;color:white; ">
      <tr >
              
              <th scope="col">CODIGO</th>
              <th scope="col">PROVEEDOR</th>
          
          </tr>
      </thead>
      <tbody  id="tablamaletinesbody">
    <?php foreach ($body as $value) {?>
    <tr  >
            <td style = "display:none"> 
            <?php echo $value ["cod_maletin"];?>
            </td>
            <td > 
            <input type ="text" value='<?php echo $value ["cod_maletin"];?>' style = "text-transform: uppercase;"  onkeypress="return IsAlphaNumeric(event);" ondrop="return false;" onpaste="return false;" />
            </td>
            <td> 
            <?=form_dropdown('proveedor',utf8_converter(get_combo_query( "select cod_prov_motorizado,descripcion from m_proveedor_motorizado where activo =true order by descripcion asc",'cod_prov_motorizado','descripcion' ,array("Seleccione"))), $value ["cod_prov_motorizado"],array( 'style'=>"width:250px;",'id'=>"proveedor"))?>

     
            </td>
            <td style = "display:none"> 
            <?php echo  $value ["cod_prov_motorizado"];?>
            </td>
            
          
            <td style="border:0"><input type="button"  class="btn btn btn-primary btn-sm"  id="actualizarmaletin" name="actualizarmaletin" value="Actualizar"  onclick="actualizarmaletin(this);">
            <input type="button"  class="btn btn btn-danger btn-sm"  id="eliminarmaletin" name="eliminarmaletin" value="Eliminar"  onclick="eliminarmaletin(this);"> </td>
            <td style="border:0"></td>
    </tr>
    <?php }?>
    <tr  >
            <td style = "display:none"> 
            
            </td>
            <td > 
            <input type ="text"  style = "text-transform: uppercase;"  onkeypress="return IsAlphaNumeric(event);" ondrop="return false;" onpaste="return false;" />
            </td>
            <td> 
            <?=form_dropdown('proveedor',utf8_converter(get_combo_query( "select cod_prov_motorizado,descripcion from m_proveedor_motorizado where activo =true order by descripcion asc",'cod_prov_motorizado','descripcion' ,array("Seleccione"))),0,array( 'style'=>"width:250px;",'id'=>"proveedor"))?>
            </td>
      
          
            <td style="border:0"><input type="button"  class="btn btn btn-success btn-sm"  id="agregarmaletin" name="agregarmaletin" value="Agregar"  onclick="agregarmaletin(this);"> </td>
            <td style="border:0"></td>
    </tr>
      </tbody>
</table>
</div>
 
</body>
<script type="text/javascript">
 
</script>





