import {P_VNRyCANCELAR_CM,EJECUTAR_SENTENCIA_BD_TABLET, getusuario,Execute,REGISTRA_T_LLAMADAS,REGISTRA_CM_AUDITORIA,REGISTRA_AUDITORIA_LABORATORIO} from './module.js'; 
 var L_CodAte; 
 var l_estado_audi;
 var Adata_atencion =[];
var acepta_boleta;
var flg_cancelar=false;
 (function(){ 

  var query ="" ;
  query = "Select t.*, current_date ahora_f, current_time ahora_h ,g.*,pac.id_doc_id,pac.appat_pac,pac.nom_com , pac.apmat_pac , pac.nom_pac, pac.num_doc_id FROM t_tmpllamadas t join m_grupos  g on  t.cod_gru = g.cod_gru join m_pacientesdrmas pac on t.cod_tit = pac.cod_hia LEFT JOIN mae_documento_identidad id ON pac.id_doc_id = id.id_doc_id where cod_ate = " + document.getElementById('Txt_CodAte').value;
 
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query:  query            
    })
  }).then(response => response.json())
  .then(function(data) {
    Adata_atencion = data;
    var html = '';
    var i; 
     if (data.length >0){
 switch( parseInt(data[0].clasificacion_pac.trim())){
    case 1:
    case 2:
    case 200:
    case 201:
    case 202: 
    case 203:    //CRONICO y MAXISALUD, CRONICO DM, CRONICO ASMA, CRONICO HTA, CRONICO DISLIPIDEMIA
        
    if (data.contador_periodo == 1) {
      document.getElementById('Chk_ate_ref').style.display = "inline-block";
      document.getElementById('Chk_ate_ref').checked = false;
    }
  break;
  case 70:
      document.getElementById('Cmd_datos_siteds').style.visibility = 'visible';
      if(data[0].modo_atencion_medico == 2){
        document.getElementById('Cmd_eliminar').style.visibility = 'visible'; //pedrojesus15022022

      }

  break;
}
 

l_estado_audi = data[0].cm_estado;
document.getElementById('Txt_paciente').value = (data[0].nom_com).trim();

document.getElementById('DC_tipo_doc_id').value = (data[0].id_doc_id).trim();
document.getElementById('Txt_ap_pat').value = (data[0].appat_pac).trim();
document.getElementById('Txt_ap_mat').value = (data[0].apmat_pac).trim();
document.getElementById('Txt_nom_pac').value = (data[0].nom_pac).trim();
document.getElementById('Txt_Doc_id').value = (data[0].num_doc_id).trim();
  
document.getElementById('Txt_medico').value = (data[0].nom_doc).trim()  ;
  CARGA_DIRECCION(data[0].cod_tit ,  (data[0].cod_dir == 'null', "00", data[0].cod_dir) );
    }
     
     
   }).catch(error => {
    console.log(error);    
  });  
     

})();

function CARGA_DIRECCION(pCodTit , pCodDir ){
  var query ="";
  query = "SELECT * FROM vw_datos_paciente_direccion " +
    " WHERE cod_paciente = '" +  pCodTit +  "' AND cod_dir = '" + pCodDir + "' ORDER BY direccion ASC"; 
                             fetch('/modulo/Abre_Detalle/', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                query:  query            
                              })
                            }).then(response => response.json())
                            .then(function(data) {
                              var html = '';
                              var i; 
                              if (data.length >0){
                                document.getElementById('Txt_distrito').value =  data[0].departamento + " - " + data[0].provincia + " - " + data[0].distrito  ;
                                document.getElementById('Txt_direccion').value = (data[0].direccion).trim()  ;
 
                          
                          
                              }
                               
                               
                             }).catch(error => {
                              console.log(error);    
                            });  
                               

  
}



// ----------------------------------------------Añadir un objeto de atributos a un elemento------------------------//
const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr,attrObj[attr])
  }
};

// Crear elementos con atributos e hijo
const createCustomElement = (element,attributes,children) => {
  let customElement = document.createElement(element);
  if (children !== undefined) children.forEach(el => {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement,attributes);
  return customElement;
};

// ----------------------------------------------------Imprimir modales ------------------------------------------//
const printModal = content => {
  // crear contenedor interno
  const modalContentEl = createCustomElement('div', {
    id: 'ed-modal-content',
    class: 'ed-modal-content'
  }, [content]),
        
  // crear contenedor principal
  modalContainerEl = createCustomElement('div', {
   id: 'ed-modal-container',
   class: 'ed-modal-container'
  }, [modalContentEl]);
  
  // Imprimir el modal
  document.body.appendChild(modalContainerEl);
  //modalContainerEl.displ
  
  // Remover el modal
  const removeModal = () => document.body.removeChild(modalContainerEl);
  
  /* modalContainerEl.addEventListener('click', e => {
    if (e.target === modalContainerEl) removeModal();
  }) 
  document.querySelector('.cancelarmodal').addEventListener('click', e => {
    if (e.target === document.querySelector('.cancelarmodal')) removeModal();
  });*/
  let elementsArray = document.querySelectorAll(".cancelarmodal");

elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
      removeModal();
    });
});
  
}  
 

function filatabla(p,tabla) {
  var table = document.getElementById(tabla);

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";      
   
 } 
  p.style.backgroundColor = "turquoise";            
}
 
 function tabletoarrayjson(table) {
  var data = [];
  var rowData = [];
   
  for (var i=0; i<table.length; i++) {
  
      data.push(Object.values(table[i]));
    
   }       
   
  return data;
  }
  function s2ab(s) {   
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
  } 



window.Command1_Click = async function(){

var rst_aux            ;
var rs_buscaser         ;
var rst_TtmpLabo        ;

var CodAtencion         ;
var fecha_1ra_ate       ;
var fecha_limite        ;
var crea_ate_sig        ;
var n_ate_ant           ;
var contar_ate          ;
var fecha_ini           ;
var fecha_max           ;
var CodServLab          ;
var factor              ;
var en_consulta_tablet  ;
var str_msg             ;
var lrs_sev_tablet      ;
var v_fecha_sis         ;
var v_fecha_tablet      ;
var v_fecha_ate         ;
var rst_doc_pv          ;
var fec_hora_actual     ;
var cod_doc_tmp         ;
var nom_doc_tmp         ;
var cod_esp_tmp         ;
var cont_sig_ate        ;

cod_doc_tmp = ""
nom_doc_tmp = ""
cod_esp_tmp = ""
        
//v_fecha_ate = Adata_atencion[0].fec_ate - 1, "yyyy-mm-dd");
v_fecha_ate = Adata_atencion[0].fec_ate ;
v_fecha_sis = Adata_atencion[0].ahora_f ;

//if(v_fecha_sis < v_fecha_ate ){
//    MsgBox "No se puede culminar la atención por que el día actual es menor a fecha de la atención, cambie la fecha-hora de la atención antes de realizar esta acción", vbInformation
//   Unload Me
//    Exit Sub
//end if


        
//if(permite_ingreso(69) = True ){
    //USUARIO SUPERVISOR TIENE ACCESO
//}else{
    //OTRO USUARIO
    
   /*  switch( Adata_atencion.Recordset!cod_estado
        case 7
            if(MsgBox("Se registró llegada a domicilio desde la Tablet, Debe esperar a que médico confirme fin del servicio o ¿Desea finalizarlo de todas maneras?", vbYesNo) = vbNo ){
                Unload Me
                Exit Sub
            }
        case 8
           
            MsgBox "El medico se encuentra registrando la ficha medica en la tablet, Debe esperar a que médico confirme fin del servicio", vbInformation
            Unload Me
            Exit Sub
            
        case 9
            if(G_db_tablet.State = 1 ){
                G_db_tablet.Close
            }
            
            G_db_tablet.Open s_cnstr
            Call Abre_Recordset_tablet(lrs_sev_tablet, "SELECT tiempo FROM atencion_estado WHERE cod_estado = 9 AND cod_atencion = " & Adata_atencion.Recordset!cod_ate)
            if(Not lrs_sev_tablet.EOF ){
                v_fecha_sis = Format(Now, "yyyy-mm-dd HH:mm")
                v_fecha_tablet = Format(lrs_sev_tablet!tiempo, "yyyy-mm-dd HH:mm")
                if(v_fecha_sis < v_fecha_tablet ){
                    MsgBox "Tiene que esperar " & Format(TimeValue(v_fecha_sis) - TimeValue(v_fecha_tablet), "HH:mm") & " minuto(s) para poder culminar la atención", vbInformation
                    Unload Me
                    Exit Sub
                }
                
            }
            G_db_tablet.Close
    End Select
    
    str_msg = ""
    if(Adata_atencion.Recordset!cm_estado = "7" Or Adata_atencion.Recordset!cm_estado = "R7" ){
        if(Date - CDate(Format(Adata_atencion.Recordset!fecoplla_ate, "dd-mm-yyyy")) = 0 ){
            switch( Adata_atencion.Recordset!clasificacion_pac
                case 1, 2, 7
                    'cronicos a 5 minutos
                    if(Format(TimeValue(Format(Time, "HH:mm:ss")) - TimeValue(Format(Adata_atencion.Recordset!horoplla_ate, "HH:mm:ss")), "HH:mm:ss") <= Format("00:05:00", "HH:mm:ss") ){
                        str_msg = "Aún no se puede pasar de estado a finalizado porque la atención tiene menos de 5 minutos desde que llego el médico"
                    }
                case 204, 205, 24, 25
                    'para finalizar los delivery y complejos no hay restriccion
                case Else
                    'Agudos con 10 minutos
                    if(Format(TimeValue(Format(Time, "HH:mm:ss")) - TimeValue(Format(Adata_atencion.Recordset!horoplla_ate, "HH:mm:ss")), "HH:mm:ss") <= Format("00:10:00", "HH:mm:ss") ){
                        str_msg = "Aun no se puede pasar de estado a finalizado porque la atención tiene menos de 10 minutos desde que llego el médico"
                    }
            End Select
            
            if(str_msg <> "" ){
                MsgBox str_msg, vbExclamation
                Exit Sub
            }
        }
    } 
}*/

acepta_boleta = false

if( (new Date()).toISOString().slice(0,10) >=  "2018-11-01" ){
 
}else{
    /* if(Adata_atencion.Recordset!tar_ate > 0 And Trim(Adata_atencion.Recordset!cod_tipo_doctor) = "A" And Adata_atencion.Recordset!for_ate <> "C" ){
        frm_CM_registrar_boleta.Caption = "Registar boleta por Deducible"
        frm_CM_registrar_boleta.txttiposervicio.Text = "Atención"
        frm_CM_registrar_boleta.txtcodser.Text = Adata_atencion.Recordset!cod_ate
        frm_CM_registrar_boleta.Lbl_Copago.Caption = "Deducible"
        frm_CM_registrar_boleta.Txt_Copago.Text = Adata_atencion.Recordset!tar_ate
    
        Call Abre_Recordset(rs_buscaser, "select * from t_tmpllamadas where cod_ate = " & Adata_atencion.Recordset!cod_ate)
    
        frm_CM_registrar_boleta.DTPicker2 = rs_buscaser!fec_ate
    
        if((IsNull(rs_buscaser!flg_boleta) = True Or rs_buscaser!flg_boleta = False) And IsNull(rs_buscaser!flg_bolman) = True ){
            switch( rs_buscaser!tipo_doc_pago
                case "B"
                    frm_CM_registrar_boleta.Opt_bol.Value = True
                case "F"
                    frm_CM_registrar_boleta.Opt_fac.Value = True
                case Else
                    frm_CM_registrar_boleta.Opt_bol.Value = True
            End Select
            frm_CM_registrar_boleta.Show 1
        Else
            if(rs_buscaser!flg_boleta = True And Trim(rs_buscaser!flg_bolman) = "M" ){
                Call Verifica_bol_rgvta(Trim(rs_buscaser!cod_boleta))
                frm_CM_registrar_boleta.Show 1
            Else
                MsgBox "El servicio tiene una boleta automatica"
                Unload frm_CM_registrar_boleta
            }
        }
        rs_buscaser.Close
    
        'if(acepta_boleta = False ){
        '    MsgBox "Debe registrar la boleta manual"
        '    Exit Sub
        '}
    } */
}

document.getElementById('Command1').disabled = true;
document.body.style.cursor = 'progress';

if(Adata_atencion[0].cm_estado == "7" || Adata_atencion[0].cm_estado == "R7"){
   Execute ("UPDATE t_tmpllamadas SET cod_tipo_doctor = 'A', FECDIA_ATE = '" +  new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "', USUDIA_ATE = '"  + await getusuario() + "', accide = '',atencion_referencial = " + (document.getElementById('Chk_ate_ref').checked ==false? "'false'": "'true'") + " WHERE cod_ate = " + Adata_atencion[0].cod_ate)
/* Else
    G_db.Execute ("UPDATE t_tmpllamadas SET cod_tipo_doctor = 'A', Fecoplla_ate = '" & Format(Date, "yyyy-mm-dd") & "',Horoplla_ate= '" & Format(Time, "HH:mm:ss") & "', FECDIA_ATE = '" & Format(Date, "yyyy-mm-dd") & "',HORDIA_ATE = '" & Format(Time, "HH:mm:ss") & "', USUDIA_ATE = '" & Usuario & "', accide = '',atencion_referencial = " & IIf(Chk_ate_ref.Value = 0, "'False'", "'True'") & " WHERE cod_ate = " & Adata_atencion.Recordset!cod_ate)
End If
 */
}
if(flg_cancelar==true){
  await P_VNRyCANCELAR_CM('Frm_CM_confirma_fin',document.getElementById('Txt_CodAte').value.trim(), false);
}
  await EJECUTAR_SENTENCIA_BD_TABLET(Adata_atencion[0].cod_ate, "UPDATE atencion SET cod_estado = 9, finalizado_sm = 1 WHERE cod_atencion = " + Adata_atencion[0].cod_ate);

  Execute ("DELETE FROM t_rpg_cambios WHERE cod_ate  = " + Adata_atencion[0].cod_ate);

REGISTRA_T_LLAMADAS(document.getElementById('Txt_CodAte').value, "ATE");
REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value.trim(), l_estado_audi + "->8", "MEDICO: " + document.getElementById('Txt_medico').value.trim() + ", CONDUCTOR: " + (document.getElementById('Txt_conductor').value??='').trim(), "FIN DE LA CONSULTA MEDICA");


