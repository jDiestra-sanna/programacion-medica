<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

 <script src="/assets/js/vue2.js"></script>
 <script src="/assets/js/vue-router.js"></script>
 
 
 <style>
 .prueba{
  grid-column-start:1;
  grid-column-end:5;
 
height: 80vh;
  overflow-x: scroll;
  border: solid 1px;
}
 
#tabla1 {
  width:100%; 
  white-space: nowrap;

}
#tabla1 #t01 tr:nth-child(even) {
  background-color: #eee;
}
#tabla1 #t01 tr:nth-child(odd) {
 background-color: #fff;
}
#tabla1 #t01 th {
  color: white;
  background-color: green; 
    border: 1px solid black ;
}
#tabla1 td {
  border: 1px solid black;
}

table#t02{
  width:100%;
}
 fieldset {
  position: relative;
  border:1px solid;
}
legend {
  font-size: 1em;
  font-weight: bold;
}
.legend2 {
  display:table;
  position: absolute;
  top: -0.1em;
  right: 20px;
  --background: yellow;
 }
 #show_modaldireccion2 {
  position: absolute;
  --z-index: 9;
  --background-color: #f1f1f1;
  --text-align: center;
  border: 1px solid #d3d3d3;
}

#show_modaldireccion2header {
  padding: 10px;
  cursor: move;
  --z-index: 10;
  --background-color: #2196F3;
  color: #fff;
}



 </style>
  
  <div  style="display: grid;grid-template-columns:  1fr 1fr ;">
idempleado
<input type="text" id="idempleado" name="idempleado" value=""> 
 <br> 
Nombre
<input type="text" id="nombre" name="nombre"  value=""> 
<br>
Dni
<?=form_dropdown('tipodoc',get_combo_query( " select * from mae_documento_identidad ",'id_doc_id','descripcion_doc_id' ,array("Seleccione")),0,array( 'style'=>"width:280px;",'id'=>"tipodoc"))?>
<br>
<input type="text" id="dni" name="dni"  value="">
<br> 
Correo
<input type="text" id="correo" name="correo"  value=""> 
<br>
Direccion
<input type="text" id="direccion" name="direccion"  value="">
<br>
Urbanizacion
<input type="text" id="urbanizacion" name="urbanizacion"  value="">  
<br>
Distrito
<?=form_dropdown('ubigeo',get_combo_query( " select ubigeo_dist,des_dis from m_distritos  where cod_prov = 'L0'",'ubigeo_dist','des_dis' ,array("Seleccione")),0,array( 'style'=>"width:280px;",'id'=>"ubigeo"))?>
<input type="button"  class="btn btn btn-warning btn-sm"  id="guardarempleado" name="guardarempleado" onclick = "guardarempleado();"  value="Guardar"    >  
 
</div>
 
 
 
 
 
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
 <script type="text/javascript">
   var cod_prov_motorizado_b='<?php echo $this->session->userdata('proveedor');?>';   
   

</script>
<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js'>"></script>





