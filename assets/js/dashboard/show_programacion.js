var cod_doc;
  $(document).ready(()=>{ 
          
      if(document.getElementById('selectedFile')!=null){
        document.getElementById('selectedFile').addEventListener('change', handleFileSelect, false);
        document.getElementById('selectedFile').addEventListener('click', limpiarfile, false);
       
       }  
   if (document.getElementById('test3')) {
    document.querySelector(".container-fluid").style.gridTemplateColumns = "1fr 2fr 3fr 5fr";

       if( Object.keys($('#test3').scheduler('val')).length === 0){
        $('#actualizar').attr('type', 'hidden');
        $('#eliminar_turnos').attr('type', 'hidden');
       }else{
        $('#agendar').attr('type', 'hidden'); 
       }   
       
    }else{
    
      
    }
    
    if(document.getElementById('generarambulancia')){   
      document.getElementById('generarambulancia').addEventListener('click',function() {
        
        printModal(`
        <div id="ed-modal-contentheader"  style="color: white;background:blue;display:flex;justify-content:space-between;"><h4> INGRESO AMBULANCIA</h4><div  id="estadoprog"></div> <button type="button" disabled id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>
     
       
      <div  style="display: grid;grid-template-columns:  1fr 2fr;">
         
     
        
       Fec. asignacion
      <input   style="width:150px" type="date" id="fec_asignacion" name="fec_asignacion" value="2020-06-03"> 
      Turno
      <select   name="turnodetalle" style="width:150px" id="turnodetalle">
      <option value="0">MAÑANA</option>
      <option value="1">TARDE</option>
      <option value="2">MADRUGADA</option>
      </select>
      Horini            <div style="display:flex; ">
      <input    type="time" id="horini" style="width:150px"  value="06:00" name="horini">
Dias
      <input   type = "number" name="dias" id="dias" />
      </div>
      Horfin
      <input    type="time" id="horfin" style="width:150px"     value="15:00" name="horfin">
      
      <label>Observaciones</label>
      <textarea  style="text-transform:uppercase" id="des_doc" name="des_doc" rows="2" cols="30"></textarea>
       
       
      <label>Empresa</label>
      <select   name="proveedor" style="width:170px" id="proveedor"  ">
      <option value="0" selected="selected">Seleccione</option>
      </select>
      </div>
        
       
      <div style="display:flex;justify-content:center;">
       
           <div style ="display:inline" id="guardar_programacion">      </div>

        
      
          <button type="button" disabled id="generarambulanciamodal" class="btn-xs btn-primary" onclick="generarambulancia();" >Generar</button>
      
      
      </div>`);
      dragElement(document.getElementById("ed-modal-content"));
      
      
      (async () => {
      try
      {
        let alls = await Promise.all([
          fetch(`/programacion/get_doctoresxambulancia`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
           
            })
          }) 
       
        ]) ;
          let response2_json = await alls[0].json();
          document.getElementById('proveedor').innerHTML = listOfNamesdr(response2_json);
         
        
         document.getElementById("generarambulanciamodal").disabled = false;
         document.getElementById("cancelarconfirmacion").disabled = false;

       
       }
      catch(Error){
        document.getElementById("cancelarconfirmacion").disabled = false;

        console.error(Error);
      } 
      
      })()   
      
         
         
           var     today = new Date();
            var     day =  String(today.getDate()).padStart(2, '0');
           var     month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
           var     year = today.getFullYear();
           var formattedDate =     year + '-' + month + '-' + day
          
               $("#fec_asignacion").val(formattedDate);
                
                
               
       
      });
       }
     

 if(document.getElementById('agregarprogramacion')){   
document.getElementById('agregarprogramacion').addEventListener('click',function() {
  
  printModal(`
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h4> DETALLE DE HORARIO</h4><div  id="estadoprog"></div> <button type="button" disabled id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>
<fieldset id="datos_doctor">
<legend>Datos del doctor</legend>
 
<div  style="display: grid;grid-template-columns:  1fr 2fr;">
<input type = "hidden" id="codigoasignacionaconfirmar"  name="codigoasignacionaconfirmar"  >
Especialidad
<select name="especialidad" style="width:180px"   id="especialidad" onchange="cambioesp(this.value)">
<option value="005">PEDIATRA</option>
<option value="006,010">MEDICINA GENERAL</option>
<option value="001">CARDIOLOGIA</option>
<option value="011">ENDOCRONOLOGIA</option>
<option value="027">NEUMOLOGIA</option>
<option value="026">NUTRICIONISTA</option>
<option value="012,003,009">ESPECIALISTA</option>
</select>
<label>Clasificacion</label>
<select name="nom_clasif" style="width:120px" id="nom_clasif"  >
<option value="0" selected="selected">AGUDO</option>
<option value="1">CRONICO</option>
<option value="2">AUTO COVID</option>

</select>
Nombre del medico
 <select   name="medico" style="width:330px" id="medico" onchange="cambiomedico()">
</select>

Horini
<input    type="time" id="horini" style="width:120px" oninput="validateHhMmini(this.value);" value="00:00" name="horini">
Horfin
<input    type="time" id="horfin" style="width:120px"  oninput="validateHhMmfin(this.value);"  value="00:00" name="horfin">
</div>
</fieldset>

<fieldset  id="detalle_asignacion">
 <legend>Detalle Asignacion</legend>
<div  style="display: grid;grid-template-columns:  1fr 2fr;">
Botiquin 
<select   name="botiquin"   id="botiquin">

</select>
Fec. asignacion
<input    type="date" id="fec_asignacion" name="fec_asignacion" value="2020-06-03"> 
Turno
<select   name="turnodetalle" style="width:120px" id="turnodetalle">
<option value="0">MAÑANA</option>
<option value="1">TARDE</option>
<option value="2">MADRUGADA</option>
</select>
<label>Observación</label>
<textarea style="text-transform: uppercase;"  id="ind_doc" name="ind_doc" rows="2" cols="30"></textarea>

<label>Indicaciones del doctor</label>
<textarea style="text-transform: uppercase;"  id="des_doc" name="des_doc" rows="2" cols="30"></textarea>

<label>Lugar Recojo</label>
<div>
<input disabled type="input" style="width:280px"  id="recojo" name="recojo">
<input type="hidden" id="ubigeo_recojo" name="ubigeo_recojo">
<input   type="button"  class="btn btn btn-primary btn-sm" id="btndireccionesrecojo" readonly name="btndireccionesrecojo" value="..." onclick="direcciones('recojo')"> 
<div id="recojovalida"></div>
</div>
<label>Lugar Termino</label>
<div>
<input disabled type="input" id="termino" style="width:280px"  name="termino">
<input type="hidden" id="ubigeo_termino" name="ubigeo_termino">
<input   type="button" class="btn btn btn-primary btn-sm" id="btndireccionestermino" readonly name="btndireccionestermino" value="..." onclick="direcciones('termino')"> 
<div id="terminovalida"></div>
</div>
</div>
</fieldset>

<fieldset  id="datos_motorizado">
<legend>Datos del motorizado</legend>
 <div  style="display: grid;grid-template-columns:  1fr 2fr;">
<label>Empresa</label>
<select   name="proveedor" style="width:170px" id="proveedor"  onchange="cambioprov(this.value)">
<option value="0" selected="selected">Seleccione</option>
</select>
<label>Conductor</label>
<select   name="conductor" style="width:280px" id="conductor">
</select>
N° Tablet  
<select   name="tablet" style="width:170px" id="tablet">
</select>
N° Maletin
<select    id="maletin" name="maletin" style="width:170px"> 
</select>
<label>MPOS</label>
<select   name="mpos" style="width:50px" id="mpos">
<option value="0" selected="selected">NO</option>
<option value="1">SI</option>
</select>
Horini
<input disabled  type="time" id="horini_mot"   style="width:120px" value="00:00" name="horini_mot">
Horfin
<input  disabled  type="time" id="horfin_mot"  style="width:120px" value="00:00" name="horfin_mot">  
</div> 
</fieldset> 
 
<div style="display:flex;justify-content:space-between;">
 <div>
     <button type="button" disabled id="nuevodatosconfirmacion" class="btn-xs btn-success" onclick="nuevodatosconfirmacion();">Guardar</button>
    <div style ="display:inline" id="guardar_programacion"></div>
 </div>
  <div>

    <button type="button" disabled id="confirmardireccion" class="btn-xs btn-success" onclick="confirmardireccion();" >Confirmar</button>
    <button type="button" disabled id="desconfirmardireccion" class="btn-xs btn-danger" onclick="desconfirmardireccion();">Desconfirmar</button>

</div>

</div>`);
document.getElementById("botiquin").style.maxWidth = document.getElementById("medico").style.width ;
dragElement(document.getElementById("ed-modal-content"));

(async () => {
try
{
  let alls = await Promise.all([
    fetch(`/programacion/get_doctorxespecialidad`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cod_esp_sel: '005'
      })
    }),
    fetch('/programacion/get_botiquinxespecialidad/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cod_esp_sel: '005'
      })
    }),
     fetch(`/programacion/get_proveedores`)

  ]) ;
    let response2_json = await alls[0].json();
    document.getElementById('medico').innerHTML = listOfNamesdr(response2_json);
    cod_doc = document.getElementById('medico').value;
     let response3_json = await alls[1].json();
    document.getElementById('botiquin').innerHTML = listOfNamesbot(response3_json);
     let response4_json = await alls[2].json();
    document.getElementById('proveedor').innerHTML = listOfNamesprov(response4_json);

    let response5 = await fetch(`/programacion/get_conductores_proveedor/99`);
    let response5_json  = await response5.json();
     const data = await Promise.all([fetch(`/mantenimiento/gettablets/99`) ,  fetch(`/mantenimiento/getmaletines/99`) ])

   // let response6_json  = await response6.json();
    let datar1  =  await  data[0].json();
    let datar2  =  await   data[1].json();

  document.getElementById('conductor').innerHTML = '<option value="" selected disabled hidden>NINGUNO</option>\n'+listOfNamescond(response5_json);
  document.getElementById('tablet').innerHTML = listOfNamestablets(datar1);
  document.getElementById('maletin').innerHTML = listOfNamesmaletines(datar2);

  
  document.getElementById("nuevodatosconfirmacion").disabled = false;
  document.getElementById("cancelarconfirmacion").disabled = false;
  document.getElementById("confirmardireccion").disabled = false;

  document.getElementById("desconfirmardireccion").disabled = false;

 }
catch(Error){
  console.error(Error);
} 

})()   

   
     var     codigoasignacionaconfirmar = 22334;
  
     var     today = new Date();
      var     day =  String(today.getDate()).padStart(2, '0');
     var     month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var     year = today.getFullYear();
     var formattedDate =     year + '-' + month + '-' + day
    
         $("#fec_asignacion").val(formattedDate);
          
         $("#codigoasignacionaconfirmar").val(codigoasignacionaconfirmar);
         
        document.getElementById('estadoprog').innerHTML = 'NUEVO';
        
 
});
 }


$('#busquedaremisse').click(function() {
  $('#t02').html('<tr> <td colspan="15" style="border:none;"><div id="spinner" class="spinner"></div></td></tr>');

  var especialidades = [];
 $("input[name='especialidad']:checked").each(function ()
{
//Mediante la función push agregamos al arreglo los values de los checkbox
especialidades.push(($(this).attr("value")));
});
document.getElementById('validarbusquedaremisse').innerHTML = '';
document.getElementById('validarbusquedaremisse').style.color = "red";
document.getElementById('validarbusquedaremisse').style.fontWeight = "bold"; 
document.getElementById("resultado").innerHTML = '';
document.getElementById("resultado").style.color = "blue";
document.getElementById("resultado").style.fontWeight = "bold"; 

document.getElementById('spinner').style.display = 'block';
document.getElementById('lblCantidad').innerHTML = "Turnos:";
 
fetch('/programacion/busquedaHorarioremisse/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
   proveedor: cod_prov_motorizado_b,
   fec_inicial:$("#fec_inicial").val(),
   //fec_final:$("#fec_final").val(),
   filtroremisse:$("#filtroremisse").val()
  })
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Sucedio un error'))
}).then(async data => { 
  var html = '';
var i;
if(data.length==0){
  alert('no hay registros');
  document.getElementById('spinner').style.display = 'none';
  
}
for(i=0; i<data.length; i++){
  
   $('#conductor option:selected').removeAttr('selected');
  $("#conductor option[value='"+   ((data[i].login==null )?'0': data[i].login.trim() ) +"']").attr("selected", true);
  $('#mpos option:selected').removeAttr('selected');
   $("#mpos option[value='"+((data[i].con_mpos=='No')?'1':'2')+"']").attr("selected", true);
   $('#tablet option:selected').removeAttr('selected');
   $("#tablet option[value='"+((data[i].nro_tablet==null)?'0': data[i].nro_tablet)+"']").attr("selected", true);
   $('#maletin option:selected').removeAttr('selected');
   $("#maletin option[value='"+((data[i].nro_maletin==null)?'0': data[i].nro_maletin)+"']").attr("selected", true);
   var botiquinesxesp = await fetch('/programacion/get_botiquinxespecialidad/',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_esp_sel: data[i].cod_esp
    })
  });   // make a 2nd request and return a promise
   let rptaboti  = await botiquinesxesp.json();

     document.getElementById('botiquin').innerHTML = listOfNamesbot(rptaboti);
     $('#botiquin option:selected').removeAttr('selected');
            $("#botiquin option[value='"+data[i].botiquin+"']").attr("selected", true);
    html +=  '<tr   style ="cursor: pointer;"  id="'+data[i].codigo+'">'+
     
        '<td>'+data[i].codigo + '</td>'+
        '<td>'+data[i].doctor+'</td>'+
        '<td>'+data[i].clasificacion+'</td>'+
        '<td>'+data[i].turno+'</td>'+
        '<td>'+(data[i].lugar_recojo==null?'':data[i].lugar_recojo)+'</td>'+
        '<td>'+(data[i].lugar_termino==null?'':data[i].lugar_termino)+'</td>'+
         '<td>'+data[i].fecha+'</td>'+
        '<td>'+data[i].horini+'</td>'+
        '<td>'+data[i].horfin+'</td>'+
        '<td><select>'+ $("#conductor").html()+'</select></td>'+ //onchange="cambiarconductor(this);" despues lo borrare
        
        '<td><select>'+ $("#mpos").html()+'</select></td>'+   //data[i].con_mpos
        '<td><select>'+ $("#botiquin").html()+'</select></td>'+           //data[i].botiquin
        //'<td><input type="input" id="tabletremisse" name="tabletremisse" value="'+(data[i].nro_tablet==null?'':data[i].nro_tablet)+'"></td>'+     
        '<td><select>'+ $("#tablet").html()+'</select></td>'+    
        '<td><select>'+ $("#maletin").html()+'</select></td>'+    
       // '<td><input type="input" id="nro_maletin" name="nro_maletin" value="' +(data[i].nro_maletin==null?'':data[i].nro_maletin) +'"></td>'+
        '<td style="display:none;">'+(data[i].cod_doc).trim()+'</td>'+
        //'<td><input type="button" id="guardar_conductor" name="guardar_conductor" value="Guardar" onclick ="guardar_conductor"></td>'+
        '<td  >'+(data[i].nom_esp).trim()+'</td>'+
    
        '</tr>'; 
 
    

    }
    document.getElementById('lblCantidad').innerHTML = "Turnos: " + data.length;
    $('#t02').html('<tr> <td colspan="15" style="border:none;"><div id="spinner" class="spinner"></div></td></tr>'+html);
   // document.getElementById('spinner').style.padding = "0px";
    document.getElementById('spinner').parentElement.style.display = 'none';

    }).catch(error => {
      document.getElementById('validarbusquedaremisse').innerHTML = error;
      document.getElementById('validarbusquedaremisse').style.color = "red";
      document.getElementById('validarbusquedaremisse').style.fontWeight = "bold";
      document.getElementById('spinner').style.display = 'none';
 
      console.log(error);    
    })
 

});  
 

$('#cancelarprogramacion').click(function() {
   
  codigocancelar   = []; 
  $('#tabla1 tbody tr').each(function() {
  var tr0;
  tr0 =  $(this);
      if(tr0[0].cells[0].firstChild.nextSibling.checked == true) {
        codigocancelar.push(tr0[0].cells[1].children[0].innerHTML); 
      };
  });
  if(codigocancelar.length == 0){
    alert('Seleccionar programaciones');   
return;
  }else{
    var r = confirm("Desea cancelar las programaciones?");
  if (r == true) {
     
  } else {
     return;
  } 
    document.body.style.cursor = 'progress'
  }

    fetch('/programacion/cancelarprogramacion/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      codigocancelar: codigocancelar
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Sucedio un error'))
    }).then( data => {
          
          document.body.style.cursor = 'default'
          if(data=='1'){
            alert('Se cancelo las programaciones');
            document.getElementById("busqueda").click();
          }else{
            alert('No se cancelo las programaciones');
          }
    }).catch(error => {
        alert("Error.No se pudo cancelar las programaciones");
          console.log(error);    
    })

});  