if (Adata_atencion[0].clasificacion_pac == 70 ){ //Or Adata_atencion.Recordset!clasificacion_pac = 2 Or Adata_atencion.Recordset!clasificacion_pac = 7 Or Adata_atencion.Recordset!clasificacion_pac = 200 Or Adata_atencion.Recordset!clasificacion_pac = 201 Or Adata_atencion.Recordset!clasificacion_pac = 202 Or Adata_atencion.Recordset!clasificacion_pac = 203 Then
    
   /*  If Adata_atencion.Recordset!cod_subclasif = 6 Then
        ' No realiza creacion del servicio para el proximo mes
    Else */
   
       // Call Abre_Detalle(Adata_atencion, "Select * FROM t_tmpllamadas where cod_ate = " & Val(Txt_CodAte.Text))
        
        // --cambio en la version 61
 /*        If Trim(Adata_atencion.Recordset!COD_ESP) = "006" Or Trim(Adata_atencion.Recordset!COD_ESP) = "010" Then
            'busca la atencion anterior
            
            If IsNull(Adata_atencion.Recordset!cod_ate_previa) = False Then
                Call Abre_Recordset(rst_aux, "select cod_doc, nom_doc ,cod_esp " _
                                           & " FROM t_tmpllamadas " _
                                           & " WHERE canc_ate is null AND cod_ate = " & Val(Adata_atencion.Recordset!cod_ate_previa))
                
                If Not rst_aux.EOF Then
                    cod_doc_tmp = Trim(rst_aux!cod_doc)
                    nom_doc_tmp = Trim(rst_aux!nom_doc)
                    cod_esp_tmp = Trim(rst_aux!COD_ESP)
                End If
            End If
        End If
         */
        
//VALIDA EL REGISTRO DE LOS DATOS DE SITEDS
var valida_siteds=false;
if(document.getElementById('Cmd_datos_siteds').style.visibility == 'visible' ){
    if(document.getElementById('TxtCodAut').value == "" ){
        
       await  fetch('/modulo/permite_ingreso', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        body: JSON.stringify({
        codigo: 120
        })
        
          }).then(response => response.json())
            .then(function (data) {
              if(data){
                            //SM - CONFIRMACION - EDITAR EL CODIGO DE SITEDS
                        /* if(confirm("Se generará un codigo de autorizacion como DR" + document.getElementById('Txt_CodAte') + "   ¿Desea continuar guardando de este modo?" ) == false ){
                            document.getElementById('Cmd_datos_siteds').focus();
                            return;
                        }else{
                            document.getElementById('TxtCodAut').value = "DR" +  document.getElementById('Txt_CodAte').value  ;
                        } */
              }else{
                alert ("Debe generar codigo de autorización SITEDS");
                 valida_siteds=true;
              }
            }).catch(error => {
              console.log(error);
            });
          if (valida_siteds) return;
    }else{
    
        if(document.getElementById('TxtCodAut').value.substr(0,2) == "DR" ){
             
            await  fetch('/modulo/permite_ingreso', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
            body: JSON.stringify({
            codigo: 120
            })
            
              }).then(response => response.json())
                .then(function (data) {
                  if(data){
                    if(confirm("Desea guardar el codigo de autorizacion como " + document.getElementById('TxtCodAut'))==false ){
                        return;
                    }
                  }else{
                    alert( "Debe generar codigo de autorización SITEDS");
                    valida_siteds=true;
                  }
                }).catch(error => {
                  console.log(error);
                });
                if (valida_siteds) return;

        }else{
            //VALIDACION DEL CODIGO DE AUTORIZACION QUE NO SE ENCUENTRE EN UNA ATENCION FINALIZADA ANTERIOR
            await fetch('/modulo/Abre_Detalle/', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                query: "SELECT cod_ate FROM t_tmpllamadas WHERE cod_ate <> " +  document.getElementById('Txt_CodAte').value + " AND cod_aut_prestacion = '" + document.getElementById('TxtCodAut').value + "'"
            
                })
            }).then(response => response.json())
                .then(function (rst_cod_aut) {
                if(rst_cod_aut.length>0){
                    alert("EL codigo de autorizacion debe de generarse por SITEDS, el registrado pertenece a la atencion " + rst_cod_aut[0].cod_ate);
                    return;
                }
          
            }).catch(error => {
                console.log(error);
            });
             
        }
    }
    
document.getElementById('Command1').disabled = true;
document.body.style.cursor = 'progress';
   // if(vf_flg_cod_autorizacion == false ){
    if(document.getElementById('Txt_CodAte').value == '' ){

    }else{
    
        //actualiza la tabla de SITEDS con el codigo de la atención
        await   fetch('/modulo/Execute/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "UPDATE h_siteds_documento_autorizacion SET cod_ate = " +  document.getElementById('Txt_CodAte').value   +  " WHERE CodigoAutorizacion = '" +  document.getElementById('TxtCodAut').value + "'"
            })
          }).then(response => response.json())
          .then( function(data) {
       
            if(data){
               
            } 
            
            
          }).catch(error => {
            console.log(error);    
          });

          await fetch('/modulo/Visor_SITEDS/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cod_ate :document.getElementById('Txt_CodAte').value.trim() 
            })
          }).then(response => response.json())
          .then(function(data) { 
            if(data){ 
            }  
          }).catch(error => {
            console.log(error);    
          }); 
        //para guardar el documento de autorizacion en las carpetas solicitadas
        //llama a la aplicacion VISOR DE SITEDS PARA GUARDAR EL DOCUMENTO EN LAS RUTAS SOLICITADAS (PROCESO 2)
        //Shell "W:\Visor_SITEDS\Visor_siteds.exe " & Trim(TxtCodAut.Text) & " " & Txt_CodAte.Text
    }
}
 
  
        rst_aux ={};
             
        rst_aux.prioridad = 0;
        rst_aux.cambio = 0;
        rst_aux.rzona = 0;
        rst_aux.rocup = 0;
        rst_aux.otro = 0;
        rst_aux.rcab = 0;
        rst_aux.abonado = 0;
        rst_aux.premio = 0;
        rst_aux.coaseguro = Adata_atencion[0].coaseguro;
        rst_aux.cm_den_cambio = 0;
        rst_aux.estado = 1;
        rst_aux.cm_estado = "0";
        rst_aux.cod_estado = 0;
        rst_aux.clasificacion_pac = Adata_atencion[0].clasificacion_pac;
          /*   if Adata_atencion[0].clasificacion_pac = 1 Then
                !cod_subclasif = Adata_atencion[0].cod_subclasif;
                // para sunat se considera como una primera consulta al enviar a la tablet
                If Adata_atencion[0].cod_subclasif = 2 Then
                    !primera_consulta = true;
                End If
            End If */
            rst_aux.cm_orden = 3;
            rst_aux.rhor = 0;
            rst_aux.cod_gru = Adata_atencion[0].cod_gru;
            rst_aux.nom_gru = Adata_atencion[0].nom_gru;
            rst_aux.cod_emp = Adata_atencion[0].cod_emp;
            rst_aux.nom_emp = Adata_atencion[0].nom_emp;
            rst_aux.cod_tit = Adata_atencion[0].cod_tit;
            rst_aux.nom_tit = Adata_atencion[0].nom_tit;
            rst_aux.cod_dep = Adata_atencion[0].cod_dep;
            rst_aux.nom_pac = Adata_atencion[0].nom_com;
            rst_aux.cod_dir = Adata_atencion[0].cod_dir;
            rst_aux.tlf_dir = Adata_atencion[0].tlf_dir;
            rst_aux.des_dir = Adata_atencion[0].des_dir;
            rst_aux.cod_dis = Adata_atencion[0].cod_dis;
            rst_aux.des_dis = Adata_atencion[0].des_dis;
            rst_aux.cod_prov = Adata_atencion[0].cod_prov;
            rst_aux.des_prov = Adata_atencion[0].des_prov;
            rst_aux.dis_dir = Adata_atencion[0].dis_dir;
            rst_aux.ref_dir = Adata_atencion[0].ref_dir;
            var date = new Date(Adata_atencion[0].fec_ate);
            (date.setDate(date.getDate() + 15))
            rst_aux.fec_ate = date.toISOString().slice(0,10);
   /*          Select Case Adata_atencion[0].clasificacion_pac
            
                 Case 1, 200, 201, 202, 203:
                    !fec_ate = DateAdd("d", 30, Adata_atencion[0].fec_ate)
                Case 2:
                    Select Case Trim(Adata_atencion[0].cod_emp)
                        Case "099938", "099939", "099940", "099941", "099942", "099943", "099944", "099945", "099946", "099947"
                            '30*3 meses = 90
                            !fec_ate = DateAdd("d", 90, Adata_atencion[0].fec_ate)
                        Case Else
                            !fec_ate = DateAdd("d", 30, Adata_atencion[0].fec_ate)
                    End Select
                Case 7:
                    !fec_ate = DateAdd("m", 6, Adata_atencion[0].fec_ate)
            End Select */
            
            
            rst_aux.hor_ate = Adata_atencion[0].hor_ate;
            rst_aux.cm_tlf_pac = Adata_atencion[0].cm_tlf_pac;
            rst_aux.usulla_ate = Adata_atencion[0].usulla_ate;
            rst_aux.tar_ate = Adata_atencion[0].tar_ate;
            rst_aux.sexo_ate = Adata_atencion[0].sexo_ate;
            rst_aux.edad_ate = Adata_atencion[0].edad_ate;
            rst_aux.sin_ate = Adata_atencion[0].sin_ate;
 /*            If cod_doc_tmp <> "" Then
                !cod_doc = cod_doc_tmp;
                !nom_doc = nom_doc_tmp;
                !COD_ESP = cod_esp_tmp;
            Else
                !cod_doc = Adata_atencion[0].cod_doc;
                !nom_doc = Adata_atencion[0].nom_doc;
            End If */
            rst_aux.for_ate = Adata_atencion[0].for_ate;
            //!cod_aut_prestacion = Adata_atencion[0].cod_aut_prestacion
            //!poliza_asegurado = Adata_atencion[0].poliza_asegurado
            rst_aux.cod_esp = Adata_atencion[0].cod_esp;
            rst_aux.cod_directo = Adata_atencion[0].cod_directo;
            //rst_aux.cod_tipo_doctor = Adata_atencion[0].cod_tipo_doctor;
            //rst_aux.cod_dr_solicitado = Adata_atencion[0].cod_dr_solicitado;
            rst_aux.cel_pac = Adata_atencion[0].cel_pac;
            rst_aux.cm_appat_pac = Adata_atencion[0].cm_appat_pac;
            rst_aux.cm_apmat_pac = Adata_atencion[0].cm_apmat_pac;
            rst_aux.cm_nom_pac = Adata_atencion[0].cm_nom_pac;
            rst_aux.cm_ref_dir = Adata_atencion[0].cm_ref_dir;
            rst_aux.usu_bloq = Adata_atencion[0].usu_bloq;
            rst_aux.cm_denominacion = "Exacto";
            rst_aux.segui_ate = false;
            rst_aux.flag = false;
            rst_aux.sb_ate = false;
            rst_aux.exi_ate = false;
            rst_aux.nova = false;
            rst_aux.vis_prog = false;
            rst_aux.obs48 = false;
            rst_aux.exp = false;
            rst_aux.activi = false;
            rst_aux.activi1 = false;
            rst_aux.bool_original = false;
            rst_aux.pac_vip = Adata_atencion[0].pac_vip;
            rst_aux.flg_reprogramada = false;
            rst_aux.feclla_ate = (new Date()).toISOString().slice(0,10);
            rst_aux.horlla_ate = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');
            rst_aux.f_prog = "Prg";
            rst_aux.flagmone = "S";
            rst_aux.f_soldoct = null;
            rst_aux.flg_directo = "S";
            rst_aux.cm_moneda_den = "S";
            rst_aux.flag_programada = null;
            rst_aux.cm_directa = true;
            rst_aux.cm_datos_completos = true;
            rst_aux.flg_cm_nueva = true;
            rst_aux.tipo_servicio = "ATE";
            rst_aux.cod_ate_previa = document.getElementById('Txt_CodAte').value;
            rst_aux.cod_aso = 0;
            rst_aux.tipo_servicio = "ATE";
            rst_aux.tipo_ate = "NORMAL";
            rst_aux.empresa_paciente = Adata_atencion[0].empresa_paciente;
            rst_aux.id_periodo_consulta = Adata_atencion[0].id_periodo_consulta;
            rst_aux.periodo_mes = Adata_atencion[0].periodo_mes;
            rst_aux.laboratorio_nutricion = Adata_atencion[0].laboratorio_nutricion;
  
            await fetch('/modulo/DACODATE/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(Adata_atencion)
            }).then(response => response.json())
              .then(function (data) {
              
                CodAtencion = data;
              }).catch(error => {
                console.log(error);
              });
            
           
            rst_aux.cod_ate = CodAtencion;
            
            if (parseInt(Adata_atencion[0].contador_periodo)  ==  10 ){
              rst_aux.contador_periodo = parseInt(Adata_atencion[0].contador_periodo) + 1;
              
              
              var laboinicial,laboa,unique;
              var Correlativo_Serv_Laboratorio;
              var examenescreados='';
              var rst_TtmpLabo = {};
              
                laboinicial = Adata_atencion[0].laboratorio_nutricion;
                laboinicial = laboinicial.replace('{','');
                laboinicial = laboinicial.replace('}','');
                laboa = laboinicial.split(',');
                unique = laboa.filter(function(elem, index, self) {
                    return index === self.indexOf(elem);
                });

                        rst_TtmpLabo.cod_aso = 0;
                        rst_TtmpLabo.cod_gru = Adata_atencion[0].cod_gru;
                        rst_TtmpLabo.cod_tit = Adata_atencion[0].cod_tit;
                        rst_TtmpLabo.nom_pac =  Adata_atencion[0].cm_nom_pac;
                        rst_TtmpLabo.cod_dir = Adata_atencion[0].cod_dir;
                        rst_TtmpLabo.cod_dis = Adata_atencion[0].cod_dis;
                        rst_TtmpLabo.cod_doc = Adata_atencion[0].cod_doc;
                        rst_TtmpLabo.estado = "0";
                        rst_TtmpLabo.tar_ate = 0;
                        rst_TtmpLabo.coaseguro = 0;
                        rst_TtmpLabo.for_ate = "E";
                        //!fecha_maxima = DateAdd("m", 4, CDate(rs_buscaser!fec_ate))
                        rst_TtmpLabo.fecha_maxima = new Date((new Date().setMonth(new Date().getMonth() + 1))).toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'})  ;
                        rst_TtmpLabo.cm_denominacion = "No Determ.";
                        rst_TtmpLabo.cod_ate = CodAtencion;
                        rst_TtmpLabo.cod_servicios = "1";
                        rst_TtmpLabo.tipo = "P";
                        rst_TtmpLabo.clasificacion = "T";
                        rst_TtmpLabo.fecha_creacion = new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}) ;
                        rst_TtmpLabo.hora_creacion =  new Date().toTimeString().slice (0,8) ;
                        //!fecha_servicio = DateAdd("m", 4, CDate(rs_buscaser!fec_ate));
                        rst_TtmpLabo.fecha_servicio = new Date((new Date().setDate(new Date().getDate() + 1))).toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}) ;
                        rst_TtmpLabo.cod_clasif = Adata_atencion[0].clasificacion_pac;
                        //rst_TtmpLabo.cod_subclasif = rs_buscaser!cod_subclasif;
                        rst_TtmpLabo.edad_pac = Adata_atencion[0].edad_ate;
                        await fetch('/modulo/Correlativo_Serv_Laboratorio/', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(Adata_atencion)
                        }).then(response => response.json())
                          .then(function (data) {
                          
                            Correlativo_Serv_Laboratorio = data;
                          }).catch(error => {
                            console.log(error);
                          }); 
                        rst_TtmpLabo.cod_serv_laboratorio = (Correlativo_Serv_Laboratorio);
                        rst_TtmpLabo.tabla='t_cab_lab_serv_laboratorio';
                        await fetch('/modulo/Executeinsert/', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(rst_TtmpLabo)
                        }).then(response => response.json())
                          .then(async function (data) {
                            console.log('laboratoriosinsert');
                            
                            for(var i=0; i<unique.length; i++){
                                        
                                        await fetch('/modulo/Abre_Detalle/', {
                                            method: 'POST',
                                            headers: {
                                              'Accept': 'application/json',
                                              'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(
                                              {
                                                query:"select * from m_lab_pruebas where codexamen = '" + unique[i].trim() + "'" 
                                              }
                                            )
                                          }).then(response => response.json())
                                            .then(async function ( datam_lab_pruebas) {
                                                
                                              examenescreados = examenescreados + datam_lab_pruebas[0].des_prueba.trim() + '\n';
                                                if(datam_lab_pruebas.length > 0) {
                                                  await fetch('/modulo/Execute/', {
                                                    method: 'POST',
                                                    headers: {
                                                      'Accept': 'application/json',
                                                      'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                      query: "INSERT INTO t_det_lab_serv_laboratorio VALUES ("+ datam_lab_pruebas[0].cod_pruebas+", "  + Correlativo_Serv_Laboratorio  + ", '"+datam_lab_pruebas[0].des_prueba.trim()+"', '','T', null," +  RedondeaDed((1.18) * (Adata_atencion[0].factor_lab) * 3.5) + ")"
                                                    })
                                                  }).then(response => response.json())
                                                  .then(function(data) { 
                                                    if(data){ 
                                                    }  
                                                  }).catch(error => {
                                                    console.log(error);    
                                                  }); 

                                                }
                                            }).catch(error => {
                                              console.log(error);
                                            });

                            }
                            await  REGISTRA_AUDITORIA_LABORATORIO("0", "CREACION DE LABORATORIO", "SE ASIGNO SERVICIO DE LABORATORIO DE NUTRICION", Correlativo_Serv_Laboratorio);
                      
                            alert ("Se ha creado los analisis de Laboratorio N. " + Correlativo_Serv_Laboratorio + ", Examen(es):" + examenescreados);
              
                        }).catch(error => {
                            console.log(error);
                        }); 
             
                  
              
       
                  
              
            }
             
             if (parseInt(Adata_atencion[0].contador_periodo) < 11 ){
              rst_aux.contador_periodo = parseInt(Adata_atencion[0].contador_periodo) + 1;

              
             switch (rst_aux.contador_periodo) {
               
                 case 2:
                  rst_aux.modo_atencion_medico = 2;
                  break;
                  case 3:
                 rst_aux.modo_atencion_medico = 1;
                 break;
                 case 4:
                 rst_aux.modo_atencion_medico = 2;
                 break;
                 case 5:
                 rst_aux.modo_atencion_medico = 1;
                 break;
                 case 6:
                 rst_aux.modo_atencion_medico = 2;
                 break;
                 case 7:
                 rst_aux.modo_atencion_medico = 1;
                 break;
                 case 8:
                 rst_aux.modo_atencion_medico = 2;
                 break;
                 case 9:
                 rst_aux.modo_atencion_medico = 1;
                 break;
                 case 10:
                 rst_aux.modo_atencion_medico = 2;
                 break;
                 case 11:
                 rst_aux.modo_atencion_medico = 1;
                 break;

               default:
                 break;
             }
              //rst_aux.cod_tipo_seg_cronico = 2;
          
            rst_aux.tabla = 't_tmpllamadas';
             
            await fetch('/modulo/Executeinsert/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(rst_aux)
            }).then(response => response.json())
              .then(async function (data) {

                
                if (parseInt(Adata_atencion[0].contador_periodo) < 11 ){

                  alert( "Se ha creado la atención dentro de 15 dias No: " + (CodAtencion));
                }
              }).catch(error => {
                console.log(error);
              }); 
              document.body.style.cursor = 'default';
              appMainWindow.document.getElementById('Cbo_opcion').value = 14;
              appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block';
              appMainWindow.document.getElementById('Cb_clasificacion').style.display='none' ;
              appMainWindow.document.getElementById('Txt_busqueda').value=CodAtencion;
              await appMainWindow.document.getElementById('CmdFiltrar').click();
               


            }else{
              document.body.style.cursor = 'default';
              alert("Fin del programa");
              appMainWindow.document.getElementById('Cbo_opcion').value = 14;
              appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block';
              appMainWindow.document.getElementById('Cb_clasificacion').style.display='none' ;
              appMainWindow.document.getElementById('Txt_busqueda').value=document.getElementById('Txt_CodAte').value;
              await appMainWindow.document.getElementById('CmdFiltrar').click();
             


            }

     
}
 
