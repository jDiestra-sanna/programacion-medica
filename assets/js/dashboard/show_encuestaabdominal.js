import {Frm_encuesta_dolor_abdominal_formulario, Frm_encuesta_respiratorio_formulario ,Frm_seguimiento} from './Formularios.js'; 
//import {Frm_encuesta_dolor_abdominal_formulario, Frm_encuesta_respiratorio_formulario} from './Formularios.js'; 
import {Execute,permite_ingreso,Abre_Recordset_tablet,getusuario} from './module.js';
 var L_CodAte;
 var l_estado_audi;
 var negocio;
(function(){ 
if (document.getElementById('cbo_unegocio')!=null){
document.getElementById('cbo_unegocio').addEventListener('change',function(){
  var X = this.selectedIndex ;
  if ( X == 2 ){
    document.getElementById('Dcbo_especialista').style.display = 'inline-block';

  }else{
    document.getElementById('Dcbo_especialista').style.display = 'none';
    document.getElementById('Dcbo_especialista').value = 'XXX';

  }


},false)


document.getElementById('cbo_opcion').addEventListener('change',function(){
  var X = this.selectedIndex ;
  if ( X == 0 ){
     // document.getElementById('cbo_unegocio').style.display = 'inline-block';
      document.getElementById('txt_busqueda').style.display = 'inline-block';
      document.getElementById('txt_busqueda').value = '';
  }else if( X == 1 ) {
   // document.getElementById('cbo_unegocio').style.display = 'none';
    document.getElementById('txt_busqueda').style.display = 'inline-block';
    document.getElementById('txt_busqueda').value = '';
  }else{
   // document.getElementById('cbo_unegocio').style.display = 'none';
    document.getElementById('txt_busqueda').style.display = 'inline-block';
    document.getElementById('txt_busqueda').value = '';

   // document.getElementById('cbo_unegocio').value = '';
  }


},false)

}
})();
 



// ----------------------------------------------Añadir un objeto de atributos a un elemento------------------------//
const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr,attrObj[attr])
  }
};

// Crear elementos con atributos e hijo
const createCustomElement = (element,attributes,children) => {
  let customElement = document.createElement(element);
  if (children !== undefined) children.forEach(el => {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement,attributes);
  return customElement;
};

// ----------------------------------------------------Imprimir modales ------------------------------------------//
const printModal = content => {
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

elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
      removeModal();
    });
});
  
} 
 
const printModal2 = content => {
  // crear contenedor interno
  const modalContentEl2 = createCustomElement('div', {
    id: 'ed-modal-content2',
    class: 'ed-modal-content'
  }, [content]),

  // crear contenedor principal
  modalContainerEl2 = createCustomElement('div', {
    id: 'ed-modal-container2',
    class: 'ed-modal-container'
  }, [modalContentEl2]);

// Imprimir el modal
document.body.appendChild(modalContainerEl2);
  //modalContainerEl.displ

  // Remover el modal
  const removeModal2 = () => document.body.removeChild(modalContainerEl2);

  /* modalContainerEl.addEventListener('click', e => {
    if (e.target === modalContainerEl) removeModal();
  }) 
  document.querySelector('.cancelarmodal').addEventListener('click', e => {
    if (e.target === document.querySelector('.cancelarmodal')) removeModal();
  });*/
  let elementsArray2 = document.querySelectorAll(".cancelarmodal2");

  elementsArray2.forEach(function (elem) {
    elem.addEventListener("click", function () {
      removeModal2();
    });
  });

}



const printModal3 = content => {
  // crear contenedor interno
  const modalContentEl3 = createCustomElement('div', {
    id: 'ed-modal-content3',
    class: 'ed-modal-content'
  }, [content]),

  // crear contenedor principal
  modalContainerEl3 = createCustomElement('div', {
    id: 'ed-modal-container2',
    class: 'ed-modal-container'
  }, [modalContentEl3]);

// Imprimir el modal
document.body.appendChild(modalContainerEl3);
  //modalContainerEl.displ

  // Remover el modal
  const removeModal3 = () => document.body.removeChild(modalContainerEl3);

  /* modalContainerEl.addEventListener('click', e => {
    if (e.target === modalContainerEl) removeModal();
  }) 
  document.querySelector('.cancelarmodal').addEventListener('click', e => {
    if (e.target === document.querySelector('.cancelarmodal')) removeModal();
  });*/
  let elementsArray3 = document.querySelectorAll(".cancelarmodal3");

  elementsArray3.forEach(function (elem) {
    elem.addEventListener("click", function () {
      removeModal3();
    });
  });

}


window.Cmd_ficha_tablet_Click = async function(cod_serv){
  document.body.style.cursor = 'progress';
  var rs_ate =[];
 var Text='';

   var rs_antecedente  =[]     ;
  var rs_time_enferm  =[]      ;
  var rs_sintoma   =[]      ;
  var rs_fisico       =[]     ;
  var rs_diagnostico  =[]      ;
  var rs_medicamento =[]  ;
  var rs_exa_aux     =[]       ;
  var dato_ant_reg_1er =''    ;
  var dato_ant_reg_2do  ='';
  
  
   Text = ""
  
  //Datos de paciente
  
  
  //PARA MAD 
  await fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query:"select cod_ate, nom_pac, edad_ate, des_dir, des_dis,  nom_doc nom_medico, tipo_servicio from t_tmpllamadas WHERE tipo_servicio = 'ATE' AND cod_ate = " +  cod_serv
       })

     }).then(response => response.json())
    .then(  function (data ) {
      if(data.length>0) {
        rs_ate = data;
      }else{ 
          fetch('/modulo/Abre_Detalle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "select a.cod_ate, a.nom_pac, a.edad_ate, a.des_dir, a.des_dis, b.nom_medico, b.nom_enfermero, a.tipo_servicio from t_tmpllamadas a inner join t_amb_combo_asignacion b ON a.cod_asig = b.cod_asig WHERE a.cod_ate = " + cod_serv
             })
      
           }).then(response => response.json())
          .then(function (data ) {
            if(data.length>0) {
              rs_ate = data;
            }else{ 
                  //PARA AMBULANCIA
                    
            }
          }).catch(error => {
            console.log(error);
          });
      }
    }).catch(error => {
      console.log(error);
    });
  
  
   Text = "";
  
  if (rs_ate.length>0){
      Text = Text + "DATOS DEL PACIENTE ----------------------------------------------------------------------------------------------" + '\n' 
      Text = Text + "Num. Atencion : " + rs_ate[0].cod_ate + '\n' 
      Text = Text + "Paciente      : " + (rs_ate[0].nom_pac).trim() + '\n' 
      Text = Text + "Edad          : " + rs_ate[0].edad_ate + '\n' 
      Text = Text + "Direccion     : " + (rs_ate[0].des_dir).trim() + " - " +  (rs_ate[0].des_dis).trim() + '\n' 
      Text = Text + "Medico        : " + rs_ate[0].nom_medico + '\n' 
      if (rs_ate[0].tipo_servicio == "AMB" ){
          Text = Text + "Enfermero     : " + rs_ate[0].nom_enfermero + '\n'  + '\n' 
      }
      
  }
   
 
  //abre la conexion
   //DATOS DE ANTECEDENTES
  
   rs_antecedente =  await  Abre_Recordset_tablet( "SELECT  ate.cod_atencion, CASE WHEN tah.cod_tipo_antecedente_padre is null THEN tah.cod_tipo_antecedente ELSE tah.cod_tipo_antecedente_padre END codigo_grupo, " 
                              + "tah.cod_tipo_antecedente cod_det, CASE WHEN tah.cod_tipo_antecedente_padre is null THEN tah.descripcion ELSE tap.descripcion END descp_grupo, " 
                              + "tah.descripcion descp_det, upper(CASE WHEN c.observacion is null or c.observacion = '' THEN ant.descripcion ELSE ant.descripcion + ': ' + c.observacion END) descripcion " 
                              + "FROM atencion ate INNER JOIN paciente b ON ate.cod_paciente = b.cod_paciente " 
                              + "LEFT JOIN antecedente_paciente c ON b.cod_paciente = c.cod_paciente " 
                              + "INNER JOIN antecedente ant ON c.cod_antecedente = ant.cod_antecedente " 
                              + "INNER JOIN tipo_antecedente tah ON ant.cod_tipo_antecedente = tah.cod_tipo_antecedente " 
                              + "LEFT JOIN tipo_antecedente tap ON tah.cod_tipo_antecedente_padre = tap.cod_tipo_antecedente " 
                              + "WHERE ate.cod_atencion = " + cod_serv + "ORDER BY descp_grupo ASC, descp_det ASC, ant.descripcion ASC ");
  
   if  (rs_antecedente.length!=0){
       
      var txtantecedentes='';
      dato_ant_reg_1er = "";
      dato_ant_reg_2do = "";
      txtantecedentes = txtantecedentes + "ANTECEDENTES --------------------------------------------------------------------------------" + '\n' ;
      
      var a = 0;
              while (a < rs_antecedente.length) {
                if (rs_antecedente[a].descp_grupo != dato_ant_reg_1er){
                  dato_ant_reg_1er = rs_antecedente[a].descp_grupo;
                  txtantecedentes = txtantecedentes + '\t' + dato_ant_reg_1er + '\n' + '\n' ;
                }
            
                if (rs_antecedente[a].descp_det != dato_ant_reg_2do){
                  dato_ant_reg_2do = rs_antecedente[a].descp_det;
                  txtantecedentes  = txtantecedentes  + '\t' + '\t' + dato_ant_reg_2do + '\n' ;
                }
            txtantecedentes = txtantecedentes + '\t' + '\t' + '\t' + rs_antecedente[a].descripcion + '\n';

                a++;
              }
              
      txtantecedentes = txtantecedentes + "----------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
  }
  
  //DATOS DE SINTOMAS
  
  //tiempo de enfermedad
  rs_time_enferm =  await  Abre_Recordset_tablet( "SELECT tiempo_enfermedad_dias, tiempo_enfermedad_horas FROM registro_atencion WHERE cod_atencion = " + cod_serv);
  
  rs_sintoma = await  Abre_Recordset_tablet( "SELECT upper(tsint.descripcion) signo_sint, upper(sint.descripcion) det_signo_sint, " 
                              + "CASE WHEN sinate.opcion_seleccionada IS NULL or sinate.opcion_seleccionada = '' " 
                              + "THEN sinate.observacion ELSE CASE WHEN sinate.observacion IS NULL or sinate.observacion = '' THEN sinate.opcion_seleccionada ELSE " 
                              + "sinate.observacion + ': ' + sinate.opcion_seleccionada END END obs " 
                              + "FROM sintoma_atencion sinate " 
                              + "INNER JOIN sintoma sint ON sinate.cod_sintoma = sint.codigo " 
                              + "INNER JOIN tipo_sintoma tsint ON tsint.codigo_tipo_sintoma = sint.cod_tipo_sintoma " 
                              + "WHERE sinate.cod_atencion = " + cod_serv + "ORDER BY signo_sint ASc, det_signo_sint ASC");
  var txtsintoma='';
  if ( rs_sintoma.length>0  ){
  
    txtsintoma = txtsintoma + "SINTOMAS ---------------------------------------------------------------------------------------------------------" + '\n' ;
      
      //tiempo de enfermedad
      txtsintoma = txtsintoma  + '\t' + "TIEMPO DE ENFERMEDAD :" + rs_time_enferm[0].tiempo_enfermedad_dias + " dia(s) y " + rs_time_enferm[0].tiempo_enfermedad_horas + " hora(s) " + '\n' ;
      //los detalles de los sintomas
       dato_ant_reg_1er = "";
      
       var a = 0;
        while (a < rs_sintoma.length) {
          if (rs_sintoma[a].signo_sint != dato_ant_reg_1er ){
              dato_ant_reg_1er = rs_sintoma[a].signo_sint;
              txtsintoma = txtsintoma + '\t' + dato_ant_reg_1er + '\n' ;
          }
          
          if ( rs_sintoma[a].obs !=null || rs_sintoma[a].obs == "" ){
              txtsintoma = txtsintoma + '\t' + '\t' + rs_sintoma[a].det_signo_sint + '\n' ;
          }else{
              txtsintoma = txtsintoma + '\t' + '\t' + rs_sintoma[a].det_signo_sint + ": " +  (rs_sintoma[a].obs).toUpperCase() + '\n' ;
          }
          a++;
        }
      txtsintoma = txtsintoma + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' 
}
  //DATOS DE FISICO
  var txtfisico='';
  var rs_fisico = await Abre_Recordset_tablet( "SELECT CASE WHEN tfh.cod_tipo_fisico_padre is null THEN upper(tfh.descripcion) ELSE upper(tfp.descripcion) END descp_grupo,upper(tfh.descripcion) descp_det, " 
                          + "upper(exaf.descripcion) fis_descripcion, exaf_ate.observacion obs, exaf_ate.opcion_seleccionada, exaf_ate.valor_ingresado, exaf_ate.cod_ubicacion " 
                          + "FROM examen_fisico_atencion exaf_ate " 
                          + "INNER JOIN examen_fisico exaf ON exaf_ate.cod_examen_fisico = exaf.cod_fisico " 
                          + "INNER JOIN tipo_fisico tfh ON exaf.cod_tipo_fisico = tfh.cod_tipo_fisico " 
                          + "LEFT JOIN tipo_fisico tfp ON tfh.cod_tipo_fisico_padre = tfp.cod_tipo_fisico " 
                          + "Where exaf_ate.cod_atencion = " + cod_serv + "ORDER BY descp_grupo ASC, tfh.cod_tipo_fisico ASC, exaf.descripcion ASC");
  
   if ( rs_fisico.length>0  ){

      dato_ant_reg_1er = "";
      dato_ant_reg_2do = "";
      
      txtfisico = txtfisico + "FISICO -----------------------------------------------------------------------------------------------------------" + '\n' 
      var a = 0;
      while (a < rs_fisico.length) {
          if (rs_fisico[a].descp_grupo != dato_ant_reg_1er ){
              dato_ant_reg_1er = rs_fisico[a].descp_grupo;
              txtfisico = txtfisico + '\t' + dato_ant_reg_1er + '\n' + '\n' 
          }
          
          if (rs_fisico[a].descp_det != dato_ant_reg_2do ){
              dato_ant_reg_2do = rs_fisico[a].descp_det;
              txtfisico = txtfisico + '\t' + '\t' + dato_ant_reg_2do + '\n' 
          }
          
          if (  rs_fisico[a].cod_ubicacion==null || rs_fisico[a].cod_ubicacion == "" ){
              if  (rs_fisico[a].obs != null || rs_fisico[0].obs == "" ){
                  txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + '\n' ;
              }else{
                  txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + ": " + rs_fisico[a].obs + '\n' ;
              }
          }else{
              txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + ": " + rs_fisico[a].cod_ubicacion + '\n' ;
              
          }
          a++;

       }
      txtfisico = txtfisico + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
   }
  
  
  //DATOS DE DIAGNOSTICO
  var txtdiagnostico='';
  rs_diagnostico = await Abre_Recordset_tablet(" SELECT diag.cod_diagnostico, diag.descripcion, diag_ate.principal " 
                      + "FROM diagnostico diag INNER JOIN diagnostico_atencion diag_ate ON diag_ate.cod_diagnostico = diag.cod_diagnostico " 
                      + "Where diag_ate.cod_atencion = " + cod_serv + "ORDER BY diag_ate.principal DESC");
  
    if ( rs_diagnostico.length>0  ){ 
      txtdiagnostico = txtdiagnostico + "DIAGNOSTICO ------------------------------------------------------------------------------------------------------" + '\n' ;
      var a = 0;
        while (a < rs_diagnostico.length) {
          txtdiagnostico = txtdiagnostico + '\t' + rs_diagnostico[a].cod_diagnostico + " - " + rs_diagnostico[a].descripcion + (rs_diagnostico[a].principal == 't'? " (PRINC)": ("" + '\n')) ;
          a++;
        } 
      txtdiagnostico = txtdiagnostico + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
      a++;
    }
  
  
  //DATOS DE MEDICAMENTO
  var txtmedicamento='';
  rs_medicamento = await Abre_Recordset_tablet("SELECT med.descripcion, mate.cantidad, upper(presmed.descripcion) presentacion, upper(viamed.descripcion) via, " 
                      + "UPPER(CONVERT(varchar,cantidad_dosis) + ' ' + upper(dosis.descripcion) + CASE WHEN  mate.horas_frecuencia > 0 or mate.dias_frecuencia > 0 " 
                      + "THEN ' cada ' + CASE WHEN mate.horas_frecuencia <> 0 THEN CONVERT(varchar,mate.horas_frecuencia) + ' hrs.' ELSE CONVERT(varchar,mate.dias_frecuencia) + ' dias.' END " 
                      + "Else '' END + CASE WHEN mate.duracion > 0 THEN ' durante ' + CONVERT(varchar,mate.duracion) ELSE '' END) frecuencia " 
                      + "FROM medicamento_atencion mate " 
                      + "INNER JOIN viamedicamento viamed ON mate.cod_via = viamed.cod_via " 
                      + "INNER JOIN dosismedicamento dosis ON mate.cod_dosis = dosis.cod_dosis " 
                      + "INNER JOIN medicamento med ON mate.cod_medicamento = med.cod_medicamento " 
                      + "INNER JOIN presentacionmedicamento presmed ON med.cod_presentacion_medicamento = presmed.cod_presentacion " 
                      + "WHERE mate.cod_Atencion = " + cod_serv + " ORDER BY  med.descripcion ASC");
  
  if ( rs_medicamento.length>0  ){ 
      txtmedicamento = txtmedicamento + "MEDICAMENTOS -----------------------------------------------------------------------------------------------------" + '\n' ;
      var a = 0;
        while (a < rs_medicamento.length) {
          txtmedicamento = txtmedicamento + '\t' + rs_medicamento[a].Descripcion + " - " + rs_medicamento[a].cantidad + " - " + rs_medicamento[a].presentacion + " - " + rs_medicamento[a].via + " - " + rs_medicamento[a].frecuencia + '\n' ;
           a++;
        }
      txtmedicamento = txtmedicamento + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
  }
  var txtexa_aux ='';
  rs_exa_aux = await  Abre_Recordset_tablet( "SELECT exa.descripcion, exaate.valor_ingresado, exaate.observacion FROM examen_auxiliar_atencion exaate " 
                      + "INNER JOIN examen_auxiliar exa ON exaate.cod_examenauxiliar = exa.cod_examenauxiliar WHERE exaate.cod_atencion = " + cod_serv 
                      + "ORDER BY  exa.descripcion ASC");
  
   if ( rs_exa_aux.length>0  ){ 
          txtexa_aux = txtexa_aux + "EXAMENES AUXILIARES ----------------------------------------------------------------------------------------------" + '\n' ;
          var a = 0;
          while (a < rs_exa_aux.length) {
          txtexa_aux = txtexa_aux + '\t' + rs_exa_aux[a].descripcion + " - " + rs_exa_aux[a].valor_ingresado + " - " + rs_exa_aux[a].observacion + '\n' 
          a++;
        
          }
      txtexa_aux = txtexa_aux + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
  }
  
  
  printModal2(` <style> 
  </style>
  <div id="ed-modal-contentheadercm_actualizar_pac"  style="color: white;background:green;display:flex;justify-content:space-between;"><h6> HISTORIA CLINICA</h6><button type="button"  id="cancelaroptasoc" class="cancelarmodal2 btn-xs btn-danger">X</button></div>
  <div>
  <textarea style ="width:100%" rows=20 >
  ${Text + txtantecedentes + txtsintoma + txtfisico + txtdiagnostico + txtmedicamento + txtexa_aux}
  </textarea>
  </div>
  `);
  var ed_modal_content = document.getElementById("ed-modal-content2");

  ed_modal_content.style.minWidth = "40vw";
  document.body.style.cursor = 'default';
}