$('#busquedaproveedor').click(function() {
  var especialidades = [];
 $("input[name='especialidad']:checked").each(function ()
{
//Mediante la función push agregamos al arreglo los values de los checkbox
especialidades.push(($(this).attr("value")));

});
if(especialidades.length == 0){
  document.getElementById("resultado").innerHTML = "No selecciono la especialidad"; 

  return;
}else{
  document.getElementById("resultado").innerHTML = ""; 
  $('#t02').html("");
  $('#cant').html("0" ); 
}
 
  $.ajax({
      method:'POST',
      contentType:'application/json',
           
      dataType:'json',
      url : '/programacion/busquedaHorarioProveedor',   
    
      data: "{\"codEspecialidades\":"+JSON.stringify(especialidades) +",\"estado\":"+ JSON.stringify($("#estado").val())  +",\"nom_proveedor\":"+ JSON.stringify(nom_prov_motorizado_b )   +",\"turno\":"+  JSON.stringify($("#turno").val())  +",\"clasif\":"+ JSON.stringify( $("#clasif").val())   +",\"fec_inicial\":"+  JSON.stringify($("#fec_inicial").val() )  +",\"fec_final\":"+ JSON.stringify($("#fec_final").val()) +",\"nom_doc\":"+ JSON.stringify($('#nom_doc_prov').val().trim())   +"}" ,
       //data:  JSON.stringify($('#test3').scheduler('val')) ,    
      success:function(data) {                     
        
        var html = '';
        var i;
        for(i=0; i<data.length; i++){

          html +=  '<tr ' + (data[i].cod_mot==null||data[i].cod_mot.trim()==''?'':'style ="cursor: pointer;background-color:#ffffbf" ')+ ' style ="cursor: pointer;" id="'+data[i].codigo+'" ondblclick=modalconfirmacion(this);>'+
          '<td onclick="event.stopPropagation(); "> <input id=' + i + ' type="checkbox" name="d"   value=""></td>'+
              '<td><div>'+data[i].codigo + '</div></td>'+
              '<td><div>'+data[i].doctor+'</div></td>'+
              '<td><div>'+data[i].nacionalidad+'</div></td>'+
              '<td><div>'+data[i].edad+'</div></td>'+
              '<td><div>'+data[i].turno+'</div></td>'+
              '<td><div>'+(data[i].botiquin==null?'':data[i].botiquin)+'</div></td>'+
              '<td><div>'+data[i].clasificacion+'</div></td>'+
              '<td><div>'+data[i].especialidad+'</div></td>'+
              '<td><div>'+data[i].descripcion+'</div></td>'+
              '<td><div>'+data[i].fecha+'</div></td>'+
              '<td><div>'+data[i].horini+'</div></td>'+
              '<td><div>'+data[i].horfin+'</div></td>'+
              '<td><div>'+(data[i].conductor==null?'':data[i].conductor)+'</div></td>'+
              '<td style="display:none;"></div></td>'+
              '<td><div>'+data[i].con_mpos+'</div></td>'+
              '<td><div>'+data[i].hor_ini+'</div></td>'+
              '<td><div>'+data[i].hor_fin+'</div></td>'+
              '<td><div>'+ ( data[i].estado == '0' ? 'Registrado' :
              data[i].estado == '1' ? 'Sin confirmar' :
              data[i].estado == '2' ? 'Confirmado' :
                                     'Sin estado') + '</div></td>'+
              '<td><div>'+data[i].cod_doc+'</td>'+
              '<td><div>'+(data[i].cod_mot==null?'':data[i].cod_mot)+'</div></td>'+
              '<td><div>'+(data[i].nro_tablet==null?'':data[i].nro_tablet)+'</div></td>'+
              '<td><div>'+(data[i].nro_maletin==null?'':data[i].nro_maletin)+'</div></td>'+
              '<td style="display:none;">'+data[i].medico_email+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_esp+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_recojo==null?'':data[i].lugar_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_termino==null?'':data[i].lugar_termino)+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_prov_motorizado+'</div></td>'+
              '<td><div>'+ (data[i].flg_sms=='t'?'Si':'No')+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_recojo==null?'':data[i].ubigeo_dist_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_termino==null?'':data[i].ubigeo_dist_termino)+'</div></td>'+
              '</tr>';
        }
       $('#t02').html(html);
      $('#cant').html(data.length );  
      document.getElementById("resultado").innerHTML = ""; 
    
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
        console.log("Error en la llamada AJAX");
        console.log("Estado: " + textStatus);
        console.log("Error: " + errorThrown);
        console.log("Error: " + JSON.stringify(nom_prov_motorizado_b ));
        
      }
  });
}); 
//Removido por el RQ ADICION DE ESPECIALIDADES MAD 
$('#busqueda').click(function() {
  var especialidades = [];
 $("input[name='especialidad']:checked").each(function ()
{
//Mediante la función push agregamos al arreglo los values de los checkbox
especialidades.push(($(this).attr("value")));

});
if(especialidades.length == 0){
  document.getElementById("resultado").innerHTML = "No selecciono la especialidad"; 

  return;
}else{
  document.getElementById("resultado").innerHTML = ""; 
  $('#t02').html("");
  $('#cant').html("0" ); 
}

 
  $.ajax({
      method:'POST',
      contentType:'application/json',
           
      dataType:'json',
      url : '/programacion/busquedaHorario',   
      data: "{\"codEspecialidades\":"+JSON.stringify(especialidades) +",\"estado\":"+ JSON.stringify($("#estado").val())   +",\"turno\":"+  JSON.stringify($("#turno").val())  +",\"clasif\":"+ JSON.stringify( $("#clasif").val())   +",\"fec_inicial\":"+  JSON.stringify($("#fec_inicial").val() )  +",\"fec_final\":"+ JSON.stringify($("#fec_final").val()) +",\"nom_doc\":"+ JSON.stringify($('#nom_doc').val().trim())+",\"proveedor\":"+ JSON.stringify($('#idproveedor').val().toString().trim())  +"}" ,

       //data:  JSON.stringify($('#test3').scheduler('val')) ,
      success:function(data) {                     
        
        var html = '';
        var i;
        for(i=0; i<data.length; i++){

          html +=  '<tr ' + (data[i].cod_mot==null||data[i].cod_mot.trim()==''?'':'style =" background-color:#ffffbf" ')+ ' id="'+data[i].codigo+'" ondblclick=modalconfirmacion(this);>'+
          '<td onclick="event.stopPropagation(); "> <input id=' + i + ' type="checkbox" name="d"   value=""></td>'+
              '<td><div>'+data[i].codigo + '</div></td>'+
              '<td><div>'+data[i].doctor+'</div></td>'+
              '<td><div>'+data[i].nacionalidad+'</div></td>'+
              '<td><div>'+data[i].edad+'</div></td>'+
              '<td><div>'+data[i].turno+'</div></td>'+
              '<td><div>'+(data[i].botiquin==null?'':data[i].botiquin)+'</div></td>'+
              '<td><div>'+data[i].clasificacion+'</div></td>'+
              '<td><div>'+data[i].especialidad+'</div></td>'+
              '<td><div>'+data[i].descripcion+'</div></td>'+
              '<td><div>'+data[i].fecha+'</div></td>'+
              '<td><div>'+data[i].horini+'</div></td>'+
              '<td><div>'+data[i].horfin+'</div></td>'+
              '<td><div>'+(data[i].conductor==null?'':data[i].conductor)+'</div></td>'+
              '<td><div>'+(data[i].nom_motorizado==null?'':data[i].nom_motorizado)+'</div></td>'+
              '<td><div>'+data[i].con_mpos+'</div></td>'+
              '<td><div>'+data[i].hor_ini+'</div></td>'+
              '<td><div>'+data[i].hor_fin+'</div></td>'+
              '<td><div>'+ ( data[i].estado == '0' ? 'Registrado' :
              data[i].estado == '1' ? 'Sin confirmar' :
              data[i].estado == '2' ? 'Confirmado' :
                                     'Sin estado') + '</div></td>'+
              '<td><div>'+data[i].cod_doc+'</div></td>'+
              '<td><div>'+(data[i].cod_mot==null?'':data[i].cod_mot)+'</div></td>'+
              '<td><div>'+(data[i].nro_tablet==null?'':data[i].nro_tablet)+'</div></td>'+
              '<td><div>'+(data[i].nro_maletin==null?'':data[i].nro_maletin)+'</div></td>'+
              '<td style="display:none;">'+data[i].medico_email+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_esp+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_recojo==null?'':data[i].lugar_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_termino==null?'':data[i].lugar_termino)+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_prov_motorizado+'</div></td>'+
              '<td><div>'+ (data[i].flg_sms=='t'?'Si':'No')+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_recojo==null?'':data[i].ubigeo_dist_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_termino==null?'':data[i].ubigeo_dist_termino)+'</div></td>'+
              '<td><div>'+(data[i].ind_doc==null?'':data[i].ind_doc)+'</div></td>'+
              '</tr>';
        }
       $('#t02').html(html);
      $('#cant').html(data.length );  
      document.getElementById("resultado").innerHTML = ""; 
    
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
      }
  });
}); 

$('#seguimiento').click(function() {
  
  var cod_asig = [];
   $("#tabla1 input[type=checkbox]:checked").each(function(){
   cod_asig.push($(this).closest('td').next().text());
  });
  var found = cod_asig.find(element => element.length != 0);
 
    $.ajax({
      method:'POST',
      contentType:'application/json',
           
      dataType:'json',
      url : '/programacion/seguimiento',   
      data: "{\"cod_asig\":"+ JSON.stringify(found)  +"}" ,
      success:function(data) {                     
        printModal(`<div id="ed-modal-contentheader"  style="color: white;background:#084d6e;display:flex;justify-content:space-between;"><h4>Seguimiento</h4>
        <button type="button" class="cancelarmodal btn-xs btn-danger">X</button></div>
        <div  style = "height:90vh; overflow-y:scroll;">
        <table id="table_seguimiento">
        <thead  id="table_seguimiento_thead" style="color: white;background:#084d6e;">
            <tr>
              <th>COD_ASIG</th>
              <th>USUARIO</th>
              <th>EVENTO</th>
              <th>REGISTRO</th>
              <th style="white-space: nowrap;">FECHA</th>
              <th>HORA</th>
            </tr>
        </thead>
        <tbody id="t_seguimiento"></tbody>
        <tfoot>
         </tfoot>
           </table></div>`);
document.getElementById('ed-modal-content').style.maxWidth  = "70vw";
        var html = '';
        var i;
        for(i=0; i<data.length; i++){

          html +=  '<tr>'+
              '<td>'+data[i].cod_asig + '</td>'+
              '<td>'+data[i].usuario+'</td>'+
              '<td>'+data[i].evento+'</td>'+
              '<td>'+data[i].registro+'</td>'+
              '<td>'+data[i].fecha+'</td>'+
              '<td>'+data[i].hora+'</td>'+
              '</tr>';
        }
      $('#t_seguimiento').html(html);
 
       },
      error: function (jqXHR, textStatus, errorThrown)
      {
        console.log(errorThrown);
        
      }
  });
}); 

$('#nom_doc').keyup(function() {
    
  var especialidades = [];
 $("input[name='especialidad']:checked").each(function ()
{
//Mediante la función push agregamos al arreglo los values de los checkbox
especialidades.push(($(this).attr("value")));
});
if(especialidades.length == 0){
  document.getElementById("resultado").innerHTML = "No selecciono la especialidad"; 

  return;
}else{
  document.getElementById("resultado").innerHTML = ""; 

}
  

  $.ajax({
      method:'POST',
      contentType:'application/json',
           
      dataType:'json',
      url : '/programacion/busquedaHorario',   
    
      data: "{\"codEspecialidades\":"+JSON.stringify(especialidades) +",\"estado\":"+ JSON.stringify($("#estado").val())   +",\"turno\":"+  JSON.stringify($("#turno").val())  +",\"clasif\":"+ JSON.stringify( $("#clasif").val())   +",\"fec_inicial\":"+  JSON.stringify($("#fec_inicial").val() )  +",\"fec_final\":"+ JSON.stringify($("#fec_final").val()) +",\"nom_doc\":"+ JSON.stringify($('#nom_doc').val().trim()) +",\"proveedor\":"+ JSON.stringify($('#idproveedor').val().trim()) +"}" ,

       //data:  JSON.stringify($('#test3').scheduler('val')) ,
      success:function(data) {                     
        
        var html = '';
        var i;
        for(i=0; i<data.length; i++){
          html +=  '<tr ' + (data[i].cod_mot==null||data[i].cod_mot.trim()==''?'':'style ="cursor: pointer;background-color:#ffffbf" ')+ ' style ="cursor: pointer;" id="'+data[i].codigo+'" ondblclick=modalconfirmacion(this);>'+
          '<td onclick="event.stopPropagation(); "> <input id=' + i + ' type="checkbox" name="d"   value=""></td>'+
              '<td><div>'+data[i].codigo + '</div></td>'+
              '<td><div>'+data[i].doctor+'</div></td>'+
              '<td><div>'+data[i].nacionalidad+'</div></td>'+
              '<td><div>'+data[i].edad+'</div></td>'+
              '<td><div>'+data[i].turno+'</div></td>'+
              '<td><div>'+(data[i].botiquin==null?'':data[i].botiquin)+'</div></td>'+
              '<td><div>'+data[i].clasificacion+'</div></td>'+
              '<td><div>'+data[i].especialidad+'</div></td>'+
              '<td><div>'+data[i].descripcion+'</div></td>'+
              '<td><div>'+data[i].fecha+'</div></td>'+
              '<td><div>'+data[i].horini+'</div></td>'+
              '<td><div>'+data[i].horfin+'</div></td>'+
              '<td><div>'+(data[i].conductor==null?'':data[i].conductor)+'</div></td>'+
              '<td><div>'+(data[i].nom_motorizado==null?'':data[i].nom_motorizado)+'</div></td>'+
              '<td><div>'+data[i].con_mpos+'</div></td>'+
              '<td><div>'+data[i].hor_ini+'</div></td>'+
              '<td><div>'+data[i].hor_fin+'</div></td>'+
              '<td><div>'+ ( data[i].estado == '0' ? 'Registrado' :
              data[i].estado == '1' ? 'Sin confirmar' :
              data[i].estado == '2' ? 'Confirmado' :
                                     'Sin estado') + '</div></td>'+
              '<td><div>'+data[i].cod_doc+'</div></td>'+
              '<td><div>'+(data[i].cod_mot==null?'':data[i].cod_mot)+'</div></td>'+
              '<td><div>'+(data[i].nro_tablet==null?'':data[i].nro_tablet)+'</div></td>'+
              '<td><div>'+(data[i].nro_maletin==null?'':data[i].nro_maletin)+'</div></td>'+
              '<td style="display:none;">'+data[i].medico_email+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_esp+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_recojo==null?'':data[i].lugar_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_termino==null?'':data[i].lugar_termino)+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_prov_motorizado+'</div></td>'+
              '<td><div>'+ (data[i].flg_sms=='t'?'Si':'No')+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_recojo==null?'':data[i].ubigeo_dist_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_termino==null?'':data[i].ubigeo_dist_termino)+'</div></td>'+
              '<td ><div>'+(data[i].ind_doc==null?'':data[i].ind_doc)+'</div></td>'+
              '</tr>';
              
        }
        
      $('#t02').html(html);
      $('#cant').html(data.length );     
      document.getElementById("resultado").innerHTML = ""; 
 
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
      }
  });
}); 
$('#nom_doc_prov').keyup(function() {
    
  var especialidades = [];
 $("input[name='especialidad']:checked").each(function ()
{
//Mediante la función push agregamos al arreglo los values de los checkbox
especialidades.push(($(this).attr("value")));
});
if(especialidades.length == 0){
  document.getElementById("resultado").innerHTML = "No selecciono la especialidad"; 

  return;
}else{
  document.getElementById("resultado").innerHTML = ""; 

}
  

  $.ajax({
      method:'POST',
      contentType:'application/json',
           
      dataType:'json',
      url : '/programacion/busquedaHorarioProveedor',   
    
      data: "{\"codEspecialidades\":"+JSON.stringify(especialidades) +",\"estado\":"+ JSON.stringify($("#estado").val())+",\"nom_proveedor\":"+ JSON.stringify(nom_prov_motorizado_b)   +",\"turno\":"+  JSON.stringify($("#turno").val())  +",\"clasif\":"+ JSON.stringify( $("#clasif").val())   +",\"fec_inicial\":"+  JSON.stringify($("#fec_inicial").val() )  +",\"fec_final\":"+ JSON.stringify($("#fec_final").val()) +",\"nom_doc\":"+ JSON.stringify($('#nom_doc_prov').val().trim()) +"}" ,

       //data:  JSON.stringify($('#test3').scheduler('val')) ,
      success:function(data) {                     
        
        var html = '';
        var i;
        for(i=0; i<data.length; i++){

          html +=  '<tr ' + (data[i].cod_mot==null||data[i].cod_mot.trim()==''?'':'style ="cursor: pointer;background-color:#ffffbf" ')+ ' style ="cursor: pointer;" id="'+data[i].codigo+'" ondblclick=modalconfirmacion(this);>'+
          '<td onclick="event.stopPropagation(); "> <input id=' + i + ' type="checkbox" name="d"   value=""></td>'+
              '<td><div>'+data[i].codigo + '</div></td>'+
              '<td><div>'+data[i].doctor+'</div></td>'+
              '<td><div>'+data[i].nacionalidad+'</div></td>'+
              '<td><div>'+data[i].edad+'</div></td>'+
              '<td><div>'+data[i].turno+'</div></td>'+
              '<td><div>'+(data[i].botiquin==null?'':data[i].botiquin)+'</div></td>'+
              '<td><div>'+data[i].clasificacion+'</div></td>'+
              '<td><div>'+data[i].descripcion+'</div></td>'+
              '<td><div>'+data[i].fecha+'</div></td>'+
              '<td><div>'+data[i].horini+'</div></td>'+
              '<td><div>'+data[i].horfin+'</div></td>'+
              '<td><div>'+(data[i].conductor==null?'':data[i].conductor)+'</div></td>'+
              '<td style="display:none;"></div></td>'+
              '<td><div>'+data[i].con_mpos+'</div></td>'+
              '<td><div>'+data[i].hor_ini+'</div></td>'+
              '<td><div>'+data[i].hor_fin+'</div></td>'+
              '<td><div>'+ ( data[i].estado == '0' ? 'Registrado' :
              data[i].estado == '1' ? 'Sin confirmar' :
              data[i].estado == '2' ? 'Confirmado' :
                                     'Sin estado') + '</div></td>'+
              '<td><div>'+data[i].cod_doc+'</div></td>'+
              '<td><div>'+(data[i].cod_mot==null?'':data[i].cod_mot)+'</div></td>'+
              '<td><div>'+(data[i].nro_tablet==null?'':data[i].nro_tablet)+'</div></td>'+
              '<td><div>'+(data[i].nro_maletin==null?'':data[i].nro_maletin)+'</div></td>'+
              '<td style="display:none;">'+data[i].medico_email+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_esp+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_recojo==null?'':data[i].lugar_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].lugar_termino==null?'':data[i].lugar_termino)+'</div></td>'+
              '<td style="display:none;">'+data[i].cod_prov_motorizado+'</div></td>'+
              '<td><div>'+ (data[i].flg_sms=='t'?'Si':'No')+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_recojo==null?'':data[i].ubigeo_dist_recojo)+'</div></td>'+
              '<td style="display:none;">'+(data[i].ubigeo_dist_termino==null?'':data[i].ubigeo_dist_termino)+'</div></td>'+
              '</tr><div>';
              
        }
        
      $('#t02').html(html);
      $('#cant').html(data.length );     
      document.getElementById("resultado").innerHTML = ""; 
 
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
      }
  });
}); 

 

//no sirve creo


$('#confirmar').click(function() {

   
  
  $.ajax({
    
          
    // type: 'ajax',
      url : '/programacion/confirmar_horario/'+$("#medico").val()+'/'+$("#recojo").val(),   
      dataType : 'JSON',
      method:'POST',

      success:function(data) {   
          
       alert('se confirma el horario');

      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
      }






    });

  });

 

