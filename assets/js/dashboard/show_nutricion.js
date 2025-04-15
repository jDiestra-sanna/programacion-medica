import {Frm_CM_confirma_datos_body,Frm_CM_confirma_fin,Frm_CM_reprogramar2_body,Frm_seguimiento,Frm_CM_asignacion_body,Frm_CM_cotiza_conductor,Frm_CM_confirma_envio_mensaje,Frm_CM_confirma_llegada,Txt_Dr_Change,Txt_distritorpg_Change,Chk_editar_direccionrpg_Click,Txt_direccionrpg_change,Frm_CM_datos_paciente} from './Formularios.js';
import {Execute,permite_ingreso} from './module.js';
window.filacurrent=''; 


(function () {
  if (document.getElementById("Cbo_opcion")) {
    document.getElementById('Cbo_opcion').addEventListener('change', cambiofiltro, false);
  
 
      document.getElementById("Cbo_opcion").selectedIndex = "1";
      document.getElementById("Cbo_RAC").style.display = "inline-block";

  
     document.getElementById('Chk_finalizadas').addEventListener('click', habilita_cboestados, false);
  

  }
})();


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
const printModal2 = content => {
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
    if (e.target === modalContainerEl) removeModal();
  }) 
  document.querySelector('.cancelarmodal').addEventListener('click', e => {
    if (e.target === document.querySelector('.cancelarmodal')) removeModal();
  });*/
  let elementsArray2 = document.querySelectorAll(".cancelarmodal2");

  elementsArray2.forEach(function (elem) {
    elem.addEventListener("click", function () {
      removeModal2();
    });
  });

}


var optasoc; 
 
 
  

 

function nuevo_direccion() {
  var tbodydirecciones = document.getElementById('direccionesbody');
  for (var i = 0, row; row = tbodydirecciones.rows[i]; i++) {
    row.onclick = null;

  }


  document.getElementById('Txt_Direccion').disabled = false;
  document.getElementById('Dcbo_distrito').disabled = false;
  document.getElementById('Txt_Referencia').disabled = false;
  document.getElementById('Txt_tlf_fijo').disabled = false;
  document.getElementById('Txt_tlf_movil').disabled = false;
  document.getElementById('Txt_Direccion').value = "";
  document.getElementById('Dcbo_distrito').value = "";
  document.getElementById('Txt_Referencia').value = "";
  document.getElementById('Txt_tlf_fijo').value = "";
  document.getElementById('Txt_tlf_movil').value = "";
  document.getElementById('Txt_Direccion').focus();
  document.getElementById('Cmd_editar').disabled = true;
  document.getElementById('Cmd_nuevo').disabled = true;
  document.getElementById('Cmd_guardar').disabled = false;
  document.getElementById('Cmd_cancelar').disabled = false;
  //s_opcion_reg = "REG"
}
function editar_direccion() {
  var tbodydirecciones = document.getElementById('direccionesbody');
  for (var i = 0, row; row = tbodydirecciones.rows[i]; i++) {
    row.onclick = null;

  }
  document.getElementById('Txt_Direccion').disabled = false;
  document.getElementById('Dcbo_distrito').disabled = false;
  document.getElementById('Txt_Referencia').disabled = false;
  document.getElementById('Txt_tlf_fijo').disabled = false;
  document.getElementById('Txt_tlf_movil').disabled = false;


  document.getElementById('Cmd_editar').disabled = true;
  document.getElementById('Cmd_nuevo').disabled = true;
  document.getElementById('Cmd_guardar').disabled = false;
  document.getElementById('Cmd_cancelar').disabled = false;


}
function cancelar_direccion() {
  var tbodydirecciones = document.getElementById('direccionesbody');
  for (var i = 0, row; row = tbodydirecciones.rows[i]; i++) {
    row.setAttribute('onclick', 'filatabladireccion(this)');
    // row.addEventListener("click", filatabladireccion(''));

  }
  document.getElementById('Txt_Direccion').disabled = true;
  document.getElementById('Dcbo_distrito').disabled = true;
  document.getElementById('Txt_Referencia').disabled = true;
  document.getElementById('Txt_tlf_fijo').disabled = true;
  document.getElementById('Txt_tlf_movil').disabled = true;


  document.getElementById('Cmd_editar').disabled = false;
  document.getElementById('Cmd_nuevo').disabled = false;
  document.getElementById('Cmd_guardar').disabled = true;
  document.getElementById('Cmd_cancelar').disabled = true;
  document.getElementById('direccionesbody').rows[0].click();


}

function filatabladireccion(p) {
  var table = document.getElementById("direccionesbody");

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";

  }
  p.style.backgroundColor = "turquoise";
  document.getElementById('Txt_Direccion').value = p.cells[0].innerHTML;
  document.getElementById('Txt_Referencia').value = p.cells[3].innerHTML;
  document.getElementById('Dcbo_distrito').value = p.cells[1].innerHTML;
  document.getElementById('Txt_tlf_fijo').value = p.cells[5].innerHTML;
  document.getElementById('Txt_tlf_movil').value = p.cells[4].innerHTML;

}
 
 
 
function cambiopago() {

  sel = document.getElementById('Cbo_forma_pago');
  for (var i = 0; i < sel.length; i++) {
    //  Aca haces referencia al "option" actual
    var opt = sel[i].value;
    if (opt == '0') {
      sel.remove(i);
    }
  }

  if (sel.value == '1') {
    document.getElementById('lbldenominacion').style.display = 'block';
    document.getElementById('Cbo_moneda_den').style.display = 'block';
    document.getElementById('Cbo_Denominacion').style.display = 'block';
    document.getElementById('lbloperador').style.display = 'none';
    document.getElementById('TxtNroTar').style.display = 'none';
    document.getElementById('lblnumtarjeta').style.display = 'none';
    document.getElementById('ME_tarjeta').setAttribute("type", "hidden");
    document.getElementById('lblfecvenctarjeta').style.display = 'none';
    document.getElementById('Txt_mes_credito').setAttribute("type", "hidden");
    document.getElementById('Txt_anio_credito').setAttribute("type", "hidden");
    document.getElementById('mm_aaaa').style.display = 'none';
    document.getElementById('tabletransferencia').style.display = 'none';


  } else if (sel.value == '2') {
    document.getElementById('lbldenominacion').style.display = 'none';
    document.getElementById('Cbo_moneda_den').style.display = 'none';
    document.getElementById('Cbo_Denominacion').style.display = 'none';
    document.getElementById('lbloperador').style.display = 'block';
    document.getElementById('TxtNroTar').style.display = 'block';
    document.getElementById('lblnumtarjeta').style.display = 'block';
    document.getElementById('ME_tarjeta').setAttribute("type", "text");
    document.getElementById('lblfecvenctarjeta').style.display = 'block';
    document.getElementById('Txt_mes_credito').setAttribute("type", "text");
    document.getElementById('Txt_anio_credito').setAttribute("type", "text");
    document.getElementById('mm_aaaa').style.display = 'block';
    document.getElementById('tabletransferencia').style.display = 'none';

  } else if (sel.value == '3') {
    document.getElementById('lbldenominacion').style.display = 'none';
    document.getElementById('Cbo_moneda_den').style.display = 'none';
    document.getElementById('Cbo_Denominacion').style.display = 'none';
    document.getElementById('lbloperador').style.display = 'none';
    document.getElementById('TxtNroTar').style.display = 'none';
    document.getElementById('lblnumtarjeta').style.display = 'none';
    document.getElementById('ME_tarjeta').setAttribute("type", "hidden");
    document.getElementById('lblfecvenctarjeta').style.display = 'none';
    document.getElementById('Txt_mes_credito').setAttribute("type", "hidden");
    document.getElementById('Txt_anio_credito').setAttribute("type", "hidden");
    document.getElementById('mm_aaaa').style.display = 'none';
    document.getElementById('tabletransferencia').style.display = 'table';


  } else if (sel.value == '4') {
    document.getElementById('lbldenominacion').style.display = 'none';
    document.getElementById('Cbo_moneda_den').style.display = 'none';
    document.getElementById('Cbo_Denominacion').style.display = 'none';
    document.getElementById('lbloperador').style.display = 'none';
    document.getElementById('TxtNroTar').style.display = 'none';
    document.getElementById('lblnumtarjeta').style.display = 'none';
    document.getElementById('ME_tarjeta').setAttribute("type", "hidden");
    document.getElementById('lblfecvenctarjeta').style.display = 'none';
    document.getElementById('Txt_mes_credito').setAttribute("type", "hidden");
    document.getElementById('Txt_anio_credito').setAttribute("type", "hidden");
    document.getElementById('mm_aaaa').style.display = 'none';
    document.getElementById('tabletransferencia').style.display = 'none';

  }


}  
var ANvienede, lsg_cambio, l_boolbuscado;
function filatablapruebas(p) {
  var table = document.getElementById("pruebasbody");

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";

  }
  p.style.backgroundColor = "yellow";
}
 
var valor = 0, valor_r = 0, valor_t = 0;

function redondeardec(x) {
  a = x - parseInt(x);
  if (a > 0 && a < 0.5) {
    return parseInt(x) + 0.5;
  } else if (a > 0.5 && a < 1) {
    return parseInt(x) + 1;
  } else {
    return x;
  }
}

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('cambio_proveedor');
  var radios = document.getElementsByName('cambio_estado_lab');

  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
  radios.forEach((item) => {
    item.checked = false
  })
}

 
 
function modaldetalle(el) {
  var fila = document.querySelector('.selected');
  if (!fila) return;
  var cod_serv_laboratorio = fila.cells[4].innerHTML.trim();
  //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> DETALLE</h4><button type="button"  id="cancelardetalle" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  

<fieldset  id="Pruebas" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Pruebas</legend>
 
 
<table id="pruebasdetalle"  border style="border-collapse: collapse;width: 100%;">
<thead style=" background-color:#00aae4;color:white;">
<tr  >
<td>
CODIGO
</td>
<td>
DESCRIPCION
</td>
<td>
CLASIFICACION
</td>
</tr>
</thead>
<tbody id="pruebasdetallebody">
</tbody>
</table>
  
</fieldset>



<div   style="display:flex;justify-content:flex-end;">
 <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cerrar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));

  document.body.style.cursor = 'progress'

  fetch('/gestionlaboratorio/Adata_pruebas_detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_serv_laboratorio: cod_serv_laboratorio
    })
  }).then(response => {
    return response.json();
  }).then(data => {

    document.body.style.cursor = 'default'
    var html = '';
    var i;
    if (data.length == 0) {
      alert('No se encontraron pruebas...');
    }
    for (i = 0; i < data.length; i++) {


      html += '<tr> ' +
        '<td style = "text-align: center;  border: 1px solid black; " >' + data[i].cod_pruebas + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].descripcion + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].clasificacion + '</td>'
      '</tr>';
    }

    document.getElementById('pruebasdetallebody').innerHTML = html;
  }).catch(error => {
    alert("Error ");
    console.log(error);
  })

}



function modalauditoria(el) {
  var fila = document.querySelector('.selected');
  if (!fila) return;
  var cod_serv_laboratorio = fila.cells[4].innerHTML.trim();
  //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> AUDITORIA DE LABORATORIO</h4><button type="button"  id="cancelarauditoria" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  
 
 <table id="auditoria"  border style="border-collapse: collapse;width: 100%;">
<thead id="auditoriahead" style=" background-color:#00aae4;color:white;">
<tr  >
<td>
NUM. SERVICIO
</td>
<td>
ESTADO
</td>
<td>
FECHA_REG
</td>
<td>
HORA_REG
</td>
<td>
OBSERVACION
</td>
<td>
DETALLE
</td>
<td>
USUARIO
</td>
</tr>
</thead>
<tbody id="auditoriabody">
</tbody>
</table>
 <div   style="display:flex;justify-content:flex-end;">
 <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cerrar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));

  document.body.style.cursor = 'progress'

  fetch('/gestionlaboratorio/Adata_Auditoria/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_serv_laboratorio: cod_serv_laboratorio
    })
  }).then(response => {
    return response.json();
  }).then(data => {

    document.body.style.cursor = 'default'
    var html = '';
    var i;
    if (data.length == 0) {
      alert('No se encontro registros...');
    }
    for (i = 0; i < data.length; i++) {


      html += '<tr> ' +
        '<td style = "text-align: center;  border: 1px solid black; " >' + data[i].cod_serv_laboratorio + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].estado + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].fec_reg_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].hor_reg_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].obs_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].cambio_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].usu_reg_audi + '</td>' +


        '</tr>';
    }

    document.getElementById('auditoriabody').innerHTML = html;
    
    document.getElementById('ed-modal-content').style.maxWidth = "none";


  }).catch(error => {
    alert("Error ");
    console.log(error);
  })

}
  
function cambiofiltro() {

  document.getElementById("Cmd_exportar").style.display = "none";
  document.getElementById("Chk_otras").disabled =  false ;
  document.getElementById("Txt_busqueda").value =  '' ;

  document.getElementById("Dcbo_especialista").style.display = "none";
  document.getElementById("Txt_busqueda").style.display = "block";
   document.getElementById("Cb_estado").style.display = "none";
  document.getElementById("DCbo_estado_tablet").style.display = "none";
  document.getElementById("Cb_zona").style.display = "none";
  document.getElementById("Cb_programacion").style.display = "none";
  document.getElementById("Cb_clasificacion").style.display = "none";
   document.getElementById("Cbo_RAC").style.display = "none";
  document.getElementById("Cbo_ruteo").style.display = "none";
  document.getElementById("Cbo_sub_zona").style.display = "none";
  document.getElementById("Cbo_provincia").style.display = "none";
  document.getElementById("Cb_clasificacion").value =  '0' ;
  document.getElementById("cbo_subclasificacion").style.display = "none";
  document.getElementById("Label_fecha").innerHTML = "Fecha"

 
  switch (this.value) {

    case "0":
      document.getElementById("Txt_busqueda").style.display = "none";
      break;
    case "6":
    case "10":
    case "12":
    case "14":  
      document.getElementById("Txt_busqueda").style.display = "block";
      break;
    case "4":
    case "5":
    case "18":
      document.getElementById("Txt_busqueda").style.display = "block";
      document.getElementById("Label_fecha").innerHTML = "Desde fecha"
      break;
    case "13":
      document.getElementById("Txt_busqueda").style.display = "none";
      document.getElementById("Cb_zona").style.display = "block";
      break;
    case "7":
      document.getElementById("Txt_busqueda").style.display = "none";
      document.getElementById("Cb_estado").style.display = "block";
      break;
    case "8":
      document.getElementById("Txt_busqueda").style.display = "none";
      document.getElementById("DCbo_estado_tablet").style.display = "block";
      break;
    case "9":
      document.getElementById("Txt_busqueda").style.display = "none";
      document.getElementById("Cb_programacion").style.display = "block";  
      break;
    case "15":
      document.getElementById("Txt_busqueda").style.display = "block";
      break;
    case "16":
      document.getElementById("Txt_busqueda").style.display = "none";
      break;
    case "17": 
      document.getElementById("Txt_busqueda").style.display = "none";
      document.getElementById("Cb_clasificacion").style.display = "block";
      break;
    case "1":
      document.getElementById("Txt_busqueda").style.display = "none";
      document.getElementById("Cbo_RAC").style.display = "block";
      break;
    case "11":
      document.getElementById("Txt_busqueda").style.display = "none";
      document.getElementById("Cbo_provincia").style.display = "block"; 
     
      break;
      case "2":
        document.getElementById("Txt_busqueda").style.display = "none";
        document.getElementById("Cbo_ruteo").style.display = "block"; 
       
        break;
        case "3":
        document.getElementById("Txt_busqueda").style.display = "none";
        document.getElementById("Cbo_sub_zona").style.display = "block"; 
       
        break;
  }

}

function habilitafechainicial() {
  if (this.checked) {
    document.getElementById("fec_inicial").disabled = false;
  } else {
    document.getElementById("fec_inicial").disabled = true;

  }
}

function habilita_cboestados() {
  if (this.checked) {
    document.getElementById('Cmb_finalizadas').style.visibility = "visible";
  } else {
    document.getElementById('Cmb_finalizadas').style.visibility = "hidden";

  }
} 
  
