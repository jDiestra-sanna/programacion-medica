
(function () {

     $('#unidad2').tooltip({'trigger':'focus', 'title': 'Si es precio F I J O  dividir entre 3.35'});


  if (document.getElementById("filtro")) {
   
    document.getElementById("filtro").selectedIndex = "1";

    document.getElementById("fec_inicial").disabled = true;

    document.getElementById("buscar_desde").disabled = true;
    document.getElementById('buscar_desde').addEventListener('click', habilitafechainicial, false);
    document.getElementById('finalizadas').addEventListener('click', habilita_cboestados, false);

    var filtro, estado_ekg, clasificacion_serv, fec_inicial, fec_final, finalizadas, cbo_opcion2, flebotomista, txt_PacDrAseg, cbo_estado, cbo_clasif, cbo_tipo, cbo_programa, Txt_cod_prueba, cbo_estados, dni, atencion;


    $('#pagination').on('click', 'a', function (e) {
      e.preventDefault();
      var pageno = $(this).attr('data-ci-pagination-page');
      loadPagination(pageno);
    });


    $('#busqueda').click(function () {
      filtro = document.getElementById('filtro').value;
      estado_ekg = document.getElementById('estado_ekg').value;
      clasificacion_serv = (filtro == '12') ? document.getElementById('clasificacion_serv').options[document.getElementById('clasificacion_serv').selectedIndex].text : '';
      fec_inicial = document.getElementById('fec_inicial').disabled ? null : document.getElementById('fec_inicial').value;
      fec_final = document.getElementById('fec_final').value;
      finalizadas = document.getElementById('finalizadas').checked;
      cbo_opcion2 = document.getElementById('cbo_opcion2').value;
      flebotomista = document.getElementById('flebotomista').value;
      txt_PacDrAseg = (document.getElementById('txt_PacDrAseg').value).toUpperCase();
      cbo_estado = document.getElementById('cbo_estado').value;
      cbo_clasif = document.getElementById('cbo_clasif').value;
      cbo_tipo = document.getElementById('cbo_tipo').value;
      cbo_programa = document.getElementById('cbo_programa').value;
      Txt_cod_prueba = document.getElementById('Txt_cod_prueba').value;
      cbo_estados = document.getElementById('cbo_estados').value;
      dni = document.getElementById('dni').value;
      atencion = document.getElementById('atencion').value;

      if (document.getElementById("dni").validity.tooShort) {
        document.getElementById("dni").setCustomValidity("DNI invalido.");
        document.getElementById("dni").reportValidity();
        return;
      }

      $('#t02').html("");
      $('#pagination').html("");
      $('#cant').html("");
      document.body.style.cursor = "progress";
      //data: "{\"codEspecialidades\":"+JSON.stringify(especialidades) +",\"estado\":"+ JSON.stringify($("#estado").val())   +",\"turno\":"+  JSON.stringify($("#turno").val())  +",\"clasif\":"+ JSON.stringify( $("#clasif").val())   +",\"fec_inicial\":"+  JSON.stringify($("#fec_inicial").val() )  +",\"fec_final\":"+ JSON.stringify($("#fec_final").val()) +",\"nom_doc\":"+ JSON.stringify($('#nom_doc').val().trim())  +"}" ,
      fetch('/gestionlaboratorio/busquedaHorario/' + '0', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filtro: filtro,
          estado_ekg: estado_ekg,
          clasificacion_serv: clasificacion_serv,
          fec_inicial: fec_inicial,
          fec_final: fec_final,
          finalizadas: finalizadas,
          cbo_opcion2: cbo_opcion2,
          flebotomista: flebotomista,
          txt_PacDrAseg: txt_PacDrAseg,
          cbo_estado: cbo_estado,
          cbo_clasif: cbo_clasif,
          cbo_tipo: cbo_tipo,
          cbo_programa: cbo_programa,
          Txt_cod_prueba: Txt_cod_prueba,
          cbo_estados: cbo_estados,
          dni: dni,
          atencion: atencion


        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '';
          var i;
          
          if (data.result.length == 0) {
            alert('No hay registros');
          } else {
            fetch('/modulo/permite_ingreso', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                codigo: 94
                })

            }).then(response => response.json())
              .then(function (data1) {
                
                if (data1 && filtro == '12') {
                  document.getElementById('Cmd_expEKG').style.display = "block";
                  document.getElementById('Cmd_expEKG').dataset.cond = data.ls_SQLCond
                }

              }).catch(error => {
                console.log(error);
              });
          }
          for (i = 0; i < data.result.length; i++) {


            html += '<tr ' + ' id="' + data.result[i].cod_serv_laboratorio + '" ondblclick="abrir_detalle('+data.result[i].estado+');"    onclick="filaSelected(this);">' +
              '<td onclick="event.stopPropagation(); "> <input id=' + i + ' type="checkbox" name="d"   value=""></td>' +
              '<td >' + data.result[i].estado + '</td>' +
              '<td>' + data.result[i].tipo + '</td>' +
              '<td>' + (data.result[i].clasificacion ? data.result[i].clasificacion : '') + '</td>' +
              '<td>' + data.result[i].cod_serv_laboratorio + '</td>' +
              '<td>' + data.result[i].cod_ate + '</td>' +
              '<td>' + data.result[i].nom_clasif + '</td>' +
              '<td>' + (data.result[i].nom_pac ? data.result[i].nom_pac : '') + '</td>' +
              '<td>' + data.result[i].des_dis + '</td>' +
              '<td>' + data.result[i].fecha_creacion + '</td>' +
              '<td>' + data.result[i].hora_creacion + '</td>' +
              '<td>' + data.result[i].fecha_servicio + '</td>' +
              '<td>' + (data.result[i].fecha_maxima ? data.result[i].fecha_maxima : '') + '</td>' +
              '<td>' + (data.result[i].fecha_coordinada ? data.result[i].fecha_coordinada : '') + '</td>' +
              '<td>' + (data.result[i].hora_coordinada ? data.result[i].hora_coordinada : '') + '</td>' +
              '<td style ="display:none">' + data.result[i].cod_servicios + '</td>' +
              '<td style ="display:none">' + data.result[i].tipo_operacion_precisa + '</td>' +
              '<td style ="display:none">' + data.result[i].num_doc_id + '</td>' +

              '</tr>';
          }
          $('#pagination').html(data.pagination);

          $('#t02').html(html);
          $('#cant').html(data.length);
          document.body.style.cursor = "default";
        }).catch(error => {
          console.log(error);
          document.body.style.cursor = "default";

        });


    });

    function loadPagination(pagno) {
      fetch('/gestionlaboratorio/busquedaHorario/' + pagno, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filtro: filtro,
          estado_ekg: estado_ekg,
          clasificacion_serv: clasificacion_serv,
          fec_inicial: fec_inicial,
          fec_final: fec_final,
          finalizadas: finalizadas,
          cbo_opcion2: cbo_opcion2,
          flebotomista: flebotomista,
          txt_PacDrAseg: txt_PacDrAseg,
          cbo_estado: cbo_estado,
          cbo_clasif: cbo_clasif,
          cbo_tipo: cbo_tipo,
          cbo_programa: cbo_programa,
          Txt_cod_prueba: Txt_cod_prueba,
          cbo_estados: cbo_estados,
          dni: dni,
          atencion: atencion

        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '';
          var i;
          for (i = 0; i < data.result.length; i++) {


            html += '<tr ' + ' style ="cursor: pointer;" id="' + data.result[i].cod_serv_laboratorio + '" ondblclick="abrir_detalle('+data.result[i].estado+');" onclick="filaSelected(this);">' +
              '<td onclick="event.stopPropagation(); "> <input id=' + i + ' type="checkbox" name="d"   value=""></td>' +
              '<td >' + data.result[i].estado + '</td>' +
              '<td>' + data.result[i].tipo + '</td>' +
              '<td>' + data.result[i].clasificacion + '</td>' +
              '<td>' + data.result[i].cod_serv_laboratorio + '</td>' +
              '<td>' + data.result[i].cod_ate + '</td>' +
              '<td>' + data.result[i].nom_clasif + '</td>' +
              '<td>' + data.result[i].nom_pac + '</td>' +
              '<td>' + data.result[i].des_dis + '</td>' +
              '<td>' + data.result[i].fecha_creacion + '</td>' +
              '<td>' + data.result[i].hora_creacion + '</td>' +
              '<td>' + data.result[i].fecha_servicio + '</td>' +
              '<td>' + (data.result[i].fecha_maxima ? data.result[i].fecha_maxima : '') + '</td>' +
              '<td>' + (data.result[i].fecha_coordinada ? data.result[i].fecha_coordinada : '') + '</td>' +
              '<td>' + (data.result[i].hora_coordinada ? data.result[i].hora_coordinada : '') + '</td>' +
              '<td style ="display:none">' + data.result[i].cod_servicios + '</td>' +
              '<td style ="display:none">' + data.result[i].tipo_operacion_precisa + '</td>' +
              '<td style ="display:none">' + data.result[i].num_doc_id + '</td>' +

              '</tr>';
          }
          $('#pagination').html(data.pagination);

          $('#t02').html(html);
          $('#cant').html(data.length);

        }).catch(error => {
          console.log(error);
        });

    }

  }
})();
function abrir_detalle(val){
  if(val==0){
      Cmd_AsigProveedor_Click();
  }
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


window.optasoc;
window.modalasoc_servicio = function(el) {
  /* if(el.cells[16].innerHTML.trim()=='Registrado'){
   return;
  } */
  //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> Asociacion de Servicio</h4><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>

 
 <input type="radio" id="OptAsoConAte" name="optasoc" value="OptAsoConAte"><label for="OptAsoConAte">Asociar con Atención</label><br> 
 <input type="radio" id="Opt_AsoAmb" name="optasoc" value="Opt_AsoAmb"><label for="Opt_AsoAmb">Asociar con Ambulancia</label><br> 
 <input type="radio" id="OptSinAso" name="optasoc" value="OptSinAso"><label for="OptSinAso">Sin Asociación</label><br> 
 
 
<div   style="display:flex;justify-content:space-around	;">
<input type="button"  class="btn btn btn-success btn-sm "  id="btn_aceptar" name="btn_aceptar" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cancelar"> 
</div>
`);
  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);

  ed_modal_content.style.maxWidth = "300px";
  document.getElementsByName('optasoc')[0].checked = true;
  document.getElementById("btn_aceptar").addEventListener('click', function () {

    optasoc = document.querySelector('input[name="optasoc"]:checked').value;

    document.getElementById("cancelaroptasoc").click();
    if (optasoc == 'OptSinAso') {
      ANvienede = "FRMLABOSINATE"
      modalFrm_LAB_busquedapac_sinaso();
    } else {
      ANvienede = "FRMLABOCONATE"
      modalFrm_LAB_busquedapac();
    }


  }, false);

}

var   myWindowFrm_Seguimiento;

window.modalseguimiento = function() {

  var fila = document.querySelector('.selected');
  if (!fila) return;
  var cod_serv_laboratorio = fila.cells[4].innerHTML.trim();
  //Pvienede = "FRMSERVICIOLABORATORIO"

  if(myWindowFrm_Seguimiento!==undefined) {

    myWindowFrm_Seguimiento.document.body.innerHTML="";

  }

  myWindowFrm_Seguimiento = window.open("", "myWindowFrm_Seguimiento", "toolbar=no,menubar=no,top=500,left=500,width=40%,height=400");
  myWindowFrm_Seguimiento.document.body.innerHTML="";
  myWindowFrm_Seguimiento.document.write(` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" /> 
<head>

<link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2-laboratorio.min.css" rel="stylesheet">
<style>
.ed-modal-container {
  background: rgba(0,0,0,0.8);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-y: scroll;
}  


.ed-modal-content {
   border-radius: 5px ;
  background: #fff;
  --width: 90%;
  --height: 95vh;
   max-width: 600px;
   padding: 2px;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);

}
fieldset {
  position: relative;
  border:1px solid black;
}
  legend {
    font-size: 1em;
    font-weight: bold;
    width:auto;
  }
  

</style>
</head>
<body>
<div   style="display:flex; flex-direction: column; height:100%">
<div   style="display:flex; flex-direction: row;" width:20vh >
       
      <fieldset style="display:flex;justify-content:content-around	;"  >
      <legend>Buscar</legend>
        <div>
        <input type="hidden" id="txtCodServSeg" name = "txtCodServSeg" >
        <input type="text" id="txtCodServ" name = "txtCodServ" style="color:red;font-weight:bold"; readonly value="${cod_serv_laboratorio}"><br>
        <input type="button"  class="btn btn btn-success btn-sm "  id="CmdBuscar" name="CmdBuscar" value="Buscar" onclick="cmdBuscar_Click();"> 
        </div>
        <div>
        <input type="radio" id="optAtencion" name="Opciones" value="optAtencion">
        <label for="optAtencion">Atencion</label><br>
        <input type="radio" id="optPedido" name="Opciones" value="optPedido">
        <label for="optPedido">Pedido</label><br>
        <input type="radio" id="optLaboratorio" name="Opciones" value="optLaboratorio">
        <label for="optLaboratorio">Laboratorio</label><br>
        <input type="radio" id="optAmbulancia" name="Opciones" value="optAmbulancia">
        <label for="optAmbulancia">Ambulancia</label>
        </div>
        </fieldset>
         
      
      <fieldset  style="display:flex;justify-content:content-around	;"   >
      <legend>Seguimiento del servicio</legend>
      <div>
      <input type="radio" id="opt_incidencia" name="opt_seguimiento" value="opt_incidencia">
      <label for="opt_incidencia">Incidencia</label><br>
      <input type="radio" id="optAte" name="opt_seguimiento" value="optAte">
      <label for="optAte">Call Center</label><br>
      <input type="radio" id="optPed" name="opt_seguimiento" value="optPed">
      <label for="optPed">Pedido</label><br>
      <input type="radio" id="optLab" name="opt_seguimiento" value="optLab">
      <label for="optLab">Laboratorios</label><br>
      <input type="radio" id="optAmb" name="opt_seguimiento" value="optAmb">
      <label for="optAmb">Ambulancias</label><br>
      </div>
      <div>
      <input type="radio" id="optAdm" name="opt_seguimiento" value="optAdm">
      <label for="optAdm">Administracion</label><br>
      <input type="radio" id="optAf" name="opt_seguimiento" value="optAf">
      <label for="optAf">Aud. Fichas</label><br>
      <input type="radio" id="optAudMed" name="opt_seguimiento" value="optAudMed">
      <label for="optAudMed">Aud.Medica</label><br>
      <input type="radio" id="optPreServ" name="opt_seguimiento" value="optPreServ">
      <label for="optPreServ">Pre-Servicio</label><br>
      <input type="radio" id="opt_PostServ" name="opt_seguimiento" value="opt_PostServ">
      <label for="opt_PostServ">Post-Servicio</label><br>
      </div>
      <div>
      <input type="radio" id="optAlm" name="opt_seguimiento" value="optAlm">
      <label for="optAlm">Almacen</label><br>
      <input type="radio" id="opt_Cent_adv" name="opt_seguimiento" value="opt_Cent_adv">
       <label for="opt_Cent_adv">Adversos/Centinela</label><br>
      <input type="radio" id="opt_DrOnline" name="opt_seguimiento" value="opt_DrOnline">
      <label for="opt_DrOnline">Doctor Online</label> 
      </div>
      </fieldset>
     
    
</div>
<div   style="display:flex; flex-direction: column;" width:20vh >
    <div>
      <input type="checkbox" id="Chck_obs" onchange="cambio_obs();" value="obs"> <label for="Chck_obs">Observaciones</label>
      <input type="radio" disabled id="opt_registros"  onclick="S_MOSTRAR_REGISTRO_SNC('REGISTRO' );" name="opt_observaciones" value="opt_registros">
      <label for="opt_registros">Registros</label>
      <input type="radio" disabled id="opt_snc"  onclick="S_MOSTRAR_REGISTRO_SNC('SNC' );" name="opt_observaciones" value="opt_snc">
      <label for="opt_snc">SNC</label><br>
    </div>
    <div style="display:flex;justify-content:space-evenly	;">
      <label >Descripcion: </label>
      <select  style="flex-grow:1;" id="DBDes_snc" name="DBDes_snc"  > 
      </select>
    </div>
</div>
<div   style="display:flex;align-items: center;" width:20vh >
    <textarea id="txt_obs" name="txt_obs" cols = "90" rows="4" ></textarea>
    <input type="button"  class="btn btn btn-success btn-sm " onclick="cmdGrabar_Click();" id="CmdGrabar" name="CmdGrabar" value="Guardar"> 

</div>

<div  style = "height:50vh;  border: 1px solid blue; overflow-y:scroll;">
<table id="table_seguimiento" border=1>
<thead  id="table_seguimiento_thead" style="color: white;background:#084d6e; ">
    <tr>
      <th>TIPO</th>
      <th>SNC</th>
      <th>OBSERVACIONES</th>
      <th>USUARIO</th>
      <th style="white-space: nowrap;">FECHA</th>
      <th>HORA</th>
    </tr>
</thead>
<tbody style="white-space:nowrap" id="t_seguimiento"></tbody>
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
 <script src="${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/show_seguimiento.js?${Date.now()}">
 var Pvienede = "FRMSERVICIOLABORATORIO";
 </script>`);
  if (myWindowFrm_Seguimiento.document) {
    myWindowFrm_Seguimiento.document.title = "Seguimiento de Servicios";
  }
  myWindowFrm_Seguimiento.addEventListener("resize", function () {
    

    myWindowFrm_Seguimiento.resizeTo(800, 900);
  });
  //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
  myWindowFrm_Seguimiento.focus();
  myWindowFrm_Seguimiento.document.getElementById('optLaboratorio').checked = true;


}



window.modalcambioproveedorlaboratorio = function(el) {


  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> CAMBIO PROVEEDOR LABORATORIO </h4><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
   <div   style="display:flex; flex-direction: column; height:100%">
 <div  style="align-self:center;flex-grow:0.6"><div style="display:flex;height:100%;align-items: center;"> <label>Proveedor Laboratorio</label>
<select id="proveedorlaboratorio" name="proveedorlaboratorio"></select>  </div></div>
<div   style="display:flex;justify-content:space-around	;">

<input type="button"  class="btn btn btn-success btn-sm "  id="btn_cambiarproveedorlaboratorio" name="btn_cambiarproveedorlaboratorio" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cancelar"> 
</div>
</div>

`);
  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);

  ed_modal_content.style.maxWidth = "40vw";
  ed_modal_content.style.height = "20vh";

  document.getElementById("btn_cambiarproveedorlaboratorio").addEventListener('click', function () {
    var r = confirm("Seguro de cambiar el laboratorio?");
    if (r == true) {

    } else {
      return;
    }
    (async () => {
      try {
        let alls = await Promise.all([
          fetch(`/gestionlaboratorio/actualizarproveedorlaboratorio`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              codlaboratorio: document.getElementById('proveedorlaboratorio').value,
              cod_serv_laboratorio: el
            })
          }),
        ]);
        let response2_json = await alls[0].json();

       
        if (response2_json) {
          alert('actualizado');
        }
      }
      catch (Error) {
        console.error(Error);
      }

    })()

  }, false);

  (async () => {
    try {
      let alls = await Promise.all([
        fetch(`/gestionlaboratorio/get_proveedores_laboratorio`),
        //  fetch(`/programacion/get_botiquinxespecialidad/${cod_esp}`) 


      ]);
      let response2_json = await alls[0].json();

      document.getElementById('proveedorlaboratorio').innerHTML = listOfNamesProvLaboratorio(response2_json);

    }
    catch (Error) {
      console.error(Error);
    }

  })()



}
window.listOfNamesProvLaboratorio = function(people) {
  const names = people.map(person => `<option value="${person.id_proveedor}">${person.proveedor}</option>`).join("\n");
  return `${names}`
}
window.listOfNamesFlebotomistas = function(people) {
  const names = people.map(person => `<option value="${person.cod_flebotomista}">${person.nom_flebotomista}</option>`).join("\n");
  return `${names}`
}
window.listOfNamesProvremisse = function(people) {
  const names = people.map(person => `<option value="${person.cod_prov_motorizado}">${person.descripcion}</option>`).join("\n");
  return `${names}`
}
window.listOfNamesconductores = function(people) {
  const names = people.map(person => `<option value="${person.cod_mot}">${person.nom_mot}</option>`).join("\n");
  return `${names}`
}

