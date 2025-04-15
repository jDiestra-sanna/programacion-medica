 
        
function tabletoarrayjsonhorarios(table) {
  var data = [];
 var rowData = [];
  // first row needs to be headers
  var headers = [];
   headers.push("cod_ate");
  headers.push("fec_ate");
  headers.push("fecfin");
  headers.push("nom_doc");
  headers.push("des_snc");
  headers.push("des_estado");
  headers.push("area");
  headers.push("usu_creacion");
  headers.push("usu_cierre");
  headers.push("nom_gru");
  headers.push("paciente_vip");
  headers.push("f_clasificacion");
  headers.push("cm_estado");
  headers.push("fecha_incidencia");
  headers.push("hra_ser");
  headers.push("estado_incidencia");
  headers.push("tipo_registro");
  headers.push("tipo_envio");
  headers.push("fecha_cierre_incidencia");
  headers.push("hora_cierre_incidencia");
  headers.push("reclamo");
  headers.push("FUNDADO/INFUNDADO");
 
  // go through cells
  for (var i=0; i<table.length; i++) {
      data.push(Object.values(table[i]));
   }       
 // data.sort(sortFunction);
  data.unshift(headers);
  //data.forEach(function(v){ v.pop();  });

  return data;
}

function tabletoarrayjsonhorariosatenciones(table) {
  var data = [];
 var rowData = [];
  // first row needs to be headers
  var headers = [];
   headers.push("fec_ate");
  headers.push("cm_estado");
  headers.push("cod_ate");
  headers.push("feclla_ate");
  headers.push("horlla_ate");
  headers.push("usuario_crea");
  headers.push("deducible");
  headers.push("coaseguro");
  headers.push("nom_pac");
  headers.push("edad_ate");
  headers.push("sexo_ate");
  headers.push("pac_vip");
  headers.push("cm_tiempo");
  headers.push("hor_ate");
  headers.push("usuoplla_ate");
  headers.push("fecoplla_ate");
  headers.push("horoplla_ate");
  headers.push("calc_llegada");
  headers.push("fecdia_ate");
  headers.push("hordia_ate");
  headers.push("tiempo_cada");
  headers.push("f_prog");
  headers.push("nom_doc");
  headers.push("nom_esp");
  headers.push("nom_gru");
  headers.push("flg_reprogramada");
  headers.push("flgvnr");
  headers.push("nom_clasif");
  headers.push("zona_cm");
  headers.push("zona");
  headers.push("cm_flag_vip");
  headers.push("horasgdr_ate");
  headers.push("fecasgdr_ate");
  headers.push("usuasgdr_ate");
  headers.push("usudia_ate");
  headers.push("flg_ficha");
  headers.push("cod_aut_prestacion");
  headers.push("cod_asegurado");
  headers.push("poliza_asegurado");
  headers.push("tipo_afiliacion");
  headers.push("cod_solgen");
  headers.push("cm_aseg_producto");
  headers.push("num_doc_id");
  headers.push("departamento");
  headers.push("provincia");
  headers.push("distrito");
  headers.push("agendamiento");
  headers.push("subzona");
   
 
  for (var i=0; i<table.length; i++) {
  
      data.push(Object.values(table[i]));
    
   }       
   data.unshift(headers);
 
  return data;
}

function tabletoarrayjsonhorariosmadvnr(table) {
  var data = [];
 var rowData = [];
   
  for (var i=0; i<table.length; i++) {
  
      data.push(Object.values(table[i]));
    
   }       
   
  return data;
}

function tabletoarrayjsonhorariosmadatencion(table) {
  var data = [];
 var rowData = [];
  // first row needs to be headers
  var headers = [];
   headers.push("cod_ate");
  headers.push("cm_estado");
  headers.push("cod_exp");
  headers.push("fec_ate");
  headers.push("nom_pac");
  headers.push("nom_doc");
  headers.push("nom_gru");
  headers.push("titular"); 
  headers.push("fec_pago"); 
  headers.push("deducible"); 
  headers.push("coaseguro"); 
  headers.push("boleta_atencion"); 

 
  for (var i=0; i<table.length; i++) {
  
      data.push(Object.values(table[i]));
    
   }       
   data.unshift(headers);
 
  return data;
}

