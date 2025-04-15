<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
 
 <style>
.prueba{
  grid-column-start:1;
  grid-column-end:7;
  height: 65vh;
  overflow-x: scroll;
  border: solid 1px;
}
#tabla1 {
  width:100%;
 
}
#titulares {
  width:100%;
  border-collapse: collapse;
}
#titularesbody tr,#titularesbody td{
  border: 1px solid black ;
}
#titulares #titulareshead th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#titulares #titularesbody tr.selected {
    background-color: #40e0d0;
} 
#tabletransferencia #tbodytransferencia tr.selected {
    background-color: #40e0d0;
}
#direcciones {
  width:100%;
  border-collapse: collapse;

}
#direccionesbody tr,#direccionesbody td{
  border: 1px solid black ;
}
#direcciones #direccioneshead th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#direcciones #direccionesbody tr.selected {
    background-color: #40e0d0;
} 


#atenciones {
  width:100%;
  border-collapse: collapse;
}
#atencionesbody tr,#atencionesbody td{
  border: 1px solid black ;
}
#atenciones #atencioneshead th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#atenciones #atencionesbody tr.selected {
    background-color: #40e0d0;
} 

#tabla1 #t02 tr.selected {
    background-color: #40e0d0;
    --color: #fff;    
} 


#tabla1 #t01 th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#tabla1 td{
  border: 1px solid black;
  white-space: nowrap;

}
#tabla1 #t02{
  width:100%;
}
/* The Close Button */
.close {
  color: #aaaaaa;
  
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.ed-modal-container {
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: scroll;
}  
 
  
  .ed-modal-content {
     border-radius: 5px ;
    background: #fff;
    --width: 90%;
    --height: 95vh;
     max-width: 600px;
     padding: 2px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);

  }
 
 
   

  #table_seguimiento ,#table_seguimiento td, #table_seguimiento th {
  border: 1px solid black;
}
#filtro1{
  grid-column-start:1;
  grid-column-end:3;
  border:2px solid ;
}
#filtro2{
  grid-column-start:3;
  grid-column-end:6;
  border:2px solid ;
}
#procesos{
  grid-column-start:1;
  grid-column-end:7;
  --border:2px solid ;
}
#pagination a
{
color:black;
--display:block;
text-decoration:none;
padding:2px 3px 3px 2px;
--border:solid 1px;
--border-radius:3px;
}
#pagination a:hover,
#pagination  strong
{
--color:#FFFFFF;
padding:2px 3px 3px 2px;

border:solid 1px;
background:#F8FCFF;
  
}
 </style>
