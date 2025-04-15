 
  $(document).ready(()=>{ 
          
       
   
                   
  
  })
    
  function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


var specialKeys = [8, 9, 46, 36, 35, 37, 39];
        function IsAlphaNumeric(e) {
            var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
            var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
            return ret;
        }



function agregartablet(val){

  var codtablet= val.parentElement.parentElement.cells[1].children[0].value.trim();
  var descripcion= val.parentElement.parentElement.cells[2].children[0].value;

 if (codtablet =='' || descripcion=='0' ){
  alert('Ingresar datos');
  return;
 }
 fetch('/mantenimiento/agregartablet', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codtablet: codtablet,
    descripcion:descripcion,
     })
 }).then(response => response.json())
 .then(function(data) {
   
        alert('insertado');
        window.location.reload();

   }).catch(error => {
   alert(error);  
   console.log(error);    

 });


}


function actualizartablet(val){

  var codtablet= val.parentElement.parentElement.cells[1].children[0].value.trim();
  var descripcion= val.parentElement.parentElement.cells[2].children[0].value;
  var codtabletold= val.parentElement.parentElement.cells[0].innerHTML.trim();
  var coddescripcionold= val.parentElement.parentElement.cells[3].innerHTML.trim();

 if (codtablet =='' || descripcion=='0' ){
  alert('Ingresar datos');
  return;
 }
 fetch('/mantenimiento/actualizartablet', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codtablet: codtablet,
    descripcion:descripcion,
    codtabletold:codtabletold,
    coddescripcionold:coddescripcionold
     })
 }).then(response => response.json())
 .then(function(data) {
   
        alert('actualizado');
        window.location.reload();

   }).catch(error => {
   alert(error);  
   console.log(error);    

 });


}


function eliminartablet(val){

   var codtabletold= val.parentElement.parentElement.cells[0].innerHTML.trim();
 
   var answer = window.confirm("Seguro de eliminar tablet?");
   if (answer) {
       //some code
   }
   else {
      return ;
   }
 fetch('/mantenimiento/eliminartablet', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
      codtabletold:codtabletold
     })
 }).then(response => response.json())
 .then(function(data) {
   
        alert('elminado');
        window.location.reload();

   }).catch(error => {
   alert(error);  
   console.log(error);    

 });


}




function agregarmaletin(val){

  var codmaletin= val.parentElement.parentElement.cells[1].children[0].value.trim();
  var descripcion= val.parentElement.parentElement.cells[2].children[0].value;

 if (codmaletin =='' || descripcion=='0' ){
  alert('Ingresar datos');
  return;
 }
 fetch('/mantenimiento/agregarmaletin', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codmaletin: codmaletin,
    descripcion:descripcion,
     })
 }).then(response => response.json())
 .then(function(data) {
   
        alert('insertado');
        window.location.reload();

   }).catch(error => {
   alert(error);  
   console.log(error);    

 });


}



function actualizarmaletin(val){

  var codmaletin= val.parentElement.parentElement.cells[1].children[0].value.trim();
  var descripcion= val.parentElement.parentElement.cells[2].children[0].value;
  var codmaletinold= val.parentElement.parentElement.cells[0].innerHTML.trim();
  var descripcionold= val.parentElement.parentElement.cells[3].innerHTML.trim();

 if (codmaletin =='' || descripcion=='0' ){
  alert('Ingresar datos');
  return;
 }
 fetch('/mantenimiento/actualizarmaletin', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
    codmaletin: codmaletin,
    descripcion:descripcion,
    codmaletinold:codmaletinold,
    descripcionold:descripcionold
     })
 }).then(response => response.json())
 .then(function(data) {
   
        alert('actualizado');
        window.location.reload();

   }).catch(error => {
   alert(error);  
   console.log(error);    

 });


}


function eliminarmaletin(val){

   var codmaletinold= val.parentElement.parentElement.cells[0].innerHTML.trim();
 
   var answer = window.confirm("Seguro de eliminar maletin?");
   if (answer) {
       //some code
   }
   else {
      return ;
   }
 fetch('/mantenimiento/eliminarmaletin', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify({
      codmaletinold:codmaletinold
     })
 }).then(response => response.json())
 .then(function(data) {
   
        alert('elminado');
        window.location.reload();

   }).catch(error => {
   alert(error);  
   console.log(error);    

 });


}


function filtrarproveedor(tabla){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("proveedor");
  filter = input.value.toUpperCase();
  table = document.getElementById(tabla);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2].children[0];
    if (td) {
      txtValue = td.value ;
      if (txtValue == filter  ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }

}