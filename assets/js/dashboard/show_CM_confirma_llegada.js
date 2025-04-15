import {P_VNRyCANCELAR_CM,EJECUTAR_SENTENCIA_BD_TABLET, getusuario,Execute,REGISTRA_T_LLAMADAS,REGISTRA_CM_AUDITORIA,P_envio_msj,dragElement,destinatario,MensBepeer,Prefijo,flag_Beeper,Gs_CodDr,Executeinsert,CREABEEPER_ATE,P_COD_ASIG_COMBO_MEDICO,VNom_conductor,VCod_asignacion} from './module.js'; 
 
 
var L_CodAte;
 var l_estado_audi;
 var Adata_atencion =[];
var acepta_boleta;
 (async function(){ 
  var query ="";
  var str_forma_pago='';
  query = "SELECT trim(dir.des_dir) direccion, trim(dir.ref_dir) referencia, CASE WHEN dir.nro_dir_lote is null then '' ELSE dir.nro_dir_lote END nro_dir_lote, " 
  + " CASE WHEN dir.dir_dpto_interior is null then '' ELSE  dir.dir_dpto_interior END dir_dpto_interior, " 
  + " CASE WHEN dir.dir_urbanizacion is null then '' ELSE dir.dir_urbanizacion END dir_urbanizacion, a.*, c.* FROM t_tmpllamadas a " 
  + " INNER JOIN m_direcciones dir ON a.cod_tit = dir.cod_tit AND a.cod_dir = dir.cod_dir " 
  + " INNER JOIN m_doctores b ON a.cod_doc = b.cod_doc " 
  + " INNER JOIN m_proveedor_medico c ON b.cod_prov_medico = c.cod_prov_medico WHERE a.cod_ate = " + document.getElementById('Txt_CodAte').value;
 
  await fetch('/modulo/Abre_Detalle/', {
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
    if (data.length >0){
      
                  l_estado_audi = Adata_atencion[0].cm_estado;
                  document.getElementById('Txt_paciente').value = Adata_atencion[0].nom_pac.trim();
                  document.getElementById('Txt_distrito').value = Adata_atencion[0].des_dis.trim();
                  document.getElementById('Txt_direccion').value = Adata_atencion[0].direccion + " " + Adata_atencion[0].nro_dir_lote + " " + Adata_atencion[0].dir_dpto_interior;
                  document.getElementById('Txt_medico').value = Adata_atencion[0].nom_doc.trim();
              

 
                    fetch('/modulo/Abre_Detalle', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query:"SELECT * FROM t_doctorxchofer WHERE asig_activo = true AND cod_doc = '" +  Adata_atencion[0].cod_doc.trim() + "'"
                       })
                  
                     }).then(response => response.json())
                    .then(function (lrs_aux ) {
                      if(lrs_aux.length>0) {   
                        document.getElementById('Txt_conductor').value = lrs_aux[0].nom_mot ; 
                       }
                    }).catch(error => {
                      console.log(error);
                    });
               
                  
    }
     
     
   }).catch(error => {
    console.log(error);    
  });  
      
})();
 


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




 window.Cmd_reenviar_Click= async function(){
    
     await P_envio_msj("ATE", document.getElementById('Txt_CodAte').value);
       printModal(Frm_CM_EnvMsj(document.getElementById('Txt_CodAte').value));
     var ed_modal_content = document.getElementById("ed-modal-content");
     dragElement(ed_modal_content); 
     ed_modal_content.style.minWidth = "90vw";
     ed_modal_content.style.top = '45vh';

     var  lrs_medico ;
    
     await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "SELECT * FROM t_tmpllamadas WHERE cod_ate = " + document.getElementById('Txt_CodAte').value
      })
    }).then(response => response.json())
      .then(function (Adata_atencion) {
        if(Adata_atencion.length>0){
          l_estado_audi = Adata_atencion[0].cm_estado; 
            fetch('/modulo/Abre_Detalle/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "SELECT * FROM m_doctores WHERE cod_doc = '" +  (Adata_atencion[0].cod_doc).trim() + "'"
      
            })
            }).then(response => response.json())
            .then(function (lrs_medico) {
               if(lrs_medico.length>0){
                if (lrs_medico[0].flg_mensajes == 't') {
                    document.getElementById('Txt_nxtl_1').value = (lrs_medico[0].beeper_doc!=null?lrs_medico[0].beeper_doc: "");
                }else{
                  document.getElementById('Txt_nxtl_1').value = "";
                }
             
              }
      
            }).catch(error => {
              console.log(error);
            });
    
        }

      }).catch(error => {
        console.log(error);
      });
  
     
     
     if (destinatario.trim().length > 0 ){
         document.getElementById('Txt_Dest_1').value = destinatario;
     }else{
      document.getElementById('Txt_Dest_1').value = " ";
     }
     //destinatario = ""
     
     document.getElementById('Txt_nxtl_2').value = "";
     document.getElementById('Txt_Dest_2').value = "";
     
     document.getElementById('Lbl_D2').value = true;
     document.getElementById('Txt_nxtl_2').style.visibility = 'visible';
     document.getElementById('Txt_Dest_2').style.visibility = 'visible';
     document.getElementById('DCbo_Chofer').style.visibility = 'visible';
     
       await fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "SELECT b.* FROM t_doctorxchofer as a, m_motorizados as b WHERE a.cod_mot = b.cod_mot AND a.anulada is null AND a.cod_doc = '" + Gs_CodDr + "' ORDER BY cod_asig DESC LIMIT 1"
  
        })
      }).then(response => response.json())
        .then(function (Adata_Chofer) {
          if(Adata_Chofer.length==0){
            document.getElementById('DCbo_Chofer').disabled = true;
            document.getElementById('Txt_nxtl_2').disabled = true;
            //MsgBox "No se ha creado combo con conductor, no se puede continuar, por favor realizar las gestiones para que se pueda crear el combo", vbInformation
            //Exit Sub
         
          }else{
              if (Adata_Chofer[0].flg_mensajes == 't' ){
                document.getElementById('Txt_nxtl_2').value = Adata_Chofer[0].beeper_mot.trim()
              }else{
                document.getElementById('Txt_nxtl_2').value = "";
              }
              document.getElementById('Txt_Dest_2').value = Adata_Chofer[0].nom_mot.trim();
          }
  
        }).catch(error => {
          console.log(error);
        });
     
     
      await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:  "SELECT nom_mot, beeper_mot FROM m_motorizados WHERE flag_mot in ('C') AND activi = true ORDER BY nom_mot ASC"

      })
    }).then(response => response.json())
      .then(function (Adata_Chofer) {
        if(Adata_Chofer.length==0){
          
       
        } 

      }).catch(error => {
        console.log(error);
      });
     
     document.getElementById('TxtMen').value =  MensBepeer;
     
}
 



