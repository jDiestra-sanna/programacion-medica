
var l_estado_audi;
 var l_TipoDr='';
 var today;
 var Adata_atencion =[];
   import {min_a_horas,MODIFICA_FEC_MAX_LAB,REGISTRA_CM_AUDITORIA} from './module.js'; 

 (async function(){ 
      
l_TipoDr = "A";
            today = new Date();
            document.getElementById('DTPicker1').value = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0') ;
            //Adata_atencion, 
            await fetch('/modulo/Abre_Detalle/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: "Select CASE WHEN t_tmpllamadas.for_ate = 'E' THEN 'EFECTIVO' " 
                + " WHEN t_tmpllamadas.for_ate = 'C' THEN 'CREDITO' WHEN t_tmpllamadas.for_ate = 'T' THEN 'TARJETA' " 
                + " WHEN t_tmpllamadas.for_ate = 'M' THEN 'MPOS' WHEN t_tmpllamadas.for_ate = 'F' THEN 'TRANSFERENCIA' " 
                + " Else '' END AS forma_pago, CASE WHEN t_tmpllamadas.for_ate = 'E' THEN t_tmpllamadas.cm_denominacion " 
                + " WHEN t_tmpllamadas.for_ate = 'C' THEN '' WHEN t_tmpllamadas.for_ate = 'T'THEN t_tmpllamadas.codtar_ate " 
                + " WHEN t_tmpllamadas.for_ate = 'M' THEN '' WHEN t_tmpllamadas.for_ate = 'F' THEN '' Else '' END AS den, * FROM t_tmpllamadas where cod_ate = " + document.getElementById('Txt_CodAte').value.trim()
            
              })
            }).then(response => response.json())
              .then(async function (data) {
                 if(data.length>0){
                                        
                   Adata_atencion = data;           
                      switch(Adata_atencion[0].cod_gru.trim()){
                        case "031":
                        case "054":
                        case "106":
                        case "044":
                           
                          var opt = document.createElement('option');
                          opt.value = "PROGRAMADA MAXISALUD";
                          opt.innerHTML = "PROGRAMADA MAXISALUD";
                          document.getElementById('Cbo_tipo_prog').appendChild(opt);
                          break;
                      }

                      document.getElementById('Txt_forma_pag').value = (Adata_atencion[0].forma_pago??= '').trim() ;
                      document.getElementById('Txt_den').value   = (Adata_atencion[0].den??= '').trim() ;  

                     //datos de la direccion
 
                      await fetch('/modulo/Abre_Detalle/', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          query: "SELECT * FROM vw_datos_paciente_direccion WHERE cod_paciente = '" + (Adata_atencion[0].cod_tit??= '').trim() + "' and cod_dir = '" +  (Adata_atencion[0].cod_dir??= '00').trim()  + "'"
                      
                        })
                      }).then(response => response.json())
                        .then(function (lrs_aux) {
                           if(lrs_aux.length>0){
                            
                            document.getElementById('Txt_distrito').value = lrs_aux[0].departamento + " - " +  lrs_aux[0].provincia + " - " +  lrs_aux[0].distrito
                            document.getElementById('Txt_referencia').value = lrs_aux[0].referencia;
                            document.getElementById('Txt_direccion').value = lrs_aux[0].direccion;
                            document.getElementById('Txt_nro_lote').value = lrs_aux[0].nro_dir_lote;
                            document.getElementById('Txt_dpto_dir').value = lrs_aux[0].dir_dpto_interior;
                    
                             
                           }
                      
                        }).catch(error => {
                          console.log(error);
                        });
                   



                      //mostrar los datos de la cotizacion
                      l_estado_audi = Adata_atencion[0].cm_estado;
                      document.getElementById('Txt_paciente').value =  Adata_atencion[0].nom_pac.trim();
                      document.getElementById('Txt_edad').value =  Adata_atencion[0].edad_ate.trim();
                      document.getElementById('Txt_telefono').value =  Adata_atencion[0].cm_tlf_pac.trim();
 

                      document.getElementById('Txt_obs').value =  (Adata_atencion[0].obs_cm??= '').trim()   
                      document.getElementById('Txt_obs').value =  (Adata_atencion[0].obs_cm??= '').trim()   

                      if (Adata_atencion[0].cm_des_pac_desea!=null ){
                        document.getElementById('Txt_inf_pac').dataset.Tag =  Adata_atencion[0].cm_des_pac_desea;
                        document.getElementById('Txt_inf_pac').value =   Adata_atencion[0].cm_des_pac_desea  +' '+  Adata_atencion[0].cm_nom_dr_pac_desea
                     /* if (Adata_atencion[0].tmp_cod_tit!=null ){
                        document.getElementById('Txt_obs').style.backgroundColor =   &HC0C0FF;
                      }
                      End If */
                      
                      }
                      document.getElementById('Cbo_pac_VIP').value =  (Adata_atencion[0].pac_vip??= '');

                  /*     If Cbo_pac_VIP.Text = "MINT" Then
                      Txt_paciente.BackColor = &H80C0FF
                      Txt_paciente.BackColor = &H80C0FF

                      } */


                      await fetch('/modulo/Abre_Detalle/', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          query: "SELECT * FROM m_pacientesdrmas WHERE cod_hia = '" + (Adata_atencion[0].cod_tit??= '') + "'"
                      
                        })
                      }).then(response => response.json())
                        .then(function (lrs_aux) {
                           if(lrs_aux.length>0){
                              
                            if (lrs_aux[0].pac_clave==true ) {
                              document.getElementById('Lbl_pac_clave').style.visibility = 'visible';
                              if ( (lrs_aux[0].obs_pac_clave) == null ||  (lrs_aux[0].obs_pac_clave).trim() == "" ){
                                document.getElementById('Lbl_pac_clave').innerHTML = "PAC. CLAVE " +  lrs_aux[0].tipo_pac_clave;
                              }else{
                                document.getElementById('Lbl_pac_clave').innerHTML = "PAC. CLAVE " +  lrs_aux[0].tipo_pac_clave + ": " + lrs_aux[0].obs_pac_clave ;
 
                              }
                           }
                            
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
                            query: "SELECT cod_esp, nom_esp FROM m_especialidades WHERE cod_esp = '" + Adata_atencion[0].cod_esp +  "'"
                        
                          })
                        }).then(response => response.json())
                          .then(function (Adata_esp) {
                             if(Adata_esp.length>0){
                              document.getElementById('Txt_esp_propuesto').value = Adata_esp[0].nom_esp.trim();
                             }
                        
                          }).catch(error => {
                            console.log(error);
                          });
                      
                      
                      if ( document.getElementById('Txt_esp_propuesto').value != "" ){
                        document.getElementById('Txt_especialidad').value = document.getElementById('Txt_esp_propuesto').value;
                       }
 
                
                       document.getElementById('Lbl_med').style.visibility = 'visible';
                       document.getElementById('Txt_Dr').style.visibility = 'visible';
            

                      //cuando cotizacion fue regresada antes de llenar datos completos

                      switch (Adata_atencion[0].f_prog){

                      case "Inm":
                          document.getElementById('Txt_tipo_prog').value = "INMEDIATA";
                          document.getElementById('Cbo_tipo_prog').selectedIndex = 0;
                          document.getElementById('Lbl_tiempo').style.visibility = 'visible';
                          document.getElementById('Cbo_tiempo').style.visibility = 'visible';
                          document.getElementById('Lbl_min').style.visibility = 'visible';
 
                          break;
                      case "Prg":
                          document.getElementById('Lbl_med_asig').style.visibility = 'visible';
                          document.getElementById('Txt_medico').style.visibility = 'visible';
                          document.getElementById('Lbl_fec_asig').style.visibility = 'visible';
                          document.getElementById('Lbl_fecha').style.visibility = 'visible';
                          document.getElementById('Txt_fecha').style.visibility = 'visible';
                          document.getElementById('DTPicker1').style.visibility = 'visible';
                          document.getElementById('Lbl_hora').style.visibility = 'visible';
                          document.getElementById('Lbl_hor_asig').style.visibility = 'visible';
                          document.getElementById('Txt_hora').style.visibility = 'visible';
                          document.getElementById('CmbHora').style.visibility = 'visible';
                
                          document.getElementById('Txt_fecha').value = Adata_atencion[0].fec_ate.split('-').reverse().join('/');
                          document.getElementById('Txt_hora').value = Adata_atencion[0].hor_ate;
                          
                          document.getElementById('DTPicker1').value = Adata_atencion[0].fec_ate.trim();//((new Date(Adata_atencion[0].fec_ate)).toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'})).reverse().join('/');
                           document.getElementById('CmbHora').value = Adata_atencion[0].hor_ate.trim();
             
                          
                          if ( Adata_atencion[0].clasificacion_pac==70 || Adata_atencion[0].f_soldoct.trim() == "S" ) {
                               document.getElementById('Cmd_cambio_estado').style.visibility = 'visible';

                              if (Adata_atencion[0].clasificacion_pac == 2) {
                                document.getElementById('Cbo_tipo_prog').selectedIndex = 3; 
                                document.getElementById('Cbo_tipo_prog').readOnly = true;
                              }else{
                                document.getElementById('Cbo_tipo_prog').selectedIndex = 1;   
                              }
                              
                              if (Adata_atencion[0].clasificacion_pac!=70 && Adata_atencion[0].tmp_cod_tit ==null)  {
                                  
                                  
                                await  fetch('/modulo/Abre_Detalle', {
                                    method: 'POST',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                      query:"SELECT a.cod_doc, a.nom_doc, d.cod_tipo_doctor FROM m_doctores as a, m_doctorxtipo_doctor as d, m_especialidades esp, m_espcxdoctor espdr WHERE a.cod_doc = d.cod_doc AND a.cod_doc = espdr.cod_doc AND espdr.cod_esp = esp.cod_esp AND a.activi = true and a.cod_doc = '" + Adata_atencion[0].cod_dr_solicitado.trim() + "' AND esp.cod_esp = '" + Adata_atencion[0].cod_esp + "' ORDER BY d.cod_tipo_doctor "
                                    })
                                  }).then(response => response.json())
                                    .then(function (lrs_aux) {
                                       if(lrs_aux.length>0){
                                        document.getElementById('Txt_medico').value = lrs_aux[0].nom_doc;
                                        document.getElementById('Txt_Dr').value = lrs_aux[0].nom_doc;
                                
                                       }
                                    }).catch(error => {
                                      alert(error);
                                    });
                                  
                              }
                              
                          }else{
                            document.getElementById('Cbo_tipo_prog').selectedIndex = 2;
                            document.getElementById('Txt_tipo_prog').value =  "PROGRAMADA (NO SOLICITÓ MÉDICO)";
                          }
                          break;
                      case "Rpg":
                          document.getElementById('Txt_tipo_prog').value = "REPROGRAMADA";
                          document.getElementById('Txt_tipo_prog').style.backgroundColor = rgb(255,208,157) ;
                          document.getElementById('Lbl_med_asig').style.visibility = 'visible';
                          document.getElementById('Txt_medico').style.visibility = 'visible';
 
                          document.getElementById('Txt_fecha').style.backgroundColor = rgb(255,208,157) ;
 
                          document.getElementById('Lbl_hor_asig').style.visibility = 'visible';
                          document.getElementById('Txt_hora').style.visibility = 'visible';
                          document.getElementById('Txt_hora').style.backgroundColor = rgb(255,208,157) ;
 
                          document.getElementById('Txt_fecha').value = Adata_atencion[0].fec_ate;
                          document.getElementById('Txt_hora').value = Adata_atencion[0].hor_ate;
 
                           
                          document.getElementById('Cmd_cambio_estado').disabled = true;
                          document.getElementById('Cmd_cambio_estado').style.visibility = 'visible';

                          document.getElementById('Txt_medico').value = Adata_atencion[0].nom_doc;
 
                    }

                    await fetch('/modulo/Abre_Detalle/', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        query:  "SELECT a.cod_doc, a.nom_doc, d.cod_tipo_doctor, c.cod_esp, prov.descripcion FROM m_doctores as a INNER JOIN m_proveedor_medico prov  ON a.cod_prov_medico = prov.cod_prov_medico, m_espcxdoctor as b, m_especialidades as c, m_doctorxtipo_doctor as d WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.cod_doc = d.cod_doc AND a.activi = true AND c.cod_esp in ('026')  AND d.cod_tipo_doctor = '" + l_TipoDr + "' AND a.cod_doc not in (SELECT cod_doc FROM h_medico_bloqueado_paciente WHERE cod_hia = '" +  Adata_atencion[0].cod_tit + "') ORDER BY a.nom_doc ASC"
                    
                      })
                    }).then(response => response.json())
                      .then(function (Adata_dr) {
                        var options;
                         if(Adata_dr.length>0){
                           options = '<option value=""></option>'+ Adata_dr.map(person => `<option value="${person.cod_doc}">${person.nom_doc}</option>`).join("\n");
        
                         } 
                         document.getElementById('Txt_Dr').innerHTML = options;
                      }).catch(error => {
                        console.log(error);
                      });

                    document.getElementById('Txt_Dr').focus();



                }
                              
              }).catch(error => {
                        console.log(error);
               });
            
            document.getElementById('Cbo_tipo_prog').readOnly = true;
            document.getElementById('CmbHora').value = ''; 

            document.getElementById('DTPicker1').addEventListener('input',nomenoractual);

            
})(); 

 
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'});
}
window.Cmd_guardar_Click = async function(){ 

var ls_dr1;
var ls_dr2;
var lrst_distrito ;
var time_llegada ;
var Rpta ;
var fecha_max;
var hora_max;
var fecha_ate ;
var hora_ate ;
var pasar_e_3;

pasar_e_3 = false;
if ( document.getElementById('Txt_Dr').style.visibility == 'visible' && document.getElementById('Txt_Dr').value.trim() == "" ){
    alert("ingrese el Dr a asignar");
    document.getElementById('Txt_Dr').focus();
    return
}
 

if (  document.getElementById('Cbo_tiempo').style.visibility == 'visible'  && document.getElementById('Cbo_tiempo').value == ""){
    alert("Seleccione el tiempo");
    document.getElementById('Cbo_tiempo').focus();
    return;
}


if (document.getElementById('CmbHora').style.visibility == 'visible' ){
    if (document.getElementById('CmbHora').value == ""){
        alert("Seleccione la hora");
        document.getElementById('CmbHora').focus();
        return;
    }else{
        if (new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-') == document.getElementById('DTPicker1').value && new Date().toTimeString().slice (0,5) > document.getElementById('CmbHora').value ) {
            alert( "La hora es menor que la hora actual");
            document.getElementById('CmbHora').focus();
            return;
        }
    }
}

if (Adata_atencion[0].f_prog == "Prg" && Adata_atencion[0].clasificacion_pac == 2 ){
      if (new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-') <   (Adata_atencion[0].feclla_ate).addDays(30).replace(/\//g, '-').split('-').reverse().join('-')) {
        if (document.getElementById('DTPicker1').value > (Adata_atencion[0].feclla_ate).addDays(30).replace(/\//g, '-').split('-').reverse().join('-') ) {
            alert ("La fecha ingresada es mayor a la fecha maxima de: ") + (Adata_atencion[0].feclla_ate).addDays(30).replace(/\//g, '-').split('-').reverse().join('-');
            document.getElementById('DTPicker1').value = (Adata_atencion[0].feclla_ate).addDays(30).replace(/\//g, '-').split('-').reverse().join('-');
            return;
        }
      }else{
        alert ("La fecha ingresada es mayor los 30 dias maximos");
      }
} 
document.getElementById('Cmd_guardar').disabled = true;

var Adata_atencionu =[];
await fetch('/modulo/Abre_Detalle/', {
  method: 'POST',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  query: "SELECT * FROM t_tmpllamadas where cod_ate = " + document.getElementById('Txt_CodAte').value

  })
}).then(response => response.json())
  .then(async function (data) {
  if(data.length>0){
      Adata_atencionu = data;
  }

  switch (document.getElementById('Cbo_tipo_prog').selectedIndex){
        case 0:
            //guarda tiempo y medico
            Adata_atencionu[0].fec_ate = new Date(new Date(Adata_atencionu[0].feclla_ate +' '+ Adata_atencionu[0].horlla_ate).getTime() +  document.getElementById('Cbo_tiempo').value*60000).toISOString().slice(0,10);
             MODIFICA_FEC_MAX_LAB(Adata_atencionu[0].cod_ate, Adata_atencionu[0].fec_ate);
            Adata_atencionu[0].hor_ate = new Date(new Date('2021-01-01'+' '+Adata_atencionu[0].horlla_ate).getTime() +  document.getElementById('Cbo_tiempo').value*60000).toLocaleTimeString();
            Adata_atencionu[0].cod_doc = document.getElementById('Txt_Dr').value;
            Adata_atencionu[0].nom_doc = document.getElementById('Txt_Dr').options[document.getElementById('Txt_Dr').selectedIndex].text;
            Adata_atencionu[0].cod_tipo_doctor = document.getElementById('Cbo_tipo_dr').value.slice(0,1);  
            Adata_atencionu[0].horasgdr_ate = new Date().toLocaleTimeString().slice(0,5);
            Adata_atencionu[0].fecasgdr_ate = new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'})
             await fetch('/modulo/get_session/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
              })
            }).then(response => response.json())
              .then(function (data) {
                Adata_atencionu[0].usuasgdr_ate  = data.trim() ;
              }).catch(error => {
                console.log(error);
              }); 
            Adata_atencionu[0].cod_esp = '026';//document.getElementById('cod_esp').value;
            
            Adata_atencionu[0].tmp_cod_tit = null;
            Adata_atencionu[0].cm_tiempo = document.getElementById('Cbo_tiempo').value;
         break;
        case 1:
        case 3:

          Adata_atencionu[0].fec_ate = document.getElementById('DTPicker1').value;
            MODIFICA_FEC_MAX_LAB(Adata_atencionu[0].cod_ate, Adata_atencionu[0].fec_ate);
            Adata_atencionu[0].hor_ate = document.getElementById('CmbHora').value +':'+ '00';
            Adata_atencionu[0].cod_doc = document.getElementById('Txt_Dr').value.trim();
            Adata_atencionu[0].nom_doc = document.getElementById('Txt_Dr').options[document.getElementById('Txt_Dr').selectedIndex].text;
            Adata_atencionu[0].cod_tipo_doctor =  document.getElementById('Cbo_tipo_dr').value.slice(0,1);  
            Adata_atencionu[0].cod_esp = '026';//document.getElementById('cod_esp').value.trim(); 
            Adata_atencionu[0].tmp_cod_tit = null;
            Adata_atencionu[0].cm_tiempo = null;
            Adata_atencionu[0].horasgdr_ate = new Date().toLocaleTimeString();
            Adata_atencionu[0].fecasgdr_ate =  new Date().toLocaleString('es-ES', {year: 'numeric',month: '2-digit',day: '2-digit' });
              await fetch('/modulo/get_session/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                })
              }).then(response => response.json())
                .then(function (data) {
                  Adata_atencionu[0].usuasgdr_ate  = data.trim() ;
                }).catch(error => {
                  console.log(error);
                }); 
            Adata_atencionu[0].cod_dr_solicitado = document.getElementById('Txt_Dr').value;;
            Adata_atencionu[0].flag_programada = true;
            Adata_atencionu[0].f_soldoct = "S";
            Adata_atencionu[0].f_prog = "Prg";

        case 2:
            Adata_atencionu[0].fec_ate = document.getElementById('DTPicker1').value;
            MODIFICA_FEC_MAX_LAB(Adata_atencionu[0].cod_ate, Adata_atencionu[0].fec_ate);
            Adata_atencionu[0].hor_ate = document.getElementById('CmbHora').value +':'+ '00';
            Adata_atencionu[0].cod_doc =  document.getElementById('Txt_Dr').value.trim();
            Adata_atencionu[0].nom_doc =  document.getElementById('Txt_Dr').options[document.getElementById('Txt_Dr').selectedIndex].text;
            Adata_atencionu[0].cod_tipo_doctor =  document.getElementById('Cbo_tipo_dr').value.trim().slice(0,1); 
            Adata_atencionu[0].cod_esp =  '026';//document.getElementById('cod_esp').value.trim();  
            Adata_atencionu[0].tmp_cod_tit = null;
            Adata_atencionu[0].cm_tiempo = null;
            Adata_atencionu[0].horasgdr_ate = new Date().toLocaleTimeString();
            Adata_atencionu[0].fecasgdr_ate =  new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'})
              await fetch('/modulo/get_session/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                })
              }).then(response => response.json())
                .then(function (data) {
                  Adata_atencionu[0].usuasgdr_ate  = data.trim() ;
                }).catch(error => {
                  console.log(error);
                }); 
            Adata_atencionu[0].cod_dr_solicitado = document.getElementById('Txt_Dr').value.trim(); 
            Adata_atencionu[0].flag_programada = true;
            Adata_atencionu[0].f_soldoct = "N";
            Adata_atencionu[0].f_prog = "Prg";
 
            break;
          }
    
    if (Adata_atencionu[0].cm_datos_completos == false){
        //cuando ya paso por dos o es una cotizada directa
        Adata_atencionu[0].cm_estado = "1";
        Adata_atencionu[0].cod_estado = 1;
        Adata_atencionu[0].cm_orden = 2;
        REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value, l_estado_audi + "->1", "MEDICO ASIGNADO: " + document.getElementById('Txt_Dr').options[document.getElementById('Txt_Dr').selectedIndex].text + ", Fecha: " +  Adata_atencionu[0].fec_ate + ", Especialidad : " + document.getElementById('Txt_especialidad').value + ", Hora : " + Adata_atencionu[0].hor_ate , "ASIGNACION DE MEDICO");
 
    }else{
        switch  (Adata_atencionu[0].cod_gru.trim()){
            case "024":
            case "116":
            case "143":
              Adata_atencionu[0].cm_estado = "1";
              Adata_atencionu[0].cod_estado = 2;
              Adata_atencionu[0].cm_orden = 3;
                break;
            default:
              Adata_atencionu[0].cm_estado = "2";
              Adata_atencionu[0].cod_estado = 2;
              Adata_atencionu[0].cm_orden = 3;
              break;
        }
        REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value, l_estado_audi + "->2", "MEDICO ASIGNADO A ATENCION: " + document.getElementById('Txt_Dr').options[document.getElementById('Txt_Dr').selectedIndex].text + ", Fecha: " + Adata_atencionu[0].fec_ate + ", Especialidad : " + document.getElementById('Txt_especialidad').value + ", Hora : " + Adata_atencionu[0].hor_ate , "ASIGNACION DE MEDICO");
        
    }
    
    
    
    //SALTO A ESTADO 3
    switch ( Adata_atencionu[0].clasificacion_pac){
    
        case 0:
            switch (Adata_atencionu[0].cod_gru){
                
                //PARA LOS CLIENTES DE MAPFRE Y POSITIVA SANITAS
                case "024":
                case "116":
                case "143":
                    pasar_e_3 = true;
                break;
                default:
                
                    if  (Adata_atencionu[0].cod_prov != "L0" ){
                        pasar_e_3 = True
                    }else{
                        //FORMA DE PAGO : EFECTIVO + CELULAR + INMEDIATA + BOLETA => E = 3
                        if (Adata_atencionu[0].for_ate == "E" && Adata_atencionu[0].cel_pac ==null &&  Adata_atencionu[0].cel_pac > 0 &&  Adata_atencionu[0].f_prog == "Inm" && Adata_atencionu[0].tipo_doc_pago == "B" ){
                           pasar_e_3 = true;
                        }
                    }
                
            }
        case 4:
           //AUSENTISMO
            pasar_e_3 = true;
            break;
    }


    if (pasar_e_3 ==true ){
        
        l_estado_audi = "2"
        Adata_atencionu[0].cm_estado = "3";
        Adata_atencionu[0].cm_orden = 4;
        Adata_atencionu[0].cm_esp_anterior = null;
        Adata_atencionu[0].cm_cod_dr_anterior = null;
        Adata_atencionu[0].cm_dr_anterior = null;
        Adata_atencionu[0].flg_validacion_directa = true;
        
        REGISTRA_CM_AUDITORIA(document.getElementById('Txt_CodAte').value, l_estado_audi + "->3", "MEDICO ASIGNADO: " + document.getElementById('Txt_Dr').options[document.getElementById('Txt_Dr').selectedIndex].text + ", Especialidad : " + document.getElementById('Txt_especialidad').value + ", DEDUCIBLE: " + Adata_atencionu[0].cm_moneda_den + "/." + Adata_atencionu[0].tar_ate + ", COASEGURO: " + Adata_atencionu[0].coaseguro + "%", "CONFIRMACION DE DATOS DE PACIENTE");
    
    
    ///.Update
    
    //eliminar la ate que se envio en la asignacion
    //prueba de web de seguimiento
    
    PblSub_REINGRESAR_ATENCION_TABLET(document.getElementById('Txt_CodAte').value);
    }
    Adata_atencionu[0].tabla='t_tmpllamadas';
    Adata_atencionu[0].id = 'cod_ate'