function FN_REALIZAR_CAMBIOS_ATE(pCodAte , pEstadoServ , pFechaServ, pHoraServ, pDiasPlazo ){

var vFecha_plazo;
var var_fecha;
var var_hora ;
var permite_cambios_ate ;

if (pEstadoServ == "8") {
    
    var_fecha = new Date(pFechaServ);
    var_hora = new Date('01/01/2021 '+pHoraServ);
    
   //VERIFICA LA FECHA
    
    switch (var_fecha.getDay()) {
            
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
               //D, L, M, M, J
                 if (pDiasPlazo <= 6 - var_fecha.getDay()) {
                    vFecha_plazo =   var_fecha.addDays(pDiasPlazo)  ;
                }else{
                    vFecha_plazo =   var_fecha.addDays(pDiasPlazo+2)  ;

                }
            break;
            case 6:
            case 7:
                //V, S
                //vuelve a los dias V y S al domingo
                if (var_fecha.getDay() == 6) {
                  var_fecha =   var_fecha.addDays(2)  ;

                }else{
                    var_fecha = DateAdd("D", 1, var_fecha)
                    var_fecha =   var_fecha.addDays(pDiasPlazo)  ;

                }
                
                if (pDiasPlazo <= 6 - var_fecha.getDay() ){
                     vFecha_plazo =   var_fecha.addDays(pDiasPlazo)  ;

                }else{
                  vFecha_plazo =   var_fecha.addDays(pDiasPlazo+2)  ;
                }
                break;
    } 
           
        
    //VALIDA LAS HORAS
      
        if (new Date() > new Date(vFecha_plazo)) {
            permite_cambios_ate = False
                
        }else if (  new Date(vFecha_plazo) == new Date()) {
            //compara las horas
            if (Date.parse(var_hora) >= Date.parse('2021-01-01 '+new Date().gethour()+':'+new Date().getminute()+new Date().getSeconds()) ) {
                permite_cambios_ate = true;
            }else{
                permite_cambios_ate = false;
            }
          }else{
            permite_cambios_ate = true;
          }
    
}else{
    permite_cambios_ate = true;
    
}
 return permite_cambios_ate;
    
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
window.Cmd_reprogramar_Click = function(){
    
   
  var fila = document.querySelector('.selected');

  if(!fila) return;
     switch (document.getElementById('Cmd_reprogramar').value.trim() ){
        case "Reprogramar", "Reprog. P.I.":
             
           // Frm_CM_reprogramacion.Txt_CodAte.Text = Grid_CM.TextMatrix(Grid_CM.Row, 2)
           break;
        case "Editar":
             
           printModal(`
          <style> 
          </style>
          <div id="ed-modal-contentheaderFrm_Opc_cambios"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> Opciones de edicion de Servicio</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
         
          <div  id="Frm_Opc_cambios" style="border:1px solid black;margin-top:2vh">
           <h6 style="width:15vw;background-color:white;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Seleccione el Soporte</h6>
                <div style="display:grid;  grid-template-columns: 1fr  ;" >
                <input type="hidden" id="Txt_CodAtereprogramar" name="Txt_CodAtereprogramar">
                <div><input type="radio" id="Opt_Reprogramar" name="Opc_cambios" checked  ><label for ="Opt_Reprogramar">Reprogramar</label></div>
                <div><input type="radio" id="Opt_ajustes" name="Opc_cambios"    ><label for ="Opt_ajustes">Ajustes a la programación</label></div>

           
                </div>
          </div>  
          <div style="display:flex;justify-content:space-around	;">   
          <input type="button"  class="btn btn btn-success btn-sm "  id="cnd_aceptar" name="cnd_aceptar"  onclick="cnd_aceptar_Click();" value="Aceptar"> 
          <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="CmdCancelar" name="CmdCancelar" onClick="" value="Salir">
           
          </div> 
        
        `);
        document.getElementById('Txt_CodAtereprogramar').value = fila.cells[2].innerHTML.trim(); 
          break;
             
    } 
            
    
}

var l_estado_audirpg ;
var Adata_atencionrpg=[];
window.cnd_aceptar_Click = async function (){
   
     printModal(Frm_CM_reprogramar2_body(filacurrent));
    document.getElementById('Chk_editar_direccionrpg').addEventListener('click', function(){Chk_editar_direccionrpg_Click(document.getElementById('Chk_editar_direccionrpg').checked)});
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
        .then(async function (data ) {
          Adata_atencionrpg = data;
          if(Adata_atencionrpg.length>0) {
            l_estado_audirpg = Adata_atencionrpg[0].cm_estado;
            document.getElementById('Txt_pacrpg').value = Adata_atencionrpg[0].nom_pac;
            document.getElementById('Txt_medicorpg').tag = Adata_atencionrpg[0].cod_doc??='';
            document.getElementById('Txt_medicorpg').value = Adata_atencionrpg[0].nom_doc??='';

            document.getElementById('Txt_distrpg').value = Adata_atencionrpg[0].des_dis;
            document.getElementById('Txt_fecrpg').value = Adata_atencionrpg[0].fec_ate;
            document.getElementById('Txt_horrpg').value = Adata_atencionrpg[0].hor_ate;
            document.getElementById('DTPicker1rpg').value = Adata_atencionrpg[0].fec_ate;

             var opt = document.createElement('option');
            opt.value = (Adata_atencionrpg[0].hor_ate==null?'':Adata_atencionrpg[0].hor_ate).slice(0,5);
            opt.innerHTML = (Adata_atencionrpg[0].hor_ate==null?'':Adata_atencionrpg[0].hor_ate).slice(0,5);
            document.getElementById('CmbHorarpg').appendChild(opt);
            document.getElementById('CmbHorarpg').value =  (Adata_atencionrpg[0].hor_ate==null?'':Adata_atencionrpg[0].hor_ate).slice(0,5); 
            document.getElementById('Txt_obs_cmrpg').value = Adata_atencionrpg[0].obs_cm;
            document.getElementById('TXt_tipo_medicorpg').value = Adata_atencionrpg[0].cod_tipo_doctor=='I'?"INDEPENDIENTE":"AUTO";
            document.getElementById('TXt_tipo_medicorpg').Tag = Adata_atencionrpg[0].cod_tipo_doctor;
  
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
                   document.getElementById('Txt_especialidadrpg').value =  (Adata_atencionrpg[0].cod_esp.trim());
                   document.getElementById('Txt_especialidadrpg').cod_doc =  (Adata_atencionrpg[0].cod_doc.trim());
                   document.getElementById('Txt_especialidadrpg').cod_tipo_doctor =  (Adata_atencionrpg[0].cod_tipo_doctor.trim());

                   Txt_Dr_Change(Adata_atencionrpg[0].cod_esp.trim());
                  }
                }).catch(error => {
                  console.log(error);
                }); 
                document.getElementById('Txt_Drrpg').value   = Adata_atencionrpg[0].nom_doc.trim();

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
                        document.getElementById('Txt_provinciarpg').value =  Adata_atencionrpg[0].cod_prov.trim();
                    
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
                                document.getElementById('Txt_distritorpg').value =  (Adata_atencionrpg[0].cod_dis??='').trim();
                                document.getElementById('Txt_distritorpg').cod_tit = Adata_atencionrpg[0].cod_tit.trim();
                                Txt_distritorpg_Change(Adata_atencionrpg[0].cod_dis.trim());
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
                              query:"SELECT * FROM m_direcciones WHERE cod_tit = '" +  (Adata_atencionrpg[0].cod_tit).trim() +  "' AND cod_dis = '"  + (Adata_atencionrpg[0].cod_dis).trim() + "'"
                              })
            
                            }).then(response => response.json())
                            .then(function (Adata_m_direcciones ) {
                              if(Adata_m_direcciones.length>0) { 
                                  var options;
                                options = Adata_m_direcciones.map(person => `<option value="${person.des_dir}">`).join("\n");
               
                               document.getElementById('direccionesrpg').innerHTML = options;
                               document.getElementById('Txt_direccionrpg').value =  (Adata_atencionrpg[0].des_dir.trim()); 
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


 window.CmdFiltrar_Click =  async function () {
  var Cbo_opcion, Cb_zona,  fec_inicial, Chk_otras, Chk_internista, Chk_pediatria, Cb_estado, DCbo_estado_tablet, Cb_clasificacion, cbo_subclasificacion
  , Cb_programacion, Cbo_RAC, Cbo_provincia, Cbo_sub_zona,Cbo_ruteo,Dcbo_especialista,Adata2,Cmb_finalizadas_tag,Chk_finalizadas;
  filacurrent = '';
  document.getElementById('Frame1').innerHTML = "Consultas médicas pendientes: 0" ;
  await fetch('/nutricion/logged/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } 
  }).then(response => response.json())
    .then(function (data) {
      var html = '';filacurrent=''; 
      var i;

     //Frame1.Caption = "Consultas médicas"
    if (data=="") {
     

    }else{
      window.location.href = `${window.location.protocol + '//' + window.location.host}/login`;

    }


    }).catch(error => {
      console.log(error);
    });
Cbo_opcion = document.getElementById('Cbo_opcion').value;
var Cb_zona = document.getElementById('Cb_zona').value;
//clasificacion_serv = (Cbo_opcion == '12') ? document.getElementById('clasificacion_serv').options[document.getElementById('clasificacion_serv').selectedIndex].text : '';
fec_inicial = document.getElementById('fec_inicial').value;
Chk_otras = document.getElementById('Chk_otras').checked;
Chk_internista = document.getElementById('Chk_internista').checked;
Chk_pediatria = document.getElementById('Chk_pediatria').checked;
Chk_finalizadas = document.getElementById('Chk_finalizadas').checked;
Cb_estado = document.getElementById('Cb_estado').value;
DCbo_estado_tablet = document.getElementById('DCbo_estado_tablet').value;
Cb_clasificacion =  document.getElementById('Cb_clasificacion').value;
cbo_subclasificacion = document.getElementById('cbo_subclasificacion').value;
Cb_programacion = document.getElementById('Cb_programacion').value;
Cbo_RAC = document.getElementById('Cbo_RAC').value;
Cbo_provincia = document.getElementById('Cbo_provincia').value;
Cbo_sub_zona = document.getElementById('Cbo_sub_zona').value;
Cbo_ruteo = document.getElementById('Cbo_ruteo').value;
Dcbo_especialista = document.getElementById('Dcbo_especialista').value;

$('#t02').html("");
document.getElementById('CmdFiltrar').disabled = true;
document.body.style.cursor = "progress";
if (Chk_finalizadas)  {
 document.getElementById('Cmd_soporte').disabled = true;

  switch ( document.getElementById('Cmb_finalizadas').value ) {
    case "8":
    case "C":
    case "VNR":
    case "PNE":
      document.getElementById('Cmd_reprogramar').value = 'Reprogramar';
      break;
    default:
      break;
  }
}else{

document.getElementById('Cmd_reprogramar').value = 'Editar';
}
document.getElementById('Cmd_exportar').disabled = true;
if (document.getElementById('Cmd_soporte').dataset.Tag == "ACTIVO"   || document.getElementById('usuario').value == "SISTEMAS"  ){
document.getElementById('Cmd_soporte').disabled = false;
}
var  hay_datos = false;


var ls_SQLaux = " ";
var ls_SQLaux2 = "";
var ls_sqlmed = "";

var b_colorea_verde = false;

    
    //filtro de
   var ls_dni ="";
   var ls_atencion ="";

   var ls_SQLCond = "";
 
    switch (Cbo_opcion) {
        case '7':
        case '8':
        case '5':
        case '9':
        case '13': 
        case '12':
        case '17':
        case '16' :
        case '15':
        case '1':
        case'2':
        case'3':
                if (Chk_internista == true && Chk_pediatria == true && Chk_otras == true) {
                    ls_SQLaux = " ";
                }
        
                if (Chk_internista == true && Chk_pediatria == false && Chk_otras == false ){
                    //ls_SQLaux = " AND a.cod_esp in ('010', '006') AND (a.cod_doc  not in ('0937', '5152') OR a.cod_doc is null) "
                    ls_SQLaux = " AND a.cod_esp in ('010', '006') ";
                }
                
                if (Chk_internista == false &&  Chk_pediatria == true && Chk_otras == false) {
                    ls_SQLaux = " AND a.cod_esp in ('005') ";
                }
                
                if (Chk_internista == false &&  Chk_pediatria == false && Chk_otras == true ){
                    //ls_SQLaux = " AND a.cod_esp not in ('006', '005') AND (a.cod_doc not in (SELECT cod_doc FROM m_espcxdoctor WHERE cod_esp = '010' AND cod_doc not in ('0937', '5152')) or a.cod_doc is null) "
                    ls_SQLaux = " AND a.cod_esp not in ('006', '005') ";
                }
                
                if (Chk_internista == true &&  Chk_pediatria == true && Chk_otras == false ){
                    //ls_SQLaux = " AND a.cod_esp in ('010', '006', '005') AND (a.cod_doc not in ('0937', '5152') or a.cod_doc is null) "
                    ls_SQLaux = " AND a.cod_esp in ('010', '006', '005') ";
                }
                
                if (Chk_internista == true &&  Chk_pediatria == false && Chk_otras == true ){
                    ls_SQLaux = " AND a.cod_esp not in ('005') ";
                }
                if (Chk_internista == false && Chk_pediatria == true && Chk_otras == true  ){
                    ls_SQLaux = " AND a.cod_esp not in ('006') ";
                }
                break;
                
        default:
             break;
    }
 
 switch (Cbo_opcion) {
     case '4':
        if(  document.getElementById('Txt_busqueda').value.trim() != "") {
          ls_SQLaux =  ls_SQLaux  + " and a.nom_pac like '"  +  (document.getElementById('Txt_busqueda').value.toUpperCase()).trim() + "%' ";
        }
         break;
    case '5':
            if(  ( document.getElementById('Txt_busqueda').value).trim() != "") {
              ls_SQLaux =  ls_SQLaux  + " and a.nom_doc like '" +  (document.getElementById('Txt_busqueda').value.toUpperCase()).trim() + "%' ";
            }
             break;
    case '6':
                if(  ( document.getElementById('Txt_busqueda').value).trim() != "") {
                  ls_SQLaux = ls_SQLaux  + " and a.nom_gru like '" +  (document.getElementById('Txt_busqueda').value.toUpperCase()).trim() + "%' ";
                }
                 break;
    case '18':
                if(  ( document.getElementById('Txt_busqueda').value).trim() != "") {
                      ls_SQLaux =  ls_SQLaux   + " and a.usulla_ate like '"  +  (document.getElementById('Txt_busqueda').value.toUpperCase()).trim()  + "%' ";
                }
               break;   
    case '7':
        if ( (Cb_estado).trim() != "")  {
            switch ( ( Cb_estado).trim()){
                case "0":  document.getElementById('Txt_busqueda').value = "'0', 'R0'"; break;
                case "1":  document.getElementById('Txt_busqueda').value = "'A', 'RA'"; break;
                case "2":  document.getElementById('Txt_busqueda').value = "'1'"; break;
                case "3":  document.getElementById('Txt_busqueda').value = "'2', 'R2', 'RT2', 'RP2'"; break;
                case "4":  document.getElementById('Txt_busqueda').value = "'3', 'R3'"; break;
                case "5":  document.getElementById('Txt_busqueda').value = "'4', 'R4'"; break;
                case "6":  document.getElementById('Txt_busqueda').value = "'5', 'R5'"; break;
                case "7":  document.getElementById('Txt_busqueda').value = "'6', 'R6'"; break;
                case "8":  document.getElementById('Txt_busqueda').value = "'7', 'R7'"; break;
            }
        }
        ls_SQLaux = ls_SQLaux  + " and a.cm_estado in (" +  ( document.getElementById('Txt_busqueda').value).trim() + ") ";
    
       break;
    
    case  '8':
        if ( (DCbo_estado_tablet).trim() == "0") {
            ls_SQLaux = ls_SQLaux + " and a.cod_estado in (0, 1, 2) ";
        }else{
            ls_SQLaux = ls_SQLaux + " and a.cod_estado = " +  DCbo_estado_tablet + " ";
        }
        break;
    case '9':
        if ( (Cb_programacion).trim() != "" ){
          document.getElementById('Txt_busqueda').value =  Cb_programacion ;
            
            if (Cb_programacion == "2"){
                ls_SQLaux = ls_SQLaux + " and a.flg_reprogramada = true ";
            }else{
                ls_SQLaux = ls_SQLaux + " and a.f_prog = '" +  (document.getElementById('Txt_busqueda').value).trim() + "' ";
            }
        }
        break;
    case '10':
        if ( ( document.getElementById('Txt_busqueda').value).trim() != "" ){
           ls_SQLaux =  ls_SQLaux + " and a.cod_aut_prestacion like '" +  (document.getElementById('Txt_busqueda').value).trim() + "%' ";
        }
        break;   
   case '12':
        if ( ( document.getElementById('Txt_busqueda').value).trim() != "") {
            ls_SQLaux =  ls_SQLaux + " and a.des_dis like '" +  (document.getElementById('Txt_busqueda').value).trim() + "%' ";
        }
    
    case '11':
    
        if ( Cbo_provincia == "TODOS" ){
             ls_SQLaux = ls_SQLaux + " and a.cod_prov <> 'L0' ";
        }else{
             ls_SQLaux = ls_SQLaux + " and prov.des_prov like '" +  (Cbo_provincia).trim() + "%' ";
        }
    
    case '13':
        switch ( Cb_zona ){
            case "0":
             break;
            case "1":
                 ls_SQLaux =  ls_SQLaux + " and dis.zona_cm = '1' ";
                 break;
            case "2, 3":
                 ls_SQLaux =  ls_SQLaux + " and dis.zona_cm in ('2', '3') ";
            break;
        }

    case '17':
    
        if ( (Cb_clasificacion).trim() != "" ){
        
            if (Cb_clasificacion == "0") {
                ls_SQLaux = ls_SQLaux  + " and a.clasificacion_pac = 0 ";
            
            }else if  (Cb_clasificacion == "1") {
                ls_SQLaux = ls_SQLaux  +  " and a.clasificacion_pac = 1 ";
               
               if (cbo_subclasificacion == "0" ) {
                    alert ("SELECCIONES UNA SUB-CLASIFICACION");
                    document.getElementById('CmdFiltrar').disabled = false;
                    return;
               }else if (cbo_subclasificacion == "1")  {
                 ls_SQLaux = ls_SQLaux + " and a.cod_subclasif = 2 ";
               }else if (cbo_subclasificacion == "2" ) {
                 ls_SQLaux = ls_SQLaux + " and a.cod_subclasif = 4 ";
               }               
            }else if (cbo_subclasificacion == "9")  {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 11 ";
            
            }else if (Cb_clasificacion == "2" ) {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 2 ";
                
            }else if (Cb_clasificacion == "3" ) {
                
                if ( (Dcbo_especialista).trim() != "TODOS")  {
                
                    ls_SQLaux = " AND a.clasificacion_pac = 3 AND a.cod_esp = '" + Dcbo_especialista + "' ";
 
                 }
                
            }else if (Cb_clasificacion == "7" ) {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 4 ";
                
            }else if (Cb_clasificacion == "NUTRICION-ESP" ) {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 5 ";
                
            }else if (Cb_clasificacion == "CHEQUEO MEDICO")  {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 9 ";
                
            }else if (Cb_clasificacion == "8" ) {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 7 ";
                
            }else if (Cb_clasificacion == "9" ) {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 11 ";
                
            }else if (Cb_clasificacion == "5" ) {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 204 ";
                
            }else if (Cb_clasificacion == "6")  {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 205 ";
                
            }else if (Cb_clasificacion == "4")  {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 24 ";
            
            }else if (Cb_clasificacion == "10" ) {
                ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 25 ";
            
            }else if (Cb_clasificacion == "11" ) {
              ls_SQLaux = ls_SQLaux + " and a.clasificacion_pac = 70 ";
          
          }
            break;
        }
        
    case '1':
         switch (Cbo_RAC){
            case "0":
                
            case "1":
                ls_SQLaux = ls_SQLaux  + " and dis.ruteo in ('01') ";
                break;
            case "2, 3, 6":
                 ls_SQLaux = ls_SQLaux + " and dis.ruteo in ('02', '03', '06') ";
                 break;
            case "4, 5":
                 ls_SQLaux = ls_SQLaux + " and dis.ruteo in ('04', '05') ";
                 break;
            case "7, 8":
                 ls_SQLaux = ls_SQLaux + " and dis.ruteo in ('07', '08') ";
                 break;
            case "10":
              case "11":
                ls_SQLaux =  ls_SQLaux + " and dis.ruteo in ('10', '11') ";
                break;
            case "9, 12":
                 ls_SQLaux = ls_SQLaux + " and dis.ruteo in ('09', '12') ";
                 break;
         }
        
    case "2":
        switch ( Cbo_ruteo){  
            case "0":
              break;
            case "1":
                 ls_SQLaux = ls_SQLaux + " and dis.nvo_ruteo in ('01') ";
                 break;
            case "2, 3, 4":
                 ls_SQLaux = ls_SQLaux + " and dis.nvo_ruteo in ('02', '03', '04') ";
                 break;
        }
        
    case "3":
                switch (Cbo_sub_zona){
                case "Todos":
                case "1":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '01' ";
                    break;
                case "2":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '02' ";
                    break;
                case "3":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '03' ";
                    break;
                case "4":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '04' ";
                    break;
                    case "5":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '05' ";
                    break;
                    case "6":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '06' ";
                    break;
                    case "7":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '07' ";
                    break;
                    case "8":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '08' ";
                    break;
                    case "9":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '09' ";
                    break;
                    case "10":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '10' ";
                    break;
                    case "11":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '11' ";
                    break;
                    case "12":
                    ls_SQLaux = ls_SQLaux + " and dis.ruteo = '12' ";
                    break;
                }
    }
    var query;
    ls_SQLaux  = ls_SQLaux  +  " and a.tipo_servicio = 'ATE' ";
    ls_SQLaux2 = ls_SQLaux;
    var htmlant='';

    //Set Grid_CM.DataSource = Nothing
    //Grid_CM.Clear
    //Grid_CM.Enabled = False
    //Grid_CM.rows = 2
  
    document.getElementById("cmdSeguimiento").disabled = true;
    document.getElementById("Cmd_MostrarDatos").disabled = true;
    document.getElementById("CmdCodAut").disabled = true;
    document.getElementById("Cmd_datos_paciente").disabled = true;



     
    if ( Cbo_opcion == "14" &&  ( document.getElementById('Txt_busqueda').value).trim() != "" ){
      query = "SELECT cm_estado, f_prog, cod_ate, CASE WHEN j.nom_subclasif is null THEN nom_clasif ELSE nom_clasif  || '-' || j.nom_subclasif END clasificacion, " 
      + " est.descripcion, COALESCE(cod_aut_prestacion,'') cod_aut_prestacion, feclla_ate, horlla_ate, coalesce(cast(cm_tiempo as varchar ),'') cm_tiempo, " 
      + " fec_ate, coalesce(cast(hor_ate as varchar ),'') hor_ate, coalesce(cast(hrlledr as varchar ),'') hrlledr, coalesce(cast(horoplla_ate as varchar ),'') horoplla_ate, trim(prov.des_prov) provincia, dis.des_dis, nom_pac, for_ate, pac_vip, " 
      + " pcons.descp_periodo_consulta periodo, " 
      + " CASE WHEN a.id_periodo_consulta = 0 THEN '-' ELSE (a.contador_periodo || '/' || a.periodo_mes) END cont, case when clasificacion_pac = 70 then case when a.modo_atencion_medico = 0  then 'VISITA DOMICILIARIA' when  a.modo_atencion_medico = 1  then 'TELECONSULTA' else  'LLAMADA DE SEGUIMIENTO' end else CASE WHEN a.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN a.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END end perfil_ate, " 
      + " abr_esp, trim (coalesce(dr.nom_doc,'')) nom_doc, nom_gru, coalesce(a.empresa_paciente,'') empresa_paciente, coalesce(usulla_ate,'') usulla_ate, coalesce(dr.cod_doc,'') " 
      + " FROM T_TMPLLAMADAS as a " 
      + " INNER JOIN mae_periodo_consulta pcons ON a.id_periodo_consulta = pcons.id_periodo_consulta " 
      + " LEFT JOIN m_doctores dr ON a.cod_doc = dr.cod_doc " 
      + " LEFT JOIN m_estado est ON a.cod_estado = est.cod_estado " 
      + " LEFT JOIN m_especialidades as b on a.cod_esp = b.cod_esp " 
      + " LEFT JOIN m_clasificacion_pac as c on a.clasificacion_pac = c.cod_clasif " 
      + " LEFT JOIN m_subclasificacion_pac AS J ON A.cod_subclasif=J.cod_subclasif " 
      + " LEFT JOIN m_distritos dis ON a.cod_dis = dis.cod_dis " 
      + " LEFT JOIN m_provincias prov ON dis.cod_prov = prov.cod_prov " 
      + " WHERE a.cod_ate = " +  (document.getElementById('Txt_busqueda').value).trim() + ls_SQLaux;
      await fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
  
        })
      }).then(response => response.json())
        .then(async function (data) {
          var html = '';
          var i;
         
                     
        //Frame1.Caption = "Consultas médicas"
        if (data.length>0) {
          for (i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');   
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');
            var td5 = document.createElement('td');
            var td6 = document.createElement('td');
            var td7 = document.createElement('td');
            var td8 = document.createElement('td');
            var td9 = document.createElement('td');
            var td10 = document.createElement('td');
            var td11 = document.createElement('td');
            var td12 = document.createElement('td');
            var td13 = document.createElement('td');
            var td14 = document.createElement('td');
            var td15 = document.createElement('td');
            var td16 = document.createElement('td'); 
            var td17 = document.createElement('td');
            var td18 = document.createElement('td');
            var td19 = document.createElement('td');
            var td20 = document.createElement('td');
            var td21 = document.createElement('td');
            var td22 = document.createElement('td');
            var td23 = document.createElement('td'); 
            var td24 = document.createElement('td');
            var td25 = document.createElement('td');
            var td26 = document.createElement('td');
            var td27 = document.createElement('td');
             td1.appendChild(document.createTextNode(data[i].cm_estado));
            td2.appendChild(document.createTextNode(data[i].f_prog));
            td3.appendChild(document.createTextNode(data[i].cod_ate));
            td4.appendChild(document.createTextNode(data[i].clasificacion));
            td5.appendChild(document.createTextNode(data[i].descripcion));
            td6.appendChild(document.createTextNode(data[i].cod_aut_prestacion));
            td7.appendChild(document.createTextNode(data[i].feclla_ate));
            td8.appendChild(document.createTextNode(data[i].horlla_ate));
            td9.appendChild(document.createTextNode(data[i].cm_tiempo));
            td10.appendChild(document.createTextNode(data[i].fec_ate));
            td11.appendChild(document.createTextNode(data[i].hor_ate));
            td12.appendChild(document.createTextNode(data[i].hrlledr));
            td13.appendChild(document.createTextNode(data[i].horoplla_ate));
            td14.appendChild(document.createTextNode(data[i].provincia));
            td15.appendChild(document.createTextNode(data[i].des_dis));
            td16.appendChild(document.createTextNode(data[i].nom_pac));
            td17.appendChild(document.createTextNode(data[i].for_ate));
            td18.appendChild(document.createTextNode(data[i].pac_vip));
            td19.appendChild(document.createTextNode(data[i].periodo));
            td20.appendChild(document.createTextNode(data[i].cont));
            td21.appendChild(document.createTextNode(data[i].perfil_ate));
            td22.appendChild(document.createTextNode(data[i].abr_esp));
            td23.appendChild(document.createTextNode(data[i].nom_doc));
            td24.appendChild(document.createTextNode(data[i].nom_gru));
            td25.appendChild(document.createTextNode(data[i].empresa_paciente));
            td26.appendChild(document.createTextNode(data[i].usulla_ate));
            td27.appendChild(document.createTextNode(data[i].cod_doc)); td27.style.display = 'none';
            tr.id = data[i].cod_ate;
            tr.onclick = function() {
              if (filacurrent!='')  document.getElementById(filacurrent).classList.remove('selected');
               this.classList.add("selected");
              filacurrent = this.id;
              var EsCronico ;
              var FechaPlazo;
              
              var permite_cambios_ate ;
              
              EsCronico = false;
               document.getElementById("Cmd_MostrarDatos").focus();
              document.getElementById("Cmd_datos_paciente").disabled = false;
              document.getElementById("Cmd_reingresar_ate_tablet").disabled = true;
             
              permite_cambios_ate = true
            
               
               var row = document.getElementById(filacurrent);
            
            if  (row.cells[3].innerHTML.trim() == "MAXISALUD" ||  row.cells[3].innerHTML.trim().indexOf("RONICO") > 0) {
            EsCronico = true;
            }
            
            switch (row.cells[0].innerHTML.trim()) {
            case "0", "A", "1":
              document.getElementById("Cmd_datos_paciente").disabled = true;   
              break;
            }
            
            permite_cambios_ate = true;
            document.getElementById("CmdCodAut").disabled = false;   
             
             
            
            switch (row.cells[0].innerHTML.trim()){
               
                  case "2":
                  case "RT2":
                  case "RP2":
                      if (EsCronico == true ){
                        document.getElementById("Cmd_reprogramar").disabled = false;   
                        document.getElementById("CmdCodAut").disabled = true;   
             
                      }
                      break;
            
                  case "3":
                  case "4":
                  case "5":
                  case "6": 
                  case "7": 
                  case "R3":
                  case "R4":
                  case "R5": 
                  case "R6": 
                  case"R7":
                    document.getElementById("Cmd_reprogramar").disabled = false;    
                      if (EsCronico ==true) {
                          if (XPermisoReingreso == 10 || XPermisoReingreso == 11 ) {//ambos
                               document.getElementById("Cmd_reingresar_ate_tablet").disabled = false;   
                          }
                      }else{
                          if (XPermisoReingreso == 1 || XPermisoReingreso == 11){  //agudo
                            document.getElementById("Cmd_reingresar_ate_tablet").disabled = false;   
                          }
                    }
                    break;
            
                  case "8":
                    
                      fetch('/modulo/permite_ingreso', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                  body: JSON.stringify({
                    codigo: 107
                    })
            
                      }).then(response => response.json())
                        .then(function (data1) {
                          if(data1){
                            if (EsCronico == true) {
                                    //permite_cambios_ate = FN_REALIZAR_CAMBIOS_ATE(row.cells[2].innerHTML.trim(),row.cells[0].innerHTML.trim(),row.cells[9].innerHTML.trim(), row.cells[12].innerHTML.trim(), 3);
                            }else{
                                    permite_cambios_ate = true;
                            }
            
                           }
                        }).catch(error => {
                          console.log(error);
                        });
                    break;
            
            }
              };
            tr.ondblclick = function() {
              if (document.getElementById('Chk_finalizadas').checked == true){
                // Cmd_datos_paciente_Click();
              }else{
                    Cmd_MostrarDatos_Click();
              }
                };
            tr.appendChild(td1); 
            tr.appendChild(td2); 
            tr.appendChild(td3); 
            tr.appendChild(td4); 
            tr.appendChild(td5); 
            tr.appendChild(td6); 
            tr.appendChild(td7); 
            tr.appendChild(td8); 
            tr.appendChild(td9); 
            tr.appendChild(td10); 
            tr.appendChild(td11); 
            tr.appendChild(td12); 
            tr.appendChild(td13); 
            tr.appendChild(td14); 
            tr.appendChild(td15); 
            tr.appendChild(td16); 
            tr.appendChild(td17); 
            tr.appendChild(td18); 
            tr.appendChild(td19); 
            tr.appendChild(td20); 
            tr.appendChild(td21); 
            tr.appendChild(td22); 
            tr.appendChild(td23); 
            tr.appendChild(td24); 
            tr.appendChild(td25); 
            tr.appendChild(td26); 
            tr.appendChild(td27); 
             document.getElementById('t02').appendChild(tr);
          }
            document.getElementById("cmdSeguimiento").disabled = false;
            if (document.getElementById("Chk_finalizadas").checked == false ) {
              document.getElementById("Cmd_MostrarDatos").disabled = false;
             }
             document.getElementById("CmdCodAut").disabled = false;
              
              
        }else{
            alert ("No se encuentra la consulta medica");
        }
          document.getElementById("CmdFiltrar").disabled = false;
     
          document.body.style.cursor = 'default';
          document.getElementById('Frame1').innerHTML = "Consultas médicas pendientes: " + data.length;
  
        }).catch(error => {
          console.log(error);
        });

        return;
     }else if (Cbo_opcion == "15" && (document.getElementById('Txt_busqueda').value).trim() != "" ){

       
         query = "SELECT cm_estado, f_prog, cod_ate, CASE WHEN j.nom_subclasif is null THEN nom_clasif  ELSE nom_clasif  || '-' || j.nom_subclasif END clasificacion, " 
        + " est.descripcion,COALESCE(a.cod_aut_prestacion,'') cod_aut_prestacion, feclla_ate, horlla_ate, coalesce(cast(cm_tiempo as varchar ),'') cm_tiempo, fec_ate, " 
        + " coalesce(cast(hor_ate as varchar ),'') hor_ate,coalesce(cast(hrlledr as varchar ),'') hrlledr, coalesce(cast(horoplla_ate as varchar ),'') horoplla_ate, trim(prov.des_prov) provincia, dis.des_dis, nom_pac, for_ate, pac_vip, " 
        + " pcons.descp_periodo_consulta periodo, " 
        + " CASE WHEN a.id_periodo_consulta = 0 THEN '-' ELSE (a.contador_periodo || '/' || a.periodo_mes) END cont,case when clasificacion_pac = 70 then case when a.modo_atencion_medico = 0  then 'VISITA DOMICILIARIA' when  a.modo_atencion_medico = 1  then 'TELECONSULTA' else  'LLAMADA DE SEGUIMIENTO' end else CASE WHEN a.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN a.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END end  perfil_ate, " 
        + " abr_esp, coalesce(dr.nom_doc,'') nom_doc, nom_gru, coalesce(a.empresa_paciente,'') empresa_paciente, coalesce(usulla_ate,'') usulla_ate, coalesce(dr.cod_doc,'') cod_doc " 
        + " FROM T_TMPLLAMADAS as a " 
        + " INNER JOIN mae_periodo_consulta pcons ON a.id_periodo_consulta = pcons.id_periodo_consulta " 
        + " LEFT JOIN m_doctores dr ON a.cod_doc = dr.cod_doc " 
        + " LEFT JOIN m_estado est ON a.cod_estado = est.cod_estado " 
        + " LEFT JOIN m_especialidades as b on a.cod_esp = b.cod_esp " 
        + " LEFT JOIN m_clasificacion_pac as c on a.clasificacion_pac = c.cod_clasif " 
        + " LEFT JOIN m_subclasificacion_pac AS J ON A.cod_subclasif = J.cod_subclasif " 
        + " LEFT JOIN m_distritos dis ON a.cod_dis = dis.cod_dis " 
        + " LEFT JOIN  m_provincias prov ON dis.cod_prov = prov.cod_prov " 
        + " WHERE cm_estado in ('2', '3', 'R2', 'RT2', 'RP2', 'R3') " + ls_SQLaux 
        + " AND fec_ate = '" + document.getElementById('fec_inicial').value + "'" 
        + " AND dr.nom_doc like '%" + (document.getElementById('Txt_busqueda').value).toUpperCase().trim() + "%'" 
        + " ORDER BY a.fec_ate ASC, a.hor_ate ASC";
        await fetch('/modulo/Abre_Detalle/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: query
    
          })
        }).then(response => response.json())
          .then(async function (data) {
            var html = '';
            var i; 
          //Frame1.Caption = "Consultas médicas"
          if (data.length>0) {
            for (i = 0; i < data.length; i++) {
              var tr = document.createElement('tr');   
              var td1 = document.createElement('td');
              var td2 = document.createElement('td');
              var td3 = document.createElement('td');
              var td4 = document.createElement('td');
              var td5 = document.createElement('td');
              var td6 = document.createElement('td');
              var td7 = document.createElement('td');
              var td8 = document.createElement('td');
              var td9 = document.createElement('td');
              var td10 = document.createElement('td');
              var td11 = document.createElement('td');
              var td12 = document.createElement('td');
              var td13 = document.createElement('td');
              var td14 = document.createElement('td');
              var td15 = document.createElement('td');
              var td16 = document.createElement('td'); 
              var td17 = document.createElement('td');
              var td18 = document.createElement('td');
              var td19 = document.createElement('td');
              var td20 = document.createElement('td');
              var td21 = document.createElement('td');
              var td22 = document.createElement('td');
              var td23 = document.createElement('td'); 
              var td24 = document.createElement('td');
              var td25 = document.createElement('td');
              var td26 = document.createElement('td');
              var td27 = document.createElement('td');
               td1.appendChild(document.createTextNode(data[i].cm_estado));
              td2.appendChild(document.createTextNode(data[i].f_prog));
              td3.appendChild(document.createTextNode(data[i].cod_ate));
              td4.appendChild(document.createTextNode(data[i].clasificacion));
              td5.appendChild(document.createTextNode(data[i].descripcion));
              td6.appendChild(document.createTextNode(data[i].cod_aut_prestacion));
              td7.appendChild(document.createTextNode(data[i].feclla_ate));
              td8.appendChild(document.createTextNode(data[i].horlla_ate));
              td9.appendChild(document.createTextNode(data[i].cm_tiempo));
              td10.appendChild(document.createTextNode(data[i].fec_ate));
              td11.appendChild(document.createTextNode(data[i].hor_ate));
              td12.appendChild(document.createTextNode(data[i].hrlledr));
              td13.appendChild(document.createTextNode(data[i].horoplla_ate));
              td14.appendChild(document.createTextNode(data[i].provincia));
              td15.appendChild(document.createTextNode(data[i].des_dis));
              td16.appendChild(document.createTextNode(data[i].nom_pac));
              td17.appendChild(document.createTextNode(data[i].for_ate));
              td18.appendChild(document.createTextNode(data[i].pac_vip));
              td19.appendChild(document.createTextNode(data[i].periodo));
              td20.appendChild(document.createTextNode(data[i].cont));
              td21.appendChild(document.createTextNode(data[i].perfil_ate));
              td22.appendChild(document.createTextNode(data[i].abr_esp));
              td23.appendChild(document.createTextNode(data[i].nom_doc));
              td24.appendChild(document.createTextNode(data[i].nom_gru));
              td25.appendChild(document.createTextNode(data[i].empresa_paciente));
              td26.appendChild(document.createTextNode(data[i].usulla_ate));
              td27.appendChild(document.createTextNode(data[i].cod_doc)); td27.style.display = 'none';
              tr.id = data[i].cod_ate;
              tr.onclick = function() {
                if (filacurrent!='')  document.getElementById(filacurrent).classList.remove('selected');
                 this.classList.add("selected");
                filacurrent = this.id;
                var EsCronico ;
                var FechaPlazo;
                
                var permite_cambios_ate ;
                
                EsCronico = false;
                 document.getElementById("Cmd_MostrarDatos").focus();
                document.getElementById("Cmd_datos_paciente").disabled = false;
                document.getElementById("Cmd_reingresar_ate_tablet").disabled = true;
               
                permite_cambios_ate = true
              
                
                 var row = document.getElementById(filacurrent);
              
              if  (row.cells[3].innerHTML.trim() == "MAXISALUD" ||  row.cells[3].innerHTML.trim().indexOf("RONICO") > 0) {
              EsCronico = true;
              }
              
              switch (row.cells[0].innerHTML.trim()) {
              case "0", "A", "1":
                document.getElementById("Cmd_datos_paciente").disabled = true;   
                break;
              }
              
              permite_cambios_ate = true;
              document.getElementById("CmdCodAut").disabled = false;   
               
               
              
              switch (row.cells[0].innerHTML.trim()){
                 
                    case "2":
                    case "RT2":
                    case "RP2":
                        if (EsCronico == true ){
                          document.getElementById("Cmd_reprogramar").disabled = false;   
                          document.getElementById("CmdCodAut").disabled = true;   
               
                        }
                        break;
              
                    case "3":
                    case "4":
                    case "5":
                    case "6": 
                    case "7": 
                    case "R3":
                    case "R4":
                    case "R5": 
                    case "R6": 
                    case"R7":
                      document.getElementById("Cmd_reprogramar").disabled = false;    
                        if (EsCronico ==true) {
                            if (XPermisoReingreso == 10 || XPermisoReingreso == 11 ) {//ambos
                                 document.getElementById("Cmd_reingresar_ate_tablet").disabled = false;   
                            }
                        }else{
                            if (XPermisoReingreso == 1 || XPermisoReingreso == 11){  //agudo
                              document.getElementById("Cmd_reingresar_ate_tablet").disabled  = false;
                            }
                      }
                      break;
              
                    case "8":
                      
                        fetch('/nutricion/permite_ingreso', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                    body: JSON.stringify({
                      codigo: 107
                      })
              
                        }).then(response => response.json())
                          .then(function (data1) {
                            if(data1){
                              if (EsCronico == true) {
                                      permite_cambios_ate = FN_REALIZAR_CAMBIOS_ATE(row.cells[2].innerHTML.trim(),row.cells[0].innerHTML.trim(),row.cells[9].innerHTML.trim(), row.cells[12].innerHTML.trim(), 3);
                              }else{
                                      permite_cambios_ate = true;
                              }
              
                             }
                          }).catch(error => {
                            console.log(error);
                          });
                      break;
              
              }
                };
                tr.ondblclick = function() {
                  if (document.getElementById('Chk_finalizadas').checked == true){
                       // Cmd_datos_paciente_Click();
                  }else{
                        Cmd_MostrarDatos_Click();
                  }
    
                };
              tr.appendChild(td1); 
              tr.appendChild(td2); 
              tr.appendChild(td3); 
              tr.appendChild(td4); 
              tr.appendChild(td5); 
              tr.appendChild(td6); 
              tr.appendChild(td7); 
              tr.appendChild(td8); 
              tr.appendChild(td9); 
              tr.appendChild(td10); 
              tr.appendChild(td11); 
              tr.appendChild(td12); 
              tr.appendChild(td13); 
              tr.appendChild(td14); 
              tr.appendChild(td15); 
              tr.appendChild(td16); 
              tr.appendChild(td17); 
              tr.appendChild(td18); 
              tr.appendChild(td19); 
              tr.appendChild(td20); 
              tr.appendChild(td21); 
              tr.appendChild(td22); 
              tr.appendChild(td23); 
              tr.appendChild(td24); 
              tr.appendChild(td25); 
              tr.appendChild(td26); 
              tr.appendChild(td27); 
               document.getElementById('t02').appendChild(tr);
            }
              document.getElementById("cmdSeguimiento").disabled = false;
              if (document.getElementById("Chk_finalizadas").checked == false ) {
                document.getElementById("Cmd_MostrarDatos").disabled = false;
              }
               document.getElementById("CmdCodAut").disabled = false;
               document.getElementById('Frame1').innerHTML = "Consultas médicas pendientes: " + data.length;

          }else{
              alert ("No hay resultados con el medico buscado para la fecha de atencion indicada");
          }
          document.getElementById("CmdFiltrar").disabled = false;

            $('#t02').html(html);
         

       
    
          }).catch(error => {
            console.log(error);
          }); 
          document.body.style.cursor = 'default';
          document.getElementById("Cmd_exportar").style.display = 'inline-block';
           return;
     }
     if (document.getElementById("Chk_finalizadas").checked == false) {

     //PARA MOSTRAR EN EL GRID
    //la carga se realiza en el adata2
     //carga el primer criterio de ordenamiento
     //cm_orden asc
     //feclla_ate asc
     //horlla_ate asc
    
      switch (Cbo_opcion){
         case "18":
           case "4": 
           case "6":
             ls_SQLaux = "SELECT cm_estado, f_prog, cod_ate, CASE WHEN j.nom_subclasif is null THEN nom_clasif  ELSE nom_clasif  || '-' || j.nom_subclasif END clasificacion, " 
               + " est.descripcion, COALESCE(a.cod_aut_prestacion,'')  cod_aut_prestacion, feclla_ate, horlla_ate, coalesce(cast(cm_tiempo as varchar ),'') cm_tiempo, fec_ate, " 
               + " coalesce(cast(hor_ate as varchar ),'') hor_ate, coalesce(cast(hrlledr as varchar ),'') hrlledr, coalesce(cast(horoplla_ate as varchar ),'') horoplla_ate, trim(prov.des_prov) provincia, dis.des_dis, nom_pac, for_ate, pac_vip, " 
               + " pcons.descp_periodo_consulta periodo, " 
               + " CASE WHEN a.id_periodo_consulta = 0 THEN '-' ELSE (a.contador_periodo || '/' || a.periodo_mes) END cont, case when clasificacion_pac = 70 then case when a.modo_atencion_medico = 0  then 'VISITA DOMICILIARIA' when  a.modo_atencion_medico = 1  then 'TELECONSULTA' else  'LLAMADA DE SEGUIMIENTO' end else CASE WHEN a.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN a.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END end perfil_ate, " 
               + " abr_esp, coalesce(dr.nom_doc,'') nom_doc, nom_gru, coalesce(a.empresa_paciente,'') empresa_paciente, coalesce(usulla_ate,'') usulla_ate, coalesce(dr.cod_doc,'') cod_doc " 
               + " FROM T_TMPLLAMADAS as a " 
               + " INNER JOIN mae_periodo_consulta pcons ON a.id_periodo_consulta = pcons.id_periodo_consulta " 
               + " LEFT JOIN m_doctores dr ON a.cod_doc = dr.cod_doc LEFT JOIN m_estado est ON a.cod_estado = est.cod_estado LEFT JOIN m_especialidades as b on a.cod_esp = b.cod_esp left join m_clasificacion_pac as c on a.clasificacion_pac = c.cod_clasif LEFT  JOIN m_subclasificacion_pac AS J ON A.cod_subclasif=J.cod_subclasif LEFT JOIN m_distritos dis ON a.cod_dis = dis.cod_dis LEFT JOIN m_provincias prov ON dis.cod_prov = prov.cod_prov WHERE cm_estado not in ('8', 'C', 'P', 'V', 'I', 'NC', 'RP', 'X') " + ls_SQLaux;
               break;
         case "10":
           case  "14":
             ls_SQLaux = "SELECT cm_estado, f_prog, cod_ate, CASE WHEN j.nom_subclasif is null THEN nom_clasif  ELSE nom_clasif  || '-' || j.nom_subclasif END clasificacion, " 
               + " est.descripcion, COALESCE(a.cod_aut_prestacion,'') cod_aut_prestacion, feclla_ate, horlla_ate, coalesce(cast(cm_tiempo as varchar ),'') cm_tiempo, fec_ate, " 
               + " coalesce(cast(hor_ate as varchar ),'') hor_ate, coalesce(cast(hrlledr as varchar ),'') hrlledr, coalesce(cast(horoplla_ate as varchar ),'') horoplla_ate, trim(prov.des_prov) provincia, dis.des_dis, nom_pac, for_ate, pac_vip, " 
               + " pcons.descp_periodo_consulta periodo, " 
               + " CASE WHEN a.id_periodo_consulta = 0 THEN '-' ELSE (a.contador_periodo || '/' || a.periodo_mes) END cont, case when clasificacion_pac = 70 then case when a.modo_atencion_medico = 0  then 'VISITA DOMICILIARIA' when  a.modo_atencion_medico = 1  then 'TELECONSULTA' else  'LLAMADA DE SEGUIMIENTO' end else CASE WHEN a.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN a.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END end perfil_ate, " 
               + " abr_esp,coalesce(dr.nom_doc,'') nom_doc, nom_gru,coalesce(a.empresa_paciente,'') empresa_paciente,  coalesce(usulla_ate,'') usulla_ate, coalesce(dr.cod_doc,'') cod_doc " 
               + " FROM T_TMPLLAMADAS as a " 
               + " INNER JOIN mae_periodo_consulta pcons ON a.id_periodo_consulta = pcons.id_periodo_consulta " 
               + " LEFT JOIN m_doctores dr ON a.cod_doc = dr.cod_doc LEFT JOIN m_estado est ON a.cod_estado = est.cod_estado LEFT JOIN m_especialidades as b on a.cod_esp = b.cod_esp left join m_clasificacion_pac as c on a.clasificacion_pac = c.cod_clasif LEFT  JOIN m_subclasificacion_pac AS J ON A.cod_subclasif=J.cod_subclasif LEFT JOIN m_distritos dis ON a.cod_dis = dis.cod_dis LEFT JOIN m_provincias prov ON dis.cod_prov = prov.cod_prov WHERE cm_estado not in ('XY') " + ls_SQLaux;
               break;
         default:
             ls_SQLaux = "SELECT cm_estado, f_prog, cod_ate, CASE WHEN j.nom_subclasif is null THEN nom_clasif  ELSE nom_clasif  || '-' || j.nom_subclasif END clasificacion, " 
               + " est.descripcion, COALESCE(a.cod_aut_prestacion,'') cod_aut_prestacion, feclla_ate, horlla_ate, coalesce(cast(cm_tiempo as varchar ),'') cm_tiempo, fec_ate, " 
               + " coalesce(cast(hor_ate as varchar ),'') hor_ate, coalesce(cast(hrlledr as varchar ),'') hrlledr, coalesce(cast(horoplla_ate as varchar ),'') horoplla_ate, trim(prov.des_prov) provincia, dis.des_dis, nom_pac, for_ate, pac_vip, " 
               + " pcons.descp_periodo_consulta periodo, " 
               + " CASE WHEN a.id_periodo_consulta = 0 THEN '-' ELSE (a.contador_periodo || '/' || a.periodo_mes) END cont, case when clasificacion_pac = 70 then case when a.modo_atencion_medico = 0  then 'VISITA DOMICILIARIA' when  a.modo_atencion_medico = 1  then 'TELECONSULTA' else  'LLAMADA DE SEGUIMIENTO' end else CASE WHEN a.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN a.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END end perfil_ate, " 
               + " abr_esp, coalesce(dr.nom_doc,'') nom_doc, nom_gru, coalesce(a.empresa_paciente,'') empresa_paciente,  coalesce(usulla_ate,'') usulla_ate, coalesce(dr.cod_doc,'') cod_doc " 
               + " FROM T_TMPLLAMADAS as a " 
               + " INNER JOIN mae_periodo_consulta pcons ON a.id_periodo_consulta = pcons.id_periodo_consulta " 
               + " LEFT JOIN m_doctores dr ON a.cod_doc = dr.cod_doc LEFT JOIN m_estado est ON a.cod_estado = est.cod_estado LEFT JOIN m_especialidades as b on a.cod_esp = b.cod_esp left join m_clasificacion_pac as c on a.clasificacion_pac = c.cod_clasif LEFT  JOIN m_subclasificacion_pac AS J ON A.cod_subclasif=J.cod_subclasif LEFT JOIN m_distritos dis ON a.cod_dis = dis.cod_dis LEFT JOIN m_provincias prov ON dis.cod_prov = prov.cod_prov WHERE cm_estado in ('0', 'A', '1', '2', 'R0', 'RA', 'R1', 'R2', 'RT2', 'RP2') " + ls_SQLaux;
               break;
      }
     
     
     switch (Cbo_opcion){
         case "16":
             //PRIMER FILTRO
             ls_SQLaux = ls_SQLaux + " AND fec_ate = '" + document.getElementById('fec_inicial').value  + "' ORDER BY dr.nom_doc ASC, a.fec_ate ASC, a.hor_ate ASC";
             break;
         case "5":
             ls_SQLaux = ls_SQLaux + " AND feclla_ate >= '" + document.getElementById('fec_inicial').value  + "'  ORDER BY  a.cm_orden DESC, dr.nom_doc ASC, a.fec_ate ASC, a.hor_ate ASC";
             break;
         case "4":
             ls_SQLaux = ls_SQLaux + " AND feclla_ate >= '" + document.getElementById('fec_inicial').value  + "' ORDER BY  a.cm_orden ASC, a.feclla_ate ASC, a.horlla_ate ASC";
             break;
         case "18":
             ls_SQLaux = ls_SQLaux + " AND feclla_ate >= '" + document.getElementById('fec_inicial').value  + "' ORDER BY  a.cm_orden ASC, a.feclla_ate ASC, a.horlla_ate ASC";
             break;
         case "11":
             ls_SQLaux = ls_SQLaux + " AND fec_ate >= '" + document.getElementById('fec_inicial').value  + "' ORDER BY  a.cm_orden ASC, a.feclla_ate ASC, a.horlla_ate ASC";
             break;
         default:
             if (document.getElementById('Cb_zona').style.display == 'block' || document.getElementById('Cbo_ruteo').style.display == 'block' || document.getElementById('Cbo_RAC').style.display == 'block' || document.getElementById('Cbo_sub_zona') == 'block' ){
                 ls_SQLaux = ls_SQLaux + " AND fec_ate = '" + document.getElementById('fec_inicial').value  + "' ORDER BY  a.cm_orden ASC, a.feclla_ate ASC, a.horlla_ate ASC";
             }else{
                 ls_SQLaux = ls_SQLaux + " AND feclla_ate >= current_date - 90 ORDER BY  a.cm_orden ASC, a.feclla_ate ASC, a.horlla_ate ASC";
             }
             break;
     }
              
     
    await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: ls_SQLaux

      })
    }).then(response => response.json())
      .then(async function (data) {
        var html = '';
        var i=0; 
                   
      //Frame1.Caption = "Consultas médicas"
      if (data.length>0) {
          Adata2 = data.length;

        for (; i < data.length; i++) {
          var tr = document.createElement('tr');   
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
          var td5 = document.createElement('td');
          var td6 = document.createElement('td');
          var td7 = document.createElement('td');
          var td8 = document.createElement('td');
          var td9 = document.createElement('td');
          var td10 = document.createElement('td');
          var td11 = document.createElement('td');
          var td12 = document.createElement('td');
          var td13 = document.createElement('td');
          var td14 = document.createElement('td');
          var td15 = document.createElement('td');
          var td16 = document.createElement('td'); 
          var td17 = document.createElement('td');
          var td18 = document.createElement('td');
          var td19 = document.createElement('td');
          var td20 = document.createElement('td');
          var td21 = document.createElement('td');
          var td22 = document.createElement('td');
          var td23 = document.createElement('td'); 
          var td24 = document.createElement('td');
          var td25 = document.createElement('td');
          var td26 = document.createElement('td');
          var td27 = document.createElement('td');
           td1.appendChild(document.createTextNode(data[i].cm_estado));
          td2.appendChild(document.createTextNode(data[i].f_prog));
          td3.appendChild(document.createTextNode(data[i].cod_ate));
          td4.appendChild(document.createTextNode(data[i].clasificacion));
          td5.appendChild(document.createTextNode(data[i].descripcion));
          td6.appendChild(document.createTextNode(data[i].cod_aut_prestacion));
          td7.appendChild(document.createTextNode(data[i].feclla_ate));
          td8.appendChild(document.createTextNode(data[i].horlla_ate));
          td9.appendChild(document.createTextNode(data[i].cm_tiempo));
          td10.appendChild(document.createTextNode(data[i].fec_ate));
          td11.appendChild(document.createTextNode(data[i].hor_ate));
          td12.appendChild(document.createTextNode(data[i].hrlledr));
          td13.appendChild(document.createTextNode(data[i].horoplla_ate));
          td14.appendChild(document.createTextNode(data[i].provincia));
          td15.appendChild(document.createTextNode(data[i].des_dis));
          td16.appendChild(document.createTextNode(data[i].nom_pac));
          td17.appendChild(document.createTextNode(data[i].for_ate));
          td18.appendChild(document.createTextNode(data[i].pac_vip));
          td19.appendChild(document.createTextNode(data[i].periodo));
          td20.appendChild(document.createTextNode(data[i].cont));
          td21.appendChild(document.createTextNode(data[i].perfil_ate));
          td22.appendChild(document.createTextNode(data[i].abr_esp));
          td23.appendChild(document.createTextNode(data[i].nom_doc));
          td24.appendChild(document.createTextNode(data[i].nom_gru));
          td25.appendChild(document.createTextNode(data[i].empresa_paciente));
          td26.appendChild(document.createTextNode(data[i].usulla_ate));
          td27.appendChild(document.createTextNode(data[i].cod_doc)); td27.style.display = 'none';
          tr.id = data[i].cod_ate;
          tr.onclick = function() {
            if (filacurrent!='')  document.getElementById(filacurrent).classList.remove('selected');
             this.classList.add("selected");
            filacurrent = this.id;
            var EsCronico ;
              var FechaPlazo;
              
              var permite_cambios_ate ;
              
              EsCronico = false;
               document.getElementById("Cmd_MostrarDatos").focus();
              document.getElementById("Cmd_datos_paciente").disabled = false;
              document.getElementById("Cmd_reingresar_ate_tablet").disabled = true;
             
              permite_cambios_ate = true
            
               
               var row = document.getElementById(filacurrent);
            
            if  (row.cells[3].innerHTML.trim() == "MAXISALUD" ||  row.cells[3].innerHTML.trim().indexOf("RONICO") > 0) {
            EsCronico = true;
            }
            
            switch (row.cells[0].innerHTML.trim()) {
            case "0", "A", "1":
              document.getElementById("Cmd_datos_paciente").disabled = true;   
              break;
            }
            
            permite_cambios_ate = true;
            document.getElementById("CmdCodAut").disabled = false;   
             
            
            
            switch (row.cells[0].innerHTML.trim()){
               
                  case "2":
                  case "RT2":
                  case "RP2":
                      if (EsCronico == true ){
                        document.getElementById("Cmd_reprogramar").disabled = false;   
                        document.getElementById("CmdCodAut").disabled = true;   
             
                      }
                      break;
            
                  case "3":
                  case "4":
                  case "5":
                  case "6": 
                  case "7": 
                  case "R3":
                  case "R4":
                  case "R5": 
                  case "R6": 
                  case"R7":
                    document.getElementById("Cmd_reprogramar").disabled = false;    
                      if (EsCronico ==true) {
                          if (XPermisoReingreso == 10 || XPermisoReingreso == 11 ) {//ambos
                               document.getElementById("Cmd_reingresar_ate_tablet").disabled = false;   
                          }
                      }else{
                          if (XPermisoReingreso == 1 || XPermisoReingreso == 11){  //agudo
                            document.getElementById("Cmd_reingresar_ate_tablet").disabled  = false;

                          }
                    }
                    break;
            
                  case "8":
                    
                      fetch('/nutricion/permite_ingreso', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                  body: JSON.stringify({
                    codigo: 107
                    })
            
                      }).then(response => response.json())
                        .then(function (data1) {
                          if(data1){
                            if (EsCronico == true) {
                                    permite_cambios_ate = FN_REALIZAR_CAMBIOS_ATE(row.cells[2].innerHTML.trim(),row.cells[0].innerHTML.trim(),row.cells[9].innerHTML.trim(), row.cells[12].innerHTML.trim(), 3);
                            }else{
                                    permite_cambios_ate = true;
                            }
            
                           }
                        }).catch(error => {
                          console.log(error);
                        });
                    break;
            
            }
            };
            tr.ondblclick = function() {
              if (document.getElementById('Chk_finalizadas').checked == true){
                // Cmd_datos_paciente_Click();
              }else{
                    Cmd_MostrarDatos_Click();
              }
                };
          tr.appendChild(td1); 
          tr.appendChild(td2); 
          tr.appendChild(td3); 
          tr.appendChild(td4); 
          tr.appendChild(td5); 
          tr.appendChild(td6); 
          tr.appendChild(td7); 
          tr.appendChild(td8); 
          tr.appendChild(td9); 
          tr.appendChild(td10); 
          tr.appendChild(td11); 
          tr.appendChild(td12); 
          tr.appendChild(td13); 
          tr.appendChild(td14); 
          tr.appendChild(td15); 
          tr.appendChild(td16); 
          tr.appendChild(td17); 
          tr.appendChild(td18); 
          tr.appendChild(td19); 
          tr.appendChild(td20); 
          tr.appendChild(td21); 
          tr.appendChild(td22); 
          tr.appendChild(td23); 
          tr.appendChild(td24); 
          tr.appendChild(td25); 
          tr.appendChild(td26); 
          tr.appendChild(td27); 
           document.getElementById('t02').appendChild(tr);
        }
        
           hay_datos = true;
      } 

        
       

                  //return;


      }).catch(error => {
        console.log(error);
      });
     //carga segun el segundo criterio de ordenacion
     //cm_orden desc
     //nom_doc asc
     //fec_ate asc
     //hor_ate asc
     
     ls_SQLaux2 = "SELECT cm_estado, f_prog, cod_ate, CASE WHEN j.nom_subclasif is null THEN nom_clasif  ELSE nom_clasif  || '-' || j.nom_subclasif END clasificacion, " 
               + " est.descripcion, COALESCE(a.cod_aut_prestacion,'') cod_aut_prestacion, feclla_ate, horlla_ate, coalesce(cast(cm_tiempo as varchar ),'') cm_tiempo, fec_ate, " 
               + " coalesce(cast(hor_ate as varchar ),'') hor_ate, coalesce(cast(hrlledr as varchar ),'') hrlledr, coalesce(cast(horoplla_ate as varchar ),'') horoplla_ate, trim(prov.des_prov) provincia, dis.des_dis, nom_pac, for_ate, pac_vip, " 
               + " pcons.descp_periodo_consulta periodo, " 
               + " CASE WHEN a.id_periodo_consulta = 0 THEN '-' ELSE (a.contador_periodo || '/' || a.periodo_mes) END cont, case when clasificacion_pac = 70 then case when a.modo_atencion_medico = 0  then 'VISITA DOMICILIARIA' when  a.modo_atencion_medico = 1  then 'TELECONSULTA' else  'LLAMADA DE SEGUIMIENTO' end else CASE WHEN a.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN a.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END end perfil_ate, " 
               + " abr_esp, coalesce(dr.nom_doc,'') nom_doc, nom_gru, coalesce(a.empresa_paciente,'') empresa_paciente,  coalesce(usulla_ate,'') usulla_ate, coalesce(dr.cod_doc,'') cod_doc " 
               + " FROM T_TMPLLAMADAS as a " 
               + " INNER JOIN mae_periodo_consulta pcons ON a.id_periodo_consulta = pcons.id_periodo_consulta " 
               + " LEFT JOIN m_doctores dr ON a.cod_doc = dr.cod_doc LEFT JOIN m_estado est ON a.cod_estado = est.cod_estado LEFT JOIN m_especialidades as b on a.cod_esp = b.cod_esp left join m_clasificacion_pac as c on a.clasificacion_pac = c.cod_clasif LEFT  JOIN m_subclasificacion_pac AS J ON A.cod_subclasif=J.cod_subclasif LEFT JOIN m_distritos dis ON a.cod_dis = dis.cod_dis LEFT JOIN m_provincias prov ON dis.cod_prov = prov.cod_prov  WHERE cm_estado in ('3', '4', '5', '6', '7', 'R3', 'R4', 'R5', 'R6', 'R7') " + ls_SQLaux2;
     
     switch (Cbo_opcion){
         case "16":
             ls_SQLaux2 = ls_SQLaux2 + " AND fec_ate = '"  +document.getElementById('fec_inicial').value+ "' ORDER BY dr.nom_doc ASC, a.fec_ate ASC, a.hor_ate ASC, a.cm_orden DESC";
             break;
         case "5":
             ls_SQLaux2 = ls_SQLaux2 + " AND feclla_ate >= '"+document.getElementById('fec_inicial').value+  "' ORDER BY  a.cm_orden DESC, dr.nom_doc ASC, a.fec_ate ASC, a.hor_ate ASC";
             break;                
         case "4":
             ls_SQLaux2 = ls_SQLaux2 + " AND feclla_ate >= '" +document.getElementById('fec_inicial').value+  "' ORDER BY  a.cm_orden ASC, a.feclla_ate ASC, a.horlla_ate ASC";
             break;
         case "18":
             ls_SQLaux2 = ls_SQLaux2 + " AND feclla_ate >= '" +document.getElementById('fec_inicial').value+  "' ORDER BY  a.cm_orden ASC, a.feclla_ate ASC, a.horlla_ate ASC";
             break;
         default:
             if ( document.getElementById('Cb_zona').style.display == 'block' || document.getElementById('Cbo_ruteo').style.display == 'block' || document.getElementById('Cbo_RAC').style.display == 'block' || document.getElementById('Cbo_sub_zona') == 'block'){ 
                 ls_SQLaux2 = ls_SQLaux2 + " AND fec_ate = '" +document.getElementById('fec_inicial').value+  "' ORDER BY dr.nom_doc ASC, a.fec_ate ASC, a.hor_ate ASC, a.cm_orden DESC";
             }else{
                 ls_SQLaux2 = ls_SQLaux2 + " AND feclla_ate >= current_date - 90 ORDER BY dr.nom_doc ASC, a.fec_ate ASC, a.hor_ate ASC, a.cm_orden DESC";
             }
             break;
     }
     
     
       
    await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: ls_SQLaux2

      })
    }).then(response => response.json())
      .then(async function (data) {
        var html = '' ;
        var i=0; 
        
        console.log(data.length);

      //Frame1.Caption = "Consultas médicas"
      if (data.length>0) {
        

        for (; i < data.length; i++) {
          var tr = document.createElement('tr');   
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
          var td5 = document.createElement('td');
          var td6 = document.createElement('td');
          var td7 = document.createElement('td');
          var td8 = document.createElement('td');
          var td9 = document.createElement('td');
          var td10 = document.createElement('td');
          var td11 = document.createElement('td');
          var td12 = document.createElement('td');
          var td13 = document.createElement('td');
          var td14 = document.createElement('td');
          var td15 = document.createElement('td');
          var td16 = document.createElement('td'); 
          var td17 = document.createElement('td');
          var td18 = document.createElement('td');
          var td19 = document.createElement('td');
          var td20 = document.createElement('td');
          var td21 = document.createElement('td');
          var td22 = document.createElement('td');
          var td23 = document.createElement('td'); 
          var td24 = document.createElement('td');
          var td25 = document.createElement('td');
          var td26 = document.createElement('td');
          var td27 = document.createElement('td');
           td1.appendChild(document.createTextNode(data[i].cm_estado));
          td2.appendChild(document.createTextNode(data[i].f_prog));
          td3.appendChild(document.createTextNode(data[i].cod_ate));
          td4.appendChild(document.createTextNode(data[i].clasificacion));
          td5.appendChild(document.createTextNode(data[i].descripcion));
          td6.appendChild(document.createTextNode(data[i].cod_aut_prestacion));
          td7.appendChild(document.createTextNode(data[i].feclla_ate));
          td8.appendChild(document.createTextNode(data[i].horlla_ate));
          td9.appendChild(document.createTextNode(data[i].cm_tiempo));
          td10.appendChild(document.createTextNode(data[i].fec_ate));
          td11.appendChild(document.createTextNode(data[i].hor_ate));
          td12.appendChild(document.createTextNode(data[i].hrlledr));
          td13.appendChild(document.createTextNode(data[i].horoplla_ate));
          td14.appendChild(document.createTextNode(data[i].provincia));
          td15.appendChild(document.createTextNode(data[i].des_dis));
          td16.appendChild(document.createTextNode(data[i].nom_pac));
          td17.appendChild(document.createTextNode(data[i].for_ate));
          td18.appendChild(document.createTextNode(data[i].pac_vip));
          td19.appendChild(document.createTextNode(data[i].periodo));
          td20.appendChild(document.createTextNode(data[i].cont));
          td21.appendChild(document.createTextNode(data[i].perfil_ate));
          td22.appendChild(document.createTextNode(data[i].abr_esp));
          td23.appendChild(document.createTextNode(data[i].nom_doc));
          td24.appendChild(document.createTextNode(data[i].nom_gru));
          td25.appendChild(document.createTextNode(data[i].empresa_paciente));
          td26.appendChild(document.createTextNode(data[i].usulla_ate));
          td27.appendChild(document.createTextNode(data[i].cod_doc)); td27.style.display = 'none';
          tr.id = data[i].cod_ate;
          tr.onclick = function() {
            if (filacurrent!='')  document.getElementById(filacurrent).classList.remove('selected');
             this.classList.add("selected");
            filacurrent = this.id;
            var EsCronico ;
            var FechaPlazo;
            
            var permite_cambios_ate ;
            
            EsCronico = false;
             document.getElementById("Cmd_MostrarDatos").focus();
            document.getElementById("Cmd_datos_paciente").disabled = false;
            document.getElementById("Cmd_reingresar_ate_tablet").disabled = true;
           
            permite_cambios_ate = true
          
             
             var row =document.getElementById(filacurrent);
          
          if  (row.cells[3].innerHTML.trim() == "MAXISALUD" ||  row.cells[3].innerHTML.trim().indexOf("RONICO") > 0) {
          EsCronico = true;
          }
          
          switch (row.cells[0].innerHTML.trim()) {
          case "0", "A", "1":
            document.getElementById("Cmd_datos_paciente").disabled = true;   
            break;
          }
           
          permite_cambios_ate = true;
          document.getElementById("CmdCodAut").disabled = false;   
           
          
          
          switch (row.cells[0].innerHTML.trim()){
             
                case "2":
                case "RT2":
                case "RP2":
                    if (EsCronico == true ){
                      document.getElementById("Cmd_reprogramar").disabled = false;   
                      document.getElementById("CmdCodAut").disabled = true;   
           
                    }
                    break;
          
                case "3":
                case "4":
                case "5":
                case "6": 
                case "7": 
                case "R3":
                case "R4":
                case "R5": 
                case "R6": 
                case"R7":
                  document.getElementById("Cmd_reprogramar").disabled = false;    
                    if (EsCronico ==true) {
                        if (XPermisoReingreso == 10 || XPermisoReingreso == 11 ) {//ambos
                             document.getElementById("Cmd_reingresar_ate_tablet").disabled = false;   
                        }
                    }else{
                        if (XPermisoReingreso == 1 || XPermisoReingreso == 11){  //agudo
                          document.getElementById("Cmd_reingresar_ate_tablet").disabled  = false;

                        }
                  }
                  break;
          
                case "8":
                  
                    fetch('/nutricion/permite_ingreso', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                body: JSON.stringify({
                  codigo: 107
                  })
          
                    }).then(response => response.json())
                      .then(function (data1) {
                        if(data1){
                          if (EsCronico == true) {
                                  permite_cambios_ate = FN_REALIZAR_CAMBIOS_ATE(row.cells[2].innerHTML.trim(),row.cells[0].innerHTML.trim(),row.cells[9].innerHTML.trim(), row.cells[12].innerHTML.trim(), 3);
                          }else{
                                  permite_cambios_ate = true;
                          }
          
                         }
                      }).catch(error => {
                        console.log(error);
                      });
                  break;
          
          }  
          };
            tr.ondblclick = function() {
              if (document.getElementById('Chk_finalizadas').checked == true){
                // Cmd_datos_paciente_Click();
              }else{
                    Cmd_MostrarDatos_Click();
              }
            };
          tr.appendChild(td1); 
          tr.appendChild(td2); 
          tr.appendChild(td3); 
          tr.appendChild(td4); 
          tr.appendChild(td5); 
          tr.appendChild(td6); 
          tr.appendChild(td7); 
          tr.appendChild(td8); 
          tr.appendChild(td9); 
          tr.appendChild(td10); 
          tr.appendChild(td11); 
          tr.appendChild(td12); 
          tr.appendChild(td13); 
          tr.appendChild(td14); 
          tr.appendChild(td15); 
          tr.appendChild(td16); 
          tr.appendChild(td17); 
          tr.appendChild(td18); 
          tr.appendChild(td19); 
          tr.appendChild(td20); 
          tr.appendChild(td21); 
          tr.appendChild(td22); 
          tr.appendChild(td23); 
          tr.appendChild(td24); 
          tr.appendChild(td25); 
          tr.appendChild(td26); 
          tr.appendChild(td27); 
           document.getElementById('t02').appendChild(tr);
        }
           
            hay_datos = true;   
      } 
      
      

                

      }).catch(error => {
        console.log(error);
      });
    
 
        if (hay_datos) {
           
            document.getElementById('Frame1').innerHTML = "Consultas médicas pendientes: " + document.getElementById('t02').rows.length;
            
           
        }
    }else{
 
     //atencion culminadas
     Cmb_finalizadas_tag = ""
     switch (document.getElementById('Cmb_finalizadas').value){
         case "8":
             Cmb_finalizadas_tag = "8";
             break;
         case "C":
             Cmb_finalizadas_tag = "C";
             break;

         case "VNR":
             Cmb_finalizadas_tag = "V";
             break;

         case "PNE":
             Cmb_finalizadas_tag = "P";
             break;

         case "PI":
             Cmb_finalizadas_tag = "I";
             break;

             
     }
     
     ls_SQLaux = "SELECT cm_estado, f_prog, cod_ate, CASE WHEN j.nom_subclasif is null THEN nom_clasif  ELSE nom_clasif  || '-' || j.nom_subclasif END clasificacion, " 
               + " est.descripcion, COALESCE(a.cod_aut_prestacion,'') cod_aut_prestacion, feclla_ate, horlla_ate, coalesce(cast(cm_tiempo as varchar ),'') cm_tiempo, fec_ate, " 
               + " coalesce(cast(hor_ate as varchar ),'') hor_ate, coalesce(cast(hrlledr as varchar ),'') hrlledr, coalesce(cast(horoplla_ate as varchar ),'') horoplla_ate, trim(prov.des_prov) provincia, dis.des_dis, nom_pac, for_ate, pac_vip, " 
               + " pcons.descp_periodo_consulta periodo, " 
               + " CASE WHEN a.id_periodo_consulta = 0 THEN '-' ELSE (a.contador_periodo || '/' || a.periodo_mes) END cont, case when clasificacion_pac = 70 then case when a.modo_atencion_medico = 0  then 'VISITA DOMICILIARIA' when  a.modo_atencion_medico = 1  then 'TELECONSULTA' else  'LLAMADA DE SEGUIMIENTO' end else CASE WHEN a.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN a.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END end perfil_ate, " 
               + " abr_esp, coalesce(dr.nom_doc,'') nom_doc, nom_gru, coalesce(a.empresa_paciente,'') empresa_paciente,  coalesce(usulla_ate,'') usulla_ate, coalesce(dr.cod_doc,'') cod_doc " 
               + " FROM T_TMPLLAMADAS as a " 
               + " INNER JOIN mae_periodo_consulta pcons ON a.id_periodo_consulta = pcons.id_periodo_consulta " 
               + " LEFT JOIN m_doctores dr ON a.cod_doc = dr.cod_doc LEFT JOIN m_estado est ON a.cod_estado = est.cod_estado LEFT JOIN m_especialidades as b on a.cod_esp = b.cod_esp left join m_clasificacion_pac as c on a.clasificacion_pac = c.cod_clasif LEFT  JOIN m_subclasificacion_pac AS J ON A.cod_subclasif=J.cod_subclasif LEFT JOIN m_distritos dis ON a.cod_dis = dis.cod_dis LEFT JOIN m_provincias prov ON dis.cod_prov = prov.cod_prov WHERE cm_estado is not null " + ls_SQLaux;
               
     ls_SQLaux = ls_SQLaux + " AND fec_ate = '" + document.getElementById('fec_inicial').value+  "' AND cm_estado = '" + Cmb_finalizadas_tag + "' ORDER BY a.cod_dis ASC, a.horlla_ate ASC, a.hor_ate ASC"
    await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: ls_SQLaux

      })
    }).then(response => response.json())
      .then(async function (data) {
        var html = '' ;
        var i; 
                   
      //Frame1.Caption = "Consultas médicas"
      if (data.length>0) {
       
            i = 0;
  
        for (; i < data.length; i++) {
          var tr = document.createElement('tr');   
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
          var td5 = document.createElement('td');
          var td6 = document.createElement('td');
          var td7 = document.createElement('td');
          var td8 = document.createElement('td');
          var td9 = document.createElement('td');
          var td10 = document.createElement('td');
          var td11 = document.createElement('td');
          var td12 = document.createElement('td');
          var td13 = document.createElement('td');
          var td14 = document.createElement('td');
          var td15 = document.createElement('td');
          var td16 = document.createElement('td'); 
          var td17 = document.createElement('td');
          var td18 = document.createElement('td');
          var td19 = document.createElement('td');
          var td20 = document.createElement('td');
          var td21 = document.createElement('td');
          var td22 = document.createElement('td');
          var td23 = document.createElement('td'); 
          var td24 = document.createElement('td');
          var td25 = document.createElement('td');
          var td26 = document.createElement('td');
          var td27 = document.createElement('td');
           td1.appendChild(document.createTextNode(data[i].cm_estado));
          td2.appendChild(document.createTextNode(data[i].f_prog));
          td3.appendChild(document.createTextNode(data[i].cod_ate));
          td4.appendChild(document.createTextNode(data[i].clasificacion));
          td5.appendChild(document.createTextNode(data[i].descripcion));
          td6.appendChild(document.createTextNode(data[i].cod_aut_prestacion));
          td7.appendChild(document.createTextNode(data[i].feclla_ate));
          td8.appendChild(document.createTextNode(data[i].horlla_ate));
          td9.appendChild(document.createTextNode(data[i].cm_tiempo));
          td10.appendChild(document.createTextNode(data[i].fec_ate));
          td11.appendChild(document.createTextNode(data[i].hor_ate));
          td12.appendChild(document.createTextNode(data[i].hrlledr));
          td13.appendChild(document.createTextNode(data[i].horoplla_ate));
          td14.appendChild(document.createTextNode(data[i].provincia));
          td15.appendChild(document.createTextNode(data[i].des_dis));
          td16.appendChild(document.createTextNode(data[i].nom_pac));
          td17.appendChild(document.createTextNode(data[i].for_ate));
          td18.appendChild(document.createTextNode(data[i].pac_vip));
          td19.appendChild(document.createTextNode(data[i].periodo));
          td20.appendChild(document.createTextNode(data[i].cont));
          td21.appendChild(document.createTextNode(data[i].perfil_ate));
          td22.appendChild(document.createTextNode(data[i].abr_esp));
          td23.appendChild(document.createTextNode(data[i].nom_doc));
          td24.appendChild(document.createTextNode(data[i].nom_gru));
          td25.appendChild(document.createTextNode(data[i].empresa_paciente));
          td26.appendChild(document.createTextNode(data[i].usulla_ate));
          td27.appendChild(document.createTextNode(data[i].cod_doc)); td27.style.display = 'none';
          tr.id = data[i].cod_ate;
          tr.onclick = function() {
            if (filacurrent!='')  document.getElementById(filacurrent).classList.remove('selected');
             this.classList.add("selected");
            filacurrent = this.id;
            var EsCronico ;
            var FechaPlazo;
            
            var permite_cambios_ate ;
            
            EsCronico = false;
             document.getElementById("Cmd_MostrarDatos").focus();
            document.getElementById("Cmd_datos_paciente").disabled = false;
            document.getElementById("Cmd_reingresar_ate_tablet").disabled = true;
           
            permite_cambios_ate = true
          
       
             var row = document.getElementById(filacurrent);
          
          if  (row.cells[3].innerHTML.trim() == "MAXISALUD" ||  row.cells[3].innerHTML.trim().indexOf("RONICO") > 0) {
          EsCronico = true;
          }
          
          switch (row.cells[0].innerHTML.trim()) {
          case "0", "A", "1":
            document.getElementById("Cmd_datos_paciente").disabled = true;   
            break;
          }
          
          permite_cambios_ate = true;
          document.getElementById("CmdCodAut").disabled = false;   
           
          
          
          switch (row.cells[0].innerHTML.trim()){
             
                case "2":
                case "RT2":
                case "RP2":
                    if (EsCronico == true ){
                      document.getElementById("Cmd_reprogramar").disabled = false;   
                      document.getElementById("CmdCodAut").disabled = true;   
           
                    }
                    break;
          
                case "3":
                case "4":
                case "5":
                case "6": 
                case "7": 
                case "R3":
                case "R4":
                case "R5": 
                case "R6": 
                case"R7":
                  document.getElementById("Cmd_reprogramar").disabled = false;    
                    if (EsCronico ==true) {
                        if (XPermisoReingreso == 10 || XPermisoReingreso == 11 ) {//ambos
                             document.getElementById("Cmd_reingresar_ate_tablet").disabled = false;   
                        }
                    }else{
                        if (XPermisoReingreso == 1 || XPermisoReingreso == 11){  //agudo
                          document.getElementById("Cmd_reingresar_ate_tablet").disabled  = false;
                        }
                  }
                  break;
          
                case "8":
                  
                    fetch('/nutricion/permite_ingreso', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                body: JSON.stringify({
                  codigo: 107
                  })
          
                    }).then(response => response.json())
                      .then(function (data1) {
                        if(data1){
                          if (EsCronico == true) {
                                  permite_cambios_ate = FN_REALIZAR_CAMBIOS_ATE(row.cells[2].innerHTML.trim(),row.cells[0].innerHTML.trim(),row.cells[9].innerHTML.trim(), row.cells[12].innerHTML.trim(), 3);
                          }else{
                                  permite_cambios_ate = true;
                          }
          
                         }
                      }).catch(error => {
                        console.log(error);
                      });
                  break;
          
          }
            };
            tr.ondblclick = function() {
              if (document.getElementById('Chk_finalizadas').checked == true){
                // Cmd_datos_paciente_Click();
              }else{
                    Cmd_MostrarDatos_Click();
              }
                };
          tr.appendChild(td1); 
          tr.appendChild(td2); 
          tr.appendChild(td3); 
          tr.appendChild(td4); 
          tr.appendChild(td5); 
          tr.appendChild(td6); 
          tr.appendChild(td7); 
          tr.appendChild(td8); 
          tr.appendChild(td9); 
          tr.appendChild(td10); 
          tr.appendChild(td11); 
          tr.appendChild(td12); 
          tr.appendChild(td13); 
          tr.appendChild(td14); 
          tr.appendChild(td15); 
          tr.appendChild(td16); 
          tr.appendChild(td17); 
          tr.appendChild(td18); 
          tr.appendChild(td19); 
          tr.appendChild(td20); 
          tr.appendChild(td21); 
          tr.appendChild(td22); 
          tr.appendChild(td23); 
          tr.appendChild(td24); 
          tr.appendChild(td25); 
          tr.appendChild(td26); 
          tr.appendChild(td27); 
           document.getElementById('t02').appendChild(tr);
        }
          
           switch (document.getElementById('Cmb_finalizadas').value){
            case "8":
                 //Frame1.Caption = "Consultas médicas terminadas: " & Adata2.Recordset.RecordCount
                 break;
             case "C":
                // Frame1.Caption = "Consultas médicas canceladas: " & Adata2.Recordset.RecordCount
                break;
             case "VNR":
                // Frame1.Caption = "Visitas No Realizadas: " & Adata2.Recordset.RecordCount
                break;
             case "PNE":
                // Frame1.Caption = "Paciente No encontrado: " & Adata2.Recordset.RecordCount
                break;
             case "PI":
                // Frame1.Caption = "Poliza inactiva: " & Adata2.Recordset.RecordCount
                document.getElementById('Cmd_exportar').style.display = "block";
                 break;
              default:
         }
           hay_datos = true;
      }  

                  //return;
              
      }).catch(error => {
        console.log(error);
      });
                  
     
         
 
         
    
 }
 
 if  (hay_datos) {

     document.getElementById('cmdSeguimiento').disabled = false; 
     if (Chk_finalizadas ==false ){ 
         document.getElementById('Cmd_MostrarDatos').disabled = false; 
     }
     document.getElementById('CmdCodAut').disabled = false;
 }
