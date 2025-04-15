<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
 
 <style>
.prueba{
  grid-column-start:1;
  grid-column-end:6;
  

height:78vh;
  overflow-x: scroll;
  border: solid 1px;
}
#tabla1 {
  width:100%;
  border-collapse: initial;
  white-space: nowrap;

}
    
#tabla1 #t02 tr.selectedrojo {
    background-color:  RGB(255, 120, 120);
    --color: #fff;    
} 

#tabla1 #t02 tr.selectednaranja {
    background-color:RGB(255, 174, 102);
    --color: #fff;    
} 
#tabla1 #t02 tr.selectedverde {
    background-color: RGB(150, 250, 200);
    --color: #fff;    
} 
#tabla1 #t02 tr.selectedmorado1 {
    background-color: RGB(194, 205, 228);
    --color: #fff;    
} 
#tabla1 #t02 tr.selectedmarron {
    background-color: RGB(219, 208, 204);
    --color: #fff;    
} 
#tabla1 #t02 tr.selectedamarillo {
    background-color: RGB(242, 231, 0);
    --color: #fff;    
} 
#tabla1 #t02 tr.selectedmorado2 {
    background-color:  RGB(216, 163, 248); 
    --color: #fff;    
} 
#tabla1 #t02 tr.selected {
    background-color: turquoise;
    --color: #fff;    
} 

#tabla1 #t01 th{
  position: sticky;
  top:0;
  color: white;
  background-color: #1cc88a; 
    border: 1px solid black ;
    white-space: nowrap;

}
#tabla1 td{
  border: 1px solid black;

}
#tabla1 #t02{
  width:100%;
  color:black;

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
    background: rgba(0,0,0,0.7);
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
  grid-column-end:5;
  border:2px solid ;
}
#procesos{
  grid-column-start:1;
  grid-column-end:6;
  --border:2px solid ;
}
 
 
 </style>
