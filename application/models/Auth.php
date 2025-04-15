<?php
class Auth extends CI_Model{
    public function __construct(){
        // parent::__construct();
        $CI  =& get_instance();
         $CI->db =  $this->load->database('default');
        $this->load->helper('sf_helper');
        $this->sm2 = $this->load->database('hipocrates', TRUE);
        $this->load->library('session');
    }
    public function login($usr, $passhash,$pass){
        $data = $this->db->get_where('usuario',array('login' => $usr,'clave' => $passhash));
      
        if(!$data->result()){


            $datausu = $this->sm2->query("select *  from m_usuarios where nom_usu='". $usr ."' and trim(pas_usu)='".$pass."'");
            //->get_where('m_usuarios',array('nom_usu' => $usr,'pas_usu' => $pass));
     
            if($datausu->result()){
                $usuario =$datausu->row(); 
                $permiso = ($this->sm2->query("select cod_permiso from m_permisoxusuario  where nom_usu ='" .$usuario->nom_usu. "' and cod_permiso IN (137,138,139)")->row())->cod_permiso;
                if ($permiso == 139){
                $proveedor = ($this->sm2->query("select cod_prov_motorizado from m_proveedor_motorizado  where trim(nom_usu) ='" .trim($usuario->nom_usu). "'")->row())->cod_prov_motorizado;
                $usuario->proveedor =$proveedor;
                }
                $usuario->permiso =$permiso;
            

                 return    $usuario;

            }else{
                return false;

            }    

           

        }else{
        
        $datadoctor = $this->sm2->get_where('m_doctores',array('login' => $usr));
        $doctor = $datadoctor->row();
        $cod_doc = $doctor->cod_doc;
        $especialidades = $this->sm2->query("select e.cod_esp,e.nom_esp   from m_doctores   d  join m_espcxdoctor exd  on d.cod_doc =  exd.cod_doc join m_especialidades e on exd.cod_esp = e.cod_esp where d.cod_doc ='". $cod_doc ."' and d.activi = true");
        $permiso = ($this->sm2->query("select cod_permiso from m_permisoxusuario  where nom_usu = (select nom_usu from m_usuarios where doc_identidad = '" . $doctor->num_doc_id ."') and cod_permiso = 140")->row())->cod_permiso; 
         
        $doctor->permiso = $permiso;
        $doctor->especialidades = $especialidades->result();
  
    
        return $doctor;
        }
       
    }
}