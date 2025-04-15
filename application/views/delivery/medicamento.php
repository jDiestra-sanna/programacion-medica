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
<select v-model="selectedType">
    <option value="0" >POR VALIDAR</option>
    <option value="1">OBSERVADO</option>
    <option value="2">SIN IMAGEN</option>
    <option value="3">VALIDADO</option>
    <option value="4">TODOS</option>

  </select>
   <div style="grid-column: 2/4;display: flex;justify-content: flex-end;">
    <label>POR VALIDAR</label><input readonly class="input_resumen" type="text" :value="porvalidar+'   ' + porvalidarporc ">&nbsp;&nbsp;
    <label>VALIDADO</label><input readonly class="input_resumen" type="text" :value="validado+'   ' + validadoporc">&nbsp;&nbsp;
    <label>OBSERVADO</label><input readonly class="input_resumen" type="text" :value="observado+'   ' + observadoporc">&nbsp;&nbsp;
    <label>SIN IMAGEN</label><input readonly class="input_resumen" type="text" :value="sinimagen+'   ' + sinimagenporc">&nbsp;&nbsp;
    <label>TODOS</label><input readonly class="input_resumen" type="text" :value="medicamentos.length">

  </div>
</div>

<div class ="contenidotabla">
<table  id="tabla1" >
      <thead   id = "t01">
      <tr >
              <!-- <th scope="col"></th> -->
              <th scope="col"><div class="filtrocolumna">ESTADO<input v-model="searchQueryestado" class="input_filtrocolumna" type = "text"></div></th>
              <th scope="col"><div class="filtrocolumna">CODIGO<input v-model="searchQuerycodigo"  class="input_filtrocolumna" type = "text"></div></th>
              <th scope="col"><div class="filtrocolumna">NOMBRE<input v-model="searchQuery" class="input_filtrocolumna" type = "text"></div></th>
              <th scope="col"><div class="filtrocolumna">LABORATORIO<input v-model="searchQuerylaboratorio" class="input_filtrocolumna" type = "text"></div></th>
              <th scope="col"><div class="filtrocolumna">PRESENTACION<input v-model="searchQuerypresentacion" class="input_filtrocolumna" type = "text"></div></th>
              <th scope="col"><div class="filtrocolumna">FAMILIA<input v-model="searchQueryfamilia" class="input_filtrocolumna" type = "text"></div></th>
              <th scope="col"><div class="filtrocolumna">SUBFAMILIA<input v-model="searchQuerysubfamilia"class="input_filtrocolumna" type = "text"></div></th>


      </tr>
      </thead>
      <tbody  id="t02">
      <tr v-for="(medicamento,i) in resultQuery" :key="i" @click="selectRow(medicamento)" @dblclick="abrirmodal();" :class="{'highlight': (medicamento.cod_med == selectedMed.cod_med)}">
              <td >{{ medicamento.des_estado}}</td>
              <td >{{ medicamento.cod_med }}</td>
              <td >{{ medicamento.des_med}}</td>
              <td >{{ medicamento.cod_lab}}</td>
              <td >{{ medicamento.presenta_med}}</td>
              <td >{{ medicamento.u_syp_dfam}}</td>
              <td >{{ medicamento.u_syp_dsfam}}</td>
              <td style="display:none">{{ medicamento.error_nombre_laboratorio}}</td>
              <td style="display:none">{{ medicamento.nombre_duplicado}}</td>
              <td style="display:none">{{ medicamento.costado_pequeno}}</td>
              <td style="display:none">{{ medicamento.costado_mediano}}</td>
              <td style="display:none">{{ medicamento.costado_grande}}</td>

      </tr>
      </tbody>
      <tfoot>
      <!-- Paginate -->
       
      </tfoot>
</table>
</div>
<modalmedicamento @cerrarmodal="oncerrarmodal" v-if="mostrarmodal" :medicamento="selectedMed" ></modalmedicamento>
<modalactualizar v-if="mostrarmodalactualizar" :medicamento="selectedMed" ></modalactualizar>
<modalsinimagen  v-if="mostrarmodalsinimagen" :medicamento="selectedMed" ></modalsinimagen>
<modalvalidar  v-if="mostrarmodalvalidar" :medicamento="selectedMed" ></modalvalidar>
<modalreinicio v-if="mostrarmodalreinicio" :medicamento="selectedMed" ></modalreinicio>

