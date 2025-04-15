<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
 <script type="text/javascript">
  
 
  <?php $cod =   is_null($this->session->userdata('cod_doc'))?$this->session->userdata('cod_usu'):$this->session->userdata('cod_doc');   ?>
     var myvar='<?php echo $cod;?>';   
   
</script>
 
 
 <style>
.prueba{
  grid-column-start:1;
  grid-column-end:5;
 
height: 60vh;
  overflow-x: scroll;
  border: solid 1px;
}
#tabla1 {
  width:300%; 
  table-layout: fixed;
}
#datos_doctor input:disabled,#datos_doctor select:disabled  ,#detalle_asignacion input:disabled,#detalle_asignacion textarea:disabled,#detalle_asignacion select:disabled ,#datos_motorizado input:disabled,#datos_motorizado select:disabled {
  background-color: #CDCDCD	;
} 
#tabla1 #t01 {
    position:sticky;
    top:0;
 }
#tabla1 #t01 th{
   color: white;
  background-color: green; 
  border: 1px solid black ;
  cursor: pointer;
  white-space: nowrap;
   min-width: 30px;
  text-align: left;
  overflow: hidden; 
  resize: horizontal;

 }
 #tabla1 #t01 th:first-child{
   color: white;
  background-color: green; 
  border: 1px solid black ;
  width: 1.5vw;
  resize: unset;
 }
 
#tabla1 td{
  border: 1px solid black; 
  overflow: hidden;
  white-space: nowrap;
  --width:100%;
   min-width: 30px;
  text-align: left;
  resize: horizontal;
}

#tabla1 td:first-child{
  border: 1px solid black; 
  resize: unset;
}
.strech{
  resize: horizontal;
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
     
  fieldset {
  position: relative;
  border:thin  solid #000080;
}
legend {
  font-size: 1em;
  font-weight: bold;
   color: #000080 ;
   width: 200px;
}
  .legend2 {
  display:block;
  position: absolute;
  background:white ;
  top: -0.1em;
  right: 20px;
 
   }

  #table_seguimiento ,#table_seguimiento td, #table_seguimiento th {
  border: 1px solid black;
}
 </style>
<!-- <div id = "resultado" >
  <input type="checkbox" id="todos" name="todos" value="PEDIATRIA"  >
</div>
 -->

 <!--
 <div style="border:2px solid ;">
<input type="checkbox"id="pediatra"  value="'005'"  name="especialidad">
<label for="pediatra" >PEDIATRA</label>
<br>
<input type="checkbox"id="medicina" checked  value="'006','010'"  name="especialidad">
<label for="medicina" >MEDICINA</label>
<br>
<input type="checkbox"id="cardiologia"  value="'001'"  name="especialidad">
<label for="cardiologia" >CARDIOLOGIA</label>
<br>
<input type="checkbox"id="endocrinologia"  value="'011'"  name="especialidad">
<label for="endocrinologia" >ENDOCRONOLOGIA</label>
<br>
<input type="checkbox"id="neumologia"  value="'027'"  name="especialidad">
<label for="neumologia" >NEUMOLOGIA</label>
<br>
<input type="checkbox"id="nutricionista"  value="'026'"  name="especialidad">
<label for="nutricionista" >NUTRICIONISTA</label>
<br>
<input type="checkbox"id="especialista"  value="'012','003','009'"  name="especialidad">
<label for="especialista" >ESPECIALISTA</label>

</div>
-->

<?php

$this->load->database();
$this->load->model('LoginModel');

// Consulta SQL para obtener las especialidades
$query = $this->db->query("SELECT cod_esp, nom_esp FROM vw_especialidades");

// Verificar si se encontraron resultados
if ($query->num_rows() > 0) {
    // Obtener los resultados como un array de arrays asociativos
    $rows = $query->result_array();

    // Imprimir el inicio del div para el listado de checkboxes
    echo '<div style="border:2px solid;">';
    
    // Imprimir el inicio de la lista
    echo '<ul style="list-style: none; padding-left: 0;">';
    
    // Iterar sobre los resultados y generar los checkboxes
    foreach ($rows as $row) {
        // Acceder a las columnas cod_esp y nom_esp
        $cod_esp = $row['cod_esp'];
        $nom_esp = $row['nom_esp'];
        
        // Imprimir cada checkbox
        echo '<li>';
        echo '<input type="checkbox" id="' .  $cod_esp . '" value="' . "'". $cod_esp ."'". '" name="especialidad">';
        echo '<label for="' . $cod_esp . '">' . $nom_esp . '</label>';
        echo '</li>';
    }
    
    // Imprimir el cierre de la lista
    echo '</ul>';
    
    // Imprimir el cierre del div
    echo '</div>';
} else {
    echo "No se encontraron resultados.";
}

