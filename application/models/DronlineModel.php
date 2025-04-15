<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class DronlineModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();



         $this->load->library('session');
    }
   

   
    public function get_cies10($codate){
        $query = $this->db->query("update  m_hiaclinica  set cod_tit = t_tmpllamadas.cod_tit,cod_doc = t_tmpllamadas.cod_doc,usu_hiacli = t_tmpllamadas.usuasgdr_ate ,fec_ate = t_tmpllamadas.fec_ate,hora_hiacli='00:00',cod_dep='00' from t_tmpllamadas where m_hiaclinica.cod_ate =  t_tmpllamadas.cod_ate and  m_hiaclinica.cod_ate = ".$codate);


        $query = $this->db->query("select * from m_hiaclinica  where cod_ate = ".$codate);
        

        return $query->result_array(); 
    
    }
     
    public function actualizarcie10($codate,$cod_diagnostico,$principal,$cod_diagnosticoant){
        $query = $this->db->query("update  m_hiaclinica  set  cod_dia = '".strtoupper($cod_diagnostico). "',flag_diaprinc=".$principal. " where cod_ate = ".$codate." and cod_dia='".$cod_diagnosticoant."'");

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function actualizarsiteds($codsiteds,$cod_autorizacion){
        $login = $this->session->userdata('nom_usu');
       $cod_ate = $this->db->query("select cod_ate from  h_siteds_documento_autorizacion  where codigoautorizacion = '".$cod_autorizacion."'")->row_array();
	 
	   if (is_null($cod_ate)){
		   
		   return false;
	   }

        $query = $this->db->query("update t_tmpllamadas  set  cod_aut_prestacion = '".$cod_autorizacion."' where cod_ate = ".$codsiteds);
        $query = $this->db->query("update h_siteds_documento_autorizacion set cod_ate =".$codsiteds. " where codigoautorizacion = '".$cod_autorizacion."'");
        $correl  = $this->db->query("select coalesce(max(correl),0) + 1 as correl from t_tmpllamadas_cambios_cod_autorizacion where cod_ate =".$codsiteds)->row_array()["correl"];
        $query = $this->db->query("insert into t_tmpllamadas_cambios_cod_autorizacion(cod_ate,correl,cambios,fecha,usuario_modificacion)  values  (".$codsiteds.",".$correl.",'".$cod_autorizacion."',current_timestamp,'".$login."')");

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    
    public function actualizarprov($codateprov,$distrito){
        $distritoquery =  $this->db->query("select cod_prov,des_dis from m_distritos  where cod_dis = '".$distrito."'")->row_array();
        $cod_prov =$distritoquery['cod_prov'];
        $dis_dir =$distritoquery['des_dis'];


        $tmpllamadasquery  = $this->db->query("select cod_tit,cod_dir from t_tmpllamadas  where cod_ate = ".$codateprov)->row_array() ;
        $cod_tit = $tmpllamadasquery['cod_tit'];
        $cod_dir = $tmpllamadasquery['cod_dir'];

        $query = $this->db->query("update t_tmpllamadas set cod_dis = '".$distrito."',cod_prov='".$cod_prov."' where cod_ate = ".$codateprov);
        $query = $this->db->query("update m_direcciones set cod_dis = '".$distrito."',cod_prov='".$cod_prov."' ,dis_dir = '".$dis_dir."' where cod_tit = '".$cod_tit."' and cod_dir='".$cod_dir."'");

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function actualizarmed($codatemed,$medico){
        $doctorquery =  $this->db->query("select cod_doc,nom_doc from m_doctores  where cod_doc = '".$medico."'")->row_array();
        $cod_doc =$doctorquery['cod_doc'];
        $nom_doc =utf8_encode($doctorquery['nom_doc']);

 
        $query = $this->db->query("update t_tmpllamadas set cod_doc = '".$cod_doc."',nom_doc='".$nom_doc."' where cod_ate = ".$codatemed);
 
        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function actualizaraseg($codateaseg,$aseguradora){
        $grupo  = $this->db->query("select  nom_gru from m_grupos  where trim(cod_gru) = '".trim($aseguradora)."'")->row_array() ;
        $nom_gru = $grupo['nom_gru'];
        $query = $this->db->query("update t_tmpllamadas set cod_gru = '".$aseguradora. "' ,nom_gru='".$nom_gru."' where cod_ate = ".$codateaseg);
 
        return ($this->db->affected_rows() >= 0) ? true : false;
        
    }
    public function actualizaratepaciente($codatepaciente,$cod_tit){
        $direcciones  = $this->db->query("select  cod_dir from m_direcciones  where cod_tit = '".$cod_tit."' order by cod_dir asc limit 1")->row_array() ;
        $cod_dir = $direcciones['cod_dir'];
        $pacientesdrmas  = $this->db->query("select  nom_com from m_pacientesdrmas  where cod_hia = '".$cod_tit."'")->row_array() ;
        $nom_com = $pacientesdrmas['nom_com'];
        $query = $this->db->query("update t_tmpllamadas set cod_tit = '".$cod_tit. "' ,cod_dir = '".$cod_dir ."',nom_pac ='".$nom_com."' where cod_ate = ".$codatepaciente);
        $query = $this->db->query("update t_cab_lab_serv_laboratorio set cod_tit = '".$cod_tit. "' ,cod_dir = '".$cod_dir ."',nom_pac ='".$nom_com."' where cod_ate = ".$codatepaciente);
        $query = $this->db->query("update t_tmppedidomed set cod_tit = '".$cod_tit. "' ,cod_dir = '".$cod_dir ."',nom_pac ='".$nom_com."' where cod_ate = ".$codatepaciente);

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function insertarcie10($codate,$cod_diagnostico,$principal){
        $query = $this->db->query("insert into   m_hiaclinica  (cod_ate,cod_dia,flag_diaprinc) values (".$codate. ",'".strtoupper($cod_diagnostico)."',".$principal. " ) ");
        $query = $this->db->query("update  m_hiaclinica  set cod_tit = t_tmpllamadas.cod_tit,cod_doc = t_tmpllamadas.cod_doc,usu_hiacli = t_tmpllamadas.usuasgdr_ate ,fec_ate = t_tmpllamadas.fec_ate,hora_hiacli='00:00',cod_dep='00' from t_tmpllamadas where m_hiaclinica.cod_ate =  t_tmpllamadas.cod_ate and  m_hiaclinica.cod_ate = ".$codate);

        return ($this->db->affected_rows() >= 0) ? true : false;

    
    } 
    public function insertarcie10tablet($codate,$cod_diagnostico,$principal){
        $this->tablet2 = $this->load->database('tablet', TRUE);

        $query = $this->tablet2->query("insert into   diagnostico_atencion  (cod_atencion,cod_diagnostico,principal) values (".$codate. ",'".strtoupper($cod_diagnostico)."',".$principal. " ) ");
 
        return ($this->tablet2->affected_rows() >= 0) ? true : false;

    
    }   
    public function actualizarcie10tablet($codate,$cod_diagnostico,$principal,$cod_diagnosticoant){
        $this->tablet2 = $this->load->database('tablet', TRUE);

        $query = $this->tablet2->query("update  diagnostico_atencion  set  cod_diagnostico = '".strtoupper($cod_diagnostico). "',principal=".$principal. " where cod_atencion = ".$codate." and cod_diagnostico = '".$cod_diagnosticoant."'");
        return ($this->tablet2->affected_rows() >= 0) ? true : false;
    }
    public function get_cies10_tablet($codate){

      /*   $serverName = "10.6.16.10, 1433";
        $connectionInfo = array('UID' =>'usertablet','PWD' =>'Drmas2013','Database' =>'BD_Sanna_ambulatoria');
        $conn = sqlsrv_connect($serverName,$connectionInfo);
        
if( $conn ) {
    echo "Successfuly connected.&lt;br /&gt;";
    }else{
    echo "Connection error.&lt;br /&gt;";
    die( print_r( sqlsrv_errors(), true));
    } */
       $this->tablet2 = $this->load->database('tablet', TRUE);
 
  
    //  $query2 =sqlsrv_query( $conn,  "select * from diagnostico_atencion    where cod_atencion = ".$codate);
      
      //return $query2; 
      $query2 = $this->tablet2->query( "select * from diagnostico_atencion    where cod_atencion = ".$codate);
        return $query2->result_array(); 
    }
    
    public function get_pacientedrmas($paciente){

        $query2 = $this->db->query("select * from m_pacientesdrmas    where nom_com  like '%".strtoupper($paciente)."%'");
        return $query2->result_array(); 
    
      }
      public function get_medicamentostablet($medicamento){
        $this->tablet2 = $this->load->database('tablet', TRUE);
        $query2 = $this->tablet2->query("select * from medicamento    where   descripcion  like '%".strtoupper($medicamento)."%'");
        return $query2->result_array(); 
    
      }
     
    public function agregarmedicamentodronline($cod_med){
           $this->tablet2 = $this->load->database('tablet', TRUE);
        $query2 = $this->tablet2->query("insert into  inventario_botiquin values (40,'".strtoupper($cod_med)."',0,1000000,0)");
         return ($this->db->affected_rows() >= 0) ? true : false;
    }  
    public function eliminarmedicamentodronline($cod_med){
        $this->tablet2 = $this->load->database('tablet', TRUE);
     $query2 = $this->tablet2->query("delete from inventario_botiquin where cod_botiquin = 40 and cod_medicamento='".strtoupper($cod_med)."'");
      return ($this->db->affected_rows() >= 0) ? true : false;
 }  
}