function Frm_CM_EnvMsj(codigo){

  return `
  <style> 
  .Frm_CM_EnvMsj {
    display: grid;
    grid-template-columns: 0.7fr 0.7fr 1.6fr;
   
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . ."
      ". . ."
      ". . .";
  }
  
  
  </style>
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> Envio de mensajes</h6><button type="button"  id="cancelarFrm_CM_EnvMsj" class="cancelarmodal btn-xs btn-danger">X</button></div>

  <div class="Frm_CM_EnvMsj">
  <label id="Label1">Destinatario 1 :</label>
  <input type="text" id="Txt_nxtl_1" name = "Txt_nxtl_1"  >   
  <input type="text" id="Txt_Dest_1" name = "Txt_Dest_1"  >   
  <label id="Lbl_D2">Destinatario 2 :</label>
  <input type="text" id="Txt_nxtl_2" name = "Txt_nxtl_2"  >   
  <input type="text" id="Txt_Dest_2" name = "Txt_Dest_2"  >   
  <div style="grid-column:1/3"><label id="Label2">Mensaje:</label></div>
  <div><select id ="DCbo_Chofer" name="DCbo_Chofer"></select></div>
  <div style="grid-column:1/4">
  <textarea style="width:100%" id="TxtMen" name="TxtMen" rows="5" > 
  </textarea>
  </div>
  <div style="grid-column:1/4;display:flex;justify-content: flex-end">
  <input type="button"  class="btn btn btn-success btn-sm"  id="CmdAceptar" name="CmdAceptar" onClick="CmdAceptar_Click();" value="Aceptar"> 
  <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Command1modal" name="Command1modal"   value="Cancelar"> 

  </div>

    
`;

}




