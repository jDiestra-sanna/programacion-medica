 
 var L_CodAte;
 (function(){ 
 })();
 
  var Frm_Creacion_nutricion;

function cmdaceptar_Click(L_CodAte){
 var Opt_Nutricion = document.getElementById('Opt_Nutricion');
 /*  If opt_caso1.Value = True Then
  Unload Frm_CM_busqueda_pac
  Frm_CM_busqueda_pac.Show
  
ElseIf opt_caso2.Value = True Then
  Unload Frm_CM_busq_pac_BD
  Frm_CM_busq_pac_BD.Show
  
ElseIf Opt_asegurabilidad.Value = True Then
  Unload Frm_asegurabilidad_pac_registrado
  Frm_asegurabilidad_pac_registrado.Show
   
ElseIf Opt_Melchorita.Value = True Then
  Unload Frm_CM_busqueda_pac
  Frm_CM_busqueda_pac.Tag = "MELCHORITA"
  Frm_CM_busqueda_pac.Show

ElseIf Opt_Venta_medicina.Value = True Then
  Unload Frm_Creacion_tratamiento_complejo
  Frm_Creacion_tratamiento_complejo.Show

ElseIf Opt_opsired.Value = True Then
  Unload Frm_CM_busqueda_pac
  Frm_CM_busqueda_pac.Tag = "PSICOLOGIA"
  Frm_CM_busqueda_pac.Show


End If */

if (Opt_Nutricion.checked == true ) {
/*   Unload Frm_CM_busqueda_pac
  Frm_CM_busqueda_pac.Show */
 /* 
    if(Frm_Creacion_nutricion!==undefined){
      Frm_Creacion_nutricion.close();
  
    } */
   
    if( Frm_Creacion_nutricion!==undefined) {
       Frm_Creacion_nutricion.document.body.innerHTML="";
  
    }
     Frm_Creacion_nutricion = window.open("", "Frm_Creacion_nutricion", "toolbar=no,menubar=no,top=100,left=80,width=40%,height=50%");
   
     Frm_Creacion_nutricion.document.body.innerHTML="";
     Frm_Creacion_nutricion.document.write(` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" /> 
 

    <head>
    
    <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
    <style>
    body {font-family: Arial;}
    
    /* Style the tab */
    .tab {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
    }
    .tabsiteds {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
    }
    /* Style the buttons inside the tab */
    .tab button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
      font-size: 17px;
    }
    .tabsiteds button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
      font-size: 17px;
      width:50%;
    }
    /* Change background color of buttons on hover */
    .tab button:hover {
      background-color: #ddd;
    }
    .tabsiteds button:hover {
      background-color: #ddd;
    }
    /* Create an active/current tablink class */
    .tab button.active {
      background-color: #ccc;
    }
    .tabsiteds button.active {
      background-color: #ccc;
    }
    /* Style the tab content */
    .tabcontent {
      display: none;
      padding: 6px 12px;
      border: 1px solid #ccc;
      border-top: none;
    }


    .tab1 {
      display: grid; 
      font-size:1.7vh;

      grid-template-columns: 1fr 1fr 1fr 1fr; 
      grid-template-rows: auto auto auto auto; 
      gap: 0px 0px; 
      grid-template-areas: 
        "labels inputs . ."
        "labels inputs busqueda busqueda"
        "tabla tabla tabla tabla"
        "botones botones botones botones"; 
    }
    .labels { grid-area: labels; }
    .inputs { grid-area: inputs; }
    .tabla { grid-area: tabla; }
    .botones { grid-area: botones; justify-self: end; }
    .busqueda { grid-area: busqueda; }
    .tab2 {
      font-size:1.7vh;

      padding-top: 1vh;
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      grid-template-rows: 1fr 1fr; 
      gap: 1.5vh 1vw; 
      grid-template-areas: 
        "Paciente Direccion"
        "Aseguradora Direccion"; 
    }
    .Direccion {
      display: grid; 
      border: 1px solid black;
      grid-template-columns: 1fr 1fr 1fr; 
      grid-template-rows: 0.1fr 1fr; 
      gap: 0px 0px; 
      grid-template-areas: 
        ". . ."
        ". . .";

      grid-area: Direccion; 
    }
    .Paciente {
      display: grid;
      border: 1px solid black;
      grid-template-columns: 1fr 1fr 1fr; 
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
      gap: 0px 0px; 
      grid-template-areas: 
        ". . ."
        ". . ."
        ". . ."
        ". . ."
        ". . ."
        ". . ."
        ". . ."
        ". . ."
        ". . ."; 
      grid-area: Paciente; 
    }
    .Aseguradora {       
      border: 1px solid black;
      display: grid; 
      grid-template-columns: 1fr 1fr 1fr 1fr ; 
      gap: 0px 0px; 
      grid-area: Aseguradora; 
    }
    .tab3 {
      font-size:1.7vh;
      padding-top: 1vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 0.5fr 0.5fr 2.5fr 0.1fr;
      gap: 1.5vh 1vw; 
      grid-auto-flow: row;
      grid-template-areas:
        "Datosatencion Viasolicitud"
        "Datosatencion Fram_Correo_electronico"
        "Datosatencion Pago"

        "medio libre"
        ". .";
    }
    
    .Datosatencion { 
      border: 1px solid black;
      display: grid; 
      grid-template-columns: 1.8fr 0.6fr 1.6fr 0.6fr; 
      grid-auto-rows: min-content;  
      gap: 0px 0px; 
      grid-area: Datosatencion; 

     }
     
     
      .Viasolicitud {
        border: 1px solid black;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-auto-rows: min-content;  
        gap: 0px 0px; 
        grid-area: Viasolicitud; 
      }
      .Fram_Correo_electronico {
        border: 1px solid black;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-auto-rows: min-content;  
        gap: 0px 0px; 
        grid-area: Fram_Correo_electronico; 
      }
      .Pago {
        border: 1px solid black;
        display: grid; 
        grid-template-columns: 1fr 0.5fr 1fr 1fr 0.5fr 1fr;  
        grid-auto-rows: min-content;  

        gap: 0px 0px; 
        grid-area: Pago; 
      }
    .medio {
      border: 1px solid black;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0px 0px;
      grid-auto-flow: row;
      grid-area: medio;
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
       --max-width: 600px;
       padding: 2px;
      position: absolute;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      font-size:1.7vh;
    }
    .Frame_tarjeta{
       display: grid; 
       grid-template-columns: 1fr 0.5fr 1fr 1fr 0.5fr 1fr;  
       grid-auto-rows: min-content;  
      grid-column: 1/7;
      gap: 0px 0px;  

    }
    .Frame_efectivo{
       display: grid; 
       grid-template-columns: 1fr 0.5fr 1fr 1fr 0.5fr 1fr;  
       grid-auto-rows: min-content;  
      grid-column: 1/7;
      gap: 0px 0px;  

    }
    .Frame_credito{
       display: grid; 
       grid-template-columns: 1fr 0.5fr 1fr 1fr 0.5fr 1fr;  
       grid-auto-rows: min-content;  
      grid-column: 1/7;
      gap: 0px 0px;  

    }
    .Frame_transferencia{
       display: grid; 
       grid-template-columns: 1fr 0.5fr 1fr 1fr 0.5fr 1fr;  
       grid-auto-rows: min-content;  
      grid-column: 1/7;
      gap: 0px 0px;  

    }
    </style>
    </head>
    <body>
    
    
     
    <div class="tab">
      <button class="tablinks" onclick="openCity(event, 'SSTab1')" id="defaultOpen">Busqueda de paciente</button>
      <button class="tablinks" onclick="openCity(event, 'SSTab2')" id="tab1">Datos del paciente a atender</button>
      <button class="tablinks" onclick="openCity(event, 'SSTab3')" id="tab2">Datos de la atención</button>
    </div>
    
    <div id="SSTab1" class="tabcontent">
        <div class="tab1">
                    <div class="labels">
                    <label id= "Label18">Ap. Paterno :</label><br>
                    <label id= "Label19">Ap. Materno :</label><br>
                    <label id= "Label20">Ap. Nombres :</label><br>
                    <label id= "Label23">Documento Identidad :</label>

                    </div>
                    <div class="inputs">
                    <input style="text-transform:uppercase;" type="text" name = "Txt_ApPatBuscar" id="Txt_ApPatBuscar" /><br>
                    <input style="text-transform:uppercase;" type="text" name = "Txt_ApMatBuscar" id="Txt_ApMatBuscar" /><br>
                    <input style="text-transform:uppercase;" type="text" name = "Txt_NomPacBuscar" id="Txt_NomPacBuscar" /><br>
                    <input style="text-transform:uppercase;" type="text" name = "Txt_find_DNI" id="Txt_find_DNI" /> 
                    </div>
                    <div class="busqueda">
                    <input type="button"  class="btn btn btn-success btn-sm "  onclick="Cmd_Buscar_Click();" id="Cmd_buscar" name="Cmd_buscar" value="Buscar"> 

                    </div>

                    <div class="tabla">
                              <table  border style="width:100%" id="DG_paciente" >
                                  <thead   id = "DG_pacientehead">
                                  <tr >
                                           <th scope="col">PACIENTE</th>
                                          <th scope="col">TIPO DOC ID</th>
                                          <th scope="col">NRO. DOC ID</th>
                                          <th scope="col">FECHA NAC.</th>
                                          <th scope="col">EMAIL</th>
                                          <th scope="col">FICHA?</th>
  
                                  </tr>
                                  </thead>
                                  <tbody  id="DG_pacientebody">

                                  </tbody>
                                  <tfoot>
                                  </tfoot>
                            </table> 
                    </div>
                    <div class="botones">
                    <input type="button"  class="btn btn btn-primary btn-sm"  id="Cbo_nuevo_pac" name="Cbo_nuevo_pac" onClick="Cbo_nuevo_pac_Click();" value="Nuevo Paciente">
                     
                    <input type="button"  class="btn btn btn-success btn-sm "  id="Cmd_seleccionar" name="Cmd_seleccionar" onClick="Cmd_Seleccionar_Click();" value="Seleccionar"> 
               
                    </div>

        </div>
     
    </div>
    
    <div id="SSTab2" class="tabcontent">
    
          <div class="tab2">
          
          <div class="Paciente">
                   <h6 style="width:15vw;grid-column:1/4;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Datos de paciente</h6>
                  <label id= "Label10">Ap. Paterno :</label>
                  <input style = "grid-column:2/4" type="text" disabled name = "Txt_ApPat" id="Txt_ApPat" />
                  <label id= "Label8">Ap. Materno :</label>
                  <input style = "grid-column:2/4" type="text" disabled name = "Txt_ApMat" id="Txt_ApMat" />
                  <label id= "Label1">Nom Paciente:</label>
                  <input style = "grid-column:2/4" type="text" disabled name = "Txt_Nombres" id="Txt_Nombres" />
                  <label id= "Label2">Fecha nac:</label>
                  <input disabled type="date" name = "DTFecNac" disabled id="DTFecNac" onchange="cambiaredad(this.value);" /> <label id= "Lbl_edad"></label>
                  <label id= "Label11">Tipo Doc. Ident:</label>
                  <select disabled   name = "DC_tipo_doc_id" disabled id="DC_tipo_doc_id" ></select> <div></div>    
                  <label id= "Label4">Numero Doc Ident:</label>
                  <input type="text" name = "Txt_num_doc_id" disabled id="Txt_num_doc_id" /> <div></div>    
                  <label id= "Label22">Sexo:</label>
                  <select  name = "Cbo_sexo" disabled id="Cbo_sexo" > <option value = ""></option><option value = "FEMENINO">FEMENINO</option><option value = "MASCULINO">MASCULINO</option>
                  </select>  <div></div>   
                  <label id= "Label15">VIP:</label>
                  <select  name = "Cbo_VIP" disabled id="Cbo_VIP" > <option value = ""></option><option value = "VIP">VIP</option><option value = "NO">NO</option>
                  </select> <div></div>  
                  <label id= "Label26">Contacto pac:</label>
                  <input    type="text" name = "Txt_contacto_pac" id="Txt_contacto_pac" />  <div></div>  
                  <label id= "Label3">Correo electrónico:</label>
                  <select  name = "Cbo_tiene_correo" id="Cbo_tiene_correo" onchange="Cbo_tiene_correo_Click(this.selectedIndex)" >
                  <option value ="CORREO DE PACIENTE">CORREO DE PACIENTE</option>
                  <option value ="SIN CORREO ELECTRONICO">SIN CORREO ELECTRONICO</option>
                  </select>
                  <input style = "color:red;"  type="text" name = "Txt_email" id="Txt_email" /> 
             </div>
            <div class="Direccion">
                    <h6 style="width:15vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Direccion</h6>

                      <div style="grid-column:1/4">
                      <table  border style="width:100%; font-size:1.7vh;" id="DG_direccion" >
                          <thead   id = "DG_direccionhead">
                          <tr >
                                  <th scope="col">DIRECCION</th>
                                  <th scope="col">NRO_DIR_LOTE</th>
                                  <th scope="col">DIR_DPTO_INTERIOR</th>
                                  <th scope="col">DIR_URBANIZACION</th>
    

                          </tr>
                          </thead>
                          <tbody  id="DG_direccionbody">

                          </tbody>
                          <tfoot>
                          </tfoot>
                    </table> 
                    </div>
                    <div><input type="button"  class="btn btn btn-primary btn-sm"  id="Cmd_Nueva_direccion" name="Cmd_Nueva_direccion" onClick="Cmd_Nueva_direccion_Click();" value="Nueva dirección">
                    </div><input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_anular_reg_direccion" name="Cmd_anular_reg_direccion" onClick="Cmd_anular_reg_direccion_Click();" value="Anular registro nueva dirección"><div><input type="checkbox" id="chk_direccion_validada" name="chk_direccion_validada"><label for="chk_direccion_validada">Direccion validada</label></div>
                    <div style = "grid-column:2/3"></div><div></div>
                    <label id= "Label7">Departamento :</label>
                    <select disabled name = "DCbo_departamento" id="DCbo_departamento" onblur="DCbo_departamento_LostFocus()" ></select><div></div> 
                    <label id= "Label16">Provincia :</label>
                    <select disabled name = "DCbo_provincia" id="DCbo_provincia" onblur="DCbo_provincia_LostFocus()" ></select><div></div> 
                    <label id= "Label17">Distrito :</label>
                    <select disabled  name = "DCbo_distrito" id="DCbo_distrito"  ></select><div></div> 
                    <label id= "Label9">Dirección :</label>
                    <input  style = "grid-column:2/4" type="text" name = "Txt_direccion" id="Txt_direccion" />    
                    <label id= "Label12">Referencia :</label>
                    <input  style = "grid-column:2/4" type="text" name = "Txt_referencia" id="Txt_referencia" />    
                    <label id= "Label24">Tlf. casa :</label>
                    <input type="text" name = "Txt_casa" id="Txt_casa" /> <div></div>    
                    <label id= "Label25">Tlf. Celular :</label>
                    <input type="text" name = "Txt_celular" id="Txt_celular" />  <div></div>   
                    <label id= "Label37">Tlf. Oficina :</label>
                    <input style="width:50%" type="text" name = "Txt_oficina" id="Txt_oficina" />  
                    <input style="width:50%" type="text" name = "Txt_oficina_anx" id="Txt_oficina_anx" />    
 


             
             
             </div>
            <div class="Aseguradora">
                <h6 style="width:15vw;grid-column:1/5;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Aseguradora</h6>

                <label id= "Label6">Aseguradora: </label>
                <select  style="grid-column:2/4"  name = "Dcbo_aseguradora" id="Dcbo_aseguradora" onchange="Dcbo_aseguradora_Change(this.value)" disabled ></select><input type="button" disabled class="btn btn btn-warning btn-sm"  id="Cmd_datos_siteds" name="Cmd_datos_siteds" onClick="Cmd_datos_siteds_Click();" value="SITEDS">
                <label id= "Labe31">Clasificación : </label>
                <select style="grid-column:2/4"  name = "DCbo_clasificacion" id="DCbo_clasificacion"  ></select> <div></div>
                <label id= "Label4">Empresa: </label>
                <input style="grid-column:2/4" type="text" name = "Txt_contratante" id="Txt_contratante" disabled/> <div></div>
                <label id= "Label44">Codigo de Autoriz: </label>
                <input style="grid-column:2/4" type="text" name = "TxtCodAut" id="TxtCodAut" disabled/> <div></div> 
                <label id= "Lbl_Aseg_7">Cod. asegurado: </label>
                <input style="grid-column:2/4" type="text" name = "Txt_cod_aseg" id="Txt_cod_aseg" disabled/> <div></div> 
                <label id= "Label33">Tipo de afiliación: </label>
                <input style="grid-column:2/4" type="text" name = "Txt_tipo_afiliacion" id="Txt_tipo_afiliacion" disabled/> <div></div> 
                <label id= "Lbl_prod">Producto: </label>
                <input style="grid-column:2/4" type="text" name = "Txt_prod" id="Txt_prod" disabled/> <div></div> 
                <label id= "Lbl_poliza">Poliza:</label>
                <input  type="text" disabled name = "Txt_Poliza" id="Txt_Poliza" /> <label id= "Lbl_Aseg_5">Certif.</label><input disabled type="text" name = "Txt_pol_cert" id="Txt_pol_cert" /> 
                <label id= "Label19">Contacto aseg :</label>
                <input   type="text"   name = "Txt_contacto_aseg" id="Txt_contacto_aseg" />
                <label id= "Lbl_num_sol">N° solicitud :</label>
                <input   type="text"   name = "Txt_num_sol" id="Txt_num_sol" /> 
                
            </div>
          </div>
    </div>
    
    <div id="SSTab3" class="tabcontent">
            <div >
            <table  border style="width:100%" id="MSHGrid_Cobertura" >
                <thead   id = "MSHGrid_Coberturahead">
                <tr >
                        <th scope="col">PACIENTE</th>
                        <th scope="col">TIPO DOC ID</th>
                        <th scope="col">NRO. DOC ID</th>
                        <th scope="col">FECHA NAC.</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">FICHA?</th>

                </tr>
                </thead>
                <tbody  id="MSHGrid_Coberturabody">

                </tbody>
                <tfoot>
                </tfoot>
          </table> 
          </div>
        <div class="tab3">
        <div class="Datosatencion">
        <h6 style="width:25vw;grid-column:1/5;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Datos de la atención</h6>
        <label id= "Label21">Observacion :</label>
        <textarea style = "grid-column:2/5" id="Txt_obs_cm" name="Txt_obs_cm" rows="3" ></textarea>
        <label id= "Label15">Sintomas :</label>
        <textarea style = "grid-column:2/5" id="Txt_sintomas" name="Txt_sintomas" rows="3" ></textarea>
        <label id= "Label43">Medico atiende:</label>
        <select style = "grid-column:2/5" type="text"   name = "Cbo_modo_atencion_medico" id="Cbo_modo_atencion_medico" >
        <option value ="VISITA DOMICILIARIA">VISITA DOMICILIARIA</option>
        <option value ="TELECONSULTA">TELECONSULTA</option>
        <option value ="LLAMADA DE SEGUIMIENTO">LLAMADA DE SEGUIMIENTO</option>
        </select>  
        <label id= "Label13">Especialidad :</label>
        <select style = "grid-column:2/5" disabled type="text" name = "DCbo_Especialidad" id="DCbo_Especialidad" ></select>
        <label id= "Label14">Programacion :</label>
        <select style = "grid-column:2/5" type="text" name = "Cbo_tipo_prog" id="Cbo_tipo_prog" onchange="Cbo_tipo_prog_Click(this.selectedIndex);" >
        <option value ="INMEDIATA">INMEDIATA</option>
        <option value ="PROGRAMADA (SOLICITO MEDICO)">PROGRAMADA (SOLICITO MEDICO)</option>
        <option value ="PROGRAMADA (NO SOLICITO MEDICO)">PROGRAMADA (NO SOLICITO MEDICO)</option>
        </select>  
        <label style = "visibility:hidden"  id= "Lbl_med">Médico :</label>
        <select style = "grid-column:2/5;visibility:hidden"  type="text" name = "Txt_Dr" id="Txt_Dr" ></select>
        
        <label  style = "visibility:hidden" id= "Lbl_fecha">Fecha de servicio :</label>
        <input   style = "visibility:hidden" type="date" name = "DT_fecha" id="DT_fecha" /> <label  style = "visibility:hidden" id= "Lbl_hora">Hora :</label> <input  style = "visibility:hidden"  type="time" name = "CmbHora" id="CmbHora" />
       
        <div></div><div></div>
        <div></div><div></div> 
        </div>
         <div class="Viasolicitud">
         <h6 style="width:20vw;grid-column:1/5;background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Via de solicitud de atencion </h6> 
         <label id= "Label28">Descripción :</label>
         <select   style="grid-column:2/5; " type="text" name = "Dcbo_via_solicitud" id="Dcbo_via_solicitud" /> 
         </select> 
         <label id= "Label25" style="display:none">Tipo envio :</label>
          </select>  
        </div>
        <div id = "Fram_Correo_electronico" class="Fram_Correo_electronico" style="visibility:hidden">
        <h6 style="width:30vw; grid-column:1/5;background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Medio de envio de documento electronico </h6> 
        <label id= "Label25">Tipo envio:</label>
        <select type="text"  style="grid-column:2/5;" name = "DC_medio_envio_ce" id="DC_medio_envio_ce" /> 
        </select>  
       </div> 
        <div class="Pago">
        <h6 style="width:10vw;grid-column:1/7;background:white; height:min-content;margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Datos del pago </h6>
        <label id= "Label36">Deducible :</label>
        <select   type="text" name = "Cbo_Moneda" id="Cbo_Moneda" onchange ="Cbo_Moneda_Click();" />
            <option value = "S/.">S/.</option>
            <option value = "$">$</option>
        </select>        <input style="width:6vw" type="text" name = "Txt_ded" id="Txt_ded"  onkeyup="Txt_ded_Change(this.value);"/>   <div><label style="visibility:hidden" id='Lbl1_ded_usd'>S/.</label>  <label style="visibility:hidden" id='Lbl2_ded_usd'></label></div>
        <label id= "Label18">Coas(%):</label>
        <input  type="text" style="width:5vw" name = "txt_coa" id="txt_coa" onkeyup="txt_coa_Change(this.value);" />
        <label id="Lbl_doc_pago" style="visibility:hidden">Doc. de pago:</label><select style="visibility:hidden;width:70%; grid-column: 2 / span 2;" id="Cbo_doc_pago" name="Cbo_doc_pago" > 
        <option value=""></option>
        <option value="BOLETA">BOLETA</option>
        <option value="FACTURA">FACTURA</option>
 
         </select> <div></div><div><label>control</label></div><div>         <input type="number" name="contador_periodo" id="contador_periodo" >      </div>
        <label id="Label16">Forma Pago</label><select style="width:70%; grid-column: 2 / span 2;" id="Cbo_forma_pago" name="Cbo_forma_pago" onchange = "Cbo_forma_pago_Click();"> 
        <option value=""></option>
        <option value="EFECTIVO">EFECTIVO</option>
        <option value="CREDITO">CREDITO</option>
        <option value="TARJETA">TARJETA</option>
        <option value="MPOS">MPOS</option>
        <option value="TRANSFERENCIA">TRANSFERENCIA</option>
         
         </select>         <select style="display:none;" id="DCbo_cond" name="DCbo_cond"> </select>

         <div  class="Frame_tarjeta" id='Frame_tarjeta' style="display:none;  ">
         <label id = "lbloperador" >Operador</label><select  id="TxtNroTar" name="TxtNroTar"> 
          <option value="VI">VI</option>
          <option value="MC">MC</option>
          <option value="DI">DI</option>
          <option value="AE">AE</option>
         </select><div></div><div></div><div></div><div></div>
         <label id = "lblnumtarjeta"   >Num Tarjeta</label><input  maxlength="10" style="grid-column:2/4"  id="ME_tarjeta" name="ME_tarjeta" ><div></div><div></div><div></div> 
         <label id = "lblfecvenctarjeta" >Fec. Venc. Tarj.</label> <input   maxlength="2" style="width:3vw"  id="Txt_mes_credito" name="Txt_mes_credito" ><div><input style="width:4vw"  maxlength="4"  id="Txt_anio_credito" name="Txt_anio_credito" > <label id = "mm_aaaa"  >mm-aaaa</label></div><div></div><div></div>
         </div>
         <div class="Frame_credito" id = 'Frame_credito' style="display:none;"> 
         <label id = "lblautorizado" >Autorizado por</label><input style=" grid-column:2/6"    id="Txt_autorizado" name="Txt_autorizado" >
         </div>      
        <div class="Frame_efectivo" id='Frame_efectivo' style="display:none;  ">
         <label id = "lbldenominacion" >Denominacion</label><select   id="Cbo_moneda_den" name="Cbo_moneda_den"> 
         <option value="S/.">S/.</option>
         <option value="$">$</option>
        </select><select   id="Cbo_Denominacion" name="Cbo_Denominacion"> 
        <option value="No Determ.">No Determ.</option>
        <option value="Exacto">Exacto</option>
        <option value="S/. 10">S/. 10</option>
        <option value="S/. 20">S/. 20</option>
        <option value="S/. 40">S/. 40</option>
        <option value="S/. 50">S/. 50</option>
        <option value="S/. 100">S/. 100</option>
        </select>
        </div>
        <div  class="Frame_transferencia"  id="Frame_transferencia" style="display:none;  ">
        <table border  id="tabletransferencia">
        <thead id="tabletransferenciathead" style="background-color:#00aae4;color:white;">
        <tr >
        <th>NOMBRE DEL BANCO</th>
        <th>CTA.CTE.SOLES</th>
        <th>CTA.CTE.DOLARES</th>
        </tr>
        </thead>
        <tbody id="tabletransferenciatbody">
        <tr  style = "height:5vh" onclick="filatransferenciaSelected(this);">
        <td>BANCO DE CREDITO</td>
        <td>193-1169353-0-45</td>
        <td>193-1169024-1-32</td>
        </tr>
        <tr  style = "height:5vh" onclick="filatransferenciaSelected(this);">
        <td></td>
        <td></td>
        <td></td>
        </tr>
        <tr  style = "height:5vh" onclick="filatransferenciaSelected(this);">
        <td></td>
        <td></td>
        <td></td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <div class="medio">
         <h6 style="width:30vw; grid-column:1/3;background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Condicion del paciente </h6> 
         <div><input type="checkbox" id="Chk_colesterol" name="Chk_colesterol" ><label for ="Chk_colesterol">Colesterol alterado</label></div>
         <div><input type="checkbox" id="Chk_trigliceridos" name="Chk_trigliceridos" ><label for ="Chk_trigliceridos">Trigliceridos alterados</label></div>
         <div><input type="checkbox" id="Chk_glucosa_alterado" name="Chk_glucosa_alterado" ><label for ="Chk_glucosa_alterado">Glucosa alterado</label></div>
         <div><input type="checkbox" id="Chk_obesidad" name="Chk_obesidad" ><label for ="Chk_obesidad">Obesidad</label></div>
        </div>
        <div style="grid-column:1/3;justify-self: end;">
        <label id ="LbL_error" style="visibility:hidden">* Los campos sombreados de color rojo son obligatorios</label>
          <input type="button"  class="btn btn btn-primary btn-sm"  id="Cmd_guardar" name="Cmd_guardar" onClick="Cmd_guardar_Click();" value="Guardar">
         <input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_salir" name="Cmd_salir" onClick="javascript:window.close('','_parent','');" value="Salir">

        </div>
    </div>
    </div>
    <script src="${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/Frm_Creacion_nutricion.js?${Date.now()}">
      var principal =3;
      </script>   
    
    </body>
     `);
      if ( Frm_Creacion_nutricion.document) {
         Frm_Creacion_nutricion.document.title = "CONSULTA MEDICA - NUTRICION";
      }
       Frm_Creacion_nutricion.addEventListener("resize", function () {
        
    
      });
      Frm_Creacion_nutricion.resizeTo(1400, 850);
      
      //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
      
       Frm_Creacion_nutricion.focus();
      //window.open('','_parent',''); 
      Frm_Creacion_nutricion.appMainWindow = window.appMainWindow;
      window.close();
 

    } 
 

}  
  