window.modalcambioproveedorflebotomista = function(el) {


  printModal(`
  <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> CAMBIO PROVEEDOR FLEBOTOMISTA </h4><button type="button"  id="cancelarprovflebotomista" class="cancelarmodal btn-xs btn-danger">X</button></div>
  <div   style="display:flex; flex-direction: column; height:100%">
<div  style="align-self:center;flex-grow:0.3"><div style="display:flex;height:100%;align-items: flex-start;flex-direction: column;"><div> <label>Proveedor Laboratorio</label>
<select id="proveedorlaboratorio" name="proveedorlaboratorio" onChange='cambioproveedorflebotomista2(this);'></select></div><div><label>Flebotomista</label>
<select  id="cambioflebotomista" > </div>
    <option value="0">NINGUNO</option>  
</select>    </div></div>
<div   style="display:flex;justify-content:space-around	;">

<input type="button"  class="btn btn btn-success btn-sm "  id="btn_cambiarproveedorlaboratorio" name="btn_cambiarproveedorlaboratorio" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cancelar"> 
</div>
</div>

`);
  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);

  ed_modal_content.style.maxWidth = "40vw";
  ed_modal_content.style.height = "25vh";

  document.getElementById("btn_cambiarproveedorlaboratorio").addEventListener('click', function () {
    var r = confirm("Seguro de cambiar el flebotomista?");
    if (r == true) {

    } else {
      return;
    }
    (async () => {
      try {
        let alls = await Promise.all([
          fetch(`/gestionlaboratorio/actualizarproveedorlaboratorio_flebotomista`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              codlaboratorio: document.getElementById('proveedorlaboratorio').value,
              codflebotomista: document.getElementById('cambioflebotomista').value.trim(),
              nomflebotomista: document.getElementById('cambioflebotomista').options[document.getElementById('cambioflebotomista').selectedIndex].text,
              cod_serv_laboratorio: el
            })
          }),
        ]);
        let response2_json = await alls[0].json();

        
        if (response2_json) {
          alert('actualizado');
        }
      }
      catch (Error) {
        console.error(Error);
      }

    })()

  }, false);

  (async () => {
    try {
      let alls = await Promise.all([
        fetch(`/gestionlaboratorio/get_proveedores_laboratorio`)



      ]);
      let response2_json = await alls[0].json();
      document.getElementById('proveedorlaboratorio').innerHTML = listOfNamesProvLaboratorio(response2_json);

      let response3 = await fetch(`/gestionlaboratorio/get_flebotomistasxproveedor`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          proveedorflebotomista: document.getElementById('proveedorlaboratorio').value
        })
      });
      let response3_json = await response3.json();
      document.getElementById('cambioflebotomista').innerHTML = listOfNamesFlebotomistas(response3_json);

    }
    catch (Error) {
      console.error(Error);
    }

  })()



}

window.modalcambioproveedorremisse = function(el) {


  printModal(`
  <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> CAMBIO PROVEEDOR REMISSE </h4><button type="button"  id="cancelarprovremisse" class="cancelarmodal btn-xs btn-danger">X</button></div>
  <div   style="display:flex; flex-direction: column; height:100%">
<div  style="align-self:center;flex-grow:0.3"><div style="display:flex;height:100%;align-items: flex-start;flex-direction: column;"><div> <label>Proveedor Remisse</label>
<select id="proveedorremisse" name="proveedorremisse" onChange='cambioproveedorremisse(this);'></select></div><div><label>Conductor</label>
<select  id="conductor" > </div>
    <option value="0">NINGUNO</option>  
</select>    </div></div>
<div   style="display:flex;justify-content:space-around	;">

<input type="button"  class="btn btn btn-success btn-sm "  id="btn_cambiarproveedorremisse" name="btn_cambiarproveedorremisse" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cancelar"> 
</div>
</div>

`);
  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);

  ed_modal_content.style.maxWidth = "40vw";
  ed_modal_content.style.height = "25vh";

  document.getElementById("btn_cambiarproveedorremisse").addEventListener('click', function () {
    var r = confirm("Seguro de cambiar el conductor?");
    if (r == true) {

    } else {
      return;
    }
    (async () => {
      try {
        let alls = await Promise.all([
          fetch(`/gestionlaboratorio/actualizarproveedorremisse`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              codmot: document.getElementById('conductor').value.trim(),
              cod_serv_laboratorio: el
            })
          }),
        ]);
        let response2_json = await alls[0].json();
 
        if (response2_json) {
          alert('actualizado');
        }
      }
      catch (Error) {
        console.error(Error);
      }

    })()

  }, false);

  (async () => {
    try {
      let alls = await Promise.all([
        fetch(`/gestionlaboratorio/get_proveedores_remisse`)



      ]);
      let response2_json = await alls[0].json();
      document.getElementById('proveedorremisse').innerHTML = listOfNamesProvremisse(response2_json);

      let response3 = await fetch(`/gestionlaboratorio/get_conductoresxremisse`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          proveedorconductor: document.getElementById('proveedorremisse').value
        })
      });
      let response3_json = await response3.json();
      document.getElementById('conductor').innerHTML = listOfNamesconductores(response3_json);

    }
    catch (Error) {
      console.error(Error);
    }

  })()



}
window.buscarpaciente  = async function() {

  var json;
  var opcion = document.getElementsByName('OptCoAtePac');
  $('#atencionesbody').html('');
  if (opcion[0].checked) {
    var Txt_Busq_Cod_Ate = document.getElementById('Txt_Busq_Cod_Ate').value.trim().length;
    if (Txt_Busq_Cod_Ate <= 1) {
      return;
    } else if (Txt_Busq_Cod_Ate < 4) {
      alert("DEBE PONER AL MENOS 4 PRIMEROS NUMEROS DEL CODIGO DE ATENCION PARA PODER EJECUTAR LA BUSQUEDA!");
      return;
    } else {
      const response = await fetch('/gestionlaboratorio/busquedapacienteOptCoAte/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Txt_Busq_Cod_Ate: document.getElementById('Txt_Busq_Cod_Ate').value.trim()
        })
      });
      json = await response.json();

    }

  } else if (opcion[1].checked) {
    var Txt_Busq_Pac = document.getElementById('Txt_Busq_Pac').value.trim().length;

    if (Txt_Busq_Pac <= 1) {
      return;
    } else if (Txt_Busq_Pac < 2) {
      alert("DEBE PONER AL MENOS 2 PRIMERAS LETRAS DEL NOMBRE PARA PODER EJECUTAR LA BUSQUEDA!");
      return;
    } else {
      const response = await fetch('/gestionlaboratorio/busquedapacienteOptPac/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Txt_Busq_Pac: document.getElementById('Txt_Busq_Pac').value.trim()
        })
      });
      json = await response.json();
    }


  }

  try {
    const data = await json;
    var html = '';
    var i;
    
    for (i = 0; i < data.length; i++) {
      html += '<tr ' + '  id ="' + data[i].cod_ate + ` " onclick="filaSelectedbuscarpaciente(this,'atenciones');"   >` +
        '<td >' + data[i].cod_ate + '</td>' +
        '<td >' + data[i].nom_pac + '</td>' +
        '<td>' + data[i].fec_ate + '</td>' +
        '<td>' + (data[i].nom_doc === null ? '' : data[i].nom_doc) + '</td>' +
        '<td>' + data[i].nom_clasif + '</td>' +
        '<td>' + (data[i].nom_subclasif === null ? '' : data[i].nom_subclasif) + '</td>' +
        '<td  style="display:none">' + data[i].nom_emp + '</td>' +

        '</tr>';
    }
    $('#atencionesbody').html(html);
    if (html != '') {
      document.getElementById('atencionesbody').rows[0].click();
      fetch('/gestionlaboratorio/busquedaliquidado/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_ate: data[0].cod_ate
        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '';
          if (data.length != 0) {
            if (data[0].estado_exp != "A") {
              if (data[0].estado_exp == "D") {
                alert("- El expediente de la atencion asociada se encuentra en estado liquidado, comunicarse con liquidaciones");
              } else if (data[0].estado_exp = "E") {
                alert("- El expediente de la atencion asociada se encuentra en estado Facturado, comunicarse con facturación");
              }
              document.getElementById('Cmd_seleccionar').disabled = true;
            } else {
              document.getElementById('Cmd_seleccionar').disabled = false;
            }
          } else {
            document.getElementById('Cmd_seleccionar').disabled = false;
          }
        }).catch(error => {
          console.log(error);
        });
    }

  } catch (error) {
    console.log(error);
  }
}


window.buscarpacientesinasoc  = function() {

  var txtBucNoPac = document.getElementById('TxtBucNoPac').value;


  $('#titularesbody').html("");

  fetch('/gestionlaboratorio/busquedapacientesinasoc/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      TxtBucNoPac: txtBucNoPac

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '';
      var i;
     
      for (i = 0; i < data.length; i++) {


        html += '<tr ' + '  id ="' + data[i].cod_hia + ` " onclick="filaSelectedbuscarpaciente(this,'titulares');"   >` +
          '<td >' + data[i].cod_hia + '</td>' +
          '<td>' + data[i].nom_pac + '</td>' +
          '<td>' + data[i].nom_emp + '</td>'

        '</tr>';
      }

      $('#titularesbody').html(html);
      if (html != '') {
        document.getElementById('titularesbody').rows[0].click();
      }

    }).catch(error => {
      console.log(error);
    });
}
//var f;