<!-- <div id = "resultado" ></div>
 -->
 <div id ="filtro1"  >
 
       <div style="display:flex;justify-content:space-between;">
          <select id="Cbo_opcion" style="width:42%;" >
            <option value="0">Seleccione</option>
            <option value="1">RAC y fecha</option>  
            <option value="2">Ruteo y fecha</option>      
            <option value="3">Sub-zona y fecha</option>
            <option value="4">Paciente</option>
            <option value="5">Doctor</option>
            <option value="6">Aseguradora</option>
            <option value="7">Estado SM</option>
            <option value="8">Estado Tablet</option>
            <option value="9">Programacion</option>
            <option value="10">SIA</option>
            <option value="11">Provincia</option>
            <option value="12">Distrito</option>
            <option value="13">Zona</option>
            <option value="14">Atencion</option>
            <option value="15">Doctor y Fecha ate</option>
            <option value="16">Fecha ate</option>
            <option value="17">Clasificacion</option>
            <option value="18">Usuario creador</option>

          </select>  
          <select style="display:none;width:10%;" id="Cb_zona"> 
            <option value="0">Todos</option>
            <option value="1">1</option>
            <option value="2">2,3</option>
          </select>
          <select style="display:none;width:30%;" id="Cb_estado"> 
            <option value="0">0 - R0</option>
            <option value="1">A - RA</option>
            <option value="2">1</option>
            <option value="3">2 - R2</option>
            <option value="4">3 - R3</option>
            <option value="5">4 - R4</option>
            <option value="6">5 - R5</option>
            <option value="7">6 - R6</option>
            <option value="8">7 - R7</option>
          </select>
        
          <input style="display:none;width:14vw;text-transform: uppercase;" type="text" id="Txt_busqueda">
           <?=form_dropdown('DCbo_estado_tablet',utf8_converter(get_combo_query( "select * from m_estado where cod_estado between 2 and 9 order by cod_estado ASC",'cod_estado','descripcion' ,array("Seleccione"))),"1",array( 'style'=>"width:20%;display:none",'id'=>"DCbo_estado_tablet"))?>

          <select style="display:none;width:40%;" id="Cb_clasificacion" onchange="Cb_clasificacion_Click(this.value);"> 
            <option value="0">AGUDO</option>
            <option value="1">CRONICO</option>
            <option value="2">MAXISALUD</option>
            <option value="3">ESPECIALISTA</option>
            <option value="4">AUTO COVID</option>
            <option value="5">DELIVERY PACIFICO</option>
            <option value="6">MEDICINA COMPLEJA</option>
            <option value="7">CONTROL AUSENTISMO</option>
            <option value="8">NUTRICION-CSS</option>
            <option value="9">ASEGURABILIDAD</option>
            <option value="10">AUTO AMBULANCIA COVID</option>
            <option value="11">NUTRICION</option>


           </select>
           <select style="display:none;width:30%;" id="cbo_subclasificacion"> 
           
           <option value="0">---Seleccione---</option>
            <option value="1">SUNAT</option>
            <option value="2">VIP</option>
            <option value="3">TODOS</option> 
           </select>
           <select style="display:none;width:20%;" id="Cb_programacion"> 
            <option value="0">Inm</option>
            <option value="1">Prg</option>
            <option value="2">Rpg</option>
              
           </select>
           <select style="display:none;width:20%;" id="Cbo_RAC"> 
            <option value="0">Todos</option>
            <option value="1">1</option>
            <option value="2">2, 3, 6</option>
            <option value="3">4, 5</option>
            <option value="4">7, 8</option>
            <option value="5">10, 11</option>
            <option value="6">9, 12</option>
           </select>
           <select style="display:none;width:20%;" id="Cbo_provincia"> 
            <option value="0">Todos</option>
            <option value="1">AREQUIPA</option>
            <option value="2">CAJAMARCA</option>
            <option value="3">CUSCO</option>
            <option value="4">ICA</option>
            <option value="5">PIURA</option>
            <option value="6">TALARA</option>
            <option value="7">TRUJILLO</option>

           </select>
 

           </select>
           <select style="display:none;width:20%;" id="Cbo_sub_zona"> 
            <option value="0">Todos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option> 

           </select>
          <select style="display:none;width:20%;" id="Cbo_ruteo"> 
            <option value="0">Todos</option>
            <option value="1">1</option>
            <option value="2">2, 3, 4</option>
           </select>
           
       
           <?=form_dropdown('Dcbo_especialista',utf8_converter(get_combo_query( "(select distinct c.cod_esp, c.nom_esp from m_doctores a inner join m_espcxdoctor b on a.cod_doc = b.cod_doc 
                                                                                inner join m_especialidades c on b.cod_esp = c.cod_esp where a.activi = true and c.cod_esp not in ('010', '006', '005') 
                                                                                union select 'XXX', 'TODOS' from m_especialidades ) ",'cod_esp','nom_esp' ,array("Seleccione"))),"0",array( 'style'=>"width:40%;display:none",'id'=>"Dcbo_especialista"))?>

          
     </div>
     
      
</div>

<div id="filtro2"  >
  
 <label id="Label_fecha" style="white-space:word-wrap;">
 Fecha
</label>
<input  type="date" id="fec_inicial" name="fec_inicial" style="width:140px" value="<?php  echo date("Y-m-d")?>">
<input type="checkbox"id="Chk_internista"  checked name="Chk_internista">
<label id="lbl_int_gen" for="Chk_internista" >INT Y GEN</label>&nbsp;&nbsp;
<input type="checkbox"id="Chk_pediatria" checked   name="Chk_pediatria">
<label id="lbl_ped" for="Chk_pediatria" >PED</label>&nbsp;&nbsp;
<input type="checkbox"id="Chk_otras" checked   name="Chk_otras">
<label id="lbl_otras" for="Chk_otras" >OTRAS</label>&nbsp;&nbsp;
  <input type="checkbox"id="Chk_finalizadas"    name="Chk_finalizadas">
<label id="lbl_finalizadas" for="Chk_finalizadas" >Finalizadas</label>&nbsp;&nbsp;
<select style="display:inline-block;visibility:hidden;" id="Cmb_finalizadas"> 
            <option value="8">8</option>
            <option value="C">C</option>
            <option value="VNR">VNR</option>
            <option value="PNE">PNE</option>
            <option value="PI">PI</option>
            <option value="PNC">PNC</option>
            <option value="PRP">PRP</option>
         
</select>
<br>

 
 </div>
<!--<div><label id="resultado"></label></div>-->
 
<button class="btn btn btn-primary btn-sm"  id="CmdFiltrar" name="CmdFiltrar" onclick="CmdFiltrar_Click();" > <i class="fa fa-search" aria-hidden="true"></i> Busqueda </button>
<button class="btn btn btn-primary btn-sm" style = "display:none"  id="Cmd_exportar" name="Cmd_exportar" onclick="exportar(this.dataset.cond);"> <i class="fas fa-file-medical" aria-hidden="true"></i> Exportar</button>
 
<label  id = "Frame1" style="margin-bottom:0px;grid-column:1/3;padding:0;color:blue">Consultas Medicas pendientes: </label>
<div  id = "Frame1" style="grid-column:3/6;padding:0;color:blue;margin:0px;">
<div title="Atencion primera o proxima que realizara el médico (Solo E=3)" style="display:inline-block;background-color: RGB(150, 250, 200);width:5vw;height:3vh;border: 1px solid black;"></div>
<div title="Hora actual sobrepasa en mas de 5 minutos a tiempo estimado (solo E=6)" style="display:inline-block;background-color: RGB(255, 120, 120);width:5vw;height:3vh;border: 1px solid black;"></div>
<div  title="Medico se encuentra en casa de paciente mas de 30 minutos (solo E=7)" style="display:inline-block;background-color: RGB(255, 174, 102);width:5vw;height:3vh;border: 1px solid black;"></div>
<div  title="Att. vencida de confirmación (Validacion: 48 horas antes, E=2)" style="display:inline-block;background-color: RGB(194, 205, 228);width:5vw;height:3vh;border: 1px solid black;"></div>
<div  title="CRONICOS: Att. vencida de realizar (Validacion: 24 horas despues, E=0...->6)" style="display:inline-block;background-color: RGB(219, 208, 204);width:5vw;height:3vh;border: 1px solid black;"></div>
<div  title="CRONICOS: Att. Validar medicación de atención" style="display:inline-block;background-color: RGB(242, 231, 0);width:5vw;height:3vh;border: 1px solid black;"></div>


</div>
<div class="prueba">

<table  id="tabla1" >
      <thead   id = "t01">
      <tr >
              <!-- <th scope="col"></th> -->
              <th scope="col">E</th>
              <th scope="col">PROG</th>
              <th scope="col">COD.ATE</th>
              <th scope="col">CLASIF</th>
              <th scope="col">E_TABLET</th>
              <th scope="col">COD.AUTORIZACION</th>
              <th scope="col">FEC.LLA</th>
              <th scope="col">HR.LLA</th>
              <th scope="col">TIEMPO</th>
              <th scope="col">FEC.ATE</th>
              <th scope="col">HRXDEFECTO</th>
              <th scope="col">HR.ESTIMADA</th>
              <th scope="col">HR.LLEGADA</th>
              <th scope="col">PROVINCIA</th>
              <th scope="col">DISTRITO</th>
              <th scope="col">PACIENTE</th>
              <th scope="col">F.PAGO</th>
              <th scope="col">VIP</th>
              <th scope="col">PERIODO</th>
              <th scope="col">CONT</th>
              <th scope="col">PERFIL</th>
              <th scope="col">ESPEC</th>
              <th scope="col">DOCTOR</th>
              <th scope="col">GRUPO</th>
              <th scope="col">EMPRESA</th>
              <th scope="col">USUARIO</th>
              <th style="display:none" scope="col">COD_DOC</th> 


      </tr>
      </thead>
      <tbody  id="t02">

      </tbody>
      <tfoot>
      <!-- Paginate -->
       
      </tfoot>
</table>     
</div>
 
<div id="procesos">

<input type="button"  class="btn btn btn-success btn-sm"  id="cmdSeguimiento" name="cmdSeguimiento"  onclick ="cmdSeguimiento_Click();" value="Seguimiento" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="Command1" name="Command1" onclick ="nueva_atencion();" value="Nueva Atencion"> 
 <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_MostrarDatos" name="Cmd_MostrarDatos"  onclick ="Cmd_MostrarDatos_Click();" value="Mostrar datos" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_datos_paciente" name="Cmd_datos_paciente" onclick ="Cmd_datos_paciente_Click();" value="Datos paciente" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_reprogramar" name="Cmd_reprogramar" value="Editar" onclick="Cmd_reprogramar_Click();" disabled> 
 <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_reingresar_ate_tablet" name="Cmd_reingresar_ate_tablet" value="Reingresar Ate en tablet" onclick ="modalauditoria(this);" > 
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_auditoria" name="btn_auditoria" value="Reingresar Ate en tablet" onclick ="modalauditoria(this);" disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="CmdCodAut" name="CmdCodAut" value="Codigos"   disabled> 
<input type="button"  class="btn btn btn-success btn-sm"  id="cmd_auditoria" name="cmd_auditoria" value="Auditoria ate" onclick="Cmd_auditoria_Click();"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_soporte" name="Cmd_soporte" onclick="Cmd_soporte_Click();" value="Soporte"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_SIA_pacifico" name="Cmd_SIA_pacifico" value="SIA Pacífico"> 
 

</div>

</body>
<script type="text/javascript">
  document.getElementById('Chk_finalizadas').checked = false;
  
var       XPermisoReingreso  = 0,Cmd_soporte_Tag;
              fetch('/modulo/permite_ingreso', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                    body: JSON.stringify({
                      codigo: 98
                      })

                        }).then(response => response.json())
                          .then(function (data1) {
                            if(data1){
                            document.getElementById("Cmd_reingresar_ate_tablet").style.display = 'block';   
                            XPermisoReingreso = 1;
                            }
                          }).catch(error => {
                            console.log(error);
                          });
         
              fetch('/modulo/permite_ingreso', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
               codigo: 99
              })

              }).then(response => response.json())
              .then(function (data1) {
                if(data1){
                document.getElementById("Cmd_reingresar_ate_tablet").style.display = 'block';   
                XPermisoReingreso = XPermisoReingreso + 10;
                }
              }).catch(error => {
                console.log(error);
              });
