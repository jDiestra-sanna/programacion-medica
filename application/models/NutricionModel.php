<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class NutricionModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();
//553 2727
      //  $this->db = $this->load->database('hipocrates', TRUE);
        $this->load->library('session');
    }
   
   
    public function Adata2($query){
        
        $squery = $this->db->query($query);
    
        return $squery->result_array(); 
    
    } 
    

   
    public function FN_WS_CONSULTA_METODO_JSON($ws_metodo,$data){
      
         
        $context = stream_context_create(array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
    ));
        $url = "http://10.6.26.16/WSSITEDS/Sistema/".$ws_metodo;
       // $url = "http://app26.susalud.gob.pe:27801".$ws_metodo;

        $ch = curl_init($url);
          // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Accept: application/json','User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)'));
          curl_setopt($ch, CURLOPT_TIMEOUT , 100);
          curl_setopt($ch, CURLOPT_MAXREDIRS, 100);

        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $result = curl_exec($ch);
 
        curl_close($ch);
         
       return  json_decode($result);
    }
 
}