colores_grid();
 document.body.style.cursor = 'default' ;

 document.getElementById('CmdFiltrar').disabled = false;


} 

/* 

function Txt_distrito_Change(){
    
    document.getElementById('Txt_direccion').disabled = true;
    document.getElementById('txt_referencia').disabled = true;
    document.getElementById('OTxt_tlf_casapt_ajustes').disabled = true;
    document.getElementById('Txt_tlf_oficina').disabled = true;
    document.getElementById('Txt_tlf_oficina_anx').disabled = true;
 
 
    document.getElementById('txt_referencia').value = "";
    document.getElementById('Txt_tlf_casa').value = "";
    document.getElementById('Txt_tlf_oficina').value = "";
    document.getElementById('Txt_tlf_oficina_anx').value = "";

     
        if ( document.getElementById('Txt_distrito').value != "") {
        
            var Adata_distrito = "SELECT * FROM VW_FILTRO_DISTRITO WHERE des_dis like '" + document.getElementById('Txt_distrito').value + "%' ";
            fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:Adata_distrito
                })
    
              }).then(response => response.json())
              .then(function (data1) {
                if(data1.length>0){
              
                  }
                }
              }).catch(error => {
                console.log(error);
              }); 
            If Not Adata_distrito.Recordset.EOF Then
                DGrid_distrito.Visible = True
                
                
            Else
                DGrid_distrito.Visible = False
                Txt_distrito.Text = Mid(Txt_distrito.Text, 1, Len(Txt_distrito.Text) - 1)
                Txt_distrito.SelStart = Len(Txt_distrito.Text)
            End If
        }else{
            DGrid_distrito.Visible = False
            
            
        }
     
 
} */