/* 
    Select Case Trim(!cod_gru)
        Case "044", "106", "031", "054"
            'Call CREA_ARCHIVO_LLEFIN_SIA(!cod_ate, "INICIO", "MEDICO: " & Trim(!nom_doc) & ", Fecha: " & Format(!fec_ate, "dd-mm-yyyy") & ", Hora : " & Format(!Hor_ate, "HH:mm:ss"))
    End Select */

  /*   IF !flg_aseg_reg = True Then
        Call P_Estado_asegurabilidad(Val(Txt_CodAte.Text), "3")
    End If
   
 */
    fetch('/modulo/Executeupdate/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Adata_atencionu[0])
    }).then(response => response.json())
      .then(function (data) {
          
    }).catch(error => {
        console.log(error);
    });  
  }).catch(error => {
    console.log(error);
  });

alert( "Se asignó tiempo y médico ");
 
appMainWindow.document.getElementById('Cbo_opcion').value = 14;
appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block';
appMainWindow.document.getElementById('Cb_clasificacion').style.display='none' ;
appMainWindow.document.getElementById('Txt_busqueda').value=document.getElementById('Txt_CodAte').value;
await appMainWindow.document.getElementById('CmdFiltrar').click();
window.close();
//Unload Me
//Frm_CM_Grid.CmdFiltrar_Click


}


