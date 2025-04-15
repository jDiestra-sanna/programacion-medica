<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
 
 <style>
.prueba{
  grid-column-start:1;
  grid-column-end:6;
  

height:85vh;
  overflow-x: scroll;
  border: solid 1px;
}
#tabla1 {
  width:100%;
  border-collapse: initial;
  white-space: nowrap;

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
  grid-column-end:5;
  border:2px solid ;
}
#procesos{
  grid-column-start:1;
  grid-column-end:6;
  --border:2px solid ;
}
 
 
 </style>
<!-- <div id = "resultado" ></div>
 -->
 
 
<!--<div><label id="resultado"></label></div>--> 
<button class="btn btn btn-success btn-sm"  id="CmdNuevodiag" name="CmdNuevodiag" onclick="CmdNuevodiag_Click();" > <i class="fa fa-plus" aria-hidden="true"></i> Nuevo </button>

<button class="btn btn btn-primary btn-sm"  id="CmdFiltrardiag" name="CmdFiltrardiag" onclick="CmdFiltrardiag_Click();" > <i class="fa fa-search" aria-hidden="true"></i> Busqueda </button>
<input style="grid-column:3/5" type="text" id="txtbusqueda" name="txtbusqueda" >
  
<div class="prueba">

<table  id="tabla1" >
      <thead   id = "t01">
      <tr >
              <!-- <th scope="col"></th> -->
              <th scope="col">CODIGO</th>
              <th scope="col">DIAGNOSTICO</th>
              <th scope="col">ACTIVO</th>
   


      </tr>
      </thead>
      <tbody  id="t02">

      </tbody>
      <tfoot>
      <!-- Paginate -->
       
      </tfoot>
</table>     
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
 


