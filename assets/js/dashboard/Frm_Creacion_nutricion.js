
 var L_CodAte;
 var li_condicion_especial_pago ;
 var lsnl_importe_tarifa = 0;
 var lsnl_importe_CopFijo = 0;
 (function(){ 
  
  document.getElementById("defaultOpen").click();
  
  var Adata_aseguradora ;

  Adata_aseguradora = "select trim(iaf.cod_financ) cod_financ, trim(cod_gru) cod_gru, trim(nom_gru) cliente FROM m_grupos cli LEFT JOIN m_iafas iaf  ON iaf.cod_cliente = cli.cod_gru AND iaf.activo = true WHERE cli.cod_gru in ('044', '106') ORDER BY 2 ASC";
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: Adata_aseguradora

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '',options ;
     if (data.length>0) {
        options = data.map(person => `<option value="${person.cod_gru}" data-cod_financ="${person.cod_financ}">${person.cliente}</option>`).join("\n");
    } 
      document.getElementById('Dcbo_aseguradora').innerHTML = options;
      document.body.style.cursor = 'default'
      document.getElementById('Dcbo_aseguradora').value ='044';
      Dcbo_aseguradora_Change('044');

    }).catch(error => {
      console.log(error);
    });


     fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "select * from mae_medio_registro_prestacion WHERE id_mrp in (2,3,4,6) order by 2 asc"
  
      })
    }).then(response => response.json())
      .then(function (Adata_via_solicitud) {
        if (Adata_via_solicitud.length>0) {
          options = Adata_via_solicitud.map(person => `<option value="${person.id_mrp}" >${person.descripcion}</option>`).join("\n");
      } 
        document.getElementById('Dcbo_via_solicitud').innerHTML = options;
        Cbo_tiene_correo_Click(0);
      }).catch(error => {
        console.log(error);
      });



  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT * FROM OPE_R_TIPODECAMBIO_D order by fec_cam desc limit 1"

    })
  }).then(response => response.json())
    .then(function (data) {
           if (data.length>0) {
            lsg_cambio = data[0].tip_cam;
          }  
    }).catch(error => {
      console.log(error);
    });    
 

    var Adata_clasificacion ;

    Adata_clasificacion = "SELECT * FROM m_clasificacion_pac WHERE cod_clasif in (70) ORDER BY 2 ASC";
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: Adata_clasificacion

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '',options ;
     if (data.length>0) {
        options = data.map(person => `<option value="${person.cod_clasif}">${person.nom_clasif}</option>`).join("\n");
    } 

      document.getElementById('DCbo_clasificacion').innerHTML = options;
       document.getElementById('DCbo_clasificacion').value ='70';
    }).catch(error => {
      console.log(error);
    });

    fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "SELECT d.cod_doc,d.nom_doc FROM m_doctores d join m_espcxdoctor i on  d.cod_doc = i.cod_doc join m_especialidades e on i.cod_esp = e.cod_esp  where e.cod_esp = '026' "
  
      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '',options ;
       if (data.length>0) {
          options = data.map(person => `<option value="${person.cod_doc}">${person.nom_doc}</option>`).join("\n");
      } 
  
        document.getElementById('Txt_Dr').innerHTML = options;
       // document.getElementById('Txt_Dr').value ='70';
      }).catch(error => {
        console.log(error);
      });
    
    var Adata_doc_id ;

    Adata_doc_id = "SELECT * FROM mae_documento_identidad WHERE cod_doc_id_susalud is not null order by id_doc_id ASC";
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: Adata_doc_id

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '',options ;
     if (data.length>0) {
        options = data.map(person => `<option value="${person.id_doc_id}">${person.descripcion_doc_id}</option>`).join("\n");
    } 

      document.getElementById('DC_tipo_doc_id').innerHTML = options;
      
    }).catch(error => {
      console.log(error);
    });

    var Adata_departamento ;

    Adata_departamento = "select distinct ubi.cod_dpto, ubi.departamento from mae_ubigeo ubi WHERE cod_dpto <> '99' ORDER BY ubi.departamento ASC";
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: Adata_departamento

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '',options ;
     if (data.length>0) {
        options = '<option value=""></option>'+ data.map(person => `<option value="${person.cod_dpto}">${person.departamento}</option>`).join("\n");
    } 
       document.getElementById('DCbo_departamento').innerHTML = options;
      }).catch(error => {
      console.log(error);
    });

    IN_Hhabilitar_controles_direccion(false);
    var Adata_especialidad ;

    Adata_especialidad = "SELECT trim(cod_esp) cod_esp, trim(nom_esp) especialidad FROM m_especialidades where especialidad_siteds <> '' ORDER BY 2 ASC";

    fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: Adata_especialidad
  
      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '',options ;
       if (data.length>0) {
          options = '<option value=""></option>'+ data.map(person => `<option value="${person.cod_esp}">${person.especialidad}</option>`).join("\n");
      } 
         document.getElementById('DCbo_Especialidad').innerHTML = options;
         document.getElementById('DCbo_Especialidad').value ='026';

       }).catch(error => {
        console.log(error);
      });
     var f= new Date();
     //agregado
     document.getElementById('DTFecNac').value  =f.getFullYear() + '-' + ( f.getMonth() + 1).toString().padStart(2,"0") + '-' + f.getDate().toString().padStart(2,"0");;

     // document.getElementById('DTFecha_correo').value  =f.getFullYear() + '-' + ( f.getMonth() + 1).toString().padStart(2,"0") + '-' + f.getDate().toString().padStart(2,"0");;
            
     // document.getElementById('CmbHoraCorreo').value = f.getHours().toString().padStart(2,"0") + ':' + f.getMinutes().toString().padStart(2,"0");
    
     //document.getElementById('DTP_fecha_receta').value  = f.getFullYear() + '-' + ( f.getMonth() + 1).toString().padStart(2,"0") + '-' + f.getDate().toString().padStart(2,"0");;
     //document.getElementById('DTP_fprog1').value  = f.getFullYear() + '-' + ( f.getMonth() + 1).toString().padStart(2,"0") + '-' + f.getDate().toString().padStart(2,"0");;
 
    //PARA LOS INYECTABLES 
    document.getElementById('DT_fecha').value  = f.getFullYear() + '-' + ( f.getMonth() + 1).toString().padStart(2,"0") + '-' + f.getDate().toString().padStart(2,"0");;

    /* 
       
    

    DCbo_departamento.Text = ""
    DCbo_provincia.Text = ""
    DCbo_distrito.Text = ""
     */
})();
 
 
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
function opensiteds(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontentsiteds");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkssiteds");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it


function Cmd_Buscar_Click(){
  
  var Txt_find_DNI = document.getElementById('Txt_find_DNI');
  var Txt_ApPatBuscar = document.getElementById('Txt_ApPatBuscar');
  var Txt_ApMatBuscar = document.getElementById('Txt_ApMatBuscar') ;
  var Txt_NomPacBuscar = document.getElementById('Txt_NomPacBuscar') ;

  var Adata_Pac_BD_Drmas ;

  if (Txt_find_DNI.value != ''){  
    Adata_Pac_BD_Drmas = "SELECT *, id.descripcion_doc_id FROM m_pacientesdrmas pac LEFT JOIN mae_documento_identidad id ON pac.id_doc_id = id.id_doc_id WHERE num_doc_id like '" +
    (Txt_find_DNI.value).trim() + "%' and activi = true  ORDER BY nom_com ASC limit 50";
  }else{
    Adata_Pac_BD_Drmas = "SELECT cod_hia,nom_com,num_doc_id,fnac_pac,correo_pac,flag_ficha, id.descripcion_doc_id,appat_pac,apmat_pac,nom_pac,id.id_doc_id,sex_pac,pac_vip,correo_pac FROM m_pacientesdrmas pac LEFT JOIN mae_documento_identidad id ON pac.id_doc_id = id.id_doc_id WHERE appat_pac like '" + (Txt_ApPatBuscar.value).trim().toUpperCase() + "%' AND apmat_pac like '" 
    +  (Txt_ApMatBuscar.value).trim().toUpperCase() + "%' AND nom_pac like '" +  (Txt_NomPacBuscar.value).trim().toUpperCase() + "%' and activi = true ORDER BY nom_com ASC limit 50";
  }

    fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: Adata_Pac_BD_Drmas

      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '' ;
        var i; 
                           
      //Frame1.Caption = "Consultas médicas"
      if (data.length>0) {
       
            i = 0;
  
        for (; i < data.length; i++) {

          html += '<tr ' + ' id="' + (data[i].cod_hia) + `" onclick="filaSelected(this);">` +
            '<td >' + data[i].nom_com + '</td>' +
            '<td>' + data[i].descripcion_doc_id + '</td>' +
            '<td>' + data[i].num_doc_id + '</td>' +
            '<td>' + data[i].fnac_pac + '</td>'+
            '<td >' + data[i].correo_pac + '</td>' +
            '<td >' + (data[i].flag_ficha==null?'No':'Si') + '</td>'+
            '<td style="display:none">' + data[i].appat_pac + '</td>'+
            '<td style="display:none">' + data[i].apmat_pac + '</td>'+
            '<td style="display:none">' + data[i].nom_pac+ '</td>'+ 
            '<td style="display:none">' + data[i].id_doc_id + '</td>'+
            '<td style="display:none">' + data[i].sex_pac + '</td>'+
            '<td style="display:none">' + data[i].pac_vip + '</td>'+
            '<td style="display:none">' + data[i].correo_pac + '</td>'+
 
          '</tr>';
        }
          
      } 

        document.getElementById('DG_pacientebody').innerHTML = html;
        document.body.style.cursor = 'default'
 
      }).catch(error => {
        console.log(error);
      });
              
   
     
/* If Adata_Pac_BD_Drmas.Recordset.EOF Then
  Lbl_mensaje.Caption = "No hay resultados en la busqueda"
  Cmd_seleccionar.Enabled = false;
  DG_paciente.Enabled = false;
Else
  Lbl_mensaje.Caption = "Para busquedas grandes se muestran solo 50 registros"
  Cmd_seleccionar.Enabled = True
  DG_paciente.Enabled = True
End If */

}  





 
function filaSelected(p) {
  var table =  (p.parentElement);

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";

  }
  p.style.backgroundColor = "turquoise"; 

 

}
var ls_codigo_hia ;
function Cmd_Seleccionar_Click(){
  var filas = document.querySelectorAll('#DG_pacientebody>tr');
  var fila;
    filas.forEach(element => {
      if(element.style.backgroundColor == "turquoise"){
          fila = element;
          return;
      }
    })
  if (!fila) return;
  IN_Hhabilitar_controles(true);
  Inicializa_registro();
   ls_codigo_hia = fila.id;
   document.getElementById("Txt_ApPat").value = fila.cells[6].innerHTML ;
   document.getElementById("Txt_ApMat").value = fila.cells[7].innerHTML ;
   document.getElementById("Txt_Nombres").value = fila.cells[8].innerHTML ;
   document.getElementById("DTFecNac").value = fila.cells[3].innerHTML ;
   document.getElementById("DC_tipo_doc_id").value = fila.cells[9].innerHTML ;
   document.getElementById("Txt_num_doc_id").value = fila.cells[2].innerHTML ;
   if (fila.cells[10].innerHTML  == 'f') {
    document.getElementById("Cbo_sexo").value = "FEMENINO";
  }else{
    document.getElementById("Cbo_sexo").value = "MASCULINO";
  }  
  var f= new Date();
  //agregado
   var fechanac = new Date(fila.cells[3].innerHTML);

  document.getElementById("Lbl_edad").innerHTML ="  "+ (f.getFullYear()  -  fechanac.getFullYear())+ " años";
  //Lbl_edad.Caption = Year(Date) - Year(!fnac_pac) & " años"
  if (fila.cells[11].innerHTML  == 'null') {
    document.getElementById("Cbo_VIP").value = "" ;
  }else{
    document.getElementById("Cbo_VIP").value = fila.cells[11].innerHTML;
  } 
  if (fila.cells[12].innerHTML  == 'null') {
    document.getElementById("Txt_email").value = "" ;
  }else{
    document.getElementById("Txt_email").value = fila.cells[12].innerHTML;
  }   
  //direccion
  
   var Adata_direccion ;

  Adata_direccion ="select * from vw_datos_paciente_direccion where cod_paciente = '" + ls_codigo_hia + "' ORDER BY cod_dir asc";
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: Adata_direccion

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '' ;
      var i; 
                 
    //Frame1.Caption = "Consultas médicas"
    if (data.length>0) {
     
          i = 0;

      for (; i < data.length; i++) {


        html += '<tr ' + ' id="' + (data[i].cod_dir).trim() + `" onclick="DG_direccion_RowColChange(this);">` +
          '<td >' + data[i].direccion + '</td>' +
          '<td>' + data[i].nro_dir_lote + '</td>' +
          '<td>' + data[i].dir_dpto_interior + '</td>' +
          '<td>' + data[i].dir_urbanizacion + '</td>'+
          '<td style="display:none">' + data[i].distrito + '</td>' +
          '<td style="display:none">' + data[i].provincia + '</td>'+
          '<td style="display:none">' + data[i].ubi_cod_dpto + '</td>'+
          '<td style="display:none">' + data[i].ubi_cod_prov + '</td>'+
          '<td style="display:none">' + data[i].ubi_distrito.trim() + '</td>'+
          '<td style="display:none">' + data[i].referencia + '</td>'+
          '<td style="display:none">' + data[i].tlf_casa + '</td>'+
          '<td style="display:none">' + data[i].tlf_celular + '</td>'+
          '<td style="display:none">' + data[i].tlf_oficina + '</td>'+
          '<td style="display:none">' + data[i].tlf_oficina_anx + '</td>'+
          '<td style="display:none">' + data[i].cod_dis + '</td>'+

        '</tr>'; 
      } 
      document.getElementById('DG_direccionbody').innerHTML = html;

      document.getElementById('DG_direccionbody').rows[0].click()  ;
  
    } 

      document.body.style.cursor = 'default';

    }).catch(error => {
      console.log(error);
    });
    document.getElementById("tab1").click();

}

function DG_direccion_RowColChange(fila){
  var table = document.getElementById("DG_direccionbody");

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";

  }
  fila.style.backgroundColor = "turquoise"; 

  document.getElementById('DCbo_departamento').value = fila.cells[6].innerHTML ;
  var optionp = document.createElement("option");
  optionp.text = fila.cells[5].innerHTML ;
  optionp.value = fila.cells[7].innerHTML ;
  document.getElementById('DCbo_provincia').appendChild(optionp);
  var optiond = document.createElement("option");
  optiond.text = fila.cells[4].innerHTML ;
  optiond.value = fila.cells[14].innerHTML.trim() ;
   document.getElementById('DCbo_distrito').appendChild(optiond);
  document.getElementById('Txt_direccion').value = fila.cells[0].innerHTML ;
  document.getElementById('Txt_referencia').value = fila.cells[9].innerHTML ;
  document.getElementById('Txt_casa').value = fila.cells[10].innerHTML ;
  document.getElementById('Txt_celular').value = fila.cells[11].innerHTML ;
  document.getElementById('Txt_oficina').value = fila.cells[12].innerHTML ;
  document.getElementById('Txt_oficina_anx').value = fila.cells[13].innerHTML ;

  /*   DCbo_Provincia.Text = !provincia
    Dcbo_distrito.Text = !distrito
    Txt_Direccion.Text = !Direccion
    Txt_Referencia.Text = !referencia
    Txt_casa.Text = !tlf_casa
    Txt_celular.Text = !tlf_celular
    Txt_oficina.Text = !tlf_oficina
    Txt_oficina_anx.Text = !tlf_oficina_anx */
}


function Cbo_nuevo_pac_Click(){

    IN_Hhabilitar_controles(true);
    Inicializa_registro();
    ls_codigo_hia = "" ;
    document.getElementById("tab1").click(); 
    document.getElementById("Dcbo_aseguradora").focus();

}
function IN_Hhabilitar_controles_direccion(pIn_Activo){
  document.getElementById('DCbo_departamento').disabled=!pIn_Activo;
  document.getElementById('DCbo_provincia').disabled=!pIn_Activo;
  document.getElementById('DCbo_distrito').disabled=!pIn_Activo;
  document.getElementById('Txt_direccion').disabled=!pIn_Activo;
  document.getElementById('Txt_referencia').disabled=!pIn_Activo;
  document.getElementById('Txt_casa').disabled=!pIn_Activo;
  document.getElementById('Txt_celular').disabled=!pIn_Activo;
  document.getElementById('Txt_oficina').disabled=!pIn_Activo;
  document.getElementById('Txt_oficina_anx').disabled=!pIn_Activo;

}
function IN_Hhabilitar_controles(pIn_Activo){

  document.getElementById('Txt_ApPat').disabled=!pIn_Activo;
  document.getElementById('Txt_ApMat').disabled=!pIn_Activo;
  document.getElementById('Txt_Nombres').disabled=!pIn_Activo;
  document.getElementById('DTFecNac').disabled=!pIn_Activo;
  document.getElementById('DC_tipo_doc_id').disabled=!pIn_Activo;
  document.getElementById('Txt_num_doc_id').disabled=!pIn_Activo;
  document.getElementById('Cbo_sexo').disabled=!pIn_Activo;
  document.getElementById('Cbo_VIP').disabled=!pIn_Activo;

   
  
  
  if (pIn_Activo == false){
     /*  Txt_ApPat.BackColor = Me.BackColor
      Txt_ApMat.BackColor = Me.BackColor
      Txt_Nombres.BackColor = Me.BackColor
          
      DC_tipo_doc_id.BackColor = Me.BackColor
      Txt_num_doc_id.BackColor = Me.BackColor
      Cbo_sexo.BackColor = Me.BackColor
      Cbo_VIP.BackColor = Me.BackColor */
      
  }else{
      /* Txt_ApPat.BackColor = &H80000005
      Txt_ApMat.BackColor = &H80000005
      Txt_Nombres.BackColor = &H80000005
      
      
      DC_tipo_doc_id.BackColor = &H80000005
      Txt_num_doc_id.BackColor = &H80000005
      Cbo_sexo.BackColor = &H80000005
      Cbo_VIP.BackColor = &H80000005 */
      
  }
  

}