<div style="grid-column:1/6">
      <div style="display:flex;justify-content: space-between;">
        <div>
              <!-- <button type="submit" @click="actualizar();" class="btn btn-primary" >ACTUALIZAR</button>&nbsp;&nbsp; -->
      <!--         <button type="submit" @click="validar();" class="btn btn-success" >VALIDAR</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-success"   @click="sinimagen()">SIN IMAGEN</button>&nbsp;&nbsp; -->
        </div>
        <div>
        <?php if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO - REINICIAR')) : ?><button type="submit" @click="reiniciar();" class="btn btn-success" >REINICIAR</button>&nbsp;&nbsp;<?php endif; ?>
         <button type="submit" @click="fnExcelReport();" class="btn btn-success" >REPORTE</button> 

        </div>
      </div>
  </div>
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
        editModal: false,
        deleteModal: false,
        searchQuery: '',
        searchQuerycodigo:'',
        searchQuerylaboratorio:'',
        searchQuerypresentacion:'',
        searchQueryestado:'',
        searchQueryfamilia:'',
        searchQuerysubfamilia:'' ,
        selectedType: '4',
        selectedMed: '',
        mostrarmodal: false,
        mostrarmodalactualizar:false,
        mostrarmodalsinimagen: false,
        mostrarmodalvalidar: false,
        mostrarmodalreinicio:false,
        porvalidar:'',
        validado:'',
        observado:'',
        sinimagen:'',
        porvalidarporc:'',
        validadoporc:'',
        observadoporc:'',
        sinimagenporc:''
        }  
    },
    created() {
      document.body.style.cursor = 'progress';
      axios.get('/delivery/get_medicamentos',{  responseType:'arraybuffer'  }).then(response => {
         
        var enc = new TextDecoder("utf-8");
         var int8view = new Uint8Array(response.data); 
         
            var data1 = enc.decode(int8view);
            data1 = data1.slice(3).slice(0,-2) ;
            var myArray = data1.split("},{");
               

            var final  = myArray.map((a)=>JSON.parse('{'+a+'}'));
           
        this.medicamentos = final;
        document.body.style.cursor = 'default';
        this.porvalidar  =  (this.medicamentos.filter(item => item.estado==0)).length;
        this.validado  =  (this.medicamentos.filter(item => item.estado==3)).length;
        this.observado  =  (this.medicamentos.filter(item => item.estado==1)).length;
        this.sinimagen  =  (this.medicamentos.filter(item => item.estado==2)).length;
        this.porvalidarporc  =  ((this.porvalidar / this.medicamentos.length ) * 100).toFixed(2) + '%' ;
        this.validadoporc  =   ((this.validado / this.medicamentos.length )* 100).toFixed(2)  + '%';
        this.observadoporc  =  ((this.observado / this.medicamentos.length) * 100).toFixed(2)  + '%';
        this.sinimagenporc  = ((this.sinimagen / this.medicamentos.length )* 100 ).toFixed(2) + '%';

      }).catch(e => {
         
          console.log(e);
          document.body.style.cursor = 'default';
      })
      
     
    },

    methods: {
      selectRow(medicamento){
        this.selectedMed = medicamento;
        //Do other things
      },
      oncerrarmodal( data){

        this.mostrarmodal = data;
      },
      abrirmodal(){
        if(this.selectedMed.estado != 3 ){
          this.mostrarmodal = true
        }else{
              return false;
        }
      },
      actualizar(){
        if(this.selectedMed.estado != 1 ){
          this.mostrarmodalactualizar = true;
        }else{
              return false;
        }
      
      },
      sinimagen(){
        if(this.selectedMed.estado == 0 ){
          this.mostrarmodalsinimagen = true;
        }else{
              return false;
        }
      
      },
      validar(){
        if(this.selectedMed.estado !=3 ){
          this.mostrarmodalvalidar = true;
        }else{
              return false;
        }
      
      },
      reiniciar(){
        this.mostrarmodalreinicio = true;
      } ,
      fnExcelReport()
      {
        let data = XLSX.utils.json_to_sheet(this.medicamentos)
      const workbook = XLSX.utils.book_new()
      const filename = 'visor_medicamentos'
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
      }
    },
    computed: {
        resultQuery(){
          let filterType= this.selectedType;
          /* if(this.searchQuery){ */
              return this.medicamentos.filter((item)=>{
                if(filterType=='4'){
                  return  item.des_med.includes(this.searchQuery.toUpperCase()) &&  (item.cod_med.includes(this.searchQuerycodigo.toUpperCase())  &&  item.cod_lab.includes(this.searchQuerylaboratorio.toUpperCase()) && item.presenta_med.includes(this.searchQuerypresentacion.toUpperCase()) && item.des_estado.includes(this.searchQueryestado.toUpperCase()) &&  (item.u_syp_dfam==null?'': item.u_syp_dfam).includes(this.searchQueryfamilia.toUpperCase()) && (item.u_syp_dsfam==null?'':item.u_syp_dsfam).includes(this.searchQuerysubfamilia.toUpperCase())) 
                }else{
                  return item.des_med.includes(this.searchQuery.toUpperCase()) && filterType == item.estado  &&  (item.cod_med.includes(this.searchQuerycodigo.toUpperCase())  &&  item.cod_lab.includes(this.searchQuerylaboratorio.toUpperCase()) && item.presenta_med.includes(this.searchQuerypresentacion.toUpperCase()) && item.des_estado.includes(this.searchQueryestado.toUpperCase()) &&  (item.u_syp_dfam==null?'': item.u_syp_dfam).includes(this.searchQueryfamilia.toUpperCase()) && (item.u_syp_dsfam==null?'':item.u_syp_dsfam).includes(this.searchQuerysubfamilia.toUpperCase())) 
                }
              })
       /*    }else{
            if(filterType!='4'){
              return this.medicamentos.filter((item)=>{
                return  filterType == item.estado
              })
            }else{
            return this.medicamentos;
            }
          } */
        
          
        }
    }
};

const App = Vue.createApp(app);

