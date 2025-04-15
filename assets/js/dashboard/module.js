 
export function min_a_horas(Mins){
    var  Horas;
    Horas = Math.trunc(Mins / 60);
    Mins = Mins - 60 * Horas;
    return     Horas.toString().padStart(2, '0') +  ":" + Mins;
     
}
 
function RedondeaDed (X) {
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
export function MODIFICA_FEC_MAX_LAB(L_CodAte, lv_fecha ){
    
    var FecAte ;
 
      fetch('/modulo/Abre_Detalle', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "SELECT fec_ate, cod_ate_previa, clasificacion_pac, cm_estado FROM t_tmpllamadas WHERE cod_ate = " + L_CodAte
           })
  
         }).then(response => response.json())
        .then(function (lrs_AteAnt ) {
          if(lrs_AteAnt.length>0) {
           
                    //If lrs_AteAnt!clasificacion_pac = 2 Then
                    //Actualiza sus laboratorios asociados

                    if (lrs_AteAnt[0].cm_estado == "8" ){
                        if (lv_fecha == 1 ){
                            FecAte = new Date(lrs_AteAnt[0].fec_ate.replace(/-/g, ',')).addDays(15) ;
                        }else{
                            FecAte =  new Date(lv_fecha.replace(/-/g, ',')).addDays(15);
                        }
                          fetch('/modulo/Execute/', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              query: "UPDATE t_cab_lab_serv_laboratorio SET fec_maxima = '" + FecAte  + "' WHERE estado not in ('C', '6', 'R6')  AND cod_ate = " + L_CodAte
                            })
                          }).then(response => response.json())
                          .then(function(data) {
                            var html = '';
                            var i;
                            if(data){
                              
                            } 
                            
                            
                          }).catch(error => {
                            console.log(error);    
                          });   
                     }else{
                        if (lv_fecha == 1 ){
                            FecAte = new Date(lrs_AteAnt[0].fec_ate.replace(/-/g, ',')).addDays(-2);
                        }else{
                            FecAte = new Date(lv_fecha.replace(/-/g, ',')).addDays(-2);   
                        }
                        
                        FecAte = new Date(lrs_AteAnt[0].fec_ate.replace(/-/g, ',')).addDays(-2)
                        if  ( lrs_AteAnt[0].cod_ate_previa != null ){
                                fetch('/modulo/Execute/', {
                                method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                  query: "UPDATE t_cab_lab_serv_laboratorio SET fecha_maxima = '"+ FecAte + "' WHERE estado not in ('C', '6', 'R6') AND cod_ate = "  + lrs_AteAnt[0].cod_ate_previa
                                })
                              }).then(response => response.json())
                              .then(function(data) {
                                var html = '';
                                var i;
                                if(data){
                                  
                                } 
                                
                                
                              }).catch(error => {
                                console.log(error);    
                              }); 
                        
                        }
                    }

          } 
        }).catch(error => {
          console.log(error);
        });
    
        
     

     
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'});
  }


  export async function REGISTRA_CM_AUDITORIA(ll_cod_ate  , ls_estado , ls_cambios , ls_obs ){
  await fetch('/modulo/REGISTRA_CM_AUDITORIA/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        { 
         ll_cod_ate :   ll_cod_ate,
         ls_estado : ls_estado,
         ls_cambios : ls_cambios,
         ls_obs :ls_obs

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
  
  export async function Execute(vquery){
    await fetch('/modulo/Execute/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {  
            query:vquery
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
 
    export async function getusuario(){
      var usuario;
      await fetch('/modulo/get_session/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
      }).then(response => response.json())
        .then(function (data) {
          usuario = data.trim() ;
        }).catch(error => {
          console.log(error);
        })
        return usuario;
      }
    export async function Executeupdate(ltabla){
      await fetch('/modulo/Executeupdate/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ltabla)
      }).then(response => response.json())
        .then(function (data) {
       
      }).catch(error => {
          console.log(error);
      }); 
    }
    export async function Executeinsert(ltabla){
        var insert = false;
        await fetch('/modulo/Executeinsert/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ltabla)
        }).then(response => response.json())
          .then(function (data) { 
             if(data){
               insert = true;
             }
        }).catch(error => {
            console.log(error);
        });
        return insert; 
    }
    export async function Executeinserttablet(ltabla){
      var insert = false;
      await fetch('/modulo/Executeinserttablet/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ltabla)
      }).then(response => response.json())
        .then(function (data) { 
           if(data){
             insert = true;
           }
      }).catch(error => {
          console.log(error);
      });
      return insert; 
  }
    export async function P_GUARDA_SEGUIMIENTO(ll_CodigoAte, tipo_serv , LS_OBSERVACION ,  cod_snc = null){

      await fetch('/modulo/Executeinsert/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_ate :  ll_CodigoAte,
          des_ser :  tipo_serv,
          obs_ser :  LS_OBSERVACION,
          cod_snc :  cod_snc
           })
      }).then(response => response.json())
        .then(function (data) { 

      }).catch(error => {
          console.log(error);
      }); 
  }


    async function P_Estado_asegurabilidad(pCodAtencion , pEstadoAte ){

    var estado_aseg ;
    
    switch (pEstadoAte) {
        
        case "0":
            estado_aseg = 1;
        break;
        case "2":
        case "R2":
            estado_aseg = 2;
        break;
        case "3": 
        case "R3":
        case "4":
        case"R4":
        case "5":
        case "R5":
        case "6":
        case "R6":
        case "7":
        case "R7":
            estado_aseg = 3;
        break;
        case "8":
            estado_aseg = 9;
        break;
        case "C":
            estado_aseg = -1;
        break;    
        case "VNR":
            estado_aseg = -2;
         break;   
    }
    
    Execute ("UPDATE h_asegurabilidad_registro SET id_estado = " + estado_aseg + " WHERE id_serv_aseg in (select id_serv_aseg from i_atencion_asegurabilidad where cod_ate = " + pCodAtencion + ")");
    
  }
export async function PblSub_REINGRESAR_ATENCION_TABLET(pCODATE  ){

      
    await fetch('/modulo/Executetablet/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "EXEC ELIMINAR_ATENCION " + pCODATE
  
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
        query: "Update t_tmpllamadas set flg_registrar_ate_tablet = true, fecha_reingreso = current_date WHERE cod_ate = " + pCODATE
  
      })
    }).then(response => response.json())
      .then(function (data) {
        
      }).catch(error => {
        console.log(error);
      });
}
export async function EJECUTAR_SENTENCIA_BD_TABLET(CODATE , ssql ){

  fetch('/modulo/Executetablet/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: ssql

  })
}).then(response => response.json())
  .then(function (data) {
    
  }).catch(error => {
      ESCRIBIR_LOG(CODATE, "[" + Format(Now, "dd-mm-yyyy HH:mm:ss") + "] Error " +  error + '\n' + '     ' + ssql);

  });
 
}

function ESCRIBIR_LOG(CODATE , DESCP_LOG ){
/* 'On Error GoTo errSub
'Dim n_File As Integer
'Dim Sdirectorio As String

'Sdirectorio = "W:\Operaciones\Archivos\Log\"
'Call VERIFICAR_DIR(Sdirectorio)

'n_File = FreeFile
'Open Sdirectorio & CODATE & ".txt" For Append As n_File
'Print #n_File, DESCP_LOG
'Close n_File

'errSub:*/
}
  var xVNR ;
  var xPNE ;
  var xPI ;
  var xX ;
  var xC ;
  var xPNC ;
  var xPRP ;
  var xNI ;
  var xS ;
  var xHos ;
  var b_cancelado ;
