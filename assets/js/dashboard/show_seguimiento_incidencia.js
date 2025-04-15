 

(function(){ 
  buscarseguimiento();
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
 
function modalseguimiento(){

  var fila = document.querySelector('.selected');
  if(!fila) return;
  var cod_serv_laboratorio = fila.cells[4].innerHTML.trim();
  //Pvienede = "FRMSERVICIOLABORATORIO"

  
myWindow = window.open("", "_blank", "toolbar=no,menubar=no,top=500,left=500,width=40%,height=400");
myWindow.document.write(` 
<div   style="display:flex; flex-direction: column; height:100%">
<div   style="display:flex; flex-direction: row;" width:20vh >
       
      <fieldset style="display:flex;justify-content:content-around	;" id="datos_motorizado">
      <legend>Buscar</legend>
        <div>
        <input type="text" id="txtCodServ" name = "txtCodServ" style="color:red;font-weight:bold"; readonly value="${cod_serv_laboratorio}"><br>
        <input type="button"  class="btn btn btn-success btn-sm "  id="CmdBuscar" name="CmdBuscar" value="Buscar" onclick="buscarseguimiento();"> 
        </div>
        <div>
        <input type="radio" id="optAtencion" name="Opciones" value="optAtencion">
        <label for="optAtencion">Atencion</label><br>
        <input type="radio" id="optPedido" name="Opciones" value="optPedido">
        <label for="optPedido">Pedido</label><br>
        <input type="radio" id="optLaboratorio" name="Opciones" value="optLaboratorio">
        <label for="optLaboratorio">Laboratorio</label><br>
        <input type="radio" id="OptAmbulancia" name="Opciones" value="OptAmbulancia">
        <label for="OptAmbulancia">Ambulancia</label>
        </div>
        </fieldset>
         
      
      <fieldset  style="display:flex;justify-content:content-around	;"  id="datos_motorizado">
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
      <input type="radio" disabled id="Opt_registros" onclick="S_MOSTRAR_REGISTRO_SNC('REGISTRO' );" name="Opt_observaciones" value="Opt_registros">
      <label for="Opt_registros">Registros</label>
      <input type="radio" disabled id="Opt_snc" onclick="S_MOSTRAR_REGISTRO_SNC('SNC');" name="Opt_observaciones" value="Opt_snc">
      <label for="Opt_snc">SNC</label><br>
    </div>
    <div style="display:flex;justify-content:space-evenly	;">
      <label >Descripcion: </label>
      <select  style="flex-grow:1;" id="DBDes_snc" name="DBDes_snc"  > 
      </select>
    </div>
    <div style="position: absolute; top: 10px; right: 10px;">
  
</div>
<div   style="display:flex;align-items: center;" width:20vh >
    <textarea id="txt_obs" name="txt_obs" cols = "90" rows="4" ></textarea>
    <input type="button"  class="btn btn btn-success btn-sm "  id="CmdGrabar" name="CmdGrabar" value="Guardar"> 

</div>

<div  style = "height:50vh;  border: 1px solid blue; overflow-y:scroll;">
<table id="table_seguimiento">
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
   </table></div>
<div   style="display:flex;justify-content:space-around	;">
<input type="button"  class="btn btn btn-success btn-sm "  id="btn_cambiarproveedorlaboratorio" name="btn_cambiarproveedorlaboratorio" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cancelar"> 
</div>
</div>
 `);
if (myWindow.document) {
  myWindow.document.title = "Seguimiento de Servicios";
}
myWindow.addEventListener("resize", function(){
  
  
  myWindow.resizeTo(800, 900); 
});
 //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
myWindow.focus(); 
myWindow.document.getElementById('optLab').checked = true ;

myWindow.document.buscarseguimiento();

 } 
 
function buscarseguimiento(){
   

  if  (  document.getElementById("txtCodServ").value=='') {
     return;
  }

   //document.getElementById("txt_obs").value='';
   var ls_Ant_cod_snc = "";
   var L_CodAte = 0 ;
 //Txt_monto.Text = ""
/* Call Abre_Detalle(AdataSNC, "select * from m_servnoconforme where 1 = 2") */
  Busca_Servicio(  document.getElementById("txtCodServ").value );
//Call Abre_Detalle(AdataSeg, G_sql)
S_MOSTRAR_REGISTRO_SNC('REGISTRO' );
 }

function cambio_obs(){
  if  ( document.getElementById("Chck_obs").checked) {
    document.getElementById("Opt_registros").disabled = false;
    document.getElementById("Opt_snc").disabled = false;
 }else{
  document.getElementById("Opt_registros").disabled = true;
  document.getElementById("Opt_snc").disabled = true;
  document.getElementById("Opt_registros").checked = false;
    document.getElementById("Opt_snc").checked = false;
 }

}

function reemplazar(){
  var tbody = document.getElementById("t_seguimiento"),fila;
  for(var i=0;i<tbody.rows.length;i++){
     if(tbody.rows[i].style.backgroundColor=='turquoise'){
       fila=tbody.rows[i];
      break;
     }
  }
   if(!fila) {
    alert('seleccionar');
    return;
  }
  var txt_obs = document.getElementById("txt_obs").value;
  var estado = document.getElementById("cb_estado");

  var DBDes_snc =  document.getElementById("DBDes_snc");
  //fila.cells[2].innerHTML = ':'+estado.options[estado.selectedIndex].text +': '+ DBDes_snc.options[DBDes_snc.selectedIndex].text+' :';

  var txtCodServ= document.getElementById("txtCodServ").value;
  var op_adm = document.getElementById("op_adm");
  var op_am = document.getElementById("op_am");
  var op_ps = document.getElementById("op_ps");
  var tipo_registro; 

  if(op_adm.checked == true){
    tipo_registro = 'A';
  }
  else if (op_am.checked == true){
    tipo_registro = 'M';
  }
  else if (op_ps.checked == true){
    tipo_registro = 'P';
  }
  else{
    tipo_registro = '';
  }

  var cb_inc = document.getElementById("cb_inc");
  var reclamo;
  var fecha_fin;  

  if (estado.options[estado.selectedIndex].text =='CERRADO'){
    //alert('CERRADO '+fecha_fin);
    fecha_fin = document.getElementById("fecha_fin").value.replace('T', ' ');  
  }else if(estado.options[estado.selectedIndex].text =='INCIDENCIA'){
    //alert('INCIDENCIA');
    fecha_fin = 'NO APLICA';
    reclamo = '';
  }else{
    //alert('DEL MONTON');
    tipo_registro = ''
    fecha_fin = 'NO APLICA';
    reclamo = '';
  }

  if(cb_inc.options[cb_inc.selectedIndex].value == 'F'){
    reclamo = 'F';
  }
  else if(cb_inc.options[cb_inc.selectedIndex].value == 'I'){
    reclamo = 'I';
  }
  else{
    reclamo = 'S';
  }
   
   fetch('/atencioncliente/actualizarseguimiento/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      obs_ser:  txt_obs,
      txtCodServ:txtCodServ,
      cod_snc: document.getElementById("DBDes_snc").value,
      fec_ser:  fila.cells[4].innerHTML,
      hra_ser:  fila.cells[5].innerHTML,
      tipo_registro:  tipo_registro,
      reclamo: reclamo,
      fecha_fin: fecha_fin
    })
  }).then(response => response.json())
  .then(function(data) {
    var html = '';
    var i;
    if(data ){
      //alert(fecha_fin);
      //alert('actualizado');
      buscarseguimiento();
    }else{
      alert('No se actualizo');
    }
     
     
   }).catch(error => {
    console.log(error);    
  });    
}



