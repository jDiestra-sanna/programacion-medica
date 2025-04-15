<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
 
 <style>
  
.prueba{
  grid-column-start:1;
  grid-column-end:6;
 
height:78vh;
  overflow-x: scroll;
  border: solid 1px;
}
#tabla1 {
  width:100%;
  border-collapse: initial;
  white-space: nowrap;

}
     
#tabla1 #t02 tr.selected {
    background-color: turquoise;
    --color: #fff;    
} 

#tabla1 #t01 th{
  position: sticky;
  top:0;
  color: white;
  background-color: #1cc88a; 
    border: 1px solid black ;
    white-space: nowrap;

}
#tabla1 td{
  border: 1px solid black;

}
#tabla1 #t02{
  width:100%;
  color:black;

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
    background: rgba(0,0,0,0.7);
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
   
  .naranja{
   background-color: #ff8000;
  }
  .rojo{
    background-color: #ff0000;
  }
  .morado{
    background-color: #EA90FC;
  }
  .oro{
    background-color: #f7ba00;
  }
  .rosa{
    background-color: #bbc6;
  }
  #table_seguimiento ,#table_seguimiento td, #table_seguimiento th {
  border: 1px solid black;
}
#filtro1{
  grid-column-start:1;
  grid-column-end:4;
  border:2px solid ;
}
#filtro2{
  grid-column-start:3;
  grid-column-end:5;
  border:2px solid ;
}
#procesos{
  grid-column-start:1;
  grid-column-end:6;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;  
}
 
@import url("https://fonts.googleapis.com/css?family=Hind+Madurai:300,600|Poppins:300&display=swap");

:root {
    --yellow: #ffd049;
    --light-yellow: #fdf2d2;
    --orange: #ffa929;
    --light-gray: #e3e4e8;
    --gray: #71738b;
    --light-blue: #7a7c93;
    --blue: #34385a;

    --slider-handle-size: 14px;
    --slider-handle-border-radius: 2px;
    --slider-handle-margin-top: -4px;
    --slider-track-height: 6px;
    --slider-track-border-radius: 4px;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0 auto;
}
 

#sliderContainer {
    width: 100%;
    --max-width: 440px;

    padding: 0px 3vw;

    border-radius: 40px;

    --box-shadow: 0px 8px 40px rgba(128, 128, 128, 0.15);
}

#sliderContainer>div:first-child {
    --margin-bottom: 48px;
}

.tick-slider-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
}

.tick-slider-header>h5 {
    margin: 0;

    font-family: "Poppins", sans-serif;
    font-size: 18px;
    font-weight: 300;
    color: var(--gray);
}

.tick-slider {
    position: relative;

    width: 100%;
}

.tick-slider-value-container {
    position: relative;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

 

    font-family: "Hind Madurai", sans-serif;
    font-size: 12px;
    color: var(--gray);
}

.tick-slider-value {
    position: absolute;
    top: 0;

    font-weight: bold;

    color: var(--blue);

    border-radius: var(--slider-handle-border-radius);
}

.tick-slider-value>div {
    animation: bulge 0.3s ease-out;
}

.tick-slider-background,
.tick-slider-progress,
.tick-slider-tick-container {
    position: absolute;
    bottom: 5px;
    left: 0;

    height: var(--slider-track-height);

    pointer-events: none;

    border-radius: var(--slider-track-border-radius);

    z-index: -1;
}

.tick-slider-background {
    width: 100%;
    background-color: var(--light-gray);
}

.tick-slider-progress {
    background-color: var(--yellow);
}

.tick-slider-tick-container {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 calc(var(--slider-handle-size) / 2);
}

.tick-slider-tick {
    width: 2px;
    height: 2px;

    border-radius: 50%;

    background-color: white;
}

.tick-slider-label {
    opacity: 0.85;
    transition: opacity 0.1s ease;
}

.tick-slider-label.hidden {
    opacity: 0;
}

@keyframes bulge {
    0% {
        transform: scale(1);
    }

    25% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

/*

    REMOVE SLIDER STYLE DEFAULTS

*/
input[type="range"] {
    -webkit-appearance: none;

    width: 100%;
    height: 100%;

    background: transparent;
    outline: none;

    margin: 5px 0;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;

    border: none;
}

input[type="range"]:focus {
    outline: none;
}

input[type="range"]::-moz-focus-outer {
    border: 0;
}

/*

    HANDLE

*/
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;

    width: var(--slider-handle-size);
    height: var(--slider-handle-size);

    background: var(--orange);

    border-radius: var(--slider-handle-border-radius);

    cursor: pointer;

    margin-top: var(--slider-handle-margin-top);
  
    -webkit-transform: scale(1);
    transform: scale(1);

    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

input[type="range"]:hover::-webkit-slider-thumb,
input[type="range"]:focus::-webkit-slider-thumb {
    transform: scale(1.2);
}

input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;

    width: var(--slider-handle-size);
    height: var(--slider-handle-size);

    background: var(--orange);

    border: none;
    border-radius: var(--slider-handle-border-radius);

    cursor: pointer;

    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

input[type="range"]:hover::-moz-range-thumb,
input[type="range"]:focus::-moz-range-thumb {
    transform: scale(1.2);
}

/*

    TRACK

*/

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--slider-track-height);

    cursor: pointer;

    background: none;

    border-radius: var(--slider-track-border-radius);
}

input[type="range"]::-moz-range-track {
    width: 100%;
    height: var(--slider-track-height);

    cursor: pointer;

    background: none;

    border-radius: var(--slider-track-border-radius);
}

input[type="range"]:focus::-webkit-slider-runnable-track {
    background: none;
}
input[type="range"]:active::-webkit-slider-runnable-track {
    background: none;
}