export var Adata_atencionmensajebox=[];
export async function P_VNRyCANCELAR_CM(Formulario  , ll_CodAte  , lb_soporte  ){
  
printModal(Frm_mensajebox(ll_CodAte));
if (lb_soporte == true) {
  
     document.getElementById('Txt_CodAteFrm_mensajebox').Tag = "SOPORTE";
     document.getElementById('ed-modal-contentheader').innerHTML = "¿Desea cambiar servicio a VNR O PNE?";

}
document.getElementById('Txt_CodAteFrm_mensajebox').Tag = "" ;
document.getElementById('Txt_CodAteFrm_mensajebox').value= ll_CodAte;
 
    await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "Select * FROM t_tmpllamadas where cod_ate = " +ll_CodAte

      })
    }).then(response => response.json())
      .then(function (Adata_atencion) {
        if(Adata_atencion.length>0){
          Adata_atencionmensajebox = Adata_atencion;
       
        }

      }).catch(error => {
        console.log(error);
      });
 
  if (document.getElementById('Txt_CodAteFrm_mensajebox').Tag == "" ){
   switch (Adata_atencionmensajebox[0].clasificacion_pac){
      case 1:
      case 2:
      case 200:
      case 201:
      case 202:
      case 203:
           fetch('/modulo/Abre_Detalle/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "Select * FROM t_cm_motivo WHERE activo = true AND cod_motivo in  (11,12,13,30,31,32,33,34,35) ORDER BY cod_motivo ASC"

            })
          }).then(response => response.json())
            .then(function (Adata_motivo) {
              var options ='';
              if(Adata_motivo.length>0){
                options = '<option value=""></option>' +  Adata_motivo.map(person => `<option value="${person.cod_motivo}">${person.des_motivo}</option>`).join("\n");
              
              } 
              document.getElementById('DCbo_motivo').innerHTML = options;

            }).catch(error => {
              console.log(error);
            });
     break;
  default:
      //AGUDO
      fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "Select * FROM t_cm_motivo WHERE cod_motivo not in (11,12,13,30,31,32,33,34,35) and activo = true ORDER BY cod_motivo ASC"

        })
      }).then(response => response.json())
        .then(function (Adata_motivo) {
      
          var options ='';
          if(Adata_motivo.length>0){
            options =  '<option value=""></option>' + Adata_motivo.map(person => `<option value="${person.cod_motivo}">${person.des_motivo}</option>`).join("\n");
          
          } 
          document.getElementById('DCbo_motivo').innerHTML = options;
  
        }).catch(error => {
          console.log(error);
        });
        break;
      }
  
  }else{
              //POR SOPORTE
              if (Adata_atencionmensajebox[0].clasificacion_pac == 1 || Adata_atencionmensajebox[0].clasificacion_pac == 2 ){
                  //CRONICO Y CCS
                  
                  fetch('/modulo/Abre_Detalle/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "Select * FROM t_cm_motivo WHERE cod_motivo = 11 and activo = true "

                    })
                  }).then(response => response.json())
                    .then(function (Adata_motivo) {
                  
                      var options ='';
                      if(Adata_motivo.length>0){
                        options =  '<option value=""></option>' + Adata_motivo.map(person => `<option value="${person.cod_motivo}">${person.des_motivo}</option>`).join("\n");
                      
                      } 
                      document.getElementById('DCbo_motivo').innerHTML = options;
              
                    }).catch(error => {
                      console.log(error);
                    });
              }else{
                  //AGUDO Y ESPECIALISTA
                  fetch('/modulo/Abre_Detalle/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "Select * FROM t_cm_motivo WHERE cod_motivo = 10 and activo = true "

                    })
                  }).then(response => response.json())
                    .then(function (Adata_motivo) {
                  
                      var options ='';
                      if(Adata_motivo.length>0){
                        options =  '<option value=""></option>' + Adata_motivo.map(person => `<option value="${person.cod_motivo}">${person.des_motivo}</option>`).join("\n");
                      
                      } 
                      document.getElementById('DCbo_motivo').innerHTML = options;
              
                    }).catch(error => {
                      console.log(error);
                    });
              }



  
  }
  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT nom_per, des_per FROM m_perfiles WHERE activo_asignacion_vnr = true"

    })
  }).then(response => response.json())
    .then(function (Adata_perfil) {
  
      var options ='';
      if(Adata_perfil.length>0){
        options =   '<option value=""></option>'+ Adata_perfil.map(person => `<option value="${person.nom_per}">${person.des_per}</option>`).join("\n");
      
      } 
      document.getElementById('DC_Area').innerHTML = options;

    }).catch(error => {
      console.log(error);
    });

   document.getElementById('DC_Area').addEventListener("change",
    function(){ 
      var aux_sql =''; 
      var aux_sql = "(SELECT nom_usu, des_usu FROM m_usuarios WHERE activo = true and nom_per = '" + this.value + "'"
      if ( this.value.trim() == "*CHF" ){
          aux_sql = aux_sql + " UNION SELECT cod_mot as nom_usu, nom_mot as des_usu FROM m_motorizados WHERE activi = true AND flag_mot in ('C') ";
      }else if ( this.value.trim() == "*DOC" ){
          aux_sql = aux_sql + " UNION SELECT cod_doc as nom_usu, nom_doc as des_usu FROM m_doctores WHERE activi = true";
      }
      fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query:  aux_sql + ") order by 2 asc" 
        })
      }).then(response => response.json())
        .then(function (Adata_resp) {
      
          var options ='';
          if(Adata_resp.length>0){
            options =   '<option value="" ></option>'+ Adata_resp.map(person => `<option value="${person.nom_usu}">${person.des_usu}</option>`).join("\n");
          
          } 
          document.getElementById('DC_Resp').innerHTML = options;
    
        }).catch(error => {
          console.log(error);
        });
    }, false)
    document.getElementById('DCbo_motivo').addEventListener("change",
    function(){ 
      switch  (parseInt(this.value)){
        case 999:
            document.getElementById('Txt_motivo_otro').value = ""; 
            document.getElementById('Txt_motivo_otro').style.display = 'block';
            document.getElementById('Frm_opt_resp').style.display = 'none';
            document.getElementById('Frm_resp').style.display = 'none';
            
             break;
        case 10:
            //VNR
   
            document.getElementById('Txt_motivo_otro').value = ""; 
            document.getElementById('Txt_motivo_otro').style.display = 'block';
            document.getElementById('Frm_opt_resp').style.display = 'block';
            document.getElementById('Frm_resp').style.display = 'block';
            document.getElementById('Option1').checked = true;
            break;
        case 11:
        case 12:
        case 13:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
          document.getElementById('Txt_motivo_otro').value = ""; 
          document.getElementById('Txt_motivo_otro').style.display = 'block';
          document.getElementById('Frm_opt_resp').style.display = 'none';
          document.getElementById('Frm_resp').style.display = 'none';
          break;
            
       default: 

            document.getElementById('Txt_motivo_otro').style.display = 'none';
            document.getElementById('Frm_opt_resp').style.display = 'none';
            document.getElementById('Frm_resp').style.display = 'none';
            break;
       }
    }, false)
  xVNR = false  ;
  xPNE = false;
  xPI = false;
  xX = false;
  xC = false;
  xPNC = false;
  xPRP = false;
  xNI = false;
  xS = false;
  xHos = false;
  
  //Frm_botones.Top = 2400
  b_cancelado = false;
  await async function(){ return new Promise(resolve =>  document.getElementById('Cmd_aceptar').onclick = () => resolve(cmd_aceptar_Click()))}();
 
 
if(b_cancelado == true ){
    //Crea  mensaje le aparezca a asignador
    GUARDA_CANCELADA(ll_CodAte, "C");
    alert("Se canceló la consulta médica")
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}
 
if(xVNR == true ){
    GUARDA_CANCELADA(ll_CodAte, "VNR");
    alert("Se pasó la consulta médica a VNR");
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}

if(xPNE == true ){
    GUARDA_CANCELADA(ll_CodAte, "PNE");
    alert("Se pasó la consulta médica a PNE");
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}