//papu 01/12
//papu 07/12
window.Cmd_filtrar_Click = function(){

  var cbo_opcion = document.getElementById('cbo_opcion').value;
  //If cbo_unegocio.Text = "" Then MsgBox ("Seleccione una unidad de negocio"): Exit Sub
  var cbo_unegocio = document.getElementById('cbo_unegocio').value;
  var fec_inicial =  document.getElementById('fec_inicial').value;
  var fec_final =  document.getElementById('fec_final').value;
  var estado = document.getElementById('estado').value;
  var tipoencuesta = document.getElementById('tipoencuesta').value;
  var cadena_tipoencuesta = '';
  var txt_busqueda = document.getElementById('txt_busqueda').value;
  var Dcbo_especialista = document.getElementById('Dcbo_especialista').value;
  var  sql = '';
  if (tipoencuesta=='A'){
    var cadena_tipoencuesta = cadena_tipoencuesta = `'R19.3','R19.0','R10.0','R10.1','R10.2','R10.3','R10.4','K30.x','K35.0','K35.1','K35.9','K36.X','K37.X','R14.X'`;        
    sql = "SELECT distinct CASE WHEN c.estado = 'PACIENTE NO CONTESTA' AND d.estado = 'PACIENTE NO CONTESTA' AND  a.flg_encuesta_dolor_abdominal = false then c.estado WHEN d.estado = 'EN SEGUIMIENTO' AND a.flg_encuesta_dolor_abdominal = false then 'EN SEGUIMIENTO' WHEN a.flg_encuesta_dolor_abdominal = false then 'PENDIENTE' ELSE d.estado END estado, " +
          "COALESCE(d.usuario, '')  usuario," +
          "flg_ficha,a.cod_ate,nom_clasif,des_dis,a.fec_ate,a.nom_pac,coalesce(esp.nom_esp,'') nom_esp,coalesce(nom_doc,'') doc,nom_gru,nom_emp,"+
          "coalesce(cast(horlla_ate as varchar),'') horlla_ate,feclla_ate,coalesce(cast(hor_ate as varchar),'') hor_ate,coalesce(cast(hrlledr as varchar),'') hrlledr,"+
          "coalesce(cast(horoplla_ate as varchar),'') horoplla_ate,coalesce(cast(hordia_ate as varchar),'') hordia_ate,f_clasificacion(a.cod_ate) clasi,"+
          "color_encuesta_abdominal(a.fecdia_ate + a.hordia_ate,diag.cod_dia), DATE_PART('year', AGE(now(), fnac_pac)) AS edadactual, f_obtiene_abdominalorespiratorio(trim(diag.cod_dia)) "
          + " FROM t_tmpllamadas as a INNER JOIN m_hiaclinica diag ON a.cod_ate = diag.cod_ate "
          + " LEFT JOIN m_clasificacion_pac as b ON a.clasificacion_pac = b.cod_clasif "
          + " JOIN m_pacientesdrmas as p on a.cod_tit = p.cod_hia "
          + " LEFT JOIN m_especialidades as esp on a.cod_esp = esp.cod_esp "
          + " LEFT JOIN vw_encuesta_dolor_abdominal_paciente_no_contesta c on c.cod_ate = a.cod_ate "
          + " LEFT JOIN t_encuesta_dolor_abdominal d on d.cod_ate = a.cod_ate "
          + " WHERE "
          + " diag.cod_dia in (" + cadena_tipoencuesta +") " 
          + " and a.clasificacion_pac in (" + JSON.parse(cbo_unegocio).clasif + ")"  
          + (cbo_opcion =='2' && txt_busqueda.trim()!='' ?" and a.cod_ate = " +  txt_busqueda:'' )
          + (cbo_opcion =='1' && txt_busqueda.trim()!='' ?" and p.nom_com like '%" +  txt_busqueda+"%'":'' )
          + (cbo_opcion =='0' && txt_busqueda.trim()!='' ?" and p.num_doc_id like '%" +  txt_busqueda+"%'":'' )
          + (JSON.parse(cbo_unegocio).clasif =='3' && Dcbo_especialista!='0' && Dcbo_especialista!='XXX'  ?" and a.cod_esp = '" +  Dcbo_especialista +"'":'' )
          + " AND a.nom_emp not like '%AUSENT%'  AND a.nom_gru not like '%AUSENT%' "
       //   + " AND a.fec_ate >= '2018/06/27' and (a.fecdia_ate + a.hordia_ate) + '06:00:00' :: interval <= current_date + current_time "  
          + " and (a.fecdia_ate + a.hordia_ate) + '08:00:00' :: interval <= current_date + current_time "  
          + " AND a.fecdia_ate >= '"+fec_inicial+"' and  a.fecdia_ate <= '" +fec_final
          + "' AND a.canc_ate is null AND a.flgvnr is null   and a.flg_encuesta_dolor_abdominal = " +  (estado=='0'?'false':'true');
  }else{
    cadena_tipoencuesta = `'J21.9','J20.8','J20.9','J40.X','J44.9','J98.0','J06.9','J22.X','J10.0','J04.0','J05.0','J06.0','J04.2','J06.8','J04.1','J45.9','J45.0','J45.8','J45.1','J00.X'`;
     
    sql = " SELECT distinct flg_ficha,a.cod_ate,nom_clasif,des_dis,a.fec_ate,a.nom_pac,coalesce(esp.nom_esp,'') nom_esp,coalesce(nom_doc,'') doc,nom_gru,nom_emp,"+
    "coalesce(cast(horlla_ate as varchar),'') horlla_ate,feclla_ate,coalesce(cast(hor_ate as varchar),'') hor_ate,coalesce(cast(hrlledr as varchar),'') hrlledr,"+
    "coalesce(cast(horoplla_ate as varchar),'') horoplla_ate,coalesce(cast(hordia_ate as varchar),'') hordia_ate,f_clasificacion(a.cod_ate) clasi,"+
    "color_encuesta_abdominal(a.fecdia_ate + a.hordia_ate,diag.cod_dia), DATE_PART('year', AGE(now(), fnac_pac)) AS edadactual, f_obtiene_abdominalorespiratorio(trim(diag.cod_dia))  "
    + " FROM t_tmpllamadas as a INNER JOIN m_hiaclinica diag ON a.cod_ate = diag.cod_ate "
    + " LEFT JOIN m_clasificacion_pac as b ON a.clasificacion_pac = b.cod_clasif "
    + " join m_pacientesdrmas as p on a.cod_tit = p.cod_hia "
    + " left join t_encuesta_respiratorio as resp on a.cod_ate = resp.cod_ate "
    + " left join m_especialidades as esp on a.cod_esp = esp.cod_esp "
    + " WHERE "
    + " diag.cod_dia in (" + cadena_tipoencuesta +") " 
    + " and a.clasificacion_pac in (" + JSON.parse(cbo_unegocio).clasif + ")"  
    + (cbo_opcion =='2' && txt_busqueda.trim()!='' ?" and a.cod_ate = " +  txt_busqueda:'' )
    + (cbo_opcion =='1' && txt_busqueda.trim()!='' ?" and p.nom_com like '%" +  txt_busqueda+"%'":'' )
    + (cbo_opcion =='0' && txt_busqueda.trim()!='' ?" and p.num_doc_id like '%" +  txt_busqueda+"%'":'' )
    + (JSON.parse(cbo_unegocio).clasif =='3' && Dcbo_especialista!='0' && Dcbo_especialista!='XXX'  ?" and a.cod_esp = '" +  Dcbo_especialista +"'":'' )
    + " AND a.nom_emp not like '%AUSENT%'  AND a.nom_gru not like '%AUSENT%' "
 //   + " AND a.fec_ate >= '2018/06/27' and (a.fecdia_ate + a.hordia_ate) + '06:00:00' :: interval <= current_date + current_time "  
    + " and (a.fecdia_ate + a.hordia_ate) + '08:00:00' :: interval <= current_date + current_time "  
    + " AND a.fecdia_ate >= '"+fec_inicial+"' and  a.fecdia_ate <= '" +fec_final
    + "' AND a.canc_ate is null AND a.flgvnr is null  "
    + " and ( resp.flg_encuesta_respiratoria = " +  (estado=='0'?'false':'true') + " or resp.flg_encuesta_respiratoria is "+  (estado=='0'?'null':'true')   + ")  ORDER BY a.cod_ate ASC";
  }

/* if (JSON.parse(cbo_unegocio).clasif == "999" ){
    
    sql = "SELECT distinct flg_ficha,a.cod_ate,nom_clasif,des_dis,a.fec_ate,nom_pac,nom_doc doc,nom_gru,nom_emp,horlla_ate,feclla_ate,hor_ate,hrlledr,horoplla_ate,hordia_ate,f_clasificacion(a.cod_ate) clasi FROM t_tmpllamadas as a" 
          + " INNER JOIN m_hiaclinica diag ON a.cod_ate = diag.cod_ate " 
          + " LEFT JOIN m_clasificacion_pac as b ON a.clasificacion_pac = b.cod_clasif " 
          + " LEFT JOIN m_clasificacion_pac as b ON a.clasificacion_pac = b.cod_clasif " 
          + " WHERE a.clasificacion_pac in (" + JSON.parse(cbo_unegocio).clasif + ") AND diag.cod_dia in ('R19.3','R19.0','R10.4','R10.1','R10.0','R10.1','R10.2','R10.3','R10.4','K30','K35.0','K35.1','K35.9','K36','K37','R14') " 
          + " AND a.nom_emp not like '%AUSENT%'  AND a.nom_gru not like '%AUSENT%' " 
          + " AND a.fec_ate >= '2018/06/27' and (a.fecdia_ate + a.hordia_ate) + '06:00:00' :: interval <= current_date + current_time " 
          + " AND a.canc_ate is null AND a.flgvnr is null AND tipo_servicio = 'AMB' AND a.cm_estado = '3' and a.flg_encuesta_dolor_abdominal = false ORDER BY a.cod_ate ASC";
           
}else{ */
    
         
          
/* } */
document.body.style.cursor = 'progress' ;
filacurrent='';
document.getElementById('t02').innerHTML = '';
fetch("/modulo/Abre_Detalle", {
 
  method: 'POST' ,
   body: JSON.stringify({
    query : sql

  })
}).then(response => response.json())
  .then(function (data) {
      
    if (data.length>0) {
      
      
       for (let i =0; i < data.length; i++) {
 
        var tr = document.createElement('tr');   
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
        var td8 = document.createElement('td');
        var td9 = document.createElement('td');
        var td10 = document.createElement('td');
        var td11 = document.createElement('td');
        var td12 = document.createElement('td');
        var td13 = document.createElement('td');
        var td14 = document.createElement('td');
        var td15 = document.createElement('td');
        var td16 = document.createElement('td');
        var td17 = document.createElement('td');
        var td18  = document.createElement('td');
        var td19  = document.createElement('td');
        var td20  = document.createElement('td');
        var td21  = document.createElement('td');
        //var td22  = document.createElement('td');


        td1.appendChild(document.createTextNode(data[i].flg_ficha));
        td2.appendChild(document.createTextNode(data[i].cod_ate));
        td3.appendChild(document.createTextNode(data[i].nom_clasif));
        td4.appendChild(document.createTextNode(data[i].des_dis));
        td5.appendChild(document.createTextNode(data[i].fec_ate));
        td6.appendChild(document.createTextNode(data[i].nom_pac));
        td7.appendChild(document.createTextNode(data[i].nom_esp));
        td8.appendChild(document.createTextNode(data[i].doc));
        td9.appendChild(document.createTextNode(data[i].nom_gru));
        td10.appendChild(document.createTextNode(data[i].nom_emp));
        td11.appendChild(document.createTextNode(data[i].horlla_ate));
        td12.appendChild(document.createTextNode(data[i].feclla_ate));
        td13.appendChild(document.createTextNode(data[i].hor_ate));
        td14.appendChild(document.createTextNode(data[i].hrlledr));
        td15.appendChild(document.createTextNode(data[i].horoplla_ate));
        td16.appendChild(document.createTextNode(data[i].hordia_ate));
        td17.appendChild(document.createTextNode(data[i].clasi));
        td18.appendChild(document.createTextNode(data[i].f_obtiene_abdominalorespiratorio));
        td19.appendChild(document.createTextNode(data[i].edadactual));
        td20.appendChild(document.createTextNode(data[i].estado));
        td21.appendChild(document.createTextNode(data[i].usuario));
        //td22.appendChild(document.createTextNode(data[i].descripcion_estado));

        tr.id = data[i].cod_ate;
        tr.onclick = function() {
          if (filacurrent!='')  document.getElementById(filacurrent).style.backgroundColor = '';

         // .style.backgroundColor = red;
          this.style.backgroundColor = 'turquoise';
          filacurrent = this.id;
          };
        tr.appendChild(td1); 
        tr.appendChild(td2); 
        tr.appendChild(td3); 
        tr.appendChild(td4); 
        tr.appendChild(td5); 
        tr.appendChild(td6); 
        tr.appendChild(td7);
        tr.appendChild(td20);
        tr.appendChild(td19);
        tr.appendChild(td21); 
        tr.appendChild(td18); 
        tr.appendChild(td8); 
        tr.appendChild(td9); 
        tr.appendChild(td10); 
        tr.appendChild(td11); 
        tr.appendChild(td12); 
        tr.appendChild(td13); 
        tr.appendChild(td14); 
        tr.appendChild(td15); 
        tr.appendChild(td16); 
        tr.appendChild(td17);
        //tr.appendChild(td22);
 
        td17.style.display  = 'none';
      

        tr.classList.add(data[i].color_encuesta_abdominal);
        document.getElementById('t02').appendChild(tr);
   
      }  
       document.body.style.cursor = 'default' ; 
        document.getElementById('Frame1').innerHTML= "Cant. atenciones: ."+data.length;
    }else{
     
      document.body.style.cursor = 'default' ;
      document.getElementById('Frame1').innerHTML= "Cant. atenciones: 0";
    }
    
   }).catch(error => {
    console.log(error);
  });

}

var filacurrent='';

window.modaldiagnosticos = async  function(el) {
  
    
   //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> DIAGNOSTICOS</h4><button type="button"  id="cancelardetalle" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  

<fieldset  id="fdiagnostico" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Diagnosticos</legend>
 
 
<table id="tdiagnostico"  border style="border-collapse: collapse;width: 100%;">
<thead style=" background-color:#00aae4;color:white;">
<tr  >
<td>
CODIGO
</td>
<td>
DESCRIPCION
</td>
<td>
FEC ATE
</td> 
</tr>
</thead>
<tbody id="diagnosticobody">
</tbody>
</table>
  
</fieldset>



<div   style="display:flex;justify-content:flex-end;">
 <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cerrar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));

  document.body.style.cursor = 'progress'

  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     query : "SELECT A.COD_DIA,B.DES_DIA,A.FEC_ATE FROM M_HIACLINICA AS A, M_DIAGNOSTICOS AS B WHERE A.COD_DIA=B.COD_DIA AND A.COD_ATE=" + el + " ORDER BY B.DES_DIA"
    })
  }).then(response => {
    return response.json();
  }).then(data => {

    document.body.style.cursor = 'default'
    var html = '';
    var i;
    if (data.length == 0) {
      alert('No se encontraron pruebas...');
    }
    for (i = 0; i < data.length; i++) {


      html += '<tr> ' +
        '<td style = "text-align: center;  border: 1px solid black; " >' + data[i].cod_dia + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].des_dia + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].fec_ate + '</td>' +
      '</tr>';
    }

    document.getElementById('diagnosticobody').innerHTML = html;
    document.body.style.cursor = 'default';
  }).catch(error => {
    alert("Error ");
    console.log(error);
    document.body.style.cursor = 'default';
  })

}

window.modalmedicamentos = async  function(el) {
  
  document.body.style.cursor = 'progress';

   //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal2(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> PEDIDOS</h4><button type="button"  id="cancelardetalle" class="cancelarmodal2 btn-xs btn-danger">X</button></div>
 
  

<fieldset  id="Pedidos" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Pedidos</legend>
 
 
<table id="pedidodetalle"  border style="border-collapse: collapse;width: 100%;">
<thead style=" background-color:#00aae4;color:white;">
<tr  >
<td>
CODIGO
</td>
<td>
CLASIFICACION
</td>
<td>
FEC.CRE
</td>
<td>
HOR.CRE
</td>
<td>
TIPO
</td>
<td>
ESTADO
</td>
</tr>
</thead>
<tbody id="pedidobody">
</tbody>
</table>
  
</fieldset>



<div   style="display:flex;justify-content:flex-end;">
 <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal2"  id="btn_cancelar" name="btn_cancelar" value="Cerrar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));

  document.body.style.cursor = 'progress'

  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query:`SELECT ped.*, CASE WHEN ped.cod_ate = 999999 THEN clfped.nom_clasif ELSE clf.nom_clasif END AS clasif,  CASE WHEN ate.contador_periodo = 1 THEN 'CTRL' ELSE CASE WHEN ate.cod_tipo_seg_cronico = 1 THEN 'SEG*' ELSE 'SEG' END  END perfil_ate, ped.flg_validado, olvae.descripcion descripcion_olvae, ped.condicion_pedido, CASE WHEN condicion_pedido is null THEN '' WHEN condicion_pedido = 0 THEN 'AUDITADO' WHEN condicion_pedido = 1 THEN 'OBSERVADO' WHEN condicion_pedido = 2 THEN 'CON STOCK' END condicion_ped,  provmot.descripcion proveedor_mot, trim(dist.des_dis) distrito, trim(prov.des_prov) provincia,  CASE WHEN ped.cod_ate = 999999 THEN CASE WHEN ped.clasificacion_ped is null THEN 0 ELSE  ped.clasificacion_ped END ELSE clf.cod_clasif END cod_clasif  FROM T_TMPPEDIDOMED ped  LEFT JOIN m_clasificacion_pac clfped ON ped.clasificacion_ped = clfped.cod_clasif  LEFT JOIN m_motorizados mot ON ped.cod_mot = mot.cod_mot  LEFT JOIN m_proveedor_motorizado provmot ON provmot.cod_prov_motorizado = mot.cod_prov_motorizado  LEFT
    JOIN m_distritos dist ON ped.cod_dis = dist.cod_dis  LEFT JOIN m_provincias prov ON dist.cod_prov = prov.cod_prov  LEFT JOIN t_tmpllamadas ate ON ped.cod_ate = ate.cod_ate  LEFT JOIN m_clasificacion_pac clf ON ate.clasificacion_pac = clf.cod_clasif  LEFT JOIN mae_olva_estados olvae ON ped.ult_cod_olva = olvae.codigo  WHERE ped.cod_ate = ${el}  ORDER BY ped.estado ASC`  

    })
  }).then(response => {
    return response.json();
  }).then(data => {

    document.body.style.cursor = 'default'
    var html = '';
    var i;
    if (data.length == 0) {
      alert('No se encontraron pedidos...');
    }
    for (i = 0; i < data.length; i++) {


      html += '<tr> ' +
        '<td style = "text-align: center;  border: 1px solid black; " >' + data[i].cod_ped + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].clasif + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].feclla_ped + '</td>'+
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].horlla_ped + '</td>'+
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].flag_tp + '</td>'+
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].estado + '</td>'+
        '<td style = "text-align: center;  border: 1px solid black;"><input type="button"  class="btn btn btn-warning btn-sm "  id="btn_detalle" name="btn_detalle" onclick = "modalpedidodetalle('+ data[i].cod_ped  +')" value="Mostrar Detalle"> </td>'

      '</tr>';
    }

    document.getElementById('pedidobody').innerHTML = html;
    document.body.style.cursor = 'default';

  }).catch(error => {
    alert("Error ");
    console.log(error);
    document.body.style.cursor = 'default';

  })

}

window.modaldetalle = async  function(el) {
  document.body.style.cursor = 'progress';
  var cod_serv_laboratorio='';
  var estado_lab = '';
  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        query:"select cod_serv_laboratorio,estado  from t_cab_lab_serv_laboratorio where cod_ate = "  +   el
      }
    )
  }).then(response => response.json())
    .then(function (data) {

        cod_serv_laboratorio = data[0].cod_serv_laboratorio;
        estado_lab= data[0].estado;
    }).catch(error => {
      console.log(error);
    });
    if (cod_serv_laboratorio == '' ) {

      alert('No hay pruebas');
      return
    }
    
   //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal(`
   <div id="ed-modal-contentheader"  style="color: white;background:#00aae4;display:flex;justify-content:space-between;"><h4> DETALLE</h4><button type="button"  id="cancelardetalle" class="cancelarmodal btn-xs btn-danger">X</button></div>
 
  

<fieldset  id="Pruebas" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >Pruebas</legend>
 
 
<table id="pruebasdetalle"  border style="border-collapse: collapse;width: 100%;">
<thead style=" background-color:#00aae4;color:white;">
<tr  >
<td>
CODIGO
</td>
<td>
DESCRIPCION
</td>
<td>
CLASIFICACION
</td>
<td>
ESTADO
</td>
</tr>
</thead>
<tbody id="pruebasdetallebody">
</tbody>
</table>
  
