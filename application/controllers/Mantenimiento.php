 <?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Mantenimiento extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
         $this->load->helper(array('email'));
        $this->load->library(array('ion_auth','form_validation','email','pagination'));
        $this->load->helper(array('maestros/sede_rules','string'));
        $this->load->model('MantenimientoModel');
        $this->load->helper('date');
        $this->load->library('calendar');
        $this->load->helper('sf_helper');
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
//tablet
        public function tablet($offset = 0){
       
		 
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
               if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - TABLET') || $this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){	
                $tablets = $this->MantenimientoModel->gettablets();
			    $this->getTemplate($this->load->view('/admin/mantenimiento/tablet', array('body' => utf8_converter($tablets)),true));
               }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - MALETIN')){				
                redirect('/admin/mantenimiento/maletin', 'refresh'); 
               } else if ($this->ion_auth->is_admin()) {
                    $this->getTemplate($this->load->view('/admin/horario',array('d' => "{}"),true));
                }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
                    redirect('horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR') ){				
                  redirect('/admin/mantenimiento/maletin', 'refresh'); 
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
                    redirect('proveedor/horarios', 'refresh');
                }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
                    redirect('migracion/horarios', 'refresh');
                } else if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')){				
                     $this->getTemplate($this->load->view('/laboratorio/examenes', '',true));
				} 
            }
        }
    
 
 //maletin
 public function maletin($offset = 0){
       
		 
 
    $d = "{}"; 
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{
       if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - MALETIN') || $this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR') ){	
        $maletines = $this->MantenimientoModel->getmaletines();
        $this->getTemplate($this->load->view('/admin/mantenimiento/maletin', array('body' => utf8_converter($maletines)),true));
       }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - TABLET')){				
        redirect('/admin/mantenimiento/tablet', 'refresh'); 
       } else if ($this->ion_auth->is_admin()) {
            $this->getTemplate($this->load->view('/admin/horario',array('d' => "{}"),true));
        }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
            redirect('horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
          redirect('/admin/mantenimiento/tablet', 'refresh'); 
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
            redirect('proveedor/horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
            redirect('migracion/horarios', 'refresh');
        } else if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')){				
             $this->getTemplate($this->load->view('/laboratorio/examenes', '',true));
        } 
    }
}

    
    public function getTemplate($view){
         $data1['idscript'] = "show_mantenimiento.js"; 
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
   
    public function agregartablet( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codtablet = $Data['codtablet'];
        $descripcion = $Data['descripcion'];
        $tableti = $this->MantenimientoModel->insertartablet($codtablet,$descripcion);   
        echo  json_encode($tableti); 
      } 
      public function actualizartablet( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codtablet = $Data['codtablet'];
        $descripcion = $Data['descripcion'];
        $codtabletold = $Data['codtabletold'];
        $coddescripcionold  = $Data['coddescripcionold'];
        $tabletu = $this->MantenimientoModel->actualizartablet($codtablet,$descripcion,$codtabletold,$coddescripcionold);   
        echo  json_encode($tabletu); 
      } 

      public function eliminartablet( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
          $codtabletold = $Data['codtabletold'];

        $tabletd = $this->MantenimientoModel->eliminartablet($codtabletold);   
        echo  json_encode($tabletd); 
      } 
      public function agregarmaletin( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codmaletin = $Data['codmaletin'];
        $descripcion = $Data['descripcion'];
        $maletini = $this->MantenimientoModel->insertarmaletin($codmaletin,$descripcion);   
        echo  json_encode($maletini); 
      }
      
      public function actualizarmaletin( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codmaletin = $Data['codmaletin'];
        $descripcion = $Data['descripcion'];
        $codmaletinold = $Data['codmaletinold'];
        $descripcionold  = $Data['descripcionold'];
        $maletinu = $this->MantenimientoModel->actualizarmaletin($codmaletin,$descripcion,$codmaletinold,$descripcionold);   
        echo  json_encode($maletinu); 
      } 

      public function eliminarmaletin( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
          $codmaletinold = $Data['codmaletinold'];

        $maletind = $this->MantenimientoModel->eliminarmaletin($codmaletinold);   
        echo  json_encode($maletind); 
      } 
      public function gettablets($cod_prov_motorizado ) {
        $tablets = $this->MantenimientoModel->gettabletsxcodigo($cod_prov_motorizado);
        echo  json_encode($tablets); 
      } 
      public function getmaletines($cod_prov_motorizado ) {
        $maletines = $this->MantenimientoModel->getmaletinesxcodigo($cod_prov_motorizado);
        echo  json_encode($maletines); 
      }
  }
  



  