window.modalFrm_LAB_busquedapac_sinaso = function() {
  //alert(opt);
  /* if(el.cells[16].innerHTML.trim()=='Registrado'){
   return;
  } */
  //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>

  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> Busqueda de Pacientes</h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>

  
   <fieldset  id="buscar_paciente" style ="border:1px solid">
   <legend style ="width:auto" >Buscar Paciente</legend>
   <label>Paciente : </label><input id="TxtBucNoPac" style="text-transform: uppercase;" name = "TxtBucNoPac" type='text' size = 70% ></input>
   <button class="btn btn-info " type="button" onclick="buscarpacientesinasoc();"><i class="fas fa-search"></i> Buscar</button>
   <button class="btn btn-info " type="button" onclick="agregarpaciente();"><i class="fas fa-plus"></i> Agregar</button>

   </fieldset> 
   <div style="display: block; border: 1px solid green; height: 35vh; overflow-y: scroll">
   <table  id="titulares" style = "border:1px solid green;">
   <caption style = "background-color:#00aae4;color:white;border-style: solid #00aae4;caption-side:top;  padding: 0;   text-align: center;">TITULARES</caption>
   <thead   id = "titulareshead">
   <tr >
           <th scope="col">Codigo</th>
           <th scope="col">Nombre</th>
           <th scope="col">Empresa</th>
   </tr>
   </thead>
   <tbody  id="titularesbody"   >
 
   </tbody>
   <tfoot>    </tfoot>
</table> 
</div>
<div style="display: block; border: 1px solid green; height: 25vh; overflow-y: scroll">
<table  id="direcciones" >
<caption style = "background-color:#00aae4;color:white;border-style: solid #00aae4;caption-side:top;  padding: 0;   text-align: center;">DIRECCIONES</caption>
<thead   id = "direccioneshead">
<tr >
        <th scope="col">Dirección</th>
        <th scope="col">Distrito</th>
        <th scope="col">Referencias</th>
        <th scope="col">Teléfono</th>
</tr>
</thead>
<tbody  id="direccionesbody">
 
</tbody>
<tfoot>    </tfoot>
</table>
</div>
<div style=" text-align: right;">
<button class="btn btn-info " type="button" onclick="agregarpaciente();"><i class="fas fa-tasks"></i> Gestionar Direccion</button>
</div>
<fieldset  id="datos_paciente" style ="border:1px solid">
<legend style ="width:auto" >Datos del Paciente</legend>
<label style="width:10%">Paciente : </label><input id="txtpaciente"  disabled name = "txtpaciente" type='text'  style="width:90%" ></input><br>
<label style="width:10%">Dirección : </label><input id="txtdireccion" disabled  name = "txtdireccion" type='text'  style="width:90%" ></input>

</fieldset> 
<br>
<div   style="display:flex;justify-content:flex-end	;">
<input type="button"  class="btn btn btn-success " disabled id="Cmd_seleccionar" name="Cmd_seleccionar" value="Seleccionar">  &nbsp;
<input type="button"  class="btn btn btn-danger cancelarmodal"  id="Cmd_salir" name="Cmd_salir" value="Salir"> 
</div>
`);

  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);
  ed_modal_content.style.maxWidth = "1000px";
  document.getElementById("Cmd_seleccionar").addEventListener('click', function () {


  }, false);

}


window.gettipobusqueda  = function(val) {
  if (val == 'OptCoAte') {
    document.getElementById('Txt_Busq_Cod_Ate').disabled = false;
    document.getElementById('Txt_Busq_Pac').disabled = true;

  } else if (val == 'OptPac') {
    document.getElementById('Txt_Busq_Cod_Ate').disabled = true;
    document.getElementById('Txt_Busq_Pac').disabled = false;
  }
}

function modalFrm_Regedit_dir_pac(cod_tit) {
  printModal(`
  <div id="ed-modal-contentheaderdireccion"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> Registrar/editar direccion </h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>

  
  <div style="display: block; border: 1px solid green; height: 35vh; overflow-y: scroll">
  <div></div>
  <table  id="atenciones" style = "border:1px solid green;">
   <thead  style="background:#00aae4;" id = "direccioneshead">
  <tr >
          <th scope="col">DIRECCION</th>
          <th scope="col">DISTRITO</th>
          <th scope="col">REFERENCIA</th>
          <th scope="col">TLF_MOVIL</th>
          <th scope="col">TLF_CASA</th>
  </tr>
  </thead>
  <tbody  id="direccionesbody"   >

  </tbody>
  <tfoot></tfoot>
</table> 
</div>

 <div style="display:flex;">
 <div style="flex-grow: 12">
 <label style="width:15%">Dirección: </label><input id="Txt_Direccion"  disabled name = "Txt_Direccion" type='text'  style="width:45%" ></input><label style="width:15%">Distrito: </label><select id="Dcbo_distrito"  disabled name = "Dcbo_distrito"  style="width:25%" ></select><br>
 <label style="width:15%">Referencia: </label><input id="Txt_Referencia"  disabled name = "Txt_Referencia" type='text'  style="width:85%" ></input><br>
 <label style="width:15%">Tlf. fijo: </label><input id="Txt_tlf_fijo"  disabled name = "Txt_tlf_fijo" placeholder="   -    " type='text'  style="width:20%" ></input><br>           
 <label style="width:15%">Tlf. Movil: </label><input id="Txt_tlf_movil"  disabled name = "Txt_tlf_movil" type='text'  style="width:20%" ></input><br>
 </div>
    <div style="flex-grow: 1;">
    <div style="display:grid;  grid-gap: 1px; ">

    <input type="button"  class="btn btn btn-info" onclick="editar_direccion()"  id="Cmd_editar" name="Cmd_editar" value="Editar"> 
    <input type="button"  class="btn btn btn-info" onclick="nuevo_direccion()" id="Cmd_nuevo" name="Cmd_nuevo" value="Nuevo"> 
    <input type="button"  class="btn btn btn-info" onclick="guardar_direccion()" id="Cmd_guardar" disabled name="Cmd_guardar" value="Guardar"> 
    <input type="button"  class="btn btn btn-info" onclick="cancelar_direccion()" id="Cmd_cancelar" disabled name="Cmd_editar" value="Cancelar"> 
    <input type="button"  class="btn btn btn-info" onclick="Cmd_selecionar_direccion_Click()" id="Cmd_selecionar_direccion" disabled name="Cmd_selecionar_direccion" value="Seleccionar"> 

    </div>

    </div>
 </div>

<div   style="display:flex;justify-content:flex-end	;">
 <input type="button"  class="btn btn btn-danger cancelarmodal"  id="Cmd_salir" name="Cmd_salir" value="Salir"> 
</div>
 `);

  var ed_modal_content = document.getElementById("ed-modal-contentheaderdireccion").parentElement;

  dragElement(ed_modal_content, 'headerdireccion');
  ed_modal_content.style.top = "20vh";

  ed_modal_content.style.maxWidth = "1500px";
  document.getElementById('Txt_tlf_fijo').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/);
    //alert(x[1]);//
    e.target.value = !x[1] ? x[1] : x[1] + (x[2] ? '-' + x[2] : '');
  });
  fetch('/gestionlaboratorio/AData_Distrito', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  }).then(response => response.json())
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {

        var Dcbo_distrito = document.getElementById('Dcbo_distrito');
        var option = document.createElement('option');
        option.value = data[i].cod_dis.trim();
        option.text = data[i].des_dis.trim();
        Dcbo_distrito.appendChild(option);

      }

      fetch('/gestionlaboratorio/Adata_direccion', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_tit: cod_tit
        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '';
          for (var i = 0; i < data.length; i++) {


            html += '<tr  id="' + data[i].cod_dir + '"   onclick="filatabladireccion(this);">' +

              '<td >' + data[i].des_dir.trim() + '</td>' +
              '<td style="display:none">' + data[i].cod_dis.trim() + '</td>' +
              '<td>' + data[i].des_dis + '</td>' +
              '<td>' + data[i].ref_dir.trim() + '</td>' +
              '<td>' + data[i].tlf_celular + '</td>' +
              '<td>' + data[i].tlf_casa + '</td>'

            '</tr>';
          }
          document.getElementById('direccionesbody').innerHTML = html;
          if (data.length != 0) {
            document.getElementById('direccionesbody').rows[0].click();
          }

        }).catch(error => {
          alert(error);
        });
    }).catch(error => {
      alert(error);
    });
}
window.Cmd_selecionar_direccion_Click  = function(){
  var filas = document.querySelectorAll('#direccionesbody>tr');
  var fila_sel;
  filas.forEach(element => {
    if(element.style.backgroundColor == "turquoise"){
      return fila_sel = element; 
    }
  })
document.getElementById('Txt_Coddis').value = fila_sel.cells[1].innerHTML.trim();
document.getElementById('Txt_Cod_Dir').value = fila_sel.id;
document.getElementById('Txt_distrito').value = fila_sel.cells[2].innerHTML.trim();
document.getElementById('Txtdireccion').value = fila_sel.cells[0].innerHTML.trim();
//document.getElementById('Txt_nro_lote').value = fila_sel.cells[0].innerHTML.trim();
//document.getElementById('Txt_dpto_dir').value = fila_sel.cells[0].innerHTML.trim();
//document.getElementById('Txt_urbanizacion').value = fila_sel.cells[0].innerHTML.trim();

document.getElementById('txtref').value = fila_sel.cells[3].innerHTML.trim();
document.getElementById('TxtTlf').value = fila_sel.cells[5].innerHTML.trim();
document.getElementById('Txt_cel').value = fila_sel.cells[4].innerHTML.trim();
document.getElementById('Cmd_salir').click(); 

}
window.nuevo_direccion = function() {
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
window.editar_direccion  = function() {
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
window.cancelar_direccion = function() {
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

window.filatabladireccion = function(p) {
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
  document.getElementById('Cmd_selecionar_direccion').disabled = false;

}

function modalFrm_LAB_busquedapac() {
  //alert(opt);
  /* if(el.cells[16].innerHTML.trim()=='Registrado'){
   return;
  } */
  //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>

  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> Busqueda de Pacientes</h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>

  
   <fieldset  id="buscar_paciente" style ="border:1px solid">
   <legend style ="width:auto" >Buscar Paciente</legend>
   <input type="radio" onchange="gettipobusqueda(value)"  id="OptCoAte" name="OptCoAtePac" value="OptCoAte"><label for="OptCoAte">Cod.Atención</label><input id="Txt_Busq_Cod_Ate"  onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"  style="text-transform: uppercase;" name = "Txt_Busq_Cod_Ate" type='text' size = 10% ></input>
   <br>
   <input type="radio" onchange="gettipobusqueda(value)"  id="OptPac" name="OptCoAtePac" value="OptPac"><label for="OptPac">Paciente&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input disabled id="Txt_Busq_Pac"   style="text-transform: uppercase;" name = "Txt_Busq_Pac" type='text' size = 70% ></input>
   <button class="btn btn-info " type="button" onclick="buscarpaciente();"><i class="fas fa-search"></i> Buscar</button>
   </fieldset> 
   <div style="display: block; border: 1px solid green; height: 35vh; overflow-y: scroll">
   <table  id="atenciones" style = "border:1px solid green;">
   <caption style = "background-color:#00aae4;color:white;border-style: solid #00aae4;caption-side:top;  padding: 0;   text-align: center;">ATENCIONES</caption>
   <thead   id = "atencioneshead">
   <tr >
           <th scope="col">COD_ATE</th>
           <th scope="col">PACIENTE</th>
           <th scope="col">FECHA</th>
           <th scope="col">DOCTOR</th>
           <th scope="col">CLASIFICACION</th>
           <th scope="col">SUBCLASIFICACION</th>

   </tr>
   </thead>
   <tbody  id="atencionesbody"   >
 
   </tbody>
   <tfoot>    </tfoot>
</table> 
</div>
 
 <br>
<label style="width:10%">Atención :</label><input id="Txt_CodAte" disabled  name = "Txt_CodAte" type='text'  style="width:90%" ></input><br>
<label style="width:10%">Seguro : </label><input id="Txt_seguro"  disabled name = "Txt_seguro" type='text'  style="width:90%" ></input>
<label style="width:10%">Paciente : </label><input id="Txt_nompac" disabled  name = "Txt_nompac" type='text'  style="width:90%" ></input>
<br>
<div   style="display:flex;justify-content:flex-end	;">
<input type="button"  class="btn btn btn-success " disabled id="Cmd_seleccionar" name="Cmd_seleccionar" value="Seleccionar" onclick="seleccionarpaciente()">  &nbsp;
<input type="button"  class="btn btn btn-danger cancelarmodal"  id="Cmd_salir" name="Cmd_salir" value="Salir"> 
</div>
<br>
`);

  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);
  document.getElementsByName('OptCoAtePac')[0].checked = true;
  ed_modal_content.style.maxWidth = "1000px";
  document.getElementById("Cmd_seleccionar").addEventListener('click', function () {


  }, false);

}

window.seleccionarpaciente = function() {
  var atenciones = document.getElementById('atencionesbody').rows.length;
  var cod_ate;
  if (atenciones != 0) {
    cod_ate = document.getElementById('atencionesbody').rows[0].cells[0].innerHTML.trim();
    Txt_Clasificacion_Pac = document.getElementById('atencionesbody').rows[0].cells[4].innerHTML.trim();
    Txt_Subclasificacion = document.getElementById('atencionesbody').rows[0].cells[5].innerHTML.trim();

  }
  document.getElementById("Cmd_salir").click();
  Frm_LAB_Servicios(cod_ate, Txt_Clasificacion_Pac, Txt_Subclasificacion);
}

