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
#tablahijo {
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
#tablahijo #t01{
  position: sticky;
  top:0;
  color: white;
  background-color: #1cc50d; 
    border: 1px solid black ;
    white-space: nowrap;

}
#tablahijo td{
  border: 1px solid black;

}
#tablahijo #t02{
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
    --margin-top: 10vh;;
    --width: 90%;
    --height: 95vh;
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
<table  id="tablahijo" >
      <thead   id = "t01">
      <tr >
              <!-- <th scope="col"></th> -->
              <tr     >
                          
              <td v-for="(medicamentof,i) in medicamentosfieldshijo"   ><div :style="{ 'background-color': medicamentof.color }" >{{  medicamentof.column_name}}</div></td>               


      </tr>

      </tr>
      </thead>
      <tbody  id="t02">
      <tr v-for="(medicamento,i) in medicamentos" :key="i" @click="selectRow(medicamento)"  @dblclick="abrirmodal();"  :class="{'highlight': (medicamento.sku == selectedMed.sku)}">
              <td >{{ medicamento.sku_padre}}</td> 
              <td >{{ medicamento.sku}}</td>
              <td >{{ medicamento.url1_imagen_sku}}</td>
              <td >{{ medicamento.url2_imagen_sku}}</td>
              <td >{{ medicamento.url3_imagen_sku}}</td>
              <td >{{ medicamento.url4_imagen_sku}}</td>
              <td >{{ medicamento.url5_imagen_sku}}</td>
              <td >{{ medicamento.url6_imagen_sku}}</td>
              <td >{{ medicamento.price}}</td>
              <td >{{ medicamento.sale_price}}</td>
              <td >{{ medicamento.cantidad}}</td>
              <td >{{ medicamento.peso}}</td>
              <td >{{ medicamento.atributo1_titulo}}</td>
              <td >{{ medicamento.atributo1_valor}}</td>
              <td >{{ medicamento.atributo2_titulo}}</td>
              <td >{{ medicamento.atributo2_valor}}</td>
              <td >{{ medicamento.atributo3_titulo}}</td>
              <td >{{ medicamento.atributo3_valor}}</td>
              <td >{{ medicamento.adicional1}}</td> 
           
            <!--    <td >{{ medicamento.item_url}}</td>
              <td >{{ medicamento.item_url2}}</td>
              <td >{{ medicamento.sello_url}}</td>
              <td >{{ medicamento.ubicable}}</td> -->
 

      </tr>
      </tbody>
      <tfoot>
      <!-- Paginate -->
       
      </tfoot>
</table>

</div>
<div style = "display:flex;">
<a class="btn btn btn-success btn-sm" href="#" id="Cmd_filtrar" @click="fnExcelReport()"> <i class="fa fa-file-excel" aria-hidden="true"></i> Exportar</a>
<label style = "font-weight: bold;">Campos obligatorios</label><div style = "width:10vw;background-color:#f7ba00;"></div><label style = "font-weight: bold;">Campos no obligatorios</label><div style = "width:10vw;background-color:#1cc50d;"></div>
<modalmedicamento @cerrarmodal="oncerrarmodal" v-if="mostrarmodal" :medicamento="selectedMed" ></modalmedicamento>

 <div>
</div>
 
</body>
<script src="/assets/js/vue.global.js"></script>
<script src="/assets/js/axios.min.js"></script>
<script lang="javascript" src="/assets/js/xlsx.full.min.js"></script>

 <script type="text/javascript">
   
