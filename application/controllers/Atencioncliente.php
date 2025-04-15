<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Atencioncliente extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
         $this->load->library('pagination');
         $this->load->helper(array('email'));
        $this->load->library(array('ion_auth','form_validation','email','pagination'));
        $this->load->helper(array('maestros/sede_rules','string'));
        $this->load->model('AtencionclienteModel');
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
    
    
//laborario
        public function incidencia($rowno = 0){
       
		 
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
                        
               if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')){				
                    $this->getTemplate($this->load->view('/atencioncliente/incidencia',array('d' => "{}"),true));

               } 
            }
        }
        public function atenciones($rowno = 0){
       
		 
 
          $d = "{}"; 
          if (!$this->ion_auth->logged_in())
          {
          // the user is not logging in so display the login page
              // set the flash data error message if there is one
       
              $this->_render_page('login','');
  
          }else{
                      
              if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')){				
                  $this->getTemplate($this->load->view('/atencioncliente/atenciones',array('d' => "{}"),true));

             } 
          }
      }
      public function madvnr($rowno = 0){
       
		 
 
        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
        {
        // the user is not logging in so display the login page
            // set the flash data error message if there is one
     
            $this->_render_page('login','');

        }else{
                    
            if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')){				
            $this->getTemplate($this->load->view('/atencioncliente/madvnr',array('d' => "{}"),true));

           }  
        }
    }
    public function madatencion($rowno = 0){
       
		 
 
        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
        {
        // the user is not logging in so display the login page
            // set the flash data error message if there is one
     
            $this->_render_page('login','');

        }else{
                    
           if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')){				
            $this->getTemplate($this->load->view('/atencioncliente/madatencion',array('d' => "{}"),true));

           }  
        }
    }public function madpedido($rowno = 0){
       
		 
 
        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
        {
        // the user is not logging in so display the login page
            // set the flash data error message if there is one
     
            $this->_render_page('login','');

        }else{
                    
           if ($this->ion_auth->is_admin('ATENCION AL CLIENTE - INCIDENCIA')){				
            $this->getTemplate($this->load->view('/atencioncliente/madpedido',array('d' => "{}"),true));

           }  
        }
    }
    public function getTemplate($view){
         $data1['idscript'] = "show_atencioncliente.js";   
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

     
    public function AdataSNC() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $estado = $Data['estado'];
        $AdataSNC = $this->AtencionclienteModel->AdataSNC($estado);   
         echo  json_encode(utf8_converter($AdataSNC)); 
      }

      
     
      public function actualizarseguimiento() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $obs_ser = $Data['obs_ser'];
         $txtCodServ = $Data['txtCodServ'];
         $cod_snc = $Data['cod_snc'];
         $fec_ser = $Data['fec_ser'];
         $hra_ser = $Data['hra_ser'];
         $tipo_registro = $Data['tipo_registro'];
         $reclamo = $Data['reclamo'];
         $fecha_fin = $Data['fecha_fin'];

         $rpta = $this->AtencionclienteModel->actualizarseguimiento($obs_ser,$txtCodServ,$cod_snc,$fec_ser,$hra_ser, $tipo_registro, $reclamo,  $fecha_fin);   
         echo  json_encode($rpta); 
      }
      public function quitarseguimiento() {

        $Data = json_decode(file_get_contents('php://input'), true);
          $txtCodServ = $Data['txtCodServ'];
          $fec_ser = $Data['fec_ser'];
         $hra_ser = $Data['hra_ser'];

        $rpta = $this->AtencionclienteModel->quitarseguimiento($txtCodServ,$fec_ser,$hra_ser);   
         echo  json_encode($rpta); 
      }
    public function generarreporteatenciones( ) {
      set_time_limit( 0); 

      $Data = json_decode(file_get_contents('php://input'), true);
      $fecinicio = $Data['fecinicio'];
      $fecfinal = $Data['fecfinal'];
      $porfecha = $Data['porfecha'];
  
      $reporte =  utf8_converter($this->AtencionclienteModel->generarreporteatenciones($fecinicio,$fecfinal,$porfecha) ) ;
      //var_dump($reporte); exit();
      echo   json_encode($reporte);
     }
    public function generarreportemadvnr( ) {
        set_time_limit( 0); 
  
        $Data = json_decode(file_get_contents('php://input'), true);
        $fecinicio = $Data['fecinicio'];
        $fecfinal = $Data['fecfinal'];
  
        $reporte = utf8_converter($this->AtencionclienteModel->generarreportemadvnr($fecinicio,$fecfinal) ) ;
        echo   json_encode($reporte);
        return ;
      }
      public function generarreportemadatencion( ) {
        set_time_limit( 0); 
  
        $Data = json_decode(file_get_contents('php://input'), true);
        $fecinicio = $Data['fecinicio'];
        $fecfinal = $Data['fecfinal'];
  
        $reporte = utf8_converter($this->AtencionclienteModel->generarreportemadatencion($fecinicio,$fecfinal) ) ;
        echo   json_encode($reporte);
        return ;
      }
      public function generarreportemadpedido( ) {
        set_time_limit( 0); 
  
        $Data = json_decode(file_get_contents('php://input'), true);
        $fecinicio = $Data['fecinicio'];
        $fecfinal = $Data['fecfinal'];
  
        $reporte = utf8_converter($this->AtencionclienteModel->generarreportemadpedido($fecinicio,$fecfinal) ) ;
        echo   json_encode($reporte);
        return ;
      }
      public function generarreporte( ) {
        set_time_limit( 0); 

        $Data = json_decode(file_get_contents('php://input'), true);
        $fecinicio = $Data['fecinicio'];
        $fecfinal = $Data['fecfinal'];

        $reporte = $this->AtencionclienteModel->generarreporte($fecinicio,$fecfinal)  ;
        echo   json_encode($reporte);
        return ;
      
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
    // add style to the header
    $styleArray = array(
        'font' => array(
          'bold' => true,
        ),
        'alignment' => array(
          'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
          'vertical'   => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
        ),
        'borders' => array(
            'bottom' => array(
                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                'color' => array('rgb' => '333333'),
            ),
        ),
        'fill' => array(
          'type'       => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
          'rotation'   => 90,
          'startcolor' => array('rgb' => '0d0d0d'),
          'endColor'   => array('rgb' => 'f2f2f2'),
        ),
      );
      $spreadsheet->getActiveSheet()->getStyle('A1:Q1')->applyFromArray($styleArray);

  // auto fit column to content
  foreach(range('A', 'Q') as $columnID) {
    $spreadsheet->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
  }
// set the names of header cells
    $sheet->setCellValue('A1', 'cod_ate');
    $sheet->setCellValue('B1', 'fec_ate');
    $sheet->setCellValue('C1', 'fecfin');
    $sheet->setCellValue('D1', 'nom_doc');
    $sheet->setCellValue('E1', 'des_snc');
    $sheet->setCellValue('F1', 'des_estado');
    $sheet->setCellValue('G1', 'area');
    $sheet->setCellValue('H1', 'usu_ser');
    $sheet->setCellValue('I1', 'nom_gru');
    $sheet->setCellValue('J1', 'paciente_vip');
    $sheet->setCellValue('K1', 'f_clasificacion');
    $sheet->setCellValue('L1', 'fecha_incidencia');
    $sheet->setCellValue('M1', 'hra_ser');
    $sheet->setCellValue('N1', 'estado_incidencia');
    $sheet->setCellValue('O1', 'tipo_registro');
    $sheet->setCellValue('P1', 'tipo_envio');
    $sheet->setCellValue('Q1', 'fecha_finalizado');

   // Add some data
  $x = 2;
  
  foreach($reporte as $get){
      $sheet->setCellValue('A'.$x, $get['cod_ate']);
      $sheet->setCellValue('B'.$x, $get['fec_ate']);
      $sheet->setCellValue('C'.$x, $get['fecfin']);
      $sheet->setCellValue('D'.$x, $get['nom_doc']);
      $sheet->setCellValue('E'.$x, $get['des_snc']);
      $sheet->setCellValue('F'.$x, $get['des_estado']);
      $sheet->setCellValue('G'.$x, $get['area']);
      $sheet->setCellValue('H'.$x, $get['usu_ser']);
      $sheet->setCellValue('I'.$x, $get['nom_gru']);
      $sheet->setCellValue('J'.$x, $get['paciente_vip']);
      $sheet->setCellValue('K'.$x, $get['f_clasificacion']);
      $sheet->setCellValue('L'.$x, $get['fecha_incidencia']);
      $sheet->setCellValue('M'.$x, $get['hra_ser']);
      $sheet->setCellValue('N'.$x, $get['estado_incidencia']);
      $sheet->setCellValue('O'.$x, $get['tipo_registro']);
      $sheet->setCellValue('P'.$x, $get['tipo_envio']);
      $sheet->setCellValue('Q'.$x, $get['fecha_finalizado']);

    $x++;
  }

     
    $writer = new Xlsx($spreadsheet);

    $filename = '\\\10.6.16.15\ejecutables$\incidencias\incidencia2.xlsx'; 
     
      //   header('Content-Type:  application/vnd.ms-excel');
       // header('Content-Disposition: attachment;filename="'. $filename .'.xlsx"'); 
    
        //header('Cache-Control: max-age=0');
        //ob_end_clean();
        //$writer->save('php://output');  
        //$filename = 'name-of-the-generated-file.xlsx';
    
        $writer->save( $filename);
    
  } 
       
}

  