if(xPI == true ){
    GUARDA_CANCELADA(ll_CodAte, "PI");
    alert("Se pasó la consulta médica a PI"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}

if(xX == true ){
    GUARDA_CANCELADA(ll_CodAte, "X");
    alert("Se pasó la consulta médica a X"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}


if(xC == true ){
    GUARDA_CANCELADA(ll_CodAte, "C");
    alert("Se pasó la consulta médica a Anulada"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}


if(xPNC == true ){
    GUARDA_CANCELADA(ll_CodAte, "PNC");
    alert("Se pasó la consulta médica Paciente No Contactado"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}

if(xPRP == true ){
    GUARDA_CANCELADA(ll_CodAte, "PRP");
    alert("Se pasó la consulta médica Paciente Retirado del Programa"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}

if(xNI == true ){
    GUARDA_CANCELADA(ll_CodAte, "NI");
    alert("Se registró la consulta médica, paciente no ingresa al programa"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}

if(xS == true ){
    GUARDA_CANCELADA(ll_CodAte, "S");
    alert("Se registró la consulta de paciente Suspendido"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}

if(xHos == true ){
    GUARDA_CANCELADA(ll_CodAte, "HOS");
    alert("Se registró la consulta de paciente hospitalizado"); 
    appMainWindow.document.getElementById('CmdFiltrar').click();
    if (Formulario != "Frm_CM_Grid" ){
       //window.close();
    }
}
 
    
    
}
 


 function  Frm_mensajebox(codigo) {

  return `  
  <style>
  .Frm_mensajebox {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
  }
  
  
  </style>
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> SOPORTE</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
    
    
  <div class="Frm_mensajebox">
  <label id="Label2">¿Desea cancelar el servicio actual?</label>
  <label id="Label2">Motivo de cambio :</label>
  <select   name = "DCbo_motivo" id="DCbo_motivo"> 
  </select>
  <input style="display:none" type="text" id="Txt_motivo_otro" name = "Txt_motivo_otro"   > 
  <div   id = "Frm_opt_resp" class="Frm_opt_resp" style="border: 1px solid black;display:none">
  <h6 style="width:25vw;color:black;background-color:white;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Responsable que asume la VNR</h6>
  <input type = "radio"  name ="Option"  id ="Option1"  ><label for ="Option1">Cliente (Aseguradora)</label>
  <input type = "radio"  name ="Option"  id ="Option2"  ><label for ="Option2">Personal Dr+</label>
  </div>
  <hr>
  <div  id="Frm_resp" class="Frm_resp" style="border: 1px solid black;display:none">
  <h6 style="width:25vw;color:black;background-color:white;   margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Responsable</h6>
  <label id="Label3">Area :</label>
  <select  style="width:20vw;"  name = "DC_Area" id="DC_Area"> 
  </select>  <br>
  <label id="Label4">Resp. :</label>
  <select  style="width:20vw;" name = "DC_Resp" id="DC_Resp"> 
  </select>
  </div>
  <div>
  <input type="button"  class="btn btn btn-success btn-sm" onclick="cmd_aceptar_Click();" id="Cmd_aceptar" name="Cmd_aceptar" value="Aceptar" >
  <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal" onclick="" id="Cmd_Cancelar" name="Cmd_Cancelar"  value="Cancelar" >
  </div>
   <input   type="hidden" id="Txt_CodAteFrm_mensajebox" name="Txt_CodAteFrm_mensajebox" value="${codigo}" >

  </div>`;
 
 }


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




async function cmd_aceptar_Click(){

var rst_aux;
var rst_abono ;
var xcodabono ;
var xcod_doc;
var xnom_doc ;
var rst_ServAso;
var rst_seguimiento ;
var CodAtencion;
var ls_sql_update ;
var cuerpo_mail ;
var mail_para ;
var continuar_anulacion  ;

xcod_doc = "";
xnom_doc = "";
ls_sql_update = "";
mail_para = "";
continuar_anulacion = true;
//validacion
 if (document.getElementById('DCbo_motivo').value == "" ){
    alert("Seleccione el motivo de la cancelacion de la consulta médica");
    document.getElementById('DCbo_motivo').focus();
 
    return;
}else{
    if (document.getElementById('DCbo_motivo').value == 999 &&  document.getElementById('Txt_motivo_otro').value == "") {
        alert("Digite el motivo de cancelacion");
        document.getElementById('Txt_motivo_otro').focus();   
        return ;
    
     }else if ( document.getElementById('DCbo_motivo').value == 10 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Digite el motivo de la VNR");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
    
     }else if ( document.getElementById('DCbo_motivo').value == 11 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Digite el motivo de PNE");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
    
      }else if ( document.getElementById('DCbo_motivo').value == 12 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Digite el motivo de PI");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
    
      }else if ( document.getElementById('DCbo_motivo').value == 13 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Describa el motivo por el cual paciente no acepta atención");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
    
      }else if ( document.getElementById('DCbo_motivo').value == 30 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Describa el motivo por el cual se cancela la atención");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
        
      }else if ( document.getElementById('DCbo_motivo').value == 31 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Describa el motivo por no se contacto con el paciente");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
        
      }else if ( document.getElementById('DCbo_motivo').value == 32 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Describa el motivo por el cual se retira al paciente del programa");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
        
      }else if ( document.getElementById('DCbo_motivo').value == 33 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Describa el motivo por el cual el paciente no ingresa al programa");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
        
      }else if ( document.getElementById('DCbo_motivo').value == 34 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Describa el motivo por el cual el paciente tiene poliza suspendida");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
        
      }else if ( document.getElementById('DCbo_motivo').value == 35 && document.getElementById('Txt_motivo_otro').value == "" ){
        alert( "Describa el motivo por el cual el paciente fue hospitalizado");
        document.getElementById('Txt_motivo_otro').focus();  
        return;
     }
}

if (document.getElementById('DCbo_motivo').value == 10 && document.getElementById('Option2').checked == true){
    //VNR - VISITA NO REALIZADA
    if ( document.getElementById('DC_Resp').value == "" && document.getElementById('Option2').checked == True ){
        alert("Seleccionar el personal responsable a quien asignar la VNR");
        return;
    }
}

//VERIFICA SERVICIOS

 
await fetch('/modulo/Abre_Detalle/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {
      query: "Select * from t_tmpexp where codate_exp = " + document.getElementById('Txt_CodAteFrm_mensajebox').value + " AND estado_exp in ('D', 'E', 'P') Order by estado_exp DESC"
    }
  )
}).then(response => response.json())
  .then(function (rst_ServAso) {
      if (rst_ServAso.length >0){
        alert( "No se puede realizar el cambio porque el expediente esta liquidado o facturado");
      }

  }).catch(error => {
    console.log(error);
  });

if (document.getElementById('DCbo_motivo').value == 10 ){ //"VNR - VISITA NO REALIZADA"
     await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          query: "Select * from t_tmppedidomed where cod_ate = " +  document.getElementById('Txt_CodAteFrm_mensajebox').value  + " AND canc_ped is null"
        }
      )
    }).then(response => response.json())
      .then(function (rst_ServAso) {
          if (rst_ServAso.length >0){
            alert( "No se puede realizar el cambio porque tiene un pedido de medicamentos asociado");
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
      body: JSON.stringify(
        {
          query: "Select * from t_tmplaboratorios where cod_ate = "  +  document.getElementById('Txt_CodAteFrm_mensajebox').value + " AND canc_ana is null"
        }
      )
    }).then(response => response.json())
      .then(function (rst_ServAso) {
          if (rst_ServAso.length >0){
            alert( "No se puede realizar el cambio porque tiene una orden de laboratorio asociada");
          }
    
      }).catch(error => {
        console.log(error);
      });
   
}

if  (document.getElementById('DCbo_motivo').value == 10 && document.getElementById('Option2').checked  == true ){
    //"VNR - VISITA NO REALIZADA"
    
    await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          query: "SELECT * FROM t_cargar_personal WHERE cod_ate =" + document.getElementById('Txt_CodAteFrm_mensajebox').value  
        }
      )
    }).then(response => response.json())
      .then(function (rst_abono) {
          if (rst_abono.length == 0){
              RESPONSABLE_VNR();
          }
    
      }).catch(error => {
        console.log(error);
      });
}
  var salida = false;
  var rst_aux ={};
  var usuario =await getusuario();
    switch (document.getElementById('DCbo_motivo').value){
    
    case 10: //"VNR - VISITA NO REALIZADA"
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, Adata_atencionmensajebox[0].cm_estado  + "->V", document.getElementById('Txt_motivo_otro').value, "VISITA NO REALIZADA");
        
        if (document.getElementById('Option1').checked == true ){
            ls_sql_update = "cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "//RESP. DE VNR : ASEGURADORA' ";
        }else{
            ls_sql_update = "cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "//RESP. DE VNR : PERSONAL DR+' ";
        }
        
        ls_sql_update = ls_sql_update + ",estado = '5', cm_estado = 'V', cod_estado = 10, flg_registrar_ate_tablet = false, cm_orden = 99, fecdia_ate = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'})  + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " + Adata_atencionmensajebox[0].tar_ate + ",tar_ate = 0,flgvnr = True,obs_cm = '" +  ("VNR//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm).slice(0, 40) + "',OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm).slice(0,40) + "',flg_ficha = '1',cod_hia = 'Z51.9' "
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate =  " + Adata_atencionmensajebox[0].cod_ate );
        
 
        Execute ("DELETE FROM m_hiaclinica WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate)
         
        rst_aux.cod_ate = Adata_atencionmensajebox[0].cod_ate;
        rst_aux.cod_tit = Adata_atencionmensajebox[0].cod_tit;
        rst_aux.cod_dep = Adata_atencionmensajebox[0].cod_dep;
        rst_aux.cod_dia = "Z51.9";
        rst_aux.cod_doc = Adata_atencionmensajebox[0].cod_doc;
        rst_aux.fec_ate = Adata_atencionmensajebox[0].fec_ate;
        rst_aux.flag_diaprinc = true;
        rst_aux.usu_hiacli = usuario;
        rst_aux.hora_hiacli =  new Date().toTimeString().slice (0,8);
        rst_aux.tabla = 'm_hiaclinica'; 
        Executeinsert(rst_aux); 
        xVNR = true;
        
        if (Adata_atencionmensajebox[0].flg_aseg_reg == true) {
            P_Estado_asegurabilidad(Adata_atencionmensajebox[0].cod_ate, "V");
        }
        break;
    case 11 :   //PNE
    
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado & "->P", document.getElementById('Txt_motivo_otro').value, "PACIENTE NO ENCONTRADO");
        
        ls_sql_update = "cm_estado = 'P', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("PNE//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm).slice(0, 40) + "',estado = '5', cm_orden = 99, FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "', HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "', monto_evalvnr = " + Adata_atencionmensajebox[0].tar_ate + ",tar_ate = 0, flgvnr = True, OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm).slice(0,40) + "', cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "', flg_ficha = '1', cod_hia = 'Z51.9' ";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " +  Adata_atencionmensajebox[0].cod_ate)
              
        rst_aux.cod_ate = Adata_atencionmensajebox[0].cod_ate;
        rst_aux.cod_tit = Adata_atencionmensajebox[0].cod_tit;
        rst_aux.cod_dep = Adata_atencionmensajebox[0].cod_dep;
        rst_aux.cod_dia = "Z51.9";
        rst_aux.cod_doc = Adata_atencionmensajebox[0].cod_doc;
        rst_aux.fec_ate = Adata_atencionmensajebox[0].fec_ate;
        rst_aux.flag_diaprinc = true;
        rst_aux.usu_hiacli = usuario;
        rst_aux.hora_hiacli =  new Date().toTimeString().slice (0,8);
        rst_aux.tabla = 'm_hiaclinica'; 
        Executeinsert(rst_aux); 
        xPNE = true;
        //P_ENVIAR_CORREO_CRONICO("PNE", Adata_atencionmensajebox[0].cod_ate); pendienteagregar
         
        if (Adata_atencionmensajebox[0].flg_aseg_reg == true) {
          P_Estado_asegurabilidad(Adata_atencionmensajebox[0].cod_ate, "V");
        }
        break;
    case 12: //PI - POLIZA INACTIVA

        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, Adata_atencionmensajebox[0].cm_estado + "->I", document.getElementById('Txt_motivo_otro').value, "POLIZA INACTIVA");
        ls_sql_update = "cm_estado = 'I', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("PI//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm).slice(0, 40) + "',Estado = '4',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate)
        xPI = true;
        break;
    case 13: //X - PACIENTE NO ACEPTA ATENCION
        
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado + "->X", document.getElementById('Txt_motivo_otro').value, "X - PACIENTE NO ACEPTA ATENCION");
        ls_sql_update = "cm_estado = 'X', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("X//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',Estado = '5',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        //Debug.Print "UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
        P_GUARDA_SEGUIMIENTO(Adata_atencionmensajebox[0].cod_ate, "ATE", "X - PACIENTE NO ACEPTA ATENCION: " + document.getElementById('Txt_motivo_otro').value);
        xX = true;
        break;
    case 30: //C - CANCELACION DEL SERVICIO
        
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado + "->C", document.getElementById('Txt_motivo_otro').value, "C - CANCELACION DEL SERVICIO");
        ls_sql_update = "cm_estado = 'C', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("X//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',Estado = '5',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
        P_GUARDA_SEGUIMIENTO(Adata_atencionmensajebox[0].cod_ate, "ATE", "C - CANCELACION DEL SERVICIO :" + document.getElementById('Txt_motivo_otro').value);
        xC = true;
        
        if (!flg_aseg_reg == true ){
          P_Estado_asegurabilidad(Adata_atencionmensajebox[0].cod_ate, "C");
         }
         break;
    case 31: //PNC - PACIENTE NO CONTACTADO
        
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado + "->NC", document.getElementById('Txt_motivo_otro').value, "PNC - PACIENTE NO CONTACTADO");
        ls_sql_update = "cm_estado = 'NC', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("X//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',Estado = '5',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
        P_GUARDA_SEGUIMIENTO(Adata_atencionmensajebox[0].cod_ate, "ATE", "PNC - PACIENTE NO CONTACTADO :" + document.getElementById('Txt_motivo_otro').value)
        xPNC = true;
        break;
       
    case 32: //PRP - PACIENTE RETIRADO DEL PROGRAMA
        
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado + "->RP", document.getElementById('Txt_motivo_otro').value, "PRP - PACIENTE RETIRADO DEL PROGRAMA");
        ls_sql_update = "cm_estado = 'RP', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("X//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',Estado = '5',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
        P_GUARDA_SEGUIMIENTO(Adata_atencionmensajebox[0].cod_ate, "ATE", "PRP - PACIENTE RETIRADO DEL PROGRAMA :" + document.getElementById('Txt_motivo_otro').value)
        xPRP = true;
        break;
    case 33: //NI - NO INGRESA AL PROGRAMA
        
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado + "->NI", document.getElementById('Txt_motivo_otro').value, "NI - NO INGRESA AL PROGRAMA");
        ls_sql_update = "cm_estado = 'NI', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("X//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',Estado = '5',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
        P_GUARDA_SEGUIMIENTO(Adata_atencionmensajebox[0].cod_ate, "ATE", "NI - NO INGRESA AL PROGRAMA :" + document.getElementById('Txt_motivo_otro').value)
        xNI = true;
        break;
    case 34: //S - POLIZA SUSPENDIDA
        
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado + "->S", document.getElementById('Txt_motivo_otro').value, "S - POLIZA SUSPENDIDA");
        ls_sql_update = "cm_estado = 'S', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("X//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',Estado = '5',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
        P_GUARDA_SEGUIMIENTO(Adata_atencionmensajebox[0].cod_ate, "ATE", "S - POLIZA SUSPENDIDA :" + document.getElementById('Txt_motivo_otro').value);
        xS = true;
        break;
    case 35: //H - PACIENTE HOSPITALIZADO"

        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, !cm_estado + "->H", document.getElementById('Txt_motivo_otro').value, "H - PACIENTE HOSPITALIZADO");
        ls_sql_update = "cm_estado = 'HOS', cod_estado = 10, flg_registrar_ate_tablet = false, obs_cm = '" + ("X//Atte." + Adata_atencionmensajebox[0].cod_ate + "//" + Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',Estado = '5',cm_orden = 99,FECDIA_ATE = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "',HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "',USUDIA_ATE = '" + usuario + "',monto_evalvnr = " +  Adata_atencionmensajebox[0].tar_ate + ",OBS_ATE = '" + (Adata_atencionmensajebox[0].obs_cm, 1, 40) + "',cm_motivo_cancelacion = '" + document.getElementById('Txt_motivo_otro').value + "'";
        Execute ("UPDATE t_tmpllamadas SET " + ls_sql_update + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
        P_GUARDA_SEGUIMIENTO(Adata_atencionmensajebox[0].cod_ate, "ATE", "H - PACIENTE HOSPITALIZADO :" + document.getElementById('Txt_motivo_otro').value);
        xHos = true;

      break;
    default:
        if (Adata_atencionmensajebox.for_ate == "T" ){
        
           switch  (Adata_atencionmensajebox[0].cm_estado){
            
                case "3":
                case "R3":
                case "4":
                case "R4":
                case "5":
                case "R5":
                case "6":
                case "R6":
                case "7":
                case "R7":
                case "8":
                     await fetch('/modulo/Abre_Detalle', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        query:"select trim(obs_ser) observacion from m_segatenciones where cod_ate = " + Adata_atencionmensajebox[0].cod_ate + " and cod_snc = '117'"
                         })
                
                       }).then(response => response.json())
                      .then(function (rst_seguimiento ) {
                        if(rst_seguimiento.length>0) { 
                            cuerpo_mail = "Datos de Transacción: "  + '\n'
                                        + "Pac: " + Trim(Adata_atencionmensajebox[0].nom_pac) + '\n' 
                                        + "No. Tarjeta: " + Trim(Adata_atencionmensajebox[0].tarj_mc) + '\n' 
                                        + "Tipo tarjeta: " + Adata_atencionmensajebox[0].codtar_ate + '\n'
                                        + "FV: " + (Adata_atencionmensajebox[0].fvenc_ate) + '\n'
                                        + "Codigo AP: " + rst_seguimiento[0].observacion + '\n' 
                                        + "Importe: " + "S/" + Format( Adata_atencionmensajebox[0].tar_ate, "#####.00")
                          //revisarpendiente
                          /*   Call Abre_Recordset(rst_seguimiento, "select valor_parm from m_parametros_bd WHERE id_parm = 10")
                            mail_para = rst_seguimiento!valor_parm
                            
                            Call ENVIAR_MAIL("drmas.helpdesk@sanna.pe", "Abc123xyz", "ANULACIÓN DE ATENCION " + Txt_CodAte.Text, mail_para, "Se anuló la atención " + Txt_CodAte.Text + "," + Chr(13) + Chr(13) + cuerpo_mail + Chr(13) + Chr(13) + "Por favor anular transacción")
                        */
                        }else{
                            alert ("No puede anular la atención, falta registrar el codigo AP, debe registrar en Seguimiento opcion : PAGO TARJETA");
                            
                            salida=true;
                        }
         
                      }).catch(error => {
                        console.log(error);
                      });
              if (salida) return;
            }
        }
        
        REGISTRA_CM_AUDITORIA(Adata_atencionmensajebox[0].cod_ate, Adata_atencionmensajebox[0].cm_estado + "->C", (document.getElementById('Txt_motivo_otro').style.display=='block'?document.getElementById('Txt_motivo_otro').value:document.getElementById('DCbo_motivo').value), "CANCELACION DE ATENCION");
        b_cancelado = true;
        Execute ("UPDATE t_tmpllamadas SET canc_ate = 'C', estado = '5', cm_Estado = 'C', cod_estado = 10, flg_registrar_ate_tablet = false, cm_orden = 99, fecdia_ate = '" +  new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "', HORDIA_ATE = '" + new Date().toTimeString().slice (0,8) + "', USUDIA_ATE = '" + usuario + "', cm_motivo_cancelacion = '" + (document.getElementById('Txt_motivo_otro').style.display == 'block', document.getElementById('Txt_motivo_otro').value, document.getElementById('DCbo_motivo').value) + "'  WHERE cod_Ate = " + Adata_atencionmensajebox[0].cod_ate)
    
    }
    
    //ACTUALIZA LA ATENCION EN LA BD_SANNA_AMBULATORIA DE LA TABLET
    await EJECUTAR_SENTENCIA_BD_TABLET(Adata_atencionmensajebox[0].cod_ate, "UPDATE atencion SET cod_estado = 10, finalizado_sm = 1 WHERE cod_atencion = " + Adata_atencionmensajebox[0].cod_ate);
        
 
 
    switch (document.getElementById('DCbo_motivo').value){
        case 11:
        case 12: 
        case 13:
        case 30:
        case 31:
        case 35:
        break;
        default:
            await REGISTRA_T_LLAMADAS(Adata_atencionmensajebox[0].cod_ate, "ATE");
            await  REGISTRA_EXP(Adata_atencionmensajebox[0].cod_ate);
            break;
    }
 