/* 
If Adata_atencion.Recordset!clasificacion_pac = 204 Or Adata_atencion.Recordset!clasificacion_pac = 205 Then
    Call GENERAR_EXPEDIENTE(Txt_CodAte.Text, "DLV")
End If */
/* 
If Adata_atencion.Recordset!clasificacion_pac = 7 Then
    G_db.Execute ("UPDATE t_tmpllamadas SET cod_tipo_seg_cronico = 1, estado = '5', cm_estado ='8', cod_estado = 9, cm_orden = 9 WHERE cod_ate = " & Val(Txt_CodAte.Text))
Else */
  //si se quiere cancelar la atencion actual y continuar con la secuencia
  if(flg_cancelar==false){
      await fetch('/modulo/Execute/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "UPDATE t_tmpllamadas SET Estado = '5'" +  (document.getElementById('TxtCodAut').value.trim() !='' ?(", cod_aut_prestacion = '" +  document.getElementById('TxtCodAut').value   + "', cod_asegurado = '" + document.getElementById('Txt_cod_aseg').value   + "', tipo_afiliacion = '"  +document.getElementById('TxtCodAut').dataset.tag + "', poliza_asegurado = '" + document.getElementById('Txt_Poliza').value  + "', poliza_certificado = '" + document.getElementById('Txt_pol_cert').value  + "', cm_aseg_producto = '" + document.getElementById('Txt_prod').value  + "',"):',')+ " cm_estado ='8', cod_estado = 9, cm_orden = 9 WHERE cod_ate = " + document.getElementById('Txt_CodAte').value.trim()
      })
    }).then(response => response.json())
    .then(function(data) { 
      if(data){ 
      }  
    }).catch(error => {
      console.log(error);    
    });  
  }
  window.close();
}
 

function RedondeaDed(X ) {
  var a ;
      a = X -  parseInt(X);
      if(a > 0 && a < 0.5 ){
          return parseInt(X) + 0.5;
      }else if(a > 0.5 && a < 1 ){
          return   parseInt(X) + 1;
      }else{
          return X
      }
  }



  window.Cmd_cancelar_Click = async function(){

    await P_VNRyCANCELAR_CM('Frm_CM_confirma_fin',document.getElementById('Txt_CodAte').value.trim(), false);
  } 











window.Cmd_eliminar_click =  function(){
   
  printModal(`
  <div>
  <div id="ed-modal-contentheader"  style="color: white;background:#1cc88a;display:flex;justify-content:space-between;"><h4> Eliminar atencion</h4><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
<p>Antes de eliminar la atencion ¿Desea crear la siguiente atencion del programa de nutrición?</p>
    <p></p>
    
  </div>
  <div style="display:flex;justify-content: space-around;">
  <button id="cancelar_estado7" class="btn btn btn-danger btn-sm cancelarmodal"  onclick ="cancelar_estado7();" >Cancelar</button>
  <button id="aceptar_estado7" class="btn btn btn-success btn-sm cancelarmodal" onclick ="aceptar_estado7();">Aceptar</button>
  </div>`);
}

