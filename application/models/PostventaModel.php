<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class PostventaModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();

    }



//Funciones de la doble autenticación

public function add_test(){
        $query = $this->db->query("insert into tb_solodeprueba (nombre) values ('Bruno')");
     
        return ($this->db->affected_rows() >= 0) ? true : false;
   
    }



        









  


    

}