<!-- <div id = "resultado" ></div>
 -->
 <div id ="filtro1"  >
 
    <div style="display:flex;justify-content:space-between;">
          <select id="filtro" style="width:42%;" onchange="cambiofiltro(this.value);">
            <option value="0">Seleccione</option>
            <option value="1">Fecha serv.</option>
           
            <option value="3">Paciente</option>
            <option value="4">Doctor</option>
            <option value="5">Aseguradora</option>
            <option value="6">Estado</option>
            <option value="7">Clasificacion</option>
            <option value="8">Distrito</option>
            <option value="9">Programa</option>
            <option value="10">Tipo</option>
            <option value="11">Numero de Prueba</option>
            <option value="12">EKG</option>
          </select>  
          <select style="display:none;width:10%;" id="estado_ekg"> 
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="C">C</option>
          </select>
          <select style="display:none;width:30%;" id="cbo_opcion2"> 
            <option value="0">ANALISIS</option>
            <option value="1">RX ECO</option>
            <option value="2">EKG</option>
            <option value="3">VACUNA</option>
            <option value="4">PROCEDIMIENTO</option>
          </select>
          <select style="display:none;width:40%;"   id="clasificacion_serv">
          </select>
          <input style="display:none;width:150px;text-transform: uppercase;" type="text" id="txt_PacDrAseg">
          <select style="display:none;width:20%;" id="cbo_estado"> 
          
            <option value="0">0</option>
            <option value="2,R2">2,R2</option>
            <option value="3,R3">3,R3</option>
          </select>
          <select style="display:none;width:20%;" id="cbo_clasif"> 
            <option value="0"></option>
            <option value="1">R</option>
            <option value="2">T</option>
           </select>
          <select style="display:none;width:20%;" id="cbo_tipo"> 
            <option value="0"></option>
            <option value="1">I</option>
            <option value="2">P</option>
           </select>
           <select style="display:none;width:40%;" id="cbo_programa"> 
            <option value="0">TODOS</option>
            <option value="1">AGUDOS</option>
            <option value="2">ESPECIALISTA</option>
            <option value="3">CRONICOS</option>
            <option value="4">AUTO COVID</option>
            <option value="5">ASEGURABILIDAD</option>
            <option value="6">DR. ONLINE</option>
          </select>
          <input style="display:none;width:150px;" type="text" onkeypress="allowNumbersOnly(event)" id="Txt_cod_prueba">
          
          
     </div>
     
      <div style="display:flex;justify-content:space-between;">
        <label>Dni</label> 
        <input style="width:150px;" onkeypress="allowNumbersOnly(event)" minlength="8"  maxlength="8"    type="text" id="dni">
      </div>
      <div style="display:flex;justify-content:space-between;">
        <label>Atencion</label> 
        <input style="width:150px;" onkeypress="allowNumbersOnly(event)" type="text" id="atencion">
      </div>
      <div style="display:flex;justify-content:space-between;">
        <label>Proveedor</label>
        <?=form_dropdown('proveedorflebotomista',get_combo_query( "SELECT a.cod_laboratorios as id_proveedor,a.des_laboratorio as proveedor FROM m_lab_laboratorios a where estado = 'A' AND cod_servicios='1'",'id_proveedor','proveedor' ,array("Todos")),0,array( 'onChange'=>"cambioproveedorflebotomista(this);",'style'=>"width:150px;",'id'=>"proveedorflebotomista"))?>
      </div>
      <div style="display:flex;justify-content:space-between;">
        <label>Flebotomista</label>
        <select style="width:150px;" id="flebotomista"> 
            <option value="0">Todos</option>  
       </select>      
      </div>
</div>

<div id="filtro2"  >
   
<input type="checkbox"id="buscar_desde"    name="buscar_desde">
<label for="buscar_desde" >Buscar_desde</label>
<br>
 <label style="white-space:word-wrap;">
 Fecha inicial
</label>
<input  type="date" id="fec_inicial" name="fec_inicial" style="width:140px" value="<?php  echo date("Y-m-d")?>">
 Fecha final
<input  type="date" id="fec_final" name="fec_final" style="width:140px" value="<?php  echo date("Y-m-d"/*,strtotime("last day of this month")*/)?>"> 
<input type="checkbox"id="finalizadas"    name="finalizadas">
<label id="lbl_finalizadas" for="finalizadas" >Finalizadas</label>
<select style="display:inline-block;visibility:hidden;" id="cbo_estados"> 
            <option value="3">6</option>
            <option value="6">C</option>
</select>
<br>

<input type="checkbox"id="buscar_desde_fec_coord"    name="buscar_desde_fec_coord">
<label for="buscar_desde_fec_coord" >Fecha de coordinacion desde</label>
<br>
  Fecha inicial
<input  type="date" id="fec_inicial_coord" name="fec_inicial" style="width:140px" value="<?php  echo date("Y-m-d")?>">
 Fecha final
<input  type="date" id="fec_final_coord" name="fec_final" style="width:140px" value="<?php  echo date("Y-m-d"/*,strtotime("last day of this month")*/)?>"> 
 </div>
