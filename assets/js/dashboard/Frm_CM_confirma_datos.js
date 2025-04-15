var lsg_cambio='';
 var L_CodAte;
 var today;
 var Adata_atencion = [];
 var str_emp_contratante = "";

 import {P_VNRyCANCELAR_CM,Abre_Detalle} from './module.js'; 

 (async function(){ 
     
var  Msj_error_carga ='';
  
var  tipoDocID ='';
var vf_flg_cod_autorizacion = false;

/* Flex_transferencia.ColWidth(0) = 2500
Flex_transferencia.ColWidth(1) = 1500
Flex_transferencia.ColWidth(2) = 2000

Flex_transferencia.TextMatrix(0, 0) = "NOMBRE DEL BANCO"
Flex_transferencia.TextMatrix(0, 1) = "CTA.CTE.SOLES"
Flex_transferencia.TextMatrix(0, 2) = "CTA.CTE.DOLARES"


Flex_transferencia.TextMatrix(1, 0) = "BANCO DE CREDITO"
Flex_transferencia.TextMatrix(1, 1) = "193-1169353-0-45"
Flex_transferencia.TextMatrix(1, 2) = "193-1169024-1-32"
    */

 fetch('/modulo/CalculaCambioActual/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
    })
  }).then(response => response.json())
    .then(function (data) {
           if(data.length>0) {
            lsg_cambio = data[0].tip_cam;
          }  
    }).catch(error => {
      console.log(error);
    });    
 

Cbo_modo_atencion_medico.ListIndex = 0
document.getElementById('Cbo_tiene_correo').selectedIndex = 0; 
document.getElementById('Txt_email').style.visibility = 'visible';
 
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
        .then(function (data) {
        if(data.length>0){
            Adata_atencion = data;
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
        query:  "SELECT * FROM m_pacientesdrmas WHERE cod_hia = '" +  Adata_atencion[0].cod_tit.trim() +  "'"
    
        })
    }).then(response => response.json())
        .then(async function (Adata_paciente) {
        if(Adata_paciente.length>0){
            Msj_error_carga = "Error de carga en datos de paciente";
            document.getElementById('Txt_ap_pat').value = Adata_paciente[0].appat_pac.trim();
            document.getElementById('Txt_ap_mat').value = Adata_paciente[0].apmat_pac.trim();
            document.getElementById('Txt_nom_pac').value = Adata_paciente[0].nom_pac.trim();
            document.getElementById('Txtdia').value = Adata_paciente[0].fnac_pac.trim().substr(8,2 );
            document.getElementById('TxtMes').value = Adata_paciente[0].fnac_pac.trim().substr(5, 2);
            document.getElementById('TxtAnio').value = Adata_paciente[0].fnac_pac.trim().substr(0, 4);
           
            document.getElementById('Cbo_pac_VIP').value = (Adata_paciente[0].pac_vip??= '');
             
            if(document.getElementById('Cbo_pac_VIP').value == "MINT" ){
                 document.getElementById('Txt_ap_pat').style.backgroundColor = 'rgb(255, 153, 51)';
                document.getElementById('Txt_ap_mat').style.backgroundColor = 'rgb(255, 153, 51)';                
                document.getElementById('Txt_nom_pac').style.backgroundColor = 'rgb(255, 153, 51)';
                document.getElementById('Cbo_pac_VIP').style.backgroundColor = 'rgb(255, 153, 51)';
            }
            
            if( Adata_paciente[0].pac_clave  == true ) {
                 document.getElementById('Lbl_pac_clave').style.visibility = 'visible';

                if(Adata_paciente[0].obs_pac_clave==null || Adata_paciente[0].obs_pac_clave=='' ){
                    document.getElementById('Lbl_pac_clave').innerHTML = "PAC. CLAVE " +  Adata_paciente[0].tipo_pac_clave; 
                }else{
                     document.getElementById('Lbl_pac_clave').innerHTML = "PAC. CLAVE " +  Adata_paciente[0].tipo_pac_clave + ": " + Adata_paciente[0].obs_pac_clave ;

                }
            }
            today= new Date();
 
             document.getElementById('Txt_edad_calculada').value = (today.getFullYear()  -  Adata_paciente[0].fnac_pac.substr(0,4)) ;
             
            if( Adata_paciente[0].id_doc_id !=null ){  
                if(Adata_paciente[0].id_doc_id == "" ){
                    tipoDocID = "2";
                }else{
                    tipoDocID =Adata_paciente[0].id_doc_id;
                }
                
                 await fetch('/modulo/Abre_Detalle/', {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    query:"SELECT * FROM mae_documento_identidad WHERE id_doc_id = '" +  tipoDocID  +  "'"
                
                    })
                }).then(response => response.json())
                    .then(function (lrs_aux) {
                    if(lrs_aux.length>0){
                      document.getElementById('DC_tipo_doc_id').value = lrs_aux[0].descripcion_doc_id;
                      DC_tipo_doc_id_Change(lrs_aux[0].id_doc_id);
                    }
            
                }).catch(error => {
                    console.log(error);
                });
             }else{
                document.getElementById('DC_tipo_doc_id').value  = "2";
                document.getElementById('DC_tipo_doc_id').dataset.tag = '2';
            }
            
             document.getElementById('Txt_Doc_id').value  = (Adata_paciente[0].num_doc_id??= '') 
            
            if(   Adata_paciente[0].flg_correo  ==false){
                document.getElementById('Cbo_tiene_correo').selectedIndex  = 1;
                document.getElementById('Txt_email').style.visibility = 'hidden';
 
            }else{
                
                if( Adata_paciente[0].correo_pac != null ){
                    document.getElementById('Cbo_tiene_correo').selectedIndex  = 0;
                    document.getElementById('Txt_email').value = Adata_paciente[0].correo_pac.trim();
 
                }
            }
             
            document.getElementById('Txt_tlf_celular').value= (Adata_paciente[0].cel_pac??= '')   ;
            
            if( Adata_paciente[0].fecha_vigencia ==null ){
                document.getElementById('txt_fecha_vigencia').value = "";
            }else{
                document.getElementById('txt_fecha_vigencia').value= Adata_paciente[0].fecha_vigencia.substr(8,2)+'/'+Adata_paciente[0].fecha_vigencia.substr(5,2)+'/'+ (parseInt(Adata_paciente[0].fecha_vigencia.substr(0,4))+1);
               
                if( new Date(Adata_paciente[0].fecha_vigencia.substr(0,4) +'/'+Adata_paciente[0].fecha_vigencia.substr(5,2)+'/'+ Adata_paciente[0].fecha_vigencia.substr(8,2)).getTime() <= new Date().getTime() ){
                     document.getElementById('txt_fecha_vigencia').style.backgroundColor = 'red';
                }
            }
        
            //CONSENTIMIENTO
            if( Adata_paciente[0].consent_recibir_info ==null  ){ 
                document.getElementById('Opt_ri_si').checked = false;
                document.getElementById('Opt_ri_no').checked = false;

            }else{
                //Frm_consmt_ri.Enabled = False
                if( Adata_paciente[0].consent_recibir_info ){
                     document.getElementById('Opt_ri_si').checked = true;
                }else{
                    document.getElementById('Opt_ri_no').checked = true;

                }
            }
                
        }
  
    }).catch(error => {
        console.log(error);
    });
    
    var Adata_direccion=[];
    await fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        query: "SELECT * FROM m_direcciones WHERE cod_tit = '" +  (Adata_atencion[0].cod_tit).trim() + "' AND cod_dir = '" +  (Adata_atencion[0].cod_dir).trim() + "'"
    
        })
    }).then(response => response.json())
        .then(function (data) {
        if(data.length>0){
            Adata_direccion = data;
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
        query: "SELECT * FROM mae_documento_identidad WHERE cod_doc_id_susalud is not null order by 1 asc "

        })
    }).then(response => response.json())
        .then(function (Adata_doc_id) {
          var options ='';
        if(Adata_doc_id.length>0){
          options =   Adata_doc_id.map(person => `<option value="${person.id_doc_id}">${person.descripcion_doc_id}</option>`).join("\n");
        
        } 
        document.getElementById('DC_tipo_doc_id').innerHTML = options;

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
codigo: 33
})

  }).then(response => response.json())
    .then(function (data) {
      if(data){
         document.getElementById('Lbl_info').dataset.Tag = '';
      }else{
        document.getElementById('Lbl_info').dataset.Tag = 'ver_tarjeta';
      }
    }).catch(error => {
      console.log(error);
    });

    
//DATOS DE LA ATENCION
Msj_error_carga = "Error de carga en datos de la atencion";
    
    
if(Adata_atencion[0].sin_ate!=null ){
    document.getElementById('Txt_sintomas').value =  (Adata_atencion[0].sin_ate).trim();
}
//habilita consentimiento informado solo para cronicos

if( (new Date()).getTime() >= (new Date(2016,9,15)).getTime()  && (Adata_atencion[0].clasificacion_pac == 1 || Adata_atencion[0].clasificacion_pac == 2) ){
    document.getElementById('Frm_consent').style.display = 'block';
}

//habilita boton de envio de correo de no conformacion con paciente (cronicos)
if((Adata_atencion[0].clasificacion_pac == 1 || Adata_atencion[0].clasificacion_pac == 2) ){
     document.getElementById('Cmd_email_ate_sin_confirmar').style.visibility = 'visible';
}

//Frame_perfil_ate.Visible = False

switch (parseInt(Adata_atencion[0].clasificacion_pac)){
    case 1:
    case 2:
    case 200:
    case 201:
    case 202:
    case 203:
        //Frame_perfil_ate.Visible = True
        
        if(Adata_atencion[0].contador_periodo == 1 ){
            document.getElementById('Txt_perfil_atencion').value = "CONTROL";
        }else{
            document.getElementById('Txt_perfil_atencion').value = "SEGUIMIENTO";

        }
        break;
    }

    document.getElementById('Cbo_modo_atencion_medico').selectedIndex = Adata_atencion[0].modo_atencion_medico;
 
    switch (Adata_atencion[0].clasificacion_pac){
        case 1:
        case 2: 
        case 7:
            
            document.getElementById('Cbo_modo_atencion_medico').disabled = false;
            break;
    }

    document.getElementById('Txt_edad').value = Adata_atencion[0].edad_ate  ; 
 
//verifica diferencia de edades
if( document.getElementById('Txt_edad').value - document.getElementById('Txt_edad_calculada').value >= 2 ||  document.getElementById('Txt_edad').value - document.getElementById('Txt_edad_calculada').value!= 0) {
    document.getElementById('Txt_edad_calculada').style.backgroundColor = 'red';
}else{
    //document.getElementById('Txt_edad_calculada').style.backgroundColor = 'red'; 
}
document.getElementById('Txt_medico').value  =   Adata_atencion[0].nom_doc??= '' ;
 
switch (Adata_atencion[0].f_prog){
    case "Inm":
        document.getElementById('Txt_tipo_prog').value   = "INMEDIATA";
        break;
    case "Prg":
        if(Adata_atencion[0].f_soldoct == "S" ){
            document.getElementById('Txt_tipo_prog').value = "PROGRAMADA (SOLICITO MEDICO)";
        }else{
            document.getElementById('Txt_tipo_prog').value = "PROGRAMADA (NO SOLICITO MEDICO)";
        }
        break;
}