window.CmdAceptar_Click = async function (){
       
    if (document.getElementById('Txt_nxtl_2').value != "" ){
       // if  (MDIMenuPrincipal.Tag) == "HIPOCRATES" ){
              await LOGBEEPER_ATE(Prefijo, document.getElementById('TxtMen').value.trim(), document.getElementById('Txt_nxtl_2').value.trim(), document.getElementById('Txt_Dest_2').value.trim());
              await CREABEEPER_ATE(Prefijo, document.getElementById('TxtMen').value.trim(), document.getElementById('Txt_nxtl_2').value.trim());
       // }
    }
        
    if (flag_Beeper == "ATE" ){
        if (Adata_atencion[0].cm_estado.trim() == "R4" ){
             await  Execute ("UPDATE t_tmpllamadas set cm_estado = 'R5', cm_orden = 6, fec_env_sms = '" + new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "', hor_env_sms = '" + new Date().toTimeString().slice (0,8) + "' where cod_Ate =" + Adata_atencion[0].cod_ate);
            await REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value, l_estado_audi + "->R5", "MEDICO: " + document.getElementById('Txt_Dest_1').value + ", CONDUCTOR: " + document.getElementById('Txt_Dest_2').value, "ENVIO DE MENSAJE DE TEXTO");
        }else{
            await Execute ("UPDATE t_tmpllamadas set cm_estado = '5', cm_orden = 6, fec_env_sms = '" + new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "', hor_env_sms = '" + new Date().toTimeString().slice (0,8) + "' where cod_Ate =" + Adata_atencion[0].cod_ate);
            await  REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value, l_estado_audi + "->5", "MEDICO: " + document.getElementById('Txt_Dest_1').value + ", CONDUCTOR: " + document.getElementById('Txt_Dest_2').value, "ENVIO DE MENSAJE DE TEXTO");
        }
    }else{
           await  REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value, l_estado_audi + "->" + l_estado_audi, "MEDICO: " + document.getElementById('xt_Dest_1').value + ", CONDUCTOR: " + document.getElementById('Txt_Dest_2').value, "REENVIO DE MENSAJE DE TEXTO");
    }
     
    appMainWindow.document.getElementById('Cbo_opcion').value = 14;
    appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block'
    appMainWindow.document.getElementById('Txt_busqueda').value=document.getElementById('Txt_CodAte').value;
    await appMainWindow.document.getElementById('CmdFiltrar').click();
    //flag_Beeper = "";
    document.getElementById('Command1modal').click();
    
}
window.Command1_Click = async function(){

  //--primero busca la asignacion de medico con conductor activo en el momento de llegar a casa de paciente
  var hora_llegada ;
  var fecha_llegada;
  var ate_reprog ;
  var Cod_asignacion ;
  var Nom_conductor;
  var v_fecha_sis     ;
  var v_fecha_ate    ;

  var ate_reprog = ""
  var hora_llegada = new Date().toTimeString().slice (0,8);
  var fecha_llegada = new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-');
   
  document.getElementById('Command1').disabled = true;
  document.body.style.cursor = 'progress';
  //busca el combo al cual se va a asignar a la atencion
  await P_COD_ASIG_COMBO_MEDICO(Adata_atencion[0].cod_doc.trim(), fecha_llegada, hora_llegada, Cod_asignacion, Nom_conductor);
  
  /* if ( InStr(1,  (Adata_atencion[0].cm_estado), "R") > 0 ){
      ate_reprog = "R";
  }else{ */
      ate_reprog = "";
      //G_db.Execute ("UPDATE t_tmpllamadas SET cm_estado = '7', cm_orden = 8, FECOPLLA_ATE = '" + fecha_llegada + "', horoplla_ate = '" + hora_llegada + "', USUOPLLA_ATE = '" + Usuario + "' WHERE cod_ate = " + Val(Txt_CodAte.Text))
      //Call REGISTRA_CM_AUDITORIA(Val(Txt_CodAte.Text), l_estado_audi + "->7", "MEDICO: " + Txt_medico.Text + ", CONDUCTOR: " + Txt_conductor.Text, "CONFIRMACION DE LLEGADA DE MEDICO")
  /* } */

  await Execute ("UPDATE t_tmpllamadas SET cm_estado = '" + ate_reprog + "7', cod_asig = " + (VCod_asignacion == 0? null: VCod_asignacion) + ", cm_orden = 8, FECOPLLA_ATE = '" + fecha_llegada + "', horoplla_ate = '" + hora_llegada + "', USUOPLLA_ATE = '" + await getusuario() + "' WHERE cod_ate = " + document.getElementById('Txt_CodAte').value)
  await REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value, l_estado_audi + "->" + ate_reprog + "7", "MEDICO: " + document.getElementById('Txt_medico').value + ", CONDUCTOR: " + VNom_conductor, "CONFIRMACION DE LLEGADA DE MEDICO")
  document.body.style.cursor = 'default';

    alert("Se confirmo la llegada");
   
    appMainWindow.document.getElementById('Cbo_opcion').value = 14;
    appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block';
    appMainWindow.document.getElementById('Cb_clasificacion').style.display='none' ;
    appMainWindow.document.getElementById('Txt_busqueda').value=document.getElementById('Txt_CodAte').value;
    await appMainWindow.document.getElementById('CmdFiltrar').click();
    window.close();
    

}




async function LOGBEEPER_ATE(Scod_serv , Smens , Sabonado , Sdestinat ){
    var Rst_log ;
    var correla ;

   
    await fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:"SELECT * FROM t_logbeep_ate WHERE cod_ate = " + Scod_serv + " ORDER BY correl DESC"
         })

       }).then(response => response.json())
      .then(function (Rst_log ) {
        if(Rst_log.length>0) {
           correla = parseInt(Rst_log[0].correl) + 1;
        }else{ 
           correla = 1;
        }
      }).catch(error => {
        console.log(error);
      });
     var rst_log = {};
    rst_log.cod_ate =  Scod_serv;
    rst_log.correl = correla;
    rst_log.abonado = Sabonado;
    rst_log.nombre = Sdestinat;
    rst_log.hora = new Date().toTimeString().slice (0,8);
    rst_log.fecha = new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-');
    rst_log.mensaje = Smens;
    rst_log.usuario = await  getusuario();
    rst_log.tabla='t_logbeep_ate';
    Executeinsert(rst_log);
}










 
