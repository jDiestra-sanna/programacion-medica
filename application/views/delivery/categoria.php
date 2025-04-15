<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>

  </div>
<?php endif; ?>
 
 
 <style>
.filtrocolumna{
  display:flex;
  flex-direction:column;
  align-items:center;
}
.input_filtrocolumna{
  width:100%;
  text-transform:uppercase
}
.contenido{
  grid-column-start:1;
  grid-column-end:6;
  border: solid 1px;
}
.contenidotabla{
  overflow-x: scroll;
  height:82vh;

}
#tabla1 {
  width:100%;
  border-collapse: initial;
  white-space: nowrap;

}
label{
  margin:0;
}   
.highlight {
     background-color: #1cc88a;
}
#tabla1 #t01{
  position: sticky;
  top:0;
  color: white;
  background-color: #1cc50d; 
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
    z-index: 3;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: scroll;
}  
   
  
  
  .ed-modal-content {
     border-radius: 5px ;
    background: #fff;
    --margin-top: 10vh;;
    --width: 90%;
    --height: 50vh;
     --min-width: 50vw;
     padding: 2px;
    position: absolute;
    left: 50%;
    top:2vh;
    -webkit-transform: translateX(-60%);
    transform: translateX(-60%);
    --overflow-y: scroll;

  }
   
  .ed-modal-container2 {
    background: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: scroll;
  }  
   
  
  
  .ed-modal-content2 {
     border-radius: 5px ;
    background: #fff;
    --margin-top: 10vh;;
    width: 80vw;
    --height: 90vh;
     min-width: 50vw;
     padding: 2px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-55%);

  }   

  .ed-modal-container3 {
    background: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: scroll;
  }  
   
  
  
  .ed-modal-content3 {
     border-radius: 5px ;
    background: #fff;
    --margin-top: 10vh;;
    --width: 80vw;
    --height: 90vh;
     --min-width: 50vw;
     padding: 2px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-55%);

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

.div_cuadro{
  width:13vw;
  height:20vh;
}
.img_cuadro{
  width:100%;
  height:100%;
}
.input_resumen{
  width:7vw; 
}
.input_resumen:read-only {
  background-color: yellow;
}
 </style>
<!-- <div id = "resultado" ></div>
 -->
 
 
<!--<div><label id="resultado"></label></div>--> 
<div id="app" class="contenido">
<div style = " display:grid;grid-template-columns: 0.5fr 2fr 4fr;">
 
   
</div>

<div class ="contenidotabla">
<button type="button" @click="abrirmodalcategoria($event)" id="agregar" class="btn btn-success" >AGREGAR</button>&nbsp;&nbsp;&nbsp;
<button type="button" @click="abrirmodalcategoria($event)" id="editar" class="btn btn-warning" >EDITAR</button>&nbsp;&nbsp;&nbsp;
<!-- <button type="button" @click="eliminarcategoria()" class="btn btn-danger" >ELIMINAR</button>
 --><table  id="tabla1" >
      <thead   id = "t01">
      <tr>
              <!-- <th scope="col"></th> -->
              <tr>
              <td v-for="(id,name) in medicamentosfieldshijo" :key="id"   :vid-id="id"   :vid-name="name">{{ id }}</td>               
 

      </tr>

      </tr>
      </thead>
      <tbody  id="t02">
      <tr v-for="(medicamento,i) in medicamentos" :key="i" @click="selectRow(medicamento)"   :class="{'highlight': (medicamento.id == selectedMed.id)}">

              <td v-for="(id,name) in medicamento" >{{ id }}</td>               

      </tr>
      </tbody>
      <tfoot>
      <!-- Paginate -->
       
      </tfoot>
      <modalcategoria @cerrarmodalcategoria="oncerrarmodalcategoria" v-if="mostrarmodalcategoria" :medicamento="selectedMed" :tdinvoke="tdinvoke"></modalcategoria>

</table>
</div>
 

 
</div>
 
</body>
<script src="/assets/js/vue.global.js"></script>
<script src="/assets/js/axios.min.js"></script>
<script lang="/assets/js/xlsx.full.min.js"></script>

 <script type="text/javascript">
   