$('#sms').click(function() {
  codigosenviarsms   = []; //pedrito
  $('#tabla1 tbody tr').each(function() {
  var tr0;
  tr0 =  $(this);
      if(tr0[0].cells[0].firstChild.nextSibling.checked == true && tr0[0].cells[18].innerHTML=='Confirmado'  /*&&  tr0[0].cells[26].innerHTML=='No'*/ && tr0[0].cells[19].innerHTML!='null' && (tr0[0].cells[19].innerHTML).toString().trim()!='') {
        codigosenviarsms.push(tr0[0].cells[1].innerHTML); 
      };
  });
  if(codigosenviarsms.length == 0){
    document.getElementById('resultado').innerHTML = 'Seleccionar turnos confirmados con conductor...';
    document.getElementById('resultado').style.color = "red";
    document.getElementById('resultado').style.fontWeight = "bold";    
return;
  }else{
    document.getElementById('resultado').innerHTML = 'Enviando SMS...';
    document.getElementById('resultado').style.color = "blue";
    document.getElementById('resultado').style.fontWeight = "bold"; 
  }
    
   var tablesms = document.getElementById("t02");

  $.ajax({
    // type: 'ajax',
      url : '/programacion/enviar_sms/',   
      data:"{\"codigosenviarsms\":"+ JSON.stringify(codigosenviarsms) + "}",
      dataType : 'JSON',
      method:'POST',

      success:function(data) {   
        var html = '';
        var i;
        for(i=0; i<data.length; i++){
          tablesms.rows[i].cells[27].innerHTML = data[i] ;
          tablesms.rows[i].cells[27].scrollIntoView();
        }
        document.getElementById('resultado').innerHTML = 'SMS enviados';
        document.getElementById('resultado').style.color = "blue";
        document.getElementById('resultado').style.fontWeight = "bold"; 
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
        document.getElementById('resultado').innerHTML = errorThrown +'Error get data from ajax';
        document.getElementById('resultado').style.color = "red";
        document.getElementById('resultado').style.fontWeight = "bold"; 
      }
    });

  });

  $('#migrar').click(function() {
    var r = confirm("Seguro de hacer la migracion?");
    
    if (r == true) {
       
    } else {
       return;
    }
    codigosmigrar_sm   = []; //pedrito
    $('#tabla1 tbody tr').each(function() {
    var tr0;
    tr0 =  $(this);
        if(tr0[0].cells[0].firstChild.nextSibling.checked == true /* && tr0[0].cells[26].innerHTML=='Si' */) {
          codigosmigrar_sm.push(tr0[0].cells[1].children[0].innerHTML); 
         };
    });
    if(codigosmigrar_sm.length == 0){
      document.getElementById('resultado').innerHTML = 'Seleccionar turnos para migrar...';
      document.getElementById('resultado').style.color = "red";
      document.getElementById('resultado').style.fontWeight = "bold";  
      return;  
  
    }else{
      document.getElementById('resultado').innerHTML = 'Migrando turnos...';
      document.getElementById('resultado').style.color = "blue";
      document.getElementById('resultado').style.fontWeight = "bold"; 
    }
    var contablet;
   
    /*  var r = confirm("¿El combo creado va a brindar los servicios con tablet?");
        if (r == true) {
          contablet = "SI";
        } else {
          contablet = "NO";
        }  */
    $.ajax({
      // type: 'ajax',
        url : '/programacion/migrar_sm/',   
        data:"{\"codigosmigrar_sm\":"+ JSON.stringify(codigosmigrar_sm) + ",\"contablet\":"+ JSON.stringify("SI") + "}",
        dataType : 'JSON',
        method:'POST',
  
        success:function(data) {   
            
         
          document.getElementById("resultado").innerHTML = ""; 
          document.getElementById('resultado').innerHTML = 'Se migraron los turnos..';
          document.getElementById('resultado').style.color = "blue";
          document.getElementById('resultado').style.fontWeight = "bold"; 
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert('Sucedio un error');
          console.log(errorThrown);
          document.getElementById('resultado').innerHTML = 'Sucedio un error';
          document.getElementById('resultado').style.color = "red";
          document.getElementById('resultado').style.fontWeight = "bold";
        }
      });
  
    });
  


});



// Get the modal
var modalRemisse = document.getElementById("modalRemisse");
var modalseguimiento = document.getElementById("modalseguimiento");
var remisse = document.getElementById("remisse");
if (remisse != null){
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var cancelarproveedor = document.getElementById('cancelaproveedor');

window.enviar_remisse = function() {

  
  var seleccionados = getColumnconfirmado("tabla1", 2); 
 
   
  if(seleccionados.length ==0){
    alert('Seleccionar solo programaciones que esten en estado Confirmado o Sin Confirmar. ');
    return;
   }

  printModal(`<div id="ed-modal-contentheader"  style="color: white;background:#e9bd15;display:flex;justify-content:space-between;"><h4>Asignación de Proveedor Remisse</h4><button type="button" class="cancelarmodal btn-xs btn-danger">X</button></div>
  <div  style="display: grid;grid-template-columns:  1fr 2fr;">

      <label>Turnos</label>
      <input type="input" id="asignacion_turno" style="width:120px"  name="asignacion_turno"> 
      
      <label>Clasificacion</label>   
       <select name="asignacion_nom_clasif" style="width:170px" id="asignacion_nom_clasif">
<option value="0" selected="selected">AGUDO</option>
<option value="1">CRONICO</option>
</select>
       <label>Fecha de asignacion</label>
       <input type="date" id="fec_asignacion_proveedor" style="width:170px" name="fec_asignacion_proveedor"> 
     
       <label>Empresa</label>
       <select name="asignacion_proveedor" style="width:170px" id="asignacion_proveedor">

</select> 
<div ><br></div><div></div>
       <button type="button" id="guardarproveedor" onclick="guardarproveedor();" style="width:120px" class="btn btn-success">Guardar</button>
       <div id="validaenviar_remisse"></div>
 </div>`);
/*  <button type="button" id="cancelarproveedor" class="cancelarmodal btn btn-danger">Cancelar</button>
 */
dragElement(document.getElementById("ed-modal-content"));

document.getElementById('ed-modal-content').style.height  = "50vh";

fetch('/programacion/get_proveedores/')

.then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Sucedio un error'))
}).then(data => {
  document.getElementById('asignacion_proveedor').innerHTML = listOfNamesprov(data);
 }).catch(error => {
   console.log(error);    
})
 
   
   var tr = document.getElementsByTagName("tr")[1];
  var nom_clasif;
  var td_asignacion_clasificacion = tr.getElementsByTagName("td")[7];
  var f = new Date();    
  var formattedDate = f.getFullYear() + '-' + ( f.getMonth() + 1).toString().padStart(2,"0") + '-' + f.getDate().toString().padStart(2,"0");

/* if (td_asignacion_clasificacion.innerHTML=='AGUDO'){
  nom_clasif = 0;
}else{
  nom_clasif =1;
} */
//document.getElementById("asignacion_proveedor").value = td_text;
document.getElementById("asignacion_turno").value = seleccionados.length;
document.getElementById("fec_asignacion_proveedor").value =  formattedDate;
document.getElementById("asignacion_nom_clasif").value = nom_clasif;
}
 
}
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
      recojo='';termino=''; 
      removeModal();
    });
});
  
}


window.desmarcardoctor = function()
{
  if (document.getElementById('editardoctor').checked) 
  {
      document.getElementById('especialidad').disabled = true;
      document.getElementById('medico').disabled = true;
      document.getElementById('nom_clasif').disabled = true;
      document.getElementById('horini').disabled = true;
      document.getElementById('horfin').disabled = true;
      document.getElementById('botiquin').disabled = true;

      document.getElementById('fec_asignacion').disabled = true;
      document.getElementById('turnodetalle').disabled = true;
      document.getElementById('des_doc').disabled = true;
      document.getElementById('ind_doc').disabled = true;

    } else {
    document.getElementById('especialidad').disabled =false ;
    document.getElementById('medico').disabled = false;
    document.getElementById('nom_clasif').disabled = false;
    document.getElementById('horini').disabled = false;
    document.getElementById('horfin').disabled = false;
    document.getElementById('botiquin').disabled = false;

    document.getElementById('fec_asignacion').disabled = false;
    document.getElementById('turnodetalle').disabled = false;
    document.getElementById('des_doc').disabled = false;
    document.getElementById('ind_doc').disabled = false;

  }
}
window.desmarcarmotorizado = function()
{
  if (document.getElementById('editarmotorizado').checked) 
  {
      document.getElementById('proveedor').disabled = true;
      document.getElementById('conductor').disabled = true;
      document.getElementById('mpos').disabled = true;
   //   document.getElementById('horini_mot').disabled = true;
   //   document.getElementById('horfin_mot').disabled = true;
      document.getElementById('tablet').disabled = true;
      document.getElementById('maletin').disabled = true; 
    } else {
      document.getElementById('proveedor').disabled = false;
      document.getElementById('conductor').disabled = false;
      document.getElementById('mpos').disabled = false;
      document.getElementById('tablet').disabled = false;
      document.getElementById('maletin').disabled = false;
   //   document.getElementById('horini_mot').disabled = false;
   //   document.getElementById('horfin_mot').disabled = false; 
  }
}
window.modalconfirmacion = function(el) {
    printModal(`
    <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h4> DETALLE DE HORARIO</h4><div  id="estadoprog"></div> <button type="button" disabled id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>
 <fieldset id="datos_doctor">
 <legend>Datos del doctor</legend>
 <div class="legend2"> <input type="checkbox" id="editardoctor" checked="" value="1" name="editardoctor" onclick="desmarcardoctor();">Editar </div>
<div  style="display: grid;grid-template-columns:  1fr 2fr;">
 <input type = "hidden" id="codigoasignacionaconfirmar"  name="codigoasignacionaconfirmar"  >
 Especialidad
 <select name="especialidad" style="width:180px" disabled id="especialidad" onchange="cambioesp(this.value)">
 <option value="005">PEDIATRA</option>
<option value="006,010">MEDICINA GENERAL</option>
<option value="001">CARDIOLOGIA</option>
<option value="011">ENDOCRONOLOGIA</option>
<option value="027">NEUMOLOGIA</option>
<option value="026">NUTRICIONISTA</option>
<option value="012,003,009">ESPECIALISTA</option>
<option value="028">MEDICINA FAMILIAR</option>
<option value="032">MEDICINA GENERAL INTEGRAL</option>

</select>
 <label>Clasificacion</label>
 <select name="nom_clasif" style="width:120px" id="nom_clasif" disabled>
<option value="0" selected="selected">AGUDO</option>
<option value="1">CRONICO</option>
<option value="2">AUTO COVID</option>

</select>
 Nombre del medico
   <select disabled name="medico" style="width:330px" id="medico">
</select>
 
 Horini
 <input  disabled type="time" id="horini" style="width:120px" oninput="validateHhMmini(this.value);" value="00:00" name="horini">
 Horfin
 <input  disabled type="time" id="horfin" style="width:120px" oninput="validateHhMmfin(this.value);" value="00:00" name="horfin">
 </div>
 </fieldset>
 
 <fieldset  id="detalle_asignacion">
   <legend>Detalle Asignacion</legend>
<div  style="display: grid;grid-template-columns:  1fr 2fr;">
 Botiquin 
 <select disabled name="botiquin"      id="botiquin">
 
</select>
 Fec. asignacion
 <input  disabled type="date" id="fec_asignacion" name="fec_asignacion" value="2020-06-03"> 
 Turno
 <select disabled name="turnodetalle" style="width:120px" id="turnodetalle">
<option value="0">MAÑANA</option>
<option value="1">TARDE</option>
<option value="2">MADRUGADA</option>
</select>
<label>Observacion</label>
<textarea disabled style="text-transform: uppercase;" id="des_doc" name="des_doc" rows="2" cols="30"></textarea>
<label>Indicaciones del doctor</label>
<textarea disabled style="text-transform: uppercase;" id="ind_doc" name="ind_doc" rows="2" cols="30"></textarea>
 
 <label>Lugar Recojo</label>
 <div>
 <input disabled type="input" style="width:280px"  id="recojo" name="recojo">
 <input type="hidden" id="ubigeo_recojo" name="ubigeo_recojo">
 <input   type="button"  class="btn btn btn-primary btn-sm" id="btndireccionesrecojo" readonly name="btndireccionesrecojo" value="..." onclick="direcciones('recojo')"> 
 <div id="recojovalida"></div>
 </div>
 <label>Lugar Termino</label>
 <div>
 <input disabled type="input" id="termino" style="width:280px"  name="termino">
 <input type="hidden" id="ubigeo_termino" name="ubigeo_termino">
 <input   type="button" class="btn btn btn-primary btn-sm" id="btndireccionestermino" readonly name="btndireccionestermino" value="..." onclick="direcciones('termino')"> 
 <div id="terminovalida"></div>
 </div>
</div>
</fieldset>

<fieldset  id="datos_motorizado">
 <legend>Datos del motorizado</legend>
 <div class="legend2"> <input type="checkbox" id="editarmotorizado"  onclick="desmarcarmotorizado();" checked="" value="1" name="editarmotorizado">Editar </div>
 <div  style="display: grid;grid-template-columns:  1fr 2fr;">
 <label>Empresa</label>
<select disabled name="proveedor" style="width:170px" id="proveedor"  onchange="cambioprov(this.value)">
<option value="0" selected="selected">Seleccione</option>
 </select>
 <label>Conductor</label>
<select disabled name="conductor" style="width:280px" id="conductor">
</select>
N° Tablet  
<select disabled name="tablet" style="width:170px" id="tablet">
</select>
N° Maletin
<select  disabled id="maletin" name="maletin" style="width:170px"> 
</select>
<label>MPOS</label>
<select disabled name="mpos" style="width:50px" id="mpos">
<option value="0" selected="selected">NO</option>
<option value="1">SI</option>
</select>
 Horini
 <input disabled type="time" id="horini_mot"  style="width:120px" value="00:00" name="horini_mot">
 Horfin
 <input disabled type="time" id="horfin_mot"  style="width:120px" value="00:00" name="horfin_mot">  
 </div> 
</fieldset> 

<div style="display:flex;justify-content:space-between;">
 <div>
     <button type="button" disabled id="guardardatosconfirmacion" class="btn-xs btn-success" onclick="guardardatosconfirmacion();">Guardar</button>
    <div style ="display:inline" id="guardar_programacion"></div>
 </div>
  <div>

    <button type="button" disabled id="confirmardireccion" class="btn-xs btn-success" onclick="confirmardireccion();" >Confirmar</button>
    <button type="button" disabled id="desconfirmardireccion" class="btn-xs btn-danger" onclick="desconfirmardireccion();">Desconfirmar</button>

</div>

</div>`);
document.getElementById("botiquin").style.maxWidth = document.getElementById("medico").style.width ;
dragElement(document.getElementById("ed-modal-content"));

if(typeof nom_prov_motorizado_b !== 'undefined')  {
  document. getElementById('btndireccionesrecojo').disabled = true;
  document. getElementById('btndireccionestermino').disabled = true;
  
} 
var cod_esp_sel,cod_esp_sel2;
var cod_esp = el.cells[24].innerHTML;
var cod_prov_motorizado = el.cells[27].innerHTML;
var botiquin =  (el.cells[6].children[0].innerHTML)==''?0:el.cells[6].children[0].innerHTML;
 cod_doc = el.cells[19].children[0].innerHTML;
var cod_mot = (el.cells[20].children[0].innerHTML).trim();

var    tablet = el.cells[21].children[0].innerHTML;
var   maletin = el.cells[22].children[0].innerHTML;

if (cod_esp=='006'){
  cod_esp_sel = "006,010";
  cod_esp_sel2 = "006','010";

}else if (cod_esp=='010'){
  cod_esp_sel = "006,010";
  cod_esp_sel2 = "006','010";

}else if (cod_esp=='012'){
  cod_esp_sel = "012,003,009"
  cod_esp_sel2 = "012','003','009"
}else if (cod_esp=='003'){
  cod_esp_sel = "012,003,009"
  cod_esp_sel2 = "012','003','009"
}else if (cod_esp=='009'){
  cod_esp_sel = "012,003,009"
  cod_esp_sel2 = "012','003','009"
}else{
  cod_esp_sel = cod_esp;
  cod_esp_sel2 =cod_esp;
}

$("#especialidad").val(cod_esp_sel);
let alls;
(async () => {
try
{
  if(typeof nom_prov_motorizado_b !== 'undefined')  {
    alls = await Promise.all([
      fetch(`/programacion/get_doctorxespecialidadxproveedor/`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_esp_sel: cod_esp_sel2,
          nom_proveedor: nom_prov_motorizado_b
        })
      }),fetch('/programacion/get_botiquinxespecialidad/',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_esp_sel: cod_esp_sel2
        })
      }),  
      fetch(`/programacion/get_proveedores`)

    ]) 
  }else{
    alls = await Promise.all([
      fetch(`/programacion/get_doctorxespecialidad/`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_esp_sel: cod_esp_sel2
        })
      }),fetch('/programacion/get_botiquinxespecialidad/',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_esp_sel: cod_esp_sel2
        })
      }),  
      fetch(`/programacion/get_proveedores`)

    ]) 


  }  
      let response2_json = await alls[0].json();
      document.getElementById('medico').innerHTML = listOfNamesdr(response2_json);
      $('#medico').val(cod_doc);
      let response3_json = await alls[1].json();
      document.getElementById('botiquin').innerHTML = listOfNamesbot(response3_json);
      $("#botiquin").val(botiquin);
      let response4_json = await alls[2].json();
      document.getElementById('proveedor').innerHTML = listOfNamesprov(response4_json);
      $("#proveedor").val(cod_prov_motorizado);



      if(typeof nom_prov_motorizado_b !== 'undefined')  {
          var sel = document. getElementById('proveedor');
          for (i = sel. length - 1; i >= 0; i--) {
             
            if(sel.options[i].text !=nom_prov_motorizado_b && sel[i].value != '99'){
              sel.remove(i);
            }
            
          }
           
      } 
      let response5 = await fetch(`/programacion/get_conductores_proveedor/${cod_prov_motorizado}`);
      let response5_json  = await response5.json();
     // let response6 = await  fetch(`/mantenimiento/gettablets/${cod_prov_motorizado}`);
      const data = await Promise.all([fetch(`/mantenimiento/gettablets/${cod_prov_motorizado}`) ,  fetch(`/mantenimiento/getmaletines/${cod_prov_motorizado}`) ])

     // let response6_json  = await response6.json();
      let datar1  =  await  data[0].json();
      let datar2  =  await   data[1].json();

    cod_mot==''?document.getElementById('conductor').innerHTML = '<option value="" selected disabled hidden>NINGUNO</option>\n'+listOfNamescond(response5_json):  document.getElementById('conductor').innerHTML = listOfNamescond(response5_json)
    $("#conductor").val(cod_mot);
    document.getElementById('tablet').innerHTML = listOfNamestablets(datar1);
    document.getElementById('maletin').innerHTML = listOfNamesmaletines(datar2);

   /*  if(tablet==''){
      tablet = 0;
    }  */
    if(maletin==''){
      maletin = 0;
    } 
    $("#tablet").val(tablet=='0'?'':tablet);
    $("#maletin").val(maletin);
    document.getElementById("guardardatosconfirmacion").disabled = false;
    document.getElementById("cancelarconfirmacion").disabled = false;
    document.getElementById("confirmardireccion").disabled = false;
    document.getElementById("desconfirmardireccion").disabled = false;
} 
catch(Error){
    console.error(Error);
    document.getElementById("cancelarconfirmacion").disabled = false;

} 

})()   
 
 