document.getElementById('Txt_fec_ate').value = Adata_atencion[0].fec_ate ;
document.getElementById('Txt_hor_ate').value = (Adata_atencion[0].hor_ate??='').substr(0,5);

  
if( (Adata_atencion[0].flagmone) == "S"){
    document.getElementById('Cbo_Moneda').value = "S/.";
    document.getElementById('Txt_ded').value = Adata_atencion[0].tar_ate;
    if(Adata_atencion[0].modo_atencion_medico==2){
      document.getElementById('Txt_ded').value = 0;
    }else if(Adata_atencion[0].modo_atencion_medico==1){
      document.getElementById('Txt_ded').value = 40;
    }
    
}else{
    document.getElementById('Cbo_Moneda').value = "$";
    document.getElementById('Txt_ded').value = Adata_atencion[0].tar_ate / lsg_cambio;
     document.getElementById('Lbl2_ded_usd').innerHTML = RedondeaDed( document.getElementById('Txt_ded').value * lsg_cambio) ;
    document.getElementById('Lbl1_ded_usd').style.visibility = 'visible';
    document.getElementById('Lbl2_ded_usd').style.visibility = 'visible';
    if(Adata_atencion[0].modo_atencion_medico==2){
      document.getElementById('Txt_ded').value = 0;
    }
}
Txt_ded_Change( document.getElementById('Txt_ded').value);
document.getElementById('txt_coa').value = Adata_atencion[0].coaseguro.trim() ;
//datos de pago
if(document.getElementById('Txt_ded').value   > 0 ){
    switch (Adata_atencion[0].tipo_doc_pago){
    case "B":
        document.getElementById('Cbo_doc_pago').value = "BOLETA";
        break ;
    case "F":
        document.getElementById('Cbo_doc_pago').value =  "FACTURA"
        document.getElementById('Cmd_datos_fact').style.visibility = "visible";  
        break;
    }
}


switch ( Adata_atencion[0].for_ate){
    case "":
        document.getElementById('Cbo_forma_pago').value  = "";
        break;
    case "E":
        document.getElementById('Cbo_forma_pago').value  = "EFECTIVO"; 
        document.getElementById('Cbo_moneda_den').value  = ((Adata_atencion[0].cm_moneda_den.trim()==  "S")? "S/.": "$");
        document.getElementById('Cbo_Denominacion').value = Adata_atencion[0].cm_denominacion;
        document.getElementById('Cbo_forma_pago').selectedIndex = 0;
        Cbo_forma_pago_Click();
        break;
    case "C":
        document.getElementById('Cbo_forma_pago').value = "CREDITO";
        document.getElementById('Txt_autorizado').value   = Adata_atencion[0].cm_autorizado;
        document.getElementById('Cbo_forma_pago').selectedIndex = 1;
        break;
    case "T":
        document.getElementById('Cbo_forma_pago').value = "TARJETA"
        document.getElementById('TxtNroTar').value = Adata_atencion[0].codtar_ate;
        Cbo_forma_pago_Click();
        await fetch('/modulo/permite_ingreso/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              codigo: 33
            })
            }).then(response => response.json())
            .then(function (data) {
              
            if( !data) {
                document.getElementById('Lbl_info').dataset.Tag = '';
                document.getElementById('Lbl_info').style.visibility = 'visible';
                document.getElementById('ME_tarjeta').value = Adata_atencion[0].tarj_mc ==null? "": "XXXXXXXX" +  Adata_atencion[0].tarj_mc.substr(10,8);
            }else{
                document.getElementById('Lbl_info').dataset.Tag = 'ver_tarjeta';
                 document.getElementById('ME_tarjeta').value =    Adata_atencion[0].tarj_mc == null? "": Adata_atencion[0].tarj_mc;
            }
            
            }).catch(error => {
              console.log(error);
            });
            
          
        
        if(Adata_atencion[0].fvenc_ate != null ){
            document.getElementById('Txt_mes_credito').value =  (Adata_atencion[0].fvenc_ate).substr(5,2);
            document.getElementById('Txt_anio_credito').value =  (Adata_atencion[0].fvenc_ate).substr(0,4);
        }
        document.getElementById('Cbo_forma_pago').selectedIndex = 2;
        break;
    case "M":
        document.getElementById('Cbo_forma_pago').value = "MPOS";
        document.getElementById('Cbo_forma_pago').selectedIndex = 3;
        break;
    case "F":
        document.getElementById('Cbo_forma_pago').value = "TRANSFERENCIA";
        document.getElementById('Cbo_forma_pago').selectedIndex  = 4;
        Cbo_forma_pago_Click();

        break;
    }


    await fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        query: "SELECT * FROM m_especialidades WHERE cod_esp = '"  +  Adata_atencion[0].cod_esp.trim() + "'"
    
        })
    }).then(response => response.json())
        .then(function (lrs_especialidad) {
        if(lrs_especialidad.length>0){
            document.getElementById('Txt_especialidad').value =  lrs_especialidad[0].nom_esp.trim();
             
        }
  
    }).catch(error => {
        console.log(error);
    });
 


 if(Adata_atencion[0].clasificacion_pac == 2 ){
    document.getElementById('Txt_tipo_prog').value = "PROGRAMADA MAXISALUD";
    /* Cbo_Moneda.BackColor = Me.BackColor
    Txt_ded.BackColor = Me.BackColor
    txt_coa.BackColor = Me.BackColor
    Cbo_forma_pago.BackColor = Me.BackColor
    Cbo_moneda_den.BackColor = Me.BackColor
    Cbo_Denominacion.BackColor = Me.BackColor */
    document.getElementById('Cbo_Moneda').disabled = true;
    document.getElementById('Txt_ded').disabled = true;
    document.getElementById('txt_coa').disabled = true;
    document.getElementById('Cbo_forma_pago').disabled = true;
    document.getElementById('Cbo_moneda_den').disabled = true;
    document.getElementById('Cbo_Denominacion').disabled = true; 
 }

//para cargar los codigos del siteds en la atencion
 
 
document.getElementById('TxtCodAut').value =  Adata_atencion[0].cod_aut_prestacion??='' ;
document.getElementById('Txt_cod_aseg').value  = Adata_atencion[0].cod_asegurado??='' ;
document.getElementById('Txt_cod_aseg').dataset.tag =  Adata_atencion[0].tipo_afiliacion??='' ;
document.getElementById('Txt_Poliza').value =  Adata_atencion[0].poliza_asegurado??='' ;
document.getElementById('Txt_pol_cert').value =  Adata_atencion[0].poliza_certificado??='' ;
document.getElementById('Txt_prod').value   =  Adata_atencion[0].cm_aseg_producto??='' ;
document.getElementById('Txt_num_sol').value   =  Adata_atencion[0].cod_solgen??='' ;
 

//PARA LA APARICION DEL BOTON DE SITEDS DEPENDIENDO DEL CASO SI NO SE HA GENERADO EN LA CREACION
 
 
document.getElementById("Lbl_info_siteds").innerHTML = "";
fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT * FROM m_iafas WHERE activo = true AND cod_cliente = '" +   (Adata_atencion[0].cod_gru).trim() +  "'"

    })
  }).then(response => response.json())
    .then(function (rst_iafa) {
           if(rst_iafa.length>0) {
            fetch('/modulo/Abre_Detalle/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query:"SELECT * FROM h_SITEDS_documento_autorizacion WHERE cod_ate = " + document.getElementById('Txt_CodAte').value + " AND codigoautorizacion = '" + (Adata_atencion[0].cod_aut_prestacion).trim() + "'"
            
                })
              }).then(response => response.json())
                .then(function (rst_CodSiteds) { 
                        if(rst_CodSiteds.length==0){
                            if(Adata_atencion[0].clasificacion_pac == 1 || Adata_atencion[0].clasificacion_pac == 2 || Adata_atencion[0].clasificacion_pac == 70){
                                document.getElementById('Cmd_datos_siteds').style.visibility = 'visible';
                             
                                fetch('/modulo/permite_ingreso/', {
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
                                          if(data) {
                                              document.getElementById('TxtCodAut').disabled = false; 
                                          }else{
                                            document.getElementById('TxtCodAut').disabled = true; 
                                             
                                          }
                                    }).catch(error => {
                                      console.log(error);
                                    });   
                            }
                        }else{
                            if(   rst_CodSiteds.fecha_creacion_doc_aut != null){
                                if(Date - CDate(rst_CodSiteds.fecha_creacion_doc_aut) >= 7 ){
                                    document.getElementById("Lbl_info_siteds").innerHTML  = "Debe generar un nuevo código de autorización SITEDS";
                                    TxtCodAut.Text = ""
                                    fetch('/modulo/permite_ingreso/', {
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
                                              if(data) {
                                                  document.getElementById('TxtCodAut').disabled = false; 
                                              }else{
                                                document.getElementById('TxtCodAut').disabled = true; 
                                                 
                                              }
                                        }).catch(error => {
                                          console.log(error);
                                        });   
                                        document.getElementById('Cmd_datos_siteds').style.visibility = 'visible';
                                        document.getElementById('Cmd_datos_siteds').disabled = false;
                    
                                }
                            }
                            
                        }  
                }).catch(error => {
                  console.log(error);
                });    
           
          }  
    }).catch(error => {
      console.log(error);
    });    
 
 

 


//medicacion COVID-19
if(Adata_atencion[0].clasificacion_pac == 2 ){
    //Frm_medicacion_covid_19.Visible = True
}else{
    //Frm_medicacion_covid_19.Visible = False
}

//DATOS DE LA DIRECCION 
    Msj_error_carga = "Error de carga en datos de dirección"
     
 
   await fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "SELECT * FROM vw_datos_paciente_direccion WHERE cod_paciente = '" +  (Adata_atencion[0].cod_tit) + "' and cod_dir = '" + (Adata_atencion[0].cod_dir) + "'"
    
        })
      }).then(response => response.json())
        .then(function (lrs_aux) {
               if(lrs_aux.length>0) {
                   document.getElementById('Txt_distrito').value  =  lrs_aux[0].departamento + " - " + lrs_aux[0].provincia + " - " + lrs_aux[0].distrito;
                   document.getElementById('Txt_direccion').value  =  lrs_aux[0].direccion;
                   document.getElementById('Txt_nro_lote').value  =  lrs_aux[0].nro_dir_lote;
                   document.getElementById('Txt_dpto_dir').value  =  lrs_aux[0].dir_dpto_interior;
                   document.getElementById('Txt_urbanizacion').value  =  lrs_aux[0].dir_urbanizacion;
                   document.getElementById('Txt_referencia').value  =  lrs_aux[0].referencia;
                   document.getElementById('Txt_tlf_casa').value  =  lrs_aux[0].tlf_casa??='';
                   document.getElementById('Txt_tlf_oficina').value  =  lrs_aux[0].tlf_oficina;
                   document.getElementById('Txt_tlf_oficina_anx').value  =  lrs_aux[0].tlf_oficina_anx;
               
              }  
        }).catch(error => {
          console.log(error);
        });    
     
 
 
 
       
})();
 
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


    
 window.Cbo_forma_pago_Click = function(){ 
 

    switch  (document.getElementById('Cbo_forma_pago').value){
        case "EFECTIVO":
          document.getElementById('Frame_efectivo').style.display='';
          document.getElementById('Frame_efectivo').classList.add("Frame_efectivo"); 
          document.getElementById('Frame_credito').style.display = 'none';
          document.getElementById('Frame_tarjeta').style.display = 'none';
          document.getElementById('Frame_transferencia').style.display = 'none';
           
            break;
        case "CREDITO":
          document.getElementById('Frame_credito').style.display='';
          document.getElementById('Frame_efectivo').style.display = 'none';
           document.getElementById('Frame_credito').classList.add("Frame_credito");    
          document.getElementById('Frame_tarjeta').style.display = 'none';
          document.getElementById('Frame_transferencia').style.display = 'none';
          break;
        case "TARJETA":
          document.getElementById('Frame_tarjeta').style.display='';
          document.getElementById('Frame_efectivo').style.display = 'none';
          document.getElementById('Frame_credito').style.display = 'none';
           document.getElementById('Frame_tarjeta').classList.add("Frame_tarjeta");    
  
          document.getElementById('Frame_transferencia').style.display = 'none';
          break;
        case "TRANSFERENCIA":
          document.getElementById('Frame_transferencia').style.display='';
            document.getElementById('Frame_efectivo').style.display = 'none';
            document.getElementById('Frame_credito').style.display = 'none';
            document.getElementById('Frame_tarjeta').style.display = 'none';
             document.getElementById('Frame_transferencia').classList.add("Frame_transferencia");    
  
            break;
        case "MPOS":
              document.getElementById('Frame_efectivo').classList.remove("Frame_efectivo"); 
              document.getElementById('Frame_credito').classList.remove("Frame_credito");
              document.getElementById('Frame_tarjeta').classList.remove("Frame_tarjeta");
              document.getElementById('Frame_transferencia').classList.remove("Frame_transferencia");  
              document.getElementById('Frame_tarjeta').style.display='none';
              document.getElementById('Frame_efectivo').style.display = 'none';
              document.getElementById('Frame_credito').style.display = 'none';
              document.getElementById('Frame_transferencia').style.display = 'none';
                break;
        default:
              document.getElementById('Frame_efectivo').classList.remove("Frame_efectivo"); 
              document.getElementById('Frame_credito').classList.remove("Frame_credito");
              document.getElementById('Frame_tarjeta').classList.remove("Frame_tarjeta");
              document.getElementById('Frame_transferencia').classList.remove("Frame_transferencia");
              document.getElementById('Frame_tarjeta').style.display='none';
              document.getElementById('Frame_efectivo').style.display = 'none';
              document.getElementById('Frame_credito').style.display = 'none';
              document.getElementById('Frame_transferencia').style.display = 'none';
              break;
    }
  
  }