function Inicializa_registro(){

  var  j ;

  document.getElementById('Txt_ApPat').value='';
  document.getElementById('Txt_ApMat').value='';
  document.getElementById('Txt_Nombres').value='';
  document.getElementById('Txt_Nombres').value='';
  var f = new Date();    
  var formattedDate = f.getFullYear() + '-' + ( f.getMonth() + 1).toString().padStart(2,"0") + '-' + f.getDate().toString().padStart(2,"0");

  document.getElementById('DTFecNac').Value = formattedDate;
  document.getElementById('Txt_num_doc_id').value='';
  document.getElementById('Txt_email').value='';
 
  document.getElementById('Dcbo_aseguradora').disabled=false;;
  document.getElementById('Cmd_datos_siteds').disabled=false;;
  //document.getElementById('Txt_Clinica_origen').value='';
 
  document.getElementById('MSHGrid_Coberturabody').innerHTML='';
  document.getElementById('MSHGrid_Cobertura').style.display='none';

  
  document.getElementById('Txt_contratante').value='';

  document.getElementById('TxtCodAut').value='';
  document.getElementById('Txt_cod_aseg').value='';
  document.getElementById('Txt_tipo_afiliacion').value='';
  document.getElementById('Txt_prod').value='';
  document.getElementById('Txt_Poliza').value='';
  document.getElementById('Txt_pol_cert').value='';
  document.getElementById('txt_coa').value='';

 
  /* 
  For j = 0 To 17
      GArr_Cobertura_clinica_origen(0, j) = ""
      GArr_Cobertura_clinica_origen(1, j) = ""
  Next */
 
 
/*   Set DG_direccion.DataSource = Adata_direccion
  DG_direccion.Columns("cod_paciente").Visible = false;
  DG_direccion.Columns("cod_dis").Visible = false;
  DG_direccion.Columns("cod_dir").Visible = false;
  DG_direccion.Columns("cod_prov").Visible = false;
  DG_direccion.Columns("ubigeo").Visible = false; */
    
  document.getElementById('DCbo_departamento').selectedIndex = 0;
  document.getElementById('Txt_direccion').value ='';
  document.getElementById('Txt_referencia').value ='';
  document.getElementById('Txt_casa').value ='';
  document.getElementById('Txt_celular').value ='';
  document.getElementById('Txt_oficina').value ='';
  document.getElementById('Txt_oficina_anx').value ='';
  document.getElementById('DG_direccion').value ='';

/*    DCbo_provincia.Text = ""
  DCbo_distrito.Text = "" */
 
  document.getElementById('Cmd_Nueva_direccion').disabled = false;;;
  document.getElementById('Cmd_anular_reg_direccion').disabled = true;;
 
}


function Dcbo_aseguradora_Change(opt){

    
  var sel = document.getElementById('Dcbo_aseguradora');
  var selected = sel.options[sel.selectedIndex];
  var extra = selected.getAttribute('data-cod_financ');
  if (extra!='null'){
       document.getElementById('Cmd_datos_siteds').style.visibility = 'visible';
  }else{
    document.getElementById('Cmd_datos_siteds').style.visibility = 'hidden';
  }
  document.getElementById('DCbo_clasificacion').disabled=false;;
  
  
  if  (opt == "1234") {
    document.getElementById('DCbo_clasificacion').value = "205";
    document.getElementById('DCbo_clasificacion').disabled = true;
  
}
  
   


}

async function Correlativo_Pacientes() {
var  Rs_codigo ;
 
var correl;

   await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "Select Cxl_hiacli from M_codigos"
      })
    }).then(response => response.json())
      .then(async function (Rs_codigo) {
        correl = parseInt(Rs_codigo[0].cxl_hiacli.trim()) + 1 ;
         
        await fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "UPDATE M_codigos SET Cxl_hiacli =" + correl         
          })
        }).then(response => response.json())
        .then(function(data) {
         
          if(data){
            
          } 
           
           
         }).catch(error => {
          console.log(error);    
        });
      }).catch(error => {
        console.log(error);
      });

  return correl ;
}
 
async function REGISTRA_PACDRMAS(ls_cod_hia){
 
var  lRs_paciente ={};
  
  
      await    fetch('/modulo/Abre_Detalle/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "Select * from m_pacientesdrmas where cod_hia ='" + ls_cod_hia + "'"
    
          })
        }).then(response => response.json())
          .then(function (Rs_paciente) {
                            lRs_paciente.cod_hia = ls_cod_hia.toString();
                            lRs_paciente.appat_pac = document.getElementById('Txt_ApPat').value.trim(); 
                            lRs_paciente.apmat_pac =  document.getElementById('Txt_ApMat').value.trim();  
                            lRs_paciente.nom_pac = document.getElementById('Txt_Nombres').value.trim();   
                            lRs_paciente.nom_com =  (lRs_paciente.appat_pac +' ' + lRs_paciente.apmat_pac +' ' +lRs_paciente.nom_pac).substring(0, 49) ;
                            lRs_paciente.tipo_doc_id = "1";
                            lRs_paciente.id_doc_id =   document.getElementById('DC_tipo_doc_id').value.trim();
                            lRs_paciente.num_doc_id = document.getElementById('Txt_num_doc_id').value.trim(); 
                            lRs_paciente.activi = true;
                            lRs_paciente.fnac_pac = document.getElementById('DTFecNac').value.trim();   
                            lRs_paciente.correo_pac = document.getElementById('Txt_email').value.trim();   
                            lRs_paciente.flg_correo = true;
                            lRs_paciente.pac_vip = document.getElementById('Cbo_VIP').value.trim();   
                            lRs_paciente.cod_emp = str_cod_emp;
                            lRs_paciente.cel_pac = document.getElementById('Txt_celular').value.trim();     
                        
                            if (document.getElementById('Cbo_sexo').value == "FEMENINO" ){
                              lRs_paciente.sex_pac = false;
                            }else{
                              lRs_paciente.sex_pac = true;
                            }
                              lRs_paciente.cod_par = "00" ;
                              lRs_paciente.tabla = "m_pacientesdrmas"; 
                              
                              if(Rs_paciente.length==0){ 
                                          //registra Paciente drmas
                                          var today = new Date();
                                          var dd = String(today.getDate()).padStart(2, '0');
                                          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                          var yyyy = today.getFullYear();
          
                                          today = dd + '/' + mm + '/' + yyyy;
                                          lRs_paciente.fcre_pac = today;
                                            fetch('/modulo/Executeinsert/', {
                                            method: 'POST',
                                            headers: {
                                              'Accept': 'application/json',
                                              'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(lRs_paciente)
                                          }).then(response => response.json())
                                            .then(function (data) { 
                                          }).catch(error => {
                                              console.log(error);
                                          }); 
                              }else{
                                          lRs_paciente.id = "cod_hia";
                                          fetch('/modulo/Executeupdate/', {
                                            method: 'POST',
                                            headers: {
                                              'Accept': 'application/json',
                                              'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(lRs_paciente)
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
  var  s_CodDep ;
  async function REGISTRA_PAC(ls_cod_tit){
 
    var  lRs_paciente ={};
      
      
          await    fetch('/modulo/Abre_Detalle/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: "Select * from m_pacientes where cod_tit ='" + ls_cod_tit + "'"
        
              })
            }).then(response => response.json())
              .then(function (Rs_paciente) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;
                                lRs_paciente.cod_tit = ls_cod_tit.toString();
                                 lRs_paciente.nom_pac = document.getElementById('Txt_Nombres').value.trim();   
                                 lRs_paciente.fnac_pac = document.getElementById('DTFecNac').value.trim();   
                                lRs_paciente.cod_par = '';
                                lRs_paciente.finc_pac = today;
                                lRs_paciente.fcre_pac = today;
                                lRs_paciente.cod_usu = str_cod_emp;
                                lRs_paciente.premio = 0;
                                lRs_paciente.activi = true;
                                lRs_paciente.dni = document.getElementById('Txt_num_doc_id').value.trim();   
                                if( document.getElementById('Txt_celular').value.trim() > 0){
                                lRs_paciente.cel_pac =  document.getElementById('Txt_celular').value.trim();  
                                }
                               
                                if (document.getElementById('Cbo_sexo').value == "FEMENINO" ){
                                  lRs_paciente.sex_pac = false;;
                                }else{
                                  lRs_paciente.sex_pac = true;
                                }
                                lRs_paciente.tabla = "m_pacientes"; 
                                  
                                  if(Rs_paciente.length==0){ 
                                          s_CodDep = "00";
                                          lRs_paciente.cod_dep = "00"  ;   //un paciente es un titular
                                              //registra Paciente drmas 
                                                fetch('/modulo/Executeinsert/', {
                                                method: 'POST',
                                                headers: {
                                                  'Accept': 'application/json',
                                                  'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(lRs_paciente)
                                              }).then(response => response.json())
                                                .then(function (data) { 
                                              }).catch(error => {
                                                  console.log(error);
                                              }); 
                                  }else{
                                            s_CodDep = Rs_paciente[0].cod_dep.trim();
                                              
                                             
                                              lRs_paciente.id = "cod_tit";
                                              fetch('/modulo/Executeupdate/', {
                                                method: 'POST',
                                                headers: {
                                                  'Accept': 'application/json',
                                                  'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(lRs_paciente)
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
var str_cod_emp;

var lsg_cambio ;
async function  Cmd_guardar_Click(){

var dt_fechaAte ;
var dt_horaAte ;
var lstr_cod_dir;
var str_error_datos ;
var bln_tipo_atencion ;
var bln_tipo_inicio_programa ;
var str_1 ;
var str_2 ;
var dt_FechaCorreo ;
var dt_HoraCorreo ;
var rst_dato_dir ;
var str_cod_prov  ;
var str_cod_dist  ;
var ll_CodAte ;
str_error_datos = PvtFn_VALIDAR_DATOS;

 if ( document.getElementById('Dcbo_aseguradora').value == "1234") {
 }
 if  (str_error_datos.length > 0){ 
    alert(str_error_datos);
     return;
}

str_cod_emp = ""
 await fetch('/modulo/BUSCA_COD_EMP/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ls_CodGru:document.getElementById('Dcbo_aseguradora').value
     })

   }).then(response => response.json())
  .then(function (data ) {
    str_cod_emp = data.trim();
  }).catch(error => {
    console.log(error);
  });




  switch (document.getElementById('Cbo_tipo_prog').selectedIndex){
  case 0:
      lv_fecha = document.getElementById('DT_fecha').value;
      lv_hora = null;
      lv_cod_medico = null;
      lv_programada = null;
      lv_SolDr = null;
      ls_tipo_prog = "Inm";
      break;
  case 1:
  case 3:
      lv_fecha = document.getElementById('DT_fecha').value;
      lv_hora = document.getElementById('CmbHora').value;  
      lv_cod_medico = document.getElementById('Txt_Dr').value;  
      lv_programada = true;
      lv_SolDr = "S";
      ls_tipo_prog = "Prg";
      break;
  case 2:
      lv_fecha =  document.getElementById('DT_fecha').value;
      lv_hora =  document.getElementById('CmbHora').value;  
      lv_cod_medico = null;
      lv_programada = true;
      lv_SolDr = "N";
      ls_tipo_prog = "Prg";
      break;
  }
  document.getElementById('Cmd_guardar').disabled = true;
  document.body.style.cursor = 'progress';

if (ls_codigo_hia == "" ){
    //NUEVO PACIENTE
    ls_codigo_hia =  await Correlativo_Pacientes() ;
}


//VALIDACION PARA LOS CLIENTES SITEDS
if(GStr_Cod_Autorizacion ==''){
    if (confirm("Está registrando un atención sin un código de autorización SITEDS, ¿Desea continuar guardando la atención?") ==false ){   
      return;
    }
}

var laboratorios = null;
var laboratoriosc ='', laboratoriost ='', laboratoriosg ='', laboratorioso='';
if(document.getElementById('Chk_colesterol').checked){
  
  laboratoriosc = '330137,330158,330107,';
}
if(document.getElementById('Chk_trigliceridos').checked){
  laboratoriost = '330134,';


}
if(document.getElementById('Chk_glucosa_alterado').checked){
  laboratoriosg = '999999,';

}
if(document.getElementById('Chk_obesidad').checked){
  
  laboratorioso = '330134,';

}
if((laboratoriosc  +  laboratoriost  +   laboratoriosg  + laboratorioso)==''){
  laboratorios = null;
}else{

  laboratorios = '{'  +  (laboratoriosc  +  laboratoriost  +   laboratoriosg  + laboratorioso).slice(0,-1) +   '}';

}
//registra o actualiza Paciente
 REGISTRA_PACDRMAS(ls_codigo_hia);
 REGISTRA_PAC(ls_codigo_hia);

  

if ( document.getElementById('Cmd_Nueva_direccion').disabled == true ){
    lstr_cod_dir = await REGISTRAR_EDITAR_DIRECCION(ls_codigo_hia, true);
}else{
    var filasdireccion = document.querySelectorAll('#DG_direccionbody > tr');
    var filacod_dir ='';



    for(var j =0 ;j<filasdireccion.length;j++){

     if(filasdireccion[j].style.backgroundColor == 'turquoise'){
      filacod_dir =  filasdireccion[j].id;
      break;

     }
    }
    lstr_cod_dir = filacod_dir; 
}
 
await fetch('/modulo/Abre_Detalle', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query:"SELECT cod_dis, cod_prov from m_direcciones where cod_tit ='" +ls_codigo_hia +"' and cod_dir = '" + lstr_cod_dir+"'"
     })

   }).then(response => response.json())
  .then(function (rst_dato_dir ) {
    if(rst_dato_dir.length>0) {
      str_cod_prov = rst_dato_dir[0].cod_prov;
      str_cod_dist = rst_dato_dir[0].cod_dis;
     }
  }).catch(error => {
    console.log(error);
  });
//Txt_contratante.Text = PblFn_FORMATEAR_CADENA(Txt_contratante.Text)

var Adata_atencion={};

var today = new Date(); 
 
dt_fechaAte = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
dt_horaAte = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
/* 
dt_FechaCorreo = document.getElementById('DTFecha_correo').value; 
dt_HoraCorreo = document.getElementById('CmbHoraCorreo').value + ':00'; 
 */
 
//para los codigos de los distritos
 
//Call Abre_Detalle(Adata_atencion, "SELECT * FROM t_tmpllamadas WHERE 1 = 2")
   
    Adata_atencion.estado = "0";
    Adata_atencion.cm_estado = "0";
    Adata_atencion.cod_estado = 0;
    Adata_atencion.cm_orden = 0;
    
    Adata_atencion.laboratorio_nutricion  = laboratorios;

    
    Adata_atencion.flg_cm_nueva = true;
    Adata_atencion.cod_tit = ls_codigo_hia;
    Adata_atencion.fec_ate = dt_fechaAte;
    Adata_atencion.hor_ate = dt_horaAte;
    Adata_atencion.edad_ate = document.getElementById('Lbl_edad').innerHTML.trim().slice(0,3).trim();
    Adata_atencion.cm_tlf_pac = document.getElementById('Txt_casa').value;
    Adata_atencion.feclla_ate = dt_fechaAte;
    Adata_atencion.horlla_ate = dt_horaAte;
    await fetch('/modulo/get_session/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
      })
    }).then(response => response.json())
      .then(function (data) {
              Adata_atencion.usulla_ate = data.trim() ;
      }).catch(error => {
        console.log(error);
      }); 
    
    Adata_atencion.cod_gru = document.getElementById('Dcbo_aseguradora').value.trim();
    Adata_atencion.nom_gru = document.getElementById('Dcbo_aseguradora').options[document.getElementById('Dcbo_aseguradora').selectedIndex].text;  
    Adata_atencion.cod_emp = str_cod_emp;
    //Adata_atencion.nom_emp = s_NomEmp
    
    Adata_atencion.cod_esp = "026";
    Adata_atencion.cod_dis = str_cod_dist;
    Adata_atencion.des_dis = document.getElementById('DCbo_distrito').options[document.getElementById('DCbo_distrito').selectedIndex].text;
    Adata_atencion.cod_prov = str_cod_prov;
    Adata_atencion.des_prov = document.getElementById('DCbo_provincia').value.trim();  
    Adata_atencion.dis_dir = document.getElementById('DCbo_distrito').options[document.getElementById('DCbo_distrito').selectedIndex].text;  

    let mensajeError = "";
/*
    //PAPU Validación 23/10
        // Validar que los desplegables no estén vacíos (asumimos que el valor por defecto es "")
      if (Adata_atencion.des_prov === "") {
          mensajeError += "Seleccione una provincia.\n";
      }
      if (Adata_atencion.cod_dis === "") {
          mensajeError += "Seleccione un distrito.\n";
      }
  
      // Validar que la dirección no esté vacía
      if (Adata_atencion.dis_dir === "") {
          mensajeError += "Ingrese una dirección.\n";
      }
  
      // Mostrar mensaje de error si hay algún problema
      if (mensajeError !== "") {
          alert(mensajeError);
          return // Evitar que se envíe el formulario
      }*/


    Adata_atencion.ref_dir =  document.getElementById('Txt_referencia').value.trim();  
    Adata_atencion.cm_ref_dir = document.getElementById('Txt_referencia').value.trim();   
    Adata_atencion.flag_programada = lv_programada;
    Adata_atencion.f_soldoct = lv_SolDr;
    Adata_atencion.f_prog = ls_tipo_prog;
    Adata_atencion.obs_cm = document.getElementById('Txt_obs_cm').value.trim();  
    Adata_atencion.cod_dr_solicitado = lv_cod_medico
    Adata_atencion.cm_appat_pac = document.getElementById('Txt_ApPat').value.trim();
    Adata_atencion.cm_apmat_pac = document.getElementById('Txt_ApMat').value.trim() ;
    Adata_atencion.cm_nom_pac = document.getElementById('Txt_Nombres').value.trim()
    Adata_atencion.nom_pac = (document.getElementById('Txt_ApPat').value.trim() + " " + document.getElementById('Txt_ApMat').value.trim()   + " " + document.getElementById('Txt_Nombres').value.trim()).substr(0,59);
    Adata_atencion.nom_tit = (document.getElementById('Txt_ApPat').value.trim() + " " + document.getElementById('Txt_ApMat').value.trim()   + " " + document.getElementById('Txt_Nombres').value.trim()).substr(0,59);
    Adata_atencion.pac_vip = document.getElementById('Cbo_VIP').value.trim(); 
    Adata_atencion.cod_dep =s_CodDep;
    Adata_atencion.cm_directa = true;
    Adata_atencion.flg_directo = "S";
    Adata_atencion.cm_datos_completos = true;
    Adata_atencion.laboratorio_nutricion = laboratorios;
 
   //FORMA DE PAGO
   
   if (document.getElementById('Cbo_Moneda').value== "S/."){
        Adata_atencion.tar_ate = document.getElementById('Txt_ded').value;  
        Adata_atencion.flagmone = "S";
        Adata_atencion.cambio = 0;
    }else{
        Adata_atencion.tar_ate = Math.round(((document.getElementById('Txt_ded').value * lsg_cambio) + Number.EPSILON) * 100) / 100
        Adata_atencion.flagmone = "D";
        Adata_atencion.cambio = lsg_cambio;
    }
   
    Adata_atencion.coaseguro =   document.getElementById('txt_coa').value.trim()  ;
    

    switch  (document.getElementById('Cbo_forma_pago').value){
      
    case "":
        Adata_atencion.for_ate = "";
        break;
    case "EFECTIVO":
          Adata_atencion.for_ate = "E"  ;       
        if (document.getElementById("Cbo_moneda_den").value == "S/." ){
          Adata_atencion.cm_moneda_den = "S";
          Adata_atencion.cm_den_cambio = 0;
        }else{
          Adata_atencion.cm_moneda_den = "D";
          Adata_atencion.cm_den_cambio = lsg_cambio; 
        }
        Adata_atencion.cm_denominacion = document.getElementById("Cbo_Denominacion").value  ; 
        break;
    case "CREDITO":
        Adata_atencion.for_ate = "C";
        Adata_atencion.cm_autorizado =  document.getElementById("Txt_autorizado").value  ;
        break;
    case "TARJETA":
        Adata_atencion.for_ate = "T";
        Adata_atencion.codtar_ate  =  document.getElementById("TxtNroTar").value ;
        Adata_atencion.ntar_ate  = document.getElementById("ME_tarjeta").value.padStart(16, '0').substring(8, 8); 
        Adata_atencion.tarj_mc =  document.getElementById("ME_tarjeta").value.padStart(16, '0')  ;
        
        if (document.getElementById("Txt_anio_credito").value != "" && document.getElementById("Txt_mes_credito").value  != "" ){
            Adata_atencion.fvenc_ate =  document.getElementById("Txt_anio_credito").value + "-" +  document.getElementById("Txt_mes_credito").value  + "-" + "01";
        }
        break;
    case "MPOS":
        Adata_atencion.for_ate = "M";
        break;
    case "TRANSFERENCIA":
        Adata_atencion.for_ate = "F";
        break;
    }
 

    Adata_atencion.cod_dir =  lstr_cod_dir ;
    Adata_atencion.des_dir =   document.getElementById("Txt_direccion").value.trim();// +  " " + document.getElementById("Txt_nro_lote").value.trim()+" " + document.getElementById("Txt_dpto_dir").value.trim()).substr(0, 69);
    Adata_atencion.tlf_dir =  document.getElementById("Txt_casa").value  ;  
    Adata_atencion.cel_pac =  document.getElementById("Txt_celular").value  ;  
    
    Adata_atencion.sexo_ate = (document.getElementById("Cbo_sexo").value=="FEMENINO")?'F':'M';   
    Adata_atencion.sin_ate =  document.getElementById("Txt_sintomas").value.trim()  ;          
    
    Adata_atencion.contacto_pac = document.getElementById("Txt_contacto_pac").value.toUpperCase()    ;
    Adata_atencion.contacto_aseg = document.getElementById("Txt_contacto_aseg").value.toUpperCase() ;  
    Adata_atencion.tipo_servicio = "ATE";
    //datos de aseguradora
    
    //Actuales
    Adata_atencion.cod_aut_prestacion = document.getElementById("TxtCodAut").value ;
    Adata_atencion.cod_asegurado = document.getElementById("Txt_cod_aseg").value ;  
    Adata_atencion.cod_solgen = document.getElementById("Txt_num_sol").value ;  
    Adata_atencion.cm_aseg_producto = document.getElementById("Txt_prod").value.toUpperCase();  
    Adata_atencion.poliza_asegurado = document.getElementById("Txt_Poliza").value ; 
    Adata_atencion.poliza_certificado =  document.getElementById("Txt_pol_cert").value ; 
    Adata_atencion.tipo_afiliacion = document.getElementById("Txt_cod_aseg").value ;  
    Adata_atencion.cm_aseg_producto = document.getElementById("Txt_prod").value ;  
     
     
   /* 
    
    Select Case Cbo_tipo_consulta.Text
        Case "PRIMERA CONSULTA"
            Adata_atencion.primera_consulta = True
        Case "CONSULTA SEGUIMIENTO"
            Adata_atencion.primera_consulta = false;
         Case "PACIENTE TRASLADO"
            Adata_atencion.primera_consulta = True
            Adata_atencion.paciente_traslado = True
    End Select */
    Adata_atencion.modo_atencion_medico = parseInt((document.getElementById('Cbo_modo_atencion_medico').value=='VISITA DOMICILIARIA')?0:((document.getElementById('Cbo_modo_atencion_medico').value=='TELECONSULTA')?1:2)); 
    Adata_atencion.clasificacion_pac = document.getElementById("DCbo_clasificacion").value ;  
    Adata_atencion.id_periodo_consulta = 1; //momentaneo
     //Adata_atencion.contador_periodo = 1;momentaneo
    Adata_atencion.contador_periodo = document.getElementById('contador_periodo').value==''?0:parseInt(document.getElementById('contador_periodo').value);
    if(Adata_atencion.contador_periodo > 1 && Adata_atencion.modo_atencion_medico ==0 ){
        alert('Por favor no se puede ingresar una consulta presencial en un control posterior a 1');
        return
    }

    Adata_atencion.periodo_mes = 11;

    await fetch('/modulo/DACODATE/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Adata_atencion)
    }).then(response => response.json())
      .then(function (data) {
        ll_CodAte = data;

      }).catch(error => {
        console.log(error);
      });
      Adata_atencion.cod_ate = ll_CodAte;
      Adata_atencion.tabla = 't_tmpllamadas';
      alert(Adata_atencion);
      
    await fetch('/modulo/Executeinsert/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Adata_atencion)
    }).then(response => response.json())
      .then(async function (data) {
        document.body.style.cursor = 'default';
        alert ("Se ha creado la atención " + ll_CodAte);
        Inicializa_registro();
        IN_Hhabilitar_controles(false);
        IN_Hhabilitar_controles_direccion(false);
        appMainWindow.document.getElementById('Cbo_opcion').value = 14;
        appMainWindow.document.getElementById('Txt_busqueda').style.display='inline-block'
        appMainWindow.document.getElementById('Txt_busqueda').value=ll_CodAte;
        await appMainWindow.document.getElementById('CmdFiltrar').click();

      }).catch(error => {
        console.log(error);
      }); 
    
  
//actualiza la tabla de SITEDS con el codigo de la atención
if (document.getElementById("TxtCodAut").value.trim() != ""){
  await  fetch('/modulo/Execute/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "UPDATE h_siteds_documento_autorizacion SET cod_ate = " + ll_CodAte + " WHERE CodigoAutorizacion = '" + document.getElementById('TxtCodAut').value + "'"

    })
  }).then(response => response.json())
    .then(function (data) {
      alert ("Se actualizo con el codigo de autorizacion " + document.getElementById('TxtCodAut').value);

    }).catch(error => {
      console.log(error);
    });
 }else{
  await fetch('/modulo/P_GUARDA_SEGUIMIENTO/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_ate :ll_CodAte,
      des_ser :  'ATE',
      obs_ser :  "Atencion sin formulario SITEDS",
      cod_snc :  '519'
       })
  
     }).then(response => response.json())
    .then(function (data ) {
       if(data){

       }
    }).catch(error => {
      console.log(error);
    });


    switch ( document.getElementById('Cbo_tipo_prog').selectedIndex){
    case 0:
      await fetch('/modulo/REGISTRA_CM_AUDITORIA/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 
             ll_cod_ate :   ll_CodAte,
             ls_estado : '0',
             ls_cambios : "ESPECIALIDAD: " + document.getElementById('DCbo_Especialidad').value + ", PROGRAMACION: " + document.getElementById('Cbo_tipo_prog').value + ", DEDUCIBLE: " + document.getElementById('Cbo_Moneda').value + document.getElementById('Txt_ded').value + ", COASEGURO: " + document.getElementById('txt_coa').value + "%",
             ls_obs :"CREACION ATENCION DIRECTA"
    
            }
        )
      }).then(response => response.json())
        .then(function (data) {
         if(data){
             
         }
    
        }).catch(error => {
          console.log(error);
        })
    break;
    case 1:
    case 3:
      await fetch('/modulo/REGISTRA_CM_AUDITORIA/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 
             ll_cod_ate :   ll_CodAte,
             ls_estado : '0',
             ls_cambios : "ESPECIALIDAD: " + document.getElementById('DCbo_Especialidad').value + ", PROGRAMACION: " + document.getElementById('Cbo_tipo_prog').value + ", DEDUCIBLE: " + document.getElementById('Cbo_Moneda').value + document.getElementById('Txt_ded').value + ", COASEGURO: " + document.getElementById('txt_coa').value + "%",
             ls_obs :"CREACION ATENCION DIRECTA"
    
            }
        )
      }).then(response => response.json())
        .then(function (data) {
         if(data){
             
         }
    
        }).catch(error => {
          console.log(error);
        })
    //Call REGISTRA_CM_AUDITORIA(Val(Txt_CodAte.Text), "0", "ESPECIALIDAD: " & Txt_especialidad.Text & ", PROGRAMACION: " & Cbo_tipo_prog.Text & ", MEDICO: " & Txt_Dr.Text & ", FECHA: " & CStr(DT_fecha.Value) & "HORA: " & CmbHora.Text & ", DEDUCIBLE: " & Cbo_Moneda.Text & Txt_ded.Text & ", COASEGURO: " & txt_coa.Text & "%", "CREACION ATENCION DIRECTA")
    break;
    case 2:
      await fetch('/modulo/REGISTRA_CM_AUDITORIA/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 
             ll_cod_ate :   ll_CodAte,
             ls_estado : '0',
             ls_cambios : "ESPECIALIDAD: " + document.getElementById('DCbo_Especialidad').value + ", PROGRAMACION: " +  document.getElementById('Cbo_tipo_prog').value   + ", FECHA: " + document.getElementById('DT_fecha').value    + "HORA: " + document.getElementById('CmbHora').value   + ", DEDUCIBLE: " + document.getElementById('Cbo_Moneda').value + document.getElementById('Txt_ded').value   + ", COASEGURO: " + document.getElementById('txt_coa').value     + "%",
             ls_obs :"CREACION ATENCION DIRECTA"
    
            }
        )
      }).then(response => response.json())
        .then(function (data) {
         if(data){
             
         }
    
        }).catch(error => {
          console.log(error);
        })
       
    break;
    }
    
   
   //document.getElementById('Cmd_guardar').disabled = false;
    document.body.style.cursor = 'default' ;
    document.getElementById('Cmd_salir').click();


 }
 
   
 

 
 
}