</fieldset>



<div   style="display:flex;justify-content:flex-end;">
 <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal"  id="btn_cancelar" name="btn_cancelar" value="Cerrar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));

  document.body.style.cursor = 'progress'

  await fetch('/gestionlaboratorio/Adata_pruebas_detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_serv_laboratorio: cod_serv_laboratorio
    })
  }).then(response => {
    return response.json();
  }).then(data => {

    document.body.style.cursor = 'default'
    var html = '';
    var i;
    if (data.length == 0) {
      alert('No se encontraron pruebas...');
    }
    for (i = 0; i < data.length; i++) {


      html += '<tr> ' +
        '<td style = "text-align: center;  border: 1px solid black; " >' + data[i].cod_pruebas + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].descripcion + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].clasificacion + '</td>'+
        '<td style = "text-align: center;  border: 1px solid black;">' + estado_lab + '</td>' 
      '</tr>';
    }

    document.getElementById('pruebasdetallebody').innerHTML = html;
    document.body.style.cursor = 'default';
  }).catch(error => {
    alert("Error ");
    console.log(error);
    document.body.style.cursor = 'default';
  })

}

window.modalpedidodetalle  = async  function(el) {
  
    
   //<div  style="display: grid;grid-template-columns:  1fr 1fr ;"></div>
  printModal3(`
   <div id="ed-modal-contentheader"  style="color: white;background:#f6c23e;display:flex;justify-content:space-between;"><h4> DETALLE PEDIDO</h4><button type="button"  id="cancelardetalle" class="cancelarmodal3 btn-xs btn-danger">X</button></div>
 
  

<fieldset  id="PedidoDetalle" style ="border:1px solid">
<legend style ="width:auto;font-size:2vmin;font-weight:bold" >DETALLE</legend>
 
 
<table id="pedidosdetalle"  border style="border-collapse: collapse;width: 100%;">
<thead style=" background-color:#f6c23e;color:white;">
<tr  >
<td>
CODIGO
</td>
<td>
DESCRIPCION
</td>
<td>
CANT.PED.
</td>
<td>
USUARIO
</td>
</tr>
</thead>
<tbody id="pedidodetallebody">
</tbody>
</table>
  
</fieldset>



<div   style="display:flex;justify-content:flex-end;">
 <input type="button"  class="btn btn btn-danger btn-sm cancelarmodal3"  id="btn_cancelar" name="btn_cancelar" value="Cerrar"> 
</div>
`);

  dragElement(document.getElementById("ed-modal-content"));

  document.body.style.cursor = 'progress'

  await fetch('/modulo/Abre_Detalle/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "Select * from t_tmpdetpedmed where cod_ped='" + el  +  "'"
    })
  }).then(response => {
    return response.json();
  }).then(data => {

    document.body.style.cursor = 'default'
    var html = '';
    var i;
    if (data.length == 0) {
      alert('No se encontraron pruebas...');
    }
    for (i = 0; i < data.length; i++) {


      html += '<tr> ' +
        '<td style = "text-align: center;  border: 1px solid black; " >' + data[i].cod_med + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].des_med + '</td>' +
        '<td style = "text-align: center;  border: 1px solid black;">' + data[i].can_med + '</td>'+
        '<td style = "text-align: center;  border: 1px solid black;">' +  data[i].coduse + '</td>' 
      '</tr>';
    }

    document.getElementById('pedidodetallebody').innerHTML = html;
    document.body.style.cursor = 'default';
  }).catch(error => {
    alert("Error ");
    console.log(error);
    document.body.style.cursor = 'default';
  })
  var ed_modal_content = document.getElementById("ed-modal-content3");
  dragElement(ed_modal_content);
  ed_modal_content.style.maxWidth = "40vw";
}


window.Cmd_encuesta_Click = async function (){
 if ( filacurrent=='') return;
 var query = '';
 var pac_no_contesta;

 /*
 if(document.getElementById(filacurrent).children[7].innerHTML =='PENDIENTE' ){
  alert("ESTA EN PENDIENTE");
  pac_no_contesta = true;
}else{
  alert("NO ES PENDIENTE");
  pac_no_contesta = false;
}*/
  
  if(document.getElementById(filacurrent).children[10].innerHTML =='ABDOMINAL' ){
  printModal(Frm_encuesta_dolor_abdominal_formulario(filacurrent,'ABDOMINAL', pac_no_contesta));
  query = `SELECT a.des_dir, a.flg_encuesta_dolor_abdominal,   f_clasificacion(a.cod_ate) negocio, a.nom_pac, a.nom_doc, b.pac_vip,a.cod_tit, a.edad_ate, a.tlf_dir, b.cel_pac, a.nom_gru,e.preg_1_v2,e.preg_2_v2,e.preg_3_v2,e.preg_3_v2_val,e.preg_4_v2,e.preg_5_v2,e.preg_6_v2,e.preg_7_v2,e.estado
  FROM t_tmpllamadas as a 
  join m_pacientesdrmas as b on a.cod_tit = b.cod_hia 
  left join t_encuesta_dolor_abdominal e on a.cod_ate = e.cod_ate
  where  a.cod_ate = `+filacurrent
  
 }else{
  query = `SELECT e.flg_encuesta_respiratoria,   f_clasificacion(a.cod_ate) negocio, a.nom_pac, a.nom_doc, b.pac_vip,a.cod_tit, a.edad_ate, a.tlf_dir, b.cel_pac, a.nom_gru,e.preg_1,e.preg_2,e.preg_3,e.preg_4,e.preg_5,e.preg_6,e.preg_7,e.preg_8,e.estado
  FROM t_tmpllamadas as a 
  join m_pacientesdrmas as b on a.cod_tit = b.cod_hia 
  left join t_encuesta_respiratorio e on a.cod_ate = e.cod_ate
  where  a.cod_ate = ` + filacurrent
  printModal(Frm_encuesta_respiratorio_formulario(filacurrent,'RESPIRATORIO'));

 }

var ed_modal_content = document.getElementById("ed-modal-content");
dragElement(ed_modal_content);
ed_modal_content.style.minWidth = "55vw";
//init();
await fetch('/modulo/Abre_Detalle/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query:query

  })
}).then(response => response.json())
  .then(function (Adata_ate) {
     if(Adata_ate.length>0){
          document.getElementById('Txt_pac').value = Adata_ate[0].nom_pac.trim();
          document.getElementById('Txt_cod_tit').value = Adata_ate[0].cod_tit.trim();
          
          var txt_tipoencuesta =  document.getElementById('txt_tipoencuesta').value;
          //alert(txt_pac_no_contesta);

          document.getElementById('Txt_doctor').value   = ((Adata_ate[0].nom_doc??='').trim()==null?'':Adata_ate[0].nom_doc.trim());
          document.getElementById('Lbl_vip').innerHTML = "Paciente Vip: " + Adata_ate[0].pac_vip;
          document.getElementById('Txt_edad').value = Adata_ate[0].edad_ate.trim();
          document.getElementById('Txt_telef').value  =  (Adata_ate[0].tlf_dir.trim()==null?'':Adata_ate[0].tlf_dir.trim()); 
          document.getElementById('Txt_cel').value  = (Adata_ate[0].cel_pac.trim()==null?'':Adata_ate[0].cel_pac.trim());  
          document.getElementById('Txt_grupo').value   =  (Adata_ate[0].nom_gru.trim()==null?'':Adata_ate[0].nom_gru.trim());      
          document.getElementById('Txt_negocio').value   =  (Adata_ate[0].negocio.trim()==null?'':Adata_ate[0].negocio.trim());
          document.getElementById('txt_dirrec').value   =  (Adata_ate[0].des_dir.trim()==null?'':Adata_ate[0].des_dir.trim());
          document.getElementById('txt_dirrec').value   =  (Adata_ate[0].des_dir.trim()==null?'':Adata_ate[0].des_dir.trim());     
      
          if(Adata_ate[0].flg_encuesta_dolor_abdominal == 't' && txt_tipoencuesta == 'ABDOMINAL'){
            document.getElementById('cboseguimientoencuesta').disabled = true ;
            document.getElementById('Cmd_Paciente_no_contesta').disabled = true ;
            document.getElementById('Command1').disabled = true ;
            document.getElementById('pregunta1aumento').disabled = true ;
            document.getElementById('pregunta1disminucion').disabled = true ;
            document.getElementById('pregunta1semantiene').disabled = true ;
            document.getElementById('pregunta1sindolor').disabled = true ;
            document.getElementById('pregunta2continuo').disabled = true ;
            document.getElementById('pregunta2intermitente').disabled = true ;
            document.getElementById('pregunta2localizado').disabled = true ;
            document.getElementById('pregunta2difuso').disabled = true ;
            document.getElementById('pregunta2noaplica').disabled = true ;
            document.getElementById('pregunta3si').disabled = true ;
            document.getElementById('pregunta3no').disabled = true ;
            document.getElementById('pregunta3otros').disabled = true ;
            document.getElementById('pregunta4abdomensuperior').disabled = true ;
            document.getElementById('pregunta4abdomeninferior').disabled = true ;
            document.getElementById('pregunta4noaplica').disabled = true ;
            document.getElementById('pregunta5fiebre').disabled = true ;
            document.getElementById('pregunta5apetitodisminuido').disabled = true ;
            document.getElementById('pregunta5diarreaestrenimiento').disabled = true ;
            document.getElementById('pregunta5nauseasvomitos').disabled = true ;
            document.getElementById('pregunta6si').disabled = true ;
            document.getElementById('pregunta6no').disabled = true ;
            document.getElementById('pregunta7').disabled = true ; 
          }
          if(Adata_ate[0].flg_encuesta_respiratoria == 't' && txt_tipoencuesta == 'RESPIRATORIO'){
            document.getElementById('Cmd_Paciente_no_contesta').disabled = true ;
            document.getElementById('Command1').disabled = false ;
            document.getElementById('pregunta1sir').disabled = true ;
            document.getElementById('pregunta1nor').disabled = true ;
            document.getElementById('pregunta2sir').disabled = true ;
            document.getElementById('pregunta2nor').disabled = true ;
            document.getElementById('pregunta3productivar').disabled = true ;
            document.getElementById('pregunta3disfonicar').disabled = true ;
            document.getElementById('pregunta3exigenter').disabled = true ;
            document.getElementById('pregunta4sibilantesr').disabled = true ;
            document.getElementById('pregunta4roncantesr').disabled = true ;
             document.getElementById('pregunta5sir').disabled = true ;
            document.getElementById('pregunta5nor').disabled = true ;
            document.getElementById('pregunta6sir').disabled = true ;
            document.getElementById('pregunta6nor').disabled = true ;
            document.getElementById('pregunta7sir').disabled = true ;
            document.getElementById('pregunta7nor').disabled = true ;
            document.getElementById('pregunta8r').disabled = true ; 
          }

          if( txt_tipoencuesta == 'ABDOMINAL'){

         

                      if ( new Set([null, '']).has(Adata_ate[0].estado) ){
                          
                      }else{
                        document.getElementById('cboseguimientoencuesta').value  = Adata_ate[0].estado;
                      }      
                      if ( new Set([null, 0]).has(Adata_ate[0].preg_1_v2) ){
                          
                      }else if (Adata_ate[0].preg_1_v2 == 1){
                        document.getElementById('pregunta1aumento').checked  = true;
                      }else if (Adata_ate[0].preg_1_v2 == 2){
                        document.getElementById('pregunta1disminucion').checked  = true;
                      }else if (Adata_ate[0].preg_1_v2 == 3){
                        document.getElementById('pregunta1semantiene').checked  = true;
                      }else if (Adata_ate[0].preg_1_v2 == 4){
                        document.getElementById('pregunta1sindolor').checked  = true;
                      }
                      if ( new Set([null, 0]).has(Adata_ate[0].preg_2_v2) ){
                          
                      }else if (Adata_ate[0].preg_2_v2 == 1){
                        document.getElementById('pregunta2continuo').checked  = true;
                      }else if (Adata_ate[0].preg_2_v2 == 2){
                        document.getElementById('pregunta2intermitente').checked  = true;
                      }else if (Adata_ate[0].preg_2_v2 == 3){
                        document.getElementById('pregunta2localizado').checked  = true;
                      }else if (Adata_ate[0].preg_2_v2 == 4){
                        document.getElementById('pregunta2difuso').checked  = true;
                      }
                      else if (Adata_ate[0].preg_2_v2 == 0){
                        document.getElementById('pregunta2noaplica').checked  = true;
                      }
                      if ( new Set([null, 0]).has(Adata_ate[0].preg_3_v2) ){
                          
                      }else if (Adata_ate[0].preg_3_v2 == 1){
                        document.getElementById('pregunta3si').checked  = true;
                        document.getElementById('pregunta3otros').style.display = 'block'
                        document.getElementById('pregunta3otros').value  = Adata_ate[0].preg_3_v2_val;
                      }else if (Adata_ate[0].preg_3_v2 == 2){
                        document.getElementById('pregunta3no').checked  = true;
                      }
                      if ( new Set([null, 0]).has(Adata_ate[0].preg_4_v2) ){
                          
                      }else if (Adata_ate[0].preg_4_v2 == 1){
                        document.getElementById('pregunta4abdomensuperior').checked  = true;
                      }else if (Adata_ate[0].preg_4_v2 == 2){
                        document.getElementById('pregunta4abdomeninferior').checked  = true;
                      }
                      else if (Adata_ate[0].preg_4_v2 == 0){
                        document.getElementById('pregunta4noaplica').checked  = true;
                      }
                      if ( new Set([null, '{}']).has(Adata_ate[0].preg_5_v2) ){
                      }else {
                            if ( (Adata_ate[0].preg_5_v2).slice(0,-1).slice(1).split(',').includes('1') ){
                              document.getElementById('pregunta5fiebre').checked  = true;
                            }
                            if ( (Adata_ate[0].preg_5_v2).slice(0,-1).slice(1).split(',').includes('2') ){
                              document.getElementById('pregunta5apetitodisminuido').checked  = true;
                            }
                            if ( (Adata_ate[0].preg_5_v2).slice(0,-1).slice(1).split(',').includes('3') ){
                              document.getElementById('pregunta5diarreaestrenimiento').checked  = true;
                            }
                            if ( (Adata_ate[0].preg_5_v2).slice(0,-1).slice(1).split(',').includes('4') ){
                              document.getElementById('pregunta5nauseasvomitos').checked  = true;
                            }
                            
                      }
                      if (Adata_ate[0].preg_5_v2 == '{0}'){
                        document.getElementById('pregunta5noaplica').checked  = true;
                      }

                      if ( new Set([null, 0]).has(Adata_ate[0].preg_6_v2) ){
                          
                      }else if (Adata_ate[0].preg_6_v2 == 1){
                        document.getElementById('pregunta6si').checked  = true;
                        
                      }else if (Adata_ate[0].preg_6_v2 == 0){
                        document.getElementById('pregunta6no').checked  = true;
                      }
                      if ( new Set([null, '']).has(Adata_ate[0].preg_7_v2) ){
                          
                      }else{
                        document.getElementById('pregunta7').value   = Adata_ate[0].preg_7_v2; 
                      }
                  }else if( txt_tipoencuesta == 'RESPIRATORIO'){

                        if ( new Set([null, '']).has(Adata_ate[0].estado) ){
                            
                        }else{
                          document.getElementById('cboseguimientoencuesta').value  = Adata_ate[0].estado;
                        }      
                        if ( new Set([null, 0]).has(Adata_ate[0].preg_1) ){
                            
                        }else if (Adata_ate[0].preg_1 == 1){
                          document.getElementById('pregunta1sir').checked  = true;
                          
                        }else if (Adata_ate[0].preg_1 == 2){
                          document.getElementById('pregunta1nor').checked  = true;
                        }
                        if ( new Set([null, 0]).has(Adata_ate[0].preg_2) ){
                            
                        }else if (Adata_ate[0].preg_2 == 1){
                          document.getElementById('pregunta2sir').checked  = true;
                          
                        }else if (Adata_ate[0].preg_2 == 2){
                          document.getElementById('pregunta2nor').checked  = true;
                        }

                        if ( new Set([null,'{}']).has(Adata_ate[0].preg_3) ){
                            
                        }else{
                          if ( (Adata_ate[0].preg_3).slice(0,-1).slice(1).split(',').includes('1') ){
                            document.getElementById('pregunta3productivar').checked  = true;
                          }
                          if ( (Adata_ate[0].preg_3).slice(0,-1).slice(1).split(',').includes('2') ){
                            document.getElementById('pregunta3disfonicar').checked  = true;
                          }
                          if ( (Adata_ate[0].preg_3).slice(0,-1).slice(1).split(',').includes('3') ){
                            document.getElementById('pregunta3exigenter').checked  = true;
                          } 
                        }
                        if ( new Set([null,'{}']).has(Adata_ate[0].preg_4) ){
                            
                        }else{
                          if ( (Adata_ate[0].preg_4).slice(0,-1).slice(1).split(',').includes('1') ){
                            document.getElementById('pregunta4sibilantesr').checked  = true;
                          }
                          if ( (Adata_ate[0].preg_3).slice(0,-1).slice(1).split(',').includes('2') ){
                            document.getElementById('pregunta4roncantesr').checked  = true;
                          } 
                        }
                        


                        if ( new Set([null, 0]).has(Adata_ate[0].preg_5) ){
                            
                        }else if (Adata_ate[0].preg_5 == 1){
                          document.getElementById('pregunta5sir').checked  = true;
                          
                        }else if (Adata_ate[0].preg_5 == 2){
                          document.getElementById('pregunta5nor').checked  = true;
                        }
                        if ( new Set([null, 0]).has(Adata_ate[0].preg_6) ){
                            
                        }else if (Adata_ate[0].preg_6 == 1){
                          document.getElementById('pregunta6sir').checked  = true;
                          
                        }else if (Adata_ate[0].preg_7 == 2){
                          document.getElementById('pregunta6nor').checked  = true;
                        }
                        if ( new Set([null, 0]).has(Adata_ate[0].preg_7) ){
                            
                        }else if (Adata_ate[0].preg_7 == 1){
                          document.getElementById('pregunta7sir').checked  = true;
                          
                        }else if (Adata_ate[0].preg_7 == 2){
                          document.getElementById('pregunta7nor').checked  = true;
                        }
                        if ( new Set([null, '']).has(Adata_ate[0].preg_8) ){
                            
                        }else{
                          document.getElementById('pregunta8r').value   = Adata_ate[0].preg_8; 
                        }
               }
               fetch('/modulo/Abre_Detalle/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "select  *  from t_encuesta_dolor_abdominal_sms where cod_ate = "+filacurrent
              
                })
              }).then(response => response.json())
                .then(function (Adata_sms) {
                  var html ='';
                    if(Adata_sms.length>0){
                        for ( let i = 0; i < Adata_sms.length; i++) {
               
                          html += '<tr ' + ' id="' + Adata_sms[i].correl +'" >' +
                            '<td >' + Adata_sms[i].correl + '</td>' +
                            '<td>' + Adata_sms[i].numero + '</td>' +
                            '<td style="text-align:center">' + Adata_sms[i].fecha + '</td>' + 
                            '</tr>';
                        } 
                        document.getElementById('tbodysms').innerHTML = html;
                    }
                }).catch(error => {
                  console.log(error);
                });
                
        
     }

  }).catch(error => {
    console.log(error);
  });

}

function getCheckedRadioValue(name) {
  var elements = document.getElementsByName(name);

  for (var i=0, len=elements.length; i<len; ++i)
      if (elements[i].checked) return elements[i];
}

var   myWindowseguimiento ;

window.cmdSeguimiento_Click1 = function () {

  var fila = document.getElementById('Txt_atencion').value;
  if (fila.trim()=='') return;
  var cod_ate = fila.trim();
  //Pvienede = "FRMSERVICIOLABORATORIO"
  //printModal(Frm_seguimiento(cod_ate));


  if(myWindowseguimiento!==undefined) {

    myWindowseguimiento.document.body.innerHTML="";

  }
  myWindowseguimiento = window.open("", "myWindowseguimiento", "toolbar=no,menubar=no,top=500,left=500,width=40%,height=400");
  
    
    myWindowseguimiento.document.write(Frm_seguimiento(cod_ate));
 
  if (myWindowseguimiento.document) {
    myWindowseguimiento.document.title = "Seguimiento de Servicios";
  }
  myWindowseguimiento.addEventListener("resize", function () {
 

    myWindowseguimiento.resizeTo(800, 900);
  });
  //Frm_Seguimiento.txtCodServ.Text = CStr(Trim(Grid_CM.TextMatrix(Grid_CM.Row, 3)))
  myWindowseguimiento.focus();
  //myWindowseguimiento.document.getElementById('optAtencion').checked = true;
}