function listOfNamesflebotomista(flebotomistas) {
  const names = flebotomistas.map(flebo => `<option value="${flebo.cod_flebotomista}">${flebo.nom_flebotomista}</option>`).join("\n");
  return `${names}`
}
function allowNumbersOnly(e) {
  var code = (e.which) ? e.which : e.keyCode;
  if (code > 31 && (code < 48 || code > 57)) {
    e.preventDefault();
  }


}

  

function tabletoarrayjsonhorariosreporte(table) {
  var data = [];
  var rowData = [];

  for (var i = 0; i < table.length; i++) {

    data.push(Object.values(table[i]));

  }

  return data;
}
 

function s2ab(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf);  //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
  return buf;
}

 
var myWindowFrm_CM_cotiza_conductor;

var myWindowFrm_CM_confirma_fin;
var myWindowFrm_CM_confirma_llegada;

var myWindowFrm_CM_asignacion;
var myWindowFrm_CM_confirma_datos;
var myWindowFrm_CM_confirma_envio_mensaje;


window.Cmd_MostrarDatos_Click = async function () {
 /*  var fila = document.querySelector('.selected');
  if (!fila) return; */
  var cod_ate = filacurrent;

 if(filacurrent=='') return;
    var AData1;
  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT * FROM t_tmpllamadas WHERE cod_ate = " +  filacurrent
    })
  }).then(response => response.json())
    .then(function (AData1json) {
       if (AData1json.length>0) {
        AData1 = AData1json;
      } 
       
    }).catch(error => {
      console.log(error);
    });
  switch (AData1[0].cm_estado.trim()){
    case "0":
    case "R0":
           
              if (lb_asignador ==false && lb_supervisor ==false){
                  alert("Este estado solo es accesible para el asignador y supervisor de noche");
              
                    
                 await fetch('/modulo/Execute/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + filacurrent
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
                  return;
              }
  
              
            if ( AData1[0].cm_estado_ant != null) { 
              
              
                  switch(AData1[0].cm_estado_ant.trim()){
                  
                  
                  case "R2":
                  case "RT2":
                  case "RP2":
                      //Unload Frm_CM_RPG_asignacion
                      //Frm_CM_RPG_asignacion.Txt_CodAte.Text = AData1.Recordset!cod_ate
                      //Frm_CM_RPG_asignacion.Show
                  break;
                  case "1":
                      //regreso de una cotizacion que al momento de llenar los datos se encuentra
                      //en el historial de paciente que no desea con el doctor asignado
                      
                      /* Unload Frm_CM_asignacion
                      Select Case Trim(AData1.Recordset!f_prog)
                          Case "Inm"
                              Frm_CM_asignacion.Cbo_tiempo.Text = IIf(Not IsNull(AData1.Recordset!cm_tiempo), AData1.Recordset!cm_tiempo, "")
                          Case "Prg"
                              Frm_CM_asignacion.DTPicker1.Value = IIf(Not IsNull(AData1.Recordset!fec_ate), Format(AData1.Recordset!fec_ate, "dd/mm/yyyy"), "")
                              Frm_CM_asignacion.CmbHora.Text = IIf(Not IsNull(AData1.Recordset!Hor_ate), Format(AData1.Recordset!Hor_ate, "HH:mm"), "")
                      End Select
                      
                      Frm_CM_asignacion.Txt_CodAte.Text = AData1.Recordset!cod_ate
                      Frm_CM_asignacion.Show */
                      break;
                  case "2":    
                  case "0":// se agrego el "2" 22072022
                       switch  (AData1[0].f_prog.trim()){
                          case "Inm":
                              if(myWindowFrm_CM_asignacion!==undefined) {

                                myWindowFrm_CM_asignacion.document.body.innerHTML="";
                            
                              }
                              myWindowFrm_CM_asignacion = window.open("", "myWindowFrm_CM_asignacion", "toolbar=no,menubar=no,top=200,left=400,width=40%,height=50%");
                              myWindowFrm_CM_asignacion.document.body.innerHTML="";
                              myWindowFrm_CM_asignacion.document.write(Frm_CM_asignacion_body(filacurrent));
                              if (myWindowFrm_CM_asignacion.document) {
                                myWindowFrm_CM_asignacion.document.title = "Asignacion de tiempo y doctor";
                              }
                              myWindowFrm_CM_asignacion.appMainWindow = window;
                         
                              myWindowFrm_CM_asignacion.addEventListener("resize", function () {
                                
                            
                                myWindowFrm_CM_asignacion.resizeTo(800, 700);
                              });
                              myWindowFrm_CM_asignacion.onbeforeunload =   function( ){
                                
                               
                               
                                if (myWindowFrm_CM_asignacion.document.getElementById('Txt_CodAte').value != "" ){
                                    fetch('/modulo/Execute/', {
                                    method: 'POST',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_asignacion.document.getElementById('Txt_CodAte').value
                                    })
                                  }).then(response => response.json())
                                  .then(function(data) { 
                                    if(data){
                                      
                                    }  
                                   }).catch(error => {
                                    console.log(error);    
                                  }); 
                                }
                                 
                            }                          
                            myWindowFrm_CM_asignacion.focus();
                          //    Frm_CM_asignacion.Cbo_tiempo.Text = IIf(Not IsNull(AData1.Recordset!cm_tiempo), AData1.Recordset!cm_tiempo, "")

                              break;
                          case "Prg":
                              /* Frm_CM_asignacion.DTPicker1.Value = IIf(Not IsNull(AData1.Recordset!fec_ate), Format(AData1.Recordset!fec_ate, "dd/mm/yyyy"), "")
                              Frm_CM_asignacion.CmbHora.Text = IIf(Not IsNull(AData1.Recordset!Hor_ate), Format(AData1.Recordset!Hor_ate, "HH:mm"), "") */
                              break;
                      }
                      
                      myWindowFrm_CM_asignacion.document.getElementById('Txt_CodAte').value = AData1[0].cod_ate;
                       break;
                  }
            }else{
              if(myWindowFrm_CM_asignacion!==undefined) {

                myWindowFrm_CM_asignacion.document.body.innerHTML="";
            
              }
        
             
              myWindowFrm_CM_asignacion = window.open("", "myWindowFrm_CM_asignacion", "toolbar=no,menubar=no,top=0,left=400,width=40%,height=50%");
              myWindowFrm_CM_asignacion.document.body.innerHTML="";
              myWindowFrm_CM_asignacion.document.write(Frm_CM_asignacion_body(filacurrent));
              if (myWindowFrm_CM_asignacion.document) {
                myWindowFrm_CM_asignacion.document.title = "Asignacion de tiempo y doctor";
              }
              myWindowFrm_CM_asignacion.appMainWindow = window;

              myWindowFrm_CM_asignacion.addEventListener("resize", function () {
                 
            
                myWindowFrm_CM_asignacion.resizeTo(800, 700);
              });
              myWindowFrm_CM_asignacion.onbeforeunload =   function( ){
               
                if (myWindowFrm_CM_asignacion.document.getElementById('Txt_CodAte').value != "" ){
                    fetch('/modulo/Execute/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_asignacion.document.getElementById('Txt_CodAte').value
                    })
                  }).then(response => response.json())
                  .then(function(data) { 
                    if(data){
                      
                    }  
                   }).catch(error => {
                    console.log(error);    
                  }); 
                }
                
              }     
              myWindowFrm_CM_asignacion.focus();
          //    Frm_CM_asignacion.Cbo_tiempo.Text = IIf(Not IsNull(AData1.Recordset!cm_tiempo), AData1.Recordset!cm_tiempo, "")
 

            }
      break;
     
      case "2":
            if (lb_asignador == true && lb_supervisor == false ){
                alert("Este estado no es accesible para el usuario actual, comunicarse con su supervisor");
                await fetch('/modulo/Execute/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " +  filacurrent
                  })
                }).then(response => response.json())
                .then(function(data) { 
                  if(data){ 
                  }  
                 }).catch(error => {
                  console.log(error);    
                });
                return;
            }
            
            
            if (  AData1[0].clasificacion_pac.trim() == 21 || AData1[0].clasificacion_pac.trim() == 60 ){         //MEDICO EN LINEA y ORIENTACION PSICOLOGICA
                
                //Frm_observacion_med_linea.Txt_CodAte.Text = AData1.Recordset!cod_ate
                //Frm_observacion_med_linea.Show
            }else{
                if (AData1[0].clasificacion_pac.trim() == 2 ){ //solo maxi
                    if (AData1[0].contador_periodo.trim() > 1){    // seguimiento
                        
                       await fetch('/modulo/permite_ingreso', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                           codigo: 126
                          })

                        }).then(response => response.json())
                          .then(function (data1) {
                            if(data1){ 
                              if(myWindowFrm_CM_confirma_datos!==undefined) {

                              myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                          
                              }
                      
                           
                            myWindowFrm_CM_confirma_datos = window.open("", "myWindowFrm_CM_confirma_datos", "toolbar=no,menubar=no,top=0,left=400,width=40%,height=50%");
                            myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                            myWindowFrm_CM_confirma_datos.document.write(Frm_CM_confirma_datos_body(filacurrent));
                              myWindowFrm_CM_confirma_datos.Tag = "NORMAL";
                              myWindowFrm_CM_confirma_datos.document.getElementById("Txt_CodAte").value  =   AData1[0].cod_ate;
                              if (myWindowFrm_CM_confirma_datos.document) {
                                myWindowFrm_CM_confirma_datos.document.title = "Confirmacion de datos con paciente";
                              }
                              myWindowFrm_CM_confirma_datos.appMainWindow = window;

                              myWindowFrm_CM_confirma_datos.addEventListener("resize", function () {
                               
                            
                                myWindowFrm_CM_confirma_datos.resizeTo(1200, 780);
                              });
                              myWindowFrm_CM_confirma_datos.onbeforeunload =   function(){
                                if (myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value != "" ){
                                    fetch('/modulo/Execute/', {
                                    method: 'POST',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value
                                    })
                                  }).then(response => response.json())
                                  .then(function(data) { 
                                    if(data){
                                      
                                    }  
                                   }).catch(error => {
                                    console.log(error);    
                                  }); 
                                }
                            }
                              myWindowFrm_CM_confirma_datos.focus(); 
                       
                            }else{
                              alert("Solo usuarios con el acceso indicado (126) pueden acceder a la ventana de confirmacion con paciente de atenciones Maxisalud, perfil: Seguimiento ");

                            }
                          }).catch(error => {
                            console.log(error);
                          });
                    }else{
                      if(myWindowFrm_CM_confirma_datos!==undefined) {

                              myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                          
                      }
                      
                           
                            myWindowFrm_CM_confirma_datos = window.open("", "myWindowFrm_CM_confirma_datos", "toolbar=no,menubar=no,top=0,left=100,width=40%,height=50%");
                            myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                            myWindowFrm_CM_confirma_datos.document.write(Frm_CM_confirma_datos_body(filacurrent));
                                                

                              myWindowFrm_CM_confirma_datos.Tag = "NORMAL";
                             
                              if (myWindowFrm_CM_confirma_datos.document) {
                                myWindowFrm_CM_confirma_datos.document.title = "Confirmacion de datos con paciente";
                              }
                               myWindowFrm_CM_confirma_datos.appMainWindow = window;

                              myWindowFrm_CM_confirma_datos.addEventListener("resize", function () {
                               
                            
                                myWindowFrm_CM_confirma_datos.resizeTo(1200, 780);
                              });
                              myWindowFrm_CM_confirma_datos.onbeforeunload =   function(){
                                  if (myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value != "" ){
                                      fetch('/modulo/Execute/', {
                                      method: 'POST',
                                      headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify({
                                        query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value
                                      })
                                    }).then(response => response.json())
                                    .then(function(data) { 
                                      if(data){
                                        
                                      }  
                                     }).catch(error => {
                                      console.log(error);    
                                    }); 
                                  }
                              }
                              myWindowFrm_CM_confirma_datos.focus(); 
                       
                           
                    }
                
                }else{
                    
                  if(myWindowFrm_CM_confirma_datos!==undefined) {

                    myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                
                  }
            
                 
                  myWindowFrm_CM_confirma_datos = window.open("", "myWindowFrm_CM_confirma_datos", "toolbar=no,menubar=no,top=0,left=100,width=40%,height=50%");
                  myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                  myWindowFrm_CM_confirma_datos.document.write(Frm_CM_confirma_datos_body(filacurrent));
                                      

                    myWindowFrm_CM_confirma_datos.Tag = "NORMAL";
                   
                    if (myWindowFrm_CM_confirma_datos.document) {
                      myWindowFrm_CM_confirma_datos.document.title = "Confirmacion de datos con paciente";
                    }
                    myWindowFrm_CM_confirma_datos.appMainWindow = window;

                    myWindowFrm_CM_confirma_datos.addEventListener("resize", function () {
                      
                  
                      myWindowFrm_CM_confirma_datos.resizeTo(1200, 780);
                    });
                    myWindowFrm_CM_confirma_datos.onbeforeunload =   function(){
                        if (myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value != "" ){
                            fetch('/modulo/Execute/', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value
                            })
                          }).then(response => response.json())
                          .then(function(data) { 
                            if(data){
                              
                            }  
                           }).catch(error => {
                            console.log(error);    
                          }); 
                        }
                    }
                    myWindowFrm_CM_confirma_datos.focus(); 
                }
            }
            await fetch('/modulo/Execute/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: "UPDATE t_tmpllamadas SET flag = true WHERE cod_ate = " +  filacurrent
              })
            }).then(response => response.json())
            .then(function(data) { 
              if(data){ 
              }  
             }).catch(error => {
              console.log(error);    
            });
             break;
        case "R2":
        case "RT2":
        case "RP2":
           if (lb_asignador == true  && lb_supervisor == false ){
                alert("Este estado no es accesible para el usuario actual, comunicarse con su supervisor");
                Execute ("UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + filacurrent)
               return; 
           }
          
            if (AData1[0].clasificacion_pac == 21) {        //MEDICO EN LINEA
               /*  Unload Frm_observacion_med_linea
                Frm_observacion_med_linea.Txt_CodAte.Text = AData1.Recordset!cod_ate
                Frm_observacion_med_linea.Show */
            }else{
                
                if (AData1[0].clasificacion_pac == 2){ //solo maxi
                    if (AData1[0].contador_periodo > 1) { // seguimiento
                        if (await permite_ingreso(126) == true){
                          if(myWindowFrm_CM_confirma_datos!==undefined) { 
                            myWindowFrm_CM_confirma_datos.document.body.innerHTML=""; 
                          } 
                          myWindowFrm_CM_confirma_datos = window.open("", "myWindowFrm_CM_confirma_datos", "toolbar=no,menubar=no,top=0,left=100,width=40%,height=50%");
                          myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                          myWindowFrm_CM_confirma_datos.document.write(Frm_CM_confirma_datos_body(filacurrent));
                                              
        
                            myWindowFrm_CM_confirma_datos.Tag = "REPROG";
                           
                            if (myWindowFrm_CM_confirma_datos.document) {
                              myWindowFrm_CM_confirma_datos.document.title = "Confirmacion de datos con paciente";
                            }
                            myWindowFrm_CM_confirma_datos.appMainWindow = window;
        
                            myWindowFrm_CM_confirma_datos.addEventListener("resize", function () {
                              
                          
                              myWindowFrm_CM_confirma_datos.resizeTo(1200, 780);
                            });
                            myWindowFrm_CM_confirma_datos.onbeforeunload =   function(){
                                if (myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value != "" ){
                                    fetch('/modulo/Execute/', {
                                    method: 'POST',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value
                                    })
                                  }).then(response => response.json())
                                  .then(function(data) { 
                                    if(data){
                                      
                                    }  
                                   }).catch(error => {
                                    console.log(error);    
                                  }); 
                                }
                            }
                           
                            myWindowFrm_CM_confirma_datos.focus(); 
                        }else{
                            alert("Solo usuarios con el acceso indicado (126) pueden acceder a la ventana de confirmacion con paciente de atenciones Maxisalud, perfil: Seguimiento ");
                        }
                    }else{ 
                      if(myWindowFrm_CM_confirma_datos!==undefined) { 
                        myWindowFrm_CM_confirma_datos.document.body.innerHTML=""; 
                      } 
                      myWindowFrm_CM_confirma_datos = window.open("", "myWindowFrm_CM_confirma_datos", "toolbar=no,menubar=no,top=0,left=100,width=40%,height=50%");
                      myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                      myWindowFrm_CM_confirma_datos.document.write(Frm_CM_confirma_datos_body(filacurrent));
                                          
    
                        myWindowFrm_CM_confirma_datos.Tag = "REPROG";
                       
                        if (myWindowFrm_CM_confirma_datos.document) {
                          myWindowFrm_CM_confirma_datos.document.title = "Confirmacion de datos con paciente";
                        }
                        myWindowFrm_CM_confirma_datos.appMainWindow = window;
    
                        myWindowFrm_CM_confirma_datos.addEventListener("resize", function () {
                         
                      
                          myWindowFrm_CM_confirma_datos.resizeTo(1200, 780);
                        });
                        myWindowFrm_CM_confirma_datos.onbeforeunload =   function(){
                            if (myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value != "" ){
                                fetch('/modulo/Execute/', {
                                method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                  query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value
                                })
                              }).then(response => response.json())
                              .then(function(data) { 
                                if(data){
                                  
                                }  
                               }).catch(error => {
                                console.log(error);    
                              }); 
                            }
                        }
                       
                        myWindowFrm_CM_confirma_datos.focus(); 
                    }
                }else{
                  if(myWindowFrm_CM_confirma_datos!==undefined) { 
                    myWindowFrm_CM_confirma_datos.document.body.innerHTML=""; 
                  } 
                  myWindowFrm_CM_confirma_datos = window.open("", "myWindowFrm_CM_confirma_datos", "toolbar=no,menubar=no,top=0,left=100,width=40%,height=50%");
                  myWindowFrm_CM_confirma_datos.document.body.innerHTML="";
                  myWindowFrm_CM_confirma_datos.document.write(Frm_CM_confirma_datos_body(filacurrent));
                                      

                    myWindowFrm_CM_confirma_datos.Tag = "REPROG";
                   
                    if (myWindowFrm_CM_confirma_datos.document) {
                      myWindowFrm_CM_confirma_datos.document.title = "Confirmacion de datos con paciente";
                    }
                    myWindowFrm_CM_confirma_datos.appMainWindow = window;

                    myWindowFrm_CM_confirma_datos.addEventListener("resize", function () {
                    
                  
                      myWindowFrm_CM_confirma_datos.resizeTo(1200, 780);
                    });
                    myWindowFrm_CM_confirma_datos.onbeforeunload =   function(){
                        if (myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value != "" ){
                            fetch('/modulo/Execute/', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_datos.document.getElementById('Txt_CodAte').value
                            })
                          }).then(response => response.json())
                          .then(function(data) { 
                            if(data){
                              
                            }  
                           }).catch(error => {
                            console.log(error);    
                          }); 
                        }
                    }
                   
                    myWindowFrm_CM_confirma_datos.focus(); 
                }
            }
             
            Execute ("UPDATE t_tmpllamadas SET flag = true WHERE cod_ate = " + filacurrent)
        


          break;
          case "3":
          case "R3":
        
           
          if(lb_asignador == true && lb_supervisor == false ){
              alert("Este estado no es accesible para el usuario actual, comunicarse con su supervisor");
               await fetch('/modulo/Execute/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + filacurrent
            
                })
              }).then(response => response.json())
                .then(function (data) {
                  
            
                }).catch(error => {
                  console.log(error);
                });
              return
          }
          
          switch ( AData1[0].clasificacion_pac.trim()  ){
          
          case 1:
          case 2:
          case 7:
          case 200:
          case 201: 
          case 202: 
          case 203:
          
              if(AData1[0].contador_periodo > 1 && AData1[0].clasificacion_pac == 2 ){
                 // Unload Frm_CM_confirma_fin
                 if(myWindowFrm_CM_confirma_fin!==undefined) {

                 myWindowFrm_CM_confirma_fin.document.body.innerHTML="";
              
                 }
                  myWindowFrm_CM_confirma_fin = window.open("", "myWindowFrm_CM_confirma_fin", "resizable=yes,toolbar=no,menubar=no,top=100,left=50,width=40%,height=50%");
                  myWindowFrm_CM_confirma_fin.document.body.innerHTML="";
                  myWindowFrm_CM_confirma_fin.document.write(Frm_CM_confirma_fin(filacurrent));
                  if (myWindowFrm_CM_confirma_fin.document) {
                    myWindowFrm_CM_confirma_fin.document.title = "Confirmar fin de la consulta medica";
                  }
                  myWindowFrm_CM_confirma_fin.appMainWindow = window;

                  myWindowFrm_CM_confirma_fin.addEventListener("resize", function () {
                  
                
                    myWindowFrm_CM_confirma_fin.resizeTo(1400, 800);
                });
                myWindowFrm_CM_confirma_fin.onbeforeunload =   function(){
                  if (myWindowFrm_CM_confirma_fin.document.getElementById('Txt_CodAte').value != "" ){
                      fetch('/modulo/Execute/', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_fin.document.getElementById('Txt_CodAte').value
                      })
                    }).then(response => response.json())
                    .then(function(data) { 
                      if(data){
                        
                      }  
                     }).catch(error => {
                      console.log(error);    
                    }); 
                  }
              }
                myWindowFrm_CM_confirma_fin.focus();
                  
              }else{
               /*    if(Format(Now + TimeValue("08:00:00"), "yyyy-mm-dd HH:mm:ss") < (Format(AData1.Recordset!fec_ate, "yyyy-mm-dd") & " " & Format(AData1.Recordset!Hor_ate, "HH:mm:ss")) ){
                      str_obs = InputBox("Ingrese en motivo de continuar con los siguientes estados de atencion futura", "Solución medica")
                      if(str_obs <> "" ){
                          Call P_GUARDA_SEGUIMIENTO(AData1.Recordset!cod_ate, "ATE", Ucase(str_obs))
                          //Unload Frm_CM_confirma_llegada
                          Frm_CM_confirma_llegada.Txt_CodAte.Text = AData1.Recordset!cod_ate
                          Frm_CM_confirma_llegada.Show
                      }
                  }else{
                      //Unload Frm_CM_confirma_llegada
                      Frm_CM_confirma_llegada.Txt_CodAte.Text = AData1.Recordset!cod_ate
                      Frm_CM_confirma_llegada.Show
                  } */
              }
           break;
          default:
  
           
              if(myWindowFrm_CM_cotiza_conductor!==undefined) {

                myWindowFrm_CM_cotiza_conductor.document.body.innerHTML="";
            
              }
              myWindowFrm_CM_cotiza_conductor = window.open("", "myWindowFrm_CM_cotiza_conductor", "toolbar=no,menubar=no,top=200,left=400,width=40%,height=50%");
              myWindowFrm_CM_cotiza_conductor.document.body.innerHTML="";
              myWindowFrm_CM_cotiza_conductor.document.write(Frm_CM_cotiza_conductor(filacurrent));
              if (myWindowFrm_CM_cotiza_conductor.document) {
                myWindowFrm_CM_cotiza_conductor.document.title = "Validacion de tiempo";
              }
              myWindowFrm_CM_cotiza_conductor.appMainWindow = window;
              myWindowFrm_CM_cotiza_conductor.addEventListener("resize", function () {
                 
            
                myWindowFrm_CM_cotiza_conductor.resizeTo(800, 400);
              });
              myWindowFrm_CM_cotiza_conductor.onbeforeunload =   function(){
                if (myWindowFrm_CM_cotiza_conductor.document.getElementById('Txt_CodAte').value != "" ){
                    fetch('/modulo/Execute/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_cotiza_conductor.document.getElementById('Txt_CodAte').value
                    })
                  }).then(response => response.json())
                  .then(function(data) { 
                    if(data){
                      
                    }  
                   }).catch(error => {
                    console.log(error);    
                  }); 
                }
            }
               myWindowFrm_CM_cotiza_conductor.focus();
            }
          break;
          case "5":
          case "R5":
            
          if (lb_asignador == true && lb_supervisor == false ){
              alert("Este estado no es accesible para el usuario actual");
              Execute ("UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + filacurrent);
              return ;
          }
          
          
         /*  Frm_CM_confirma_envio_mensaje.Txt_CodAte.Text = AData1.Recordset!cod_ate
          Frm_CM_confirma_envio_mensaje.Show */
          if(myWindowFrm_CM_confirma_envio_mensaje!==undefined) {

            myWindowFrm_CM_confirma_envio_mensaje.document.body.innerHTML="";
        
          }
          myWindowFrm_CM_confirma_envio_mensaje = window.open("", "myWindowFrm_CM_confirma_envio_mensaje", "toolbar=no,menubar=no,top=200,left=400,width=40%,height=50%");
          myWindowFrm_CM_confirma_envio_mensaje.document.body.innerHTML="";
          myWindowFrm_CM_confirma_envio_mensaje.document.write(Frm_CM_confirma_envio_mensaje(filacurrent));
          if (myWindowFrm_CM_confirma_envio_mensaje.document) {
            myWindowFrm_CM_confirma_envio_mensaje.document.title = "Confirmar recepcion de mensaje";
          }
          myWindowFrm_CM_confirma_envio_mensaje.appMainWindow = window;
    
          myWindowFrm_CM_confirma_envio_mensaje.addEventListener("resize", function () {
             
        
            myWindowFrm_CM_confirma_envio_mensaje.resizeTo(800, 600);
          });
    
          myWindowFrm_CM_confirma_envio_mensaje.onbeforeunload =   function(){
                if (myWindowFrm_CM_confirma_envio_mensaje.document.getElementById('Txt_CodAte').value != "" ){
                    fetch('/modulo/Execute/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_envio_mensaje.document.getElementById('Txt_CodAte').value
                    })
                  }).then(response => response.json())
                  .then(function(data) { 
                    if(data){
                      
                    }  
                    }).catch(error => {
                    console.log(error);    
                  }); 
                }
            }      
            myWindowFrm_CM_confirma_envio_mensaje.focus();
          
          break;

          case "6":
          case "R6":
            
            if (lb_asignador == true && lb_supervisor ==false) {
              alert("Este estado no es accesible para el usuario actual")
              Execute ("UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " +filacurrent)
              return;
          }
           
          if(myWindowFrm_CM_confirma_llegada!==undefined) {

            myWindowFrm_CM_confirma_llegada.document.body.innerHTML="";
        
          }
          myWindowFrm_CM_confirma_llegada = window.open("", "myWindowFrm_CM_confirma_llegada", "toolbar=no,menubar=no,top=200,left=400,width=40%,height=50%");
          myWindowFrm_CM_confirma_llegada.document.body.innerHTML="";
          myWindowFrm_CM_confirma_llegada.document.write(Frm_CM_confirma_llegada(filacurrent));
          if (myWindowFrm_CM_confirma_llegada.document) {
            myWindowFrm_CM_confirma_llegada.document.title = "confirmar llegada de Dr. a casa de paciente";
          }
          myWindowFrm_CM_confirma_llegada.appMainWindow = window;
    
          myWindowFrm_CM_confirma_llegada.addEventListener("resize", function () {
            
        
            myWindowFrm_CM_confirma_llegada.resizeTo(800, 400);
          });
    
          myWindowFrm_CM_confirma_llegada.onbeforeunload =   function(){
                if (myWindowFrm_CM_confirma_llegada.document.getElementById('Txt_CodAte').value != "" ){
                    fetch('/modulo/Execute/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_llegada.document.getElementById('Txt_CodAte').value
                    })
                  }).then(response => response.json())
                  .then(function(data) { 
                    if(data){
                      
                    }  
                    }).catch(error => {
                    console.log(error);    
                  }); 
                }
            }      
            myWindowFrm_CM_confirma_llegada.focus();
          break;
    case "7" :
    case "R7":
    
      if (lb_asignador == true && lb_supervisor ==false) {
          alert("Este estado no es accesible para el usuario actual")
          Execute ("UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " +filacurrent)
          return;
      }
      if(myWindowFrm_CM_confirma_fin!==undefined) {

        myWindowFrm_CM_confirma_fin.document.body.innerHTML="";
    
      }
      myWindowFrm_CM_confirma_fin = window.open("", "myWindowFrm_CM_confirma_fin", "resizable=yes,toolbar=no,menubar=no,top=100,left=50,width=40%,height=50%");
      myWindowFrm_CM_confirma_fin.document.body.innerHTML="";
      myWindowFrm_CM_confirma_fin.document.write(Frm_CM_confirma_fin(filacurrent));
      if (myWindowFrm_CM_confirma_fin.document) {
        myWindowFrm_CM_confirma_fin.document.title = "Confirmar fin de la consulta medica";
      }
      myWindowFrm_CM_confirma_fin.appMainWindow = window;

      myWindowFrm_CM_confirma_fin.addEventListener("resize", function () {
        
    
        myWindowFrm_CM_confirma_fin.resizeTo(1400, 800);
      });

      myWindowFrm_CM_confirma_fin.onbeforeunload =   function(){
            if (myWindowFrm_CM_confirma_fin.document.getElementById('Txt_CodAte').value != "" ){
                fetch('/modulo/Execute/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "UPDATE t_tmpllamadas SET flag = false WHERE cod_ate = " + myWindowFrm_CM_confirma_fin.document.getElementById('Txt_CodAte').value
                })
              }).then(response => response.json())
              .then(function(data) { 
                if(data){
                  
                }  
                }).catch(error => {
                console.log(error);    
              }); 
            }
        }      
            myWindowFrm_CM_confirma_fin.focus();
      
      break;
    default:
      break;


  }
  
}




