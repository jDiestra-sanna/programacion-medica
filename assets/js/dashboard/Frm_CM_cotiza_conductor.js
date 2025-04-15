import {P_VNRyCANCELAR_CM,min_a_horas} from './module.js'; 
var L_CodAte;
 var l_estado_audi; 
 var Adata_atencion;
 (function(){  
  var lrs_aux ;
      
    fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "Select * FROM t_tmpllamadas where cod_ate = " + document.getElementById('Txt_CodAte').value
       })
  
     }).then(response => response.json())
    .then(function (data ) {
      if(data.length>0) {
            Adata_atencion = data;
           //mostrar los datos de la cotizacion
            l_estado_audi = Adata_atencion[0].cm_estado;
            
            CARGA_DIRECCION( Adata_atencion[0].cod_tit.trim(),   Adata_atencion[0].cod_dir.trim());
            
            document.getElementById('Txt_medico').value =  Adata_atencion[0].nom_doc.trim();
              
            fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:"SELECT * FROM m_doctores WHERE activi = true AND cod_doc = '" + Adata_atencion[0].cod_doc.trim() +"'"
                 })
            
               }).then(response => response.json())
              .then(function (lrs_aux ) {
                if(lrs_aux.length>0) {  
                  document.getElementById('Txt_beeper_dr').value  =  lrs_aux[0].beeper_doc??=''  ; 
                 }
              }).catch(error => {
                console.log(error);
              }); 
                
            fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:"SELECT * FROM t_doctorxchofer WHERE asig_activo = true AND cod_doc = '" + Adata_atencion[0].cod_doc.trim()+ "'"
                 })
            
               }).then(response => response.json())
              .then(function (lrs_aux ) {
                if(lrs_aux.length>0) {  
                  document.getElementById('Txt_conductor').value   =  Adata_atencion[0].nom_mot.trim();
                
                  fetch('/modulo/Abre_Detalle', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "SELECT * FROM m_motorizados WHERE cod_mot = '" + Adata_atencion[0].cod_mot.trim()+ "'"
                       }) 
                     }).then(response => response.json())
                    .then(function (lrs_aux1 ) {
                      if(lrs_aux1.length>0) {  
                        document.getElementById('Txt_beeper_mot').value  = lrs_aux1[0].beeper_mot??=''  ;  
                      }
                    }).catch(error => {
                      console.log(error);
                    }); 
       
                 }
              }).catch(error => {
                console.log(error);
              });
            if ( Adata_atencion[0].clasificacion_pac == 2){
                document.getElementById('Cbo_tiempo').value = 30;
            }
       }
    }).catch(error => {
      console.log(error);
    });
   
  
  
  
    document.getElementById('Cbo_tiempo').focus();
})();
 