//REGISTRA LAS NUEVAS ATENCIONES PARA EL DIA SIG DE PNE, X, PNC, HOS
 
rst_aux ={};
    switch (document.getElementById('DCbo_motivo').value){
        case 11:
        case 13:
        case 31:
        case 35:
            
                rst_aux.prioridad = 0;
                rst_aux.cambio = 0;
                rst_aux.rzona = 0;
                rst_aux.rocup = 0;
                rst_aux.otro = 0;
                rst_aux.rcab = 0;
                rst_aux.abonado = 0;
                rst_aux.premio = 0;
                rst_aux.coaseguro = adata_atencionmensajebox[0].coaseguro;
                rst_aux.cm_den_cambio = 0;
                rst_aux.estado = 1;
                rst_aux.cm_estado = "2";
                rst_aux.cod_estado = 2;
                rst_aux.clasificacion_pac = adata_atencionmensajebox[0].clasificacion_pac;
                if (adata_atencionmensajebox[0].clasificacion_pac == 1){
                    rst_aux.cod_subclasif = adata_atencionmensajebox[0].cod_subclasif;
                    //para sunat se considera como una primera consulta al enviar a la tablet
                    if (adata_atencionmensajebox[0].cod_subclasif == 2) {
                      rst_aux.primera_consulta = true;
                    }
                }
                
                rst_aux.cm_orden = 3;
                rst_aux.rhor = 0;
                rst_aux.cod_gru = adata_atencionmensajebox[0].cod_gru;
                rst_aux.nom_gru = adata_atencionmensajebox[0].nom_gru;
                rst_aux.cod_emp = adata_atencionmensajebox[0].cod_emp;
                rst_aux.nom_emp = adata_atencionmensajebox[0].nom_emp;
                rst_aux.cod_tit = adata_atencionmensajebox[0].cod_tit;
                rst_aux.nom_tit = adata_atencionmensajebox[0].nom_tit;
                rst_aux.cod_dep = adata_atencionmensajebox[0].cod_dep;
                rst_aux.nom_pac = adata_atencionmensajebox[0].nom_pac;
                rst_aux.cod_dir = adata_atencionmensajebox[0].cod_dir;
                rst_aux.tlf_dir = adata_atencionmensajebox[0].tlf_dir;
                rst_aux.des_dir = adata_atencionmensajebox[0].des_dir;
                rst_aux.cod_dis = adata_atencionmensajebox[0].cod_dis;
                rst_aux.des_dis = adata_atencionmensajebox[0].des_dis;
                rst_aux.cod_prov = adata_atencionmensajebox[0].cod_prov;
                rst_aux.des_prov = adata_atencionmensajebox[0].des_prov;
                rst_aux.dis_dir = adata_atencionmensajebox[0].dis_dir;
                rst_aux.ref_dir = adata_atencionmensajebox[0].ref_dir;
                
                if (document.getelementbyid('dcbo_motivo').value == 11 || document.getelementbyid('dcbo_motivo').value == 31){
                    rst_aux.fec_ate = new Date(lv_fecha).addDays(1);
                }else if( document.getelementbyid('dcbo_motivo').value == 13 || document.getelementbyid('dcbo_motivo').value == 35 ){
                    rst_aux.fec_ate = new Date(new Date().setMonth(new Date().getMonth()+1)).toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'});
                }
                
                rst_aux.hor_ate = adata_atencionmensajebox[0].hor_ate;
                rst_aux.cm_tlf_pac = adata_atencionmensajebox[0].cm_tlf_pac;
                rst_aux.usulla_ate = adata_atencionmensajebox[0].usulla_ate;
                rst_aux.tar_ate =  adata_atencionmensajebox[0].tar_ate;
                rst_aux.sexo_ate = adata_atencionmensajebox[0].sexo_ate;
                rst_aux.edad_ate = adata_atencionmensajebox[0].edad_ate;
                rst_aux.sin_ate = adata_atencionmensajebox[0].sin_ate;
                rst_aux.cod_doc = adata_atencionmensajebox[0].cod_doc;
                rst_aux.nom_doc = adata_atencionmensajebox[0].nom_doc;
                rst_aux.for_ate = adata_atencionmensajebox[0].for_ate;
                
                //rst_aux.cod_aut_prestacion = adata_atencion.recordsetrst_aux.cod_aut_prestacion
                //rst_aux.poliza_asegurado = adata_atencion.recordsetrst_aux.poliza_asegurado
                
                rst_aux.cod_esp = adata_atencionmensajebox[0].cod_esp;
                rst_aux.cod_directo = adata_atencionmensajebox[0].cod_directo;
                rst_aux.cod_tipo_doctor = adata_atencionmensajebox[0].cod_tipo_doctor;
                rst_aux.cod_dr_solicitado = adata_atencionmensajebox[0].cod_dr_solicitado;
                rst_aux.cel_pac = adata_atencionmensajebox[0].cel_pac;
                rst_aux.cm_appat_pac = adata_atencionmensajebox[0].cm_appat_pac;
                rst_aux.cm_apmat_pac = adata_atencionmensajebox[0].cm_apmat_pac;
                rst_aux.cm_nom_pac = adata_atencionmensajebox[0].cm_nom_pac;
                rst_aux.cm_ref_dir = adata_atencionmensajebox[0].cm_ref_dir;
                rst_aux.usu_bloq = adata_atencionmensajebox[0].usu_bloq;
                rst_aux.cm_denominacion = "exacto";
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
                rst_aux.pac_vip = adata_atencionmensajebox[0].pac_vip;
                rst_aux.flg_reprogramada = false;
                rst_aux.feclla_ate =  new date().tolocaledatestring(undefined,{year:'numeric',month:'2-digit',day:'2-digit'});
                rst_aux.horlla_ate = new Date().toTimeString().slice (0,8);
                rst_aux.f_prog = "prg";
                rst_aux.flagmone = "s";
                rst_aux.f_soldoct = "s";
                rst_aux.flg_directo = "s";
                rst_aux.cm_moneda_den = "s";
                rst_aux.flag_programada = true;
                rst_aux.cm_directa = true;
                rst_aux.cm_datos_completos = true;
                rst_aux.flg_cm_nueva = true;
                rst_aux.tipo_servicio = "ate";
                rst_aux.cod_ate_previa = adata_atencionmensajebox[0].cod_ate;
                //rst_aux.cod_aso = dacodaso
                rst_aux.tipo_servicio = "ate";
                rst_aux.tipo_ate = "normal";
                var codatencion;
                await fetch('/modulo/DACODATE/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(Adata_atencion)
                }).then(response => response.json())
                  .then(function (data) {
                    codatencion = data;
            
                  }).catch(error => {
                    console.log(error);
                  });
                 
                rst_aux.cod_ate = codatencion;
                adata_atencionmensajebox[0].tabla='t_tmpllamadas';
                Execute ("UPDATE t_tmppedidomed SET cod_ate = " + CodAtencion + ", cod_exp = null, exp = false WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
                Execute ("UPDATE t_pedidomed SET cod_ate = " + CodAtencion + ", cod_exp = null, exp = false WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
                
                Execute ("UPDATE t_tmplaboratorios SET cod_ate = " + CodAtencion + ", cod_exp = null, exp = false WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
                Execute ("UPDATE t_atencionlabo SET cod_ate = " + CodAtencion + ", cod_exp = null, exp = false WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
                
                Execute ("UPDATE t_cab_lab_serv_laboratorio SET cod_ate = " + CodAtencion + " WHERE cod_ate = " + Adata_atencionmensajebox[0].cod_ate);
                
            
            if (document.getElementById('DCbo_motivo').value == 11 || document.getElementById('DCbo_motivo').value == 31 ){
                alert("Se ha creado la atención No: " +  (CodAtencion) + " para el dia de mañana con los servicios vinculados de atencion terminada");
            }else if( document.getElementById('DCbo_motivo').value == 13 || document.getElementById('DCbo_motivo').value == 35){
                alert("Se ha creado la atención No: " +  (CodAtencion) + " para el próximo mes con los servicios vinculados de atencion terminada");
            }
    }
        
}


async function RESPONSABLE_VNR(){
    var usuario;
    var  rs_diag  ;
    var rs_diag2 ;
    var cod_carga ;
    
    if  (document.getElementById('Option2').checked == true ){
      await fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "select max(cod_cargo) as maximo from t_cargar_personal"
        })
        }).then(response => response.json())
        .then(async function (rs_diag2) {
          
            if  (rs_diag2[0].maximo == null) {
                cod_carga = 1;
            }else{
                cod_carga = parseInt(rs_diag2[0].maximo) + 1;
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

        await  fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "insert into m_segatenciones (cod_ate, cod_ser, des_ser, obs_ser, usu_ser, fec_ser, hra_ser, cod_snc, snc) values (" + document.getElementById('Txt_CodAte').value + ", '1', 'ATE', 'VNR CON CARGO A: " + document.getElementById('DC_Resp').value + " MOTIVO: " +  document.getElementById('Txt_motivo_otro').value + "', '" + usuario + "', '" + new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'})  + "','" + new Date().toTimeString().slice (0,8) + "','270','Si' )"
      
          })
        }).then(response => response.json())
          .then(function (data) {
            alert ("Se actualizo con el codigo de autorizacion " + document.getElementById('TxtCodAut').value);
      
          }).catch(error => {
            console.log(error);
          });
          await  fetch('/modulo/Execute/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "insert into t_cargar_personal (cod_cargo, cod_ate, fec_cargo, usu_cargo, usuario_cargar, motivo_cargo) values (" + (cod_carga) + "," + document.getElementById('Txt_CodAte').value + ", '" + new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) + "','" + usuario + "', '" + document.getElementById('DC_Resp').value + "', '" + document.getElementById('Txt_motivo_otro').value + "' )"
            })
          }).then(response => response.json())
            .then(function (data) {
              alert ("Se actualizo con el codigo de autorizacion " + document.getElementById('TxtCodAut').value);
        
            }).catch(error => {
              console.log(error);
            });

            await  fetch('/modulo/Execute/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: "update t_tmpllamadas set nom_pac = '" + document.getElementById('DC_Resp').value + "', cod_tit = '99999999', cod_gru = '996', cod_emp = '000855', nom_gru = 'VNR', nom_emp = 'VNR' where cod_ate = " +  document.getElementById('Txt_CodAte').value
              })
            }).then(response => response.json())
              .then(function (data) {
                alert ("Se actualizo con el codigo de autorizacion " + document.getElementById('TxtCodAut').value);
          
              }).catch(error => {
                console.log(error);
              });
        
        
        alert("Se agregará seguimiento");
      
        }).catch(error => {
          console.log(error);
        })
    }
    
}
 