//     var  estado = el.cells[17].innerHTML;
     var  id = $(el).attr("id");
    
      var     turno = el.cells[5].children[0].innerHTML;
      if (turno == "M" ){
        turno = '0';
      }
      if (turno == "T" ){
        turno = "1";
      }
      if (turno == 'Z' ){
        turno = "2";
      }
    
            var     codigoasignacionaconfirmar = el.cells[1].children[0].innerHTML;
          
            var     fec_asignacion = el.cells[10].children[0].innerHTML;
            var     nom_clasif = el.cells[7].children[0].innerHTML;
          
            var    des_doc = el.cells[9].children[0].innerHTML;
            var    ind_doc = (el.cells[31] === undefined ? '':el.cells[31].children[0].innerHTML ).trim();  //revisarahorita

            var     day =  fec_asignacion.substr(0, 2);
            var     month = fec_asignacion.substr(3, 2);
            var     year = fec_asignacion.substr(6, 4);
    
           var formattedDate = year + '-' + month + '-' + day
           
           var     horini = el.cells[11].children[0].innerHTML;
           var      horfin =el.cells[12].children[0].innerHTML;
           var      mpos = el.cells[13].children[0].innerHTML;
           var     horini_asig_mot = el.cells[16].children[0].innerHTML;
           var    horfin_asig_mot = el.cells[17].children[0].innerHTML;
           
           var   lugar_recojo = el.cells[25].innerHTML;
           var   lugar_termino = el.cells[26].innerHTML;
           var  ubigeo_recojo = el.cells[29].innerHTML;
           var  ubigeo_termino = el.cells[29].innerHTML;     
           
       
           $("#fec_asignacion").val(formattedDate);
            
           $("#codigoasignacionaconfirmar").val(codigoasignacionaconfirmar);
          
             if (nom_clasif=='AGUDO'){
              nom_clasif = 0;
            }else if (nom_clasif=='CRONICO') {
              nom_clasif =1;
            }else{
              nom_clasif =2;
            }
           $("#nom_clasif").val(nom_clasif);
           document.getElementById('estadoprog').innerHTML = (el.cells[17].children[0].innerHTML).toUpperCase();;
           $("#turnodetalle").val(turno);
           $("#horini").val(horini);
            $("#horfin").val(horfin);

           $("#des_doc").val(des_doc);
           $("#ind_doc").val(ind_doc);

           $("#recojo").val(lugar_recojo);
            $("#termino").val(lugar_termino);
            
           $("#horini_mot").val(horini_asig_mot);
           $("#horfin_mot").val(horfin_asig_mot);

           $("#ubigeo_recojo").val(ubigeo_recojo);
           $("#ubigeo_termino").val(ubigeo_termino);
 
           
           if (mpos=='No'){
            mpos=0;
           }else{
            mpos=1
           }
    
           $("#mpos").val(mpos);
          // horini_asig_mot
    
          /*   if (estado ==0){
              return false;
            } */
          
          

  } 
  function listOfNames() {
    const names =  `<option value="'005'">PEDIATRA</option>\n<option value="'006','010'">MEDICINA</option>\n<option value="001">CARDIOLOGIA</option>\n<option value="011">ENDOCRONOLOGIA</option>\n<option value="027">NEUMOLOGIA</option>\n<option value="026">NUTRICIONISTA</option>\n<option value="'012','003','009'">ESPECIALISTA</option>\n`;
    return `${names}`
  }
  function listOfNamesdr(people) {
    const names = people.map(person => `<option value="${person.cod_doc}">${person.nom_doc}</option>`).join("\n");
    return `${names}`
  }
  function listOfNamesbot(people) {
    const names = people.map(person => `<option value="${person.cod_almacen}">${person.botiquin}</option>`).join("\n");
    return `${names}`
  }
  function listOfNamesprov(people) {
    const names = people.map(person => `<option value="${person.cod_prov_motorizado}">${person.descripcion}</option>`).join("\n");
    return `${names}`
  }
  function listOfNamestablets(people) {
    const names = people.map(person => `<option value="${person.cod_tablet}">${person.cod_tablet}</option>`).join("\n");
    return `<option value="">NO TIENE</option>\n${names}`
  }
  function listOfNamesmaletines(people) {
    const names = people.map(person => `<option value="${person.cod_maletin}">${person.cod_maletin}</option>`).join("\n");
    return `<option value="0">NO TIENE</option>\n${names}`
  }
  function listOfNamescond(people) {
    const names = people.map(person => `<option value="${person.cod_mot}">${person.nom_mot}</option>`).join("\n");
    return `${names}`
  }
 
 
    $('#direcciones > tbody').on('dblclick', '>tr', function () {
      if( $(this).find('td:nth-child(1)').text() == 'No hay registros'){
          return;
      }
       $("#direccion").val( $(this).find('td:nth-child(2)').text());
       $("#distrito").val( $(this).find('td:nth-child(7)').text().trim());
       $("#referencia").val( $(this).find('td:nth-child(4)').text());
       $("#telefono").val( $(this).find('td:nth-child(5)').text());
       $("#telefono2").val( $(this).find('td:nth-child(6)').text());
       $("#direccion").prop('disabled', false);
       $("#distrito").prop('disabled', false);
       $("#referencia").prop('disabled', false);
       $("#telefono").prop('disabled', false);
       $("#telefono2").prop('disabled', false);
       document.getElementById('validardireccion').innerHTML = '';

       document.querySelectorAll('#show_modaldireccion .modal-footer button')[0].disabled=false;
       document.querySelectorAll('#show_modaldireccion .modal-footer button')[1].disabled=false;
       document.querySelectorAll('#show_modaldireccion .modal-footer button')[2].disabled=true;

        nro_direccion_editar =  $(this).attr("id");
         $('#direcciones > tbody tr').css('background-color','');
         $('#direcciones > tbody tr').css('color','');

        $(this)[0].style.backgroundColor = "#90EE90";
        $(this)[0].style.color = "white";

    });    
window.recojootermino ,window.recojo='',window.termino='';
 
    window.seleccionardireccion =function(f) {
           
      
           if ( recojootermino == 'recojo'){
           
            $('#recojo').val(f.parentElement.parentElement.cells[1].innerHTML);
            $('#ubigeo_recojo').val(f.parentElement.parentElement.cells[6].innerHTML);
           recojo = f.parentElement.parentElement.cells[2].innerHTML.trim() ;
              if(termino==''){
                $('#ind_doc').val('RECOJO '+f.parentElement.parentElement.cells[2].innerHTML.trim());
               
              }else{
                $('#ind_doc').val('RECOJO '+f.parentElement.parentElement.cells[2].innerHTML.trim()+'/TERMINO '+termino);
               
              }
           }else{
            $('#termino').val(f.parentElement.parentElement.cells[1].innerHTML);
            $('#ubigeo_termino').val(f.parentElement.parentElement.cells[6].innerHTML);
            termino = f.parentElement.parentElement.cells[2].innerHTML.trim() ;
            if(recojo==''){
              $('#ind_doc').val('TERMINO '+f.parentElement.parentElement.cells[2].innerHTML.trim());
              
            }else{
              $('#ind_doc').val('RECOJO '+ recojo +'/TERMINO '+f.parentElement.parentElement.cells[2].innerHTML.trim());
              
            }
           }
           if(recojo ==''){
            document.getElementById("recojovalida").innerHTML = 'Requerido';
            document.getElementById("recojovalida").style.color = "red";
            document.getElementById("recojovalida").style.fontWeight = "bold"; 
            document.getElementById("recojovalida").style.display = "inline"; 
      
          }else{
            document.getElementById("recojovalida").innerHTML = '';
      
          }
          if(termino ==''){
            document.getElementById("terminovalida").innerHTML = 'Requerido';
            document.getElementById("terminovalida").style.color = "red";
            document.getElementById("terminovalida").style.fontWeight = "bold";    
            document.getElementById("terminovalida").style.display = "inline"; 
      
          }else{
            document.getElementById("terminovalida").innerHTML = '';
          }
          
          document.getElementById("salirdireccion").click();  
    }     
    window.eliminardireccion = function (f) {
      var r = confirm("Seguro de eliminar la direccion?");
      if (r == true) {
         
      } else {
         return;
      }
      

      fetch('/programacion/eliminar_direccion/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        cod_doc:cod_doc,
        nro_direccion:f.parentElement.parentElement.id
        })
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Sucedio un error'))
      }).then(data => {
         return fetch('/programacion/get_direcciones/'+cod_doc); // make a 2nd request and return a promise
      })
      .then(function(response) {
        return response.json();
      }).then(function(rpta) {
        var html='';
        var i = 0;
        if(rpta[0].length==0){
          html +=  '<tr>'+
          '<td colspan="7"><b>No hay registros</b></td>'
              '</tr>';
              $("#distrito").val(0);
              nro_direccion = 1;
  
        }else{
          var direcciones = rpta[1][0].direcciones;
                 var  tmp = direcciones.replace('{','');
                 tmp = tmp.replace('}','');
                 var tmparray = tmp.split(',');
                for (i=0; i<rpta[0].length; i++){
                
                   if((i+1)!=parseInt(tmparray[i])){
                    nro_direccion = i+1;
                    break;
                   }
                }
               //if(nro_direccion === null){
                  nro_direccion = rpta[0].length+1;
               // }
        }
        for(i=0; i<rpta[0].length; i++){
          html +=  '<tr style ="cursor: pointer;"  id="'+rpta[0][i].nro_direccion+'">'+
              '<td><button id="eliminardirecciones" onclick="eliminardireccion(this);"><i class="fas fa-trash-alt"></i></button></td><td>'+rpta[0][i].direccion +'</td>'+
              '<td>'+rpta[0][i].des_dis +'</td>'+
              '<td>'+(rpta[0][i].referencia==null?'':rpta[0][i].referencia.trim())   +'</td>'+
              '<td>'+(rpta[0][i].telefono==null?'':rpta[0][i].telefono.trim())   +'</td>'+
              '<td>'+(rpta[0][i].telefono_ultimo==null?'':rpta[0][i].telefono_ultimo.trim()) +'</td>'+
              '<td style="display:none">'+rpta[0][i].ubigeo_dist +'</td>'+
              '<td><input type="button" id="seleccionardirecciones" value="Seleccionar" onclick="seleccionardireccion(this);"></td>'+         
              '</tr>';
        }    
        $('#listdirecciones').html(html);
        document.getElementById('validardireccion').innerHTML = 'Se elimino direccion...';
        document.getElementById('validardireccion').style.color = "blue";
        document.getElementById('validardireccion').style.fontWeight = "bold"; 
        $("#direccion").val('');
        $("#distrito").val(0);
        $("#referencia").val('');
        $("#telefono").val('');
        $("#telefono2").val('');
        $("#direccion").prop('disabled', true);
        $("#distrito").prop('disabled', true);
        $("#referencia").prop('disabled', true);
        $("#telefono").prop('disabled', true);
        $("#telefono2").prop('disabled', true);
        document.querySelectorAll('#show_modaldireccion .modal-footer button')[0].disabled=false;
        document.querySelectorAll('#show_modaldireccion .modal-footer button')[1].disabled=true;
        document.querySelectorAll('#show_modaldireccion .modal-footer button')[2].disabled=true;
        //nro_direccion=null;
      }).catch(error => {
        document.getElementById('validardireccion').innerHTML = 'No se pudo eliminar la direccion...';
        document.getElementById('validardireccion').style.color = "red";
        document.getElementById('validardireccion').style.fontWeight = "bold"; 
        console.log(error);    
      })
       }     
var nro_direccion=null;
  window.direcciones = function(x) {
 
    recojootermino = x;
     $.ajax({
      type: 'ajax',
        url : '/programacion/get_direcciones/'+cod_doc,
     
        method:'GET',
        
        dataType:'json',
        success:function(data) {
          
            var html = '';
            var i;
             if(data[0].length==0){
              html +=  '<tr>'+
              '<td colspan="7"><b>No hay registros</b></td>'
                  '</tr>';
                  $("#distrito").val(0);
                  nro_direccion = 1;

            }else{
              
               var direcciones = data[1][0].direcciones;
               var  tmp = direcciones.replace('{','');
               tmp = tmp.replace('}','');
               var tmparray = tmp.split(',');
              for (i=0; i<data[0].length; i++){
              
                 if((i+1)!=parseInt(tmparray[i])){
                  nro_direccion = i+1;
                  break;
                 }
              }
              //if(nro_direccion === null){
                nro_direccion = data[0].length+1;
              //}
            }
           

            for(i=0; i<data[0].length; i++){
              html +=  '<tr style ="cursor: pointer;"  id="'+data[0][i].nro_direccion+'">'+
                  '<td><button id="eliminardirecciones" onclick="eliminardireccion(this);"><i class="fas fa-trash-alt"></i></button></td><td>'+data[0][i].direccion +'</td>'+
                  '<td>'+data[0][i].des_dis +'</td>'+
                  '<td>'+(data[0][i].referencia==null?'':data[0][i].referencia.trim())   +'</td>'+
                  '<td>'+(data[0][i].telefono==null?'':data[0][i].telefono.trim())   +'</td>'+
                  '<td>'+(data[0][i].telefono_ultimo==null?'':data[0][i].telefono_ultimo.trim()) +'</td>'+
                  '<td style="display:none">'+data[0][i].ubigeo_dist +'</td>'+
                  '<td><input type="button" id="seleccionardirecciones" value="Seleccionar" onclick="seleccionardireccion(this);"></td>'+         
                  '</tr>';
            }
           
          $('#listdirecciones').html(html);
          $('#show_modaldireccion').modal({backdrop: 'static', keyboard: true, show: true});         

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert(errorThrown +'Error get data from ajax');
        }
    });

  }   
  window.guardardireccion = function() {
    var msjerror="";
    if ($("#direccion").val().trim()==''){
      msjerror+="Ingrese una direccion<br>"
    }
    if ($("#distrito").val().trim()=='' || $("#distrito").val() == 0){
      msjerror+="Ingrese un distrito<br>"
    }
    if ($("#referencia").val().trim()==''){
      msjerror+="Ingrese una referencia<br>"
    }
    if ($("#telefono").val().trim()==''){
      msjerror+="Ingrese un telefono<br>"
    }
 /*    if ($("#telefono2").val().trim()==''){
      msjerror+="Ingrese un telefono2\n"
    } */
    if(msjerror!=''){
      document.getElementById('validardireccion').innerHTML = msjerror;
      document.getElementById('validardireccion').style.color = "red";
      document.getElementById('validardireccion').style.fontWeight = "bold";
        return;
    }else{
      document.getElementById('validardireccion').innerHTML = 'Registrando...';
      document.getElementById('validardireccion').style.color = "blue";
      document.getElementById('validardireccion').style.fontWeight = "bold";    
    }

    fetch('/programacion/crear_direccion/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      cod_doc:cod_doc,
      nro_direccion:nro_direccion,
      direccion:$("#direccion").val(),
      distrito:$("#distrito").val(),
      referencia:$("#referencia").val(),
      telefono:$("#telefono").val(),
      telefono2:$("#telefono2").val()})
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Sucedio un error'))
    }).then(data => {
       return fetch('/programacion/get_direcciones/'+cod_doc); // make a 2nd request and return a promise
    })
    .then(function(response) {
      return response.json();
    }).then(function(rpta) {
      var html='';
      var i = 0;
      if(rpta[0].length==0){
        html +=  '<tr>'+
        '<td colspan="7"><b>No hay registros</b></td>'
            '</tr>';
            $("#distrito").val(0);
            nro_direccion = 1;

      }else{
        var direcciones = rpta[1][0].direcciones;
               var  tmp = direcciones.replace('{','');
               tmp = tmp.replace('}','');
               var tmparray = tmp.split(',');
              for (i=0; i<rpta[0].length; i++){
              
                 if((i+1)!=parseInt(tmparray[i])){
                  nro_direccion = i+1;
                  break;
                 }
              }
             // if(nro_direccion === null){
                nro_direccion = rpta[0].length+1;
            //  }
      }
      for(i=0; i<rpta[0].length; i++){
        html +=  '<tr style ="cursor: pointer;"  id="'+rpta[0][i].nro_direccion+'">'+
            '<td><button id="eliminardirecciones" onclick="eliminardireccion(this);"><i class="fas fa-trash-alt"></i></button></td><td>'+rpta[0][i].direccion +'</td>'+
            '<td>'+rpta[0][i].des_dis +'</td>'+
            '<td>'+(rpta[0][i].referencia==null?'':rpta[0][i].referencia.trim())   +'</td>'+
            '<td>'+(rpta[0][i].telefono==null?'':rpta[0][i].telefono.trim())   +'</td>'+
            '<td>'+(rpta[0][i].telefono_ultimo==null?'':rpta[0][i].telefono_ultimo.trim()) +'</td>'+
            '<td style="display:none">'+rpta[0][i].ubigeo_dist +'</td>'+
            '<td><input type="button" id="seleccionardirecciones" value="Seleccionar" onclick="seleccionardireccion(this);"></td>'+         
            '</tr>';
      }    
      $('#listdirecciones').html(html);
      document.getElementById('validardireccion').innerHTML = 'Se agrego direccion...';
      document.getElementById('validardireccion').style.color = "blue";
      document.getElementById('validardireccion').style.fontWeight = "bold"; 
      $("#direccion").val('');
      $("#distrito").val(0);
      $("#referencia").val('');
      $("#telefono").val('');
      $("#telefono2").val('');
      $("#direccion").prop('disabled', true);
      $("#distrito").prop('disabled', true);
      $("#referencia").prop('disabled', true);
      $("#telefono").prop('disabled', true);
      $("#telefono2").prop('disabled', true);
      document.querySelectorAll('#show_modaldireccion .modal-footer button')[0].disabled=false;
      document.querySelectorAll('#show_modaldireccion .modal-footer button')[1].disabled=true;
      document.querySelectorAll('#show_modaldireccion .modal-footer button')[2].disabled=true;
      //nro_direccion=null;
    }).catch(error => {
      document.getElementById('validardireccion').innerHTML = 'No se pudo crear la direccion...';
      document.getElementById('validardireccion').style.color = "red";
      document.getElementById('validardireccion').style.fontWeight = "bold"; 
      console.log(error);    
    })
     

  } 

  
  window.editardireccion  =function(){
    var msjerror="";
    if ($("#direccion").val().trim()==''){
      msjerror+="Ingrese una direccion<br>"
    }
    if ($("#distrito").val().trim()=='' || $("#distrito").val() == 0){
      msjerror+="Ingrese un distrito<br>"
    }
    if ($("#referencia").val().trim()==''){
      msjerror+="Ingrese una referencia<br>"
    }
    if ($("#telefono").val().trim()==''){
      msjerror+="Ingrese un telefono<br>"
    }
 /*    if ($("#telefono2").val().trim()==''){
      msjerror+="Ingrese un telefono2\n"
    } */
    if(msjerror!=''){
      document.getElementById('validardireccion').innerHTML = msjerror;
      document.getElementById('validardireccion').style.color = "red";
      document.getElementById('validardireccion').style.fontWeight = "bold";
        return;
    }else{
      document.getElementById('validardireccion').innerHTML = 'Actualizando...';
      document.getElementById('validardireccion').style.color = "blue";
      document.getElementById('validardireccion').style.fontWeight = "bold";    
    }

    fetch('/programacion/editar_direccion/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      cod_doc:cod_doc,
      nro_direccion:nro_direccion_editar,
      direccion:$("#direccion").val(),
      distrito:$("#distrito").val(),
      referencia:$("#referencia").val(),
      telefono:$("#telefono").val(),
      telefono2:$("#telefono2").val()})
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Sucedio un error'))
    }).then(data => {
      
      return fetch('/programacion/get_direcciones/'+cod_doc); // make a 2nd request and return a promise
    })
    .then(function(response) {
      return response.json();
    }).then(function(rpta) {
      var html='';
      var i = 0;
      if(rpta[0].length==0){
        html +=  '<tr>'+
        '<td colspan="7"><b>No hay registros</b></td>'
            '</tr>';
            $("#distrito").val(0);
            nro_direccion = 1;

      }else{
        var direcciones = rpta[1][0].direcciones;
        var  tmp = direcciones.replace('{','');
        tmp = tmp.replace('}','');
        var tmparray = tmp.split(',');
       for (i=0; i<rpta[0].length; i++){
       
          if((i+1)!=parseInt(tmparray[i])){
           nro_direccion = i+1;
           break;
          }
       }
       //if(nro_direccion === null){
         nro_direccion = rpta[0].length+1;
       //}
      }
      for(i=0; i<rpta[0].length; i++){
        html +=  '<tr style ="cursor: pointer;"  id="'+rpta[0][i].nro_direccion+'">'+
            '<td><button id="eliminardirecciones" onclick="eliminardireccion(this);"><i class="fas fa-trash-alt"></i></button></td><td>'+rpta[0][i].direccion +'</td>'+
            '<td>'+rpta[0][i].des_dis +'</td>'+
            '<td>'+(rpta[0][i].referencia==null?'':rpta[0][i].referencia.trim())   +'</td>'+
            '<td>'+(rpta[0][i].telefono==null?'':rpta[0][i].telefono.trim())   +'</td>'+
            '<td>'+(rpta[0][i].telefono_ultimo==null?'':rpta[0][i].telefono_ultimo.trim()) +'</td>'+
            '<td style="display:none">'+rpta[0][i].ubigeo_dist +'</td>'+
            '<td><input type="button" id="seleccionardirecciones" value="Seleccionar" onclick="seleccionardireccion(this);"></td>'+         
            '</tr>';
      }    
      $('#listdirecciones').html(html);
      document.getElementById('validardireccion').innerHTML = 'Se actualizo direccion...';
      document.getElementById('validardireccion').style.color = "blue";
      document.getElementById('validardireccion').style.fontWeight = "bold"; 
      $("#direccion").val('');
      $("#distrito").val(0);
      $("#referencia").val('');
      $("#telefono").val('');
      $("#telefono2").val('');
      $("#direccion").prop('disabled', true);
      $("#distrito").prop('disabled', true);
      $("#referencia").prop('disabled', true);
      $("#telefono").prop('disabled', true);
      $("#telefono2").prop('disabled', true);
      document.querySelectorAll('#show_modaldireccion .modal-footer button')[0].disabled=false;
      document.querySelectorAll('#show_modaldireccion .modal-footer button')[1].disabled=true;
      document.querySelectorAll('#show_modaldireccion .modal-footer button')[2].disabled=true;
    }).catch(error => {
      document.getElementById('validardireccion').innerHTML = 'No se pudo actualizar la direccion...';
      document.getElementById('validardireccion').style.color = "red";
      document.getElementById('validardireccion').style.fontWeight = "bold"; 
      console.log(error);    
    })
     

  }
  window.nuevodireccion = function(){
    accion='nuevo';
    $('#direcciones > tbody tr').css('background-color','');
    $('#direcciones > tbody tr').css('color','');
    $("#direccion").prop('disabled', false);
    $("#distrito").prop('disabled', false);
    $("#referencia").prop('disabled', false);
    $("#telefono").prop('disabled', false);
    $("#telefono2").prop('disabled', false);

    $("#direccion").val('');
    $("#distrito").val(0);
    $("#referencia").val('');
    $("#telefono").val('');
    $("#telefono2").val('');
    $("#direccion").focus();
    document.getElementById('validardireccion').innerHTML = '';

    document.querySelectorAll('#show_modaldireccion .modal-footer button')[0].disabled=true;
    document.querySelectorAll('#show_modaldireccion .modal-footer button')[1].disabled=true;
    document.querySelectorAll('#show_modaldireccion .modal-footer button')[2].disabled=false;
  }
  window.salirdireccion = function(){

  $("#direccion").val('');
  $("#distrito").val(0);
  $("#referencia").val('');
  $("#telefono").val('');
  $("#telefono2").val('');
  document.getElementById('validardireccion').innerHTML = '';
  $("#direccion").prop('disabled', true);
  $("#distrito").prop('disabled', true);
  $("#referencia").prop('disabled', true);
  $("#telefono").prop('disabled', true);
  $("#telefono2").prop('disabled', true);
  document.querySelectorAll('#show_modaldireccion .modal-footer button')[0].disabled=false;
  document.querySelectorAll('#show_modaldireccion .modal-footer button')[1].disabled=true;
  document.querySelectorAll('#show_modaldireccion .modal-footer button')[2].disabled=true;
  }