window.cancelar_estado7 =  function(){
   
  flg_cancelar = false; 
}
window.aceptar_estado7 =  function(){
   
  flg_cancelar = true; 
}
window.Cmd_datos_siteds_click = async function (){
   //genera los datos
  var str_aux_CodEsp   ;
  var str_aux_CodDocId  ;
  var j  ;
  
  str_aux_CodEsp = "";
  
  if  (document.getElementById('DC_tipo_doc_id').value != "") {
      str_aux_CodDocId = document.getElementById('DC_tipo_doc_id').value;
  }else{
      str_aux_CodDocId = 2;
  }
   if ( await Fn_DATOS_PARAMETROS_SITEDS( Adata_atencion[0].cod_gru.trim(),str_aux_CodEsp,document.getElementById('Txt_ap_pat').value,document.getElementById('Txt_ap_mat').value,document.getElementById('Txt_nom_pac').value,str_aux_CodDocId,document.getElementById('Txt_Doc_id').value) == true){
 
                  GArr_Clinica_origen.push("");
                  GArr_Clinica_origen.push("");
                  
                  GStr_Cod_Autorizacion = ""
                  GStr_Documento_Autorizacion = '';
               //   document.getElementById('Txt_contratante').value = '';
                  document.getElementById('TxtCodAut').value= '';
                  document.getElementById('Txt_cod_aseg').value= '';
                  document.getElementById('Txt_cod_aseg').Tag= '';
                  document.getElementById('Txt_prod').value= '';
                  document.getElementById('Txt_Poliza').value= '';
                  document.getElementById('Txt_pol_cert').value= '';
                  document.getElementById('txt_coa').value= '';
     
                  let element1 =[],  element2=[];
                  for (let index = 0; index < 17; index++) {
                     element1[index] = '';
                     element2[index] = '';
                  }
                  GArr_Cobertura_clinica_origen[0]= element1; 
                  GArr_Cobertura_clinica_origen[1] = element2;
                  printModal(`
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
              
                  .Frm_SITEDS_buscar_paciente {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto auto ;
                    gap: 0px 0px;
                    grid-auto-flow: row 
             
                  }
                  
                  
                  .filtro1 { grid-area: filtro1; }
                  
                  .filtro2 { grid-area: filtro2; }
                  
                  .botones { grid-area: botones; }
                  
                  .tabla { grid-area: tabla; }
                  .Frm_SITEDS_datos_asegurado {
                    display: grid;
                    grid-template-columns: 1.7fr 0.3fr;
                    grid-template-rows: auto auto auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      "informaciongeneral Foto"
                      "datospaciente Foto"
                      "datospacientesegunregistroafiliado Foto"
                      "datostitular ."
                      "beneficios beneficios"
                      "botonessiteds botonessiteds";
                    font-size:1.7vh;
                  }
                  
                  .Foto { grid-area: Foto; }
                  
                  .informaciongeneral {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: informaciongeneral;
                  }
                  
                  .datospaciente {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: datospaciente;
                  }
                  
                  .datospacientesegunregistroafiliado {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: datospacientesegunregistroafiliado;
                  }
                  
                  .datostitular {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: datostitular;
                  }
                  
                  .beneficios { 
                    grid-area: beneficios; 
                    height:30vh;
                    border:1px solid black;
                    overflow:scroll;
                  }
                  .beneficios td { 
               
                  }
                  .botonessiteds {
                    display: grid;
                    grid-template-columns: 1.4fr 0.7fr 0.7fr 1.6fr 0.6fr;
                    grid-template-rows: 1fr;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . .";
                    grid-area: botonessiteds;
                  }
                  
                  </style>
                  <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> Busqueda de asegurado SITEDS - IPRESS DOCTORMAS</h4><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
               
                
                              
                  <div class="tabsiteds">  
                  <button class="tablinkssiteds" onclick="opensiteds(event, 'SSTabsiteds0')" id="tabsiteds0">BUSQUEDA DE ASEGURADO</button>
                  <button class="tablinkssiteds" onclick="opensiteds(event, 'SSTabsiteds1')" id="tabsiteds1">DATOS DEL ASEGURADO</button>
                   </div>
                
                  <div id="SSTabsiteds0" class="tabcontentsiteds">
                          <div class="Frm_SITEDS_buscar_paciente">
                                <label id= "Label3">Aseguradora :</label>
                                <label style="visibility:hidden;" id= "Lbl_especialidad">Especialidad :</label><div></div><div></div><div></div>
                          
                                <select style="width:20vw"   name = "Dcbo_Aseguradora" id="Dcbo_Aseguradora" ></select> 
                                <select style="visibility:hidden;"   name = "Dcbo_Especialidad" id="Dcbo_Especialidad" ></select><select style="display:none;" name = "Dcbo_Clinica_origen" id="Dcbo_Clinica_origen" ></select>
                                <div></div><div></div><div></div>
                    
                                <label id= "Label10">Ap. Paterno :</label>
                                <label id= "Label8">Ap. materno :</label>
                                <label id= "Label1">Nom Paciente :</label>
                                <label id= "Label1">Tipo Doc. Ident. :</label><div></div>

                                <input  type="text" name = "Txt_Apellido_paterno" id="Txt_Apellido_paterno" />    
                                <input  type="text" name = "Txt_Apellido_materno" id="Txt_Apellido_materno" />    
                                <input  type="text" name = "Txt_Nombressiteds" id="Txt_Nombressiteds" />    
                                <select   name = "DC_tipo_doc_idsiteds" id="DC_tipo_doc_idsiteds" > </select>
                                <input  type="text" name = "Txt_documento_identidad" id="Txt_documento_identidad" />    

                                <div></div><div></div><div></div>
                              <button onclick="cmd_buscar_x_pac_Click();" id="cmd_buscar_x_pac">Buscar por paciente</button>
                              <button onclick="cmd_buscar_x_doc_id_Click();" id="cmd_buscar_x_doc_id">Buscar por Doc identidad</button>
                              <div style ="grid-column:1/6;height:65vh;  overflow: scroll;" >
                                  <table  border=1 style="width:100%;font-size:1.7vh" id="MSHGrid_Asegurado" >
                                      <thead   id = "MSHGrid_Aseguradohead">
                                      <tr style="background-color:green;color:white">
                                              <th scope="col">PRODUCTO</th>
                                              <th scope="col">APELLIDO PATERNO</th>
                                              <th scope="col">APELLIDO MATERNO</th>
                                              <th scope="col">NOMBRES</th>
                                              <th scope="col">PARENTESCO</th>
                                              <th scope="col">CONTRATANTE</th>
                                              <th scope="col">ESTADO</th>
                                              <th scope="col">CODIGO  AFIL</th>
                                              <th scope="col">FECHA NACIMIENTO</th>
                                              <th scope="col">GENERO</th>
                                              <th scope="col">TIPO DOCUMENTO</th>
                                              <th scope="col">NUMERO DOCUMENTO</th>
                                              <th scope="col">NUMERO PLAN</th>
                                              <th scope="col">NUMERO CONTRATO</th>
                                              <th scope="col">NUMERO DOCUMENTO CONTRATANTE</th>
                                              <th scope="col">TIPO CALIFICADOR CONTRATANTE</th>
                                              <th scope="col">TIPO DOCUMENTO CONTRATANTE</th>

                                      </tr>
                                      </thead>
                                      <tbody  id="MSHGrid_Aseguradobody">

                                      </tbody>
                                      <tfoot>
                                      </tfoot>
                                </table> 
                              </div>
                              <div   style="grid-column:1/6;display:flex;justify-content:space-between	;">
                             <div></div>
                               <input type="button"  class="btn btn btn-primary btn-sm" onclick="Cmd_Datos_asegurado_Click();"  id="Cmd_Datos_asegurado" name="Cmd_Datos_asegurado" value="Seleccionar"> 
                              </div>
                              
                        </div>
                  </div>

                  <div id="SSTabsiteds1" class="tabcontentsiteds">
                        <div class="Frm_SITEDS_datos_asegurado">
                          <div class="Foto"></div>
                          <div class="informaciongeneral">
                          <label style="grid-column:1/7;font-weight: bold;color:black"  id= "Label12">INFORMACION GENERAL</label>

                          <label id= "Label4">N° Autorización :</label>
                          <input readonly style="background-color:yellow" type="text" name = "Txt_Cod_autorizacion" id="Txt_Cod_autorizacion" />
                          <label id= "Label6">Código de asegurado :</label>
                          <input readonly type="text" name = "Txt_codigo_asegurado" id="Txt_codigo_asegurado" />    
                          <label id= "Label28">N° declaración accidente :</label>
                          <input readonly style="background-color:#F5F5DC" type="text" name = "Text20" id="Text20" />    
                          <label id= "Label5">Poliza/contrato :</label>
                          <input readonly type="text" name = "Txt_poliza" id="Txt_poliza" />    
                          <label id= "Label7">Certificado :</label>
                          <input readonly type="text" name = "Txt_certificado" id="Txt_certificado" />    
                          <label id= "Label27">N° Solicitud Origen :</label>
                          <input readonly style="background-color:#F5F5DC" type="text" name = "Text19" id="Text19" />    
                          <label id= "Label19">Producto :</label>
                          <input readonly  type="text" name = "Txt_producto" id="Txt_producto" />
                          </div>
                          <div class="datospaciente">
                          <label  style="grid-column:1/7;font-weight: bold;color:black" id= "Label16">DATOS DEL PACIENTE</label>

                          <label id= "Label13">Apellidos y Nombres :</label>
                          <input readonly style="grid-column:2/5" type="text" name = "Txt_paciente_ap_nombres" id="Txt_paciente_ap_nombres" /><div></div><div></div>
                          <label id= "Label14">Género :</label>
                          <input readonly type="text" name = "Txt_paciente_genero" id="Txt_paciente_genero" />    
                          <label id= "Label19">Fecha de nacimiento :</label>
                          <input readonly  type="text" name = "Txt_paciente_fec_nacimiento" id="Txt_paciente_fec_nacimiento" />    
                          <label id= "Label23">Parentesco :</label>
                          <input readonly type="text" name = "Txt_paciente_parentesco" id="Txt_paciente_parentesco" />    
                          <label id= "Label15">Tipo Documento :</label>
                          <input readonly type="text" name = "Txt_paciente_tipo_documento" id="Txt_paciente_tipo_documento" />    
                          <label id= "Label20">Num. de documento :</label>
                          <input readonly type="text" name = "Txt_paciente_num_documento" id="Txt_paciente_num_documento" /> 
                          <label id= "Label24">Edad :</label>
                          <input readonly  type="text" name = "Txt_paciente_edad" id="Txt_paciente_edad" />    
                          <label id= "Label17">Inicio Vigencia :</label>
                          <input readonly type="text" name = "Txt_paciente_ini_vigencia" id="Txt_paciente_ini_vigencia" />    
                          <label id= "Label21">Fin Vigencia :</label>
                          <input readonly type="text" name = "Txt_paciente_fin_vigencia" id="Txt_paciente_fin_vigencia" />    
                          <label id= "Label25">Estado Civil :</label>
                          <input readonly type="text" name = "Txt_paciente_estado_civil" id="Txt_paciente_estado_civil" />    
                          <label id= "Label18">Tipo plan de salud :</label>
                          <input readonly type="text" name = "Txt_paciente_tipo_plan_salud" id="Txt_paciente_tipo_plan_salud" />    
                          <label id= "Label22">N° de plan :</label>
                          <input readonly  type="text" name = "Txt_paciente_plan" id="Txt_paciente_plan" />    
                          <label id= "Label26">Estado :</label>
                          <input readonly  type="text" name = "Txt_paciente_estado" id="Txt_paciente_estado" />    
                    

                          </div>
                          <div class="datospacientesegunregistroafiliado">
                          <label style="grid-column:1/7;font-weight: bold;color:black"  id= "Label29">DATOS DEL PACIENTE SEGÚN REGISTRO DE AFILIADOS</label>

                          <label id= "Label32">N° Documento :</label>
                          <input readonly  type="text" name = "Text23" id="Text23" />
                          <label id= "Label31">Género :</label>
                          <input readonly type="text" name = "Text22" id="Text22" />    
                          <label id= "Label30">Fecha de nacimiento :</label> 
                          <input readonly type="text" name = "Text21" id="Text21" />    
                          <label id= "Label35">Apellidos y Nombres :</label>
                          <div style="grid-column:2/7;display:flex;">
                          <input readonly style="width:100%" type="text" name = "Text26" id="Text26" />    
                          <input readonly style="width:100%" type="text" name = "Text25" id="Text25" />    
                          <input readonly style="width:100%"  type="text" name = "Text24" id="Text24" />    
                          </div>
                          </div>
                          <div class="datostitular">
                          <label style="grid-column:1/7;font-weight: bold;color:black"  id= "Label29">DATOS DEL TITULAR</label>

                          <label  id= "Label44">Apellidos y Nombres :</label>
                          <input readonly style="grid-column:2/5;" type="text" name = "Txt_titular_ap_nombres" id="Txt_titular_ap_nombres" />
                          <label id= "Label34">Código Titular :</label>
                          <input readonly type="text" name = "Txt_titular_codigo" id="Txt_titular_codigo" />    
                          <label id= "Label43">Tipo de documento :</label> 
                          <input readonly type="text" name = "Txt_titular_tipo_documento" id="Txt_titular_tipo_documento" />    
                          <label id= "Label40">N° documento :</label>
                          <input readonly type="text" name = "Txt_titular_num_documento" id="Txt_titular_num_documento" />    
                          <label id= "Label38">Moneda :</label>
                          <input readonly type="text" name = "Txt_titular_moneda" id="Txt_titular_moneda" />    
                          <label id= "Label42">Nombre contratante :</label>
                          <input readonly  style="grid-column:2/5;" type="text" name = "Txt_titular_contratante" id="Txt_titular_contratante" />    
                          <label id= "Label37">Tipo documento Contratante :</label>
                          <input readonly type="text" name = "Txt_titular_tipo_doc_contratante" id="Txt_titular_tipo_doc_contratante" />    
                          <label id= "Label41">Tipo de afiliación :</label>
                          <input readonly type="text" name = "Txt_titular_tipo_afiliacion" id="Txt_titular_tipo_afiliacion" />    
                          <label id= "Label39">Fecha de afiliación :</label>
                          <input readonly type="text" name = "Txt_titular_fecha_afiliacion" id="Txt_titular_fecha_afiliacion" />    
                          <label id= "Label36">N° documento contratante :</label>
                          <input readonly type="text" name = "Txt_titular_num_doc_contratante" id="Txt_titular_num_doc_contratante" />    
                     
                          </div>
                          <div class="beneficios">
                          <table  border=1 style="width:100%;font-size:1.7vh;white-space:nowrap;" id="MSHGrid_Coberturasiteds" >
                          <thead   id = "MSHGrid_Coberturasitedshead">
                          <tr style="background-color:green;color:white">
                                  <th  style ="display:none" scope="col">CodigoTipoCobertura</th>
                                  <th  style ="display:none"scope="col">CodigoSubTipoCobertura</th>
                                  <th scope="col">Codigo</th>
                                  <th scope="col">Beneficios</th>
                                  <th  style ="display:none" scope="col">CodIndicadorRestriccion</th>
                                  <th scope="col">Restricciones</th>
                                  <th  style ="display:none" scope="col">CodCopagoFijo</th>
                                  <th scope="col">Copago Fijo</th>
                                  <th  style ="display:none" scope="col">CodCopagoVariable</th>
                                  <th scope="col">Copago Variable</th>
                                  <th  style ="display:none" scope="col">CodFechaFinCarencia</th>
                                  <th scope="col">Fin Carencia</th>
                                  <th scope="col">Condiciones Especiales</th>
                                  <th scope="col">Observaciones</th>
                                  <th  style ="display:none" scope="col">CodCalificacionServicio</th>
                                  <th scope="col">DesCalificacionServicio</th>
                                  <th  style ="display:none" scope="col">BeneficioMaximoInicial</th>
                                  <th style ="display:none" scope="col">NumeroCobertura</th>

                          </tr>
                          </thead>
                          <tbody  id="MSHGrid_Coberturasitedsbody">

                          </tbody>
                          <tfoot>
                          </tfoot>
                    </table> 
                          </div>
                          <div class="botonessiteds">
                          <input type="button"  class="btn btn btn-success btn-sm "  id="Cmd_autorizar_consulta" name="Cmd_autorizar_consulta"  onclick="Cmd_autorizar_consulta_Click();" value="Generar autorización de consulta"> 
                          <input type="button"  class="btn btn btn-primary btn-sm " onclick="Cmd_ver_documento_autorizacion_Click();" id="Cmd_ver_documento_autorizacion" name="Cmd_ver_documento_autorizacion" value="Ver Documento de autorizacion"> 
                          <a id='aCmd_ver_documento_autorizacion' style="display:none"       /></a>
                          <input type="button"  class="btn btn btn-primary btn-sm " onclick="Cmd_continuar_atencion_Click();" id="Cmd_continuar_atencion" name="Cmd_continuar_atencion" value="Continuar atención"> 
                          <input type="button"  class="btn btn btn-primary btn-sm "  id="Cmd_continuar_sin_siteds_drmas" name="Cmd_continuar_sin_siteds_drmas" value="Continuar atención SIN Siteds de Doctormas"> 
                          <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Cmd_salir_siteds" name="Cmd_salir_siteds" value="Salir"> 

                          
                          </div>
                        </div> 
                </div>
                <label style="color:blue;" id= "Lbl_mensaje"></label>

               `);
                 var ed_modal_content = document.getElementById("ed-modal-content");
                 dragElement(ed_modal_content);
               
                 ed_modal_content.style.minWidth = "90vw";
                 document.getElementById("tabsiteds0").click(); 

                  var Adata_cliente ;
                 Adata_cliente = "SELECT trim(cod_gru) cod_cliente, trim(nom_gru) cliente FROM m_iafas iaf INNER JOIN m_grupos cli ON iaf.cod_cliente = cli.cod_gru WHERE iaf.activo = true AND activi_operaciones = true ORDER BY 2 ASC";
                 fetch('/modulo/Abre_Detalle/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: Adata_cliente 
                  })
                }).then(response => response.json())
                  .then(function (data) {
                    var html = '',options ;
                    if (data.length>0) {
                       options = data.map(person => `<option value="${person.cod_cliente}">${person.cliente}</option>`).join("\n");
                    } 
                     document.getElementById('Dcbo_Aseguradora').innerHTML = options;
                     document.getElementById('Dcbo_Aseguradora').value = GStr_SITEDS_Cod_Cliente;
                     document.body.style.cursor = 'default' ;
            
                  }).catch(error => {
                    console.log(error);
                  });
                  var Adata_especialidad ; // solo nutricionista
                  Adata_especialidad = "SELECT distinct trim(c.cod_esp) cod_esp, trim(c.nom_esp) nom_esp FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.activi = true AND c.cod_esp in ('005', '006', '009')";
                  fetch('/modulo/Abre_Detalle/', {
                   method: 'POST',
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                     query: Adata_especialidad 
                   })
                 }).then(response => response.json())
                   .then(function (data) {
                     var html = '',options ;
                     if (data.length>0) {
                        options = data.map(person => `<option value="${person.cod_esp}">${person.nom_esp}</option>`).join("\n");
                     } 
                      document.getElementById('Dcbo_Especialidad').innerHTML = options;
                      document.getElementById('Dcbo_Especialidad').value = GStr_SITEDS_Cod_Especialidad;
                      document.body.style.cursor = 'default' ;

                      if (GStr_SITEDS_Cod_Cliente == "111") {
                        document.getElementById('Dcbo_Especialidad').visibility = 'visible';  
                        document.getElementById('Lbl_especialidad').visibility = 'visible';  
                       
                      }
             
                   }).catch(error => {
                     console.log(error);
                   });

                   var Adata_Doc_id ;
                   Adata_Doc_id = "SELECT * FROM mae_documento_identidad WHERE cod_doc_id_susalud is not null order by id_doc_id ASC";
                   fetch('/modulo/Abre_Detalle/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: Adata_Doc_id 
                    })
                  }).then(response => response.json())
                    .then(function (data) {
                      var html = '',options ;
                      if (data.length>0) {
                         options = data.map(person => `<option value="${person.id_doc_id}">${person.descripcion_doc_id}</option>`).join("\n");
                      } 
                       document.getElementById('DC_tipo_doc_idsiteds').innerHTML = options;
                       document.getElementById('DC_tipo_doc_idsiteds').value = GStr_SITEDS_Cod_doc_id;
                       document.body.style.cursor = 'default' ;
 
                     
              
                    }).catch(error => {
                      console.log(error);
                    });
                   document.getElementById('Txt_Apellido_paterno').value = GStr_SITEDS_Apellido_Paterno;
                   document.getElementById('Txt_Apellido_materno').value = GStr_SITEDS_Apellido_Materno;
                   document.getElementById('Txt_Nombressiteds').value = GStr_SITEDS_Nombres;

                   document.getElementById('Txt_documento_identidad').value = GStr_SITEDS_Numero_doc_id;

 
   }


}

