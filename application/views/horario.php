<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
  error_reporting(E_ALL);

<?php endif; ?>

   <link href="<?=base_url('assets/')?>css/TimeSheet.css" rel="stylesheet" />
  <script type="text/javascript" src="<?=base_url('assets/')?>js/TimeSheet.js"></script>
     <link href="<?=base_url('assets/')?>css/scheduler.css" rel="stylesheet" />
  <script type="text/javascript" src="<?=base_url('assets/')?>js/scheduler.js"></script>
<script type="text/javascript">
  
  
  <?php 
  
  $cod =   is_null($this->session->userdata('cod_doc'))?$this->session->userdata('cod_usu'):$this->session->userdata('cod_doc');   ?>
     var myvar='<?php echo $cod;?>';   
</script>
 

 
<!-- <div id = "resultado" ></div> -->
 <div>
 <input type="button" class="btn btn-primary btn-sm" id="agendar" value="Agendar">
 <input type="button" class="btn btn-primary btn-sm" id="actualizar" value="Actualizar">
 <input type="button" class="btn btn-primary btn-sm btn-danger" id="eliminar_turnos" value="Eliminar turnos">

 </div>
 <div  >
 <label for="agudo">
    <?php echo form_radio('nom_clasif', 1,!empty($d['variable3'])?($d['variable3']=="1"?true:false):true , "id='agudo'"); ?> Agudo
</label>
<label for="cronico">
    <?php echo form_radio('nom_clasif', 2, !empty($d['variable3'])?($d['variable3']=="2"?true:false):false, "id='cronico'"); ?> Crónico
</label>
</div>
 

 <div><?php
$cod_doc = $this->session->userdata('user_id');
?>

<label>Especialidad</label>

<?=form_dropdown('especialidades',get_combo_query("select e.cod_esp,e.nom_esp   from m_doctores   d  join m_espcxdoctor exd  on d.cod_doc =  exd.cod_doc join m_especialidades e on exd.cod_esp = e.cod_esp where trim(d.cod_doc) ='". $cod_doc ."' and d.activi = true","cod_esp","nom_esp",array("Seleccione")),!empty($d['variable4'])?$d['variable4']:'0' ,array( 'style'=>"width:140px",'id'=>"especialidades"))?>
</div>
 

<!--
<div>	
    <label>Lugar Recojo</label>
    <textarea style="padding:0;margin:0;vertical-align: top;text-transform: uppercase;" name="desc_doc" id="desc_doc" rows="1" cols="40"></textarea>
</div>
-->

<div>
<label>LUGAR RECOJO</label>
<?=form_dropdown('distrito',get_combo_query("select * from m_distritos where cod_prov = 'L0'","ubigeo_dist","des_dis",array("Seleccione")),0,array( 'style'=>"width:150px",'id'=>"distrito"))?>
<label>LUGAR TERMINO</label>
<?=form_dropdown('distrito2',get_combo_query("select * from m_distritos where cod_prov = 'L0'","ubigeo_dist","des_dis",array("Seleccione")),0,array( 'style'=>"width:150",'id'=>"distrito2"))?>
</div>

<div>
</div>
 <div></div>
<div style="text-align: right;"><?php   		 		
 echo  "<strong>".strtoupper (strftime("%B  %Y", strtotime('first day of +1 month')))."</strong>";
 //echo  "<strong>".strtoupper (strftime("%B de %Y", strtotime('first day of +1 month')))."</strong>";?>
</div>

 <div style="grid-column-start:1;  grid-column-end:5;">
   <small></small>
 </div>
<div style="grid-column-start:1;  grid-column-end:5;">
  <table id="test3"></table>    
</div>
   <script>

      function log(msg) {
        $('#log').prepend('<p>' + ++log.line + ': ' + msg + '</p>');
      }
      log.line = 0;
    var x =   $('#test3').scheduler({
      data: <?php 
      if (empty($d['variable1']   )) {
         echo "{}";
      }else{
          echo $d['variable1']   ;
      }
       ?>  ,
      // data: { 1: [1, 2, 3, 4,5] },
        onRender: function () {
          log('Init');
        },
        onDragStart: function (d) {
          log('Drag Start');
        },
        onDragMove: function (d) {
          log('Drag Move');
        },
        onDragEnd: function (d) {
          log('Drag End');
        },
        onSelect: function (d) {
          log('Selected');
        }
      });
      $('#desc_doc').val(<?php 
      if (empty($d['variable2']   )) {
         echo "";
      }else{
          echo $d['variable2']   ;
      }
       ?>);
       
    </script>
    <!--<h2>With Options</h2>-->
 
    <!--  <h3>accuracy = 2</h3>-->
    
 
   
</body>
 