window.Frm_LAB_Servicios = function(a, b, c) {

  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4>Servicios</h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>

 
<input type="radio" id="analisis" name="servicios"   value="analisis"><label for="analisis">Análisis</label><br>
<input type="radio" id="ekg" name="servicios" value="ekg"><label for="ekg">EKG</label><br>
<input type="radio" id="patologia" name="servicios" value="patalogia"><label for="patalogia">Patología</label><br>
 
<div   style="display:flex;justify-content:space-around	;">
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_aceptar" name="btn_aceptar" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cancelar"> 
</div>
`);

  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);
  document.getElementsByName('servicios')[0].checked = true;
  ed_modal_content.style.maxWidth = "200px";

  document.getElementById("btn_aceptar").addEventListener('click', function () {
    optServicio = document.querySelector('input[name="servicios"]:checked').value;
    var Frm_Laboratorio_Txt_CodAte = '', Frm_Laboratorio_Txt_Cod_Dir = '', Frm_Laboratorio_Txt_codservicio = "";

    //Frm_Laboratorio.Txt_CodTit.Text = Trim(Txt_CodTit.Text)
    Frm_Laboratorio_Txt_CodAte = a
    if (a.length > 0) {
      fetch('/gestionlaboratorio/get_codigodireccion', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_ate: a
        })
      }).then(response => response.json())
        .then(function (data) {

          if (data.hasOwnProperty('cod_dir')) {
            Frm_Laboratorio_Txt_Cod_Dir = data.cod_dir;
             
          }
        }).catch(error => {
          alert(error);
        });



    } else {
      // Frm_Laboratorio.Txt_Cod_Dir.Text = Txt_Cod_Dir.Text
    }

    if (optServicio == 'analisis') {
      Frm_Laboratorio_Txt_codservicio = "1"

    } else if (optServicio == 'ekg') {
      Frm_Laboratorio_Txt_codservicio = "3"

    } else if (optServicio == 'patalogia') {
      Frm_Laboratorio_Txt_codservicio = "8"
    }

    document.getElementById("btn_cancelar").click();
    Frm_Laboratorio(Frm_Laboratorio_Txt_CodAte, Frm_Laboratorio_Txt_Cod_Dir, Frm_Laboratorio_Txt_codservicio);
  }, false);

}
window.cambiopago = function() {

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
window.buscarprueba = function(str, cod_servicio) {

  if (str.length == 0) {
    document.getElementById("livesearch").innerHTML = "";
    document.getElementById("livesearch").style.border = "0px";
    return;
  }

  fetch('/gestionlaboratorio/Adata_pruebas', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_servicio: cod_servicio,
      txt_prueba: str
    })
  }).then(response => response.json())
    .then(function (data) {
      if (data.length != 0) {
      
        var sel = document.getElementById('livesearch');
        //sel.style.zIndex = 10;
        sel.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement('div');
          opt.innerHTML = data[i].des_prueba.trim();
          opt.dataset.txt_unidad = data[i].unidad.trim();
          opt.dataset.clasificacion = data[i].clasificacion.trim();
          opt.dataset.cod_pruebas = data[i].cod_pruebas.trim();
          opt.style.cursor = "pointer";
          opt.style.background = "white";
          opt.addEventListener('dblclick', function (event) {

            document.getElementById('Txt_pruebas').value = event.target.textContent;
            document.getElementById('Txt_pruebas').dataset.txt_unidad = event.target.dataset.txt_unidad;
            document.getElementById('Txt_pruebas').dataset.clasificacion = event.target.dataset.clasificacion;
            document.getElementById('Txt_pruebas').dataset.cod_pruebas = event.target.dataset.cod_pruebas;
            document.getElementById("livesearch").innerHTML = "";
            document.getElementById("livesearch").style.border = "0px";
          });
          // opt.style.position = "absolute";
          // opt.style.zIndex = 10;
          sel.appendChild(opt);
        }
        document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
      } else {
        document.getElementById("livesearch").innerHTML = "";
        document.getElementById("livesearch").style.border = "0px";
      }
    }).catch(error => {
      alert(error);
      console.log(error);

    });
}
window.Frm_Laboratorio = function(a, b, c) {

  printModal(`
  <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4>Creacion de Servicio</h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>

<div style="display:grid;grid-template-columns: 1fr 1fr;grid-row: auto auto;grid-column-gap: 20px;grid-row-gap: 20px;">
<div>
  <fieldset  id="datos_paciente" style ="border:1px solid">
  <legend style ="width:auto" >Datos del Paciente</legend>
  <div style="display:grid;grid-template-columns: 1fr 3fr;grid-row: auto auto;">
  <label>Aseguradora</label><input  id="TxtNomEmp" style="text-transform: uppercase;" name = "TxtNomEmp" type='text' ></input>
  <label>Tipo</label> 
  <select style="width:50%;" id="Cbo_Tipo" name="Cbo_Tipo"> 
  <option value="0">INMEDIATA</option>
  <option value="1">PROGRAMADA</option>
  <option value="2">CONGELACIONES</option>
  </select>
  <label>Num. Peticion</label><input   type="text" id="Txt_peticion" name="Txt_peticion">

  <label>Clasificación</label> 
  <select style="width:50%;" id="DC_clasificacion" name="DC_clasificacion"> 
 
  </select> 
  <label>NomPaciente</label><input disabled type="text" id="TxtNomPac" name="TxtNomPac"><input   type="hidden" id="txt_CodAso" name="txt_CodAso"><input   type="hidden" id="Txt_CodTit" name="Txt_CodTit"> <input   type="hidden" id="Txt_codgru" name="Txt_codgru"> 
  <label>Edad</label><input style="width:10%;" disabled type="text" id="Txt_Edad" name="Txt_Edad" > 
  <label>Medico</label><input type="text" disabled id="Txt_Medico" name="Txt_Medico" > 
  <label>Observacion</label><input   type="text" id="Txt_observacion" name="Txt_observacion">
  <input   type="hidden" id="Txt_codclasificacion" name="Txt_codclasificacion">
  <input   type="hidden" id="Txt_Subclasificacion" name="Txt_Subclasificacion">
  <input   type="hidden" id="Txt_Fecate" name="Txt_Fecate">
   
  </div>
   </fieldset>
</div>
<div>
  <fieldset  id="datos_domicilio" style ="border:1px solid">
  <legend style ="width:auto" >Datos del Domicilio</legend>
  <div style="display:grid;grid-template-columns: 1fr 3fr;grid-row: auto auto;">
  <label>Distrito</label><input disabled  type="text" id="Txt_distrito" name="Txt_distrito" ><input  type="hidden" id="Txt_Coddis" name="Txt_Coddis" > 
  <label>Dirección</label><input disabled type="text" id="Txtdireccion" name="Txtdireccion"> <input  type="hidden" id="Txt_Cod_Dir" name="Txt_Cod_Dir" > 
  <label>Referencia</label><input disabled type="text" id="txtref" name="txtref"> 
  <label>Telefono</label><input disabled style="width:50%"  type="text" id="TxtTlf" name="TxtTlf" > 
  <label>Celular</label><input disabled style="width:50%"  type="text" id="Txt_cel" name="Txt_cel" >  
  </div>
  <div style="display:flex;justify-content:flex-end	;">
  <button class="btn btn-info " type="button" onclick="modalFrm_Regedit_dir_pac(document.getElementById('Txt_CodTit').value);"><i class="fas fa-address-card"></i> Editar direccion</button>
  </div>
  </fieldset>
</div>
 <div>
  <fieldset  id="Pruebas" style ="border:1px solid">
  <legend style ="width:auto" >Pruebas</legend>
  <div style="display:grid;grid-template-columns: 1fr 2.3fr auto;grid-row: auto auto;">

  
  <label>Nombre</label>
   <input  type="text" style="text-transform: uppercase;" onkeyup="buscarprueba(this.value,${c})" id="Txt_pruebas" name="Txt_pruebas"  > 
  <button class="btn btn-info " type="button" onclick="agregarpruebacreacion();"><i class="fas fa-plus"></i> Agregar</button>
  <div></div><div style="grid-column:2 / span 2;   position:relative"><div style="position:absolute" id="livesearch"></div></div>   

   </div>
  <div style=" height: 20vh;">
  <table id="pruebas"  border style="border-collapse: collapse;width: 100%;">
  <thead style=" background-color:#00aae4;color:white;">
  <tr  >
  <td>
  CODIGO
  </td>
  <td>
  NOMBRE DE LA PRUEBA
  </td>
  <td>
  PRECIO
  </td>
  <td>
  CLASIF.
  </td>
  </tr>
  </thead>
  <tbody id="pruebasbody">
  </tbody>
  </table>
  </div>
  <div style="display:flex;justify-content:flex-end	;">
  <button class="btn btn-info " type="button" onclick="eliminarprueba(this);"><i class="fas fa-minus"></i> Eliminar</button>
  </div>
  </fieldset>
</div>
 <div>
<fieldset  id="datos_pago" style ="border:1px solid">
<legend style ="width:auto" >Datos del Pago</legend>
<div style="display:grid;grid-template-columns: 1fr 1fr 1fr 1fr 1fr;grid-row: auto auto;">
<label>Coaseguro</label><select style="width:45%;" id="Cbo_Moneda" name="Cbo_Moneda"> 
  <option value="0">S/.</option>
  <option value="1">$</option>
  </select> 
  <input style="width:70%" disabled type="text" id="Txt_ded" name="Txt_ded" ><input  type="hidden" id="Txt_ded_r" name="Txt_ded_r" ><label>Coas (%)</label><input style="width:20%" disabled type="text" id="txt_coa" name="txt_coa" >
<label>Forma Pago</label><select style="width:70%; grid-column: 2 / span 2;" id="Cbo_forma_pago" name="Cbo_forma_pago" onchange = "cambiopago();"> 
</select><input  type="hidden" id="Txt_ded_t" name="Txt_ded_t" >
 <label id = "lbloperador" style="grid-row: 3;display:none">Operador</label><select style="width:70%;grid-row: 3;display:none; grid-column: 2 / span 2" id="TxtNroTar" name="TxtNroTar"> 
  <option value="0">VI</option>
  <option value="1">MC</option>
  <option value="2">DI</option>
  <option value="3">AE</option>
 </select>
 <label id = "lblnumtarjeta" style="grid-row: 4;display:none; " >Num Tarjeta</label><input style="grid-row: 4;grid-column: 2 / span 2;width:70%" maxlength="14" type="hidden" id="ME_tarjeta" name="ME_tarjeta" >
 <label id = "lblfecvenctarjeta" style="grid-row: 5;display:none" >Fec. Venc. Tarj.</label><div style="grid-row: 5"><input style="width:30%" maxlength="2" type="hidden" id="Txt_mes_credito" name="Txt_mes_credito" ><input style="width:50%" maxlength="4" type="hidden" id="Txt_anio_credito" name="Txt_anio_credito" ></div><label id = "mm_aaaa" style="grid-row: 5;display:none" >mm-aaaa</label>  
 <label id = "lblautorizado" style="grid-row: 4;display:none" >Autorizado por</label><input style="width:60%;grid-row:4;"  type="hidden" id="Txt_autorizado" name="Txt_autorizado" > <input style="grid-row: 4;" type="hidden" id="Txt_factor_lab" name="Txt_factor_lab" >  <input style="grid-row: 4;" type="hidden" id="Txt_total" name="Txt_total" >  <input style="grid-row: 4;" type="hidden" id="Txt_total_R" name="Txt_total_R" >  <input style="grid-row: 4;" type="hidden" id="Txt_total_T" name="Txt_total_T" >  
 <label id = "lbldenominacion" style="grid-row: 3;display:none">Denominacion</label><select style="width:45%;grid-row: 3;display:none;" id="Cbo_moneda_den" name="Cbo_moneda_den"> 
 <option value="0">S/.</option>
 <option value="1">$</option>
</select><select style="grid-row: 3;display:none;" id="Cbo_Denominacion" name="Cbo_Denominacion"> 
<option value="0">No Determ.</option>
<option value="1">Exacto</option>
<option value="1">S/. 10</option>
<option value="1">S/. 20</option>
<option value="1">S/. 40</option>
<option value="1">S/. 50</option>
<option value="1">S/. 100</option>
</select>
<table border style="display:none;grid-row: 3;grid-column: 1 /span 5" id="tabletransferencia">
<thead id="theadtransferencia" style="background-color:#00aae4;color:white;">
<tr >
<th>NOMBRE DEL BANCO</th>
<th>CTA.CTE.SOLES</th>
<th>CTA.CTE.DOLARES</th>
</tr>
</thead>
<tbody id="tbodytransferencia">
<tr  style = "height:5vh" onclick="filatransferenciaSelected(this);">
<td>BANCO DE CREDITO</td>
<td>193-1169353-0-45</td>
<td>193-1169024-1-32</td>
</tr>
<tr  style = "height:5vh" onclick="filatransferenciaSelected(this);">
<td></td>
<td></td>
<td></td>
</tr>
<tr  style = "height:5vh" onclick="filatransferenciaSelected(this);">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
</div>
 
</fieldset>
</div>
<div   style="grid-column:1 / span 2;  display:flex;justify-content:flex-end	;">  
<button class="btn btn btn-success btn-md"  id="btn_grabar" onclick="grabarcreacion();" name="btn_grabar"><i class="fas fa-save"></i> Grabar </button> 
<button class="btn btn btn-danger btn-md cancelarmodal"  id="btn_cancelar" name="btn_cancelar"><i class="fas fa-sign-out-alt"></i> Salir </button> 
<input style="width:70%"   type="hidden" id="Txt_cod_serv_laboratorio" name="Txt_cod_serv_laboratorio" >
</div>
`);

  var ed_modal_content = document.getElementById("ed-modal-content");
  dragElement(ed_modal_content);
  document.getElementById('ed-modal-content').style.minWidth = "80vw";
  fetch('/gestionlaboratorio/Adata_clasif', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(function (data) {
      var sel;
      if (data.length != 0) {
         
        sel = document.getElementById('DC_clasificacion');
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement('option');
          opt.innerHTML = data[i].nom_clasif;
          opt.value = data[i].cod_clasif;
          sel.appendChild(opt);
        }
      }
    }).catch(error => {
      alert(error);
      console.log(error);

    });

  if (ANvienede = "FRMLABOCONATE") {
    document.getElementById('TxtNomEmp').disabled = true;
    fetch('/gestionlaboratorio/rs_laboratorio', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Txt_CodAte: a
      })
    }).then(response => response.json())
      .then(function (data) {
        var sel;
        if (data.length != 0) {
          
          document.getElementById('txt_CodAso').value = data[0].cod_aso;
          document.getElementById('TxtNomEmp').value = data[0].nom_gru;
          document.getElementById('Txt_codgru').value = data[0].cod_gru;

          //TxtNomEmp.Tag = Trim(rs_laboratorio!cod_gru)
          document.getElementById('DC_clasificacion').value = data[0].clasificacion_pac;
          document.getElementById('TxtNomPac').value = data[0].nom_pac;

          document.getElementById('Txt_Edad').value = data[0].edad_ate;
          //Txt_Cod_doc.Text = IIf(IsNull(rs_laboratorio!cod_doc), "", rs_laboratorio!cod_doc)
          document.getElementById('Txt_Medico').value = data[0].nom_doc;
          document.getElementById('Txt_CodTit').value = data[0].cod_tit.trim();

          //Txt_codgru.Text = rs_laboratorio!cod_gru
          //Txt_CodTit.Text = rs_laboratorio!cod_tit
          fetch('/gestionlaboratorio/lrs_direccion', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cod_tit: data[0].cod_tit.trim(),
              cod_dir: data[0].cod_dir
            })
          }).then(response => response.json())
            .then(function (data) {
              var sel;
              if (data.length != 0) {
                
                document.getElementById('Txt_Coddis').value = data[0].cod_dis;
                document.getElementById('Txt_Cod_Dir').value = data[0].cod_dir;
                document.getElementById('Txt_distrito').value = data[0].des_dis.trim();
                document.getElementById('Txtdireccion').value = data[0].des_dir.trim();
                document.getElementById('txtref').value = data[0].ref_dir.trim();
                document.getElementById('TxtTlf').value = data[0].tlf_casa === null ? '' : data[0].tlf_casa;
                document.getElementById('Txt_cel').value = data[0].tlf_celular === null ? '' : data[0].tlf_celular;

              }
            }).catch(error => {
              alert(error);
              console.log(error);

            });
          fetch('/gestionlaboratorio/Dolar', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
            .then(function (data) {
              if (data.length != 0) {
                
                lsg_cambio = data[0].Tip_cam;

              }
            }).catch(error => {
              alert(error);
              console.log(error);

            });
          fetch('/gestionlaboratorio/rs_grupofactor', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Txt_codgru: data[0].cod_gru.trim()
            })
          }).then(response => response.json())
            .then(function (data) {
              if (data.length != 0) {
               
                document.getElementById('Txt_factor_lab').value = data[0].factor_lab;

              }
            }).catch(error => {
              alert(error);
              console.log(error);

            });
          document.getElementById('Txt_codclasificacion').value = data[0].clasificacion_pac;
          document.getElementById('Txt_Subclasificacion').value = data[0].cod_subclasif === null ? '' : data[0].cod_subclasif;
          document.getElementById('Txt_Fecate').value = data[0].fec_ate;
          document.getElementById('txt_coa').value = data[0].coaseguro;
        }
      }).catch(error => {
        alert(error);
        console.log(error);

      });


    document.getElementById('DC_clasificacion').disabled = true;

  } else if (ANvienede = "FRMLABOSINATE") {
    fetch('/gestionlaboratorio/rs_laboratorio2', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Txt_codgru: data[0].cod_gru.trim()
      })
    }).then(response => response.json())
      .then(function (data) {
        if (data.length != 0) {
          
          document.getElementById('txt_CodAso').value = 999999;

          if (data[0].cod_gru.trim() != "" || data[0].cod_gru.trim() !== null) {
            l_boolbuscado = True
            document.getElementById('TxtNomEmp').disabled = true;
            //TxtNomEmp.BackColor = &H8000000F
            document.getElementById('TxtNomEmp').value = data[0].nom_emp === null ? '' : data[0].nom_emp;
            document.getElementById('Txt_factor_lab').value = data[0].factor_lab === null ? '' : data[0].factor_lab;
          } else {
            l_boolbuscado = False
            document.getElementById('TxtNomEmp').value = data[0].nom_emp === null ? '' : data[0].nom_emp;
          }
          document.getElementById('TxtNomPac').value = data[0].nom_pac;
          document.getElementById('Txt_Edad').value = data[0].edad_pac;
          document.getElementById('DC_clasificacion').value = data[0].nom_clasif === null ? '' : data[0].nom_clasif;
          document.getElementById('DC_clasificacion').disabled = false;
          //DC_clasificacion.BackColor = &HFFFFFF
          //document.getElementById('Txt_codclasificacion').value = Trim(DC_clasificacion.BoundText);


        }
      }).catch(error => {
        alert(error);
        console.log(error);

      });


  }
  var selCbo_forma_pago = document.getElementById('Cbo_forma_pago');
  var opt0 = document.createElement('option');
  opt0.innerHTML = "";
  opt0.value = 0;
  selCbo_forma_pago.appendChild(opt0);
  var opt1 = document.createElement('option');
  opt1.innerHTML = "EFECTIVO";
  opt1.value = 1;
  selCbo_forma_pago.appendChild(opt1);

  var opt2 = document.createElement('option');
  opt2.innerHTML = "TARJETA";
  opt2.value = 2;
  selCbo_forma_pago.appendChild(opt2);
  var opt3 = document.createElement('option');
  opt3.innerHTML = "TRANSFERENCIA";
  opt3.value = 3;
  selCbo_forma_pago.appendChild(opt3);

  /* 
  If TxtNomEmp.Tag = "002" Then
      Cbo_forma_pago.AddItem ("CREDITO")
  End If */
  document.getElementById("btn_aceptar").addEventListener('click', function () {


  }, false);

}
window.ANvienede, window.lsg_cambio, window.l_boolbuscado;
window.filatablapruebas  = function(p) {
  var table = document.getElementById("pruebasbody");

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";

  }
  p.style.backgroundColor = "yellow";
}

window.agregarpruebacreacion = function() {
  var Txt_pruebas = document.getElementById('Txt_pruebas');
  if (Txt_pruebas.value == '') {
    alert("Debe ingresar un criterio de busqueda");
    document.getElementById('Txt_pruebas').focus();
  } else {
    for (var i = 1; i < document.getElementById('pruebasbody').rows.length; i++) {
      var cellsOfRow = document.getElementById('pruebasbody').rows[i].getElementsByTagName('td');
      var found = false;

      var compareWith = cellsOfRow[1].innerHTML.toLowerCase();
      if (Txt_pruebas.value.length == 0 || (compareWith.indexOf(Txt_pruebas.value) > -1)) {
        found = true;
      }

    }
    if (found) {
      alert("Esta prueba ya ha sido registrado, ingrese otro");
      Txt_pruebas.value = ""
      return;
    }
    l_boolbuscado = true;
    var table = document.getElementById("pruebasbody");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(-1);
    row.addEventListener("click", function () {
      filatablapruebas(row);
    });
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    // Add some text to the new cells:
    cell1.innerHTML = document.getElementById('Txt_pruebas').dataset.cod_pruebas;
    cell2.innerHTML = document.getElementById('Txt_pruebas').value;
    /*   Txt_pruebas.Text = Trim(Adata_pruebas.Recordset!des_prueba)
      txt_unidad.Text = Trim(Adata_pruebas.Recordset!UNIDAD)
      Txt_clasificacion.Text = Trim(Adata_pruebas.Recordset!clasificacion)
      Txt_cod_prueba.Text = Trim(Adata_pruebas.Recordset!cod_pruebas) */
    if (document.getElementById("Txt_factor_lab").value.trim() == "") {
      alert("Debe ingresar la empresa aseguradora");
      //if (Grid_destino.Row > 1 Or Grid_destino.rows > 2 )
      if (table.rows > 1) {
        table.deleteRow(table.rows.length - 1);
        valor = 0
        for (var i = 0; i < table.rows.length - 1; i++) {
          valor = valor + table.rows[i].cells[2];
        }

      } else {
        table.rows[0].cells[0].innerHTML = "";
        table.rows[0].cells[1].innerHTML = "";
        table.rows[0].cells[2].innerHTML = "";
        table.rows[0].cells[3].innerHTML = "";

        document.getElementById(Txt_total_R).value = "";
        document.getElementById(Txt_total_T).value = "";
        document.getElementById(Txt_total).value = "";

        document.getElementById(Txt_ded_r).value = "";
        document.getElementById(Txt_ded_t).value = "";
        document.getElementById(Txt_ded).value = "";
      }
    } else {

      cell3.innerHTML = redondeardec((1 + 0.18) * document.getElementById('Txt_factor_lab').value * document.getElementById('Txt_pruebas').dataset.txt_unidad);

    }

    cell4.innerHTML = document.getElementById('Txt_pruebas').dataset.clasificacion;


    valor_r = 0;
    valor_t = 0;
    valor = 0;
    for (var i = 0; i < table.rows.length - 1; i++) {
      if (table.rows[i].cells[3].innerHTML.trim() == "R") {
        valor_r = valor_r + table.rows[i].cells[2].innerHTML.trim();
      } else if (table.rows[i].cells[3].innerHTML.trim() == "T") {
        valor_t = valor_t + table.rows[i].cells[2].innerHTML.trim();
      }
      valor = valor + table.rows[i].cells[2].innerHTML.trim();
    }
    document.getElementById('Txt_total_R').value = valor_r;
    document.getElementById('Txt_total_T').value = valor_t;
    document.getElementById('Txt_total').value = valor;
    if (ANvienede = "FRMLABOCONATE") {
      document.getElementById('Txt_ded_r').value = document.getElementById('Txt_total_R').value * (document.getElementById('txt_coa').value) / 100;
      document.getElementById('Txt_ded_t').value = document.getElementById('Txt_total_T').value * (document.getElementById('txt_coa').value) / 100;
      document.getElementById('Txt_ded').value = document.getElementById('Txt_total').value * (document.getElementById('txt_coa').value) / 100;

    }

    document.getElementById('Txt_pruebas').value = "";

    if (document.getElementById('Txt_codgru').value.trim() == "143") {
      valor_r = 33;
      valor_t = 33;
      valor = 33;
    }

  }

}
var valor = 0, valor_r = 0, valor_t = 0;

window.redondeardec = function(x) {
  a = x - parseInt(x);
  if (a > 0 && a < 0.5) {
    return parseInt(x) + 0.5;
  } else if (a > 0.5 && a < 1) {
    return parseInt(x) + 1;
  } else {
    return x;
  }
}
window.eliminarprueba  = function(fila) {
  var table = document.getElementById("pruebasbody");

  // msgvalue = MsgBox("¿Desea Eliminar esta prueba?", vbYesNo, "Registro de Prueba")
  var r = confirm("¿Desea Eliminar esta prueba?");
  if (r == true) {
    if (table.rows.length >= 1) {
      table.deleteRow(fila.rowIndex);
      valor = 0;
      valor_r = 0;
      valor_t = 0;
      for (var i = 0; i < table.rows.length - 1; i++) {

        if (table.rows[i].cells[3].innerHTML.trim() == "R") {
          valor_r = valor_r + table.rows[i].cells[2].innerHTML.trim();
        } else if (table.rows[i].cells[3].innerHTML.trim() == "T") {
          valor_t = valor_t + table.rows[i].cells[2].innerHTML.trim();
        }
        valor = valor + table.rows[i].cells[2].innerHTML.trim();
      }
      document.getElementById('Txt_total_R').value = valor_r;
      document.getElementById('Txt_total_T').value = valor_t;
      document.getElementById('Txt_total').value = valor;

      document.getElementById('Txt_ded_r').value = document.getElementById('Txt_total_R').value * (document.getElementById('txt_coa').value) / 100;
      document.getElementById('Txt_ded_t').value = document.getElementById('Txt_total_T').value * (document.getElementById('txt_coa').value) / 100;
      document.getElementById('Txt_ded').value = document.getElementById('Txt_total').value * (document.getElementById('txt_coa').value) / 100;

    } else {

      document.getElementById('Txt_total_R').value = "";
      document.getElementById('Txt_total_T').value = "";
      document.getElementById('Txt_total').value = "";
      document.getElementById('Txt_ded_r').value = "";
      document.getElementById('Txt_ded_t').value = "";
      document.getElementById('Txt_ded').value = "";
    }
  } else {




  }


}
window.onlyOne = function(checkbox) {
  var checkboxes = document.getElementsByName('cambio_proveedor');
  var radios = document.getElementsByName('cambio_estado_lab');

  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
  radios.forEach((item) => {
    item.checked = false
  })
}

  
window.modalconfirmacion_coord = function(el)  {

  //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> COORDINACION DE SERVICIO</h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>

<div  style="display:grid;grid-template-columns:  2fr 1.3fr 1.7fr;">
<fieldset  id="servicio" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Datos del servicio</legend>
<div  style="display: grid;grid-template-columns:  1fr 2fr;">
Aseguradora: <input   type="input" id="TxtNomEmp"   name="TxtNomEmp">
Proveedor:<input   type="input" id="TxtNomPac"   name="TxtNomPac">
Medico:<input   type="input" id="Txt_Edad"   name="Txt_Edad">
Paciente:<input   type="input" id="Txt_distrito"   name="Txt_distrito">
Tipo Doc. Ident.:<input   type="input" id="Txtdireccion"   name="Txtdireccion">
Peticion:<div><input   type="input" id="Txt_nro_lote"   name="Txt_nro_lote">
Observacion:<input  style="width:5vw"  type="input" id="Txt_dpto_dir"   name="Txt_dpto_dir"></div>
Email:<input   type="input" id="Txt_Urbanizacion"   name="Txt_Urbanizacion">
<div></div><input   type="input" id="TxtTlf"   name="TxtTlf">
  
</div>

</fieldset> 

 


<fieldset  id="pago" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Datos del pago</legend>
<div style="display:grid;grid-template-columns: 1fr 2.3fr;grid-row: auto auto;">


<label>Coa. (S/.)</label>
 <input  type="text" style="text-transform: uppercase;"   id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Forma de pago</label>
 <input  type="text" style="text-transform: uppercase;height:min-content"   id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Denominacion</label>
 <input  type="text" style="text-transform: uppercase;"   id="Txt_pruebas" name="Txt_pruebas"  > 
 <div></div>    

 </div>
  
</fieldset>


<fieldset  id="direccion" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Direccion</legend>
<div style="display:grid;grid-template-columns: 1fr 2fr; ">


<label>Distrito</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Direccion</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Referencia</label>
  <input  type="text" style="text-transform: uppercase;"   id="Txt_pruebas" name="Txt_pruebas"  > 
  <label>Telefono</label>  
  <div>
   <input  type="text" style="width:8vw;text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
   <label>Celular</label>
   <input  type="text" style="width:8vw;text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
   </div>

 </div>
  
</fieldset>

<div style="display:grid;grid-column:1/ span 3 ;grid-template-columns: 1.5fr 1.5fr; ">

<fieldset  id="coordinacion" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Coordinacion de Servicio</legend>
<div style="display:grid;grid-template-columns: 1fr 2fr; ">


<label>Medio de Comunicacion</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Contacto de confirmacion</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Fecha</label>
  <input  type="text" style="text-transform: uppercase;"   id="Txt_pruebas" name="Txt_pruebas"  > 
  <label>Nombre del Responsable</label>  
  <input  type="text" style=" text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
   <label>Telefono del Tecnico</label>
   <input  type="text" style=" text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
 
 </div>
  
</fieldset>
<fieldset  style="grid-row: 1/ span 2;grid-column: 2; " id="Disponibilidad" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Disponibilidad de Flebotomista</legend>
<div style="display:grid;grid-template-columns: 1fr 2fr; ">


<label>Distrito</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Direccion</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Referencia</label>
  <input  type="text" style="text-transform: uppercase;"   id="Txt_pruebas" name="Txt_pruebas"  > 
  <label>Telefono</label>  
  <div>
   <input  type="text" style="width:8vw;text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
   <label>Celular</label>
   <input  type="text" style="width:8vw;text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
   </div>

 </div>
  
</fieldset>
 
 

<fieldset  id="pruebas" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Pruebas</legend>
<div style="display:grid;grid-template-columns: 1fr 2fr; ">


<label>Distrito</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Direccion</label>
 <input  type="text" style="text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  > 
 <label>Referencia</label>
  <input  type="text" style="text-transform: uppercase;"   id="Txt_pruebas" name="Txt_pruebas"  > 
  <label>Telefono</label>  
  <div>
   <input  type="text" style="width:8vw;text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
   <label>Celular</label>
   <input  type="text" style="width:8vw;text-transform: uppercase;"  id="Txt_pruebas" name="Txt_pruebas"  >
   </div>

 </div>
  
</fieldset>
</div><div></div>

<div   style="grid-column:1 / span 3;display:flex;justify-content:flex-end	;">
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_Seguimiento" name="Cmd_Seguimiento" value="Seguimiento"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_anular" name="Cmd_anular" value="Anular"> 
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_Grabar" name="Cmd_Grabar" onclick="cmdGrabar_Click();" value="Grabar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Cmd_Salir" name="Cmd_Salir" value="Salir"> 
</div>
</divZ>
`);

  dragElement(document.getElementById("ed-modal-content"));
  document.getElementById('ed-modal-content').style.minWidth = "90vw";


  var cambio_estado_lab = document.getElementsByName("cambio_estado_lab");
  if (cambio_estado_lab) {
    for (var i = 0; i < cambio_estado_lab.length; i++) {
      cambio_estado_lab[i].addEventListener("change", function () {
        var checkboxes = document.getElementsByName('cambio_proveedor');

        checkboxes.forEach((item) => {
          item.checked = false;
        });
      })
    }
  }
  document.getElementById("btn_aceptar").addEventListener('click', function () {
    var choicesestados = [];
    var choicesproveedor = [];

    var cambios_estados = document.getElementsByName('cambio_estado_lab');
    var cambios_proveedores = document.getElementsByName('cambio_proveedor');





  }, false);

}
window.modaldetalle = function(el) {
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

  document.body.style.cursor = 'progress';

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



window.modalauditoria = function(el) {
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

window.modalsoporte = function(el) {
  /* if(el.cells[16].innerHTML.trim()=='Registrado'){
   return;
  } */
  //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> Ventana de Soporte</h4><button type="button"  id="cancelarsoporte" class="cancelarmodal btn-xs btn-danger">X</button></div>


<fieldset  id="estado" style ="border:1px solid">
<legend style ="width:auto" >Estado</legend>
${el.dataset.estado >= 6 ? '<input type="radio" id="6a4" name="cambio_estado_lab"   value="R4"><label for="6a4">De estado 6 a estado 4</label><br>' : ''}
${el.dataset.estado >= 4 ||el.dataset.estado == 'R4' ? '<input type="radio" id="4a3" name="cambio_estado_lab" value="R3"><label for="4a3">De estado 4 a estado 3</label><br>' : ''}
${el.dataset.estado >= 3 ? '<input type="radio" id="3a2" name="cambio_estado_lab" value="R2"><label for="3a2">De estado 3 a estado 2</label><br>' : ''}
${el.dataset.estado >= 2 ? '<input type="radio" id="2a0" name="cambio_estado_lab" value="R0"><label for="2a0">De estado 2 a estado 0</label>' : ''}
</fieldset> 


<fieldset  id="cambio_proveedor" style ="border:1px solid">
<legend  style ="width:auto"  >Cambio</legend>
<input type="checkbox" id="cambio_prov_lab" name="cambio_proveedor" onclick="onlyOne(this)" value="laboratorio">
<label for="cambio_prov_lab"> Cambio de Proveedor de Laboratorio</label><br>
<input type="checkbox" id="cambio_prov_fleb" name="cambio_proveedor" onclick="onlyOne(this)" value="flebotomista">
<label for="cambio_prov_fleb"> Cambio de Proveedor Flebotomista</label><br>
<input type="checkbox" id="cambio_prov_remisse" name="cambio_proveedor" onclick="onlyOne(this)" value="remisse">
<label for="cambio_prov_remisse">Cambio de Proveedor de Remisse</label>
</fieldset> 
<div   style="display:flex;justify-content:space-around	;">
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_aceptar" name="btn_aceptar" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cancelar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));
  document.getElementsByName('cambio_estado_lab')[0].checked = true;

  var cambio_estado_lab = document.getElementsByName("cambio_estado_lab");
  if (cambio_estado_lab) {
    for (var i = 0; i < cambio_estado_lab.length; i++) {
      cambio_estado_lab[i].addEventListener("change", function () {
        var checkboxes = document.getElementsByName('cambio_proveedor');

        checkboxes.forEach((item) => {
          item.checked = false;
        });
      })
    }
  }
  document.getElementById("btn_aceptar").addEventListener('click', function () {
    var choicesestados = [];
    var choicesproveedor = [];

    var cambios_estados = document.getElementsByName('cambio_estado_lab');
    var cambios_proveedores = document.getElementsByName('cambio_proveedor');

    for (var i = 0; i < cambios_estados.length; i++) {
      if (cambios_estados[i].checked) {
        choicesestados.push(cambios_estados[i].value);
      }
    }

    for (var i = 0; i < cambios_proveedores.length; i++) {
      if (cambios_proveedores[i].checked) {
        choicesproveedor.push(cambios_proveedores[i].value);
      }
    }
    if (choicesestados.length == 0 && choicesproveedor.length == 0) {
      alert('Seleccionar una opcion');
      return;
    }
    if (choicesestados.length > 0) {
      if (confirm('Estas seguro de cambiar el estado?')) {

        for (var i = 0, length = cambios_estados.length; i < length; i++) {
          if (cambios_estados[i].checked) {
            // do whatever you want with the checked radio
            cambio_estado = (cambios_estados[i].value);

            // only one radio can be logically checked, don't check the rest
            break;
          }
        }
        fetch('/gestionlaboratorio/cambiar_estado_orden', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cod_serv_laboratorio: el.dataset.cod_serv_laboratorio,
            cambio_estado: cambio_estado
          })
        }).then(response => response.json())
          .then(function (data) {
            
            var html = '';
            var i;
            //el.dataset.cod_serv_laboratorio
            // $('#cant').html(data.length );  
            alert('Cambio ' + cambio_estado + ' realizado');
          }).catch(error => {
            alert(error);
          });
      } else {


      }
    }
    if (choicesproveedor.length > 0) {
      if (document.getElementById('cambio_prov_lab').checked) {
        document.getElementById("cancelarsoporte").click();
        modalcambioproveedorlaboratorio(el.dataset.cod_serv_laboratorio);
      } else if (document.getElementById('cambio_prov_fleb').checked) {
        document.getElementById("cancelarsoporte").click();
        modalcambioproveedorflebotomista(el.dataset.cod_serv_laboratorio);
      } else if (document.getElementById('cambio_prov_remisse').checked) {
        document.getElementById("cancelarsoporte").click();
        modalcambioproveedorremisse(el.dataset.cod_serv_laboratorio);
      }

    }
  }, false);

}


