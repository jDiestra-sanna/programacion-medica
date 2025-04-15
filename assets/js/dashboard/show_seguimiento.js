 
 var L_CodAte;

(function(){ 
  cmdBuscar_Click();
})();

 
// ----------------------------------------------Añadir un objeto de atributos a un elemento------------------------//
var addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr,attrObj[attr])
  }
};

// Crear elementos con atributos e hijo
var createCustomElement = (element,attributes,children) => {
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
function cmdBuscar_Click(){
   
   
  if  (  document.getElementById("txtCodServ").value=='') {
     return;
  }
 //alert( document.getElementById("txtCodServ").value);

   document.getElementById("txt_obs").value='';
var ls_Ant_cod_snc = "";

var L_CodAte = 0 ;
 document.getElementById("Chck_obs").checked=false;
//Txt_monto.Text = ""
/* Call Abre_Detalle(AdataSNC, "select * from m_servnoconforme where 1 = 2") */
 

  Busca_Servicio(  document.getElementById("txtCodServ").value );
  

//Call Abre_Detalle(AdataSeg, G_sql)
S_MOSTRAR_REGISTRO_SNC('REGISTRO' );
 

 }

function cambio_obs(){
  if  ( document.getElementById("Chck_obs").checked) {
    document.getElementById("opt_registros").disabled = false;
    document.getElementById("opt_snc").disabled = false;
 }else{
  document.getElementById("opt_registros").disabled = true;
  document.getElementById("opt_snc").disabled = true;
  document.getElementById("opt_registros").checked = false;
    document.getElementById("opt_snc").checked = false;
 }

}

function S_MOSTRAR_REGISTRO_SNC( s_tipo_seg){

  var  sqlq = "";
  document.getElementById("txt_obs").disabled = false;
  document.getElementById("CmdBuscar").focus();

  if (s_tipo_seg == "REGISTRO"){
  s_tipo_seg = " AND tipo_seg = 'REGISTRO' "
  }else{
  s_tipo_seg = " AND tipo_seg = 'SNC' "
  }

  if ( document.getElementById("Chck_obs").checked) {
    document.getElementById("DBDes_snc").disabled = false;
            if ( document.getElementById("opt_incidencia").checked ){
                sqlq = "select * from m_servnoconforme where tip_serv='Inc' and activi = '1' ";
            }else if (document.getElementById("optAte").checked  ){
                sqlq = "select * from m_servnoconforme where tip_serv='Ate' and activi = '1' ";
            }else if (document.getElementById("optPed").checked  ){
                sqlq = "select * from m_servnoconforme where tip_serv='Ped' and activi = '1' ";
            }else if (document.getElementById("optLab").checked ){
                sqlq = "select * from m_servnoconforme where tip_serv='Lab' and activi = '1' ";
            }else if (document.getElementById("optAmb").checked   ){
                sqlq = "select * from m_servnoconforme where tip_serv='Amb' and activi = '1' ";
            }else if (document.getElementById("optAdm").checked   ){
                sqlq = "select * from m_servnoconforme where tip_serv='Adm' and activi = '1' ";
            }else if (document.getElementById("optAf").checked   ){
                sqlq = "select * from m_servnoconforme where tip_serv='Af' and activi = '1' ";
            }else if (document.getElementById("optPreServ").checked   ){
                sqlq = "select * from m_servnoconforme where tip_serv='PrS' and activi = '1' ";
            }else if (document.getElementById("optAudMed").checked   ){
                sqlq = "select * from m_servnoconforme where tip_serv='Am' and activi = '1' ";
            }else if (document.getElementById("opt_PostServ").checked ){
                if (Pvienede = "FRMSERVICIOLABORATORIO" ){
                    sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1' and cod_snc in ('002','300','228','219','217','216','215','211','206','205','204','203') ";
                }else{
                    sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1' ";
                }
            }else if  (document.getElementById("optAlm").checked    ){
                sqlq = "select * from m_servnoconforme where tip_serv='Alm' and activi = '1' ";
            }else if  (document.getElementById("opt_Cent_adv").checked  ){
                sqlq = "select * from m_servnoconforme where tip_serv in ('Adv', 'Cnt') and activi = '1' ";
            }else if  (document.getElementById("opt_DrOnline").checked  ){
                sqlq = "select * from m_servnoconforme where tip_serv in ('DRO') and activi = '1' ";
            }
             fetch('/gestionlaboratorio/AdataSNC/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:  sqlq + s_tipo_seg + " order by des_snc"            
              })
            }).then(response => response.json())
            .then(function(data) {
              var html = '';
              var i;
              if(data.length == 0){
                document.getElementById("DBDes_snc").disabled = true;
              }else{
                const names = data.map(snc => `<option value="${snc.cod_snc}">${snc.des_snc}</option>`).join("\n");
                document.getElementById("DBDes_snc").disabled = false;               
              }
               
               
             }).catch(error => {
              console.log(error);    
            });         
    }else{
      document.getElementById("DBDes_snc").innerHTML = "" ;
      document.getElementById("txt_obs").value = "" ; 
      document.getElementById("DBDes_snc").disabled = true; 
 
    }


 }