var l_estado_audi='';
window.Cmd_guardar_Click = async function (){
var lb_rpta ;
var vt_deducible       ;
var vt_flag_mone        ;
var vt_cambio          ;
var vt_cond_pago       ;
var vt_tipo_doc_pago    ;
var s_consmt           ;
var s_servrpg          ;
 var str_cuerpo          ;
var str_correo_para    ;
var valida=false;
var  str_flg_covid_19    ;


str_flg_covid_19 = "false";

//vALIDA EL DOCUMENTO DE IDENTIDAD

if(document.getElementById("Txt_Doc_id").value == "" ){
    alert ("Ingrese el numero del documento de identidad");
    //Txt_Doc_id.BackColor = &HC0C0FF
   return;
}else{
    if(document.getElementById("DC_tipo_doc_id").value  == 2 ){
       
        if(document.getElementById("Txt_Doc_id").value.match(/^[0-9]+$/) != null)
        {
            
        }
        else
        {
            alert ("El numero del documento de identidad es incorrecto");
            return;
        }
    }
}

//VERIFICA TIPO DE DOCUMENTO SOLICITADO SI DEDUCIBLE > 0

vt_tipo_doc_pago = "";

if( document.getElementById("Txt_ded").value > 0 ){
    if( document.getElementById("Cbo_doc_pago").style.visibility == "visible" ){
        switch (document.getElementById("Cbo_doc_pago").value)  {
            case "BOLETA":
                vt_tipo_doc_pago = "B";
                break;
            case "FACTURA":
                vt_tipo_doc_pago = "F";
                await fetch('/modulo/Abre_Detalle', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query:"SELECT * FROM h_servicio_datos_factura  WHERE tipo_servicio = 'ATE' AND cod_servicio = " +  document.getElementById("Txt_CodAte").value 
                       })
              
                     }).then(response => response.json())
                    .then(function (rst_datos ) {
                      if(rst_datos.length==0) {
                        alert("Debe registrar los datos de la persona jurídica para la emisión de la factura de venta");
                       // Cmd_datos_fact_Click();
                        valida = true;                     }
                    }).catch(error => {
                      console.log(error);
                    });
            
                    break;

            default:
                alert("Seleccione un tipo de documento de pago");
                return;
                break;

        }
    }
}
if(valida){
  return;
}
//VALIDA DATOS DE FORMA DE PAGO

if(document.getElementById('Txt_ded').value.trim() == "" ){
    alert ("Ingrese el Deducible");
    document.getElementById('Txt_ded').focus();
    return;
}
 
if(document.getElementById('txt_coa').value.trim() == "" ){
    alert ("Ingrese el Coaseguro");
    document.getElementById('txt_coa').focus();
    return;
}

switch (document.getElementById('Cbo_forma_pago').value ){
    case "":
        alert ("Seleccione una forma de pago");
        document.getElementById('Cbo_forma_pago').focus();
         return;
         break;
    case "EFECTIVO":
        if(document.getElementById('Cbo_Denominacion').value  == "" ){
            alert ( "Ingrese la denominación de la forma de pago");
            document.getElementById('Cbo_Denominacion').focus();  
            return;
        }
       break;
    case "CREDITO":
        if(document.getElementById('Txt_autorizado').value == "" ){
            alert ( "Ingrese descripcion de autorizado");
            document.getElementById('Txt_autorizado').focus();  
            return;
        }
        break;
    case "TARJETA":
    
        if(document.getElementById('TxtNroTar').value == "" ){
            alert ( "Seleccione el operador");
            document.getElementById('TxtNroTar').focus();  
            return;
        }
        
        if(document.getElementById('ME_tarjeta').value.length    < 16 ){
            alert ( "Ingrese todos los digitos de la tarjeta");
            document.getElementById('ME_tarjeta').focus();  
            return;
        }
         
        if(document.getElementById('Txt_mes_credito').value== "" || document.getElementById('Txt_mes_credito').value == 0 ){
            alert ( "Ingrese el mes de vencimiento de la tarjeta");
            document.getElementById('Txt_mes_credito').focus();  
            return;
        }
      
        if(document.getElementById('Txt_anio_credito').value  == "" || document.getElementById('Txt_anio_credito').value == 0 || document.getElementById('Txt_anio_credito').value  < (new Date().getFullYear) ){
            alert ( "Ingrese el año de vencimiento de la tarjeta");
            document.getElementById('Txt_anio_credito').focus(); 
            return;
          
        }
        break;
}

if(document.getElementById('Cbo_tiene_correo').selectedIndex  == 0 ){
    if(  document.getElementById('Txt_email').value.trim() == "" /* || Validar_Email(Txt_email.Text) = False */ ){
        alert ( "El correo electronico esta mal ingresado, por favor corregir");
        return;
    }
}


//VALIDA DIRECCION
if(  document.getElementById('Txt_direccion').value  == "" ){
    alert ("Describa la direccion del paciente");
    document.getElementById('Txt_direccion').focus(); 
    return;
}

if(  document.getElementById('Txt_nro_lote').value  == "" ){
    alert ("Describa el numero de direccion o lote/Mnz");
    document.getElementById('Txt_nro_lote').focus(); 
    return;
}

if(document.getElementById('Txt_referencia').value  == "" ){
    alert ("Describa la referencia de la direccion");
    document.getElementById('Txt_referencia').focus(); 
    return;
}


//VALIDA EL CONSENTIMIENTO DE PACIENTE

s_consmt = ""
// false es NO, true es SI
if(document.getElementById('Opt_ri_si').checked  ){
    s_consmt = s_consmt + ", consent_recibir_info = true, consent_informado = true ";
}

if(document.getElementById('Opt_ri_no').checked  ){
    s_consmt = s_consmt + ", consent_recibir_info = false, consent_informado = true ";
}

l_estado_audi = Adata_atencion[0].cm_estado;
if(document.getElementById('Cbo_Moneda').value == "S/." ){
    vt_deducible = document.getElementById('Txt_ded').value ;
    vt_flag_mone = "S";
    vt_cambio = 0;
}else{
 
    vt_deducible =  Math.round(((document.getElementById('Txt_ded').value   * lsg_cambio ) + Number.EPSILON )*100)/100;
    vt_flag_mone = "D";
    vt_cambio = lsg_cambio;
}

vt_cond_pago = "";
switch  (document.getElementById('Cbo_forma_pago').value) {
    
    case "EFECTIVO":
        if(document.getElementById('Cbo_moneda_den').value  == "S/." ){
            vt_cond_pago = ", for_ate = 'E', cm_denominacion = '" + document.getElementById('Cbo_Denominacion').value   + "', cm_moneda_den = 'S', cm_den_cambio = 0";
        }else{
            vt_cond_pago = ", for_ate = 'E', cm_denominacion = '" + document.getElementById('Cbo_Denominacion').value   + "', cm_moneda_den = 'D', cm_den_cambio = " + lsg_cambio;
        }
        break;
    case "CREDITO":
        vt_cond_pago = ", for_ate = 'C', cm_autorizado = '" +document.getElementById('Txt_autorizado').value    + "'";
        break;
    case "TARJETA":
        vt_cond_pago = ", for_ate = 'T', CODTAR_ATE = '" + document.getElementById('TxtNroTar').value    + "', NTAR_ATE = '" + document.getElementById('ME_tarjeta').value.padStart(16, '0').substr(8, 8) +"', tarj_mc = '" + document.getElementById('ME_tarjeta').value.padStart(16, '0') + "', FVENC_ATE = '" +  document.getElementById('Txt_anio_credito').value + "/" + document.getElementById('Txt_mes_credito').value + "/" + "01'";
        break;
    case "MPOS":
        vt_cond_pago = ", for_ate = 'M'";
        break;
    case "TRANSFERENCIA":
        vt_cond_pago = ", for_ate = 'F'";
        break;
}
 
if(window.Tag == "NORMAL" ){
    s_servrpg = "3";
}else{
    s_servrpg = "R3";
}