var   myWindowFrm_LAB_Asignar_Proveedor;

window.Cmd_AsigProveedor_Click = function( ) {

  
    if(myWindowFrm_LAB_Asignar_Proveedor!==undefined){
      
      myWindowFrm_LAB_Asignar_Proveedor.document.body.innerHTML="";

    }
  
    myWindowFrm_LAB_Asignar_Proveedor = window.open("", "myWindowFrm_LAB_Asignar_Proveedor", "toolbar=no,menubar=no,top=40,left=450,width=40%,height=50%");
    myWindowFrm_LAB_Asignar_Proveedor.document.body.innerHTML="";
    myWindowFrm_LAB_Asignar_Proveedor.document.write(` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" /> 
    <head>
    
    <link href="${window.location.protocol + '//' + window.location.host}/assets/css/sb-admin-2.min.css" rel="stylesheet">
     <style>
     .Frm_LAB_Asignar_Proveedor {
       padding-top: 2vh;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1.8fr auto 0.2fr 0.1fr;
      gap: 25px 25px;
      grid-auto-flow: row;
      grid-template-areas:
        "datospaciente"
        "pruebas"
        "proveedor"
        "botones";
    }
    
    .datospaciente {
      border:1px solid black  ;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: auto auto auto auto auto auto auto auto auto auto auto auto auto;
      gap: 0px 0px;
      grid-auto-flow: row;
      grid-template-areas:
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . ."
        ". . . .";
      grid-area: datospaciente;
    }
     
    .pruebas {
      border:1px solid black  ;
       grid-area: pruebas; 
    }
    
    .proveedor { 
      border:1px solid black  ;
      grid-area: proveedor;
     }
    
    .botones {
      display: grid; 
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
      gap: 0px 0px; 
      grid-area: botones;  
    }
    

     </style>
    </head>
    <body> 
        <div class="Frm_LAB_Asignar_Proveedor">
          <div class="datospaciente">
          <h6 style="grid-column:1/5;width:25vw;background-color:white; color:black;  font-weight:bold; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Datos del Paciente</h6>
          <input  type="hidden" id="Txt_laboratorio" name = "Txt_laboratorio"  > 
          <input  type="hidden" id="Txt_Ventana" name = "Txt_Ventana"  > 
          <input  type="hidden" id="Txt_estado" name = "Txt_estado"  > 
          <input  type="hidden" id="Txt_Coddis" name = "Txt_Coddis"  > 
          <input  type="hidden" id="Txt_distrito" name = "Txt_distrito"  > 
          <input  type="hidden" id="Txt_Cod_Dir" name = "Txt_Cod_Dir"  > 
          <input  type="hidden" id="Txt_CodTit" name = "Txt_CodTit"  > 
          <input  type="hidden" id="Txt_CodAte" name = "Txt_CodAte"  > 
          <input  type="hidden" id="Txt_Clasif_laboratorio" name = "Txt_Clasif_laboratorio"  > 
          <input  type="hidden" id="Txt_factor_lab" name = "Txt_factor_lab"  > 
          <input  type="hidden" id="txt_coa_porc" name = "txt_coa_porc"  > 
          <input  type="hidden" id="Txt_codservlaboratorio" name = "Txt_codservlaboratorio"  > 
          <input  type="hidden" id="Txt_codservicio" name = "Txt_codservicio"  > 

          <label id="Label1">Aseguradora : </label>
          <input style="grid-column:2/5" type="text" id="TxtNomEmp" name = "TxtNomEmp" style=" font-weight:bold"; disabled  > 
          <label id="Label3">Nom Paciente : </label>
          <input style="grid-column:2/5" type="text" id="TxtNomPac" name = "TxtNomPac" style="  font-weight:bold"; disabled  > 
          <label id="Label6">Edad : </label>
          <input style="grid-column:2/5" type="text" id="Txt_Edad" name = "Txt_Edad" style="font-weight:bold"; disabled  > 
          <label id="Label7">Dirección : </label>
          <input style="grid-column:2/5" type="text" id="Txtdireccion" name = "Txtdireccion" style="font-weight:bold"; disabled  > 
          <label id="Label21">Nro / Lote Mz:</label>
          <input  type="text" id="Txt_nro_lote" name = "Txt_nro_lote" style="font-weight:bold"; disabled  > 
          <label id="Label11">Dpto : </label>
          <input  type="text" id="Txt_dpto_dir" name = "Txt_dpto_dir" style="font-weight:bold"; disabled  > 
          <label id="Label20">Urbaniz. :</label>
          <input style="grid-column:2/5" type="text" id="Txt_Urbanizacion" name = "Txt_Urbanizacion" style="font-weight:bold"; disabled  > 
          <label id="Label8">Referencia : </label>
          <input style="grid-column:2/5" type="text" id="txtref" name = "txtref" style="font-weight:bold"; disabled  > 
          <label id="Label9">Telefono : </label>
          <input   type="text" id="TxtTlf" name = "TxtTlf" style="font-weight:bold"; disabled  > <div></div><div><input type="button" disabled class="btn btn btn-primary btn-sm"  id="Cmd_editar_dir" name="Cmd_editar_dir" onClick="Cmd_editar_dir_Click();" value="Editar Dirección"></div>
          <label id="Label10">Celular : </label>
          <input   type="text" id="Txt_Celular" name = "Txt_Celular" style="font-weight:bold"; disabled  > <div></div><div></div>
          <label id="Label18">Coa : </label>
          <input  type="text" id="Txt_coa" name = "Txt_coa" style="font-weight:bold"; disabled  > 
          <label style="width:14vw" id="Label16">Forma pago :</label>
          <select   type="text" id="Cbo_forma_pago" name = "Cbo_forma_pago"   disabled  >
          <option value="EFECTIVO">EFECTIVO</option>
          <option value="CREDITO">CREDITO</option>
          <option value="TARJETA">TARJETA</option>
          <option value="TRANSFERENCIA">TRANSFERENCIA</option>
          </select>
          <label style="width:20vw" id="Label4">Fecha de Servicio :</label>
          <input  type="date" id="DTPicker1" name = "DTPicker1" style="font-weight:bold"; disabled  > 
          <label id="Label5">Proveedor :</label>
          <select id="Cbo_Proveedor" name = "Cbo_Proveedor"  disabled  > </select>
          <label id="Label17">Observacion :</label>
          <textarea style="grid-column:2/5" id="Txt_observacion"></textarea>
          </div>
          <div class="pruebas">
          <h6 style="width:25vw;background-color:white;color:black; font-weight:bold; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Pruebas</h6>

          <label style="display:none;" id="Label12"  for="pruebas" >Nombre :</label>
           <input  style="display:none;width:85%" list="Txt_pruebasdatalist" name="Txt_pruebas" id="Txt_pruebas">
          <datalist id="Txt_pruebasdatalist">
          </datalist>
          <table id="Grid_destino" border=1 id="tabla1" style="width:100%" >
              <thead   id = "Grid_destinohead">
                <tr style="background-color:#00aae4;color:white;">
                        <th scope="col">CODIGO</th>
                        <th scope="col">NOMBRE DE LA PRUEBA</th>
                        <th scope="col">PRECIO</th>
                        <th scope="col">CLASIF.</th>
          
                </tr>
              </thead>
              <tbody  id="Grid_destinobody">

              </tbody>
              <tfoot>
              </tfoot>
          </table>
          <input style="display:none" type="button"  class="btn btn btn-info btn-sm"  id="Cmd_Agregar" name="Cmd_Agregar" onClick="Cmd_Agregar_Click();" value="Agregar"> 
          <input   type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_Eliminar" name="Cmd_Eliminar" onClick="Cmd_Eliminar_Click();" value="Eliminar"> 
    
          </div>
          <div class="proveedor">
          <h6 style="width:25vw;background-color:white;color:black; font-weight:bold; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Proveedor</h6>
          <label style="display:none" id="Lbl_Medico">Medico :</label>
          <label style="display:none" id="Lbl_Proveedor">Proveedor :</label>
          <input  style="display:none" type="text" id="Txt_listado" name = "Txt_listado" >  
          <select style="display:none" id="DCbo_Proveedor" name = "DCbo_Proveedor"     > </select>
          </div>
          <div class="botones">
          <input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_anular" name="Cmd_anular" onClick="Cmd_anular_Click();" value="Anular orden"><div></div>
          <input type="button"  class="btn btn btn-primary btn-sm"  id="Cmd_Editar" name="Cmd_Editar" onClick="Cmd_Editar_Click();" value="Editar">
          <input type="button"  class="btn btn btn-warning btn-sm"  id="Cmd_Grabar" name="Cmd_Grabar" onClick="Cmd_Grabar_Click();" value="Asignar Proveedor">
          <input type="button"  class="btn btn btn-danger btn-sm"  id="Cmd_salir" name="Cmd_salir" onClick="self.close()" value="Salir">
          </div>
       </div>
    </body>
     <script src="${window.location.protocol + '//' + window.location.host}/assets/js/dashboard/Frm_LAB_Asignar_Proveedor.js?${Date.now()}">
     var Pvienede = "FRMSERVICIOLABORATORIO";
     </script>`);
      if (myWindowFrm_LAB_Asignar_Proveedor.document) {
        myWindowFrm_LAB_Asignar_Proveedor.document.title = "Orden de Servicio al Proveedor";
      }
      myWindowFrm_LAB_Asignar_Proveedor.addEventListener("resize", function () {
        
    
        myWindowFrm_LAB_Asignar_Proveedor.resizeTo(700, 1000);
      });
      //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
      myWindowFrm_LAB_Asignar_Proveedor.document.getElementById('Txt_codservicio').value =document.getElementById('Txt_codservicio').value  ;
      
     
   

}

