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
#tablapadre {
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
#tablapadre #t01{
  position: sticky;
  top:0;
  color: white;
  background-color: #1cc50d; 
    border: 1px solid black ;
    white-space: nowrap;

}
#tablapadre td{
  border: 1px solid black;

}
#tablapadre #t02{
  width:100%;
  color:black;
  --border-collapse: collapse;
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
<table  id="tablapadre" >
      <thead   id = "t01">
      <tr >
              <!-- <th scope="col"></th> -->
              <tr     >
              <td v-for="(medicamentof,i) in medicamentosfieldspadre"   ><div :style="{ 'background-color': medicamentof.color }" >{{  medicamentof.column_name}}</div></td>               
 

      </tr>

      </tr>
      </thead>
      <tbody  id="t02">
      <tr v-for="(medicamento,i) in medicamentos" :key="i" @click="selectRow(medicamento)"  @dblclick="abrirmodal();"  :class="{'highlight': (medicamento.sku_padre == selectedMed.sku_padre)}">
              <td >{{ medicamento.sku_padre}}</td>
               
              <td></td>
              <td>{{ medicamento.item_title}}</td>
              <td>{{medicamento.item_url}}</td>
              <td>{{medicamento.item_url2}}</td>    
              <td >{{medicamento.ubicable}}</td> <!-- contenteditable='true' -->
              <td >{{medicamento.descrip_corta}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.item_rlvn_ordr}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.categoria1}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.subcategoria1}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.categoria2}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.subcategoria2}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.categoria3}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.subcategoria3}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.categoria4}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.subcategoria4}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.categoria5}}</td><!-- @click="abrirmodalcategoria($event);" -->
              <td >{{medicamento.subcategoria5}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo1_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo1_valor}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo2_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo2_valor}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo3_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo3_valor}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo4_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo4_valor}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo5_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.atributo5_valor}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.tags_busqueda}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.tags_promociones}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.tags_widget}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion1_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion1_detalle}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion2_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion2_detalle}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion3_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion3_detalle}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion4_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion4_detalle}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion5_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.descripcion5_detalle}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.seo_titulo}}</td><!-- contenteditable='true' -->
              <td >{{medicamento.seo_palabras_claves}}</td><!-- contenteditable='true' -->  
              <td >{{medicamento.seo_descripcion}}</td><!-- contenteditable='true' -->

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
<label style = "font-weight: bold;">Campos obligatorios</label><div style = "width:10vw;background-color:#f7ba00;"></div><label style = "font-weight: bold;">Campos no obligatorios</label><div style = "width:10vw;background-color:#1cc50d;"></div></div>
<modalmedicamento @cerrarmodal="oncerrarmodal" v-if="mostrarmodal" :medicamento="selectedMed" ></modalmedicamento>


 
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
        medicamentosfieldspadre : [],
        selectedMed: '',
        mostrarmodal: false ,
        //mostrarmodalcategoria: false ,
        mostrarmodalsubcategoria: false ,
        tdinvoke:null
        }  
    },
    async created() {
      document.body.style.cursor = 'progress';
      await axios.get('/delivery/get_ecommerce_tablapadre_fields',{  responseType:'arraybuffer'  }).then(response => {
         
         var enc = new TextDecoder("utf-8");
         var int8view = new Uint8Array(response.data); 
          
             var data1 = enc.decode(int8view);
             console.log();

         this.medicamentosfieldspadre = JSON.parse(data1);
       }).catch(e => {
           // Podemos mostrar los errores en la consola
           console.log(e);
           document.body.style.cursor = 'default';
       });
      await axios.get('/delivery/get_ecommerce_tablapadre').then(response => {
         
    
        this.medicamentos = response.data;
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
            var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
            tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

            tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';

            tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
            tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

            tab_text = tab_text + "<table border='1px'>";
            tab_text = tab_text + $('#tablapadre').html();
            tab_text = tab_text + '</table></body></html>';

            var data_type = 'data:application/vnd.ms-excel';
            
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                if (window.navigator.msSaveBlob) {
                    var blob = new Blob([tab_text], {
                        type: "application/csv;charset=utf-8;"
                    });
                    navigator.msSaveBlob(blob, 'tablapadre.xls');
                }
            } else {
                $('#Cmd_filtrar').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
                $('#Cmd_filtrar').attr('download', 'tablapadre.xls');
            }

      }
    } 
};

