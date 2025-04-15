 <?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Facturacion extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
         $this->load->helper(array('email'));
        $this->load->library(array('ion_auth','form_validation','email','pagination'));
        $this->load->helper(array('maestros/sede_rules','string'));
        $this->load->model('FacturacionModel');
        $this->load->helper('date');
        $this->load->library('calendar');
        $this->load->helper('sf_helper');
       // $this->sm2 = $this->load->database('hipocrates', TRUE);
        date_default_timezone_set("America/Lima");
        setlocale(LC_TIME, 'spanish');
    }
    public function index($offset = 0){


        if (!$this->ion_auth->logged_in())
		{
		// the user is not logging in so display the login page
			// set the flash data error message if there is one
	 
			$this->_render_page('login','');

		}else if ($this->ion_auth->is_admin()) // remove this elseif if you want to enable this for non-admins
		{
			// redirect them to the home page because they must be an administrator to view this
			redirect('horarios/sinconfirmar');
		}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR')) // remove this elseif if you want to enable this for non-admins
		{
			// redirect them to the home page because they must be an administrator to view this
		
         $d = "{}"; 
         $this->getTemplate($this->load->view('/horario',array('d' => $this->get_horarios($this->session->userdata('user_id'),date('m')+1) ),true));
        
		}else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')) 
		{
        
        	redirect('coordi/horarios');
        
		}  else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')) 
		{
        
        	redirect('proveedor/horarios');
        
		}  else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')) 
		{
        
        	redirect('migracion/horarios');
        
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
//facturacion empleados
        public function empleados($offset = 0){
       
		 
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
                        
                if ($this->ion_auth->is_admin()) {
                    $this->getTemplate($this->load->view('/admin/horario',array('d' => "{}"),true));
                }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
                    redirect('horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
                    redirect('/coordi/horario', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
                    redirect('proveedor/horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
                    redirect('migracion/horarios', 'refresh');
                } else if ($this->ion_auth->is_admin('FACTURACION - EMPLEADO')){				
                     $this->getTemplate($this->load->view('/facturacion/empleados',array('d' => "{}"),true));
                } 
            }
        }
        public function actualizaciones($offset = 0){
          
            
            $this->getTemplate($this->load->view('/facturacion/actualizaciones','',true));
        }

        public function get_CE(){

                $Data = json_decode(file_get_contents('php://input'), true);
                $serie = $Data['serie'];
                $numero = $Data['numero'];
                 $resultado[] = $this->FacturacionModel->get_CE($serie ,$numero);  
                echo  json_encode($resultado); 
       
       }
       public function get_XML(){

        $Data = json_decode(file_get_contents('php://input'), true);
        $serie = $Data['serie'];
        $numero = $Data['numero'];
         $resultado = $this->FacturacionModel->get_XML($serie ,$numero);  
        echo  json_encode($resultado); 

}
        public function consultadocumento($offset = 0){
          
            
            $this->getTemplate($this->load->view('/consultadocumento','',true));
        }
        public function fecharecepcion($offset = 0){
            $Data = json_decode(file_get_contents('php://input'), true);
            $facturas = $Data['facturas'];
            $login =  $this->session->userdata('nom_usu'); 
 
            $afectados = $this->FacturacionModel->fecharecepcion( $facturas,$login);
            echo json_encode($afectados);       
        }
        public function cargamasiva($offset = 0){
       
		 
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
                        
                if ($this->ion_auth->is_admin()) {
                    $this->getTemplate($this->load->view('/admin/horario',array('d' => "{}"),true));
                }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
                    redirect('horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
                    redirect('/coordi/horario', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
                    redirect('proveedor/horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
                    redirect('migracion/horarios', 'refresh');
                } else if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')){				
                     $this->getTemplate($this->load->view('/laboratorio/examenes',array('d' => "{}"),true));
				}else if ($this->ion_auth->is_admin('FACTURACION - CARGA MASIVA')){				
                    $this->getTemplate($this->load->view('/facturacion/cargamasiva',array('d' => ""),true));
               }  
            }
        }
    public function getTemplate($view){
         $data1['idscript'] = "show_facturacion.js";   
         $data1['permiso'] =  true; 

        $data = array(
            'head' => $this->load->view('templates/header','',TRUE),
            'nav' => $this->load->view('templates/menu','',TRUE),
            'barra' => $this->load->view('templates/barra_sesion','',TRUE),
            'content' => $view,
            'footer' => $this->load->view('templates/footer',$data1,TRUE),
        );  
        $this->load->view('templates/dashboard',$data);
    }
    public function empleadonuevo($offset = 0){
       
		 
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
                        
                if ($this->ion_auth->is_admin()) {
                    $this->getTemplate($this->load->view('/admin/horario',array('d' => "{}"),true));
                }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
                    redirect('horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
                    redirect('/coordi/horario', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
                    redirect('proveedor/horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
                    redirect('migracion/horarios', 'refresh');
                }  else if ($this->ion_auth->is_admin('FACTURACION - EMPLEADO')){				
                     $this->getTemplate($this->load->view('/facturacion/empleadonuevo',array('d' => "{}"),true));
                } 
            }
    }
  
    public function registrarempleado($offset = 0){
		
		  $Data = json_decode(file_get_contents('php://input'), true);
        $idempleado = $Data['idempleado'];
        $nombre = $Data['nombre'];
        $dni = $Data['dni'];
        $correo = $Data['correo'];
        $direccion = $Data['direccion'];
        $urbanizacion = $Data['urbanizacion'];
        $distrito = $Data['distrito'];
        $tipodoc= $Data['tipodoc'];
        $empleado = array(
            'id_empleado' => $idempleado,
            'nombre' =>  $nombre ,
            'id_doc_id' =>  $tipodoc,
            'numero_doc_id' =>  $dni,
            'correo_electronico'  =>  $correo, 
            'correo_con_copia'  =>  '',
            'ubigeo'  =>  $distrito,
			'direccion'  =>  $direccion,
		    'urbanizacion'  =>  $urbanizacion,
			'activo'  =>  true

            );
            $afectados = $this->FacturacionModel->registrarempleado( $empleado);
        echo json_encode($afectados);
        
		
		
    }
    public function importdata()
	{  
        
		//$this->load->view('import_data');
		if(isset($_POST["cargarmasiva"]))
		{
            $file = $_FILES['file']['tmp_name'];
            
            $handle = fopen($file, "r");
            
            $c = 0;//
            $this->FacturacionModel->deleterecords();
			while(($filesop = fgets($handle, 1000 )) !== false)
			{
                $filesop1 = str_getcsv($filesop, ",");

                $serie	= $filesop1[0];
                $correlativo	= $filesop1[1];
                $id_project	= $filesop1[2];
                $tipo_project	= $filesop1[3];
                $fecha_emision	= $filesop1[4];
                $moneda	= $filesop1[5];
                $tipo_cambio	= $filesop1[6];
                $cod_cliente	= trim($filesop1[7]);
                $afecta_igv	= $filesop1[8];
                $centro_costo	= $filesop1[9];
                $periodo= strtoupper($filesop1[10]);
                $descripcion_item= utf8_encode($filesop1[11]);
                $multiglosa	= $filesop1[12];
                $tarifa_item	= $filesop1[13];
                $copago_fijo	= $filesop1[14];
                $copago_variable = $filesop1[15];
               // $activo = $filesop[16];
    
				if($c<>0){					//SKIP THE FIRST ROW
                    $this->FacturacionModel->saverecords($serie,$correlativo,$id_project,$tipo_project,$fecha_emision,$moneda,$tipo_cambio,$cod_cliente,$afecta_igv,$centro_costo,$periodo,$descripcion_item,$multiglosa,$tarifa_item,$copago_fijo,$copago_variable);
				}
				$c = $c + 1;
			}
			$msg= "Carga correcta !";
            $this->getTemplate($this->load->view('/facturacion/cargamasiva',array('d' => $msg),true));
		}
	}
  }
  



  