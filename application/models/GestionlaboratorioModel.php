<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class GestionlaboratorioModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();
 
      //  $this->db = $this->load->database('hipocrates', TRUE);
        $this->load->library('session');
    }
   

   
    public function get_flebotomistasxproveedor($proveedorflebotomista){
        
        $query = $this->db->query("select cod_flebotomista, nom_flebotomista from  m_flebotomista where cod_prov_flebotomista=".$proveedorflebotomista);
    
        return $query->result_array(); 
    
    }
    public function get_flebotomistas(){
        
        $query = $this->db->query("select cod_flebotomista, nom_flebotomista,tlf_flebotomista,cod_prov_flebotomista,activo from  m_flebotomista where activo = true order by cast(cod_flebotomista as int)");
    
        return $query->result_array(); 
    
    }
    public function get_proveedores_laboratorio(){
        
      $query = $this->db->query("SELECT a.cod_laboratorios as id_proveedor,a.des_laboratorio as proveedor FROM m_lab_laboratorios a where estado = 'A' AND cod_servicios='1'");
  
      return $query->result_array(); 
  
  }
  
  public function get_proveedores_remisse(){
        
    $query = $this->db->query(" select * from m_proveedor_motorizado where activo = true ");

    return $query->result_array(); 

}
public function get_conductoresxremisse($proveedorremisse){
        
  $query = $this->db->query("select cod_mot, nom_mot from  m_motorizados where cod_prov_motorizado=".$proveedorremisse ." and activi = true");

  return $query->result_array(); 

}
  public function actualizarproveedorlaboratorio($codlaboratorio,$cod_serv_laboratorio){

    $query = $this->db->query("update t_cab_lab_serv_laboratorio set  cod_laboratorios =".$codlaboratorio." where cod_serv_laboratorio = ".$cod_serv_laboratorio);

    return ($this->db->affected_rows() >= 0) ? true : false;
   }

   public function Execute($query){
    $this->db->query($query);      
    return ($this->db->affected_rows() >= 0) ? true : false;

  }
   public function actualizarproveedorlaboratorio_flebotomista($codlaboratorio,$codflebotomista,$nomflebotomista,$cod_serv_laboratorio){

    $query = $this->db->query("update t_cab_lab_serv_laboratorio set  cod_laboratorios =".$codlaboratorio." , cod_resp_muestra = '".$codflebotomista."',nom_resp_muestra='".$nomflebotomista."' where cod_serv_laboratorio = ".$cod_serv_laboratorio);

    return ($this->db->affected_rows() >= 0) ? true : false;
   }
   public function actualizarproveedorremisse($cod_motorizado,$cod_serv_laboratorio){

    $query = $this->db->query("update t_cab_lab_serv_laboratorio set  cod_mot =".$cod_motorizado." where cod_serv_laboratorio = ".$cod_serv_laboratorio);

    return ($this->db->affected_rows() >= 0) ? true : false;
   }
    public function get_pruebas($cod_serv_laboratorio,$documento,$operacionprecisa){
        $asignacion =  $this->db->query("select det.cod_pruebas, det.descripcion, det.clasificacion, labest.id_estado, labest.descripcion des_estado
        FROM t_det_lab_serv_laboratorio det INNER JOIN m_lab_estado_seguimiento labest ON det.id_estado = labest.id_estado 
        AND det.clasificacion = labest.id_clasif_lab WHERE det.cod_serv_laboratorio=".$cod_serv_laboratorio)->row_array();
       
          
        $context = stream_context_create(array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
        ));
  
        $url = "https://precisa.pe/WS_ResultadoLaboratorio/Resultados.asmx?wsdl";
    
      
        try {
         $client = new SoapClient($url,  [ "trace" => 1 ]  );
         $metodos = $client->__getTypes();
         $parametros=array(); //parametros de la llamada
         $parametros['token']='$$20197%$DR+$$&';
         $parametros['oa']=$cod_serv_laboratorio;
         $parametros['documento']=$documento;
         $parametros['TipoOperacion']=$operacionprecisa;

         $parametros['fecini']="";
         $parametros['fecfin']="";
         $result = $client->WebResultadosGeneral($parametros);

         //$result = $client->smsSendSoap( "DOCTORSAC", "DOCTOR2019*",51, $beeper_mot,$nom_doc ."  ".$beeper_doc."   ". $lugar_recojo."  ".$lugar_termino,"");
          return $result;
        } catch ( SoapFault $e ) {
         return  $e;
        }
    }


    /* public function get_busquedaexamenes($sql ){
     
       $filtro="";  
       
      // $multiLinestring = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, clasif.nom_clasif, pac.nom_com, d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada, a.hora_coordinada, a.cod_servicios,clasif.tipo_operacion_precisa,pac.num_doc_id from t_cab_lab_serv_laboratorio a inner join t_tmpllamadas ate on a.cod_ate = ate.cod_ate INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif LEFT JOIN m_pacientesdrmas pac ON a.cod_tit = pac.cod_hia left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis left join m_doctores dr ON a.cod_doc = dr.cod_doc left join m_grupos gru on a.cod_gru = gru.cod_gru WHERE ate.clasificacion_pac in (1, 2, 200, 201, 202, 203) and a.estado    ='3'  AND a.fecha_servicio >= '2020-08-01'  AND a.cod_servicios <> 3  ORDER BY a.fecha_servicio ASC, a.estado ASC, fecha_maxima ASC";
          
       return  $this->db->query( $sql )->result_array();
    
    } */
     // Fetch records
  public function get_busquedaexamenes($sql1,$rowno,$rowperpage) {
 
    $query = $this->db->query("SELECT * from (".$sql1.") as ordenes limit ".$rowperpage." offset ".$rowno);
    //$this->db->limit($rowperpage, $rowno);  
    //$query = $this->db->get();
 
    return $query->result_array();
  }

  // Select total records
  public function getrecordCount($sql) {

//    $this->db->select('count(*) as allcount');
  //  $this->db->from('posts');
    $query = $this->db->query("SELECT count(*) as allcount from (".$sql.") as ordenes");
    $result = $query->result_array();
 
    return $result[0]['allcount'];
  }
    public function getclasificacionserv(){
     
       $filtro="";  
       
       $multiLinestring = "(select cod_clasif, nom_clasif from m_clasificacion_pac    WHERE cod_clasif in (0,1,11,24) AND activo = true      UNION      SELECT -1 cod_clasif, 'TODOS' nom_clasif      from m_clasificacion_pac WHERE cod_clasif = 1) ORDER BY 1 asc ";
       return  $this->db->query( $multiLinestring )->result_array();
    }

    public function get_seguimiento($cod_asig){
       
       
       return  $this->db->query("select COD_ASIG , NOM_USU AS USUARIO,TIPO_REGISTRO AS EVENTO  , CAMBIOS_REALIZADOS AS REGISTRO, to_char(FEC_REG, 'DD/MM/YYYY') AS FECHA,HORA_REG AS HORA  FROM T_AUD_AGENTE WHERE  cod_asig=" .$cod_asig. "ORDER BY ID_POSICION ASC")->result_array();
    
    }
    public function Adata_clasif(){
      return  $this->db->query("SELECT * FROM m_clasificacion_pac WHERE activo = true ORDER BY nom_clasif ASC")->result_array();
    }
    
    public function getpruebas(){
      $query = $this->db->query("select  cod_pruebas , trim(des_prueba) des_prueba , estado, cod_servicios , unidad , clasificacion,codigo_segus,codexamen,usuario_creacion,fecha_creacion,usuario_modificacion,fecha_modificacion  from m_lab_pruebas where estado = 'A' order by des_prueba  ");
      return $query->result_array(); 
    } 
  public function getsncs(){
        
    $query = $this->db->query("select  *  from m_servnoconforme     order by tip_serv,tipo ");
    return $query->result_array(); 
} 
    public function AdataSNC($query){
      
      return  $this->db->query($query)->result_array();      
    }
    
    public function AdataSeg($query){
      return  $this->db->query($query)->result_array();      
    }
    public function lrs_Servicio($query,$queryalterno){
      if  ($this->db->query($query)->num_rows()==0){
       
        return  $this->db->query($queryalterno)->result_array(); 
      }else{
      
        return  $this->db->query($query)->result_array();      

       }
    }
    
    public function lrs_ServAso($query){
      return  $this->db->query($query)->result_array();      
    }
    public function Adata_pruebas($txt_prueba,$cod_servicio){
       
      return  $this->db->query("SELECT * FROM m_lab_pruebas WHERE des_prueba like '". strtoupper ($txt_prueba) . "%' AND estado = 'A' AND cod_servicios =  ('" .$cod_servicio ."') ORDER BY des_prueba ASC")->result_array();
    }
    public function Adata_pruebas_detalle($cod_serv_laboratorio){
       
      return  $this->db->query("select det.cod_pruebas, det.descripcion, det.clasificacion, labest.id_estado, labest.descripcion des_estado  FROM t_det_lab_serv_laboratorio det left JOIN m_lab_estado_seguimiento labest ON det.id_estado = labest.id_estado  AND det.clasificacion = labest.id_clasif_lab WHERE det.cod_serv_laboratorio=" .$cod_serv_laboratorio)->result_array();
    }
    public function Adata_Auditoria($cod_serv_laboratorio){
       
      return  $this->db->query("SELECT * FROM h_auditoria_laboratorio WHERE cod_serv_laboratorio = " .$cod_serv_laboratorio." ORDER BY cod_aud_lab ASC, fec_reg_audi ASC, hor_reg_audi asc ")->result_array();
    }
    public function rs_servicio($Txt_codservlaboratorio){
       
      return  $this->db->query("select * from vw_datos_servicio_laboratorio Where cod_serv_laboratorio = " .$Txt_codservlaboratorio)->result_array();
    }
    public function AData_Distrito(){
       
      return  $this->db->query("SELECT * FROM m_distritos WHERE cod_prov = 'L0' order by des_dis ASC")->result_array();
    }
    public function rs_laboratorio($Txt_CodAte){

      return  $this->db->query("select a.cod_aso,a.cod_dis,a.des_dis,a.cod_dir,a.cod_tit,a.cod_ate,a.edad_ate,a.nom_pac,a.fec_ate,a.cod_gru,a.nom_gru,a.cod_doc,dr.nom_doc,a.coaseguro,a.clasificacion_pac,c.nom_clasif,a.cod_subclasif,s.nom_subclasif,a.des_dir,a.ref_dir,a.tlf_dir,a.cel_pac from t_tmpllamadas as a left join m_clasificacion_pac as c on c.cod_clasif=a.clasificacion_pac left join m_subclasificacion_pac as s on s.cod_subclasif=a.cod_subclasif LEFT JOIN m_doctores dr On a.cod_doc = dr.cod_doc Where cod_ate = " . Trim($Txt_CodAte))->result_array();
    }
    public function rs_laboratorio2($Txt_CodTit, $Txt_Cod_Dir){

      return  $this->db->query("select p.cod_hia as cod_tit, p.nom_com as nom_pac,p.edad_pac,e.nom_emp,g.nom_gru,g.factor_lab,e.cod_gru,d.des_dir,d.tlf_casa,d.ref_dir,d.tlf_celular,p.clasificacion_pac,p.cod_subclasif,h.nom_clasif,f.nom_subclasif,d.cod_dis,a.des_dis from m_pacientesdrmas p left join m_empresas e on p.cod_emp = e.cod_emp left join m_grupos g on e.cod_gru=g.cod_gru left join m_direcciones d on p.cod_hia=d.cod_tit left join m_distritos a on d.cod_dis=a.cod_dis left join m_clasificacion_pac h on p.clasificacion_pac=h.cod_clasif left join m_subclasificacion_pac f on p.cod_subclasif=f.cod_subclasif Where p.cod_hia= '" . Trim($Txt_CodTit) . "' and d.cod_dir='" . Trim($Txt_Cod_Dir) . "'")->result_array();
    }
    public function lrs_direccion($cod_tit,$cod_dir){

      return  $this->db->query("SELECT a.cod_dir, a.des_dir, b.cod_dis, b.des_dis, a.ref_dir, tlf_celular, tlf_casa FROM m_direcciones a INNER JOIN m_distritos b ON a.cod_dis = b.cod_dis WHERE a.cod_tit = '" .$cod_tit.  "' AND cod_dir = '" . $cod_dir . "'")->result_array();
    }
    public function Adata_direccion($cod_tit){

      return  $this->db->query("SELECT a.cod_dir, a.des_dir, b.cod_dis, b.des_dis, a.ref_dir, tlf_celular, tlf_casa FROM m_direcciones a INNER JOIN m_distritos b ON a.cod_dis = b.cod_dis WHERE a.cod_tit = '" . $cod_tit . "' ORDER BY a.des_dir ASC")->result_array();
    }
    public function Adata_EKG($cond){
      $query0 = $this->db->query("SELECT ate.cod_ate, a.cod_serv_laboratorio orden_lab, clasif.nom_clasif programa, pac.num_doc_id historia, fecha_creacion,
      pac.appat_pac || ' ' || apmat_pac apellidos, pac.nom_pac nombre, 
     pac.fnac_pac fecha_nac, CASE WHEN pac.sex_pac = true THEN 'M' else 'F' END genero, ate.nom_emp programa, dist.des_dis distrito, 
     dir.des_dir direccion, ate.ref_dir referencia, pac.cel_pac tlf_movil, dir.tlf_casa, dir.tlf_oficina, pac.num_doc_id DNI, ate.nom_doc medico, ate.cod_ate 
     FROM t_tmpllamadas ate 
     INNER JOIN m_direcciones dir ON ate.cod_tit = dir.cod_tit and ate.cod_dir = dir.cod_dir 
     INNER JOIN m_distritos dist ON ate.cod_dis = dist.cod_dis 
     INNER JOIN t_cab_lab_serv_laboratorio a ON ate.cod_Ate = a.cod_ate 
     INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif INNER JOIN m_pacientesdrmas pac ON ate.cod_tit = pac.cod_hia ".$cond." limit 1");

      $field_array = $query0->list_fields();

      $query1 = $this->db->query("SELECT ate.cod_ate, a.cod_serv_laboratorio orden_lab, clasif.nom_clasif programa, pac.num_doc_id historia, fecha_creacion,
      pac.appat_pac || ' ' || apmat_pac apellidos, pac.nom_pac nombre, 
     pac.fnac_pac fecha_nac, CASE WHEN pac.sex_pac = true THEN 'M' else 'F' END genero, ate.nom_emp programa, dist.des_dis distrito, 
     dir.des_dir direccion, ate.ref_dir referencia, pac.cel_pac tlf_movil, dir.tlf_casa, dir.tlf_oficina, pac.num_doc_id DNI, ate.nom_doc medico, ate.cod_ate 
     FROM t_tmpllamadas ate 
     INNER JOIN m_direcciones dir ON ate.cod_tit = dir.cod_tit and ate.cod_dir = dir.cod_dir 
     INNER JOIN m_distritos dist ON ate.cod_dis = dist.cod_dis 
     INNER JOIN t_cab_lab_serv_laboratorio a ON ate.cod_Ate = a.cod_ate 
     INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif INNER JOIN m_pacientesdrmas pac ON ate.cod_tit = pac.cod_hia ".$cond);
      $data = $query1->result_array(); 

     array_unshift($data,  $field_array);

     return $data; 
      return  $this->db->query()->result_array();
    }
    public function Dolar(){

      return  $this->db->query("SELECT * FROM OPE_R_TIPODECAMBIO_D order by fec_cam desc limit 1")->result_array();
    }
    public function rs_grupofactor($Txt_codgru){

      return  $this->db->query("select * from m_grupos where cod_gru = '" .  Trim($Txt_codgru) . "'")->result_array();   
    }
    public function get_busquedapacientesinasoc($TxtBucNoPac){

       return  $this->db->query("select p.cod_hia, p.nom_com as nom_pac,e.nom_emp from m_pacientesdrmas p left join m_empresas e on p.cod_emp = e.cod_emp left join m_grupos g on e.cod_gru=g.cod_gru WHERE g.activo_lab = true AND nom_com  LIKE '" . Trim(strtoupper($TxtBucNoPac)) . "%' order by p.nom_com")->result_array();
     }
     public function get_busquedapacienteOptCoAte($Txt_Busq_Cod_Ate){
        
        return  $this->db->query("SELECT a.cod_ate, a.nom_pac, a.clasificacion_pac, c.nom_clasif, a.cod_subclasif, s.nom_subclasif, a.nom_doc, a.fec_ate,a.nom_emp FROM t_tmpllamadas a left join m_clasificacion_pac c ON c.cod_clasif = a.clasificacion_pac left join m_subclasificacion_pac s ON s.cod_subclasif = a.cod_subclasif WHERE cod_ate= " . Trim(strtoupper($Txt_Busq_Cod_Ate )). " and ((a.cm_estado='8' AND a.clasificacion_pac in (0, 3, 12, 24)) OR c.u_negocio = 2  OR (a.cm_estado='3' AND a.tipo_servicio = 'AMB')) and cm_estado not in ('0', 'A', 'C', 'V')  and a.canc_ate IS NULL AND a.flgvnr IS NULL ORDER BY fec_ate desc limit 1" )->result_array();
          
      }
      public function get_busquedapacienteOptPac($Txt_Busq_Pac){
        
        return  $this->db->query("SELECT a.cod_ate, a.nom_pac, a.clasificacion_pac, c.nom_clasif, a.cod_subclasif, s.nom_subclasif, a.nom_doc, a.fec_ate,a.nom_emp FROM t_tmpllamadas a left join m_clasificacion_pac c ON c.cod_clasif = a.clasificacion_pac left join m_subclasificacion_pac s ON s.cod_subclasif = a.cod_subclasif WHERE  nom_pac LIKE '" . Trim(strtoupper($Txt_Busq_Pac)) . "%' and a.cm_estado='8' and a.canc_ate IS NULL AND a.flgvnr IS NULL order by fec_ate desc limit 1" )->result_array();
          
      }
      public function get_busquedaliquidado($cod_ate){
        
        return  $this->db->query("select estado_exp, cod_gru from t_tmpexp where codate_exp='" . $cod_ate . "' and cod_gru not in ('044', '106')" )->result_array();
      }
      
      public function t_tmp_lab($cod_ate){
        
        return  $this->db->query("SELECT fec_ate-2 as fecha_ate FROM t_tmpllamadas WHERE cod_ate_previa = '" . $cod_ate . "'" )->result_array();
      }
      public function get_busquedacoddir($cod_ate2){
        
        return  $this->db->query("    SELECT cod_dir FROM t_tmpllamadas WHERE cod_ate = " . $cod_ate2 )->row_array();
      }
      public function Correlativo_Serv_Laboratorio($cod_ate2){
        
        $codigocab =  $this->db->query(" SELECT codigo FROM m_cod_servicios WHERE id='3'" )->row_array();
        if (is_null($codigocab['codigo'])){
            return "0000001";
        }else{
            return $codigocab['codigo'] +1 ;

        }
      }
      
     public function get_busquedadireccion($Txt_CodTit){
       
        return  $this->db->query("select a.cod_dir, a.des_dir, a.tlf_dir, a.ref_dir, b.des_dis from m_direcciones a inner join m_distritos b on a.cod_dis=b.cod_dis inner join m_provincias c on b.cod_prov=c.cod_prov Where A.cod_tit= '" . Trim($Txt_CodTit) . "' order by a.des_dir,a.tlf_dir,a.ref_dir,b.des_dis")->result_array();
     
      
      }
     
    public function get_direcciones($cod_doc = 0){
        
        $query = $this->db->query("select d.cod_doc  ,d.nro_direccion  ,d.direccion  ,  d.ubigeo_dist  ,d.telefono,d.referencia  ,d.telefono_ultimo   , m.des_dis from m_direcciones_doctor  d join m_distritos m on  d.ubigeo_dist = m.ubigeo_dist where cod_doc = '". trim($cod_doc)."' order by d.nro_direccion asc"     );
    
        return $query->result_array(); 
    
    }
    
    function cambiarestado($orden) {
      $this->load->model('ModuloModel');
        if (isset($orden)&&!empty(trim($orden)) ){


           /*  $ordendata = array(
                'estado' => 0 
                ); */
        
       //  $this->db->update('t_cab_lab_serv_laboratorio ',$ordendata ,array('cod_serv_laboratorio ' => $orden));
         $this->db->query("update t_cab_lab_serv_laboratorio set   estado = '0' where cod_serv_laboratorio= " . $orden);
         $this->ModuloModel->REGISTRA_AUDITORIA_LABORATORIO("0", "REGRESAR ORDEN a 0", "SOLICITADO POR EL USUARIO" ,  $orden );
         return ($this->db->affected_rows() != 1) ? false : true;
        }
     }


     public function actualizaratepaciente($codatepaciente,$cod_tit){
      $direcciones  = $this->db->query("select  cod_dir from m_direcciones  where cod_tit = '".$cod_tit."' order by cod_dir asc limit 1")->row_array() ;
      $cod_dir = $direcciones['cod_dir'];
      $pacientesdrmas  = $this->db->query("select  nom_com from m_pacientesdrmas  where cod_hia = '".$cod_tit."'")->row_array() ;
      $nom_com = $pacientesdrmas['nom_com'];
      $query = $this->db->query("update t_tmpllamadas set cod_tit = '".$cod_tit. "' ,cod_dir = '".$cod_dir ."',nom_pac ='".$nom_com."' where cod_ate = ".$codatepaciente);
      $query = $this->db->query("update t_cab_lab_serv_laboratorio set cod_tit = '".$cod_tit. "' ,cod_dir = '".$cod_dir ."',nom_pac ='".$nom_com."' where cod_ate = ".$codatepaciente);

      return ($this->db->affected_rows() >= 0) ? true : false;
     }
     public function get_pacientedrmas($paciente){

      $query2 = $this->db->query("select * from m_pacientesdrmas    where nom_com  like '%".strtoupper($paciente)."%'");
      return $query2->result_array(); 
  
    }
     function asociarorden($orden,$atencion) {
   
      if (isset($orden)&&!empty(trim($orden)) ){


          $ordendata = array(
              'cod_ate' => $atencion
              );
 
       $this->db->update('t_cab_lab_serv_laboratorio ',$ordendata ,array('cod_serv_laboratorio ' => $orden));
       return ($this->db->affected_rows() != 1) ? false : true;
      }
   }
   
   function cambiarclasif($orden,$clasif) {
   
    if (isset($orden)&&!empty(trim($orden)) ){


        $ordendata = array(
            'cod_clasif' => $clasif
            );

     $this->db->update('t_cab_lab_serv_laboratorio ',$ordendata ,array('cod_serv_laboratorio ' => $orden));
     return ($this->db->affected_rows() != 1) ? false : true;
    }
 }
     function cambiar_estado_orden($cod_serv_laboratorio,$cambio_estado) {
   
        if (isset($cod_serv_laboratorio)&&!empty(trim($cod_serv_laboratorio)) ){

         
            $ordendata = array(
                'estado' => $cambio_estado 
                );

         $this->db->update('t_cab_lab_serv_laboratorio ',$ordendata ,array('cod_serv_laboratorio ' => $cod_serv_laboratorio));
         return ($this->db->affected_rows() < 1) ? false : true;
        }
     }
     public function cargar_servnoconforme($cmbservicio,$s_tipo_seg){ 

      if ($s_tipo_seg=="REGISTRO")   {
        $s_tipo_segu = " AND tipo_seg = 'REGISTRO' ";
      }else if ($s_tipo_seg=="SNC") {
        $s_tipo_segu = " AND tipo_seg = 'SNC' ";
      }
 
    if  ($cmbservicio=="1") {
      $sqlq = "select * from m_servnoconforme where tip_serv='Inc' and activi = '1' ";
    }else if ($cmbservicio=="2") {
    $sqlq = "select * from m_servnoconforme where tip_serv='Ate' and activi = '1' ";
    }else if ($cmbservicio=="3") {
    $sqlq = "select * from m_servnoconforme where tip_serv='Ped' and activi = '1' ";
    }else if ($cmbservicio=="4") {
      $sqlq = "select * from m_servnoconforme where tip_serv='Lab' and activi = '1' ";
    }else if ($cmbservicio=="5") {
      $sqlq = "select * from m_servnoconforme where tip_serv='Amb' and activi = '1' ";
    }else if ($cmbservicio=="6") {
      $sqlq = "select * from m_servnoconforme where tip_serv='Adm' and activi = '1' ";
    }else if ($cmbservicio=="7") {
      $sqlq = "select * from m_servnoconforme where tip_serv='Af' and activi = '1' ";
    }else if ($cmbservicio=="8") {
      $sqlq = "select * from m_servnoconforme where tip_serv='PrS' and activi = '1' ";
    }else if ($cmbservicio=="9") {
      $sqlq = "select * from m_servnoconforme where tip_serv='Am' and activi = '1' ";
    }else if ($cmbservicio=="10") {
      $sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1' ";
    }else if ($cmbservicio=="11") {
      $sqlq = "select * from m_servnoconforme where tip_serv='Alm' and activi = '1' ";
    }else if ($cmbservicio=="12") {
      $sqlq = "select * from m_servnoconforme where tip_serv in ('Adv', 'Cnt') and activi = '1' ";
    }

      $query2 = $this->db->query( $sqlq . $s_tipo_segu . " order by des_snc");
      return $query2->result_array(); 
     }

     public function generarreporteregistro_snc($fecini,$fecfin,$tipo,$cmbservicio,$Check1,$DBDes_snc){
 
      if  ($tipo=="REGISTRO") {
        $s_tipo_seg = " AND tipo_seg = 'REGISTRO' ";
      }else if ($tipo == "SNC")  {
        $s_tipo_seg = " AND tipo_seg = 'SNC' ";
      }
  
  $S_SQL = "SELECT a.cod_ate, a.fec_ate, CASE WHEN a.fecdia_ate is null THEN a.fec_ate ELSE a.fecdia_ate END fecfin, CASE WHEN a.tipo_servicio = 'ATE' THEN CASE WHEN b.nom_doc is null THEN '' ELSE b.nom_doc END ELSE CASE WHEN f.nom_medico is null THEN '' ELSE f.nom_medico END END nom_doc, d.des_snc, c.obs_ser, c.fec_ser fecha_registro, c.usu_ser, a.nom_gru, CASE WHEN a.pac_vip is null THEN '' ELSE a.pac_vip END paciente_vip, f_clasificacion(a.cod_ate), a.cm_estado, CASE WHEN d.tip_serv = 'Inc' AND d.cod_snc <> '384' THEN snc_acciones(a.cod_ate) ELSE '' END accion,fec_ser,hra_ser, CASE WHEN c.estado_incidencia = 1 THEN 'incidencia' WHEN c.estado_incidencia = 2 THEN 'Derivado'  WHEN c.estado_incidencia = 3 THEN 'Medida Tomada' WHEN c.estado_incidencia = 4 then 'Cerrado'  else '' END estado_incidencia,   case when c.tipo_registro = 'A' then 'Administrativo'  when c.tipo_registro = 'S' then 'Salud' else '' end tipo_registro, case when c.tipo_envio='V' then 'Virtual' when c.tipo_envio = 'F' then 'Fisico' else ''  end tipo_envio , case when fec_finalizado is null then  '' else cast(date(fec_finalizado) as varchar)  end fecha_finalizado, e.nom_esp FROM t_tmpllamadas a INNER JOIN m_segatenciones c ON a.cod_ate = c.cod_ate INNER JOIN  m_servnoconforme d ON c.cod_snc = d.cod_snc  inner join m_especialidades e on a.cod_esp = e.cod_esp LEFT JOIN t_amb_combo_asignacion f ON a.cod_asig = f.cod_asig LEFT JOIN m_doctores b ON a.cod_doc = b.cod_doc  ";
  $tipo_serv ="";
  if ($Check1 == true) {
      if  ($cmbservicio=="1") {
          $tipo_serv = " And d.tip_serv = 'Inc' AND d.cod_snc <> '384' ";
      }else if ($cmbservicio=="2"){
          $tipo_serv = " And d.tip_serv = 'Ate' ";
      }else if ($cmbservicio=="3"){
          $tipo_serv = " And d.tip_serv = 'Ped' ";
      }else if ($cmbservicio=="4"){
          $tipo_serv = " And d.tip_serv = 'Lab' ";
      }else if ($cmbservicio=="5"){
          $tipo_serv = " And d.tip_serv = 'Amb' ";
      }else if ($cmbservicio=="6"){
          $tipo_serv = " And d.tip_serv ='Adm' ";
      }else if ($cmbservicio=="7"){
          $tipo_serv = " And d.tip_serv ='Af' ";
      }else if ($cmbservicio=="8"){
          $tipo_serv = " And d.tip_serv ='PrS' ";
      }else if ($cmbservicio=="9"){
          $tipo_serv = " And d.tip_serv ='Am' ";
      }else if ($cmbservicio=="10"){
          $tipo_serv = " And d.tip_serv ='PsS' ";
      }else if ($cmbservicio=="11"){
          $tipo_serv = " And d.tip_serv = 'Alm' ";
      }else if ($cmbservicio=="12"){
          $tipo_serv = " And d.tip_serv = 'Adv' AND d.tip_serv = 'Cnt' ";
      }
              
      $S_SQL =  $S_SQL. " WHERE a.fec_ate between '" . $fecini . "' and '" .$fecfin."' " . $tipo_serv . $s_tipo_seg . " ORDER BY a.cod_ate ASC, d.cod_snc DESC";
  }else{
    $S_SQL =  $S_SQL. " WHERE a.fec_ate between '" .$fecini. "' and '" .$fecfin ."' " .$tipo_serv . $s_tipo_seg . " AND d.cod_snc = '" . $DBDes_snc . "'  ORDER BY a.cod_ate ASC, d.cod_snc DESC";
  }
      $query0 = $this->db->query($S_SQL);

      $field_array = $query0->list_fields();

      $query1 = $this->db->query($S_SQL);
      $data = $query1->result_array(); 

     array_unshift($data,  $field_array);

     return $data; 

 } 
 public function  agregarprueba($codigo,$prueba,$unidad,$clasificacion) {

  $codigosegus_existe  = $this->db->query("select codigo_segus   from m_lab_pruebas where codigo_segus ='".trim($codigo)."'")->row_array()  ;
  if (! is_null($codigosegus_existe)){

    return false;
   
  }
  $login =  $this->session->userdata('nom_usu');
  $query = $this->db->query("insert into   m_lab_pruebas(cod_pruebas,des_prueba,estado,cod_servicios,unidad,clasificacion,codigo_segus,unidad_aseg,flg_asegurabilidad,codexamen,flg_seg_covid,flg_activo_dronline,usuario_creacion,fecha_creacion,usuario_modificacion,fecha_modificacion)  values ((select max(cod_pruebas) from m_lab_pruebas)+1,'".strtoupper( iconv('UTF-8','LATIN1', $prueba)). "','A',1,".$unidad. ",'".$clasificacion."','".$codigo."',1,false,'". str_replace(".","",$codigo)."',false,false,'".$login. "',now()::timestamp,'".$login."',now()::timestamp) ");
  $this->db->query("insert into   m_analisis values ('".strtoupper($codigo). "','".strtoupper( iconv('UTF-8','LATIN1', $prueba))."',".$unidad. ",true,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,null,0,(select max(cod_clasif_gasto) from m_analisis)+1)");
  
  return ($this->db->affected_rows() >= 0) ? true : false;

  }
  
  public function  agregarflebotomista($codigoflebotomista,$apellidosflebotomista,$telefonoflebotomista,$proveedorflebotomista) {

  $apellidos = strtoupper( iconv('UTF-8','LATIN1', $apellidosflebotomista));
  $pieces = explode(" ", $apellidos);
  $login =  $this->session->userdata('nom_usu');
  $this->db->query("insert into m_flebotomista(cod_flebotomista,nom_flebotomista,tlf_flebotomista,cod_prov_flebotomista,activo,appat_flebotomista,usuario_creacion,fecha_creacion,usuario_modificacion,fecha_modificacion) values
   ('".strtoupper($codigoflebotomista). "','". $apellidos ."','".$telefonoflebotomista. "',".($proveedorflebotomista==''?'null':"'".$proveedorflebotomista."'").",true,'".$pieces[0]."','".$login."',current_timestamp,'".$login."',current_timestamp)");
 
  return ($this->db->affected_rows() >= 0) ? true : false;

  }


  public function  agregarsnc($codigo,$tiposervicio,$descripcion,$tipo,$tiposeguimiento) {
    $query = $this->db->query("insert into   m_servnoconforme values (cast((select max(cast(cod_snc as integer)) from m_servnoconforme )+1 as varchar),'"
    .$tiposervicio . "','".$descripcion."','".$tipo. "','1','".$tiposeguimiento."',false) ");
     
    return ($this->db->affected_rows() >= 0) ? true : false;
  
    }

    public function maxcodsnc(){

      $max  = $this->db->query("select max(cast(cod_snc as integer)) as maximo from m_servnoconforme")->row_array() ;
     return $max['maximo'];
    }

    public function asignar_proveedor($data ) {
      $this->load->model('ModuloModel');
      
      $this->db->query("update t_cab_lab_serv_laboratorio set tar_ate = " . $data['Txt_coa'] . ", observacion = '" . $data['Txt_observacion'] . "', cod_dis='" . trim($data['Txt_Coddis']) . "', cod_dir='" . trim($data['Txt_Cod_Dir']) . "'  where cod_serv_laboratorio= " . $data['Txt_codservlaboratorio']);
        
      //codigo que permite actualizar listado de pruebas
      
      $this->db->query("delete from t_det_lab_serv_laboratorio where cod_serv_laboratorio='" . trim($data['Txt_codservlaboratorio']) . "' ");
         
      foreach ($data['detalle'] as $val) {
        $this->db->query("INSERT INTO t_det_lab_serv_laboratorio(cod_pruebas, cod_serv_laboratorio, descripcion,precio,clasificacion) VALUES ('" . 
        $val['codigo'] . "', '" . trim($data['Txt_codservlaboratorio']) . "', '" .  $val['nombredelaprueba']  . "', '" .  $val['precio']  . "', '" .  $val['clasif.']  ."' )");
        //var_dump("INSERT INTO t_det_lab_serv_laboratorio(cod_pruebas, cod_serv_laboratorio, descripcion,precio,clasificacion) VALUES ('" . 
       // $val['codigo'] . "', '" . trim($data['Txt_codservlaboratorio']) . "', '" .  $val['nombredelaprueba']  . "', '" .  $val['precio']  . "', '" .  $val['clasif.']  ."' )");
        //exit();
       } 
      
      if (trim($data['Txt_codservicio']) == "1" || trim($data['Txt_codservicio']) == "2" || trim($data['Txt_codservicio']) == "8" ){
           $this->db->query("update t_cab_lab_serv_laboratorio set observacion = '" . $data['Txt_observacion'] . "', cod_laboratorios=" . $data['DCbo_Proveedor'] . ", estado='2' where cod_serv_laboratorio= " .  $data['Txt_codservlaboratorio'] );
           $this->ModuloModel->REGISTRA_AUDITORIA_LABORATORIO("1", "REASIGNACION DE PROVEEDOR", "LABORATORIO: " .$data['DCbo_Proveedor'],  $data['Txt_codservlaboratorio'] );
      
     }/* else if ( trim($data['Txt_codservicio']) == "3" || trim($data['Txt_codservicio']) == "4" || trim($data['Txt_codservicio']) == "7" ){
          $this->db->query("update t_cab_lab_serv_laboratorio set observacion = '" . $data['Txt_observacion'] . "', cod_doc='" . Trim(Txt_Cod_doc.Text) . "', estado='1' where cod_serv_laboratorio=" .$data['Txt_codservlaboratorio']);
          //Call REGISTRA_AUDITORIA_LABORATORIO("1", "ASIGNACION DE PROVEEDOR", "DOCTOR o LICENCIADA: " & Trim(Txt_listado.Text), Val(Txt_codservlaboratorio.Text))}  
 */
          // $this->ModuloModel->P_TXT_LAB($data['Txt_codservlaboratorio']);
/* 
      Call Abre_Recordset(rs_correo_proveedor, "select * from m_lab_laboratorios where (email_contacto is not null or email_contacto <> '') AND flg_enviar_correo = true AND cod_laboratorios = " & DCbo_Proveedor.BoundText)
      If Not rs_correo_proveedor.EOF Then
          Call ENVIAR_MAIL("drmas.helpdesk@sanna.pe", "Abc123xyz", "LABORATORIO :" & Trim(Txt_codservlaboratorio.Text), rs_correo_proveedor!email_contacto, "Buen día estimados," & Chr(13) & "Se envia los datos del Paciente." & "Gracias.", "F:\LABORATORIO\" & Txt_codservlaboratorio.Text & ".txt")
      End If
  
      
      Call REGISTRA_AUDITORIA_LABORATORIO("2", "ENVIO DE CORREO", "PROVEEDOR: " & Trim(DCbo_Proveedor.Text) & " CON NUMERO DE ATENCION: " & Txt_CodAte.Text, Val(Txt_codservlaboratorio.Text))
  
      MsgBox "Se asignó correctamente el Proveedor"
      Frm_LAB_Grid.CmdFiltrar_Click    */
     
     }


   
  
}