const App = Vue.createApp(app);

 
App.component('modalmedicamento',{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
        <div style="width:60vw;color: white;background:green;display:flex;justify-content:space-between;"><h6> REGISTRO MEDICAMENTOS PADRE [ {{medicamento.sku_padre}} ]</h6><button @click="cerrarmodal()" type="button"  class="btn-xs btn-danger">X</button></div>
        <div style="overflow-y: scroll;height: 90vh;">
            <div style="display:grid;grid-template-columns: 1fr;">
                  <div >(*) CAMPO OBLIGATORIO  </div>
                  <div style="display:grid;grid-template-columns: 1fr ;grid-auto-rows: min-content;padding-top: 2vh;">
                      <div style="display:grid;grid-template-columns: 1fr 1fr;grid-auto-rows: min-content;">
                        <label>(*) SKU PADRE:</label>
                        <div>
                        <input readonly style="width:30vw" type="text" v-model.lazy="medicamento.sku_padre" >
                        </div>
                       
                        <label>MARKETPLACE_ID:</label>
                        <div>
                        <input  style="width:30vw" type="text" v-model.lazy="medicamento.marketplace_id" >
                        </div>
                       
                        <label>(*) ITEM TITLE:</label>
                        <div>
                        <input readonly style="width:30vw" type ="text" v-model.lazy="medicamento.item_title">
                        </div> 
                       
                        <label>(*) ITEM_URL:</label>
                        <div>
                        <input readonly style="width:30vw" type="text" v-model.lazy="medicamento.item_url" >
                        </div>
                         <label>(*) ITEM_URL2:</label>
                         <div>
                         <input readonly style="width:30vw" type="text" v-model.lazy="medicamento.item_url2" >
                         </div>
                         <label>(*) UBICABLE:</label>
                         <div>
                         <input readonly style="width:30vw" type="text" v-model.lazy="medicamento.ubicable" >
                         </div>
                         <label>(*) DESCRIP_CORTA:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.descrip_corta" >
                         </div>
                         <label>ITEM_RLVN_ORDR:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.item_rlvn_ordr" >
                         </div>
                         <label>(*) CATEGORIA1:</label>
                        <div>
                        <input id="categoria1" disabled style="width:25vw" type="text" v-model.lazy="medicamento.categoria1" >
                        <button @click="abrirmodalcategoria('categoria1');" type="button"  class="btn-xs btn-warning">...</button>
                        <input id="categoria1hidden"    type="hidden"  >
                        </div> 
                        <label>(*) SUBCATEGORIA1:</label>
                        <div>
                        <input id="subcategoria1"  disabled style="width:25vw" type="text" v-model.lazy="medicamento.subcategoria1" >
                        <button @click="abrirmodalsubcategoria('subcategoria1');" type="button"  class="btn-xs btn-warning">...</button>
                        </div>
                        <label>(*) CATEGORIA2:</label>
                        <div>
                        <input id="categoria2"  disabled style="width:25vw" type="text" v-model.lazy="medicamento.categoria2" >
                        <button @click="abrirmodalcategoria('categoria2');" type="button"  class="btn-xs btn-warning">...</button>
                        <input id="categoria2hidden"    type="hidden"  >
                        </div> 
                         <label>(*) SUBCATEGORIA2:</label>
                         <div>
                         <input id="subcategoria2"  disabled style="width:25vw" type="text" v-model.lazy="medicamento.subcategoria2" >
                         <button @click="abrirmodalsubcategoria('subcategoria2');" type="button"  class="btn-xs btn-warning">...</button>
                         </div>
                         <label>(*) CATEGORIA3:</label>
                        <div>
                        <input id="categoria3" disabled style="width:25vw" type="text" v-model.lazy="medicamento.categoria3" >
                        <button @click="abrirmodalcategoria('categoria3');" type="button"  class="btn-xs btn-warning">...</button>
                        <input id="categoria3hidden"    type="hidden"  >
                        </div> 
                         <label>(*) SUBCATEGORIA3:</label>
                         <div>
                         <input id="subcategoria3" disabled style="width:25vw" type="text" v-model.lazy="medicamento.subcategoria3" >
                         <button @click="abrirmodalsubcategoria('subcategoria3');" type="button"  class="btn-xs btn-warning">...</button>
                         </div>
                         <label>(*) CATEGORIA4:</label>
                        <div>
                        <input disabled style="width:25vw" type="text" v-model.lazy="medicamento.categoria4" >
                        <button @click="abrirmodalcategoria('categoria4');" type="button"  class="btn-xs btn-warning">...</button>
                        <input id="categoria4hidden"    type="hidden"  >
                        </div> 
                        <label>(*) SUBCATEGORIA4:</label>
                        <div>
                        <input disabled style="width:25vw" type="text" v-model.lazy="medicamento.subcategoria4" >
                        <button @click="abrirmodalsubcategoria('subcategoria4');" type="button"  class="btn-xs btn-warning">...</button>
                        </div>
                         <label>(*) CATEGORIA5:</label>
                        <div>
                        <input disabled style="width:25vw" type="text" v-model.lazy="medicamento.categoria5" >
                        <button @click="abrirmodalcategoria('categoria5');" type="button"  class="btn-xs btn-warning">...</button>
                        <input id="categoria5hidden"    type="hidden"  >
                        </div> 
                         <label>(*) SUBCATEGORIA5:</label>
                         <div>
                         <input disabled style="width:25vw" type="text" v-model.lazy="medicamento.subcategoria5" >
                         <button @click="abrirmodalsubcategoria('subcategoria5');" type="button"  class="btn-xs btn-warning">...</button>
                         </div>
                        <label>ATRIBUTO1_TITULO:</label>
                        <div>
                        <input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo1_titulo" >
                        </div>
                         <label>ATRIBUTO1_VALOR:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo1_valor" >
                         </div>
                         <label>ATRIBUTO2_TITULO:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo2_titulo" >
                         </div>
                         <label>ATRIBUTO2_VALOR:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo2_valor" >
                         </div>
                         <label>ATRIBUTO3_TITULO:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo3_titulo" >
                         </div>
                         <label>ATRIBUTO3_VALOR:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo3_valor" >
                         </div>
                         <label>ATRIBUTO4_TITULO:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo4_titulo" >
                      </div>
                         <label>ATRIBUTO4_VALOR:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo4_valor" >
                      </div>
                         <label>ATRIBUTO5_TITULO:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo5_titulo" >
                      </div>
                         <label>ATRIBUTO5_VALOR:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.atributo5_valor" >
                      </div>
                         <label>(*) TAGS_BUSQUEDA:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.tags_busqueda" >
                      </div>
                         <label>TAGS_PROMOCIONES:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.tags_promociones" >
                      </div>
                         <label>TAGS_WIDGET:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.tags_widget" >
                      </div>
                         <label>(*) DESCRIPCION1_TITULO:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion1_titulo" >
                      </div>
                         <label>(*) DESCRIPCION1_DETALLE:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion1_detalle" >
                      </div>
                         <label>(*) DESCRIPCION2_TITULO:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion2_titulo" >
                      </div>
                         <label>(*) DESCRIPCION2_DETALLE:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion2_detalle" >
                      </div>
                         <label>DESCRIPCION3_TITULO:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion3_titulo" >
                      </div>
                         <label>DESCRIPCION3_DETALLE:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion3_detalle" >
                      </div>
                         <label>DESCRIPCION4_TITULO:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion4_titulo" >
                      </div>
                         <label>DESCRIPCION4_DETALLE:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion4_detalle" >
                      </div>
                         <label>DESCRIPCION5_TITULO:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion5_titulo" >
                      </div>
                         <label>DESCRIPCION5_DETALLE:</label>
                         <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.descripcion5_detalle" >
                      </div>
                          <label>(*) SEO_TITULO:</label>
                          <div><input   style="width:30vw" type="text" v-model.lazy="medicamento.seo_titulo" >
                      </div> 
                         <label>(*) SEO_PALABRAS_CLAVES:</label>
                         <div>
                         <input   style="width:30vw" type="text" v-model.lazy="medicamento.seo_palabras_claves" >
                       </div>
                         <label>(*) SEO_DESCRIPCION:</label><div><input   style="width:30vw" type="text" v-model.lazy="medicamento.seo_descripcion" >
                      </div> 
              
                   

                 
            </div>
            <div style="display: flex;justify-content: center;">

              <div>
              <button type="submit" @click="guardar_medicamentopadre()" class="btn btn-success" >GUARDAR</button>&nbsp;&nbsp;&nbsp;
              <button type="submit" @click="cerrarmodal()" class="btn btn-danger" >SALIR</button>
              </div>
              
            </div>
            <div style = "border:5px solid black;">
                        <div style="display: flex;justify-content: end;">
                            <button type="button" @click="agregarhijo()" class="btn btn-success" >AGREGAR</button>&nbsp;&nbsp;&nbsp;
                          <button type="button" @click="eliminarhijo()" class="btn btn-danger" >ELIMINAR</button> 
                        </div>
                        <div>
                        <table id="tablahijoxpresentacion" style="width=100%" border = 1 >
                            <thead>
                              <tr>
                                <th>Presentacion</th>  
                                <th>SKU Hijo</th>  
                              </tr>
                            </thead>
                            <tbody id="tbodyhijo">
                              
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div style="display:flex;justify-content: flex-end;">
                        <div style="display: flex;flex-direction: column;">
                        
                        </div>
                    </div>
            <modalcategoria @cerrarmodalcategoria="oncerrarmodalcategoria" v-if="mostrarmodalcategoria"  :medicamento="medicamento" :inputinvoke="inputinvoke" ></modalcategoria>
            <modalsubcategoria @cerrarmodalsubcategoria="oncerrarmodalsubcategoria" v-if="mostrarmodalsubcategoria" :medicamento="medicamento" :inputinvoke="inputinvoke" :idcategoria="idcategoria" ></modalsubcategoria>

        </div>
      </div>
     

   </div>

   `,
   props:
    ['medicamento']
   ,
   data(){
     return{ 
         mostrarmodalcategoria: false ,
         mostrarmodalsubcategoria: false , 
         sku_padre:this.medicamento.sku_padre//,
      // cod_medp:this.medicamento.cod_med 
     }
   } ,
   components:{

          'modalcategoria':{
            template: 
            `<div class="ed-modal-container">
                <div class="ed-modal-content">
                  <div style="width:40vw;color: white;background:green;display:flex;justify-content:space-between;"><h6>CATEGORIA</h6><button @click="cerrarmodalcategoria()" type="button"  class="btn-xs btn-danger">X</button></div>
                  <div style="overflow-y: scroll;height: 50vh;">
                      <div style="display:grid;grid-template-columns: 1fr;">
                                  <div>
                                    <select id="categoria" >
                                        
                                    </select>
                                  </div> 
                    
                          <div style="display: flex;justify-content: center;">
                            <div>
                            <button type="submit" @click="seleccionarcategoria()" class="btn btn-success" >GUARDAR</button>&nbsp;&nbsp;&nbsp;
                            <button type="submit" @click="cerrarmodalcategoria()" class="btn btn-danger" >SALIR</button>
                            </div>
                          </div>
                      </div>
                </div>
              
                </div>
            </div>

            `,
            props:
              ['medicamento','inputinvoke']
            ,
            data(){
              return{  
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
                seleccionarcategoria(){
                   
                  if (this.inputinvoke=='categoria1'){
                    this.medicamento.categoria1 =  document.getElementById('categoria').selectedOptions[0].text; 
                    document.getElementById('categoria1hidden').value = document.getElementById('categoria').value;
                  }else if(this.inputinvoke=='categoria2'){
                    this.medicamento.categoria2 =  document.getElementById('categoria').selectedOptions[0].text; 
                    document.getElementById('categoria2hidden').value = document.getElementById('categoria').value;
                  }else if(this.inputinvoke=='categoria3'){
                    this.medicamento.categoria3 =   document.getElementById('categoria').selectedOptions[0].text; 
                    document.getElementById('categoria3hidden').value = document.getElementById('categoria').value;
                  }else if(this.inputinvoke=='categoria4'){
                    this.medicamento.categoria4 =   document.getElementById('categoria').selectedOptions[0].text; 
                    document.getElementById('categoria4hidden').value = document.getElementById('categoria').value;
                  }else if(this.inputinvoke=='categoria5'){
                    this.medicamento.categoria5 =  document.getElementById('categoria').selectedOptions[0].text; 
                    document.getElementById('categoria5hidden').value = document.getElementById('categoria').value;
                  }
                  this.cerrarmodalcategoria();
                }  
            },
            async mounted(){
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

              document.getElementById('categoria').innerHTML =    data.map(categ => `<option value="${categ.id}">${categ.descripcion}</option>`).join("\n");
          
              }).catch(error => {
                console.log(error);
              }); 
            } 
       
    },
    

 'modalsubcategoria':{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
        <div style="width:40vw;color: white;background:green;display:flex;justify-content:space-between;"><h6>SUBCATEGORIA</h6><button @click="cerrarmodalsubcategoria()" type="button"  class="btn-xs btn-danger">X</button></div>
        <div style="overflow-y: scroll;height: 50vh;">
            <div style="display:grid;grid-template-columns: 1fr;">
                        <div>
                          <select id="subcategoria" >
                               
                          </select>
                        </div> 
          
                <div style="display: flex;justify-content: center;">
                  <div>
                  <button type="submit" @click="seleccionarsubcategoria()" class="btn btn-success" >GUARDAR</button>&nbsp;&nbsp;&nbsp;
                  <button type="submit" @click="cerrarmodalsubcategoria()" class="btn btn-danger" >SALIR</button>
                  </div>
                </div>
            </div>
      </div>
     
      </div>
   </div>
   `,
   props:
    ['medicamento','inputinvoke','idcategoria']
   ,
   data(){
     return{ 
      sku_padre:this.medicamento.sku_padre,
       tdinvocado : this.inputinvoke 
     }
   }  

   ,
   methods:{
       cerrarmodalsubcategoria (){
         this.$emit('cerrarmodalsubcategoria', false);  
       },
       eliminarhijo(){
            
       },
       seleccionarsubcategoria(){
                   if (this.inputinvoke=='subcategoria1'){
                    this.medicamento.subcategoria1 =  document.getElementById('subcategoria').value;
                  }else if(this.inputinvoke=='subcategoria2'){
                    this.medicamento.subcategoria2 =  document.getElementById('subcategoria').value;
                  }else if(this.inputinvoke=='subcategoria3'){
                    this.medicamento.subcategoria3 =  document.getElementById('subcategoria').value;
                  }else if(this.inputinvoke=='subcategoria4'){
                    this.medicamento.subcategoria4 =  document.getElementById('subcategoria').value;
                  }else if(this.inputinvoke=='subcategoria5'){
                    this.medicamento.subcategoria5 =  document.getElementById('subcategoria').value;
                  }
         this.cerrarmodalsubcategoria();
       }  
   }
    ,
        async mounted(){
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


          await fetch('/delivery/get_ecommerce_subcategoriaxidcategoria/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idcategoria: this.idcategoria
          })
        }).then(response => response.json())
          .then(function (data) {
            var html = '';filacurrent=''; 
            var i;

          document.getElementById('subcategoria').innerHTML =    data.map(categ => `<option value="${categ.descripcion}">${categ.descripcion}</option>`).join("\n");
      
          }).catch(error => {
            console.log(error);
          }); 
        
        }
  }
  }
   ,
   methods:{
      cerrarmodal (){
         this.$emit('cerrarmodal', false);  
      },
      abrirmodalcategoria(input){
          this.mostrarmodalcategoria = true; 
          this.inputinvoke = input;
      },
      abrirmodalsubcategoria(input){
          this.mostrarmodalsubcategoria = true;
          this.inputinvoke = input;
          if(input=='subcategoria1'){
           this.idcategoria = document.getElementById('categoria1hidden').value;
          }else if(input=='subcategoria2'){
           this.idcategoria = document.getElementById('categoria2hidden').value;
          }else if(input=='subcategoria3'){
           this.idcategoria = document.getElementById('categoria3hidden').value;
          }else if(input=='subcategoria4'){
           this.idcategoria = document.getElementById('categoria4hidden').value;
          }else if(input=='subcategoria5'){
           this.idcategoria = document.getElementById('categoria5hidden').value;
          }
      },
      oncerrarmodal( data){

      this.mostrarmodal = data;
      },
      oncerrarmodalcategoria( data){
      this.mostrarmodalcategoria = data;
      },
      oncerrarmodalsubcategoria( data){ 
      this.mostrarmodalsubcategoria = data;
      },
      agregarhijo(){
          
              var presentaciones = [
                {cod_presentacion:'B',descripcion:'BLISTER'},
                {cod_presentacion:'C',descripcion:'CAJA'}

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
              
              select.onchange = function() {  select.parentElement.nextSibling.innerHTML = select.parentElement.nextSibling.innerHTML.substr(0,11)+select.value; };

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
       async guardar_medicamentopadre(){
 
        console.log(this.medicamento); 
             await axios.post('/delivery/guardar_medicamentopadre',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },  medicamento:this.medicamento}).then(response => { 
                  //this.medicamentos = response.data; 
                  console.log(response.data); 
                  alert('Se guardo en la tabla  padre'); 
                  this.cerrarmodal();
              }).catch(e => {
                    // Podemos mostrar los errores en la consola
                    console.log(e);
              })
       },
       async guardarmedicamentoshijo(){
        var url_costado_grande = this.medicamento.url_costado_grande1;
        var url_frontal_grande = this.medicamento.url_frontal_grande1;
        var url_posterior_grande = this.medicamento.url_posterior_grande1;
        var hijos = this.tableToJson(document.getElementById('tablahijoxpresentacion'));
             await axios.post('/delivery/guardar_medicamentohijo',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              }, data: {hijos:hijos,codigopadre:this.sku_padre,/* codigo:this.cod_medp, */url_costado_grande:url_costado_grande,url_frontal_grande:url_frontal_grande,url_posterior_grande:url_posterior_grande}}).then(response => { 
                  //this.medicamentos = response.data; 
                  console.log(response.data); 
                  alert('Se guardo los medicamentos hijos'); 
                  this.cerrarmodal();
              }).catch(e => {
                    // Podemos mostrar los errores en la consola
                    console.log(e);
              })
       },
       tableToJson(table) {
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
        await fetch('/delivery/get_ecommerce_tablahijoxpadre/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sku_padre: this.sku_padre
        }) 
        }).then(response => response.json())
        .then(function (data) {

          var html = '';
          var i;
          console.log(data);
          for (i = 0; i < data.length; i++) { 
                    var presentaciones = [
                        {cod_presentacion:'B',descripcion:'BLISTER'},
                        {cod_presentacion:'C',descripcion:'CAJA'}

                      ]
                      var select = document.createElement("select");
                      select.id="presentacion";
                      //select.name="myname";

                      var tr = document.createElement('tr');   
                      var td1 = document.createElement('td'); 
                      var td2 = document.createElement('td');  
                      var td3 = document.createElement("td");
                      var td4 = document.createElement("td");
                       console.log(1);
                      var button1 = document.createElement("BUTTON");
                      var button2 = document.createElement("BUTTON");
                      button1.innerHTML = "✓";
                      button2.innerHTML = "X";
                      console.log(2);
                      for (var j = 0; j < presentaciones.length; j++) { 
                        var option = document.createElement("option");
                        option.value=presentaciones[j].cod_presentacion;
                        var value = document.createTextNode (presentaciones[j].descripcion);
                        option.appendChild(value);
                        select.appendChild(option);
                      }
                       
                      var sku_padre= data[i].sku; 
                      button1.onclick = function() { 
                            var sku_padreinner = sku_padre;
                            axios.post('/delivery/guardar_medicamentohijo',{ headers: {
                              'Cache-Control': 'no-cache',
                              'Pragma': 'no-cache',
                              'Expires': '0',
                            }, data: {sku_padre:sku_padreinner.slice(0, -1),sku:sku_padreinner.slice(0, -1).trim()+select.value}}).then(response => { 
                                //this.medicamentos = response.data; 
                                console.log(response.data); 
                                alert('Se guardo el medicamentos hijo'); 
                                this.cerrarmodal();
                            }).catch(e => {
                                  // Podemos mostrar los errores en la consola
                                  console.log(e);
                            })
                      };

                      button2.onclick =   function() { 
                            var sku_padreinner = sku_padre;
                            axios.post('/delivery/delete_medicamentohijo',{ headers: {
                              'Cache-Control': 'no-cache',
                              'Pragma': 'no-cache',
                              'Expires': '0',
                            }, data: {sku_padre:sku_padreinner.slice(0, -1),sku:sku_padreinner.slice(0, -1).trim()+select.value}}).then(response => { 
                                //this.medicamentos = response.data; 
                                console.log(response.data); 
                                document.getElementById("tbodyhijo").removeChild(button2.parentElement.parentElement);
                                alert('Se elimino el medicamentos hijo'); 
                                this.cerrarmodal();
                            }).catch(e => {
                                  // Podemos mostrar los errores en la consola
                                  console.log(e);
                            })  
                      };
                      
                      select.onchange = function() {  select.parentElement.nextSibling.innerHTML = select.parentElement.nextSibling.innerHTML.substr(0,11)+select.value; };
                      
                      td1.appendChild(select);
                      console.log(sku_padre.slice(-1));
                      select.value = sku_padre.slice(-1);
                      console.log(sku_padre);
                      td2.appendChild(document.createTextNode(sku_padre));
                      td3.appendChild(button1);
                      td4.appendChild(button2);

                      tr.appendChild(td1); 
                      tr.appendChild(td2); 
                      tr.appendChild(td3); 
                      tr.appendChild(td4); 

                      document.getElementById('tbodyhijo').appendChild(tr); 
          }
        }).catch(error => {
          console.log(error);
        }); 
  }
});
 




 App.mount('#app');


</script>
 