/*
  window.guardardatosconfirmacion1 = function() {
    var r = confirm("Desea guardar los datos de la programación?");
    if (r == true) {
    document.getElementById("guardar_programacion").innerHTML = 'Actualizando registro...';
    document.getElementById("guardar_programacion").style.color = "blue";
    document.getElementById("guardar_programacion").style.fontWeight = "bold";  
    $.ajax({
      url : '/programacion/guardar_datos_confirmacion',//+$("#codigoasignacionaconfirmar").val(),   
      data:"{\"codigoasignacionaconfirmar\":"+$("#codigoasignacionaconfirmar").val() 
      +",\"especialidad\":" + JSON.stringify($('#especialidad').val()=='006,010'?'006':($('#especialidad').val()=='012,003,009'?'012':$('#especialidad').val()))
      +",\"nom_clasif\":" + JSON.stringify($('#nom_clasif').val())
      +",\"medico\":" + JSON.stringify($('#medico').val())
      +",\"nom_medico\":" + JSON.stringify($( "#medico option:selected" ).text())
      +",\"\":" + JSON.stringify($('#horini').val())
      //+",\"horfin\":" + JSON.stringify($('#horfin').val()=='00:00'?'24:00':'00:00')
      +",\"horfin\":" + JSON.stringify($('#horfin').val())
      +",\"botiquin\":" + JSON.stringify($('#botiquin').val())
      +",\"tablet\":" + JSON.stringify($('#tablet').val().trim()=='0'?'null':$('#tablet').val())
      +",\"maletin\":" + JSON.stringify($('#maletin').val().trim()=='0'?'':$('#maletin').val())
      +",\"fec_asignacion\":" + JSON.stringify($('#fec_asignacion').val())
      +",\"turnodetalle\":" + JSON.stringify($('#turnodetalle').val())
      +",\"des_doc\":" + JSON.stringify($('#des_doc').val())
      +",\"ind_doc\":" + JSON.stringify($('#ind_doc').val()) //revisarahorita
      +",\"lugarecojo\":" + JSON.stringify($('#recojo').val().trim())
      +",\"ubigeo_recojo\":" + JSON.stringify($('#ubigeo_recojo').val().trim())
      + ",\"lugartermino\":" + JSON.stringify($('#termino').val().trim() )
      +",\"ubigeo_termino\":" + JSON.stringify($('#ubigeo_termino').val().trim())
      + ",\"cod_prov_motorizado\":" + JSON.stringify($('#proveedor').val() )
      +",\"cod_mot\":"+ JSON.stringify($('#conductor').val() )
      +",\"estadoprog\":"+ JSON.stringify(document.getElementById('estadoprog').innerHTML=='CONFIRMADO'?2:document.getElementById('estadoprog').innerHTML=='SIN CONFIRMAR'?1:0 )
      +",\"nom_mot\":"+ JSON.stringify($( "#conductor option:selected" ).text()) 
      + ",\"mpos\":" + JSON.stringify($('#mpos').val() )
      + ",\"horini_mot\":" + JSON.stringify($('#horini_mot').val() )
      //+ ",\"horfin_mot\":" + JSON.stringify($('#horfin_mot').val()=='00:00'?'24:00':'00:00' )+ "}",
      + ",\"horfin_mot\":" + JSON.stringify($('#horfin_mot').val())+ "}",
      method:'POST',

      success:function(data) {   
        
        if (data.trim() == '"No se guardo"'){
          document.getElementById("guardar_programacion").innerHTML = 'No se guardo';
          document.getElementById("guardar_programacion").style.color = "red";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";         
         }else if (data.trim() == '"No existe hora disponible"'){
          alert( '"No existe hora disponible"');
          document.getElementById("guardar_programacion").innerHTML = '"No existe hora disponible"...';
          document.getElementById("guardar_programacion").style.color = "red";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";  
         }else{
         
          document.getElementById("guardar_programacion").innerHTML = 'Actualizado';
          document.getElementById("guardar_programacion").style.color = "blue";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";    
          if (document.getElementById("busquedaproveedor")) document.getElementById("busquedaproveedor").click();
          if (document.getElementById("busqueda")) document.getElementById("busqueda").click();

         }

      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
        document.getElementById("guardar_programacion").innerHTML = 'No se guardo';
        document.getElementById("guardar_programacion").style.color = "red";
        document.getElementById("guardar_programacion").style.fontWeight = "bold";    
      }
    });
    
    } 

    else {
       return;
    }  

  }*/

  window.guardardatosconfirmacion = async function() {
    var r = confirm('Desea guardar los datos de la programación?');
    
    if (r == true) {

    //document.getElementById("guardar_programacion").innerHTML = 'Actualizando registro...';
    //document.getElementById("guardar_programacion").style.color = "blue";
    document.getElementById("guardar_programacion").innerHTML = 'Listo';
    document.getElementById("guardar_programacion").style.color = "green";
    document.getElementById("guardar_programacion").style.fontWeight = "bold";
    
   
    var especialidad = document.getElementById('especialidad').value;

    if (especialidad === '006,010') {
      especialidad = '006';
    } else if (especialidad === '012,003,009') {
      especialidad = '012';
    }
    
    await fetch('/programacion/guardar_datos_confirmacion', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigoasignacionaconfirmar : document.getElementById('codigoasignacionaconfirmar').value,
        especialidad :  especialidad,
        nom_clasif: document.getElementById('nom_clasif').value,
        medico: document.getElementById('medico').value,
        nom_medico: document.getElementById('medico').options[document.getElementById('medico').selectedIndex].text,
        horini: document.getElementById('horini').value,
        horfin: document.getElementById('horfin').value,
        botiquin: document.getElementById('botiquin').value,
        maletin: document.getElementById('maletin').value || '',
        tablet: document.getElementById('tablet').value || '',
        fec_asignacion: document.getElementById('fec_asignacion').value,
        turnodetalle: document.getElementById('turnodetalle').value,
        des_doc: document.getElementById('des_doc').value,
        ind_doc: document.getElementById('ind_doc').value,
        lugarecojo: document.getElementById('recojo').value,
        ubigeo_recojo: document.getElementById('ubigeo_recojo').value,
        lugartermino: document.getElementById('termino').value,
        ubigeo_termino: document.getElementById('ubigeo_termino').value,
        cod_prov_motorizado: document.getElementById('proveedor').value,
        cod_mot: document.getElementById('conductor').value,
        estadoprog: document.getElementById('estadoprog').innerHTML=='CONFIRMADO'?2:document.getElementById('estadoprog').innerHTML=='SIN CONFIRMAR'?1:0,
        nom_mot: document.getElementById('conductor').options[document.getElementById('conductor').selectedIndex].text,
        mpos:document.getElementById('mpos').value,
        horini_mot: document.getElementById('horini_mot').value,
        horfin_mot: document.getElementById('horfin_mot').value

         })
    
       }).then(response => response.json())
      .then(function (data ) {
        
         if (data.trim() == '"No se guardo"'){
          document.getElementById("guardar_programacion").innerHTML = 'No se guardo';
          document.getElementById("guardar_programacion").style.color = "red";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";         
         }else if (data.trim() == '"No existe hora disponible"'){
          alert( '"No existe hora disponible"');
          document.getElementById("guardar_programacion").innerHTML = '"No existe hora disponible"...';
          document.getElementById("guardar_programacion").style.color = "red";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";  
         }else{
         
          document.getElementById("guardar_programacion").innerHTML = 'Actualizado';
          document.getElementById("guardar_programacion").style.color = "blue";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";    
          if (document.getElementById("busquedaproveedor")) document.getElementById("busquedaproveedor").click();
          if (document.getElementById("busqueda")) document.getElementById("busqueda").click();

         }

      }).catch(error => {
        console.log(error);
        
      });

    } 
    else {
       return;
    }  
  

  }



  
  
  window.nuevodatosconfirmacion = function() {
    var r = confirm("Desea registrar los datos de la programación?");
    if (r == true) {
       
    } else {
       return;
    }  
    document.getElementById("guardar_programacion").innerHTML = 'Guardando nuevo registro...';
    document.getElementById("guardar_programacion").style.color = "blue";
    document.getElementById("guardar_programacion").style.fontWeight = "bold";  
    $.ajax({
      url : '/programacion/nuevo_datos_confirmacion',//+$("#codigoasignacionaconfirmar").val(),   
	  data:"{\"especialidad\":" + JSON.stringify($('#especialidad').val()=='006,010'?'006':($('#especialidad').val()=='012,003,009'?'012':$('#especialidad').val()))
      +",\"nom_clasif\":" + JSON.stringify($('#nom_clasif').val())
      +",\"medico\":" + JSON.stringify($('#medico').val())
      +",\"nom_medico\":" + JSON.stringify($( "#medico option:selected" ).text())
      +",\"horini\":" + JSON.stringify($('#horini').val())
      //+",\"horfin\":" + JSON.stringify($('#horfin').val()=='00:00'?'24:00':'00:00')
      +",\"horfin\":" + JSON.stringify($('#horfin').val())
      +",\"botiquin\":" + JSON.stringify($('#botiquin').val())
      +",\"tablet\":" + JSON.stringify($('#tablet').val().trim()=='0'?'null':$('#tablet').val())
      +",\"maletin\":" + JSON.stringify($('#maletin').val().trim()=='0'?'':$('#maletin').val())
      +",\"fec_asignacion\":" + JSON.stringify($('#fec_asignacion').val())
      +",\"turnodetalle\":" + JSON.stringify($('#turnodetalle').val())
      +",\"des_doc\":" + JSON.stringify($('#des_doc').val())
      +",\"ind_doc\":" + JSON.stringify($('#ind_doc').val())
      +",\"lugarecojo\":" + JSON.stringify($('#recojo').val())
      +",\"ubigeo_recojo\":" + JSON.stringify($('#ubigeo_recojo').val())
      + ",\"lugartermino\":" + JSON.stringify($('#termino').val() )
      +",\"ubigeo_termino\":" + JSON.stringify($('#ubigeo_termino').val())
      + ",\"cod_prov_motorizado\":" + JSON.stringify($('#proveedor').val() )
      +",\"cod_mot\":"+ JSON.stringify($('#conductor').val() )
      +",\"estadoprog\":"+ JSON.stringify(0)
      +",\"nom_mot\":"+ JSON.stringify($( "#conductor option:selected" ).text()) 
      + ",\"mpos\":" + JSON.stringify($('#mpos').val() )
      + ",\"horini_mot\":" + JSON.stringify($('#horini_mot').val() )
      //+ ",\"horfin_mot\":" + JSON.stringify($('#horfin_mot').val()=='00:00'?'24:00':'00:00' )+ "}",
      + ",\"horfin_mot\":" + JSON.stringify($('#horfin_mot').val())+ "}",
      method:'POST',

      success:function(data) {   
        
        if (data.trim() == '"No se registro"'){
          document.getElementById("guardar_programacion").innerHTML = 'No se registro';
          document.getElementById("guardar_programacion").style.color = "red";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";         
         }else{
           
          document.getElementById('estadoprog').innerHTML = 'REGISTRADO';

          document.getElementById("codigoasignacionaconfirmar").value = data.trim();
          document.getElementById("guardar_programacion").innerHTML = 'Registrado';
          document.getElementById("guardar_programacion").style.color = "blue";
          document.getElementById("guardar_programacion").style.fontWeight = "bold";    
          document.getElementById("busqueda").click();
         }

      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
        document.getElementById("guardar_programacion").innerHTML = 'No se registro';
        document.getElementById("guardar_programacion").style.color = "red";
        document.getElementById("guardar_programacion").style.fontWeight = "bold";    
      }
    });
  }
  window.confirmardireccion = function() {
    var recojo = $('#recojo').val();
    var termino = $('#termino').val();
    /* if(recojo =='' &&  typeof nom_prov_motorizado_b == 'undefined'){  pedrojesus18022022
      document.getElementById("recojovalida").innerHTML = 'Requerido';
      document.getElementById("recojovalida").style.color = "red";
      document.getElementById("recojovalida").style.fontWeight = "bold"; 
      document.getElementById("recojovalida").style.display = "inline"; 

    }else{
      document.getElementById("recojovalida").innerHTML = '';

    }

    if(termino ==''  &&  typeof nom_prov_motorizado_b == 'undefined'){
      document.getElementById("terminovalida").innerHTML = 'Requerido';
      document.getElementById("terminovalida").style.color = "red";
      document.getElementById("terminovalida").style.fontWeight = "bold";    
      document.getElementById("terminovalida").style.display = "inline"; 

    }else{
      document.getElementById("terminovalida").innerHTML = '';
    }
    if((recojo=='' || termino =='' ) &&  typeof nom_prov_motorizado_b == 'undefined' ){
        return false;
    } pedrojesus18022022 */
    var r = confirm("Desea confirmar la programación?");
    if (r == true) {
       
    } else {
       return;
    }  
    document.getElementById("estadoprog").innerHTML = 'Actualizando...';
    document.getElementById("estadoprog").style.color = "white";
    document.getElementById("estadoprog").style.fontWeight = "bold";  
    $.ajax({
      url : '/programacion/confirmarasignacion',//+$("#codigoasignacionaconfirmar").val(),   
      data:"{\"codigoasignacionaconfirmar\":"+$("#codigoasignacionaconfirmar").val() +",\"lugarecojo\":" + JSON.stringify($('#recojo').val().trim()) + ",\"lugartermino\":"+ JSON.stringify($('#termino').val().trim()) + ",\"ubigeo_recojo\":"+ JSON.stringify($('#ubigeo_recojo').val().trim()) + ",\"ubigeo_termino\":"+ JSON.stringify($('#ubigeo_termino').val().trim()) + ",\"des_doc\":"+ JSON.stringify($('#des_doc').val().trim())+ ",\"ind_doc\":"+ JSON.stringify($('#ind_doc').val().trim()) +"}",
      method:'POST',
      success:function(data) {   
        
        if (data.trim() == '"No se confirmo"'){
          document.getElementById("estadoprog").innerHTML = 'No se confirmo';
          document.getElementById("estadoprog").style.color = "red";
          document.getElementById("estadoprog").style.fontWeight = "bold";         
         }else{
          
          document.getElementById("estadoprog").innerHTML = 'CONFIRMADO';
          document.getElementById("estadoprog").style.color = "white";
          document.getElementById("estadoprog").style.fontWeight = "bold";    
          if (document.getElementById("busqueda")) document.getElementById("busqueda").click(); 
          if (document.getElementById("busquedaproveedor")) document.getElementById("busquedaproveedor").click();       

         }
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
        document.getElementById("estadoprog").innerHTML = 'No se confirmo';
        document.getElementById("estadoprog").style.color = "red";
        document.getElementById("estadoprog").style.fontWeight = "bold";    
      }
    });
  }
  window.desconfirmardireccion = function() {

    var r = confirm("Desea desconfirmar la programación?");
    if (r == true) {
       
    } else {
       return;
    }  
    $.ajax({
      url : '/programacion/desconfirmarasignacion',//+$("#codigoasignacionaconfirmar").val(),   
      data:"{\"codigoasignacionaconfirmar\":"+$("#codigoasignacionaconfirmar").val() +",\"lugarecojo\":" + JSON.stringify($('#recojo').val()) + ",\"lugartermino\":"+ JSON.stringify($('#termino').val() )  +"}",
      method:'POST',

      success:function(data) {   
       
        
        if (data == '"No se desconfirmo"'){
           document.getElementById("estadoprog").innerHTML = 'No se desconfirmo';
          document.getElementById("estadoprog").style.color = "red";
          document.getElementById("estadoprog").style.fontWeight = "bold"; 
        }else{
           
          alert( 'Se desconfirmo');

           document.getElementById("estadoprog").innerHTML = 'SIN CONFIRMAR';
          document.getElementById("estadoprog").style.color = "white";
          document.getElementById("estadoprog").style.fontWeight = "bold";    
          document.getElementById("busqueda").click();
         }
      

      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert(errorThrown +'Error get data from ajax');
        document.getElementById("estadoprog").innerHTML = 'No se desconfirmo';
        document.getElementById("estadoprog").style.color = "red";
        document.getElementById("estadoprog").style.fontWeight = "bold";    
      }
    });
  }