/* 
if(Frm_medicacion_covid_19.Visible = True ){
    if(Cbo_med_covid_19.Text = "" ){
        alert "Seleccione si se va a dispensar la medicación por 2 meses (COVID-19)", vbInformation
        return
    }else{if(Cbo_med_covid_19.Text = "SI" ){
        str_flg_covid_19 = "True"
    }else{
        str_flg_covid_19 = "False"
    }
}
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
    
document.getElementById('Cmd_guardar').disabled = true;
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

var str_datos_siteds ;

  str_datos_siteds = " , empresa_paciente = '" + str_emp_contratante + "', cod_aut_prestacion = '" +  document.getElementById('TxtCodAut').value   + "', cod_asegurado = '" + document.getElementById('Txt_cod_aseg').value   + "', tipo_afiliacion = '"  +document.getElementById('TxtCodAut').dataset.tag + "', poliza_asegurado = '" + document.getElementById('Txt_Poliza').value  + "', poliza_certificado = '" + document.getElementById('Txt_pol_cert').value  + "', cm_aseg_producto = '" + document.getElementById('Txt_prod').value  + "' "

if(document.getElementById('Cbo_tiene_correo').selectedIndex == 0 ){
    await   fetch('/modulo/Execute/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "UPDATE m_pacientesdrmas SET appat_pac = '" +  document.getElementById('Txt_ap_pat').value.trim() + "', apmat_pac = '" + document.getElementById('Txt_ap_mat').value.trim() + "', nom_pac = '" +  document.getElementById('Txt_nom_pac').value.trim() + "', nom_com = '" + (document.getElementById('Txt_ap_pat').value.trim() + ' ' + document.getElementById('Txt_ap_mat').value.trim() + ' ' + document.getElementById('Txt_nom_pac').value.trim()) + "', fnac_pac = '" + document.getElementById('TxtAnio').value.trim() + "-" + document.getElementById('TxtMes').value + "-" + document.getElementById('Txtdia').value + "', id_doc_id = '" + document.getElementById('DC_tipo_doc_id').dataset.tag + "', num_doc_id = '" + document.getElementById('Txt_Doc_id').value + "',correo_pac = '" + document.getElementById('Txt_email').value.toUpperCase() + "', flg_correo = true, cel_pac = '" + document.getElementById('Txt_tlf_celular').value + "'" + s_consmt + " WHERE cod_hia = '" +  (Adata_atencion[0].cod_tit).trim() + "'"
        })
      }).then(response => response.json())
      .then(function(data) {
   
        if(data){
          
        } 
        
        
      }).catch(error => {
        console.log(error);    
      });
    
}else{
    

   await fetch('/modulo/Execute/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "UPDATE m_pacientesdrmas SET appat_pac = '" +  document.getElementById('Txt_ap_pat').value.trim() + "', apmat_pac = '" + document.getElementById('Txt_ap_mat').value.trim() + "', nom_pac = '" +  document.getElementById('Txt_nom_pac').value.trim() + "', nom_com = '" + (document.getElementById('Txt_ap_pat').value.trim() + " " + document.getElementById('Txt_ap_mat').value.trim() + ' ' + document.getElementById('Txt_nom_pac').value.trim()) + "', fnac_pac = '" + document.getElementById('TxtAnio').value.trim() + "-" + document.getElementById('TxtMes').value + "-" + document.getElementById('Txtdia').value + "', id_doc_id = '" + document.getElementById('DC_tipo_doc_id').dataset.tag + "', num_doc_id = '" + document.getElementById('Txt_Doc_id').value + "',correo_pac = '', flg_correo = false, cel_pac = '" + document.getElementById('Txt_tlf_celular').value + "'" + s_consmt + " WHERE cod_hia = '" + Trim(Adata_atencion[0].cod_tit) + "'"

         })
      }).then(response => response.json())
      .then(function(data) {
   
        if(data){
          
        } 
        
        
      }).catch(error => {
        console.log(error);    
      });
}
  today = new Date(); 
 
var fecha = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
var hora = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
var usuario = '';
var cbo_modo_atencion_medico='';
switch (document.getElementById('Cbo_modo_atencion_medico').value) {
  case 'VISITA DOMICILIARIA':
    cbo_modo_atencion_medico = 0;
    break;
  case 'TELECONSULTA':
    cbo_modo_atencion_medico = 1;
  break;
  case 'LLAMADA DE SEGUIMIENTO':
    cbo_modo_atencion_medico = 2;
    break;
  default:
    break;
}
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
            usuario = data.trim() ;
    }).catch(error => {
      console.log(error);
    }); 
//actualiza la atencion
await fetch('/modulo/Execute/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "UPDATE t_tmpllamadas SET cod_estado = 2, flg_registrar_ate_tablet = true, cm_estado = '" + s_servrpg + "', cm_orden = 4, nom_pac = '" + (document.getElementById('Txt_ap_pat').value.trim() + " " + document.getElementById('Txt_ap_mat').value.trim() + ' ' + document.getElementById('Txt_nom_pac').value.trim()) + "', edad_ate = " + document.getElementById('Txt_edad').value 
      + ", cm_esp_anterior = null, cm_cod_dr_anterior = null, cm_dr_anterior = null, tar_Ate = " + vt_deducible + ", coaseguro = " + document.getElementById('txt_coa').value + ", flagmone = '" + vt_flag_mone + "', cambio = " + vt_cambio 
      + ", des_dir = '" + document.getElementById('Txt_direccion').value + "', ref_dir = '" + document.getElementById('Txt_referencia').value + "', tlf_dir = '" + document.getElementById('Txt_tlf_casa').value + "', sin_ate = '" + document.getElementById('Txt_sintomas').value + "', tipo_doc_pago = '" + vt_tipo_doc_pago + "' " + vt_cond_pago + ", fecdrlla_ate = '" + fecha+ "', hordrlla_ate = '" + hora + "', usudrlla_ate = '" + usuario + "' " 
      + str_datos_siteds + ", flg_ate_con_med_covid_19 = " + str_flg_covid_19 + ", modo_atencion_medico = " +  cbo_modo_atencion_medico + " WHERE cod_ate = " + document.getElementById('Txt_CodAte').value  

     })
  }).then(response => response.json())
  .then(function(data) {

    if(data){
      
    } 
    
    
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
      query: "UPDATE t_tmpllamadas SET cod_estado = 2 " + str_datos_siteds + " WHERE cod_ate = " + document.getElementById('Txt_CodAte').value
     })
  }).then(response => response.json())
  .then(function(data) {

    if(data){
      
    } 
    
    
  }).catch(error => {
    console.log(error);    
  }); 

//actualiza la direccion
 
            await fetch('/modulo/Execute/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "UPDATE m_direcciones SET des_dir = '" + document.getElementById('Txt_direccion').value.trim() + "', nro_dir_lote = '" + document.getElementById('Txt_nro_lote').value.trim() + "', dir_dpto_interior = '" + document.getElementById('Txt_dpto_dir').value.trim() + "', dir_urbanizacion = '" + document.getElementById('Txt_urbanizacion').value.trim() + "',  " 
                  + " ref_dir = '" + document.getElementById('Txt_referencia').value.trim() + "', tlf_casa = '" + document.getElementById('Txt_tlf_casa').value.trim() + "', tlf_dir = '" + document.getElementById('Txt_tlf_casa').value.trim() + "', " 
                  + " tlf_oficina = '" + document.getElementById('Txt_tlf_oficina').value + "', tlf_oficina_anx = '" + document.getElementById('Txt_tlf_oficina_anx').value.trim() + "', tlf_celular = '" + document.getElementById('Txt_tlf_celular').value.trim() + "' " 
                  + " WHERE cod_tit = '" +  (Adata_atencion[0].cod_tit).trim() + "' AND cod_dir = '" +  (Adata_atencion[0].cod_dir).trim() + "'"
                 })
              }).then(response => response.json())
              .then(function(data) {
            
                if(data){
                  
                } 
                
                
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
         ll_cod_ate :  document.getElementById('Txt_CodAte').value,
         ls_estado : "->3",
         ls_cambios :  "MEDICO ASIGNADO: " + document.getElementById('Txt_medico').value + ", DEDUCIBLE: " + document.getElementById('Cbo_Moneda').value  + document.getElementById('Txt_ded').value    + ", COASEGURO: " + document.getElementById('txt_coa').value   + "%",
         ls_obs : "CONFIRMACION DE DATOS DE PACIENTE"

        }
    )
  }).then(response => response.json())
    .then(function (data) {
     if(data){

     }

    }).catch(error => {
      console.log(error);
    });
if(s_consmt != "" ){
    await fetch('/modulo/REGISTRA_CM_AUDITORIA/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 
             ll_cod_ate :   document.getElementById('Txt_CodAte').value,
             ls_estado : "->3",
             ls_cambios : "EL PACIENTE " + (document.getElementById('Opt_ri_si').checked? "SI": "NO") + " ACEPTA RECIBIR INFORMACION",
             ls_obs :  "CONSENTIMIENTO INFORMADO"
    
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

str_cuerpo = "";
/* if(vt_tipo_doc_pago = "F" ){
    Call Abre_Recordset(rst_datos, "SELECT tdf.*, ate.tar_ate deducible  FROM h_servicio_datos_factura tdf INNER JOIN t_tmpllamadas ate ON tdf.cod_servicio = ate.cod_ate  WHERE tdf.tipo_servicio = 'ATE' AND tdf.cod_servicio = " + Txt_CodAte.Text)
    if(Not rst_datos.EOF ){
    
        str_cuerpo = "Deducible : S/" + RedondeaDed(rst_datos!DEDUCIBLE) + Chr(13)
        str_cuerpo = str_cuerpo + "RUC : " + rst_datos!ruc + Chr(13)
        str_cuerpo = str_cuerpo + "Razon social : " + rst_datos!razon_social + Chr(13)
        str_cuerpo = str_cuerpo + "Direccion legal : " + rst_datos!direccion_legal + Chr(13)
        str_cuerpo = str_cuerpo + "Direccion entrega : " + rst_datos!direccion_entrega + Chr(13)
        str_cuerpo = str_cuerpo + "E-mail : " + rst_datos!Email + Chr(13)
        
        Call Abre_Recordset(rst_datos, "SELECT mail_para FROM m_parametros_bd where id_parm = 13")
        str_correo_para = rst_datos!mail_para
        
        Call ENVIAR_MAIL("drmas.helpdesk@sanna.pe", "Abc123xyz", "Solicitud de Factura - atención N° " + Txt_CodAte.Text, str_correo_para, str_cuerpo)
        
    }
} */

if(Adata_atencion[0].clasificacion_pac != 204 ){
  document.body.style.cursor = 'default';

   // Frm_CM_Grid.CmdFiltrar_Click
   alert("Se confirmaron los datos de paciente");
   appMainWindow.document.getElementById('Cbo_opcion').value = 14;
appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block';
appMainWindow.document.getElementById('Cb_clasificacion').style.display='none' ;
appMainWindow.document.getElementById('Txt_busqueda').value=document.getElementById('Txt_CodAte').value;
await appMainWindow.document.getElementById('CmdFiltrar').click();
window.close();

    //Frm_informa.Show 1
    //Unload Me
}else{
    ///Unload Frm_CM_confirma_fin
   /*  Frm_CM_confirma_fin.Txt_CodAte.Text = Txt_CodAte.Text
    Frm_CM_confirma_fin.Show 1
    Unload Me */
}

}

var l_estado_audirpg ;

