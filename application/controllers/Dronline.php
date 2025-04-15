<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Dronline extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
         $this->load->library('pagination');
         $this->load->helper(array('email'));
        $this->load->library(array('ion_auth','form_validation','email','pagination'));
        $this->load->helper(array('maestros/sede_rules','string'));
        $this->load->model('DronlineModel');
        $this->load->model('ModuloModel');
        $this->load->helper('date');
        $this->load->library('calendar');
        $this->load->helper('sf_helper');
        //$this->sm2 = $this->load->database('hipocrates', TRUE);
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
        
		}   else if ($this->ion_auth->is_admin('DRONLINE - CIE10')) 
		{
        
        	redirect('Dronline/cie10');
        
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
    
    
//laborario
        public function cie10($rowno = 0){
       
		 
 
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
                   //  $this->getTemplate($this->load->view('/laboratorio/examenes',array('d' => "{}"),true));

                } else if ($this->ion_auth->is_admin('DRONLINE - CIE10')){				
                    $this->getTemplate($this->load->view('/dronline/cie10',array('d' => "{}"),true));

               } 
            }
        }
        //diagnostico
        public function diagnostico($rowno = 0){
       
		 
 
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
                 //  $this->getTemplate($this->load->view('/laboratorio/examenes',array('d' => "{}"),true));

              } else if ($this->ion_auth->is_admin('DRONLINE - DIAGNOSTICO')){				
                  $this->getTemplate($this->load->view('/dronline/diagnostico',array('d' => "{}"),true));

             } 
          }
      }
    public function getTemplate($view){
         $data1['idscript'] = "show_dronline.js";   
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
   
  public function getclasificacionserv() {
      
 
    $clasificacionserv = $this->GestionlaboratorioModel->getclasificacionserv( );   
    $d=utf8_converter($clasificacionserv);
    echo  json_encode($d); 



  }
   
 
 
      public function get_cies10( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codate = $Data['codate'];
        $cies10 = $this->DronlineModel->get_cies10($codate);   
         echo  json_encode(utf8_converter($cies10)); 
      } 
      
      public function get_cies10_tablet( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codate = $Data['codate'];
        $cies10tablet = $this->DronlineModel->get_cies10_tablet($codate);   
         echo  json_encode(utf8_converter($cies10tablet)); 
      } 
      public function actualizarcie10( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codate = $Data['codate'];
        $cod_diagnostico = $Data['cod_diagnostico'];
        $principal = $Data['principal'];
        $cod_diagnosticoant = $Data['cod_diagnosticoant'];

        $cies10 = $this->DronlineModel->actualizarcie10($codate,$cod_diagnostico,$principal,$cod_diagnosticoant);   
        echo  json_encode($cies10); 
      } 
      public function insertarcie10( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codate = $Data['codate'];
        $cod_diagnostico = $Data['cod_diagnostico'];
        $principal = $Data['principal'];
        $cies10 = $this->DronlineModel->insertarcie10($codate,$cod_diagnostico,$principal);   
        echo  json_encode($cies10); 
      } 
      
      public function insertarcie10tablet( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codate = $Data['codate'];
        $cod_diagnostico = $Data['cod_diagnostico'];
        $principal = $Data['principal'];
        $cies10 = $this->DronlineModel->insertarcie10tablet($codate,$cod_diagnostico,$principal);   
        echo  json_encode($cies10); 
      } 
      public function actualizarcie10tablet( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codate = $Data['codate'];
        $cod_diagnostico = $Data['cod_diagnostico'];
        $principal = $Data['principal'];
        $cod_diagnosticoant = $Data['cod_diagnosticoant'];
        $cies10 = $this->DronlineModel->actualizarcie10tablet($codate,$cod_diagnostico,$principal,$cod_diagnosticoant);   
        echo  json_encode($cies10); 
      } 
      public function actualizarsiteds( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codsiteds = $Data['codsiteds'];
        $codautorizacion = $Data['codautorizacion'];

         $rpta = $this->DronlineModel->actualizarsiteds($codsiteds,$codautorizacion);   
        echo  json_encode($rpta); 
      } 
      public function actualizarprov( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codateprov = $Data['codateprov'];
        $distrito = $Data['distrito'];

         $rpta = $this->DronlineModel->actualizarprov($codateprov,$distrito);   
        echo  json_encode($rpta); 
      } 
      public function actualizarmed( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codatemed = $Data['codatemed'];
        $medico = $Data['medico'];

         $rpta = $this->DronlineModel->actualizarmed($codatemed,$medico);   
        echo  json_encode($rpta); 
      } 
      public function actualizaraseg( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codateaseg = $Data['codateaseg'];
        $aseguradora = $Data['aseguradora'];

         $rpta = $this->DronlineModel->actualizaraseg($codateaseg,$aseguradora);   
        echo  json_encode($rpta); 
      } 
      public function get_medicamentostablet( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $medicamento = $Data['medicamento'];
        $medicamentos = $this->DronlineModel->get_medicamentostablet($medicamento);   
         echo  json_encode(utf8_converter($medicamentos)); 
      } 
      public function get_pacientedrmas( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $paciente = $Data['paciente'];
        $pacientes = $this->DronlineModel->get_pacientedrmas($paciente);   
         echo  json_encode(utf8_converter($pacientes)); 
      } 
      public function actualizaratepaciente( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codatepaciente = $Data['codatepaciente'];
        $cod_tit = $Data['cod_tit'];

         $rpta = $this->DronlineModel->actualizaratepaciente($codatepaciente,$cod_tit);   
        echo  json_encode($rpta); 
      } 
      public function agregarmedicamentodronline( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
         $codmed = $Data['cod_med'];

         $rpta = $this->DronlineModel->agregarmedicamentodronline($codmed);   
        echo  json_encode($rpta); 
      } 

      public function eliminarmedicamentodronline( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
         $codmed = $Data['cod_med'];

         $rpta = $this->DronlineModel->eliminarmedicamentodronline($codmed);   
        echo  json_encode($rpta); 
      } 

      public function CmdFiltrardiag_Click(){
        $Data = json_decode(file_get_contents('php://input'), true);
        $txtbusqueda = $Data['txtbusqueda'];
       
        $resultado = $this->ModuloModel->Abre_Detalle("select * from M_DIAGNOSTICOS where activo = true and des_dia like '%".  $txtbusqueda . "%'  ");  
         
       echo  json_encode(utf8_converter($resultado)); 

      }
}

  