function CARGA_DIRECCION(pCodTit , pCodDir ){ 
   

    fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:"SELECT * FROM vw_datos_paciente_direccion WHERE cod_paciente = '" + pCodTit + "' AND cod_dir = '" + pCodDir + "' ORDER BY direccion ASC"
         })
    
       }).then(response => response.json())
      .then(function (rst_direccion ) {
        if(rst_direccion.length>0) {
          document.getElementById('Txt_distrito').value = rst_direccion[0].departamento +  " - " +  rst_direccion[0].provincia + " - " + rst_direccion[0].distrito;
          document.getElementById('Txt_direccion').value =  rst_direccion[0].direccion.trim() ;
          document.getElementById('Txt_nro_lote').value  = rst_direccion[0].nro_dir_lote.trim() ;
          document.getElementById('Txt_dpto_dir').value  = rst_direccion[0].dir_dpto_interior.trim() ;
          document.getElementById('Txt_Urbanizacion').value = rst_direccion[0].dir_urbanizacion.trim() ;
          document.getElementById('Txt_referencia').value   = rst_direccion[0].referencia.trim() ;
         }
      }).catch(error => {
        console.log(error);
      });
   
} 

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}
Date.prototype.addMinutes = function(h) {
  this.setTime(this.getTime() + (h*60*1000));
  return this;
}
 window.Cmd_guardar_Click = async function (){
  var lv_auxfechora ;
  var ls_agregar_audi ;
  //validacion
  if (document.getElementById('Cbo_tiempo') == "" ){
      alert("Ingrese el tiempo estimado de llegada a domicilio");
      document.getElementById('Cbo_tiempo').focus();
      return;
  }
    
document.getElementById('Cmd_guardar').disabled = true;
document.body.style.cursor = 'progress';
      lv_auxfechora = new Date().addHours(parseInt(min_a_horas(document.getElementById('Cbo_tiempo').value).slice(0,2)));  
      lv_auxfechora = new Date().addMinutes(parseInt(min_a_horas(document.getElementById('Cbo_tiempo').value).slice(3,5)));  
       ls_agregar_audi = "MEDICO: " + document.getElementById('Txt_medico').value + ", CONDUCTOR: " + document.getElementById('Txt_conductor').value  + ", TIEMPO VALIDADO: " +  document.getElementById('Cbo_tiempo').value;
      
      if (Adata_atencion[0].cm_estado == "3" ){
          
          await fetch('/modulo/Execute', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query:"Update t_tmpllamadas SET HRLLeDR = '" +   lv_auxfechora.getHours().toString().padStart(2, '0') + ':' + lv_auxfechora.getMinutes().toString().padStart(2, '0') + ':' + lv_auxfechora.getSeconds().toString().padStart(2, '0') + "',feclledr = '" + lv_auxfechora.getDate().toString().padStart(2, '0') + '/' + (lv_auxfechora.getMonth() + 1).toString().padStart(2, '0') + '/' + lv_auxfechora.getFullYear() + "', flg_cm_nueva = false, cm_estado = '5', cm_orden = 6 WHERE cod_ate = " +   document.getElementById('Txt_CodAte').value    
            })
          }).then(response => response.json())
            .then(function (data) {
               
            }).catch(error => {
              console.log(error);
            });
           await fetch('/modulo/REGISTRA_CM_AUDITORIA/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { 
                 ll_cod_ate :   document.getElementById('Txt_CodAte').value,
                 ls_estado : "3->5",
                 ls_cambios : ls_agregar_audi,
                 ls_obs : "VALIDACION DE TIEMPO"
        
                }
            )
          }).then(response => response.json())
            .then(function (data) {
             if(data){
                 
             }
        
            }).catch(error => {
              console.log(error);
            })
      }else{
           await fetch('/modulo/Execute', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query:"Update t_tmpllamadas SET HRLLeDR = '" +   lv_auxfechora.getHours().toString().padStart(2, '0') + ':' + lv_auxfechora.getMinutes().toString().padStart(2, '0') + ':' + lv_auxfechora.getSeconds().toString().padStart(2, '0') + "',feclledr = '" + lv_auxfechora.getDate().toString().padStart(2, '0') + '/' + (lv_auxfechora.getMonth() + 1).toString().padStart(2, '0') + '/' + lv_auxfechora.getFullYear() + "', flg_cm_nueva = false, cm_estado = '5', cm_orden = 6 WHERE cod_ate = " +   document.getElementById('Txt_CodAte').value    
            })
          }).then(response => response.json())
            .then(function (data) {
              
      
            }).catch(error => {
              console.log(error);
            }); 
 
          await fetch('/modulo/REGISTRA_CM_AUDITORIA/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { 
                 ll_cod_ate :   document.getElementById('Txt_CodAte').value,
                 ls_estado : "3->5",
                 ls_cambios : ls_agregar_audi,
                 ls_obs : "RPG - VALIDACION DE TIEMPO"
        
                }
            )
          }).then(response => response.json())
            .then(function (data) {
             if(data){
                 
             }
        
            }).catch(error => {
              console.log(error);
            });
      }
      
   
  
  
  /* 
  Frm_CM_Grid.CmdFiltrar_Click
  Frm_informa.Lbl_informacion.Caption = "Se guardo validacion de tiempo"  
  */
  document.body.style.cursor = 'default';

  alert("Se guardo validacion de tiempo"  );
 
appMainWindow.document.getElementById('Cbo_opcion').value = 14;
appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block';
appMainWindow.document.getElementById('Cb_clasificacion').style.display='none' ;
appMainWindow.document.getElementById('Txt_busqueda').value=document.getElementById('Txt_CodAte').value;
await appMainWindow.document.getElementById('CmdFiltrar').click();
window.close();

}





window.Cmd_cancelar_Click = async function(){

  await P_VNRyCANCELAR_CM('Frm_CM_cotiza_conductor',document.getElementById('Txt_CodAte').value.trim(), false);
} 