window.cambiofiltro = function(a) {
   
  document.getElementById("cbo_opcion2").style.display = "none";
  document.getElementById("txt_PacDrAseg").style.display = "none";
  document.getElementById("buscar_desde").disabled = false;
  document.getElementById("cbo_estado").style.display = "none";
  document.getElementById("cbo_clasif").style.display = "none";
  document.getElementById("cbo_tipo").style.display = "none";
  document.getElementById("Txt_cod_prueba").style.display = "none";
  document.getElementById("cbo_programa").style.display = "none";
  //document.getElementById("DCbo_Flebotomista").style.display = "none";
  document.getElementById("finalizadas").style.display = "inline-block";
  document.getElementById("lbl_finalizadas").style.display = "inline-block";


  document.getElementById("Cmd_expEKG").style.display = "none";
  document.getElementById("estado_ekg").style.display = "none";
  document.getElementById("clasificacion_serv").style.display = "none";

 
  switch (a) {

    case "0":
      document.getElementById("cbo_opcion2").style.display = "block";
      break;
    case "3":
    case "4":
    case "5":
    case "8":
      document.getElementById("txt_PacDrAseg").style.display = "block";
      break;
    case "6":
      document.getElementById("cbo_estado").style.display = "block";
      break;
    case "7":
      document.getElementById("cbo_clasif").style.display = "block";
      break;
    case "1":
      document.getElementById("buscar_desde").disabled = true;
      document.getElementById("fec_inicial").disabled = true;
      break;

    case "10":
      document.getElementById("cbo_tipo").style.display = "block";
      break;
    case "11":
      document.getElementById("Txt_cod_prueba").style.display = "block";
      break;
    case "9":
      document.getElementById("cbo_programa").style.display = "block";
      break;
    case "2":
      //document.getElementById("flebotomista").style.display = "visible";
      break;
    case "12":
      document.getElementById("finalizadas").style.display = "none";
      document.getElementById("lbl_finalizadas").style.display = "none";

      document.getElementById("clasificacion_serv").style.display = "block";
      document.getElementById("estado_ekg").style.display = "block";
      fetch('/gestionlaboratorio/getclasificacionserv', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '';
          var i;
          for (i = 0; i < data.length; i++) {


            html += '<option value="' + data[i].cod_clasif + '">' + data[i].nom_clasif
              + '</option>';

          }
          document.getElementById("clasificacion_serv").innerHTML = html;

        }).catch(error => {
          console.log(error);
        });
      break;
  }

}

function  habilitafechainicial() {
  if (this.checked) {
    document.getElementById("fec_inicial").disabled = false;
  } else {
    document.getElementById("fec_inicial").disabled = true;

  }
}

function habilita_cboestados() {
  if (this.checked) {
    document.getElementById('cbo_estados').style.visibility = "visible";
  } else {
    document.getElementById('cbo_estados').style.visibility = "hidden";

  }
}
function filaSelectedbuscarpaciente(e, tabla) {

  var rows = Array.from(document.querySelectorAll('#' + tabla + 'body tr.selected'));
  rows.forEach(row => {
    row.classList.remove('selected');
  });
  e.classList.add("selected");
  if (tabla == 'titulares') {
     
    document.getElementById('txtpaciente').value = e.cells[1].innerHTML.trim();
    fetch('/gestionlaboratorio/busquedadireccion/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Txt_CodTit: e.id

      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '';
        var i;
        
        for (i = 0; i < data.length; i++) {


          html += '<tr ' + ' id="' + data[i].cod_dir.trim() + `" onclick="filaSelectedbuscarpaciente(this,'direcciones');">` +
            '<td >' + data[i].des_dir + '</td>' +
            '<td>' + data[i].des_dis + '</td>' +
            '<td>' + data[i].tlf_dir + '</td>' +
            '<td>' + data[i].ref_dir + '</td>'

          '</tr>';
        }

        $('#direccionesbody').html(html);

        if (html != '') {
          document.getElementById('txtdireccion').value = data[0].des_dir.trim();
          document.getElementById('direccionesbody').rows[0].click();
        }

      }).catch(error => {
        console.log(error);
      });
  } else if (tabla == 'direcciones') {

    document.getElementById('txtdireccion').value = e.cells[0].innerHTML.trim();

  } else if (tabla == 'atenciones') {

    document.getElementById('Txt_CodAte').value = e.cells[0].innerHTML.trim();
    document.getElementById('Txt_seguro').value = (e.cells[6].innerHTML === 'null') ? '' : e.cells[6].innerHTML.trim();
    document.getElementById('Txt_nompac').value = e.cells[1].innerHTML.trim();

  }
}
window.filatransferenciaSelected = function(e) {

  var rows = Array.from(document.querySelectorAll('#tbodytransferencia tr.selected'));
  rows.forEach(row => {
    row.classList.remove('selected');
  });
  e.classList.add("selected");

};
window.filaSelected = function(e) {

  var rows = Array.from(document.querySelectorAll('tr.selected'));
  rows.forEach(row => {
    row.classList.remove('selected');
  });
  document.getElementById("btn_soporte").dataset.cod_serv_laboratorio = (e.children[4].innerHTML).trim();
  e.classList.add("selected");
  document.getElementById("btn_soporte").dataset.estado = (e.children[1].innerHTML).trim();


  document.getElementById('Txt_codservlaboratorio').value = (e.children[4].innerHTML).trim();
  document.getElementById('Txt_codservicio').value = (e.children[15].innerHTML).trim();
  document.getElementById('Txt_estado').value = (e.children[1].innerHTML).trim();
  document.getElementById('Txt_tipo').value = (e.children[2].innerHTML).trim();
  switch ((e.children[1].innerHTML).trim()) {
    case "0":
      document.getElementById('btn_soporte').disabled = true;
      document.getElementById('btn_creacion').disabled = false
      document.getElementById('btn_asignar_proveedor').disabled = false
      document.getElementById('btn_enviar_orden_proveedor').disabled = true;
      document.getElementById('btn_confirmacion_coord').disabled = true;
      document.getElementById('btn_auditoria').disabled = false;
      document.getElementById('btn_seguimiento').disabled = false;


      break;
    case "1":
      document.getElementById('btn_soporte').disabled = false;
      document.getElementById('btn_creacion').disabled = false
      document.getElementById('btn_asignar_proveedor').disabled = true
      document.getElementById('btn_enviar_orden_proveedor').disabled = false;
      document.getElementById('btn_confirmacion_coord').disabled = true;
      document.getElementById('btn_auditoria').disabled = false;
      document.getElementById('btn_seguimiento').disabled = false;

      break;
    case "2":
    case "R2":
      document.getElementById('btn_soporte').disabled = false;
      document.getElementById('btn_creacion').disabled = false
      document.getElementById('btn_asignar_proveedor').disabled =
        document.getElementById('btn_enviar_orden_proveedor').disabled = true;
      document.getElementById('btn_confirmacion_coord').disabled = true;
      document.getElementById('btn_auditoria').disabled = false;
      document.getElementById('btn_seguimiento').disabled = false;

      break;
    case "3":
    case "R3":
      document.getElementById('btn_soporte').disabled = false;
      document.getElementById('btn_creacion').disabled = false
      document.getElementById('btn_asignar_proveedor').disabled = true
      document.getElementById('btn_enviar_orden_proveedor').disabled = true;
      document.getElementById('btn_confirmacion_coord').disabled = false;
      document.getElementById('btn_auditoria').disabled = false;
      document.getElementById('btn_seguimiento').disabled = false;

      break;
    case "4":
    case "R4":
      document.getElementById('btn_soporte').disabled = false;
      document.getElementById('btn_creacion').disabled = false
      document.getElementById('btn_asignar_proveedor').disabled = true
      document.getElementById('btn_enviar_orden_proveedor').disabled = true;
      document.getElementById('btn_confirmacion_coord').disabled = true;
      document.getElementById('btn_auditoria').disabled = false;
      document.getElementById('btn_seguimiento').disabled = false;

      break;
    case "5":
    case "R5":
      document.getElementById('btn_soporte').disabled = false;
      document.getElementById('btn_creacion').disabled = false
      document.getElementById('btn_asignar_proveedor').disabled = true
      document.getElementById('btn_enviar_orden_proveedor').disabled = true;
      document.getElementById('btn_confirmacion_coord').disabled = true;
      document.getElementById('btn_auditoria').disabled = false;
      document.getElementById('btn_seguimiento').disabled = false;

      break;
    case "6":
    case "R6":
      document.getElementById('btn_soporte').disabled = false;
      document.getElementById('btn_creacion').disabled = false
      document.getElementById('cambio_estado_6').disabled = false;
      document.getElementById('btn_asignar_proveedor').disabled = true
      document.getElementById('btn_enviar_orden_proveedor').disabled = true;
      document.getElementById('btn_confirmacion_coord').disabled = true;
      document.getElementById('btn_auditoria').disabled = false;
      document.getElementById('btn_seguimiento').disabled = false;

      break;
    default:
      document.getElementById('btn_soporte').disabled = true;

  }

};
window.cambioproveedorflebotomista = function(r) {
  if (r.value == "0") {
    document.getElementById('flebotomista').innerHTML = `<option value="0">Todos</option>`;
    return false;
  }
  fetch('/gestionlaboratorio/get_flebotomistasxproveedor', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      proveedorflebotomista: document.getElementById('proveedorflebotomista').value
    })
  }).then(response => response.json())
    .then(function (data) {
       
      document.getElementById('flebotomista').innerHTML = listOfNamesflebotomista(data);

    }).catch(error => {
      alert(error);
    });

}
window.cambioproveedorflebotomista2 =function(r) {
  /*  if (r.value == "0"){
    document.getElementById('flebotomista').innerHTML =  `<option value="0">Todos</option>`;
    return false;
   } */
  fetch('/gestionlaboratorio/get_flebotomistasxproveedor', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      proveedorflebotomista: document.getElementById('proveedorlaboratorio').value
    })
  }).then(response => response.json())
    .then(function (data) {
      
      document.getElementById('cambioflebotomista').innerHTML = listOfNamesflebotomista(data);

    }).catch(error => {
      alert(error);
    });

}
function cambioproveedorremisse(r) {
  /*  if (r.value == "0"){
    document.getElementById('flebotomista').innerHTML =  `<option value="0">Todos</option>`;
    return false;
   } */
  fetch('/gestionlaboratorio/get_conductoresxremisse', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      proveedorconductor: document.getElementById('proveedorremisse').value
    })
  }).then(response => response.json())
    .then(function (data) {
      
      document.getElementById('conductor').innerHTML = listOfNamesconductores(data);

    }).catch(error => {
      alert(error);
    });

}

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