var GStr_SITEDS_Cod_Cliente ;
var GStr_SITEDS_Cod_Especialidad ;
var GStr_SITEDS_Apellido_Paterno ;
var GStr_SITEDS_Apellido_Materno ;
var GStr_SITEDS_Nombres ;
var GStr_SITEDS_Cod_doc_id ;
var GStr_SITEDS_Numero_doc_id ;
var GStr_Cod_Autorizacion ;
var GStr_Documento_Autorizacion;
var GArr_Clinica_origen = [];
var GArr_Cobertura_clinica_origen= [];
async function Fn_DATOS_PARAMETROS_SITEDS(pCodCliente , pCodEspecialidad , pApPat , pApMat , pNombres , pCodDocid , pNumDocID ){


  var  rst_Susalud ;
    var valor;
 
  GStr_SITEDS_Cod_Cliente = "";
  GStr_SITEDS_Cod_Especialidad = "";
  GStr_SITEDS_Apellido_Paterno = "";
  GStr_SITEDS_Apellido_Materno = "";
  GStr_SITEDS_Nombres = "";
  GStr_SITEDS_Cod_doc_id = "";
  GStr_SITEDS_Numero_doc_id = "";
  GStr_Cod_Autorizacion = "";
  GStr_Documento_Autorizacion = '';

    
  if (pApMat == ".") {
     pApMat = "";
  }

  rst_Susalud ="select cod_financ from m_iafas WHERE cod_cliente = '" + pCodCliente + "'";
  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: rst_Susalud

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '' ;
      var i;
      
      
                 
    //Frame1.Caption = "Consultas médicas"
    if (data.length>0) { 
           
       if (data[0].cod_financ == "30004" &&  pCodEspecialidad == "" ){
          alert ("No se esta enviando la especialidad requerida para el cliente");
          valor= false;;
       }else{
          
          GStr_SITEDS_Cod_Cliente = pCodCliente;
          GStr_SITEDS_Cod_Especialidad = pCodEspecialidad;
          GStr_SITEDS_Apellido_Paterno = pApPat;
          GStr_SITEDS_Apellido_Materno = pApMat;
          GStr_SITEDS_Nombres = pNombres;
          GStr_SITEDS_Cod_doc_id = pCodDocid; //El codigo es id_doc_id
          GStr_SITEDS_Numero_doc_id = pNumDocID;
          valor=  true;
       }
       
 
   
    } 

      document.body.style.cursor = 'default';

    }).catch(error => {
      console.log(error);
    });
 
  return valor;
}



window.openCity = function(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
window.opensiteds = function(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontentsiteds");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkssiteds");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it



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













var a_ConsultaAfiliado;
var a_DatosAfiliado ;
var a_Coberturas ;
 
async function  buscar_asegurado(ptipo_busqueda){
    
  var str_error;
  var str_metodo;
  var str_request  ;                //solicitud en formato json para enviar al WS
  var str_response ;               //resultado en formato json que retorna del WS
  //var aux(0) ; temp
  //var rst_aux As New ADODB.Recordset temp
  var cod_financiador_siteds ;
  var cod_esp_siteds ;
  var cod_doc_id_siteds ;
  var Ruc_ipress;
  var cod_ipress ;
  
/*     MSHGrid_Asegurado.Clear
  MSHGrid_Asegurado.rows = 2
  MSHGrid_Asegurado.Cols = 2 */
  document.getElementById('MSHGrid_Aseguradobody').innerHTML ='';
  

  document.getElementById('Lbl_mensaje').innerHTML ='Buscando paciente, por favor espere';

     
      
  //construye el array con los datos solicitados
  //MSHGrid_Asegurado.Enabled = false;
   document.getElementById('Cmd_Datos_asegurado').disabled = true;
   document.getElementById('Cmd_autorizar_consulta').disabled = true;
   document.getElementById('Cmd_continuar_sin_siteds_drmas').disabled = true;
 
  
    a_ConsultaAfiliado = [];
  
  //a_ConsultaAfiliado(0)        cod tipo documento
  //a_ConsultaAfiliado(1)        numero de documento
  //a_ConsultaAfiliado(2)        ruc drmas
  //a_ConsultaAfiliado(3)        codigo susalud Drmas
  //a_ConsultaAfiliado(4)        codigo aseg
  //a_ConsultaAfiliado(5)        nombre afil
  //a_ConsultaAfiliado(6)        apellido pat afil
  //a_ConsultaAfiliado(7)        apellido mat afil
  //a_ConsultaAfiliado(8)        cod especialidad solo para Feban

//configura los códigos de SM a los codigos de SUSALUD


  //codigo de financiador
  cod_financiador_siteds = "";
   
  var rst_aux ;
  rst_aux = "SELECT cod_financ FROM m_iafas WHERE cod_cliente = '" + document.getElementById('Dcbo_Aseguradora').value + "'";
  await fetch('/modulo/Abre_Detalle/', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     query: rst_aux 
   })
 }).then(response => response.json())
   .then(function (data) {
     var html = '',options ;
     if (data.length>0) {
      cod_financiador_siteds = data[0].cod_financ;

     }  
      document.body.style.cursor = 'default' ;

    

   }).catch(error => {
     console.log(error);
   });
   
  //codigo de especialidad
  cod_esp_siteds = "";
  
  rst_aux = "SELECT trim(especialidad_siteds) especialidad_siteds FROM m_especialidades where cod_esp = '" + document.getElementById('Dcbo_Especialidad').value +"'";
  await  fetch('/modulo/Abre_Detalle/', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     query: rst_aux 
   })
 }).then(response => response.json())
   .then(function (data) {
     var html = '',options ;
     
       if (document.getElementById('Dcbo_Especialidad').visibility == 'visible') {
          if (data.length>0) {
            cod_esp_siteds = data[0].especialidad_siteds;
          }
      }
      if (document.getElementById('DC_tipo_doc_id').value == "") {
          cod_doc_id_siteds = "1";
          document.getElementById('DC_tipo_doc_id').value = 2;
      }
   
      document.body.style.cursor = 'default' ;
 
   }).catch(error => {
     console.log(error);
   });

  //codigo de documento de identidad
   
  rst_aux = "SELECT cod_doc_id_susalud FROM mae_documento_identidad WHERE id_doc_id = "   +  document.getElementById('DC_tipo_doc_id').value;
  await  fetch('/modulo/Abre_Detalle/', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     query: rst_aux 
   })
 }).then(response => response.json())
   .then(function (data) {
     var html = '',options ; 
       cod_doc_id_siteds = data[0].cod_doc_id_susalud;   
   
      document.body.style.cursor = 'default' ;
 
   }).catch(error => {
     console.log(error);
   });
  Ruc_ipress = "20251011461";
  cod_ipress = "00023920";
  
 
  switch(ptipo_busqueda){
  
      case "PACIENTE":
          a_ConsultaAfiliado[0] = cod_doc_id_siteds;
          a_ConsultaAfiliado[1] = "";
          a_ConsultaAfiliado[2] = Ruc_ipress;
          a_ConsultaAfiliado[3] = cod_ipress;
          a_ConsultaAfiliado[4] = cod_financiador_siteds;
          a_ConsultaAfiliado[5] = document.getElementById('Txt_Nombressiteds').value ;
          a_ConsultaAfiliado[6] = document.getElementById('Txt_Apellido_paterno').value; 
          a_ConsultaAfiliado[7] = document.getElementById('Txt_Apellido_materno').value;
          a_ConsultaAfiliado[8] = cod_esp_siteds;
      break;
      case "DNI":
          
          a_ConsultaAfiliado[0] = cod_doc_id_siteds
          a_ConsultaAfiliado[1] = document.getElementById('Txt_documento_identidad').value  ;
          a_ConsultaAfiliado[2] = Ruc_ipress;
          a_ConsultaAfiliado[3] = cod_ipress;
          a_ConsultaAfiliado[4] = cod_financiador_siteds;
          a_ConsultaAfiliado[5] = "";
          a_ConsultaAfiliado[6] = "";
          a_ConsultaAfiliado[7] = "";
          a_ConsultaAfiliado[8] = cod_esp_siteds;
      break;
  }

  str_metodo = "ConsultaAsegNom";
  
  str_request = FN_WS_CONSULTA_METODO_JSON(str_metodo,a_ConsultaAfiliado);

  //Debug.Print str_request temp
  
 /*  If str_error = "" Then
      str_response = FN_WS_CONSULTA_METODO_JSON(str_metodo, str_request, str_error)
      Debug.Print str_response
      If str_error = "" Then
          Call SUB_OBTENER_RESPONSE_DATA_CONSULTAR_ASEG(str_response, ad_Afiliados(), str_error)
      End If
  End If
  
  If str_error <> "" Then
      MsgBox "No se encontro afiliados que coincida con la busqueda, motivo: " & str_error
  Else
      Call Array_a_FlexGrid(ad_Afiliados(), MSHGrid_Asegurado)
      Call Formato_FlexGrid(MSHGrid_Asegurado)
      MSHGrid_Asegurado.Enabled = True
      Cmd_Datos_asegurado.Enabled = True
      Lbl_mensaje.ForeColor = &HFF0000
      Lbl_mensaje.Caption = "Realizado."
      Lbl_mensaje.Refresh
  End If */
      
}


