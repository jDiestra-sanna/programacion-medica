import { getusuario ,Executeinsert,Executeinserttablet,permite_ingreso } from "./module.js"; 
window.buscarate = function(){

var codate= document.getElementById('codate').value;
 
    
  fetch('/dronline/get_cies10', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }  ,
    body: JSON.stringify({
      codate: codate
     })
  }).then(response => response.json())
  .then(function(data) {
    var html = '';
    var i;
    for(i=0; i<data.length; i++){
     
      
      html +=  '<tr> '+
          '<td style = "text-align: center;  border: 1px solid black; " >'+data[i].cod_ate + '</td>'+
            '<td style = "text-align: center;   border: 1px solid black;"><input style="text-transform: uppercase;" type="text" value="'+data[i].cod_dia+'"/></td>'+
           '<td style = "text-align: center;  border: 1px solid black;"><input type="checkbox" '+((data[i].flag_diaprinc=='t')?'checked':'')+'/></td>'+  
           '<td style = "text-align: center;  border: 1px solid black;"><input onclick ="actualizarcie10(this);" type ="button" id="actualizarcie10" name="actualizarcie10" value="Actualizar"></td>'+ 
           '<td style = "display:none"><input type = "text" value="'+data[i].cod_dia+'"/></td>'+

        //  '<td>'+(data.result[i].hora_coordinada?data.result[i].hora_coordinada:'')+'</td>'+ 
  
          '</tr>';
    }
   
          $('#tablacie10smbody').html(html);
       
   }).catch(error => {
    alert(error);  
    console.log(error);    

  });


  fetch('/dronline/get_cies10_tablet', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }  ,
    body: JSON.stringify({
      codate: codate
     })
  }).then(response => response.json())
  .then(function(data) {
    var html = '';
    var i;
    for(i=0; i<data.length; i++){
     
      
      html +=  '<tr>'+
          '<td style = "text-align: center; border: 1px solid black; ">'+data[i].cod_atencion + '</td>'+
          '<td style = "text-align: center;  border: 1px solid black;"><input style="text-transform: uppercase;" type = "text" value="'+data[i].cod_diagnostico+'"/></td>'+
          '<td style = "text-align: center; border: 1px solid black; "><input type = "checkbox" '+(data[i].principal == 1?'checked':'')+'/></td>'+
          '<td style = "text-align: center;  border: 1px solid black;"><input onclick ="actualizarcie10tablet(this);" type ="button" id="actualizarcie10tablet" name="actualizarcie10tablet" value="Actualizar"></td>'+ 
          '<td style = "display:none"><input type = "text" value="'+data[i].cod_diagnostico+'"/></td>'+

          '</tr>';
    }
   
          $('#tablacie10tabletbody').html(html);
       
   }).catch(error => {
    alert(error);  
    console.log(error);    

  });


}  

window.actualizarcie10 = function (val){
   var codate= val.parentElement.parentElement.cells[0].innerHTML;
   var cod_diagnostico= val.parentElement.parentElement.cells[1].children[0].value;
   var principal= val.parentElement.parentElement.cells[2].children[0].checked;
   var cod_diagnosticoant= val.parentElement.parentElement.cells[4].children[0].value;

  fetch('/dronline/actualizarcie10', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }  ,
    body: JSON.stringify({
      codate: codate,
      cod_diagnostico:cod_diagnostico.trim(),
      principal:principal.toString(),
      cod_diagnosticoant:cod_diagnosticoant.trim()
     })
  }).then(response => response.json())
  .then(function(data) {
    
     alert('actualizado');
       
   }).catch(error => {
    alert(error);  
    console.log(error);    

  });



}
window.actualizarcie10tablet = function(val){
  var codate= val.parentElement.parentElement.cells[0].innerHTML;
  var cod_diagnostico= val.parentElement.parentElement.cells[1].children[0].value;
  var principal= val.parentElement.parentElement.cells[2].children[0].checked;
  var cod_diagnosticoant= val.parentElement.parentElement.cells[4].children[0].value;

 fetch('/dronline/actualizarcie10tablet', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
     codate: codate,
     cod_diagnostico:cod_diagnostico.trim(),
     principal:principal?1:0 ,
     cod_diagnosticoant:cod_diagnosticoant
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('actualizado');
      
  }).catch(error => {
   alert(error);  
   console.log(error);    

 });



}
window.agregarciesm = function(){

  var table = document.getElementById("tablacie10smbody");

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
cell3.style.textAlign = "center";
 
// Add some text to the new cells:
cell1.innerHTML = document.getElementById('codate').value;
cell2.innerHTML = '<input type ="text" >';
cell3.innerHTML = '<input type ="checkbox" >';
cell4.innerHTML = '<input onclick = "insertarcie10(this);" type ="button" value ="Insertar">';

}
window.agregarcietablet = function(){

  var table = document.getElementById("tablacie10tabletbody");

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
cell3.style.textAlign = "center";
 
// Add some text to the new cells:
cell1.innerHTML = document.getElementById('codate').value;
cell2.innerHTML = '<input type ="text" >';
cell3.innerHTML = '<input type ="checkbox" >';
cell4.innerHTML = '<input onclick = "insertarcie10tablet(this);" type ="button" value ="Insertar">';

}


