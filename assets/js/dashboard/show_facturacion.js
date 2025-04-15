
  $(document).ready(()=>{ 
          

        
 
 

  
})

 
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

 



 

$('#nuevoempleado').click(function() {


window.location.href = "/facturacion/empleadonuevo";


})



window.guardarempleado = function() {
  
    
var idempleado = document.getElementById('idempleado').value;
var nombre =  document.getElementById('nombre').value;
var dni =  document.getElementById('dni').value;
var tipodoc =  document.getElementById('tipodoc').value;

var correo =  document.getElementById('correo').value;
var direccion =  document.getElementById('direccion').value;
var urbanizacion = document.getElementById('urbanizacion').value;
var distrito =  document.getElementById('ubigeo').value;
fetch('/facturacion/registrarempleado', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    idempleado: idempleado,
    nombre: nombre,
    dni: dni,
	correo: correo,
    direccion: direccion,
	urbanizacion: urbanizacion,
    distrito: distrito,
    tipodoc:tipodoc
  })
}).then(response => response.json())
.then(function(rpta) {
	if(rpta){
		alert("Se registro el empleado"); 
	}else{
		alert("No se registro"); 
	}

  
         
}).catch(error => {
      
      alert(error);    
}) 
 

}
window.cargarmasiva = function() {
  
    
var idempleado = document.getElementById('idempleado').value;
var nombre =  document.getElementById('nombre').value;
var dni =  document.getElementById('dni').value;
var correo =  document.getElementById('correo').value;
var direccion =  document.getElementById('direccion').value;
var urbanizacion = document.getElementById('urbanizacion').value;
var distrito =  document.getElementById('ubigeo').value;
fetch('/facturacion/cargamasiva', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    idempleado: idempleado,
    nombre: nombre,
    dni: dni,
	correo: correo,
    direccion: direccion,
	urbanizacion: urbanizacion,
    distrito: distrito
  })
}).then(response => response.json())
.then(function(rpta) {
	if(rpta){
		alert("Se registro el empleado"); 
	}else{
		alert("No se registro"); 
	}

  
         
}).catch(error => {
      
      alert(error);    
}) 
 

}




window.consultardocumento = function() {
   
var serie = document.getElementById('serie').value;
var numero =  document.getElementById('numero').value;


fetch('/facturacion/get_CE', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    serie: serie,
    numero: numero
  })
}).then(response => response.json())
.then(function(rpta) {
	if(rpta){
    //window.open("data:application/pdf;base64," + Base64.encode(rpta));
     const linkSource = `data:application/pdf;base64,${rpta}`;
    const downloadLink = document.createElement("a");
    const fileName = serie.toUpperCase()+'_'+numero+'.pdf';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
	}else{
		alert("error"); 
	}

  
         
}).catch(error => {
      
      alert(error);    
}) 
}
window.consultardocumentoXML = function() {
   
  var serie = document.getElementById('serie').value;
  var numero =  document.getElementById('numero').value;
  
  
  fetch('/facturacion/get_XML', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      serie: serie,
      numero: numero
    })
  }).then(response => response.json())
  .then(function(rpta) {
    if(rpta){
       
    }else{ 
    }
  
    
           
  }).catch(error => {
        
        alert(error);    
  }) 
  }
window.fecharecepcion = function () {
  
  if (confirm('Estas seguro de actualizar la fecha de recepcion?')) {

  }else{
    return false;
  }
  var facturas = document.getElementById('facturas').value.trim();
  facturas = facturas.split("\n").join("','");
facturas = "'"+facturas+"'";

  fetch('/facturacion/fecharecepcion', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      facturas: facturas,
    
    })
  }).then(response => response.json())
  .then(function(rpta) {
     if(rpta){
      alert("Proceder a modificar en INTEGRACION"); 
    }else{
      alert("No se registro"); 
    }
  
    
           
  }).catch(error => {
        
        alert(error);    
  }) 
   
  
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