async function REGISTRA_EXP(ll_CodAte){

var  lrs_cm  ;
var  lrs_Exp ;
var ll_cod_exp ;
 
ll_cod_exp = 0;
 
await fetch('/modulo/Abre_Detalle', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query:"SELECT * FROM t_llamadas WHERE cod_ate = " + ll_CodAte
     })

   }).then(response => response.json())
  .then( function (lrs_cm ) {
    if(lrs_cm.length>0) {
            if (lrs_cm[0].cod_exp != null) {
                ll_cod_exp = lrs_cm[0].cod_exp;
            }
            
              fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:"SELECT * FROM T_TMPEXP WHERE cod_exp = " + lrs_Exp
                 })
        
               }).then(response => response.json())
              .then(function (lrs_Exp ) { 
                if(lrs_Exp.length>0) { 
                    fetch('/modulo/Abre_Detalle', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "SELECT * FROM t_tmpllamadas WHERE cod_ate = " + ll_CodAte
                       })
              
                     }).then(response => response.json())
                    .then(function (lrs_cm ) {
                      if(lrs_cm.length>0) {
                        lrs_Exp[0].cod_tit = lrs_cm[0].cod_tit;
                        lrs_Exp[0].nom_pac = lrs_cm[0].nom_pac;
                        lrs_Exp[0].cod_emp = lrs_cm[0].cod_emp;
                        lrs_Exp[0].nom_emp = lrs_cm[0].nom_emp;
                        lrs_Exp[0].cod_gru = lrs_cm[0].cod_gru;
                        lrs_Exp[0].nom_gru = lrs_cm[0].nom_gru;
                        lrs_Exp[0].tabla = 't_tmpexp';
                        Executeinsert(lrs_Exp[0]);          
                      } 
                    }).catch(error => {
                      console.log(error);
                    });
                
                } 
              }).catch(error => {
                console.log(error);
              }); 
          

    }else{
        //no tiene registrado un valor en t_llamadas
    }
  }).catch(error => {
    console.log(error);
  });

}

export function REGISTRA_T_LLAMADAS(ll_CodAte , ls_tipo_serv ){
 
 
   fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT * FROM t_tmpllamadas WHERE cod_ate = " + ll_CodAte
       })

     }).then(response => response.json())
    .then(function (lrs_cm ) {
      

      if(lrs_cm.length>0) {
        fetch('/modulo/Abre_Detalle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "SELECT * FROM T_LLAMADAS WHERE cod_ate = " + ll_CodAte
             })
      
           }).then(response => response.json())
          .then(function (lrs_llamadas ) {
          

            var insert = false;
            if(lrs_llamadas.length==0) {
              lrs_llamadas[0] = {};
              lrs_llamadas[0].exp = false;
              insert = true;
             } 
            
            lrs_llamadas[0].cod_aso = lrs_cm[0].cod_aso;
            lrs_llamadas[0].sb_ate  = lrs_cm[0].sb_ate;
            lrs_llamadas[0].exi_ate = lrs_cm[0].sb_ate;
            lrs_llamadas[0].cod_ate = lrs_cm[0].cod_ate;
            lrs_llamadas[0].cod_emp = lrs_cm[0].cod_emp;
            lrs_llamadas[0].cod_tit = lrs_cm[0].cod_tit;
            lrs_llamadas[0].cod_dep = lrs_cm[0].cod_dep;
            lrs_llamadas[0].cod_dir = lrs_cm[0].cod_dir;
            lrs_llamadas[0].tar_ate = lrs_cm[0].tar_ate;
            var a ;
            var X =lrs_cm[0].tar_ate;
            a = X -  parseInt(X);
            if(a > 0 && a < 0.5 ){
              lrs_llamadas[0].tar_ateope = parseInt(X) + 0.5;
            }else if(a > 0.5 && a < 1 ){
              lrs_llamadas[0].tar_ateope=   parseInt(X) + 1;
            }else{
              lrs_llamadas[0].tar_ateope = lrs_cm[0].tar_ate;
            }
            
            lrs_llamadas[0].obs_ate = (lrs_cm[0].obs_cm??='').slice(0, 40);
            
            lrs_llamadas[0].cod_doc = lrs_cm[0].cod_doc;
            lrs_llamadas[0].cod_tipo_doctor = lrs_cm[0].cod_tipo_doctor;
            lrs_llamadas[0].flgvnr = lrs_cm[0].flgvnr;
    
            lrs_llamadas[0].accide = (lrs_cm[0].accide==null?'':lrs_cm[0].accide);
            lrs_llamadas[0].for_ate = lrs_cm[0].for_ate;
            lrs_llamadas[0].sin_ate =  (lrs_cm[0].sin_ate??='').trim().slice( 0, 80);
           /*  if !for_ate = "t" then
                !codtar_ate = lrs_cm!codtar_ate
                !ntar_ate = lrs_cm!ntar_ate
                !fvenc_ate = lrs_cm!fvenc_ate
            end if */
            
            lrs_llamadas[0].nom_pac =  (lrs_cm[0].nom_pac).trim();
            lrs_llamadas[0].des_dis = lrs_cm[0].des_dis;
            lrs_llamadas[0].feclla = lrs_cm[0].feclla_ate;
            lrs_llamadas[0].horlla = lrs_cm[0].horlla_ate;
            lrs_llamadas[0].fecfin = new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'});
            lrs_llamadas[0].horfin = new Date().toTimeString().slice (0,8);
            lrs_llamadas[0].yo = true;
            lrs_llamadas[0].canc_ate = lrs_cm[0].canc_ate;
            lrs_llamadas[0].poliza_asegurado =  (lrs_cm[0].poliza_asegurado).trim();
            lrs_llamadas[0].cod_aut_prestacion =  (lrs_cm[0].cod_aut_prestacion).trim();
            lrs_llamadas[0].cod_solgen =  (lrs_cm[0].cod_solgen??='').trim();
            //!codaseg_eps = trim(lrs_cm!codaseg_eps)
            lrs_llamadas[0].coaseguro = lrs_cm[0].coaseguro;
            lrs_llamadas[0].cod_esp = lrs_cm[0].cod_esp;
            lrs_llamadas[0].cod_denominacion = lrs_cm[0].cod_denominacion;
            lrs_llamadas[0].f_serv = "ate";
            lrs_llamadas[0].cm_aseg_producto = lrs_cm[0].cm_aseg_producto;
            lrs_llamadas[0].tipo_servicio = ls_tipo_serv;
            lrs_llamadas[0].tabla='t_llamadas';
            if(insert) { 
              Executeinsert(lrs_llamadas[0]);
            }else{
              lrs_llamadas[0].id = 'cod_ate';
              Executeupdate(lrs_llamadas[0]); 
            }
          }).catch(error => {
            console.log(error);
          });    
      } 
    }).catch(error => {
      console.log(error);
    });
    
} 