async function  REGISTRAR_EDITAR_DIRECCION(pCodPaciente,  pflg_NuevaDir ){
    var lrs_direccion ={} ;
    var lrs_distrito ;
    var ll_cod_dir ;
    var str_cod_dist ;
    var str_cod_prov ;
    var pCodDir;
    var flaginsert = false;
        //registra la nueva direccion
        
        if (pflg_NuevaDir == true ){
  
            await fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:"SELECT * FROM m_direcciones WHERE cod_tit = '" + pCodPaciente + "' ORDER BY cod_dir desc"
                 })
        
               }).then(response => response.json())
              .then(function (data ) {
                if(data.length>0) {
                  pCodDir = (parseInt(data[0].cod_dir) + 1).toString().padStart(2, '0') ;

                }else{
                  pCodDir = "00";

                }
              }).catch(error => {
                console.log(error);
              });

            str_cod_dist = document.getElementById("DCbo_distrito").value; 
            
            await fetch('/modulo/Abre_Detalle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query:"SELECT cod_prov, cod_dis FROM m_distritos WHERE cod_dis = '" + str_cod_dist + "'"
                 })
        
               }).then(response => response.json())
              .then(function (data ) {
                if(data.length>0) {
                  str_cod_prov = data[0].cod_prov ;
                }else{ 
                }
              }).catch(error => {
                console.log(error);
              });
            flaginsert = true;
            lrs_direccion.cod_tit = pCodPaciente;
            lrs_direccion.cod_dir =  (pCodDir).padStart(2, '0');
            
        }else{
          await fetch('/modulo/Abre_Detalle', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query:"SELECT * FROM m_direcciones WHERE cod_tit = '" +  pCodPaciente + "' AND cod_dir = '" + pCodDir + "'"
               })
      
             }).then(response => response.json())
            .then(function (lrs_direccion ) {
              if(lrs_direccion.length>0) {
                lrs_direccion = data[0].cod_dis ;
                lrs_direccion = data[0].cod_prov ;
 
              }else{ 
              }
            }).catch(error => {
              console.log(error);
            }); 
        }
        
        
        lrs_direccion.cod_tit = pCodPaciente;
        lrs_direccion.cod_dir = pCodDir;
        lrs_direccion.des_dir = document.getElementById('Txt_direccion').value;  
        lrs_direccion.cod_dis = str_cod_dist
        lrs_direccion.cod_prov = str_cod_prov
        lrs_direccion.dis_dir = document.getElementById('DCbo_distrito').value.trim();  
        lrs_direccion.ref_dir =  document.getElementById('Txt_referencia').value.trim();     
        lrs_direccion.tlf_casa =  document.getElementById('Txt_casa').value;   
        lrs_direccion.tlf_celular =   document.getElementById('Txt_celular').value; 
        lrs_direccion.tlf_dir =  document.getElementById('Txt_casa').value;  
        lrs_direccion.tlf_oficina =  document.getElementById('Txt_oficina').value;      
        lrs_direccion.tlf_oficina_anx =  document.getElementById('Txt_oficina_anx').value;    
        lrs_direccion.tabla = 'm_direcciones';
         if(flaginsert){
               
              await fetch('/modulo/Executeinsert/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(lrs_direccion)
              }).then(response => response.json())
                .then(function (data) { 
              }).catch(error => {
                  console.log(error);
              }); 
    
          
         }else{
           //editar para cuando sea update por el momemnto no hace nada
                //lRs_paciente.id = "cod_dir,cod_tit";
                fetch('/modulo/Executeupdate/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(lrs_direccion)
                }).then(response => response.json())
                  .then(function (data) { 

                }).catch(error => {
                    console.log(error);
                });  

         }
        return  pCodDir;  

}
function PvtFn_VALIDAR_DATOS() {
var datenow = new Date();
var  msg_error ='';
b_valida = true;

if(document.getElementById('Txt_distrito').value == "ATE" ){
    
}

if(document.getElementById('contador_periodo').value.trim() <= "0" ){
    //Txt_seguro.BackColor = &HC0C0FF
    contenido_msg = contenido_msg + "Debe ingresar el control de periodo " + '\n';
    b_valida = false;
}
if(document.getElementById('Txt_seguro').value.trim() == "" ){
  //Txt_seguro.BackColor = &HC0C0FF
  
  b_valida = false;
}
/* if(DGrid_seg.Visible = True ){
    DGrid_seg.BackColor = &HC0C0FF
    b_valida = false;
} */

if(document.getElementById('Txt_ApPat').value.trim() == "" ){
    //Txt_ApPat.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById('Txt_ApMat').value.trim() == "" ){
    //Txt_ApMat.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById('Txt_Nombres').value.trim() == "" ){
    //Txt_Nombres.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById('Txt_edad').value.trim() == "" ){
   // Txt_edad.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById('Cbo_sexo').value == "" ){
   // Cbo_sexo.BackColor = &HC0C0FF
    b_valida = false;
}

if( (document.getElementById('Txt_tlf_celular').value == "" || document.getElementById('Txt_tlf_celular').value == 0) ){
    //Txt_tlf_celular.BackColor = &HC0C0FF
    //Txt_tlf_casa.BackColor = &HC0C0FF
    contenido_msg = contenido_msg + "Debe ingresar el numero de celular " + '\n';
    b_valida = false;
}

if(document.getElementById('DC_tipo_doc_id').value.trim() == "" ){
    contenido_msg = contenido_msg + "seleccione el tipo de documento de identidad " + '\n'
    //DC_tipo_doc_id.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById('Txt_DNI').value.trim() == "" ){
    contenido_msg = contenido_msg + "Ingrese numero del documento de identidad" + '\n'
    //Txt_DNI.BackColor = &HC0C0FF
    b_valida = false;
}else{
    
   switch (document.getElementById('DC_tipo_doc_id').value){
        case 2 : //DNI
     
            if(document.getElementById("Txt_DNI").value.match(/^[0-9]+$/) != null){
                
            }else{
              contenido_msg = contenido_msg + "El DNI ingresado es incorrecto" + '\n';
              b_valida = false;
               
            }
           break;
      case 3:
      case 5: //CARNE DE EXTR y PASAPORTE
      break;
    }
}


if(document.getElementById("Cbo_pac_VIP").value.trim() == "" ){
    //Cbo_pac_VIP.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById("DC_clasificacion").value.trim() == "" ){
    //DC_clasificacion.BackColor = &HC0C0FF
    b_valida = false;
}


if(document.getElementById("Cbo_tipo_consulta").style.visibility == 'visible' ){
    if(document.getElementById("Cbo_tipo_consulta").value.trim() == "" ){
       // Cbo_tipo_consulta.BackColor = &HC0C0FF
        b_valida = false;
    }
}

if(document.getElementById('Txt_distrito').value.trim() == "" ){
    //Txt_distrito.BackColor = &HC0C0FF
    b_valida = false;
}

/* if(DGrid_distrito.Visible = True ){
    DGrid_distrito.BackColor = &HC0C0FF
    b_valida = false;
} */

if(document.getElementById('Txt_distrito').value.trim() != "" ){
    if(document.getElementById('Txt_Direccion').value.trim() == "" && document.getElementById('Txt_Direccion').disabled == false ){
       // Txt_Direccion.BackColor = &HC0C0FF
        b_valida = false;
    }
    
    /* if(DGrid_direccion.Visible = True ){
        DGrid_direccion.BackColor = &HC0C0FF
        b_valida = false;
    } */
    
    if(document.getElementById('Txt_Referencia').value.trim() == "" ){
       // Txt_Referencia.BackColor = &HC0C0FF
        b_valida = false;
    }
}


    

if(document.getElementById('DCbo_zona_dist').style.visibility == 'visible' ){
    if(document.getElementById('DCbo_zona_dist').value == "" ){
        contenido_msg = contenido_msg + "Seleccione la zona del distrito" + '\n';
        //DCbo_zona_dist.BackColor = &HC0C0FF
        b_valida = false;
    }
}

if(document.getElementById('Cbo_tiene_correo').selectedIndex == 0 ){
    if(document.getElementById('Txt_email').value.trim() == "" /* || Validar_Email(Txt_email.Text) = false; */ ){
        contenido_msg = contenido_msg + "El correo electronico esta mal ingresado, por favor corregir" + '\n';
        //Txt_email.BackColor = &HC0C0FF
        b_valida = false;
    }
}

if(document.getElementById('Fram_Correo_electronico').style.visibility == 'Visible' && document.getElementById('DC_medio_envio_ce').value.trim() == "" ){
   // DC_medio_envio_ce.BackColor = &HC0C0FF
    b_valida = false;

}

if(document.getElementById('Txt_sintomas').value == "" ){
    //Txt_sintomas.BackColor = &HC0C0FF
    b_valida = false;
}

//VALIDACION DE SEG COVID EXTERNA

/* if(Fram_Seg_covid.Visible = True ){

    if(Txt_pac_Seg_Covid.Tag = "1" ){
        if(Opt_pac_covid_si.Value = false; And Opt_pac_covid_NO.Value = false; ){
            contenido_msg = contenido_msg & "Seleccione si el paciente cuenta con una prueba externa" & '\n'
            b_valida = false;
        }
        
    
        if(Opt_pac_covid_si.Value = True ){
            if(DCbo_covid_tipo_prueba.Text = "" ){
                contenido_msg = contenido_msg & "Seleccione el tipo de prueba externa" & '\n'
                b_valida = false;
            Else
                Bln_reg_seg_covid = True
            }
        }
    }
} */

//DATOS DE COTIZACION O PROGRAMACION

if(document.getElementById('Txt_especialidad').value == "" ){
    //Txt_especialidad.BackColor = &HC0C0FF
    b_valida = false;
}

/* if(DGrid_especialidad.Visible = True ){
    DGrid_especialidad.BackColor = &HC0C0FF
    b_valida = false;
} */

if(document.getElementById('Cbo_tipo_prog').value == "" ){
    //Cbo_tipo_prog.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById('Fram_medio_solicitud_ate').style.visibility == 'visible' && document.getElementById('Dcbo_via_solicitud').value == "" ){
    contenido_msg = contenido_msg + "Seleccione una via de solicitud de atención" + '\n';
    b_valida = false;
}

if(document.getElementById('Txt_Dr.Text').value.trim() == "" && document.getElementById('Txt_Dr').style.visibility == 'visible' ){
   // Txt_Dr.BackColor = &HC0C0FF
    b_valida = false;
}

/* if(DGrid_Dr.Visible = True ){
    DGrid_Dr.BackColor = &HC0C0FF
    b_valida = false;
} */

if(document.getElementById('CmbHora').value.trim() == "" && document.getElementById('CmbHora').style.visibility == 'visible' ){
   // CmbHora.BackColor = &HC0C0FF
    b_valida = false;
}


//VALIDA DATOS DE FORMA DE PAGO

if(document.getElementById('Txt_ded').value.trim() == "" ){
   // Txt_ded.BackColor = &HC0C0FF
    b_valida = false;
}else{
    
}



vt_tipo_doc_pago = "";
if(document.getElementById('Txt_ded').value.trim() > 0 ){
    switch (document.getElementById('Cbo_doc_pago').value){
        case "BOLETA":
            vt_tipo_doc_pago = "B";
        case "FACTURA":
            vt_tipo_doc_pago = "F";
        default:
            contenido_msg = contenido_msg + "Seleccione un tipo de documento de pago" + '\n';
            b_valida = false;
    }
    
}


//coaseguro
if(document.getElementById('txt_coa').value.trim() == "" ){
    //txt_coa.BackColor = &HC0C0FF
    b_valida = false;
}

if(document.getElementById('Txt_seguro').value.trim() != "" ){
    if(document.getElementById('Dcbo_aseguradora').value == "011" ){
        if(document.getElementById('txt_coa') == 0 ){
            contenido_msg = contenido_msg + "El porcentaje de coaseguro para B.C.R. debe ser mayor a cero" + '\n';
            b_valida = false;
        }
    }
}
    
switch (document.getElementById('Cbo_forma_pago').value  ){
    case "EFECTIVO":
        if(document.getElementById('Cbo_Denominacion').value == "" ){
           // Cbo_Denominacion.BackColor = &HC0C0FF
            b_valida = false;
        }
        break;
    case "CREDITO":
        if(document.getElementById('Txt_autorizado').value == "" ){
         //   Txt_autorizado.BackColor = &HC0C0FF
            b_valida = false;
        }
        break;
    case "TARJETA":
        if(document.getElementById('ME_tarjeta').value == "" ){
            //ME_tarjeta.BackColor = &HC0C0FF
            b_valida = false;
        }
        break;
}



if(document.getElementById('DCbo_cond').style.visibility == 'visible' ){
    if(document.getElementById('DCbo_cond').value == "" ){
        contenido_msg = contenido_msg + "Debe seleccionar una condicion de pago" + '\n';
        b_valida = false;
    }
}


if(document.getElementById('DC_clasificacion').value == "" ){
    contenido_msg = contenido_msg +  "Seleccione una clasificación para la atencion a realizar"  + '\n';
    b_valida = false;
}

if(document.getElementById('Cbo_tipo_consulta').style.visibility == true && document.getElementById('Cbo_tipo_consulta').value == "" ){
    contenido_msg = contenido_msg + "Seleccione si la atencion es primera consulta o seguimiento" + '\n';
    b_valida = false;
}

/* if(Cbo_pqt_nut.Visible = True And Cbo_pqt_nut.Text = "" ){
    contenido_msg = contenido_msg & "Seleccione un paquete de nutricion para la atención" & '\n'
    b_valida = false;
} */

/* if(document.getElementById('Txt_seguro') != "" ){
    if(Trim(Adata_seg.Recordset!cod_gru) = "044" Or Trim(Adata_seg.Recordset!cod_gru) = "106" ){
        
    }
} */


if(document.getElementById('Dcbo_categoria').disabled == false && document.getElementById('Dcbo_categoria').value == "" ){
    contenido_msg = contenido_msg + "Seleccione una categoria de servicio para el cliente" + '\n';
    b_valida = false;
}


if(b_valida == false ){
  document.getElementById('LbL_error').style.visibility = 'visible';
    if(contenido_msg == "" ){
        return  "existen campos que se tiene que corregir";
    }else{
        return  contenido_msg;
    }
    
}



//fin validacion
return  msg_error;
}
var GStr_SITEDS_Cod_Cliente ;
var GStr_SITEDS_Cod_Especialidad ;
var GStr_SITEDS_Apellido_Paterno ;
var GStr_SITEDS_Apellido_Materno ;
var GStr_SITEDS_Nombres ;
var GStr_SITEDS_Cod_doc_id ;
var GStr_SITEDS_Numero_doc_id ;
var GStr_Cod_Autorizacion ;
var GStr_Documento_Autorizacion;
var GArr_Clinica_origen = [];
var GArr_Cobertura_clinica_origen= [];
async function Fn_DATOS_PARAMETROS_SITEDS(pCodCliente , pCodEspecialidad , pApPat , pApMat , pNombres , pCodDocid , pNumDocID ){


  var  rst_Susalud ;
    var valor;
 
  GStr_SITEDS_Cod_Cliente = "";
  GStr_SITEDS_Cod_Especialidad = "";
  GStr_SITEDS_Apellido_Paterno = "";
  GStr_SITEDS_Apellido_Materno = "";
  GStr_SITEDS_Nombres = "";
  GStr_SITEDS_Cod_doc_id = "";
  GStr_SITEDS_Numero_doc_id = "";
  GStr_Cod_Autorizacion = "";
  GStr_Documento_Autorizacion = '';

    
  if (pApMat == ".") {
     pApMat = "";
  }

  rst_Susalud ="select cod_financ from m_iafas WHERE cod_cliente = '" + pCodCliente + "'";
  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: rst_Susalud

    })
  }).then(response => response.json())
    .then(function (data) {
      var html = '' ;
      var i; 
                 
    //Frame1.Caption = "Consultas médicas"
    if (data.length>0) { 
       if (data[0].cod_financ == "30004" &&  pCodEspecialidad == "" ){
          alert ("No se esta enviando la especialidad requerida para el cliente");
          valor= false;;
       }else{
          
          GStr_SITEDS_Cod_Cliente = pCodCliente;
          GStr_SITEDS_Cod_Especialidad = pCodEspecialidad;
          GStr_SITEDS_Apellido_Paterno = pApPat;
          GStr_SITEDS_Apellido_Materno = pApMat;
          GStr_SITEDS_Nombres = pNombres;
          GStr_SITEDS_Cod_doc_id = pCodDocid; //El codigo es id_doc_id
          GStr_SITEDS_Numero_doc_id = pNumDocID;
          valor=  true;
       }
       
 
   
    } 

      document.body.style.cursor = 'default';

    }).catch(error => {
      console.log(error);
    });
 
  return valor;
}

