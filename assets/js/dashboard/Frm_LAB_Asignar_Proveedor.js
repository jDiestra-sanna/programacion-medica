  var L_CodAte;
 (function(){ 
  var SQLSelect ;
  var rs_serv_laboratorio  ;
  var rs_servicio  ;
  var ll_i, ll_j  ;
   //REGISTROS EN LOS DIFERENTES CAMPOS
   fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "select * from vw_datos_servicio_laboratorio Where cod_serv_laboratorio = " +   window.opener.document.getElementById('Txt_codservlaboratorio').value
    })
    }).then(response => response.json())
    .then(function (rs_servicio) {
      this.rs_servicio = rs_servicio;
       if( rs_servicio[0].coaseguro == 0 &&  (rs_servicio[0].tar_ate) == 'null' ){
        fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "update t_cab_lab_serv_laboratorio set tar_ate = 0 WHERE coaseguro = 0 and tar_ate is null"
          })
          }).then(response => response.json())
          .then(function (Adata_proveedor) {
             
          }).catch(error => {
            console.log(error);
          });  
           rs_servicio[0].tar_ate = 0;
     }
     document.getElementById('Txt_codservlaboratorio').value = window.opener.document.getElementById('Txt_codservlaboratorio').value;
     document.getElementById('Txt_coa').value = rs_servicio[0].tar_ate;
     document.getElementById('Txt_estado').value = (rs_servicio[0].estado??= '').trim(); 
     document.getElementById('TxtNomEmp').value = (rs_servicio[0].nom_gru??= '').trim();
     document.getElementById('TxtNomPac').value = (rs_servicio[0].nom_pac??= '').trim();
     document.getElementById('Txt_Edad').value = (rs_servicio[0].edad_pac??= '').trim();
     document.getElementById('Txt_Coddis').value = (rs_servicio[0].cod_dis??= '').trim();
     document.getElementById('Txt_distrito').value =  rs_servicio[0].des_dis // + " - " + rs_servicio.provincia + " - " + rs_servicio.distrito;
     document.getElementById('Txt_Cod_Dir').value = (rs_servicio[0].cod_dir??= '').trim();
     document.getElementById('Txt_CodTit').value = (rs_servicio[0].cod_tit??= '').trim();
     document.getElementById('Txt_CodAte').value = (rs_servicio[0].cod_ate??= '').trim();
     if(rs_servicio[0].direccion==null){
       alert('Porfavor verificar los datos de la direccion');
     }
     document.getElementById('Txtdireccion').value = (rs_servicio[0].direccion??= '').trim();
     document.getElementById('Txt_nro_lote').value = (rs_servicio[0].nro_dir_lote??= '').trim();
     document.getElementById('Txt_dpto_dir').value = (rs_servicio[0].dir_dpto_interior??= '').trim();
     document.getElementById('Txt_Urbanizacion').value = (rs_servicio[0].dir_urbanizacion??= '').trim();
     document.getElementById('txtref').value = (rs_servicio[0].referencia??= '').trim();
     document.getElementById('TxtTlf').value = (rs_servicio[0].tlf_dir??= '').trim();
     document.getElementById('Txt_Celular').value = (rs_servicio[0].tlf_celular??= '').trim();
     document.getElementById('Txt_Clasif_laboratorio').value = (rs_servicio[0].clasificacion??= '').trim();
     document.getElementById('Txt_factor_lab').value = (rs_servicio[0].factor_lab??= '').trim();
     document.getElementById('DTPicker1').value = (rs_servicio[0].fecha_servicio??= '').trim();

    
    //Txt_codservicio.Text = "1"

      if (rs_servicio[0].for_ate == "E") {
        document.getElementById('Cbo_forma_pago').value =  "EFECTIVO"
      }else if  (rs_servicio[0].for_ate == "C") {
        document.getElementById('Cbo_forma_pago').value = "CREDITO"
      }else if (rs_servicio[0].for_ate == "T") {
        document.getElementById('Cbo_forma_pago').value = "TARJETA"
      }else if (rs_servicio[0].for_ate == "F") {
        document.getElementById('Cbo_forma_pago').value = "TRANSFERENCIA"
      }
      document.getElementById('Txt_observacion').value = (rs_servicio[0].observacion??= '').trim();
      document.getElementById('txt_coa_porc').value = (rs_servicio[0].coaseguro??= '').trim();
 
      //Cbo_clasificacion.Text = rs_laboratorio!nom_clasif
    
    }).catch(error => {
      console.log(error);
    }); 

  //validacion de codigo de servicio para el llenado del combo de los proveedores
  if (window.opener.document.getElementById('Txt_codservicio').value == "1" || window.opener.document.getElementById('Txt_codservicio').value == "2" || window.opener.document.getElementById('Txt_codservicio').value == "8" ){     //Analisis
      //Radiografias-Ecografias
      //Patologia

      document.getElementById('Lbl_Proveedor').style.display = 'inline-block';
      document.getElementById('DCbo_Proveedor').style.display = 'inline-block';
      document.getElementById('DCbo_Proveedor').disabled = false;
 
      document.getElementById('Lbl_Medico').style.display = 'none';
  
       fetch('/modulo/Abre_Detalle/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "select a.cod_laboratorios as codigo,a.des_laboratorio as proveedor FROM m_lab_laboratorios a where estado = 'A' AND cod_servicios='" +   window.opener.document.getElementById('Txt_codservicio').value + "'"
        })
        }).then(response => response.json())
        .then(function (Adata_proveedor) {
            if(Adata_proveedor.length>0){
              var Adata_proveedores = Adata_proveedor.map(person => `<option value="${person.codigo}">${person.proveedor}</option>`).join("\n");
              document.getElementById('DCbo_Proveedor').innerHTML = Adata_proveedores;
              document.getElementById('DCbo_Proveedor').value = 2 ;

            }
        
        }).catch(error => {
          console.log(error);
        });  
      
  }else if (window.opener.document.getElementById('Txt_codservicio').value == "3" ){
      //EKG
      document.getElementById('Lbl_Proveedor').style.display = 'none';
      document.getElementById('DCbo_Proveedor').style.display = 'none';
      document.getElementById('DCbo_Proveedor').disabled = true;
      
      document.getElementById('Lbl_Medico').style.display = 'inline-block';
      
   }else if (window.opener.document.getElementById('Txt_codservicio') == "4" || window.opener.document.getElementById('Txt_codservicio') == "7" ){
      //VACUNA
      //procedimiento
   
      document.getElementById('Lbl_Proveedor').style.display = 'none';
      document.getElementById('DCbo_Proveedor').style.display = 'none';
      document.getElementById('DCbo_Proveedor').disabled = true;
      
      document.getElementById('Lbl_Medico').style.display = 'inline-block';
   }

  document.getElementById('Txt_Ventana').value = "Frm_LAB_correo_proveedor";
  
  fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query:"select cod_pruebas,descripcion,precio,clasificacion from t_det_lab_serv_laboratorio where cod_serv_laboratorio=" +  window.opener.document.getElementById('Txt_codservlaboratorio').value
    })
    }).then(response => response.json())
    .then(function (Adata_prueba) {
      var html='',i;
      
         if(Adata_prueba.length>0){
          for (  i = 0; i < Adata_prueba.length; i++) {


            html += '<tr ' + ' id="' + Adata_prueba[i].cod_pruebas +'" onclick="filatabla(this);">' +
              '<td >' + Adata_prueba[i].cod_pruebas + '</td>' +
              '<td>' + Adata_prueba[i].descripcion + '</td>' +
              '<td>' + Adata_prueba[i].precio + '</td>' + 
              '<td style="text-align:center">' + Adata_prueba[i].clasificacion + '</td>' + 
              '</tr>';
          }

           document.getElementById('Grid_destinobody').innerHTML = html;
        }
    
    }).catch(error => {
      console.log(error);
    });  
 
  document.getElementById('Txt_observacion').focus();
 
 })();
 
   

 function filatabla(p) {
  var table = p.parentElement;

  for (var i = 0, row; row = table.rows[i]; i++) {
    row.style.backgroundColor = "";      
   
  } 
  p.style.backgroundColor = "turquoise";            
}


