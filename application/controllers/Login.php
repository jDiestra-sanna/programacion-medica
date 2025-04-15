<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use RobThree\Auth\TwoFactorAuth;

class Login extends CI_Controller {

    public function __construct(){

        parent::__construct();
        $this->load->library(['ion_auth', 'form_validation']);
		$this->load->library('GoogleAuthenticator');
		$this->load->helper(['url', 'language','sf_helper']);

		$this->form_validation->set_error_delimiters($this->config->item('error_start_delimiter', 'ion_auth'), $this->config->item('error_end_delimiter', 'ion_auth'));

		$this->lang->load('auth');
        $this->load->model('LoginModel');
		
        //$this->load->library(array('form_validation','session'));
           
    }
    public function index(){
 
		if (!$this->ion_auth->logged_in())
		{
		// the user is not logging in so display the login page
		// set the flash data error message if there is one
			$this->_render_page('login','');
			//$this->load->view('hola_mundo', '');         


		}else if ($this->ion_auth->is_admin()) // remove this elseif if you want to enable this for non-admins
		{
			// redirect them to the home page because they must be an administrator to view this			
			redirect('horarios/sinconfirmar');
		}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR')) // remove this elseif if you want to enable this for non-admins
		{	
						//BLOQUEA PÁGINA DE TURNOS  SEGÚN LA FECHA LIMITE 
						date_default_timezone_set("America/Lima");
						$fecha_actual = date("Y-m-d H:i:s");
						//$fecha_actual = '2023-09-29'; 
						$fecha_inicio=$this->LoginModel->validar_fecha_inicio();
						$fecha_cierre=$this->LoginModel->validar_fecha_cierre();

						if ($fecha_actual < $fecha_inicio || $fecha_actual > $fecha_cierre) {
							//echo "<script>alert('Código incorrecto!! Intenta otra vez.');</script>";
							echo "<script>alert('Lo sentimos, no puedes acceder en este momento. Se encuentra fuera del rango de horario permitido para el registro de horarios médicos. El horario habilitado para registro es desde " . $fecha_inicio . " hasta " . $fecha_cierre . ". Por favor, intenta nuevamente durante ese período. Gracias por tu comprensión.');</script>";
							$this->logout();
						}else{
							redirect('horarios', 'refresh');				
						}	

		}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
			redirect('coordi/horarios', 'refresh');
		}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
			redirect('proveedor/horarios', 'refresh');
		}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
			redirect('migracion/horarios', 'refresh');
		}else if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')){				
			redirect('laboratorio/examenes', 'refresh');
		} else if ($this->ion_auth->is_admin('FACTURACION - EMPLEADO')){				
			redirect('facturacion/empleados', 'refresh');
		} else if ($this->ion_auth->is_admin('DRONLINE - CIE10')){				
			redirect('dronline/cie10', 'refresh');
		}else if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')){				
			redirect('atencioncliente/incidencia', 'refresh');
		}else if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
			redirect('delivery/medicamento', 'refresh');
		}else if ($this->ion_auth->is_admin('NUTRICION - CONSULTA')){				
				redirect('nutricion/consulta', 'refresh');
		} else{		
			$this->getTemplate_error($this->load->view('errors/html/error_acceso_php',array('sinpermiso' => 'Ud. No tiene permisos para registrar horarios. Comunicarse con sistemas.' ),true));		
 		}
   
    }
    public function _render_page($view, $data = NULL, $returnhtml = FALSE)//I think this makes more sense
	{

		$viewdata = (empty($data)) ? (!isset($this->data) ? '':$this->data ): $data;

		$view_html = $this->load->view($view, $viewdata, $returnhtml);

		// This will return html on 3rd argument being true
		if ($returnhtml)
		{
			return $view_html;
		}
	}

	
	//Primero ante todo, se realiza el two factor	
	// public function two_factor(){
	// 	$this->add_user();	
	// }


	public function add_user(){
			
		$user_name['user_name']=strtoupper($this->input->post('usuario')); 
		$this->LoginModel->agregar_user(implode($user_name));
		
	}

	public function login_two_factor(){
		$code = $this->input->post("code");		
		$secret = $this->input->post("secret");
		$user_name = $this->input->post("user_name");
		// $pass =  $this->input->GET("pass");
		$checkResult = $this->googleauthenticator->verifyCode($secret, $code, 5); // 2 = 2*30sec clock tolerance	
		
		if ($checkResult) {

			if ($this->ion_auth->login(strtoupper($this->input->post('user_name')), $this->input->post('pass'), false))
			{
					$this->LoginModel->activar_two_factor($secret, $user_name);	
					$this->session->set_flashdata('message', $this->ion_auth->messages());

					if ($this->ion_auth->is_admin()) {		
						//$this->add_user();
						redirect('horarios/sinconfirmar', 'refresh');			
					}else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
						//BLOQUEA PÁGINA DE TURNOS  SEGÚN LA FECHA LIMITE 
						date_default_timezone_set("America/Lima");
						$fecha_actual = date("Y-m-d H:i:s");
						//$fecha_actual = '2023-09-29'; 

						$fecha_inicio=$this->LoginModel->validar_fecha_inicio();
						$fecha_cierre=$this->LoginModel->validar_fecha_cierre();

						if ($fecha_actual < $fecha_inicio || $fecha_actual > $fecha_cierre) {
							//echo "<script>alert('Código incorrecto!! Intenta otra vez.');</script>";
							echo "<script>alert('Lo sentimos, no se puede acceder en este momento. La fecha para el registro de su disponibilidad es desde " . $fecha_inicio . " hasta " . $fecha_cierre . ". Por favor, intente nuevamente durante ese período. Gracias por su comprensión.');</script>";													
							$this->logout();
						}else{
							redirect('horarios', 'refresh');				
						}			
					}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
						redirect('coordi/horarios', 'refresh');
					}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){
						$this->LoginModel->asignar_cuenta_prov($user_name);	
					}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
						redirect('migracion/horarios', 'refresh');
					} else if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')){				
						redirect('laboratorio/examenes', 'refresh');
					} else if ($this->ion_auth->is_admin('FACTURACION - EMPLEADO')){				
						redirect('facturacion/empleados', 'refresh');
					} else if ($this->ion_auth->is_admin('DRONLINE - CIE10')){				
						redirect('dronline/cie10', 'refresh');
					} else if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')){				
						redirect('atencioncliente/incidencia', 'refresh');
					} else if ($this->ion_auth->is_admin('ADMINISTRADOR')){				
						redirect('administrador/permisosxusuario', 'refresh');
					} else if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
						redirect('delivery/medicamento', 'refresh');
					}else if($this->ion_auth->is_admin('SM - INGRESO A ENCUESTA DOLOR ABDOMINAL')){
						redirect('postventa/encuestaabdominal', 'refresh');
					}else if ($this->ion_auth->is_admin('NUTRICION - CONSULTA')){				
						redirect('nutricion/consulta', 'refresh');				
					}else{		
						$this->getTemplate_error($this->load->view('errors/html/error_acceso_php',array('sinpermiso' => 'Ud. No tiene permisos para registrar horarios. Comunicarse con sistemas.' ),true));		
					}	
				}
				
		}
			

		else{
			 echo "<script>alert('Código incorrecto!! Intenta otra vez.');</script>";
			//$this->LoginModel->eliminar_user($user_name);			
			$this->logout();
		}
	}

	public function recupera_token(){
		$Data = json_decode(file_get_contents('php://input'), true);
        $user_name = $Data['user_name'];
		$token = utf8_converter($this->LoginModel->recupera_token($user_name));
		echo json_encode($token);
		return true;
	}

	public function redirect_activar_two_factor(){
		$this->_render_page('qr/panel-secondfactor','');
	}

	public function redirect_login_two_factor(){
		$this->_render_page('qr/login-secondfactor','');
	}


	public function validar_caducidad_contrasena() {
		$Data = json_decode(file_get_contents('php://input'), true);
		$usuario = $Data['user'];
		
		// Llama al modelo para verificar la caducidad de la contraseña
		$estado = $this->LoginModel->validar_caducidad_contrasena($usuario);
		
		// Devuelve un JSON con 'caducidad' según el valor de $estado
		echo json_encode(['caducidad' => $estado === 'BLOQUEADO']);
	}
	
	
	public function validar_usuario() {
		$Data = json_decode(file_get_contents('php://input'), true);
	
		// Eliminar espacios en blanco al inicio y al final del usuario
		$usuario = trim($Data['user']);
		$password = trim($Data['password']);
	
		// Llamada al modelo para validar usuario
		$result = $this->LoginModel->validar_usuario($usuario, $password);
	
		// Enviar respuesta en JSON basada en el resultado
		echo json_encode(['result' => $result]);
	}
	
	


	public function redireccionar() {
		$Data = json_decode(file_get_contents('php://input'), true);

		$usuario = $Data['user'];
		$password = $Data['password'];
	
		//$usuario = strtoupper($this->input->post('usuario'));
		//$contraseña = $this->LoginModel->obtener_contraseña($usuario);
		//$contraseña = str_replace(' ', '', $contraseña);
	
	    // Verificar si el login es exitoso
		if ($this->ion_auth->login($usuario, $password, false)) {
			$url = null;
	
			// Definir las redirecciones basadas en el rol del usuario
			if ($this->ion_auth->is_admin()) {
				$url = 'horarios/sinconfirmar';
			} else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR')) {
				date_default_timezone_set("America/Lima");
				$fecha_actual = date("Y-m-d H:i:s");
	
				$fecha_inicio = $this->LoginModel->validar_fecha_inicio();
				$fecha_cierre = $this->LoginModel->validar_fecha_cierre();
	
				if ($fecha_actual < $fecha_inicio || $fecha_actual > $fecha_cierre) {
					echo json_encode(['status' => 'error', 'message' => "Lo sentimos, no se puede acceder en este momento. La fecha para el registro de su disponibilidad es desde $fecha_inicio hasta $fecha_cierre. Por favor, intente nuevamente durante ese período. Gracias por su comprensión."]);
					return;
				} else {
					$url = 'horarios';
				}
			} else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')) {
				$url = 'coordi/horarios';
			} else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')) {
				$url = 'proveedor/horarios';
			} else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')) {
				$url = 'migracion/horarios';
			} else if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')) {
				$url = 'laboratorio/examenes';
			} else if ($this->ion_auth->is_admin('FACTURACION - EMPLEADO')) {
				$url = 'facturacion/empleados';
			} else if ($this->ion_auth->is_admin('DRONLINE - CIE10')) {
				$url = 'dronline/cie10';
			} else if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')) {
				$url = 'atencioncliente/incidencia';
			} else if ($this->ion_auth->is_admin('ADMINISTRADOR')) {
				$url = 'administrador/permisosxusuario';
			} else if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')) {
				$url = 'delivery/medicamento';
			} else if ($this->ion_auth->is_admin('SM - INGRESO A ENCUESTA DOLOR ABDOMINAL')) {
				$url = 'postventa/encuestaabdominal';
			} else if ($this->ion_auth->is_admin('NUTRICION - CONSULTA')) {
				$url = 'nutricion/consulta';
			} else {
				echo json_encode(['status' => 'error', 'message' => 'Ud. No tiene permisos para registrar horarios. Comunicarse con sistemas.']);
				return;
			}
	
			// Si se establece la URL, devuelve la respuesta JSON
			if ($url) {
				echo json_encode(['status' => 'success', 'url' => base_url($url)]);
			}
		} else {
			echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas.']);
		}
	}


	public function actualizar_contrasena() {
		$Data = json_decode(file_get_contents('php://input'), true);
	
		// Eliminar espacios en blanco al inicio y al final del usuario
		$usuario = trim($Data['user']);
		$password = trim($Data['password']);
		$new_password = trim($Data['newpassword']);
	
		$result = $this->LoginModel->actualizar_contrasena($usuario, $password, $new_password);
	
		// Enviar respuesta en JSON con status
		echo json_encode(['result' => $result, 'status' => $result ? 'success' : 'error']);
	}


	public function getTemplate_error($view){
	 
	   $data = array(
		   'head' => $this->load->view('templates/header','',TRUE),
		   'nav' => $this->load->view('templates/menu','',TRUE),
		   'barra' => $this->load->view('templates/barra_sesion','',TRUE),
		   'content' => $view,
		   'footer' => $this->load->view('templates/footer','',TRUE),
	   );  
	   $this->load->view('templates/dashboard',$data);
    }
    public function logout(){
 
		$this->ion_auth->logout();
		// redirect them to the login page
		redirect('login', 'refresh');
    }
    public function getTemplate($view){
        $data = array(
            'head' => $this->load->view('templates/header','',TRUE),
            'nav' => $this->load->view('templates/menu','',TRUE),
            'barra' => $this->load->view('templates/barra_sesion','',TRUE),
            'content' => $view,
            'footer' => $this->load->view('templates/footer','',TRUE),
        );
        $this->load->view('dashboard',$data);
    }

	public function admin_nuevo(){
		$this->load->view('admin_nuevo/horario','');
	}

	
	public function hola(){
		
		$Data = json_decode(file_get_contents('php://input'), true);
		$cod_ser = $Data['cod_ser'];
		$des_ser = $Data['des_ser'];
		$cod_ate = $Data['cod_ate'];
		$obs_ser = $Data['obs_ser'];

		if (isset($this->session)){
			if(is_null($this->session->userdata('nom_doc'))){
			 $nombre = $this->session->userdata('nom_usu');
			}else{
			 $nombre = $this->session->userdata('nom_doc');
			}
		}
		$prueba = $this->LoginModel->add_test($cod_ser, $des_ser, $cod_ate, $obs_ser, $nombre);   
		json_encode($prueba); 

	}
}