window.Command1_Click = function(){
var estado = document.getElementById('cboseguimientoencuesta').value;

if (validar() == 1 && estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZO' ){
   alert("Conteste todas las preguntas") ;
   return;
}
  grabar_encuesta();
}
function validar(){
  var valor=0;
   if( document.getElementById('pregunta1aumento').checked == false  && document.getElementById('pregunta1disminucion').checked  == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked  == false){
      valor = 1;
  }else if( document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked  == false && document.getElementById('pregunta2localizado').checked == false &&  document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false){
      valor = 1;
  }else if(document.getElementById('pregunta3no').checked == false && (document.getElementById('pregunta3si').checked == false || document.getElementById('pregunta3otros').value == '')){
    valor = 1;
  }else if( document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked  == false && document.getElementById('pregunta4noaplica').checked  == false){
    valor = 1;
  }else if(document.getElementById('pregunta5fiebre').checked == false && document.getElementById('pregunta5apetitodisminuido').checked == true && document.getElementById('pregunta5diarreaestrenimiento').value == '' && document.getElementById('pregunta5nauseasvomitos').value == '' && document.getElementById('pregunta5noaplica').value == ''){
    valor = 1;
  }else if(document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false){
    valor = 1;
  }
  return  valor; 
  }

 
  
window.grabar_encuesta = async function (){ 

var estado = document.getElementById('cboseguimientoencuesta').value;
var booleano = true;
  //var tr= document.getElementById(filacurrent);
 
  if (estado == "MAD DERIVACION A PROGRAMAS"){
    var rs_ate =[];
    var Text='';
  
    var cod_serv=document.getElementById('Txt_atencion').value
    var rs_antecedente  =[]     ;
    var rs_time_enferm  =[]      ;
    var rs_sintoma   =[]      ;
    var rs_fisico       =[]     ;
    var rs_diagnostico  =[]      ;
    var rs_medicamento =[]  ;
    var rs_exa_aux     =[]       ;
    var dato_ant_reg_1er =''    ;
    var dato_ant_reg_2do  ='';
  
    //Datos de paciente
    
    //PARA MAD 
    await fetch('/modulo/Abre_Detalle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:"select cod_ate, nom_pac, edad_ate, des_dir, des_dis,  nom_doc nom_medico, tipo_servicio from t_tmpllamadas WHERE tipo_servicio = 'ATE' AND cod_ate = " +  cod_serv
         })
  
       }).then(response => response.json())
      .then(  function (data ) {
        if(data.length>0) {
          rs_ate = data;
        }else{ 
            fetch('/modulo/Abre_Detalle', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "select a.cod_ate, a.nom_pac, a.edad_ate, a.des_dir, a.des_dis, b.nom_medico, b.nom_enfermero, a.tipo_servicio from t_tmpllamadas a inner join t_amb_combo_asignacion b ON a.cod_asig = b.cod_asig WHERE a.cod_ate = " + cod_serv
               })
        
             }).then(response => response.json())
            .then(function (data ) {
              if(data.length>0) {
                rs_ate = data;
              }else{ 
                    //PARA AMBULANCIA
                      
              }
            }).catch(error => {
              console.log(error);
            });
        }
      }).catch(error => {
        console.log(error);
      });
    
    
     Text = "";
    
    if (rs_ate.length>0){
        Text = Text + "DATOS DEL PACIENTE ----------------------------------------------------------------------------------------------" + '\n' 
        Text = Text + "Num. Atencion : " + rs_ate[0].cod_ate + '\n' 
        Text = Text + "Paciente      : " + (rs_ate[0].nom_pac).trim() + '\n' 
        Text = Text + "Edad          : " + rs_ate[0].edad_ate + '\n' 
        Text = Text + "Direccion     : " + (rs_ate[0].des_dir).trim() + " - " +  (rs_ate[0].des_dis).trim() + '\n' 
        Text = Text + "Medico        : " + rs_ate[0].nom_medico + '\n' 
        if (rs_ate[0].tipo_servicio == "AMB" ){
            Text = Text + "Enfermero     : " + rs_ate[0].nom_enfermero + '\n'  + '\n' 
        }
        
    }
     
    rs_antecedente =  await  Abre_Recordset_tablet( "SELECT  ate.cod_atencion, CASE WHEN tah.cod_tipo_antecedente_padre is null THEN tah.cod_tipo_antecedente ELSE tah.cod_tipo_antecedente_padre END codigo_grupo, " 
    + "tah.cod_tipo_antecedente cod_det, CASE WHEN tah.cod_tipo_antecedente_padre is null THEN tah.descripcion ELSE tap.descripcion END descp_grupo, " 
    + "tah.descripcion descp_det, upper(CASE WHEN c.observacion is null or c.observacion = '' THEN ant.descripcion ELSE ant.descripcion + ': ' + c.observacion END) descripcion " 
    + "FROM atencion ate INNER JOIN paciente b ON ate.cod_paciente = b.cod_paciente " 
    + "LEFT JOIN antecedente_paciente c ON b.cod_paciente = c.cod_paciente " 
    + "INNER JOIN antecedente ant ON c.cod_antecedente = ant.cod_antecedente " 
    + "INNER JOIN tipo_antecedente tah ON ant.cod_tipo_antecedente = tah.cod_tipo_antecedente " 
    + "LEFT JOIN tipo_antecedente tap ON tah.cod_tipo_antecedente_padre = tap.cod_tipo_antecedente " 
    + "WHERE ate.cod_atencion = " + cod_serv + "ORDER BY descp_grupo ASC, descp_det ASC, ant.descripcion ASC ");
  
    if  (rs_antecedente.length!=0){
         
      var txtantecedentes='';
      dato_ant_reg_1er = "";
      dato_ant_reg_2do = "";
      txtantecedentes = txtantecedentes + "ANTECEDENTES --------------------------------------------------------------------------------" + '\n' ;
      
      var a = 0;
              while (a < rs_antecedente.length) {
                if (rs_antecedente[a].descp_grupo != dato_ant_reg_1er){
                  dato_ant_reg_1er = rs_antecedente[a].descp_grupo;
                  txtantecedentes = txtantecedentes + '\t' + dato_ant_reg_1er + '\n' + '\n' ;
                }
            
                if (rs_antecedente[a].descp_det != dato_ant_reg_2do){
                  dato_ant_reg_2do = rs_antecedente[a].descp_det;
                  txtantecedentes  = txtantecedentes  + '\t' + '\t' + dato_ant_reg_2do + '\n' ;
                }
            txtantecedentes = txtantecedentes + '\t' + '\t' + '\t' + rs_antecedente[a].descripcion + '\n';
  
                a++;
              }
              
      txtantecedentes = txtantecedentes + "----------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
  }
  
  rs_time_enferm =  await  Abre_Recordset_tablet( "SELECT tiempo_enfermedad_dias, tiempo_enfermedad_horas FROM registro_atencion WHERE cod_atencion = " + cod_serv);
    
  rs_sintoma = await  Abre_Recordset_tablet( "SELECT upper(tsint.descripcion) signo_sint, upper(sint.descripcion) det_signo_sint, " 
                              + "CASE WHEN sinate.opcion_seleccionada IS NULL or sinate.opcion_seleccionada = '' " 
                              + "THEN sinate.observacion ELSE CASE WHEN sinate.observacion IS NULL or sinate.observacion = '' THEN sinate.opcion_seleccionada ELSE " 
                              + "sinate.observacion + ': ' + sinate.opcion_seleccionada END END obs " 
                              + "FROM sintoma_atencion sinate " 
                              + "INNER JOIN sintoma sint ON sinate.cod_sintoma = sint.codigo " 
                              + "INNER JOIN tipo_sintoma tsint ON tsint.codigo_tipo_sintoma = sint.cod_tipo_sintoma " 
                              + "WHERE sinate.cod_atencion = " + cod_serv + "ORDER BY signo_sint ASc, det_signo_sint ASC");
  var txtsintoma='';
  if ( rs_sintoma.length>0  ){
  
    txtsintoma = txtsintoma + "SINTOMAS ---------------------------------------------------------------------------------------------------------" + '\n' ;
      
      //tiempo de enfermedad
      txtsintoma = txtsintoma  + '\t' + "TIEMPO DE ENFERMEDAD :" + rs_time_enferm[0].tiempo_enfermedad_dias + " dia(s) y " + rs_time_enferm[0].tiempo_enfermedad_horas + " hora(s) " + '\n' ;
      //los detalles de los sintomas
       dato_ant_reg_1er = "";
      
       var a = 0;
        while (a < rs_sintoma.length) {
          if (rs_sintoma[a].signo_sint != dato_ant_reg_1er ){
              dato_ant_reg_1er = rs_sintoma[a].signo_sint;
              txtsintoma = txtsintoma + '\t' + dato_ant_reg_1er + '\n' ;
          }
          
          if ( rs_sintoma[a].obs !=null || rs_sintoma[a].obs == "" ){
              txtsintoma = txtsintoma + '\t' + '\t' + rs_sintoma[a].det_signo_sint + '\n' ;
          }else{
              txtsintoma = txtsintoma + '\t' + '\t' + rs_sintoma[a].det_signo_sint + ": " +  (rs_sintoma[a].obs).toUpperCase() + '\n' ;
          }
          a++;
        }
      txtsintoma = txtsintoma + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' 
  }
  
  //DATOS DE FISICO
  var txtfisico='';
  var rs_fisico = await Abre_Recordset_tablet( "SELECT CASE WHEN tfh.cod_tipo_fisico_padre is null THEN upper(tfh.descripcion) ELSE upper(tfp.descripcion) END descp_grupo,upper(tfh.descripcion) descp_det, " 
                          + "upper(exaf.descripcion) fis_descripcion, exaf_ate.observacion obs, exaf_ate.opcion_seleccionada, exaf_ate.valor_ingresado, exaf_ate.cod_ubicacion " 
                          + "FROM examen_fisico_atencion exaf_ate " 
                          + "INNER JOIN examen_fisico exaf ON exaf_ate.cod_examen_fisico = exaf.cod_fisico " 
                          + "INNER JOIN tipo_fisico tfh ON exaf.cod_tipo_fisico = tfh.cod_tipo_fisico " 
                          + "LEFT JOIN tipo_fisico tfp ON tfh.cod_tipo_fisico_padre = tfp.cod_tipo_fisico " 
                          + "Where exaf_ate.cod_atencion = " + cod_serv + "ORDER BY descp_grupo ASC, tfh.cod_tipo_fisico ASC, exaf.descripcion ASC");
  
   if ( rs_fisico.length>0  ){
  
      dato_ant_reg_1er = "";
      dato_ant_reg_2do = "";
      
      txtfisico = txtfisico + "FISICO -----------------------------------------------------------------------------------------------------------" + '\n' 
      var a = 0;
      while (a < rs_fisico.length) {
          if (rs_fisico[a].descp_grupo != dato_ant_reg_1er ){
              dato_ant_reg_1er = rs_fisico[a].descp_grupo;
              txtfisico = txtfisico + '\t' + dato_ant_reg_1er + '\n' + '\n' 
          }
          
          if (rs_fisico[a].descp_det != dato_ant_reg_2do ){
              dato_ant_reg_2do = rs_fisico[a].descp_det;
              txtfisico = txtfisico + '\t' + '\t' + dato_ant_reg_2do + '\n' 
          }
          
          if (  rs_fisico[a].cod_ubicacion==null || rs_fisico[a].cod_ubicacion == "" ){
              if  (rs_fisico[a].obs != null || rs_fisico[0].obs == "" ){
                  txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + '\n' ;
              }else{
                  txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + ": " + rs_fisico[a].obs + '\n' ;
              }
          }else{
              txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + ": " + rs_fisico[a].cod_ubicacion + '\n' ;
              
          }
          a++;
  
       }
      txtfisico = txtfisico + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
   }
  
   
  
  //DATOS DE DIAGNOSTICO
  var txtdiagnostico='';
  rs_diagnostico = await Abre_Recordset_tablet(" SELECT diag.cod_diagnostico, diag.descripcion, diag_ate.principal " 
                      + "FROM diagnostico diag INNER JOIN diagnostico_atencion diag_ate ON diag_ate.cod_diagnostico = diag.cod_diagnostico " 
                      + "Where diag_ate.cod_atencion = " + cod_serv + "ORDER BY diag_ate.principal DESC");
  
    if ( rs_diagnostico.length>0  ){ 
      txtdiagnostico = txtdiagnostico + "DIAGNOSTICO ------------------------------------------------------------------------------------------------------" + '\n' ;
      var a = 0;
        while (a < rs_diagnostico.length) {
          txtdiagnostico = txtdiagnostico + '\t' + rs_diagnostico[a].cod_diagnostico + " - " + rs_diagnostico[a].descripcion + (rs_diagnostico[a].principal == 't'? " (PRINC)": ("" + '\n')) ;
          a++;
        } 
      txtdiagnostico = txtdiagnostico + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
      a++;
    }
  
    //DATOS DE MEDICAMENTO
  var txtmedicamento='';
  rs_medicamento = await Abre_Recordset_tablet("SELECT med.descripcion, mate.cantidad, upper(presmed.descripcion) presentacion, upper(viamed.descripcion) via, " 
                      + "UPPER(CONVERT(varchar,cantidad_dosis) + ' ' + upper(dosis.descripcion) + CASE WHEN  mate.horas_frecuencia > 0 or mate.dias_frecuencia > 0 " 
                      + "THEN ' cada ' + CASE WHEN mate.horas_frecuencia <> 0 THEN CONVERT(varchar,mate.horas_frecuencia) + ' hrs.' ELSE CONVERT(varchar,mate.dias_frecuencia) + ' dias.' END " 
                      + "Else '' END + CASE WHEN mate.duracion > 0 THEN ' durante ' + CONVERT(varchar,mate.duracion) ELSE '' END) frecuencia " 
                      + "FROM medicamento_atencion mate " 
                      + "INNER JOIN viamedicamento viamed ON mate.cod_via = viamed.cod_via " 
                      + "INNER JOIN dosismedicamento dosis ON mate.cod_dosis = dosis.cod_dosis " 
                      + "INNER JOIN medicamento med ON mate.cod_medicamento = med.cod_medicamento " 
                      + "INNER JOIN presentacionmedicamento presmed ON med.cod_presentacion_medicamento = presmed.cod_presentacion " 
                      + "WHERE mate.cod_Atencion = " + cod_serv + " ORDER BY  med.descripcion ASC");
  
  if ( rs_medicamento.length>0  ){ 
      txtmedicamento = txtmedicamento + "MEDICAMENTOS -----------------------------------------------------------------------------------------------------" + '\n' ;
      var a = 0;
        while (a < rs_medicamento.length) {
          txtmedicamento = txtmedicamento + '\t' + rs_medicamento[a].Descripcion + " - " + rs_medicamento[a].cantidad + " - " + rs_medicamento[a].presentacion + " - " + rs_medicamento[a].via + " - " + rs_medicamento[a].frecuencia + '\n' ;
           a++;
        }
      txtmedicamento = txtmedicamento + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
  }
  var txtexa_aux ='';
  rs_exa_aux = await  Abre_Recordset_tablet( "SELECT exa.descripcion, exaate.valor_ingresado, exaate.observacion FROM examen_auxiliar_atencion exaate " 
                      + "INNER JOIN examen_auxiliar exa ON exaate.cod_examenauxiliar = exa.cod_examenauxiliar WHERE exaate.cod_atencion = " + cod_serv 
                      + "ORDER BY  exa.descripcion ASC");
  
   if ( rs_exa_aux.length>0  ){ 
          txtexa_aux = txtexa_aux + "EXAMENES AUXILIARES ----------------------------------------------------------------------------------------------" + '\n' ;
          var a = 0;
          while (a < rs_exa_aux.length) {
          txtexa_aux = txtexa_aux + '\t' + rs_exa_aux[a].descripcion + " - " + rs_exa_aux[a].valor_ingresado + " - " + rs_exa_aux[a].observacion + '\n' 
          a++;
        
          }
      txtexa_aux = txtexa_aux + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
  }
  
    await fetch('/modulo/enviar_solicitud/', {
  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Text: Text,
        txtantecedentes : txtantecedentes,
        txtsintoma : txtsintoma,
        txtfisico : txtfisico,
        txtdiagnostico : txtdiagnostico,
        txtmedicamento : txtmedicamento,
        txtexa_aux : txtexa_aux,
        paciente  :  document.getElementById('Txt_pac').value

      })
    }).then(response => response.json())
      .then(function (data) {
         if (data) {
  
        } 
         
      }).catch(error => {
        console.log(error);
      });
  }

  if (estado == "EN SEGUIMIENTO" ){
  booleano = false;
  }
 
var today = new Date(); 
var rst_reg_encuesta = {};