?>







<div>
<label for="estado" >Estado</label>
<?=form_dropdown('estado',get_combo_query("select * from m_zona where 1 = 2","","",array( "CONFIRMADO","SIN CONFIRMAR","REGISTRADO","TODOS")),1,array( 'style'=>"width:150px",'id'=>"estado"))?>
<br>
<label for="turno" >Turno&nbsp;</label>
<?=form_dropdown('turno',get_combo_query("select * from m_zona where 1 = 2","","",array("MAÑANA","TARDE","MADRUGADA","TODOS")),3,array( 'style'=>"width:150px",'id'=>"turno"))?>
<br>
<label for="clasif" >Clasif&nbsp;&nbsp;</label>
<?=form_dropdown('clasif',get_combo_query("select * from m_zona where 1 = 2","","",array("AGUDO","CRONICO","AUTO COVID","TODOS","NINGUNA")),3,array( 'style'=>"width:150px",'id'=>"clasif"))?>
<br>
<div style="border:1px solid;display:inline-block">Cantidad de medicos</div><div  style="border:1px solid;display:inline-block;width:30px;text-align:center;" id="cant" > 0</div>
</div>
<div>
Fecha inicial
<input  type="date" id="fec_inicial" name="fec_inicial" value="<?php  echo date("Y-m-d")?>">
<br> 
Fecha final
<input  type="date" id="fec_final" name="fec_final"  value="<?php  echo date("Y-m-d",strtotime("last day of this month"))?>"> 
</div>
<div>
  <label>Nombre Doctor</label>
<input type="input" id="nom_doc" name="nom_doc" >  
 <label id="proveedorname">Proveedor</label>
<?=form_dropdown('idproveedor',utf8_converter(get_combo_query( "select cod_prov_motorizado,descripcion from m_proveedor_motorizado",'cod_prov_motorizado','descripcion' ,array("TODOS"))),"0",array( 'style'=>"width:280px;",'id'=>"idproveedor"))?>

<input type="button"  class="btn btn btn-primary btn-sm"  id="busqueda" name="busqueda" value="Busqueda"> 
<br>
<br>
<br> 
<button class="btn btn btn-warning btn-sm"  id="remisse" name="remisse" onclick="enviar_remisse();" ><i class="fas fa-car"></i> Enviar al Remisse
 </button>
 <button class="btn btn btn-dark btn-sm"  id="sms" name="sms" ><i class="fas fa-sms"></i> Enviar SMS
 </button>
 <input type="button"  class="btn btn btn-danger btn-sm"  id="migrar" name="sms" value="Migracion a SM"    > 

 <button class="btn btn btn-secondary btn-sm"  id="seguimiento" name="seguimiento" ><i class="fas fa-info-circle"></i> seguimiento</button>
 <input type="button"  class="btn btn btn-success btn-sm"  id="prefacturacion" name="prefacturacion" value="Exportar pre-facturacion"  > 
 <input type="button"  id="descargarexcelprogramacion_medica" name="descargarexcelprogramacion_medica"  onclick="descargarexcelprogramacion_medica();"  value="Descargar excel"  > 

<label id="resultado"></label>

 </div>

 <button class="btn btn btn-success btn-sm"  id="agregarprogramacion" name="agregarprogramacion" ><i class="fas fa-plus"></i> Agregar</button>
 <button class="btn btn btn-danger btn-sm"  id="cancelarprogramacion" name="cancelarprogramacion" ><i class="fas fa-ban"></i> Cancelar</button>