var G_sql ='';
   function Busca_Servicio(ll_CodServ){
   
 var sqll_serv = "",querylrs_Servicio="",queryalterno="",tipo_amb="";
 if (document.getElementById("optAtencion").checked == true) {
     querylrs_Servicio = "SELECT cod_ate, nom_pac, cod_emp, nom_gru, feclla_ate as fec_creacion, cm_estado, cod_gru FROM t_tmpllamadas WHERE (tipo_servicio in ('ATE','AMB', 'DRONL') OR tipo_servicio is Null) AND cod_ate = " + ll_CodServ;
     //queryalterno ="SELECT a.cod_ate, a.cod_ambx, a.nom_pac, a.cod_emp, b.nom_gru, a.FECLLA_AMB as fec_creacion, a.estado, a.cod_gru FROM t_tmpambulancias as a, m_grupos as b WHERE a.cod_gru = b.cod_gru and a.cod_ambx = " + ll_CodServ; //alternativa por ser ambulancia

 }else if (document.getElementById("optPedido").checked  == true) {
     querylrs_Servicio = "SELECT cod_ate, cod_ped, nom_pac, cod_emp, nom_gru, FECLLA_PED as fec_creacion, estado, cod_gru FROM t_tmppedidomed WHERE cod_ped = " +ll_CodServ;
 }else if (document.getElementById("optLaboratorio").checked == true ){
    querylrs_Servicio =  "select  a.cod_ate, a.cod_serv_laboratorio as cod_atelab, a.nom_pac, b.nom_gru, fecha_creacion as fec_creacion, a.estado, a.cod_gru FROM t_cab_lab_serv_laboratorio a left join m_grupos b on a.cod_gru=b.cod_gru WHERE cod_serv_laboratorio = " + ll_CodServ;
    queryalterno =  "SELECT cod_ate, cod_atelab, nom_pac, cod_emp, nom_gru, fec_ate as fec_creacion, estado, cod_gru FROM t_tmplaboratorios WHERE cod_atelab = " + ll_CodServ;
    
     
 }else if (document.getElementById("optAmbulancia").checked == true) {
     tipo_amb = ""
     querylrs_Servicio = "SELECT cod_ate, nom_pac, cod_emp, nom_gru, feclla_ate as fec_creacion, cm_estado, cod_gru FROM t_tmpllamadas WHERE tipo_servicio = 'AMB' AND cod_ate = " + ll_CodServ;
     queryalterno ="SELECT a.cod_ate, a.cod_ambx, a.nom_pac, a.cod_emp, b.nom_gru, a.FECLLA_AMB as fec_creacion, a.estado, a.cod_gru FROM t_tmpambulancias as a, m_grupos as b WHERE a.cod_gru = b.cod_gru and a.cod_ambx = " + ll_CodServ;
      
 }
 
   // alert(querylrs_Servicio);
   // alert(queryalterno);
 fetch('/gestionlaboratorio/lrs_Servicio', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query:querylrs_Servicio  ,
    queryalterno: queryalterno
  })
}).then(response => response.json())
.then(function(data) {
      document.body.style.cursor = "default";
      tipo_amb = "DR+";

    if(data.length==0){
      tipo_amb = "";
     
      alert('El servicio no ha sido creado');
     
    
    }else{
                L_CodAte = data[0].cod_ate;
                
                tipo_amb = "OTRO";
                //document.getElementById("optAte").disabled = true;
                //document.getElementById("optPed").disabled = true;
                //document.getElementById("optLab").disabled = true;
                //document.getElementById("optAmb").disabled = true;
              

          //Verifica servicios asociados
          if (document.getElementById("optAtencion").checked == true ){
            document.getElementById("optAte").disabled = false;
            document.getElementById("optAte").checked = true;

              ServAso_Ped(L_CodAte);
              ServAso_Lab(L_CodAte);
              ServAso_Amb(L_CodAte);
            
          }else if (document.getElementById("optPedido").checked == true )   {
          document.getElementById("optPed").disabled = false;
          document.getElementById("optPed").checked = true;

            if ( L_CodAte != 999999)  {
              document.getElementById("optAte").disabled = false;
                ServAso_Lab(L_CodAte);
                  ServAso_Amb(L_CodAte);
            
              }

          }else if (document.getElementById("optLaboratorio").checked == true )  {
          document.getElementById("optLab").disabled = false;
          document.getElementById("optLab").checked = true;
              
            if (L_CodAte != 999999)  {
              document.getElementById("optAte").disabled = false;
                ServAso_Ped(L_CodAte);
                ServAso_Amb(L_CodAte);
            }
            
          }else if (document.getElementById("optAmbulancia").checked == true )   {
          document.getElementById("optAmb").disabled = false;
          document.getElementById("optAmb").checked = true;

            if (L_CodAte != 999999)  {
              document.getElementById("optAte").disabled = false;
                ServAso_Ped(L_CodAte);
                ServAso_Lab(L_CodAte);
            }
          }


          if (L_CodAte != 999999)  {
            G_sql = "SELECT * FROM m_segatenciones WHERE cod_ate = " + L_CodAte + " ORDER BY fec_ser asc, hra_ser asc";
          }else if (document.getElementById("optLaboratorio").checked == true) {
            G_sql = "SELECT * FROM m_segatenciones WHERE cod_ped = '" + ll_CodServ + "' and   des_ser='LAB' ORDER BY fec_ser asc, hra_ser asc";
          }else if (document.getElementById("optAmbulancia").checked == true) {
            G_sql = "SELECT * FROM m_segatenciones WHERE cod_ped = '" + ll_CodServ + "' and   des_ser='AMB' ORDER BY fec_ser asc, hra_ser asc";
          }else{
            G_sql = "SELECT * FROM m_segatenciones WHERE cod_ped = '"+ ll_CodServ + "' and  des_ser='PED'   ORDER BY fec_ser asc, hra_ser asc";
          }


            
          document.getElementById('CmdGrabar').disabled =  false;
            
          document.getElementById('txtPac').value =  (data[0].nom_pac).trim();

          //Busca datos del grupo y empresa
          sqll_serv = "SELECT * FROM m_grupos WHERE cod_gru = '" + data[0].cod_gru.trim()  +"'";
          //Call Abre_Recordset(lrs_Servicio, sqll_serv)
          //txtEmp.Text = Trim(lrs_Servicio!nom_emp)
          document.getElementById('TxtGru').value=  data[0].nom_gru.trim() ;
              
          fetch('/modulo/Abre_Detalle/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: G_sql 

            })
          }).then(response => response.json())
          .then(function(AdataSeg) {
            var html = '';
            var i;
          
            for(i=0; i<AdataSeg.length; i++){
            
              
              html +=  '<tr onclick="filatabla(this);"><td>'+AdataSeg[i].des_ser +'</td>'+
                  '<td >'+(AdataSeg[i].snc==null?'':AdataSeg[i].snc)  + '</td>'+
                  '<td>'+AdataSeg[i].obs_ser+'</td>'+
                  '<td>'+AdataSeg[i].usu_ser+'</td>'+
                  '<td>'+AdataSeg[i].fec_ser+'</td>'+
                  '<td>'+AdataSeg[i].hra_ser+'</td>'+
                  '</tr>';
            }
          
                  document.getElementById('t_seguimiento').innerHTML = html;
                  
            
          }).catch(error => {
            console.log(error);    
          }); 
    }

 }).catch(error => {
   console.log(error);
   document.body.style.cursor = "default";
 });
  
 
 //Guarda el codigo de la atencion asociada
 //L_CodAte = lrs_Servicio!cod_ate
 

}