window.cambioesp = function(val){
  var valmodi;
  if (val == '006,010'){
    valmodi = "006','010";
  }
  else if (val == '012,003,009'){
    valmodi =  "012','003','009";
  }else{
    valmodi= val;

  }

  if(typeof nom_prov_motorizado_b !== 'undefined')  {
    Promise.all([
      fetch(`/programacion/get_doctorxespecialidadxproveedor/`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_esp_sel: valmodi,
          nom_proveedor:nom_prov_motorizado_b
        })
      }),
    fetch('/programacion/get_botiquinxespecialidad/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cod_esp_sel: valmodi
      })
    }),
  ]).then(async([aa, bb]) => {
    const a = await aa.json();
    const b = await bb.json();
    return [a, b];
  })
  .then((x) => {
     
    document.getElementById('medico').innerHTML = listOfNamesdr(x[0]);
  
    document.getElementById('botiquin').innerHTML = listOfNamesbot(x[1]);

  }).catch((err) => {
    console.log(err);
  }); 
  }else{
    Promise.all([
      fetch(`/programacion/get_doctorxespecialidad/`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_esp_sel: valmodi
        })
      }),
    fetch('/programacion/get_botiquinxespecialidad/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cod_esp_sel: valmodi
      })
    }),
  ]).then(async([aa, bb]) => {
    const a = await aa.json();
    const b = await bb.json();
    return [a, b];
  })
  .then((x) => {
     
    document.getElementById('medico').innerHTML = listOfNamesdr(x[0]);
  
    document.getElementById('botiquin').innerHTML = listOfNamesbot(x[1]);

  }).catch((err) => {
    console.log(err);
  }); 
  }
             
}
window.checkStatus = function(response) {
  if (response.ok) {
      return Promise.resolve(response);
  } else {
      return Promise.reject(new Error(response.statusText));
  }
}

window.parseJSON  = function (response) {
return response.json();
}
window.cambioprov = function(val){
                                                                           
                   
const urls = [     
        '/programacion/get_conductores_proveedor/'+val,
        '/mantenimiento/gettablets/'+val,
        '/mantenimiento/getmaletines/'+val 
     ];

Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)  // check the response of our APIs
                .then(parseJSON)    // parse it to Json
                .catch(error => console.log('error', error))
        ))
            .then(data => {
                // assign to requested URL as define in array with array index.
           
                document.getElementById('conductor').innerHTML = listOfNamescond(data[0]);
                document.getElementById('tablet').innerHTML =  listOfNamestablets(data[1])  ;
                document.getElementById('maletin').innerHTML =  listOfNamesmaletines(data[2]) ;
            })

               
}


$('#proveedor').change(function(evt,param1) {
  var conductores ;
  if($('#proveedor').val() != '0'){
      conductores = $("#conductor");
    $.ajax({
        url : '/programacion/get_conductores_proveedor/'+$("#proveedor").val(),   
        dataType : 'JSON',
        method:'POST',

        success:function(data) {   
         
            conductores.find('option').remove();
            conductores.append('<option value="0">Seleccione</option>');
          $(data).each(function(i, v){ // indice, valor
            if(v.cod_mot == param1){
            
              conductores.append('<option value="' + v.cod_mot + '" selected >' + v.nom_mot + '</option>');
            }else{
              conductores.append('<option value="' + v.cod_mot + '">' + v.nom_mot + '</option>');
            }
         
          })
           
          conductores.val((param1)?param1:0);  

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          console.log(errorThrown);
          
        }
      });
 }else
 {
  conductores = $("#conductor");
    conductores.find('option').remove();
    
 }
});
   var deshabilitados=[];

  

  

window.tableToJson = function(table) {
  var data = [];

  // first row needs to be headers
  var headers = [];
  for (var i=0; i<table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
  }

  // go through cells
  for (var i=1; i<table.rows.length; i++) {

      var tableRow = table.rows[i];
      var rowData = {};

      for (var j=0; j<tableRow.cells.length; j++) {

          rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

      }

      data.push(rowData);
  }       

  return data;
}


window.tableToJsonexcel = function(table) {
  var data = [];
 var rowData = [];
  // first row needs to be headers
  var headers = [];
  for (var i=0; i<table.rows[0].cells.length; i++) {
	  if(i==0||i==1||i==9||i==10||i==11||i==12||i==13){
         headers.push(table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi,''));
	  }
  }
  data.push(headers);
  
  // go through cells
  for (var i=2; i<table.rows.length; i++) {

      var tableRow = table.rows[i];
     

      for (var j=0; j<tableRow.cells.length; j++) {
	     if(j==0){
			    rowData.push( tableRow.cells[j].innerHTML);
		   }
       if(j==1){
        rowData.push( tableRow.cells[j].innerHTML);
     }
      }

      data.push(rowData);
	 rowData = [];
  }       

  return data;
}
window.sortFunction= function(a,b){  
  /*    var dateA = new Date(a.date).getTime();
     var dateB = new Date(b.date).getTime(); */
     //return dateA > dateB ? 1 : -1;  
     return a.codigo > b.codigo ? -1 : 1;  

 }; 
window.tableToJsonhorarios= function(table) {
  var data = [];
 var rowData = [];
  // first row needs to be headers
  var headers = [];
  for (var i=0; i<table.rows[0].cells.length; i++) {
	   
         headers.push(table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi,''));
	  
  }
 // data.push(headers);
  
  // go through cells
  for (var i=1; i<table.rows.length; i++) {

      var tableRow = table.rows[i];
     

      for (var j=0; j<tableRow.cells.length; j++) {
	      
			    rowData.push( tableRow.cells[j].innerHTML);
		  
	
      }

      data.push(rowData);
    
	 rowData = [];
  }       
  data.sort(sortFunction);
  data.unshift(headers);
  //data.forEach(function(v){ v.pop();  });

  return data;
}
window.tabletoarrayjsonhorarios= function(table) {
  var data = [];
 var rowData = [];
  // first row needs to be headers
  var headers = [];
   headers.push("FECHA");
  headers.push("DOCTOR");
  headers.push("TURNO");
  headers.push("NOM_CLASIF");
  headers.push("DESCRIPCION");

  headers.push("HORINI");
  headers.push("HORFIN");
  headers.push("ATENCION");
  headers.push("HORA_ULTIMA_ATENCION");
  headers.push("DISTRITO");
  headers.push("PROVEEDOR");
  headers.push("CONDUCTOR");
  headers.push("HOR_INI");
  headers.push("HOR_FIN");
  headers.push("EXTENSION");
  headers.push("HORA_ADMINISTRATIVA");
  headers.push("HORA_EFECTIVA");
  headers.push("HORAS_TOTALES");

  
  for (var i=0; i<table.length; i++) {
 


      data.push(Object.values(table[i]));
    
   }       
 // data.sort(sortFunction);
  data.unshift(headers);
 // data.forEach(function(v){ v.pop();  });

  return data;
}
 window.guardarproveedor = function() {

 
  var r = confirm("Desea enviar al proveedor "+ document.getElementById('asignacion_proveedor').options[document.getElementById('asignacion_proveedor').selectedIndex].text +"?");
  if (r == true) {
     
  } else {
     return;
  }
   if (document.getElementById('asignacion_turno').value.trim()=='0'){
    
    document.getElementById("validaenviar_remisse").innerHTML = 'No selecciono turnos';
    document.getElementById("validaenviar_remisse").style.color = "red";
    document.getElementById("validaenviar_remisse").style.fontWeight = "bold";  
    return;
   }
   document.getElementById("validaenviar_remisse").innerHTML = 'Enviando al proveedor';
   document.getElementById("validaenviar_remisse").style.color = "blue";
   document.getElementById("validaenviar_remisse").style.fontWeight = "bold";  
     
  var codigosasinconfirmarprove   = []; //pedrito
    $('#tabla1 tbody tr').each(function() {
    var tr0;
    tr0 =  $(this);
     
        $(this).find('input:checked').each(function() {    
          codigosasinconfirmarprove.push(tr0[0].cells[1].children[0].innerHTML); 
                
        });
    });
    
     $.ajax({
    method:'POST',
    contentType:'application/json',
    url : '/programacion/guardarproveedor',   
    data :  "{\"proveedor\":"+ JSON.stringify($("#asignacion_proveedor").val())  +  ",\"codigos\":" + JSON.stringify(codigosasinconfirmarprove) +  ",\"fecpro_asig\":" + JSON.stringify($("#fec_asignacion_proveedor").val()) + "}",

    success:function(data) {                     
      if (data == '"No se guardo proveedor"'){
        alert( 'No se envio al proveedor');
        document.getElementById("validaenviar_remisse").innerHTML = 'No se envio al proveedor';
        document.getElementById("validaenviar_remisse").style.color = "red";
        document.getElementById("validaenviar_remisse").style.fontWeight = "bold";  
      }else{
        
        document.getElementById("validaenviar_remisse").innerHTML = 'Se envio al proveedor ';
        document.getElementById("validaenviar_remisse").style.color = "blue";
        document.getElementById("validaenviar_remisse").style.fontWeight = "bold";  
        document.getElementById("busqueda").click();

      }
      
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
      alert(errorThrown +'Error get data from ajax');
      document.getElementById("validaenviar_remisse").innerHTML = 'No se envio al proveedor';
      document.getElementById("validaenviar_remisse").style.color = "red";
      document.getElementById("validaenviar_remisse").style.fontWeight = "bold";  
    }
    });  
}

$('#guardarremisse').click(function() {
  document.getElementById("resultado").innerHTML = '';

  var nombreconductor="";
  var codigosaproveedor   = []; //pedrito
  table = document.getElementById("t02");  
//  table.deleteRow(0);
if ( document.getElementById("spinner")){
  document.getElementById("spinner").parentElement.parentElement.remove();
}
    $('#tabla1 tbody tr').each(function() {
    var tr0;
    tr0 =  $(this);
          var registro = new Object();
          registro.cod_asig = tr0[0].cells[0].innerHTML ;
          registro.conductor = tr0[0].cells[9].firstChild.value;
 
          nombreconductor = (tr0[0].cells[9].firstChild.selectedIndex=='0')?'':(tr0[0].cells[9].firstChild.options[tr0[0].cells[9].firstChild.selectedIndex].text).split('-');
          registro.nombreconductor = (nombreconductor=='')?'':nombreconductor[1] ;

          registro.mpos = tr0[0].cells[10].firstChild.value;
          registro.botiquin = tr0[0].cells[11].firstChild.value;
          registro.tablet = tr0[0].cells[12].firstChild.value;
          registro.maletin = tr0[0].cells[13].firstChild.value;
           
         // if(tr0[0].cells[0].firstChild.nextSibling.checked==true){
            codigosaproveedor.push(registro); 
         // }
    });
    if (codigosaproveedor.length < 1 ){
      document.getElementById("resultado").innerHTML = 'No hay registros para guardar';
      document.getElementById("resultado").style.color = "red";
      document.getElementById("resultado").style.fontWeight = "bold";   
      return false;
    }else{
      document.getElementById("resultado").innerHTML = '';
      document.getElementById("resultado").style.color = "blue";
      document.getElementById("resultado").style.fontWeight = "bold"; 
    }
    vaciostotal =false;

    codigosaproveedor.forEach(checkProperties);
    if(vaciostotal){
      
      document.getElementById("resultado").innerHTML = 'Estan vacios los campos';
      document.getElementById("resultado").style.color = "red";
      document.getElementById("resultado").style.fontWeight = "bold";       
      return false;
    }else{  
      
      document.getElementById("resultado").innerHTML = 'Guardando datos.....';
      document.getElementById("resultado").style.color = "blue";
      document.getElementById("resultado").style.fontWeight = "bold"; 
      var d = new Date();
      //var fecha = document.getElementById('fec_inicial').value;
      var fechabody = document.querySelector("#tabla1 > tbody > tr").cells[6].innerHTML;
      var n =   fechabody +" " + d.getHours()+":"+d.getMinutes();
      //fechabody = document.querySelector("tabla1 tbody tr");
        $.ajax({
        method:'POST',
        contentType:'application/json',
        url : '/programacion/guardarconductor',   
        data :  "{\"codigosaproveedor\":"+ JSON.stringify(codigosaproveedor) +",\"hora\":" + JSON.stringify(n) +",\"cod_prov_motorizado_b\":" + JSON.stringify(cod_prov_motorizado_b) + "}",
         success:function(data) {
           var rpta=''; 
                             
           if(data.trim()=='"fechainvalida"'){
            alert( 'No se puede guardar fechas anteriores');
            document.getElementById("resultado").innerHTML = 'No se guardaron datos....';
            document.getElementById("resultado").style.color = "blue";
            document.getElementById("resultado").style.fontWeight = "bold"; 
           }else if(data.trim()=='"11"'){
            alert( 'Solo se puede registrar hasta las 11:00 AM');
            document.getElementById("resultado").innerHTML = 'No se guardaron datos....';
            document.getElementById("resultado").style.color = "blue";
            document.getElementById("resultado").style.fontWeight = "bold"; 
           }else if(data.trim()=='"10"'){
            alert( 'Solo se puede registrar hasta las 22:00 PM');
            document.getElementById("resultado").innerHTML = 'No se guardaron datos....';
            document.getElementById("resultado").style.color = "blue";
            document.getElementById("resultado").style.fontWeight = "bold"; 
           }else if (data.trim() == '"No se guardaron datos"'){
            alert( 'No se guardaron datos');
            document.getElementById("resultado").innerHTML = 'No se guardaron datos....';
            document.getElementById("resultado").style.color = "blue";
            document.getElementById("resultado").style.fontWeight = "bold"; 
           }else{ 
             
         
            //document.getElementById("busquedaremisse").click();
           asignados = JSON.parse(data);
           for (const key in asignados ) {
            
            if(!asignados[key]){
            rpta= rpta+ `${key},` ;
            document.getElementById(key).style.backgroundColor ='red';
            document.getElementById(key).style.color ='white';

            }
           }
           if(rpta!=''){
          document.getElementById("resultado").innerHTML = 'Se registraron los conductores.....,excepto '+rpta;
          document.getElementById("resultado").style.color = "red";
          document.getElementById("resultado").style.fontWeight = "bold"; 
           }else{

            document.getElementById("resultado").innerHTML = 'Se registraron los conductores.....';
            document.getElementById("resultado").style.color = "blue";
            document.getElementById("resultado").style.fontWeight = "bold"; 
           }
           }
     
          },
        error: function (jqXHR, textStatus, errorThrown)
        {
           document.getElementById("resultado").innerHTML = errorThrown +'Error get data from ajax';
          document.getElementById("resultado").style.color = "blue";
          document.getElementById("resultado").style.fontWeight = "bold"; 

        }
        });    
    }  
   
});
 
var vacios=false;
var vaciostotal=false;
var vaciostotalfila = false;