var   myWindownueva_atencion;
 
window.nueva_atencion = function () {
   
  if(myWindownueva_atencion!==undefined) {

    myWindownueva_atencion.document.body.innerHTML="";

  }
   myWindownueva_atencion = window.open("", "myWindownueva_atencion", "toolbar=no,menubar=no,top=200,left=600,width=40%,height=50%");
   myWindownueva_atencion.document.body.innerHTML="";
    myWindownueva_atencion.document.write(` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" /> 
    <head>
    
    <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
     
    </head>
    <body>
    <div   style="border:1px solid black;margin:1vh;padding:5vh;display:flex; flex-direction: column; height:70%">
     
     
    <div style="  margin: 0px auto;"   >
    
      <input type="radio" id="opt_caso1" disabled name="tipollamada"   >
      <label for="opt_caso1"> EPS, Compañia de Seguros, Otros</label><br>
      <input type="radio" id="opt_caso2" disabled name="tipollamada"   > 
      <label for="opt_caso2"> Maxisalud o Autoseguros (BD)</label><br>
      <input type="radio" id="Opt_Venta_medicina" disabled name="tipollamada"    >
      <label for="Opt_Venta_medicina">Delivery pacifico / medicina compleja</label><br>
      <input type="radio" id="Opt_asegurabilidad" disabled name="tipollamada">
      <label for="Opt_asegurabilidad"> Asegurabilidad</label><br>
      <input type="radio" id="Opt_Melchorita" disabled name="tipollamada">
      <label for="Opt_Melchorita"> Melchorita</label><br>
      <input type="radio" id="Opt_opsired" disabled name="tipollamada">
      <label for="Opt_opsired"> Orientación Psicológica RED</label><br>
      <input type="radio" id="Opt_Nutricion" checked name="tipollamada">
      <label for="Opt_Nutricion"> Nutricion</label><br>
    </div>
    </div>  
    <div style="display:grid;grid-template-columns:2fr 2fr 1fr 1fr;">
    <div></div>
     <div></div>
     <input type="button"  class="btn btn btn-success btn-sm"  id="CmdAceptar" name="CmdAceptar" onClick="cmdaceptar_Click();" value="Aceptar"> 
     <input type="button"  class="btn btn btn-danger btn-sm "  id="CmdCancelar" name="CmdCancelar" onClick="javascript:window.close('','_parent','');" value="Cancelar"> 

     </div>
     
   
    </div>
    </body>
     <script src="${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/w_frm_tidellam.js?${Date.now()}">
     var Pvienede = "FRMSERVICIOLABORATORIO";
     </script>`);
      if (myWindownueva_atencion.document) {
        myWindownueva_atencion.document.title = "Tipo de llamada";
      }
      myWindownueva_atencion.appMainWindow = window;

      myWindownueva_atencion.addEventListener("resize", function () {
       
    
        myWindownueva_atencion.resizeTo(400, 400);
      });
      //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
      myWindownueva_atencion.focus();
     
    } 
 