function filatabla(p) {
  var table = p.parentElement;;

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";      
   
 } 
  p.style.backgroundColor = "turquoise";            
}

function ServAso_Ped(L_CodAte){
    var query ="" ;
     query = "SELECT * FROM t_tmppedidomed WHERE cod_ate = " + L_CodAte;
  
    fetch('/gestionlaboratorio/lrs_ServAso/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query, 
      })
    }).then(response => response.json())
    .then(function(data) {
        if(data.length!=0){
          document.getElementById("optAte").disabled = false;

        }
         document.body.style.cursor = "default";

     }).catch(error => {
      
      console.log(error);
       document.body.style.cursor = "default";
     });
}
function ServAso_Lab(L_CodAte){
  var query ="" ;
   query = "SELECT * FROM t_tmplaboratorios WHERE cod_ate = " + L_CodAte;

  fetch('/gestionlaboratorio/lrs_ServAso/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query, 
    })
  }).then(response => response.json())
  .then(function(data) {
      if(data.length!=0){
        document.getElementById("optLab").disabled = false;

      }
       document.body.style.cursor = "default";

   }).catch(error => {
    
    console.log(error);
     document.body.style.cursor = "default";
   });
}
function ServAso_Amb(L_CodAte){
  var query ="" ;
   query = "SELECT * FROM t_tmpambulancias WHERE cod_ate = " + L_CodAte;

  fetch('/gestionlaboratorio/lrs_ServAso/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query, 
    })
  }).then(response => response.json())
  .then(function(data) {
      if(data.length!=0){
        document.getElementById("optAmb").disabled = false;
      }
       document.body.style.cursor = "default";
   }).catch(error => {
    
    console.log(error);
     document.body.style.cursor = "default";
   });
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
 function exportarekg(a){ 
  
 document.body.style.cursor = "progress";
    
 fetch('/gestionlaboratorio/exportarekg', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
     cond:a
    })
 }).then(response => response.json())
 .then(function(data) {
   document.body.style.cursor = "default";
   
   var wb = XLSX.utils.book_new();
   wb.Props = {
                   Title: "EKG",
                   Subject: "EKG",
                   Author: "EKG",
                   CreatedDate: new Date()
           };
   wb.SheetNames.push("EKG");
   //tab = document.getElementById('tabla1'); // id of table
    
   var ws_data = tabletoarrayjson( data);  //a row with 2 columns
   
   var ws = XLSX.utils.aoa_to_sheet(ws_data);
   wb.Sheets["EKG"] = ws;
   var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
          saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'EKG.xlsx');
   
   
   
  }).catch(error => {
    console.log(error);    
    document.body.style.cursor = "default";
alert('Sucedio un error al exportar');
 });
 

}
 
