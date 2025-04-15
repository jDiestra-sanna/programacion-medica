<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
 
 <style>
.prueba{
  grid-column-start:1;
  grid-column-end:7;
 
height: 65vh;
  overflow-x: scroll;
  border: solid 1px;
}
#tabla1 {
  width:100%;
 
}
#titulares {
  width:100%;
  border-collapse: collapse;
}
#titularesbody tr,#titularesbody td{
  border: 1px solid black ;
}
#titulares #titulareshead th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#titulares #titularesbody tr.selected {
    background-color: #40e0d0;
} 
#tabletransferencia #tbodytransferencia tr.selected {
    background-color: #40e0d0;
}
#direcciones {
  width:100%;
  border-collapse: collapse;

}
#direccionesbody tr,#direccionesbody td{
  border: 1px solid black ;
}
#direcciones #direccioneshead th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#direcciones #direccionesbody tr.selected {
    background-color: #40e0d0;
} 


#atenciones {
  width:100%;
  border-collapse: collapse;
}
#atencionesbody tr,#atencionesbody td{
  border: 1px solid black ;
}
#atenciones #atencioneshead th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#atenciones #atencionesbody tr.selected {
    background-color: #40e0d0;
} 

#tabla1 #t02 tr.selected {
    background-color: #40e0d0;
    --color: #fff;    
} 


#tabla1 #t01 th{
  position: sticky;
  top:0;
  color: white;
  background-color: #00aae4; 
    border: 1px solid black ;
    white-space: nowrap;

}
#tabla1 td{
  border: 1px solid black;
  white-space: nowrap;

}
#tabla1 #t02{
  width:100%;
}
/* The Close Button */
.close {
  color: #aaaaaa;
  
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.ed-modal-container {
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: scroll;
}  
   
.modalremisse {
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
} 
   
  
  .ed-modal-content {
     border-radius: 5px ;
    background: #fff;
    width: 90%;
    --height: 95vh;

    max-width: 600px;
     padding: 2px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);

  }
  .modal-content-remisse {
     border-radius: 5px ;
    background: #fff;
    width: 90%;
    max-width: 600px;
     padding: 2px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
  }
     
 
   

  #table_seguimiento ,#table_seguimiento td, #table_seguimiento th {
  border: 1px solid black;
}
#filtro1{
  grid-column-start:1;
  grid-column-end:3;
  border:2px solid ;
}
#filtro2{
  grid-column-start:3;
  grid-column-end:6;
  border:2px solid ;
}
#procesos{
  grid-column-start:1;
  grid-column-end:7;
  --border:2px solid ;
}
#pagination a
{
color:black;
--display:block;
text-decoration:none;
padding:2px 3px 3px 2px;
--border:solid 1px;
--border-radius:3px;
}
#pagination a:hover,
#pagination  strong
{
--color:#FFFFFF;
padding:2px 3px 3px 2px;

border:solid 1px;
background:#F8FCFF;
  
}
 </style >
<!-- <div id = "resultado" ></div>
 -->

<div style = "border:1px solid black;">
 <h4> Asociar orden</h4><br>
Orden:<input style =  "text-transform:uppercase;width:100%"   type="text" id="orden" name="orden"  value="">
Atencion:
<input style =  "text-transform:uppercase;width:100%"  type="text" id="atencion" name="atencion"  value="">
<button class="btn btn btn-success btn-sm"   id="asociarorden" name="asociarorden"> <i class="fas fa-link"></i> Asociar </button>

</div>
<div></div>
<div style = "border:1px solid black;">
<h4> Cambiar clasificacion</h4><br>
Orden:<input style =  "text-transform:uppercase;width:100%"   type="text" id="ordenclasif" name="ordenclasif"  value="">
Clasificacion:
<?=form_dropdown('clasif',get_combo_query("select * from m_clasificacion_pac","cod_clasif","nom_clasif",array( "Seleccione")),0,array( 'style'=>"width:150px",'id'=>"clasif"))?>
 <button class="btn btn btn-success btn-sm"   id="cambiarclasif" name="cambiarclasif"> <i class="fas fa-link"></i> Cambiar </button>
</div>



<div  style = "border:1px solid black;grid-column-start:1;
  grid-column-end:5;">
<h4> Cambio de paciente</h4><br>
Paciente:<br>
<input style =  "text-transform:uppercase;width:100%"  type="text" id="nompaciente" name="nompaciente"  value="">
<button class="btn btn btn-primary btn-sm"  onclick="buscarpacientedrmas();"  id="busqueda" name="busqueda"> <i class="fas fa-wheelchair"></i> Busqueda </button>
<br>
Atencion:<br>
<input type="text" id="codatepaciente" name="codatepaciente"  value="">
<button class="btn btn btn-primary btn-sm"  onclick="actualizarate();"  id="actualizar" name="actualizar"> <i class="fas fa-sync"></i> Actualizar </button>

<div style="height:50vh;border:2px solid green;">
<table style="width:100%;border-collapse: collapse;" border id="tablepacientes">
<thead>
  <tr>
  <th>DNI</th>
  <th>APELLIDOS Y NOMBRES</th>
  <th>CODIGO HISTORIA</th>
  </tr>
</thead>
<tbody id="tablepacientesbody"></tbody>
</table>
</div>
</div>
<br>
</body>
<script type="text/javascript">
      var cambio_estado = (document.getElementById("cambio_estado"))?document.getElementById("cambio_estado").value:'';
 
function filatablapaciente(p) {
  var table = document.getElementById("tablepacientesbody");

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";      
   
 } 
  p.style.backgroundColor = "yellow";            
}
   
function buscarpacientedrmas(){

var paciente= document.getElementById('nompaciente').value;
 
    
  fetch('/gestionlaboratorio/get_pacientedrmas', {
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



  
function actualizarate(){
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
 fetch('/gestionlaboratorio/actualizaratepaciente', {
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


  if (document.getElementById("asociarorden")){
  document.getElementById("asociarorden").addEventListener("click",function(){
    var orden = document.getElementById("orden").value;
    orden = orden.trim();
    if(orden ==""){
    return

    }
    var atencion = document.getElementById("atencion").value;
    atencion = atencion.trim();
    if(atencion==""){
    return

    } 
  var r = confirm("¿Desea asociar la orden "+ orden+" a la atencion "+atencion );
  if (r == true) {
  }else{
    return;
  }
  
  fetch('/gestionlaboratorio/asociarorden/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      orden:orden,
      atencion:atencion 
    })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Sucedio un error'))
    }).then(data => {
        if(data){
          alert("Se asoció la orden");
        }
    }).catch(error => {
   
      console.log(error);    
    })

  });
}

if (document.getElementById("cambiarclasif")){
  document.getElementById("cambiarclasif").addEventListener("click",function(){
    var ordenclasif = document.getElementById("ordenclasif").value;
    ordenclasif = ordenclasif.trim();
    if(ordenclasif ==""){
    return

    }
    var clasif = document.getElementById("clasif").value;
   
  var r = confirm("¿Desea cambiar la clasificacion "+ document.getElementById('clasif').options[document.getElementById('clasif').selectedIndex].text+" a la orden "+ordenclasif );
  if (r == true) {
  }else{
    return;
  }
  
  fetch('/gestionlaboratorio/cambiarclasif/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      orden:ordenclasif,
      clasif:clasif 
    })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Sucedio un error'))
    }).then(data => {
        if(data){
          alert("Se actualizo la orden");
        }
    }).catch(error => {
   
      console.log(error);    
    })

  });
}

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
    console.log(e);
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

</script>