window.insertarcie10tablet = function(val){
  var codate= val.parentElement.parentElement.cells[0].innerHTML;
  var cod_diagnostico= val.parentElement.parentElement.cells[1].children[0].value;
  var principal= val.parentElement.parentElement.cells[2].children[0].checked;

 fetch('/dronline/insertarcie10tablet', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
     codate: codate,
     cod_diagnostico:cod_diagnostico.trim(),
     principal:principal?1:0 
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('insertado');
    document.getElementById("busqueda").click();
  }).catch(error => {
   alert(error);  
   console.log(error);    

 });



}
window.insertarcie10 = function(val){
  var codate= val.parentElement.parentElement.cells[0].innerHTML;
  var cod_diagnostico= val.parentElement.parentElement.cells[1].children[0].value;
  var principal= val.parentElement.parentElement.cells[2].children[0].checked;

 fetch('/dronline/insertarcie10', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
     codate: codate,
     cod_diagnostico:cod_diagnostico.trim(),
     principal:principal?'true':'false' 
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('insertado');
    document.getElementById("busqueda").click();
  }).catch(error => {
   alert(error);  
   console.log(error);    

 });



}

window.actualizarsiteds = function(){
  var codsiteds= document.getElementById('codsiteds').value;
  var codautorizacion= document.getElementById('codautorizacion').value;

  
  var r = confirm("¿Desea actualizar el codigo "+ document.getElementById('codautorizacion').value +" para la atencion "+codsiteds);
  if (r == true) {
  }else{
    return;
  }
 fetch('/dronline/actualizarsiteds', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codsiteds: codsiteds ,
    codautorizacion: codautorizacion 

    })
 }).then(response => response.json())
 .then(function(data) {
    if(data==true){
		alert('actualizado');
	}else{
		alert('Este codigo no ha sido generado por nuestro sistema');
	}
    
   }).catch(error => {
   alert(error);  
   console.log(error);    

 });

 
}

window.actualizarmed = function(){
  var codatemed= document.getElementById('codatemed').value;
  var medico= document.getElementById('medico').value;

  
  var r = confirm("¿Desea cambiar el doctor "+document.getElementById('medico').options[document.getElementById('medico').selectedIndex].text+ " para la atencion "+codatemed);
  if (r == true) {
  }else{
    return;
  }
 fetch('/dronline/actualizarmed', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codatemed: codatemed.trim() ,
    medico: medico.trim() 
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('actualizado');
   }).catch(error => {
   alert('No se actualizo');  
   console.log(error);    

 });

 
}

window.actualizarprov = function(){
  var codateprov= document.getElementById('codateprov').value;
  var distrito= document.getElementById('distrito').value;

  
  var r = confirm("¿Desea cambiar el distrito "+document.getElementById('distrito').options[document.getElementById('distrito').selectedIndex].text+ " para la atencion "+codateprov);
  if (r == true) {
  }else{
    return;
  }
 fetch('/dronline/actualizarprov', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codateprov: codateprov.trim() ,
    distrito: distrito.trim() 
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('actualizado');
   }).catch(error => {
   alert('No se actualizo');  
   console.log(error);    

 });

 
}
window.actualizaraseg = function(){
  var codateaseg= document.getElementById('codateaseg').value;
  var aseguradora= document.getElementById('aseguradora').value;

  
  var r = confirm("¿Desea cambiar la aseguradora "+document.getElementById('aseguradora').options[document.getElementById('aseguradora').selectedIndex].text+ " para la atencion "+codateaseg);
  if (r == true) {
  }else{
    return;
  }
 fetch('/dronline/actualizaraseg', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codateaseg: codateaseg.trim() ,
    aseguradora: aseguradora.trim() 
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('actualizado');
   }).catch(error => {
   alert('No se actualizo');  
   console.log(error);    

 });

 
}



window.filatablapaciente= function(p)  {
  var table = document.getElementById("tablepacientesbody");

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";      
   
 } 
  p.style.backgroundColor = "yellow";            
}



window.filatablamedicamento = function(p) {
  var table = document.getElementById("tablemedicamentosbody");

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";      
   
 } 
  p.style.backgroundColor = "yellow";            
}