window.cmd_reprogramardirecto_Click = async function(){
   
     printModal(Frm_CM_reprogramar2_body(document.getElementById('Txt_CodAte').value));
     document.getElementById('Chk_editar_direccion').addEventListener('click', function(){Chk_editar_direccion_Click(document.getElementById('Chk_editar_direccion').checked)});
     document.getElementById('Txt_especialidadrpg').addEventListener('change', function(){Txt_Dr_Change(document.getElementById('Txt_especialidadrpg').value)});
     document.getElementById('Txt_distritorpg').addEventListener('change', function(){Txt_distritorpg_Change(document.getElementById('Txt_distritorpg').value)});
     document.getElementById('Txt_direccionrpg').addEventListener('change', function(){Txt_direccionrpg_change(document.getElementById('Txt_direccionrpg').value)}); 
     await fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:"SELECT * FROM t_tmpllamadas WHERE cod_ate ="+document.getElementById('Txt_CodAterpg').value
         })

       }).then(response => response.json())
      .then(async function (Adata_atencion ) {
        if(Adata_atencion.length>0) {
          l_estado_audirpg = Adata_atencion[0].cm_estado;
          document.getElementById('Txt_pacrpg').value = Adata_atencion[0].nom_pac;
          document.getElementById('Txt_medicorpg').tag = Adata_atencion[0].cod_doc??='';
          document.getElementById('Txt_medicorpg').value = Adata_atencion[0].nom_doc??='';

          document.getElementById('Txt_distrpg').value = Adata_atencion[0].des_dis;
          document.getElementById('Txt_fecrpg').value = Adata_atencion[0].fec_ate;
          document.getElementById('Txt_horrpg').value = Adata_atencion[0].hor_ate;
          document.getElementById('DTPicker1rpg').value = Adata_atencion[0].fec_ate;

           var opt = document.createElement('option');
          opt.value = Adata_atencion[0].hor_ate.slice(0,5);
          opt.innerHTML = Adata_atencion[0].hor_ate.slice(0,5);
          document.getElementById('CmbHorarpg').appendChild(opt);
          document.getElementById('CmbHorarpg').value =  Adata_atencion[0].hor_ate.slice(0,5); 
          document.getElementById('Txt_obs_cmrpg').value = Adata_atencion[0].obs_cm;
          document.getElementById('TXt_tipo_medicorpg').value = Adata_atencion[0].cod_tipo_doctor=='I'?"INDEPENDIENTE":"AUTO";
          document.getElementById('TXt_tipo_medicorpg').Tag = Adata_atencion[0].cod_tipo_doctor;

              fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:"SELECT distinct trim(c.cod_esp) cod_esp, c.nom_esp FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.activi = true ORDER BY c.nom_esp ASC"    
                })

              }).then(response => response.json())
              .then(function (lrs_especialidades ) {
                if(lrs_especialidades.length>0) { 
                    var options;
                  options = lrs_especialidades.map(person => `<option value="${person.cod_esp}">${person.nom_esp}</option>`).join("\n");
 
                 document.getElementById('Txt_especialidadrpg').innerHTML = options;
                 document.getElementById('Txt_especialidadrpg').value =  (Adata_atencion[0].cod_esp.trim());
                 document.getElementById('Txt_especialidadrpg').cod_doc =  (Adata_atencion[0].cod_doc.trim());
                 document.getElementById('Txt_especialidadrpg').cod_tipo_doctor =  (Adata_atencion[0].cod_tipo_doctor.trim());

                 Txt_Dr_Change(Adata_atencion[0].cod_esp.trim());
                }
              }).catch(error => {
                console.log(error);
              }); 
              document.getElementById('Txt_Drrpg').value   = Adata_atencion[0].nom_doc.trim();

              //Direccion de paciente
              await fetch('/modulo/Abre_Detalle', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "SELECT distinct cod_prov,provincia FROM VW_FILTRO_DISTRITO" 
                  })

                }).then(response => response.json())
                .then(function (AData_provincia ) {
                  if(AData_provincia.length>0) {  
                    var options;
                      options = AData_provincia.map(person => `<option value="${person.cod_prov.trim()}">${person.provincia}</option>`).join("\n");
                      document.getElementById('Txt_provinciarpg').innerHTML = options;
                      document.getElementById('Txt_provinciarpg').value =  Adata_atencion[0].cod_prov.trim();
                  
                  }
                }).catch(error => {
                  console.log(error);
                }); 
                  await      fetch('/modulo/Abre_Detalle', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          query: "SELECT distinct cod_dis,des_dis FROM VW_FILTRO_DISTRITO" 
                          })

                        }).then(response => response.json())
                        .then(function (AData_Distrito ) {
                          if(AData_Distrito.length>0) {  
                            var options;
                              options = `<option value=''></option>`+ AData_Distrito.map(person => `<option value="${person.cod_dis.trim()}">${person.des_dis}</option>`).join("\n");
                              document.getElementById('Txt_distritorpg').innerHTML = options;
                              document.getElementById('Txt_distritorpg').value =  (Adata_atencion[0].cod_dis??='').trim();
                              document.getElementById('Txt_distritorpg').cod_tit = Adata_atencion[0].cod_tit.trim();
                              Txt_distritorpg_Change(Adata_atencion[0].cod_dis.trim());
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
                            query:"SELECT * FROM m_direcciones WHERE cod_tit = '" +  (Adata_atencion[0].cod_tit).trim() +  "' AND cod_dis = '"  + (Adata_atencion[0].cod_dis).trim() + "'"
                            })
          
                          }).then(response => response.json())
                          .then(function (Adata_m_direcciones ) {
                            if(Adata_m_direcciones.length>0) { 
                                var options;
                              options = Adata_m_direcciones.map(person => `<option value="${person.des_dir}">`).join("\n");
             
                             document.getElementById('direccionesrpg').innerHTML = options;
                             document.getElementById('Txt_direccionrpg').value =  (Adata_atencion[0].des_dir.trim()); 
                            }
                          }).catch(error => {
                            console.log(error);
                          }); 
        }
    }).catch(error => {
      console.log(error);
    }); 
        //CRONICOS 

        fetch('/modulo/Abre_Detalle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query:"SELECT * FROM m_servnoconforme WHERE tip_serv = 'SSA'"  //SSA: Seguimiento de Salud Adelanto
            })

          }).then(response => response.json())
          .then(function (data1) {
            if(data1.length>0){
               switch (data1[0].clasificacion_pac){
              case 2:
              case 200:
              case 201:
              case 202:
              case 203:
                 
                  document.getElementById('Opt_adelanto_ate').disable = false;
                  break;
              }
            }
          }).catch(error => {
            console.log(error);
          }); 
      
         
          document.getElementById('Txt_Drrpg').focus();
     
}



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
      <div><input type="radio" id="Opt_tiempo_mayor" name="Opc_reprogramarpor" checked  ><label for ="Opt_tiempo_mayor">Tiempo mayor</label></div>
      <div><input type="radio" id="Opt_por_pac" name="Opc_reprogramarpor"    ><label for ="Opt_por_pac">Solicitud de paciente</label></div>
      <div><input type="radio" disabled id="Opt_adelanto_ate" name="Opc_reprogramarpor"    ><label for ="Opt_adelanto_ate">Adelanto de atención</label></div>

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
      <label id ="Label1">Especialidad :</label><select onchange="Txt_Dr_Change(this.value);" id="Txt_especialidadrpg" name="Txt_especialidadrpg" ></select><label id ="Label5">Tipo médico:</label><input type="text" disabled id="TXt_tipo_medicorpg" name="TXt_tipo_medicorpg" >
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
      <div style="grid-column:1 / 4;"><input type="checkbox" id="Chk_editar_direccion" name="Chk_editar_direccion" onclick="Chk_editar_direccion_Click(this.checked);" ><label for ="Chk_editar_direccion">Editar datos de dirección de paciente</label></div>
      <label id ="Label7">Provincia :</label><select disabled type="text" id="Txt_provinciarpg" name="Txt_provinciarpg"   ></select><div></div>
      <label id ="Label6">Distrito :</label><select disabled type="text" onchange="Txt_distritorpg_Change(this.value);" id="Txt_distritorpg" name="Txt_distritorpg" ></select><div></div>
      <label id ="Label13">Direccion :</label><input disabled type="text" id="Txt_direccionrpg" name="Txt_direccionrpg"  list="direccionesrpg">
      <datalist id="direccionesrpg">
    
      </datalist><div></div>
      <label id ="Lbl_ref">Referencia :</label><input disabled type="text" id="txt_referenciarpg" name="txt_referenciarpg" ><div></div>
      <label id ="Label9">Telf. casa :</label><input disabled type="text" id="Txt_tlf_casarpg" name="Txt_tlf_casarpg" ><div></div>
      <label id ="Label23">Telf. oficina :</label><div><input disabled type="text" id="Txt_tlf_oficinarpg" name="Txt_tlf_oficinarpg" ><label id ="Label35">Anx :</label></div><input type="text" disabled id="Txt_tlf_oficina_anxrpg" name="Txt_tlf_oficina_anxrpg" >    

      </div>
      <div class="Botonesreprogramar2"></div>
  </div>

  <div style="display:flex;justify-content:space-around	;">   
  <input type="button"  class="btn btn btn-success btn-sm "  id="Cmd_guardarrpg" name="Cmd_guardarrpg"  onclick="Cmd_guardarrpg_Click();" value="Guardar"> 
  <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="CmdCancelarrpg" name="CmdCancelarrpg" onClick="CmdCancelarrpg_Click" value="Salir">
  
  </div>  
