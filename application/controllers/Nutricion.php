<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Nutricion extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
         $this->load->library('pagination');
         $this->load->helper(array('email'));
        $this->load->library(array('ion_auth','form_validation','email','pagination'));
       $this->load->model('NutricionModel');
        $this->load->helper('date');
        $this->load->library('calendar');
        $this->load->helper('sf_helper');
         date_default_timezone_set("America/Lima");
        setlocale(LC_TIME, 'spanish');
    }
    public function index($offset = 0){


          if (!$this->ion_auth->logged_in()){
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
              redirect('login');
              
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
              
          }    else if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')) 
          {
              
                redirect('Atencioncliente/incidencia');
              
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
    
     
      public function consulta(){
       
		  		
            $this->getTemplate($this->load->view('/nutricion/consultanutricion',array('d' => "{}"),true));
 
    }
    
     
    
    public function getTemplate($view){
         $data1['idscript'] = "show_nutricion.js"; 
         $data1['permiso'] = false;   
  
        $data = array(
            'head' => $this->load->view('templates/header','',TRUE),
            'nav' => $this->load->view('templates/menu','',TRUE),
            'barra' => $this->load->view('templates/barra_sesion','',TRUE),
            'content' => $view,
            'footer' => $this->load->view('templates/footer',$data1,TRUE),
        );  
        $this->load->view('templates/dashboard',$data);
    }
 
    
  public function filtraratenciones($rowno=0) {
 
    $Data = json_decode(file_get_contents('php://input'), true);
    $Cbo_opcion = $Data['Cbo_opcion'];
    $Cb_zona =$Data['Cb_zona'];
    $fec_inicial = $Data['fec_inicial'];
    $Chk_otras = $Data['Chk_otras'];
    $Chk_internista = $Data['Chk_internista'];
    $Chk_pediatria =$Data['Chk_pediatria'];
    $Chk_finalizadas=$Data['Chk_pediatria'];
    $Cb_estado =$Data['Cb_estado'];
    $DCbo_estado_tablet =$Data['DCbo_estado_tablet'];
    $Cb_clasificacion =$Data['Cb_clasificacion'];
    $cbo_subclasificacion =$Data['cbo_subclasificacion'];
    $Cb_programacion =$Data['Cb_programacion'];
    $Cbo_RAC =$Data['Cbo_RAC'];
    $Cbo_provincia =$Data['Cbo_provincia'];
    $Cbo_sub_zona =$Data['Cbo_sub_zona'];
    $Cbo_ruteo =$Data['Cbo_ruteo'];
    $Dcbo_especialista =$Data['Dcbo_especialista'];
  


/* if Cmd_soporte.Tag = "ACTIVO" Or Usuario = "SISTEMAS"  {
 Cmd_soporte.Enabled = True
} */
 

      echo json_encode("");
    //echo  json_encode($d); 

  }

  public function logged() {
 
    if (!$this->ion_auth->logged_in())
		{
		// the user is not logging in so display the login page
			// set the flash data error message if there is one
	      
            echo json_encode("redirect");
        }else{
         echo json_encode("");
    }
  }
  
  public function FN_WS_CONSULTA_METODO_JSON($ws_metodo) {
    $Data = json_decode(file_get_contents('php://input'), true);
    $dataasegurado = [];
    $login =  $this->session->userdata('nom_usu'); 
switch ($ws_metodo) {
  case 'ConsultaAsegNom':
    
  $dataasegurado['CodTipoDocumentoAfiliado']= $Data['CodTipoDocumentoAfiliado'] ;
  $dataasegurado['NumeroDocumentoAfiliado']= $Data['NumeroDocumentoAfiliado'] ;
  $dataasegurado['RUC']= $Data['RUC'] ;
  $dataasegurado['SUNASA']= $Data['SUNASA'] ;
  $dataasegurado['IAFAS']= $Data['IAFAS'] ;
  $dataasegurado['NombresAfiliado']= $Data['NombresAfiliado'] ;
  $dataasegurado['ApellidoPaternoAfiliado']= $Data['ApellidoPaternoAfiliado'] ;
  $dataasegurado['ApellidoMaternoAfiliado']= $Data['ApellidoMaternoAfiliado'] ;
  $dataasegurado['CodEspecialidad']= $Data['CodEspecialidad'] ;
    break;
  case 'ConsultaAsegCod':
     
  $dataasegurado['SUNASA']= $Data['SUNASA'] ;
  $dataasegurado['IAFAS']= $Data['IAFAS'] ;
  $dataasegurado['RUC']= $Data['RUC'] ;
  $dataasegurado['NombresAfiliado']= $Data['NombresAfiliado'] ;
  $dataasegurado['ApellidoPaternoAfiliado']= $Data['ApellidoPaternoAfiliado'] ;
  $dataasegurado['ApellidoMaternoAfiliado']= $Data['ApellidoMaternoAfiliado'] ;
  $dataasegurado['CodigoAfiliado']= $Data['CodigoAfiliado'] ;
  $dataasegurado['CodTipoDocumentoAfiliado']= $Data['CodTipoDocumentoAfiliado'] ;

  $dataasegurado['NumeroDocumentoAfiliado']= $Data['NumeroDocumentoAfiliado'] ;
  $dataasegurado['CodProducto']= $Data['CodProducto'] ;
  $dataasegurado['DesProducto']= $Data['DesProducto'] ;
  $dataasegurado['NumeroPlan']= $Data['NumeroPlan'] ;
  $dataasegurado['CodTipoDocumentoContratante']= $Data['CodTipoDocumentoContratante'] ;
  $dataasegurado['NumeroDocumentoContratante']= $Data['NumeroDocumentoContratante'] ;
  $dataasegurado['NombreContratante']= $Data['NombreContratante'] ;
  $dataasegurado['CodParentesco']= $Data['CodParentesco'] ;
  $dataasegurado['TipoCalificadorContratante']= $Data['TipoCalificadorContratante'] ;
  $dataasegurado['CodEspecialidad']= $Data['CodEspecialidad'] ;


      break;
      case 'ConsultaNumeroAutorizacion':
        $dataasegurado['ApellidoMaternoAfiliado']= $Data['ApellidoMaternoAfiliado'] ;
        $dataasegurado['ApellidoMaternoTitular']= $Data['ApellidoMaternoTitular'] ;
        $dataasegurado['ApellidoPaternoAfiliado']= $Data['ApellidoPaternoAfiliado'] ;
        $dataasegurado['ApellidoPaternoTitular']= $Data['ApellidoPaternoTitular'] ;

        $dataasegurado['BeneficioMaximoInicial']= $Data['BeneficioMaximoInicial'] ;
        $dataasegurado['CodCalificacionServicio']= $Data['CodCalificacionServicio'] ;
        $dataasegurado['CodCopagoFijo']= $Data['CodCopagoFijo'] ;
        $dataasegurado['CodCopagoVariable']= $Data['CodCopagoVariable'] ;
        $dataasegurado['CodEspecialidad']= $Data['CodEspecialidad'] ;
        $dataasegurado['CodEstado']= $Data['CodEstado'] ;


        $dataasegurado['CodEstadoMarital']= $Data['CodEstadoMarital'] ;
        $dataasegurado['CodFechaAfiliacion']= $Data['CodFechaAfiliacion'] ;
        $dataasegurado['CodFechaFinCarencia']= $Data['CodFechaFinCarencia'] ;
        $dataasegurado['CodFechaInicioVigencia']= $Data['CodFechaInicioVigencia'] ;
        $dataasegurado['CodFechaNacimiento']= $Data['CodFechaNacimiento'] ;
        $dataasegurado['CodGenero']= $Data['CodGenero'] ;
        $dataasegurado['CodigoAfiliado']= $Data['CodigoAfiliado'] ;
        $dataasegurado['CodigoTitular']= $Data['CodigoTitular'] ;
      
        $dataasegurado['CodIndicadorRestriccion']= $Data['CodIndicadorRestriccion'] ;
        $dataasegurado['CodMoneda']= $Data['CodMoneda'] ;
        $dataasegurado['CodParentesco']= $Data['CodParentesco'] ;
        $dataasegurado['CodProducto']= $Data['CodProducto'] ;
        $dataasegurado['CodSubTipoCobertura']= $Data['CodSubTipoCobertura'] ;
        $dataasegurado['CodTipoAfiliacion']= $Data['CodTipoAfiliacion'] ;
        $dataasegurado['CodTipoCobertura']= $Data['CodTipoCobertura'] ;
        $dataasegurado['CodTipoDocumentoAfiliado']= $Data['CodTipoDocumentoAfiliado'] ;
        $dataasegurado['CodTipoDocumentoContratante']= $Data['CodTipoDocumentoContratante'] ;
        $dataasegurado['CodTipoDocumentoTitular']= $Data['CodTipoDocumentoTitular'] ;
        $dataasegurado['CodTipoPlan']= $Data['CodTipoPlan'] ;
        $dataasegurado['CondicionesEspeciales']= $Data['CondicionesEspeciales'] ;
        $dataasegurado['DesProducto']= $Data['DesProducto'] ;
        $dataasegurado['IAFAS']= $Data['IAFAS'] ;
        $dataasegurado['NombreContratante']= $Data['NombreContratante'] ;
        $dataasegurado['NombresAfiliado']= $Data['NombresAfiliado'] ;
        $dataasegurado['NombresTitular']= $Data['NombresTitular'] ;
        $dataasegurado['NumeroCertificado']= $Data['NumeroCertificado'] ;
        $dataasegurado['NumeroContrato']= $Data['NumeroContrato'] ;
        $dataasegurado['NumeroDocumentoAfiliado']= $Data['NumeroDocumentoAfiliado'] ;
        $dataasegurado['NumeroDocumentoContratante']= $Data['NumeroDocumentoContratante'] ;
        $dataasegurado['NumeroDocumentoTitular']= $Data['NumeroDocumentoTitular'] ;
        $dataasegurado['NumeroPlan']= $Data['NumeroPlan'] ;
        $dataasegurado['NumeroPoliza']= $Data['NumeroPoliza'] ;
        $dataasegurado['RUC']= $Data['RUC'] ;
        $dataasegurado['SUNASA']= $Data['SUNASA'] ; 

      
            break;
  default:
    # code...
    break;
}
    
  
 
     $resultado  = $this->NutricionModel->FN_WS_CONSULTA_METODO_JSON($ws_metodo,$dataasegurado);  
     echo json_encode($resultado);
       
  }
       
}

  