async function btnClick(btn) {
  return new Promise(resolve =>  btn.onclick = () => resolve(Cmd_Seleccionar_click()));
}

async function  cmdGrabar_Click(){

  var ll_CodServSeg ;    //codigo del servicio al cual se realiza el seguimiento
  var ls_TipoServ ;
  var ls_DesServ ;
  var ls_CodCaso;
  var lrs_Seguimiento;
  var lrs_reg_tarifa;
  var lb_valid_seg ;
  var lrs_ate ;
  
      if ( document.getElementById('txtCodServ').value == "" ){
          alert("Ingrese el numero de servicio");
          document.getElementById('txtCodServ').focus();
          return
      }
      
      if  (document.getElementById('txt_obs').disabled == false) {
          if (document.getElementById('txt_obs').value == "" ){
              alert( "Ingrese el texto del seguimiento");
              document.getElementById('txt_obs').value = "";
              document.getElementById('txt_obs').focus();
              return ;
          }
      }
      
      document.getElementById('txtCodServSeg').value = ""; 
      ls_TipoServ = "";
      ls_DesServ = "";
      ls_CodCaso = "";
      
      //ATENCION
      if (document.getElementById('optAte').checked ){
          ls_TipoServ = "1";
          ls_DesServ = "ATE";
          ll_CodServSeg = L_CodAte;
          var  Execute = "UPDATE t_tmpllamadas SET segui_ate = true WHERE segui_ate = false and cod_ate = " + L_CodAte;

          await fetch('/modulo/Execute/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: Execute

            })
          }).then(response => response.json())
            .then(function (data) {
              
  

            }).catch(error => {
              console.log(error);
            }); 
      }
      
      //---------------------------------------------------------  PEDIDOS  ---------------------------------------------------------
      
      if (document.getElementById('optPed').checked)   {
          ls_TipoServ = "2";
          ls_DesServ = "PED";
          if (L_CodAte != 999999 ){
              //Call Abre_Detalle(AdataTmpServicio, "SELECT cod_ped as cod_serv FROM t_tmppedidomed WHERE cod_ate = " + L_CodAte + " AND estado > 0 ORDER BY cod_ped ASC")
              if (AdataTmpServicio.Recordset.RecordCount > 1) {
                //  Call Abre_Detalle(Frm_SegSelServ.Adata_serv, "SELECT cod_ped as cod_serv FROM t_tmppedidomed WHERE cod_ate = " + L_CodAte + " AND estado > 0 ORDER BY cod_ped ASC")
                 // Frm_SegSelServ.DataGrid1.Columns.Item(0).Caption = "Pedido"
                 // Frm_SegSelServ.Show 1
                 // ll_CodServSeg = CLng(txtCodServSeg.Text)
              }else{
                  //atencion con un servicio
                 // AdataTmpServicio.Recordset.MoveFirst
                 // ll_CodServSeg = AdataTmpServicio.Recordset!cod_serv
              }
          }else{
              //pedido sin asociacion
            //  ll_CodServSeg = CLng(txtCodServ.Text)
          }
          
         /*  If Chck_obs.Value = 1 And Trim(DBDes_snc.BoundText) = "374" Then
              G_db.Execute ("UPDATE t_tmppedidomed SET segui_ped = true, conf_pac = True, fecconf_pac = '" & Format(Date, "yyyy-mm-dd") & "', horconf_pac = '" & Format(Time, "HH:mm:ss") & "' WHERE cod_ped = " & ll_CodServSeg)
          Else
              G_db.Execute ("UPDATE t_tmppedidomed SET segui_ped = true WHERE segui_ped = false AND cod_ped = " & ll_CodServSeg)
          End If */
      }
      
      //LABORATORIOS
      //los lab no tiene como cod_ate el 999999, guardan como cod_ate el cod_aso
      if (document.getElementById('optLab').checked) {
          ls_TipoServ = "3";
          ls_DesServ = "LAB";
          
          if (L_CodAte == 999999) {
              ll_CodServSeg = document.getElementById('txtCodServ').value;  
              ls_CodCaso =  (ll_CodServSeg);
          }else{
          
               var AdataTmpServicioq ;
              AdataTmpServicioq = "SELECT cod_serv_laboratorio as cod_serv from t_cab_lab_serv_laboratorio where cod_ate = " + L_CodAte  +  " ORDER BY cod_serv_laboratorio DESC";
              await fetch('/modulo/Abre_Detalle/', {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                 query: AdataTmpServicioq 
               })
             }).then(response => response.json())
               .then(async function (AdataTmpServicio) {
                  if (AdataTmpServicio.length > 1) {
                  
                    await fetch('/modulo/Abre_Detalle/', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        query: "SELECT cod_serv_laboratorio as cod_serv from t_cab_lab_serv_laboratorio where cod_ate = " +  L_CodAte  +  " ORDER BY cod_serv_laboratorio DESC" 
                      })
                    }).then(response => response.json())
                      .then(async function (Frm_SegSelServ_Adata_serv) {
                         
                        printModal(Frm_SegSelServ);
                         
                        
                        document.getElementById('DataGrid1head').rows[0].cells[0].innerHTML = "Laboratorio";
                        i = 0,html='';
    
                        for (; i < Frm_SegSelServ_Adata_serv.length; i++) {
  
                          html += '<tr onclick="filatabla(this);">' +
                            '<td >' + Frm_SegSelServ_Adata_serv[i].cod_serv + '</td>' +
           
                          '</tr>';
                        }
                        document.getElementById('DataGrid1body').innerHTML = html;
                        document.body.style.cursor = 'progress'
                        await btnClick(document.getElementById('Cmd_Seleccionar'));
                        document.getElementById('cancelarFrm_SegSelServ').click();
                        ll_CodServSeg =  document.getElementById('txtCodServSeg').value;

                      }).catch(error => {
                        console.log(error);
                      });
                
                 }else{
                      if( AdataTmpServicio.length>0) {
                       ll_CodServSeg = AdataTmpServicio[0].cod_serv;
                      }else{
                          var AdataTmpServicio = "SELECT cod_atelab as cod_serv from t_tmplaboratorios where cod_ate = " + L_CodAte + " ORDER BY cod_atelab DESC";
                          fetch('/modulo/Abre_Detalle/', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              query: AdataTmpServicio 
                            })
                          }).then(response => response.json())
                            .then(async function ( AdataTmpServicio) {
                              var html ='';
                              if( AdataTmpServicio.length>1) {
                                var Frm_SegSelServ_Adata_serv =  "SELECT cod_atelab as cod_serv FROM t_tmplaboratorios WHERE cod_ate = " + L_CodAte + " ORDER BY cod_atelab DESC";

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
                                  .then(async function (data) {
                                    var html = '', i = 0;;
                                   
                                    printModal(Frm_SegSelServ);
                                    document.getElementById('DataGrid1head').rows[0].cells[0].innerHTML = "Laboratorio";                                 
                
                                    for (; i < Frm_SegSelServ_Adata_serv.length; i++) {
                                    html += '<tr ' +
                                        '<td >' + Frm_SegSelServ_Adata_serv[i].cod_serv + '</td>' +
                       
                                      '</tr>';
                                    }
                                    document.getElementById('DataGrid1body').innerHTML = html;
                                    document.body.style.cursor = 'progress'
  
                                    await btnClick(document.getElementById('Cmd_Seleccionar'));
                                     document.getElementById('cancelarFrm_SegSelServ').click();
                                    ll_CodServSeg =  document.getElementById('txtCodServSeg').value;
                            
                                  }).catch(error => {
                                    console.log(error);
                                  });
                                  
                              }else{
                                var ll_CodServSeg = AdataTmpServicio[0].cod_serv;
                              }
      
                            }).catch(error => {
                              console.log(error);
                            });
                          
                           fetch('/modulo/Execute/', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              query: "UPDATE t_tmplaboratorios SET segui_lab = true WHERE cod_atelab = " + ll_CodServSeg         
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
                          ls_CodCaso =  (ll_CodServSeg);
                          ll_CodServSeg = 0   ; //para cuando se guarde en la tabla seguimiento
                      }
                      document.body.style.cursor = 'default' ;

                 }
                  
             ls_CodCaso =  (ll_CodServSeg);
             ll_CodServSeg = 0    //para cuando se guarde en la tabla seguimiento 
                 
         
               }).catch(error => {
                 console.log(error);
               });



          }
        }
      
      //AMBULANCIAS
      
      /* If optAmb.Value = True Then
          ls_TipoServ = "4"
          ls_DesServ = "AMB"
          
          If Chck_obs.Value = 1 And Trim(DBDes_snc.BoundText) = "395" Then
              If Val(Txt_monto.Text) = 0 Then
                  MsgBox "Ingrese un monto a facturar (Incl. I.G.V.)", vbInformation
                  Exit Sub
              End If
          End If
                  
          If Chck_obs.Value = 1 And Trim(DBDes_snc.BoundText) = "396" Then
              If Val(Txt_monto.Text) = 0 Then
                  MsgBox "Ingrese un monto de la boleta (Incl. I.G.V.)", vbInformation
                  Exit Sub
              End If
          End If
                  
          If tipo_amb <> "DR+" Then
              If L_CodAte <> 999999 Then
                  Call Abre_Detalle(AdataTmpServicio, "SELECT cod_ambx as cod_serv FROM t_tmpambulancias WHERE cod_ate = " & L_CodAte & " ORDER BY cod_ambx ASC")
                  If AdataTmpServicio.Recordset.RecordCount > 1 Then
                      Call Abre_Detalle(Frm_SegSelServ.Adata_serv, "SELECT cod_ambx as cod_serv FROM t_tmpambulancias WHERE cod_ate = " & L_CodAte & " ORDER BY cod_ambx ASC")
                      Frm_SegSelServ.DataGrid1.Columns.Item(0).Caption = "Ambulancia"
                      Frm_SegSelServ.Show 1
                      ll_CodServSeg = CLng(txtCodServSeg.Text)
                  Else
                      AdataTmpServicio.Recordset.MoveFirst
                      ll_CodServSeg = AdataTmpServicio.Recordset!cod_serv
                  End If
              Else
                  //ambulancia sin asociacion
                  ll_CodServSeg = CLng(txtCodServ.Text)
              End If
              G_db.Execute ("UPDATE t_tmpambulancias SET segui_amb = true WHERE cod_ambx = " & ll_CodServSeg)
          Else
              ll_CodServSeg = CLng(txtCodServ.Text)
              G_db.Execute ("UPDATE t_tmpllamadas SET segui_ate = true WHERE cod_ate = " & L_CodAte)
          End If
      End If
      
      //Otras opciones de seguimiento
      If optAte.Value = False And optPed.Value = False And optLab.Value = False And optAmb.Value = False Then
          ll_CodServSeg = CLng(txtCodServ.Text)
          If optLaboratorio.Value = True Then
              ls_CodCaso = CStr(ll_CodServSeg)
              ll_CodServSeg = 0
          End If
      End If */
      
      if  (document.getElementById('opt_incidencia').checked) {
        ls_TipoServ = "5";
        ls_DesServ = "INC";
      }
      if (document.getElementById('optAdm').checked){
         ls_TipoServ = "6";
          ls_DesServ = "ADM";
      }
      if (document.getElementById('optAf').checked) {
         ls_TipoServ = "7";
          ls_DesServ = "AF";
      }
      if (document.getElementById('optPreServ').checked) {
         ls_TipoServ = "8";
          ls_DesServ = "PRS";
      }
      if (document.getElementById('optAudMed').checked) {
         ls_TipoServ = "9"; 
         ls_DesServ = "AM";
      }
      if (document.getElementById('opt_PostServ').checked) {
         ls_TipoServ = "9";
          ls_DesServ = "PSS";
      }
      if (document.getElementById('optAlm').checked){ 
        ls_TipoServ = "11";
         ls_DesServ = "ALM";
      }
      if (document.getElementById('opt_Cent_adv').checked) {
         ls_TipoServ = "9";
         ls_DesServ = "ADV";
      }
     
      //GRABAR SEGUIMIENTO
      
      lb_valid_seg = false;
      
      if ( document.getElementById('opt_Cent_adv').checked ){
      
          switch (document.getElementById('DBDes_snc').value.trim()){
              case "057":
              case "395": 
              case "396": 
              case "447":
              case "542":
              case "541":
              case "555":
                  var lrs_Seguimiento = "SELECT * FROM M_SEGATENCIONES WHERE cod_snc ='" +  document.getElementById('DBDes_snc').value.trim()  + "' AND cod_ate = " +  L_CodAte ;
                  fetch('/modulo/Abre_Detalle/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: lrs_Seguimiento 
                    })
                  }).then(response => response.json())
                    .then(function (lrs_Seguimiento) {
                       if (lrs_Seguimiento.length>0) {
                        alert ("Ya se ha registrado este tipo de seguimiento");
                        return;
                      } 
                       
                    }).catch(error => {
                      console.log(error);
                    });
  
                  if (document.getElementById('DBDes_snc').value.trim() == "555") {
                       P_EMAIL_FICHA_EPIDEMIOLOGICA(L_CodAte);
                       cmdBuscar_Click();
                      return;
                  }
              break;
              case "513":
                var lrs_Seguimiento = "SELECT * FROM M_SEGATENCIONES WHERE cod_snc ='459' AND cod_ate = " + L_CodAte;
                fetch('/modulo/Abre_Detalle/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: lrs_Seguimiento 
                  })
                }).then(response => response.json())
                  .then(function (lrs_Seguimiento) {
                     if (lrs_Seguimiento.length>0) {
                      alert ("Se ha registrado el envio de SMS, no se puede registrar el flag seleccionado");
                      return;
                    }else{
                       fetch('/modulo/Execute/', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          query: "UPDATE t_tmpllamadas set flg_sms_enviado = true where cod_ate = " + L_CodAte
                      
                        })
                      }).then(response => response.json())
                        .then(function (data) {
                            
                      
                        }).catch(error => {
                          console.log(error);
                        }); 
                        
                    } 
                     
                  }).catch(error => {
                    console.log(error);
                  });
                   
              break;
          }
      }
      
      
      var lrs_Seguimientoobj = {};
      lrs_Seguimientoobj.cod_ate = L_CodAte;
      
      if (ll_CodServSeg > 0 && L_CodAte != ll_CodServSeg ){
          //solo codigos de pedido y ambulancia y que no sea la misma atencion
          lrs_Seguimientoobj.cod_ped =  (ll_CodServSeg);
      }else{
          //para los laboratorios
          lrs_Seguimientoobj.cod_caso = ls_CodCaso;
      }
      
      if (document.getElementById('Chck_obs').checked && document.getElementById('DBDes_snc').value.trim() == "395") {
        lrs_Seguimientoobj.obs_ser = Replace(document.getElementById('txt_obs').value, ": FACTURAR :", ": FACTURAR : (S/. " + document.getElementById('Txt_monto') + " Incl. I.G.V.)");
       }else if (document.getElementById('Chck_obs').checked && document.getElementById('DBDes_snc').value == "396" ){
        lrs_Seguimientoobj.obs_ser = Replace(Trim(txt_obs.Text), ": MONTO DE BOLETA :", ": BOLETA : (S/. " + Txt_monto.Text & " Incl. I.G.V.)")
       }else{
        lrs_Seguimientoobj.obs_ser = document.getElementById('txt_obs').value;
       }
      
      
      lrs_Seguimientoobj.cod_ser = ls_TipoServ;
      lrs_Seguimientoobj.des_ser = ls_DesServ;
      lrs_Seguimientoobj.usu_ser = window.opener.document.getElementById('usuario').innerHTML.trim(); 
      lrs_Seguimientoobj.fec_ser =  fechahora().substring(0,10);
      lrs_Seguimientoobj.hra_ser = fechahora().substring(11,18);
      
      if (document.getElementById('Chck_obs').checked){
          if (document.getElementById('DBDes_snc').disabled == false ) {
            lrs_Seguimientoobj.cod_snc = document.getElementById('DBDes_snc').value;
              if (document.getElementById('opt_snc').checked) {
                lrs_Seguimientoobj.snc = "Si";
              }
          }
      }
      
      
      if ( document.getElementById('DBDes_snc').value == "057" ){
        lrs_Seguimientoobj.dias_snc =  document.getElementById('Combo1').value;
      }
      
      if (document.getElementById('DBDes_snc').value.trim() == "395" || document.getElementById('DBDes_snc').value.trim() == "396" ){
          
      var lrs_reg_tarifa= "SELECT * FROM t_tarifa_especial WHERE cod_servicio = " + L_CodAte;
         fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query:lrs_reg_tarifa
        })
      }).then(response => response.json())
        .then(function (data) {
          if (data.length>0){
              lrs_reg_tarifanew.cod_servicio = L_CodAte
              lrs_reg_tarifanew.monto_especial = document.getElementById('Txt_monto').value /  (1 + gsg_IgV);
              lrs_reg_tarifanew.tabla = 't_tarifa_especial';

              fetch('/modulo/Executeinsert/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(lrs_reg_tarifanew)
              }).then(response => response.json())
                .then(function (data) {


              }).catch(error => {
                  console.log(error);
              }); 
          }
      
      
 
        }).catch(error => {
          console.log(error);
        }); 
          
      } 
      if (document.getElementById('DBDes_snc').value.trim() == "396" ){
        lrs_Seguimientoobj.monto =  document.getElementById('Txt_monto').value   ;
      }
      
      lrs_Seguimientoobj.tabla = 'm_segatenciones';
      fetch('/modulo/Executeinsert/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lrs_Seguimientoobj)
      }).then(response => response.json())
        .then(function (data) {


        }).catch(error => {
          console.log(error);
        }); 
       cmdBuscar_Click();
  
  }
  
