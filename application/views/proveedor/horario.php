<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

   
 
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
   color: #000080 ;
   width: 200px;
}
 .legend2 {
  display:block;
  position: absolute;
  background:white ;
  top: -2em;
  right: 20px;
 
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

.spinner {
  margin: auto;
  display:none;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 8px solid rgba(152, 150, 150, 0.2);
    border-left-color: #F00;
    border-right-color: #F00;
    animation: rotateSpinner 1.5s linear 54;

}
 
@keyframes rotateSpinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

 </style>
 

  <div>
Fecha Asignacion
<input type="date" id="fec_inicial" name="fec_inicial" value="<?php 

$CI =& get_instance();
  $hora =      $CI->get_fecha_servidor() ;
echo    substr($hora ,6,4) ."-" .  substr($hora ,3,2) ."-".  substr($hora ,0,2) ;      ?>"> 
</div>

<label id ="lblCantidad">Turnos:</label></div>
<div> 
  <?=form_dropdown('conductor',utf8_converter(get_combo_query( "select login,login||'-'||nom_mot as nom_mot1 from m_motorizados where activi =true and cod_prov_motorizado=". $this->session->userdata('proveedor').  " order by nom_mot asc",'login','nom_mot1' ,array("Seleccione"=>"Seleccione"))),"Seleccione",array( 'style'=>"width:280px;display:none",'id'=>"conductor"))?> 
  <?=form_dropdown('mpos',get_combo_query( "select * from m_motorizados where 1=2",'con_mpos','nom_mpos' ,array("","NO","SI")),"0",array( 'style'=>"width:50px;display:none",'id'=>"mpos"))?>
  <?=form_dropdown('botiquin',get_combo_query_full("select MA.COD_ALMACEN  ,ma.cod_almacen || '  ' || ma.descp_almacen botiquin  from mae_almacen ma inner join i_almacen_especialidad ae on ma.cod_almacen = ae.cod_almacen where cod_esp in ('006') order by 1 asc ","cod_almacen","botiquin"),0,array( 'style'=>"width:120px;display:none",'id'=>"botiquin"))?>
  <?=form_dropdown('tablet',get_combo_query("select * from m_tablet where cod_prov_motorizado=". $this->session->userdata('proveedor').  " order by cod_prov_motorizado asc","cod_tablet","cod_tablet",array("TAB_0")),"0",array( 'style'=>"width:120px;display:none",'id'=>"tablet"))?>
  <?=form_dropdown('maletin',get_combo_query("select * from m_maletin where cod_prov_motorizado=". $this->session->userdata('proveedor').  " order by cod_prov_motorizado asc","cod_maletin","cod_maletin",array("Seleccione"=>"Seleccione")),"Seleccione",array( 'style'=>"width:120px;display:none",'id'=>"maletin"))?>

</div>
<div>
  <button class="btn btn btn-primary btn-sm"  id="busquedaremisse" name="busquedaremisse" ><i class="fas fa-search"></i> Busqueda
 </button>
 <button class="btn btn btn-warning btn-sm"  id="guardarremisse" name="guardarremisse" ><i class="far fa-save"></i> Guardar
 </button>
<!--  <button  class="btn btn btn-success btn-sm"  id="descargarexcel" ><i class="fa fa-download"></i>Descargar </button>
 <button  class="btn btn btn-success btn-sm"  id="cargarexcel" onclick="document.getElementById('selectedFile').click();"><i class="fa fa-upload"></i>Cargar </button> -->
 <input type="file" id="selectedFile" style="display: none;" />
 <button  class="btn btn btn-info btn-sm"  id="descargarexcelcompleto"  onclick="descargarexcelcompleto();"><i class="fas fa-file-excel"></i>Descargar Completo</button>


 <?=form_dropdown('filtroremisse',get_combo_query( "select * from m_motorizados where 1=2",'con_mpos','nom_mpos' ,array("","Datos completos","Datos incompletos")),0,array( 'style'=>"width:150px;",'id'=>"filtroremisse"))?>
 <label id="resultado"></label>

</div>
<div></div>        <div id="validarbusquedaremisse"></div>



<div class="prueba">
<table class="table w-auto small" id="tabla1" >
      <thead style = "position: sticky;top: 0;" id = "t01">
      <tr >
               <th scope="col">CODIGO</th>
              <th scope="col">DOCTOR</th>
              <th scope="col">CLASIF</th>
              <th scope="col">TURNO</th>
              <th scope="col">LUGAR RECOJO</th>
              <th scope="col">LUGAR DESTINO</th>
              <th scope="col">FECHA</th>
              <th scope="col">HORINI</th>
              <th scope="col">HORFIN</th>
              <th scope="col">CONDUCTOR</th>
              <th scope="col">CON_MPOS</th>
              <th scope="col">BOTIQUIN</th>
              <th scope="col">TABLET</th>
              <th scope="col">MALETIN</th>
<!--               <th scope="col"></th>
 -->              <th scope="col">ESPECIALIDAD</th>

          </tr>
      </thead>
      <tbody  id="t02">
      <tr>
      <td colspan="15" style="border:none;">     <div id="spinner" class="spinner"></div></td>
      </tr>
      </tbody>
</table>

</div>


</body>
 <script type="text/javascript">
   var cod_prov_motorizado_b='<?php echo $this->session->userdata('proveedor');?>';   
   

</script>

<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>