window.FN_WS_CONSULTA_METODO_JSON = function(ws_metodo ,a_ConsultaAfiliado){
  
  document.body.style.cursor = 'progress' ;

  let headers = new Headers({
    "Accept"       : "application/json",
    "Content-Type" : "application/json",
    //"User-Agent"   : "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"
    });
  switch  ( ws_metodo){
    case 'ConsultaAsegNom':
    fetch("/nutricion/FN_WS_CONSULTA_METODO_JSON/" + ws_metodo, {
      headers:headers ,
      method: 'POST' ,
       body: JSON.stringify({
        CodTipoDocumentoAfiliado: a_ConsultaAfiliado[0] ,
        NumeroDocumentoAfiliado: a_ConsultaAfiliado[1],
        RUC:   a_ConsultaAfiliado[2],
        SUNASA:a_ConsultaAfiliado[3] ,
        IAFAS: a_ConsultaAfiliado[4] ,
        NombresAfiliado: a_ConsultaAfiliado[5]   ,
        ApellidoPaternoAfiliado:a_ConsultaAfiliado[6]  ,
        ApellidoMaternoAfiliado: a_ConsultaAfiliado[7]  ,
        CodEspecialidad:  a_ConsultaAfiliado[8] 

      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '',options ;
        if (data.length>0) {
          
          for (let i =0; i < data.length; i++) {


            html += '<tr '   + `" onclick="filaSelected(this);">` +
              '<td style="display:none">' + data[i].CodProducto + '</td>' +
              '<td>' + data[i].DesProducto + '</td>' +
              '<td>' + data[i].ApellidoPaternoAfiliado + '</td>' +
              '<td>' + data[i].ApellidoMaternoAfiliado + '</td>'+
              '<td>' + data[i].NombresAfiliado + '</td>' +
              '<td style="display:none">' + data[i].CodParentesco + '</td>'+
              '<td>' + data[i].DesParentesco + '</td>'+
              '<td>' + data[i].NombreContratante + '</td>'+
              '<td style="display:none">' + data[i].CodEstado + '</td>'+
              '<td>' + data[i].DesEstado + '</td>'+
              '<td>' + data[i].CodigoAfiliado + '</td>'+
              '<td>' + data[i].FechaNacimiento + '</td>'+
              '<td style="display:none">' + data[i].CodGenero + '</td>'+
              '<td  >' + data[i].DesGenero + '</td>'+
              '<td style="display:none">' + data[i].CodTipoDocumentoAfiliado + '</td>'+
              '<td  >' + data[i].DesTipoDocumentoAfiliado + '</td>'+
              '<td >' + data[i].NumeroDocumentoAfiliado + '</td>'+
              '<td >' + data[i].NumeroPlan + '</td>'+
              '<td  >' + data[i].NumeroContratoAfiliado + '</td>'+
              '<td >' + data[i].NumeroDocumentoContratante + '</td>'+
              '<td>' + data[i].TipoCalificadorContratante + '</td>'+
              '<td style="display:none">' + data[i].CodTipoDocumentoContratante + '</td>'+
              '<td  >' + data[i].DesTipoDocumentoContratante + '</td>'+


    
            '</tr>'; 
          } 
          document.getElementById('MSHGrid_Aseguradobody').innerHTML = html;
          document.getElementById('Cmd_Datos_asegurado').disabled = false;;
          document.body.style.cursor = 'default' ;
          document.getElementById('Lbl_mensaje').innerHTML= "Realizado.";

        }else{
          document.body.style.cursor = 'default' ;
          document.getElementById('Lbl_mensaje').innerHTML= "No se encontro afiliados que coincida con la busqueda.";
          
        }
        
       }).catch(error => {
        console.log(error);
      });
   
  break;
 default:
   break;
  }
 

}
 

 window.filaSelected = function(p) {
  var table =  (p.parentElement);

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";

  }
  p.style.backgroundColor = "turquoise"; 
  
}

var ls_codigo_hia ;
window.Cmd_Seleccionar_Click =function(){
  var filas = document.querySelectorAll('#DG_pacientebody>tr');
  var fila;
    filas.forEach(element => {
      if(element.style.backgroundColor == "turquoise"){
          fila = element;
          return;
      }
    })
  if (!fila) return;
  IN_Hhabilitar_controles(true);
  Inicializa_registro();
   ls_codigo_hia = fila.id;
   document.getElementById("Txt_ApPat").value = fila.cells[6].innerHTML ;
   document.getElementById("Txt_ApMat").value = fila.cells[7].innerHTML ;
   document.getElementById("Txt_Nombres").value = fila.cells[8].innerHTML ;
   document.getElementById("DTFecNac").value = fila.cells[3].innerHTML ;
   document.getElementById("DC_tipo_doc_id").value = fila.cells[9].innerHTML ;
   document.getElementById("Txt_num_doc_id").value = fila.cells[2].innerHTML ;
   if (fila.cells[10].innerHTML  == 'f') {
    document.getElementById("Cbo_sexo").value = "FEMENINO";
  }else{
    document.getElementById("Cbo_sexo").value = "MASCULINO";
  }  
  var f= new Date();
  //agregado
   var fechanac = new Date(fila.cells[3].innerHTML);

  document.getElementById("Lbl_edad").innerHTML ="  "+ (f.getFullYear()  -  fechanac.getFullYear())+ " años";
  //Lbl_edad.Caption = Year(Date) - Year(!fnac_pac) & " años"
  if (fila.cells[11].innerHTML  == 'null') {
    document.getElementById("Cbo_VIP").value = "" ;
  }else{
    document.getElementById("Cbo_VIP").value = fila.cells[11].innerHTML;
  } 
  if (fila.cells[12].innerHTML  == 'null') {
    document.getElementById("Txt_email").value = "" ;
  }else{
    document.getElementById("Txt_email").value = fila.cells[12].innerHTML;
  }   
  //direccion
  
   var Adata_direccion ;

  Adata_direccion ="select * from vw_datos_paciente_direccion where cod_paciente = '" + ls_codigo_hia + "' ORDER BY cod_dir asc";
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: Adata_direccion

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '' ;
      var i; 
                 
    //Frame1.Caption = "Consultas médicas"
    if (data.length>0) {
     
          i = 0;

      for (; i < data.length; i++) {


        html += '<tr ' + ' id="' + (data[i].cod_dir).trim() + `" onclick="DG_direccion_RowColChange(this);">` +
          '<td >' + data[i].direccion + '</td>' +
          '<td>' + data[i].nro_dir_lote + '</td>' +
          '<td>' + data[i].dir_dpto_interior + '</td>' +
          '<td>' + data[i].dir_urbanizacion + '</td>'+
          '<td style="display:none">' + data[i].distrito + '</td>' +
          '<td style="display:none">' + data[i].provincia + '</td>'+
          '<td style="display:none">' + data[i].ubi_cod_dpto + '</td>'+
          '<td style="display:none">' + data[i].ubi_cod_prov + '</td>'+
          '<td style="display:none">' + data[i].ubi_distrito + '</td>'+
          '<td style="display:none">' + data[i].referencia + '</td>'+
          '<td style="display:none">' + data[i].tlf_casa + '</td>'+
          '<td style="display:none">' + data[i].tlf_celular + '</td>'+
          '<td style="display:none">' + data[i].tlf_oficina + '</td>'+
          '<td style="display:none">' + data[i].tlf_oficina_anx + '</td>'+

        '</tr>'; 
      } 
      document.getElementById('DG_direccionbody').innerHTML = html;

      document.getElementById('DG_direccionbody').rows[0].click()  ;
  
    } 

      document.body.style.cursor = 'default';

    }).catch(error => {
      console.log(error);
    });
    document.getElementById("tab1").click();

}
window.cmd_buscar_x_doc_id_Click = function(){
buscar_asegurado ("DNI");
}

window.cmd_buscar_x_pac_Click = function(){
buscar_asegurado ("PACIENTE");
}

window.Cmd_Datos_asegurado_Click = function( ){
  
     Sub_SELECCIONAR_ASEGURADO();
}

window.Sub_SELECCIONAR_ASEGURADO = function(){
  var table = document.getElementById("MSHGrid_Aseguradobody");
  var fila;
  for (var i = 0, row; row = table.rows[i]; i++) {
     if(row.style.backgroundColor == "turquoise"){
        fila = row;
     }

  }
  var  str_request      ;              //solicitud en formato json para enviar al WS
  var str_response      ;            //resultado en formato json que retorna del WS
  var str_metodo ;
  var str_error ;
   var i ;
  
  if (fila.cells[8].innerHTML.trim() == "1") {
       document.getElementById('Lbl_mensaje').innerHTML= "Consultando datos adicionales de paciente, espere por favor...";
 
      Sub_limpiar_datos_adicionales();
       
      str_metodo = "ConsultaAsegCod";
      let headers = new Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        //"User-Agent"   : "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"
        });
 
      fetch("/nutricion/FN_WS_CONSULTA_METODO_JSON/" + str_metodo, {
        headers:headers ,
        method: 'POST' ,
         body: JSON.stringify({
          SUNASA:  a_ConsultaAfiliado[3] ,
          IAFAS: a_ConsultaAfiliado[4],
          RUC:   a_ConsultaAfiliado[2],
          NombresAfiliado:fila.cells[4].innerHTML.trim() ,
          ApellidoPaternoAfiliado: fila.cells[2].innerHTML.trim(),
          ApellidoMaternoAfiliado:  fila.cells[3].innerHTML.trim(),
          CodigoAfiliado: fila.cells[10].innerHTML.trim(),
          CodTipoDocumentoAfiliado:  fila.cells[14].innerHTML.trim(),
          NumeroDocumentoAfiliado:   fila.cells[16].innerHTML.trim(),
          CodProducto:   fila.cells[0].innerHTML.trim(),
          DesProducto:   fila.cells[1].innerHTML.trim(),
          NumeroPlan:    fila.cells[17].innerHTML.trim(),
          CodTipoDocumentoContratante:    fila.cells[21].innerHTML.trim(),
          NumeroDocumentoContratante:   fila.cells[19].innerHTML.trim(),
          NombreContratante:    fila.cells[7].innerHTML.trim(),
          CodParentesco:    fila.cells[5].innerHTML.trim(),
          TipoCalificadorContratante:   fila.cells[20].innerHTML.trim(),
          CodEspecialidad:  a_ConsultaAfiliado[8]
   

        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '',options ; 
          if (Object.keys(data).length>0) {
           
            a_Coberturas =   data.Coberturas;
            a_DatosAfiliado = data.DatosAfiliado;
            document.getElementById('Txt_poliza').value = a_DatosAfiliado.NumeroContrato;  //Contrato
            document.getElementById('Txt_poliza').dataset.tag = a_DatosAfiliado.NumeroPoliza;
            document.getElementById('Txt_producto').value = a_DatosAfiliado.CodProducto;   //codigo prod
            document.getElementById('Txt_producto').dataset.tag = a_DatosAfiliado.DesProducto;
            document.getElementById('Txt_codigo_asegurado').value = a_DatosAfiliado.CodigoAfiliado;   
            document.getElementById('Txt_certificado').value = a_DatosAfiliado.NumeroCertificado; 
   
            
            
            document.getElementById('Txt_paciente_ap_nombres').value = a_DatosAfiliado.ApellidoPaternoAfiliado + " " + a_DatosAfiliado.ApellidoMaternoAfiliado  + " " + a_DatosAfiliado.NombresAfiliado;
            document.getElementById('Txt_paciente_genero').dataset.tag = a_DatosAfiliado.CodGenero ;                    //cod_genero
            document.getElementById('Txt_paciente_genero').value = a_DatosAfiliado.DesGenero;
            document.getElementById('Txt_paciente_fec_nacimiento').value = a_DatosAfiliado.FechaNacimiento;  
            document.getElementById('Txt_paciente_tipo_documento').dataset.tag = a_DatosAfiliado.CodTipoDocumentoAfiliado;       //CodTipoDocumentoAfiliado
            document.getElementById('Txt_paciente_tipo_documento').value = a_DatosAfiliado.DesTipoDocumentoAfiliado; 
            document.getElementById('Txt_paciente_num_documento').value = a_DatosAfiliado.NumeroDocumentoAfiliado;  
            document.getElementById('Txt_paciente_ini_vigencia').value = a_DatosAfiliado.FechaInicioVigencia;  
            document.getElementById('Txt_paciente_fin_vigencia').value = a_DatosAfiliado.FechaFinVigencia;  
            document.getElementById('Txt_paciente_tipo_plan_salud').dataset.tag = a_DatosAfiliado.CodTipoPlan;          //cod_tipo_plan
            document.getElementById('Txt_paciente_tipo_plan_salud').value = a_DatosAfiliado.DesTipoPlan;  
            document.getElementById('Txt_paciente_plan').value = a_DatosAfiliado.NumeroPlan;  
            
            document.getElementById('Txt_paciente_parentesco').dataset.tag = a_DatosAfiliado.CodParentesco;              //CodParentesco
            document.getElementById('Txt_paciente_parentesco').value = a_DatosAfiliado.DesParentesco;  
            document.getElementById('Txt_paciente_edad').value = a_DatosAfiliado.Edad;    
            document.getElementById('Txt_paciente_estado_civil').dataset.tag = a_DatosAfiliado.CodEstadoCivil;             //CodEstadoCivil
            document.getElementById('Txt_paciente_estado_civil').value = a_DatosAfiliado.DesEstadoCivil; 
            document.getElementById('Txt_paciente_estado').dataset.tag = a_DatosAfiliado.CodEstado;                //CodEstado
            document.getElementById('Txt_paciente_estado').value = a_DatosAfiliado.DesEstado;  
            
            document.getElementById('Txt_titular_ap_nombres').value = a_DatosAfiliado.ApellidoPaternoTitular  +  " " + a_DatosAfiliado.ApellidoMaternoTitular  +  " " + a_DatosAfiliado.NombresTitular;
            document.getElementById('Txt_titular_tipo_documento').dataset.tag = a_DatosAfiliado.CodTipoDocumentoTitular;           //CodTipoDocumentoTitular
            document.getElementById('Txt_titular_tipo_documento').value = a_DatosAfiliado.DesTipoDocumentoTitular;  
            document.getElementById('Txt_titular_num_documento').value = a_DatosAfiliado.NumeroDocumentoTitular;  
            document.getElementById('Txt_titular_contratante').value = a_DatosAfiliado.NombreContratante; 
            document.getElementById('Txt_titular_tipo_afiliacion').dataset.tag = a_DatosAfiliado.CodTipoAfiliacion; 
            document.getElementById('Txt_titular_tipo_afiliacion').value = a_DatosAfiliado.DesTipoAfiliacion; 
            document.getElementById('Txt_titular_fecha_afiliacion').value = a_DatosAfiliado.FechaAfiliacion;  
            
            document.getElementById('Txt_titular_codigo').value = a_DatosAfiliado.CodigoTitular; 
            document.getElementById('Txt_titular_moneda').dataset.tag = a_DatosAfiliado.CodMoneda;                      //cod_moneda
            document.getElementById('Txt_titular_moneda').value = a_DatosAfiliado.DesMoneda; 
            document.getElementById('Txt_titular_tipo_doc_contratante').dataset.tag = a_DatosAfiliado.CodTipoDocumentoContratante;       //CodTipoDocumentoContratante
            document.getElementById('Txt_titular_tipo_doc_contratante').value = a_DatosAfiliado.DesTipoDocumentoContratante; 
            document.getElementById('Txt_titular_num_doc_contratante').value = a_DatosAfiliado.NumeroDocumentoContratante; 
            
             for (let i =0; i < a_Coberturas.length; i++) {
   
              html += '<tr id="' + i  + `" onclick="filaSelected(this);">` +
                '<td style="display:none">' + a_Coberturas[i].CodigoTipoCobertura + '</td>' +
                '<td style="display:none">' + a_Coberturas[i].CodigoSubTipoCobertura + '</td>' +
                '<td>' + a_Coberturas[i].CodigoCobertura + '</td>' +
                '<td>' + a_Coberturas[i].Beneficios + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodIndicadorRestriccion + '</td>' +
                '<td>' + a_Coberturas[i].Restricciones + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodCopagoFijo + '</td>'+
                '<td >' + a_Coberturas[i].DesCopagoFijo + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodCopagoVariable + '</td>'+
                '<td>' + a_Coberturas[i].DesCopagoVariable + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodFechaFinCarencia + '</td>'+
                '<td>' + a_Coberturas[i].FechaFinCarencia + '</td>'+
                '<td>' + a_Coberturas[i].CondicionesEspeciales + '</td>'+
                '<td>' + a_Coberturas[i].Observaciones + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodCalificacionServicio + '</td>'+
                '<td  >' + a_Coberturas[i].DesCalificacionServicio + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].BeneficioMaximoInicial + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].NumeroCobertura + '</td>'+ 
  
  
      
              '</tr>'; 
            }  
            document.body.style.cursor = 'default' ;
            document.getElementById("tabsiteds1").click();
            document.getElementById('MSHGrid_Coberturasitedsbody').innerHTML = html;
            document.getElementById("Cmd_autorizar_consulta").disabled = false;;
            document.getElementById("Cmd_continuar_sin_siteds_drmas").disabled = false;;
             document.getElementById('Lbl_mensaje').innerHTML= "Realizado.";
          }else{
            document.body.style.cursor = 'default' ;
            document.getElementById('Lbl_mensaje').innerHTML= "No se encontro afiliados que coincida con la busqueda.";
          }
          
         }).catch(error => {
          console.log(error);
        });
       
  }else{
       document.getElementById('Lbl_mensaje').innerHTML= "El paciente esta inactivo";

   }



}