function Cmd_Editar_Click(){
  

  document.getElementById('Cmd_Agregar').style.display = "inline-block";
  document.getElementById('Cmd_editar_dir').disabled = false;
 
  document.getElementById('Txt_Celular').disabled = false;

 
  //Txt_celular.BackColor = &HFFFFFF
  
  document.getElementById('Txt_pruebas').style.display = "inline-block";
  document.getElementById('Label12').style.display = "inline-block";
 
  
   fetch('/gestionlaboratorio/getpruebas/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    
  }).then(response => response.json())
    .then(function (data) {
       if(data.length>0){
          document.getElementById('Txt_pruebasdatalist').innerHTML =  data.map(prueba => `<option data-codprueba="${prueba.cod_pruebas}" data-clasificacion="${prueba.clasificacion}"  data-unidad="${prueba.unidad}" value="${prueba.des_prueba}"></option> `).join("\n");

         
       }else{
        enviado = true;
       } 
    }).catch(error => {
      alert('No se cargaron las pruebas.Revisar el log');
      console.log(error);
    }); 
}


async function Cmd_anular_Click(){
  if (confirm("Desea anular la orden N°: " + window.opener.document.getElementById('Txt_codservlaboratorio').value )) {
        
        await fetch('/modulo/Execute/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "UPDATE t_cab_lab_serv_laboratorio SET cont_correo_canc='1', estado = 'C', fecha_cierre = CURRENT_DATE, hora_fin= CURRENT_TIME, usuario_cierre = '" + window.opener.document.getElementById('usuario').innerHTML.trim() + "' WHERE cod_serv_laboratorio = " + document.getElementById('Txt_codservlaboratorio').value
          })
          }).then(response => response.json())
          .then(function (Adata_proveedor) {
             
          }).catch(error => {
            console.log(error);
          });  
        REGISTRA_AUDITORIA_LABORATORIO("C", "ANULACION DE ORDEN", "", Val(Txt_codservlaboratorio.Text))
        alert( "Se anulo el Laboratorio N°" +window.opener.document.getElementById('Txt_codservlaboratorio').value);
        Frm_LAB_Grid.CmdFiltrar_Click
        window.close();
  }

     
  
}