`;

}






// ----------------------------------------------Añadir un objeto de atributos a un elemento------------------------//
var addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if(attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr])
  }
};

// Crear elementos con atributos e hijo
var createCustomElement = (element, attributes, children) => {
  let customElement = document.createElement(element);
  if(children !== undefined) children.forEach(el => {
    if(el.nodeType) {
      if(el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement, attributes);
  return customElement;
};

// ----------------------------------------------------Imprimir modales ------------------------------------------//
var printModal = content => {
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
    if((e.target === modalContainerEl) removeModal();
  }) 
  document.querySelector('.cancelarmodal').addEventListener('click', e => {
    if((e.target === document.querySelector('.cancelarmodal')) removeModal();
  });*/
  let elementsArray = document.querySelectorAll(".cancelarmodal");

  elementsArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
      removeModal();
    });
  });

}
var printModal2 = content => {
  // crear contenedor interno
  const modalContentEl2 = createCustomElement('div', {
    id: 'ed-modal-content2',
    class: 'ed-modal-content'
  }, [content]),

  // crear contenedor principal
  modalContainerEl2 = createCustomElement('div', {
    id: 'ed-modal-container2',
    class: 'ed-modal-container'
  }, [modalContentEl2]);

// Imprimir el modal
document.body.appendChild(modalContainerEl2);
  //modalContainerEl.displ

  // Remover el modal
  const removeModal2 = () => document.body.removeChild(modalContainerEl2);

  /* modalContainerEl.addEventListener('click', e => {
    if((e.target === modalContainerEl) removeModal();
  }) 
  document.querySelector('.cancelarmodal').addEventListener('click', e => {
    if((e.target === document.querySelector('.cancelarmodal')) removeModal();
  });*/
  let elementsArray2 = document.querySelectorAll(".cancelarmodal2");

  elementsArray2.forEach(function (elem) {
    elem.addEventListener("click", function () {
      removeModal2();
    });
  });

}


function Txt_ded_Change(val){
if(document.getElementById('Cbo_Moneda').value != "S/."){
  document.getElementById('Lbl2_ded_usd').value = RedondeaDed(val * lsg_cambio);
}

if( val > 0 ){
  document.getElementById('Lbl_doc_pago').style.visibility = 'visible';
  document.getElementById('Cbo_doc_pago').style.visibility = 'visible';
 
}else{
  document.getElementById('Lbl_doc_pago').style.visibility = 'hidden';
  document.getElementById('Cbo_doc_pago').style.visibility = 'hidden';
 
}

}

function DC_tipo_doc_id_Change(val){

document.getElementById('Txt_Doc_id').maxLength = 0 ;
document.getElementById('DC_tipo_doc_id').dataset.tag = val;
if( val == "2" ){
    document.getElementById('Txt_Doc_id').maxLength = 8  ;
}

}

 

  


async function Cmd_guardarrpg_Click(){
var lrs_tipo_doctor         ;
var ls_dr1                  ;
var ls_dr2                 ;
var est_final               ;
var s_UpdateSQL            ;

//VALIDACIONES

if(Trim(document.getElementById('Txt_especialidadrpg').value) = "") {
    alert ("ingrese la especialidad");
    return;
}

if( document.getElementById('Txt_Drrpg').value == "" ){
    alert ("ingrese el Dr a asignar");
    return;
}
 

if( Date.parse(document.getElementById('DTPicker1rpg').value.replace(/-/g, ',')) < now().getTime() ){
    alert ("La fecha es menor que la fecha del servicio");
    document.getElementById('DTPicker1rpg').focus();
    return;
}

if(document.getElementById('CmbHorarpg').value == "" ){
    alert ("Seleccione la hora");
    document.getElementById('CmbHorarpg').focus();
    return;
}else{
    if(now().getTime()  >= Date.parse(document.getElementById('DTPicker1rpg').value.replace(/-/g, ',')) + ' ' + document.getElementById('CmbHorarpg').value) {
        alert ("La hora es menor que la hora actual");
        document.getElementById('CmbHorarpg').focus();
        return;
    }else{
        if( Date.parse(document.getElementById('DTPicker1rpg').value.replace(/-/g, ','))  < Date.parse(document.getElementById('Txt_fecrpg').value.replace(/-/g, ','))  && document.getElementById('CmbHorarpg').value <= document.getElementById('Txt_horrpg').value ){
            alert ("La  Fecha hora es menor o igual que la hora del servicio");
            return;
         }
    }
}

if(document.getElementById('Opt_adelanto_aterpg').checked == true ){
    if(document.getElementById('DBDes_adelanto_aterpg').value == "" ){
        alert ("Seleccione un motivo por el cual se realiza el adelanto de la atención");
        return;
    }

    if(document.getElementById('Txt_descripcion_adelanto_aterpg').value == "" ){
        alert ("Describa el motivo del adelanto de la atención");
        return;
    }
}
 

est_final = ""; 
     
 
     s_UpdateSQL = " flg_reprogramada = true, cm_esp_anterior = '" + document.getElementById('Txt_especialidadrpg').value.trim() + "', cm_cod_dr_anterior = '" + Adata_atencion[0].cod_doc.trim() + "', cm_dr_anterior = '" + Adata_atencion[0].nom_doc.trim() + "'";
     
     if(Adata_atencion[0].hrlledr == null ){
        s_UpdateSQL = s_UpdateSQL + ", cm_fec_anterior = '" + Adata_atencion[0].fec_ate + "', cm_hor_anterior = '" + Adata_atencion[0].hor_ate + "'";
     Else
        s_UpdateSQL = s_UpdateSQL + ", cm_fec_anterior = '" + Adata_atencion[0].feclledr  + "', cm_hor_anterior = '" + Adata_atencion[0].hrlledr + "'";
     }
     
     //las siguientes opciones solo una se cumple
     if(document.getElementById('Opt_tiempo_mayorrpg').value == true ){
        s_UpdateSQL = s_UpdateSQL + ", cm_estado = 'RT2', Tipo_reprog = 'T'";
        est_final = "RT2";
     }
     
     if(document.getElementById('Opt_por_pacrpg').value == true ){
        s_UpdateSQL = s_UpdateSQL + ", cm_estado = 'RP2', Tipo_reprog = 'P'";
        est_final = "RP2";
     }
     
     if(document.getElementById('Opt_adelanto_aterpg') == true ){
        s_UpdateSQL = s_UpdateSQL + ", contador_periodo = 1, cm_estado = 'R2', Tipo_reprog = 'A' ";
        est_final = "R2";
     } 
     
     s_UpdateSQL = s_UpdateSQL + " , cm_orden = 3, cod_dr_env_msj = '" + Adata_atencion[0].cod_doc.trim() + "', feclledr = null, HRLLeDR = Null, COD_ESP = '" + document.getElementById('Txt_especialidadrpg').value + "', fec_ate = '" + document.getElementById('DTPicker1').value +  "', Hor_ate = '" + document.getElementById('CmbHora').value + "', cod_doc = '" + document.getElementById('Txt_Drrpg').value + "', nom_doc = '"+ document.getElementById('nom_doc').value + "', cm_tiempo = Null, obs_cm = '" + document.getElementById('Txt_obs_cm').value + "'";
     
     //Call MODIFICA_FEC_MAX_LAB(!cod_ate, Format(DTPicker1.Value, "yyyy-mm-dd"))
    
     if(document.getElementById('Chk_editar_direccionrpg').checked == true ){
        var lrs_direccion ;
        var sqlaux ;
        var ll_cod_dir ;
        
        ll_cod_dir = 0;
        if(document.getElementById('Txt_direccionrpg').Tag == "DirNueva" ){
            
             await fetch('/modulo/Abre_Detalle/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: "SELECT * FROM m_direcciones WHERE cod_tit = '" + Adata_atencion[0].cod_tit + "' ORDER BY cod_dir desc"
            
              })
            }).then(response => response.json())
              .then(function (lrs_direccion) {
                 if(lrs_direccion.length>0){
                       ll_cod_dir =  parseInt(lrs_direccion[0].cod_dir.trim()) + 1 ;
                 }
            
              }).catch(error => {
                console.log(error);
              });         
            
            
            sqlaux = "INSERT INTO M_DIRECCIONES (cod_tit,cod_dir,des_dir,cod_dis,cod_prov,ref_dir,tlf_casa,tlf_dir,tlf_oficina,tlf_oficina_anx) VALUES ('" + (Adata_atencion[0].cod_tit).trim() + "', '" +  ll_cod_dir.padStart(2, '0') + "', '" + document.getElementById('Txt_direccion').value.trim() + "', '" +  document.getElementById('Txt_distritorpg').value + "', '" + document.getElementById('Txt_provinciarpg').value + "', '" + document.getElementById('txt_referenciarpg').value + "', '" + document.getElementById('Txt_tlf_casarpg').value + "', '" + document.getElementById('Txt_tlf_casarpg').value + "', '"  + document.getElementById('Txt_tlf_oficinarpg').value + "', '" + document.getElementById('Txt_tlf_oficina_anxrpg').value + "')"
        }else{
            ll_cod_dir =  document.getElementById('Txt_direccionrpg').cod_dir;
            sqlaux = "UPDATE M_DIRECCIONES SET des_dir = '" +  document.getElementById('Txt_direccionrpg').value + "', cod_dis = '" + document.getElementById('Txt_distritorpg').value + "', cod_prov = '" +document.getElementById('Txt_provinciarpg').value  + "', ref_dir =  '" + document.getElementById('txt_referenciarpg').trim() + "', tlf_casa = '" + document.getElementById('Txt_tlf_casarpg').value + "', tlf_dir ='" + document.getElementById('Txt_tlf_casarpg').value + "', tlf_oficina ='" + document.getElementById('Txt_tlf_oficinarpg').value + "', tlf_oficina_anx ='" + document.getElementById('Txt_tlf_oficina_anxrpg').value + "'  WHERE cod_tit = '" + Adata_atencion[0].cod_tit.trim() + "' AND cod_dir = '" + document.getElementById('Txt_direccionrpg').cod_dir + "'"
        }
         await fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: sqlaux      
          })
        }).then(response => response.json())
        .then(function(data) {
         
          if(data){
            
          } 
           
           
         }).catch(error => {
          console.log(error);    
        });
        s_UpdateSQL = s_UpdateSQL + ",cod_dis_cambiar = '" + document.getElementById('Txt_distritorpg').value + "', des_dis_cambiar = '" + document.getElementById('Txt_distritorpg').options[document.getElementById('Txt_distritorpg').selectedIndex].text + "', cod_dir = '" + ll_cod_dir.padStart(2, '0') + "', des_dir = '" + document.getElementById('Txt_direccionrpg').value.trim() + "', ref_dir = '" + document.getElementById('txt_referenciarpg').value.trim() + "'"
     }
      
    
     
     await fetch('/modulo/Execute/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "UPDATE t_tmpllamadas set " + s_UpdateSQL + ",cod_estado = 2, flg_registrar_ate_tablet = true  WHERE cod_ate =" + document.getElementById('Txt_CodAterpg').value      
      })
    }).then(response => response.json())
    .then(function(data) {
     
      if(data){
        
      } 
       
       
     }).catch(error => {
      console.log(error);    
    });
    /* G_db_tablet.Open s_cnstr
     Call REINGRESAR_ATE_TABLET(Val(Txt_CodAte').value))
     G_db_tablet.Close */
            
  




 

if(document.getElementById('Opt_tiempo_mayor').checked == true ){
  await fetch('/modulo/P_GUARDA_SEGUIMIENTO/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_ate : document.getElementById('Txt_CodAterpg').value,
      des_ser :  'ATE',
      obs_ser :  "REPROGRAMADA POR TIEMPO",
      cod_snc :  '520'
       })
  
     }).then(response => response.json())
    .then(function (data ) {
      str_cod_emp = data.trim();
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
             ll_cod_ate :   document.getElementById('Txt_CodAterpg').value,
             ls_estado : l_estado_audirpg + "->" + est_final,
             ls_cambios :  "MEDICO: " + document.getElementById('Txt_Dr').value  +  ", FECHA: " +   document.getElementById('DTPicker1') + ", HORA: " +  document.getElementById('CmbHora').value,
             ls_obs :"REPROGRAMACION DE ATENCION POR TIEMPO"
    
            }
        )
      }).then(response => response.json())
        .then(function (data) {
         if(data){
             
         }
    
        }).catch(error => {
          console.log(error);
        })
 }

if(document.getElementById('Opt_por_pac').checked  == true ){
  await fetch('/modulo/P_GUARDA_SEGUIMIENTO/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_ate : document.getElementById('Txt_CodAterpg').value,
      des_ser :  'ATE',
      obs_ser :  "REPROGRAMADA POR PACIENTE",
      cod_snc :  '520'
       })
  
     }).then(response => response.json())
    .then(function (data ) {
      str_cod_emp = data.trim();
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
           ll_cod_ate :   document.getElementById('Txt_CodAterpg').value,
           ls_estado : l_estado_audirpg + "->" + est_final,
           ls_cambios :  "MEDICO: " + document.getElementById('Txt_Dr').value  +  ", FECHA: " +   document.getElementById('DTPicker1') + ", HORA: " +  document.getElementById('CmbHora').value,
           ls_obs :"REPROGRAMACION DE ATENCION POR PACIENTE"
  
          }
      )
    }).then(response => response.json())
      .then(function (data) {
       if(data){
           
       }
  
      }).catch(error => {
        console.log(error);
      })  
 
    
}

if(document.getElementById('Opt_adelanto_ate').checked == true ){
  await fetch('/modulo/P_GUARDA_SEGUIMIENTO/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_ate : document.getElementById('Txt_CodAterpg').value,
      des_ser :  'ATE',
      obs_ser :   document.getElementById('DBDes_adelanto_ate').options[document.getElementById('DBDes_adelanto_ate').selectedIndex].text + " : " + document.getElementById('Txt_descripcion_adelanto_ate').value,
      cod_snc :  document.getElementById('DBDes_adelanto_ate').value
       })
  
     }).then(response => response.json())
    .then(function (data ) {
      str_cod_emp = data.trim();
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
           ll_cod_ate :   document.getElementById('Txt_CodAterpg').value,
           ls_estado : l_estado_audirpg + "->" + est_final,
           ls_cambios :  "MEDICO: " + document.getElementById('Txt_Dr').value  +  ", FECHA: " +   document.getElementById('DTPicker1') + ", HORA: " +  document.getElementById('CmbHora').value,
           ls_obs :  document.getElementById('DBDes_adelanto_ate').options[document.getElementById('DBDes_adelanto_ate').selectedIndex].text 
  
          }
      )
    }).then(response => response.json())
      .then(function (data) {
       if(data){
           
       }
  
      }).catch(error => {
        console.log(error);
      })    
 }

//Call Abre_Detalle(Adata_atencion, "SELECT * FROM t_tmpllamadas WHERE cod_ate =" & Txt_CodAte)

 
//Frm_CM_Grid.CmdFiltrar_Click
alert("Se reprogramó la atencion : " + document.getElementById('Txt_CodAterpg').value  );
 
 

}


function now () { const d = new Date(); d.setHours(0, 0, 0, 0); return d }

 




  function Txt_Dr_Change(val){
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


    function Txt_distritorpg_Change(val){

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


  function Chk_editar_direccion_Click(val){
 
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
    function  Txt_direccionrpg_change(val){
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

window.Cmd_cancelar_Click = async function(){

  await P_VNRyCANCELAR_CM('Frm_CM_asignacion',document.getElementById('Txt_CodAte').value.trim(), false);
  
} 


window.Cmd_cambio_estado_Click =async function(){

    //Execute ("DELETE FROM t_rpg_cambios WHERE cod_ate = " + document.getElementById('Txt_CodAte').value);
    printModal(Frm_CM_cambios_datos_medicos(document.getElementById('Txt_CodAte').value));
    var lrs_PacDrMas ;
    document.getElementById('Cbo_cambio').value ='';

    document.getElementById('DTPicker1').value = new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-')  ;
    
    var Adata_select = await Abre_Detalle( "SELECT * FROM t_cm_cotizacion_select WHERE activo = true ORDER BY cod_coti_select ASC");
    
    var Adata_atencion = await Abre_Detalle("Select * FROM t_tmpllamadas where cod_ate = " + document.getElementById('Txt_CodAte').value);
    document.getElementById('Txt_paciente').value =  Adata_atencion[0].nom_pac.trim();
   var  s_cod_esp = "'" + Adata_atencion[0].cod_esp.trim() + "'";
   var Adata_dr='';
    if (Adata_atencion[0].clasificacion_pac == 2){
      Adata_dr = await  Abre_Detalle("SELECT a.cod_doc, a.nom_doc FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.activi = true AND c.cod_esp in (" + s_cod_esp + ")  and a.maxisalud = true AND a.cod_doc not in (SELECT cod_doc FROM h_medico_bloqueado_paciente WHERE cod_hia = '" + Adata_atencion[0].cod_tit.trim() + "') ORDER BY a.nom_doc ASC");
    }else{
      Adata_dr = await Abre_Detalle("SELECT a.cod_doc, a.nom_doc FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.activi = true AND c.cod_esp in (" + s_cod_esp + ")  AND a.cod_doc not in (SELECT cod_doc FROM h_medico_bloqueado_paciente WHERE cod_hia = '" + Adata_atencion[0].cod_tit.trim() + "') ORDER BY a.nom_doc ASC");
    }

    document.getElementById('Txt_Dr').innerHTML = Adata_dr.map(person => `<option value="${person.cod_doc}">${person.nom_doc}</option>`).join("\n");;
   

    Str_Cod_dir = Adata_atencion[0].cod_dir.trim();
    
      CARGA_DIRECCION(Adata_atencion[0].cod_tit.trim(), Str_Cod_dir);
      CARGA_DATOS_ESP();
      CARGA_MEDICO();
    
    if (window.Tag == "REPROGRAMACION" ){
        l_estado_audi = "R2";
    }else{
        l_estado_audi = "2";
    }
    
    document.getElementById('Cbo_tipo_prog').disabled = false;
    
    if (Adata_atencion[0].clasificacion_pac ==2){
       // document.getElementById('Cbo_tipo_prog').value = '';
       var opt = document.createElement('option');
       opt.value = "INMEDIATA";
       opt.innerHTML = "INMEDIATA";
       document.getElementById('Cbo_tipo_prog').appendChild(opt);
       opt = document.createElement('option');
       opt.value = "PROGRAMADA (SOLICITÓ MÉDICO)";
       opt.innerHTML = "PROGRAMADA (SOLICITÓ MÉDICO)";
       document.getElementById('Cbo_tipo_prog').appendChild(opt);
       opt = document.createElement('option');
       opt.value = "PROGRAMADA (NO SOLICITÓ MÉDICO)";
       opt.innerHTML = "PROGRAMADA (NO SOLICITÓ MÉDICO)";
       document.getElementById('Cbo_tipo_prog').appendChild(opt);
       opt = document.createElement('option');
       opt.value = "PROGRAMADA MAXISALUD";
       opt.innerHTML = "PROGRAMADA MAXISALUD";
       document.getElementById('Cbo_tipo_prog').appendChild(opt);
       document.getElementById('Cbo_tipo_prog').selectedIndex = 3 ;
       document.getElementById('Cbo_tipo_prog').disabled = true;
      }
    
    
    
    var lrs_PacDrMas = await Abre_Detalle("SELECT * FROM m_pacientesdrmas WHERE cod_hia = '" +  Adata_atencion[0].cod_tit.trim() + "'")
    
        document.getElementById("Cbo_pac_VIP").value =  (lrs_PacDrMas[0].pac_vip==null, "", lrs_PacDrMas[0].pac_vip);
        
        if (document.getElementById("Cbo_pac_VIP").value == "MINT" ){
           /*  Cbo_pac_VIP.BackColor = &H80C0FF
            Txt_paciente.BackColor = &H80C0FF */
        }
        
        if  (lrs_PacDrMas[0].pac_clave == 't' ){
            document.getElementById('Lbl_pac_clave').style.visibility = 'visible';
            if (document.getElementById('obs_pac_clave').value == null || document.getElementById('obs_pac_clave').value == "" ){
                document.getelementbyid('Lbl_pac_clave').innerHTML = "PAC. CLAVE " +  document.getElementById('tipo_pac_clave').value  ;
            }else{
              document.getelementbyid('Lbl_pac_clave').innerHTML = "PAC. CLAVE " +  document.getElementById('tipo_pac_clave').value +  ": " +document.getElementById('obs_pac_clave').value  ;
            }
        }
     
       lrs_PacDrMas = [];
    
    var Adata_esp = await Abre_Detalle("SELECT distinct c.cod_esp, c.nom_esp FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.activi = true ORDER BY c.nom_esp ASC");
    //Direccion de paciente
    var Adata_m_direcciones  = await Abre_Detalle("SELECT * FROM m_direcciones WHERE cod_tit = '" + Adata_atencion[0].cod_tit.trim() + "' AND cod_dir = '" + Adata_atencion[0].cod_dir.trim() + "'");
    

}

var Str_Cod_dir ;

function Frm_CM_cambios_datos_medicos(codigo){

  return `
  <style>
  .Frm_CM_cambios_datos_medicos {
    display: grid;
    grid-template-columns: 1fr;
     grid-auto-columns: 1fr;
    gap: 5px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "Motivo"
      "Frame2"
      "Frame_cambio_medico"
      "Frame_cambio_esp"
      "Frame_cambio_direccion"
      "Frame_botones";
  }
  
  .Motivo { grid-area: Motivo; }
  
  .Frame2 {
    font-size:1.5vh;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 3px;
    grid-auto-flow: row;
    grid-template-areas:
      ". . . ."
      ". . . ."
      ". . . ."
      ". . . ."
      ". . . ."
      ". . . .";
    grid-area: Frame2;
  }
  
  .Frame_cambio_medico {
    font-size:1.5vh;
    border:1px solid black;
    visibility:hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
     gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
    ". ."
    "izquierda_cm derecha_cm"
    "izquierda_cm derecha_cm";
    grid-area: Frame_cambio_medico;
  }
  
  .Frame_cambio_esp {
    visibility:hidden;
    border:1px solid black;
    font-size:1.5vh; 
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row; 
    grid-area: Frame_cambio_esp;
    }
  .derecha_cm {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
     gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      ". ."
      ". .";
    grid-area: derecha_cm;
  }
  .izquierda_cm {
    display: grid; 
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      "."
      "."; 
    grid-area: izquierda_cm; 
  }
  .Frame_cambio_direccion {
    border:1px solid black;
    visibility:hidden;
    font-size:1.5vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
    grid-area: Frame_cambio_direccion;
  }
  
  .Frame_botones { grid-area: Frame_botones; }
  
  </style>
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> CAMBIOS DE DATOS MEDICOS</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  <input type="hidden" id="Txt_CodAterpg" name="Txt_CodAterpg" value=${codigo} >
     
  <div class="Frm_CM_cambios_datos_medicos">
  
  <div class="Motivo">
  <label id = 'Label3'>motivo de cambio</label>
  <select   name = "Cbo_cambio" id="Cbo_cambio" onchange = "Cbo_cambio_Click(this.selectedIndex);">
  <option value = "CAMBIO DE MEDICO">CAMBIO DE MEDICO</option>
  <option value = "CAMBIO DE DIA, HORA">CAMBIO DE DIA, HORA</option>
  <option value = "CAMBIO DE DIRECCION">CAMBIO DE DIRECCION</option> 
  <option value = "CAMBIO DE ESPECIALIDAD">CAMBIO DE ESPECIALIDAD</option> 
  <option value = "CAMBIO DE EDAD">CAMBIO DE EDAD</option> 
  </select>
  
  </div>
  <div class="Frame2">
  <label id="Label1">Paciente :</label><input disabled type="text" id="Txt_paciente" name = "Txt_paciente">  <label id="Label20">VIP :</label> <select  disabled  name = "Cbo_pac_VIP" id="Cbo_pac_VIP">
  <option value = "NO">NO</option>
  <option value = "VIP">VIP</option>
  <option value = "MINT">MINT</option> 
  </select>
  <label id="Lbl_sintomas">Sintomas :</label><input disabled style =" grid-column:2/5" type="text" id="Txt_sintomas" name = "Txt_sintomas">
  <label id="Lbl_dir">Dirección :</label><input disabled style ="grid-column:2/5" type="text" id="Txt_dir" name = "Txt_dir">
  <label id="Lbl_dis">Distrito :</label><input disabled style ="grid-column:2/5" type="text" id="Txt_dis" name = "Txt_dis">
  <label id="Label4">Dr. actual :</label><input disabled style ="grid-column:2/5" type="text" id="Txt_Dr_actual" name = "Txt_Dr_actual">
  <label style ="background-color:yellow; grid-column:2/5" id="Lbl_pac_clave"></label>

  </div>
  <div class="Frame_cambio_medico" id ="Frame_cambio_medico">
  <h6 style="grid-column:1/3;width:25vw;background-color:white;font-weight:bold;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px;">Tipo de programación</h6>

  <div class="izquierda_cm">
  <select   id="Cbo_tipo_prog" name = "Cbo_tipo_prog"> </select>
  </div>
    <div class="derecha_cm">
    <label id="Lbl_med">Medico :</label><select style="grid-column:2/5"  id="Txt_Dr" name = "Txt_Dr"> </select>
    <label id="Lbl_fecha">Fecha :</label><input style="width:7vw" type='date'  id="DTPicker1" name = "DTPicker1"> 
    <label id="Lbl_hora">Hora :</label><input style="width:7vw" type='time'  id="CmbHora" name = "CmbHora"> 
    </div>
  </div>
  <div class="Frame_cambio_esp" id ="Frame_cambio_esp">
  <label id="Label6">Edad :</label><input  type="text" id="Txt_edad_cm_datos_medicos" name = "Txt_edad_cm_datos_medicos">  
  <label id="Label5">Programacion :</label><input  disabled  type="text" id="Txt_tipo_prog_cm_datos_medicos" name = "Txt_tipo_prog_cm_datos_medicos" >
  <label id="Label8">Medico asig:</label><input  disabled  type="text" id="Txt_dr_asig" name = "Txt_dr_asig">  <label id="Lbl_fec_asig">Fecha:</label><input disabled   type="date" id="Txt_fecha" name = "Txt_fecha"><label id="Lbl_hor_asig">Hora:</label><input  disabled  type="time" id="Txt_hora" name = "Txt_hora">

  <label id="Lbl_especialidad">Especialidad :</label><select   id="Txt_especialidad_cm_datos_medicos" name = "Txt_especialidad_cm_datos_medicos"></select>
  

  </div>
  <div class="Frame_cambio_direccion" id="Frame_cambio_direccion">
  <label id="Label2">Ubigeo :</label><input  style ="margin-left:2px ;grid-column:2/5" type="text" id="Txt_distrito" name = "Txt_distrito"><div></div>
  <label id="Label13">Dirección :</label><input  style ="margin-left:2px ;grid-column:2/5" type="text" id="Txt_direccion" name = "Txt_direccion"><div></div>
  <label id="Label10">Nro / Lote Mz:</label><input  style ="margin-left:2px ; " type="text" id="Txt_nro_lote" name = "Txt_nro_lote">  <label id="Label12">Dpto:</label><input  style ="margin-left:2px ; " type="text" id="Txt_dpto_dir" name = "Txt_dpto_dir"><div></div>
  <label id="Label11">Urbaniz. :</label><input  style ="margin-left:2px ;grid-column:2/5" type="text" id="Txt_Urbanizacion" name = "Txt_Urbanizacion"><div></div>
  <label id="Lbl_ref">Referencia :</label><input  style ="margin-left:2px ;grid-column:2/5" type="text" id="Txt_referencia" name = "Txt_referencia"><div></div>
  <label id="Label9">Telf. casa :</label><input  style ="margin-left:2px ;" type="text" id="Txt_tlf_fijo" name = "Txt_tlf_fijo"><div></div><div></div><div></div>
  <label id="Label23">Telf. oficina :</label><input  style ="margin-left:2px ;" type="text" id="Txt_tlf_oficina" name = "Txt_tlf_oficina">  <label id="Label35">Anx </label><input  style ="margin-left:2px ;" type="text" id="Txt_tlf_oficina_anx" name = "Txt_tlf_oficina_anx">
  <input   type="button" class="btn btn btn-success btn-sm"  id="cmd_gestionar_direccion" name="cmd_gestionar_direccion" onClick="cmd_gestionar_direccion_Click();" value="Gestionar Direcciones"> 
  </div>
  <div class="Frame_botones">
  <input   type="button" class="btn btn btn-success btn-sm"  id="Cmd_guardar_cambio_datos_medicos" name="Cmd_guardar_cambio_datos_medicos" onClick="Cmd_guardar_cambio_datos_medicos_Click();" value="Guardar"> 
  <input   type="button" class="btn btn btn-success btn-sm"  id="Cmd_finalizar" name="Cmd_finalizar" onClick="Cmd_finalizar_Click();" value="Finalizar cambios"> 
  <input   type="button" class="btn btn btn-danger btn-sm cancelarmodal"  id="Cmd_salir" name="Cmd_salir" onClick="Cmd_salir_Click();" value="Salir"> 

  </div>
