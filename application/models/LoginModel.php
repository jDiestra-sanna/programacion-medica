<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class LoginModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();

    }


public function valida_doctor_reg($pass){
		
    $med = $this->db->query("select distinct(nrodocumento) from medicos_asociados_medico where nrodocumento='". $pass. "' and activo=1");
    $result_med =  $med->row_array();	

        if(!is_null($result_med)){	
            
            redirect('horarios', 'refresh');							
            return true;
        }
                
        else{	
            $this->ion_auth->logout();	
            echo "<SCRIPT>var opciones = 'width=570,height=350,scrollbars=NO';af_med=window.open('https://200.48.199.90:8099/home/medicosregistro/','Afiliar médico', opciones);
            var opciones2 = 'width=570,height=350,scrollbars=NO';af_med2=window.open('https://10.6.26.16:8099/home/medicosregistro/','Afiliar médico 2', opciones);
            </SCRIPT>"; 	
            return true;        
        }	
        
}


public function validar_usuario($user_name, $password) {
    // Consulta en la tabla de usuarios
    $user_query = $this->db->get_where('m_usuarios', [
        'nom_usu' => $user_name,
        'pas_usu' => $password,
        'activo' => true
    ]);

    // Si encuentra un usuario en m_usuarios, retorna "usuario"
    if ($user_query->num_rows() > 0) {
        return "usuario";
    }

    // Consulta en la tabla de doctores si no se encontró en m_usuarios
    $doc_query = $this->db->get_where('m_doctores', [
        'login' => $user_name,
        'num_doc_id' => $password
    ]);

    // Si encuentra un usuario en m_doctores, retorna "doctor"
    if ($doc_query->num_rows() > 0) {
        return "doctor";
    }

    // Si no se encuentra en ninguna tabla, retorna "incorrecto"
    return "incorrecto";
}


public function actualizar_contrasena($user_name, $password, $new_password) {
    $user_query = $this->db->query("SELECT * FROM m_usuarios WHERE nom_usu = '".$user_name."' AND pas_usu = '".$password."' AND activo = true");
    $result_user = $user_query->row_array();
    
    if ($result_user) {
        $this->db->query("UPDATE m_usuarios SET pas_usu='".$new_password."' WHERE nom_usu ='".$user_name."'");
        $this->db->query("select actualizar_fecha_caducidad('".$user_name."')"); 
        return true;
    }
    return false; // Retornar false si el usuario no es encontrado
}

public function validar_caducidad_contrasena($usuario) {
    $query = $this->db->query("SELECT validar_contra_vencida('$usuario') AS estado");
    $result = $query->row_array();
    return $result['estado'] ?? 'DESBLOQUEADO'; // Retorna 'DESBLOQUEADO' si no se encuentra el usuario
}


//Funciones de la doble autenticación
public function agregar_user($user_name){
    $query = $this->db->query("select * from qr_user where user_name='". $user_name. "' and activo=true");
    $result_query =  $query->row_array();	
    if(!is_null($result_query)){
        $this->get_secret($user_name);    
    }else {
        $query = $this->db->query("select * from qr_user where user_name='". $user_name. "' and activo=false");
        $result_query =  $query->row_array();	
        if(!is_null($result_query)){
            $username['user_name']=$user_name;
            $this->load->view('qr/panel-secondfactor', $username);         
        }else{
            $this->db->query("insert into qr_user (user_name, activo) VALUES ('".$user_name."', false)");
            $username['user_name']=$user_name;
            $this->load->view('qr/panel-secondfactor', $username);     
        }

    }
   
}

public function activar_two_factor($secret, $user_name){

   $this->db->query("update qr_user set two_factor_key='".$secret."', activo = true where user_name ='".$user_name."'");

}

 //Función ya esta en bd
