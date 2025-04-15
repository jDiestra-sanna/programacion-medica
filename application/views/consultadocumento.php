<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>

 <script src="<?=base_url('assets/js/vue2.js')?>"></script>
 <script src="<?=base_url('assets/js/vue-router.js')?>"></script>
 
 
 <style>
 .prueba{
  grid-column-start:1;
  grid-column-end:5;
 
height: 80vh;
  overflow-x: scroll;
  border: solid 1px;
}
 
#tabla1 {
  width:100%; 
  white-space: nowrap;

}
#tabla1 #t01 tr:nth-child(even) {
  background-color: #eee;
}
#tabla1 #t01 tr:nth-child(odd) {
 background-color: #fff;
}
#tabla1 #t01 th {
  color: white;
  background-color: green; 
    border: 1px solid black ;
}
#tabla1 td {
  border: 1px solid black;
}

table#t02{
  width:100%;
}
 fieldset {
  position: relative;
  border:1px solid;
}
legend {
  font-size: 1em;
  font-weight: bold;
}
.legend2 {
  display:table;
  position: absolute;
  top: -0.1em;
  right: 20px;
  --background: yellow;
 }
 #show_modaldireccion2 {
  position: absolute;
  --z-index: 9;
  --background-color: #f1f1f1;
  --text-align: center;
  border: 1px solid #d3d3d3;
}

#show_modaldireccion2header {
  padding: 10px;
  cursor: move;
  --z-index: 10;
  --background-color: #2196F3;
  color: #fff;
}



 </style>
 

  <div>
Serie
<input type="text" id="serie" name="serie" value=""> 
 <br> 
Numero
<input type="text" id="numero" name="numero"  value=""> 
<br>
  
 <input type="button"  class="btn btn btn-warning btn-sm"  id="consultardocumento" name="consultardocumento" onclick = "consultardocumento();"  value="Consultar"    >  
 
</div>
 
</body>
 <script type="text/javascript">
   var cod_prov_motorizado_b='<?php echo $this->session->userdata('proveedor');?>';   
   

</script>
<script lang="javascript" src="<?=base_url('assets/js/xlsx.full.min.js');?>"></script>

<script lang="javascript" src="<?=base_url('assets/js/FileSaver.min.js');?>"></script>