function fechahora() {
  var d = new Date(),
       month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = '' +d.getHours(),
      minute ='' + d.getMinutes(),
      second = '' +d.getSeconds();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  if (hour.length < 2) 
      hour = '0' + hour;
  if (minute.length < 2) 
      minute = '0' + minute;
  if (second.length < 2) 
      second = '0' + second;
  return [year, month, day].join('-')+' '+[hour, minute, second].join(':');
}
async function  P_EMAIL_FICHA_EPIDEMIOLOGICA(L_CodAte){

  var str_correo_para ;
  var str_cuerpo ;
  var rst_ate;
  
  
   P_GUARDA_SEGUIMIENTO(pAte, "ATE", "MEDICO GENERA FICHA EPIDEMIOLOGICA", "555");
   
   var rst_ate = "select trim(nom_pac) paciente, trim(nom_doc) medico from t_tmpllamadas where cod_ate = " + pAte;
   await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: rst_ate 
    })
  }).then(response => response.json())
    .then(function (rst_ate) {
       if (lrs_Seguimiento.length>0) {
         
          str_cuerpo = "Atención: " + pAte + '\n' + "Paciente: " + rst_ate.paciente + '\n' + "Médico: " + rst_ate.medico;
          str_correo_para = "pamela.ramirez@sanna.pe";
          str_correo_cc = "gustavo.bermudez@sanna.pe, catty.quispe@sanna.pe,drmas.epidemiologia.central@sanna.pe";
          alert("Se enviará correo a los siguientes destinatarios : " + str_correo_para);
          ENVIAR_MAIL("drmas.helpdesk@sanna.pe", "Abc123xyz", "Médico genera ficha epidemiológica - atención N° " + pAte, str_correo_para,str_correo_cc, str_cuerpo);
      
      } 
       
    }).catch(error => {
      console.log(error);
    });

 

}