function tabletoarrayjsonhorariosmadpedido(table) {
  var data = [];
 var rowData = [];
  // first row needs to be headers
  var headers = [];
   headers.push("cod_ate");
  headers.push("pedido");
  headers.push("clasificacion");
  headers.push("cm_estado");
  headers.push("cod_exp");
  headers.push("fec_ate");
  headers.push("nom_pac");
  headers.push("nom_doc"); 
  headers.push("nom_gru"); 
  headers.push("titular"); 
  headers.push("f_pago"); 
  headers.push("deducible"); 
  headers.push("coa_porcentaje"); 
  headers.push("coaseguro_ped"); 
  headers.push("boleta_ped"); 

 
  for (var i=0; i<table.length; i++) {
  
      data.push(Object.values(table[i]));
    
   }       
   data.unshift(headers);
 
  return data;
}
window.generarreporteatenciones = function (){

  var fecinicio= document.getElementById('fecinicio').value;
  var fecfinal= document.getElementById('fecfinal').value;
  var porfechas= document.getElementsByName('fechas');
  var porfecha;
  for(i = 0; i < porfechas.length; i++) { 
    if(porfechas[i].checked) 
     porfecha =  porfechas[i].value; 
} 
  document.body.style.cursor = "progress";
  
   fetch('/atencioncliente/generarreporteatenciones', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
      
      }  ,
      body: JSON.stringify({
        fecinicio: fecinicio,
        fecfinal:fecfinal,
        porfecha:porfecha
       })
    }).then(response => response.arrayBuffer())
    .then(  async function(data) {
      document.body.style.cursor = "default";
     
      var enc = new TextDecoder("utf-8");
      var int8view = new Uint8Array(data); 
            var data1 = enc.decode(int8view);
            data1 = data1.slice(3).slice(0,-2) ;
            var myArray = data1.split("],[");     
            var final  = myArray.map((a)=>a.slice(1).slice(0,-1).split('","'));
      
      
       var wb = XLSX.utils.book_new();
 
      wb.Props = {
                      Title: "ATENCIONES",
                      Subject: "ATENCIONES",
                      Author: "SUPERVISOR",
                      CreatedDate: new Date()
              };
      wb.SheetNames.push("Worksheet");
      wb.SheetNames.push("Worksheet2");
      wb.SheetNames.push("Worksheet3");

      //tab = document.getElementById('tabla1'); // id of table
       
       // var ws_data = tabletoarrayjsonhorariosatenciones( data);  //a row with 2 columns
        var ws_data =  final;  //a row with 2 columns

      var ws =   XLSX.utils.aoa_to_sheet(ws_data.slice(0,150000));
      var ws2 =    XLSX.utils.aoa_to_sheet(ws_data.slice(150000,300000));
      var ws3 =    XLSX.utils.aoa_to_sheet(ws_data.slice(300000,450000));
      
      wb.Sheets["Worksheet"] = ws;
      wb.Sheets["Worksheet2"] = ws2;
      wb.Sheets["Worksheet3"] = ws3;
 
      var wbout = XLSX.write(wb, {bookType:'xlsx',  bookSST:true, type: "binary",compression:true});
             saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'ATENCIONES.xlsx');
       
       
      
     }).catch(error => {
       console.log(error);    
       document.body.style.cursor = "default";
  alert('Sucedio un error');
    }); 
   


     
  }  
  
  function s2ab(s) {   
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
  }
  window.generarreportemadvnr = function(){

    var fecinicio= document.getElementById('fecinicio').value;
    var fecfinal= document.getElementById('fecfinal').value;
    
    document.body.style.cursor = "progress";
    
      fetch('/atencioncliente/generarreportemadvnr', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }  ,
        body: JSON.stringify({
          fecinicio: fecinicio,
          fecfinal:fecfinal
         })
      }).then(response => response.json())
      .then(function(data) {
        document.body.style.cursor = "default";
        
        var wb = XLSX.utils.book_new();
        wb.Props = {
                        Title: "MAD_VNR",
                        Subject: "MAD_VNR",
                        Author: "SUPERVISOR",
                        CreatedDate: new Date()
                };
        wb.SheetNames.push("VNRs_mad");
        //tab = document.getElementById('tabla1'); // id of table
         
        var ws_data = tabletoarrayjsonhorariosmadvnr( data);  //a row with 2 columns
        
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets["VNRs_mad"] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
               saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'VNRs_mad.xlsx');
        
        
        
       }).catch(error => {
         console.log(error);    
         document.body.style.cursor = "default";
    alert('Sucedio un error');
      });
     
       
    }  
    
  window.generarreportemadatencion = function(){

    var fecinicio= document.getElementById('fecinicio').value;
    var fecfinal= document.getElementById('fecfinal').value;
    
    document.body.style.cursor = "progress";
    
      fetch('/atencioncliente/generarreportemadatencion', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }  ,
        body: JSON.stringify({
          fecinicio: fecinicio,
          fecfinal:fecfinal
         })
      }).then(response => response.json())
      .then(function(data) {
        document.body.style.cursor = "default";
        
        var wb = XLSX.utils.book_new();
        wb.Props = {
                        Title: "MAD_ATENCION",
                        Subject: "MAD_ATENCION",
                        Author: "SUPERVISOR",
                        CreatedDate: new Date()
                };
        wb.SheetNames.push("VNRs_mad");
        //tab = document.getElementById('tabla1'); // id of table
         
          var ws_data = tabletoarrayjsonhorariosmadatencion( data);  //a row with 2 columns
        
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets["VNRs_mad"] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
               saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'MAD_atenciones.xlsx');
        
        
        
       }).catch(error => {
         console.log(error);    
         document.body.style.cursor = "default";
    alert('Sucedio un error');
      });
     
       
    }  
    
  window.generarreportemadpedido = function(){

    var fecinicio= document.getElementById('fecinicio').value;
    var fecfinal= document.getElementById('fecfinal').value;
    
    document.body.style.cursor = "progress";
    
      fetch('/atencioncliente/generarreportemadpedido', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }  ,
        body: JSON.stringify({
          fecinicio: fecinicio,
          fecfinal:fecfinal
         })
      }).then(response => response.json())
      .then(function(data) {
        document.body.style.cursor = "default";
        
        var wb = XLSX.utils.book_new();
        wb.Props = {
                        Title: "MAD_PEDIDOS",
                        Subject: "MAD_PEDIDOS",
                        Author: "SUPERVISOR",
                        CreatedDate: new Date()
                };
        wb.SheetNames.push("VNRs_mad");
        //tab = document.getElementById('tabla1'); // id of table
         
          var ws_data = tabletoarrayjsonhorariosmadpedido( data);  //a row with 2 columns
        
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets["VNRs_mad"] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
               saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'MAD_pedidos.xlsx');
        
        
        
       }).catch(error => {
         console.log(error);    
         document.body.style.cursor = "default";
    alert('Sucedio un error');
      });
     
       
    }  

    function cleanString(input) {
      var output = "";
      output = input.replace(String.fromCharCode(209),"O");
      
      return output;
  }
