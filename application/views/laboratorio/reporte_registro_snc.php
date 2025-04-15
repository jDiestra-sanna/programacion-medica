<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
  
 <div>
fecha inicial
   <input type="date" id="fecinicio" name="fecinicio"  value="<?php echo date("Y-m-d");?>"><br>
   fecha final
<br>
   <input type="date" id="fecfinal" name="fecfinal"  value="<?php echo date("Y-m-d");?>"><br>
  

</div>
<div>
<input type="radio" id="registro" name="registro" onclick="cargar_servnoconforme(document.getElementById('cmbservicio').value);" checked="checked"><label for="registro" >Registros</label> 
   <input type="radio" id="snc" name="registro" onclick="cargar_servnoconforme(document.getElementById('cmbservicio').value);" ><label for="snc" >SNC</label><br><br><br>
   <input type="checkbox" id="Check1" name="Check1"  onclick="mostrarsnc(this.checked);"/><label id="todos" for="Check1" >Todos</label><br> 
   <label id="observaciones">Observaciones</label><?=form_dropdown('DBDes_snc',get_combo_query( "SELECT * FROM m_servnoconforme  WHERE 1 = 2 ",'cod_snc','des_snc' ,array("")),0,array( 'disabled'=>"true" ,'style'=>"width:300px;",'id'=>"DBDes_snc"))?>


</div>
<div>
<label id="servicio">Servicio</label>
<select id="cmbservicio" name="cmbservicio" onchange="cargar_servnoconforme(this.value)" >
<option value="0">Selecccione</option>
<option value="1">Incidencia</option>
<option value="2">Call Center</option>
<option value="3">Pedido</option>
<option value="4">Laboratorios</option>
<option value="5">Ambulancias</option>
<option value="6">Administracion</option>
<option value="7">Aud. Fichas</option>
<option value="8">Pre-Servicio</option>
<option value="9">Aud. Medica</option>
<option value="10">Post-Servicio</option>
<option value="11">Almacen</option>
<option value="12">Adversos/Centinela</option>

</select>
</div>
 <div>
  <button class="btn btn btn-primary btn-sm"  onclick="generarreporteregistro_snc();"  id="busqueda" name="busqueda"> <i class="far fa-file-excel" aria-hidden="true"></i> Generar reporte</button>
</div>
   
</body>
   
<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>