function quitar(){
  var tbody = document.getElementById("t_seguimiento"),fila;
  for(var i=0;i<tbody.rows.length;i++){
     if(tbody.rows[i].style.backgroundColor=='turquoise'){
       fila=tbody.rows[i];
      break;
     }
  }
   if(!fila) {
    alert('seleccionar');
    return;
  }
 var txtCodServ= document.getElementById("txtCodServ").value;
   fetch('/atencioncliente/quitarseguimiento/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       txtCodServ:txtCodServ,
       fec_ser:  fila.cells[4].innerHTML,
      hra_ser:  fila.cells[5].innerHTML
    })
  }).then(response => response.json())
  .then(function(data) {
    var html = '';
    var i;
    if(data ){
      //alert('retirado');
      buscarseguimiento();  
    }else{
      alert('No se retirado');
    }
     
     
   }).catch(error => {
    console.log(error);    
  });   
    
}

function cambio_estadoincidencia(estado){

//var nuevaOpcion = document.createElement("txt_obs");
//nuevaOpcion.value = 1; // Asigna el valor de la opción
//nuevaOpcion.text = "Seleccione..."; // Asigna el texto de la opción

  if (estado === "0"){
    document.getElementById("txt_obs").value = '';  
    document.getElementById("desc").hidden = true;
    document.getElementById("lb_desc").hidden = true;
    document.getElementById("DBDes_snc").hidden = true;
    document.getElementById("checkopt").hidden = true;
    document.getElementById("cbopt").hidden = true;

  }
  else if (estado === "1"){
    document.getElementById("txt_obs").value = ':INCIDENCIA:  :';
    document.getElementById("desc").hidden = false;
    document.getElementById("lb_desc").hidden = false;
    document.getElementById("DBDes_snc").hidden = false;
    document.getElementById("checkopt").hidden = false;
    document.getElementById("cbopt").hidden = true;  

  }
  else if (estado === "2"){
    document.getElementById("txt_obs").value = ':DERIVADO:  :';
    document.getElementById("desc").hidden = false;
    document.getElementById("lb_desc").hidden = false;
    document.getElementById("DBDes_snc").hidden = false;

    document.getElementById("checkopt").hidden = true;
    document.getElementById("cbopt").hidden = true;  
  }
  else if (estado === "3"){
    document.getElementById("txt_obs").value = ':MEDIDA TOMADA:  :';
    document.getElementById("desc").hidden = true;
    document.getElementById("lb_desc").hidden = true;
    document.getElementById("DBDes_snc").hidden = true;

    document.getElementById("checkopt").hidden = true;
    document.getElementById("cbopt").hidden = true;
  }
  else if (estado === "4"){
    document.getElementById("txt_obs").value = ':SEGUIMIENTO:  :';  
    document.getElementById("desc").hidden = true;
    document.getElementById("lb_desc").hidden = true;
    document.getElementById("DBDes_snc").hidden = true;

    document.getElementById("checkopt").hidden = true;
    document.getElementById("cbopt").hidden = true;
  }
  else{
    document.getElementById("txt_obs").value = ':CERRADO:  :';  
    document.getElementById("desc").hidden = false;
    document.getElementById("lb_desc").hidden = false;
    document.getElementById("DBDes_snc").hidden = false;

    document.getElementById("checkopt").hidden = false;
    document.getElementById("cbopt").hidden = false;
  }



  if (estado != "0"){
  fetch('/atencioncliente/AdataSNC/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      estado:  estado   
    })
  }).then(response => response.json())
  .then(function(data) {
    var html = '';

    if(data.length == 0){
      document.getElementById("DBDes_snc").disabled = true;
      
    }else{
      const names = data.map(snc => `<option value="${snc.cod_snc}">${snc.des_snc}</option>`).join("\n");
      document.getElementById("DBDes_snc").disabled = false;
      document.getElementById("DBDes_snc").innerHTML = names;
    }
    //document.getElementById("txt_obs").value= document.getElementById("txt_obs").value + DBDes_snc.options[DBDes_snc.selectedIndex].text+' :';

     
   }).catch(error => {
    console.log(error);    
  });    
}

}