var app = {
     
    data() {
        return {
        medicamentos : [],
        medicamentosfieldshijo : [],
        selectedMed: '',
        mostrarmodal: false ,
        mostrarmodalcategoria: false 
        }  
    },
    async created() {
      document.body.style.cursor = 'progress';
      await axios.get('/delivery/get_ecommerce_categoria_fields',{  responseType:'arraybuffer'  }).then(response => {
         
         var enc = new TextDecoder("utf-8");
          var int8view = new Uint8Array(response.data); 
          
             var data1 = enc.decode(int8view);
            // console.log();

            
         this.medicamentosfieldshijo = JSON.parse(data1);
         document.body.style.cursor = 'default';
        
 
       }).catch(e => {
           // Podemos mostrar los errores en la consola
           console.log(e);
           document.body.style.cursor = 'default';
       });
      await axios.get('/delivery/get_ecommerce_categoria',{  responseType:'arraybuffer'  }).then(response => {
       
        var enc = new TextDecoder("UTF-8");
         var int8view = new Uint8Array(response.data); 
     
            var data1 = enc.decode(int8view);
            console.log(data1);
            data1 = data1.slice(3).slice(0,-2) ;
            var myArray = data1.split("},{");
               
            var final  = myArray.map((a)=>JSON.parse('{'+a+'}'));
           
        this.medicamentos = final;
        document.body.style.cursor = 'default';
       

      }).catch(e => {
          // Podemos mostrar los errores en la consola
          console.log(e);
          document.body.style.cursor = 'default';
      });
      
     
    },

    methods: {
      selectRow(medicamento){
        this.selectedMed = medicamento;
        //Do other things
      } ,
      abrirmodalcategoria(td){
          this.mostrarmodalcategoria = true;
           
          this.tdinvoke = td.target;
      },
      eliminarcategoria(){
          var opcion = confirm("Desea eliminar el registro");
          if (opcion == true) {
                
          } else {
            return false;
          }
      },
      oncerrarmodalcategoria( data){
      this.mostrarmodalcategoria = data;
      },
    } 
};


const App = Vue.createApp(app);

App.component('modalcategoria',{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
        <div style="width:40vw;color: white;background:green;display:flex;justify-content:space-between;"><h6>CATEGORIA</h6><button @click="cerrarmodalcategoria()" type="button"  class="btn-xs btn-danger">X</button></div>
        <div style="overflow-y: scroll;height: 50vh;">
            <div style="display:grid;grid-template-columns: 1fr 1fr;">
                        <div><label>ID</label></div> 
                        <div><input id="id" readonly type="text" :value="medicamento.id"></div>
                        <div><label>Descripcion</label></div> 
                        <div><input id="descripcion"   style="text-transform: uppercase;" type="text" :value="medicamento.descripcion" ></div>
                        <div><label for="activo">Activo</label></div> 
                        <div><input id="activo" type="checkbox" :checked="medicamento.activo=='ACTIVO'"></div> 
                <div style="display: flex;justify-content: center;">
                  <div>
                  <button type="submit" @click="guardarcategoria()" class="btn btn-success" >GUARDAR</button>&nbsp;&nbsp;&nbsp;
                  <button type="submit" @click="cerrarmodalcategoria()" class="btn btn-danger" >SALIR</button>
                  </div>
                </div>
            </div>
      </div>
     
      </div>
   </div>

   `,
   props:
    ['medicamento','tdinvoke']
   ,
   data(){
     return{
      imagenesmedicamento:[],
       selectimg:{src:'',des_med:''},
       mostrarmodalimagen:false,
       mostrarmodalseguimiento:false,    
       
       tdinvocado : this.tdinvoke 
     }
   }  

   ,
   methods:{
       cerrarmodalcategoria (){
         this.$emit('cerrarmodalcategoria', false);  
       },
       eliminarhijo(){
            
       },
       async guardarcategoria(){
        //alert(this.tdinvocado.id);
        var opcion = confirm("Desea guardar los cambios.");
        if (opcion == true) {
              
        } else {
           return false;
        }
        var categoria = {
          id:  document.getElementById('id').value,
          descripcion:    document.getElementById('descripcion').value,
          activo:  document.getElementById('activo').checked.toString(),
       
        };

        if ( this.tdinvocado.id == 'editar' ){
          await fetch('/delivery/get_ecommerce_update_categoria/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } ,  
          body: JSON.stringify(
            categoria
          ) 
          }).then(response => response.json())
            .then(function (data) {

              console.log(data);
            }).catch(error => {
              console.log(error);
            }); 
        }else if(this.tdinvocado.id == 'agregar' ){
          await fetch('/delivery/get_ecommerce_insert_categoria/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } ,  
          body: JSON.stringify(
            categoria
          ) 
          }).then(response => response.json())
            .then(function (data) {

              console.log(data);
            }).catch(error => {
              console.log(error);
            }); 

        }

         this.cerrarmodalcategoria();
         location.reload();




       }  
   }
    ,
   async mounted(){
     if ( this.tdinvocado.id == 'editar' ){
        
     }else if(this.tdinvocado.id == 'agregar' ){
         await fetch('/delivery/get_ecommerce_id_last_categoria/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
          }).then(response => response.json())
            .then(function (data) {
               
              document.getElementById('id').value = data;
              document.getElementById('activo').checked = true;
              document.getElementById('descripcion').value = '';

            }).catch(error => {
              console.log(error);
            }); 

      }
    await fetch('/modulo/logged/', {
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
      alert('La sesion ha terminado.');
      window.location.href = `${window.location.protocol + '//' + window.location.host}/login`;

    }


    }).catch(error => {
      console.log(error);
    }); 

/* 
    await fetch('/delivery/get_ecommerce_categoria/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } 
  }).then(response => response.json())
    .then(function (data) {
      var html = '';filacurrent=''; 
      var i;

     document.getElementById('categoria').innerHTML =    data.map(categ => `<option value="${categ.descripcion}">${categ.descripcion}</option>`).join("\n");
 
    }).catch(error => {
      console.log(error);
    });  */
  }
});

 
 App.mount('#app');


</script>
 





