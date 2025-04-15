

  export function Frm_CM_confirma_datos_body(codigo){
    
    return ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  <head>
  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
  <style>
  
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

.Frm_CM_confirma_datos {
margin-top: 1vh;
font-size:1.7vh;
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1.8fr 2.0fr auto 0.5fr 0.2fr;
grid-auto-columns: 1fr;
gap: 10px 10px;
grid-auto-flow: row;
grid-template-areas:
  "izquierda Medico"
  "izquierda domicilio"
  ". ."
  "Aseguradora Aseguradora"
  "botones botones";
}

.izquierda {
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 1.2fr 0.8fr;
gap: 9px 0px;
grid-auto-flow: row;
grid-template-areas:
  "Paciente"
  "Pago";
grid-area: izquierda;
}

.Paciente {
border:1px solid black;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
gap: 0px 0px;
grid-auto-flow: row;
grid-template-areas:
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . .";
grid-area: Paciente;
}

.Pago {
border:1px solid black;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
grid-auto-rows: min-content;
gap: 0px 0px;
grid-auto-flow: row;
grid-template-areas:
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . ."
  ". . . . . .";
grid-area: Pago;
}

.Medico {
border:1px solid black;
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
gap: 0px 0px;
grid-auto-flow: row;
grid-template-areas:
  ". ."
  ". ."
  ". ."
  ". ."
  ". ."
  ". ."
  ". .";
grid-area: Medico;
}

.domicilio {
border:1px solid black;
display: grid;
grid-auto-rows:min-content;
grid-template-columns: 1fr 1fr 1fr 1fr ;
grid-auto-rows: min-content;
gap: 0px 0px;
grid-auto-flow: row;
grid-template-areas:
  ". . . ."
  ". . . ."
  ". . . ."
  ". . . ."
  ". . . ."
  ". . . ."
  ". . . ."
  ". . . .";
grid-area: domicilio;
}

.Aseguradora {
border:1px solid black;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr ;
grid-template-rows: 1fr 1fr 1fr;
gap: 0px 0px;
grid-auto-flow: row;
grid-template-areas:
  ". . . . . . . ."
  ". . . . . . . ."
  ". . . . . . . .";
grid-area: Aseguradora;
}

.botones {
border:1px solid black;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr;
gap: 0px 0px;
grid-auto-flow: row;
grid-template-areas:
  ". . . . . . .";
grid-area: botones;
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
  <div class="Frm_CM_confirma_datos">
    <div class="izquierda">
      <div class="Paciente">
      <h6 style="width:15vw;grid-column:1/7; background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">Datos de paciente</h6>
      <label id="Label10">Ap. Paterno :</label><input style="grid-column:2/5"  type="text" id="Txt_ap_pat" name = "Txt_ap_pat"><div></div><div></div>
      <label id="Label8">Ap. Materno :</label><input style="grid-column:2/5"  type="text" id="Txt_ap_mat" name = "Txt_ap_mat"> <div></div><div></div>
      <label id="Label1">Nom Paciente :</label><input style="grid-column:2/5"  type="text" id="Txt_nom_pac" name = "Txt_nom_pac"><input type="button" style="grid-column:5/7;visibility:hidden" class="btn btn btn-warning btn-sm "  id="Cmd_datos_siteds" name="Cmd_datos_siteds"  onclick="Cmd_datos_siteds_click();" value="Datos SITEDS"> 
      <label id="Label1">Edad :</label><input style ="width:5vw" type="text" id="Txt_edad" name = "Txt_edad"><div style="grid-column:3/span 2"><label id="Label12">Fecha Nac :</label><input type="text" style="width:2vw" id="Txtdia" name = "Txtdia"><input type="text" style="width:2vw" id="TxtMes" name = "TxtMes"><input type="text" style="width:3vw" id="TxtAnio" name = "TxtAnio"></div><label id="Label15">edad calculada</label><input  disabled type="text" id="Txt_edad_calculada" name = "Txt_edad_calculada">
      <label id="Label21">VIP :</label> <select  style="grid-column:2/5" name = "Cbo_pac_VIP" id="Cbo_pac_VIP">
                                        <option value = "NO">NO</option>
                                        <option value = "VIP">VIP</option>
                                        <option value = "MINT">MINT</option> 
                                        </select><label id="Label25">Fin.Vig. :</label><input   disabled type="text" id="txt_fecha_vigencia" name = "txt_fecha_vigencia">
      <label id="Label28">Tipo Doc.Ident.:</label> <select  style="grid-column:2/5" name = "DC_tipo_doc_id" id="DC_tipo_doc_id" onchange="DC_tipo_doc_id_Change(this.value);">
                                
                                        </select><label id="Label11">Numero :</label><input   type="text" id="Txt_Doc_id" name = "Txt_Doc_id">
      <label id="Label14">Correo elect :</label> <select  style="grid-column:2/5" name = "Cbo_tiene_correo" id="Cbo_tiene_correo">
                                        <option value = "CORREO DE PACIENTE">CORREO DE PACIENTE</option>
                                        <option value = "SIN CORREO ELECTRONICO">SIN CORREO ELECTRONICO</option>
                                        </select>  <div></div><div></div>
      <div></div><input  style="grid-column:2/7" type="text" id="Txt_email" name = "Txt_email">      
       <label id="Label43">Medico atiende:</label><select disabled  style="grid-column:2/5" name = "Cbo_modo_atencion_medico" id="Cbo_modo_atencion_medico">
                <option value ="VISITA DOMICILIARIA">VISITA DOMICILIARIA</option>
                <option value ="TELECONSULTA">TELECONSULTA</option>
                <option value ="LLAMADA DE SEGUIMIENTO">LLAMADA DE SEGUIMIENTO</option>
                                        </select><div></div><div></div>
       <label id="Label26">Sintomas :</label><input  style="grid-column:2/7" type="text" id="Txt_sintomas" name = "Txt_sintomas">      
      <div></div> <label   style="background-color:YELLOW;grid-column:2/7;visibility:hidden" id="Lbl_pac_clave"> </label>  
      <input   type="button" class="btn btn btn-success btn-sm" style="grid-column:2/5;visibility:hidden" id="Cmd_email_ate_sin_confirmar" name="Cmd_email_ate_sin_confirmar" onClick="Cmd_email_ate_sin_confirmar_Click();" value="Enviar correo atencion sin confirmar"> 
      <input style="grid-column:5/7;visibility:hidden" type ="button" class="btn btn btn-success btn-sm"  id="Cmd_aut_modificacion" name="Cmd_aut_modificacion" onClick="Cmd_aut_modificacion_Click();" value="Autorizar modificación"> 
      </div>
      <div class="Pago">
      <h6 style="width:15vw;grid-column:1/7; background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">Datos de Pago</h6>
      <label id="Label5">Deducible :</label><select   name = "Cbo_Moneda" id="Cbo_Moneda">
                                        <option value = "S/.">S/.</option>
                                        <option value = "$">$</option>
                                        </select>
      <input  style="width: 5vw;"   type="text"  onchange="Txt_ded_Change(this.value);" id="Txt_ded" name = "Txt_ded"> <div><label id="Lbl1_ded_usd" style="visibility:hidden">S/.</label> <label style="visibility:hidden" id="Lbl2_ded_usd">S/.</label></div><label id="Label2">Coaseguro(%):</label><input style="width: 5vw;"   type="text" id="txt_coa" name = "txt_coa">
      <label style="visibility:hidden" id="Lbl_doc_pago">Doc. de pago:</label><select  style="grid-column:2/4;visibility:hidden" name = "Cbo_doc_pago" id="Cbo_doc_pago">
                                        <option value = "BOLETA">BOLETA</option>
                                        <option value = "FACTURA">FACTURA</option>
                                        </select><input style="visibility:hidden" type ="button"  id="Cmd_datos_fact" name="Cmd_datos_fact" onClick="Cmd_datos_fact_Click();" value="Datos de facturación"><div></div> <div></div>
      <label id="Label32">Forma Pago :</label><select  style="grid-column:2/4" name = "Cbo_forma_pago" id="Cbo_forma_pago" onchange="Cbo_forma_pago_Click();">
                                        <option value = "EFECTIVO">EFECTIVO</option>
                                        <option value = "CREDITO">CREDITO</option>
                                        <option value = "TARJETA">TARJETA</option>
                                        <option value = "MPOS">MPOS</option>
                                        <option value = "TRANSFERENCIA">TRANSFERENCIA</option>

                                        </select>  <div></div><div></div><div></div> 
                                        <div  class="Frame_tarjeta" id='Frame_tarjeta' style="display:none;  ">
                                        <label id = "Label32" >Operador</label><select  id="TxtNroTar" name="TxtNroTar"> 
                                         <option value="VI">VI</option>
                                         <option value="MC">MC</option>
                                         <option value="DI">DI</option>
                                         <option value="AE">AE</option>
                                        </select><div></div><div></div><div></div><div></div>
                                        <label id = "Lbl_tarjeta">Num Tarjeta</label><input  maxlength="10" style="grid-column:2/4"  id="ME_tarjeta" name="ME_tarjeta" ><label style="visibility:hidden" id = "Lbl_info">Por seguridad se omiten los primeros 8 digitos</label><div></div><div></div> 
                                        <label id = "lblfecvenctarjeta" >Fec. Venc. Tarj.</label> <input   maxlength="2" style="width:3vw"  id="Txt_mes_credito" name="Txt_mes_credito" ><div><input style="width:4vw"  maxlength="4"  id="Txt_anio_credito" name="Txt_anio_credito" > <label id = "mm_aaaa"  >mm-aaaa</label></div><div></div><div></div>
                                        </div>
                                        <div class="Frame_credito" id = 'Frame_credito' style="display:none;"> 
                                        <label id = "Label36" >Autorizado por</label><input style=" grid-column:2/6"    id="Txt_autorizado" name="Txt_autorizado" >
                                        </div>      
                                       <div class="Frame_efectivo" id='Frame_efectivo' style="display:none;  ">
                                        <label id = "Label_efectivo" >Denominacion</label><select   id="Cbo_moneda_den" name="Cbo_moneda_den"> 
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
    </div>
    
    <div class="Medico">
    <h6 style="width:15vw;grid-column:1/3; background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">Datos de medico</h6>
     <label id="Label20">Especialidad :</label><input type="text" disabled id="Txt_especialidad" name = "Txt_especialidad">      
     <label id="Label22">Programación :</label><input type="text" disabled id="Txt_tipo_prog" name = "Txt_tipo_prog">      
     <label id="Label17">Medico :</label><input type="text" disabled id="Txt_medico" name = "Txt_medico">      
     <label id="Label18">Fecha ate :</label><input type="text" disabled id="Txt_fec_ate" name = "Txt_fec_ate">      
     <label id="Label19">Hora ate :</label><input type="text" disabled id="Txt_hor_ate" name = "Txt_hor_ate">      

     <label id="Label29">Perfil ate :</label><input style="background-color:yellow;color:red;font-weight:bold" type="text" disabled id="Txt_perfil_atencion" name = "Txt_perfil_atencion">      
      <div style ="grid-column:1/3;visibility:hidden"  id ="Frm_medicacion_covid_19"  >
          <label id="Label30">Medicacion por 2 mes (COVID-19) :</label><select   name = "Cbo_med_covid_19" id="Cbo_med_covid_19">
                                        <option value = "SI">SI</option>
                                        <option value = "NO">NO</option>
                                        </select>        
      </div>
      <div></div><input type="button"  class="btn btn btn-info btn-sm" onclick="cmd_reprogramardirecto_Click();"  id="cmd_reprogramardirecto" name="cmd_reprogramardirecto" value="Reprogramar"> 
    </div>
    <div class="domicilio">
    <h6 style="width:15vw;grid-column:1/5; background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">Datos de domicilio</h6>

     <label id="Label3">Dpto/prov/Dist :</label><input disabled style ="grid-column:2/5" type="text" id="Txt_distrito" name = "Txt_distrito">      
     <label id="Label13">Dirección :</label><textarea style ="grid-column:2/5" rows="3" id="Txt_direccion" name = "Txt_direccion" ></textarea>
     <label id="Label34">Nro. / Mz - Lote :</label><input   type="text" id="Txt_nro_lote" name = "Txt_nro_lote"><label id="Label37">Dpto :</label><input   type="text" id="Txt_dpto_dir" name = "Txt_dpto_dir">   
     <label id="Label7">Urbanizacion :</label><textarea rows="2" style ="grid-column:2/5"   id="Txt_urbanizacion" name = "Txt_urbanizacion"></textarea>
     <label id="Label4">Referencia :</label><textarea rows="2" style ="grid-column:2/5"  id="Txt_referencia" name = "Txt_referencia"> </textarea>     
     <label id="Label9">Telf. casa :</label><input style ="grid-column:2/5" type="text" id="Txt_tlf_casa" name = "Txt_tlf_casa">      
     <label id="Label23">Telf. oficina :</label><input type="text" id="Txt_tlf_oficina" name = "Txt_tlf_oficina"><label id="Label35">Anx </label><input type="text" id="Txt_tlf_oficina_anx" name = "Txt_tlf_oficina_anx">  
     <label id="Label24">Telf. celular :</label><input style ="grid-column:2/5" type="text" id="Txt_tlf_celular" name = "Txt_tlf_celular">      

    
    </div>
    <div style="display:none;border:1px solid black;grid-column:1/3" id ="Frm_consent">
    <h6 style="width:20vw;grid-column:1/9; background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">El paciente autoriza a</h6>
    <label id="Lbl_consmt_ri">- Recibir información de productos o servicios de Sanna/ medicos a domicilio ..................................................................................................................................................................................................................................................................</label>
    <input type = "radio"  name ="Opt_ri"  id ="Opt_ri_si"  ><label for ="Opt_ri_si">SI</label>
    <input type = "radio"  name ="Opt_ri"  id ="Opt_ri_no"  ><label for ="Opt_ri_no">NO</label>
    </div>
    <div class="Aseguradora">
    <h6 style="width:20vw;grid-column:1/9; background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">Datos de Aseguradora</h6>

    <label id="Lbl_prod">Producto:</label><input disabled type="text" id="Txt_prod" name = "Txt_prod">  <label id="Lbl_cod_aut">Código de Autorización :</label><input  type="text" id="TxtCodAut" name = "TxtCodAut">  <label id="Lbl_num_sol">Num. solicitud :</label><input disabled  type="text" id="Txt_num_sol" name = "Txt_num_sol"> 
    <label id="Lbl_Aseg_7">Codigo de asegurado :</label><input  disabled type="text" id="Txt_cod_aseg" name = "Txt_cod_aseg">   <label id="Lbl_poliza">Poliza :</label><input disabled type="text" id="Txt_Poliza" name = "Txt_Poliza"> <label id="Lbl_Aseg_5">Certif.</label><input disabled type="text" id="Txt_pol_cert" name = "Txt_pol_cert"> 

    </div>

    <div class="botones">
    <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_cambio_estado" name="Cmd_cambio_estado" onClick="Cmd_cambio_estado_Click();" value="Cambio de estado">       
    <input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_cancelar" name="Cmd_cancelar" onClick="Cmd_cancelar_Click();" value="Cancelar atencion">                
    <label style="grid-column:3/6"id="Lbl_info_siteds" name="Lbl_info_siteds">.</label>
    <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_guardar" name="Cmd_guardar" onClick="Cmd_guardar_Click();" value="Guardar">                
    <input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_salir" name="Cmd_salir" onClick="javascript:window.close('','_parent','');" value="Salir">                

    </div>
  <input   type="hidden" id="Txt_CodAte" name = "Txt_CodAte" value = "${codigo}">
  </div> 
  <script >
   function load_js()
   {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.src= '${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/Frm_CM_confirma_datos.js?${Date.now()}';
      script.type = 'module'
      head.appendChild(script);
   } 
   load_js();
   </script> 
  </body>
   
   `;

}

 


export function  Frm_CM_asignacion_body(codigo) {

  return  ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  
  <head>
  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
  <style>
  .Frm_CM_asignacion {
    margin-left:10px;
    margin-right:10px;
    font-size:2vh;
    height:70vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2.5fr 0.4fr 0.9fr 0.2fr;
    gap: 10px 10px;
    grid-auto-flow: row;
    grid-template-areas:
      "Frm_CM_asignacion1"
      "Frm_CM_asignacion2"
      "Frm_cm_asignacion_tipo_programacion"
      "Frm_cm_asignacion_botones";
  }
  
  .Frm_cm_asignacion_botones {
    border:1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . . . .";
    grid-area: Frm_cm_asignacion_botones;
  }
  
  .Frm_cm_asignacion_tipo_programacion {
    border:1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . .";
    grid-area: Frm_cm_asignacion_tipo_programacion;
  }
  
  .Frm_CM_asignacion2 {
    border:1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . . . ."
      ". . . . . .";
    grid-area: Frm_CM_asignacion2;
  }
  
  .Frm_CM_asignacion1 {
    border:1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . .";
    grid-area: Frm_CM_asignacion1;
  }
  
  </style>
  </head>
  <body>
  <div class="Frm_CM_asignacion">
 
  <div class="Frm_CM_asignacion1">
  <input  type="hidden" name = "Txt_CodAte" id="Txt_CodAte" value="${codigo}" /> 
  <label id= "Label1">Paciente :</label> 
  <input style="grid-column:2/7" disabled type="text" name = "Txt_paciente" id="Txt_paciente" /> 
  <div></div>
  <label style="visibility:hidden;grid-column:2/7" id= "Lbl_pac_clave">Paciente :</label> 
  <label id= "Label6">Edad :</label> 
  <input  disabled type="text" name = "Txt_edad" id="Txt_edad" /> 
  <label id= "Label9">Paciente VIP :</label> 
  <select  disabled name = "Cbo_pac_VIP" id="Cbo_pac_VIP">
  <option value = "NO">NO</option>
  <option value = "VIP">VIP</option>
  <option value = "MINT">MINT</option> 
  </select> <div></div><div></div> 
  <label id= "Label15">Telefono :</label> 
  <input  style="grid-column:2/5" disabled type="text" name = "Txt_telefono" id="Txt_telefono" /><div></div><div></div> 
  <label id= "Label1">F. Pago :</label> 
  <input disabled type="text" name = "Txt_forma_pag" id="Txt_forma_pag" /><input disabled type="text" name = "Txt_den" id="Txt_den" /><div></div><div></div><div></div>
  <label id= "Label3">Dpto/pro/dist :</label> 
  <input style="grid-column:2/7" disabled type="text" name = "Txt_distrito" id="Txt_distrito" />
  <label id= "Label12">Dirección :</label> 
  <input style="grid-column:2/7" disabled type="text" name = "Txt_direccion" id="Txt_direccion" />
  <label id= "Label42">Nro./Lote, Mz :</label> 
  <input  style="grid-column:2/4" type="text" name = "Txt_nro_lote" id="Txt_nro_lote" /><label id= "Label46">Dpto / Int :</label><input  type="text" name = "Txt_dpto_dir" id="Txt_dpto_dir" />    <div></div>
  <label id= "Label4">Referencia :</label> 
  <input style="grid-column:2/7" disabled type="text" name = "Txt_referencia" id="Txt_referencia" />
  <label id= "Label11">Observación :</label> 
  <input style="grid-column:2/7" disabled type="text" name = "Txt_obs" id="Txt_obs" />
  <label id= "Label8">Información :</label> 
  <input style="grid-column:2/7" disabled type="text" name = "Txt_inf_pac" id="Txt_inf_pac" />
  <label id= "Label10">Info. historico :</label> 
  <input style="grid-column:2/7" type="text" name = "DataList1" id="DataList1" />
  </div>
  <div class="Frm_CM_asignacion2">
  <label style="visibility:hidden" id= "Lbl_med_asig">Médico :</label><input style="visibility:hidden" style="grid-column:2/4" type="text" name = "Txt_medico" id="Txt_medico" /> <label id= "Label14">Espec. :</label><input  disabled style="grid-column:5/7" type="text" name = "Txt_esp_propuesto" id="Txt_esp_propuesto" />
  <label id= "Label5">Programacion :</label><input  type="text" disabled name = "Txt_tipo_prog" id="Txt_tipo_prog" /> <label style="visibility:hidden" id= "Lbl_fec_asig">Fecha :</label><input  style="visibility:hidden"  readonly type="text" name = "Txt_fecha" id="Txt_fecha" /><label  style="visibility:hidden" id= "Lbl_hor_asig">Hora :</label><input  style="visibility:hidden"  readonly type="text" name = "Txt_hora" id="Txt_hora" />
  </div>
  <div class="Frm_cm_asignacion_tipo_programacion">
  <h6 style="width:25vw;grid-column:1/7;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Tipo de programacion</h6>
  <select  style="grid-column:1/3;"  name = "Cbo_tipo_prog" id="Cbo_tipo_prog" onchange ="Cbo_tipo_prog_Click(this.selectedIndex);">
  <option value = "INMEDIATA">INMEDIATA</option>
  <option value = "PROGRAMADA (SOLICITÓ MÉDICO)">PROGRAMADA (SOLICITÓ MÉDICO)</option>
  <option value = "PROGRAMADA (NO SOLICITÓ MÉDICO)">PROGRAMADA (NO SOLICITÓ MÉDICO)</option> 
  </select>
  <label id= "Label16">Proveedor :</label> 
  <input disabled type="text" name = "Txt_proveedor_medico" id="Txt_proveedor_medico" />
  <label id= "Label13">Tipo :</label> 
  <select  name = "Cbo_tipo_dr" id="Cbo_tipo_dr">
  <option value = "Auto">Auto</option>
  <option value = "Independiente">Independiente</option>
  </select>
  <div style="grid-column:1/3;"></div>
  <label id= "Label2">Espec. :</label> 
  <input style="grid-column:4/7;" disabled type="text" name = "Txt_especialidad" id="Txt_especialidad" />
  <div style="grid-column:1/3;"></div>
  <label id= "Lbl_med">Médico :</label> 
  <select style="grid-column:4/7;" type="text" name = "Txt_Dr" id="Txt_Dr" >
  
  </select>
  <div style="grid-column:1/3;"></div>
  <label style="visibility:hidden" id= "Lbl_fecha">Fecha :</label>      
  <input style="visibility:hidden" type="date" name = "DTPicker1" id="DTPicker1" min="${ new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit',  day: '2-digit' }).replace(/\//g, '-').split('-').reverse().join('-') }" />
  <label style="visibility:hidden" id= "Lbl_hora">Hora :</label> 
  <select style="visibility:hidden"   name = "CmbHora" id="CmbHora">
  <option value="00:00">00:00</option>
  <option value="00:30">00:30</option>
  <option value="01:00">01:00</option>
  <option value="01:30">01:30</option>
  <option value="02:00">02:00</option>
  <option value="02:30">02:30</option>
  <option value="03:00">03:00</option>
  <option value="03:30">03:30</option>
  <option value="04:00">04:00</option>
  <option value="04:30">04:30</option>
  <option value="05:00">05:00</option>
  <option value="05:30">05:30</option>
  <option value="06:00">06:00</option>
  <option value="06:30">06:30</option>
  <option value="07:00">07:00</option>
  <option value="07:30">07:30</option>
  <option value="08:00">08:00</option>
  <option value="08:30">08:30</option>
  <option value="09:00">09:00</option>
  <option value="09:30">09:30</option>
  <option value="10:00">10:00</option>
  <option value="10:30">10:30</option>
  <option value="11:00">11:00</option>
  <option value="11:30">11:30</option>
  <option value="12:00">12:00</option>
  <option value="12:30">12:30</option>
  <option value="13:00">13:00</option>
  <option value="13:30">13:30</option>
  <option value="14:00">14:00</option>
  <option value="14:30">14:30</option>
  <option value="15:00">15:00</option>
  <option value="15:30">15:30</option>
  <option value="16:00">16:00</option>
  <option value="16:30">16:30</option>
  <option value="17:00">17:00</option>
  <option value="17:30">17:30</option>
  <option value="18:00">18:00</option>
  <option value="18:30">18:30</option>
  <option value="19:00">19:00</option>
  <option value="19:30">19:30</option>
  <option value="20:00">20:00</option>
  <option value="20:30">20:30</option>
  <option value="21:00">21:00</option>
  <option value="21:30">21:30</option>
  <option value="22:00">22:00</option>
  <option value="22:30">22:30</option>
  <option value="23:00">23:00</option>
  <option value="23:30">23:30</option>
  </select>
  <div  style="grid-column:1/3;visibility:hidden"></div>
  <label style="visibility:hidden" id= "Lbl_tiempo">Tiempo :</label>      
  <select style="visibility:hidden" type="text" name = "Cbo_tiempo" id="Cbo_tiempo"  >
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
  <option value="50">50</option>
  <option value="60">60</option>
  <option value="70">70</option>
  <option value="80">80</option>
  <option value="90">90</option>
  <option value="100">100</option>
  <option value="110">110</option>
  <option value="120">120</option>
  <option value="130">130</option>
  <option value="140">140</option>
  <option value="150">150</option>
  <option value="160">160</option>
  <option value="170">170</option>
  <option value="180">180</option>
  <option value="190">190</option>
  <option value="200">200</option> 


  </select> 
  <label style="visibility:hidden" id= "Lbl_min">minutos</label> 
  <div style="grid-column:1/3;"></div>
  <label style="display:none; color:red">Combo fuera de tiempo solicitado</label>
   </div>
  <div class="Frm_cm_asignacion_botones">
  <input type="button"  class="btn btn btn-success btn-sm invisible"  id="Cmd_cambio_estado" name="Cmd_cambio_estado"  onclick="Cmd_cambio_estado_click();" value="Cambio de estado"> 
  <div></div><div></div><div></div>
  <input type="button"  class="btn btn btn-success btn-sm "  id="Cmd_guardar" name="Cmd_guardar"  onclick="Cmd_guardar_Click();" value="Guardar"> 
  <input type="button"  class="btn btn btn-danger btn-sm "  id="Cmd_salir" name="Cmd_salir"  onclick="javascript:window.close('','_parent','');" value="Salir"> 
 
  </div>
 
 </div>
 <script>
 function load_js()
 {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.src= '${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/Frm_CM_asignacion.js?${Date.now()}';
    script.type = 'module'
    head.appendChild(script);
 }
 load_js();
 </script>
  </body>
 
   `;
 
 }





export function  Frm_seguimiento(codigo) {

  return ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  <head>


  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2-laboratorio.min.css" rel="stylesheet">
  <style>
  fieldset {
    position: relative;
    border:1px solid black;
  }
    legend {
      font-size: 1em;
      font-weight: bold;
      width:auto;
    }
    
  
  </style>
  </head>
  <body>
  <div   style="display:flex; flex-direction: column; height:100%">
  <div   style="display:flex; flex-direction: row;" width:20vh >
         
        <fieldset style="display:flex;justify-content:content-around	;"  >
        <legend>Buscar</legend>
          <div>
          <input type="text" id="txtCodServ" name = "txtCodServ" style="color:red;font-weight:bold"; readonly value="${codigo}"><br>
          <input type="button"  class="btn btn btn-success btn-sm "  id="CmdBuscar" name="CmdBuscar" value="Buscar" onclick="buscarseguimiento();"> 
          </div>
          <div>
          <input type="radio" id="optAtencion" checked name="Opciones" value="optAtencion">
          <label for="optAtencion">Atencion</label><br>
          <input type="radio" id="optPedido" name="Opciones" value="optPedido">
          <label for="optPedido">Pedido</label><br>
          <input type="radio" id="optLaboratorio" name="Opciones" value="optLaboratorio">
          <label for="optLaboratorio">Laboratorio</label><br>
          <input type="radio" id="OptAmbulancia" name="Opciones" value="OptAmbulancia">
          <label for="OptAmbulancia">Ambulancia</label>
          </div>
          </fieldset>
           
        
        <fieldset  style="display:flex;justify-content:content-around	;"   >
        <legend>Seguimiento del servicio</legend>
        <div>
        <input type="radio" id="Opt_incidencia" name="Opt_seguimiento" value="Opt_incidencia">
        <label for="Opt_incidencia">Incidencia</label><br>
        <input type="radio" id="optAte" name="Opt_seguimiento" value="optAte">
        <label for="optAte">Call Center</label><br>
        <input type="radio" id="optPed" name="Opt_seguimiento" value="optPed">
        <label for="optPed">Pedido</label><br>
        <input type="radio" id="optLab" name="Opt_seguimiento" value="optLab">
        <label for="optLab">Laboratorios</label><br>
        <input type="radio" id="optAmb" name="Opt_seguimiento" value="optAmb">
        <label for="optAmb">Ambulancias</label><br>
        </div>
        <div>
        <input type="radio" id="optAdm" name="Opt_seguimiento" value="optAdm">
        <label for="optAdm">Administracion</label><br>
        <input type="radio" id="optAf" name="Opt_seguimiento" value="optAf">
        <label for="optAf">Aud. Fichas</label><br>
        <input type="radio" id="optAudMed" name="Opt_seguimiento" value="optAudMed">
        <label for="optAudMed">Aud.Medica</label><br>
        <input type="radio" id="optPreServ" name="Opt_seguimiento" value="optPreServ">
        <label for="optPreServ">Pre-Servicio</label><br>
        <input type="radio" id="opt_PostServ" name="Opt_seguimiento" value="opt_PostServ">
        <label for="opt_PostServ">Post-Servicio</label><br>
        </div>
        <div>
        <input type="radio" id="optAlm" name="Opt_seguimiento" value="optAlm">
        <label for="optAlm">Almacen</label><br>
        <input type="radio" id="Opt_Cent_adv" name="Opt_seguimiento" value="Opt_Cent_adv">
         <label for="Opt_Cent_adv">Adversos/Centinela</label><br>
        <input type="radio" id="Opt_DrOnline" name="Opt_seguimiento" value="Opt_DrOnline">
        <label for="Opt_DrOnline">Doctor Online</label> 
        </div>
        </fieldset>
       
      
  </div>
  <div   style="display:flex; flex-direction: column;" width:20vh >
      <div>
        <input type="checkbox" id="Chck_obs" onchange="cambio_obs();" value="obs"> <label for="Chck_obs">Observaciones</label>
        <input type="radio" disabled id="Opt_registros"  onclick="S_MOSTRAR_REGISTRO_SNC('REGISTRO' );" name="Opt_observaciones" value="Opt_registros">
        <label for="Opt_registros">Registros</label>
        <input type="radio" disabled id="Opt_snc"  onclick="S_MOSTRAR_REGISTRO_SNC('SNC' );" name="Opt_observaciones" value="Opt_snc">
        <label for="Opt_snc">SNC</label><br>
      </div>
      <div style="display:flex;justify-content:space-evenly	;">
        <label >Descripcion: </label>
        <select  style="flex-grow:1;" id="DBDes_snc" name="DBDes_snc"  > 
        </select>
      </div>
  </div>
  <div   style="display:flex;align-items: center;" width:20vh >
      <textarea id="txt_obs" name="txt_obs" cols = "90" rows="4" ></textarea>
      <input type="button"  class="btn btn btn-success btn-sm "  onclick="guardarsnc();" id="CmdGrabar" name="CmdGrabar" value="Guardar"> 
      
  </div>
  
  <div  style = "height:50vh;  border: 1px solid blue; overflow-y:scroll;">
  <table id="table_seguimiento" border=1>
  <thead  id="table_seguimiento_thead" style="color: white;background:#084d6e;">
      <tr>
        <th>TIPO</th>
        <th>SNC</th>
        <th>OBSERVACIONES</th>
        <th>USUARIO</th>
        <th style="white-space: nowrap;">FECHA</th>
        <th>HORA</th>
      </tr>
  </thead>
  <tbody id="t_seguimiento"></tbody>
  <tfoot>
   </tfoot>
     </table>
  
     
     </div>
     <div>   <label>Aseguradora</label><br>
     <input type="text" id="TxtGru" name = "TxtGru" style="width:100%;color:blue;font-weight:bold"; readonly  >
     </div>
  <div   style="display:grid; grid-template-columns:6fr 1fr;">
  <div>
  <label>Paciente</label>
  <input type="text" id="txtPac" name = "txtPac" style="width:100%;color:blue;font-weight:bold"; readonly  >
  </div>
  <div style="display:flex;flex-direction: column;justify-content: flex-end;">
   <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" onClick="javascript:window.close('','_parent','');" value="Salir"> 
   </div>
  </div>
  </div>
  </body> 
  <script src="${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/show_seguimiento.js?${Date.now()}">
  </script>
   
   
   `;
 
 }  

 export function  Frm_CM_datos_paciente(codigo) {

  return ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  <head>
  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2-laboratorio.min.css" rel="stylesheet">
  <style>
 
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1.4fr 1.4fr 0.2fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "Frm_CM_datos_paciente_izquierda Frm_CM_datos_paciente_derecha"
      "Frm_CM_datos_paciente_izquierda Frm_CM_datos_paciente_derecha"
      "Frm_CM_datos_paciente_botones Frm_CM_datos_paciente_botones";
  }
  
  .Frm_CM_datos_paciente_izquierda {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.8fr 1.2fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "Frame2 Frame2 Frame2 Frame2 Frame2 Frame2"
      "Frame5 Frame5 Frame5 Frame5 Frame5 Frame5";
    grid-area: Frm_CM_datos_paciente_izquierda;
  }
  
  .Frame2 { 
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-area: Frame2; 
  }
  
  .Frame5 { grid-area: Frame5; }
  
  .Frm_CM_datos_paciente_derecha {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1.2fr 0.8fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "Frame1 Frame1 Frame1 Frame1 Frame1 Frame1"
      "Frame3 Frame3 Frame3 Frame3 Frame3 Frame3";
    grid-area: Frm_CM_datos_paciente_derecha;
  }
  
  .Frame1 { 
   
    grid-area: Frame1;
    border:1px solid black;
  }
  
  .Frame3 { grid-area: Frame3; }
  
  .Frm_CM_datos_paciente_botones { grid-area: Frm_CM_datos_paciente_botones; }
  
  
  </style>
  </head>
  <body>
  <div class="container">
  <div class="Frm_CM_datos_paciente_izquierda">
    <div class="Frame2">
    <h6 style="width:20vw;background-color:white;fon-weight:bold;grid-column:1/7;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Datos del Paciente</h6>
    <label id="Label1">Paciente :</label><input type="text" id="Txt_pac" name = "Txt_pac" style="grid-column:2/7;color:black;font-weight:bold"; readonly  > 
    <label id="Label6">Edad :</label><input type="text" id="Txt_edad" name = "Txt_edad" style="color:black;font-weight:bold"; readonly  > 
    <label id="Label12">Fecha nac :</label><input type="text" id="Txt_fec_nac" name = "Txt_fec_nac" style="color:black;font-weight:bold"; readonly  > 
    <label id="Label22">VIP :</label><select id="Cbo_pac_VIP" name = "Cbo_pac_VIP" style="color:black;font-weight:bold"; readonly  ></select> 

    </div>
    <div class="Frame5"></div>
  </div>
  <div class="Frm_CM_datos_paciente_derecha">
    <div class="Frame1">
    <h6 style="width:20vw;background-color:white;fon-weight:bold;grid-column:1/7;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Datos de Domicilio</h6>
    <label id="Label1">Provincia :</label><input type="text" id="Txt_distrito" name = "Txt_distrito" style="grid-column:2/7;color:black;font-weight:bold"; readonly  > 
    </div>
    <div class="Frame3"></div>
  </div>
  <div class="Frm_CM_datos_paciente_botones"></div>
</div>


  </body>
   <script id="seguimiento" src="${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/Frm_CM_datos_paciente.js?${Date.now()}">
 
   </script>`;
 
 }  
 
export function  Frm_CM_confirma_fin(codigo) {

  return ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  <head>
  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
  <style>
  fieldset {
    position: relative;
    border:1px solid black;
  }
    legend {
      font-size: 1em;
      font-weight: bold;
      width:auto;
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
  </style>
  </head>
  <body>
  <div   style="border:1px solid black;margin:1vh;padding:5vh;display:flex; flex-direction: column; height:98vh">
   
   
  <div   style="display:grid; grid-template-columns:2.5fr 4.5fr;">
  <input   type="hidden" name="DC_tipo_doc_id" id="DC_tipo_doc_id">
  <input type="hidden" id="Txt_CodAte" name = "Txt_CodAte" style="color:blue;font-weight:bold"; readonly value="${codigo}"> 
  <input type="hidden" id="Txt_ap_pat" name = "Txt_ap_pat">
  <input type="hidden" id="Txt_ap_mat" name = "Txt_ap_mat">
  <input type="hidden" id="Txt_nom_pac" name = "Txt_nom_pac">
  <input type="hidden" id="Txt_Doc_id" name = "Txt_Doc_id">

  <label id="Label2">Paciente :</label>
  <input type="text" id="Txt_paciente" name = "Txt_paciente" style="color:blue;font-weight:bold"; readonly  > 
  <label id="Label3">Distrito :</label>
  <input type="text" id="Txt_distrito" name = "Txt_distrito" style="color:blue;font-weight:bold"; readonly  >   
  <label id="Label13">Dirección :</label>
  <input type="text" id="Txt_direccion" name = "Txt_direccion" style="color:blue;font-weight:bold"; readonly  >   
  <label id="Label17">Medico :</label>
  <input type="text" id="Txt_medico" name = "Txt_medico" style="color:blue;font-weight:bold"; readonly  >   
  <label id="lbl_conductor">Conductor :</label>
  <input type="text" id="Txt_conductor" name = "Txt_conductor" style="color:blue;font-weight:bold"; readonly  > 
  <div style="display:none;grid-column:1 / span 2;">
    <input type="checkbox"id="Chk_ate_ref"    name="Chk_ate_ref">
    <label id="lbl_ate_ref" for="Chk_ate_ref" >Atencion referencial, solo para control de entrega de medicación</label>&nbsp;&nbsp;
  </div>
  </div>  
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;">
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_cancelar" name="Cmd_cancelar" onClick="Cmd_cancelar_Click();" value="CANCELAR ATENCION"> 
   <input type="button" style="visibility:hidden" class="btn btn btn-warning btn-sm "  id="Cmd_datos_siteds" name="Cmd_datos_siteds"  onclick="Cmd_datos_siteds_click();" value="DATOS SITEDS"> 
   <input type="button" style="visibility:hidden" class="btn btn btn-danger btn-sm "  id="Cmd_eliminar" name="Cmd_eliminar"  onclick="Cmd_eliminar_click();" value="ELIMINAR"> 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Command1" name="Command1" onClick="Command1_Click();" value="CONFIRMAR"> 
   <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Command2" name="Command2" onClick="javascript:window.close('','_parent','');" value="SALIR"> 

   </div>
   <hr>
   <div style="display:grid;grid-template-columns: 1fr 1fr;border:1px solid black"  >
   <h6 style="width:25vw;grid-column:1/3; background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">Datos de Aseguradora</h6>

   <label id="Lbl_prod">Producto:</label><input disabled type="text" id="Txt_prod" name = "Txt_prod">
     <label id="Lbl_cod_aut">Código de Autorización :</label><input  disabled type="text" id="TxtCodAut" name = "TxtCodAut">
       <label id="Lbl_num_sol">Num. solicitud :</label><input disabled  type="text" id="Txt_num_sol" name = "Txt_num_sol"> 
   <label id="Lbl_Aseg_7">Codigo de asegurado :</label><input  disabled type="text" id="Txt_cod_aseg" name = "Txt_cod_aseg">  
    <label id="Lbl_poliza">Poliza :</label><input disabled type="text" id="Txt_Poliza" name = "Txt_Poliza">
     <label id="Lbl_Aseg_5">Certif.</label><input disabled type="text" id="Txt_pol_cert" name = "Txt_pol_cert"> 
     <label id="Lbl_Aseg_6">Coa.</label><input disabled  type="text" id="txt_coa" name = "txt_coa">
     <label id="Lbl_Aseg_6">Deducible.</label><input disabled  type="text" id="Txt_ded" name = "Txt_ded">
     <label id="Lbl_Aseg_7">Afiliacion.</label> <input  disabled type="text" name = "Txt_tipo_afiliacion" id="Txt_tipo_afiliacion" />
     
   </div>
 
  </div>
   <script >
   function load_js()
   {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.src= '${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/show_CM_confirma_fin.js?${Date.now()}';
      script.type = 'module'
      head.appendChild(script);
   }
   load_js();
   </script> 
  </body>`;
    
 
 }

 
 
export function  Frm_CM_confirma_envio_mensaje(codigo) {
 
  return ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  <head>
  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
  <style>
  fieldset {
    position: relative;
    border:1px solid black;
  }
    legend {
      font-size: 1em;
      font-weight: bold;
      width:auto;
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
  </style>
  </head>
  <body>
  <div   style="border:1px solid black;margin:1vh;padding:5vh;display:flex; flex-direction: column; height:70%">
   
   
  <div   style="display:grid; grid-template-columns:2.5fr 4.5fr;">
  <input type="hidden" id="Txt_CodAte" name = "Txt_CodAte" style="color:blue;font-weight:bold"; readonly value="${codigo}"> 
  <label id="Label2">Paciente :</label>
  <input type="text" id="Txt_paciente" name = "Txt_paciente" style="color:blue;font-weight:bold"; readonly  > 
  <label id="Label3">Distrito :</label>
  <input type="text" id="Txt_distrito" name = "Txt_distrito" style="color:blue;font-weight:bold"; readonly  >   
  <label id="Label13">Dirección :</label>
  <input type="text" id="Txt_direccion" name = "Txt_direccion" style="color:blue;font-weight:bold"; readonly  >   
  <label id="Label17">Medico :</label>
  <input type="text" id="Txt_medico" name = "Txt_medico" style="color:blue;font-weight:bold"; readonly  >   
  <label id="lbl_conductor">Conductor :</label>
  <input type="text" id="Txt_conductor" name = "Txt_conductor" style="color:blue;font-weight:bold"; readonly  > 
  <label style="visibility:hidden;grid-column:1/3;font-weight:bold" id="Lbl_mensa_prog" name = "Lbl_mensa_prog"></label>

  <div style="display:none;grid-column:1 / span 2;">
    <input type="checkbox"id="Chk_ate_ref"    name="Chk_ate_ref">
    <label id="lbl_ate_ref" for="Chk_ate_ref" >Atencion referencial, solo para control de entrega de medicación</label>&nbsp;&nbsp;
  </div>
  </div>  
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;">
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_cancelar" name="Cmd_cancelar" onClick="Cmd_cancelar_Click();" value="Cancelar atencion"> 
   <input type="button"  class="btn btn btn-warning btn-sm"  id="Cmd_reenviar" name="Cmd_reenviar" onClick="Cmd_reenviar_Click();" value="Enviar mensaje SMS">
   <div></div> 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Command1" name="Command1" onClick="Command1_Click();" value="Confirmar"> 
   <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Command2" name="Command2" onClick="javascript:window.close('','_parent','');" value="Salir"> 

   </div>
 <div style="display:none;">
 <textarea id="Txt_body" name="Txt_body" ></textarea>
 <input type="button"  class="btn btn btn-info btn-sm"  id="Cmd_correo_prov" name="Cmd_correo_prov" onClick="Cmd_correo_prov_Click" value="Enviar correo a proveedor"> 

 </div>
 
  </div>
   <script >
   function load_js()
   {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.src= '${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/show_CM_confirma_envio_mensaje.js?${Date.now()}';
      script.type = 'module'
      head.appendChild(script);
   }
   load_js();
   </script> 
  </body>`;
    
 
 }

 
export function  Frm_CM_confirma_llegada(codigo) {
 
  return ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  <head>
  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
  <style>
  fieldset {
    position: relative;
    border:1px solid black;
  }
    legend {
      font-size: 1em;
      font-weight: bold;
      width:auto;
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
  </style>
  </head>
  <body>
  <div   style="border:1px solid black;margin:1vh;padding:5vh;display:flex; flex-direction: column; height:70%">
   
   
  <div   style="display:grid; grid-template-columns:2.5fr 4.5fr;">
  <input type="hidden" id="Txt_CodAte" name = "Txt_CodAte" style="color:blue;font-weight:bold"; readonly value="${codigo}"> 
  <label id="Label2">Paciente :</label>
  <input type="text" id="Txt_paciente" name = "Txt_paciente" style="color:blue;font-weight:bold"; readonly  > 
  <label id="Label3">Distrito :</label>
  <input type="text" id="Txt_distrito" name = "Txt_distrito" style="color:blue;font-weight:bold"; readonly  >   
  <label id="Label13">Dirección :</label>
  <input type="text" id="Txt_direccion" name = "Txt_direccion" style="color:blue;font-weight:bold"; readonly  >   
  <label id="Label17">Medico :</label>
  <input type="text" id="Txt_medico" name = "Txt_medico" style="color:blue;font-weight:bold"; readonly  >   
  <label id="lbl_conductor">Conductor :</label>
  <input type="text" id="Txt_conductor" name = "Txt_conductor" style="color:blue;font-weight:bold"; readonly  > 
  <label style="visibility:hidden;grid-column:1/3;font-weight:bold" id="Lbl_mensa_prog" name = "Lbl_mensa_prog"></label>

  <div style="display:none;grid-column:1 / span 2;">
    <input type="checkbox"id="Chk_ate_ref"    name="Chk_ate_ref">
    <label id="lbl_ate_ref" for="Chk_ate_ref" >Atencion referencial, solo para control de entrega de medicación</label>&nbsp;&nbsp;
  </div>
  </div>  
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;">
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_cancelar" name="Cmd_cancelar" onClick="Cmd_cancelar_Click();" value="Cancelar atencion"> 
   <input type="button"  class="btn btn btn-warning btn-sm"  id="Cmd_reenviar" name="Cmd_reenviar" onClick="Cmd_reenviar_Click();" value="Reenviar mensaje">
   <div></div> 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Command1" name="Command1" onClick="Command1_Click();" value="Confirmar"> 
   <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Command2" name="Command2" onClick="javascript:window.close('','_parent','');" value="Salir"> 

   </div>
  
 
  </div>
   <script >
   function load_js()
   {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.src= '${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/show_CM_confirma_llegada.js?${Date.now()}';
      script.type = 'module'
      head.appendChild(script);
   }
   load_js();
   </script> 
  </body>`;
    
 
 }
export function  Frm_CM_cotiza_conductor(codigo) {

  return ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" /> 
  <head>
  
  <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
  <style>
  
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
  .Frm_CM_cotiza_conductor {
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; 
    gap: 0px 0px; 
    border:1px solid black;
    font-size :3.5vh;
    margin:1vw;
  }
  
  </style>
  </head>
  <body>
  <div class="Frm_CM_cotiza_conductor">
  <label id="Label1">Provincia :</label>
  <input type="text" id="Txt_provincia" name = "Txt_provincia" value="LIMA" disabled  ><div></div><div></div><div></div><div></div> 
  <label id="Label6">Distrito :</label>
  <input type="text" id="Txt_distrito" name = "Txt_distrito" disabled  ><div></div><div></div><div></div><div></div>
  <label id="Label9">Dirección :</label>
  <input style ="grid-column:2/7" type="text" id="Txt_direccion" name = "Txt_direccion" disabled  >
  <label id="Label10">Nro / Lote Mz:</label>
  <input type="text" id="Txt_nro_lote" name = "Txt_nro_lote" disabled  >
  <label id="Label12">Dpto :</label>
  <input type="text" id="Txt_dpto_dir" name = "Txt_dpto_dir" disabled  >
  <div></div><div></div>
  <label id="Label11">Urbaniz. :</label>
  <input style ="grid-column:2/7" type="text" id="Txt_Urbanizacion" name = "Txt_Urbanizacion" disabled  >
  <label id="Label7">Referencia :</label>
  <input style ="grid-column:2/7" type="text" id="Txt_referencia" name = "Txt_referencia" disabled  >
  <label id="Label9">Médico :</label>
  <input style ="grid-column:2/5" type="text" id="Txt_medico" name = "Txt_medico" disabled  >
  <label id="Label5">Telf. médico :</label>
  <input type="text" id="Txt_beeper_dr" name = "Txt_beeper_dr" disabled  >
  <label id="Label4">Conductor :</label>
  <input style ="grid-column:2/5" type="text" id="Txt_conductor" name = "Txt_conductor" disabled  >
  <label id="Label2">Telf. conductor :</label>
  <input type="text" id="Txt_beeper_mot" name = "Txt_beeper_mot" disabled  >
  <label id="Lbl_tiempo">Tiempo :</label>
  <select type="text" id="Cbo_tiempo" name = "Cbo_tiempo"    >
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
  <option value="50">50</option>
  <option value="60">60</option>
  <option value="70">70</option>
  <option value="80">80</option>
  <option value="90">90</option>
  <option value="100">100</option>
  <option value="110">110</option>
  <option value="120">120</option>
  <option value="130">130</option>
  <option value="140">140</option>
  <option value="150">150</option>
  <option value="160">160</option>
  <option value="170">170</option>
  <option value="180">180</option>
  <option value="190">190</option>
  <option value="200">200</option> 
  </select>
  <label id="Lbl_min">Minutos</label><div></div><div></div><div></div> 
  <div style="display:grid;grid-column:1/7;grid-template-columns:1fr 1fr 1fr 1fr 1fr">
  <input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_cancelar" name="Cmd_cancelar" onClick="Cmd_cancelar_Click();" value="Cancelar atencion">
  <div></div><div></div>
  <input type="button"  class="btn btn btn-primary btn-sm"  id="Cmd_guardar" name="Cmd_guardar" onClick="Cmd_guardar_Click();" value="Guardar">
  <input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_salir" name="Cmd_salir" onClick="javascript:window.close('','_parent','');" value="Salir">

  
  </div>
  
  <input type="hidden" id="Txt_CodAte" name = "Txt_CodAte" value ="${codigo}"    >

  </div>
  <script >
  function load_js()
  {
     var head= document.getElementsByTagName('head')[0];
     var script= document.createElement('script');
     script.src= '${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/Frm_CM_cotiza_conductor.js?${Date.now()}';
     script.type = 'module'
     head.appendChild(script);
  }
  load_js();
  </script> 
  </body>`;
 
 }

 
 
export 
function Frm_CM_reprogramar2_body(codigo){

  return `
  <style> 
  .Reprogramar2 {
    font-size: 1.5vh;
    margin-top:1.5vh;
    display: grid;
    grid-template-columns: 1fr;
    --grid-template-rows: 0.9fr 0.8fr 1.2fr 1.9fr 0.2fr;
    --grid-template-rows: auto auto auto auto auto;
    grid-auto-columns: 1fr;
    gap: 15px 10px;
    grid-auto-flow: row;
    grid-template-areas:
      "Reprogramarpor2"
      "Adelantodeatencion2"
      "Medicoreprogramar2"
      "Direccionreprogramar2"
      "Botonesreprogramar2";
  }
  
  .Reprogramarpor2 {
    border:1px solid black;
    display: grid;
    grid-template-columns: 0.7fr 1.3fr;
    grid-template-rows: 0.2fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". ."
      ". derecha"
      ". derecha"
      ". derecha";
    grid-area: Reprogramarpor2;
  }
  
  .derecha {
    border-left:1px solid black;
    display: grid;
    grid-template-columns: 0.7fr 1.3fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". ."
      ". ."
      ". ."
      ". .";
    grid-area: derecha;
  }
 
  .Adelantodeatencion2 {
    border:1px solid black;
    display: grid;
    grid-template-columns: 0.5fr 1.5fr;
    grid-template-rows: 0.7fr 1.3fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". ."
      ". .";
    grid-area: Adelantodeatencion2;
  }
  
  .Medicoreprogramar2 {
    border:1px solid black;
    display: grid;
    grid-template-columns: 0.9fr 1.5fr 0.7fr 0.9fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . ."
      ". . . ."
      ". . . ."
      ". . . .";
    grid-area: Medicoreprogramar2;
  }
  
  .Direccionreprogramar2 {
    border:1px solid black;
    display: grid;
    grid-template-columns: 0.6fr 1.3fr 0.8fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . ."
      ". . ."
      ". . ."
      ". . ."
      ". . .";
    grid-area: Direccionreprogramar2;
  }
  
  .Botonesreprogramar2 { grid-area: Botonesreprogramar2; }
  
  </style>
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> REPROGRAMAR</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>

 

  <div class="Reprogramar2"><input type="hidden" id="Txt_CodAterpg" name="Txt_CodAterpg" value=${codigo} >
      <div class="Reprogramarpor2">
      <label style="grid-column:1/3;   width:11vw;background-color:white;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Reprogramar por</label>
      <div><input type="radio" id="Opt_tiempo_mayorrpg" name="Opc_reprogramarrpg" checked  ><label for ="Opt_tiempo_mayorrpg">Tiempo mayor</label></div>
      <div><input type="radio" id="Opt_por_pacrpg" name="Opc_reprogramarrpg"    ><label for ="Opt_por_pacrpg">Solicitud de paciente</label></div>
      <div><input type="radio" disabled id="Opt_adelanto_aterpg" name="Opc_reprogramarrpg"    ><label for ="Opt_adelanto_aterpg">Adelanto de atención</label></div>

      <div class="derecha">
        <label id ="Label3">Paciente :</label><input disabled type="text" id="Txt_pacrpg" name="Txt_pacrpg" >
        <label id ="Label4">Médico :</label><input disabled type="text" id="Txt_medicorpg" name="Txt_medicorpg" >
        <label id ="Label2">Distrito :</label><input disabled type="text" id="Txt_distrpg" name="Txt_distrpg" >
        <div style="grid-column:1 / span 2;display:grid;grid-template-columns: 1fr 1fr 1fr 1fr">
        <label id ="Label0">Fecha :</label><input style="width:5vw" type="text" disabled id="Txt_fecrpg" name="Txt_fecrpg" ><label  id ="Label8">Hora :</label><input disabled style="width:5vw" type="text" id="Txt_horrpg" name="Txt_horrpg" >
        </div>

      </div>
      </div>
      <div class="Adelantodeatencion2">
      <label style="grid-column:1 / 3;width:15vw;background-color:white;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Adelanto de atención</label>
      <label id ="Label11">Descripcion :</label><select disabled  id="DBDes_adelanto_ate" name="DBDes_adelanto_ate" ></select>
      <input style="grid-column:1 / 3" type="text" id="Txt_descripcion_adelanto_ate" disabled name="Txt_descripcion_adelanto_ate" >
      </div>
      <div class="Medicoreprogramar2">
      <label id ="Label1">Especialidad :</label><select   id="Txt_especialidadrpg" name="Txt_especialidadrpg" ></select><label id ="Label5">Tipo médico:</label><input type="text" disabled id="TXt_tipo_medicorpg" name="TXt_tipo_medicorpg" >
      <label id ="Lbl_med">Médico :</label><select id="Txt_Drrpg" name="Txt_Drrpg" ></select><div></div><div></div>
      <label id ="Lbl_fecha">Fecha :</label><input type="date" id="DTPicker1rpg" name="DTPicker1rpg" ><label id ="Lbl_hora">Hora :</label><select id="CmbHorarpg" >
      <option value="00:00">00:00</option>
      <option value="00:30">00:30</option>
      <option value="01:00">01:00</option>
      <option value="01:30">01:30</option>
      <option value="02:00">02:00</option>
      <option value="02:30">02:30</option>
      <option value="03:00">03:00</option>
      <option value="03:30">03:30</option>
      <option value="04:00">04:00</option>
      <option value="04:30">04:30</option>
      <option value="05:00">05:00</option>
      <option value="05:30">05:30</option>
      <option value="06:00">06:00</option>
      <option value="06:30">06:30</option>
      <option value="07:00">07:00</option>
      <option value="07:30">07:30</option>
      <option value="08:00">08:00</option>
      <option value="08:30">08:30</option>
      <option value="09:00">09:00</option>
      <option value="09:30">09:30</option>
      <option value="10:00">10:00</option>
      <option value="10:30">10:30</option>
      <option value="11:00">11:00</option>
      <option value="11:30">11:30</option>
      <option value="12:00">12:00</option>
      <option value="12:30">12:30</option>
      <option value="13:00">13:00</option>
      <option value="13:30">13:30</option>
      <option value="14:00">14:00</option>
      <option value="14:30">14:30</option>
      <option value="15:00">15:00</option>
      <option value="15:30">15:30</option>
      <option value="16:00">16:00</option>
      <option value="16:30">16:30</option>
      <option value="17:00">17:00</option>
      <option value="17:30">17:30</option>
      <option value="18:00">18:00</option>
      <option value="18:30">18:30</option>
      <option value="19:00">19:00</option>
      <option value="19:30">19:30</option>
      <option value="20:00">20:00</option>
      <option value="20:30">20:30</option>
      <option value="21:00">21:00</option>
      <option value="21:30">21:30</option>
      <option value="22:00">22:00</option>
      <option value="22:30">22:30</option>
      <option value="23:00">23:00</option>
      <option value="23:30">23:30</option></select>
      <label id ="Label21">Observacion :</label><input type="text" id="Txt_obs_cmrpg" name="Txt_obs_cmrpg" ><div></div><div></div>
      </div>
      <div class="Direccionreprogramar2">
      <div style="grid-column:1 / 4;"><input type="checkbox" id="Chk_editar_direccionrpg" name="Chk_editar_direccionrpg"  ><label for ="Chk_editar_direccionrpg">Editar datos de dirección de paciente</label></div>
      <label id ="Label7">Provincia :</label><select disabled type="text" id="Txt_provinciarpg" name="Txt_provinciarpg"   ></select><div></div>
      <label id ="Label6">Distrito :</label><select disabled type="text"  id="Txt_distritorpg" name="Txt_distritorpg" ></select><div></div>
      <label id ="Label13">Direccion :</label><input disabled type="text" id="Txt_direccionrpg" name="Txt_direccionrpg"  list="direccionesrpg" >
      <datalist id="direccionesrpg">
    
    </datalist> <div></div>
      <label id ="Lbl_ref">Referencia :</label><input disabled type="text" id="txt_referenciarpg" name="txt_referenciarpg" ><div></div>
      <label id ="Label9">Telf. casa :</label><input disabled type="text" id="Txt_tlf_casarpg" name="Txt_tlf_casarpg" ><div></div>
      <label id ="Label23">Telf. oficina :</label><div><input disabled type="text" id="Txt_tlf_oficinarpg" name="Txt_tlf_oficinarpg" ><label id ="Label35">Anx :</label></div><input type="text" disabled id="Txt_tlf_oficina_anxrpg" name="Txt_tlf_oficina_anxrpg" >    

      </div>
      <div class="Botonesreprogramar2"></div>
  </div>

  <div style="display:flex;justify-content:space-around	;">   
  <input type="button"  class="btn btn btn-success btn-sm "  id="Cmd_guardarpgr" name="Cmd_guardarpgr"  onclick="Cmd_guardarrpg_Click();" value="Guardar"> 
  <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="CmdCancelarrpg" name="CmdCancelarrpg" onClick="CmdCancelarrpg_Click" value="Salir">
  
  </div>  
`;

}






export function  Frm_encuesta_dolor_abdominal_formulario(codigo,tipoencuesta,pac_no_contesta) {

  return `
  <style> 
  .Frm_encuesta_dolor_abdominal_formulario {
    color:black;
    font-size: 1.7vh;
    display: grid;
    margin-top: 10px;
    --grid-template-rows: 1.5fr 1.1fr 1fr 1.1fr 0.3fr;
    grid-auto-columns: 1fr;
    gap: 0vh 2vh;
    grid-auto-flow: row;
  }
  .Frm_encuesta_dolor_abdominal_formulario  input[type="text"]{
  width:7vw;
  height:min-content;
  }
  .DatosAtencion {
    border:1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
     
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . . . . . ."
      ". . . . . . . ."
      ". . . . . . . ."
      ". . . . . . . .";
    grid-area: 1 / 1 / 2 / 2;
  }
   
  
  .Pregunta1 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
      }
   
  .Pregunta2 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
    }
  .Pregunta3 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
    }
  .Pregunta4 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
    }
  .Pregunta5 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
    }
  .Pregunta6 {
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
  }
  .Pregunta7 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
    }
  h6{
    font-size:1.5vh;
  }
  .labelpregunta{
    font-size:1.6vh;
    font-weight:bold;

  }
  </style>
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> FORMULARIO REGISTRO DE ENCUESTA DOLOR ABDOMINAL</h6><button type="button"  id="cancelarFrm_encuesta_dolor_abdominal_formulario" class="cancelarmodal btn-xs btn-danger">X</button></div>
  
  <div class="Frm_encuesta_dolor_abdominal_formulario">
    <div class="DatosAtencion">
    <h6 style="width:15vw;background-color:white;fon-weight:bold;grid-column:1/9;    margin-top: -1.6vh; margin-left: 1vw; padding: 0 10px; ">Datos de la atencion</h6>
    <label id ="Label1">Atencion:</label><input   type="text" disabled id="Txt_atencion" name="Txt_atencion" value="${codigo}" ><input   type="hidden"   id="txt_tipoencuesta" name="txt_tipoencuesta" value="${tipoencuesta}" >
    <label id ="Label15">Edad:</label><input   type="text" disabled id="Txt_edad" name="Txt_edad" >
    <label id ="Label5">Doctor:</label><input style="grid-column:6/9;width:100%" disabled  type="text" id="Txt_doctor" name="Txt_doctor" > 
    <label id ="Label2">Paciente:</label><input  style="grid-column:2/5;width:100%" type="text" disabled id="Txt_pac" name="Txt_pac" ><input style="display:none"  type="text" id="Txt_cod_tit" name="Txt_cod_tit" >
    <label id ="Label16">Telefono:</label><input   type="text"  disabled id="Txt_telef" name="Txt_telef" >
    <label id ="Label17">Celular:</label><input   type="text" id="Txt_cel" name="Txt_cel" >
    <label id ="Label19">Seguro:</label><input  style="grid-column:2/5;width:100%" type="text" disabled id="Txt_grupo" name="Txt_grupo" >
    <input   type="hidden" id="txt_dirrec" name="txt_dirrec" >
    <input   type="hidden" id="txt_pac_no_contesta value="${pac_no_contesta}" >

    <label id ="Label10">Encuestado :</label>
    <select   name = "cboencuestado" id="cboencuestado">
              <option value = "ABUELO(A)">ABUELO(A)</option>
              <option value = "CONYUGE">CONYUGE</option>
              <option value = "CUÑADO(A)">CUÑADO(A)</option> 
              <option value = "HERMANO(A)">HERMANO(A)</option> 
              <option value = "HIJO(A)">HIJO(A)</option> 
              <option value = "(M) PADRE">(M) PADRE</option> 
              <option value = "NANA">NANA</option> 
              <option value = "OTRO">OTRO</option> 
              <option value = "PACIENTE">PACIENTE</option> 
              <option value = "PRIMO">PRIMO</option> 
              <option value = "SOBRINO">SOBRINO</option> 
              <option value = "SUEGRO">SUEGRO</option> 
              <option value = "TIO">TIO</option> 

    </select>
    <div></div><div></div>
    <label id ="Label4">Negocio:</label><input  disabled  type="text" id="Txt_negocio" name="Txt_negocio" >
    <label id="Lbl_vip" style ="grid-column:4/9"  ></label>
    <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_ficha_tablet" name="Cmd_ficha_tablet"  onclick ="Cmd_ficha_tablet_Click(${codigo});" value="Historia Clinica"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_direccion" name="Cmd_direccion"  onclick ="modalFrm_Regedit_dir_pac(document.getElementById('Txt_cod_tit').value);" value="Direcciones"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_laboratorio" name="Cmd_laboratorio"  onclick ="modaldetalle(${codigo})" value="Laboratorio"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_medicamentos" name="Cmd_medicamentos"  onclick ="modalmedicamentos(${codigo})" value="Medicamentos"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_diagnosticos" name="Cmd_diagnosticos"  onclick ="modaldiagnosticos(${codigo})" value="Diagnosticos"  > 
   <select   name = "cboseguimientoencuesta" id="cboseguimientoencuesta"  onchange="seleccionarOpcion();">
   <option value = "EN SEGUIMIENTO">EN SEGUIMIENTO</option>
   <option value = "MAD CON DERIVACION A CLINICA">MAD CON DERIVACION A CLINICA</option>
   <option value = "MAD RECHAZADO">MAD RECHAZADO</option> 
   <option value = "MAD HOSPITALIZADO">MAD HOSPITALIZADO</option> 
   <option value = "MAD HOSPITALIZADO QUIRURGICO">MAD HOSPITALIZADO QUIRURGICO</option> 
   <option value = "MAD UME, MAD RECHAZO">MAD UME, MAD RECHAZO</option> 
   <option value = "MAD DISCONFORME">MAD DISCONFORME</option> 
   <option value = "MAD DERIVACION A PROGRAMAS">MAD DERIVACION A PROGRAMAS</option> 
   <option value = "CERRADO">CERRADO</option> 
   <option value = "FRUSTRO">FRUSTRO</option>  

</select>

     </div>
     
    <div class="Pregunta1">
    <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
    Pregunta 1
    </div>
    <div>
    <label class="labelpregunta"  id="Label1">¿Intensidad de dolor?</label>
    <br>
    <input type = "checkbox"     id ="pregunta1aumento" onclick="pregunta1aumento_click();" ><label for ="pregunta1aumento">Aumento</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"    id ="pregunta1disminucion" onclick="pregunta1disminucion_click();"><label for ="pregunta1disminucion">Disminucion</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"     id ="pregunta1semantiene" onclick="pregunta1semantiene_click();" ><label for ="pregunta1semantiene">Se mantiene</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"     id ="pregunta1sindolor" onclick="pregunta1sindolor_click();" ><label for ="pregunta1sindolor">Sin dolor</label>
    </div>
    </div>
  
    <div class="Pregunta2">
    <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
    Pregunta 2
    </div>
    <div>
   
  <label class="labelpregunta"   id="Label2">¿Característica del dolor?</label>
  <br>
  <input type = "checkbox"  id ="pregunta2continuo" onclick="pregunta2continuo_click();" ><label for ="pregunta2continuo">Continuo</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type = "checkbox"   id ="pregunta2intermitente" onclick="pregunta2intermitente_click();"><label for ="pregunta2intermitente">Intermitente</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type = "checkbox"    id ="pregunta2localizado" onclick="pregunta2localizado_click();"><label for ="pregunta2localizado">Localizado</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type = "checkbox"  id ="pregunta2difuso" onclick="pregunta2difuso_click();"><label for ="pregunta2difuso">Difuso</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type = "checkbox"     id ="pregunta2noaplica" onclick="pregunta2noaplica_click()" ><label for ="pregunta2noaplica">No Aplica</label>
  </div>
  </div>
  
  <div class="Pregunta3">
  <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
  Pregunta 3
  </div>
  <div>
    <label  class="labelpregunta"  id="Label3">¿Tomó algún otro tratamiento adicional al indicado por MAD?</label>
    <br>
    <input type = "checkbox"   id ="pregunta3si" onclick="pregunta3si_click();"><label for ="pregunta3si">Si</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"   id ="pregunta3no" onclick="pregunta3no_click();document.getElementById('pregunta3otros').style.display = 'none';"><label for ="pregunta3no">No</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
    <textarea style="display:none"  style ="text-transform:uppercase;"  name ="pregunta3otros"  id ="pregunta3otros" onkeyup="pregunta3otros_click();" cols=40 rows=2 ></textarea>

    </div>
  </div>
  
  <div class="Pregunta4">
  <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
  Pregunta 4
  </div>
  <div> 
    <label class="labelpregunta"  id="Labe4">Localizacion del dolor</label>
    <br>
    <input type = "checkbox"  id ="pregunta4abdomensuperior"  onclick="pregunta4abdomensuperior_click();"><label for ="pregunta4abdomensuperior">Abdomen superior</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"  id ="pregunta4abdomeninferior"  onclick="pregunta4abdomeninferior_click();"><label for ="pregunta4abdomeninferior">Abdomen inferior</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"  id ="pregunta4noaplica" onclick="pregunta4noaplica_click();" ><label for ="pregunta4noaplica">No Aplica</label>
    </div>
    </div>
    <div class="Pregunta5">
    <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
    Pregunta 5
    </div>
    <div>
    <label class="labelpregunta"  id="Labe4">¿Síntomas asociados?</label>
    <br>
    <input type = "checkbox"  id ="pregunta5fiebre"  onclick="pregunta5fiebre_click();"><label for ="pregunta5fiebre">Fiebre</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"  id ="pregunta5apetitodisminuido"  onclick="pregunta5apetitodisminuido_click();"><label for ="pregunta5apetitodisminuido">Apetito disminuido</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"   id ="pregunta5diarreaestrenimiento"  onclick="pregunta5diarreaestrenimiento_click();"><label for ="pregunta5diarreaestrenimiento">Diarrea/Estreñimiento</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"   id ="pregunta5nauseasvomitos"  onclick="pregunta5nauseasvomitos_click();"><label for ="pregunta5nauseasvomitos">Nauseas/Vómitos</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"     id ="pregunta5noaplica" onclick="pregunta5noaplica_click();" ><label for ="pregunta5noaplica">No Aplica</label>
    </div>
    </div>
    <div class="Pregunta6">
    <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
    Pregunta 6
    </div>
    <div>
    <label class="labelpregunta"  id="Labe4">¿Alteración del estado de conciencia?</label>
    <br>
    <input type = "checkbox"   id ="pregunta6si"  onclick="pregunta6si_click();"><label for ="pregunta6si">Si</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type = "checkbox"   id ="pregunta6no"  onclick="pregunta6no_click();"><label for ="pregunta6no">No</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 
    </div>
    </div>
    <div class="Pregunta7">
    <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
    Pregunta 7
    </div>
    <div>
    <label class="labelpregunta"  id="Labe4">¿Otros?</label>
    <br>
    <textarea  style ="text-transform:uppercase;" cols= 100 rows = 2 name ="pregunta7"  onkeyup="pregunta7_click();" id ="pregunta7" ></textarea> 
    </div>
    </div>
    <div>
    <table border = 1>
    <thead>
    <tr>DETALLE SMS</tr>
    <tr>
      <th>N°</th>
      <th>NUMERO</th>
      <th>FECHA</th>
    </tr>
    </thead>
    <tbody id="tbodysms" >

    </tbody>
    </table>
    </div>
    <div class="botones">

    <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_Paciente_no_contesta" name="Cmd_Paciente_no_contesta"  onclick ="Cmd_Paciente_no_contesta_Click();" value="Paciente no contesta"  > 
    <script>
    
      document.getElementById('Cmd_Paciente_no_contesta').style.visibility = "hidden";
    
    </script>
    <input type="button"  class="btn btn btn-success btn-sm" id="Command1" name="Command1"  onclick ="Command1_Click();" value="Guardar Encuesta"  > 

    <input type="button"  class="btn btn btn-success btn-sm"  id="btnseguimiento" name="btnseguimiento"  onclick ="cmdSeguimiento_Click1();" value="Seguimiento"  > 
    <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Cmd_salir" name="Cmd_salir" value="Salir"> 
    </div>
    
  
  </div>
  
  `;
 
 }
  



 export function  Frm_encuesta_respiratorio_formulario(codigo,tipoencuesta) {

  return `
  <style> 
  .Frm_encuesta_respiratorio_formulario {
    color:black;
    font-size: 1.7vh;
    display: grid;
    margin-top: 10px;
    --grid-template-rows: 1.5fr 1.1fr 1fr 1.1fr 0.3fr;
    grid-auto-columns: 1fr;
    gap: 0vh 2vh;
    grid-auto-flow: row;
  }
  .Frm_encuesta_respiratorio_formulario  input[type="text"]{
  width:6vw;
  height:min-content;
  }
  .DatosAtencion {
    border:1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
     
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . . . . . ."
      ". . . . . . . ."
      ". . . . . . . ."
      ". . . . . . . .";
    grid-area: 1 / 1 / 2 / 2;
  }
   
  
  .Pregunta1 {  
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
      }
   
  .Pregunta2 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
  }
  .Pregunta3 { 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
  }
  .Pregunta4{ 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;;
  }
  .Pregunta5{ 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
  }
  .Pregunta6{ 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
  }
  .Pregunta7{ 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
  }
  .Pregunta8{ 
    display:grid;
    grid-template-columns:0.5fr 1.5fr;
    border:1px solid black;
  }
  h6{
    font-size:1.5vh;
  }
  .labelpregunta{
    font-size:1.6vh;
    font-weight:bold;

  }
  </style>
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> FORMULARIO REGISTRO DE ENCUESTA RESPIRATORIO</h6><button type="button"  id="cancelarFrm_encuesta_dolor_abdominal_formulario" class="cancelarmodal btn-xs btn-danger">X</button></div>
  
  <div class="Frm_encuesta_respiratorio_formulario">
    <div class="DatosAtencion">
    <h6 style="width:15vw;background-color:white;fon-weight:bold;grid-column:1/9;    margin-top: -1.6vh; margin-left: 1vw; padding: 0 10px; ">Datos de la atencion</h6>
    <label id ="Label1">Atencion:</label><input   type="text" disabled id="Txt_atencion" name="Txt_atencion" value="${codigo}" ><input   type="hidden"   id="txt_tipoencuesta" name="txt_tipoencuesta" value="${tipoencuesta}" >
    <label id ="Label15">Edad:</label><input   type="text" disabled id="Txt_edad" name="Txt_edad" >
    <label id ="Label5">Doctor:</label><input style="grid-column:6/9;width:100%" disabled  type="text" id="Txt_doctor" name="Txt_doctor" > 
    <label id ="Label2">Paciente:</label><input  style="grid-column:2/5;width:100%" type="text" disabled id="Txt_pac" name="Txt_pac" ><input style="display:none"  type="text" id="Txt_cod_tit" name="Txt_cod_tit" >
    <label id ="Label16">Telefono:</label><input   type="text"  disabled id="Txt_telef" name="Txt_telef" >
    <label id ="Label17">Celular:</label><input   type="text" id="Txt_cel" name="Txt_cel" >
    <label id ="Label19">Seguro:</label><input  style="grid-column:2/5;width:100%" type="text" disabled id="Txt_grupo" name="Txt_grupo" >
    <label id ="Label10">Encuestado :</label>
    <select   name = "cboencuestado" id="cboencuestado">
              <option value = "ABUELO(A)">ABUELO(A)</option>
              <option value = "CONYUGE">CONYUGE</option>
              <option value = "CUÑADO(A)">CUÑADO(A)</option> 
              <option value = "HERMANO(A)">HERMANO(A)</option> 
              <option value = "HIJO(A)">HIJO(A)</option> 
              <option value = "(M) PADRE">(M) PADRE</option> 
              <option value = "NANA">NANA</option> 
              <option value = "OTRO">OTRO</option> 
              <option value = "PACIENTE">PACIENTE</option> 
              <option value = "PRIMO">PRIMO</option> 
              <option value = "SOBRINO">SOBRINO</option> 
              <option value = "SUEGRO">SUEGRO</option> 
              <option value = "TIO">TIO</option> 
    </select>
    <div></div><div></div>
    <label id ="Label4">Negocio:</label><input  disabled  type="text" id="Txt_negocio" name="Txt_negocio" >
    <label id="Lbl_vip" style ="grid-column:4/9"  ></label>
    <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_ficha_tablet" name="Cmd_ficha_tablet"  onclick ="Cmd_ficha_tablet_Click(${codigo});" value="Historia Clinica"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_direccion" name="Cmd_direccion"  onclick ="modalFrm_Regedit_dir_pac(document.getElementById('Txt_cod_tit').value);" value="Direcciones"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_laboratorio" name="Cmd_laboratorio"  onclick ="modaldetalle(${codigo})" value="Laboratorio"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_medicamentos" name="Cmd_medicamentos"  onclick ="modalmedicamentos(${codigo})" value="Medicamentos"  > 
   <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_diagnosticos" name="Cmd_diagnosticos"  onclick ="modaldiagnosticos(${codigo})" value="Diagnosticos"  > 
   <select   name = "cboseguimientoencuesta" id="cboseguimientoencuesta">
   <option value = "EN SEGUIMIENTO">EN SEGUIMIENTO</option>
   <option value = "MAD CON DERIVACION A CLINICA">MAD CON DERIVACION A CLINICA</option>
   <option value = "MAD RECHAZADO">MAD RECHAZADO</option> 
   <option value = "MAD HOSPITALIZADO">MAD HOSPITALIZADO</option> 
   <option value = "MAD HOSPITALIZADO QUIRURGICO">MAD HOSPITALIZADO QUIRURGICO</option> 
   <option value = "MAD UME, MAD RECHAZO">MAD UME, MAD RECHAZO</option> 
   <option value = "MAD DISCONFORME">MAD DISCONFORME</option> 
   <option value = "MAD DERIVACION A PROGRAMAS">MAD DERIVACION A PROGRAMAS</option> 
   <option value = "CERRADO">CERRADO</option> 
   <option value = "FRUSTRO">FRUSTRO</option>  

</select>
     </div>
     
     <div class="Pregunta1">
     <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
     Pregunta 1
     </div>
     <div>
     <label class="labelpregunta"  id="Label1">DISNEA?</label>
     <br>
     <input type = "checkbox"  onclick="pregunta1sir_click();" id ="pregunta1sir" ><label for ="pregunta1sir">SI</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"  onclick="pregunta1nor_click();"  id ="pregunta1nor" ><label for ="pregunta1nor">NO</label><br>
     </div>
     </div>

     <div class="Pregunta2">
    <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
    Pregunta 2
    </div>
    <div>
    <label class="labelpregunta"   id="Label2">DOLOR DE PECHO AL RESPIRAR O TOSES?</label>
     <br>
     <input type = "checkbox"   id ="pregunta2sir" onclick="pregunta2sir_click();"><label for ="pregunta2sir">SI</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"   id ="pregunta2nor" onclick="pregunta2nor_click();"><label for ="pregunta2nor">NO</label><br>
  
     </div>
     </div>
   
     <div class="Pregunta3">
     <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
     Pregunta 3
     </div>
     <div>
      <label  class="labelpregunta"  id="Label3">CARACTERÍSTICAS DE LA TOS</label>
     <br>
     <input type = "checkbox"    id ="pregunta3productivar"  onclick="pregunta3productivar_click();" ><label for ="pregunta3productivar">Productiva.</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"    id ="pregunta3disfonicar"  onclick="pregunta3disfonicar_click();"  ><label for ="pregunta3disfonicar">Disfonica.</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"  id ="pregunta3exigenter" onclick="pregunta3exigenter_click();"  ><label for ="pregunta3exigenter" >Exigente.</label>
     
  </div>
  </div>
   
  <div class="Pregunta4">
  <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
  Pregunta 4
  </div>
  <div>
  <label class="labelpregunta"  id="Labe14">¿RUIDOS RESPIRATORIOS?</label>
     <br>
     <input type = "checkbox"  id ="pregunta4sibilantesr"  onclick="pregunta4sibilantesr_click();"><label for ="pregunta4sibilantesr">SIBILANTES</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"  id ="pregunta4roncantesr"  onclick="pregunta4roncantesr_click();"><label for ="pregunta4roncantesr">RONCANTES</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
  </div>
  </div>

  <div class="Pregunta5">
  <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
  Pregunta 5
  </div>
  <div>
  <label class="labelpregunta"   id="Label5">¿FIEBRE MAYOR DE 03 DÍAS? </label>
     <br>
     <input type = "checkbox"    id ="pregunta5sir"  onclick="pregunta5sir_click();"><label for ="pregunta5sir">SI</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"  id ="pregunta5nor"  onclick="pregunta5nor_click();"><label for ="pregunta5nor">NO</label><br>
 
     </div>
     </div>

     <div class="Pregunta6">
     <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
     Pregunta 6
     </div>
     <div>

     <label class="labelpregunta"   id="Label6">¿ALTERACIÓN DEL ESTADO DE CONCIENCIA? </label>
     <br>
     <input type = "checkbox"  id ="pregunta6sir" onclick="pregunta6sir_click();"><label for ="pregunta6sir">SI</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"  id ="pregunta6nor" onclick="pregunta6nor_click();"><label for ="pregunta6nor">NO</label><br>
   
  </div>
  </div>
  <div class="Pregunta7">
  <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
  Pregunta 7
  </div>
  <div> 
     <label class="labelpregunta"   id="Label7">¿EXTENSIÓN DE MEDICINAS?</label>
     <br>
     <input type = "checkbox"    id ="pregunta7sir" onclick="pregunta7sir_click();" ><label for ="pregunta7sir">SI</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <input type = "checkbox"    id ="pregunta7nor" onclick="pregunta7nor_click();"><label for ="pregunta7nor">NO</label><br>
    
  </div>
  </div>

  <div class="Pregunta8">
  <div style="display:flex;align-items: center;justify-content: space-around;border:1px solid black">
  Pregunta 8
  </div>
  <div>     <label class="labelpregunta"   id="Label8">OTROS </label>
     <br>
     <textarea  style ="text-transform:uppercase;"  cols= 40 rows = 2  id ="pregunta8r" onkeyup="pregunta8r_click();" ></textarea> 
  
     </div>
     </div>

    <div>
    <table border = 1>
    <thead>
    <tr>DETALLE SMS</tr>
    <tr>
      <th>N°</th>
      <th>NUMERO</th>
      <th>FECHA</th>
    </tr>
    </thead>
    <tbody id="tbodysms" >

    </tbody>
    </table>
    </div>
    <div class="botones">
    <input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_Paciente_no_contesta" name="Cmd_Paciente_no_contesta"  onclick ="Cmd_Paciente_no_contesta_Click();" value="Paciente no contesta"  > 
    <input type="button"  class="btn btn btn-success btn-sm" disabled id="Command1" name="Command1"  onclick ="Command1_Click_respiratorio();" value="Guardar Encuesta"  > 
  
    <input type="button"  class="btn btn btn-success btn-sm"  id="btnseguimiento" name="btnseguimiento"  onclick ="cmdSeguimiento_Click();" value="Seguimiento"  > 
    <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Cmd_salir" name="Cmd_salir" value="Salir"> 
    </div>
    
  
  </div>
  
  `;
 
 }








 export function Txt_Dr_Change(val){
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT trim(a.cod_doc) cod_doc, a.nom_doc FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c, m_doctorxtipo_doctor d WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.cod_doc = d.cod_doc   AND a.activi = true AND c.cod_esp = '" + val + "'  AND d.cod_tipo_doctor = '" +  document.getElementById('Txt_especialidadrpg').cod_tipo_doctor + "' ORDER BY a.nom_doc ASC" 
    })
  }).then(response => response.json())
    .then(function (Adata_dr) {
      var options ;
      if(Adata_dr.length>0) {
         options = `<option value=''></option>` + Adata_dr.map(person => `<option value="${person.cod_doc}">${person.nom_doc}</option>`).join("\n");
      } 
       document.getElementById('Txt_Drrpg').innerHTML = options; 
       document.getElementById('Txt_Drrpg').value = (document.getElementById('Txt_especialidadrpg').cod_doc??='').trim(); 
 
    }).catch(error => {
      console.log(error);
    });
}