window.buscarpaciente = function(){

  var paciente= document.getElementById('nompaciente').value;
   
      
    fetch('/dronline/get_pacientedrmas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }  ,
      body: JSON.stringify({
        paciente: paciente
       })
    }).then(response => response.json())
    .then(function(data) {
      var html = '';
      var i;
      if(data.length==0){
        alert('No se encontraron datos.. porfavor registrar paciente buscado');
      }
      for(i=0; i<data.length; i++){
       
        
        html +=  '<tr onclick="filatablapaciente(this)"> '+
            '<td style = "text-align: center;  border: 1px solid black; " >'+data[i].num_doc_id + '</td>'+
              '<td style = "text-align: center;  border: 1px solid black;">'+data[i].nom_com+'</td>'+
              '<td style = "text-align: center;  border: 1px solid black;">'+data[i].cod_hia+'</td>'     
            '</tr>';
      }
     
            $('#tablepacientesbody').html(html);
         
     }).catch(error => {
      alert(error);  
      console.log(error);    
  
    });
   
  
  
  }  


  
  window.actualizarate = function(){
  var codatepaciente= document.getElementById('codatepaciente').value;
   var table = document.getElementById("tablepacientesbody");
var cod_tit='';
  for (var i = 0, row; row = table.rows[i]; i++) {
    if (  row.style.backgroundColor == "yellow"){
            
         
        cod_tit = row.cells[2].innerHTML.trim();
        break;
    }      
    
  } 
   if (cod_tit.trim() == ''){
alert('no ha seleccionado paciente');
    return;
   }
   if (codatepaciente.trim() == ''){
    alert('ingrese atencion');
        return;
       }
  var r = confirm("¿Desea cambiar el paciente "+row.cells[1].innerHTML+ " para la atencion "+codatepaciente);
  if (r == true) {
  }else{
    return;
  }
 fetch('/dronline/actualizaratepaciente', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codatepaciente: codatepaciente.trim() ,
    cod_tit: cod_tit 
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('actualizado');
   }).catch(error => {
   alert('No se actualizo');  
   console.log(error);    

 });

 
}

window.buscarmedicamento = function(){

  var medicamento= document.getElementById('nommedicamento').value;
   
      
    fetch('/dronline/get_medicamentostablet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }  ,
      body: JSON.stringify({
        medicamento: medicamento
       })
    }).then(response => response.json())
    .then(function(data) {
      var html = '';
      var i;
      if(data.length==0){
        alert('No se encontraron datos.. porfavor registrar medicamento buscado');
      }
      for(i=0; i<data.length; i++){
       
        
        html +=  '<tr onclick="filatablamedicamento(this)"> '+
            '<td style = "text-align: center;  border: 1px solid black; " >'+data[i].cod_medicamento + '</td>'+
              '<td style = "text-align: center;  border: 1px solid black;">'+data[i].descripcion+'</td>'+
              '<td style = "text-align: center;  border: 1px solid black;">'+data[i].cod_presentacion_medicamento+'</td>'     
            '</tr>';
      }
     
            $('#tablemedicamentosbody').html(html);
         
     }).catch(error => {
      alert(error);  
      console.log(error);    
  
    });
   
  
  
  }  

  
  window.insertarmedicamento = function(){
      var table = document.getElementById("tablemedicamentosbody");
  var cod_med='';
    for (var i = 0, row; row = table.rows[i]; i++) {
      if (  row.style.backgroundColor == "yellow"){
              
           
        cod_med = row.cells[0].innerHTML.trim();
          break;
      }      
      
    } 
     if (cod_med.trim() == ''){
  alert('no ha seleccionado medicamento');
      return;
     }
     
    var r = confirm("¿Desea agregar el medicamento a dronline"+row.cells[1].innerHTML );
    if (r == true) {
    }else{
      return;
    }
   fetch('/dronline/agregarmedicamentodronline', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }  ,
     body: JSON.stringify({
       cod_med: cod_med 
      })
   }).then(response => response.json())
   .then(function(data) {
     
      alert('actualizado');
     }).catch(error => {
     alert('No se actualizo');  
     console.log(error);    
  
   });
  
   
  }










  
  window.eliminarmedicamento = function(){
    var table = document.getElementById("tablemedicamentosbody");
var cod_med='';
  for (var i = 0, row; row = table.rows[i]; i++) {
    if (  row.style.backgroundColor == "yellow"){
            
         
      cod_med = row.cells[0].innerHTML.trim();
        break;
    }      
    
  } 
   if (cod_med.trim() == ''){
alert('no ha seleccionado medicamento');
    return;
   }
   
  var r = confirm("¿Desea quitar el medicamento de dronline "+row.cells[1].innerHTML );
  if (r == true) {
  }else{
    return;
  }
 fetch('/dronline/eliminarmedicamentodronline', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
     cod_med: cod_med 
    })
 }).then(response => response.json())
 .then(function(data) {
   
    alert('retirado');
   }).catch(error => {
   alert('No se ha retirado');  
   console.log(error);    

 });

 
}




  window.CmdFiltrardiag_Click = function(){

  var txtbusqueda= document.getElementById('txtbusqueda').value;
  document.body.style.cursor = 'progress'
      
    fetch('/dronline/CmdFiltrardiag_Click', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }  ,
      body: JSON.stringify({
        txtbusqueda : txtbusqueda.toUpperCase()
      })
    }).then(response => response.json())
    .then(function(data) {
       var html = '';
      var i;
      if(data.length==0){
        alert('No se encontraron datos.. porfavor registrar medicamento buscado');
      }
      for(i=0; i<data.length; i++){
       
        
        html +=  '<tr onclick="filatablamedicamento(this)"> '+
            '<td style = "text-align: center;  border: 1px solid black; " >'+data[i].cod_dia + '</td>'+
              '<td style = "text-align: center;  border: 1px solid black;"><input style ="width:100%" type ="text" value="'+data[i].des_dia+'"></td>'+
              '<td style = "text-align: center;  border: 1px solid black;"><input type ="checkbox" checked="'+(data[i].activo=='t'?'true':'false')+'"></td>'  +   
            '</tr>';
      }
     
            $('#t02').html(html);
            document.body.style.cursor = 'default'

     }).catch(error => {
      alert(error);  
      console.log(error);    
  
    });
   
  
  
  }