public function get_secret($user_name){

    $secret = $this->db->query("select two_factor_key from qr_user where user_name = '".$user_name."'");
    $result_secret['result_secret'] = $secret->row_array();
    $this->load->view('qr/login-secondfactor',  $result_secret);

    return true;

 } 

//MOMENTANEO
 public function asignar_cuenta_prov($user_name){
        $nom_prov =   $this->session->userdata('nom_usu'); 
        if($user_name=='CANGTGARAYZULO' || $user_name=='DSOLAR' || $user_name=='CABAD' || $user_name=='BRAMIREZ' || $user_name=='GGOMEZ' 
        || $user_name=='USINDICAL' || $user_name=='USINDICAL' || $user_name=='EENCISO' || $user_name=='TGARAY' || $user_name=='IHUAMAN' || $user_name=='NHUAMANI' 
        || $user_name=='EENCISO' || $user_name=='GROJAS'
        || $user_name=='PANDRADE' ) {
            $this->ion_auth->login('AMBULANCIA', 'Abc123xyz', false);
            redirect('proveedor/horarios', 'refresh');
        }
    
        else{
            //echo "<script>alert('".$nom_prov."');</script>";
            $this->session->userdata('proveedor');
            redirect('proveedor/horarios', 'refresh');
            $this->load->view('qr/panel-secondfactor', $username);     
        }
    
 }


 public function add_test($cod_ser, $des_ser, $cod_ate, $obs_ser, $nombre){
    $this->db->query("insert into m_segatenciones (cod_ate, cod_ser, des_ser, obs_ser, usu_ser, fec_ser, hra_ser) values (".$cod_ate.", '".$cod_ser."', '".$des_ser."', '".$obs_ser."', '".$nombre."', CURRENT_DATE, CURRENT_TIME)");
 }

 public function obtener_contraseña($user_name){

    // Primera consulta en la tabla m_doctores
    $query = $this->db->query("SELECT num_doc_id FROM m_doctores WHERE login='". $user_name."'");
    $result = $query->row();
    
    // Verificamos si hay resultado y si el campo 'num_doc_id' existe y no es null
    if($result && isset($result->num_doc_id)){
        return $result->num_doc_id;
    } else {
        // Segunda consulta en la tabla m_usuarios si no se encontró en m_doctores
        $query = $this->db->query("SELECT pas_usu FROM m_usuarios WHERE nom_usu='". $user_name."'");
        $result = $query->row();

        // Verificamos si hay resultado y si el campo 'pas_usu' existe y no es null
        if($result && isset($result->pas_usu)){
            return $result->pas_usu;
        } else {
            // Si no se encuentra en ninguna tabla, puedes devolver null o un valor por defecto
            return null; // O puedes lanzar una excepción o devolver un mensaje de error
        }
    }
}


 public function recupera_token($user_name){
    $this->db->query("delete from qr_user where user_name = '" .$user_name. "'");
    return ($this->db->affected_rows() >= 0) ? true : false;
 }


 public function validar_fecha_cierre(){
    $query = $this->db->query("SELECT fecha_val FROM m_parametros_bd WHERE id_parm = 44");
    $result = $query->row();
    return $result->fecha_val;
 }

 public function validar_fecha_inicio(){
    $query = $this->db->query("SELECT fecha_val FROM m_parametros_bd WHERE id_parm = 45");
    $result = $query->row();
    return $result->fecha_val;
 }


 public function validar_mfa(){
    $query = $this->db->query("SELECT activi_parm FROM m_parametros_bd WHERE id_parm = 61");
    $result = $query->row();
    if ($result->activi_parm == 0) {
        return false;
    } else {
        return true;
    }
}






    
}







        //$this->db->query("insert into tb_solodeprueba (nombre, cod_ate, cod_ser, des_ser, obs_ser, fecha_registro, hora_registro) values ('BRUNO', '565626', '1', 'ATE', 'ESTO ES UNA PRUEBA', CURRENT_DATE, CURRENT_TIME");





  


    