async function  REGISTRA_AUDITORIA_LABORATORIO(lsestado , lsobs , lscambios , lcodservlaboratorio ){
 
    await fetch('/modulo/Execute/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "INSERT INTO h_auditoria_laboratorio (estado, fec_reg_audi, hor_reg_audi, usu_reg_audi, obs_audi, cambio_audi, cod_serv_laboratorio) VALUES ('" + lsestado + "', '" + fechahora().substring(0,10) + "', '" + fechahora().substring(12,8)  + "', '" +  window.opener.document.getElementById('usuario').innerHTML.trim()  + "', '" + lsobs + "', '" + lscambios + "', '" + lcodservlaboratorio + "')"
      })
      }).then(response => response.json())
      .then(function (Adata_proveedor) {
         
      }).catch(error => {
        console.log(error);
      });  
}

function fechahora() {
  var d = new Date(),
       month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  if (minute.length < 2) 
      minute = '0' + minute;
  if (second.length < 2) 
      second = '0' + second;
  return [year, month, day].join('-')+' '+[hour, minute, second].join(':');
}


function Cmd_Eliminar_Click(){

   var r = confirm("Desea Eliminar esta prueba?");
      if (r == true) {
        
      } else {
        return;
      } 

    var table = document.getElementById('Grid_destinobody');

    for (var i = 0, row; row = table.rows[i]; i++) {
      if (row.style.backgroundColor == "turquoise"){
          table.deleteRow(i);
      }      
    
    } 
     
     
}