function NoNulo(valor ,  tipo ){
   switch(tipo){
        case 1: //CARACTER
                NoNulo =   valor==null? "": valor;
                break;
        case 2: //NUMERICO
                NoNulo =  valor==null? 0: valor;  
                break;
        case 3: //FECHA
                NoNulo = valor==null? "": valor;
                break;
                //NoNulo = IIf(IsNull(Valor), Format(Now, "dd/mm/yyyy"), Valor)
   }
}
export  async  function   Abre_Recordset_tablet(sql ){
var rs = [];
  await fetch('/modulo/Abre_Recordset_tablet', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query:sql
     })

   }).then(response => response.json())
  .then(function (data ) {
     rs = data;
  }).catch(error => {
    console.log(error);
  });
return rs;
}


export  async  function   Abre_Detalle(sql ){
  var rs = [];
    await fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query:sql
       })
  
     }).then(response => response.json())
    .then(function (data ) {
       rs = data;
    }).catch(error => {
      console.log(error);
    });
  return rs;
  }
  export async function  P_COD_ASIG_COMBO_MEDICO(pCodMedico , pFecha_llegada , pHora_llegada ,   VCod_asignacion1 ,   VNom_conductor1){
 
    await fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:"SELECT cod_asig, trim(nom_mot) conductor FROM t_doctorxchofer dch " 
       + " WHERE (dch.anulada Is Null Or dch.anulada = False)" 
       + " AND (dch.fecini_asig + dch.horini_asig) <= '"+ pFecha_llegada+ " "+ pHora_llegada+ "'" 
       + " AND (dch.fecfin_asig + dch.horfin_asig) + '01:00:00'::interval >= '"+ pFecha_llegada+ " "+ pHora_llegada+ "'" 
       + " AND cod_doc = '"+ pCodMedico+ "' ORDER BY cod_asig DESC"
         })
    
       }).then(response => response.json())
      .then(function (rst_combo_asignacion ) {
        
        if(rst_combo_asignacion.length>0) { 
          VCod_asignacion = rst_combo_asignacion[0].cod_asig;
          VNom_conductor = rst_combo_asignacion[0].conductor;
         }else{
          VCod_asignacion = 0;
          VNom_conductor = "";
         }
      }).catch(error => {
        console.log(error);
      });
      
    
    }
async function GUARDA_CANCELADA(ll_CodAte , tipo ){
    var  lrs_AteCanc={};
     
    lrs_AteCanc.cod_ate = ll_CodAte;
    lrs_AteCanc.usu_canc = await getusuario();
    lrs_AteCanc.fecha_canc = new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}) ;
    lrs_AteCanc.hora_canc = new Date().toTimeString().slice (0,8);
    lrs_AteCanc.canc_tipo = tipo;
    lrs_AteCanc.tabla='t_atencion_cancelada';
    Executeinsert(lrs_AteCanc);
}
 

export async function REGISTRA_AUDITORIA_LABORATORIO(lsestado , lsobs , lscambios , lcodservlaboratorio ){

    Execute ("INSERT INTO h_auditoria_laboratorio (estado, fec_reg_audi, hor_reg_audi, usu_reg_audi, obs_audi, cambio_audi, cod_serv_laboratorio) VALUES ('" + lsestado + "', '" + new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'})  + "', '" + new Date().toTimeString().slice (0,8) + "', '"  + await getusuario() + "', '" + lsobs + "', '" + lscambios + "', '" + lcodservlaboratorio + "')")
    

}  



export async function  CREABEEPER_ATE(Nom , TXT , abo ){
  var xvb 
  var NroMen 
  var i
  var TxtBEp=[];
  
//    Dim fso As Object
//    Dim existe_dir As Boolean
//    Dim directorio As String
//    Set fso = CreateObject("Scripting.FileSystemObject")
//    existe_dir = False //asume que directorio no existe
//    directorio = "F:\Beepers\Doctores\"
//    //Verifica si directorio existe
//    existe_dir = fso.FolderExists(directorio)
//    If existe_dir = False Then
//        //crea el directorio
//        MkDir ("F:\Beepers\Doctores\historico")
//    End If
//    Set fso = Nothing
await fetch('/modulo/CREABEEPER_ATE/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {
      Nom:Nom,
      TXT:TXT,
      abo:abo
    }
  )
}).then(response => response.json())
  .then(function (data) {
     
     alert("Se enviaron los datos de la atencion");

}).catch(error => {
    console.log(error);
}); 



}