<div id="container" class="prueba">
<table  id="tabla1" >
      <thead   id = "t01">
      <tr >
              <th><input type="checkbox" id="todos" onclick="selectall(this)" ></th>
              <th scope="col" ondblclick="sortTable(0)"><div class="strech">CODIGO</div></th>
              <th scope="col" ondblclick="sortTable(1)"><div class="strech">DOCTOR</div></th>
              <th scope="col" ondblclick="sortTable(2)"><div class="strech">NACIONALIDAD</div></th>
              <th scope="col" ondblclick="sortTable(3)"><div class="strech">EDAD</div></th>
              <th scope="col" ondblclick="sortTable(4)"><div class="strech">TURNO</div></th>
              <th scope="col" ondblclick="sortTable(5)"><div class="strech">BOTIQUIN</div></th>
              <th scope="col" ondblclick="sortTable(6)"><div class="strech">CLASIFICACION</div></th>
              <th scope="col" ondblclick="sortTable(6)"><div class="strech">ESPECIALIDAD</div></th>
              <th scope="col" ondblclick="sortTable(7)"><div class="strech">DESCRIPCION</div></th>
              <th scope="col" ondblclick="sortTable(8)"><div class="strech">FECHA</div></th>
              <th scope="col" ondblclick="sortTable(9)"><div class="strech">HORINI</div></th>
              <th scope="col" ondblclick="sortTable(10)"><div class="strech">HORFIN</div></th>
              <th scope="col" ondblclick="sortTable(11)"><div class="strech">CONDUCTOR</div></th>
              <th scope="col" ondblclick="sortTable(12)"><div class="strech">PROVEEDOR</div></th>
              <th scope="col" ondblclick="sortTable(13)" ><div class="strech">CON_MPOS</div></th>
              <th scope="col" ondblclick="sortTable(14)"><div class="strech">HOR_INI</div></th>
              <th scope="col" ondblclick="sortTable(15)"><div class="strech">HOR_FIN</div></th>
              <th scope="col" ondblclick="sortTable(16)" ><div class="strech">ESTADO</div></th>
              <th scope="col" ondblclick="sortTable(17)"><div class="strech">COD_DOC</div></th>
              <th scope="col" ondblclick="sortTable(18)"><div class="strech">COD_MOT</div></th>
              <th scope="col" ondblclick="sortTable(19)"><div class="strech">TABLET</div></th>
              <th scope="col" ondblclick="sortTable(20)"><div class="strech">MALETIN</div></th>
              <th scope="col" ondblclick="sortTable(21)"><div class="strech">SMS</div></th>
              <th scope="col" ondblclick="sortTable(22)"><div class="strech">INDICACIONES_DOCTOR</div></th>
      </tr>
      </thead>
      <tbody  id="t02">

      </tbody>
</table>

</div>

<br>
<br>

 
<div  style=" background-color: rgba(0,0,0,.0001) !important;" id="show_modaldireccion" class="modal fade" role="dialog" style="background: #000;">
  <div class="modal-dialog">
    <div class="modal-content" id=show_modaldireccion2 style="height: 700px;width: 800px;">
          <div style="font-size: 24px;background:green ; color: white; text-shadow: 1px 1px #ccc;padding:5px;" id="show_modaldireccion2header">
          <h5>REGISTRO / EDITAR </h5>
          </div>
          <div class="modal-body" style="height: 600px;width: 800px;  overflow-y: auto;" >
            <table  id ="direcciones" class="table table-bordered table-hover table-sm">
              <thead class="btn-primary">
                <tr>
                <th></th>

                  <th>Direccion</th>
                  <th>Distrito</th>
                  <th>Referencia</th>
                  <th>Telefono</th>
                  <th>Telefono2 </th>
                  <th></th>
                </tr>
              </thead>
              <tbody  id="listdirecciones">                    
              </tbody>

          </table>
              <div style="display: grid;grid-template-columns:  1fr 2fr;">
                Direccion 
                <input type="input"  id="direccion"   name="direccion">
                Distrito
                <?=form_dropdown('distrito',get_combo_query("select * from m_distritos where      cod_prov   = 'L0'","ubigeo_dist","des_dis",array("Seleccione")),0,array( 'style'=>"width:300px",'id'=>"distrito"))?>
                Referencia
                <input type="input"  id="referencia"   name="referencia">
                Telefono
                <input type="input"  id="telefono"   name="telefono">
                Telefono 2
                <input type="input"  id="telefono2"   name="telefono_ultimo">
              </div>
        </div>
        <div id="validardireccion"></div>
        <div class="modal-footer">
              <button   type="button"   onclick="nuevodireccion();" >Nuevo</button>
              <button  type="button"  onclick="editardireccion();" disabled>Actualizar</button>
              <button  type="button"  onclick="guardardireccion();" disabled>Guardar</button>
                <button   type="button" id="salirdireccion" onclick="salirdireccion();"  data-dismiss="modal">salir</button>
        </div>
    </div>
  </div>
</div>

</body>
<script type="text/javascript">
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("t02");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 0; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n+1];
      y = rows[i + 1].getElementsByTagName("TD")[n+1];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
 dragElement(document.getElementById("show_modaldireccion2"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
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
//probando para cargar txt 
/* $('#progra').click(function() {
  let config = {
          headers: {
            'Accept': 'application/json;charset=iso-8859-1'  //or text/json
          }
        }
fetch('programaciones.txt',config) // fetch text file
  .then((resp) => resp.text())
  .then(data => {
    console.log(data.replace(/�/g, 'Ó'));
    const fruitsArray = data.split(/\r?\n/);
  })   
});  */
  
</script>

<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>

<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>