var   myWindowseguimiento ;

 
window.cmdSeguimiento_Click = function () {

  var fila = document.querySelector('.selected');
  if (!fila) return;
  var cod_serv_laboratorio = fila.cells[2].innerHTML.trim();
  //Pvienede = "FRMSERVICIOLABORATORIO"
 

  if(myWindowseguimiento!==undefined) {

    myWindowseguimiento.document.body.innerHTML="";

  }
  myWindowseguimiento = window.open("", "myWindowseguimiento", "toolbar=no,menubar=no,top=500,left=500,width=40%,height=400");
  
 
    myWindowseguimiento.document.write(Frm_seguimiento(cod_serv_laboratorio));
 
  if (myWindowseguimiento.document) {
    myWindowseguimiento.document.title = "Seguimiento de Servicios";
  }
  myWindowseguimiento.addEventListener("resize", function () {
    

    myWindowseguimiento.resizeTo(800, 900);
  });
  //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
  myWindowseguimiento.focus();
  //myWindowseguimiento.document.getElementById('optAtencion').checked = true;
 

}

var   myWindowdatos_paciente ;

 
window.Cmd_datos_paciente_Click = function () {

  var fila = document.querySelector('.selected');
  if (!fila) return;
  var cod_ate = fila.cells[2].innerHTML.trim();
  //Pvienede = "FRMSERVICIOLABORATORIO"
 

  if(myWindowdatos_paciente!==undefined) {

    myWindowdatos_paciente.document.body.innerHTML="";

  }
  myWindowdatos_paciente = window.open("", "myWindowdatos_paciente", "toolbar=no,menubar=no,top=500,left=500,width=40%,height=400");
  
 
  myWindowdatos_paciente.document.write(Frm_CM_datos_paciente(cod_ate));
 
  if (myWindowdatos_paciente.document) {
    myWindowdatos_paciente.document.title = "Datos del paciente";
  }
  myWindowdatos_paciente.addEventListener("resize", function () {
    

    myWindowdatos_paciente.resizeTo(800, 900);
  });
   myWindowdatos_paciente.focus();
  //myWindowseguimiento.document.getElementById('optAtencion').checked = true;
 

}
window.Cmd_soporte_Click = function(){
   
    var fila = document.querySelector('.selected');

    if(!fila) return;
 
      printModal(`
      <style> 
      </style>
      <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> SOPORTE</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
      <div  id="Frm_CM_soporte" style="border:1px solid black;margin-top:2vh">
       <h6 style="width:15vw;background-color:white;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Seleccione el Soporte</h6>
            <div style="display:grid;  grid-template-columns: 1fr  ;" >
            <input type="hidden" id="txtCodServ" name="txtCodServ">
            <div><input type="radio" id="OptAteNomPac" name="OptSoporte" checked  ><label for="OptAteNomPac">Cambiar paciente (asignar otro paciente a la ate.)</label></div>
            <div><input type="radio" id="Opt_cambio_datos_paciente" name="OptSoporte"  ><label for="Opt_cambio_datos_paciente">Actualizar datos de paciente</label></div>
            <div><input type="radio" id="Opt_datos_copago" name="OptSoporte"  ><label  for="Opt_datos_copago" id="lbl_datos_copago">Datos para la emision de documento electronico</label></div>
            <div><input type="radio" id="Opt_cambio_datos_paciente" name="OptSoporte"  ><label  for="Opt_cambio_datos_paciente">Actualizar datos de paciente</label></div>
            <div><input type="radio" id="Opt_tipoate" name="OptSoporte"  ><label for="Opt_tipoate">Cambio de tipo de atencion (Inm/Prog)</label></div>
            <div><input type="radio" id="OptAteCambioPago" name="OptSoporte"  ><label for="OptAteCambioPago">Cambio de Deducible y forma de pago</label></div>
            <div><input type="radio" id="OptAtePV" name="OptSoporte"  ><label for="OptAtePV">Pasar Atención a PNE o VNR</label></div>
            <div><input type="radio" id="OptAteCamAseg" name="OptSoporte"  ><label for="OptAteCamAseg">Cambio de Aseguradora</label></div>
            <div><input type="radio" id="OptAteCamDoc" name="OptSoporte"  ><label for="OptAteCamDoc">Cambio de Médico</label></div>
            <div><input type="radio" id="Opt_cambio_prog" name="OptSoporte" disabled ><label for="Opt_cambio_prog">Cambio de programa (solo CCS)</label></div>
            <div><input type="radio" id="OptAteCamClas" name="OptSoporte"  ><label for="OptAteCamClas">Cambio de Clasificación</label></div>
            <div><input type="radio" id="OptCambioPeriodo" name="OptSoporte"  ><label for="OptCambioPeriodo">Cambio de Periodo de atención</label></div>
            <div><input type="radio" id="Opt_paciente_no_medico" name="OptSoporte"  ><label for="Opt_paciente_no_medico">Paciente no quiere atte. con medico</label></div>
            <div><input type="radio" id="Opt_cambio_perfil_ate" name="OptSoporte"  ><label for="Opt_cambio_perfil_ate">Cambio de Perfil de atención (de SEG a CTRL)</label></div>
            <div><input type="radio" id="Opt_presencial_virtual" name="OptSoporte"  ><label for="Opt_presencial_virtual" id="lbl_presencial_virtual">Cambiar modo de atencion medica (presencial/virtual)</label></div>
            <div><input style="display:none" type="radio" id="Opt_cambio_subzona" name="OptSoporte"  ><label for="Opt_cambio_subzona" style="display:none" id="lbl_cambio_subzona">Cambiar Sub-Zona</label></div>
            <div><input type="radio" id="Opt_pac_clave" name="OptSoporte"  ><label for="Opt_pac_clave">Paciente clave</label></div>
            <div><input style="display:none" type="radio" id="Opt_act_pac" name="OptSoporte"  ><label  for="Opt_act_pac" style="display:none" id="lbl_act_pac">Correccion de nombre de paciente</label></div>
            <div><input style="display:none" type="radio" id="Opt_corrige_num_cel" name="OptSoporte"  ><label  for="Opt_corrige_num_cel" style="display:none">Correccion de numero de celular</label></div>
            <div><input type="radio" id="OptAteCam27" name="OptSoporte"  ><label for="OptAteCam27">Cambio de estado 2 o 7</label></div>

            </div>
      </div>  
      <div style="display:flex;justify-content:space-around	;">   
      <input type="button"  class="btn btn btn-success btn-sm "  id="CmdAceptar" name="CmdAceptar"  onclick="CmdAceptarSoporte_click();" value="Aceptar"> 
      <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="CmdCancelar" name="CmdCancelar" onClick="" value="Salir">
      <label style="color:red;display:none" id="Lbl_ate_provisionada"></label>
      
      </div> 
 
   `);
 
   
   var  Rst_Servicio = "SELECT cod_boleta, flg_boleta, flg_bolman, editar_provisionado_sap, cod_tipo_doctor, tar_ate, for_ate, clasificacion_pac, trim(des_dis) des_dis, servicio_provisionado_sap FROM t_tmpllamadas ate WHERE ate.cod_ate = " + fila.cells[2].innerHTML.trim();

   fetch('/modulo/Abre_Detalle/', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       query: Rst_Servicio
   
     })
   }).then(response => response.json())
     .then(function (data) {
       var Rst_Servicio2=data;
      if  (Rst_Servicio2.length >0) {
            if (Rst_Servicio2[0].des_dis == "ATE")  {
              document.getElementById('Opt_cambio_subzona').style.display ='inline-block';
              document.getElementById('lbl_cambio_subzona').style.display ='inline-block';

            }
                    fetch('/modulo/permite_ingreso/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      codigo: 54
                    })
                    }).then(response => response.json())
                    .then(function (data) {
                      
                    if  ((data && Rst_Servicio2[0].clasificacion_pac == 2) ||  document.getElementById('usuario').innerHTML == "SISTEMAS") {
                      document.getElementById('Opt_cambio_prog').disabled = false;
                    }
                    
                    }).catch(error => {
                      console.log(error);
                    }); 
            
            if (Rst_Servicio2[0].servicio_provisionado_sap ) {
              document.getElementById('txtCodServ').dataset.Tag ='PROV';   
            }
      }
    
   
    
   
     }).catch(error => {
       console.log(error);
     }); 
   
     document.getElementById('txtCodServ').value = fila.cells[2].innerHTML.trim();

     fetch('/modulo/permite_ingreso/', { //liquidacion
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigo: 46
      })
    }).then(response => response.json())
      .then(function (data) {
        
       if  (data ) {
        document.getElementById('OptAteNomPac').disabled = true;
        document.getElementById('OptAteCambioPago').disabled = true;
        document.getElementById('OptAtePV').disabled = true;
        document.getElementById('OptAteCamAseg').disabled = true;
        document.getElementById('OptAteCamClas').disabled = true;
 
       }
      
      }).catch(error => {
        console.log(error);
      }); 
     
    
   
   fetch('/modulo/permite_ingreso/', { //liquidacion
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      codigo: 106
    })
  }).then(response => response.json())
    .then(function (data) {
      
     if  (data ) {
      document.getElementById('Opt_act_pac').style.display = 'inline-block'; 
      document.getElementById('lbl_act_pac').style.display = 'inline-block'; 

     }
    
    }).catch(error => {
      console.log(error);
    }); 
   document.getElementById('Opt_datos_copago').style.display = 'inline-block'; 
   document.getElementById('lbl_datos_copago').style.display = 'inline-block'; 
 

   fetch('/modulo/permite_ingreso/', { //liquidacion
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      codigo: 93
    })
  }).then(response => response.json())
    .then(function (data) {
      
     if  (data ) {
      document.getElementById('Opt_pac_clave').disabled = false; 

     }
    
    }).catch(error => {
      console.log(error);
    }); 
   fetch('/modulo/permite_ingreso/', { //liquidacion
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      codigo: 119
    })
  }).then(response => response.json())
    .then(function (data) {
      
     if  (data ) {
      document.getElementById('Opt_cambio_subzona').disabled = false; 

     }
    
    }).catch(error => {
      console.log(error);
    }); 
   
    document.getElementById('Opt_cambio_perfil_ate').disabled = true;
   
   
   var  Adata_ate = "SELECT ate.*, exp.estado_exp estado_expediente FROM t_tmpllamadas ate left join t_tmpexp exp ON ate.cod_ate = exp.codate_exp and exp.estado_exp <> 'F' where ate.cod_ate = " + fila.cells[2].innerHTML.trim();

   fetch('/modulo/Abre_Detalle/', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       query: Adata_ate
   
     })
   }).then(response => response.json())
     .then(function (data) {
       if  (data.length >0) {
        if (data[0].clasificacion_pac == 2 && data[0].contador_periodo > 1 ){
        
            fetch('/modulo/permite_ingreso/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                codigo: 127
              })
            }).then(response => response.json())
              .then(function (data) {
                
               if  (data ) {
                document.getElementById('Opt_cambio_perfil_ate').disabled = false;
               }
              
              }).catch(error => {
                console.log(error);
              }); 
        }
      
          if (! data[0].estado_expediente=='null') {
                if (data[0].estado_expediente == "A" || data[0].estado_expediente == "F") {
                     document.getElementById('OptAteCamAseg').disabled = false;//permite_ingreso(90)  permiso para cambiar la aseguradora;
                }else{
                     document.getElementById('OptAteCamAseg').disabled = true;
                }
          }else{
                document.getElementById('OptAteCamAseg').disabled = false;

          }
      }
  
  switch ( data[0].clasificacion_pac ){
      
      case 1:
      case 2: 
      case 7:
           document.getElementById('Opt_presencial_virtual').style.display = 'inline-block';
          document.getElementById('lbl_presencial_virtual').style.display = 'inline-block';

          if (data[0].servicio_provisionado_hhmm ) {
            document.getElementById('Opt_presencial_virtual').disabled = true ;
          }else{
            document.getElementById('Opt_presencial_virtual').disabled = false ;
          }
       break;
      default:
          document.getElementById('Opt_presencial_virtual').style.display = 'none';
          document.getElementById('lbl_presencial_virtual').style.display = 'none';

        break;  
    }
          
  
    if (document.getElementById('txtCodServ').dataset.tag == "PROV" ){
   
      document.getElementById('Lbl_ate_provisionada').style.display = 'inline-block';
      if (data[0].editar_provisionado_sap ) {
        document.getElementById('Lbl_ate_provisionada').innerHTML = "Servicio Provisionado con permiso de edición"
          
      }else{
          if (document.getElementById('usuario') != "SISTEMAS" ){
            document.getElementById('OptAteCambioPago').disabled = true ;
            document.getElementById('OptAtePV').disabled = true ;
            document.getElementById('OptAteCamClas').disabled = true ;
            document.getElementById('OptAteCamDoc').disabled = true ;
            document.getElementById('OptAteCamAseg').disabled = false ;
            document.getElementById('Opt_cambio_subzona').disabled = true ;
           
          }
      }
     }
      
    
   
     }).catch(error => {
       console.log(error);
     }); 

}