function tabletoarrayjson(table) {
  var data = [];
  var rowData = [];

  for (var i = 0; i < table.length; i++) {

    data.push(Object.values(table[i]));

  }

  return data;
}
window.s2ab = function(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf);  //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
  return buf;
}
window.exportarekg = function(a) {

  document.body.style.cursor = "progress";

  fetch('/gestionlaboratorio/exportarekg', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cond: a
    })
  }).then(response => response.json())
    .then(function (data) {
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

      var ws_data = tabletoarrayjson(data);  //a row with 2 columns

      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["EKG"] = ws;
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'EKG.xlsx');



    }).catch(error => {
      console.log(error);
      document.body.style.cursor = "default";
      alert('Sucedio un error al exportar');
    });


}
function tabletoarrayjsonhorariosreporte(table) {
  var data = [];
  var rowData = [];

  for (var i = 0; i < table.length; i++) {

    data.push(Object.values(table[i]));

  }

  return data;
}

function generarreporteregistro_snc() {

  if (document.getElementById('cmbservicio').value == "0") {
    alert("Seleccione un tipo de servicio");
    document.getElementById('cmbservicio').focus();
    return;
  }

  if (document.getElementById('DBDes_snc').style.display == "block" && document.getElementById('DBDes_snc').value == "") {
    alert("Seleccione un tipo de observación");
    document.getElementById('DBDes_snc').focus();
    return;
  }

  var tipo;
  var fecinicio = document.getElementById('fecinicio').value;
  var fecfinal = document.getElementById('fecfinal').value;
  var Check1 = document.getElementById('Check1').checked;
  var DBDes_snc = document.getElementById('DBDes_snc').value;

  if (document.getElementById('registro').checked) {
    tipo = 'REGISTRO';
  } else {
    tipo = 'SNC';

  }
  var cmbservicio = document.getElementById('cmbservicio').value;

  document.body.style.cursor = "progress";

  fetch('/gestionlaboratorio/generarreporteregistro_snc', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fecinicio: fecinicio,
      fecfinal: fecfinal,
      tipo: tipo,
      cmbservicio: cmbservicio,
      Check1: Check1,
      DBDes_snc: DBDes_snc
    })
  }).then(response => response.json())
    .then(function (data) {
      document.body.style.cursor = "default";
       
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "REGISTROS_SNC",
        Subject: "REGISTROS_SNC",
        Author: "SUPERVISOR",
        CreatedDate: new Date()
      };
      wb.SheetNames.push("VNRs_mad");
      //tab = document.getElementById('tabla1'); // id of table

      var ws_data = tabletoarrayjsonhorariosreporte(data);  //a row with 2 columns

      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["VNRs_mad"] = ws;
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Reporte Registros y SNC.xlsx');
      document.body.style.cursor = "default";



    }).catch(error => {
      console.log(error);
      document.body.style.cursor = "default";
      alert('Sucedio un error');
    });


}
 // Quick and simple export target #table_id into a csv
window.download_table_as_csv = function(table_id, separator = ',') {
  // Select rows from table_id
  var rows = document.querySelectorAll('table#' + table_id + ' tr');
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      var data;

      if (i==0){
              for (var j = 0; j < cols.length; j++) {
                      // Clean innertext to remove multiple spaces and jumpline (break csv)
                    
                      data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                    
                      data = data.replace(/"/g, '""');
                      // Push escaped string
                      row.push('"' + data + '"');
              }
      }else{
            for (var j = 1; j < cols.length; j++) {
                // Clean innertext to remove multiple spaces and jumpline (break csv)
                if ( (j==2 || j==3 || j==4 || j==5 ) && i>0){
                  data = cols[j].children[0].value;
                }else{
                  data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                }
                data = data.replace(/"/g, '""');
                // Push escaped string
                row.push('"' + data + '"');
            }
      }
      csv.push(row.join(separator));
  }
  var csv_string = csv.join('\n');
  // Download it
  var filename = 'flag_snc' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
  var link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function cargar_servnoconforme() {
  var s_tipo_seg;
  var cmbservicio = document.getElementById('cmbservicio').value;
  if (cmbservicio == "0") {
    return;
  }
  document.getElementById('DBDes_snc').disabled = false;
  if (document.getElementById('registro').checked) {
    s_tipo_seg = "REGISTRO";
  } else if (document.getElementById('snc').checked) {
    s_tipo_seg = "SNC";
  }
  fetch('/gestionlaboratorio/cargar_servnoconforme/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cmbservicio: cmbservicio,
      s_tipo_seg: s_tipo_seg
    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '';
      if (data.length != 0) {
        const sncs = data.map(person => `<option value="${person.cod_snc}">${person.des_snc}</option>`).join("\n");
        document.getElementById('DBDes_snc').innerHTML = sncs;
      } else {
        document.getElementById('DBDes_snc').innerHTML = "";
      }

    }).catch(error => {
      console.log(error);
    });

}

function mostrarsnc(marca) {
  if (marca) {
    document.getElementById('DBDes_snc').style.display = "none";
    document.getElementById('observaciones').style.display = "none";


  } else {
    document.getElementById('DBDes_snc').style.display = "block";
    document.getElementById('observaciones').style.display = "block";
  }

}



window.agregarprueba = function(val) {
  var re = new RegExp('\\d{2}\\.\\d{2}.\\d{2}');
  var codigo = val.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.value.trim();
  var prueba = val.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.value.trim();
  var unidad = val.previousSibling.previousSibling.previousSibling.previousSibling.value;
  var clasificacion = val.previousSibling.previousSibling.value.toUpperCase();

  if (codigo == '' || prueba == '' || unidad == '' || clasificacion == '') {
    alert('Ingresar datos');
    return;
  }

  if (re.test(codigo)) {


  } else {
    alert('El codigo es incorrecto');
    return;
  }

  fetch('/gestionlaboratorio/agregarprueba', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      codigo: codigo,
      prueba: prueba,
      unidad: unidad,
      clasificacion: clasificacion,

    })
  }).then(response => response.json())
    .then(function (data) {
      if(data){
        alert('insertado');
        window.location.reload();
      }else{

        alert('No Insertado');
       }
 

    }).catch(error => {
      alert(error);
      console.log(error);

    });


}


window.agregarflebotomista = function(val) {
  var proveedores = '';
  var codigoflebotomista = document.getElementById('codigoflebotomista').value;
  var apellidosflebotomista =  document.getElementById('apellidosflebotomista').value;
  var telefonoflebotomista = document.getElementById('telefonoflebotomista').value;
  var proveedor =document.getElementById("idproveedor");
  for (var i = 0; i < proveedor.options.length; i++) {
      if(proveedor.options[i].selected ==true){              
        proveedores += proveedor.options[i].value + ',';
        }
    }
    if (proveedores !=''){
      proveedores = proveedores.slice(0,-1);
      proveedores = '{' + proveedores + '}';
    }
  var proveedorflebotomista = proveedores;

  if (codigoflebotomista == '' || apellidosflebotomista == '' || telefonoflebotomista == ''  ) {
    alert('Falta ingresar datos');
    return;
  }
 

  fetch('/gestionlaboratorio/agregarflebotomista', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      codigoflebotomista: codigoflebotomista,
      apellidosflebotomista: apellidosflebotomista,
      telefonoflebotomista: telefonoflebotomista,
      proveedorflebotomista:proveedorflebotomista
    })
  }).then(response => response.json())
    .then(function (data) {
      if(data){
        alert('insertado');
        window.location.reload();
      }else{

        alert('No Insertado');
       }
 

    }).catch(error => {
      alert(error);
      console.log(error);

    });


}


window.grabarcreacion=async function () {

  if (document.getElementById('pruebasbody').rows.length == 0) {
    alert('FALTA INGRESAR PRUEBAS');
    return;
  }
  if (document.getElementById('Cbo_forma_pago').value == 0) {
    alert('FALTA INGRESAR FORMA DE PAGO');
    return;

  }
  if (document.getElementById('Txtdireccion').value == "") {
    alert('FALTA INGRESAR DIRECCION');
    return;

  }
  if (document.getElementById('Txt_ded').value == "") {
    alert('FALTA INGRESAR DEDUCIBLE');
    return;

  }
  if (document.getElementById('TxtNomEmp').value == 0) {
    alert('FALTA INGRESAR EMPRESA');
    return;

  }
  /*   if( document.getElementById('DC_clasificacion').value==0){
      alert('FALTA INGRESAR CLASIFICACION');
    } */
  if (document.getElementById('txt_coa').value == "") {
    alert('FALTA INGRESAR COA');
    return;

  }


  if (document.getElementById('Cbo_forma_pago').value == 1) {

    if (document.getElementById('Cbo_Denominacion').value == 0) {
      alert('FALTA INGRESAR DENOMINACION');
      return;

    }
  }
  if (document.getElementById('Cbo_forma_pago').value == 3) {

    if (document.getElementById('Txt_autorizado').value == 0) {
      alert('FALTA INGRESAR AUTORIZACION');
      return;

    }
  }
  if (document.getElementById('Cbo_forma_pago').value == 2) {

    if (document.getElementById('ME_tarjeta').value == 0) {
      alert('FALTA INGRESAR TARJETA');
      return;

    }
  }


  if (document.getElementById('Txt_cod_serv_laboratorio').value = "") {

    var x = 0, T = 0, R = 0, D = 0, H = 0;

     cabecera_serv_laboratorio();  //aqui se obtiene el codigo del laboratorio y se guarda en Txt_cod_serv_laboratorio.Text

    var ded_r = 0;
    var ded_t = 0;
    var ded_h = 0;
    var ded = 0;
    var clasificacion_p = '';
    if (document.getElementById('Cbo_Moneda').value == "S/.") {

      ded_r = document.getElementById('Txt_ded_r').value;
      ded_t = document.getElementById('Txt_ded_t').value;
      ded_h = document.getElementById('Txt_ded_h').value;
      ded = document.getElementById('Txt_ded').value;

    } else {

      ded_r = Math.round(((document.getElementById('Txt_ded_r').value * lsg_cambio) + Number.EPSILON) * 100) / 100 ;
      ded_t = Math.round(((document.getElementById('Txt_ded_t').value * lsg_cambio) + Number.EPSILON) * 100) / 100 ;  
      ded_h = Math.round(((document.getElementById('Txt_ded_h').value * lsg_cambio) + Number.EPSILON) * 100) / 100 ;   
      ded = Math.round(((document.getElementById('Txt_ded').value * lsg_cambio) + Number.EPSILON) * 100) / 100 ;  

    } 
    var pruebas = document.getElementById('pruebasbody').rows;
    var i=0;
    for ( i = 0; i < pruebas.length; i++) { //For fila = 1 To Grid_destino.rows - 1

      clasificacion_p = pruebas[i].cells[3].innerHTML;

      if (clasificacion_p == "T") { // TOMA
        T = T + 1;
      
        await  fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "INSERT INTO t_det_lab_serv_laboratorio(cod_pruebas, cod_serv_laboratorio, descripcion,precio,clasificacion) VALUES ('"+  pruebas[i].cells[0].innerHTML.trim() + "', '" + document.getElementById('Txt_cod_serv_laboratorio').value + "', '" + pruebas[i].cells[1].innerHTML.trim() + "', '" + pruebas[i].cells[2].innerHTML.trim() + "', '" +pruebas[i].cells[3].innerHTML.trim()+ "' )"
      
          })
        }).then(response => response.json())
          .then(function (data) {
            
      
          }).catch(error => {
            console.log(error);
          });
      } else if (clasificacion_p == "D") { //PROCEDIMIENTO
        D = D + 1;
        await fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "INSERT INTO t_det_lab_serv_laboratorio(cod_pruebas, cod_serv_laboratorio, descripcion,precio,clasificacion) VALUES ('"+ pruebas[i].cells[0].innerHTML.trim() + "', '" + document.getElementById('Txt_cod_serv_laboratorio').value + "', '" + pruebas[i].cells[1].innerHTML.trim() + "', '" + pruebas[i].cells[2].innerHTML.trim() + "', '" +pruebas[i].cells[3].innerHTML.trim()+ "' )"
      
          })
        }).then(response => response.json())
          .then(function (data) {
            
      
          }).catch(error => {
            console.log(error);
          });
      } else if (clasificacion_p == "X") {//RADIOGRAFIA
        x = x + 1;
        await fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "INSERT INTO t_det_lab_serv_laboratorio(cod_pruebas, cod_serv_laboratorio, descripcion,precio,clasificacion) VALUES ('"+ pruebas[i].cells[0].innerHTML.trim() + "', '" + document.getElementById('Txt_cod_serv_laboratorio').value + "', '" + pruebas[i].cells[1].innerHTML.trim() + "', '" + pruebas[i].cells[2].innerHTML.trim() + "', '" +pruebas[i].cells[3].innerHTML.trim()+ "' )"
      
          })
        }).then(response => response.json())
          .then(function (data) {
            
      
          }).catch(error => {
            console.log(error);
          });
      } else if (clasificacion_p == "R") { //RECOJO
        R = R + 1;

      } else if (clasificacion_p == "H") { //H : hisopados y examenes Covid
        H = H + 1;
      }
    }

    
    if (T > 0 ){
      await fetch('/modulo/Execute/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query:  "update t_cab_lab_serv_laboratorio set clasificacion='T',tar_ate=" + ded_t  +  " where cod_serv_laboratorio='" + document.getElementById('Txt_cod_serv_laboratorio') + "'" 
        })
      }).then(response => response.json())
        .then(function (data) {
          
    
        }).catch(error => {
          console.log(error);
        }); 
                    
    }
    
    if (x > 0 ){
      await fetch('/modulo/Execute/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query:  "update t_cab_lab_serv_laboratorio set clasificacion='X',tar_ate=" + ded_t  +  " where cod_serv_laboratorio='" + document.getElementById('Txt_cod_serv_laboratorio') + "'" 
        })
      }).then(response => response.json())
        .then(function (data) {
          
    
        }).catch(error => {
          console.log(error);
        }); 
     
    }
    
    if ( D > 0 ){
    
      if ( pruebas[i-1].cells[0].innerHTML.trim()  == "447" && D == 1 ){
            //se debe culminar automaticamente
            await fetch('/modulo/Execute/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:  "update t_cab_lab_serv_laboratorio set clasificacion='D',tar_ate=" + ded +  ", fecha_coordinada =  current_date, fecha_proceso = current_date, estado = '3', hora_proceso = current_time,usu_coordinada = '" + document.getElementById('usuario').value.trim() + "' WHERE cod_serv_laboratorio='" + document.getElementById('Txt_cod_serv_laboratorio').value.trim()  + "'"
              })
            }).then(response => response.json())
              .then(function (data) {
                
          
              }).catch(error => {
                console.log(error);
              }); 
           
          }
            
            
      }else{
        await fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query:  "update t_cab_lab_serv_laboratorio set clasificacion='D',tar_ate=" + ded +  " WHERE cod_serv_laboratorio='" + document.getElementById('Txt_cod_serv_laboratorio').value.trim()  + "'"
          })
        }).then(response => response.json())
          .then(function (data) {
            
      
          }).catch(error => {
            console.log(error);
          }); 
       }
    }
    
    
    if (R > 0 ){
      if ( R > 0 && T == 0 && H == 0 ){
        await fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query:  "update t_cab_lab_serv_laboratorio set clasificacion='D',tar_ate=" + ded + " where cod_serv_laboratorio='"  + document.getElementById('Txt_cod_serv_laboratorio').value.trim() + "'"
          })
        }).then(response => response.json())
          .then(function (data) {
            
      
          }).catch(error => {
            console.log(error);
          });      
        
       }else if ( R > 0 && (T > 0 || H > 0)){
           cabecera_serv_laboratorio();
       }
        
        /* For fila = 1 To Grid_destino.rows - 1
            clasificacion_p = Grid_destino.TextMatrix(fila, 3)
            If clasificacion_p = "R" Then
                G_db.Execute "INSERT INTO t_det_lab_serv_laboratorio(cod_pruebas, cod_serv_laboratorio, descripcion,precio,clasificacion) VALUES ('" & _
                Grid_destino.TextMatrix(fila, 0) & "', '" & Val(Txt_cod_serv_laboratorio.Text) & "', '" & Grid_destino.TextMatrix(fila, 1) & "','" & Grid_destino.TextMatrix(fila, 2) & "', '" & Grid_destino.TextMatrix(fila, 3) & "' )"
            End If
        Next fila */
        
        if ( R > 0 && (T > 0 || H > 0) ){
           // G_db.Execute "update t_cab_lab_serv_laboratorio set clasificacion='R',tar_ate=" & ded_r & "  where cod_serv_laboratorio='" & Trim(Txt_cod_serv_laboratorio.Text) & "'"
        }
  }
    
    
  if ( H > 0 ){
        if ( H > 0 && T == 0 && R == 0 ){
           // G_db.Execute "update t_cab_lab_serv_laboratorio set clasificacion='H',tar_ate=" & ded_h & " where cod_serv_laboratorio='" & Trim(Txt_cod_serv_laboratorio.Text) & "'"
        
         }else if( H > 0 && (T > 0 || R > 0)){
              cabecera_serv_laboratorio();
         }
        
     /*    For fila = 1 To Grid_destino.rows - 1
            clasificacion_p = Grid_destino.TextMatrix(fila, 3)
            If clasificacion_p = "H" Then
                G_db.Execute "INSERT INTO t_det_lab_serv_laboratorio(cod_pruebas, cod_serv_laboratorio, descripcion,precio,clasificacion) VALUES ('" & _
                Grid_destino.TextMatrix(fila, 0) & "', '" & Val(Txt_cod_serv_laboratorio.Text) & "', '" & Grid_destino.TextMatrix(fila, 1) & "','" & Grid_destino.TextMatrix(fila, 2) & "', '" & Grid_destino.TextMatrix(fila, 3) & "' )"
            End If
        Next fila */
        
        if ( H > 0 && (T > 0 || R > 0) ){
           // G_db.Execute "update t_cab_lab_serv_laboratorio set clasificacion='H',tar_ate=" & ded_h & "  where cod_serv_laboratorio='" & Trim(Txt_cod_serv_laboratorio.Text) & "'"
        }
  }
    
    
    
    //inicio de auditoria
      //REGISTRA_AUDITORIA_LABORATORIO("0", "CREACION DE LABORATORIO", "PRUEBAS: SE ASIGNARON " & T & " DE TOMA Y " & R & " DE RECOJO", Val(Txt_cod_serv_laboratorio.Text))
    //fin de auditoria
          
    alert("Se creo correctamente el Servicio numero : " + document.getElementById('Txt_cod_serv_laboratorio').value);
    
    document.getelementById('CmdFiltrar_Click').click();
 
   
}
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

