<?php  

class prueba extends CI_Model{

	  function construct()
	{
		parent::__construct();
	}

	function getAll(){
		$query = $this->db->get('adm_perfiles');
		return $query->result();

	}
}