var query = "select cod_ate from t_encuesta_dolor_abdominal where cod_ate= " + document.getElementById('Txt_atencion').value ;
await fetch('/modulo/Abre_Detalle/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({query: query})
  }).then(response => response.json())
  .then(async  function (data) {
      //Si hay datos en t_encuesta_dolor_abdominal
      if(data.length > 0) {
        rst_reg_encuesta.cod_ate = document.getElementById('Txt_atencion').value; 
        rst_reg_encuesta.preg_1_v2 =   (document.getElementById('pregunta1aumento').checked==true?1:(document.getElementById('pregunta1disminucion').checked==true?2:(document.getElementById('pregunta1semantiene').checked==true?3:(document.getElementById('pregunta1sindolor').checked==true?4:0)) ))  ;
        rst_reg_encuesta.preg_2_v2 =   (document.getElementById('pregunta2continuo').checked==true?1:(document.getElementById('pregunta2intermitente').checked==true?2:(document.getElementById('pregunta2localizado').checked==true?3:(document.getElementById('pregunta2difuso').checked==true?4:0)) ))  ;
        rst_reg_encuesta.preg_3_v2 = (document.getElementById('pregunta3si').checked==true?1:2);
        
        if(document.getElementById('pregunta3si').checked==true){
        rst_reg_encuesta.preg_3_v2_val = document.getElementById('pregunta3otros').value; 
        }else{
        rst_reg_encuesta.preg_3_v2_val = ''; 
        }
        rst_reg_encuesta.preg_4_v2 = (document.getElementById('pregunta4abdomensuperior').checked==true?1:(document.getElementById('pregunta4abdomeninferior').checked==true?2:0));
        rst_reg_encuesta.preg_5_v2 = ((document.getElementById('pregunta5fiebre').checked==true?'1,':'') + (document.getElementById('pregunta5apetitodisminuido').checked==true?'2,':'')+ (document.getElementById('pregunta5diarreaestrenimiento').checked==true?'3,':'')+ (document.getElementById('pregunta5nauseasvomitos').checked==true?'4':'')) ||  (document.getElementById('pregunta5noaplica').checked==true?'0':'0') ;     
        var last = rst_reg_encuesta.preg_5_v2.slice(-1);
        if (last == ',' ){
          rst_reg_encuesta.preg_5_v2  = '{'  +  rst_reg_encuesta.preg_5_v2.slice(0, -1)  + '}'
        }else{
          rst_reg_encuesta.preg_5_v2  = '{'  +  rst_reg_encuesta.preg_5_v2  + '}'
        }
        rst_reg_encuesta.preg_6_v2 = (document.getElementById('pregunta6si').checked==true?1:0);
        rst_reg_encuesta.preg_7_v2 = document.getElementById('pregunta7').value;
        rst_reg_encuesta.estado = estado;
        rst_reg_encuesta.usuario =await getusuario();
        rst_reg_encuesta.fecha_reg = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
        rst_reg_encuesta.hora_reg =  String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
        rst_reg_encuesta.encuestado = document.getElementById('cboencuestado').value;
        rst_reg_encuesta.negocio = JSON.parse(document.getElementById('cbo_unegocio').value).negocio;//tr.cells[15].innerHTML.trim();
        rst_reg_encuesta.tabla = 't_encuesta_dolor_abdominal';
        //rst_reg_encuesta.id = 'cod_ate';

       // Función para actualizar el campo 'flg_encuesta_dolor_abdominal'
      function eliminarEncuesta() {
        const cod_ate = document.getElementById('Txt_atencion').value;
        const query = `DELETE FROM t_encuesta_dolor_abdominal WHERE COD_ATE = ${cod_ate}`;

        fetch('/modulo/Execute', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(function (data) {
          //alert("La elimnió correctamente");
          InsertarEncuesta(rst_reg_encuesta);
        })
        .catch(error => {
          alert('Ocurrió un error en la segunda solicitud...');
          console.log(error);
        });
      }
  
      // Función para realizar la primera solicitud
      function InsertarEncuesta(rst_reg_encuesta) {
        fetch('/modulo/Executeinsert/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rst_reg_encuesta)
        })
        .then(response => response.json())
        .then(function (data) {
          if (data.success) {
            alert("La actualización de la encuesta NO falló.");
          } else {
            // Manejar el caso de error en la actualización
            //alert("La actualización de la encuesta falló.");
          }
        })
        .catch(error => {
          alert('Ocurrió un error en la primera solicitud...');
          console.log(error);
        });
      }
      
      // Función para actualizar el campo 'flg_encuesta_dolor_abdominal'
      function actualizarDolorAbdominal() {
        const booleano = true; // Cambia esto según tus necesidades
        const cod_ate = document.getElementById('Txt_atencion').value;

        const query = `UPDATE t_tmpllamadas SET flg_encuesta_dolor_abdominal = ${booleano} WHERE cod_ate = ${cod_ate}`;

        fetch('/modulo/Execute', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(function (data) {
          alert("La encuesta se actualizó correctamente");
          document.getElementById("Cmd_salir").click();
          document.getElementById("Cmd_filtrar").click();
        })
        .catch(error => {
          alert('Ocurrió un error en la segunda solicitud...');
          console.log(error);
        });
      }

      actualizarDolorAbdominal();
      eliminarEncuesta();
      // Llamada inicial
      //InsertarEncuesta(rst_reg_encuesta); 

      //Si no hay datos
      }else{

        rst_reg_encuesta.cod_ate = document.getElementById('Txt_atencion').value; 
        rst_reg_encuesta.preg_1_v2 =   (document.getElementById('pregunta1aumento').checked==true?1:(document.getElementById('pregunta1disminucion').checked==true?2:(document.getElementById('pregunta1semantiene').checked==true?3:(document.getElementById('pregunta1sindolor').checked==true?4:0)) ))  ;
        rst_reg_encuesta.preg_2_v2 =   (document.getElementById('pregunta2continuo').checked==true?1:(document.getElementById('pregunta2intermitente').checked==true?2:(document.getElementById('pregunta2localizado').checked==true?3:(document.getElementById('pregunta2difuso').checked==true?4:0)) ))  ;
        rst_reg_encuesta.preg_3_v2 = (document.getElementById('pregunta3si').checked==true?1:2);
        
        if(document.getElementById('pregunta3si').checked==true){
        rst_reg_encuesta.preg_3_v2_val = document.getElementById('pregunta3otros').value; 
        }else{
        rst_reg_encuesta.preg_3_v2_val = ''; 
        }
        rst_reg_encuesta.preg_4_v2 = (document.getElementById('pregunta4abdomensuperior').checked==true?1:(document.getElementById('pregunta4abdomeninferior').checked==true?2:0));
        rst_reg_encuesta.preg_5_v2 = ((document.getElementById('pregunta5fiebre').checked==true?'1,':'') + (document.getElementById('pregunta5apetitodisminuido').checked==true?'2,':'')+ (document.getElementById('pregunta5diarreaestrenimiento').checked==true?'3,':'')+ (document.getElementById('pregunta5nauseasvomitos').checked==true?'4':'')) ||  (document.getElementById('pregunta5noaplica').checked==true?'0':'0') ;     
        var last = rst_reg_encuesta.preg_5_v2.slice(-1);
        if (last == ',' ){
          rst_reg_encuesta.preg_5_v2  = '{'  +  rst_reg_encuesta.preg_5_v2.slice(0, -1)  + '}'
        }else{
          rst_reg_encuesta.preg_5_v2  = '{'  +  rst_reg_encuesta.preg_5_v2  + '}'
        }
        rst_reg_encuesta.preg_6_v2 = (document.getElementById('pregunta6si').checked==true?1:0);
        rst_reg_encuesta.preg_7_v2 = document.getElementById('pregunta7').value;
        rst_reg_encuesta.estado = estado;
        rst_reg_encuesta.usuario =await getusuario();
        rst_reg_encuesta.fecha_reg = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
        rst_reg_encuesta.hora_reg =  String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
        rst_reg_encuesta.encuestado = document.getElementById('cboencuestado').value;
        rst_reg_encuesta.negocio = JSON.parse(document.getElementById('cbo_unegocio').value).negocio;//tr.cells[15].innerHTML.trim();
        rst_reg_encuesta.tabla = 't_encuesta_dolor_abdominal';
        fetch('/modulo/Executeinsert/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rst_reg_encuesta)
          }).then(response => response.json())
          .then(function (data) { 
                    
                 fetch('/modulo/Execute', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                    {
                      query:"UPDATE t_tmpllamadas SET flg_encuesta_dolor_abdominal = "+booleano+" WHERE cod_ate = " +document.getElementById('Txt_atencion').value
                    }
                  )
                }).then(response => response.json())
                  .then(function (data) { 
                }).catch(error => {
                  alert('Sucedio un error...');
                    console.log(error);
                });  
                alert ("La encuesta se registró correctamente");
                document.getElementById("Cmd_salir").click();
                document.getElementById("Cmd_filtrar").click();
          
          }).catch(error => {
            console.log(error);
          }); 
            


      }
  }).catch(error => {
    console.log(error);
  }); 
  
}
/*
async function enviar_correo_solicitud(){

  var rs_ate =[];
  var Text='';

  var cod_serv=document.getElementById('Txt_atencion').value
  var rs_antecedente  =[]     ;
  var rs_time_enferm  =[]      ;
  var rs_sintoma   =[]      ;
  var rs_fisico       =[]     ;
  var rs_diagnostico  =[]      ;
  var rs_medicamento =[]  ;
  var rs_exa_aux     =[]       ;
  var dato_ant_reg_1er =''    ;
  var dato_ant_reg_2do  ='';

  //Datos de paciente
  
  //PARA MAD 
  await fetch('/modulo/Abre_Detalle', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query:"select cod_ate, nom_pac, edad_ate, des_dir, des_dis,  nom_doc nom_medico, tipo_servicio from t_tmpllamadas WHERE tipo_servicio = 'ATE' AND cod_ate = " +  cod_serv
       })

     }).then(response => response.json())
    .then(  function (data ) {
      if(data.length>0) {
        rs_ate = data;
      }else{ 
          fetch('/modulo/Abre_Detalle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "select a.cod_ate, a.nom_pac, a.edad_ate, a.des_dir, a.des_dis, b.nom_medico, b.nom_enfermero, a.tipo_servicio from t_tmpllamadas a inner join t_amb_combo_asignacion b ON a.cod_asig = b.cod_asig WHERE a.cod_ate = " + cod_serv
             })
      
           }).then(response => response.json())
          .then(function (data ) {
            if(data.length>0) {
              rs_ate = data;
            }else{ 
                  //PARA AMBULANCIA
                    
            }
          }).catch(error => {
            console.log(error);
          });
      }
    }).catch(error => {
      console.log(error);
    });
  
  
   Text = "";
  
  if (rs_ate.length>0){
      Text = Text + "DATOS DEL PACIENTE ----------------------------------------------------------------------------------------------" + '\n' 
      Text = Text + "Num. Atencion : " + rs_ate[0].cod_ate + '\n' 
      Text = Text + "Paciente      : " + (rs_ate[0].nom_pac).trim() + '\n' 
      Text = Text + "Edad          : " + rs_ate[0].edad_ate + '\n' 
      Text = Text + "Direccion     : " + (rs_ate[0].des_dir).trim() + " - " +  (rs_ate[0].des_dis).trim() + '\n' 
      Text = Text + "Medico        : " + rs_ate[0].nom_medico + '\n' 
      if (rs_ate[0].tipo_servicio == "AMB" ){
          Text = Text + "Enfermero     : " + rs_ate[0].nom_enfermero + '\n'  + '\n' 
      }
      
  }
   
  rs_antecedente =  await  Abre_Recordset_tablet( "SELECT  ate.cod_atencion, CASE WHEN tah.cod_tipo_antecedente_padre is null THEN tah.cod_tipo_antecedente ELSE tah.cod_tipo_antecedente_padre END codigo_grupo, " 
  + "tah.cod_tipo_antecedente cod_det, CASE WHEN tah.cod_tipo_antecedente_padre is null THEN tah.descripcion ELSE tap.descripcion END descp_grupo, " 
  + "tah.descripcion descp_det, upper(CASE WHEN c.observacion is null or c.observacion = '' THEN ant.descripcion ELSE ant.descripcion + ': ' + c.observacion END) descripcion " 
  + "FROM atencion ate INNER JOIN paciente b ON ate.cod_paciente = b.cod_paciente " 
  + "LEFT JOIN antecedente_paciente c ON b.cod_paciente = c.cod_paciente " 
  + "INNER JOIN antecedente ant ON c.cod_antecedente = ant.cod_antecedente " 
  + "INNER JOIN tipo_antecedente tah ON ant.cod_tipo_antecedente = tah.cod_tipo_antecedente " 
  + "LEFT JOIN tipo_antecedente tap ON tah.cod_tipo_antecedente_padre = tap.cod_tipo_antecedente " 
  + "WHERE ate.cod_atencion = " + cod_serv + "ORDER BY descp_grupo ASC, descp_det ASC, ant.descripcion ASC ");

  if  (rs_antecedente.length!=0){
       
    var txtantecedentes='';
    dato_ant_reg_1er = "";
    dato_ant_reg_2do = "";
    txtantecedentes = txtantecedentes + "ANTECEDENTES --------------------------------------------------------------------------------" + '\n' ;
    
    var a = 0;
            while (a < rs_antecedente.length) {
              if (rs_antecedente[a].descp_grupo != dato_ant_reg_1er){
                dato_ant_reg_1er = rs_antecedente[a].descp_grupo;
                txtantecedentes = txtantecedentes + '\t' + dato_ant_reg_1er + '\n' + '\n' ;
              }
          
              if (rs_antecedente[a].descp_det != dato_ant_reg_2do){
                dato_ant_reg_2do = rs_antecedente[a].descp_det;
                txtantecedentes  = txtantecedentes  + '\t' + '\t' + dato_ant_reg_2do + '\n' ;
              }
          txtantecedentes = txtantecedentes + '\t' + '\t' + '\t' + rs_antecedente[a].descripcion + '\n';

              a++;
            }
            
    txtantecedentes = txtantecedentes + "----------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
}

rs_time_enferm =  await  Abre_Recordset_tablet( "SELECT tiempo_enfermedad_dias, tiempo_enfermedad_horas FROM registro_atencion WHERE cod_atencion = " + cod_serv);
  
rs_sintoma = await  Abre_Recordset_tablet( "SELECT upper(tsint.descripcion) signo_sint, upper(sint.descripcion) det_signo_sint, " 
                            + "CASE WHEN sinate.opcion_seleccionada IS NULL or sinate.opcion_seleccionada = '' " 
                            + "THEN sinate.observacion ELSE CASE WHEN sinate.observacion IS NULL or sinate.observacion = '' THEN sinate.opcion_seleccionada ELSE " 
                            + "sinate.observacion + ': ' + sinate.opcion_seleccionada END END obs " 
                            + "FROM sintoma_atencion sinate " 
                            + "INNER JOIN sintoma sint ON sinate.cod_sintoma = sint.codigo " 
                            + "INNER JOIN tipo_sintoma tsint ON tsint.codigo_tipo_sintoma = sint.cod_tipo_sintoma " 
                            + "WHERE sinate.cod_atencion = " + cod_serv + "ORDER BY signo_sint ASc, det_signo_sint ASC");
var txtsintoma='';
if ( rs_sintoma.length>0  ){

  txtsintoma = txtsintoma + "SINTOMAS ---------------------------------------------------------------------------------------------------------" + '\n' ;
    
    //tiempo de enfermedad
    txtsintoma = txtsintoma  + '\t' + "TIEMPO DE ENFERMEDAD :" + rs_time_enferm[0].tiempo_enfermedad_dias + " dia(s) y " + rs_time_enferm[0].tiempo_enfermedad_horas + " hora(s) " + '\n' ;
    //los detalles de los sintomas
     dato_ant_reg_1er = "";
    
     var a = 0;
      while (a < rs_sintoma.length) {
        if (rs_sintoma[a].signo_sint != dato_ant_reg_1er ){
            dato_ant_reg_1er = rs_sintoma[a].signo_sint;
            txtsintoma = txtsintoma + '\t' + dato_ant_reg_1er + '\n' ;
        }
        
        if ( rs_sintoma[a].obs !=null || rs_sintoma[a].obs == "" ){
            txtsintoma = txtsintoma + '\t' + '\t' + rs_sintoma[a].det_signo_sint + '\n' ;
        }else{
            txtsintoma = txtsintoma + '\t' + '\t' + rs_sintoma[a].det_signo_sint + ": " +  (rs_sintoma[a].obs).toUpperCase() + '\n' ;
        }
        a++;
      }
    txtsintoma = txtsintoma + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' 
}

//DATOS DE FISICO
var txtfisico='';
var rs_fisico = await Abre_Recordset_tablet( "SELECT CASE WHEN tfh.cod_tipo_fisico_padre is null THEN upper(tfh.descripcion) ELSE upper(tfp.descripcion) END descp_grupo,upper(tfh.descripcion) descp_det, " 
                        + "upper(exaf.descripcion) fis_descripcion, exaf_ate.observacion obs, exaf_ate.opcion_seleccionada, exaf_ate.valor_ingresado, exaf_ate.cod_ubicacion " 
                        + "FROM examen_fisico_atencion exaf_ate " 
                        + "INNER JOIN examen_fisico exaf ON exaf_ate.cod_examen_fisico = exaf.cod_fisico " 
                        + "INNER JOIN tipo_fisico tfh ON exaf.cod_tipo_fisico = tfh.cod_tipo_fisico " 
                        + "LEFT JOIN tipo_fisico tfp ON tfh.cod_tipo_fisico_padre = tfp.cod_tipo_fisico " 
                        + "Where exaf_ate.cod_atencion = " + cod_serv + "ORDER BY descp_grupo ASC, tfh.cod_tipo_fisico ASC, exaf.descripcion ASC");

 if ( rs_fisico.length>0  ){

    dato_ant_reg_1er = "";
    dato_ant_reg_2do = "";
    
    txtfisico = txtfisico + "FISICO -----------------------------------------------------------------------------------------------------------" + '\n' 
    var a = 0;
    while (a < rs_fisico.length) {
        if (rs_fisico[a].descp_grupo != dato_ant_reg_1er ){
            dato_ant_reg_1er = rs_fisico[a].descp_grupo;
            txtfisico = txtfisico + '\t' + dato_ant_reg_1er + '\n' + '\n' 
        }
        
        if (rs_fisico[a].descp_det != dato_ant_reg_2do ){
            dato_ant_reg_2do = rs_fisico[a].descp_det;
            txtfisico = txtfisico + '\t' + '\t' + dato_ant_reg_2do + '\n' 
        }
        
        if (  rs_fisico[a].cod_ubicacion==null || rs_fisico[a].cod_ubicacion == "" ){
            if  (rs_fisico[a].obs != null || rs_fisico[0].obs == "" ){
                txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + '\n' ;
            }else{
                txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + ": " + rs_fisico[a].obs + '\n' ;
            }
        }else{
            txtfisico = txtfisico + '\t' + '\t' + '\t' + rs_fisico[a].fis_descripcion + ": " + rs_fisico[a].cod_ubicacion + '\n' ;
            
        }
        a++;

     }
    txtfisico = txtfisico + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
 }

 

//DATOS DE DIAGNOSTICO
var txtdiagnostico='';
rs_diagnostico = await Abre_Recordset_tablet(" SELECT diag.cod_diagnostico, diag.descripcion, diag_ate.principal " 
                    + "FROM diagnostico diag INNER JOIN diagnostico_atencion diag_ate ON diag_ate.cod_diagnostico = diag.cod_diagnostico " 
                    + "Where diag_ate.cod_atencion = " + cod_serv + "ORDER BY diag_ate.principal DESC");

  if ( rs_diagnostico.length>0  ){ 
    txtdiagnostico = txtdiagnostico + "DIAGNOSTICO ------------------------------------------------------------------------------------------------------" + '\n' ;
    var a = 0;
      while (a < rs_diagnostico.length) {
        txtdiagnostico = txtdiagnostico + '\t' + rs_diagnostico[a].cod_diagnostico + " - " + rs_diagnostico[a].descripcion + (rs_diagnostico[a].principal == 't'? " (PRINC)": ("" + '\n')) ;
        a++;
      } 
    txtdiagnostico = txtdiagnostico + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
    a++;
  }

  //DATOS DE MEDICAMENTO
var txtmedicamento='';
rs_medicamento = await Abre_Recordset_tablet("SELECT med.descripcion, mate.cantidad, upper(presmed.descripcion) presentacion, upper(viamed.descripcion) via, " 
                    + "UPPER(CONVERT(varchar,cantidad_dosis) + ' ' + upper(dosis.descripcion) + CASE WHEN  mate.horas_frecuencia > 0 or mate.dias_frecuencia > 0 " 
                    + "THEN ' cada ' + CASE WHEN mate.horas_frecuencia <> 0 THEN CONVERT(varchar,mate.horas_frecuencia) + ' hrs.' ELSE CONVERT(varchar,mate.dias_frecuencia) + ' dias.' END " 
                    + "Else '' END + CASE WHEN mate.duracion > 0 THEN ' durante ' + CONVERT(varchar,mate.duracion) ELSE '' END) frecuencia " 
                    + "FROM medicamento_atencion mate " 
                    + "INNER JOIN viamedicamento viamed ON mate.cod_via = viamed.cod_via " 
                    + "INNER JOIN dosismedicamento dosis ON mate.cod_dosis = dosis.cod_dosis " 
                    + "INNER JOIN medicamento med ON mate.cod_medicamento = med.cod_medicamento " 
                    + "INNER JOIN presentacionmedicamento presmed ON med.cod_presentacion_medicamento = presmed.cod_presentacion " 
                    + "WHERE mate.cod_Atencion = " + cod_serv + " ORDER BY  med.descripcion ASC");

if ( rs_medicamento.length>0  ){ 
    txtmedicamento = txtmedicamento + "MEDICAMENTOS -----------------------------------------------------------------------------------------------------" + '\n' ;
    var a = 0;
      while (a < rs_medicamento.length) {
        txtmedicamento = txtmedicamento + '\t' + rs_medicamento[a].Descripcion + " - " + rs_medicamento[a].cantidad + " - " + rs_medicamento[a].presentacion + " - " + rs_medicamento[a].via + " - " + rs_medicamento[a].frecuencia + '\n' ;
         a++;
      }
    txtmedicamento = txtmedicamento + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
}
var txtexa_aux ='';
rs_exa_aux = await  Abre_Recordset_tablet( "SELECT exa.descripcion, exaate.valor_ingresado, exaate.observacion FROM examen_auxiliar_atencion exaate " 
                    + "INNER JOIN examen_auxiliar exa ON exaate.cod_examenauxiliar = exa.cod_examenauxiliar WHERE exaate.cod_atencion = " + cod_serv 
                    + "ORDER BY  exa.descripcion ASC");

 if ( rs_exa_aux.length>0  ){ 
        txtexa_aux = txtexa_aux + "EXAMENES AUXILIARES ----------------------------------------------------------------------------------------------" + '\n' ;
        var a = 0;
        while (a < rs_exa_aux.length) {
        txtexa_aux = txtexa_aux + '\t' + rs_exa_aux[a].descripcion + " - " + rs_exa_aux[a].valor_ingresado + " - " + rs_exa_aux[a].observacion + '\n' 
        a++;
      
        }
    txtexa_aux = txtexa_aux + "------------------------------------------------------------------------------------------------------------------" + '\n'  + '\n'  + '\n' ;
}

  await fetch('/modulo/enviar_solicitud/', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Text: Text,
      txtantecedentes : txtantecedentes,
      txtsintoma : txtsintoma,
      txtfisico : txtfisico,
      txtdiagnostico : txtdiagnostico,
      txtmedicamento : txtmedicamento,
      txtexa_aux : txtexa_aux,
      doctor :  document.getElementById('Txt_doctor').value,
      seguro   :  document.getElementById('Txt_grupo').value
    })
  }).then(response => response.json())
    .then(function (data) {
       if (data) {

      } 
       
    }).catch(error => {
      console.log(error);
    });
}
*/