function generarreporte(){

var fecinicio= document.getElementById('fecinicio').value;
var fecfinal= document.getElementById('fecfinal').value;

document.body.style.cursor = "progress";

 fetch('/atencioncliente/generarreporte', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }  ,
    body: JSON.stringify({
      fecinicio: fecinicio,
      fecfinal:fecfinal
     })
  }).then(response => response.arrayBuffer())
  .then(function(data) {
    document.body.style.cursor = "default";
    
     var enc = new TextDecoder();
     var int8view = new Uint8Array(data); 
           var data1 =  enc.decode(int8view);
          
           data1 = data1.slice(3).slice(0,-2) ;
           
           var myArray = data1.split("],[");     
           var final  = myArray.map((a)=>(a.slice(1).slice(0,-1)).split('","'));
      
    var wb = XLSX.utils.book_new();
    wb.Props = {
                    Title: "INCIDENCIA",
                    Subject: "INCIDENCIA",
                    Author: "SUPERVISOR",
                    CreatedDate: new Date()
            };
    wb.SheetNames.push("Worksheet");
    //tab = document.getElementById('tabla1'); // id of table
     
      var ws_data = final;  //a row with 2 columns
    
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Worksheet"] = ws;
    
    //var wbout = XLSX.write(wb, {bookType:'xlsx',bookSST:false,  type: 'binary'});
           //saveAs(new Blob([s2ab(wbout)],{type:"application/octet-binary;"}), 'incidencias.xlsx');
           var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx',bookSST:false,  type: 'binary'}))],{encoding:"UTF-8",type: 'text/csv; charset=utf-8'});
           var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL (blob); // Создать ссылку для скачивания
           downloadElement.href = href;
                    downloadElement.download = 'incidencias.xlsx'; // Имя файла после загрузки
           document.body.appendChild(downloadElement);
                    downloadElement.click (); // нажмите, чтобы загрузить
                    document.body.removeChild (downloadElement); // Удалить элемент после загрузки
    
    
   }).catch(error => {
     console.log(error);    
     document.body.style.cursor = "default";
alert('Sucedio un error');
  });
 
   
}  