window.Cbo_tipo_prog_Click = function(val){

  document.getElementById('Txt_Dr').value = "";
  document.getElementById('Cmd_cambio_estado').style.visibility = "hidden";
 switch (val){
      case 0:
          //INMEDIATA
          document.getElementById('Lbl_tiempo').style.visibility = "visible";
          document.getElementById('Cbo_tiempo').style.visibility = "visible";
          document.getElementById('Lbl_min').style.visibility = "visible";
 
          document.getElementById('Lbl_fecha').style.visibility = "hidden";
          document.getElementById('DTPicker1').style.visibility = "hidden";
          document.getElementById('Lbl_hora').style.visibility = "hidden";
          document.getElementById('CmbHora').style.visibility = "hidden";
 
          break;
      case 1:
      case 3:
          //PROGRAMADA (SOLICITÓ MÉDICO)
          document.getElementById('Lbl_tiempo').style.visibility = "hidden";
          document.getElementById('Cbo_tiempo').style.visibility = "hidden";
          document.getElementById('Lbl_min').style.visibility = "hidden";
 
          document.getElementById('Lbl_med').style.visibility = "visible";
          document.getElementById('Txt_Dr').style.visibility = "visible";
          document.getElementById('Txt_Dr').value = document.getElementById('Txt_medico').value.trim();
          document.getElementById('Lbl_fecha').style.visibility = "visible";
          document.getElementById('DTPicker1').style.visibility = "visible";
          document.getElementById('Lbl_hora').style.visibility = "visible";
          document.getElementById('CmbHora').style.visibility = "visible";
   
          document.getElementById('Cmd_cambio_estado').style.visibility = "visible";
 
          break;
      case 2:
          //PROGRAMADA (NO SOLICITÓ MÉDICO) 
          document.getElementById('Lbl_tiempo').style.visibility = "hidden";
          document.getElementById('Cbo_tiempo').style.visibility = "hidden";
          document.getElementById('Lbl_min').style.visibility = "hidden";
          document.getElementById('Lbl_med').style.visibility = "visible";
          document.getElementById('Txt_Dr').style.visibility = "visible";
           document.getElementById('Lbl_fecha').style.visibility = "visible";
          document.getElementById('DTPicker1').style.visibility = "visible";
          document.getElementById('Lbl_hora').style.visibility = "visible";
          document.getElementById('CmbHora').style.visibility = "visible";
      
          break;
}

}