var app = {
     
    data() {
        return {
        medicamentos : [],
        medicamentosfieldshijo : [],
        selectedMed: '',
        mostrarmodal: false 
       
       
        }  
    },
    async created() {
      document.body.style.cursor = 'progress';
      await axios.get('/delivery/get_ecommerce_tablahijo_fields',{  responseType:'arraybuffer'  }).then(response => {
         
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
      await axios.get('/delivery/get_ecommerce_tablahijo',{  responseType:'arraybuffer'  }).then(response => {
         
        var enc = new TextDecoder("utf-8");
         var int8view = new Uint8Array(response.data); 
         
            var data1 = enc.decode(int8view);
            data1 = data1.slice(3).slice(0,-2) ;
            var myArray = data1.split("},{");
               
            var final  = myArray.map((a)=>JSON.parse('{'+a+'}'));
            console.log(final);
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
      abrirmodal(){
          this.mostrarmodal = true
      },
      oncerrarmodal( data){ 
          this.mostrarmodal = data;
          } , 
      fnExcelReport() {
        console.log($('#tablahijo').html());
            var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
            tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

            tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';

            tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
            tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

            tab_text = tab_text + "<table border='1px'>";
            tab_text = tab_text + $('#tablahijo').html();
            tab_text = tab_text + '</table></body></html>';

            var data_type = 'data:application/vnd.ms-excel';
            
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                if (window.navigator.msSaveBlob) {
                    var blob = new Blob([tab_text], {
                        type: "application/csv;charset=utf-8;"
                    });
                    navigator.msSaveBlob(blob, 'tablahijo.xls');
                }
            } else {
                $('#Cmd_filtrar').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
                $('#Cmd_filtrar').attr('download', 'tablahijo.xls');
            }

      }
    } 
};

const App = Vue.createApp(app);

App.component('modalmedicamento',{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
        <div style="width:60vw;color: white;background:green;display:flex;justify-content:space-between;"><h6> REGISTRO MEDICAMENTOS HIJO [ {{medicamento.sku_padre}} - {{medicamento.sku}} ]</h6><button @click="cerrarmodal()" type="button"  class="btn-xs btn-danger">X</button></div>
        <div style="overflow-y: scroll;height: 90vh;">
            <div style="display:grid;grid-template-columns: 1fr;">
                  <div >(*) CAMPO OBLIGATORIO  </div>
                  <div style="display:grid;grid-template-columns: 1fr ;grid-auto-rows: min-content;padding-top: 2vh;">
                      <div style="display:grid;grid-template-columns: 1fr 1fr;grid-auto-rows: min-content;">
                        <label>(*) SKU PADRE:</label>
                        <div>
                        <input readonly style="width:30vw" type="text" v-model="medicamento.sku_padre" >
                        </div> 
                        <label>(*) SKU:</label>
                        <div>
                        <input readonly style="width:30vw" type="text" v-model="medicamento.sku" >
                        </div> 
                        <label>(*) URL1_IMAGEN_SKU:</label>
                        <div>
                        <input  readonly style="width:30vw" type ="text" v-model="medicamento.url1_imagen_sku">
                        </div>  
                        <label>(*) URL2_IMAGEN_SKU:</label>
                        <div>
                        <input  readonly  style="width:30vw" type="text" v-model="medicamento.url2_imagen_sku" >
                        </div>
                         <label>(*) URL3_IMAGEN_SKU:</label>
                         <div>
                         <input readonly  style="width:30vw" type="text" v-model="medicamento.url3_imagen_sku" >
                         </div>
                         <label>URL4_IMAGEN_SKU:</label>
                         <div>
                         <input  style="width:30vw" type="text" v-model="medicamento.url4_imagen_sku" >
                         </div>
                         <label>URL5_IMAGEN_SKU:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model="medicamento.url5_imagen_sku" >
                         </div>
                         <label>URL6_IMAGEN_SKU:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model="medicamento.url6_imagen_sku" >
                         </div>
                         <label>(*) PRICE:</label>
                        <div>
                        <input    style="width:30vw" type="text" v-model="medicamento.price" > 
                        </div> 
                        <label>(*) SALE_PRICE:</label>
                        <div>
                        <input     style="width:30vw" type="text" v-model="medicamento.sale_price" > 
                        </div>
                         <label>(*) CANTIDAD:</label>
                        <div>
                        <input      style="width:30vw" type="text" v-model="medicamento.cantidad" > 
                        </div> 
                         <label>(*) PESO:</label>
                         <div>
                         <input  disabled   style="width:30vw" type="text" v-model="medicamento.peso" > 
                         </div>
                         <label>ATRIBUTO1_TITULO:</label>
                        <div>
                        <input  readonly   style="width:30vw" type="text" v-model="medicamento.atributo1_titulo" >  
                        </div> 
                         <label>ATRIBUTO1_VALOR:</label>
                         <div>
                         <input  readonly  style="width:30vw" type="text" v-model="medicamento.atributo1_valor" > 
                         </div>
                         <label>ATRIBUTO2_TITULO:</label>
                        <div>
                        <input   style="width:30vw" type="text" v-model="medicamento.atributo2_titulo" > 
                        </div> 
                        <label>ATRIBUTO2_VALOR:</label>
                        <div>
                        <input   style="width:30vw" type="text" v-model="medicamento.atributo2_valor" > 
                        </div>
                         <label>ATRIBUTO3_TITULO:</label>
                        <div>
                        <input   style="width:30vw" type="text" v-model="medicamento.atributo3_titulo" > 
                        </div> 
                         <label>ATRIBUTO3_VALOR:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model="medicamento.atributo3_valor" > 
                         </div>
                        <label>(*) ADICIONAL1:</label>
                        <div>
                        <input   style="width:30vw" type="text" v-model="medicamento.adicional1" >
                        </div>
                         
              
                   

                 
            </div>
            <div style="display: flex;justify-content: center;">

              <div>
              <button type="submit" @click="guardar_medicamentohijo()" class="btn btn-success" >GUARDAR</button>&nbsp;&nbsp;&nbsp;
              <button type="submit" @click="cerrarmodal()" class="btn btn-danger" >SALIR</button>
              </div>
              
            </div>
            
                     
            <modalcategoria @cerrarmodalcategoria="oncerrarmodalcategoria" v-if="mostrarmodalcategoria"  :medicamento="medicamento" :inputinvoke="inputinvoke" ></modalcategoria>
            <modalsubcategoria @cerrarmodalsubcategoria="oncerrarmodalsubcategoria" v-if="mostrarmodalsubcategoria" :medicamento="medicamento" :inputinvoke="inputinvoke" ></modalsubcategoria>

        </div>
      </div>
     

   </div>

   `,
   props:
    ['medicamento']
   ,
   data(){
     return{ 
           
         sku_padre:this.medicamento.sku_padre//,
      // cod_medp:this.medicamento.cod_med 
     }
   } ,
   components:{
 
  }
   ,
   methods:{
      cerrarmodal (){
         this.$emit('cerrarmodal', false);  
      },
      
      oncerrarmodal( data){

      this.mostrarmodal = data;
      },
      
      agregarhijo(){
          
              var presentaciones = [
                {cod_presentacion:'C',descripcion:'CAJA'},
                {cod_presentacion:'B',descripcion:'BLISTER'}

              ]
              var select = document.createElement("select");
              select.id="presentacion";
              //select.name="myname";

              var tr = document.createElement('tr');   
              var td1 = document.createElement('td'); 
              var td2 = document.createElement('td');  
              var td3 = document.createElement("td");
              var td4 = document.createElement("td");

              var button1 = document.createElement("BUTTON");
              var button2 = document.createElement("BUTTON");
              button1.innerHTML = "✓";
              button2.innerHTML = "X";
              for (var i = 0; i < presentaciones.length; i++) { 
                var option = document.createElement("option");
                option.value=presentaciones[i].cod_presentacion;
                var value = document.createTextNode (presentaciones[i].descripcion);
                option.appendChild(value);
                select.appendChild(option);
                
                
              }
              var sku_padre= this.sku_padre;
              button1.onclick = function() { 
                    var sku_padreinner = sku_padre;
                    axios.post('/delivery/guardar_medicamentohijo',{ headers: {
                      'Cache-Control': 'no-cache',
                      'Pragma': 'no-cache',
                      'Expires': '0',
                    }, data: {sku_padre:sku_padreinner,sku:sku_padreinner.trim()+select.value}}).then(response => { 
                        //this.medicamentos = response.data; 
                        console.log(response.data); 
                        alert('Se guardo el medicamentos hijo'); 
                        this.cerrarmodal();
                    }).catch(e => {
                          // Podemos mostrar los errores en la consola
                          console.log(e);
                    })
              };

              button2.onclick = function() { document.getElementById("tbodyhijo").removeChild(button2.parentElement.parentElement);    };
              
              select.onchange = function() {  select.parentElement.nextSibling.innerHTML = select.parentElement.nextSibling.innerHTML.substr(0,9)+select.value; };

              td1.appendChild(select);
              td2.appendChild(document.createTextNode(this.sku_padre.trim()+select.value));
              td3.appendChild(button1);
              td4.appendChild(button2);

              tr.appendChild(td1); 
              tr.appendChild(td2); 
              tr.appendChild(td3); 
              tr.appendChild(td4); 

              document.getElementById('tbodyhijo').appendChild(tr); 
          },
       eliminarhijo(){
            
      },
       async guardar_medicamentohijo(){
 
     
             await axios.post('/delivery/guardar_medicamentohijo2',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },  medicamento:this.medicamento}).then(response => { 
                  //this.medicamentos = response.data; 
                  console.log(response.data); 
                  alert('Se guardo en la tabla  hijo'); 
                  this.cerrarmodal();
              }).catch(e => {
                    // Podemos mostrar los errores en la consola
                    console.log(e);
              })
       }
    ,
   async mounted(){
    // alert(prueba);
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
            if (data=="") { 
            }else{
              alert('La sesion ha terminado.');
              window.location.href = `${window.location.protocol + '//' + window.location.host}/login`;
            } 
        }).catch(error => {
          console.log(error);
        }); 
        
  }
}
});
 
 App.mount('#app');


</script>
 





