<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

  
      <link href="<?=base_url('assets/')?>css/scheduler.css" rel="stylesheet" />
  <script type="text/javascript" src="<?=base_url('assets/')?>js/scheduler.js"></script>
 
  
 
 <style>
 
 .prueba{
  grid-column-start:1;
  grid-column-end:5;
  height: 90vh;
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
              <th scope="col" >APELLIDOS Y NOMBRES</th>
              <th scope="col" >TELEFONO</th>
              <th scope="col" >PROVEEDOR</th>
              <th scope="col" >ACTIVO</th>

          </tr>
      </thead>
      <tbody  id="tbodypruebas">
    <?php foreach ($body as $value) {?>
    <tr  >
  
            <td > 
            <input type ="text" readonly  style = "width: 10vw;text-transform: uppercase;" value=' <?php echo $value["cod_flebotomista"];?>'  />
            </td>
            <td> 
            <input type ="text"  style = "width: 30vw;text-transform: uppercase;" value=' <?php echo $value["nom_flebotomista"];?>'  />
            </td>
            <td > 
            <input type ="text"  style = "width: 10vw;text-transform: uppercase;" oninput="this.value=this.value.replace(/[^0-9.]/g,'');" value=' <?php echo $value["tlf_flebotomista"];?>'  />
            </td>
            <td> 
            <?= form_multiselect('idproveedor', get_combo_query_full( "select cod_laboratorios,des_laboratorio  FROM m_lab_laboratorios a where estado = 'A' AND cod_servicios='1' order by des_laboratorio",'cod_laboratorios','des_laboratorio' ), explode(',',trim(trim($value["cod_prov_flebotomista"],'{'),'}')),array('size'=>9,'style'=>"width:280px;") ); ?> 
            </td>
            <td style="text-align: center;"  > 
            <input type ="checkbox"   <?php echo $value["activo"]=='t'?'checked':'';?>  />
           
            </td>
            <td>
            <input type ="button"  id="actualizarflebotomista" name="actualizarflebotomista" value ="Actualizar"  onclick="actualizarflebotomista_click(this);"/>

            </td>
        <!--     <td style = "display:none"> 
            
            </td> -->
          
<!--             <td style="border:0"><input type="button"  class="btn btn btn-primary btn-sm"  id="actualizartablet" name="actualizartablet" value="Actualizar"  onclick="actualizartablet(this);">
            <input type="button"  class="btn btn btn-danger btn-sm"  id="eliminartablet" name="eliminartablet" value="Eliminar"  onclick="eliminartablet(this);"> </td>
            <td style="border:0"></td> -->
    </tr>
    <?php }?>
   


 <tr>
            <td>
            <input type ="text"  id="codigoflebotomista"  readonly placeholder = "codigo" maxlength = 4  value="<?php echo str_pad(($value["cod_flebotomista"]+1),4,"0",STR_PAD_LEFT)  ; ?>" style = "width: 10vw;text-transform: uppercase;"   />
             
            </td>
            <td>
            <input type ="text"    id="apellidosflebotomista"  placeholder = "APELLIDOS Y NOMBRES" style = "width: 30vw;text-transform: uppercase;"    />
            </td>
            <td> 
            <input type ="text"  id="telefonoflebotomista" value="0" oninput="this.value=this.value.replace(/[^0-9.]/g,'');" style = "width: 10vw;text-transform: uppercase;"    /> 
            </td>
            <td> 
            <?=form_dropdown('idproveedor',utf8_converter(get_combo_query_full( "select cod_laboratorios,des_laboratorio FROM m_lab_laboratorios  where estado = 'A' AND cod_servicios='1' order by des_laboratorio",'cod_laboratorios','des_laboratorio' )), "",array( 'size'=> '9','style'=>"width:280px;",'id'=>"idproveedor",'multiple'=>"multiple"))?>
            
            </td>
            <td>
             <input type="button"  class="btn btn btn-success btn-sm"  id="agregarflebotomista" name="agregarflebotomista" value="Agregar"  onclick="agregarflebotomista(this);"> 
             </td>
             <td></td>
           
    </tr>
    </tbody>
</table>
</div>
</body>
<script type="text/javascript">

 
</script>