window.CmdAceptarSoporte_click = function(){

/* if (document.getElementById('txtCodServ').value == ""){  
  return;
}  */
if (document.getElementById('OptAteCam27').checked == true){  
  var estado = prompt("Porfavor ingresa el estado a cambiar 2 o 7");

    fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        query:"select * from estado27(" + document.getElementById('Txt_busqueda').value.trim() + ",'"+ estado.trim()+"')"
      }
    )
  }).then(response => response.json())
    .then(function (data) {
        alert(data[0].estado27);
    }).catch(error => {
      console.log(error);
    });
  return;
} 

if (document.getElementById('Opt_act_pac').checked){
 
  printModal2(`
  <style> 
  </style>
  <div id="ed-modal-contentheadercm_actualizar_pac"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> SOPORTE</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  <div  id="frm_cm_actualizar_pac" style="border:1px solid black;margin-top:2vh">
   <h6 style="width:15vw;background-color:white;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Seleccione el Soporte</h6>
        <div style="display:grid;  grid-template-columns: 1fr  ;" >
        <input type="hidden" id="txtCodServOpt_act_pac" name="txtCodServOpt_act_pac">
        <div><input type="radio" id="OptAteNomPac" name="OptSoporte" checked  ><label>Cambiar paciente (asignar otro paciente a la ate.)</label></div>
      
   
        </div>
  </div>  
  <div style="display:flex;justify-content:space-around	;">   
  <input type="button"  class="btn btn btn-success btn-sm "  id="CmdAceptar" name="CmdAceptar"  onclick="CmdAceptarSoporte_click();" value="Aceptar"> 
  <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="CmdCancelar" name="CmdCancelar" onClick="" value="Salir">
   
  </div> 

`);
 document.getElementById('txtCodServOpt_act_pac').value = document.getElementById('txtCodServ').value ;
 }else if (document.getElementById('OptAteNomPac').checked ){
 
  printModal2(`
  <style> 
  </style>
  <div id="ed-modal-contentheaderCM_Mantenimiento_Pacientes"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> CAMBIO DE PACIENTE</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  <div  id="Frm_CM_Mantenimiento_Pacientes" style="border:1px solid black;margin-top:2vh">
   <h6 style="width:15vw;background-color:white;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Seleccione el Soporte</h6>
        <div style="display:grid;  grid-template-columns: 1fr  ;" >
        <input type="hidden" id="txtCodServOptAteNomPac" name="txtCodServOptAteNomPac">
        <div><input type="radio" id="OptAteNsomPac" name="OptSoporte"    ><label>Cambiar paciente (asignar otro paciente a la ate.)</label></div>
      
   
        </div>
  </div>  
  <div style="display:flex;justify-content:space-around	;">   
  <input type="button"  class="btn btn btn-success btn-sm "  id="CmdAceptar" name="CmdAceptar"  onclick="CmdAceptarSoporte_click();" value="Aceptar"> 
  <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="CmdCancelar" name="CmdCancelar" onClick="" value="Salir">
   
  </div> 

`);
 document.getElementById('txtCodServOptAteNomPac').value = document.getElementById('txtCodServ').value ;
 /*}  else if ( OptAteCambioPago.Value = True ){
   Frm_CM_datos_paciente.Txt_CodAte.Text = txtCodServ.Text;
  Frm_CM_datos_paciente.Show 1

  }else if  OptAtePV.Value = True ){
  Call P_VNRyCANCELAR_CM(Me, Val(txtCodServ.Text), True)
  */
  }else if (document.getElementById('OptAteCamAseg').checked ){
  
  printModal2(`
  <style> 
  </style>
  <div id="ed-modal-contentheaderSOP_CM_CambioAseg"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> CAMBIAR ASEGURADORA</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  <div  id="Frm_SOP_CM_CambioAseg" style="border:1px solid black;margin-top:2vh">
   <h6 style="width:15vw;background-color:white;    margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Seleccione el Soporte</h6>
        <div style="display:grid;  grid-template-columns: 1fr  ;" >
        <input type="hidden" id="txtCodServOptAteCamAseg" name="txtCodServOptAteCamAseg">
        <div><input type="radio" id="OptAteNsomPac" name="OptSoporte"    ><label>Cambiar paciente (asignar otro paciente a la ate.)</label></div>
      OptAteCamAseg
   
        </div>
  </div>  
  <div style="display:flex;justify-content:space-around	;">   
  <input type="button"  class="btn btn btn-success btn-sm "  id="CmdAceptar" name="CmdAceptar"  onclick="CmdAceptarSoporte_click();" value="Actualizar"> 
  <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="CmdCancelar" name="CmdCancelar" onClick="" value="Salir">
   
  </div> 

`);
 document.getElementById('txtCodServOptAteCamAseg').value = document.getElementById('txtCodServ').value ;
  
  }/*else if  Opt_cambio_prog.Value = True ){
  Frm_cambiar_emp.txtCodServ = txtCodServ.Text
  Frm_cambiar_emp.Show 1
  
  }else if  OptAteCamClas.Value = True ){
  Frm_CM_clasificacion.txtCodServ = txtCodServ.Text
  Frm_CM_clasificacion.Tag = "CLASIFICACION"
  Frm_CM_clasificacion.Show 1

  }else if  OptCambioPeriodo.Value = True ){
  Frm_CM_clasificacion.txtCodServ = txtCodServ.Text
  Frm_CM_clasificacion.DC_clasificacion.Enabled = False
  Frm_CM_clasificacion.Tag = "PERIODO"
  Frm_CM_clasificacion.Show 1
  
  
  }else if  Opt_cambio_perfil_ate.Value = True ){
  Frm_cambiar_perfil.txtCodServ = txtCodServ.Text
  Frm_cambiar_perfil.Show 1
  
  }else if  OptAteCamDoc.Value = True ){
  Frm_CM_cambios_nombres_doctor.txtCodServ = txtCodServ.Text
  Frm_CM_cambios_nombres_doctor.Show 1
  
  }else if  Opt_tipoate.Value = True ){
  Frm_CM_cambios_tipoate.txtCodServ = txtCodServ.Text
  Frm_CM_cambios_tipoate.Show 1

  }else if  Opt_cambio_datos_paciente.Value = True ){
  Frm_Actualiza_datos_paciente.Txt_tipo_servicio = "ATE"
  Frm_Actualiza_datos_paciente.Txt_Servicio = txtCodServ.Text
  Frm_Actualiza_datos_paciente.Show 1
  
   }else if   Opt_datos_copago.Value = True ){
  Frm_datos_copago_ce.Txt_tipo_servicio.Text = "ATE"
  Frm_datos_copago_ce.Txt_Servicio.Text = txtCodServ.Text
  Frm_datos_copago_ce.Show 1

  }else if  Opt_cambio_subzona.Value = True ){
  frm_sub_zona.txtCodServ = txtCodServ.Text
  frm_sub_zona.Show 1

  }else if  Opt_presencial_virtual = True ){
  frm_modo_atencion.txtCodServ = txtCodServ.Text
  frm_modo_atencion.Show 1
  
   }else if   Opt_pac_clave.Value = True ){
  frm_pac_clave.txtCodServ = txtCodServ.Text
  frm_pac_clave.Show 1
  
   }else if   Opt_corrige_num_cel.Value = True ){
  frm_correccion_cel.txtCodServ = txtCodServ.Text
  frm_correccion_cel.Show 1
  
   }else if  Opt_paciente_no_medico.Value = True ){
  Frm_paciente_no_quiere_att_medico.txtCodServ = txtCodServ.Text
  Frm_paciente_no_quiere_att_medico.Show 1
  
  } */

}

 
  async function colores_grid ()
  {
    var color ='';
  var aux_hora ;
  var now = new Date();
  var nowtime = now.getTime();
var filadata ='';
  var buscapedidoasoc = false;
  var rs_PedidoAsocAte;
var obj;
await fetch('/modulo/Abre_Detalle/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: "SELECT ate.cod_ate, cm_estado FROM t_tmpllamadas ate INNER JOIN t_tmppedidomed ped ON ate.cod_ate = ped.cod_ate WHERE ate.cm_estado not in ('8', 'C', 'I', 'X', 'P', 'NC', 'RP') and canc_ped is null and tipo_servicio = 'ATE' AND fec_ate >= current_date -30"

  })
}).then(response => response.json())
  .then(function (rs_PedidoAsocAte1) {
    
      if (rs_PedidoAsocAte1.length>0){
      buscapedidoasoc = true;
      rs_PedidoAsocAte = rs_PedidoAsocAte1;
      }

  }).catch(error => {
    console.log(error);
  });

  var t02=document.getElementById('t02').rows;
  for (var i = 0;i<t02.length;i++){
    filadata = t02[i];
  if (filadata.cells[0].innerHTML.trim() == "6" || filadata.cells[0].innerHTML.trim() == "R6" ){
        if (filadata.cells[11].innerHTML.trim() !='' ){
             aux_hora = new Date(filadata.cells[9].innerHTML.trim()   +' '+ filadata.cells[11].innerHTML.trim()   )   ;// + TimeValue("00:05")
              aux_hora = nowtime - (aux_hora.getTime() + 5*60000) ;
              if (aux_hora > 0) {
                 //sombrea grid de color rojo
                // color = 'selectedrojo';
                  filadata.classList.add("selectedrojo");

             }else{
              //color =  '';
             }
        }
 }
 //sombrea de color naranja (si se paso media hora n casa de paciente)
 if (filadata.cells[0].innerHTML.trim()  == "7" || filadata.cells[0].innerHTML.trim()  == "R7" ){
  if (filadata.cells[12].innerHTML.trim() !='' ){
       aux_hora = new Date(filadata.cells[9].innerHTML.trim() +' '+filadata.cells[12].innerHTML.trim() )   ;// + TimeValue("00:05")
       aux_hora = nowtime - (aux_hora.getTime() + 30*60000 );
       if (aux_hora > 0) {
           //sombrea grid de color rojo
            filadata.classList.add("selectednaranja");

       }else{
        color =  '';
       }
  }
}

if (document.getElementById('Txt_busqueda').value == "" ){ //los colores verdes solo se dan en atenciones sin filtrar
            
        if ((filadata.cells[0].innerHTML.trim()  == "3" ||filadata.cells[0].innerHTML.trim()  == "R3") && filadata.cells[26].innerHTML.trim()  != "") {
              if (ls_CodDrAnt != filadata.cells[26].innerHTML.trim() ) {
            
                    fetch('/modulo/Abre_Detalle/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: "SELECT cm_estado FROM t_tmpllamadas WHERE cod_doc = '" + filadata.cells[26].innerHTML.trim()   + "' and cm_estado in ('3', '4', '5', '6', '7', 'R3', 'R4', 'R5', 'R6', 'R7') ORDER BY cm_orden DESC"
                  })
                }).then(response => response.json())
                  .then( function (lrs_busca_ate) {

                    if(lrs_busca_ate.length < 0) {

                    }else if(lrs_busca_ate.length == 1){//Es la primera atencion del medico
                          if ( lrs_busca_ate[0].cm_estado.trim() == "3" || lrs_busca_ate[0].cm_estado.trim() == "R3" ){
                            b_colorea_verde = true;
                             
                            filadata.classList.add("selectedverde");

                          }
                    }else if(lrs_busca_ate.length > 1){                        //tiene varias atenciones
                      if ( lrs_busca_ate[0].cm_estado.trim() == "3" || lrs_busca_ate[0].cm_estado.trim() == "R3" ){
                        b_colorea_verde = true;
                     
                        filadata.classList.add("selectedverde");

                      }else{
                        if ( lrs_busca_ate[0].cm_estado.trim() == "7" || lrs_busca_ate[0].cm_estado.trim() == "R7" ){
                                  for(var i=1;i<lrs_busca_ate.length;i++){
                                                  if ( (lrs_busca_ate[i].cm_estado.trim()) == "3" ||  (lrs_busca_ate[i].cm_estado.trim()) == "R3" ){
                                                    b_colorea_verde = true;
                                               
                                                    filadata.classList.add("selectedverde");

                                                  }else{
                                                      switch  (lrs_busca_ate[i].cm_estado.trim()){
                                                          case "4":
                                                          case "5":
                                                          case "6":
                                                          case "R4":
                                                          case "R5":
                                                          case "R6":
                                                            //color =  '';
                                                      }
                                                  }
                                  }
                        }

                      }

                    } 
                  }).catch(error => {
                    console.log(error);
                  }); 
              }
              ls_CodDrAnt = filadata.cells[26].innerHTML.trim()  ;

         }
}

      if (  filadata.cells[3].innerHTML.trim().indexOf('CRONICO') > 0 || filadata.cells[3].innerHTML.trim()  == "MAXISALUD" ){
                //sombrea de color morado
              switch  (filadata.cells[0].innerHTML.trim() ){
                  case "2":
                  case "R2":
                  case "RT2":
                  case "RP2":
                      aux_hora = new Date(filadata.cells[9].innerHTML.trim()  +' '+ filadata.cells[10].innerHTML.trim() )   ;// + TimeValue("00:05")
                        aux_hora = nowtime - (aux_hora.getTime() - (60 * 60 * 24 * 1000 * 2)) ;
                      if (aux_hora > 0 ){
                          //sombrea de color morado
                           
                              filadata.classList.add("selectedmorado1");

                          //usar en otro modulo
                          // Call P_Seguimiento_Cronico(Val(Grid_CM.TextMatrix(i, 2)), "393")
                      }
              }

              //sombrea de color marron
              switch  (filadata.cells[0].innerHTML.trim() ){
                  case "7":
                  case "R7":
                  case "8":
                  default:
                    aux_hora = new Date(  filadata.cells[9].innerHTML.trim()   +' '+ filadata.cells[10].innerHTML.trim()  )   ;// + TimeValue("00:05")
                      aux_hora = (nowtime - (60 * 60 * 24 * 1000 * 1) ) - aux_hora.getTime() ;
                      if (aux_hora >= 0 ){
                          //sombrea de color marron
                         filadata.classList.add("selectedmarron");

                          //usar en otro modulo
                          //Call P_Seguimiento_Cronico(Val(Grid_CM.TextMatrix(i, 2)), "394")
                      }
              }

                //sombrea de color amarillo para los casos de atenciones en estado 2 con pedidos creados validos
                var estadocolor = filadata.cells[0].innerHTML.trim() ;
                switch  (true){
                  case (estadocolor != "8"):
                    
                        //busca si la atencion tienen un pedido asociado
                        if (buscapedidoasoc){
                          
                             obj = rs_PedidoAsocAte.find(o => o.cod_ate === filadata.cells[2].innerHTML.trim());
                              if (obj!==undefined){
                                filadata.classList.add("selectedamarillo");

                              }
                      
                        }
                }

      }else{
                  //MAD
                  //sombrea de color morado
                switch  (filadata.cells[0].innerHTML.trim() ){
                  case "2":
                  case "R2":
                  case "RT2":
                  case "RP2":

                    aux_hora = new Date( filadata.cells[6].innerHTML.trim()  +' '+ filadata.cells[7].innerHTML.trim()  )   ;// + TimeValue("00:05")

                    aux_hora = nowtime -  aux_hora.getTime()   ;
                        
                    if  (aux_hora > 0) {

                        //sombrea de color morado
                        filadata.classList.add("selectedmorado2");
 
                    }
                }
        }

 

 }
} 
 var  b_colorea_verde ,ls_CodDrAnt ;
 



 