var   Frm_SITEDS_doble_validacion;

async function  Cmd_datos_siteds_Click(){

  //genera los datos
  var str_aux_CodEsp   ;
  var str_aux_CodDocId  ;
  var j  ;
  
  str_aux_CodEsp = "";
  
  if  (document.getElementById('DC_tipo_doc_id').value != "") {
      str_aux_CodDocId = document.getElementById('DC_tipo_doc_id').value;
  }else{
      str_aux_CodDocId = 2;
  }
   if ( await Fn_DATOS_PARAMETROS_SITEDS( document.getElementById('Dcbo_aseguradora').value.trim(),str_aux_CodEsp,document.getElementById('Txt_ApPat').value,document.getElementById('Txt_ApMat').value,document.getElementById('Txt_Nombres').value,str_aux_CodDocId,document.getElementById('Txt_num_doc_id').value) == true){
 
                  GArr_Clinica_origen.push("");
                  GArr_Clinica_origen.push("");
                  
                  GStr_Cod_Autorizacion = ""
                  GStr_Documento_Autorizacion = '';
                  document.getElementById('Txt_contratante').value = '';
                  document.getElementById('TxtCodAut').value= '';
                  document.getElementById('Txt_cod_aseg').value= '';
                  document.getElementById('Txt_tipo_afiliacion').value= '';
                  document.getElementById('Txt_prod').value= '';
                  document.getElementById('Txt_Poliza').value= '';
                  document.getElementById('Txt_pol_cert').value= '';
                  document.getElementById('txt_coa').value= '';
     
                  let element1 =[],  element2=[];
                  for (let index = 0; index < 17; index++) {
                     element1[index] = '';
                     element2[index] = '';
                  }
                  GArr_Cobertura_clinica_origen[0]= element1; 
                  GArr_Cobertura_clinica_origen[1] = element2;
                  printModal(`
                  <style>
                  .Frm_SITEDS_buscar_paciente {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto auto ;
                    gap: 0px 0px;
                    grid-auto-flow: row 
             
                  }
                  
                  
                  .filtro1 { grid-area: filtro1; }
                  
                  .filtro2 { grid-area: filtro2; }
                  
                  .botones { grid-area: botones; }
                  
                  .tabla { grid-area: tabla; }
                  .Frm_SITEDS_datos_asegurado {
                    display: grid;
                    grid-template-columns: 1.7fr 0.3fr;
                    grid-template-rows: auto auto auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      "informaciongeneral Foto"
                      "datospaciente Foto"
                      "datospacientesegunregistroafiliado Foto"
                      "datostitular ."
                      "beneficios beneficios"
                      "botonessiteds botonessiteds";
                  }
                  
                  .Foto { grid-area: Foto; }
                  
                  .informaciongeneral {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: informaciongeneral;
                  }
                  
                  .datospaciente {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: datospaciente;
                  }
                  
                  .datospacientesegunregistroafiliado {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: datospacientesegunregistroafiliado;
                  }
                  
                  .datostitular {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: auto auto auto auto auto;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . ."
                      ". . . . . .";
                    grid-area: datostitular;
                  }
                  
                  .beneficios { 
                    grid-area: beneficios; 
                    height:30vh;
                    border:1px solid black;
                    overflow:scroll;
                  }
                  .beneficios td { 
               
                  }
                  .botonessiteds {
                    display: grid;
                    grid-template-columns: 1.4fr 0.7fr 0.7fr 1.6fr 0.6fr;
                    grid-template-rows: 1fr;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      ". . . . .";
                    grid-area: botonessiteds;
                  }
                  
                  </style>
                  <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> Busqueda de asegurado SITEDS - IPRESS DOCTORMAS</h4><button type="button"  id="cancelaroptasoc" class="cancelarmodal btn-xs btn-danger">X</button></div>
               
                
                              
                  <div class="tabsiteds">  
                  <button class="tablinkssiteds" onclick="opensiteds(event, 'SSTabsiteds0')" id="tabsiteds0">BUSQUEDA DE ASEGURADO</button>
                  <button class="tablinkssiteds" onclick="opensiteds(event, 'SSTabsiteds1')" id="tabsiteds1">DATOS DEL ASEGURADO</button>
                   </div>
                
                  <div id="SSTabsiteds0" class="tabcontentsiteds">
                          <div class="Frm_SITEDS_buscar_paciente">
                                <label id= "Label3">Aseguradora :</label>
                                <label style="visibility:hidden;" id= "Lbl_especialidad">Especialidad :</label><div></div><div></div><div></div>
                          
                                <select   name = "Dcbo_Aseguradora" id="Dcbo_Aseguradora" ></select> 
                                <select style="visibility:hidden;"   name = "Dcbo_Especialidad" id="Dcbo_Especialidad" ></select><select style="display:none;" name = "Dcbo_Clinica_origen" id="Dcbo_Clinica_origen" ></select>
                                <div></div><div></div><div></div>
                    
                                <label id= "Label10">Ap. Paterno :</label>
                                <label id= "Label8">Ap. materno :</label>
                                <label id= "Label1">Nom Paciente :</label>
                                <label id= "Label1">Tipo Doc. Ident. :</label><div></div>

                                <input  type="text" name = "Txt_Apellido_paterno" id="Txt_Apellido_paterno" />    
                                <input  type="text" name = "Txt_Apellido_materno" id="Txt_Apellido_materno" />    
                                <input  type="text" name = "Txt_Nombressiteds" id="Txt_Nombressiteds" />    
                                <select   name = "DC_tipo_doc_idsiteds" id="DC_tipo_doc_idsiteds" > </select>
                                <input  type="text" name = "Txt_documento_identidad" id="Txt_documento_identidad" />    

                                <div></div><div></div><div></div>
                              <button onclick="cmd_buscar_x_pac_Click();" id="cmd_buscar_x_pac">Buscar por paciente</button>
                              <button onclick="cmd_buscar_x_doc_id_Click();" id="cmd_buscar_x_doc_id">Buscar por Doc identidad</button>
                              <div style ="grid-column:1/6;height:65vh;  overflow: scroll;" >
                                  <table  border=1 style="width:100%;font-size:1.7vh" id="MSHGrid_Asegurado" >
                                      <thead   id = "MSHGrid_Aseguradohead">
                                      <tr style="background-color:green;color:white">
                                              <th scope="col">PRODUCTO</th>
                                              <th scope="col">APELLIDO PATERNO</th>
                                              <th scope="col">APELLIDO MATERNO</th>
                                              <th scope="col">NOMBRES</th>
                                              <th scope="col">PARENTESCO</th>
                                              <th scope="col">CONTRATANTE</th>
                                              <th scope="col">ESTADO</th>
                                              <th scope="col">CODIGO  AFIL</th>
                                              <th scope="col">FECHA NACIMIENTO</th>
                                              <th scope="col">GENERO</th>
                                              <th scope="col">TIPO DOCUMENTO</th>
                                              <th scope="col">NUMERO DOCUMENTO</th>
                                              <th scope="col">NUMERO PLAN</th>
                                              <th scope="col">NUMERO CONTRATO</th>
                                              <th scope="col">NUMERO DOCUMENTO CONTRATANTE</th>
                                              <th scope="col">TIPO CALIFICADOR CONTRATANTE</th>
                                              <th scope="col">TIPO DOCUMENTO CONTRATANTE</th>

                                      </tr>
                                      </thead>
                                      <tbody  id="MSHGrid_Aseguradobody">

                                      </tbody>
                                      <tfoot>
                                      </tfoot>
                                </table> 
                              </div>
                              <div   style="grid-column:1/6;display:flex;justify-content:space-between	;">
                             <div></div>
                               <input type="button"  class="btn btn btn-primary btn-sm" onclick="Cmd_Datos_asegurado_Click();"  id="Cmd_Datos_asegurado" name="Cmd_Datos_asegurado" value="Seleccionar"> 
                              </div>
                              
                        </div>
                  </div>

                  <div id="SSTabsiteds1" class="tabcontentsiteds">
                        <div class="Frm_SITEDS_datos_asegurado">
                          <div class="Foto"></div>
                          <div class="informaciongeneral">
                          <label style="grid-column:1/7;font-weight: bold;color:black"  id= "Label12">INFORMACION GENERAL</label>

                          <label id= "Label4">N° Autorización :</label>
                          <input readonly style="background-color:yellow" type="text" name = "Txt_Cod_autorizacion" id="Txt_Cod_autorizacion" />
                          <label id= "Label6">Código de asegurado :</label>
                          <input readonly type="text" name = "Txt_codigo_asegurado" id="Txt_codigo_asegurado" />    
                          <label id= "Label28">N° declaración accidente :</label>
                          <input readonly style="background-color:#F5F5DC" type="text" name = "Text20" id="Text20" />    
                          <label id= "Label5">Poliza/contrato :</label>
                          <input readonly type="text" name = "Txt_poliza" id="Txt_poliza" />    
                          <label id= "Label7">Certificado :</label>
                          <input readonly type="text" name = "Txt_certificado" id="Txt_certificado" />    
                          <label id= "Label27">N° Solicitud Origen :</label>
                          <input readonly style="background-color:#F5F5DC" type="text" name = "Text19" id="Text19" />    
                          <label id= "Label19">Producto :</label>
                          <input readonly  type="text" name = "Txt_producto" id="Txt_producto" />    
                          </div>
                          <div class="datospaciente">
                          <label  style="grid-column:1/7;font-weight: bold;color:black" id= "Label16">DATOS DEL PACIENTE</label>

                          <label id= "Label13">Apellidos y Nombres :</label>
                          <input readonly style="grid-column:2/5" type="text" name = "Txt_paciente_ap_nombres" id="Txt_paciente_ap_nombres" /><div></div><div></div>
                          <label id= "Label14">Género :</label>
                          <input readonly type="text" name = "Txt_paciente_genero" id="Txt_paciente_genero" />    
                          <label id= "Label19">Fecha de nacimiento :</label>
                          <input readonly  type="text" name = "Txt_paciente_fec_nacimiento" id="Txt_paciente_fec_nacimiento" />    
                          <label id= "Label23">Parentesco :</label>
                          <input readonly type="text" name = "Txt_paciente_parentesco" id="Txt_paciente_parentesco" />    
                          <label id= "Label15">Tipo Documento :</label>
                          <input readonly type="text" name = "Txt_paciente_tipo_documento" id="Txt_paciente_tipo_documento" />    
                          <label id= "Label20">Num. de documento :</label>
                          <input readonly type="text" name = "Txt_paciente_num_documento" id="Txt_paciente_num_documento" /> 
                          <label id= "Label24">Edad :</label>
                          <input readonly  type="text" name = "Txt_paciente_edad" id="Txt_paciente_edad" />    
                          <label id= "Label17">Inicio Vigencia :</label>
                          <input readonly type="text" name = "Txt_paciente_ini_vigencia" id="Txt_paciente_ini_vigencia" />    
                          <label id= "Label21">Fin Vigencia :</label>
                          <input readonly type="text" name = "Txt_paciente_fin_vigencia" id="Txt_paciente_fin_vigencia" />    
                          <label id= "Label25">Estado Civil :</label>
                          <input readonly type="text" name = "Txt_paciente_estado_civil" id="Txt_paciente_estado_civil" />    
                          <label id= "Label18">Tipo plan de salud :</label>
                          <input readonly type="text" name = "Txt_paciente_tipo_plan_salud" id="Txt_paciente_tipo_plan_salud" />    
                          <label id= "Label22">N° de plan :</label>
                          <input readonly  type="text" name = "Txt_paciente_plan" id="Txt_paciente_plan" />    
                          <label id= "Label26">Estado :</label>
                          <input readonly  type="text" name = "Txt_paciente_estado" id="Txt_paciente_estado" />    
                    

                          </div>
                          <div class="datospacientesegunregistroafiliado">
                          <label style="grid-column:1/7;font-weight: bold;color:black"  id= "Label29">DATOS DEL PACIENTE SEGÚN REGISTRO DE AFILIADOS</label>

                          <label id= "Label32">N° Documento :</label>
                          <input readonly  type="text" name = "Text23" id="Text23" />
                          <label id= "Label31">Género :</label>
                          <input readonly type="text" name = "Text22" id="Text22" />    
                          <label id= "Label30">Fecha de nacimiento :</label> 
                          <input readonly type="text" name = "Text21" id="Text21" />    
                          <label id= "Label35">Apellidos y Nombres :</label>
                          <div style="grid-column:2/7;display:flex;">
                          <input readonly style="width:100%" type="text" name = "Text26" id="Text26" />    
                          <input readonly style="width:100%" type="text" name = "Text25" id="Text25" />    
                          <input readonly style="width:100%"  type="text" name = "Text24" id="Text24" />    
                          </div>
                          </div>
                          <div class="datostitular">
                          <label style="grid-column:1/7;font-weight: bold;color:black"  id= "Label29">DATOS DEL TITULAR</label>

                          <label  id= "Label44">Apellidos y Nombres :</label>
                          <input readonly style="grid-column:2/5;" type="text" name = "Txt_titular_ap_nombres" id="Txt_titular_ap_nombres" />
                          <label id= "Label34">Código Titular :</label>
                          <input readonly type="text" name = "Txt_titular_codigo" id="Txt_titular_codigo" />    
                          <label id= "Label43">Tipo de documento :</label> 
                          <input readonly type="text" name = "Txt_titular_tipo_documento" id="Txt_titular_tipo_documento" />    
                          <label id= "Label40">N° documento :</label>
                          <input readonly type="text" name = "Txt_titular_num_documento" id="Txt_titular_num_documento" />    
                          <label id= "Label38">Moneda :</label>
                          <input readonly type="text" name = "Txt_titular_moneda" id="Txt_titular_moneda" />    
                          <label id= "Label42">Nombre contratante :</label>
                          <input readonly  style="grid-column:2/5;" type="text" name = "Txt_titular_contratante" id="Txt_titular_contratante" />    
                          <label id= "Label37">Tipo documento Contratante :</label>
                          <input readonly type="text" name = "Txt_titular_tipo_doc_contratante" id="Txt_titular_tipo_doc_contratante" />    
                          <label id= "Label41">Tipo de afiliación :</label>
                          <input readonly type="text" name = "Txt_titular_tipo_afiliacion" id="Txt_titular_tipo_afiliacion" />    
                          <label id= "Label39">Fecha de afiliación :</label>
                          <input readonly type="text" name = "Txt_titular_fecha_afiliacion" id="Txt_titular_fecha_afiliacion" />    
                          <label id= "Label36">N° documento contratante :</label>
                          <input readonly type="text" name = "Txt_titular_num_doc_contratante" id="Txt_titular_num_doc_contratante" />    
                     
                          </div>
                          <div class="beneficios">
                          <table  border=1 style="width:100%;font-size:1.7vh;white-space:nowrap;" id="MSHGrid_Coberturasiteds" >
                          <thead   id = "MSHGrid_Coberturasitedshead">
                          <tr style="background-color:green;color:white">
                                  <th  style ="display:none" scope="col">CodigoTipoCobertura</th>
                                  <th  style ="display:none"scope="col">CodigoSubTipoCobertura</th>
                                  <th scope="col">Codigo</th>
                                  <th scope="col">Beneficios</th>
                                  <th  style ="display:none" scope="col">CodIndicadorRestriccion</th>
                                  <th scope="col">Restricciones</th>
                                  <th  style ="display:none" scope="col">CodCopagoFijo</th>
                                  <th scope="col">Copago Fijo</th>
                                  <th  style ="display:none" scope="col">CodCopagoVariable</th>
                                  <th scope="col">Copago Variable</th>
                                  <th  style ="display:none" scope="col">CodFechaFinCarencia</th>
                                  <th scope="col">Fin Carencia</th>
                                  <th scope="col">Condiciones Especiales</th>
                                  <th scope="col">Observaciones</th>
                                  <th  style ="display:none" scope="col">CodCalificacionServicio</th>
                                  <th scope="col">DesCalificacionServicio</th>
                                  <th  style ="display:none" scope="col">BeneficioMaximoInicial</th>
                                  <th style ="display:none" scope="col">NumeroCobertura</th>

                          </tr>
                          </thead>
                          <tbody  id="MSHGrid_Coberturasitedsbody">

                          </tbody>
                          <tfoot>
                          </tfoot>
                    </table> 
                          </div>
                          <div class="botonessiteds">
                          <input type="button"  class="btn btn btn-success btn-sm "  id="Cmd_autorizar_consulta" name="Cmd_autorizar_consulta"  onclick="Cmd_autorizar_consulta_Click();" value="Generar autorización de consulta"> 
                          <input type="button"  class="btn btn btn-primary btn-sm " onclick="Cmd_ver_documento_autorizacion_Click();" id="Cmd_ver_documento_autorizacion" name="Cmd_ver_documento_autorizacion" value="Ver Documento de autorizacion"> 
                          <a id='aCmd_ver_documento_autorizacion' style="display:none"       /></a>
                          <input type="button"  class="btn btn btn-primary btn-sm " onclick="Cmd_continuar_atencion_Click();" id="Cmd_continuar_atencion" name="Cmd_continuar_atencion" value="Continuar atención"> 
                          <input type="button"  class="btn btn btn-primary btn-sm "  id="Cmd_continuar_sin_siteds_drmas" name="Cmd_continuar_sin_siteds_drmas" value="Continuar atención SIN Siteds de Doctormas"> 
                          <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="Cmd_salir_siteds" name="Cmd_salir_siteds" value="Salir"> 

                          
                          </div>
                        </div> 
                </div>
                <label style="color:blue;" id= "Lbl_mensaje"></label>

               `);
                 var ed_modal_content = document.getElementById("ed-modal-content");
                 dragElement(ed_modal_content);
               
                 ed_modal_content.style.minWidth = "90vw";
                 document.getElementById("tabsiteds0").click(); 

                  var Adata_cliente ;
                 Adata_cliente = "SELECT trim(cod_gru) cod_cliente, trim(nom_gru) cliente FROM m_iafas iaf INNER JOIN m_grupos cli ON iaf.cod_cliente = cli.cod_gru WHERE iaf.activo = true AND activi_operaciones = true ORDER BY 2 ASC";
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
                  .then(function (data) {
                    var html = '',options ;
                    if (data.length>0) {
                       options = data.map(person => `<option value="${person.cod_cliente}">${person.cliente}</option>`).join("\n");
                    } 
                     document.getElementById('Dcbo_Aseguradora').innerHTML = options;
                     document.getElementById('Dcbo_Aseguradora').value = GStr_SITEDS_Cod_Cliente;
                     document.body.style.cursor = 'default' ;
            
                  }).catch(error => {
                    console.log(error);
                  });
                  var Adata_especialidad ; // solo nutricionista
                  Adata_especialidad = "SELECT distinct trim(c.cod_esp) cod_esp, trim(c.nom_esp) nom_esp FROM m_doctores as a, m_espcxdoctor as b, m_especialidades as c WHERE a.cod_doc = b.cod_doc AND b.cod_esp = c.cod_esp AND a.activi = true AND c.cod_esp in ('005', '006', '009')";
                  fetch('/modulo/Abre_Detalle/', {
                   method: 'POST',
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                     query: Adata_especialidad 
                   })
                 }).then(response => response.json())
                   .then(function (data) {
                     var html = '',options ;
                     if (data.length>0) {
                        options = data.map(person => `<option value="${person.cod_esp}">${person.nom_esp}</option>`).join("\n");
                     } 
                      document.getElementById('Dcbo_Especialidad').innerHTML = options;
                      document.getElementById('Dcbo_Especialidad').value = GStr_SITEDS_Cod_Especialidad;
                      document.body.style.cursor = 'default' ;

                      if (GStr_SITEDS_Cod_Cliente == "111") {
                        document.getElementById('Dcbo_Especialidad').visibility = 'visible';  
                        document.getElementById('Lbl_especialidad').visibility = 'visible';  
                       
                      }
             
                   }).catch(error => {
                     console.log(error);
                   });

                   var Adata_Doc_id ;
                   Adata_Doc_id = "SELECT * FROM mae_documento_identidad WHERE cod_doc_id_susalud is not null order by id_doc_id ASC";
                   fetch('/modulo/Abre_Detalle/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: Adata_Doc_id 
                    })
                  }).then(response => response.json())
                    .then(function (data) {
                      var html = '',options ;
                      if (data.length>0) {
                         options = data.map(person => `<option value="${person.id_doc_id}">${person.descripcion_doc_id}</option>`).join("\n");
                      } 
                       document.getElementById('DC_tipo_doc_idsiteds').innerHTML = options;
                       document.getElementById('DC_tipo_doc_idsiteds').value = GStr_SITEDS_Cod_doc_id;
                       document.body.style.cursor = 'default' ;
 
                     
              
                    }).catch(error => {
                      console.log(error);
                    });
                   document.getElementById('Txt_Apellido_paterno').value = GStr_SITEDS_Apellido_Paterno;
                   document.getElementById('Txt_Apellido_materno').value = GStr_SITEDS_Apellido_Materno;
                   document.getElementById('Txt_Nombressiteds').value = GStr_SITEDS_Nombres;

                   document.getElementById('Txt_documento_identidad').value = GStr_SITEDS_Numero_doc_id;

 
   }
   

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


