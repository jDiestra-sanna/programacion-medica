<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class AtencionclienteModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();



         $this->load->library('session');
    }
   

   
    public function generarreporte($fecini,$fecfin){
         $query = $this->db->query("select * from  reporte_incidencia where fecha_incidencia >= '".$fecini."' and fecha_incidencia<='".$fecfin."' ;");
        return $query->result_array(); 
    
    }
    public function generarreportemadvnr($fecini,$fecfin){
        $query0 = $this->db->query("select * from VW_MAD_VNR limit 1");

        $field_array = $query0->list_fields();

        $query1 = $this->db->query("select * from  VW_MAD_VNR where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;");
        $data = $query1->result_array(); 

       array_unshift($data,  $field_array);

       return $data; 

   } 
    public function AdataSNC($estado){
                if ($estado == "0"){
                    $sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1'  AND tipo_seg = 'SNC' ";

                }elseif ($estado == "1") {
                    $sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1'  AND tipo_seg = 'INCIDENCIA' ";

                }elseif ($estado == "2") {
                    $sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1'  AND tipo_seg = 'DERIVADO' ";

                }elseif ($estado == "5") {
                    $sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1'  AND tipo_seg = 'CERRADO' ";

                }
        return  $this->db->query($sqlq)->result_array();      
    }

    public function actualizarseguimiento($obs_ser,$txtCodServ,$cod_snc,$fec_ser,$hra_ser){
        
        $query = $this->db->query("update  m_segatenciones  set  cod_snc ='".$cod_snc."', obs_ser = '".strtoupper($obs_ser). "'  where cod_ate = ".$txtCodServ." and fec_ser='".$fec_ser."' and hra_ser='".$hra_ser."'");

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function quitarseguimiento($txtCodServ,$fec_ser,$hra_ser){
        
        $query = $this->db->query("delete from   m_segatenciones    where cod_ate = ".$txtCodServ." and fec_ser='".$fec_ser."' and hra_ser='".$hra_ser."'");

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function generarreporteatenciones($fecini,$fecfin){
        set_time_limit(0);

        ini_set('memory_limit', -1);
        if ($fecini ==$fecfin){
            $query = $this->db->query("select * from  vw_atencion_completa where fec_ate = '".$fecini."';");

        }else{
            $query = $this->db->query("select * from  vw_atencion_completa where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;");

        }
       return  ($query->result_array());
      // exit; 
   
   }
   public function generarreportemadatencion($fecini,$fecfin){
    $query = $this->db->query("select * from  VW_MAD_ATENCION where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;");
   return $query->result_array(); 
    }
    public function generarreportemadpedido($fecini,$fecfin){
        $query = $this->db->query("select * from  VW_MAD_PEDIDO where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;");
       return $query->result_array(); 
        }
}