function Sub_limpiar_datos_adicionales(){
    
    //informacion general
    document.getElementById('Txt_Cod_autorizacion').value = "";
    document.getElementById('Txt_Poliza').value = "";
    document.getElementById('Txt_producto').value = "";
    document.getElementById('Txt_codigo_asegurado').value = "";
    document.getElementById('Txt_certificado').value = "";
 
    //datos del paciente
 
    document.getElementById('Txt_paciente_ap_nombres').value = "";
    document.getElementById('Txt_paciente_genero').value = "";
    document.getElementById('Txt_paciente_tipo_documento').value = "";
    document.getElementById('Txt_paciente_ini_vigencia').value = "";
    document.getElementById('Txt_paciente_tipo_plan_salud').value = "";
    document.getElementById('Txt_paciente_fec_nacimiento').value = "";
    document.getElementById('Txt_paciente_num_documento').value = "";
    document.getElementById('Txt_paciente_fin_vigencia').value = "";
    document.getElementById('Txt_paciente_plan').value = "";
    document.getElementById('Txt_paciente_parentesco').value = "";
    document.getElementById('Txt_paciente_edad').value = "";
    document.getElementById('Txt_paciente_estado_civil').value = "";
    document.getElementById('Txt_paciente_estado').value = "";

    //DATOS DEL PACIENTE SEGÚN REGISTRO DE AFILIADOS

    document.getElementById('Text23').value = "";
    document.getElementById('Text26').value = "";
    document.getElementById('Text22').value = "";
    document.getElementById('Text25').value = "";
    document.getElementById('Text21').value = "";
    document.getElementById('Text24').value = "";

    
   //DATOS DEL TITULAR
  
    document.getElementById('Txt_titular_ap_nombres').value = "";
    document.getElementById('Txt_titular_tipo_documento').value = "";
    document.getElementById('Txt_titular_contratante').value = "";
    document.getElementById('Txt_titular_tipo_afiliacion').value = "";
    document.getElementById('Txt_titular_num_documento').value = "";
    document.getElementById('Txt_titular_fecha_afiliacion').value = "";
    document.getElementById('Txt_titular_codigo').value = "";
    document.getElementById('Txt_titular_moneda').value = "";
    document.getElementById('Txt_titular_tipo_doc_contratante').value = "";
    document.getElementById('Txt_titular_num_doc_contratante').value = "";

    document.getElementById('MSHGrid_Coberturasitedsbody').innerHTML = "";
 
    

    document.getElementById('Cmd_continuar_atencion').disabled = true;
    document.getElementById('Cmd_ver_documento_autorizacion').disabled = true;
    document.getElementById('Cmd_autorizar_consulta').disabled = true;
    document.getElementById('Cmd_continuar_sin_siteds_drmas').disabled = true;

   

}

window.Cmd_autorizar_consulta_Click = function(){
    GStr_Cod_Autorizacion = "";
    GStr_Documento_Autorizacion = '';
     Sub_GENERAR_CODIGO_AUTORIZACION();

}

window.Sub_GENERAR_CODIGO_AUTORIZACION=function(){

    
    var str_error ;
    //Dim aux(0) As String
    var str_request    ;                //solicitud en formato json para enviar al WS
    var str_response   ;              //resultado en formato json que retorna del WS
    var str_metodo ;
    var i ;
     
    document.getElementById('Lbl_mensaje').innerHTML= "Generando codigo de autorización, por favor espere...";
    document.getElementById('Cmd_autorizar_consulta').disabled = true;
    document.getElementById('Cmd_continuar_sin_siteds_drmas').disabled = true;
    document.getElementById('Cmd_ver_documento_autorizacion').disabled = true;
    document.getElementById('Cmd_continuar_atencion').disabled = true;
 
    

    str_metodo = "ConsultaNumeroAutorizacion";
    var tableMSHGrid_Coberturasiteds = document.getElementById("MSHGrid_Coberturasitedsbody");
    var filatableMSHGrid_Coberturasitedsbody;
    for (var i = 0, row; row = tableMSHGrid_Coberturasiteds.rows[i]; i++) {
       if(row.style.backgroundColor == "turquoise"){
        filatableMSHGrid_Coberturasitedsbody = row;
       }
  
    }
   
    document.body.style.cursor = 'progress' ;

    let headers = new Headers({
      "Accept"       : "application/json",
      "Content-Type" : "application/json",
      //"User-Agent"   : "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"
      });
      document.getElementById('Lbl_mensaje').innerHTML= "Guardando datos" ;

    fetch("/nutricion/FN_WS_CONSULTA_METODO_JSON/" + str_metodo, {
      headers:headers ,
      method: 'POST' ,
       body: JSON.stringify({
        ApellidoMaternoAfiliado: a_DatosAfiliado.ApellidoMaternoAfiliado ,
        ApellidoPaternoAfiliado: a_DatosAfiliado.ApellidoPaternoAfiliado  ,
        BeneficioMaximoInicial: filatableMSHGrid_Coberturasitedsbody.cells[16].innerHTML.trim(),   
        CodigoAfiliado: a_DatosAfiliado.CodigoAfiliado  ,
        CodigoTitular: a_DatosAfiliado.CodigoTitular   ,
        CodCalificacionServicio: filatableMSHGrid_Coberturasitedsbody.cells[14].innerHTML.trim(),   
        CodEstado: a_DatosAfiliado.CodEstado  ,
        CodEspecialidad: a_ConsultaAfiliado[8]  ,
        CodMoneda: a_DatosAfiliado.CodMoneda   ,
        CodCopagoFijo:  filatableMSHGrid_Coberturasitedsbody.cells[6].innerHTML.trim(),
        CodCopagoVariable :  filatableMSHGrid_Coberturasitedsbody.cells[8].innerHTML.trim(), 
        CodParentesco:  a_DatosAfiliado.CodParentesco   ,
        CodProducto:   a_DatosAfiliado.CodProducto   ,
        NumeroDocumentoContratante: a_DatosAfiliado.NumeroDocumentoContratante   ,
        CodSubTipoCobertura:  filatableMSHGrid_Coberturasitedsbody.cells[1].innerHTML.trim(),
        CodTipoCobertura:   filatableMSHGrid_Coberturasitedsbody.cells[0].innerHTML.trim(),
        CodTipoAfiliacion:  a_DatosAfiliado.CodTipoAfiliacion  ,
        DesProducto: a_DatosAfiliado.DesProducto   ,
        CodEstadoMarital:  a_DatosAfiliado.CodEstadoCivil   ,
        CodFechaFinCarencia:  filatableMSHGrid_Coberturasitedsbody.cells[10].innerHTML.trim(),
        CodFechaAfiliacion: a_DatosAfiliado.CodFechaAfiliacion   ,
        CodFechaInicioVigencia: a_DatosAfiliado.CodFechaInicioVigencia  ,
        CodFechaNacimiento: a_DatosAfiliado.CodFechaNacimiento   ,
        CodGenero: a_DatosAfiliado.CodGenero   ,
        SUNASA:  a_ConsultaAfiliado[3],
        IAFAS: a_ConsultaAfiliado[4],
        CondicionesEspeciales:  filatableMSHGrid_Coberturasitedsbody.cells[12].innerHTML.trim(),
        ApellidoMaternoTitular: a_DatosAfiliado.ApellidoMaternoTitular  ,
        NombreContratante: a_DatosAfiliado.NombreContratante  ,
        ApellidoPaternoTitular: a_DatosAfiliado.ApellidoPaternoTitular  ,
        NombresAfiliado:  a_DatosAfiliado.NombresAfiliado  ,
        NombresTitular: a_DatosAfiliado.NombresTitular  ,
        NumeroCertificado:a_DatosAfiliado.NumeroCertificado   ,
        NumeroContrato: a_DatosAfiliado.NumeroContrato   ,
        NumeroDocumentoAfiliado:a_DatosAfiliado.NumeroDocumentoAfiliado   ,
        NumeroDocumentoTitular: a_DatosAfiliado.NumeroDocumentoTitular ,
        NumeroPlan: a_DatosAfiliado.NumeroPlan ,
        NumeroPoliza: a_DatosAfiliado.NumeroPoliza  ,
        RUC: a_ConsultaAfiliado[2],
        CodTipoDocumentoContratante: a_DatosAfiliado.CodTipoDocumentoContratante  ,
        CodTipoDocumentoAfiliado: a_DatosAfiliado.CodTipoDocumentoAfiliado  ,
        CodTipoDocumentoTitular: a_DatosAfiliado.CodTipoDocumentoTitular  ,
        CodTipoPlan: a_DatosAfiliado.CodTipoPlan  ,
        CodIndicadorRestriccion: filatableMSHGrid_Coberturasitedsbody.cells[4].innerHTML.trim()

 

      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '',options ;
        
        if (Object.keys(data).length>0) { 
            
          document.body.style.cursor = 'default' ;
         
           
        document.getElementById('Lbl_mensaje').innerHTML= "Codigo de autorización generado satisfactoriamente";
        document.getElementById('Txt_Cod_autorizacion').value = data.NumeroAutorizacion;
        GStr_Cod_Autorizacion = data.NumeroAutorizacion;
        GStr_Documento_Autorizacion = data.Documento;
         
       Sub_REGISTRAR_DATOS_AFILIADO(  a_DatosAfiliado, filatableMSHGrid_Coberturasitedsbody  ,   data);
          
        document.getElementById('Cmd_ver_documento_autorizacion').disabled = false;;
        document.getElementById('Cmd_continuar_atencion').disabled = false;;
          
        }else{
          document.body.style.cursor = 'default' ;
          document.getElementById('Lbl_mensaje').innerHTML= "No se encontro afiliados que coincida con la busqueda.";
        }
        
       }).catch(error => {

        console.log(error);
      });
 
    
     
    
}



window.Sub_REGISTRAR_DATOS_AFILIADO = async function  (  a_DatosAfiliado, Coberturas    ,   CodigoAutorizacion){
 
var str_1 ;
var str_2 ;


str_1 = "INSERT INTO h_SITEDS_documento_autorizacion (CodigoAutorizacion, CodigoAfiliado, NumeroPoliza, NumeroContrato," 
               + "NumeroCertificado, CodProducto, DesProducto, ApellidoPaternoAfiliado, ApellidoMaternoAfiliado, NombresAfiliado," 
               + "CodGenero, DesGenero, CodFechaNacimiento, FechaNacimiento, CodParentesco, DesParentesco," 
               + "CodTipoDocumentoAfiliado, DesTipoDocumentoAfiliado, NumeroDocumentoAfiliado, Edad," 
               + "CodFechaInicioVigencia, FechaInicioVigencia, CodFechaFinVigencia, FechaFinVigencia," 
               + "CodEstadoCivil, DesEstadoCivil, CodTipoPlan, DesTipoPlan, NumeroPlan, CodEstado, DesEstado," 
               + "CodFechaActualizacionFoto, FechaActualizacionFoto, ApellidoPaternoTitular, ApellidoMaternoTitular, NombresTitular," 
               + "CodigoTitular, CodTipoDocumentoTitular, DesTipoDocumentoTitular, NumeroDocumentoTitular, " 
               + "CodMoneda, DesMoneda, NombreContratante, CodTipoDocumentoContratante, DesTipoDocumentoContratante," 
               + "CodTipoAfiliacion, DesTipoAfiliacion, CodFechaAfiliacion,FechaAfiliacion, NumeroDocumentoContratante," 
               + "CodigoTipoCobertura, CodigoSubTipoCobertura, CodigoCobertura, Beneficios, CodIndicadorRestriccion," 
               + "Restricciones, CodCopagoFijo, DesCopagoFijo, CodCopagoVariable, DesCopagoVariable," 
               + "CodFechaFinCarencia, FechaFinCarencia, CodCalificacionServicio, DesCalificacionServicio, BeneficioMaximoInicial, NumeroCobertura, fecha_creacion_doc_aut, hora_creacion_doc_aut) "
                        
                       
str_2 = "VALUES ( '" + CodigoAutorizacion.NumeroAutorizacion + "', '" + a_DatosAfiliado.CodigoAfiliado + "', '" + a_DatosAfiliado.NumeroPoliza + "', '" + a_DatosAfiliado.NumeroContrato + "', '" + a_DatosAfiliado.NumeroCertificado + "', " 
               + "'" + a_DatosAfiliado.CodProducto + "', '" + a_DatosAfiliado.DesProducto + "', '" + a_DatosAfiliado.ApellidoPaternoAfiliado + "', '" + a_DatosAfiliado.ApellidoMaternoAfiliado + "', " 
               + "'" + a_DatosAfiliado.NombresAfiliado + "', '" + a_DatosAfiliado.CodGenero + "', '" + a_DatosAfiliado.DesGenero + "', '" + a_DatosAfiliado.CodFechaNacimiento + "', " 
               + "'" + a_DatosAfiliado.FechaNacimiento + "', '" + a_DatosAfiliado.CodParentesco + "', '" + a_DatosAfiliado.DesParentesco + "', '" + a_DatosAfiliado.CodTipoDocumentoAfiliado + "', " 
               + "'" + a_DatosAfiliado.DesTipoDocumentoAfiliado + "', '" + a_DatosAfiliado.NumeroDocumentoAfiliado + "', '" + a_DatosAfiliado.Edad + "', '" + a_DatosAfiliado.CodFechaInicioVigencia + "', " 
               + "'" + a_DatosAfiliado.FechaInicioVigencia + "', '" + a_DatosAfiliado.CodFechaFinVigencia + "', '" + a_DatosAfiliado.FechaFinVigencia + "', '" + a_DatosAfiliado.CodEstadoCivil + "', " 
               + "'" + a_DatosAfiliado.DesEstadoCivil + "', '" + a_DatosAfiliado.CodTipoPlan+ "', '" + a_DatosAfiliado.DesTipoPlan + "', '" + a_DatosAfiliado.NumeroPlan + "', " 
               + "'" + a_DatosAfiliado.CodEstado + "', '" + a_DatosAfiliado.DesEstado + "', '" + a_DatosAfiliado.CodFechaActualizacionFoto + "', '" + a_DatosAfiliado.FechaActualizacionFoto + "', " 
               + "'" + a_DatosAfiliado.ApellidoPaternoTitular + "', '" + a_DatosAfiliado.ApellidoMaternoTitular + "', '" + a_DatosAfiliado.NombresTitular+ "', '" + a_DatosAfiliado.CodigoTitular+ "', " 
               + "'" + a_DatosAfiliado.CodTipoDocumentoTitular + "', '" + a_DatosAfiliado.DesTipoDocumentoTitular + "', '" + a_DatosAfiliado.NumeroDocumentoTitular + "', '" + a_DatosAfiliado.CodMoneda + "', " 
               + "'" + a_DatosAfiliado.DesMoneda + "', '" + a_DatosAfiliado.NombreContratante + "', '" + a_DatosAfiliado.CodTipoDocumentoContratante + "', '" + a_DatosAfiliado.DesTipoDocumentoContratante + "', " 
               + "'" + a_DatosAfiliado.CodTipoAfiliacion + "', '" + a_DatosAfiliado.DesTipoAfiliacion + "', '" + a_DatosAfiliado.CodFechaAfiliacion+ "', '" + a_DatosAfiliado.FechaAfiliacion + "', '" + a_DatosAfiliado.NumeroDocumentoContratante + "', " 
               + "'" + Coberturas.cells[0].innerHTML + "', '" + Coberturas.cells[1].innerHTML + "', '" + Coberturas.cells[2].innerHTML + "', '" + Coberturas.cells[3].innerHTML + "', '" + Coberturas.cells[4].innerHTML + "', " 
               + "'" + Coberturas.cells[5].innerHTML + "', " + Coberturas.cells[6].innerHTML+ ", '" + Coberturas.cells[7].innerHTML + "', " + Coberturas.cells[8].innerHTML + ", '" + Coberturas.cells[9].innerHTML + "', " 
               + "'" + Coberturas.cells[10].innerHTML + "', '" + Coberturas.cells[11].innerHTML + "', '" + Coberturas.cells[14].innerHTML + "', " 
               + "'" + Coberturas.cells[15].innerHTML + "', '" + Coberturas.cells[16].innerHTML + "', '" + Coberturas.cells[17].innerHTML + "', current_date, current_time(0)::TIME WITHOUT TIME ZONE)"
               
   
   await fetch('/modulo/Execute/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: str_1 + str_2

    })
  }).then(response => response.json())
    .then(function (data) {
      

    }).catch(error => {
      console.log(error);
    });
    await fetch('/modulo/Execute/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "UPDATE h_SITEDS_documento_autorizacion SET Documentoautorizacion = '" + CodigoAutorizacion.Documento+ "' WHERE CodigoAutorizacion = '" + CodigoAutorizacion.NumeroAutorizacion+ "'"
  
      })
    }).then(response => response.json())
      .then(function (data) {
        
  
      }).catch(error => {
        console.log(error);
      });
      await fetch('/modulo/Execute/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "UPDATE h_SITEDS_documento_autorizacion SET CondicionesEspeciales = '" + Coberturas.cells[12].innerHTML + "', Observaciones = '" + Coberturas.cells[13].innerHTML + "' WHERE CodigoAutorizacion = '" + CodigoAutorizacion.NumeroAutorizacion + "'"
    
        })
      }).then(response => response.json())
        .then(function (data) {
          
    
        }).catch(error => {
          console.log(error);
        });
      


}