function nomenoractual(e){

  var valida = new Date( e.target.value.replace(/-/g, ',') ).toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-');
  
  // Days in JS range from 0-6 where 0 is Sunday and 6 is Saturday

  if( valida>=new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-')){
 

  } else {

      document.getElementById('DTPicker1').value =  new Date().toLocaleDateString('es-ES',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-');

  }

}


async function Cmd_cambio_estado_Click(){
 /*  var Adata_atencion=[];
  var lb_rpta;
  var ls_dr1 ; 
  var ls_dr2 ;
  
   await fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query:"Select * FROM t_tmpllamadas where cod_ate = " + filacurrent
       })
  
     }).then(response => response.json())
    .then(function (data ) {
      Adata_atencion = data;
      if(data.length>0) {
        
      }else{
      
  
      }
    }).catch(error => {
      console.log(error);
    });
  lb_rpta = MsgBox("¿Desea pasar esta cotizacion a estado de seguimiento?", vbYesNo)
  
  
  if lb_rpta = 6 Then
  
      'Verifica del historico(regresado de estado 1) si doctor seleccionado es no deseado por paciente
      
      If Txt_Dr.Visible = True And Trim(Txt_Dr.Text) = "" Then
          MsgBox "ingrese el Dr a asignar"
          Txt_Dr.SetFocus
          Exit Sub
      End If
      
      If DGrid_Dr.Visible = True Then
          MsgBox "Seleccione un doctor"
          DGrid_Dr.SetFocus
          Exit Sub
      End If
      
     
      If CmbHora.Visible = True Then
          If CmbHora.Text = "" Then
              MsgBox "Seleccione la hora"
              CmbHora.SetFocus
              Exit Sub
          Else
              If (Date = DTPicker1.Value) And (TimeValue(Format(Time, "HH:mm")) > TimeValue(CmbHora.Text)) Then
                  MsgBox "La hora es menor que la hora actual"
                  CmbHora.SetFocus
                  Exit Sub
              End If
          End If
      End If
  
      With Adata_atencion.Recordset
          !fec_ate = Format(DTPicker1.Value, "yyyy-mm-dd")
          Call MODIFICA_FEC_MAX_LAB(!cod_ate, !fec_ate)
          !Hor_ate = Format(CmbHora.Text, "HH:mm")
          
          !cod_dr_solicitado = Trim(Adata_dr.Recordset!cod_doc)
          !flag_programada = True
          !f_soldoct = "S"
          !f_prog = "Prg"
          !cm_tiempo = Null
          !cm_estado = "A"
          !cod_estado = 2
          !cm_orden = 1
          .Update
      End With
      
      Call REGISTRA_CM_AUDITORIA(Val(Txt_CodAte.Text), l_estado_audi & "->A", "MEDICO ASIGNADO : " & Trim(Adata_dr.Recordset!nom_doc), "CAMBIO DE ESTADO (A SEGUIMIENTO)")
      
      Unload Me
      Frm_CM_Grid.CmdFiltrar_Click
  End If */
  
  }