App.component('modalmedicamento',{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
        <div style="color: white;background:green;display:flex;justify-content:space-between;"><h6> MEDICAMENTO      [ {{auditoria.des_estado}} ]</h6><button @click="cerrarmodal()" type="button"  class="btn-xs btn-danger">X</button></div>
        <div style="overflow-y: scroll;height: 95vh;">
            <div style="display:grid;grid-template-columns: 1fr;">
                  <div style="display:grid;grid-template-columns: 1fr 1fr;grid-auto-rows: min-content;padding-top: 2vh;">
                    <div style="display:grid;grid-template-columns: 1fr 1fr;grid-auto-rows: min-content;">
                      <label>CODIGO:</label><input readonly style="width:20vw" type ="text" :value="medicamento.cod_med">
                      <label>LABORATORIO:</label><input readonly style="width:20vw" type="text" :value="medicamento.cod_lab" >
                      <label>NOMBRE:</label><input readonly style="width:20vw" type ="text" :value="medicamento.des_med" >
                      <label>PRESENTACION:</label><input readonly style="width:20vw" type ="text" :value="medicamento.presenta_med" >

                    </div>
                    <div style="display:flex;justify-content: flex-end;">
                        <div style="display: flex;flex-direction: column;">
                        <label>SELECTOR TOTAL(Esto actualiza los estados de las 12 imagenes)</label>
                        <select @change="cambioestado($event)" name="cars" id="cars"   size =4>
                                            <option value="0">POR VALIDAR</option>
                                            <option value="1">OBSERVADO</option>
                                            <option value="2">SIN IMAGEN</option>
                                            <option value="3">VALIDADO</option>
                        </select>
                        </div>
                    </div>
                    <div >
                     
                      <label style="font-weight:bold;">COMENTARIOS: (Colocar el check en las imagenes con observaciones)</label>
                      <br>
                      <textarea style="text-transform:uppercase;" v-model ="auditoria.comentarios" cols="80" rows ="3">

                      </textarea>
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<input id="error_nombre_laboratorio" type="checkbox" v-model ="auditoria.error_nombre_laboratorio"><label for="error_nombre_laboratorio">ERROR NOMBRE DE LABORATORIO</label> 
                    &nbsp;&nbsp;&nbsp;&nbsp; <input id="nombre_duplicado" type="checkbox" v-model ="auditoria.nombre_duplicado"><label for="nombre_duplicado">NOMBRE DUPLICADO</label>
                    </div>

                  </div>

                  <div style="display:grid;grid-template-columns:1fr 1fr;">

                      
                      <div id="costado" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Costado</h6>
                          <div style="display:flex;flex-direction: row;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Pequeño</label>
                                    <div class="div_cuadro"><img    @dblclick="selectimg2($event);" class="img_cuadro" id="costado_pequeño"  :src='auditoria.url_costado_pequeno' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';" /></div>
                                     <select @change="estados();" v-model="auditoria.costado_p" name="costado_p" id="costado_p"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('costado_p_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="costado_p_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 
                                 </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Mediano</label>
                                    <div class="div_cuadro"><img    @dblclick="selectimg2($event);" class="img_cuadro" id="costado_mediano"  :src='auditoria.url_costado_mediano' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';"/></div>
                                     <select @change="estados();" v-model ="auditoria.costado_m" name="costado_m" id="costado_m"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('costado_m_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="costado_m_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Grande</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="costado_grande"  :src='auditoria.url_costado_grande' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';"/></div>
                                     <select @change="estados();" v-model="auditoria.costado_g" name="costado_g" id="costado_g"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('costado_g_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="costado_g_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div> 
                          </div>
                      </div>
                      <div id="frontal" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Frontal</h6>
                          <div style="display:flex;flex-direction: row;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Pequeño</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="frontal_pequeño" :src='auditoria.url_frontal_pequeno' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';" /></div>
                                     <select  @change="estados();" v-model ="auditoria.frontal_p" name="frontal_p" id="frontal_p"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('frontal_p_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="frontal_p_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Mediano</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="frontal_mediano"   :src='auditoria.url_frontal_mediano' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';"/></div>
                                     <select @change="estados();" v-model ="auditoria.frontal_m" name="frontal_m" id="frontal_m"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('frontal_m_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="frontal_m_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Grande</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="frontal_grande" :src='auditoria.url_frontal_grande' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';"/></div>
                                     <select @change="estados();" v-model ="auditoria.frontal_g" name="frontal_g" id="frontal_g"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('frontal_g_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="frontal_g_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div> 
                          </div>
                      </div>
                      <div id="posterior" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Posterior</h6>
                          <div style="display:flex;flex-direction: row;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Pequeño</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="posterior_pequeño"  :src='auditoria.url_posterior_pequeno' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';"/></div>
                                     <select @change="estados();" v-model ="auditoria.posterior_p" name="posterior_p" id="posterior_p"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('posterior_p_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="posterior_p_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Mediano</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="posterior_mediano"   :src='auditoria.url_posterior_mediano' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';"/></div>
                                     <select @change="estados();" v-model ="auditoria.posterior_m" name="posterior_m" id="posterior_m"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('posterior_m_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="posterior_m_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Grande</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="posterior_grande"  :src='auditoria.url_posterior_grande' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';" /></div>
                                    <select  @change="estados();" v-model ="auditoria.posterior_g"name="posterior_g" id="posterior_g"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('posterior_g_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="posterior_g_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div> 
                          </div>
                      </div>
                      <div id="alta_definicion" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Alta definicion</h6>
                          <div style="display:flex;flex-direction: row;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Costado</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="alta_definicion_costado"  :src='auditoria.url_alta_definicion_costado' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';" /></div>
                                     <select @change="estados();" v-model ="auditoria.alta_definicion_c" name="alta_definicion_c" id="alta_definicion_c"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('alta_definicion_c_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="alta_definicion_c_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Frontal</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="alta_definicion_frontal"  :src='auditoria.url_alta_definicion_frontal'  onerror = "this.onerror=null;this.src='/assets/img/sin_imagen.png';" /></div>
                                     <select @change="estados();" v-model ="auditoria.alta_definicion_f" name="alta_definicion_f" id="alta_definicion_f" size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                    </select>
                                    <button class="btn btn-primary btn-sm" onclick="document.getElementById('alta_definicion_f_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="alta_definicion_f_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Posterior</label>
                                    <div class="div_cuadro"><img   @dblclick="selectimg2($event);" class="img_cuadro" id="alta_definicion_posterior"  :src='auditoria.url_alta_definicion_posterior' onerror = "this.onerror=null; this.src='/assets/img/sin_imagen.png';" /></div>
                                     <select @change="estados();" v-model ="auditoria.alta_definicion_p" name="alta_definicion_p" id="alta_definicion_p"   size =4>
                                      <option value="0">POR VALIDAR</option>
                                      <option value="1">OBSERVADO</option>
                                      <option value="2">SIN IMAGEN</option>
                                      <option value="3">VALIDADO</option>
                                     </select>
                                     <button class="btn btn-primary btn-sm" onclick="document.getElementById('alta_definicion_p_upload').click()">SUBIR IMAGEN</button>
                                     <input type="file" id="alta_definicion_p_upload" name="cargar_imagen" accept="image/png, image/gif, image/jpeg" style="display:none" @change="filesChange($event.target.name, $event.target.files , $event.target.id)"><br> 

                                </div> 
                          </div>
                      </div>

                  </div>
                  
            </div>
            <div style="display: flex;justify-content: center;">
              <div>
              <button type="submit" @click="guardarauditoria()" class="btn btn-success" >GUARDAR</button>&nbsp;&nbsp;&nbsp;
              <button type="submit" @click="cerrarmodal()" class="btn btn-danger" >SALIR</button>
              </div>
              <div>
              &nbsp;&nbsp;&nbsp;<button type="submit" @click="seguimiento();" class="btn btn-warning" >SEGUIMIENTO</button> 
              </div>

            </div>
        </div>
      </div>
      <modalimagen :imgselected = "selectimg" v-if="mostrarmodalimagen"></modalimagen>
      <modalseguimiento v-if="mostrarmodalseguimiento" :cod_med="cod_med" ></modalseguimiento>

   </div>

   `,
   props:
    ['medicamento']
   ,
   data(){
     return{
      imagenesmedicamento:[],
       selectimg:{src:'',des_med:''},
       mostrarmodalimagen:false,
       mostrarmodalseguimiento:false,
       auditoria:{
         costado_p:0,
         costado_m:0,
         costado_g:0,
         frontal_p:0,
         frontal_m:0,
         frontal_g:0,
         posterior_p:0,
         posterior_m:0,
         posterior_g:0,
         alta_definicion_c:0,
         alta_definicion_f:0,
         alta_definicion_p:0,
         error_nombre_laboratorio:false,
         nombre_duplicado:false,
         comentarios:'',
         estado:0,
         des_estado:'POR VALIDAR',
         cod_med:this.medicamento.cod_med
       } ,
       cod_med:this.medicamento.cod_med,
       url_costado_pequeno: '\\images\\costado\\pequeno\\'+this.medicamento.cod_med+'.JPG', 
       url_costado_mediano: '\\images\\costado\\mediano\\'+this.medicamento.cod_med+'.JPG',
       url_costado_grande: '\\images\\costado\\grande\\'+this.medicamento.cod_med+'.JPG',
       url_frontal_pequeno: '\\images\\frontal\\pequeno\\'+this.medicamento.cod_med+'.JPG',
       url_frontal_mediano: '\\images\\frontal\\mediano\\'+this.medicamento.cod_med+'.JPG',
       url_frontal_grande: '\\images\\frontal\\grande\\'+this.medicamento.cod_med+'.JPG',
       url_posterior_pequeno: '\\images\\posterior\\pequeno\\'+this.medicamento.cod_med+'.JPG',
       url_posterior_mediano: '\\images\\posterior\\mediano\\'+this.medicamento.cod_med+'.JPG',
       url_posterior_grande: '\\images\\posterior\\grande\\'+this.medicamento.cod_med+'.JPG',
       url_alta_definicion_costado: '\\images\\alta_definicion\\costado\\'+this.medicamento.cod_med+'.JPG',
       url_alta_definicion_posterior: '\\images\\alta_definicion\\posterior\\'+this.medicamento.cod_med+'.JPG',
       url_alta_definicion_frontal: '\\images\\alta_definicion\\frontal\\'+this.medicamento.cod_med+'.JPG'  

     }
   } ,
   components:{
   'modalimagen': 
      {
          template:`<div class="ed-modal-container2">
          <div class="ed-modal-content2">
          <div style="grid-column:1/3;color: white;background:green;display:flex;justify-content:space-between;"><h6>{{imgselected.vista}}</h6><button @click="cerrarmodalimagen()" type="button"  class="btn-xs btn-danger">X</button></div>
          <div>{{imgselected.des_med}}</div>
          <div style="overflow:scroll;height:90vh">
           <img  :src="imgselected.src">
          </div>
          </div>
          </div>`,
          props:['imgselected'],
          methods:{
            cerrarmodalimagen(){
              this.$parent.mostrarmodalimagen = false;
            }
          }
      },
      'modalseguimiento':{
        template: 
        `<div class="ed-modal-container3">
            <div class="ed-modal-content3">
            <div style="color: white;background:green;display:flex;justify-content:space-between;"><h6> SEGUIMIENTO</h6><button @click="this.$parent.mostrarmodalseguimiento = false" type="button"  class="btn-xs btn-danger">X</button></div>
            
            <table border=1 >
                  <thead>
                  <tr >
                          <th scope="col">NRO_REGISTRO</th> 
                          <th scope="col">ESTADO</th>
                          <th scope="col">FECHA</th>
                          <th scope="col">USUARIO</th>
                


                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(seguimiento,i) in seguimientos" :key="i">
                          <td >{{ seguimiento.nro_registro }}</td>
                          <td >{{ seguimiento.descripcion }}</td>
                          <td >{{ seguimiento.fecha}}</td>
                          <td >{{ seguimiento.usuario}}</td> 
            
                  </tr>
                  </tbody>
                  <tfoot>
                  <!-- Paginate -->
                  
                  </tfoot>
            </table>
            <div style="display:flex;justify-content:center;">  
                <button   @click="this.$parent.mostrarmodalseguimiento = false" class="btn btn-danger">SALIR</button>
            </div>
            <br>
            </div>
          </div>`,
            props:
              ['cod_med']
            ,
        data(){
          return{
              selectimg:'',
              seguimientos:[]
          }
        } ,
        mounted(){
            
          axios.post('/delivery/get_seguimiento',{ headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },cod_med: this.cod_med }).then(response => {
              
               
              
              this.seguimientos = response.data;
            
              
              
          }).catch(e => {
                
                console.log(e);
          }) 
        }

      }
   } 
   ,
   methods:{
       cerrarmodal (){
         this.$emit('cerrarmodal', false);  
       },
      seguimiento(){
        this.mostrarmodalseguimiento = true;
      } ,
       selectimg2(event){
          
         if(event.target.src=='https://10.6.26.16:8094/assets/img/sin_imagen.png'){
           return false;
         }
        this.selectimg.src = event.target.src;
        this.selectimg.des_med = this.medicamento.des_med;
        this.selectimg.vista = event.target.id;
        this.mostrarmodalimagen = true  ;
       },
        upload(formData) {
        const url = '/delivery/upload';
        var  auditoria  =  this.auditoria ;
        return axios.post(url, formData)
        // get data
        .then( async function (data) {  //x => x.data)
                var tipo_imagen = formData.get("tipo_imagen");
                                         if(tipo_imagen == 'costado_p'){
                                              await axios.post('/delivery/get_imagenes',{ headers: {
                                                'Cache-Control': 'no-cache',
                                                'Pragma': 'no-cache',
                                                'Expires': '0'
                                              
                                              },parametros:{vista:'costado_pequeño',cod_med: auditoria.cod_med,}   }).then(response => {
                                                   
                                                  var imagenes =  response.data;
                                                  document.getElementById('costado_pequeño').setAttribute('src', imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);
                                              
                                                }).catch(e => {
                                                   
                                                    console.log(e);
                                                }) ;
                                          }
                                          if(tipo_imagen == 'costado_m'){
                                                  await  axios.post('/delivery/get_imagenes',{ headers: {
                                                  'Cache-Control': 'no-cache',
                                                  'Pragma': 'no-cache',
                                                  'Expires': '0'
                                                
                                                },parametros:{vista:'costado_mediano',cod_med: auditoria.cod_med,}   }).then(response => {
                                                    
                                                    //this.medicamentos = response.data;
                                                    
                                                    var imagenes =  response.data;
                                                    document.getElementById('costado_mediano').setAttribute('src', imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);   
                                                  }).catch(e => {
                                                      
                                                      console.log(e);
                                                  }); 
                                          }
                                          if(tipo_imagen == 'costado_g'){
                                                await axios.post('/delivery/get_imagenes',{ headers: {
                                                'Cache-Control': 'no-cache',
                                                'Pragma': 'no-cache',
                                                'Expires': '0'
                                              
                                              },parametros:{vista:'costado_grande',cod_med: auditoria.cod_med,}   }).then(response => {
                                                  
                                                  
                                                  var imagenes =  response.data; 
                                                  document.getElementById('costado_grande').setAttribute('src', imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);   
                                              
                                                  
                                                }).catch(e => {
                                                    
                                                    console.log(e);
                                                }) ;
                                            }
                                            if(tipo_imagen == 'frontal_p'){
                                                await axios.post('/delivery/get_imagenes',{ headers: {
                                                'Cache-Control': 'no-cache',
                                                'Pragma': 'no-cache',
                                                'Expires': '0'
                                              
                                              },parametros:{vista:'frontal_pequeño',cod_med: auditoria.cod_med,}   }).then(response => {
                                                  
                                                
                                                  var imagenes =  response.data;
                                                  document.getElementById('frontal_pequeño').setAttribute('src', imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);   
                                            
                                                  
                                                }).catch(e => {
                                                  
                                                    console.log(e);
                                                }) ;
                                            }
                                            if(tipo_imagen == 'frontal_m'){
                                                  await axios.post('/delivery/get_imagenes',{ headers: {
                                                  'Cache-Control': 'no-cache',
                                                  'Pragma': 'no-cache',
                                                  'Expires': '0'
                                                
                                                },parametros:{vista:'frontal_mediano',cod_med: auditoria.cod_med,}   }).then(response => {
                                                    
                                                    var imagenes =  response.data;   
                                                    document.getElementById('frontal_mediano').setAttribute('src',imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes); 
                                                    
                                                  }).catch(e => {
                                                     
                                                      console.log(e);
                                                  }) ;
                                          }
                                          if(tipo_imagen == 'frontal_g'){

                                                  await axios.post('/delivery/get_imagenes',{ headers: {
                                                  'Cache-Control': 'no-cache',
                                                  'Pragma': 'no-cache',
                                                  'Expires': '0'
                                                
                                                },parametros:{vista:'frontal_grande',cod_med: auditoria.cod_med,}   }).then(response => {
                                                    
                                                   
                                                    
                                                    var imagenes =  response.data;    
                                                    document.getElementById('frontal_grande').setAttribute('src', imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);  
                                                  }).catch(e => {
                                                      
                                                      console.log(e);
                                                  });
                                            }
                                            if(tipo_imagen == 'posterior_p'){

                                                  await axios.post('/delivery/get_imagenes',{ headers: {
                                                  'Cache-Control': 'no-cache',
                                                  'Pragma': 'no-cache',
                                                  'Expires': '0'
                                                
                                                },parametros:{vista:'posterior_pequeño',cod_med: auditoria.cod_med,}   }).then(response => {
                                                  
                                                    var imagenes =  response.data; 
                                                    document.getElementById('posterior_pequeño').setAttribute('src',imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);  
                                                    
                                                  }).catch(e => {
                                                     
                                                      console.log(e);
                                                  }) ;
                                            }
                                             if(tipo_imagen == 'posterior_m'){

                                                    await axios.post('/delivery/get_imagenes',{ headers: {
                                                    'Cache-Control': 'no-cache',
                                                    'Pragma': 'no-cache',
                                                    'Expires': '0'
                                                  
                                                  },parametros:{vista:'posterior_mediano',cod_med: auditoria.cod_med,}   }).then(response => {
                                                      
                                                      //this.medicamentos = response.data;
                                                      
                                                      var imagenes =  response.data;  
                                                      document.getElementById('posterior_mediano').setAttribute('src',imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);   
                                                      
                                                    }).catch(e => {
                                                        
                                                        console.log(e);
                                                    }) ;
                                              }
                                            if(tipo_imagen == 'posterior_g'){

                                                    await axios.post('/delivery/get_imagenes',{ headers: {
                                                    'Cache-Control': 'no-cache',
                                                    'Pragma': 'no-cache',
                                                    'Expires': '0'
                                                  
                                                  },parametros:{vista:'posterior_grande',cod_med: auditoria.cod_med,}   }).then(response => {
                                                      
                                                      
                                                      
                                                      var imagenes =  response.data;  
                                                      document.getElementById('posterior_grande').setAttribute('src',imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);    
                                                      
                                                    }).catch(e => {
                                                        
                                                        console.log(e);
                                                    }) ;
                                            }
                                            if(tipo_imagen == 'alta_definicion_c'){

                                                    await  axios.post('/delivery/get_imagenes',{ headers: {
                                                    'Cache-Control': 'no-cache',
                                                    'Pragma': 'no-cache',
                                                    'Expires': '0'
                                                  
                                                  },parametros:{vista:'alta_definicion_costado',cod_med: auditoria.cod_med,}   }).then(response => {
                                                      
                                                      //this.medicamentos = response.data;
                                                      
                                                      var imagenes =  response.data;
                                                      document.getElementById('alta_definicion_costado').setAttribute('src',imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);  
                                                      
                                                    }).catch(e => {
                                                        // Podemos mostrar los errores en la consola
                                                        console.log(e);
                                                    }) ;
                                          }
                                          if(tipo_imagen == 'alta_definicion_f'){

                                                  await axios.post('/delivery/get_imagenes',{ headers: {
                                                  'Cache-Control': 'no-cache',
                                                  'Pragma': 'no-cache',
                                                  'Expires': '0'
                                                
                                                },parametros:{vista:'alta_definicion_frontal',cod_med: auditoria.cod_med,}   }).then(response => {
                                                    
                                                    //this.medicamentos = response.data;
                                                    
                                                    var imagenes =  response.data; 
                                                    document.getElementById('alta_definicion_frontal').setAttribute('src',imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes);  
                                                    
                                                  }).catch(e => {
                                                      // Podemos mostrar los errores en la consola
                                                      console.log(e);
                                                  }) ;
                                        }
                                        if(tipo_imagen == 'alta_definicion_p'){

                                              await axios.post('/delivery/get_imagenes',{ headers: {
                                                'Cache-Control': 'no-cache',
                                                'Pragma': 'no-cache',
                                                'Expires': '0'
                                              
                                              },parametros:{vista:'alta_definicion_posterior',cod_med: auditoria.cod_med,}  }).then(response => {
                                                 
                                                  var imagenes =  response.data; 
                                                  document.getElementById('alta_definicion_posterior').setAttribute('src', imagenes.trim()==''?'\\assets\\img\\sin_imagen.png':imagenes); 
                                                  
                                                }).catch(e => {
                                                  
                                                    console.log(e);
                                                }) ;
                                         }
        })
        .catch(e => {
          
          console.log(e);
      }) 
      },
       save(formData) {
       

        this.upload(formData)
          .then(x => {
          
          })
          .catch(err => {
             
          });
      },
       filesChange(fieldName, fileList,fieldId) {
         
       var fieldIdupload = fieldId.replace('_upload','');
        const formData = new FormData();
       // var select = document.getElementById('tipo_imagen').value;
        if (!fileList.length) return;
         
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName , fileList[x], fileList[x].name);
            formData.append('tipo_imagen', fieldIdupload);
            formData.append('cod_med', this.cod_med);

          });

        // save it
        this.save(formData);
      },
       guardarauditoria(){

              var r = confirm("Esta seguro de confirmar las observaciones?");
              if (r == true) {
                
              } else {
                return;
              }
               
              axios.post('/delivery/save_auditoria',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },auditoria: this.auditoria }).then(response => {
                  
                  if(response.data==true){
                      alert('Se guardo las observaciones');
                      this.$parent.selectedMed.estado = this.auditoria.estado;
                      this.$parent.selectedMed.des_estado = this.auditoria.des_estado;
                      this.$emit('cerrarmodal', false);
                
                  }else{
                    alert('Sucedio algun error');
                  }
        
                  
                }).catch(e => {
                  alert('Sucedio algun error: '+e);
                  console.log(e);
                }) 
       },
       cambioestado(val){ 
          var valor = val.target.value;
          switch(valor){
            case '0':
              this.auditoria.costado_p  = '0';
              this.auditoria.costado_m  = '0';
              this.auditoria.costado_g  = '0';
              this.auditoria.frontal_p  = '0';
              this.auditoria.frontal_m  = '0';
              this.auditoria.frontal_g  = '0';
              this.auditoria.posterior_p = '0';
              this.auditoria.posterior_m  = '0';
              this.auditoria.posterior_g = '0';
              this.auditoria.alta_definicion_c = '0';
              this.auditoria.alta_definicion_f = '0';
              this.auditoria.alta_definicion_p = '0';
              break;
            case '1':
              this.auditoria.costado_p  = '1';
              this.auditoria.costado_m  = '1';
              this.auditoria.costado_g  = '1';
              this.auditoria.frontal_p  = '1';
              this.auditoria.frontal_m  = '1';
              this.auditoria.frontal_g  = '1';
              this. auditoria.posterior_p = '1';
              this.auditoria.posterior_m  = '1';
              this.auditoria.posterior_g = '1';
              this.auditoria.alta_definicion_c = '1';
              this.auditoria.alta_definicion_f = '1';
              this.auditoria.alta_definicion_p = '1';
              break;
            case '2':
              this.auditoria.costado_p  = '2';
              this.auditoria.costado_m  = '2';
              this.auditoria.costado_g  = '2';
              this.auditoria.frontal_p  = '2';
              this.auditoria.frontal_m  = '2';
              this.auditoria.frontal_g  = '2';
              this.auditoria.posterior_p = '2';
              this.auditoria.posterior_m  = '2';
              this.auditoria.posterior_g = '2';
              this.auditoria.alta_definicion_c = '2';
              this.auditoria.alta_definicion_f = '2';
              this.auditoria.alta_definicion_p = '2';
              break;
            case '3':
              this.auditoria.costado_p  = '3';
              this.auditoria.costado_m  = '3';
              this.auditoria.costado_g  = '3';
              this.auditoria.frontal_p  = '3';
              this.auditoria.frontal_m  = '3';
              this.auditoria.frontal_g  = '3';
              this.auditoria.posterior_p = '3';
              this.auditoria.posterior_m  = '3';
              this.auditoria.posterior_g = '3';
              this.auditoria.alta_definicion_c = '3';
              this.auditoria.alta_definicion_f = '3';
              this.auditoria.alta_definicion_p = '3';
              break;
          }
          this.estados();
       },
       estados(){
         var sinimagen=0,observado = 0;
         if(this.auditoria.costado_p ==  '3' && this.auditoria.costado_m ==  '3'  && this.auditoria.costado_g == '3'  && this.auditoria.frontal_p == '3' && this.auditoria.frontal_m == '3' && this.auditoria.frontal_g == '3' && this.auditoria.posterior_p == '3' && this.auditoria.posterior_m == '3' && this.auditoria.posterior_g == '3' && this.auditoria.alta_definicion_c == '3' && this.auditoria.alta_definicion_f == '3' && this.auditoria.alta_definicion_p== '3'){
             this.auditoria.estado =  '3';
             this.auditoria.des_estado = 'VALIDADO';
             return false;
         }
         if(this.auditoria.costado_p ==   '0' && this.auditoria.costado_m ==   '0'  && this.auditoria.costado_g ==  '0'  && this.auditoria.frontal_p ==  '0' && this.auditoria.frontal_m ==  '0' && this.auditoria.frontal_g ==  '0' && this.auditoria.posterior_p ==  '0' && this.auditoria.posterior_m ==  '0' && this.auditoria.posterior_g ==  '0' && this.auditoria.alta_definicion_c ==  '0' && this.auditoria.alta_definicion_f ==  '0' && this.auditoria.alta_definicion_p==  '0'){
             this.auditoria.estado =   '0';
             this.auditoria.des_estado = 'POR VALIDAR';
             return false;
         }
         
         if(this.auditoria.costado_p=='1') observado++; 
         if(this.auditoria.costado_m=='1') observado++; 
         if(this.auditoria.costado_g=='1') observado++; 
         if(this.auditoria.frontal_p=='1') observado++; 
         if(this.auditoria.frontal_m=='1') observado++; 
         if(this.auditoria.frontal_g=='1') observado++; 
         if(this.auditoria.posterior_p=='1') observado++; 
         if(this.auditoria.posterior_m=='1') observado++; 
         if(this.auditoria.posterior_g=='1') observado++; 
         if(this.auditoria.alta_definicion_p=='1') observado++; 
         if(this.auditoria.alta_definicion_c=='1') observado++; 
         if(this.auditoria.alta_definicion_f=='1') observado++; 

         if(this.auditoria.costado_p== '2') sinimagen++; 
         if(this.auditoria.costado_m== '2') sinimagen++; 
         if(this.auditoria.costado_g== '2') sinimagen++; 
         if(this.auditoria.frontal_p== '2') sinimagen++; 
         if(this.auditoria.frontal_m== '2') sinimagen++; 
         if(this.auditoria.frontal_g== '2') sinimagen++; 
         if(this.auditoria.posterior_p== '2') sinimagen++; 
         if(this.auditoria.posterior_m== '2') sinimagen++; 
         if(this.auditoria.posterior_g== '2') sinimagen++; 
         if(this.auditoria.alta_definicion_p== '2') sinimagen++; 
         if(this.auditoria.alta_definicion_c== '2') sinimagen++; 
         if(this.auditoria.alta_definicion_f== '2') sinimagen++; 
         
         if (sinimagen==observado){
             this.auditoria.estado =   '1';
             this.auditoria.des_estado = 'OBSERVADO';
         }else{
           if (sinimagen>observado){
             this.auditoria.estado =   '2';
             this.auditoria.des_estado = 'SIN IMAGEN';
           }else{
             this.auditoria.estado =   '1';
             this.auditoria.des_estado = 'OBSERVADO';
           }

         }
         
            
       } ,
        b64toBlob(b64Data, contentType='', sliceSize=512) {
          const byteCharacters = atob(b64Data);
          
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }

          const blob = new Blob(byteArrays, {type: contentType});
          return blob;
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

     //Frame1.Caption = "Consultas médicas"
    if (data=="") {
     

    }else{
      alert('La sesion ha terminado.');
      window.location.href = `${window.location.protocol + '//' + window.location.host}/login`;
    }


    }).catch(error => {
      console.log(error);
    });
    await axios.post('/delivery/get_medicamento',{ headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
     
    },cod_med: this.medicamento.cod_med   }).then(response => {
        
        this.auditoria = response.data;
        this.estados();
        
     
      }).catch(e => {
          
          console.log(e);
      }) ;

/* 
    ///costado_pequeño
    //document.getElementById('costado_pequeño').setAttribute('src','\\images\\costado\\mediano\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('costado_pequeño').complete && document.getElementById('costado_pequeño').naturalHeight !== 0;
    if (!isLoaded) {
      document.getElementById('costado_pequeño').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }
 
     
    ///costado_mediano
    //document.getElementById('costado_mediano').setAttribute('src','\\images\\costado\\mediano\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('costado_mediano').complete && document.getElementById('costado_mediano').naturalHeight !== 0;
    if (!isLoaded) {
      document.getElementById('costado_mediano').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }
 
     
    ///costado_grande
    //document.getElementById('costado_grande').setAttribute('src','\\images\\costado\\grande\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('costado_grande').complete && document.getElementById('costado_grande').naturalHeight !== 0;
    if (!isLoaded) {
     document.getElementById('costado_grande').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }

    ///frontal_pequeño
    //document.getElementById('frontal_pequeño').setAttribute('src','\\images\\frontal\\pequeño\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('frontal_pequeño').complete && document.getElementById('frontal_pequeño').naturalHeight !== 0;
    if (!isLoaded) {
      document.getElementById('frontal_pequeño').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }

  ///frontal_mediano
  //document.getElementById('frontal_mediano').setAttribute('src','\\images\\frontal\\mediano\\'+this.cod_med + '.JPG');  
 
    var isLoaded = document.getElementById('frontal_mediano').complete && document.getElementById('frontal_mediano').naturalHeight !== 0;
    if (!isLoaded) {
     document.getElementById('frontal_mediano').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }

   ///frontal_grande
  //document.getElementById('frontal_grande').setAttribute('src','\\images\\frontal\\grande\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('frontal_grande').complete && document.getElementById('frontal_grande').naturalHeight !== 0;
    if (!isLoaded) {
      document.getElementById('frontal_grande').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }

        ///posterior_pequeño
  //document.getElementById('posterior_pequeño').setAttribute('src','\\images\\posterior\\pequeño\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('posterior_pequeño').complete && document.getElementById('posterior_pequeño').naturalHeight !== 0;
    if (!isLoaded) {
      document.getElementById('posterior_pequeño').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }
 
        ///posterior_mediano
  //document.getElementById('posterior_mediano').setAttribute('src','\\images\\posterior\\mediano\\'+this.cod_med + '.JPG');
   
    var isLoaded = document.getElementById('posterior_mediano').complete && document.getElementById('posterior_mediano').naturalHeight !== 0;
    if (!isLoaded) {
     document.getElementById('posterior_mediano').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }
    ///posterior_grande
    //document.getElementById('posterior_grande').setAttribute('src','\\images\\posterior\\grande\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('posterior_grande').complete && document.getElementById('posterior_grande').naturalHeight !== 0;
    if (!isLoaded) {
     document.getElementById('posterior_grande').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }

   
     ///alta_definicion_costado
  //document.getElementById('alta_definicion_costado').setAttribute('src','\\images\\alta_definicion\\costado\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('alta_definicion_costado').complete && document.getElementById('alta_definicion_costado').naturalHeight !== 0;
    if (!isLoaded) {
      document.getElementById('alta_definicion_costado').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }

    ///alta_definicion_frontal
    //document.getElementById('alta_definicion_frontal').setAttribute('src','\\images\\alta_definicion\\frontal\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('alta_definicion_frontal').complete && document.getElementById('alta_definicion_frontal').naturalHeight !== 0;
    if (!isLoaded) {
      document.getElementById('alta_definicion_frontal').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }
  ///alta_definicion_posterior
  //document.getElementById('alta_definicion_posterior').setAttribute('src','\\images\\alta_definicion\\posterior\\'+this.cod_med + '.JPG');  
    var isLoaded = document.getElementById('alta_definicion_posterior').complete && document.getElementById('alta_definicion_posterior').naturalHeight !== 0 ;
    if (!isLoaded) {
     document.getElementById('alta_definicion_posterior').setAttribute('src','\\assets\\img\\sin_imagen.png');  
    }
     */
  }
});
 

App.component('modalactualizar',{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
            <div style="display:grid;grid-template-columns: 1fr;">
                  <div style="color: white;background:green;display:flex;justify-content:space-between;"><h6> ACTUALIZACION</h6><button @click="this.$parent.mostrarmodalactualizar = false" type="button"  class="btn-xs btn-danger">X</button></div>
                  <div style="display:grid;grid-template-columns: 1fr 1fr;grid-auto-rows: min-content;padding-top: 2vh;">
                    <div style="display:grid;grid-template-columns: 1fr 1fr;grid-auto-rows: min-content;">
                      <label>CODIGO:</label><input disabled style="width:20vw" type ="text" :value="medicamento.cod_med">
                      <label>LABORATORIO:</label><input id="laboratorio" disabled style="width:20vw;text-transform:uppercase" type="text" :value="medicamento.cod_lab" >
                      <label>NOMBRE:</label><input id="nombre_medicamento" disabled style="width:20vw;text-transform:uppercase" type ="text" :value="medicamento.des_med" >
                      <label>PRESENTACION:</label><input disabled style="width:20vw" type ="text" :value="medicamento.presenta_med" >

                      <div style = "width:20vw"><input id="error_nombre_laboratorio" type="checkbox" disabled v-model ="auditoria.error_nombre_laboratorio"><label for="error_nombre_laboratorio">ERROR NOMBRE DE LABORATORIO</label></div>
                      <div><input id="nombre_duplicado" type="checkbox" disabled v-model ="auditoria.nombre_duplicado"><label for="nombre_duplicado">NOMBRE DUPLICADO</label></div>
                    </div>
                    <div >
                     
                      <label style="font-weight:bold;">COMENTARIOS:(Colocar el check en las imagenes con observaciones)</label>
                      <br>
                      <textarea disabled style="text-transform:uppercase;" v-model ="auditoria.comentarios" cols="80" rows ="3">

                      </textarea>
                    </div>

                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;">

                      
                      <div id="costado" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Costado</h6>
                          <div style="display:flex;flex-direction: row;justify-content: space-around;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Pequeño</label>
                                    <input   type = "checkbox"  v-model="auditoria.costado_p" id="costado_p" disabled  >
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Mediano</label>
                                    <input type = "checkbox"  v-model ="auditoria.costado_m" id="costado_m" disabled  >
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Grande</label>
                                    <input type = "checkbox"   v-model="auditoria.costado_g" id="costado_g" disabled >
                                </div> 
                          </div>
                      </div>
                      <div id="frontal" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Frontal</h6>
                          <div style="display:flex;flex-direction: row;justify-content: space-around;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Pequeño</label>
                                    <input type = "checkbox" v-model ="auditoria.frontal_p" id="frontal_p" disabled  >
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Mediano</label>
                                    <input type = "checkbox"  v-model ="auditoria.frontal_m" id="frontal_m" disabled >
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Grande</label>
                                    <input type = "checkbox" v-model ="auditoria.frontal_g" id="frontal_g" disabled  >
                                </div> 
                          </div>
                      </div>
                      <div id="posterior" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Posterior</h6>
                          <div style="display:flex;flex-direction: row;justify-content: space-around;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Pequeño</label>
                                    <input type = "checkbox" v-model ="auditoria.posterior_p" id="posterior_p" disabled >
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Mediano</label>
                                    <input type = "checkbox" v-model ="auditoria.posterior_m" id="posterior_m" disabled >
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Grande</label>
                                    <input type = "checkbox" v-model ="auditoria.posterior_g" id="posterior_g" disabled >
                                </div> 
                          </div>
                      </div>
                      <div id="alta_definicion" style="display:flex;flex-direction: column;border:1px solid black;margin:1vh;padding-bottom: 1vh;">
                            <h6 style="width:10vw;grid-column:1/3;  background:white; margin-top: -1.5vh; margin-left: 1vw; padding: 0 10px; ">Alta definicion</h6>
                          <div style="display:flex;flex-direction: row;justify-content: space-around;">
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Costado</label>
                                    <input type = "checkbox"  v-model ="auditoria.alta_definicion_c" id="alta_definicion_c" disabled>
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Frontal</label>
                                    <input type = "checkbox" v-model ="auditoria.alta_definicion_f" id="alta_definicion_f"  disabled>
                                </div>
                                <div style="display:flex;flex-direction: column;align-items: center;">
                                    <label>Posterior</label>
                                    <input type = "checkbox" v-model ="auditoria.alta_definicion_p" id="alta_definicion_p" disabled>
                                </div> 
                          </div>
                      </div>

                  </div>
                  
            </div>
        <div style="display: flex;justify-content: space-between;">
          <div>
            <label>TIPO DE IMAGEN</label><select id="tipo_imagen"></select>
            <input type="file" id="cargar_imagenregresar" name="cargar_imagenregresar" accept="image/png, image/gif, image/jpeg" @change="filesChangeregresar($event.target.name, $event.target.files)"><br> 
          </div>
          <div>
            <button type="submit" @click="actualizar()" class="btn btn-success" >Guardar</button>&nbsp;&nbsp;&nbsp;
            <button type="submit" @click="this.$parent.mostrarmodalactualizar = false" class="btn btn-danger" >Salir</button>
          </div>
        </div>

      </div>

   </div>

   `,
   props:
    ['medicamento']
   ,
   data(){
     return{
      imagenesmedicamento:[],
       selectimg:'',
       mostrarmodalimagen:false,
       auditoria:{
         costado_p:false,
         costado_m:false,
         costado_g:false,
         frontal_p:false,
         frontal_m:false,
         frontal_g:false,
         posterior_p:false,
         posterior_m:false,
         posterior_g:false,
         alta_definicion_c:false,
         alta_definicion_f:false,
         alta_definicion_p:false,
         error_nombre_laboratorio:false,
         nombre_duplicado:false,
         comentarios:'',
         cod_med:this.medicamento.cod_med
       },

     }
   }  
   ,
   methods:{
         
       selectimg2(event){
        this.selectimg = event.target.src;
        this.mostrarmodalimagen = true  ;
       },
       actualizar(event){


              if (this.auditoria.posterior_g==false && this.auditoria.posterior_m==false && this.auditoria.posterior_p==false && this.auditoria.frontal_g==false && this.auditoria.frontal_m==false && this.auditoria.frontal_p==false && this.auditoria.costado_g==false && this.auditoria.costado_m==false && this.auditoria.costado_p==false && this.auditoria.alta_definicion_c==false && this.auditoria.alta_definicion_f==false && this.auditoria.alta_definicion_p==false) {
              
              } else {
                alert('Existen vistas por corregir.....');
                return;
              }
               
              var r = confirm("Esta seguro de guardar los cambios realizados?");
              if (r == true) {
                
              } else {
                return;
              }
               
              axios.post('/delivery/update',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },actualizacion: {cod_med:this.auditoria.cod_med,error_nombre_laboratorio:this.auditoria.error_nombre_laboratorio,laboratorio:document.getElementById('laboratorio').value,
                               nombre_duplicado:this.auditoria.nombre_duplicado,nombre_medicamento:document.getElementById('nombre_medicamento').value
              } }).then(response => {
                   
                  if(response.data==true){
                      alert('Se actualizo y valido las imagenes');
                      this.$parent.selectedMed.estado = 3;
                      this.$parent.selectedMed.des_estado = 'VALIDADO';
                      this.$parent.mostrarmodalactualizar = false;
                
                  }else{
                    alert('Sucedio algun error');
                  }
        
                  
                }).catch(e => {
                  alert('Sucedio algun error: '+e);
                  console.log(e);
                }) 
       },
        upload(formData) {
        const url = '/delivery/upload';
        return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .catch(e => {
         
          console.log(e);
      }) 
      },
       save(formData) {
        // upload data to the server
        //this.currentStatus = STATUS_SAVING;

        this.upload(formData)
          .then(x => {
           // this.uploadedFiles = [].concat(x);
           // this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            //this.uploadError = err.response;
            //this.currentStatus = STATUS_FAILED;
          });
      },
       filesChange(fieldName, fileList,fieldId) {
        // handle file changes
        
        const formData = new FormData();
        var select = document.getElementById('tipo_imagen').value;
        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
            formData.append('tipo_imagen', fieldId);
            formData.append('cod_med', this.auditoria.cod_med);

          });

        // save it
        this.save(formData);
      }
   },
   mounted(){
       
     axios.post('/delivery/get_auditoria',{ headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },cod_med: this.medicamento.cod_med }).then(response => {
        
       
        this.auditoria =  response.data;
         var select = document.getElementById('tipo_imagen');

        for (const key in  this.auditoria) {
               if (this.auditoria[key] === true && key != 'error_nombre_laboratorio' && key != 'nombre_duplicado'      ){
                
                document.getElementById(key).disabled = false;
                
                var opt = document.createElement('option');
                opt.value =  key;
                opt.innerHTML = key.toUpperCase();
                select.appendChild(opt);
               }else if((key == 'error_nombre_laboratorio' && this.auditoria[key] ===true) ){
                  document.getElementById('laboratorio').disabled = false;
               }else if(key == 'nombre_duplicado' && this.auditoria[key] ===true){
                  document.getElementById('nombre_medicamento').disabled = false;
               }
               
       
        }
         
      }).catch(e => {
          
          console.log(e);
      }) 
   }
   

});

App.component('modalsinimagen',{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
      <div style="color: white;background:green;display:flex;justify-content:space-between;width:15vw"><h6> SIN IMAGEN</h6><button @click="this.$parent.mostrarmodalsinimagen = false" type="button"  class="btn-xs btn-danger">X</button></div>
      <br>
      <div style="display:flex;justify-content:center;">
          <button   @click="guardarsinimagen()" class="btn btn-primary">SI</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button   @click="this.$parent.mostrarmodalsinimagen = false" class="btn btn-danger">NO</button>
      </div>
      <br>
      </div>
    </div>`,
   props:
    ['medicamento']
   ,
   data(){
     return{
        selectimg:''
     }
   } ,
   mounted(){
      
  
   },
   methods:{
    guardarsinimagen(){
              var r = confirm("Esta seguro de guardar sin imagen?");
              if (r == true) {
                
              } else {
                return;
              }
               
              axios.post('/delivery/save_auditoriasinimagen',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },cod_med: this.medicamento.cod_med }).then(response => {
                  
                  
                  
                  if(response.data==true){
                      alert('Se guardo sin imagen');
                      this.$parent.selectedMed.estado = 2;
                      this.$parent.selectedMed.des_estado = 'SIN IMAGEN';
                      this.$parent.mostrarmodalsinimagen = false;
                
                  }else{
                    alert('Sucedio algun error');
                  }
        
                  
                }).catch(e => {
                  alert('Sucedio algun error: '+e);
                  console.log(e);
                }) 
    }
   }

});


App.component('modalvalidar',{
   template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
      <div style="color: white;background:green;display:flex;justify-content:space-between;width:15vw"><h6> VALIDACION</h6><button @click="this.$parent.mostrarmodalvalidar = false" type="button"  class="btn-xs btn-danger">X</button></div>
      <br>
      <div style="display:flex;justify-content:center;">
          <button   @click="guardarvalidar()" class="btn btn-primary">SI</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button   @click="this.$parent.mostrarmodalvalidar = false" class="btn btn-danger">NO</button>
      </div>
      <br>
      </div>
    </div>`,
   props:
    ['medicamento']
   ,
   data(){
     return{
        selectimg:''
     }
   } ,
   mounted(){
      
  
   },
   methods:{
    guardarvalidar(){
              var r = confirm("Esta seguro de validar el medicamento?");
              if (r == true) {
                
              } else {
                return;
              }
               
              axios.post('/delivery/save_auditoriavalidar',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },cod_med: this.medicamento.cod_med }).then(response => {
                   
                  
                  if(response.data==true){
                      alert('Se registro la validación');
                      this.$parent.selectedMed.estado = 3;
                      this.$parent.selectedMed.des_estado = 'VALIDADO';
                      this.$parent.mostrarmodalvalidar = false;
                
                  }else{
                    alert('Sucedio algun error');
                  }
        
                  
                }).catch(e => {
                  alert('Sucedio algun error: '+e);
                  console.log(e);
                }) 
    }
   }

});
 
App.component('modalreinicio',{
  template: 
   `<div class="ed-modal-container">
      <div class="ed-modal-content">
      <div style="color: white;background:green;display:flex;justify-content:space-between;"><h6> REINICIAR</h6><button @click="this.$parent.mostrarmodalreinicio = false" type="button"  class="btn-xs btn-danger">X</button></div>
      El medicamento regresará a la categoría "POR VALIDAR"
      <br>
      <div style="display:flex;justify-content:center;">
          <button   @click="guardarreiniciar()" class="btn btn-primary">SI</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button   @click="this.$parent.mostrarmodalreinicio = false" class="btn btn-danger">NO</button>
      </div>
      <br>
      </div>
    </div>`,
   props:
    ['medicamento']
    
   ,
   data(){
     return{
        selectimg:'',
        seguimientos:[]
     }
   } ,
   mounted(){
      
     
   },
   methods:{
    guardarreiniciar(){
              var r = confirm("Esta seguro de reiniciar el historial?");
              if (r == true) {
                
              } else {
                return;
              }
               
              axios.post('/delivery/save_auditoriareiniciar',{ headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },cod_med: this.medicamento.cod_med }).then(response => {
                   
                  
                  if(response.data==true){
                      alert('Se reinicio el historial');
                      this.$parent.selectedMed.estado = 0 ;
                      this.$parent.selectedMed.des_estado = 'POR VALIDAR';
                      this.$parent.mostrarmodalreinicio = false;
                
                  }else{
                    alert('Sucedio algun error');
                  }
        
                  
                }).catch(e => {
                  alert('Sucedio algun error: '+e);
                  console.log(e);
                }) 
    }
   }

});
 App.mount('#app');


</script>
 