// ----------------------------------------------Añadir un objeto de atributos a un elemento------------------------//
var addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr])
  }
};

// Crear elementos con atributos e hijo
var createCustomElement = (element, attributes, children) => {
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

  elementsArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
      removeModal();
    });
  });

}

var a_ConsultaAfiliado;
var a_DatosAfiliado ;
var a_Coberturas ;
 
async function  buscar_asegurado(ptipo_busqueda){
    
  var str_error;
  var str_metodo;
  var str_request  ;                //solicitud en formato json para enviar al WS
  var str_response ;               //resultado en formato json que retorna del WS
  //var aux(0) ; temp
  //var rst_aux As New ADODB.Recordset temp
  var cod_financiador_siteds ;
  var cod_esp_siteds ;
  var cod_doc_id_siteds ;
  var Ruc_ipress;
  var cod_ipress ;
  
/*     MSHGrid_Asegurado.Clear
  MSHGrid_Asegurado.rows = 2
  MSHGrid_Asegurado.Cols = 2 */
  document.getElementById('MSHGrid_Aseguradobody').innerHTML ='';
  

  document.getElementById('Lbl_mensaje').innerHTML ='Buscando paciente, por favor espere';

     
      
  //construye el array con los datos solicitados
  //MSHGrid_Asegurado.Enabled = false;
   document.getElementById('Cmd_Datos_asegurado').disabled = true;
   document.getElementById('Cmd_autorizar_consulta').disabled = true;
   document.getElementById('Cmd_continuar_sin_siteds_drmas').disabled = true;
 
  
    a_ConsultaAfiliado = [];
  
  //a_ConsultaAfiliado(0)        cod tipo documento
  //a_ConsultaAfiliado(1)        numero de documento
  //a_ConsultaAfiliado(2)        ruc drmas
  //a_ConsultaAfiliado(3)        codigo susalud Drmas
  //a_ConsultaAfiliado(4)        codigo aseg
  //a_ConsultaAfiliado(5)        nombre afil
  //a_ConsultaAfiliado(6)        apellido pat afil
  //a_ConsultaAfiliado(7)        apellido mat afil
  //a_ConsultaAfiliado(8)        cod especialidad solo para Feban

//configura los códigos de SM a los codigos de SUSALUD


  //codigo de financiador
  cod_financiador_siteds = "";
   
  var rst_aux ;
  rst_aux = "SELECT cod_financ FROM m_iafas WHERE cod_cliente = '" + document.getElementById('Dcbo_Aseguradora').value + "'";
  await fetch('/modulo/Abre_Detalle/', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     query: rst_aux 
   })
 }).then(response => response.json())
   .then(function (data) {
     var html = '',options ;
     if (data.length>0) {
      cod_financiador_siteds = data[0].cod_financ;

     }  
      document.body.style.cursor = 'default' ;

    

   }).catch(error => {
     console.log(error);
   });
   
  //codigo de especialidad
  cod_esp_siteds = "";
  
  rst_aux = "SELECT trim(especialidad_siteds) especialidad_siteds FROM m_especialidades where cod_esp = '" + document.getElementById('Dcbo_Especialidad').value +"'";
  await  fetch('/modulo/Abre_Detalle/', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     query: rst_aux 
   })
 }).then(response => response.json())
   .then(function (data) {
     var html = '',options ;
     
       if (document.getElementById('Dcbo_Especialidad').visibility == 'visible') {
          if (data.length>0) {
            cod_esp_siteds = data[0].especialidad_siteds;
          }
      }
      if (document.getElementById('DC_tipo_doc_id').value == "") {
          cod_doc_id_siteds = "1";
          document.getElementById('DC_tipo_doc_id').value = 2;
      }
   
      document.body.style.cursor = 'default' ;
 
   }).catch(error => {
     console.log(error);
   });

  //codigo de documento de identidad
   
  rst_aux = "SELECT cod_doc_id_susalud FROM mae_documento_identidad WHERE id_doc_id = "   +  document.getElementById('DC_tipo_doc_id').value;
  await  fetch('/modulo/Abre_Detalle/', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     query: rst_aux 
   })
 }).then(response => response.json())
   .then(function (data) {
     var html = '',options ; 
       cod_doc_id_siteds = data[0].cod_doc_id_susalud;   
   
      document.body.style.cursor = 'default' ;
 
   }).catch(error => {
     console.log(error);
   });
  Ruc_ipress = "20251011461";
  cod_ipress = "00023920";
  
 
  switch(ptipo_busqueda){
  
      case "PACIENTE":
          a_ConsultaAfiliado[0] = cod_doc_id_siteds;
          a_ConsultaAfiliado[1] = "";
          a_ConsultaAfiliado[2] = Ruc_ipress;
          a_ConsultaAfiliado[3] = cod_ipress;
          a_ConsultaAfiliado[4] = cod_financiador_siteds;
          a_ConsultaAfiliado[5] = document.getElementById('Txt_Nombressiteds').value ;
          a_ConsultaAfiliado[6] = document.getElementById('Txt_Apellido_paterno').value; 
          a_ConsultaAfiliado[7] = document.getElementById('Txt_Apellido_materno').value;
          a_ConsultaAfiliado[8] = cod_esp_siteds;
      break;
      case "DNI":
          
          a_ConsultaAfiliado[0] = cod_doc_id_siteds
          a_ConsultaAfiliado[1] = document.getElementById('Txt_documento_identidad').value  ;
          a_ConsultaAfiliado[2] = Ruc_ipress;
          a_ConsultaAfiliado[3] = cod_ipress;
          a_ConsultaAfiliado[4] = cod_financiador_siteds;
          a_ConsultaAfiliado[5] = "";
          a_ConsultaAfiliado[6] = "";
          a_ConsultaAfiliado[7] = "";
          a_ConsultaAfiliado[8] = cod_esp_siteds;
      break;
  }

  str_metodo = "ConsultaAsegNom";
  
  str_request = FN_WS_CONSULTA_METODO_JSON(str_metodo,a_ConsultaAfiliado);

  //Debug.Print str_request temp
  
 /*  If str_error = "" Then
      str_response = FN_WS_CONSULTA_METODO_JSON(str_metodo, str_request, str_error)
      Debug.Print str_response
      If str_error = "" Then
          Call SUB_OBTENER_RESPONSE_DATA_CONSULTAR_ASEG(str_response, ad_Afiliados(), str_error)
      End If
  End If
  
  If str_error <> "" Then
      MsgBox "No se encontro afiliados que coincida con la busqueda, motivo: " & str_error
  Else
      Call Array_a_FlexGrid(ad_Afiliados(), MSHGrid_Asegurado)
      Call Formato_FlexGrid(MSHGrid_Asegurado)
      MSHGrid_Asegurado.Enabled = True
      Cmd_Datos_asegurado.Enabled = True
      Lbl_mensaje.ForeColor = &HFF0000
      Lbl_mensaje.Caption = "Realizado."
      Lbl_mensaje.Refresh
  End If */
      
}