function checkProperties(value, index, array) {
  //vaciostotal=false;
  var obj = value;
    for (var key in obj) {
     if( obj[key].trim() != "" && obj[key] != "Seleccione"){
      vacios =  false;
      console.dir(obj[key]);
      vaciostotal = vaciostotal||vacios;
      document.querySelector('tr[id="'+obj['cod_asig']+'"]' ).style.backgroundColor = "";
      document.querySelector('tr[id="'+obj['cod_asig']+'"]' ).style.color = "";
     }else{
       console.dir(obj[key]);
       vacios =  true;
       document.querySelector('tr[id="'+obj['cod_asig']+'"]' ).style.backgroundColor = "#ff3f3f";
       document.querySelector('tr[id="'+obj['cod_asig']+'"]' ).style.color = "white";
       vaciostotal = vaciostotal||vacios;
      break;
     }
     

    }
 
  return vaciostotal;
}
 

Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i]!='null' && !arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
}
window.getColumn =function(table_id, col) {
  var tab = document.getElementById(table_id),
      n = tab.rows.length,
      arr = [],
      row;
      
  if (col < 0) {
      return arr; // Return empty Array.
  }
  for (row = 1; row < n; ++row) {
      if (tab.rows[row].cells.length > col && tab.rows[row].cells[0].children[0].checked && tab.rows[row].cells[18].innerText !='Confirmado' ) {

          arr.push(tab.rows[row].cells[col].innerText);
      }
  }
  return arr;
}
window.getColumnconfirmado = function(table_id, col) {
  var tab = document.getElementById(table_id),
      n = tab.rows.length,
      arr = [],
      row;
      
  if (col < 0) {
      return arr; // Return empty Array.
  }
  for (row = 1; row < n; ++row) {
      if (tab.rows[row].cells.length > col && tab.rows[row].cells[0].children[0].checked && (tab.rows[row].cells[18].children[0].innerText =='Confirmado' || tab.rows[row].cells[18].children[0].innerText =='Sin confirmar') ) {

          arr.push(tab.rows[row].cells[col].innerText);
      }
  }
  return arr;
}
window.getColumngmail = function(table_id, col) {
  var tab = document.getElementById(table_id),
      n = tab.rows.length,
      arr = [],
      row;
      
  if (col < 0) {
      return arr; // Return empty Array.
  }
  for (row = 1; row < n; ++row) {
      if (tab.rows[row].cells.length > col && tab.rows[row].cells[0].children[0].checked) {
        console.dir(tab.rows[row].cells[0].children[0].checked );

          arr.push(tab.rows[row].cells[col].innerText);
      }
  }
  return arr;
}

   $('#excel').click(function() {

    var tablejson;
     var tableSelect = document.getElementById("tabla1");
    var table2 = document.createElement("table");
    table2.id = 'table2';
    var thead2 = document.createElement("thead");
    var tr2 = document.createElement("tr");
    var th21 = document.createElement("th");
    th21.innerHTML = "Fecha";
    tr2.appendChild( th21);
    var th22 = document.createElement("th");
    th22.innerHTML = "Doctor";
    tr2.appendChild( th22);
    var th23 = document.createElement("th");
    th23.innerHTML = "Turno";
    tr2.appendChild( th23);
    var th24 = document.createElement("th");
    th24.innerHTML = "Clasificacion";
    tr2.appendChild( th24);
    var th25 = document.createElement("th");
    th25.innerHTML = "Horini";
    tr2.appendChild( th25);
    var th26 = document.createElement("th");
    th26.innerHTML = "Horfin";
    tr2.appendChild( th26);
    var th27 = document.createElement("th");
    th27.innerHTML = "Descripcion";
    tr2.appendChild( th27);
    var th28 = document.createElement("th");
    th28.innerHTML = "codigo";
    tr2.appendChild( th28);
    thead2.appendChild( tr2);
    table2.appendChild(thead2);

    var tbody2 = document.createElement("tbody");
    var uniques,seleccionados;
    var seleccionados = getColumn("tabla1", 2); 

    var columnasasig = getColumngmail("tabla1", 21); 
    uniques = columnasasig.unique(); 
     
    if(seleccionados.length ==0){
      alert('Seleccionar solo programaciones que no esten en estado Confirmado. ');
      return;
     }
    
     if(uniques.length ==0){
      alert('Doctor no tiene configurado el correo');
      return;
     }else{
       email = uniques[0];
       console.dir(email);
     }
     document.getElementById("resultado").innerHTML = 'Generando excel';
     document.getElementById("resultado").style.color = "blue";
     document.getElementById("resultado").style.fontWeight = "bold";   
     
     $('#tabla1 tbody tr').each(function() {
     
      var tr0;
      tr0 =  $(this);
  

     
      $(this).find('input:checked').each(function() {
        var tr = document.createElement("tr");
        //tr  =   tr0[0];
        var td1 = document.createElement("td");
        td1.innerHTML = tr0[0].cells[9].innerHTML;
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = tr0[0].cells[2].innerHTML;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = tr0[0].cells[5].innerHTML;
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.innerHTML = tr0[0].cells[7].innerHTML;
        tr.appendChild(td4);

        var td5 = document.createElement("td");
        td5.innerHTML = tr0[0].cells[10].innerHTML;
        tr.appendChild(td5);

        var td6 = document.createElement("td");
        td6.innerHTML = tr0[0].cells[11].innerHTML;
        tr.appendChild(td6);

        var td7 = document.createElement("td");
        td7.innerHTML = tr0[0].cells[8].innerHTML;
        tr.appendChild(td7);
        var td8 = document.createElement("td");
        td8.innerHTML = tr0[0].cells[1].innerHTML;
        tr.appendChild(td8);
        codigosasinconfirmar.push(tr0[0].cells[1].innerHTML); 
         
         
          tbody2.appendChild(tr);
         
      });
      $(this).find('input:not(:checked)').each(function() {
        deshabilitados.push(tr0[0].cells[1].innerHTML); 
      });  
      
      table2.appendChild(tbody2);
      

  
    });
      tablejson = tableToJson(table2);
   
    

var wb = XLSX.utils.book_new();
wb.Props = {
                Title: "PROGRAMACIONMEDICA",
                Subject: "PROGRAMACIONMEDICA",
                Author: "SUPERVISOR",
                CreatedDate: new Date()
        };
wb.SheetNames.push("Worksheet");
tab = document.getElementById('tabla1'); // id of table
 

 var ws_data = tableToJsonhorarios(table2);  //a row with 2 columns

var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Worksheet"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
       saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'programacion_medica.xlsx');
 
 
$.ajax({
  method:'POST',
  contentType:'application/json',
        
  url : '/programacion/download/',   
  data :  "{\"tablejson\":"+ JSON.stringify(tablejson)  +"}",
 

   success:function(data) {                     
     
    document.getElementById("resultado").innerHTML = "Se exporto el archivo programacion_medica.XLSX"; 
    document.getElementById("resultado").style.color = "blue";
    document.getElementById("resultado").style.fontWeight = "bold";
   },
  error: function (jqXHR, textStatus, errorThrown)
  {
    document.getElementById("resultado").innerHTML = errorThrown +'El archivo se encuentra abierto. Intente cerrarlo'; 
    document.getElementById("resultado").style.color = "red";
    document.getElementById("resultado").style.fontWeight = "bold";
    alert(errorThrown +'Error get data from ajax');
  }
});

});
//papu mejora 02/08
$('#cambiar_estado1').click(function() {

// Obtener la fecha actual
var fechaActual = new Date();

// Obtener el año actual
var anioActual = fechaActual.getFullYear();

// Obtener el mes actual (los meses van de 0 a 11 en JavaScript)
var mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11

// Obtener el mes siguiente
var mesSiguiente = mesActual + 1;
var anioSiguiente = anioActual;

// Si el mes siguiente es enero (mes 12), avanzar al siguiente año
if (mesSiguiente === 13) {
  mesSiguiente = 1;
  anioSiguiente += 1;
}

// Asegurarse de que el mes y el día tengan dos dígitos
var mesFormateado = mesSiguiente.toString().padStart(2, '0');
var diaFormateado = '01'; // El primer día del mes siempre es 01

// Combinar año, mes y día en el formato deseado "yyyymmdd" para el primer día del mes siguiente
var fecha_inicio = `${anioSiguiente}${mesFormateado}${diaFormateado}`;

// Obtener el número de días en el mes siguiente
var ultimoDiaDelMesSiguiente = new Date(anioSiguiente, mesSiguiente, 0).getDate();

// Asegurarse de que el mes y el día tengan dos dígitos
var mesFormateado2 = mesSiguiente.toString().padStart(2, '0');
var diaFormateado2 = ultimoDiaDelMesSiguiente.toString().padStart(2, '0');

// Combinar año, mes y día en el formato deseado "yyyymmdd" para el último día del mes siguiente
var fecha_fin = `${anioSiguiente}${mesFormateado2}${diaFormateado2}`;

//alert(fecha_inicio +'/'+ fecha_fin);

console.log("Fecha de inicio del mes siguiente:", fecha_inicio);
console.log("Fecha de fin del mes siguiente:", fecha_fin);

var respuesta = confirm("¿Deseas pasar a estado 1 (SIN CONFIRMAR) todos los horarios en estado 0 (CONFIRMADOS) del siguiente mes?");
    
// Comprobar la respuesta y mostrar un mensaje según la elección del usuario
if (respuesta) {

  document.getElementById("resultado").innerHTML = 'Actualizando los horarios registrados del siguiente mes a estado 1...';
  document.getElementById("resultado").style.color = "blue";
  document.getElementById("resultado").style.fontWeight = "bold"; 
    
  fetch('/programacion/cambiar_estado1/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin
        })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("resultado").innerHTML = 'Se cumplió la actualización con éxito!';
      document.getElementById("resultado").style.color = "green";
      document.getElementById("resultado").style.fontWeight = "bold"; 
      return response.json();
    }
    return Promise.reject(new Error('Sucedio un error'));
  })
} 

});
//ahi termina

window.codigosasinconfirmar   = []; 
 
window.email;
window.body;
window.reconfirma = false;
$('#correo').click(function() {
  var tab = document.getElementById("tabla1"),  n = tab.rows.length,  row;
 
   if(codigosasinconfirmar.length==0){
    alert('Exportar primero las programaciones para el envio de correo');
    return false;
  }
  if(email==null||email.trim()==""){
    alert('Configurar el correo del doctor');
    return false;
  }
  printModal(`
  <div id="ed-modal-contentheader"  style="color: white;background:green;display:flex;justify-content:space-between;"><h4> Detalle</h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal btn-xs btn-danger">X</button></div>


<input type="radio" id="confirma" name="tipocorreo" value="confirma" checked><label for="confirma">Confirmacion</label><br> 
<input type="radio" id="reconfirma" name="tipocorreo" value="reconfirma"><label for="Opt_AreconfirmasoAmb">Reconfirmacion</label><br> 
 

<div   style="display:flex;justify-content:space-around	;">
<input type="button"  class="btn btn btn-success btn-sm"  id="btn_aceptar" name="btn_aceptar" onclick="correo();" value="Aceptar"> 
<input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelarcorreo" name="btn_cancelar" value="Cancelar"> 
</div>
`); 
})
window.correo = function(){
radios = document.getElementsByName('tipocorreo');
for (var i = 0, length = radios.length; i < length; i++) {
  if (radios[i].checked) {
    // do whatever you want with the checked radio
     
    if (radios[i].value=='reconfirma') {
      reconfirma = true;
     } else {
       reconfirma = false;
     }
    // only one radio can be logically checked, don't check the rest
    break;
  }
}
   var tab = document.getElementById("tabla1"),  n = tab.rows.length,  row;
 
  // if(codigosasinconfirmar.length==0){
  //   alert('Exportar primero las programaciones para el envio de correo');
  //   return false;
  // }
  // if(email==null||email.trim()==""){
  //   alert('Configurar el correo del doctor');
  //   return false;
  // } 
 
 
   
  fetch('/programacion/getbody/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
        })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Sucedio un error'));
  }).then(data => {
    if (reconfirma){
      body =  data['valor2'];
    }else{
      body =  data['valor1'];

    }
    console.dir(body);
    
    
     

    if (body != null && body !="" ) {
      if( body.trim() ==''){
       document.getElementById("resultado").innerHTML =  'Configurar el cuerpo del correo'; 
       document.getElementById("resultado").style.color = "red";
       document.getElementById("resultado").style.fontWeight = "bold"; 
       return Promise.reject(new Error('Configurar el cuerpo del correo'));
      }
     document.getElementById("resultado").innerHTML =  'Enviando correo a '+ email; 
     document.getElementById("resultado").style.color = "blue";
     document.getElementById("resultado").style.fontWeight = "bold";
   
   }else{
     document.getElementById("resultado").innerHTML =  'Configurar el cuerpo del correo'; 
     document.getElementById("resultado").style.color = "red";
     document.getElementById("resultado").style.fontWeight = "bold";
     return Promise.reject(new Error('Configurar el cuerpo del correo'));
   }
   $.ajax({
    method:'POST',
    contentType:'application/json',
          
    url : '/programacion/enviarCorreo/',   
    data :  "{\"email\":"+ JSON.stringify(email) +",\"codigosasinconfirmar\":"+ JSON.stringify(codigosasinconfirmar)+",\"deshabilitados\":"+ JSON.stringify(deshabilitados) +",\"body\":"+ JSON.stringify(body)+ ",\"reconfirma\":"+ JSON.stringify(reconfirma)  +"}",
    success:function(data) {                     
      document.getElementById("resultado").innerHTML =  'Se envio las programaciones al correo '+email; 
      document.getElementById("resultado").style.color = "blue";
      document.getElementById("resultado").style.fontWeight = "bold";
       for (i = 0; i < codigosasinconfirmar.length; i++) {
      
            for (row = 1; row < n; ++row) {
              if ( tab.rows[row].cells[1].innerText==codigosasinconfirmar[i]) {

              tab.deleteRow(row);
               row--;
               n--;
              }
            }
      } 
      document.getElementById("btn_cancelarcorreo").click();
      document.getElementById("cant").innerHTML = document.getElementById("cant").innerHTML.trim() - codigosasinconfirmar.length  ;

    codigosasinconfirmar   = []; 
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
      document.getElementById("resultado").innerHTML =  errorThrown +'Error get data from ajax';
      document.getElementById("resultado").style.color = "red";
      document.getElementById("resultado").style.fontWeight = "bold";
      alert(errorThrown +'Error get data from ajax');
    }
   });
   }).catch(error => {
     console.log(error);    
  })

   
}; 


 
$('#actualizar').click(function() {
     
  var especialidades = document.getElementById("especialidades");
  var opcespecialidades = especialidades.options[especialidades.selectedIndex].value;

  var distrito = document.getElementById("distrito");
  var opcdistrito = distrito.options[distrito.selectedIndex].text;

  var distrito2 = document.getElementById("distrito2");
  var opcdistrito2 = distrito2.options[distrito2.selectedIndex].text;

  var descripcion = opcdistrito + "/" + opcdistrito2;

  var msjerror ="";
      /*
      if( document.getElementById("desc_doc").value.trim() == ''){
        msjerror += "Ingresar lugar de recojo<br>";   
      } else{
        msjerror+=""; 
      }*/
      if (opcdistrito == 'Seleccione' || opcdistrito2 == 'Seleccione') {
        msjerror += "Ingresar lugar de recojo/termino<br>";
      }
    
      if (opcespecialidades == '0') {
        msjerror += "Ingresar especialidad<br>";
      }
      
       if(Object.keys($('#test3').scheduler('val')).length==0){
           msjerror += "Ingresar horarios";
        }else{
          msjerror+=""; 
        }

        if (msjerror != ""){
          document.getElementsByTagName('small')[0].innerHTML = msjerror;
          document.getElementsByTagName('small')[0].style.color = "red";
          document.getElementsByTagName('small')[0].style.fontWeight = "bold";
            return;
        }else{
          document.getElementsByTagName('small')[0].innerHTML = 'Actualizando.......';
          document.getElementsByTagName('small')[0].style.color = "blue";
          document.getElementsByTagName('small')[0].style.fontWeight = "bold";
        }

          $.ajax({
              method:'POST',
              contentType:'application/json',
                   
             // type: 'ajax',
              url : '/programacion/updateHorario',   
            
              //data: "{\"calendario\":"+JSON.stringify($('#test3').scheduler('val')) + ",\"especialidad\":\""+$("#especialidades").val()+ "\",\"nom_clasif\":"+$("input[name='nom_clasif']:checked").val()+ ",\"descripcion\":\""+$("#desc_doc").val().trim().toUpperCase()+ "\",\"recojos\":"+JSON.stringify(recojos) +",\"mes_anio\":"+JSON.stringify(date)+"}" ,
              data: "{\"calendario\":"+JSON.stringify($('#test3').scheduler('val')) + ",\"especialidad\":\""+$("#especialidades").val()+ "\",\"nom_clasif\":"+$("input[name='nom_clasif']:checked").val()+ ",\"descripcion\":"+JSON.stringify(descripcion)+",\"mes_anio\":"+JSON.stringify(date)+"}" ,

               //data:  JSON.stringify($('#test3').scheduler('val')) ,
              success:function(data) {                     
                 
                document.getElementsByTagName('small')[0].innerHTML = data;
                document.getElementsByTagName('small')[0].style.color = "blue";
                document.getElementsByTagName('small')[0].style.fontWeight = "bold";
              },
              error: function (jqXHR, textStatus, errorThrown)
              {
                alert(errorThrown +'Error get data from ajax');
              }
          });
}); 


 
$('#agendar').click(function() {
     
  
  var especialidades = document.getElementById("especialidades");
  var opcespecialidades = especialidades.options[especialidades.selectedIndex].value;

  var distrito = document.getElementById("distrito");
  var opcdistrito = distrito.options[distrito.selectedIndex].text;

  var distrito2 = document.getElementById("distrito2");
  var opcdistrito2 = distrito2.options[distrito2.selectedIndex].text;

  var descripcion = opcdistrito + "/" + opcdistrito2;

  var msjerror ="";

          if (opcdistrito == 'Seleccione' || opcdistrito2 == 'Seleccione') {
            msjerror += "Ingresar lugar de recojo/termino<br>";
          }
        
          if (opcespecialidades == '0') {
            msjerror += "Ingresar especialidad<br>";
          }
          
         if(Object.keys($('#test3').scheduler('val')).length==0){
             msjerror += "Ingresar horarios";
          }else{
            msjerror+=""; 
          }
  
          if (msjerror != ""){
            document.getElementsByTagName('small')[0].innerHTML = msjerror;
            document.getElementsByTagName('small')[0].style.color = "red";
            document.getElementsByTagName('small')[0].style.fontWeight = "bold";
              return;
          }else{
  
            document.getElementsByTagName('small')[0].innerHTML = 'Registrando.......';
            document.getElementsByTagName('small')[0].style.color = "blue";
            document.getElementsByTagName('small')[0].style.fontWeight = "bold";
            
          }
            $.ajax({
                method:'POST',
                contentType:'application/json',
                url : '/programacion/agendarHorario',   
                //data: "{\"calendario\":"+JSON.stringify($('#test3').scheduler('val')) + ",\"especialidad\":"+JSON.stringify($("#especialidades").val())+ ",\"nom_clasif\":"+$("input[name='nom_clasif']:checked").val()+ ",\"descripcion\":"+JSON.stringify($("#desc_doc").val().trim().toUpperCase())+ ",\"mes_anio\":"+JSON.stringify(date)+"}" ,
                data: "{\"calendario\":"+JSON.stringify($('#test3').scheduler('val')) + ",\"especialidad\":"+JSON.stringify($("#especialidades").val())+ ",\"nom_clasif\":"+$("input[name='nom_clasif']:checked").val()+ ",\"descripcion\":"+JSON.stringify(descripcion)+ ",\"mes_anio\":"+JSON.stringify(date)+"}" ,

                success:function(response) {                      
                      document.getElementsByTagName('small')[0].innerHTML = msjerror;
                      document.getElementsByTagName('small')[0].style.color = "blue";
                      document.getElementsByTagName('small')[0].style.fontWeight = "bold";
                      document.getElementsByTagName('small')[0].innerHTML = "Se registraron los horarios"; 
                      document.getElementById("agendar").type= "hidden";
                      $("#actualizar").attr("type","button");
                      $("#eliminar_turnos").attr("type","button");
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                  alert(errorThrown +'Error get data from ajax');
                }
            });
  }); 

