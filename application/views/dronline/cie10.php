<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

 <script src="assets/js/vue2.js'"></script>
 <script src="assets/js/vue-router.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  
 
<div style="grid-column:1 / span 3">
  <div> 
  <input type="text" id="codate" name="codate"  value="">

  <button class="btn btn btn-primary btn-sm"  onclick="buscarate();"  id="busqueda" name="busqueda"> <i class="fa fa-search" aria-hidden="true"></i> Busqueda </button>
<br>
  <button class="btn btn btn-success btn-sm"  onclick="agregarciesm();"  id="agregarciesm" name="agregarciesm"> <i class="fa fa-plus" aria-hidden="true"></i> Agregar </button>
 
 <div style="height:40vh;border:2px solid green;">
<table    id="tablacie10sm"  style="border-collapse: collapse; ">
<caption style = "caption-side:top;  border-style: solid #00aae4;  text-align: center;">SOLUCION MEDICA</caption>

      <thead   id = "tablacie10smhead" style="background-color: green;color:white; ">
      <tr >
              
              <th scope="col">COD_ATE</th>
                <th scope="col">COD_DIAGNOSTICO</th>
                <th scope="col">DIAGNOSTICO PRINCIPAL</th>
        
          </tr>
      </thead>
      <tbody  id="tablacie10smbody">
    
      </tbody>
</table>
</div>

 
<button class="btn btn btn-success btn-sm"  onclick="agregarcietablet();"  id="agregarcietablet" name="agregarcietablet"> <i class="fa fa-plus" aria-hidden="true"></i> Agregar </button>
<div style="height:40vh;border:2px solid green;">

<table     id="tablacie10tablet" >
<caption style = "caption-side:top;   border:2px solid green; text-align: center;">TABLET</caption>

      <thead   id = "tablacie10tablethead" style="background-color: green;color:white; ">
      <tr >
              
              <th scope="col">COD_ATE</th>
              <th scope="col">COD_DIAGNOSTICO</th>
              <th scope="col">DIAGNOSTICO PRINCIPAL</th> 
      
          </tr>
      </thead>
      <tbody  id="tablacie10tabletbody">
    
      </tbody>
</table>
</div>
 


<br>
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
<div style = "border:1px solid black;">

<h4> Cambio de provincia</h4><br>
Atencion:<br>
<input type="text" id="codateprov" name="codateprov"  value="">
<?=form_dropdown('distrito',get_combo_query(" select cod_dis,des_dis||'-'||des_prov des_dis from m_distritos d, m_provincias p where d.cod_prov= p.cod_prov order by des_dis","cod_dis","des_dis",array( "Seleccione")),"0",array( 'style'=>"width:250px",'id'=>"distrito"))?>
<button class="btn btn btn-primary btn-sm"  onclick="actualizarprov();"  id="actualizar" name="actualizar"> <i class="fa fa-sync" aria-hidden="true"></i> Actualizar provincia </button>

</div>
<br>
 
<div style = "border:1px solid black;">
<h4> Cambio de la aseguradora</h4><br>
Atencion:<br>
<input type="text" id="codateaseg" name="codateaseg"  value="">
<?=form_dropdown('aseguradora',get_combo_query("select * from m_grupos  where  activo_dronline = true","cod_gru","nom_gru",array( "Seleccione")),"0",array( 'style'=>"width:250px",'id'=>"aseguradora"))?>
<button class="btn btn btn-primary btn-sm"  onclick="actualizaraseg();"  id="actualizar" name="actualizar"> <i class="fa fa-sync" aria-hidden="true"></i> Actualizar aseguradora </button>

</div>
<br>
 
<div style = "border:1px solid black;">
<h4> Cambio de paciente</h4><br>
Paciente:<br>
<input style =  "text-transform:uppercase;width:100%"  type="text" id="nompaciente" name="nompaciente"  value="">
<button class="btn btn btn-primary btn-sm"  onclick="buscarpaciente();"  id="busqueda" name="busqueda"> <i class="fas fa-wheelchair"></i> Busqueda </button>
<br>
Atencion:<br>
<input type="text" id="codatepaciente" name="codatepaciente"  value="">
<button class="btn btn btn-primary btn-sm"  onclick="actualizarate();"  id="actualizar" name="actualizar"> <i class="fas fa-sync"></i> Actualizar </button>

<div style="height:50vh;border:2px solid green;">
<table style="width:100%;border-collapse: collapse;" id="tablepacientes">
<thead>
  <tr>
  <th>DNI</th>
  <th>APELLIDOS Y NOMBRES</th>
  <th>CODIGO HISTORIA</th>
  </tr>
</thead>
<tbody id="tablepacientesbody"></tbody>
</table>
</div>
</div>
<br>
<div style = "border:1px solid black;">

<h4> Cambio de medico</h4><br>
Atencion:<br>
<input type="text" id="codatemed" name="codatemed"  value="">
<?=form_dropdown('medico',get_combo_query(" select cod_doc,cod_doc||'-'||nom_doc as nom_doc1 from m_doctores  where activi = true order by nom_doc","cod_doc","nom_doc1",array( "Seleccione")),"0",array( 'style'=>"width:250px",'id'=>"medico"))?>
<button class="btn btn btn-primary btn-sm"  onclick="actualizarmed();"  id="actualizarmed" name="actualizarmed"> <i class="fa fa-sync" aria-hidden="true"></i> Actualizar medico </button>

</div>
<br>
<br>
<div style = "border:1px solid black;">

<h4> Medicamentos</h4><br>
<input style =  "text-transform:uppercase;width:100%"  type="text" id="nommedicamento" name="nommedicamento"  value="">
<button class="btn btn btn-success btn-sm"  onclick="buscarmedicamento();"  id="busquedamed" name="busquedamed"> <i class="fas fa-pills"></i> Busqueda </button>
<button class="btn btn btn-primary btn-sm"  onclick="insertarmedicamento();"  id="insertarmedicamento" name="insertarmedicamento"> <i class="fas fa-plus"></i> Agregar </button>
<button class="btn btn btn-danger btn-sm"  onclick="eliminarmedicamento();"  id="eliminarmedicamento" name="eliminarmedicamento"> <i class="fas fa-minus"></i> Quitar </button>

<div style="height:50vh;border:2px solid green;">
<table style="width:100%;border-collapse: collapse;" border id="tablemedicamentos">
<thead>
  <tr>
  <th>CODIGO</th>
  <th>MEDICAMENTO</th>
  <th>PRESENTACION</th>
  </tr>
</thead>
<tbody id="tablemedicamentosbody"></tbody>
</table>
</div>
</div>
<br>
<br>
</body>
   


</div>