function  FN_WS_CONSULTA_METODO_JSON(ws_metodo ,a_ConsultaAfiliado){
  
  document.body.style.cursor = 'progress' ;

  let headers = new Headers({
    "Accept"       : "application/json",
    "Content-Type" : "application/json",
    //"User-Agent"   : "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"
    });
  switch  ( ws_metodo){
    case 'ConsultaAsegNom':
    fetch("/nutricion/FN_WS_CONSULTA_METODO_JSON/" + ws_metodo, {
      headers:headers ,
      method: 'POST' ,
       body: JSON.stringify({
        CodTipoDocumentoAfiliado: a_ConsultaAfiliado[0] ,
        NumeroDocumentoAfiliado: a_ConsultaAfiliado[1],
        RUC:   a_ConsultaAfiliado[2],
        SUNASA:a_ConsultaAfiliado[3] ,
        IAFAS: a_ConsultaAfiliado[4] ,
        NombresAfiliado: a_ConsultaAfiliado[5]   ,
        ApellidoPaternoAfiliado:a_ConsultaAfiliado[6]  ,
        ApellidoMaternoAfiliado: a_ConsultaAfiliado[7]  ,
        CodEspecialidad:  a_ConsultaAfiliado[8] 

      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '',options ;
        if (data.length>0) {
          
          for (let i =0; i < data.length; i++) {


            html += '<tr '   + `" onclick="filaSelected(this);">` +
              '<td style="display:none">' + data[i].CodProducto + '</td>' +
              '<td>' + data[i].DesProducto + '</td>' +
              '<td>' + data[i].ApellidoPaternoAfiliado + '</td>' +
              '<td>' + data[i].ApellidoMaternoAfiliado + '</td>'+
              '<td>' + data[i].NombresAfiliado + '</td>' +
              '<td style="display:none">' + data[i].CodParentesco + '</td>'+
              '<td>' + data[i].DesParentesco + '</td>'+
              '<td>' + data[i].NombreContratante + '</td>'+
              '<td style="display:none">' + data[i].CodEstado + '</td>'+
              '<td>' + data[i].DesEstado + '</td>'+
              '<td>' + data[i].CodigoAfiliado + '</td>'+
              '<td>' + data[i].FechaNacimiento + '</td>'+
              '<td style="display:none">' + data[i].CodGenero + '</td>'+
              '<td  >' + data[i].DesGenero + '</td>'+
              '<td style="display:none">' + data[i].CodTipoDocumentoAfiliado + '</td>'+
              '<td  >' + data[i].DesTipoDocumentoAfiliado + '</td>'+
              '<td >' + data[i].NumeroDocumentoAfiliado + '</td>'+
              '<td >' + data[i].NumeroPlan + '</td>'+
              '<td  >' + data[i].NumeroContratoAfiliado + '</td>'+
              '<td >' + data[i].NumeroDocumentoContratante + '</td>'+
              '<td>' + data[i].TipoCalificadorContratante + '</td>'+
              '<td style="display:none">' + data[i].CodTipoDocumentoContratante + '</td>'+
              '<td  >' + data[i].DesTipoDocumentoContratante + '</td>'+


    
            '</tr>'; 
          } 
          document.getElementById('MSHGrid_Aseguradobody').innerHTML = html;
          document.getElementById('Cmd_Datos_asegurado').disabled = false;;
          document.body.style.cursor = 'default' ;
          document.getElementById('Lbl_mensaje').innerHTML= "Realizado.";

        }else{
          document.body.style.cursor = 'default' ;
          document.getElementById('Lbl_mensaje').innerHTML= "No se encontro afiliados que coincida con la busqueda.";
          
        }
        
       }).catch(error => {
        console.log(error);
      });
   
  break;
 default:
   break;
  }
 

}




function cmd_buscar_x_doc_id_Click(){
buscar_asegurado ("DNI");
}

function cmd_buscar_x_pac_Click(){
buscar_asegurado ("PACIENTE");
}

function Cmd_Datos_asegurado_Click( ){
  
     Sub_SELECCIONAR_ASEGURADO();
}

function Sub_SELECCIONAR_ASEGURADO(){
  var table = document.getElementById("MSHGrid_Aseguradobody");
  var fila;
  for (var i = 0, row; row = table.rows[i]; i++) {
     if(row.style.backgroundColor == "turquoise"){
        fila = row;
     }

  }
  var  str_request      ;              //solicitud en formato json para enviar al WS
  var str_response      ;            //resultado en formato json que retorna del WS
  var str_metodo ;
  var str_error ;
   var i ;
  
  if (fila.cells[8].innerHTML.trim() == "1") {
       document.getElementById('Lbl_mensaje').innerHTML= "Consultando datos adicionales de paciente, espere por favor...";
 
      Sub_limpiar_datos_adicionales();
       
      str_metodo = "ConsultaAsegCod";
      let headers = new Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        //"User-Agent"   : "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"
        });
 
      fetch("/nutricion/FN_WS_CONSULTA_METODO_JSON/" + str_metodo, {
        headers:headers ,
        method: 'POST' ,
         body: JSON.stringify({
          SUNASA:  a_ConsultaAfiliado[3] ,
          IAFAS: a_ConsultaAfiliado[4],
          RUC:   a_ConsultaAfiliado[2],
          NombresAfiliado:fila.cells[4].innerHTML.trim() ,
          ApellidoPaternoAfiliado: fila.cells[2].innerHTML.trim(),
          ApellidoMaternoAfiliado:  fila.cells[3].innerHTML.trim(),
          CodigoAfiliado: fila.cells[10].innerHTML.trim(),
          CodTipoDocumentoAfiliado:  fila.cells[14].innerHTML.trim(),
          NumeroDocumentoAfiliado:   fila.cells[16].innerHTML.trim(),
          CodProducto:   fila.cells[0].innerHTML.trim(),
          DesProducto:   fila.cells[1].innerHTML.trim(),
          NumeroPlan:    fila.cells[17].innerHTML.trim(),
          CodTipoDocumentoContratante:    fila.cells[21].innerHTML.trim(),
          NumeroDocumentoContratante:   fila.cells[19].innerHTML.trim(),
          NombreContratante:    fila.cells[7].innerHTML.trim(),
          CodParentesco:    fila.cells[5].innerHTML.trim(),
          TipoCalificadorContratante:   fila.cells[20].innerHTML.trim(),
          CodEspecialidad:  a_ConsultaAfiliado[8]
   

        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '',options ; 
          if (Object.keys(data).length>0) {
           
            a_Coberturas =   data.Coberturas;
            a_DatosAfiliado = data.DatosAfiliado;
            document.getElementById('Txt_poliza').value = a_DatosAfiliado.NumeroContrato;  //Contrato
            document.getElementById('Txt_poliza').dataset.tag = a_DatosAfiliado.NumeroPoliza;
            document.getElementById('Txt_producto').value = a_DatosAfiliado.CodProducto;   //codigo prod
            document.getElementById('Txt_producto').dataset.tag = a_DatosAfiliado.DesProducto;
            document.getElementById('Txt_codigo_asegurado').value = a_DatosAfiliado.CodigoAfiliado;   
            document.getElementById('Txt_certificado').value = a_DatosAfiliado.NumeroCertificado; 
   
            
            
            document.getElementById('Txt_paciente_ap_nombres').value = a_DatosAfiliado.ApellidoPaternoAfiliado + " " + a_DatosAfiliado.ApellidoMaternoAfiliado  + " " + a_DatosAfiliado.NombresAfiliado;
            document.getElementById('Txt_paciente_genero').dataset.tag = a_DatosAfiliado.CodGenero ;                    //cod_genero
            document.getElementById('Txt_paciente_genero').value = a_DatosAfiliado.DesGenero;
            document.getElementById('Txt_paciente_fec_nacimiento').value = a_DatosAfiliado.FechaNacimiento;  
            document.getElementById('Txt_paciente_tipo_documento').dataset.tag = a_DatosAfiliado.CodTipoDocumentoAfiliado;       //CodTipoDocumentoAfiliado
            document.getElementById('Txt_paciente_tipo_documento').value = a_DatosAfiliado.DesTipoDocumentoAfiliado; 
            document.getElementById('Txt_paciente_num_documento').value = a_DatosAfiliado.NumeroDocumentoAfiliado;  
            document.getElementById('Txt_paciente_ini_vigencia').value = a_DatosAfiliado.FechaInicioVigencia;  
            document.getElementById('Txt_paciente_fin_vigencia').value = a_DatosAfiliado.FechaFinVigencia;  
            document.getElementById('Txt_paciente_tipo_plan_salud').dataset.tag = a_DatosAfiliado.CodTipoPlan;          //cod_tipo_plan
            document.getElementById('Txt_paciente_tipo_plan_salud').value = a_DatosAfiliado.DesTipoPlan;  
            document.getElementById('Txt_paciente_plan').value = a_DatosAfiliado.NumeroPlan;  
            
            document.getElementById('Txt_paciente_parentesco').dataset.tag = a_DatosAfiliado.CodParentesco;              //CodParentesco
            document.getElementById('Txt_paciente_parentesco').value = a_DatosAfiliado.DesParentesco;  
            document.getElementById('Txt_paciente_edad').value = a_DatosAfiliado.Edad;    
            document.getElementById('Txt_paciente_estado_civil').dataset.tag = a_DatosAfiliado.CodEstadoCivil;             //CodEstadoCivil
            document.getElementById('Txt_paciente_estado_civil').value = a_DatosAfiliado.DesEstadoCivil; 
            document.getElementById('Txt_paciente_estado').dataset.tag = a_DatosAfiliado.CodEstado;                //CodEstado
            document.getElementById('Txt_paciente_estado').value = a_DatosAfiliado.DesEstado;  
            
            document.getElementById('Txt_titular_ap_nombres').value = a_DatosAfiliado.ApellidoPaternoTitular  +  " " + a_DatosAfiliado.ApellidoMaternoTitular  +  " " + a_DatosAfiliado.NombresTitular;
            document.getElementById('Txt_titular_tipo_documento').dataset.tag = a_DatosAfiliado.CodTipoDocumentoTitular;           //CodTipoDocumentoTitular
            document.getElementById('Txt_titular_tipo_documento').value = a_DatosAfiliado.DesTipoDocumentoTitular;  
            document.getElementById('Txt_titular_num_documento').value = a_DatosAfiliado.NumeroDocumentoTitular;  
            document.getElementById('Txt_titular_contratante').value = a_DatosAfiliado.NombreContratante; 
            document.getElementById('Txt_titular_tipo_afiliacion').dataset.tag = a_DatosAfiliado.CodTipoAfiliacion; 
            document.getElementById('Txt_titular_tipo_afiliacion').value = a_DatosAfiliado.DesTipoAfiliacion; 
            document.getElementById('Txt_titular_fecha_afiliacion').value = a_DatosAfiliado.FechaAfiliacion;  
            
            document.getElementById('Txt_titular_codigo').value = a_DatosAfiliado.CodigoTitular; 
            document.getElementById('Txt_titular_moneda').dataset.tag = a_DatosAfiliado.CodMoneda;                      //cod_moneda
            document.getElementById('Txt_titular_moneda').value = a_DatosAfiliado.DesMoneda; 
            document.getElementById('Txt_titular_tipo_doc_contratante').dataset.tag = a_DatosAfiliado.CodTipoDocumentoContratante;       //CodTipoDocumentoContratante
            document.getElementById('Txt_titular_tipo_doc_contratante').value = a_DatosAfiliado.DesTipoDocumentoContratante; 
            document.getElementById('Txt_titular_num_doc_contratante').value = a_DatosAfiliado.NumeroDocumentoContratante; 
            
             for (let i =0; i < a_Coberturas.length; i++) {
   
              html += '<tr id="' + i  + `" onclick="filaSelected(this);">` +
                '<td style="display:none">' + a_Coberturas[i].CodigoTipoCobertura + '</td>' +
                '<td style="display:none">' + a_Coberturas[i].CodigoSubTipoCobertura + '</td>' +
                '<td>' + a_Coberturas[i].CodigoCobertura + '</td>' +
                '<td>' + a_Coberturas[i].Beneficios + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodIndicadorRestriccion + '</td>' +
                '<td>' + a_Coberturas[i].Restricciones + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodCopagoFijo + '</td>'+
                '<td >' + a_Coberturas[i].DesCopagoFijo + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodCopagoVariable + '</td>'+
                '<td>' + a_Coberturas[i].DesCopagoVariable + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodFechaFinCarencia + '</td>'+
                '<td>' + a_Coberturas[i].FechaFinCarencia + '</td>'+
                '<td>' + a_Coberturas[i].CondicionesEspeciales + '</td>'+
                '<td>' + a_Coberturas[i].Observaciones + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].CodCalificacionServicio + '</td>'+
                '<td  >' + a_Coberturas[i].DesCalificacionServicio + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].BeneficioMaximoInicial + '</td>'+
                '<td style="display:none">' + a_Coberturas[i].NumeroCobertura + '</td>'+ 
  
  
      
              '</tr>'; 
            }  
   
            document.body.style.cursor = 'default' ;
            document.getElementById("tabsiteds1").click();
            document.getElementById('MSHGrid_Coberturasitedsbody').innerHTML = html;
            document.getElementById("Cmd_autorizar_consulta").disabled = false;;
            document.getElementById("Cmd_continuar_sin_siteds_drmas").disabled = false;;
             document.getElementById('Lbl_mensaje').innerHTML= "Realizado.";
          }else{
            document.body.style.cursor = 'default' ;
            document.getElementById('Lbl_mensaje').innerHTML= "No se encontro afiliados que coincida con la busqueda.";
          }
          
         }).catch(error => {
          console.log(error);
        });
       
  }else{
       document.getElementById('Lbl_mensaje').innerHTML= "El paciente esta inactivo";

   }



}



function Sub_limpiar_datos_adicionales(){
    
    //informacion general
    document.getElementById('Txt_Cod_autorizacion').value = "";
    document.getElementById('Txt_Poliza').value = "";
    document.getElementById('Txt_producto').value = "";
    document.getElementById('Txt_codigo_asegurado').value = "";
    document.getElementById('Txt_certificado').value = "";
 
    //datos del paciente
 
    document.getElementById('Txt_paciente_ap_nombres').value = "";
    document.getElementById('Txt_paciente_genero').value = "";
    document.getElementById('Txt_paciente_tipo_documento').value = "";
    document.getElementById('Txt_paciente_ini_vigencia').value = "";
    document.getElementById('Txt_paciente_tipo_plan_salud').value = "";
    document.getElementById('Txt_paciente_fec_nacimiento').value = "";
    document.getElementById('Txt_paciente_num_documento').value = "";
    document.getElementById('Txt_paciente_fin_vigencia').value = "";
    document.getElementById('Txt_paciente_plan').value = "";
    document.getElementById('Txt_paciente_parentesco').value = "";
    document.getElementById('Txt_paciente_edad').value = "";
    document.getElementById('Txt_paciente_estado_civil').value = "";
    document.getElementById('Txt_paciente_estado').value = "";

    //DATOS DEL PACIENTE SEGÚN REGISTRO DE AFILIADOS

    document.getElementById('Text23').value = "";
    document.getElementById('Text26').value = "";
    document.getElementById('Text22').value = "";
    document.getElementById('Text25').value = "";
    document.getElementById('Text21').value = "";
    document.getElementById('Text24').value = "";

    
   //DATOS DEL TITULAR
  
    document.getElementById('Txt_titular_ap_nombres').value = "";
    document.getElementById('Txt_titular_tipo_documento').value = "";
    document.getElementById('Txt_titular_contratante').value = "";
    document.getElementById('Txt_titular_tipo_afiliacion').value = "";
    document.getElementById('Txt_titular_num_documento').value = "";
    document.getElementById('Txt_titular_fecha_afiliacion').value = "";
    document.getElementById('Txt_titular_codigo').value = "";
    document.getElementById('Txt_titular_moneda').value = "";
    document.getElementById('Txt_titular_tipo_doc_contratante').value = "";
    document.getElementById('Txt_titular_num_doc_contratante').value = "";

    document.getElementById('MSHGrid_Coberturasitedsbody').innerHTML = "";
 
    

    document.getElementById('Cmd_continuar_atencion').disabled = true;
    document.getElementById('Cmd_ver_documento_autorizacion').disabled = true;
    document.getElementById('Cmd_autorizar_consulta').disabled = true;
    document.getElementById('Cmd_continuar_sin_siteds_drmas').disabled = true;

   

}

function  Cmd_autorizar_consulta_Click(){
    GStr_Cod_Autorizacion = "";
    GStr_Documento_Autorizacion = '';
     Sub_GENERAR_CODIGO_AUTORIZACION();

}