window.Command1_Click_respiratorio = function(){

  if (validar_respiratorio() == 1){
     alert("Conteste todas las preguntas") ;
     return;
  }
    grabar_encuesta_respiratorio();
  
  }
 
function validar_respiratorio(){
  
  var valor=0;
   if( document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked  == false ){
      valor = 1;
  }else if( document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked  == false ){
      valor = 1;
  }else if(document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked  == false && document.getElementById('pregunta3exigenter').checked  == false ){
    valor = 1;
  }else if( document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked  == false ){
    valor = 1;
  }else if( document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked  == false ){
    valor = 1;
  }else if( document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked  == false ){
    valor = 1;
  }else if( document.getElementById('pregunta7sir').checked == false && document.getElementById('pregunta7nor').checked  == false ){
    valor = 1;
  }else if( document.getElementById('pregunta8r').value == ''  ){
    valor = 1;
  }
  return  valor; 
  }



  window.grabar_encuesta_respiratorio = async function (){ 




    var estado = document.getElementById('cboseguimientoencuesta').value;
      //var tr= document.getElementById(filacurrent);
      if (estado == "EN SEGUIMIENTO"){
        alert('NO SE PUEDE GUARDAR LA ENCUESTA COMO SEGUIMIENTO');
        return false;
      }
    var today = new Date(); 
    var rst_reg_encuesta = {};
    
    
    var query = "select cod_ate from t_encuesta_respiratorio where cod_ate= " + document.getElementById('Txt_atencion').value ;
    await fetch('/modulo/Abre_Detalle/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: query})
      }).then(response => response.json())
      .then(async  function (data) {
          if(data.length > 0) {
            rst_reg_encuesta.cod_ate = document.getElementById('Txt_atencion').value; 
            rst_reg_encuesta.preg_1 =   (document.getElementById('pregunta1sir').checked==true?1:2);
            rst_reg_encuesta.preg_2 =   (document.getElementById('pregunta2sir').checked==true?1:2);
            rst_reg_encuesta.preg_3 = (document.getElementById('pregunta3productivar').checked==true?'1,':'') + (document.getElementById('pregunta3disfonicar').checked==true?'2,':'')+ (document.getElementById('pregunta3exigenter').checked==true?'3':'')   ;  
            rst_reg_encuesta.preg_4 = (document.getElementById('pregunta4sibilantesr').checked==true?'1,':'') + (document.getElementById('pregunta4roncantesr').checked==true?'2':'');
            rst_reg_encuesta.preg_5  = (document.getElementById('pregunta5sir').checked==true?1:2);
            var last3 = rst_reg_encuesta.preg_3.slice(-1);
            var last4 = rst_reg_encuesta.preg_4.slice(-1);
            if (last3 == ',' ){
              rst_reg_encuesta.preg_3  = '{'  +  rst_reg_encuesta.preg_3.slice(0, -1)  + '}'
            }else{
              rst_reg_encuesta.preg_3  = '{'  +  rst_reg_encuesta.preg_3  + '}'
            }
            if (last4 == ',' ){
              rst_reg_encuesta.preg_4  = '{'  +  rst_reg_encuesta.preg_4.slice(0, -1)  + '}'
            }else{
              rst_reg_encuesta.preg_4  = '{'  +  rst_reg_encuesta.preg_4  + '}'
            }
            rst_reg_encuesta.preg_6  = (document.getElementById('pregunta6sir').checked==true?1:2);
            rst_reg_encuesta.preg_7 = (document.getElementById('pregunta7sir').checked==true?1:2);
            rst_reg_encuesta.preg_8 = document.getElementById('pregunta8r').value.toUpperCase();

            rst_reg_encuesta.estado = estado;
            rst_reg_encuesta.usuario =await getusuario();
            rst_reg_encuesta.fecha_reg = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
            rst_reg_encuesta.hora_reg =  String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
            rst_reg_encuesta.encuestado = document.getElementById('cboencuestado').value;
            rst_reg_encuesta.negocio = JSON.parse(document.getElementById('cbo_unegocio').value).negocio;//tr.cells[15].innerHTML.trim();
            rst_reg_encuesta.tabla = 't_encuesta_respiratorio';
            rst_reg_encuesta.id = 'cod_ate';
     
            fetch('/modulo/Executeupdate/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(rst_reg_encuesta)
              }).then(response => response.json())
              .then(function (data) { 
                     fetch('/modulo/Execute', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(
                        {
                          query:"UPDATE t_encuesta_respiratorio SET flg_encuesta_respiratoria = true WHERE cod_ate = " +document.getElementById('Txt_atencion').value
                        }
                      )
                    }).then(response => response.json())
                      .then(function (data) { 
                    }).catch(error => {
                      alert('Sucedio un error...');
                        console.log(error);
                    });  
                    alert ("La encuesta se actualizo correctamente");
                    document.getElementById("Cmd_salir").click();
                    document.getElementById("Cmd_filtrar").click();
              
              }).catch(error => {
                console.log(error);
              }); 
          }else{
            rst_reg_encuesta.cod_ate = document.getElementById('Txt_atencion').value; 
            rst_reg_encuesta.preg_1 =   (document.getElementById('pregunta1sir').checked==true?1:2);
            rst_reg_encuesta.preg_2 =   (document.getElementById('pregunta2sir').checked==true?1:2);
            rst_reg_encuesta.preg_3 = (document.getElementById('pregunta3productivar').checked==true?'1,':'') + (document.getElementById('pregunta3disfonicar').checked==true?'2,':'')+ (document.getElementById('pregunta3exigenter').checked==true?'3':'')   ;  
            rst_reg_encuesta.preg_4 = (document.getElementById('pregunta4sibilantesr').checked==true?'1,':'') + (document.getElementById('pregunta4roncantesr').checked==true?'2':'');
            rst_reg_encuesta.preg_5  = (document.getElementById('pregunta5sir').checked==true?1:2);
            var last3 = rst_reg_encuesta.preg_3.slice(-1);
            var last4 = rst_reg_encuesta.preg_4.slice(-1);
            if (last3 == ',' ){
              rst_reg_encuesta.preg_3  = '{'  +  rst_reg_encuesta.preg_3.slice(0, -1)  + '}'
            }else{
              rst_reg_encuesta.preg_3  = '{'  +  rst_reg_encuesta.preg_3  + '}'
            }
            if (last4 == ',' ){
              rst_reg_encuesta.preg_4  = '{'  +  rst_reg_encuesta.preg_4.slice(0, -1)  + '}'
            }else{
              rst_reg_encuesta.preg_4  = '{'  +  rst_reg_encuesta.preg_4  + '}'
            }
            rst_reg_encuesta.preg_6  = (document.getElementById('pregunta6sir').checked==true?1:2);
            rst_reg_encuesta.preg_7 = (document.getElementById('pregunta7sir').checked==true?1:2);
            rst_reg_encuesta.preg_8 = document.getElementById('pregunta8r').value.toUpperCase();

            rst_reg_encuesta.estado = estado;
            rst_reg_encuesta.usuario =await getusuario();
            rst_reg_encuesta.fecha_reg = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
            rst_reg_encuesta.hora_reg =  String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
            rst_reg_encuesta.encuestado = document.getElementById('cboencuestado').value;
            rst_reg_encuesta.negocio = JSON.parse(document.getElementById('cbo_unegocio').value).negocio;//tr.cells[15].innerHTML.trim();
            rst_reg_encuesta.tabla = 't_encuesta_respiratorio';
            fetch('/modulo/Executeinsert/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(rst_reg_encuesta)
              }).then(response => response.json())
              .then(function (data) {
                 
                        
                     fetch('/modulo/Execute', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(
                        {
                          query:"UPDATE t_encuesta_respiratorio SET flg_encuesta_respiratoria WHERE cod_ate = " +document.getElementById('Txt_atencion').value
                        }
                      )
                    }).then(response => response.json())
                      .then(function (data) { 
                    }).catch(error => {
                      alert('Sucedio un error...');
                        console.log(error);
                    });  
                    alert ("La encuesta se registró correctamente");
                    document.getElementById("Cmd_salir").click();
                    document.getElementById("Cmd_filtrar").click();
              
              }).catch(error => {
                console.log(error);
              }); 
          }
      }).catch(error => {
        console.log(error);
      }); 
      
      
    
     
     

    }

window.init =function() {
  const sliders = document.getElementsByClassName("tick-slider-input");

  for (let slider of sliders) {
      slider.oninput = onSliderInput;

      updateValue(slider);
      updateValuePosition(slider);
      updateLabels(slider);
      updateProgress(slider);

      setTicks(slider);
  }
}

window.onSliderInput = function(event) {
  updateValue(event.target);
  updateValuePosition(event.target);
  updateLabels(event.target);
  updateProgress(event.target);
}

window.updateValue = function(slider) {
  let value = document.getElementById(slider.dataset.valueId);

  value.innerHTML = "<div>" + slider.value + "</div>";
}

window.updateValuePosition = function(slider) {
  let value = document.getElementById(slider.dataset.valueId);

  const percent = getSliderPercent(slider);

  const sliderWidth = slider.getBoundingClientRect().width;
  const valueWidth = value.getBoundingClientRect().width;
  const handleSize = slider.dataset.handleSize;

  let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

  left = Math.min(left, sliderWidth - valueWidth);
  left = slider.value === slider.min ? 0 : left;

  value.style.left = left + "px";
}

window.updateLabels = function(slider) {
  const value = document.getElementById(slider.dataset.valueId);
  const minLabel = document.getElementById(slider.dataset.minLabelId);
  const maxLabel = document.getElementById(slider.dataset.maxLabelId);

  const valueRect = value.getBoundingClientRect();
  const minLabelRect = minLabel.getBoundingClientRect();
  const maxLabelRect = maxLabel.getBoundingClientRect();

  const minLabelDelta = valueRect.left - (minLabelRect.left);
  const maxLabelDelta = maxLabelRect.left - valueRect.left;

  const deltaThreshold = 32;

  if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
  else minLabel.classList.remove("hidden");

  if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
  else maxLabel.classList.remove("hidden");
}

window.updateProgress = function(slider) {
  let progress = document.getElementById(slider.dataset.progressId);
  const percent = getSliderPercent(slider);

  progress.style.width = percent * 100 + "%";
}

window.getSliderPercent = function(slider) {
  const range = slider.max - slider.min;
  const absValue = slider.value - slider.min;

  return absValue / range;
}

window.setTicks = function(slider) {
  let container = document.getElementById(slider.dataset.tickId);
  const spacing = parseFloat(slider.dataset.tickStep);
  const sliderRange = slider.max - slider.min;
  const tickCount = sliderRange / spacing + 1; // +1 to account for 0

  for (let ii = 0; ii < tickCount; ii++) {
      let tick = document.createElement("span");

      tick.className = "tick-slider-tick";

      container.appendChild(tick);
  }
}

window.onResize = function() {
  const sliders = document.getElementsByClassName("tick-slider-input");

  for (let slider of sliders) {
      updateValuePosition(slider);
  }
}

//window.onload = init;
window.addEventListener("resize", onResize);