function cambio_desc(){

  var estado = document.getElementById("cb_estado");

  if (estado.options[estado.selectedIndex].text =='INCIDENCIA'){
    document.getElementById("txt_obs").value = ':INCIDENCIA:  :' + DBDes_snc.options[DBDes_snc.selectedIndex].text+' :';
  }
  else if (estado.options[estado.selectedIndex].text =='DERIVADO'){
    document.getElementById("txt_obs").value = ':DERIVADO:  :' + DBDes_snc.options[DBDes_snc.selectedIndex].text+' :';
  }
  else if (estado === "3"){
    document.getElementById("txt_obs").value = ':MEDIDA TOMADA:  :'+ DBDes_snc.options[DBDes_snc.selectedIndex].text+' :';
  }
  else if (estado === "4"){
    document.getElementById("txt_obs").value = ':SEGUIMIENTO:  :'+ DBDes_snc.options[DBDes_snc.selectedIndex].text+' :';  
  }
  else{
    document.getElementById("txt_obs").value = ':CERRADO:  :'+ DBDes_snc.options[DBDes_snc.selectedIndex].text+' :'; 
  }
  //document.getElementById("txt_obs").value= document.getElementById("txt_obs").value + '';
}

function S_MOSTRAR_REGISTRO_SNC( s_tipo_seg){

  var  sqlq = "";
  document.getElementById("txt_obs").disabled = false;
  document.getElementById("CmdBuscar").focus();
   
  if (s_tipo_seg == "REGISTRO"){
  s_tipo_seg = " AND tipo_seg = 'REGISTRO' "
  }else if (s_tipo_seg == "DERIVADO"){
    s_tipo_seg = " AND tipo_seg = 'DERIVADO' "
  }else if (s_tipo_seg == "INCIDENCIA"){
    s_tipo_seg = " AND tipo_seg = 'INCIDENCIA' "
  }else if (s_tipo_seg == "CERRADO"){
    s_tipo_seg = " AND tipo_seg = 'CERRADO' "
  }else{
  s_tipo_seg = " AND tipo_seg = 'SNC' "
  }

     document.getElementById("DBDes_snc").disabled = false;
            if ( document.getElementById("Opt_incidencia").checked ){
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
            }else if  (document.getElementById("Opt_Cent_adv").checked  ){
                sqlq = "select * from m_servnoconforme where tip_serv in ('Adv', 'Cnt') and activi = '1' ";
            }else if  (document.getElementById("Opt_DrOnline").checked  ){
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
                document.getElementById("DBDes_snc").innerHTML = names;
              }
               
               
             }).catch(error => {
              console.log(error);    
            });         
     


 }


   function Busca_Servicio(ll_CodServ){
   
 var sqll_serv = "",querylrs_Servicio="",queryalterno="",tipo_amb="";
 var L_CodAte;
 if (document.getElementById("optAtencion").checked == true) {
     querylrs_Servicio = "SELECT cod_ate, nom_pac, cod_emp, nom_gru, feclla_ate as fec_creacion, cm_estado, cod_gru FROM t_tmpllamadas WHERE (tipo_servicio in ('ATE', 'DRONL') OR tipo_servicio is Null) AND cod_ate = " + ll_CodServ;
 }else if (document.getElementById("optPedido").checked  == true) {
     querylrs_Servicio = "SELECT cod_ate, cod_ped, nom_pac, cod_emp, nom_gru, FECLLA_PED as fec_creacion, estado, cod_gru FROM t_tmppedidomed WHERE cod_ped = " +ll_CodServ;
 }else if (document.getElementById("optLaboratorio").checked == true ){
    querylrs_Servicio =  "select  a.cod_ate, a.cod_serv_laboratorio as cod_atelab, a.nom_pac, b.nom_gru, fecha_creacion as fec_creacion, a.estado, a.cod_gru FROM t_cab_lab_serv_laboratorio a left join m_grupos b on a.cod_gru=b.cod_gru WHERE cod_serv_laboratorio = " + ll_CodServ;
    queryalterno =  "SELECT cod_ate, cod_atelab, nom_pac, cod_emp, nom_gru, fec_ate as fec_creacion, estado, cod_gru FROM t_tmplaboratorios WHERE cod_atelab = " + ll_CodServ;
    
     
 }else if (document.getElementById("OptAmbulancia").checked == true) {
     tipo_amb = ""
     querylrs_Servicio = "SELECT cod_ate, nom_pac, cod_emp, nom_gru, feclla_ate as fec_creacion, cm_estado, cod_gru FROM t_tmpllamadas WHERE tipo_servicio = 'AMB' AND cod_ate = " + ll_CodServ;
     queryalterno ="SELECT a.cod_ate, a.cod_ambx, a.nom_pac, a.cod_emp, b.nom_gru, a.FECLLA_AMB as fec_creacion, a.estado, a.cod_gru FROM t_tmpambulancias as a, m_grupos as b WHERE a.cod_gru = b.cod_gru and a.cod_ambx = " + ll_CodServ;
      
 }
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
      document.getElementById("optAte").disabled = true;
      document.getElementById("optPed").disabled = true;
      document.getElementById("optLab").disabled = true;
      document.getElementById("optAmb").disabled = true;
      
 
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
   
}else if (document.getElementById("OptAmbulancia").checked == true )   {
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
}else if (document.getElementById("OptAmbulancia").checked == true) {
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
    
fetch('/gestionlaboratorio/AdataSeg/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: G_sql 

  })
}).then(response => response.json())
.then(function(data) {
  var html = '';
  var i;
  
  for(i=0; i<data.length; i++){
   
    
    html +=  '<tr onclick="filatabla(this,\'t_seguimiento\');"><td>'+data[i].des_ser +'</td>'+
        '<td >'+(data[i].snc==null?'':data[i].snc)  + '</td>'+
        '<td>'+data[i].obs_ser+'</td>'+
        '<td>'+data[i].usu_ser+'</td>'+
        '<td>'+data[i].fec_ser+'</td>'+
        '<td>'+data[i].hra_ser+'</td>'+
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

function filatabla(p,tabla) {
  var table = document.getElementById(tabla);

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