/*               If Usuario = "SISTEMAS" Then
                  Cmd_Regularizar.Visible = True
              End If */

            var  lb_asignador = false;
            var  lb_supervisor = false;
            var  ls_CodDrAnt = "";
            (async () => {
           await  fetch('/modulo/permite_ingreso', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                    body: JSON.stringify({
                      codigo: 15
                      })

                        }).then(response => response.json())
                          .then(function (data1) {
                            if(data1){
                            document.getElementById("Cmd_reprogramar").style.display = 'inline-block'; 
                            document.getElementById("Command1").disabled = true;  
                            document.getElementById("Cmd_SIA_pacifico").disabled = true;  
                            }
                             lb_asignador = true;

                          }).catch(error => {
                            console.log(error);
                          });

            await fetch('/modulo/permite_ingreso', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                    body: JSON.stringify({
                      codigo: 16
                      })

                        }).then(response => response.json())
                          .then(function (data1) {
                            if(data1){
                            document.getElementById("Cmd_reprogramar").style.display = 'inline-block'; 
                            document.getElementById("Command1").disabled = false;  
                            document.getElementById("Cmd_SIA_pacifico").disabled = true;  
                            }
                            lb_supervisor = true;

                          }).catch(error => {
                            console.log(error);
                          });
               })();

                          fetch('/modulo/permite_ingreso', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                    body: JSON.stringify({
                      codigo: 38
                      })

                        }).then(response => response.json())
                          .then(function (data1) {
                            if(data1){
                             document.getElementById("Cmd_soporte").disabled = false;
                             document.getElementById("Cmd_soporte").dataset.Tag = "ACTIVO";
                            }else{
                              document.getElementById("Cmd_soporte").disabled = true;  
                              Cmd_soporte_Tag = "INACTIVO"

                            }
                          }).catch(error => {
                            console.log(error);
                          });

                          fetch('/modulo/permite_ingreso', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                    body: JSON.stringify({
                      codigo: 23
                      })

                        }).then(response => response.json())
                          .then(function (data1) {
                            if(data1){
                             document.getElementById("Cmd_soporte").disabled = false;  
                            //Accesos MAXISALUD
                            document.getElementById("Chk_internista").checked = false; 
                            document.getElementById("Chk_pediatria").checked = false;   
                            //Chk_general.value = 0;

                             }
                          }).catch(error => {
                            console.log(error);
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
 