window.cmdGenerar_Click = function(){
  const dtpfin = new Date(document.getElementById('dtpfin').value);
  const dtpinicio = new Date(document.getElementById('dtpinicio').value);
  var sql = '';
  if ( (dtpfin - dtpinicio) < 0 ){
  alert ( "Fecha final es menor que la fecha inicial");
  return;
  }
  document.body.style.cursor = "progress";

//Me.Caption = Me.Caption & " - Consultando"
document.getElementById('Frame1').innerHTML= "Cant. atenciones: 0";
document.getElementById('t02').innerHTML = '';

//Cambios: Bruno Salazar
    // Obtener la referencia al elemento checkbox
    var checkbox = document.getElementById("final_check").checked;
    var cadena_tipoencuesta = `'R10.0','R10.1','R10.2','R10.3','R10.4','R10.4','K30.x','K35.0','K35.1','K35.9','K36.X','K37.X','R14.X'`;
    //var cadena_tipoencuesta = cadena_tipoencuesta = `'R19.3','R19.0','R10.0','R10.1','R10.2','R10.3','R10.4','K30.x','K35.0','K35.1','K35.9','K36.X','K37.X','R14.X'`;
    //var cadena_tipoencuesta = cadena_tipoencuesta = `'R19.3','R19.0','R10.4','R10.1'`;

    //PAPU2
    // Obtener el valor booleano del checkbox
   if(checkbox==true){
      if (document.getElementById('dtpinicio').value == document.getElementById('dtpfin').value){
        sql = "SELECT CASE WHEN c.estado = 'PACIENTE NO CONTESTA' AND b.estado = 'PACIENTE NO CONTESTA' AND  a.flg_encuesta_dolor_abdominal = false then b.estado WHEN b.estado = 'EN SEGUIMIENTO' AND a.flg_encuesta_dolor_abdominal = false then 'EN SEGUIMIENTO' WHEN a.flg_encuesta_dolor_abdominal = false then 'PENDIENTE' else b.estado END estado, " 
         + " COALESCE(b.usuario, '')  reg_usuario, a.cod_ate, f_clasificacion(a.cod_ate) clasif, coalesce(a.pac_vip,'') pac_vip, a.fec_ate, CASE WHEN a.nom_doc is null THEN amb.nom_medico ELSE a.nom_doc END nom_doc, " 
         + " CASE WHEN b.preg_1_v2 = 0 THEN 'SIN DOLOR' WHEN b.preg_1_v2 = 1 THEN 'SE MANTIENE' WHEN b.preg_1_v2 = 2 THEN 'DISMINUCION' WHEN b.preg_1_v2 = 3 THEN 'AUMENTO' ELSE '' END preg_1_v2, CASE WHEN b.preg_2_v2 = 0 THEN 'NO APLICA' WHEN b.preg_2_v2 = 1 THEN 'DIFUSO' WHEN b.preg_2_v2 = 2 THEN 'LOCALIZADO' WHEN b.preg_2_v2 = 3 THEN 'INTERMITENTE' ELSE '' END preg_2_v2, CASE WHEN b.preg_3_v2 = 0 THEN 'NO' WHEN b.preg_3_v2 = 1 THEN 'SI' ELSE '' END preg_3_v2, b.preg_3_v2_val, CASE WHEN b.preg_4_v2 = 0 THEN 'NO APLICA' WHEN b.preg_4_v2 = 1 THEN 'Abdomen inferior' WHEN b.preg_4_v2 = 2 THEN 'Abdomen superior' ELSE '' END preg_4_v2, b.preg_5_v2, CASE WHEN b.preg_6_v2 = 0 THEN 'NO' WHEN b.preg_6_v2 = 1 THEN 'SI' ELSE '' END preg_6_v2, b.preg_7_v2,  coalesce(b.usuario,'') usuario, b.fecha_reg, b.hora_reg,  a.nom_gru, coalesce(a.des_dis,'') des_dis ," 
         + " coalesce(espc.nom_esp,'') nom_esp, dis.zona_cm,a.nom_pac,coalesce(cast(audi.hor_reg_audi as varchar),'') hor_reg_audi,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 1) as sms1,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'')  from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 2) as sms2,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 3) as sms3" 
         + " FROM t_tmpllamadas as a " 
         + " left join m_hiaclinica  diag on a.cod_ate = diag.cod_ate " 
         + " LEFT JOIN m_especialidades as espc ON a.cod_esp = espc.cod_esp "  
         + " LEFT JOIN m_distritos as dis ON a.cod_dis=dis.cod_dis "  
         + " LEFT JOIN t_amb_combo_asignacion as amb ON a.cod_asig=amb.cod_asig " 
         + " LEFT JOIN t_cm_audi_estado audi ON a.cod_ate = audi.cod_ate AND audi.cm_estado = '8' " 
         + " LEFT JOIN t_encuesta_dolor_abdominal  b on a.cod_ate = b.cod_ate " 
         + " LEFT JOIN vw_encuesta_dolor_abdominal_paciente_no_contesta c on c.cod_ate = a.cod_ate "
         + " WHERE    a.clasificacion_pac in (0,1,2,3,20,25,24,110) and  diag.cod_dia in ("+cadena_tipoencuesta +")   and  a.canc_ate is null AND a.flgvnr is null and a.fec_ate = '" + document.getElementById('dtpinicio').value + "'  AND a.flg_encuesta_dolor_abdominal = true";
         //+ " WHERE    a.clasificacion_pac in (0,1,2,3,20,25,24,110) and  diag.cod_dia in ('R19.3','R19.0','R10.4','R10.1')   and  a.canc_ate is null AND a.flgvnr is null and a.fec_ate = '" + document.getElementById('dtpinicio').value + "'  AND a.flg_encuesta_dolor_abdominal = true order by cod_ate asc";
        }else{
          sql = "SELECT CASE WHEN c.estado = 'PACIENTE NO CONTESTA' AND b.estado = 'PACIENTE NO CONTESTA' AND  a.flg_encuesta_dolor_abdominal = false then b.estado WHEN b.estado = 'EN SEGUIMIENTO' AND a.flg_encuesta_dolor_abdominal = false then 'EN SEGUIMIENTO' WHEN a.flg_encuesta_dolor_abdominal = false then 'PENDIENTE' else b.estado END estado, " 
          + " COALESCE(b.usuario, '')  reg_usuario, a.cod_ate, f_clasificacion(a.cod_ate) clasif, coalesce(a.pac_vip,'') pac_vip, a.fec_ate, CASE WHEN a.nom_doc is null THEN amb.nom_medico ELSE a.nom_doc END nom_doc, " 
          + " CASE WHEN b.preg_1_v2 = 0 THEN 'SIN DOLOR' WHEN b.preg_1_v2 = 1 THEN 'SE MANTIENE' WHEN b.preg_1_v2 = 2 THEN 'DISMINUCION' WHEN b.preg_1_v2 = 3 THEN 'AUMENTO' ELSE '' END preg_1_v2, CASE WHEN b.preg_2_v2 = 0 THEN 'NO APLICA' WHEN b.preg_2_v2 = 1 THEN 'DIFUSO' WHEN b.preg_2_v2 = 2 THEN 'LOCALIZADO' WHEN b.preg_2_v2 = 3 THEN 'INTERMITENTE' ELSE '' END preg_2_v2, CASE WHEN b.preg_3_v2 = 0 THEN 'NO' WHEN b.preg_3_v2 = 1 THEN 'SI' ELSE '' END preg_3_v2, b.preg_3_v2_val, CASE WHEN b.preg_4_v2 = 0 THEN 'NO APLICA' WHEN b.preg_4_v2 = 1 THEN 'Abdomen inferior' WHEN b.preg_4_v2 = 2 THEN 'Abdomen superior' ELSE '' END preg_4_v2, b.preg_5_v2, CASE WHEN b.preg_6_v2 = 0 THEN 'NO' WHEN b.preg_6_v2 = 1 THEN 'SI' ELSE '' END preg_6_v2, b.preg_7_v2,  coalesce(b.usuario,'') usuario, b.fecha_reg, b.hora_reg,  a.nom_gru, coalesce(a.des_dis,'') des_dis ," 
          + " coalesce(espc.nom_esp,'') nom_esp, dis.zona_cm,a.nom_pac,coalesce(cast(audi.hor_reg_audi as varchar),'') hor_reg_audi,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 1) as sms1,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'')  from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 2) as sms2,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 3) as sms3" 
          + " FROM t_tmpllamadas as a " 
          + " left join m_hiaclinica  diag on a.cod_ate = diag.cod_ate " 
          + " LEFT JOIN m_especialidades as espc ON a.cod_esp = espc.cod_esp "  
          + " LEFT JOIN m_distritos as dis ON a.cod_dis=dis.cod_dis "  
          + " LEFT JOIN t_amb_combo_asignacion as amb ON a.cod_asig=amb.cod_asig " 
          + " LEFT JOIN t_cm_audi_estado audi ON a.cod_ate = audi.cod_ate AND audi.cm_estado = '8' " 
          + " LEFT JOIN t_encuesta_dolor_abdominal  b on a.cod_ate = b.cod_ate " 
          + " LEFT JOIN vw_encuesta_dolor_abdominal_paciente_no_contesta c on c.cod_ate = a.cod_ate "
       + " WHERE   a.clasificacion_pac in (0,1,2,3,20,25,24,110) and  diag.cod_dia in ("+cadena_tipoencuesta +") and   a.canc_ate is null AND a.flgvnr is null and a.fec_ate  >='" + document.getElementById('dtpinicio').value + "' and  a.fec_ate  <= '" + document.getElementById('dtpfin').value + "' AND a.flg_encuesta_dolor_abdominal = true";
     }

   }else{
    if (document.getElementById('dtpinicio').value == document.getElementById('dtpfin').value){
      sql = "SELECT CASE WHEN c.estado = 'PACIENTE NO CONTESTA' AND b.estado = 'PACIENTE NO CONTESTA' AND  a.flg_encuesta_dolor_abdominal = false then b.estado WHEN b.estado = 'EN SEGUIMIENTO' AND a.flg_encuesta_dolor_abdominal = false then 'EN SEGUIMIENTO' WHEN a.flg_encuesta_dolor_abdominal = false then 'PENDIENTE' else b.estado  END estado, " 
      + " COALESCE(b.usuario, '')  reg_usuario, a.cod_ate, f_clasificacion(a.cod_ate) clasif, coalesce(a.pac_vip,'') pac_vip, a.fec_ate, CASE WHEN a.nom_doc is null THEN amb.nom_medico ELSE a.nom_doc END nom_doc, " 
      + " CASE WHEN b.preg_1_v2 = 0 THEN 'SIN DOLOR' WHEN b.preg_1_v2 = 1 THEN 'SE MANTIENE' WHEN b.preg_1_v2 = 2 THEN 'DISMINUCION' WHEN b.preg_1_v2 = 3 THEN 'AUMENTO' ELSE '' END preg_1_v2, CASE WHEN b.preg_2_v2 = 0 THEN 'NO APLICA' WHEN b.preg_2_v2 = 1 THEN 'DIFUSO' WHEN b.preg_2_v2 = 2 THEN 'LOCALIZADO' WHEN b.preg_2_v2 = 3 THEN 'INTERMITENTE' ELSE '' END preg_2_v2, CASE WHEN b.preg_3_v2 = 0 THEN 'NO' WHEN b.preg_3_v2 = 1 THEN 'SI' ELSE '' END preg_3_v2, b.preg_3_v2_val, CASE WHEN b.preg_4_v2 = 0 THEN 'NO APLICA' WHEN b.preg_4_v2 = 1 THEN 'Abdomen inferior' WHEN b.preg_4_v2 = 2 THEN 'Abdomen superior' ELSE '' END preg_4_v2, b.preg_5_v2, CASE WHEN b.preg_6_v2 = 0 THEN 'NO' WHEN b.preg_6_v2 = 1 THEN 'SI' ELSE '' END preg_6_v2, b.preg_7_v2,  coalesce(b.usuario,'') usuario, b.fecha_reg, b.hora_reg,  a.nom_gru, coalesce(a.des_dis,'') des_dis ," 
      + " coalesce(espc.nom_esp,'') nom_esp, dis.zona_cm,a.nom_pac,coalesce(cast(audi.hor_reg_audi as varchar),'') hor_reg_audi,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 1) as sms1,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'')  from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 2) as sms2,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 3) as sms3" 
      + " FROM t_tmpllamadas as a " 
      + " left join m_hiaclinica  diag on a.cod_ate = diag.cod_ate " 
      + " LEFT JOIN m_especialidades as espc ON a.cod_esp = espc.cod_esp "  
      + " LEFT JOIN m_distritos as dis ON a.cod_dis=dis.cod_dis "  
      + " LEFT JOIN t_amb_combo_asignacion as amb ON a.cod_asig=amb.cod_asig " 
      + " LEFT JOIN t_cm_audi_estado audi ON a.cod_ate = audi.cod_ate AND audi.cm_estado = '8' " 
      + " LEFT JOIN t_encuesta_dolor_abdominal  b on a.cod_ate = b.cod_ate " 
      + " LEFT JOIN vw_encuesta_dolor_abdominal_paciente_no_contesta c on c.cod_ate = a.cod_ate "
      + " WHERE a.clasificacion_pac in (0,1,2,3,20,25,24,110) and  diag.cod_dia in ("+cadena_tipoencuesta +")   and  a.canc_ate is null AND a.flgvnr is null and a.fec_ate = '" + document.getElementById('dtpinicio').value + "'";
     }
     else{
      sql = "SELECT CASE WHEN c.estado = 'PACIENTE NO CONTESTA' AND b.estado = 'PACIENTE NO CONTESTA' AND  a.flg_encuesta_dolor_abdominal = false then b.estado WHEN b.estado = 'EN SEGUIMIENTO' AND a.flg_encuesta_dolor_abdominal = false then 'EN SEGUIMIENTO' WHEN a.flg_encuesta_dolor_abdominal = false then 'PENDIENTE' else b.estado  END estado, " 
      + " COALESCE(b.usuario, '')  reg_usuario, a.cod_ate, f_clasificacion(a.cod_ate) clasif, coalesce(a.pac_vip,'') pac_vip, a.fec_ate, CASE WHEN a.nom_doc is null THEN amb.nom_medico ELSE a.nom_doc END nom_doc, " 
      + " CASE WHEN b.preg_1_v2 = 0 THEN 'SIN DOLOR' WHEN b.preg_1_v2 = 1 THEN 'SE MANTIENE' WHEN b.preg_1_v2 = 2 THEN 'DISMINUCION' WHEN b.preg_1_v2 = 3 THEN 'AUMENTO' ELSE '' END preg_1_v2, CASE WHEN b.preg_2_v2 = 0 THEN 'NO APLICA' WHEN b.preg_2_v2 = 1 THEN 'DIFUSO' WHEN b.preg_2_v2 = 2 THEN 'LOCALIZADO' WHEN b.preg_2_v2 = 3 THEN 'INTERMITENTE' ELSE '' END preg_2_v2, CASE WHEN b.preg_3_v2 = 0 THEN 'NO' WHEN b.preg_3_v2 = 1 THEN 'SI' ELSE '' END preg_3_v2, b.preg_3_v2_val, CASE WHEN b.preg_4_v2 = 0 THEN 'NO APLICA' WHEN b.preg_4_v2 = 1 THEN 'Abdomen inferior' WHEN b.preg_4_v2 = 2 THEN 'Abdomen superior' ELSE '' END preg_4_v2, b.preg_5_v2, CASE WHEN b.preg_6_v2 = 0 THEN 'NO' WHEN b.preg_6_v2 = 1 THEN 'SI' ELSE '' END preg_6_v2, b.preg_7_v2,  coalesce(b.usuario,'') usuario, b.fecha_reg, b.hora_reg,  a.nom_gru, coalesce(a.des_dis,'') des_dis ," 
      + " coalesce(espc.nom_esp,'') nom_esp, dis.zona_cm,a.nom_pac,coalesce(cast(audi.hor_reg_audi as varchar),'') hor_reg_audi,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 1) as sms1,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'')  from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 2) as sms2,(select coalesce(to_char(fecha,'dd/mm/yyyy HH24:MI'),'') from t_encuesta_dolor_abdominal_sms as sms where sms.cod_ate = a.cod_ate and correl = 3) as sms3" 
      + " FROM t_tmpllamadas as a " 
      + " left join m_hiaclinica  diag on a.cod_ate = diag.cod_ate " 
      + " LEFT JOIN m_especialidades as espc ON a.cod_esp = espc.cod_esp "  
      + " LEFT JOIN m_distritos as dis ON a.cod_dis=dis.cod_dis "  
      + " LEFT JOIN t_amb_combo_asignacion as amb ON a.cod_asig=amb.cod_asig " 
      + " LEFT JOIN t_cm_audi_estado audi ON a.cod_ate = audi.cod_ate AND audi.cm_estado = '8'" 
      + " LEFT JOIN t_encuesta_dolor_abdominal  b on a.cod_ate = b.cod_ate " 
      + " LEFT JOIN vw_encuesta_dolor_abdominal_paciente_no_contesta c on c.cod_ate = a.cod_ate "
      + " WHERE a.clasificacion_pac in (0,1,2,3,20,25,24,110) and  diag.cod_dia in ("+cadena_tipoencuesta +") and   a.canc_ate is null AND a.flgvnr is null and a.fec_ate  >='" + document.getElementById('dtpinicio').value + "' and  a.fec_ate  <= '" + document.getElementById('dtpfin').value + "'";
     //+ " WHERE   a.clasificacion_pac in (0,1,2,3,20,25,24,110) and  diag.cod_dia in ('R19.3','R19.0','R10.4','R10.1') and   a.canc_ate is null AND a.flgvnr is null and a.fec_ate  >='" + document.getElementById('dtpinicio').value + "' and  a.fec_ate  <= '" + document.getElementById('dtpfin').value + "' order by cod_ate asc";
     }

   }

                               fetch("/modulo/Abre_Detalle", { 
                                method: 'POST' ,
                                 body: JSON.stringify({
                                  query : sql 
                                })
                              }).then(response => response.json())
                                .then(function (data) {
                                    
                                  if (data.length>0) {
                                     
                                     for (let i =0; i < data.length; i++) {
                               
                                      var tr = document.createElement('tr');   
                                      var td1 = document.createElement('td');
                                      var td2 = document.createElement('td');
                                      var td3 = document.createElement('td');
                                      var td4 = document.createElement('td');
                                      var td5 = document.createElement('td');
                                      var td6 = document.createElement('td');
                                      var td7 = document.createElement('td');
                                      var td8 = document.createElement('td');
                                      var td9 = document.createElement('td');
                                      var td10 = document.createElement('td');
                                      var td11 = document.createElement('td');
                                      var td12 = document.createElement('td');
                                      var td13 = document.createElement('td');
                                      var td14 = document.createElement('td');
                                      var td15 = document.createElement('td');
                                      var td16 = document.createElement('td'); 
                                      var td17 = document.createElement('td'); 
                                      var td18 = document.createElement('td'); 
                                      var td19 = document.createElement('td'); 
                                      var td20 = document.createElement('td'); 
                                      var td21 = document.createElement('td'); 
                                      var td22 = document.createElement('td'); 
                                      var td23 = document.createElement('td'); 
                                      var td24 = document.createElement('td'); 
                                      var td25 = document.createElement('td');
                                      var td26 = document.createElement('td'); 
                                      var td27 = document.createElement('td');
                                      var td28 = document.createElement('td');


                                      td1.appendChild(document.createTextNode(data[i].cod_ate));
                                      td2.appendChild(document.createTextNode(data[i].clasif));
                                      td3.appendChild(document.createTextNode(data[i].pac_vip));
                                      td4.appendChild(document.createTextNode(data[i].fec_ate));
                                      td5.appendChild(document.createTextNode(data[i].nom_doc));
                                      td20.appendChild(document.createTextNode(data[i].nom_pac));
                                      td6.appendChild(document.createTextNode(data[i].preg_1_v2));
                                      td7.appendChild(document.createTextNode(data[i].preg_2_v2));
                                      td8.appendChild(document.createTextNode(data[i].preg_3_v2));
                                      td9.appendChild(document.createTextNode(data[i].preg_3_v2_val));
                                      td10.appendChild(document.createTextNode(data[i].preg_4_v2));
                                      
                                      //MEJORA BRUNO SALAZAR - MOSTRAR RESPUESTAS DE PREGUNTA 5 
                                      let cadenaNumerica;

                                      if (data[i].preg_5_v2 !== null) {
                                        cadenaNumerica = data[i].preg_5_v2.toString();
                                      } else {
                                        cadenaNumerica = ""; // O cualquier otro valor predeterminado que desees
                                      }
                                      //console.log(cadenaNumerica);
                                      
                                      // Remueve las llaves y divide la cadena por comas
                                      var numerosComoCadenas = cadenaNumerica.replace(/[{}]/g, '').split(',');

                                      // Objeto que asigna valores a los números
                                      var asignacion = {                                        
                                        0: 'No aplica',
                                        1: 'Nauseas/Vómitos',
                                        2: 'Diarrea/Estreñimiento',
                                        3: 'Apetito disminuido',
                                        4: 'Fiebre'
                                      };

                                      // Convierte las cadenas en números y obtén los valores asignados
                                      var valoresAsignados = numerosComoCadenas.map(numero => asignacion[parseInt(numero.trim(), 10)]);
                                      
                                      // Crea una cadena de texto con los valores
                                      var preg_5_v2 = valoresAsignados.join(', ');
                                      console.log(preg_5_v2); 
                                      //Se agrega en la tabla respuesta preg_5_v2
                                      td11.appendChild(document.createTextNode(preg_5_v2));
                                      td27.appendChild(document.createTextNode(data[i].preg_6_v2));
                                      td28.appendChild(document.createTextNode(data[i].preg_7_v2));                          
                                      td12.appendChild(document.createTextNode(data[i].usuario));
                                      td13.appendChild(document.createTextNode(data[i].fecha_reg));
                                      td14.appendChild(document.createTextNode(data[i].hora_reg));
                                      td16.appendChild(document.createTextNode(data[i].nom_gru));
                                      td17.appendChild(document.createTextNode(data[i].des_dis));
                                      td18.appendChild(document.createTextNode(data[i].nom_esp));
                                      td19.appendChild(document.createTextNode(data[i].zona_cm));
                                      td21.appendChild(document.createTextNode(data[i].hor_reg_audi));
                                      td22.appendChild(document.createTextNode(data[i].sms1??=''));
                                      td23.appendChild(document.createTextNode(data[i].sms2??=''));
                                      td24.appendChild(document.createTextNode(data[i].sms3??=''));
                                      td25.appendChild(document.createTextNode(data[i].estado));
                                      td26.appendChild(document.createTextNode(data[i].reg_usuario));

                                      tr.id = data[i].cod_ate;
                                      tr.onclick = function() {
                                        if (filacurrent!='')  document.getElementById(filacurrent).style.backgroundColor = '';
                                          this.style.backgroundColor = 'turquoise';
                                          filacurrent = this.id;
                                        };
                                      tr.appendChild(td1); 
                                      tr.appendChild(td2); 
                                      tr.appendChild(td3); 
                                      tr.appendChild(td4); 
                                      tr.appendChild(td5); 
                                      tr.appendChild(td20); 
                                      tr.appendChild(td6); 
                                      tr.appendChild(td7); 
                                      tr.appendChild(td8); 
                                      tr.appendChild(td9); 
                                      tr.appendChild(td10); 
                                      tr.appendChild(td11);
                                      tr.appendChild(td27);
                                      tr.appendChild(td28);
                                      tr.appendChild(td12); 
                                      tr.appendChild(td13); 
                                      tr.appendChild(td14); 
                                      tr.appendChild(td16); 
                                      tr.appendChild(td17); 
                                      tr.appendChild(td18); 
                                      tr.appendChild(td19); 
                                      tr.appendChild(td21); 
                                      tr.appendChild(td22); 
                                      tr.appendChild(td23); 
                                      tr.appendChild(td24); 
                                      tr.appendChild(td25); 
                                      tr.appendChild(td26); 

                                      document.getElementById('t02').appendChild(tr);
                                 
                                    }  
                                     document.body.style.cursor = 'default' ; 
                                      document.getElementById('Frame1').innerHTML= "Cant. atenciones: "+data.length;
                                  }else{
                                    document.body.style.cursor = 'default' ;
                                    document.getElementById('Frame1').innerHTML= "Cant. atenciones: 0";
                                  }
                                  
                                 }).catch(error => {
                                  console.log(error);
                                });

}

window.Cmd_Paciente_no_contesta_Click = async function(){
 var enviado = false;
 var cantsmssiguiente = document.getElementById('tbodysms').rows.length + 1 ;
 var tipoencuesta = document.getElementById('txt_tipoencuesta').value ;
 var atencion = document.getElementById('Txt_atencion').value ;


 fetch('/modulo/Execute/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: "DELETE FROM t_encuesta_dolor_abdominal where cod_ate = " + atencion         
  })
  });

  if (confirm("Se enviará SMS " + cantsmssiguiente) == true){
     
    document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
 
    var today = new Date(); 
                var rst_reg_encuesta = {};
                rst_reg_encuesta.cod_ate = document.getElementById('Txt_atencion').value; 


                if (tipoencuesta == 'ABDOMINAL'){
                  rst_reg_encuesta.preg_1_v2 = 0;
                  rst_reg_encuesta.preg_2_v2 = 0;
  
                  rst_reg_encuesta.preg_3_v2 = 0;
                  rst_reg_encuesta.preg_3_v2_val = '';
  
                  rst_reg_encuesta.preg_4_v2 = 0;
                  rst_reg_encuesta.preg_5_v2 = '{}';
                  rst_reg_encuesta.preg_6_v2 = 0;
                  rst_reg_encuesta.preg_7_v2 = '';
                }else{
                  rst_reg_encuesta.preg_1 = 0;
                  rst_reg_encuesta.preg_2 = 0;
  
                  rst_reg_encuesta.preg_3 = '{}';
                  rst_reg_encuesta.preg_4 = '{}';
                  rst_reg_encuesta.preg_5 = 0;
                  rst_reg_encuesta.preg_6 = 0;
                  rst_reg_encuesta.preg_7 = 0;
                  rst_reg_encuesta.preg_8 = '';
                }
                rst_reg_encuesta.estado = 'PACIENTE NO CONTESTA';

                rst_reg_encuesta.usuario =await getusuario();
                rst_reg_encuesta.fecha_reg = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
                rst_reg_encuesta.hora_reg =  String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
                rst_reg_encuesta.encuestado = document.getElementById('cboencuestado').value;
                rst_reg_encuesta.negocio = JSON.parse(document.getElementById('cbo_unegocio').value).negocio;//tr.cells[15].innerHTML.trim();
                if (tipoencuesta == 'ABDOMINAL'){
                  rst_reg_encuesta.tabla = 't_encuesta_dolor_abdominal';
                }else{
                  rst_reg_encuesta.tabla = 't_encuesta_respiratorio';
                }
                await fetch('/modulo/Executeinsert/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(rst_reg_encuesta)
                }).then(response => response.json())
                .then(function (data) { 
                  enviado = false;

                     
                      alert ("La encuesta se registró en seguimiento");
                     

                }).catch(error => {
                  enviado = true;

                  console.log(error);
                }); 
   //if (enviado==true) return;
   await  fetch('/modulo/SMS/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       numero:document.getElementById('Txt_cel').value,
       pac:document.getElementById('Txt_pac').value,
       cod_ate:document.getElementById('Txt_atencion').value
    })
  }).then(response => response.json())
    .then(async function (data) {
      if(typeof data !== 'string' && data == '24horas'){
        alert('Debe pasara 24 horas para el proximo SMS');
        enviado = true;
      }else{
        if(data == true){
          enviado = false;

          alert('Se envio el SMS');
        }else{
        alert('No se envio el SMS. Intentar de nuevo');
        enviado = true;
        } 
      }
        
    }).catch(error => {
      console.log(error);
    });
 // if (enviado==true) return;

  await fetch('/modulo/P_GUARDA_SEGUIMIENTO/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cod_ate : document.getElementById('Txt_atencion').value,
      des_ser :  'PSS',
      obs_ser :  "PACIENTE NO CONTESTA PARA ENCUESTA ABDOMINAL",
      cod_snc :  '520'
       })
  
     }).then(response => response.json())
    .then(function (data ) {
      document.getElementById("Cmd_salir").click();
      document.getElementById("Cmd_filtrar").click();
    }).catch(error => {
      console.log(error);
    });
  }
}