window.Cmd_ver_documento_autorizacion_Click= function(){

document.getElementById('aCmd_ver_documento_autorizacion').download = 'DocumentoAutorizacion'+ GStr_Cod_Autorizacion ;
document.getElementById('aCmd_ver_documento_autorizacion').href = 'data:application/pdf;base64,'+GStr_Documento_Autorizacion;
document.getElementById('aCmd_ver_documento_autorizacion').click();


}
 
var GArr_Cobertura_clinica_origen = [];
window.Cmd_continuar_atencion_Click = async function (){

var html;

GStr_SITEDS_Cod_Cliente = document.getElementById('Dcbo_Aseguradora').value;   //obtiene el nombre para que el formulario de creacion lo pueda buscar

if (document.getElementById('Dcbo_Aseguradora').value == "111") { //FEBAN
    GStr_SITEDS_Cod_Especialidad = document.getElementById('Dcbo_Especialidad').value ;
}else{
    GStr_SITEDS_Cod_Especialidad = "";
}
GStr_SITEDS_Cod_Especialidad = "";
GStr_SITEDS_Apellido_Paterno = a_DatosAfiliado.ApellidoPaternoAfiliado;
GStr_SITEDS_Apellido_Materno = a_DatosAfiliado.ApellidoMaternoAfiliado;
GStr_SITEDS_Nombres = a_DatosAfiliado.NombresAfiliado;
var filas = document.querySelectorAll('#MSHGrid_Coberturasitedsbody>tr');
var fila_sel;
  filas.forEach(element => {
    if(element.style.backgroundColor == "turquoise"){
      return fila_sel = element;
      
    }
  })
 //codigo de documento de identidad de SUSALUD
//Código  Tipo de documento

//1   DNI
//2   Carné de extranjería
//3   Pasaporte
//4   Documento de Identidad Extranjero
//5   Código Único de Identificación (CUI)  en Acta de Nacimiento
//6   Código Nacido Vivo (CNV)
//7   Sin Documento de Identidad
//GArr_Clinica_origen[0] = '';//document.getElementById('Dcbo_Clinica_origen').value; revisare
//GArr_Clinica_origen[1] = '';//document.getElementById('Dcbo_Clinica_origen').text;  revisare
GArr_Cobertura_clinica_origen = [];
GArr_Cobertura_clinica_origen = a_Coberturas[fila_sel.id];
var  rst_aux = "SELECT id_doc_id FROM mae_documento_identidad WHERE cod_doc_id_susalud = '" + a_DatosAfiliado.CodTipoDocumentoAfiliado + "'";

await fetch('/modulo/Abre_Detalle/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: rst_aux

  })
}).then(response => response.json())
  .then(function (data) {
    
switch (a_DatosAfiliado.CodTipoDocumentoAfiliado) {
  case 1:
  case 2:
  case 3: 
      if(data.length>0){
         GStr_SITEDS_Cod_doc_id = data.id_doc_id;
      }
  break;
  default:
      GStr_SITEDS_Cod_doc_id = 2 ;//id de doctormas para el DNI
  break;
}
    

  }).catch(error => {
    console.log(error);
  }); 
  
  GStr_SITEDS_Numero_doc_id = a_DatosAfiliado.NumeroDocumentoAfiliado;
    //if (GArr_Clinica_origen[0] != "") {  revisare
    var html='';
              if (GStr_Cod_Autorizacion  != "" ){
                        
                   //     document.getElementById('Txt_contratante').value = a_DatosAfiliado.NombreContratante;
                        document.getElementById('Txt_cod_aseg').value = a_DatosAfiliado.CodigoAfiliado;
                        document.getElementById('Txt_cod_aseg').Tag = a_DatosAfiliado.destipoafiliacion;
                        document.getElementById('Txt_prod').value = a_DatosAfiliado.DesProducto;
                        document.getElementById('Txt_Poliza').value = a_DatosAfiliado.NumeroContrato;
                        document.getElementById('Txt_pol_cert').value = a_DatosAfiliado.NumeroCertificado;
            
                         
                        html += '<tr id="' + fila_sel.id  + `" onclick="filaSelected(this);">` +
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodigoTipoCobertura + '</td>' +
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodigoSubTipoCobertura + '</td>' +
                        '<td>' + a_Coberturas[fila_sel.id].CodigoCobertura + '</td>' +
                        '<td>' + a_Coberturas[fila_sel.id].Beneficios + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodIndicadorRestriccion + '</td>' +
                        '<td>' + a_Coberturas[fila_sel.id].Restricciones + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodCopagoFijo + '</td>'+
                        '<td >' + a_Coberturas[fila_sel.id].DesCopagoFijo + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodCopagoVariable + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].DesCopagoVariable + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodFechaFinCarencia + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].FechaFinCarencia + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].CondicionesEspeciales + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].Observaciones + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodCalificacionServicio + '</td>'+
                        '<td  >' + a_Coberturas[fila_sel.id].DesCalificacionServicio + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].BeneficioMaximoInicial + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].NumeroCobertura + '</td>'+ 
                      '</tr>'; 
              }  
                    
                    document.getElementById('MSHGrid_Coberturasitedsbody').innerHTML = html;
                        
                        if (GStr_Cod_Autorizacion == "0" ){
                            //GStr_Cod_Autorizacion = "0" solo sirve para poder escribir los datos dde la clinica de origen
                          // sin haberse generado SITEDS de Drmas
                            GStr_Cod_Autorizacion = "" ; // para la validacion que antes de escribir todos los datos del SITEDS
                          
                        }
                        
                    Verificar_cod_autorizacion_creacion();
                        
                        //sobrescribe el dato del coaseguro por el dato de la clinica de origen
                        document.getElementById('txt_coa').value = 100  - (a_Coberturas[fila_sel.id].CodCopagoVariable) ;   
                        document.getElementById('Txt_ded').value =  (a_Coberturas[fila_sel.id].CodCopagoFijo) ;   
                        Txt_ded_Change(a_Coberturas[fila_sel.id].CodCopagoFijo);
                        // document.getElementById('txt_coa').value = document.getElementById('txt_coa').value  ;   

  //  }

    document.getElementById('Cmd_salir_siteds').click();
}

window.Verificar_cod_autorizacion_creacion = async function (){


  var  rst_AutSITEDS  ;

  if  (GStr_Cod_Autorizacion != "" ){
  

      document.getElementById('Cmd_datos_siteds').disabled = true;
    //  document.getElementById('Dcbo_aseguradora').disabled = true;
        //distribuye los codigos registrados en la BD a los campos indicados     
      await  fetch('/modulo/Abre_Detalle/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "SELECT * FROM h_SITEDS_documento_autorizacion WHERE codigoautorizacion = '" + GStr_Cod_Autorizacion + "'"

          })
        }).then(response => response.json())
          .then(function (rst_AutSITEDS) {
      
              if(rst_AutSITEDS.length>0){
               
                document.getElementById('TxtCodAut').value = rst_AutSITEDS[0].codigoautorizacion;
                document.getElementById('Txt_cod_aseg').value = rst_AutSITEDS[0].codigoafiliado;
                document.getElementById('Txt_tipo_afiliacion').value = rst_AutSITEDS[0].destipoafiliacion;
                document.getElementById('Txt_prod').value = rst_AutSITEDS[0].desproducto;
                document.getElementById('Txt_Poliza').value = rst_AutSITEDS[0].numeropoliza;
                document.getElementById('Txt_pol_cert').value = rst_AutSITEDS[0].numerocertificado;
                document.getElementById('Dcbo_aseguradora').value = GStr_SITEDS_Cod_Cliente;
 
                    
                  
                  
                  if (new Date(rst_AutSITEDS[0].FechaNacimiento) <= new Date()){
                      document.getElementById('DTFecNac').value =  rst_AutSITEDS[0].FechaNacimiento;
                  }
                  
                  //Moneda
                  //If Trim(rst_AutSITEDS!CodMoneda) = "1" Then
                  //    Cbo_Moneda.ListIndex = 0
                  //Else
                  //    Cbo_Moneda.ListIndex = 1
                  //End If
                  
                  //coaseguro
                  //txt_coa.Text = 100 - Val(rst_AutSITEDS!CodCopagoVariable)
                  //txt_coa.Enabled = false;
                
                  
                 //datos adicionales del formulario de siteds
                  
                  if (GStr_SITEDS_Apellido_Paterno == "" ) GStr_SITEDS_Apellido_Paterno = ".";
                  if (GStr_SITEDS_Apellido_Materno == "" ) GStr_SITEDS_Apellido_Materno = ".";
                  
                  document.getElementById('Txt_ApPat').value = GStr_SITEDS_Apellido_Paterno;
                  document.getElementById('Txt_ApMat').value = GStr_SITEDS_Apellido_Materno;
                  document.getElementById('Txt_Nombres').value = GStr_SITEDS_Nombres;

                  
                  document.getElementById('Txt_ApPat').disabled = true;
                  document.getElementById('Txt_ApMat').disabled = true;
                  document.getElementById('Txt_Nombres').disabled = true;

                  document.getElementById('DC_tipo_doc_id').value = GStr_SITEDS_Cod_doc_id;
                  document.getElementById('Txt_num_doc_id').value = rst_AutSITEDS[0].numerodocumentoafiliado;

                   IN_Hhabilitar_controles(false);
                   
              }
          
          }).catch(error => {
            console.log(error);
          }); 
   
  }
  //por ser una variable global se limpia para evitar confusiones
  GStr_Cod_Autorizacion = ""; 
}


function Txt_ded_Change(val){
  /* if(document.getElementById('Cbo_Moneda').value != "S/."){
    document.getElementById('Lbl2_ded_usd').value = RedondeaDed(val * lsg_cambio);
  }
  
  if( val > 0 ){
    document.getElementById('Lbl_doc_pago').style.visibility = 'visible';
    document.getElementById('Cbo_doc_pago').style.visibility = 'visible';
   
  }else{
    document.getElementById('Lbl_doc_pago').style.visibility = 'hidden';
    document.getElementById('Cbo_doc_pago').style.visibility = 'hidden';
   
  } */
  
  }
  