function  Sub_GENERAR_CODIGO_AUTORIZACION(){

    
    var str_error ;
    //Dim aux(0) As String
    var str_request    ;                //solicitud en formato json para enviar al WS
    var str_response   ;              //resultado en formato json que retorna del WS
    var str_metodo ;
    var i ;
     
    document.getElementById('Lbl_mensaje').innerHTML= "Generando codigo de autorización, por favor espere...";
    document.getElementById('Cmd_autorizar_consulta').disabled = true;
    document.getElementById('Cmd_continuar_sin_siteds_drmas').disabled = true;
    document.getElementById('Cmd_ver_documento_autorizacion').disabled = true;
    document.getElementById('Cmd_continuar_atencion').disabled = true;
 
    

    str_metodo = "ConsultaNumeroAutorizacion";
    var tableMSHGrid_Coberturasiteds = document.getElementById("MSHGrid_Coberturasitedsbody");
    var filatableMSHGrid_Coberturasitedsbody;
    for (var i = 0, row; row = tableMSHGrid_Coberturasiteds.rows[i]; i++) {
       if(row.style.backgroundColor == "turquoise"){
        filatableMSHGrid_Coberturasitedsbody = row;
       }
  
    }
   
    document.body.style.cursor = 'progress' ;

    let headers = new Headers({
      "Accept"       : "application/json",
      "Content-Type" : "application/json",
      //"User-Agent"   : "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"
      });
      document.getElementById('Lbl_mensaje').innerHTML= "Guardando datos" ;

    fetch("/nutricion/FN_WS_CONSULTA_METODO_JSON/" + str_metodo, {
      headers:headers ,
      method: 'POST' ,
       body: JSON.stringify({
        ApellidoMaternoAfiliado: a_DatosAfiliado.ApellidoMaternoAfiliado ,
        ApellidoPaternoAfiliado: a_DatosAfiliado.ApellidoPaternoAfiliado  ,
        BeneficioMaximoInicial: filatableMSHGrid_Coberturasitedsbody.cells[16].innerHTML.trim(),   
        CodigoAfiliado: a_DatosAfiliado.CodigoAfiliado  ,
        CodigoTitular: a_DatosAfiliado.CodigoTitular   ,
        CodCalificacionServicio: filatableMSHGrid_Coberturasitedsbody.cells[14].innerHTML.trim(),   
        CodEstado: a_DatosAfiliado.CodEstado  ,
        CodEspecialidad: a_ConsultaAfiliado[8]  ,
        CodMoneda: a_DatosAfiliado.CodMoneda   ,
        CodCopagoFijo:  filatableMSHGrid_Coberturasitedsbody.cells[6].innerHTML.trim(),
        CodCopagoVariable :  filatableMSHGrid_Coberturasitedsbody.cells[8].innerHTML.trim(), 
        CodParentesco:  a_DatosAfiliado.CodParentesco   ,
        CodProducto:   a_DatosAfiliado.CodProducto   ,
        NumeroDocumentoContratante: a_DatosAfiliado.NumeroDocumentoContratante   ,
        CodSubTipoCobertura:  filatableMSHGrid_Coberturasitedsbody.cells[1].innerHTML.trim(),
        CodTipoCobertura:   filatableMSHGrid_Coberturasitedsbody.cells[0].innerHTML.trim(),
        CodTipoAfiliacion:  a_DatosAfiliado.CodTipoAfiliacion  ,
        DesProducto: a_DatosAfiliado.DesProducto   ,
        CodEstadoMarital:  a_DatosAfiliado.CodEstadoCivil   ,
        CodFechaFinCarencia:  filatableMSHGrid_Coberturasitedsbody.cells[10].innerHTML.trim(),
        CodFechaAfiliacion: a_DatosAfiliado.CodFechaAfiliacion   ,
        CodFechaInicioVigencia: a_DatosAfiliado.CodFechaInicioVigencia  ,
        CodFechaNacimiento: a_DatosAfiliado.CodFechaNacimiento   ,
        CodGenero: a_DatosAfiliado.CodGenero   ,
        SUNASA:  a_ConsultaAfiliado[3],
        IAFAS: a_ConsultaAfiliado[4],
        CondicionesEspeciales:  filatableMSHGrid_Coberturasitedsbody.cells[12].innerHTML.trim(),
        ApellidoMaternoTitular: a_DatosAfiliado.ApellidoMaternoTitular  ,
        NombreContratante: a_DatosAfiliado.NombreContratante  ,
        ApellidoPaternoTitular: a_DatosAfiliado.ApellidoPaternoTitular  ,
        NombresAfiliado:  a_DatosAfiliado.NombresAfiliado  ,
        NombresTitular: a_DatosAfiliado.NombresTitular  ,
        NumeroCertificado:a_DatosAfiliado.NumeroCertificado   ,
        NumeroContrato: a_DatosAfiliado.NumeroContrato   ,
        NumeroDocumentoAfiliado:a_DatosAfiliado.NumeroDocumentoAfiliado   ,
        NumeroDocumentoTitular: a_DatosAfiliado.NumeroDocumentoTitular ,
        NumeroPlan: a_DatosAfiliado.NumeroPlan ,
        NumeroPoliza: a_DatosAfiliado.NumeroPoliza  ,
        RUC: a_ConsultaAfiliado[2],
        CodTipoDocumentoContratante: a_DatosAfiliado.CodTipoDocumentoContratante  ,
        CodTipoDocumentoAfiliado: a_DatosAfiliado.CodTipoDocumentoAfiliado  ,
        CodTipoDocumentoTitular: a_DatosAfiliado.CodTipoDocumentoTitular  ,
        CodTipoPlan: a_DatosAfiliado.CodTipoPlan  ,
        CodIndicadorRestriccion: filatableMSHGrid_Coberturasitedsbody.cells[4].innerHTML.trim()

 

      })
    }).then(response => response.json())
      .then(function (data) {
        var html = '',options ;
        

        if (Object.keys(data).length>0) { 
            
          document.body.style.cursor = 'default' ;
         
           
        document.getElementById('Lbl_mensaje').innerHTML= "Codigo de autorización generado satisfactoriamente";
        document.getElementById('Txt_Cod_autorizacion').value = data.NumeroAutorizacion;
        GStr_Cod_Autorizacion = data.NumeroAutorizacion;
        GStr_Documento_Autorizacion = data.Documento;
         
       Sub_REGISTRAR_DATOS_AFILIADO(  a_DatosAfiliado, filatableMSHGrid_Coberturasitedsbody  ,   data);
          
        document.getElementById('Cmd_ver_documento_autorizacion').disabled = false;;
        document.getElementById('Cmd_continuar_atencion').disabled = false;;
          
        }else{
          document.body.style.cursor = 'default' ;
          document.getElementById('Lbl_mensaje').innerHTML= "No se encontro afiliados que coincida con la busqueda.";
        }
        
       }).catch(error => {

        console.log(error);
      });
 
    
     
    
}



async function  Sub_REGISTRAR_DATOS_AFILIADO(  a_DatosAfiliado, Coberturas    ,   CodigoAutorizacion){
 
var str_1 ;
var str_2 ;


str_1 = "INSERT INTO h_SITEDS_documento_autorizacion (CodigoAutorizacion, CodigoAfiliado, NumeroPoliza, NumeroContrato," 
               + "NumeroCertificado, CodProducto, DesProducto, ApellidoPaternoAfiliado, ApellidoMaternoAfiliado, NombresAfiliado," 
               + "CodGenero, DesGenero, CodFechaNacimiento, FechaNacimiento, CodParentesco, DesParentesco," 
               + "CodTipoDocumentoAfiliado, DesTipoDocumentoAfiliado, NumeroDocumentoAfiliado, Edad," 
               + "CodFechaInicioVigencia, FechaInicioVigencia, CodFechaFinVigencia, FechaFinVigencia," 
               + "CodEstadoCivil, DesEstadoCivil, CodTipoPlan, DesTipoPlan, NumeroPlan, CodEstado, DesEstado," 
               + "CodFechaActualizacionFoto, FechaActualizacionFoto, ApellidoPaternoTitular, ApellidoMaternoTitular, NombresTitular," 
               + "CodigoTitular, CodTipoDocumentoTitular, DesTipoDocumentoTitular, NumeroDocumentoTitular, " 
               + "CodMoneda, DesMoneda, NombreContratante, CodTipoDocumentoContratante, DesTipoDocumentoContratante," 
               + "CodTipoAfiliacion, DesTipoAfiliacion, CodFechaAfiliacion,FechaAfiliacion, NumeroDocumentoContratante," 
               + "CodigoTipoCobertura, CodigoSubTipoCobertura, CodigoCobertura, Beneficios, CodIndicadorRestriccion," 
               + "Restricciones, CodCopagoFijo, DesCopagoFijo, CodCopagoVariable, DesCopagoVariable," 
               + "CodFechaFinCarencia, FechaFinCarencia, CodCalificacionServicio, DesCalificacionServicio, BeneficioMaximoInicial, NumeroCobertura, fecha_creacion_doc_aut, hora_creacion_doc_aut) "
                        
                       
str_2 = "VALUES ( '" + CodigoAutorizacion.NumeroAutorizacion + "', '" + a_DatosAfiliado.CodigoAfiliado + "', '" + a_DatosAfiliado.NumeroPoliza + "', '" + a_DatosAfiliado.NumeroContrato + "', '" + a_DatosAfiliado.NumeroCertificado + "', " 
               + "'" + a_DatosAfiliado.CodProducto + "', '" + a_DatosAfiliado.DesProducto + "', '" + a_DatosAfiliado.ApellidoPaternoAfiliado + "', '" + a_DatosAfiliado.ApellidoMaternoAfiliado + "', " 
               + "'" + a_DatosAfiliado.NombresAfiliado + "', '" + a_DatosAfiliado.CodGenero + "', '" + a_DatosAfiliado.DesGenero + "', '" + a_DatosAfiliado.CodFechaNacimiento + "', " 
               + "'" + a_DatosAfiliado.FechaNacimiento + "', '" + a_DatosAfiliado.CodParentesco + "', '" + a_DatosAfiliado.DesParentesco + "', '" + a_DatosAfiliado.CodTipoDocumentoAfiliado + "', " 
               + "'" + a_DatosAfiliado.DesTipoDocumentoAfiliado + "', '" + a_DatosAfiliado.NumeroDocumentoAfiliado + "', '" + a_DatosAfiliado.Edad + "', '" + a_DatosAfiliado.CodFechaInicioVigencia + "', " 
               + "'" + a_DatosAfiliado.FechaInicioVigencia + "', '" + a_DatosAfiliado.CodFechaFinVigencia + "', '" + a_DatosAfiliado.FechaFinVigencia + "', '" + a_DatosAfiliado.CodEstadoCivil + "', " 
               + "'" + a_DatosAfiliado.DesEstadoCivil + "', '" + a_DatosAfiliado.CodTipoPlan+ "', '" + a_DatosAfiliado.DesTipoPlan + "', '" + a_DatosAfiliado.NumeroPlan + "', " 
               + "'" + a_DatosAfiliado.CodEstado + "', '" + a_DatosAfiliado.DesEstado + "', '" + a_DatosAfiliado.CodFechaActualizacionFoto + "', '" + a_DatosAfiliado.FechaActualizacionFoto + "', " 
               + "'" + a_DatosAfiliado.ApellidoPaternoTitular + "', '" + a_DatosAfiliado.ApellidoMaternoTitular + "', '" + a_DatosAfiliado.NombresTitular+ "', '" + a_DatosAfiliado.CodigoTitular+ "', " 
               + "'" + a_DatosAfiliado.CodTipoDocumentoTitular + "', '" + a_DatosAfiliado.DesTipoDocumentoTitular + "', '" + a_DatosAfiliado.NumeroDocumentoTitular + "', '" + a_DatosAfiliado.CodMoneda + "', " 
               + "'" + a_DatosAfiliado.DesMoneda + "', '" + a_DatosAfiliado.NombreContratante + "', '" + a_DatosAfiliado.CodTipoDocumentoContratante + "', '" + a_DatosAfiliado.DesTipoDocumentoContratante + "', " 
               + "'" + a_DatosAfiliado.CodTipoAfiliacion + "', '" + a_DatosAfiliado.DesTipoAfiliacion + "', '" + a_DatosAfiliado.CodFechaAfiliacion+ "', '" + a_DatosAfiliado.FechaAfiliacion + "', '" + a_DatosAfiliado.NumeroDocumentoContratante + "', " 
               + "'" + Coberturas.cells[0].innerHTML + "', '" + Coberturas.cells[1].innerHTML + "', '" + Coberturas.cells[2].innerHTML + "', '" + Coberturas.cells[3].innerHTML + "', '" + Coberturas.cells[4].innerHTML + "', " 
               + "'" + Coberturas.cells[5].innerHTML + "', " + Coberturas.cells[6].innerHTML+ ", '" + Coberturas.cells[7].innerHTML + "', " + Coberturas.cells[8].innerHTML + ", '" + Coberturas.cells[9].innerHTML + "', " 
               + "'" + Coberturas.cells[10].innerHTML + "', '" + Coberturas.cells[11].innerHTML + "', '" + Coberturas.cells[14].innerHTML + "', " 
               + "'" + Coberturas.cells[15].innerHTML + "', '" + Coberturas.cells[16].innerHTML + "', '" + Coberturas.cells[17].innerHTML + "', current_date, current_time(0)::TIME WITHOUT TIME ZONE)"
               
   
   await fetch('/modulo/Execute/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: str_1 + str_2

    })
  }).then(response => response.json())
    .then(function (data) {
      

    }).catch(error => {
      console.log(error);
    });
    await fetch('/modulo/Execute/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "UPDATE h_SITEDS_documento_autorizacion SET Documentoautorizacion = '" + CodigoAutorizacion.Documento+ "' WHERE CodigoAutorizacion = '" + CodigoAutorizacion.NumeroAutorizacion+ "'"
  
      })
    }).then(response => response.json())
      .then(function (data) {
        
  
      }).catch(error => {
        console.log(error);
      });
      await fetch('/modulo/Execute/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "UPDATE h_SITEDS_documento_autorizacion SET CondicionesEspeciales = '" + Coberturas.cells[12].innerHTML + "', Observaciones = '" + Coberturas.cells[13].innerHTML + "' WHERE CodigoAutorizacion = '" + CodigoAutorizacion.NumeroAutorizacion + "'"
    
        })
      }).then(response => response.json())
        .then(function (data) {
          
    
        }).catch(error => {
          console.log(error);
        });
      


}

function Cmd_ver_documento_autorizacion_Click(){

document.getElementById('aCmd_ver_documento_autorizacion').download = 'DocumentoAutorizacion'+ GStr_Cod_Autorizacion ;
document.getElementById('aCmd_ver_documento_autorizacion').href = 'data:application/pdf;base64,'+GStr_Documento_Autorizacion;
document.getElementById('aCmd_ver_documento_autorizacion').click();


}
 
var GArr_Cobertura_clinica_origen = [];
async function Cmd_continuar_atencion_Click(){

var html;

GStr_SITEDS_Cod_Cliente = document.getElementById('Dcbo_Aseguradora').value;   //obtiene el nombre para que el formulario de creacion lo pueda buscar

if (document.getElementById('Dcbo_Aseguradora').value == "111") { //FEBAN
    GStr_SITEDS_Cod_Especialidad = document.getElementById('Dcbo_Especialidad').value ;
}else{
    GStr_SITEDS_Cod_Especialidad = "";
}
GStr_SITEDS_Cod_Especialidad = "";
GStr_SITEDS_Apellido_Paterno = a_DatosAfiliado.ApellidoPaternoAfiliado;
GStr_SITEDS_Apellido_Materno = a_DatosAfiliado.ApellidoMaternoAfiliado;
GStr_SITEDS_Nombres = a_DatosAfiliado.NombresAfiliado;
var filas = document.querySelectorAll('#MSHGrid_Coberturasitedsbody>tr');
var fila_sel;
  filas.forEach(element => {
    if(element.style.backgroundColor == "turquoise"){
      return fila_sel = element;
      
    }
  })
 //codigo de documento de identidad de SUSALUD
//Código  Tipo de documento

//1   DNI
//2   Carné de extranjería
//3   Pasaporte
//4   Documento de Identidad Extranjero
//5   Código Único de Identificación (CUI)  en Acta de Nacimiento
//6   Código Nacido Vivo (CNV)
//7   Sin Documento de Identidad
//GArr_Clinica_origen[0] = '';//document.getElementById('Dcbo_Clinica_origen').value; revisare
//GArr_Clinica_origen[1] = '';//document.getElementById('Dcbo_Clinica_origen').text;  revisare
GArr_Cobertura_clinica_origen = [];
GArr_Cobertura_clinica_origen = a_Coberturas[fila_sel.id];
var  rst_aux = "SELECT id_doc_id FROM mae_documento_identidad WHERE cod_doc_id_susalud = '" + a_DatosAfiliado.CodTipoDocumentoAfiliado + "'";

await fetch('/modulo/Abre_Detalle/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: rst_aux

  })
}).then(response => response.json())
  .then(function (data) {
    
switch (a_DatosAfiliado.CodTipoDocumentoAfiliado) {
  case 1:
  case 2:
  case 3: 
      if(data.length>0){
         GStr_SITEDS_Cod_doc_id = data.id_doc_id;
      }
  break;
  default:
      GStr_SITEDS_Cod_doc_id = 2 ;//id de doctormas para el DNI
  break;
}
    

  }).catch(error => {
    console.log(error);
  }); 
  
  GStr_SITEDS_Numero_doc_id = a_DatosAfiliado.NumeroDocumentoAfiliado;
    //if (GArr_Clinica_origen[0] != "") {  revisare
    var html='';
              if (GStr_Cod_Autorizacion  != "" ){
                        
                        document.getElementById('Txt_contratante').value = a_DatosAfiliado.NombreContratante;
                        document.getElementById('Txt_cod_aseg').value = a_DatosAfiliado.CodigoAfiliado;
                        document.getElementById('Txt_prod').value = a_DatosAfiliado.DesProducto;
                        document.getElementById('Txt_Poliza').value = a_DatosAfiliado.NumeroContrato;
                        document.getElementById('Txt_pol_cert').value = a_DatosAfiliado.NumeroCertificado;
            
                         
                        html += '<tr id="' + fila_sel.id  + `" onclick="filaSelected(this);">` +
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodigoTipoCobertura + '</td>' +
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodigoSubTipoCobertura + '</td>' +
                        '<td>' + a_Coberturas[fila_sel.id].CodigoCobertura + '</td>' +
                        '<td>' + a_Coberturas[fila_sel.id].Beneficios + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodIndicadorRestriccion + '</td>' +
                        '<td>' + a_Coberturas[fila_sel.id].Restricciones + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodCopagoFijo + '</td>'+
                        '<td >' + a_Coberturas[fila_sel.id].DesCopagoFijo + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodCopagoVariable + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].DesCopagoVariable + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodFechaFinCarencia + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].FechaFinCarencia + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].CondicionesEspeciales + '</td>'+
                        '<td>' + a_Coberturas[fila_sel.id].Observaciones + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].CodCalificacionServicio + '</td>'+
                        '<td  >' + a_Coberturas[fila_sel.id].DesCalificacionServicio + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].BeneficioMaximoInicial + '</td>'+
                        '<td style="display:none">' + a_Coberturas[fila_sel.id].NumeroCobertura + '</td>'+ 
                      '</tr>'; 
              }  
                    
                    document.getElementById('MSHGrid_Coberturasitedsbody').innerHTML = html;
                        
                        if (GStr_Cod_Autorizacion == "0" ){
                            //GStr_Cod_Autorizacion = "0" solo sirve para poder escribir los datos dde la clinica de origen
                          // sin haberse generado SITEDS de Drmas
                            GStr_Cod_Autorizacion = "" ; // para la validacion que antes de escribir todos los datos del SITEDS
                          
                        }
                        
                    Verificar_cod_autorizacion_creacion();
                        
                        //sobrescribe el dato del coaseguro por el dato de la clinica de origen
                        document.getElementById('txt_coa').value = 100  - (a_Coberturas[fila_sel.id].CodCopagoVariable) ;   
                        document.getElementById('Txt_ded').value =  (a_Coberturas[fila_sel.id].CodCopagoFijo) ;   
                        Txt_ded_Change(a_Coberturas[fila_sel.id].CodCopagoFijo);
                        // document.getElementById('txt_coa').value = document.getElementById('txt_coa').value  ;   

  //  }

    document.getElementById('Cmd_salir_siteds').click();
}

