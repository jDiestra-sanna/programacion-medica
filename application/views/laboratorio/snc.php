<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

  
  <link href="assets/css/scheduler.css" rel="stylesheet" />
  <script type="text/javascript" src="assets/js/scheduler.js"></script>
 
  
 
 <style>
 
 .prueba{
  grid-column-start:1;
  grid-column-end:6;
  height: 80vh;
  overflow: auto;
 } 
  .cuerpo1{
grid-column-start:1;
  grid-column-end:5;
  }  

  #tbodyhead{
    position: sticky;
  top:0;

  }
 
</style>
 
 
 

<div class="cuerpo1">
 

<label id="resultado"></label>
</div>
<div class="prueba">
<table border   style="border-right:0px;   ;" id="tpruebas" >
      <thead   id = "tbodyhead" style="background-color: blue;color:white; ">
      <tr >
              
              <th scope="col">CODIGO</th>
              <th scope="col" >TIPO SERVICIO</th>
              <th scope="col" >DESCRIPCION</th>
              <th scope="col" >TIPO</th>
              <th scope="col" >TIPO SEGUIMIENTO</th>
              <th scope="col" >ES MEDICO TRATANTE?</th>
              <th style="text-align: center;" >TIEMPO ATENCION/SUPERVISOR</th>
              <th scope="col" >UMBRAL</th> 
             
              <th style="text-align: center;" >TIEMPO ATENCION TRATANTE</th>
              <th scope="col" >UMBRAL TRATANTE</th>
              <th style="text-align: center;" >DIAS/HORAS</th>
              <th scope="col" >ACTIVO</th>

          </tr>
      </thead>
      <tbody  id="tbodypruebas">
    <?php foreach ($body as $value) {?>
    <tr  >
            <td style = "display:none"> 
            <?php echo $value ["cod_snc"];?>
            </td>
            <td > 
           <!--  <input type ="text"   style = "width: 5vw;text-transform: uppercase;" value='<?php echo $value ["cod_snc"];?>'  /> -->
            <?php echo $value ["cod_snc"];?>
            </td>
            <td> 
            <?=form_dropdown('tipservicio',utf8_converter(get_combo_query( "select tip_serv  from mae_tipo_servicio order by tip_serv",'tip_serv','tip_serv',array() )),trim($value ["tip_serv"]),array( 'style'=>"width:8vw;",'onchange'=>'changetiposervicioact(this)'))?>
 
            </td>
            <td > 
             <input type ="text"  style = "width: 30vw;text-transform: uppercase;" value='<?php echo $value ["des_snc"];?>'  /> 
  
          </td>
            <td > 
            <?=form_dropdown('tipo',utf8_converter(get_combo_query( "select    tipo  from mae_tipo_informacion_snc   order by tipo",'tipo','tipo' ,array())), trim($value ["tipo"]),array( 'style'=>"width:5vw;"))?>
             </td>
            <td > 
            <?=form_dropdown('tiposeguimiento',utf8_converter(get_combo_query( "select  tipo_seg  from mae_tipo_seguimiento  order by tipo_seg",'tipo_seg','tipo_seg' ,array())), $value ["tipo_seg"],array( 'style'=>"width:10vw",'onchange'=>'changetiposeguimientoact(this)' ))?>
          </td>
          <td style="text-align: center;"> 
             <input type ="checkbox" onchange="change_flg_medico(this);" <?php echo ($value["flag_medico_supervisor_tratante"]=='t')?'checked':'';?>  /> 
          </td> 
          <td style="text-align: center;" >
                    <input type ="number"  style = "width: 4vw;text-transform: uppercase;" value='<?php echo $value ["tiempo_atencion"];?>'  /> 
          </td>
          <td style="text-align: center;" >
                   <input type ="number"  style = "width: 4vw;text-transform: uppercase;" value='<?php echo $value ["umbral"];?>'  /> 
          </td> 
         
          <td style="text-align: center;" >
             <?php if ( $value["flag_medico_supervisor_tratante"]=='t' ) : ?>  
                   <input type ="number"  style = "width: 4vw;text-transform: uppercase;" value='<?php echo $value ["tiempo_atencion_tratante"];?>'  /> 
             <?php else : ?>
                  <input type ="number"  style = "width: 4vw;display:none"  value='<?php echo $value ["tiempo_atencion_tratante"];?>'  />
             <?php endif; ?>
          </td>
          <td style="text-align: center;" >
             <?php if ( $value["flag_medico_supervisor_tratante"]=='t' ) : ?>  
                   <input type ="number"  style = "width: 4vw;text-transform: uppercase;" value='<?php echo $value ["umbral_tratante"];?>'  />  
              <?php else : ?>
                  <input type ="number"  style = "width: 4vw;display:none"  value='<?php echo $value ["umbral_tratante"];?>' />
             <?php endif; ?>
          </td> 
    
          <td style="text-align: center;" >
               <?=form_dropdown('tipo',utf8_converter(get_combo_query( "select id,descripcion from (     values ('H','HORA'), ('D','DIA') ) s(id,descripcion);",'id','descripcion' ,array())), $value ["diasohoras"],array( 'style'=>"width:5vw;"))?>

          </td>
          <td style="text-align: center;"> 
             <input type ="checkbox" <?php echo ($value["activi"]=='1')?'checked':'';?>  /> 
          </td> 
          <td> 
              <input type ="button"  id="actualizarprueba" name="actualizarprueba" value ="Actualizar"  onclick="actualizarsnc_click(this);"/>
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
<div style=" grid-row-start:3;grid-row-end:3;grid-column-start:1;grid-column-end:6">
            
            <input type ="text" id="codigo_snc"   readonly placeholder = "codigo" maxlength = 3   style = "width: 4vw;text-transform: uppercase"  value="<?php 
             $CI =& get_instance();
             $CI->load->model('GestionlaboratorioModel'); 
            echo $CI->GestionlaboratorioModel->maxcodsnc()+1;?>"  />
              
             <?=form_dropdown('tipservicio',utf8_converter(get_combo_query( "select tip_serv  from mae_tipo_servicio order by tip_serv",'tip_serv','tip_serv' ,array("Seleccione"))),"0",array( 'style'=>"width:8vw;",'id'=>"tiposervicio",'onchange'=>'changetiposervicio(this.value)'))?>

            <input id="descripcion" type ="text" placeholder = "descripcion" style = "width: 30vw;text-transform: uppercase"    />
            
             <?=form_dropdown('tipo',utf8_converter(get_combo_query( "select    tipo  from mae_tipo_informacion_snc  order by tipo",'tipo','tipo' ,array("Seleccione"))),"0",array( 'style'=>"width:5vw;",'id'=>"tipo"))?>
             
             <?=form_dropdown('tiposeguimiento',utf8_converter(get_combo_query( "select tipo_seg  from mae_tipo_seguimiento order by tipo_seg",'tipo_seg','tipo_seg' ,array("Seleccione"))),"0",array( 'style'=>"width:10vw;",'id'=>"tiposeguimiento",'onchange'=>'changetiposeguimiento(this.value)'))?>
       
             <?=form_dropdown('tipo_medico',utf8_converter(get_combo_query( "select  tipo_seg  from mae_tipo_seguimiento  where tipo_seg='dd'",'tipo_seg','tipo_seg' ,array("0"=>"NINGUNO","1"=>"SUPERVISOR","2"=>"TRATANTE"))),0,array( 'style'=>"width:10vw;display:none;",'id'=>"tipo_medico",'onchange'=>'changetipomedico(this.value)'))?>
        
             <input id="umbral"  type ="number"  style = "width:4vw;display:none"   />
            
            <input id="tiempo_atencion" type ="number"  style = "width: 4vw;display:none"   />
             
          </td>
             <input type="button"  class="btn btn btn-success btn-sm"  id="agregarsnc" name="agregarsnc" value="Agregar"  onclick="agregarsnc(this);">
             <a href="#" onclick="download_table_as_csv('tpruebas');">Download as CSV</a>
 
     </div>
</body>
<script type="text/javascript">
 
</script>