export async function  P_envio_msj(tipo_envio , ll_CodAte ){

    var  Mens_add        ;
    var  vl_cod_ate       ;

    var lrs_atencion     ;
    var ls_msj_add      ; 
    var codigo_tit    ;   
    var s_tipo_doc   ;    
    
    
    ls_msj_add = "";
      
    await fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:"select trim(dir.des_dir) direccion, trim(dir.ref_dir) referencia, CASE WHEN dir.nro_dir_lote is null then '' ELSE dir.nro_dir_lote END nro_dir_lote, CASE WHEN dir.dir_dpto_interior is null then '' ELSE  dir.dir_dpto_interior END dir_dpto_interior, CASE WHEN dir.dir_urbanizacion is null then '' ELSE dir.dir_urbanizacion END dir_urbanizacion, ate.* from t_tmpllamadas ate INNER JOIN m_direcciones dir ON ate.cod_tit = dir.cod_tit AND ate.cod_dir = dir.cod_dir where ate.cod_ate = " + ll_CodAte
         })

       }).then(response => response.json())
      .then(async function (lrs_atencion ) {
        if(lrs_atencion.length>0) {
          

          codigo_tit =  lrs_atencion[0].cod_tit.trim();
    
    
          switch (lrs_atencion[0].tipo_doc_pago){
                  case "B":
                      s_tipo_doc = "/DOC.PAGO:BOLETA";
                      break;
                  case "F":
                      s_tipo_doc = "/DOC.PAGO:FACTURA";
                      break;
                  default:
                      s_tipo_doc = "";
                      break;
          } 
    if ( lrs_atencion[0].clasificacion_pac == 2 ){
        //busca las 3 ultimas medicaciones al paciente
        var matriz=[],matrizj=[] ;
        var lrs_pedidos ;
        var lrs_CantMed ;
        var i  ;
        var j  ;
        var limite ;
        var n_cantped ;
        var cadena_ped;
        var cadena_hc;
         
        for (var a = 0; a < 30; a++) {
           
          for (let j = 0; j< 10; j++) {
             matrizj[j] = '';
            
          }
          matriz[a] = matrizj;
        }
        limite = 3;
        j = 2;
        i = 1;
         
        await fetch('/modulo/Abre_Detalle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query:"select cod_ped from t_tmpllamadas as a, t_tmppedidomed as b  where a.cod_ate = b.cod_ate and b.canc_ped is null and a.cod_tit = '" + codigo_tit + "' and a.cm_estado = '8' and a.flgvnr is null order by a.cod_ate desc, b.fec_ped desc limit " + limite
             })
    
           }).then(response => response.json())
          .then(async function (lrs_pedidos ) {
            if(lrs_pedidos.length>0) {
                 
              var a = 0;
              while (a < lrs_pedidos.length) {
                matriz[0][j] = lrs_pedidos[a].cod_ped;
                j = j + 1
                a++;
              }
              
              //determinar la cantidad total de medicamentos
              await fetch('/modulo/Abre_Detalle', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query:"select distinct cod_med, des_med from t_tmpdetpedmed where cod_ped in (" + "select cod_ped from t_tmpllamadas as a, t_tmppedidomed as b where a.cod_ate = b.cod_ate and b.canc_ped is null and a.cod_tit = '" + lrs_atencion[0].cod_tit + "' and a.cm_estado = '8' and a.flgvnr is null order by a.cod_ate desc, b.fec_ped desc limit " + limite + ") order by des_med asc"
                   })
          
                 }).then(response => response.json())
                .then(function (data ) {
                  if(lrs_CantMed.length>0) {

                    var a = 0;
                    while (a < lrs_CantMed.length) {
                      matriz[i][0] = lrs_CantMed[0].cod_med.trim();
                      matriz[i][1] = lrs_CantMed[0].des_med.trim();
                      i = i + 1
                      a++;
                    }
                  
                   } 
                }).catch(error => {
                  console.log(error);
                });
              
              
              
              n_cantped = i - 1
               
              //Realizar la busqueda por codigo de pedido y codigo de medicamento
         
             for (let index = 1; index < n_cantped; index++) {
               const element = array[index];
              
                  for (let indexj = 2; indexj < limite + 1; indexj++) {
                     await fetch('/modulo/Abre_Detalle', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        query: "select can_med from t_tmpdetpedmed where cod_ped = " +   matriz[0][j] + " and cod_med = '" + matriz[i][0] +  "'"
                         })
                
                       }).then(response => response.json())
                      .then(function (lrs_CantMed ) {
                        if(lrs_CantMed.length>0) {
                          matriz[i][j] = lrs_CantMed[0].can_med;
                        }else{ 
                          matriz[i][j] = "0";
                        }
                      }).catch(error => {
                        console.log(error);
                      });
                   
                    
                  }
             } 
              cadena_ped = "";
              
              for (let index = 1; index < n_cantped; index++) {
                 
               for (let index = 1; index < limite+1; index++) {
                if (j == 1 ){
                cadena_ped = cadena_ped + matriz[i][j] + "(";
                }else if (j = limite + 1 ){
                    cadena_ped = cadena_ped + matriz[i][j] + ")";
                }else{
                    cadena_ped = cadena_ped + matriz[i][j] + ",";
                }
                 
               }
                cadena_ped = cadena_ped + "//";
                
              }
            } 
          }).catch(error => {
            console.log(error);
          });

       
        
        var cadena_hc = "";
        var rst_hc  ;
        
         await fetch('/modulo/Abre_Detalle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query:"SELECT * FROM t_tmpllamadas WHERE cod_tit = '" + codigo_tit + "' AND clasificacion_pac = 2 AND cod_ate <> " + ll_CodAte + "  AND flg_ficha = '1' order by cod_ate desc limit 1"
             })
    
           }).then(response => response.json())
          .then(async function (data ) {
            if(rst_hc.length>0) {
              //BUSCA REGISTRO DE HISTORIAL MEDICO
              
              await fetch('/modulo/Abre_Detalle', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "SELECT * FROM t_hia_historial_medico WHERE cod_ate =" + rst_hc[0].cod_ate
                   })
          
                 }).then(response => response.json())
                .then(function (data ) {
                  if(data.length>0) {
                    cadena_hc = rst_hc[0].des_hc;

                  } 
                }).catch(error => {
                  console.log(error);
                });
            } 
          }).catch(error => {
            console.log(error);
          });
       
        MensBepeer = str(ll_CodAte) + "//" + cadena_ped + "//" + cadena_hc + "/" +  getusuario() ;

        
      }else{
        if (lrs_atencion[0].cm_cod_dr_anterior !=null ){
            if( lrs_atencion[0].cm_cod_dr_anterior.trim() = lrs_atencion[0].cod_doc ){
                ls_msj_add = "/CAMBIO DE HORA:" +   lrs_atencion[0].feclledr.split('-').reverse().join('-') + " A LAS " +  lrs_atencion[0].hrlledr.slice(0,5);
            }
        }
        
        switch (lrs_atencion[0].pac_vip){
            case "SI":
                MensBepeer = "DM:" + lrs_atencion[0].cod_aso.padStart(8, '0')  + "PACIENTE VIP";
                break;
            case "MINT":
                MensBepeer = "DM:" + lrs_atencion[0].cod_aso.padStart(8, '0') + "PACIENTE MINT";
                break;
            default:
                MensBepeer = "DM:" + lrs_atencion[0].cod_aso.padStart(8, '0');
                break;
        }
        
        if (lrs_atencion[0].cod_estado > 5 ){
            MensBepeer = MensBepeer + "/ATT:" + lrs_atencion[0].cod_ate + "/" +  (lrs_atencion[0].nom_pac).trim() + "/DED:S/." + RedondeaDed(lrs_atencion[0].tar_ate) + s_tipo_doc + "/COAS:" +  (lrs_atencion[0].coaseguro).trim() + "%/F:PAGO:"
        }else{
            MensBepeer = MensBepeer + "/ATT:" + lrs_atencion[0].cod_ate + "/" +  (lrs_atencion[0].nom_pac).trim() + "/" +  (lrs_atencion[0].edad_ate).trim() 
                                    + "/" +  (lrs_atencion[0].sin_ate).trim() + "/" + lrs_atencion[0].direccion + " " + lrs_atencion[0].nro_dir_lote + " " + lrs_atencion[0].dir_dpto_interior + ", " + lrs_atencion[0].dir_urbanizacion + "/" +  (lrs_atencion[0].des_dis).trim() 
                                    + "/" +  (lrs_atencion[0].referencia).trim() + "/" +  (lrs_atencion[0].nom_gru).trim() + "/DEDU:S/." + RedondeaDed(lrs_atencion[0].tar_ate) 
                                    + s_tipo_doc + "/COAS:" +  (lrs_atencion[0].coaseguro).trim() + "%/F:PAGO:";
        }
        
        //referencia nro_dir_lote dir_dpto_interior

        switch(lrs_atencion[0].for_ate.trim()){
            case "E":
                MensBepeer = MensBepeer + "EFECTIVO/";
                if (lrs_atencion[0].cm_moneda_den = "S"){
                    MensBepeer = MensBepeer + "DENOM:S/." + lrs_atencion[0].cm_denominacion;
                }else{
                    MensBepeer = MensBepeer + "DENOM:USD." + lrs_atencion[0].cm_denominacion + "(T.C:" + lrs_atencion[0].cm_den_cambio + ")";
                }
                break;
            case "C":
                MensBepeer = MensBepeer + "CREDITO/" + lrs_atencion[0].cm_autorizado
                break;
            case "t":
                mensbepeer = mensbepeer + "tarjeta/" + lrs_atencion[0].codtar_ate + "/" + trim(lrs_atencion[0].ntar_ate) + "//" + month(lrs_atencion[0].fvenc_ate) + "/" + year(lrs_atencion[0].fvenc_ate)
                break;
            case "f":
                MensBepeer = MensBepeer + "TRANSFERENCIA"
                break;
            case "M":
                MensBepeer = MensBepeer + "MPOS"
                break;
        }
        
        if (lrs_atencion[0].cod_estado > 5 ){
            MensBepeer = MensBepeer.trim() + "/" + (await getusuario()).slice(0,5)
        }else{
            Mens_add = "";
            vl_cod_ate = 0;
            vl_cod_ate = await Busca_cod_ate_ficha((lrs_atencion[0].cod_tit).trim());
            
            Mens_add = Mens_add + await Busca_alergias_ficha_ant(vl_cod_ate);
            Mens_add = Mens_add + await Busca_pediatricos_ficha_ant( lrs_atencion[0].cod_tit.trim(), vl_cod_ate);
            Mens_add = Mens_add +  await Busca_patologicos_ficha_ant(vl_cod_ate);
            MensBepeer =  (MensBepeer).trim() + "/" + ls_msj_add + "/" +  Mens_add.toUpperCase() + "/" + (await getusuario()).trim().slice(0,5);
        }
    }
    
    destinatario = lrs_atencion[0].nom_doc.trim();
    Prefijo = lrs_atencion[0].cod_ate.trim();
    flag_Beeper = tipo_envio;
    Gs_CodDr =  lrs_atencion[0].cod_doc !=null?lrs_atencion[0].cod_doc.trim():"";
  


  }else{ 
  }
}).catch(error => {
  console.log(error);
}); 

}