window.seleccionarOpcion = function() {
  var combobox = document.getElementById("cboseguimientoencuesta");
  var opcionSeleccionada = combobox.options[combobox.selectedIndex].value;
  function desactivar(){
    document.getElementById('pregunta1aumento').checked = false;
    document.getElementById('pregunta1disminucion').checked = false;
    document.getElementById('pregunta1semantiene').checked = false;
    document.getElementById('pregunta1sindolor').checked = false;
    document.getElementById('pregunta2continuo').checked = false;
    document.getElementById('pregunta2intermitente').checked = false;
    document.getElementById('pregunta2localizado').checked = false;
    document.getElementById('pregunta2difuso').checked = false;
    document.getElementById('pregunta2noaplica').checked = false;
    document.getElementById('pregunta3si').checked = false;
    document.getElementById('pregunta3otros').checked = false;
    document.getElementById('pregunta3no').checked = false;
    document.getElementById('pregunta4abdomensuperior').checked = false;
    document.getElementById('pregunta4abdomeninferior').checked = false;
    document.getElementById('pregunta4noaplica').checked = false;
    document.getElementById('pregunta5fiebre').checked = false;
    document.getElementById('pregunta5nauseasvomitos').checked = false;
    document.getElementById('pregunta5fiebre').checked = false;
    document.getElementById('pregunta5diarreaestrenimiento').checked = false;
    document.getElementById('pregunta5noaplica').checked = false;
    document.getElementById('pregunta5apetitodisminuido').checked = false;
    document.getElementById('pregunta6no').checked = false;
    document.getElementById('pregunta6si').checked = false;
    document.getElementById('pregunta7').value = '';
  }
  
  if (opcionSeleccionada == "EN SEGUIMIENTO" || opcionSeleccionada == "MAD CON DERIVACION A CLINICA" || opcionSeleccionada == "MAD RECHAZADO"  || opcionSeleccionada == "MAD DISCONFORME" || opcionSeleccionada == "MAD DERIVACION A PROGRAMAS") {
    document.getElementById('Command1').disabled = true;
    desactivar();

  } else{
    document.getElementById('Command1').disabled = false;
    desactivar();
  }

}

function desactivar_botones(){
  var estado = document.getElementById('cboseguimientoencuesta').value;

  if(document.getElementById('pregunta1aumento').checked == true){ 
    document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
    document.getElementById('pregunta1disminucion').checked = false;
    document.getElementById('pregunta1semantiene').checked = false;
    document.getElementById('pregunta1sindolor').checked = false;
   }

  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true ) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true ) && document.getElementById('pregunta7').value != ''){    document.getElementById('Command1').disabled = false;
  }else{
  if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURJICO' && estado != 'MAD UME, MAD RECHAZA'){
   document.getElementById('Command1').disabled = true;
  } 
}
}

window.pregunta1aumento_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;

  if(document.getElementById('pregunta1aumento').checked == true){ 
    document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
    document.getElementById('pregunta1disminucion').checked = false;
    document.getElementById('pregunta1semantiene').checked = false;
    document.getElementById('pregunta1sindolor').checked = false;
   }

  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
  else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
    document.getElementById('Command1').disabled = true;

   }
  }
}

window.pregunta1disminucion_click = function(){
  
  var estado = document.getElementById('cboseguimientoencuesta').value;

  if(document.getElementById('pregunta1disminucion').checked == true){ 
    document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
    document.getElementById('pregunta1aumento').checked = false;
    document.getElementById('pregunta1semantiene').checked = false;
    document.getElementById('pregunta1sindolor').checked = false;
   }
   
   if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == '')
   {   
      document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }

   if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
     else{
      if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
        document.getElementById('Command1').disabled = true;
      }
     }
}

window.pregunta1semantiene_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta1semantiene').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta1aumento').checked = false;
   document.getElementById('pregunta1disminucion').checked = false;
   document.getElementById('pregunta1sindolor').checked = false;
  }
if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta1sindolor_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta1sindolor').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta1aumento').checked = false;
   document.getElementById('pregunta1semantiene').checked = false;
   document.getElementById('pregunta1disminucion').checked = false;
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta2continuo_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta2continuo').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta2intermitente').checked = false;
   document.getElementById('pregunta2localizado').checked = false;
   document.getElementById('pregunta2difuso').checked = false;
   document.getElementById('pregunta2noaplica').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false; 
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta2intermitente_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta2intermitente').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta2continuo').checked = false;
   document.getElementById('pregunta2localizado').checked = false;
   document.getElementById('pregunta2difuso').checked = false;
   document.getElementById('pregunta2noaplica').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}

window.pregunta2localizado_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta2localizado').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta2intermitente').checked = false;
   document.getElementById('pregunta2continuo').checked = false;
   document.getElementById('pregunta2difuso').checked = false;
   document.getElementById('pregunta2noaplica').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}

window.pregunta2difuso_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta2difuso').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta2continuo').checked = false;
   document.getElementById('pregunta2localizado').checked = false;
   document.getElementById('pregunta2intermitente').checked = false;
   document.getElementById('pregunta2noaplica').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == '')
  {   
     document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}

window.pregunta2noaplica_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta2noaplica').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta2continuo').checked = false;
   document.getElementById('pregunta2localizado').checked = false;
   document.getElementById('pregunta2intermitente').checked = false;
   document.getElementById('pregunta2difuso').checked = false;
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}


window.pregunta3si_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta3si').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta3otros').style.display = 'block';
   document.getElementById('pregunta3no').checked = false;
  }else{
    document.getElementById('pregunta3otros').value='';
    document.getElementById('pregunta3otros').style.display = 'none';
    
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
  else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
   }
  }
}
window.pregunta3no_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta3no').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta3otros').value='';
   document.getElementById('pregunta3otros').style.display = 'none';
   document.getElementById('pregunta3si').checked = false;
  }else{
    document.getElementById('pregunta3si').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta3otros_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta3otros').value != ''){ 
    document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
    } 
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }
 
  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta4abdomensuperior_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
    if(document.getElementById('pregunta4abdomensuperior').checked == true){ 
     document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
     document.getElementById('pregunta4abdomeninferior').checked = false;
     document.getElementById('pregunta4noaplica').checked = false;

    }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}

window.pregunta4abdomeninferior_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta4abdomeninferior').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta4abdomensuperior').checked = false;
   document.getElementById('pregunta4noaplica').checked = false;

  }
if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}

window.pregunta4noaplica_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta4noaplica').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta4abdomensuperior').checked = false;
   document.getElementById('pregunta4abdomeninferior').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}


window.pregunta5fiebre_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta5fiebre').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta5noaplica').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta5apetitodisminuido_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta5apetitodisminuido').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta5noaplica').checked = false;

  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta5diarreaestrenimiento_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta5diarreaestrenimiento').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta5noaplica').checked = false;
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}
window.pregunta5nauseasvomitos_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta5nauseasvomitos').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta5noaplica').checked = false;
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}



window.pregunta5noaplica_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta5noaplica').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta5nauseasvomitos').checked = false; 
   document.getElementById('pregunta5fiebre').checked = false;
   document.getElementById('pregunta5diarreaestrenimiento').checked = false;
   document.getElementById('pregunta5apetitodisminuido').checked = false; 
   
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}


window.pregunta6si_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta6si').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta6no').checked = false;

  }else{
   
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
  else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
   }
  }
}
window.pregunta6no_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta6no').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   document.getElementById('pregunta6si').checked = false;
  }else{
 
  }
  if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}

window.pregunta7_click = function(){
  var estado = document.getElementById('cboseguimientoencuesta').value;
  if(document.getElementById('pregunta7').value != ''){ 
    document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   }
   if((document.getElementById('pregunta1aumento').checked == false && document.getElementById('pregunta1disminucion').checked == false && document.getElementById('pregunta1semantiene').checked == false && document.getElementById('pregunta1sindolor').checked == false ) && (document.getElementById('pregunta2continuo').checked == false && document.getElementById('pregunta2intermitente').checked == false && document.getElementById('pregunta2localizado').checked == false && document.getElementById('pregunta2difuso').checked == false && document.getElementById('pregunta2noaplica').checked == false) && (document.getElementById('pregunta3si').checked == false && document.getElementById('pregunta3otros').value == '' && document.getElementById('pregunta3no').checked == false) && (document.getElementById('pregunta4abdomensuperior').checked == false && document.getElementById('pregunta4abdomeninferior').checked == false && document.getElementById('pregunta4noaplica').checked == false) && (document.getElementById('pregunta5fiebre').checked == false  && document.getElementById('pregunta5apetitodisminuido').checked == false  && document.getElementById('pregunta5diarreaestrenimiento').checked == false && document.getElementById('pregunta5nauseasvomitos').checked == false && document.getElementById('pregunta5noaplica').checked == false ) && (document.getElementById('pregunta6si').checked == false && document.getElementById('pregunta6no').checked == false ) && document.getElementById('pregunta7').value == ''){    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }
 
  if((document.getElementById('pregunta1aumento').checked == true || document.getElementById('pregunta1disminucion').checked == true || document.getElementById('pregunta1semantiene').checked == true || document.getElementById('pregunta1sindolor').checked == true ) && (document.getElementById('pregunta2continuo').checked == true || document.getElementById('pregunta2intermitente').checked == true || document.getElementById('pregunta2localizado').checked == true || document.getElementById('pregunta2difuso').checked == true || document.getElementById('pregunta2noaplica').checked == true) && ((document.getElementById('pregunta3si').checked == true && document.getElementById('pregunta3otros').value != '') || document.getElementById('pregunta3no').checked == true) && (document.getElementById('pregunta4abdomensuperior').checked == true || document.getElementById('pregunta4abdomeninferior').checked == true || document.getElementById('pregunta4noaplica').checked == true) && (document.getElementById('pregunta5fiebre').checked == true  || document.getElementById('pregunta5apetitodisminuido').checked == true  || document.getElementById('pregunta5diarreaestrenimiento').checked == true || document.getElementById('pregunta5nauseasvomitos').checked == true || document.getElementById('pregunta5noaplica').checked == true) && (document.getElementById('pregunta6si').checked == true || document.getElementById('pregunta6no').checked == true )){   
    document.getElementById('Command1').disabled = false;
   }
   else{
    if(estado != 'CERRADO' && estado != 'FRUSTRO' && estado != 'MAD HOSPITALIZADO' && estado != 'MAD HOSPITALIZADO QUIRURGICO' && estado != 'MAD UME, MAD RECHAZA'){
      document.getElementById('Command1').disabled = true;
    }
   }
}


//respiratorio

window.pregunta1sir_click = function(){
  if(document.getElementById('pregunta1sir').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta1nor').checked = false;

  }else{
   
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
   document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta1nor_click = function(){
  if(document.getElementById('pregunta1nor').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   document.getElementById('pregunta1sir').checked = false;
  }else{
 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){  
       document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }

   if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
   }else{
    document.getElementById('Command1').disabled = true;
   }
}

window.pregunta2sir_click = function(){
  if(document.getElementById('pregunta2sir').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta2nor').checked = false;

  }else{
   
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
   document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta2nor_click = function(){
  if(document.getElementById('pregunta2nor').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   document.getElementById('pregunta2sir').checked = false;
  }else{
 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
     document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }

   if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
   }else{
    document.getElementById('Command1').disabled = true;
   }
}



window.pregunta2sir_click = function(){
  if(document.getElementById('pregunta2sir').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta2nor').checked = false;

  }else{
   
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
   document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta2nor_click = function(){
  if(document.getElementById('pregunta2nor').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   document.getElementById('pregunta2sir').checked = false;
  }else{
 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
     document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }

   if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
   }else{
    document.getElementById('Command1').disabled = true;
   }
}




 
window.pregunta3productivar_click = function(){
  if(document.getElementById('pregunta3productivar').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta3disfonicar_click = function(){
  if(document.getElementById('pregunta3disfonicar').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
  
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta3exigenter_click = function(){
  if(document.getElementById('pregunta3exigenter').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}



window.pregunta4sibilantesr_click = function(){
  if(document.getElementById('pregunta4sibilantesr').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta4roncantesr_click = function(){
  if(document.getElementById('pregunta4roncantesr').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}

 
window.pregunta5sir_click = function(){
  if(document.getElementById('pregunta5sir').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta5nor').checked = false;

  }else{
   
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
   document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta5nor_click = function(){
  if(document.getElementById('pregunta5nor').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   document.getElementById('pregunta5sir').checked = false;
  }else{
 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){    
     document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }

   if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
   }else{
    document.getElementById('Command1').disabled = true;
   }
}


window.pregunta6sir_click = function(){
  if(document.getElementById('pregunta6sir').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta6nor').checked = false;

  }else{
   
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
   document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta6nor_click = function(){
  if(document.getElementById('pregunta6nor').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   document.getElementById('pregunta6sir').checked = false;
  }else{
 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){  
       document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }

   if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
   }else{
    document.getElementById('Command1').disabled = true;
   }
}


window.pregunta7sir_click = function(){
  if(document.getElementById('pregunta7sir').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true;
   document.getElementById('pregunta7nor').checked = false;

  }else{
   
  }
  if(document.getElementById('pregunta7sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
  }

  if((document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
   document.getElementById('Command1').disabled = false;
  }else{
   document.getElementById('Command1').disabled = true;
  }
}
window.pregunta7nor_click = function(){
  if(document.getElementById('pregunta7nor').checked == true){ 
   document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   document.getElementById('pregunta7sir').checked = false;
  }else{
 
  }
  if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').value == '' && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){     
    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }

   if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
   }else{
    document.getElementById('Command1').disabled = true;
   }
}

window.pregunta8r_click = function(){
  if(document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Cmd_Paciente_no_contesta').disabled = true; 
   }
   if(document.getElementById('pregunta1sir').checked == false && document.getElementById('pregunta1nor').checked == false && document.getElementById('pregunta2sir').checked == false && document.getElementById('pregunta2nor').checked == false  && document.getElementById('pregunta3productivar').checked == false && document.getElementById('pregunta3disfonicar').checked == false && document.getElementById('pregunta3exigenter').checked == false && document.getElementById('pregunta4sibilantesr').checked == false && document.getElementById('pregunta4roncantesr').checked == false && document.getElementById('pregunta5sir').checked == false && document.getElementById('pregunta5nor').checked == false && document.getElementById('pregunta6sir').checked == false && document.getElementById('pregunta6nor').checked == false && document.getElementById('pregunta7sir').checked == false  && document.getElementById('pregunta7nor').checked == false  && document.getElementById('pregunta8r').value == ''){ 
    document.getElementById('Cmd_Paciente_no_contesta').disabled = false;
   }
 
   if((document.getElementById('pregunta1sir').checked == true || document.getElementById('pregunta1nor').checked == true )  && (document.getElementById('pregunta2sir').checked == true || document.getElementById('pregunta2nor').checked == true ) && (document.getElementById('pregunta3productivar').checked == true || document.getElementById('pregunta3disfonicar').checked == true || document.getElementById('pregunta3exigenter').checked == true)  && (document.getElementById('pregunta4sibilantesr').checked == true || document.getElementById('pregunta4roncantesr').checked == true) && (document.getElementById('pregunta5sir').checked == true || document.getElementById('pregunta5nor').checked == true ) && (document.getElementById('pregunta6sir').checked == true || document.getElementById('pregunta6nor').checked == true ) && (document.getElementById('pregunta7sir').checked == true || document.getElementById('pregunta7nor').checked == true ) && document.getElementById('pregunta8r').value != ''){ 
    document.getElementById('Command1').disabled = false;
   }else{
    document.getElementById('Command1').disabled = true;
   }
}

window.muestrarango = function(ele){
  var f= document.getElementById(ele);
f.style.visibility = 'visible';
}
window.nomuestrarango = function(ele){
  var f= document.getElementById(ele);
  f.style.visibility = 'hidden';
  }


  window.filatabladireccion = function(p) {
    var table = document.getElementById("direccionesbody");
  
    for (var i = 0, row; row = table.rows[i]; i++) {
      row.style.backgroundColor = "";
  
    }
    p.style.backgroundColor = "turquoise";
    document.getElementById('Txt_Direccion').value = p.cells[0].innerHTML;
    document.getElementById('Txt_Referencia').value = p.cells[3].innerHTML;
    document.getElementById('Dcbo_distrito').value = p.cells[1].innerHTML;
    document.getElementById('Txt_tlf_fijo').value = p.cells[5].innerHTML;
    document.getElementById('Txt_tlf_movil').value = p.cells[4].innerHTML;
   // document.getElementById('Cmd_selecionar_direccion').disabled = false;
  
  }
 


  
window.modalFrm_Regedit_dir_pac = function(cod_tit) {
  printModal2(`
  <div id="ed-modal-content2header"  style="color: white;background:green;display:flex;justify-content:space-between;"><h4> Registrar/editar direccion </h4><button type="button"  id="cancelarconfirmacion" class="cancelarmodal2 btn-xs btn-danger">X</button></div>

  
  <div style="display: block; border: 1px solid green; height: 35vh; overflow-y: scroll">
  <div></div>
  <table  id="atenciones"  border>
   <thead  style="background:#1cc88a;" id = "direccioneshead">
  <tr >
          <th scope="col">DIRECCION</th>
          <th scope="col">DISTRITO</th>
          <th scope="col">REFERENCIA</th>
          <th scope="col">TLF_MOVIL</th>
          <th scope="col">TLF_CASA</th>
  </tr>
  </thead>
  <tbody  id="direccionesbody"   >

  </tbody>
  <tfoot></tfoot>
</table> 
</div>

 <div style="display:flex;">
 <div style="flex-grow: 12">
 <label style="width:15%">Dirección: </label><input id="Txt_Direccion"  disabled name = "Txt_Direccion" type='text'  style="width:45%" ></input><label style="width:15%">Distrito: </label><select id="Dcbo_distrito"  disabled name = "Dcbo_distrito"  style="width:25%" ></select><br>
 <label style="width:15%">Referencia: </label><input id="Txt_Referencia"  disabled name = "Txt_Referencia" type='text'  style="width:85%" ></input><br>
 <label style="width:15%">Tlf. fijo: </label><input id="Txt_tlf_fijo"  disabled name = "Txt_tlf_fijo" placeholder="   -    " type='text'  style="width:20%" ></input><br>           
 <label style="width:15%">Tlf. Movil: </label><input id="Txt_tlf_movil"  disabled name = "Txt_tlf_movil" type='text'  style="width:20%" ></input><br>
 </div>
    <div style="flex-grow: 1;">
    <div style="display:grid;  grid-gap: 1px; ">
 
    </div>

    </div>
 </div>

<div   style="display:flex;justify-content:flex-end	;">
 <input type="button"  class="btn btn btn-danger cancelarmodal2"  id="Cmd_salir" name="Cmd_salir" value="Salir"> 
</div>
 `);

  var ed_modal_content = document.getElementById("ed-modal-content2");
 
  dragElement(ed_modal_content);
  
  ed_modal_content.style.minWidth = "70vw";
  document.getElementById('Txt_tlf_fijo').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/);
    //alert(x[1]);//
    e.target.value = !x[1] ? x[1] : x[1] + (x[2] ? '-' + x[2] : '');
  });
  fetch('/gestionlaboratorio/AData_Distrito', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  }).then(response => response.json())
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {

        var Dcbo_distrito = document.getElementById('Dcbo_distrito');
        var option = document.createElement('option');
        option.value = data[i].cod_dis.trim();
        option.text = data[i].des_dis.trim();
        Dcbo_distrito.appendChild(option);

      }

      fetch('/gestionlaboratorio/Adata_direccion', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cod_tit: cod_tit
        })
      }).then(response => response.json())
        .then(function (data) {
          var html = '';
          for (var i = 0; i < data.length; i++) {


            html += '<tr  id="' + data[i].cod_dir + '"   onclick="filatabladireccion(this);">' +

              '<td >' + data[i].des_dir.trim() + '</td>' +
              '<td style="display:none">' + data[i].cod_dis.trim() + '</td>' +
              '<td>' + data[i].des_dis + '</td>' +
              '<td>' + data[i].ref_dir.trim() + '</td>' +
              '<td>' + data[i].tlf_celular + '</td>' +
              '<td>' + data[i].tlf_casa + '</td>'

            '</tr>';
          }
          document.getElementById('direccionesbody').innerHTML = html;
          if (data.length != 0) {
            document.getElementById('direccionesbody').rows[0].click();
          }

        }).catch(error => {
          alert(error);
        });
    }).catch(error => {
      alert(error);
    });
}

window.fnExcelReport = function() {
  var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

  tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';

  tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

  tab_text = tab_text + "<table border='1px'>";
  tab_text = tab_text + $('#tabla1').html();
  tab_text = tab_text + '</table></body></html>';

  var data_type = 'data:application/vnd.ms-excel';
  
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      if (window.navigator.msSaveBlob) {
          var blob = new Blob([tab_text], {
              type: "application/csv;charset=utf-8;"
          });
          navigator.msSaveBlob(blob, 'Reporte_encuesta_abdominal.xls');
      }
  } else {
      $('#Cmd_filtrar').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
      $('#Cmd_filtrar').attr('download', 'Reporte_encuesta_abdominal.xls');
  }

}