async function cabecera_serv_laboratorio() {
  var cod_ate;
  if (ANvienede == "FRMLABOCONATE") {
    cod_ate = Trim(Txt_CodAte.Text);
  } else if (ANvienede = "FRMLABOSINATE") {
    //cod_ate = ANCODATE;
  }

  var cod_aso = document.getElementById('txt_CodAso').value;
  var cod_clasif =  document.getElementById('Txt_codclasificacion').value;  


  var cod_subclasif = Null;

  var cod_gru = document.getElementById('Txt_codgru').value;    
  var cod_doc = document.getElementById('Txt_Cod_doc').value;   //    IIf(IsNull(Txt_Cod_doc.Text), "", Trim(Txt_Cod_doc.Text))
  var cod_dis =  document.getElementById('Txt_Coddis').value;   //IIf(IsNull(Txt_Coddis.Text), "", Trim(Txt_Coddis.Text))
  var cod_tit =  document.getElementById('Txt_CodTit').value;  // IIf(IsNull(Txt_CodTit.Text), "", Trim(Txt_CodTit.Text))
  var cod_servicios =  document.getElementById('txt_codservicio').value;  //  IIf(IsNull(txt_codservicio.Text), "", Trim(txt_codservicio.Text))
  var ll_cod_dir = document.getElementById('Txt_Cod_Dir').value;    //IIf(IsNull(Txt_Cod_Dir.Text), "", Trim(Txt_Cod_Dir.Text))

  var cod_dir = ll_cod_dir // (ll_cod_dir, "00")
  var cod_laboratorios = null;
  var NOM_USU =  document.getElementById('usuario').value;
  var nom_pac =  document.getElementById('TxtNomPac').value;  
  var edad_pac =  document.getElementById('Txt_Edad').value;  
  var Cbo_Tipo =  document.getElementById('Txt_Edad').value; 
  var Correlativo_Serv_Laboratorio;
  const response = await fetch('/gestionlaboratorio/Correlativo_Serv_Laboratorio/');
  
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
  
    const movies = await response.json();
    movies.then(data => {
      Correlativo_Serv_Laboratorio = data;
    }).catch(error => {
      error.message; // 'An error has occurred: 404'
    });


    var today = new Date();
    
  if (Cbo_Tipo == "INMEDIATA") {
    tipo = "I"
    var fecha_creacion = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    var hora_creacion = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
    var fecha_servicio = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    var fecha_maxima = null;

  } else if (Cbo_Tipo == "PROGRAMADA" || Cbo_Tipo == "CONGELACIONES")
    tipo = "P"
  var fecha_creacion = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
  var hora_creacion = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
   var fecha_maxima;
  if (ANvienede = "FRMLABOCONATE") {
    fecha_servicio =  today.addDays(15);    
    const response2 = await fetch('/gestionlaboratorio/t_tmp_cab_lab/');// "SELECT fec_ate-2 as fecha2,cm_estado,cod_ate_previa,clasificacion_pac FROM t_tmpllamadas WHERE cod_ate = '" & Trim(Txt_CodAte.Text) & "' ")
    if (!response2.ok) {
      const message = `An error has occured: ${response2.status}`;
      throw new Error(message);
    }          
    const movies = await response2.json();
    movies.then(data => {
      if (data ){
        if ( data.cm_estado == "8") {
          ///busca la atencion futura por que la actual esta finalizada
          //solo se cumple para maxisalud y cronicos
          //If (t_tmpllamadas!clasificacion_pac = 1 Or t_tmpllamadas!clasificacion_pac = 2) Then
               
    
          const response3 =   fetch('/gestionlaboratorio/t_tmp_lab/');
          if (!response3.ok) {
            const message = `An error has occured: ${response3.status}`;
            throw new Error(message);
          }          
          const movies =   response3.json();
          movies.then(data => {
            if (data ){
               fecha_maxima =    today.addDays(15);  
            }else{
               fecha_maxima =data[0].fecha_ate;
            }
          }).catch(error => {
            console(error.message); // 'An error has occurred: 404'
          });
               
          }else{
           //la atencion no esta finalizada
             fecha_maxima = data[0].fecha2;
          }
      } 

     
       }).catch(error => {
            console(error.message); // 'An error has occurred: 404'
          });
     
  } else if (ANvienede = "FRMLABOSINATE") {
    fecha_servicio = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    fecha_maxima = null;
  }

 

var hora_creacion = Format(Time, "HH:mm")

var fecha_coordinada = Null;
var fecha_proceso = Null;
var fecha_estimada_resultado = Null;
var fecha_comunicacion_pacdoctor = Null;
var fecha_cierre = Null;
var estado = "0";
var FLAGMONE, CAMBIO;
//FORMA DE PAGO
var Cbo_Moneda = '';
if (Cbo_Moneda == "S/.") {
  FLAGMONE = "S";
  CAMBIO = 0;
} else {
  FLAGMONE = "D";
  CAMBIO = lsg_cambio;
}
var Cbo_forma_pago  , for_ate ,Cbo_moneda_den,cm_moneda_den,cm_den_cambio,cm_denominacion,cm_autorizado
switch (Cbo_forma_pago) {
  case "":
    for_ate = ""
    break;
  case "EFECTIVO":
     for_ate = "E"
    if (Cbo_moneda_den.Text = "S/.") {
      cm_moneda_den = "S"
      cm_den_cambio = 0
    }else{
     cm_moneda_den = "D"
     cm_den_cambio = lsg_cambio
    }
     cm_denominacion = Cbo_Denominacion.Text
    break;
  case "CREDITO":
    for_ate = "C"
    cm_autorizado = Txt_autorizado.Text
    break;
  case "TARJETA":
    for_ate = "T"
    CODTAR_ATE = TxtNroTar.Text
    NTAR_ATE = Mid(ME_tarjeta.Text & Space(16 - Len(ME_tarjeta.Text)), 9, 8)
    if (Txt_anio_credito  != "" && Txt_mes_credito != "") {
    FVENC_ATE = Txt_anio_credito.Text + "/" + Txt_mes_credito.Text +  "/"  +  "01"
    }
    break;
  case "TRANSFERENCIA":
    for_ate = "F"
}
var tipo = tipo
var clasificacion = Null
var coaseguro = Trim(txt_coa.Text)
var contacto_confirmacion = Null
var nombre_tecnico = Null
var telefono_tecnico = Null
var hora_coordinada = Null

var medio_comunicacion = Null
var confirmacion = Null
var cont_correo_canc = "0"
var observacion = Trim(Txt_observacion.Text)
var num_oa
//ls_codigo_servlab = Val(Correlativo_Serv_Laboratorio)
Txt_cod_serv_laboratorio.Text = Val(Correlativo_Serv_Laboratorio)
var cod_serv_laboratorio = Val(Txt_cod_serv_laboratorio.Text)
Txt_peticion
if (Txt_peticion != "") {
  num_oa = Val(Txt_peticion.Text)
}

//.Update
   
 


}







function agregarsnc(val) {
  
  var codigo = document.getElementById('codigo_snc').value.trim();
  var tiposervicio = document.getElementById('tiposervicio').value.trim();
  var descripcion = document.getElementById('descripcion').value.trim();
  var tipo = document.getElementById('tipo').value.trim();
  var tiposeguimiento = document.getElementById('tiposeguimiento').value.trim();
  //var tipo_medico= (document.getElementById('tipo_medico').value.trim()=='0'?null:document.getElementById('tipo_medico').value.trim());
  //var umbral = (document.getElementById('umbral').value.trim()==''?null:document.getElementById('umbral').value.trim());
  //var tiempo_atencion = (document.getElementById('tiempo_atencion').value.trim()==''?null:document.getElementById('tiempo_atencion').value.trim());
  
   if (codigo == '' || tiposervicio == '0' || descripcion == '' || tipo == '0'|| tiposeguimiento == '0') {
    alert('Ingresar datos');
    return;
  }

   
  fetch('/gestionlaboratorio/agregarsnc', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      codigo: codigo,
      tiposervicio: tiposervicio,
      descripcion: descripcion,
      tipo: tipo,
      tiposeguimiento:tiposeguimiento,
      tipo_medico:tipo_medico,
      umbral:umbral,
      tiempo_atencion:tiempo_atencion

    })
  }).then(response => response.json())
    .then(function (data) {

      alert('insertado');
      window.location.reload();

    }).catch(error => {
      alert(error);
      console.log(error);

    });


}

 async function actualizarprueba_click(val){
  
  var prueba = {};
  prueba.cod_pruebas = val.parentElement.parentElement.cells[0].innerHTML.trim();
  prueba.id = 'cod_pruebas';
  prueba.des_prueba = val.parentElement.parentElement.cells[2].children[0].value.trim();
  prueba.unidad = val.parentElement.parentElement.cells[3].children[0].value.trim();
  prueba.auditoria =  'S';
  prueba.tabla = 'm_lab_pruebas';

  var manalisis = {};
  manalisis.cod_ana = val.parentElement.parentElement.cells[1].children[0].value.trim();
  manalisis.nom_ana = val.parentElement.parentElement.cells[2].children[0].value.trim();
  manalisis.id = 'cod_ana';
  manalisis.unidad = val.parentElement.parentElement.cells[3].children[0].value.trim();
  manalisis.tabla = 'm_analisis';
   fetch('/modulo/Executeupdate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      prueba
    )
  }).then(response => response.json())
    .then(function (data) {

      alert('prueba actualizada');
      fetch('/modulo/Executeupdate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          manalisis
        )
      }).then(response => response.json())
        .then(function (data) {
    
          alert('analisis actualizado');
          window.location.reload();
    
        }).catch(error => {
          alert(error);
          console.log(error);
    
        });

    }).catch(error => {
      alert(error);
      console.log(error);

    });
   

}
 
async function actualizarflebotomista_click(val){
  
  var flebotomista = {};
  var proveedores = '';
  flebotomista.cod_flebotomista = val.parentElement.parentElement.cells[0].children[0].value.trim();
  flebotomista.id = 'cod_flebotomista';
  flebotomista.nom_flebotomista = val.parentElement.parentElement.cells[1].children[0].value.trim();
  flebotomista.tlf_flebotomista = val.parentElement.parentElement.cells[2].children[0].value.trim();
  var apellido = flebotomista.nom_flebotomista.split(" ", 1);
  flebotomista.appat_flebotomista =   apellido[0];
  
   proveedor =val.parentElement.parentElement.cells[3].children[0];
  for (var i = 0; i < proveedor.options.length; i++) {
      if(proveedor.options[i].selected ==true){              
        proveedores += proveedor.options[i].value + ',';
        }
    }
    if (proveedores !=''){
      proveedores = proveedores.slice(0,-1);
      proveedores = '{' + proveedores + '}';
    }
   flebotomista.cod_prov_flebotomista = (proveedores==''?null:proveedores);
  flebotomista.activo = val.parentElement.parentElement.cells[4].children[0].checked;

  flebotomista.auditoria =  'S';
  flebotomista.tabla = 'm_flebotomista';
 
   fetch('/modulo/Executeupdate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      flebotomista
    )
  }).then(response => response.json())
    .then(function (data) {

      alert('flebotomista actualizado');
      location.reload();


    }).catch(error => {
      alert(error);
      console.log(error);

    });
    
}

function actualizarsnc_click(val){
  var flg_medico_tratante =  val.parentElement.parentElement.cells[6].children[0].checked;

  var snc = {};
  snc.des_snc = val.parentElement.parentElement.cells[3].children[0].value.trim();
  snc.cod_snc = val.parentElement.parentElement.cells[0].innerHTML.trim();
  snc.tip_serv = val.parentElement.parentElement.cells[2].children[0].value.trim();
  snc.tipo = val.parentElement.parentElement.cells[4].children[0].value.trim();
  snc.tipo_seg = val.parentElement.parentElement.cells[5].children[0].value.trim();
  snc.tiempo_atencion = val.parentElement.parentElement.cells[7].children[0].value.trim();
  snc.umbral = val.parentElement.parentElement.cells[8].children[0].value.trim();

  if (flg_medico_tratante == true){
    snc.tiempo_atencion_tratante = val.parentElement.parentElement.cells[9].children[0].value.trim();
    snc.umbral_tratante = val.parentElement.parentElement.cells[10].children[0].value.trim(); 
  }else{
    snc.tiempo_atencion_tratante = 0;
    snc.umbral_tratante = 0;
  }
  snc.diasohoras = val.parentElement.parentElement.cells[11].children[0].value;
 // snc.tipo_medico = (val.parentElement.parentElement.cells[6].children[0].value=='0')?null:val.parentElement.parentElement.cells[6].children[0].value;
  //snc.umbral = (val.parentElement.parentElement.cells[7].children[0].value.trim()=='')?null:val.parentElement.parentElement.cells[7].children[0].value.trim();
  //snc.tiempo_atencion =  (val.parentElement.parentElement.cells[8].children[0].value.trim()=='')?null:val.parentElement.parentElement.cells[7].children[0].value.trim();

  snc.activi = (val.parentElement.parentElement.cells[12].children[0].checked)?1:0;

  snc.id = 'cod_snc';
  
  snc.tabla = 'm_servnoconforme';
   
  
   fetch('/modulo/Executeupdate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      snc
    )
  }).then(response => response.json())
    .then(function (data) {

      alert('snc actualizado');
      

    }).catch(error => {
      alert(error);
      console.log(error);

    });
   

}

function changetiposervicio(a){

    var tiposeguimiento = document.getElementById('tiposeguimiento').value ;
    if ((a=='Adm'|| a=='Act' || a == 'PsS') &&  tiposeguimiento == 'INCIDENCIA'){
      document.getElementById('tipo_medico').style.display = 'inline-block';
    }else{
      document.getElementById('tipo_medico').style.display = 'none';
      document.getElementById('umbral').style.display = 'none';
      document.getElementById('tiempo_atencion').style.display = 'none';
    }
} 

 function change_flg_medico(a){
 
  if(a.checked){
    a.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.display = 'inline-block';
    a.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.display = 'inline-block';
//    a.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.display = 'inline-block';

  }else{
    a.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.display = 'none';
    a.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.display = 'none';
  //  a.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.display = 'none';


  }
 }