function modalseguimiento(){

 
  var cod_ate = document.getElementById('cod_ate').value;
  //Pvienede = "FRMSERVICIOLABORATORIO"

  
myWindow = window.open("", "_blank", "toolbar=no,menubar=no,top=500,left=500,width=40%,height=400");
myWindow.document.write(` <!-- HTTP 1.1 -->
<meta http-equiv="Cache-Control" content="no-store"/>
<!-- HTTP 1.0 -->
<meta http-equiv="Pragma" content="no-cache"/>
<!-- Prevents caching at the Proxy Server -->
<meta http-equiv="Expires" content="0"/>
<head>
<link href="${window.location.protocol+'//'+window.location.host}/asstes/css/sb-admin-2-laboratorio.min.css" rel="stylesheet">
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

  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
  }
  .form-group label {
    margin-right: 1em;
  }
  .form-group .checkboxes {
    display: flex;
    flex-direction: column;
  }


</style>
</head>
<body>
<div   style="display:flex; flex-direction: column; height:100%">
<div   style="display:flex; flex-direction: row;" width:20vh >
       
      <fieldset style="display:flex;justify-content:content-around	;"  >
      <legend>Buscar</legend>
        <div>
        <input type="text" id="txtCodServ" name = "txtCodServ" style="color:red;font-weight:bold"; readonly value="${cod_ate}"><br>
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
        <label >Estado: </label>
        <select  style="flex-grow:1;" id="cb_estado" onchange="cambio_estadoincidencia(this.value);" name="cb_estado"> 
        <option value="0">Seleccione</option>
          <option value="1">INCIDENCIA</option>
          <option value="2">DERIVADO</option>
          <option value="3">MEDIDA TOMADA</option>
          <option value="4">SEGUIMIENTO</option>
          <option value="5">CERRADO</option>

        </select>
    </div>

    <div style="display:flex;justify-content:space-evenly	;" id= "desc">
      <label id=lb_desc hidden>Descripcion: </label>
      <select  style="flex-grow:1;" id="DBDes_snc" name="DBDes_snc" onClick="cambio_desc()" hidden> 
      </select>      
    </div>

      <div class="checkboxes" id="checkopt" hidden>
        <label><input type="radio" name="op" id ="op_adm"> Administrativo</label></br>
        <label><input type="radio" name="op" id="op_am"> Acto medico</label></br>
        <label><input type="radio" name="op" id="op_ps"> PostServicio</label></br>
      </div>

      <div id="cbopt" hidden>
      <label >Solución Incidencia: </label>
      <select  style="flex-grow:1;" id="cb_inc" > 
        <option value="0">Seleccione</option>
        <option value="F" id="opt_fun">FUNDADO</option>
        <option value="I" id="opt_inf">INFUNDADO</option>
        <option value="S" id="opt_sol">SOLICITUD</option>
      </select>

      <label >Fecha Finalización: </label>
      <input type="datetime-local" id="fecha_fin" name="fecha-hora"> 
      </div>



<div   style="display:flex;align-items: center;" width:20vh >
    <textarea id="txt_obs" name="txt_obs" cols = "90" rows="4" ></textarea>
    <input type="button"  class="btn btn btn-success btn-sm " onclick ="reemplazar();"  id="CmdGrabar" name="CmdGrabar" value="Reemplazar"> 
    <input type="button"  class="btn btn btn-danger btn-sm " onclick ="quitar();"  id="CmdQuitar" name="CmdQuitar" value="Quitar"> 

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
<script src="${window.location.protocol+'//'+window.location.host}/assets/js/dashboard/show_seguimiento_incidencia.js"></script>`);
if (myWindow.document) {
  myWindow.document.title = "Seguimiento de Servicios";
}
myWindow.addEventListener("resize", function(){
   
  myWindow.resizeTo(800, 900); 
});
 //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
myWindow.focus(); 
myWindow.document.getElementById('optAtencion').checked = true ;

 
 }

 
 