window.Cmd_guardarrpg_Click =async function (){
  var lrs_tipo_doctor         ;
  var ls_dr1                  ;
  var ls_dr2                 ;
  var est_final               ;
  var s_UpdateSQL            ;
  
  //VALIDACIONES
  
  if((document.getElementById('Txt_especialidadrpg').value).trim() == "") {
      alert ("ingrese la especialidad");
      return;
  }
  
  if( document.getElementById('Txt_Drrpg').value == "" ){
      alert ("ingrese el Dr a asignar");
      return;
  }
    
  if( document.getElementById('DTPicker1rpg').value < new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-') ){
      alert ("La fecha es menor que la fecha del servicio");
      document.getElementById('DTPicker1rpg').focus();
      return;
  }
  
  if(document.getElementById('CmbHorarpg').value == "" ){
      alert ("Seleccione la hora");
      document.getElementById('CmbHorarpg').focus();
      return;
  }else{
      if( new Date().toLocaleDateString(undefined,{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-').split('-').reverse().join('-') + ' ' + new Date().toTimeString().slice (0,8)   >= document.getElementById('DTPicker1rpg').value + ' ' + document.getElementById('CmbHorarpg').value) {
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
       
   
       s_UpdateSQL = " flg_reprogramada = true, cm_esp_anterior = '" + document.getElementById('Txt_especialidadrpg').value.trim() + "', cm_cod_dr_anterior = '" + Adata_atencionrpg[0].cod_doc.trim() + "', cm_dr_anterior = '" + Adata_atencionrpg[0].nom_doc.trim() + "'";
       
       if(Adata_atencionrpg[0].hrlledr == null ){
          s_UpdateSQL = s_UpdateSQL + ", cm_fec_anterior = '" + Adata_atencionrpg[0].fec_ate + "', cm_hor_anterior = "+(Adata_atencionrpg[0].hor_ate == null?'':"'")   + Adata_atencionrpg[0].hor_ate  + (Adata_atencionrpg[0].hor_ate == null?'':"'") ;
       }else{
          s_UpdateSQL = s_UpdateSQL + ", cm_fec_anterior = '" + Adata_atencionrpg[0].feclledr  + "', cm_hor_anterior = '" + Adata_atencionrpg[0].hrlledr + "'";
       }
       
       //las siguientes opciones solo una se cumple
       if(document.getElementById('Opt_tiempo_mayorrpg').checked == true ){
          s_UpdateSQL = s_UpdateSQL + ", cm_estado = 'RT2', Tipo_reprog = 'T'";
          est_final = "RT2";
       }
       
       if(document.getElementById('Opt_por_pacrpg').checked == true ){
          s_UpdateSQL = s_UpdateSQL + ", cm_estado = 'RP2', Tipo_reprog = 'P'";
          est_final = "RP2";
       }
       
       if(document.getElementById('Opt_adelanto_aterpg').checked == true ){
          s_UpdateSQL = s_UpdateSQL + ", contador_periodo = 1, cm_estado = 'R2', Tipo_reprog = 'A' ";
          est_final = "R2";
       } 
       
       s_UpdateSQL = s_UpdateSQL + " , cm_orden = 3, cod_dr_env_msj = '" + Adata_atencionrpg[0].cod_doc.trim() + "', feclledr = null, HRLLeDR = Null, COD_ESP = '" + document.getElementById('Txt_especialidadrpg').value + "', fec_ate = '" + document.getElementById('DTPicker1rpg').value +  "', Hor_ate = '" + document.getElementById('CmbHorarpg').value + "', cod_doc = '" + document.getElementById('Txt_Drrpg').value + "', nom_doc = '"+ document.getElementById('Txt_Drrpg').options[document.getElementById('Txt_Drrpg').selectedIndex].text + "', cm_tiempo = Null, obs_cm = '" + document.getElementById('Txt_obs_cmrpg').value + "'";
       
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
                  query: "SELECT * FROM m_direcciones WHERE cod_tit = '" + Adata_atencionrpg[0].cod_tit + "' ORDER BY cod_dir desc"
              
                })
              }).then(response => response.json())
                .then(function (lrs_direccion) {
                   if(lrs_direccion.length>0){
                         ll_cod_dir =  parseInt(lrs_direccion[0].cod_dir.trim()) + 1 ;
                   }
              
                }).catch(error => {
                  console.log(error);
                });         
              
              
              sqlaux = "INSERT INTO M_DIRECCIONES (cod_tit,cod_dir,des_dir,cod_dis,cod_prov,ref_dir,tlf_casa,tlf_dir,tlf_oficina,tlf_oficina_anx) VALUES ('" + (Adata_atencionrpg[0].cod_tit).trim() + "', '" +  ll_cod_dir.padStart(2, '0') + "', '" + document.getElementById('Txt_direccion').value.trim() + "', '" +  document.getElementById('Txt_distritorpg').value + "', '" + document.getElementById('Txt_provinciarpg').value + "', '" + document.getElementById('txt_referenciarpg').value + "', '" + document.getElementById('Txt_tlf_casarpg').value + "', '" + document.getElementById('Txt_tlf_casarpg').value + "', '"  + document.getElementById('Txt_tlf_oficinarpg').value + "', '" + document.getElementById('Txt_tlf_oficina_anxrpg').value + "')"
          }else{
              ll_cod_dir =  document.getElementById('Txt_direccionrpg').cod_dir;
              sqlaux = "UPDATE M_DIRECCIONES SET des_dir = '" +  document.getElementById('Txt_direccionrpg').value + "', cod_dis = '" + document.getElementById('Txt_distritorpg').value + "', cod_prov = '" +document.getElementById('Txt_provinciarpg').value  + "', ref_dir =  '" + document.getElementById('txt_referenciarpg').trim() + "', tlf_casa = '" + document.getElementById('Txt_tlf_casarpg').value + "', tlf_dir ='" + document.getElementById('Txt_tlf_casarpg').value + "', tlf_oficina ='" + document.getElementById('Txt_tlf_oficinarpg').value + "', tlf_oficina_anx ='" + document.getElementById('Txt_tlf_oficina_anxrpg').value + "'  WHERE cod_tit = '" + Adata_atencionrpg[0].cod_tit.trim() + "' AND cod_dir = '" + document.getElementById('Txt_direccionrpg').cod_dir + "'"
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
              
    
  
  
  
  
   
  
  if(document.getElementById('Opt_tiempo_mayorrpg').checked == true ){
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
               ls_cambios :  "MEDICO: " + document.getElementById('Txt_Drrpg').value  +  ", FECHA: " +   document.getElementById('DTPicker1rpg').value + ", HORA: " +  document.getElementById('CmbHorarpg').value,
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
  
  if(document.getElementById('Opt_por_pacrpg').checked  == true ){
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
             ls_cambios :  "MEDICO: " + document.getElementById('Txt_Drrpg').value  +  ", FECHA: " +   document.getElementById('DTPicker1rpg').value + ", HORA: " +  document.getElementById('CmbHorarpg').value,
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
  
  if(document.getElementById('Opt_adelanto_aterpg').checked == true ){
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
  
  //Call Abre_Detalle(Adata_atencionrpg, "SELECT * FROM t_tmpllamadas WHERE cod_ate =" & Txt_CodAte)
  
   
  //Frm_CM_Grid.CmdFiltrar_Click
  alert("Se reprogramó la atencion : " + document.getElementById('Txt_CodAterpg').value  );
  document.getElementById('CmdFiltrar').click(); 
   
  
  }
  

window.Cb_clasificacion_Click = function(val){
    
document.getElementById('Chk_otras').disabled = false;
    
if (val == "1" ){
  document.getElementById('cbo_subclasificacion').style.display = 'block';
    //Me.cbo_subclasificacion.Text = "[---Seleccione---]"
    document.getElementById('cbo_subclasificacion').focus();
}else{
  document.getElementById('cbo_subclasificacion').style.display = 'none';
}

if (val == "3" )    {
  document.getElementById('Dcbo_especialista').style.display = 'block';
  document.getElementById('Dcbo_especialista').focus();
  document.getElementById('Chk_otras').disabled = true;
  document.getElementById('Chk_otras').checked = true;
}else{
  document.getElementById('Dcbo_especialista').style.display = 'none';
}

}




window.Cmd_auditoria_Click = function(el) {
   if (filacurrent=='') return;
   printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#1cc88a;display:flex;justify-content:space-between;"><h4> AUDITORIA DE ATENCION MEDICA</h4><button type="button"  id="cancelarauditoria" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  
 
 <table id="auditoria"  border style="border-collapse: collapse;width: 100%;">
<thead id="auditoriahead" style=" background-color:#1cc88a;color:white;">
<tr  >
<td>
NUM. SERVICIO
</td>
<td>
ESTADO
</td>
<td>
FECHA_REG
</td>
<td>
HORA_REG
</td>
<td>
OBSERVACION
</td>
<td>
DETALLE
</td>
<td>
USUARIO
</td>
</tr>
</thead>
<tbody id="auditoriabody">
</tbody>
</table>
 <div   style="display:flex;justify-content:flex-end;">
 <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cerrar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));

  document.body.style.cursor = 'progress'

  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT * FROM t_cm_audi_estado WHERE cod_ate = " + filacurrent + " ORDER BY audi_orden ASC, fec_reg_audi ASC, hor_reg_audi asc "
    })
  }).then(response => {
    return response.json();
  }).then(data => {

    document.body.style.cursor = 'default'
    var html = '';
    var i;
    if (data.length == 0) {
      alert('No se encontro registros...');
    }
    for (i = 0; i < data.length; i++) {


      html += '<tr> ' +
        '<td style = "text-align: center;  border: 1px solid black; " >' + data[i].cod_ate + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].cm_estado + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].fec_reg_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].hor_reg_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].obs_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].cambio_audi + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].usu_reg_audi + '</td>' +


        '</tr>';
    }

    document.getElementById('auditoriabody').innerHTML = html;
     document.getElementById('ed-modal-content').style.maxWidth = "none";


  }).catch(error => {
    alert("Error ");
    console.log(error);
  })

}

 