<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class MantenimientoModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();
//553 2727
      //  $this->db = $this->load->database('hipocrates', TRUE);
        $this->load->library('session');
    }
   
   
    public function gettablets(){
        
        $query = $this->db->query("select  *  from m_tablet  ");
    
        return $query->result_array(); 
    
    } 
    public function gettabletsxcodigo($cod_prov_motorizado){
        $query = $this->db->query("select  *  from m_tablet  where cod_prov_motorizado=".$cod_prov_motorizado);
        return $query->result_array(); 
    } 
    public function getmaletinesxcodigo($cod_prov_motorizado){
        $query = $this->db->query("select  *  from m_maletin  where cod_prov_motorizado=".$cod_prov_motorizado);
        return $query->result_array(); 
    } 
    public function getmaletines(){
        
        $query = $this->db->query("select  *  from m_maletin  ");
    
        return $query->result_array(); 
    
    } 
    public function insertartablet($codtablet,$cod_prov_motorizado){
        $query = $this->db->query("insert into   m_tablet  (cod_tablet,cod_prov_motorizado) values ('".strtoupper($codtablet). "',".$cod_prov_motorizado. " ) ");
 
        return ($this->db->affected_rows() >= 0) ? true : false;

    }  
    public function actualizartablet($codtablet,$cod_prov_motorizado,$codtabletold,$coddescripcionold){
        $query = $this->db->query("update  m_tablet set cod_tablet='".strtoupper($codtablet). "',cod_prov_motorizado = ".$cod_prov_motorizado. " where cod_tablet =  '".$codtabletold."' and cod_prov_motorizado =  '".$coddescripcionold."'");
        return ($this->db->affected_rows() >= 0) ? true : false;

    
    }  
    public function eliminartablet($codtabletold){
        $query = $this->db->query("delete from  m_tablet where cod_tablet =  '".$codtabletold."'");
        return ($this->db->affected_rows() >= 0) ? true : false;
   
    } 
    public function insertarmaletin($codmaletin,$cod_prov_motorizado){
        $query = $this->db->query("insert into   m_maletin  (cod_maletin,cod_prov_motorizado) values ('".strtoupper($codmaletin). "',".$cod_prov_motorizado. " ) ");
 
        return ($this->db->affected_rows() >= 0) ? true : false;

    }  
    public function actualizarmaletin($codmaletin,$cod_prov_motorizado,$codmaletinold,$descripcionold){
        $query = $this->db->query("update  m_maletin set cod_maletin='".strtoupper($codmaletin). "',cod_prov_motorizado = ".$cod_prov_motorizado. " where cod_maletin =  '".strtoupper($codmaletinold)."' AND  cod_prov_motorizado =  '".strtoupper($descripcionold)."'");   
        return ($this->db->affected_rows() >= 0) ? true : false;

    
    }  
    public function eliminarmaletin($codmaletinold){
        $query = $this->db->query("delete from  m_maletin where cod_maletin =  '".strtoupper($codmaletinold)."'");
        return ($this->db->affected_rows() >= 0) ? true : false;

    
    }
}