async function Verificar_cod_autorizacion_creacion(){


  var  rst_AutSITEDS  ;

  if  (GStr_Cod_Autorizacion != "" ){
  

      document.getElementById('Cmd_datos_siteds').disabled = true;
      document.getElementById('Dcbo_aseguradora').disabled = true;
        //distribuye los codigos registrados en la BD a los campos indicados     
      await  fetch('/modulo/Abre_Detalle/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "SELECT * FROM h_SITEDS_documento_autorizacion WHERE codigoautorizacion = '" + GStr_Cod_Autorizacion + "'"

          })
        }).then(response => response.json())
          .then(function (rst_AutSITEDS) {
      
              if(rst_AutSITEDS.length>0){
               
                document.getElementById('TxtCodAut').value = rst_AutSITEDS[0].codigoautorizacion;
                document.getElementById('Txt_cod_aseg').value = rst_AutSITEDS[0].codigoafiliado;
                document.getElementById('Txt_tipo_afiliacion').value = rst_AutSITEDS[0].destipoafiliacion;
                document.getElementById('Txt_prod').value = rst_AutSITEDS[0].desproducto;
                document.getElementById('Txt_Poliza').value = rst_AutSITEDS[0].numeropoliza;
                document.getElementById('Txt_pol_cert').value = rst_AutSITEDS[0].numerocertificado;
                document.getElementById('Dcbo_aseguradora').value = GStr_SITEDS_Cod_Cliente;
 
                    
                  
                  
                  if (new Date(rst_AutSITEDS[0].FechaNacimiento) <= new Date()){
                      document.getElementById('DTFecNac').value =  rst_AutSITEDS[0].FechaNacimiento;
                  }
                  
                  //Moneda
                  //If Trim(rst_AutSITEDS!CodMoneda) = "1" Then
                  //    Cbo_Moneda.ListIndex = 0
                  //Else
                  //    Cbo_Moneda.ListIndex = 1
                  //End If
                  
                  //coaseguro
                  //txt_coa.Text = 100 - Val(rst_AutSITEDS!CodCopagoVariable)
                  //txt_coa.Enabled = false;
                
                  
                 //datos adicionales del formulario de siteds
                  
                  if (GStr_SITEDS_Apellido_Paterno == "" ) GStr_SITEDS_Apellido_Paterno = ".";
                  if (GStr_SITEDS_Apellido_Materno == "" ) GStr_SITEDS_Apellido_Materno = ".";
                  
                  document.getElementById('Txt_ApPat').value = GStr_SITEDS_Apellido_Paterno;
                  document.getElementById('Txt_ApMat').value = GStr_SITEDS_Apellido_Materno;
                  document.getElementById('Txt_Nombres').value = GStr_SITEDS_Nombres;

                  
                  document.getElementById('Txt_ApPat').disabled = true;
                  document.getElementById('Txt_ApMat').disabled = true;
                  document.getElementById('Txt_Nombres').disabled = true;

                  document.getElementById('DC_tipo_doc_id').value = GStr_SITEDS_Cod_doc_id;
                  document.getElementById('Txt_num_doc_id').value = rst_AutSITEDS[0].numerodocumentoafiliado;

                   IN_Hhabilitar_controles(false);
                  
                
              }
         
                      

          }).catch(error => {
            console.log(error);
          }); 
  
    
     
       
  }
  //por ser una variable global se limpia para evitar confusiones
  GStr_Cod_Autorizacion = "";



}

var lbln_nueva_dir ;
function  Cmd_Nueva_direccion_Click(){

    lbln_nueva_dir = true;
    IN_Hhabilitar_controles_direccion (true);
    document.getElementById('DCbo_departamento').value = '';
    document.getElementById('DCbo_provincia').value = '';
    document.getElementById('DCbo_distrito').value = '';
    document.getElementById('Txt_direccion').value = '';
    document.getElementById('DCbo_provincia').disabled = true;
    document.getElementById('DCbo_distrito').disabled = true;
 
    //document.getElementById('DCbo_departamento').value = '';

    document.getElementById('Txt_referencia').value = '';
    document.getElementById('Txt_casa').value = '';
    document.getElementById('Txt_celular').value = '';
    document.getElementById('Txt_oficina').value = '';
    document.getElementById('Txt_oficina_anx').value = '';
    document.getElementById('DG_direccion').disabled = true;
   
    document.getElementById('DCbo_departamento').value = '15';
     
    
    /* DCbo_departamento.Text = "LIMA"
    DCbo_departamento.BoundText = "15" */
    DCbo_departamento_LostFocus();
    
    document.getElementById('DCbo_provincia').disabled = false;;
    document.getElementById('DCbo_provincia').value = '01';
 
    DCbo_provincia_LostFocus();
    
    
    document.getElementById('DCbo_distrito').value = '';
    document.getElementById('DCbo_distrito').disabled = false;;

    document.getElementById('Cmd_anular_reg_direccion').disabled = false;;
  
     document.getElementById('Cmd_Nueva_direccion').disabled = true;

    document.getElementById('DCbo_distrito').focus();
    
    
    
}

function DCbo_departamento_LostFocus(){
   
  fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "select distinct ubi.cod_prov, ubi.provincia FROM mae_ubigeo ubi WHERE ubi.cod_prov <> '00' AND ubi.cod_dpto = '" + document.getElementById('DCbo_departamento').value + "' ORDER BY ubi.provincia ASC"
       })

     }).then(response => response.json())
    .then(function (Adata_provincia ) {
      if(Adata_provincia.length>0) {   
   
        document.getElementById('DCbo_provincia').innerHTML =  Adata_provincia.map(person => `<option value="${person.cod_prov}">${person.provincia}</option>`).join("\n");
       }
    }).catch(error => {
      console.log(error);
    });
}

function DCbo_provincia_LostFocus(){
       
 
    fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "SELECT dist.cod_dis, trim(dist.des_dis) distrito FROM m_distritos dist INNER JOIN mae_ubigeo ubi ON dist.ubigeo_dist = ubi.ubigeo WHERE ubi.cod_prov <> '00' AND ubi.cod_dpto = '" + document.getElementById('DCbo_departamento').value   + "' AND ubi.cod_dist <> '00' AND ubi.cod_prov = '" + document.getElementById('DCbo_provincia').value  + "' ORDER BY ubi.distrito ASC"
         })
  
       }).then(response => response.json())
      .then(function (Adata_distrito ) {
        if(Adata_distrito.length>0) {   
     
          document.getElementById('DCbo_distrito').innerHTML =  Adata_distrito.map(person => `<option value="${person.cod_dis}">${person.distrito}</option>`).join("\n");
         }
      }).catch(error => {
        console.log(error);
      });
}

function Cbo_forma_pago_Click(){ 
 

  switch  (document.getElementById('Cbo_forma_pago').value){
      case "EFECTIVO":
        document.getElementById('Frame_efectivo').style.display='';
        document.getElementById('Frame_efectivo').classList.add("Frame_efectivo"); 
        document.getElementById('Frame_credito').style.display = 'none';
        document.getElementById('Frame_tarjeta').style.display = 'none';
        document.getElementById('Frame_transferencia').style.display = 'none';
         
          break;
      case "CREDITO":
        document.getElementById('Frame_credito').style.display='';
        document.getElementById('Frame_efectivo').style.display = 'none';
         document.getElementById('Frame_credito').classList.add("Frame_credito");    
        document.getElementById('Frame_tarjeta').style.display = 'none';
        document.getElementById('Frame_transferencia').style.display = 'none';
        break;
      case "TARJETA":
        document.getElementById('Frame_tarjeta').style.display='';
        document.getElementById('Frame_efectivo').style.display = 'none';
        document.getElementById('Frame_credito').style.display = 'none';
         document.getElementById('Frame_tarjeta').classList.add("Frame_tarjeta");    

        document.getElementById('Frame_transferencia').style.display = 'none';
        break;
      case "TRANSFERENCIA":
        document.getElementById('Frame_transferencia').style.display='';
          document.getElementById('Frame_efectivo').style.display = 'none';
          document.getElementById('Frame_credito').style.display = 'none';
          document.getElementById('Frame_tarjeta').style.display = 'none';
           document.getElementById('Frame_transferencia').classList.add("Frame_tarjeta");    

          break;
          case "MPOS":
            document.getElementById('Frame_efectivo').classList.remove("Frame_efectivo"); 
            document.getElementById('Frame_credito').classList.remove("Frame_credito");
            document.getElementById('Frame_tarjeta').classList.remove("Frame_tarjeta");
            document.getElementById('Frame_transferencia').classList.remove("Frame_transferencia");  
            document.getElementById('Frame_tarjeta').style.display='none';
            document.getElementById('Frame_efectivo').style.display = 'none';
            document.getElementById('Frame_credito').style.display = 'none';
            document.getElementById('Frame_transferencia').style.display = 'none';
              break;
          default:
            document.getElementById('Frame_efectivo').classList.remove("Frame_efectivo"); 
            document.getElementById('Frame_credito').classList.remove("Frame_credito");
            document.getElementById('Frame_tarjeta').classList.remove("Frame_tarjeta");
            document.getElementById('Frame_transferencia').classList.remove("Frame_transferencia");
            document.getElementById('Frame_tarjeta').style.display='none';
            document.getElementById('Frame_efectivo').style.display = 'none';
            document.getElementById('Frame_credito').style.display = 'none';
            document.getElementById('Frame_transferencia').style.display = 'none';
            break;
  }

}

function  Cbo_Moneda_Click(){
if (document.getElementById('Cbo_Moneda').value == "S/." ){
  document.getElementById('Lbl1_ded_usd').style.visibility = 'hidden';
  document.getElementById('Lbl2_ded_usd').style.visibility = 'hidden';
}else{ 
    document.getElementById('Lbl1_ded_usd').style.visibility = 'visible';
    document.getElementById('Lbl2_ded_usd').style.visibility = 'visible';
    document.getElementById('Lbl2_ded_usd').innerHTML =   RedondeaDed( document.getElementById("Txt_ded").value * lsg_cambio);

}

}


function RedondeaDed(X ) {
var a ;
    a = X -  parseInt(X);
    if (a > 0 && a < 0.5 ){
        return parseInt(X) + 0.5;
    }else if (a > 0.5 && a < 1 ){
        return   parseInt(X) + 1;
    }else{
        return X
    }
}

function Cbo_tipo_prog_Click(val){

  document.getElementById('Txt_Dr').value = '' ;
 switch (val){
    case 0:
        document.getElementById('Lbl_med').style.visibility = 'hidden';
        document.getElementById('Txt_Dr').style.visibility = 'hidden';
        document.getElementById('Lbl_fecha').style.visibility = 'hidden';
        document.getElementById('DT_fecha').style.visibility = 'hidden';
        document.getElementById('Lbl_hora').style.visibility = 'hidden';
        document.getElementById('CmbHora').style.visibility = 'hidden';
 
      break;
    case 1:
    case 3:
      document.getElementById('Lbl_med').style.visibility = 'visible';
      document.getElementById('Txt_Dr').style.visibility = 'visible';
      document.getElementById('Lbl_fecha').style.visibility = 'visible';
      document.getElementById('DT_fecha').style.visibility = 'visible';
      document.getElementById('Lbl_hora').style.visibility = 'visible';
      document.getElementById('CmbHora').style.visibility = 'visible';
   
        break;
    case 2:
      document.getElementById('Lbl_med').style.visibility = 'hidden';
      document.getElementById('Txt_Dr').style.visibility = 'hidden';
      document.getElementById('Lbl_fecha').style.visibility = 'visible';
      document.getElementById('DT_fecha').style.visibility = 'visible';
      document.getElementById('Lbl_hora').style.visibility = 'visible';
      document.getElementById('CmbHora').style.visibility = 'visible';    
 
        break;
 }

}


function  Txt_ded_Change(val){
      if  (document.getElementById('Cbo_Moneda').value != "S/.") {
        document.getElementById('Lbl2_ded_usd').innerHTML = RedondeaDed(val * lsg_cambio);
      }

      if (val > 0) {
        document.getElementById('Lbl_doc_pago').style.visibility = "visible";
        document.getElementById('Cbo_doc_pago').style.visibility = "visible";
        document.getElementById('Fram_Correo_electronico').style.visibility = "visible";
      }else{
          if (document.getElementById('txt_coa').value > 0 ){
            document.getElementById('Fram_Correo_electronico').style.visibility = "visible";
          }else{
            document.getElementById('Fram_Correo_electronico').style.visibility = "hidden";
          }
          
          document.getElementById('Lbl_doc_pago').style.visibility = "hidden";       
          document.getElementById('Cbo_doc_pago').style.visibility = "hidden";
        }
}


function txt_coa_Change(val){
 

    if (val > 100 ){
       document.getElementById('txt_coa').value = "100";
    }
    
    if (document.getElementById('Dcbo_aseguradora').value == "111" ){
        if (document.getElementById('DCbo_cond').value == 1 ){
           document.getElementById('Txt_ded').value =  lsnl_importe_CopFijo;
           li_condicion_especial_pago = 1
        }else{
            li_condicion_especial_pago = document.getElementById('DCbo_cond').value;
            document.getElementById('Txt_ded').value  = RedondeaDed(lsnl_importe_CopFijo + (lsnl_importe_tarifa - lsnl_importe_CopFijo) * (val/ 100));
        }
    }
    
    if (document.getElementById('Dcbo_aseguradora').value == "011"){
     
        switch (val){
            case "12":
              document.getElementById('Txt_ded').value = "6.5";
              break;
            case "17":
              document.getElementById('Txt_ded').value = "9.0";
              break;
              break; 
            case "19":
              document.getElementById('Txt_ded').value = "10.5";
              break;
            case "22":
              document.getElementById('Txt_ded').value =  "12.0";
              break;
            default:
              document.getElementById('Txt_ded').value =  "";
              break;
        }
      
    }

   
    if (val > 0 ){
      document.getElementById('Fram_Correo_electronico').style.visibility = 'visible';
    }else{
        if ( document.getElementById('Txt_ded').value > 0 ){
          document.getElementById('Fram_Correo_electronico').style.visibility = 'visible';
        }else{
          document.getElementById('Fram_Correo_electronico').style.visibility = 'hidden'; 
        }
    }
    
 
    
}

function  Cbo_tiene_correo_Click(val){
if (val == 0 ){
    document.getElementById('Txt_email').style.visibility = 'visible';
    
    fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query:"SELECT * FROM mae_comprobante_copago_envio WHERE id_envio_ce <> 2 and activo = true ORDER BY 1 ASC"
      })
    }).then(response => response.json())
      .then(function (Adata_Medio_envio_ce) {
             if (Adata_Medio_envio_ce.length>0) {
              options = Adata_Medio_envio_ce.map(person => `<option value="${person.id_envio_ce}" >${person.descripcion}</option>`).join("\n");
             }  
            document.getElementById('DC_medio_envio_ce').innerHTML = options;
           // document.getElementById('DC_medio_envio_ce').value = 1;
            
      }).catch(error => {
        console.log(error);
      });    
    
 }else{
    document.getElementById('Txt_email').style.visibility = 'hidden';
     fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query:"SELECT * FROM mae_comprobante_copago_envio WHERE id_envio_ce <> 1  and activo = true  ORDER BY 1 ASC"
      })
    }).then(response => response.json())
      .then(function (Adata_Medio_envio_ce) {
             if (Adata_Medio_envio_ce.length>0) {
              options = Adata_Medio_envio_ce.map(person => `<option value="${person.id_envio_ce}" >${person.descripcion}</option>`).join("\n");
             }  
            document.getElementById('DC_medio_envio_ce').innerHTML = options;
           // document.getElementById('DC_medio_envio_ce').value = 1;
            
      }).catch(error => {
        console.log(error);
      });   
}

}


function Cmd_anular_reg_direccion_Click(){

  lbln_nueva_dir = false;
//Call DG_direccion_RowColChange(1, 1)

  IN_Hhabilitar_controles_direccion(false);

document.getElementById('Cmd_Nueva_direccion').disabled = false;
document.getElementById('Cmd_anular_reg_direccion').disabled = true;
 

}

function cambiaredad(val){
  
document.getElementById("Lbl_edad").innerHTML ="  "+ (new Date().getFullYear()  -  parseInt(val.slice(0,5)) )+ " años";
}