async function ENVIAR_MAIL(s_User  , s_PassWord  , s_Asunto  , s_to  ,s_cc, s_body  ,   s_Attach ='') {
     
   //if (gs_Nombre_BD == "HIPOCRATES") {
        
       
        await fetch('/modulo/ENVIAR_MAIL/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            s_User: s_User,
            s_PassWord:s_PassWord,
            s_Asunto:s_Asunto,
            s_to:s_to,
            s_cc:str_correo_cc,
            s_body: s_body
          })
        }).then(response => response.json())
          .then(function (data) {
             if (data) {
                
                
            } 
             
          }).catch(error => {
            console.log(error);
          });
          
       
   //}
}
  var Frm_SegSelServ = `<style> 
  </style>
  <div id="ed-modal-contentheaderFrm_SegSelServ"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> Seleccionar</h6><button type="button"  id="cancelarFrm_SegSelServ" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  <div  id="Frm_SegSelServ" style="border:1px solid black;margin-top:2vh">
  <div style="display: block; border: 1px solid green; height: 25vh; overflow-y: scroll">
  <table border=1 id="DataGrid1" >
   <thead   id = "DataGrid1head">
  <tr >
          <th scope="col">Servicio</th>
 
  </tr>
  </thead>
  <tbody  id="DataGrid1body">
   
  </tbody>
  <tfoot></tfoot>
  </table>
  <div style="display:flex;justify-content:space-around	;">
  <input type="button"  class="btn btn btn-success btn-sm "  id="Cmd_Seleccionar" name="Cmd_Seleccionar"    value="Seleccionar">    
  </div>
  </div> `;  
   