.contenedor-bloques{
  display:flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 1300px;

}

.bloque{
  width:10px;
  height:10px;
}

.bloque-rosa{
  background-color:#bbc6;
}

.bloque-oro{
  background-color:#f7ba00;
}

.nombre{
  margin: 0 10px;
  font-weight:bold;

}

 </style>
<!-- <div id = "resultado" ></div>
 -->
 <div id ="filtro1"  >
    
      <label>Busqueda por:</label>
      <select style="width:20%;" id="cbo_opcion"  > 
          
             <option value='0'>DNI</option>
            <option value='1'>PACIENTE</option>
            <option value='2'>ATENCION</option>

      </select>
            
      
      <input  type ="text" id="txt_busqueda" name="txt_busqueda" value="" >
    
</div>



     
<div>
<select style="width:30%;" id="cbo_unegocio"  > 
            <option value='{"clasif":"24","negocio":"AMB"}'>AUTO COVID</option>
            <option value='{"clasif":"110","negocio":"MAD"}'>MAD COVID</option>
 
            <option value='{"clasif":"0","negocio":"MAD"}'>AGUDO</option>
            <option value='{"clasif":"3","negocio":"MAD"}'>ESPECIALISTA</option>
            <option value='{"clasif":"1,2","negocio":"CRO"}'>CRONICOS</option>
            <option value='{"clasif":"20","negocio":"AMB"}'>AMBULANCIA</option>
            <option value='{"clasif":"25","negocio":"AMB"}'>AUTO AMBULANCIA COVID</option>
            <option selected value='{"clasif":"0,1,2,3,20,25,24,110","negocio":"AMB"}'>TODOS</option>


      </select>
      <select style="width:30%;" id="estado"  name="estado"> 
             <option value='0'>PENDIENTE</option>
            <option value='1'>FINALIZADA</option> 
      </select>
      <select style="width:30%;" id="tipoencuesta"  name="tipoencuesta"> 
            <option value='A'>ABDOMINAL</option>
            <option value='R'>RESPIRATORIO</option> 
      </select>
      <?=form_dropdown('Dcbo_especialista',utf8_converter(get_combo_query( "(select distinct c.cod_esp, c.nom_esp from m_doctores a inner join m_espcxdoctor b on a.cod_doc = b.cod_doc 
                                                                                inner join m_especialidades c on b.cod_esp = c.cod_esp where a.activi = true and c.cod_esp not in ('010', '006', '005') 
                                                                                union select 'XXX', 'TODOS' from m_especialidades ) ",'cod_esp','nom_esp' ,array("Seleccione"))),"0",array( 'style'=>"width:40%;display:none",'id'=>"Dcbo_especialista"))?>

</div>
<div>
<input  type="date" id="fec_inicial" name="fec_inicial" style="width:140px" value="<?php  echo date("Y-m-d")?>">
<input  type="date" id="fec_final" name="fec_final" style="width:140px" value="<?php  echo date("Y-m-d")?>">


<button class="btn btn btn-primary btn-sm"  id="Cmd_filtrar" name="Cmd_filtrar"  onclick="Cmd_filtrar_Click();"> <i class="fa fa-search" aria-hidden="true"></i> Busqueda </button>
</div>

<div class="contenedor-bloques">
<div class="bloque bloque-rosa"></div>
<span class="nombre">Vencidos</span>
<div class="bloque bloque-oro"></div>
<span class="nombre">Recientes</span>
</div>
<label  id = "Frame1" style="margin-bottom:0px;grid-column:1/3;padding:0;color:blue">Consultas Medicas pendientes: </label>

 
<div class="prueba">

<table  id="tabla1" >
      <thead   id = "t01">
      <tr >
              <!-- <th scope="col"></th> -->
              <th scope="col">FICHA</th>
              <th scope="col">COD_ATE</th>
              <th scope="col">CLASIF</th>
              <th scope="col">DISTRITO</th>
              <th scope="col">FEC_ATE</th>
              <th scope="col">PACIENTE</th>
              <th scope="col">ESPECIALIDAD</th>
              <th scope="col">ESTADO</th>
              <th scope="col">EDAD</th> 
              <th scope="col">USUARIO DE REGISTRO</th>
              <th scope="col">PATOLOGIA</th> 
              <th scope="col">DOCTOR</th>
              <th scope="col">GRUPO</th>
              <th scope="col">EMPRESA</th>
              <th scope="col">HR.LLA</th>
              <th scope="col">FEC.LLA</th>
              <th scope="col">HR.ATE</th>
              <th scope="col">HR.DR</th>
              <th scope="col">HR.DR.LLEGO</th>
              <th scope="col">HORA.FIN.ATE</th> 
          <!---    <th scope="col">DESCRIPCION ESTADO</th> -->
              <th style="display:none" scope="col">CLASIF_UNIDAD</th> 


      </tr>
      </thead>
      <tbody  id="t02">

      </tbody>
      <tfoot>
      <!-- Paginate -->
       
      </tfoot>
</table>     
</div>
 
<div id="procesos">

<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_encuesta" name="Cmd_encuesta"  onclick ="Cmd_encuesta_Click();" value="Realizar encuesta"  > 
<input type="button"  class="btn btn btn-success btn-sm"  id="Cmd_culmi" name="Cmd_culmi"  onclick ="Cmd_culmi_Click();" value="Detalles de culminacion"  > 
<div></div><div></div>

<div></div> 
 

</div>
</body>
<script type="text/javascript"> 
 

                         
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


<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>
<script lang="javascript" src="/assets/js/FileSaver.min.js"></script>