/*papu 08/08/2023 eliminar_turnos*/
$('#eliminar_turnos').click(function() {

  // Obtener la fecha actual
var fechaActual = new Date();

// Obtener el año actual
var anioActual = fechaActual.getFullYear();

// Obtener el mes actual (los meses van de 0 a 11 en JavaScript)
var mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11

// Obtener el mes siguiente
var mesSiguiente = mesActual + 1;
var anioSiguiente = anioActual;

// Si el mes siguiente es enero (mes 12), avanzar al siguiente año
if (mesSiguiente === 13) {
  mesSiguiente = 1;
  anioSiguiente += 1;
}

// Asegurarse de que el mes y el día tengan dos dígitos
var mesFormateado = mesSiguiente.toString().padStart(2, '0');
var diaFormateado = '01'; // El primer día del mes siempre es 01

// Combinar año, mes y día en el formato deseado "yyyymmdd" para el primer día del mes siguiente
var fecha_inicio = `${anioSiguiente}${mesFormateado}${diaFormateado}`;

// Obtener el número de días en el mes siguiente
var ultimoDiaDelMesSiguiente = new Date(anioSiguiente, mesSiguiente, 0).getDate();

// Asegurarse de que el mes y el día tengan dos dígitos
var mesFormateado2 = mesSiguiente.toString().padStart(2, '0');
var diaFormateado2 = ultimoDiaDelMesSiguiente.toString().padStart(2, '0');

// Combinar año, mes y día en el formato deseado "yyyymmdd" para el último día del mes siguiente
var fecha_fin = `${anioSiguiente}${mesFormateado2}${diaFormateado2}`;

//alert(fecha_inicio +'/'+ fecha_fin);

//console.log("Fecha de inicio del mes siguiente:", fecha_inicio);
//console.log("Fecha de fin del mes siguiente:", fecha_fin);

var respuesta = confirm("¿Deseas eliminar los turnos?");
    
// Comprobar la respuesta y mostrar un mensaje según la elección del usuario
if (respuesta) {

  document.getElementsByTagName('small')[0].innerHTML = 'Eliminando los turnos...';
  document.getElementsByTagName('small')[0].style.color = "blue";
  document.getElementsByTagName('small')[0].style.fontWeight = "bold";
 
  fetch('/programacion/eliminar_turnos/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin
        })
  })
  .then(response => {
    if (response.ok) {
      document.getElementsByTagName('small')[0].innerHTML = 'Se removió los turnos con éxito!';
      document.getElementsByTagName('small')[0].style.color = "red";
      document.getElementsByTagName('small')[0].style.fontWeight = "bold";
      location.reload();
      return response.json();
    }
    return Promise.reject(new Error('Sucedio un error'));
  })
} 

});
 
  $('#prefacturacion').click(function() {
    var rptaexcel;
/*     var r = confirm("Desea guardar el archivo?");
    if (r == true) {
      rptaexcel = "SI";
    } else {
      rptaexcel = "NO";
    } */
    codigos_prefacturacion   = []; //pedrito
    $('#tabla1 tbody tr').each(function() {
    var tr0;
    tr0 =  $(this);
        if(tr0[0].cells[0].firstChild.nextSibling.checked == true  ) {
          codigos_prefacturacion.push(tr0[0].cells[1].children[0].innerHTML); 
        };

    }); 
    if(codigos_prefacturacion.length == 0){
      document.getElementById('resultado').innerHTML = 'No hay turnos para prefacturacion...';
      document.getElementById('resultado').style.color = "red";
      document.getElementById('resultado').style.fontWeight = "bold";    
  return;
    }else{
      document.body.style.cursor = "progress";

      document.getElementById('resultado').innerHTML = 'Exportando...';
      document.getElementById('resultado').style.color = "blue";
      document.getElementById('resultado').style.fontWeight = "bold"; 
    }
 
 $.ajax({
  method:'POST',
  contentType:'application/json',
        
  url : '/programacion/prefacturacion/',   
  data :  "{\"codigos_prefacturacion\":"+ JSON.stringify(codigos_prefacturacion)  +"}",
 

   success:function(data) {                     
     
var wb = XLSX.utils.book_new();
wb.Props = {
                Title: "PROGRAMACIONMEDICA",
                Subject: "PROGRAMACIONMEDICA",
                Author: "SUPERVISOR",
                CreatedDate: new Date()
        };
wb.SheetNames.push("Worksheet");
//tab = document.getElementById('tabla1'); // id of table
 
 
 var ws_data = tabletoarrayjsonhorarios(JSON.parse(data));  //a row with 2 columns

var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Worksheet"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
       saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'prefacturacion.xlsx');




    document.body.style.cursor = "default";

    document.getElementById("resultado").innerHTML = "Se exporto"; 
    document.getElementById("resultado").style.color = "blue";
    document.getElementById("resultado").style.fontWeight = "bold";
   },
  error: function (jqXHR, textStatus, errorThrown)
  {
    document.body.style.cursor = "default";

    document.getElementById("resultado").innerHTML = errorThrown +'El archivo se encuentra abierto. Intente cerrarlo'; 
    document.getElementById("resultado").style.color = "red";
    document.getElementById("resultado").style.fontWeight = "bold";
    alert(errorThrown +'Error get data from ajax');
  }
}); 








});
 
window.guardarcorreo = function(){
  var correo = document.getElementById('cuerpocorreo').value;
  var correo2 = document.getElementById('cuerpocorreo2').value;
  var tituloconfirma = document.getElementById('tituloconfirmacion').value;
  var tituloreconfirma = document.getElementById('tituloreconfirmacion').value;
  var titulodisponibilidad = document.getElementById('titulodisponibilidad').value;
  var cuerpodisponibilidad = document.getElementById('cuerpodisponibilidad').value;

	fetch('/programacion/updatebody/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body:correo,
      body2:correo2,
      tituloconfirma:tituloconfirma,
      tituloreconfirma:tituloreconfirma,
      titulodisponibilidad:titulodisponibilidad,
      bodydisponibilidad:cuerpodisponibilidad

    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Sucedio un error'))
  }).then(data => {
        if(JSON.parse(data)){
            document.getElementById("resultado").innerHTML = "Se actualizo el correo";
        }else{
          document.getElementById("resultado").innerHTML = "No se  actualizo el correo";

        }
   
   console.dir(data);
   }).catch(error => {
     console.log(error);    
  })
 
}

//borrare mas adelante ya no usar la validacion individual
window.cambiarconductor = function(a){
  
  fetch('/programacion/validar_conductor/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_conductor:a.value,
      cod_doc:(a.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling).innerHTML.trim(),
      fecha_asignacion: (a.parentElement.previousSibling.previousSibling.previousSibling).innerHTML.trim() + ' ' +(a.parentElement.previousSibling.previousSibling).innerHTML.trim()
      })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Sucedio un error'))
  }).then(data => {
    if (data != ''){
       alert(data);
       a.selectedIndex = "0";
    }
   console.dir(data);
   }).catch(error => {
     console.log(error);    
  })
 
}
window.s2ab = function(s) {   
                var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                var view = new Uint8Array(buf);  //create uint8array as viewer
                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                return buf;    
}
$("#descargarexcel").click(function(){
  let wscols = [
    {width:10},
    {width:50}
  ];
var wb = XLSX.utils.book_new();
wb.Props = {
                Title: "SheetJS Tutorial",
                Subject: "PROGRACIONMEDICA",
                Author: "PROGRACIONMEDICA",
                CreatedDate: new Date(2017,12,19)
        };
wb.SheetNames.push("Test Sheet");
tab = document.getElementById('tabla1'); // id of table

 
var ws_data = tableToJsonexcel(tab);  //a row with 2 columns

var ws = XLSX.utils.aoa_to_sheet(ws_data);
ws['!cols'] = wscols;

wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
       saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'horarios.xlsx');
});
  window.limpiarfile = function() {
   
    this.value = null;
  
  }
  window.handleFileSelect = function(evt) {
    var f = evt.target.files[0];
    var i = 0;
    if (f) {
      var r = new FileReader();
      r.onload = e => {
        var contents = JSON.parse(processExcel(e.target.result));
        contents = contents["Test Sheet"] ;
        for(i=1;i<contents.length;i++){
          buscarcodigoprogramacion(contents[i]);
          
        }
         
      }
      r.readAsBinaryString(f);
    } else {
      
    }
  }
  
  window.processExcel = function(data) {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });
  
    var firstSheet = workbook.SheetNames[0];
    var data = to_json(workbook);
    return data
  };
  
  window.to_json = function(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
      var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1
      });
      if (roa.length) result[sheetName] = roa;
    });
    return JSON.stringify(result, 2, 2);
  };
 
//buscar el codigo de programacion para cargar excel de remisse
window.buscarcodigoprogramacion= function(buscado) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
   
  filter = buscado[0].toUpperCase();
  table = document.getElementById("tabla1");
  tr = table.getElementsByTagName("tr");
  
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    tr[i].style.backgroundColor = "";
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].getElementsByTagName("td")[9].getElementsByTagName("select")[0].value =  buscado[2];
        tr[i].getElementsByTagName("td")[10].getElementsByTagName("select")[0].value =  (buscado[3]=='N'||buscado[3]=='n'?1:(buscado[3]=='S'||buscado[3]=='s'?2:buscado[3]));
        tr[i].getElementsByTagName("td")[11].getElementsByTagName("select")[0].value = buscado[4];
        tr[i].getElementsByTagName("td")[12].getElementsByTagName("select")[0].value = buscado[5];// parseInt(buscado[5]);
        tr[i].getElementsByTagName("td")[13].getElementsByTagName("select")[0].value = buscado[6];

      } else {
       
      }
    }
  }
}

window.selectall= function(f){
  var checkboxes = document.getElementsByName('d');
  for (var checkbox of checkboxes) {
    checkbox.checked = f.checked;
  }
   

}

window.correodisponibilidad= function(){

  document.body.style.cursor = "progress";

  $.ajax({
    method:'POST',
    contentType:'application/json',
          
    url : '/programacion/enviardisponibilidad/',   
     success:function(data) {                     
      document.getElementById("resultado").innerHTML =  'Se envio los correos a los medicos '; 
      document.getElementById("resultado").style.color = "blue";
      document.getElementById("resultado").style.fontWeight = "bold";
      document.body.style.cursor = "default";


    },
    error: function (jqXHR, textStatus, errorThrown)
    {
      document.getElementById("resultado").innerHTML =  errorThrown ;
      document.getElementById("resultado").style.color = "red";
      document.getElementById("resultado").style.fontWeight = "bold";
      alert(errorThrown );
      document.body.style.cursor = "default";

    }
   });
    


}

window.actualizaremails= function(td){

 var tr= td.parentNode.parentNode;
 
  var  i ;
  //for(i=0;i<tabla.rows.length;i++){
    document.body.style.cursor = "progress";
      fetch('/programacion/actualizaremailflgenvio/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: tr.cells[0].innerHTML.trim(),
          email: tr.cells[2].children[0].value.trim(),
          flg_envio: tr.cells[3].children[0].checked.toString()
        
        })
      }).then(response => response.json())
      .then(function(data) {
           tr.cells[5].innerHTML = 'Actualizado';
           document.body.style.cursor = "default";

       }).catch(error => {
        tr.cells[5].innerHTML = 'Error';
         document.body.style.cursor = "default";
        console.log(error);    
      });
        
  //}
}

window.cambiomedico= function(){
 cod_doc =  document.getElementById('medico').value ;
}

window.validateHhMmini= function(a){

 const timeFromPicker = a;

 const timeParts = timeFromPicker.split(":");
 timeParts[0]=timeParts[0] ;
 timeParts30=parseInt(timeParts[1])-30;
 document.getElementById('horini_mot').value = timeParts[0] +':'+("0" + parseInt(timeParts30)).substr(-2);
 
 if (timeParts30<0) {
    timeParts[1]=  ("0" + (60+parseInt(timeParts30))).substr(-2);
   

   timeParts[1]=(timeParts[1]);
 
    

    if (timeParts[0]=='00') {
      document.getElementById('horini_mot').value =  '23' +':'+timeParts[1];

    }else{
      document.getElementById('horini_mot').value =  ("0" +(parseInt(timeParts[0])-1)).substr(-2) +':'+timeParts[1];

    }
 }  

}
window.validateHhMmfin= function(a){

  const timeFromPicker = a;
 
  const timeParts = timeFromPicker.split(":");
  timeParts[0]=timeParts[0] ;
  timeParts30=parseInt(timeParts[1])+30;
  document.getElementById('horfin_mot').value = timeParts[0] +':'+timeParts30;
  
  if (timeParts30>='60') {
     timeParts[1]=  ("0" + (parseInt(timeParts30)-60)).substr(-2);
    
 
    timeParts[1]=(timeParts[1]);
  
     
 
     if (timeParts[0]=='23') {
       document.getElementById('horfin_mot').value =  '00' +':'+timeParts[1];
 
     }else{
       document.getElementById('horfin_mot').value =  ("0" +(parseInt(timeParts[0])+1)).substr(-2) +':'+timeParts[1];
 
     }
  }  
 
 }
window.generarambulancia= function (){
 
 
  document.body.style.cursor = "progress";
      fetch('/programacion/generarambulancia/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fec_asignacion: document.getElementById('fec_asignacion').value,
          turno:  document.getElementById('turnodetalle').value,
          horini:  document.getElementById('horini').value,
          horfin: document.getElementById('horfin').value,
          dias: document.getElementById('dias').value,
          observaciones: document.getElementById('des_doc').value,
          medico:  document.getElementById('proveedor').value,
          nom_medico: (document.getElementById('proveedor')).options[(document.getElementById('proveedor')).selectedIndex].text

        })
      }).then(response => response.json())
      .then(function(data) {
           document.getElementById('guardar_programacion').innerHTML = document.getElementById('dias').value + ' horario(s) registrado(s) para '+(document.getElementById('proveedor')).options[(document.getElementById('proveedor')).selectedIndex].text;
           document.body.style.cursor = "default";

       }).catch(error => {
        document.getElementById('guardar_programacion').innerHTML = 'Error';
        console.log(error);
         document.body.style.cursor = "default";
       });
        
  //}
}


  function descargarexcelcompleto(){
    table = document.getElementById('tabla1'); // id of table

    var data = [];
    var rowData = [];
     // first row needs to be headers
     var headers = [];
     for (var i=0; i<table.rows[0].cells.length; i++) {
       
            headers.push(table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi,''));
       
     }
     data.push(headers);
     
     // go through cells
     for (var i=2; i<table.rows.length; i++) {
   
         var tableRow = table.rows[i];
        
   
         for (var j=0; j<=tableRow.cells.length-1; j++) {
          
             
          if(j>=9 && j<=13 ){
            rowData.push( tableRow.cells[j].children[0].options[tableRow.cells[j].children[0].selectedIndex].text);
          }else if(j==14) {
          
          }else{
           rowData.push( tableRow.cells[j].innerHTML);
          }
         }
   
         data.push(rowData);
      rowData = [];
     }       
   
     
  
    let wscols = [
    {width:10},
    {width:50}
  ];
var wb = XLSX.utils.book_new();
wb.Props = {
                Title: "SheetJS Tutorial",
                Subject: "PROGRACIONMEDICA",
                Author: "Red Stapler",
                CreatedDate: new Date(2017,12,19)
        };
wb.SheetNames.push("Test Sheet");

 
var ws = XLSX.utils.aoa_to_sheet(data);
ws['!cols'] = wscols;

wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
       saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'horarios.xlsx');
};

function descargarexcelprogramacion_medica(){
  table = document.getElementById('tabla1'); // id of table

  var data = [];
  var rowData = [];
   // first row needs to be headers
   var headers = [];
 /*   for (var i=0; i<table.rows[0].cells.length; i++) {
        if(i==8){
          headers.push(table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi,''));
        }else{
          headers.push(table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi,''));
        }
          
   } */
  
      headers.push( table.rows[0].cells[10].children[0].innerHTML); 
      headers.push(table.rows[0].cells[2].children[0].innerHTML); 
      headers.push( table.rows[0].cells[5].children[0].innerHTML); 
      
      headers.push( table.rows[0].cells[7].children[0].innerHTML); 
      
      headers.push( table.rows[0].cells[11].children[0].innerHTML); 
      headers.push( table.rows[0].cells[12].children[0].innerHTML); 
      headers.push( table.rows[0].cells[9].children[0].innerHTML); 
      headers.push( table.rows[0].cells[13].children[0].innerHTML); 
      headers.push( table.rows[0].cells[6].children[0].innerHTML); 
      headers.push( table.rows[0].cells[15].children[0].innerHTML); 
      headers.push( table.rows[0].cells[16].children[0].innerHTML); 
      headers.push( table.rows[0].cells[17].children[0].innerHTML); 
      
      data.push(headers);
     
   // go through cells
   for (var i=1; i<table.rows.length; i++) {
 
       var tableRow = table.rows[i];
       
            rowData.push( tableRow.cells[10].children[0].innerHTML); 
            rowData.push( tableRow.cells[2].children[0].innerHTML); 
            rowData.push( tableRow.cells[5].children[0].innerHTML); 
            
            rowData.push( tableRow.cells[7].children[0].innerHTML); 
            
            rowData.push( tableRow.cells[11].children[0].innerHTML); 
            rowData.push( tableRow.cells[12].children[0].innerHTML); 
            rowData.push( tableRow.cells[9].children[0].innerHTML); 
            rowData.push( tableRow.cells[13].children[0].innerHTML); 
            rowData.push( tableRow.cells[6].children[0].innerHTML); 
            rowData.push( tableRow.cells[15].children[0].innerHTML); 
            rowData.push( tableRow.cells[16].children[0].innerHTML); 
            rowData.push( tableRow.cells[17].children[0].innerHTML); 
            
 
       data.push(rowData);
    rowData = [];
   }       
 
   

  let wscols = [
  {width:10},
  {width:50}
];
var wb = XLSX.utils.book_new();
wb.Props = {
              Title: "Hoja1",
              Subject: "PROGRACIONMEDICA",
              Author: "Magaly Valderrama",
              CreatedDate: new Date(2017,12,19)
      };
wb.SheetNames.push("Hoja1");


var ws = XLSX.utils.aoa_to_sheet(data);
ws['!cols'] = wscols;

wb.Sheets["Hoja1"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
     saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'programaciones.xlsx');
};
 function generarexcel(table_id, separator = ',') {
  // Select rows from table_id
  var rows = document.querySelectorAll('table#' + table_id + ' tr');
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      for (var j = 0; j < cols.length; j++) {
          // Clean innertext to remove multiple spaces and jumpline (break csv)
          var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
          // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
          data = data.replace(/"/g, '""');
          // Push escaped string
          row.push('"' + data + '"');
      }
      csv.push(row.join(separator));
  }
  var csv_string = csv.join('\n');
  // Download it
  var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
  var link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//#4355 SOLICITAMOS MODIFICACIONES EN EL AGENTE PROGRAMACIÓN MEDICA 24/10/2024
window.modificar_fecha = function() {
  // Obtener la fecha actual en formato YYYY-MM-DD
  const fechaActual = new Date().toISOString().slice(0, 10);

  // Definir valores predeterminados de fecha y hora
  const fechaInicioDefault = `${fechaActual}T00:00`;
  const fechaCierreDefault = `${fechaActual}T23:59`;

  printModal(`
    <div id="ed-modal-contentheader" style="color: white; background: #28a745; padding: 10px; display: flex; justify-content: center; align-items: center;">
      <h5 style="margin: 0; font-size: 20px;">Modificar la fecha de inicio y cierre de Prog. medica</h5>
      <button type="button" class="cancelarmodal btn-xs btn-danger" style="position: absolute; right: 10px; padding: 5px 10px;">X</button>
    </div>
    
    <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; font-size: 18px; gap: 20px;">
      <div style="text-align: center;">
          <label for="fec_asignacion_proveedor_inicio">Fecha y hora de inicio</label> <br>
          <input type="datetime-local" id="fec_inicio" style="width: 190px;" name="fec_asignacion_proveedor_inicio" value="${fechaInicioDefault}">
      </div>
      
      <div style="text-align: center;">
          <label for="fec_asignacion_proveedor_cierre">Fecha y hora de cierre</label> <br>
          <input type="datetime-local" id="fec_cierre" style="width: 190px;" name="fec_asignacion_proveedor_cierre" value="${fechaCierreDefault}">
      </div>
    
      <button type="button" id="actualizar_fechas_bdparametros" onclick="actualizar_fechas_bdparametros();" class="btn btn-success" style="width: 150px;">Guardar</button>
    </div>
    <div id="mensajito"></div>
  `);
};


window.actualizar_fechas_bdparametros = function() {
  var fecha_inicio = document.getElementById('fec_inicio').value;
  var fecha_cierre = document.getElementById('fec_cierre').value;

  // Validación: verifica que la fecha de inicio no sea mayor que la fecha de cierre
  if (new Date(fecha_inicio) > new Date(fecha_cierre)) {
    alert("La fecha de inicio no puede ser mayor que la fecha de cierre.");
    return; // Detiene la ejecución de la función si la validación falla
  }

  fetch('/programacion/actualizar_fechas_bdparametros/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fec_inicio: fecha_inicio,
      fec_cierre: fecha_cierre
    })
  })

  document.getElementById("mensajito").innerHTML = "Se actualizaron las fechas :D";
  document.getElementById("mensajito").style.color = "green";
  document.getElementById("mensajito").style.fontWeight = "bold"; 

  // Configura un temporizador para borrar el mensaje después de 3 segundos
  setTimeout(() => {
  document.getElementById("mensajito").innerHTML = "";
 }, 2000);
 
};