</div>
`;



}


async function CARGA_DIRECCION(pCodTit , pCodDir ){
    
    var rst_direccion=[];
    
    rst_direccion = await Abre_Detalle( "SELECT * FROM vw_datos_paciente_direccion WHERE cod_paciente = '" + pCodTit + "' AND cod_dir = '" + pCodDir + "' ORDER BY direccion ASC");
    
    
    document.getElementById('Txt_distrito').Tag = rst_direccion[0].cod_dis;
    document.getElementById('Txt_distrito').value = rst_direccion[0].departamento + " - " + rst_direccion[0].provincia + " - " + rst_direccion[0].distrito;
    document.getElementById('Txt_direccion').value = rst_direccion[0].direccion.trim();
    document.getElementById('Txt_nro_lote').value   = rst_direccion[0].nro_dir_lote.trim();
    document.getElementById('Txt_dpto_dir').value   = rst_direccion[0].dir_dpto_interior.trim();
    document.getElementById('Txt_Urbanizacion').value    =  rst_direccion[0].dir_urbanizacion.trim();
    document.getElementById('Txt_referencia').value   = rst_direccion[0].referencia.trim();
    
    
    document.getElementById('Txt_tlf_fijo').value  =  (rst_direccion[0].tlf_casa == null, "", rst_direccion[0].tlf_casa.trim());
    //Txt_tlf_movil.Text = IIf(IsNull(rst_direccion[0].tlf_celular), "", Trim(rst_direccion[0].tlf_celular));
    document.getElementById('Txt_tlf_oficina').value = (rst_direccion[0].tlf_oficina==null, "", rst_direccion[0].tlf_oficina.trim());
    document.getElementById('Txt_tlf_oficina_anx').value = (rst_direccion[0].tlf_oficina_anx==null, "", rst_direccion[0].tlf_oficina_anx)  ;
    
 
}




async function CARGA_DATOS_ESP(){
 var  lrs_aux =[];
 
    
    document.getElementById('Txt_paciente').value =  Adata_atencion[0].nom_pac.trim();
    document.getElementById('Txt_edad_cm_datos_medicos').value = Adata_atencion[0].edad_ate;
    document.getElementById('Txt_sintomas').value = Adata_atencion[0].sin_ate.trim();

    switch  (Adata_atencion[0].f_prog.trim()){
        case "Inm":
          document.getElementById('Txt_tipo_prog_cm_datos_medicos').value = "INMEDIATA";
            break;
        case "Prg":
            if ( Adata_atencion[0].f_soldoct == "S" ){
                if ( Adata_atencion[0].clasificacion_pac = 2 ){
                  document.getElementById('Txt_tipo_prog_cm_datos_medicos').value  = "PROGRAMADA MAXISALUD";
                }else{
                  document.getElementById('Txt_tipo_prog_cm_datos_medicos').value  = "PROGRAMADA (SOLICITÓ MÉDICO)";
                }
            }else{
              document.getElementById('Txt_tipo_prog_cm_datos_medicos').value  = "PROGRAMADA (NO SOLICITÓ MÉDICO)";
            }
            break;
        case "Rpg":
          document.getElementById('Txt_tipo_prog_cm_datos_medicos').value  = "REPROGRAMADA";
            break;
    }
    
    document.getElementById('Txt_dr_asig').value  =  ( Adata_atencion[0].nom_doc !=null? Adata_atencion[0].nom_doc.trim(): "");
    
     var optionsespecialidades = await Abre_Detalle( "SELECT distinct c.cod_esp, c.nom_esp     FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c     WHERE a.cod_doc = b.cod_doc     AND b.cod_esp = c.cod_esp AND a.activi = true     ORDER BY c.nom_esp ASC");
    document.getElementById('Txt_especialidad_cm_datos_medicos').innerHTML = optionsespecialidades.map(person => `<option value="${person.cod_esp}">${person.nom_esp}</option>`).join("\n");;
    lrs_aux = await Abre_Detalle( "SELECT cod_esp, nom_esp FROM m_especialidades WHERE cod_esp = '" + Adata_atencion[0].cod_esp +  "'");
    document.getElementById('Txt_especialidad_cm_datos_medicos').value    =  (  lrs_aux.length != 0 ?  lrs_aux[0].cod_esp: "");
    document.getElementById('Txt_especialidad_cm_datos_medicos').Tag   =  (lrs_aux.length !=0? lrs_aux[0].nom_esp.trim(): "");
     
    document.getElementById('Txt_fecha').value  =  Adata_atencion[0].fec_ate;
    document.getElementById('Txt_hora').value   = Adata_atencion[0].hor_ate.slice(0,5);
    
    document.getElementById('DTPicker1').value  = Adata_atencion[0].fec_ate;
    document.getElementById('CmbHora').value  = Adata_atencion[0].hor_ate.slice(0,5);
     

}



function CARGA_MEDICO(){
document.getElementById('Txt_Dr_actual').value =  (Adata_atencion[0].nom_doc !=null? Adata_atencion[0].nom_doc.trim(): "");
}





window.Cbo_cambio_Click = function(val){

 
//Cbo_tipo_prog.Clear
document.getElementById('Cbo_tipo_prog').value = '';


//Cbo_tipo_prog.Enabled = False
document.getElementById('Cbo_tipo_prog').disabled = true;
document.getElementById('Cmd_guardar_cambio_datos_medicos').disabled = true;
//Cmd_guardar.Enabled = False

switch (val){
     case 0:
 
        var opt = document.createElement('option');
        opt.value = "INMEDIATA";
        opt.innerHTML = "INMEDIATA";
        document.getElementById('Cbo_tipo_prog').appendChild(opt);
        opt = document.createElement('option');
        opt.value = "PROGRAMADA (SOLICITÓ MÉDICO)";
        opt.innerHTML = "PROGRAMADA (SOLICITÓ MÉDICO)";
        document.getElementById('Cbo_tipo_prog').appendChild(opt);
        opt = document.createElement('option');
        opt.value = "PROGRAMADA (NO SOLICITÓ MÉDICO)";
        opt.innerHTML = "PROGRAMADA (NO SOLICITÓ MÉDICO)";
        document.getElementById('Cbo_tipo_prog').appendChild(opt);
        
        
        document.getElementById('Cbo_tipo_prog').disabled = false;
       switch  (Adata_atencion[0].f_prog){
            case "Inm":
                    document.getElementById('Cbo_tipo_prog').selectedIndex = 0;
            case "Prg":
                if (Adata_atencion[0].f_soldoct == "S" ){
                  document.getElementById('Cbo_tipo_prog').selectedIndex = 1;
                  document.getElementById('Txt_Dr').value = Adata_atencion[0].cod_doc.trim();
                  document.getElementById('DTPicker1').value =  Adata_atencion[0].fec_ate;
                  document.getElementById('CmbHora').value =  Adata_atencion[0].hor_ate;
                 }else{
                  document.getElementById('Cbo_tipo_prog').selectedIndex = 2;
                  document.getElementById('DTPicker1').value =  Adata_atencion[0].fec_ate;
                  document.getElementById('CmbHora').value =  Adata_atencion[0].hor_ate;
                 }
        }
        
        if (Adata_atencion[0].clasificacion_pac == 2 ){
          var opt = document.createElement('option');
          opt.value = "PROGRAMADA MAXISALUD";
          opt.innerHTML = "PROGRAMADA MAXISALUD";
          document.getElementById('Cbo_tipo_prog').appendChild(opt);
          document.getElementById('Cbo_tipo_prog').selectedIndex = 3;
      }
        
      document.getElementById('Frame_cambio_medico').style.visibility = 'visible';
      document.getElementById('Frame_cambio_esp').style.visibility = 'hidden';
      document.getElementById('Frame_cambio_direccion').style.visibility = 'hidden';
      document.getElementById('Cbo_tipo_prog').disabled = false;   
        
      CARGA_MEDICO();
        
      document.getElementById('Cmd_guardar_cambio_datos_medicos').disabled = false;
       
        break;
    case 1:
        //cambio de dia hora
        
        var opt = document.createElement('option');
        opt.value = "PROGRAMADA (SOLICITÓ MÉDICO)";
        opt.innerHTML = "PROGRAMADA (SOLICITÓ MÉDICO)";
        document.getElementById('Cbo_tipo_prog').appendChild(opt);
        document.getElementById('Cbo_tipo_prog').selectedIndex = 0;

        document.getElementById('Frame_cambio_medico').style.visibility = 'visible';
        document.getElementById('Frame_cambio_esp').style.visibility = 'hidden';
        document.getElementById('Frame_cambio_direccion').style.visibility = 'hidden';
 
        document.getElementById('Cbo_tipo_prog').disabled = false;   
        document.getElementById('Cmd_guardar_cambio_datos_medicos').disabled = false;

         if (Adata_atencion[0].clasificacion_pac == 2 ){
      
            opt = document.createElement('option');
            opt.value = "PROGRAMADA MAXISALUD";
            opt.innerHTML = "PROGRAMADA MAXISALUD";
            document.getElementById('Cbo_tipo_prog').appendChild(opt);
            document.getElementById('Cbo_tipo_prog').selectedIndex = 2;
        }
        break;
    case 2:
        //cambio de direccion
        var opt = document.createElement('option');
        opt.value = "INMEDIATA";
        opt.innerHTML = "INMEDIATA";
        document.getElementById('Cbo_tipo_prog').appendChild(opt);
 
        opt = document.createElement('option');
        opt.value = "PROGRAMADA (SOLICITÓ MÉDICO)";
        opt.innerHTML = "PROGRAMADA (SOLICITÓ MÉDICO)";
        document.getElementById('Cbo_tipo_prog').appendChild(opt);
         
        opt = document.createElement('option');
        opt.value = "PROGRAMADA (NO SOLICITÓ MÉDICO)";
        opt.innerHTML = "PROGRAMADA (NO SOLICITÓ MÉDICO)";
        document.getElementById('Cbo_tipo_prog').appendChild(opt); 
        document.getElementById('Cbo_tipo_prog').disabled = false;   

        switch (Adata_atencion[0].f_prog ){
            case "Inm":
              document.getElementById('Cbo_tipo_prog').selectedIndex = 0;
                 break;
            case "Prg":
                if (Adata_atencion[0].f_soldoct = "S" ){
                  document.getElementById('Cbo_tipo_prog').selectedIndex = 1;
                    document.getElementById('Txt_Dr').value =  Adata_atencion[0].nom_doc.trim();
                  
                    document.getElementById('DTPicker1').Value = Adata_atencion[0].fec_ate;
                    document.getElementById('CmbHora').Value =   Adata_atencion[0].hor_ate;

                    
                }else{
                  document.getElementById('Cbo_tipo_prog').selectedIndex = 2;
                  document.getElementById('DTPicker1').Value  = Adata_atencion[0].fec_ate
                  document.getElementById('CmbHora').Value =   Adata_atencion[0].hor_ate;               
                 }
                break;

        }
                
                if (Adata_atencion[0].clasificacion_pac == 2 ){
                     opt = document.createElement('option');
                    opt.value = "PROGRAMADA MAXISALUD";
                    opt.innerHTML = "PROGRAMADA MAXISALUD";
                    document.getElementById('Cbo_tipo_prog').appendChild(opt); 
                    document.getElementById('Cbo_tipo_prog').selectedIndex = 3;
                 }
                
                document.getElementById('Frame_cambio_medico').style.visibility = 'visible'; 
                document.getElementById('Frame_cambio_direccion').style.visibility = 'visible'; 
                document.getElementById('Frame_cambio_esp').style.visibility = 'hidden'; 

                CARGA_DIRECCION(Adata_atencion[0].cod_tit.trim(), Str_Cod_dir);  
             break;
    case 3:
        //cambio de especialidad
       
        document.getElementById('Frame_cambio_esp').style.visibility = 'visible'; 
        document.getElementById('Txt_edad_cm_datos_medicos').readOnly  = true;
        //Txt_edad.BackColor = Me.BackColor
        document.getElementById('Frame_cambio_medico').style.visibility = 'hidden'; 
        document.getElementById('Frame_cambio_direccion').style.visibility = 'hidden'; 
 
        CARGA_DATOS_ESP();
        break;
    case 4:
        //cambio de edad 
  
        document.getElementById('Frame_cambio_esp').style.visibility = 'visible'; 
        document.getElementById('Txt_edad_cm_datos_medicos').readOnly  = false;
        //Txt_edad.BackColor = Me.BackColor
        document.getElementById('Frame_cambio_medico').style.visibility = 'hidden'; 
        document.getElementById('Frame_cambio_direccion').style.visibility = 'hidden'; 
        CARGA_DATOS_ESP();
        break;
}

}