export   function Txt_distritorpg_Change(val){

    fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT cod_prov FROM VW_FILTRO_DISTRITO where cod_dis='"+ val+"'" 
      })

    }).then(response => response.json())
    .then(function (AData_Distrito ) {
      if(AData_Distrito.length>0) {   
          document.getElementById('Txt_provinciarpg').value =  AData_Distrito[0].cod_prov.trim();
                    
            fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: "SELECT * FROM m_direcciones WHERE cod_tit = '" +  document.getElementById('Txt_distritorpg').cod_tit.trim()  +  "' AND cod_dis = '"  + val + "'"
                })

              }).then(response => response.json())
              .then(function (Adata_m_direcciones ) {
                if(Adata_m_direcciones.length>0) {   
                     var options;
                    options = Adata_m_direcciones.map(person => `<option value="${person.des_dir}">`).join("\n");
   
                   document.getElementById('direccionesrpg').innerHTML = options;
                   document.getElementById('Txt_direccionrpg').value = Adata_m_direcciones[0].des_dir.trim();
                }
              }).catch(error => {
                console.log(error);
              }); 
       }
    }).catch(error => {
      console.log(error);
    }); 
}


export function Chk_editar_direccionrpg_Click(val){
 
  if(val==true ){
    document.getElementById('Txt_distritorpg').disabled = false;
    document.getElementById('Txt_direccionrpg').disabled = false;
    document.getElementById('txt_referenciarpg').disabled = false;
    document.getElementById('Txt_tlf_casarpg').disabled = false;
    document.getElementById('Txt_tlf_oficinarpg').disabled = false;
    document.getElementById('Txt_tlf_oficina_anxrpg').disabled = false;
       
      document.getElementById('Txt_distritorpg').focus();
  
  }else{
 
  document.getElementById('Txt_distritorpg').disabled = true;
  document.getElementById('Txt_direccionrpg').disabled = true;
  document.getElementById('txt_referenciarpg').disabled = true;
  document.getElementById('Txt_tlf_casarpg').disabled = true;
  document.getElementById('Txt_tlf_oficinarpg').disabled = true;
  document.getElementById('Txt_tlf_oficina_anxrpg').disabled = true;
  
   

  }
} 


  export function  Txt_direccionrpg_change(val){
    fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "SELECT * FROM m_direcciones WHERE cod_tit = '" +  document.getElementById('Txt_distritorpg').cod_tit.trim()   +  "' AND cod_dis = '"  + document.getElementById('Txt_distritorpg').value.trim() + "' and des_dir like '" + val + "%'" 
        })
  
      }).then(response => response.json())
      .then(function (Adata_m_direcciones ) {
        if(Adata_m_direcciones.length>0) {   
          document.getElementById('Txt_direccionrpg').Tag = "DirBD";
          document.getElementById('Txt_tlf_casa') = Adata_m_direcciones[0].tlf_casa;
          document.getElementById('Txt_tlf_oficina') = Adata_m_direcciones[0].tlf_oficina;
          document.getElementById('Txt_Referencia') = Adata_m_direcciones[0].ref_dir;
          document.getElementById('Txt_tlf_oficina_anx') = Adata_m_direcciones[0].tlf_oficina_anx;
         }else{
          document.getElementById('Txt_direccionrpg').Tag = "DirNueva";
          document.getElementById('Txt_tlf_casa') ='';
          document.getElementById('Txt_tlf_oficina') =  '';
          document.getElementById('Txt_Referencia') = '';
          document.getElementById('Txt_tlf_oficina_anx') = '';
         }
      }).catch(error => {
        console.log(error);
      }); 

  
}