<!--<div><label id="resultado"></label></div>-->
<div>
<button class="btn btn btn-primary btn-sm"  id="busqueda" name="busqueda"> <i class="fa fa-search" aria-hidden="true"></i> Busqueda </button>
<button class="btn btn btn-primary btn-sm" style = "display:none"  id="Cmd_expEKG" name="Cmd_expEKG" onclick="exportarekg(this.dataset.cond);"> <i class="fas fa-file-medical" aria-hidden="true"></i> Exportar EKG </button>
</div>
<div class="prueba">
<table  id="tabla1" >
      <thead   id = "t01">
      <tr >
              <th scope="col"></th>
              <th scope="col">E</th>
              <th scope="col">TIPO</th>
              <th scope="col">CLASIF.</th>
              <th scope="col">NUM SERVICIO</th>
              <th scope="col">NUM ATENCION</th>
              <th scope="col">PROGRAMA</th>
              <th scope="col">NOM PACIENTE</th>
              <th scope="col">DISTRITO</th>
              <th scope="col">FECHA CREACION</th>
              <th scope="col">HORA CREACION</th>
              <th scope="col">FECHA SERVICIO</th>
              <th scope="col">FECHA MAXIMA</th>
              <th scope="col">FECHA COORDINADA</th>
              <th scope="col">HORA COORDINADA</th>


      </tr>
      </thead>
      <tbody  id="t02">

      </tbody>
      <tfoot>
      <!-- Paginate -->
      <tr><td colspan= "15"><div style='margin-top: 10px;' id='pagination'></div></td></tr>
      </tfoot>
</table>     
</div>
 
<div id="procesos">

<input type="button"  class="btn btn btn-success btn-sm"  id="btn_seguimiento" name="btn_seguimiento"  onclick ="modalseguimiento();" value="SEGUIMIENTO" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_creacion" name="btn_creacion" onclick ="modalasoc_servicio(this);" value="CREACION"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_asignar_proveedor" name="btn_asignar_proveedor" value="ASIGNAR PROVEEDOR"  onclick ="Cmd_AsigProveedor_Click();" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_enviar_orden_proveedor" name="btn_enviar_orden_proveedor" value="ENVIAR ORDEN DE SER. AL PROVEEDOR" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_confirmacion_coord" name="btn_confirmacion_coord" onclick ="modalconfirmacion_coord(this);" value="CONFIRMAR COORD. SERVICIO" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_confirmacion_muestra" name="btn_confirmacion_muestra" value="CONFIRMACION MUESTRA LABORATORIO" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_detalle" name="btn_detalle" value="DETALLE" onclick ="modaldetalle(this);"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_auditoria" name="btn_auditoria" value="AUDITORIA" onclick ="modalauditoria(this);" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_soporte" name="btn_soporte" value="SOPORTE" onclick ="modalsoporte(this);"  disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_validacion" name="btn_validacion" value="VALIDACION"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="cambio_estado" name="cambio_estado" value="SUPERVISION"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="cambio_estado_6" name="cambio_estado_6" value="MODIFICAR ORDEN" onclick ="Cmd_AsigProveedor_Click();" disabled> 
<input type="text" id = "orden" name="orden">
<input type="hidden" id = "Txt_codservlaboratorio" name="Txt_codservlaboratorio">
<input type="hidden" id = "Txt_codservicio" name="Txt_codservicio">
<input type="hidden" id = "Txt_tipo" name="Txt_tipo">
<input type="hidden" id = "Txt_estado" name="Txt_estado">

</div>

</body>
<script type="text/javascript">
  var cambio_estado = document.getElementById("cambio_estado").value;

  document.getElementById("cambio_estado").addEventListener("click",function(){
  var orden = document.getElementById("orden").value;
    if(orden.trim()==""){
    return

    }
    var r = confirm("¿Desea regresar a 0 esta orden?");
  if (r == true) {
  fetch('/gestionlaboratorio/cambiarestado/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      orden:orden 
    })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Sucedio un error'))
    }).then(data => {
        if(data){
          alert("Se actualizo la orden");
        }
    }).catch(error => {
   
      console.log(error);    
    })
  }else{
    
  }
  });

function dragElement(elmnt, header = '') {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    if(header !=''){
      document.getElementById(elmnt.id + header).onmousedown = dragMouseDown;
    }else{
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    }
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    console.log(e);
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

</script>

<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>