// ----------------------------------------------Añadir un objeto de atributos a un elemento------------------------//
const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr])
  }
};

// Crear elementos con atributos e hijo
const createCustomElement = (element, attributes, children) => {
  let customElement = document.createElement(element);
  if (children !== undefined) children.forEach(el => {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement, attributes);
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

  elementsArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
      removeModal();
    });
  });

}
  window.CmdNuevodiag_Click = function(){
    
    printModal(`<div id="ed-modal-contentheader"  style="color: white;background:#1cc88a;display:flex;justify-content:space-between;"><h4> DIAGNOSTICO</h4><button type="button"  id="cancelardetalle" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
   <div style="display:grid;grid-template-columns:1fr 1fr">
   <label>CODIGO</label><input style="text-transform: uppercase" type="text" id="txtcod_dia" maxlength="5" name="txtcod_dia" >
   <label>DESCRIPCION</label><input style="text-transform: uppercase" type="text" id="txtdes_dia" name="txtdes_dia" >
 
   </div>
    
    
    <div   style="display:flex;justify-content:flex-end;">
    <input type="button"  class="btn btn btn-success btn-sm "  id="btn_guardardiag" name="btn_guardardiag" onclick="btn_guardardiag();" value="Guardar"> 
    <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelardiag" name="btn_cancelardiag" value="Cerrar"> 
    </div>`);


  }

  window.btn_guardardiag =async  function(){

if (document.getElementById('txtcod_dia').value.trim()=='' || document.getElementById('txtdes_dia').value.trim()=='' ){
alert('Los campos estan vacios');
  return;
}

    document.body.style.cursor = 'progress';
    
var permite = await permite_ingreso(401);

if(permite){
  alert ('USUARIO NO AUTORIZADO PARA REALIZAR CAMBIO');
  return;
}
var diagnostico = {};
diagnostico.cod_dia = document.getElementById('txtcod_dia').value.trim().toUpperCase();
diagnostico.des_dia = document.getElementById('txtdes_dia').value.trim().toUpperCase();
diagnostico.activo =  true;
diagnostico.fecha_modificacion =   new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-') + ' '+ new Date().toTimeString().slice (0,8);
diagnostico.usuario_modificacion = await getusuario();
diagnostico.fecha_creacion = new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-') + ' '+ new Date().toTimeString().slice (0,8);
diagnostico.usuario_creacion =  await getusuario();
 
diagnostico.tabla = 'm_diagnosticos';
   
    var rpta =   await  Executeinsert(diagnostico);
    if (rpta){
      alert('Insertado Diagnostico');
      document.body.style.cursor = 'default';

      

  }else{
    alert('Sucedio un error ');
    document.body.style.cursor = 'default';
    
  }
  var diagnosticotablet = {};
  diagnosticotablet.cod_diagnostico = document.getElementById('txtcod_dia').value.trim().toUpperCase();
  diagnosticotablet.descripcion = document.getElementById('txtdes_dia').value.trim().toUpperCase();
  diagnosticotablet.tabla = 'diagnostico';

    var rpta =   await  Executeinserttablet(diagnosticotablet); 
    if (rpta){
        alert('Insertado Diagnostico');
        document.body.style.cursor = 'default';

        document.getElementById('btn_cancelardiag').click();

    }else{
      alert('Sucedio un error ');
      document.body.style.cursor = 'default';

    }


  }