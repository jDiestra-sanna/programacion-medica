 <?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Postventa extends CI_Controller {

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
		}else if ($this->ion_auth->is_admin('SM - INGRESO A ENCUESTA DOLOR ABDOMINAL')) // remove this elseif if you want to enable this for non-admins
		{
			// redirect them to the home page because they must be an administrator to view this
		
         $d = "{}"; 
         $this->getTemplate($this->load->view('/postventa/Frm_encuesta_dolor_abdominal',array('d' => $this->get_horarios($this->session->userdata('user_id'),date('m')+1) ),true));
        
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

 //encuesta abdominal
 public function encuestaabdominal($offset = 0){
       
		 
 
    $d = "{}"; 
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{
       if ($this->ion_auth->is_admin('SM - INGRESO A ENCUESTA DOLOR ABDOMINAL')){				
             $this->getTemplate($this->load->view('/postventa/Frm_encuesta_dolor_abdominal', '',true));
        } 
    }
}
public function reporteabdominal($offset = 0){
       
		 
 
    $d = "{}"; 
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{
       if ($this->ion_auth->is_admin('SM - INGRESO A ENCUESTA DOLOR ABDOMINAL')){				
             $this->getTemplate($this->load->view('/postventa/frm_reporte_encuesta', '',true));
        } 
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
 
  

    
    public function getTemplate($view){
         $data1['idscript'] = "show_encuestaabdominal.js"; 
         $data1['permiso'] =  false; 
  
        $data = array(
            'head' => $this->load->view('templates/header','',TRUE),
            'nav' => $this->load->view('templates/menu','',TRUE),
            'barra' => $this->load->view('templates/barra_sesion','',TRUE),
            'content' => $view,
            'footer' => $this->load->view('templates/footer',$data1,TRUE),
        );  
        $this->load->view('templates/dashboard',$data);
    }

    
  
    public function sendEmail($email,$subject,$message){

                $this->load->library('email');
                ini_set('SMTP', "smtp.gmail.com");
                ini_set('smtp_port', "587");
                ini_set("username","drmas.epidemiologia.central@sanna.pe");  
                ini_set("password",'Sanna2023');
                $config = Array(
                  'smtp_crypto' => "tls",
                   'protocol' => 'smtp',
                  'smtp_host' => 'smtp.gmail.com',
                  'smtp_port' => 587,
                  'smtp_timeout'=>'30',
                  'smtp_user' => 'drmas.epidemiologia.central@sanna.pe', 
                  'smtp_pass' => 'Sanna2023', 
                  'mailtype' => 'html', 
                  'charset' => 'UTF-8',
                  'wordwrap' => TRUE
                ); 
                $this->email->initialize($config);
                       $this->email->set_newline("\r\n");
                   
                      $this->email->from('drmas.epidemiologia.central@sanna.pe');
                      $this->email->to($email);
                      //$this->email->cc('gustavo.bermudez@sanna.pe'); 
            
                      $this->email->subject($subject);
                      $this->email->message($message);
                      //$this->email->attach('C:\PROGRAMACION_MEDICA\programacion_medica.xlsx');
                      if($this->email->send())
                     {
                      return true;
                     }
                     else
                    {
                    return show_error($this->email->print_debugger());
                    } 
                
                }

  
  }

 

  



  