export var destinatario= '' ;
export var MensBepeer;
export var Prefijo    ;             
export var flag_Beeper = ''   ;             
export var Gs_CodDr    ;             
export var VCod_asignacion ;
export var VNom_conductor;
async function Busca_cod_ate_ficha(cod_titu){
  var  Busca_cod_ate_ficha;
  var  rst_ate_ant ;
  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "select max(cod_ate) as Cod_Atenci from t_tmpllamadas where cod_tit = '" + cod_titu + "' and flg_ficha = '1'"
    })
  }).then(response => response.json())
    .then(function (rst_ate_ant) {
       if(rst_ate_ant.length>0){
           if  (rst_ate_ant[0].cod_atenci!=null) {
               Busca_cod_ate_ficha = rst_ate_ant[0].cod_atenci
          }else{
              Busca_cod_ate_ficha = 0
          }
       }

  
    }).catch(error => {
      console.log(error);
    });

  return Busca_cod_ate_ficha;
 }


 async function Busca_alergias_ficha_ant(cod_atencion) {

 var Rst_Alergias;
 var rst_ate_ant ;
 var Rst_Det_Alergias ;
 var s_mensa ;
 var Codtitu ;
 var s_MensaBeep ;
 var Busca_alergias_ficha_ant;
 s_MensaBeep = ""
 
 if (cod_atencion > 0 ){
     //alergia a medicamentos

     await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "select * from t_hia_reac_alergica where cod_ate = " +  cod_atencion
    
      })
    }).then(response => response.json())
      .then(async function (Rst_Alergias) {
         if(Rst_Alergias.length>0){
          if(Rst_Alergias[0].reac_alerg_medi == 't'){
              
            await fetch('/modulo/Abre_Detalle/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: "Select c.des_tipo_alerg, d.des_det_tipo_alerg, b.reac_alerg_otro  from t_hia_reac_alergica as a, t_hia_reac_alergicaxalergia as b, t_hia_tipo_alergia as c, t_hia_tipo_alerg_det as d where a.cod_reac_alergica  = b.cod_reac_alergica and b.cod_tipo_alerg = c.cod_tipo_alerg  and b.cod_alergia = c.cod_alergia and b.cod_det_tipo_alerg = d.cod_det_tipo_alerg and b.cod_tipo_alerg = d.cod_tipo_alerg  and b.cod_alergia = d.cod_alergia and b.cod_alergia = 2 and a.cod_ate = " + cod_atencion
            
              })
            }).then(response => response.json())
              .then(function (Rst_Det_Alergias) {
                 if(Rst_Det_Alergias.length>0){
                      s_mensa = "";
                           
                      var a = 0;
                      while (a < Rst_Det_Alergias.length) {
                        if ( (Rst_Det_Alergias[0].reac_alerg_otro).trim() != "" ||    (Rst_Det_Alergias[0].reac_alerg_otro).trim() != null ){
                          s_mensa = (s_mensa).trim() + "*" +  (Rst_Det_Alergias[0].reac_alerg_otro).trim();
                        }else{
                            s_mensa =  (s_mensa).trim() + "*" +  (Rst_Det_Alergias[0].des_det_tipo_alerg).trim();
                        }
                        a++;
                      }
                      s_MensaBeep = "/Alerg.Med:" +  s_mensa.slice(1);
                 }
            
              }).catch(error => {
                console.log(error);
              });
        
           
         }
      
      //Alergia a los alimentos
      if (Rst_Alergias[0].reac_alerg_alim == 't' ){
 
          await fetch('/modulo/Abre_Detalle/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "select c.des_tipo_alerg, d.des_det_tipo_alerg, e.des_det_tipo_alerg2, b.reac_alerg_otro from t_hia_reac_alergica as a, t_hia_reac_alergicaxalergia as b, t_hia_tipo_alergia as c, t_hia_tipo_alerg_det as d,  t_hia_tipo_alerg_det2 as e where a.cod_reac_alergica  = b.cod_reac_alergica and  b.cod_tipo_alerg = c.cod_tipo_alerg  and b.cod_alergia = c.cod_alergia and b.cod_det_tipo_alerg = d.cod_det_tipo_alerg and b.cod_tipo_alerg = d.cod_tipo_alerg and b.cod_alergia = d.cod_alergia and b.cod_det_tipo_alerg2 = e.cod_det_tipo_alerg2 and b.cod_det_tipo_alerg = e.cod_det_tipo_alerg and b.cod_tipo_alerg = e.cod_tipo_alerg  and b.cod_alergia = e.cod_alergia and b.cod_alergia = 1 and a.cod_ate = " + cod_atencion
          
            })
          }).then(response => response.json())
            .then(function (Rst_Det_Alergias) {
               if(Rst_Det_Alergias.length>0){
                s_mensa = "";
                      
                        var a = 0;
                      while (a < Rst_Det_Alergias.length) {
                            if (Rst_Det_Alergias[0].reac_alerg_otro.trim() != "" || Rst_Det_Alergias[0].reac_alerg_otro!= null ){
                                s_mensa = s_mensa.trim() + "*" + Rst_Det_Alergias[0].reac_alerg_otro.trim();
                            }else{
                                if ( Rst_Det_Alergias[0].des_det_tipo_alerg.trim().toUpperCase == "OTROS" ){
                                    s_mensa = s_mensa.trim() + "*" + Rst_Det_Alergias[0].des_tipo_alerg.trim();
                                }else{
                                    if(Rst_Det_Alergias[0].des_det_tipo_alerg2.trim().toUpperCase == "GENERAL"){
                                        s_mensa = s_mensa.trim() + "*" + Rst_Det_Alergias[0].des_det_tipo_alerg.trim();
                                    }else{
                                        s_mensa = s_mensa.trim() + "*" + Rst_Det_Alergias[0].des_det_tipo_alerg2.trim();
                                    }
                                }
                              }
                         a++;
                      }
                s_MensaBeep = s_MensaBeep + "/Alerg.Alim:" + s_mensa.slice(1);
               }
          
            }).catch(error => {
              console.log(error);
            });
        }
      
      //Alergenos (otros)
      if (Rst_Alergias[0].reac_alerg_otro == 't'){ 
         

          await fetch('/modulo/Abre_Detalle/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "Select c.des_tipo_alerg, d.des_det_tipo_alerg, b.reac_alerg_otro  from t_hia_reac_alergica as a, t_hia_reac_alergicaxalergia as b, t_hia_tipo_alergia as c, t_hia_tipo_alerg_det as d where a.cod_reac_alergica  = b.cod_reac_alergica and b.cod_tipo_alerg = c.cod_tipo_alerg  and b.cod_alergia = c.cod_alergia and b.cod_det_tipo_alerg = d.cod_det_tipo_alerg and b.cod_tipo_alerg = d.cod_tipo_alerg  and b.cod_alergia = d.cod_alergia and b.cod_alergia = 3 and a.cod_ate = " + cod_atencion
          
            })
          }).then(response => response.json())
            .then(function (Rst_Det_Alergias) {
               if(Rst_Det_Alergias.length>0){

                s_mensa = "";
                
                while (a < Rst_Det_Alergias.length) {
                  if (Rst_Det_Alergias[0].reac_alerg_otro.trim() != "" ||   Rst_Det_Alergias[0].reac_alerg_otro!=null) {
                     s_mensa =  s_mensa.trim() + "*" +  Rst_Det_Alergias[0].reac_alerg_otro.trim();
                  }else{
                      s_mensa = s_mensa.trim() + "*" + Rst_Det_Alergias[0].des_det_tipo_alerg.trim();
                  }
                   a++;
                }
                s_MensaBeep = s_MensaBeep + "/Alerg.Otros:" +  s_mensa.slice(1);
 
              }
          
            }).catch(error => {
              console.log(error);
            });

       }
      if (Rst_Alergias[0].reac_alerg_otro == 'f' && Rst_Alergias[0].reac_alerg_alim =='f' && Rst_Alergias[0].reac_alerg_medi == 'f' ){
          s_MensaBeep = s_MensaBeep + "/No tiene alergias";
      }
  //Else
  //    MsgBox "Error en registro de las alergias de att. anterior N° : " + CStr(cod_atencion), vbInformation
         }
    
      }).catch(error => {
        console.log(error);
      });
 
     

}
 Busca_alergias_ficha_ant =  s_MensaBeep.trim();
 return Busca_alergias_ficha_ant;
 }


 async function Busca_pediatricos_ficha_ant(cod_titu , cod_atenc ) {

 var Rst_Pediatrico ;
 var Rst_Datos_Pers ;
 var s_mensa ;
 var s_MensaBeep ;
 var Codtitu;
 var EdadPac ;
 var Busca_pediatricos_ficha_ant;
 s_MensaBeep = ""
 
 if (cod_atenc > 0 ){
    await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:  "Select * from m_pacientesdrmas where cod_hia='" + cod_titu + "'"
    
      })
    }).then(response => response.json())
      .then(async function (Rst_Datos_Pers) {
        if(Rst_Datos_Pers.length>0){
          
          const date1 = new Date(Rst_Datos_Pers[0].fnac_pac.split('-').reverse().join('-'));
          const date2 = new Date();
          const diffTime = Math.abs(date2 - date1);
          EdadPac = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365)); 
          if (EdadPac < 18 ){
             
              await fetch('/modulo/Abre_Detalle/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query:  "Select * from t_hia_ant_pediatrico where cod_ate=" + cod_atenc
              
                })
              }).then(response => response.json())
                .then(function (Rst_Pediatrico) {
                   if(Rst_Pediatrico.length>0){
                    s_mensa = ""
                          if (Rst_Pediatrico[0].ant_consulto_ant_pediatrico == 't' ){
                              s_mensa = "Gest.:" + Rst_Pediatrico[0].ant_gestacion.trim() + "*Parto:" + Rst_Pediatrico[0].ant_parto.trim() + "*Vacuna:" + Rst_Pediatrico[0].ant_vacuna.trim() + "*Aliment:" + (Rst_Pediatrico[0].ant_alimentacion == "L.M."?"Lact.Mat.":Rst_Pediatrico[0].ant_alimentacion.trim());
                          }else{
                              s_mensa = "No Consultó";
                          }
                          s_MensaBeep = "/Ant.Pediat:" + s_mensa;
                      //Else
                          //MsgBox "Error en registro de Antec. Pediatricos de att. anterior N° : " + CStr(cod_atenc), vbInformation
                   }
              
                }).catch(error => {
                  console.log(error);
                });
            }
        }
    
     }).catch(error => {
        console.log(error);
     });
  
   
  }
 
 Busca_pediatricos_ficha_ant = s_MensaBeep.trim()
 return Busca_pediatricos_ficha_ant;
 }



 async function Busca_patologicos_ficha_ant(cod_atencion ) {
    
 var Rst_Patologico;
 var rst_ate_ant ;
 var s_mensa ;
 var s_MensaBeep ;
 var Codtitu;
 var EdadPac ;
 var Busca_patologicos_ficha_ant;
 s_MensaBeep = ""
 
  if (cod_atencion > 0 ){
      
     
     await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "Select * from t_hia_patologico where cod_ate = " + cod_atencion
    
      })
    }).then(response => response.json())
      .then(function (Rst_Patologico) {
         if(Rst_Patologico.length>0){
          s_mensa = "";
          if(Rst_Patologico[0].pat_otra.trim() != "" || Rst_Patologico[0].pat_otra != null) {
              s_mensa = s_mensa + "*" + Rst_Patologico[0].pat_otra.trim();
          }
          if(Rst_Patologico[0].pat_ninguno == 'f') {
              if(Rst_Patologico[0].pat_dislipidemia == 't') {
                  s_mensa = s_mensa + "*dislipidemia";
              }
              if(Rst_Patologico[0].pat_asma == 't') {
                  s_mensa = s_mensa + "*Asma";
              }
              if(Rst_Patologico[0].pat_diabetes == 't' ){
                  s_mensa = s_mensa + "*diabetes";
              }
              if(Rst_Patologico[0].pat_gastritis == 't' ){
                  s_mensa = s_mensa + "*gastritis";
              }
              if(Rst_Patologico[0].pat_osteoporosis == 't') {
                  s_mensa = s_mensa + "*ostoporosis";
              }
              if(Rst_Patologico[0].pat_hta == 't') {
                  s_mensa = s_mensa + "*HTA";
              }
              //s_MensaBeep = "/Ant.Patlg:" + Mid(s_mensa, 2)
          }else{
              if(Rst_Patologico[0].pat_otra.trim() == "" || Rst_Patologico[0].pat_otra==null) {
                  s_mensa = s_mensa + "*No tiene patologico";
              }
          }
          s_MensaBeep = "/Ant.Patlg:" + s_mensa.slice(1);
      //Else
      //   MsgBox "Error en registro de Ant. patologicos de att. anterior N° : " & CStr(cod_atencion), vbInformation
         }
    
      }).catch(error => {
        console.log(error);
      });  }
 Busca_patologicos_ficha_ant = (s_MensaBeep).trim();
 return Busca_patologicos_ficha_ant;
 }






export function dragElement(elmnt, header = '') {
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

export async function permite_ingreso(val){ 
  var rpta = false;             
  fetch('/modulo/permite_ingreso/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      codigo: val
  })
  }).then(response => response.json())
  .then(function (data) {
         rpta = data;
  }).catch(error => {
    console.log(error);
  });  
  return rpta;
}




 