function Cmd_Agregar_Click(){
 var Txt_pruebas = document.querySelector(`#Txt_pruebasdatalist option[value="${document.getElementById('Txt_pruebas').value.trim()}"]`);   
 var yaexiste = false;
 var valor = 0;
  if (Txt_pruebas === null) {
        alert("Debe ingresar un criterio de busqueda");
        document.getElementById('Txt_pruebas').focus();
  }else if (Txt_factor_lab == ''){
        alert("Debe ingresar la empresa aseguradora");
  }else{

        var rows =document.getElementById("Grid_destinobody").rows;
        for(var i=0;i<rows.length;i++){
            var td = rows[i].getElementsByTagName("td")[0];
            
            if (td.innerHTML == Txt_pruebas.dataset.codprueba ) {
                alert("Esta prueba ya ha sido registrado, ingrese otro");
                document.getElementById('Txt_pruebas').value = ""
                
                yaexiste = true ;
                break;
            }
        }
        if (yaexiste ) return false;

        var tr = document.createElement('tr');   
        tr.id = Txt_pruebas.dataset.codprueba;
        
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');

         td1.appendChild(document.createTextNode(Txt_pruebas.dataset.codprueba));
         td2.appendChild(document.createTextNode(document.getElementById('Txt_pruebas').value));
         td3.appendChild(document.createTextNode( redondeardec((1 + 0.18) * document.getElementById('Txt_factor_lab').value  * Txt_pruebas.dataset.unidad)  ));
         td4.appendChild(document.createTextNode(Txt_pruebas.dataset.clasificacion));
         td4.style.textAlign = "center";
         tr.appendChild(td1); 
         tr.appendChild(td2); 
         tr.appendChild(td3); 
         tr.appendChild(td4); 
         tr.onclick =  function(tr) {
          
           filatabla(tr.target.parentElement);
         }; 
         
             document.getElementById('Grid_destinobody').appendChild(tr);
             rows =document.getElementById("Grid_destinobody").rows;
             for(var i=0;i<rows.length;i++){
                var td = rows[i].getElementsByTagName("td")[2];
                 valor += parseInt(td.innerHTML); ;
                  
                 
             }
             //Txt_total.Text = valor
              
             document.getElementById('Txt_coa').value = valor *  (parseInt(document.getElementById('txt_coa_porc').value) / 100)   ;
        /*  
        
        If grid_orden1.TextMatrix(grid_orden1.rows - 1, 1) <> "" Then grid_orden1.rows = grid_orden1.rows + 1
    
        grid_orden1.TextMatrix(grid_orden1.rows - 1, 0) = Txt_cod_prueba.Text
        grid_orden1.TextMatrix(grid_orden1.rows - 1, 1) = Txt_pruebas.Text
        
        If Trim(Txt_factor_lab.Text) = "" Then
            MsgBox "Debe ingresar la empresa aseguradora"
            If grid_orden1.Row > 1 Or grid_orden1.rows > 2 Then
                grid_orden1.RemoveItem grid_orden1.Row
                valor = 0
                For a = 1 To grid_orden1.rows - 1
                    valor = valor + grid_orden1.TextMatrix(a, 2)
                Next a
            Else
                grid_orden1.TextMatrix(grid_orden1.Row, 0) = ""
                grid_orden1.TextMatrix(grid_orden1.Row, 1) = ""
                grid_orden1.TextMatrix(grid_orden1.Row, 2) = ""
                grid_orden1.TextMatrix(grid_orden1.Row, 3) = ""
                Txt_total.Text = ""
                txt_coa.Text = ""
           End If
            
           Exit Sub
        Else
            grid_orden1.TextMatrix(grid_orden1.rows - 1, 2) = RedondeaDed((1 + gsg_IgV) * Trim(Txt_factor_lab.Text) * Trim(txt_unidad.Text))
        End If
        
        grid_orden1.TextMatrix(grid_orden1.rows - 1, 3) = Txt_clasificacion.Text
        
        grid_orden1.Row = grid_orden1.rows - 1
    
        valor = 0
        For a = 1 To grid_orden1.rows - 1
            valor = valor + grid_orden1.TextMatrix(a, 2)
        Next a
        
        Txt_total.Text = valor
        txt_coa.Text = Val(Txt_total.Text) * Val(txt_coa_porc.Text / 100)
        Txt_pruebas.Text = "" */
}


}

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


async function Cmd_Grabar_Click(){


 // Dim rs_correo_proveedor As New ADODB.Recordset
    
/*   if( DCbo_Proveedor.Enabled == true){*/  
     if (document.getElementById("DCbo_Proveedor").value == ""){
          //active_prov = False
          alert("Debe seleccionar un Proveedor de la lista");
          return false;
     } 
 
 /*  } */
   
       


 await fetch('/gestionlaboratorio/asignar_proveedor/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    Txt_coa :  document.getElementById("Txt_coa").value,
    Txt_observacion :  document.getElementById("Txt_observacion").value,
    Txt_Coddis :  document.getElementById("Txt_Coddis").value,
    Txt_Cod_Dir :  document.getElementById("Txt_Cod_Dir").value,
    Txt_codservlaboratorio :  document.getElementById("Txt_codservlaboratorio").value,
    DCbo_Proveedor:  document.getElementById("DCbo_Proveedor").value,
    Txt_codservicio: document.getElementById("Txt_codservicio").value,
    detalle:tableToJson( document.getElementById("Grid_destino"))
  })

   }).then(response => response.json())
  .then(function (data ) {
    alert( "Se asignó correctamente el Proveedor");
  }).catch(error => {
    alert( "sucedio un error ");
    console.log(error);
  });
   
     


}

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