function Cmd_Seleccionar_click(){
  
  
   var filas = document.querySelectorAll('#DataGrid1body>tr');
   var fila;
     filas.forEach(element => {
       if(element.style.backgroundColor == "turquoise"){
           fila = element;
           return;
       }
     })
   if(!fila) return;
  document.getElementById('txt_obs').value = fila.cells[0].innerHTML.trim() + " - " +document.getElementById('txt_obs').value;
  document.getElementById('txtCodServSeg').value  = fila.cells[0].innerHTML.trim();
   document.getElementById('cancelarFrm_SegSelServ').click();
  
}

function guardarsnc(){

  //alert('Hola');
  var inc = document.getElementById("Opt_incidencia");
  var ate = document.getElementById("optAte");
  var ped = document.getElementById("optPed");
  var lab = document.getElementById("optLab");
  var amb = document.getElementById("optAmb");
  var adm = document.getElementById("optAdm");
  var af = document.getElementById("optAf");
  var ps = document.getElementById("optPreServ");
  var pst = document.getElementById("opt_PostServ");

  var cod_ser='';
  var des_ser='';
  var cod_ate= document.getElementById("txtCodServ").value;
  var obs_ser = document.getElementById("txt_obs").value;

  if (inc.checked) {
    cod_ser='5';
    des_ser='INC';
    //alert("El radio button " + obs_ser + " está seleccionado.");
  } 

  if (ate.checked) {
    cod_ser='1';
    des_ser='ATE';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  if (ped.checked) {
    cod_ser='2';
    des_ser='PED ';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  if (lab.checked) {
    cod_ser='3';
    des_ser='LAB';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  if (adm.checked) {
    cod_ser='6';
    des_ser='ADM';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  if (af.checked) {
    cod_ser='7';
    des_ser='AF';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  if (ps.checked) {
    cod_ser='9';
    des_ser='PS';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  if (pst.checked) {
    cod_ser='8';
    des_ser='PRS';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  if (amb.checked) {
    cod_ser='4';
    des_ser='AMB';
    //alert("El radio button " + cod_ser + des_ser + " está seleccionado.");
  }

  fetch('/modulo/guardarsnc/',    {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_ser:cod_ser,
      des_ser:des_ser,
      cod_ate:cod_ate,
      obs_ser:obs_ser
    
    })
    
  }) .then(response => response.json())
    .then(function (data) {
       if(data){
     
       }
    }).catch(error => {
      console.log(error);
    }); 

    cmdBuscar_Click();


}




