 <?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Programacion extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
         $this->load->helper(array('email'));

        $this->load->library(array('ion_auth','form_validation','email','pagination'));
        $this->load->helper(array('maestros/sede_rules','string'));
        $this->load->model('ProgramacionModel');
        $this->load->helper('date');
        $this->load->library('calendar');
        $this->load->helper('sf_helper');
       // $this->db = $this->load->database('hipocrates', TRUE);
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
         $this->getTemplate($this->load->view('/horario',array('d' => $this->get_horarios($this->session->userdata('user_id'),date('m')==12?1:date('m')+1) ),true));
        
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
    public function sinconfirmar($offset = 0){
       
		 
 
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
        } 
        }
   }
    public function correo($offset = 0){
       
		 
 
        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
		{
		// the user is not logging in so display the login page
			// set the flash data error message if there is one
	 
			$this->_render_page('login','');

        }else{
                    
        if ($this->ion_auth->is_admin()) {
            $body = $this->ProgramacionModel->getbody();
           
            $this->getTemplate($this->load->view('/admin/correo',  $body,true));
        }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
            redirect('horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
            redirect('/coordi/horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
            redirect('proveedor/horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
            redirect('migracion/horarios', 'refresh');
        } 
        }
   }
   public function configurarlistaemails($offset = 0){
       
		 
 
    $d = "{}"; 
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{
                
   /*  if ($this->ion_auth->is_admin()) {
        $emails = $this->ProgramacionModel->get_emails_medicos();
       
        $this->getTemplate($this->load->view('/admin/listaemails', array('body' => utf8_converter($emails)),true));
    }else */ if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
        redirect('horarios', 'refresh');
     }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){		
        $emails = $this->ProgramacionModel->get_emails_medicos();		
        $this->getTemplate($this->load->view('/admin/listaemails', array('body' => utf8_converter($emails)),true));
     }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
        redirect('proveedor/horarios', 'refresh');
    }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
        redirect('migracion/horarios', 'refresh');
    } 
    }
}
   public function confirmarproveedor($offset = 0){
 
    $d = "{}";
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{ 
        
        if ($this->ion_auth->is_admin()) {
            redirect('horarios/sinconfirmar', 'refresh');
        }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
            redirect('horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
            redirect('/coordi/horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
            $this->getTemplate($this->load->view('/proveedor/horario',array('d' => "{}"),true));
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
            redirect('migracion/horarios', 'refresh');
        } 
    }
}
   public function confirmar($offset = 0){
 
    $d = "{}"; 
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{

        if ($this->ion_auth->is_admin()) {
            redirect('horarios/sinconfirmar', 'refresh');
        }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
            redirect('horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
            $this->getTemplate($this->load->view('/coordi/horario',array('d' => "{}"),true));
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
            redirect('proveedor/horarios', 'refresh');
        }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
            redirect('migracion/horarios', 'refresh');
        } 
    }
    }
    //busqueda para proveedores
    public function busquedahorarios($offset = 0){
 
        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
        {
        // the user is not logging in so display the login page
            // set the flash data error message if there is one
     
            $this->_render_page('login','');
    
        }else{
    
            if ($this->ion_auth->is_admin()) {
                redirect('horarios/sinconfirmar', 'refresh');
            }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
                redirect('horarios', 'refresh');
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
                $this->getTemplate($this->load->view('/coordi/horario',array('d' => "{}"),true));
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){		
                $this->getTemplate($this->load->view('proveedor/busquedahorarios',array('d' => "{}"),true));
		    }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
                redirect('migracion/horarios', 'refresh');
            } 
        }
        }
    public function migrar($offset = 0){
 
        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
        {
        // the user is not logging in so display the login page
            // set the flash data error message if there is one
     
            $this->_render_page('login','');
    
        }else{
            if ($this->ion_auth->is_admin()) {
                redirect('horarios/sinconfirmar', 'refresh');
            }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
                redirect('horarios', 'refresh');
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR')){				
                redirect('/coordi/horario', 'refresh');
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
                redirect('proveedor/horarios', 'refresh');
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
                $this->getTemplate($this->load->view('/migracion/horario',array('d' => "{}"),true));
            } 
         }
    }
//laborario
        public function laboratorio($offset = 0){
       
		 
 
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

                } 
            }
        }
    public function getTemplate($view){
         $data1['idscript'] = "show_programacion.js";   
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

    public function get_horarios($cod_doc,$mes)
    {
       $dias = array();
       $des_doc = "";
       $nom_clasif="";
       $cod_esp="";
       $arrayDatos =   array();   
       $horarios = $this->ProgramacionModel->gethorarios($cod_doc,$mes);
       $horariosestados = $this->ProgramacionModel->gethorariosestados($cod_doc,$mes);
      foreach ($horariosestados as $item => $value)
       {
        $horasseparadas = explode(",", $value['horas']); 
        
        $horasestado[] = array_map(function ($a1 ,$a2) { return $a2 . $a1  ; },$horasseparadas ,array_fill ( 0, count($horasseparadas) , $value['estado_prog'])   )  ;
        $dias[] = $value['dia'];
       // $estados[] = $value['estado_prog'];
      }
      $tempval = "";
        $temp = array();
      foreach ($dias as $item => $value)
      {
        if ( $tempval != $value ){
            $temp  = array();
        }
            $tempval = $value; 
            
            $temp = array_merge($temp,$horasestado[$item] );
            $final[$value]= $temp;
 
      }
      
      foreach ($horarios as $item => $value)
      {
       
          $dia[] = $value['dia'];
         // $horini_asig_doc[] = $value['horini_asig_doc'];

         // $estado_prog[] = $value['estado_prog'];
         // $horas[] =  array_map('intval',explode(",", $value['horas']));
          //$horas = array_map(function ($a1, $a2) { return $a1 . $a2; }, explode(",", $value['horas']), $value['horas']);

          $des_doc = trim($value['des_doc']);
          $nom_clasif = trim($value['nom_clasif'])=="AGUDO"?"1":"2";

          $cod_esp = trim($value['cod_esp']);

      }
      if (count($horarios) > 0){
            $diasinicio = array(
                'dia' => $dia
            );
            $this->session->set_userdata($diasinicio);
            $arrayDatos = $final;

        }   
        $variable = array( 'variable1' => json_encode($arrayDatos), 
        'variable2' => json_encode($des_doc),
        'variable3' => ($nom_clasif),
        'variable4' => ($cod_esp) );
  
        return   ($variable); 
    }

    public function get_horarios_json($cod_doc,$mes)
    {
        $cod_doc = urldecode($cod_doc);
        $mes = urldecode($mes) ;

       
        $arrayDatos =   array();   
       $horarios = $this->ProgramacionModel->gethorarios($cod_doc,$mes);
     
      foreach ($horarios as $item => $value)
      {
       
          $dia[] = $value['dia'];
          $horas[] =  array_map('intval',explode(",", $value['horas']));
          //$horas[] =    $value['horas'];
         
      }
    
      if (count($horarios) > 0){
      $diasinicio = array(
        'dia' => $dia
       );
   
      $this->session->set_userdata($diasinicio);
     
 
  
   
        $arrayDatos = array_combine($dia, $horasestado);
      
      }   
   
        if  (count($arrayDatos)==0){
            echo    json_encode("{}"); 
        }else{

            echo  json_encode($arrayDatos); 
        }

      

        
    }


    public function agendarHorario() {
     //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
       //add the header here
     //   header('Content-Type: application/json');
     //   echo json_encode( $arr );
 
     $Data = json_decode(file_get_contents('php://input'), true);
     $calendario = $Data['calendario'];
     $especialidades = $Data['especialidad'];
     $descripcion = $Data['descripcion'];
     $mes_anio = $Data['mes_anio'];
     $anio =  substr($mes_anio,0,4);
     $mes = substr($mes_anio,5,2);
 
     if ($Data['nom_clasif'] == '1') {

      $nom_clasif = "AGUDO";
     }elseif ($Data['nom_clasif'] == '2') {
          $nom_clasif = "CRONICO";
     }
 
      $cod_doc =  $this->session->userdata('user_id');
      $cod_asig = $this->ProgramacionModel->getlastid();
      $nom_doc =  $this->session->userdata('des_usu'); 
      $login =  $this->session->userdata('nom_usu'); 
      //return "200";

    $cod_esp = $this->input->post('nom_clasif');
    
    foreach($calendario as $dia => $val1) {
        $j = 0;
      //$horas = "[" . implode(",", $val1) . "]" ;
      $horas =  implode(",", $val1)  ;
      for ($i=1;$i<=48;$i++){
       
            if( in_array($i,$val1) && $i!=37 ){
                if (!isset( $turnos )) {
                    $turnos = array();
                    array_push($turnos,$i);

                }else{
                    array_push($turnos,$i);
                }
                //$mapturnos[$j] = $turnos ; 

          
            }else{
                if (isset( $turnos )) {
                    
                        $mapturnos[$j] = $turnos ;
                        $j++; 
                        unset($turnos);
                        if (in_array($i,$val1) && $i==37){
                            $turnos = array();
                            array_push($turnos,$i);
                        }
                }else{
                    if (in_array($i,$val1) && $i==37){
                        $turnos = array();
                        array_push($turnos,$i);
                    }

                }
           
            }
			           if ( $i==48){
                if (isset( $turnos )) {
                    
                    $mapturnos[$j] = $turnos ;
                    
                    unset($turnos);
                  
                }
            }
         
      }

      foreach ($mapturnos as $turnosfil) {
        
          $dia_asignacion = $anio."-".$mes."-".$dia; 
          $val2 = $turnosfil;
          $turnosporasignacion = $turnosfil;
          $hora_inicio = array_splice($turnosfil,0,1);
          $hora_inicio1 = $this->convertirhora($hora_inicio[0]);
          $hora_inicio1 = substr($hora_inicio1,0,8);
          $hora_inicio_dig = substr($hora_inicio1,0,2);
          $hora_moto_inicio = date('Y-m-d H:i:s',strtotime('-30 min',strtotime($hora_inicio1)));
 
          $hora_fin = array_splice($val2,-1);

          $hora_fin1 = $this->convertirhora($hora_fin[0]);
          $hora_fin1 = substr($hora_fin1,-8);
          $hora_fin_dig = substr($hora_fin1,0,2);
          $hora_moto_fin = date('Y-m-d H:i:s',strtotime('+30 min',strtotime($hora_fin1)));
          $turno  =  obtenerturno((int) $hora_inicio_dig,(int) $hora_fin_dig );
            

          $prog_doctor[] = array(
                    'cod_asig'  =>  $cod_asig  ,
                    'cod_doc' =>  $cod_doc ,
                    'nom_doc' =>  $nom_doc ,
                    'horini_asig_doc' =>  $hora_inicio1 ,
                    'horfin_asig_doc' =>  $hora_fin1 ,
                    'des_doc' =>  $descripcion,
                    'fecini_asig' =>  $dia_asignacion ,
                    'turno'  =>  $turno,
                    'cod_esp'  =>  $especialidades,
                    'zona'  =>  'ZONA 01',
                    'cod_dis'  =>  null,
                    'tipo_mot' =>  null ,
                    'cod_mot'  =>  null,
                    'nom_mot'  =>  null,
                    'horini_asig_mot' =>  $hora_moto_inicio ,
                    'horfin_asig_mot'  =>  $hora_moto_fin,
                    'estado_prog'  =>  ($especialidades=='026'||$especialidades=='012'?1:0),
                    'asig_activo'  =>  true,
                    'nom_usu' =>  $login ,
                    'cod_botiquin'  =>  0,
                    'nom_clasif'  =>  $nom_clasif,  
                    'cod_prov_motorizado'  =>  '99',
                    'horas' => implode(",", $turnosporasignacion) ,
                    'dia' =>$dia,
                    'mes' => $mes
                    );
                    $auditoria[] = array(
                        'cod_asig'  =>   $cod_asig  ,
                        'nom_usu' =>  $login ,
                        'id_posicion' =>  1 ,
                        'tipo_registro' =>  "CREACION" ,
                        'cambios_realizados' => "Cod: ".$cod_asig." | Clasificacion: ".$nom_clasif." | Doc: " . $nom_doc." | Ini Doc: ". $hora_inicio1 . " | Fin Doc: ".$hora_fin1." | Indicacion: " . $descripcion . " | Fecha asig: " . $dia_asignacion . " | Turno: " . $turno . " | Zona: ZONA 01" . " | Conductor: " . "null" . " | Ini Cond: " . $hora_moto_inicio . " | Fin Cond: " . $hora_moto_fin ,
                        'fec_reg' =>  date("Y-m-d"),
                        'hora_reg' =>  date("H:i:s"),
                        'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                        'estado_reg'  => 0
         
                        );
          $cod_asig =   $cod_asig + 1 ;
      }
      unset($mapturnos);
    }
   
   
     $this->ProgramacionModel->save( $prog_doctor,$auditoria);



    return "200";
    }
  

    public function updateHorario() {
 
        $prog_doctor=array();
        $Data = json_decode(file_get_contents('php://input'), true);
        $calendario = $Data['calendario'];
        $especialidades = $Data['especialidad'];
        $descripcion = $Data['descripcion'];
        $nom_clasif = $Data['nom_clasif']; 
        $mes_anio = $Data['mes_anio']; 

        $anio =  substr($mes_anio,0,4);
        $mes = substr($mes_anio,5,2);
       
        if ($Data['nom_clasif'] == '1') {
             $nom_clasif = "AGUDO";
        }elseif ($Data['nom_clasif'] == '2') {
             $nom_clasif = "CRONICO";
        }    
        $cod_doc =  $this->session->userdata('user_id');
        $cod_asig = $this->ProgramacionModel->getlastid();
        $nom_doc =  $this->session->userdata('des_usu'); 
        $login =  $this->session->userdata('nom_usu'); 

        $estado = $this->ProgramacionModel->consultarestado( $cod_doc,date('m')==12?1:date('m')+1);
       if($estado == 2 ){
            echo "Los horarios estan confirmados.Por favor comunicarse con la coordinadora para modificar el horario.";
            return;
       }else if($estado ==  1 and  !($especialidades=='026'||$especialidades=='012')){     /*   }else if($estado ==  1){ */
            echo "Por favor comunicarse con la coordinadora para modificar el horario.";
            return;
       }
          
        $cod_esp = $this->input->post('nom_clasif');
        $codigos_actualizados = array();
   
       foreach($calendario as $dia => $val1) {
            $j = 0;
            //$horas = "[" . implode(",", $val1) . "]" ;
            $horas =  implode(",", $val1)  ;
            for ($i=1;$i<=48;$i++){
            
                if( in_array($i,$val1) && $i!=37 ){
                    if (!isset( $turnos )) {
                        $turnos = array();
                        array_push($turnos,$i);
    
                    }else{
                        array_push($turnos,$i);
                    }
                    //$mapturnos[$j] = $turnos ; 
    
                
                }else{
                    if (isset( $turnos )) {
                        
                            $mapturnos[$j] = $turnos ;
                            $j++; 
                            unset($turnos);
                            if (in_array($i,$val1) && $i==37){
                                $turnos = array();
                                array_push($turnos,$i);
                            }
                    }else{
                        if (in_array($i,$val1) && $i==37){
                            $turnos = array();
                            array_push($turnos,$i);
                        }
    
                    }
                
                }
				           if ( $i==48){
                if (isset( $turnos )) {
                    
                    $mapturnos[$j] = $turnos ;
                    
                    unset($turnos);
                  
                }
            }
            
            }
            foreach ($mapturnos as $turnosfil) {
                $dia_asignacion = $anio."-".$mes."-".$dia; 
                $val2 = $turnosfil;
                $turnosporasignacion = $turnosfil;
                $hora_inicio = array_splice($turnosfil,0,1);
                $hora_inicio1 = $this->convertirhora($hora_inicio[0]);
                $hora_inicio1 = substr($hora_inicio1,0,8);
                $hora_inicio_dig = substr($hora_inicio1,0,2);
                $hora_moto_inicio = date('Y-m-d H:i:s',strtotime('-30 min',strtotime($hora_inicio1)));
                //var_dump($hora_moto_inicio);
    
                $hora_fin = array_splice($val2,-1);
    
                $hora_fin1 = $this->convertirhora($hora_fin[0]);
                $hora_fin1 = substr($hora_fin1,-8);
                $hora_fin_dig = substr($hora_fin1,0,2);
                $hora_moto_fin = date('Y-m-d H:i:s',strtotime('+30 min',strtotime($hora_fin1)));
           
                $turno  =  obtenerturno((int) $hora_inicio_dig,(int) $hora_fin_dig );
                $cod_asig_actualiza = $this->ProgramacionModel->existehorario( $cod_doc,date('m')==12?1:date('m')+1,$dia,$turno);

                if (is_null($cod_asig_actualiza)){   

                        $prog_doctor[] = array(
                            'cod_asig'  =>  $cod_asig  ,
                            'cod_doc' =>  $cod_doc ,
                            'nom_doc' =>  $nom_doc ,
                            'horini_asig_doc' =>  $hora_inicio1 ,
                            'horfin_asig_doc' =>  $hora_fin1 ,
                            'des_doc' =>  $descripcion,
                            'fecini_asig' =>  $dia_asignacion ,
                            'turno'  =>  $turno,
                            'cod_esp'  =>  $especialidades,
                            'zona'  =>  'ZONA 01',
                            'cod_dis'  =>  null,
                            'tipo_mot' =>  null ,
                            'cod_mot'  =>  null,
                            'nom_mot'  =>  null,
                            'horini_asig_mot' =>  $hora_moto_inicio ,
                            'horfin_asig_mot'  =>  $hora_moto_fin,
                            'estado_prog'  =>  ($especialidades=='026'||$especialidades=='012'?1:0),
                            'asig_activo'  =>  true,
                            'nom_usu' =>  $login ,
                            'nom_clasif'  =>  $nom_clasif,  
                            'cod_prov_motorizado'  =>  '99',
                            'horas' => implode(",", $turnosporasignacion),
                            'dia' =>$dia,
                            'mes' => $mes
                                );
                        $idposicion = $this->ProgramacionModel->getidpos_auditoria( $cod_asig);

                        $auditoria[] = array(
                            'cod_asig'  =>   $cod_asig  ,
                            'nom_usu' =>  $login ,
                            'id_posicion' =>  $idposicion ,
                            'tipo_registro' =>  "ACTUALIZACION" ,
                            'cambios_realizados' => "Cod: ".$cod_asig." | Clasificacion: ".$nom_clasif." | Doc: " . $nom_doc." | Ini Doc: ". $hora_inicio1 . " | Fin Doc: ".$hora_fin1." | Indicacion: " . $descripcion . " | Fecha asig: " . $dia_asignacion . " | Turno: " . $turno . " | Zona: ZONA 01" . " | Conductor: " . "null" . " | Ini Cond: " . $hora_moto_inicio . " | Fin Cond: " . $hora_moto_fin ,
                            'fec_reg' =>  date("Y-m-d"),
                            'hora_reg' =>  date("H:i:s"),
                            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                            'estado_reg'  => 0
                            );
                            $cod_asig =   $cod_asig + 1 ;

                }else{
                    $codigos_actualizados []  = intval($cod_asig_actualiza);
                       
   

                        $prog_doctor_actualiza[] = array(
                                'cod_asig' => $cod_asig_actualiza,
                                'horini_asig_doc' =>  $hora_inicio1 ,
                                'horfin_asig_doc' =>  $hora_fin1 ,
                                'des_doc' =>  $descripcion,
                                'nom_clasif'  =>  $nom_clasif,  

                                'turno'  =>  $turno,
    
                                'nom_usu' =>  $login ,
                                'mes' => $mes,
                                 'horas' => implode(",", $turnosporasignacion)
    
                                );
                        $idposicion = $this->ProgramacionModel->getidpos_auditoria( $cod_asig_actualiza);

                        $auditoria[] = array(
                            'cod_asig'  =>   $cod_asig_actualiza  ,
                            'nom_usu' =>  $login ,
                            'id_posicion' =>  $idposicion ,
                            'tipo_registro' =>  "ACTUALIZACION" ,
                            'cambios_realizados' => "Cod: ".$cod_asig_actualiza." | Clasificacion: ".$nom_clasif." | Doc: " . $nom_doc." | Ini Doc: ". $hora_inicio1 . " | Fin Doc: ".$hora_fin1." | Indicacion: " . $descripcion . " | Fecha asig: " . $dia_asignacion . " | Turno: " . $turno . " | Zona: ZONA 01" . " | Conductor: " . "null" . " | Ini Cond: " . $hora_moto_inicio . " | Fin Cond: " . $hora_moto_fin ,
                            'fec_reg' =>  date("Y-m-d"),
                            'hora_reg' =>  date("H:i:s"),
                            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                            'estado_reg'  => 0
                            );

                }           
            }
            unset($mapturnos);
       } 
       
       $res = $this->ProgramacionModel->update( $prog_doctor,$prog_doctor_actualiza,$codigos_actualizados,$auditoria);
   
   
       if ($res == true){
        echo  json_encode("Se actualizo el horario");
       }else{
        echo  json_encode("Sucedio un error");
       }
       }


       public function convertirnumeros($a,$b){
        $hora="";
        $at = strtotime($a);
        $bt = strtotime($b);
            if($a=='06:00'){
            $i = 1;
            }elseif($a=='06:30'){
                $i = 2;
            } elseif($a=='07:00'){
                $i = 3;
            }elseif($a=='07:30'){
                $i = 4;
            }elseif($a=='08:00'){
                $i = 5;
            }elseif($a=='08:30'){
                $i = 6;
            }elseif($a=='09:00'){
                $i = 7;
            }elseif($a=='09:30'){
                $i = 8;
            }elseif($a=='10:00'){
                $i = 9;
            }elseif($a=='10:30'){
                $i = 10;
            }elseif($a=='11:00'){
                $i = 11;
            }elseif($a=='11:30'){
                $i = 12;
            }elseif($a=='12:00'){
                $i = 13;
            }elseif($a=='12:30'){
                $i = 14;
            }elseif($a=='13:00'){
                $i = 15;
            }elseif($a=='13:30'){
                $i = 16;
            }elseif($a=='14:00'){
                $i = 17;
            }elseif($a=='14:30'){
                $i = 18;
            }elseif($a=='15:00'){
                $i = 19;
            }elseif($a=='15:30'){
                $i = 20;
            }elseif($a=='16:00'){
                $i = 21;
            }elseif($a=='16:30'){
                $i = 22;
            }elseif($a=='17:00'){
                $i = 23;
            }elseif($a=='17:30'){
                $i = 24;
            }elseif($a=='18:00'){
                $i = 25;
            }elseif($a=='18:30'){
                $i = 26;
            }elseif($a=='19:00'){
                $i = 27;
            }elseif($a=='19:30'){
                $i = 28;
            }elseif($a=='20:00'){
                $i = 29;
            }elseif($a=='20:30'){
                $i = 30;
            }elseif($a=='21:00'){
                $i = 31;
            }elseif($a=='21:30'){
                $i = 32;
            }elseif($a=='22:00'){
                $i = 33;
            }elseif($a=='22:30'){
                $i = 34;
            }elseif($a=='23:00'){
                $i = 35;
            }elseif($a=='23:30'){
                $i = 36;
            }elseif($a=='00:00'){
                $i = 37;
            }elseif($a=='00:30'){
                $i = 38;
            }elseif($a=='01:00'){
                $i = 39;
            }elseif($a=='01:30'){
                $i = 40;
            }elseif($a=='02:00'){
                $i = 41;
            }elseif($a=='02:30'){
                $i = 42;
            }elseif($a=='03:00'){
                $i = 43;
            }elseif($a=='03:30'){
                $i = 44;
            }elseif($a=='04:00'){
                $i = 45;
            }elseif($a=='04:30'){
                $i = 46;
            }elseif($a=='05:00'){
                $i = 47;
            }elseif($a=='05:30'){
                $i = 48;
            } 

            while ($at < $bt) {

               
                $at =  strtotime('+30 minutes', $at) ; 
                $hora = $hora.",".$i ;
                $i++;
            } 

          return  substr($hora, 1) ;
      }
  public function convertirhora($codigo){
    if ($codigo == 1 ){
        $hora = '06:00:00-06:30:00';
    }elseif ($codigo == 2) {
        $hora = '06:30:00-07:00:00';
    }elseif ($codigo == 3) {
        $hora = '07:00:00-07:30:00';
    }elseif ($codigo == 4) {
        $hora = '07:30:00-08:00:00';
    }elseif ($codigo == 5) {
        $hora = '08:00:00-08:30:00';
    
    }elseif ($codigo == 6) {
        $hora = '08:30:00-09:00:00';
    
    }elseif ($codigo == 7) {
        $hora = '09:00:00-09:30:00';
    
    }elseif ($codigo == 8) {
        $hora = '09:30:00-10:00:00';
    
    }elseif ($codigo == 9) {
        $hora = '10:00:00-10:30:00';
    
    }elseif ($codigo == 10) {
        $hora = '10:30:00-11:00:00';
    
    }elseif ($codigo == 11) {
        $hora = '11:00:00-11:30:00';
    
    }elseif ($codigo == 12) {
        $hora = '11:30:00-12:00:00';
    
    }elseif ($codigo == 13) {
       $hora = '12:00:00-12:30:00';
    
    }elseif ($codigo == 14) {
        $hora = '12:30:00-13:00:00';
    
    }elseif ($codigo == 15) {
        $hora = '13:00:00-13:30:00';
    
    }elseif ($codigo == 16) {
        $hora = '13:30:00-14:00:00';
    
    }elseif ($codigo == 17) {
        $hora = '14:00:00-14:30:00';
    
    }elseif ($codigo == 18) {
        $hora = '14:30:00-15:00:00';
    
    }elseif ($codigo == 19) {
        $hora = '15:00:00-15:30:00';
    
    }elseif ($codigo == 20) {
        $hora = '15:30:00-16:00:00';
    
    }elseif ($codigo == 21) {
        $hora = '16:00:00-16:30:00';
    
    }elseif ($codigo == 22) {
        $hora = '16:30:00-17:00:00';
    
    }elseif ($codigo == 23) {
        $hora = '17:00:00-17:30:00';
    
    }elseif ($codigo == 24) {
        $hora = '17:30:00-18:00:00';
    
    }elseif ($codigo == 25) {
        $hora = '18:00:00-18:30:00';
    
    }elseif ($codigo == 26) {
        $hora = '18:30:00-19:00:00';
    
    }elseif ($codigo == 27) {
        $hora = '19:00:00-19:30:00';
    
    }elseif ($codigo == 28) {
        $hora = '19:30:00-20:00:00';
    
    }elseif ($codigo == 29) {
        $hora = '20:00:00-20:30:00';
    
    }elseif ($codigo == 30) {
        $hora = '20:30:00-21:00:00';
    
    }elseif ($codigo == 31) {
        $hora = '21:00:00-21:30:00';
    
    }elseif ($codigo == 32) {
        $hora = '21:30:00-22:00:00';
    
    }elseif ($codigo == 33) {
        $hora = '22:00:00-22:30:00';
    
    }elseif ($codigo == 34) {
        $hora = '22:30:00-23:00:00';
    
    }elseif ($codigo == 35) {
        $hora = '23:00:00-23:30:00';
    
    }elseif ($codigo == 36) {
        $hora = '23:30:00-00:00:00';
    
    }elseif ($codigo == 37) {
        $hora = '00:00:00-00:30:00';
    
    }elseif ($codigo == 38) {
        $hora = '00:30:00-01:00:00';
    
    }elseif ($codigo == 39) {
        $hora = '01:00:00-01:30:00';
    
    }elseif ($codigo == 40) {
        $hora = '01:30:00-02:00:00';
    
    }elseif ($codigo == 41) {
        $hora = '02:00:00-02:30:00';
    
    }elseif ($codigo == 42) {
        $hora = '02:30:00-03:00:00';
    
    }elseif ($codigo == 43) {
        $hora = '03:00:00-03:30:00';
    
    }elseif ($codigo == 44) {
        $hora = '03:30:00-04:00:00';
    
    }elseif ($codigo == 45) {
        $hora = '04:00:00-04:30:00';
    
    }elseif ($codigo == 46) {
        $hora = '04:30:00-05:00:00';
    
    }elseif ($codigo == 47) {
        $hora = '05:00:00-05:30:00';
    
    }elseif ($codigo == 48) {
        $hora = '05:30:00-06:00:00';
    }
      return $hora;
  }


  /*Papu eliminar turnos*/
  public function eliminar_turnos(){
    $Data = json_decode(file_get_contents('php://input'), true);
    $fecha_inicio = $Data['fecha_inicio'];
    $fecha_fin =  $Data['fecha_fin'];
    $nom_usu = $this->session->userdata('nom_usu');
    $nom_usu = substr($nom_usu , 2);
    //echo "<script>alert('". $fecha_inicio . "')</script>";
    $eliminar_turnos = $this->ProgramacionModel->eliminar_turnos( $nom_usu, $fecha_inicio,$fecha_fin);
    echo json_encode($eliminar_turnos);
  
  }

  
  public function busquedaHorarioProveedor() {
    //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
      //add the header here
    //   header('Content-Type: application/json');
    //   echo json_encode( $arr );


    $Data = json_decode(file_get_contents('php://input'), true);
    $especialidades = $Data['codEspecialidades'];
    $especialidades = implode(",", $especialidades);
    $nom_doc =    $Data['nom_doc'];

    $nom_prov =   $this->session->userdata('cod_prov_medico');

    /*
    $prov = $Data['nom_proveedor'];
    if ( $prov =='IMPACTMEDIC' ) { $nom_prov = 53 ;}
    else{ $nom_prov =   $this->session->userdata('cod_prov_medico'); }
    */

    $estado = $Data['estado'];

    if ( $estado ==0 ) { $estado = "'2'" ;}
    if ( $estado ==1 ) { $estado = "'1'" ;}
    if ( $estado ==2 ) { $estado = "'0'" ;}
    if ( $estado ==3) { $estado = "'0','1','2'" ;}

    $turno = $Data['turno'];
     if ( $turno ==0 ) { $turno = "'M'" ;}
    if ( $turno ==1 ) { $turno = "'T'" ;}
    if ( $turno ==2 ) { $turno = "'Z'" ;}
    if ( $turno ==3 ) { $turno = "'M','T','Z'" ;}
    


    $clasif = $Data['clasif'];
    if ( $clasif ==0 ) { $clasif = "nom_clasif in ('AGUDO')" ;}
    if ( $clasif ==1 ) { $clasif = "nom_clasif in ('CRONICO')" ;}
    if ( $clasif ==2 ) { $clasif = "nom_clasif in ('AUTO COVID')" ;}
    if ( $clasif ==3 ) { $clasif = "nom_clasif in ('AGUDO','CRONICO','AUTO COVID')";}
    if ( $clasif ==3 ) { $clasif = "nom_clasif isnull";}
 


    $fec_inicial = $Data['fec_inicial'];
    $fec_final = $Data['fec_final'];

    $horarios = $this->ProgramacionModel->get_busquedaHorarioProveedor($especialidades,$estado,$nom_doc,$turno,$clasif,$fec_inicial,$fec_final,$nom_prov);   
    $d=utf8_converter($horarios);
    echo  json_encode($d); 



  }

  public function busquedaHorario() {
    //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
      //add the header here
    //   header('Content-Type: application/json');
    //   echo json_encode( $arr );

    $Data = json_decode(file_get_contents('php://input'), true);
    $especialidades = $Data['codEspecialidades'];
    $especialidades = implode(",", $especialidades);
    $nom_doc = $Data['nom_doc'];
    
    $estado = $Data['estado'];

    if ( $estado ==0 ) { $estado = "'2'" ;}
    if ( $estado ==1 ) { $estado = "'1'" ;}
    if ( $estado ==2 ) { $estado = "'0'" ;}
    if ( $estado ==3) { $estado = "'0','1','2'" ;}

    $turno = $Data['turno'];
     if ( $turno ==0 ) { $turno = "'M'" ;}
    if ( $turno ==1 ) { $turno = "'T'" ;}
    if ( $turno ==2 ) { $turno = "'Z'" ;}
    if ( $turno ==3 ) { $turno = "'M','T','Z'" ;}
    


    $clasif = $Data['clasif'];
    if ( $clasif ==0 ) { $clasif = "nom_clasif in ('AGUDO')" ;}
    if ( $clasif ==1 ) { $clasif = "nom_clasif in ('CRONICO')" ;}
    if ( $clasif ==2 ) { $clasif = "nom_clasif in ('AUTO COVID')" ;}
    if ( $clasif ==3 ) { $clasif = "nom_clasif in ('AGUDO','CRONICO','AUTO COVID')";}
    if ( $clasif ==3 ) { $clasif = "nom_clasif isnull";}
 


    $fec_inicial = $Data['fec_inicial'];
    $fec_final = $Data['fec_final'];
    $proveedor = $Data['proveedor'];

    
    $horarios = $this->ProgramacionModel->get_busquedaHorario($especialidades,$estado,$nom_doc,$turno,$clasif,$fec_inicial,$fec_final,$proveedor);   
    $d=utf8_converter($horarios);
    echo  json_encode($d); 



  }


  /*
  //PAPU 21/02
  public function busquedaHorario() {
    //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
      //add the header here
    //   header('Content-Type: application/json');
    //   echo json_encode( $arr );

    $Data = json_decode(file_get_contents('php://input'), true);
    $especialidades = $Data['espec'];
    $nom_doc = $Data['nom_doc'];
    
    $estado = $Data['estado'];

    if ( $estado ==0 ) { $estado = "'2'" ;}
    if ( $estado ==1 ) { $estado = "'1'" ;}
    if ( $estado ==2 ) { $estado = "'0'" ;}
    if ( $estado ==3) { $estado = "'0','1','2'" ;}

    $turno = $Data['turno'];
     if ( $turno ==0 ) { $turno = "'M'" ;}
    if ( $turno ==1 ) { $turno = "'T'" ;}
    if ( $turno ==2 ) { $turno = "'Z'" ;}
    if ( $turno ==3 ) { $turno = "'M','T','Z'" ;}
    


    $clasif = $Data['clasif'];
    if ( $clasif ==0 ) { $clasif = "nom_clasif in ('AGUDO')" ;}
    if ( $clasif ==1 ) { $clasif = "nom_clasif in ('CRONICO')" ;}
    if ( $clasif ==2 ) { $clasif = "nom_clasif in ('AUTO COVID')" ;}
    if ( $clasif ==3 ) { $clasif = "nom_clasif in ('AGUDO','CRONICO','AUTO COVID')";}
    if ( $clasif ==3 ) { $clasif = "nom_clasif isnull";}
 


    $fec_inicial = $Data['fec_inicial'];
    $fec_final = $Data['fec_final'];
    $proveedor = $Data['proveedor'];

    
    $horarios = $this->ProgramacionModel->get_busquedaHorario($especialidades,$estado,$nom_doc,$turno,$clasif,$fec_inicial,$fec_final,$proveedor);   
    $d=utf8_converter($horarios);
    echo  json_encode($d); 



  }*/

  public function seguimiento() {
    //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
      //add the header here
    //   header('Content-Type: application/json');
    //   echo json_encode( $arr );

       $Data = json_decode(file_get_contents('php://input'), true);
      
    $cod_asig = $Data['cod_asig'];
   
      

    $seguimiento = $this->ProgramacionModel->get_seguimiento($cod_asig);   
    $d=utf8_converter($seguimiento);
    echo  json_encode($d); 

  }
  public function busquedaHorarioremisse() {
    //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
      //add the header here
    //   header('Content-Type: application/json');
    //   echo json_encode( $arr );

    $Data = json_decode(file_get_contents('php://input'), true);
  
    $proveedor =  $this->session->userdata('proveedor');  
    
    $fec_inicial = $Data['fec_inicial'];
    //$fec_final = $Data['fec_final'];
    $filtroremisse= $Data['filtroremisse']; 

    $horarios = $this->ProgramacionModel->get_busquedaHorarioremisse($proveedor,$fec_inicial,$filtroremisse);   
    
    echo  json_encode(utf8_converter($horarios)); 

  }


  public function enviar_sms() {
    $login =  $this->session->userdata('nom_usu'); 

     $Data = json_decode(file_get_contents('php://input'), true);
    $codigosenviarsms = $Data['codigosenviarsms'];
 
    if ( count($codigosenviarsms) == 0){
        echo  json_encode("No hay registros.....");     
    }else{
        foreach($codigosenviarsms as $get){
        
                $idposicion = $this->ProgramacionModel->getidpos_auditoria( $get);
        
             
             
             $resultado[] = $this->ProgramacionModel->enviar_sms($get ,$idposicion);  
            
        }
        echo  json_encode($resultado); 
    }
  }
  public function cancelarprogramacion() {
    $login =  $this->session->userdata('nom_usu'); 

     $Data = json_decode(file_get_contents('php://input'), true);
    $codigocancelar = $Data['codigocancelar'];
 
    if ( count($codigocancelar) == 0){
        echo  json_encode("No hay registros.....");     
    }else{
        
        foreach($codigocancelar as $get){
           $idposicion = $this->ProgramacionModel->getidpos_auditoria( $get);
           $auditoria = array(
            'cod_asig'  =>   $get  ,
            'nom_usu' =>  $login ,
            'id_posicion' =>  $idposicion ,
            'tipo_registro' =>  "CANCELACION" ,
            'cambios_realizados' => "CANCELADO Cod: ".$get,
            'fec_reg' =>  date("Y-m-d"),
            'hora_reg' =>  date("H:i:s"),
            'ip_reg'  =>  $_SERVER['REMOTE_ADDR']
           
            );
           $resultado = $this->ProgramacionModel->cancelarprogramacion($get ,$auditoria);  
        }
        echo  json_encode($resultado); 
    }
  }
  public function migrar_sm() {
    
    $Data = json_decode(file_get_contents('php://input'), true);
   $codigosmigrar_sm = $Data['codigosmigrar_sm'];
   $login =  $this->session->userdata('nom_usu'); 
   $contablet = $Data['contablet'];

   if ( count($codigosmigrar_sm) == 0){
       echo  json_encode("No hay registros.....");     
   }else{
       foreach($codigosmigrar_sm as $get){
                   
        $idposicion = $this->ProgramacionModel->getidpos_auditoria( $get);
        $programacion = $this->ProgramacionModel->get_programacion( $get);
/*  var_dump($programacion["nom_clasif"]);
 exit; */
        $auditoria = array(
            'cod_asig'  =>   $get  ,
            'nom_usu' =>  $login ,
            'id_posicion' =>  $idposicion ,
            'tipo_registro' =>  "MIGRACION a SM" ,
            'cambios_realizados' => "Cod: ".$get." | Clasificacion: ".$programacion["nom_clasif"]." | Doc: " . $programacion["cod_doc"] ." | Nom_doc: " . $programacion["nom_doc"] ." | Ini Doc: ". $programacion["horini_asig_doc"]  . " | Fin Doc: ".$programacion["horfin_asig_doc"] ." | Fecha asig: " . $programacion["fecini_asig"]  . " | Turno: " . $programacion["turno"]  . "| Conductor: " .$programacion["cod_mot"] . " | mpos: " . ($programacion["con_mpos"] == "f"?"NO":"SI" ) ." |nrotablet: " . (empty($programacion["nro_tablet"])?"NO TIENE":$programacion["nro_tablet"]) ." |nromaletin: " .  (empty($programacion["nro_maletin"])?"NO TIENE":$programacion["nro_maletin"])  ,
          //  'cambios_realizados' => "Cod: ".$get ,
             'fec_reg' =>  date("Y-m-d"),
            'hora_reg' =>  date("H:i:s"),
            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
            'estado_reg'  =>  2
            );
        $resultado = $this->ProgramacionModel->migrar_sm($get,$auditoria );   
       }
       echo  json_encode($resultado); 
   }
 }



public function get_especialidades(){

    $especialidades = $this->ProgramacionModel->get_especialidades();   
 
    echo  json_encode($especialidades); 

}

public function get_doctorxespecialidadxproveedor(){
    
    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_esp_sel = $Data['cod_esp_sel'];
    $nom_proveedor = $this->session->userdata('cod_prov_medico');  //$Data['nom_proveedor'];
    if($nom_proveedor == 'AMBULANCIA'){
        $nom_proveedor = 'ACOVID';
    }
    $medicos = $this->ProgramacionModel->get_doctorxespecialidadxproveedor($cod_esp_sel,$nom_proveedor);   
    
    echo  json_encode(utf8_converter($medicos)); 

}
public function get_doctorxespecialidad(){
    
    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_esp_sel = $Data['cod_esp_sel'];
    $medicos = $this->ProgramacionModel->get_doctorxespecialidad($cod_esp_sel);   
    
    echo  json_encode(utf8_converter($medicos)); 

}

public function get_botiquinxespecialidad(){
    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_esp_sel = $Data['cod_esp_sel'];

    $botiquines = $this->ProgramacionModel->get_botiquinxespecialidad($cod_esp_sel);   
    
    echo  json_encode(utf8_converter($botiquines)); 

} 
public function get_proveedores(){
   //var_dump( $this->session->userdata('nom_proveedor'));
   if ( is_null( $this->session->userdata('nom_proveedor'))   ){
    $nom_proveedor='';
    }else{
    $nom_proveedor = $this->session->userdata('nom_proveedor');
    }
    $proveedores = $this->ProgramacionModel->get_proveedores($nom_proveedor);   
    $d=utf8_converter($proveedores);
   
    echo  json_encode($d); 
}

public function get_doctoresxambulancia(){

    $proveedores = $this->ProgramacionModel->get_doctoresxambulancia();   
    $d=utf8_converter($proveedores);
    echo  json_encode($d); 
}
public function get_conductores_proveedor($cod_proveedor){

    $conductores = $this->ProgramacionModel->get_conductores_proveedor($cod_proveedor);   
    $d=utf8_converter($conductores);
    echo  json_encode($d); 
}

public function confirmar_horario($cod_doc,$recojo){
    $cod_doc = urldecode($cod_doc);
    $recojo = urldecode($recojo) ;
    $mensaje = $this->ProgramacionModel->confirmar_horario($cod_doc,$recojo);   
 
    echo  json_encode($mensaje); 

}


 
public function getasignacion_doctor($cod_doc){

    $dataDoctor = $this->ProgramacionModel->getasignacion_doctor($cod_doc);   
 
    echo  (json_encode($dataDoctor)); 


}
 

public function get_direcciones($cod_doc){

    $datadirecciones =  ( $this->ProgramacionModel->get_direcciones($cod_doc));   
    $datatotaldirecciones =  ( $this->ProgramacionModel->get_totaldirecciones($cod_doc));   
    $a=array();
    array_push($a, utf8_converter($datadirecciones));
    array_push($a, $datatotaldirecciones);

    echo  json_encode(  $a,JSON_UNESCAPED_UNICODE); 


}

public function confirmarasignacion($codigoasignacionaconfirmar=0){
    $Data = json_decode(file_get_contents('php://input'), true);
    $codigoasignacionaconfirmar = $Data['codigoasignacionaconfirmar'];
    $lugarecojo = $Data['lugarecojo'];
    $lugartermino = $Data['lugartermino'];
    $ubigeo_recojo = $Data['ubigeo_recojo'];
    $ubigeo_termino = $Data['ubigeo_termino'];
    $des_doc = $Data['des_doc'];
    $ind_doc = $Data['ind_doc'];

    $login =  $this->session->userdata('nom_usu'); 
    $idposicion = $this->ProgramacionModel->getidpos_auditoria( $codigoasignacionaconfirmar);
    
 
    if ($codigoasignacionaconfirmar == null){
        echo  json_encode("No se confirmo");     
    }else{
        $auditoria = array(
            'cod_asig'  =>   $codigoasignacionaconfirmar  ,
            'nom_usu' =>  $login ,
            'id_posicion' =>  $idposicion ,
            'tipo_registro' =>  "CONFIRMACION" ,
            'cambios_realizados' => "PROGRAMACION CONFIRMADA",
            'fec_reg' =>  date("Y-m-d"),
            'hora_reg' =>  date("H:i:s"),
            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
            'estado_reg'  => 2
            );
        $resultado = $this->ProgramacionModel->confirmar_asignacion($codigoasignacionaconfirmar,$lugarecojo,$lugartermino,$ubigeo_recojo,$ubigeo_termino,$auditoria,$des_doc,$ind_doc);   
        echo  json_encode($resultado); 
    }
}


public function desconfirmarasignacion($codigoasignacionaconfirmar=0){
    $Data = json_decode(file_get_contents('php://input'), true);
    $codigoasignacionaconfirmar = $Data['codigoasignacionaconfirmar'];
    $login =  $this->session->userdata('nom_usu'); 
    $idposicion = $this->ProgramacionModel->getidpos_auditoria( $codigoasignacionaconfirmar);
     

    if ($codigoasignacionaconfirmar == null){
        echo  json_encode("No se desconfirmo");     
    }else{
        $auditoria = array(
            'cod_asig'  =>   $codigoasignacionaconfirmar  ,
            'nom_usu' =>  $login ,
            'id_posicion' =>  $idposicion ,
            'tipo_registro' =>  "DESCONFIRMACION" ,
            'cambios_realizados' => "DESCONFIRMACION",
            'fec_reg' =>  date("Y-m-d"),
            'hora_reg' =>  date("H:i:s"),
            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
            'estado_reg'  => 1
            );
        $resultado = $this->ProgramacionModel->desconfirmar_asignacion($codigoasignacionaconfirmar,$auditoria);   
        echo  json_encode($resultado); 
    }
}


public function actualizaremailflgenvio(){
    $Data = json_decode(file_get_contents('php://input'), true);
    $login = $Data['login'];
    $email = $Data['email'];
    $flg_envio = $Data['flg_envio'];

    $resultado =  $this->ProgramacionModel->actualizaremailflgenvio($login,$email,$flg_envio);
    echo  json_encode($resultado); 
   
}
public function updatebody($body=0){
    $Data = json_decode(file_get_contents('php://input'), true);
    $body = $Data['body'];
    $body2 = $Data['body2'];
    $tituloconfirma = $Data['tituloconfirma'];
    $tituloreconfirma = $Data['tituloreconfirma'];
    $titulodisponibilidad= $Data['titulodisponibilidad'];
    $bodydisponibilidad = $Data['bodydisponibilidad'];

    $actualizarbody =  $this->ProgramacionModel->updatebody($body,$body2,$tituloconfirma,$tituloreconfirma,$titulodisponibilidad,$bodydisponibilidad);   
    echo  json_encode($actualizarbody); 
   
}
public function getbody($body=0){
   
 
    $body =  $this->ProgramacionModel->getbody();   
    echo  json_encode($body); 
   
}


public function guardar_datos_confirmacion($codigoasignacionaconfirmar=0){
    $Data = json_decode(file_get_contents('php://input'), true);
    $codigoasignacionaconfirmar = $Data['codigoasignacionaconfirmar'];
    $login =  $this->session->userdata('nom_usu'); 

    $especialidad =     $Data['especialidad'];
    $nom_clasif  =     $Data['nom_clasif']; 
    if ( $nom_clasif ==0 ) { $nom_clasif = "AGUDO" ;}
    if ( $nom_clasif ==1 ) { $nom_clasif = "CRONICO" ;}
    if ( $nom_clasif ==2 ) { $nom_clasif = "AUTO COVID" ;}
    $medico =     $Data['medico'];
    $nom_medico = $Data['nom_medico'];
    $horini =     $Data['horini'];
    $horfin =     $Data['horfin'];
    $botiquin =     $Data['botiquin'];
    $tablet =     $Data['tablet'];
    $maletin =     $Data['maletin'];
    $fec_asignacion =     $Data['fec_asignacion'];

    $turnodetalle =     $Data['turnodetalle'];
    if ( $turnodetalle ==0 ) { $turnodetalle = "M" ;}
    if ( $turnodetalle ==1 ) { $turnodetalle = "T" ;}
    if ( $turnodetalle ==2 ) { $turnodetalle = "Z" ;}

    $des_doc =     $Data['des_doc'];
    $ind_doc =     $Data['ind_doc'];
    $lugarecojo =     $Data['lugarecojo'];
    $ubigeo_recojo =     $Data['ubigeo_recojo'];
    $lugartermino =     $Data['lugartermino'];
    $ubigeo_termino =     $Data['ubigeo_termino'];
    $cod_prov_motorizado =     $Data['cod_prov_motorizado'];
    
    $cod_mot =     $Data['cod_mot'];
    if ( $cod_mot ==0 ) { $cod_mot = false;}
    if ( $cod_mot ==1 ) { $cod_mot = true;}

    $nom_mot =     $Data['nom_mot'];
    $mpos =     $Data['mpos'];
    $horini_mot =     $Data['horini_mot'];
    $horfin_mot =     $Data['horfin_mot'];
    $estadoprog =     $Data['estadoprog'];
    $login =  $this->session->userdata('nom_usu'); 

    //$this->ProgramacionModel->test_insert($codigoasignacionaconfirmar,$nom_clasif );  
    //$this->ProgramacionModel->test_insert($codigoasignacionaconfirmar,$especialidad,$nom_clasif,$medico,$nom_medico,$horini,$horfin,$botiquin,$tablet,$maletin,$fec_asignacion,$turnodetalle,$des_doc,$ind_doc,$lugarecojo,$ubigeo_recojo,$lugartermino,$ubigeo_termino,$cod_prov_motorizado,$cod_mot,$nom_mot,$mpos,$horini_mot,$horfin_mot,$auditoria);   

    //$this->ProgramacionModel->guardar_datos_confirmacion($codigoasignacionaconfirmar,$nom_clasi);   
    //$this->ProgramacionModel->guardar_datos_confirmacion($codigoasignacionaconfirmar,$especialidad,$nom_clasif,$medico,$nom_medico,$horini,$horfin,$botiquin,$tablet,$maletin,$fec_asignacion,$turnodetalle,$des_doc,$ind_doc,$lugarecojo,$ubigeo_recojo,$lugartermino,$ubigeo_termino,$cod_prov_motorizado,$cod_mot,$nom_mot,$mpos,$horini_mot,$horfin_mot,$auditoria);   
    
    
    if ($codigoasignacionaconfirmar == null){
        echo  json_encode("No se guardo");     
    }else{
        $idposicion = $this->ProgramacionModel->getidpos_auditoria( $codigoasignacionaconfirmar);

        $auditoria = array(
            'cod_asig'  =>   $codigoasignacionaconfirmar  ,
            'nom_usu' =>  $login ,
            'id_posicion' =>  $idposicion ,
            'tipo_registro' =>  "CAMBIOS" ,
            'cambios_realizados' => "Cod: ".$codigoasignacionaconfirmar." | Clasificacion: ".$nom_clasif." | Doc: " . $medico." | Nom_doc: " . $nom_medico." | Ini Doc: ". $horini . " | Fin Doc: ".$horfin." | Observacion: " . $des_doc  ." | Indicacion: " . $ind_doc ." | Fecha asig: " . $fec_asignacion . " | Turno: " . $turnodetalle . " | Zona: ZONA 01" . " | Conductor: " .$cod_mot. " | Ini Cond: " . $horini_mot . " | Fin Cond: " . $horfin_mot ." | mpos: " . $mpos." |nrotablet: " . $tablet." |nromaletin: " . $maletin." |lugar_recojo: " . $lugarecojo." |ubigeo_Recojo: " . $ubigeo_recojo." |lugar_termino: " . $lugartermino." |ubigeo_termino: " . $ubigeo_termino,
            'fec_reg' =>  date("Y-m-d"),
            'hora_reg' =>  date("H:i:s"),
            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
            'estado_reg'  =>  $estadoprog
            );
        $resultadovalidar =  $this->ProgramacionModel->valida_guardar_datos_conductor($codigoasignacionaconfirmar,$cod_mot,$nom_mot,$mpos,$botiquin,$tablet,$maletin);

        if($resultadovalidar == true){   
                $resultado = $this->ProgramacionModel->test_insert($codigoasignacionaconfirmar,$especialidad,$nom_clasif,$medico,$nom_medico,$horini,$horfin,$botiquin,$tablet,$maletin,$fec_asignacion,$turnodetalle,$des_doc,$ind_doc,$lugarecojo,$ubigeo_recojo,$lugartermino,$ubigeo_termino,$cod_prov_motorizado,$cod_mot,$nom_mot,$mpos,$horini_mot,$horfin_mot,$auditoria);   
                //$resultado = $this->ProgramacionModel->guardar_datos_confirmacion($codigoasignacionaconfirmar,$especialidad,$nom_clasif,$medico,$nom_medico,$horini,$horfin,$botiquin,$tablet,$maletin,$fec_asignacion,$turnodetalle,$des_doc,$ind_doc,$lugarecojo,$ubigeo_recojo,$lugartermino,$ubigeo_termino,$cod_prov_motorizado,$cod_mot,$nom_mot,$mpos,$horini_mot,$horfin_mot,$auditoria);   
                echo  json_encode($resultado);
        }else{
                echo  json_encode("No existe hora disponible");
        } 
    }
  


}


public function generarambulancia(){
    $Data = json_decode(file_get_contents('php://input'), true);
    $dias =     $Data['dias'];
    $cod_asig = $this->ProgramacionModel->getlastid();

    for ($i = 0; $i < $dias; $i++) {

     $login =  $this->session->userdata('nom_usu'); 
     $idposicion = $this->ProgramacionModel->getidpos_auditoria( $cod_asig);

     $medico =     $Data['medico'];
     $nom_medico =     $Data['nom_medico'];
     $porcionescod_doc = explode("-", $medico);
     $cod_doc = $porcionescod_doc[0];  
     $especialidad = $porcionescod_doc[1];  
     $porcionesnom_medico = explode("-", $nom_medico);
     $nom_doc = $porcionesnom_medico[0];  
 
    /*  if ( $cod_doc == "5604" ){
        $especialidad = "006";
    }else{
        $especialidad = "005";
    } */
    $nom_clasif  =   "AGUDO";//  $Data['nom_clasif']; 
  /*   if ( $nom_clasif ==0 ) { $nom_clasif = "AGUDO" ;}
    if ( $nom_clasif ==1 ) { $nom_clasif = "CRONICO" ;} */


    $horini =     $Data['horini'];
    $horfin =     $Data['horfin']; 
    $dia_asignacion =  date('Y-m-d', strtotime( $Data['fec_asignacion'] . " +".$i." days"));
    $dia = substr($dia_asignacion,8,2);
    $mes = substr($dia_asignacion,5,2); 
   
     $turnodetalle =     $Data['turno'];
    if ( $turnodetalle ==0 ) { $turnodetalle = "M" ;}
    if ( $turnodetalle ==1 ) { $turnodetalle = "T" ;}
    if ( $turnodetalle ==2 ) { $turnodetalle = "Z" ;}

    $des_doc =     $Data['observaciones'];
 
  
     $horini_mot =      date("H:i", strtotime("$horini -30 minutes")) ;
    $horfin_mot =     date("H:i", strtotime("$horfin +30 minutes")) ;
     $login =  $this->session->userdata('nom_usu'); 
 



            $prog_doctor[] = array(
                'cod_asig'  =>  $cod_asig  ,
                'cod_doc' =>  $cod_doc ,
                'nom_doc' =>  $nom_doc ,
                'horini_asig_doc' =>  $horini ,
                'horfin_asig_doc' =>  $horfin ,
                'des_doc' =>  $des_doc,
                'fecini_asig' =>  $dia_asignacion ,
                'turno'  =>  $turnodetalle,
                'cod_esp'  =>  $especialidad,
                'zona'  =>  'ZONA 01',
                'cod_dis'  =>  null,
                'tipo_mot' =>  null ,
                'cod_mot'  =>  null,
                'nom_mot'  =>  null,
                'horini_asig_mot' =>  $horini_mot ,
                'horfin_asig_mot'  =>  $horfin_mot,
                'estado_prog'  =>  0,
                'asig_activo'  =>  true,
                'nom_usu' =>  $login ,
                'nom_clasif'  =>  $nom_clasif,  
                'cod_prov_motorizado'  =>  '99',
                'horas' => $this->convertirnumeros($horini,$horfin) ,
                'dia' =>$dia,
                'mes' => $mes
                );
                $auditoria[] = array(
                    'cod_asig'  =>   $cod_asig  ,
                    'nom_usu' =>  $login ,
                    'id_posicion' =>  1 ,
                    'tipo_registro' =>  "CREACION" ,
                    'cambios_realizados' => "Cod: ".$cod_asig." | Clasificacion: ".$nom_clasif." | Doc: " . $nom_doc." | Ini Doc: ". $horini . " | Fin Doc: ".$horfin." | Indicacion: " . $des_doc . " | Fecha asig: " . $dia_asignacion . " | Turno: " . $turnodetalle . " | Zona: ZONA 01" . " | Conductor: " . "null" . " | Ini Cond: " . $horini_mot. " | Fin Cond: " . $horfin_mot ,
                    'fec_reg' =>  date("Y-m-d"),
                    'hora_reg' =>  date("H:i:s"),
                    'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                    'estado_reg'  => 0
     
                    );
                    $cod_asig =   $cod_asig + 1 ;

                   
    }
    $this->ProgramacionModel->save( $prog_doctor,$auditoria);
    echo  json_encode(true); 
    


}

public function nuevo_datos_confirmacion(){
    $Data = json_decode(file_get_contents('php://input'), true);
     $login =  $this->session->userdata('nom_usu'); 

    $especialidad =     $Data['especialidad'];

    $nom_clasif  =     $Data['nom_clasif']; 
    if ( $nom_clasif ==0 ) { $nom_clasif = "AGUDO" ;}
    if ( $nom_clasif ==1 ) { $nom_clasif = "CRONICO" ;}

    $cod_doc =     $Data['medico'];
    $nom_doc =     $Data['nom_medico'];

    $horini =     $Data['horini'];
    $horfin =     $Data['horfin'];
    $botiquin =     $Data['botiquin'];
    $tablet =     $Data['tablet'];
    $maletin =     $Data['maletin'];
    $dia_asignacion =     $Data['fec_asignacion'];
    $dia = substr($dia_asignacion,8,2);
    $mes = substr($dia_asignacion,5,2); 
   
     $turnodetalle =     $Data['turnodetalle'];
    if ( $turnodetalle ==0 ) { $turnodetalle = "M" ;}
    if ( $turnodetalle ==1 ) { $turnodetalle = "T" ;}
    if ( $turnodetalle ==2 ) { $turnodetalle = "Z" ;}

    $des_doc =     $Data['des_doc'];
    
    $lugarecojo =     $Data['lugarecojo'];
    $ubigeo_recojo =     $Data['ubigeo_recojo'];
    $lugartermino =     $Data['lugartermino'];
    $ubigeo_termino =     $Data['ubigeo_termino'];
    $cod_prov_motorizado =     $Data['cod_prov_motorizado'];
    $cod_mot =     $Data['cod_mot'];
    $nom_mot =     $Data['nom_mot'];
    $mpos =     $Data['mpos'];
    $horini_mot =     $Data['horini_mot'];
    $horfin_mot =     $Data['horfin_mot'];
     $login =  $this->session->userdata('nom_usu'); 
    $cod_asig = $this->ProgramacionModel->getlastid();
 

        $idposicion = $this->ProgramacionModel->getidpos_auditoria( $cod_asig);

       

            $prog_doctor[] = array(
                'cod_asig'  =>  $cod_asig  ,
                'cod_doc' =>  $cod_doc ,
                'nom_doc' =>  $nom_doc ,
                'horini_asig_doc' =>  $horini ,
                'horfin_asig_doc' =>  $horfin ,
                'des_doc' =>  $des_doc,
                'fecini_asig' =>  $dia_asignacion ,
                'turno'  =>  $turnodetalle,
                'cod_esp'  =>  $especialidad,
                'zona'  =>  'ZONA 01',
                'cod_dis'  =>  null,
                'tipo_mot' =>  null ,
                'cod_mot'  =>  null,
                'nom_mot'  =>  null,
                'horini_asig_mot' =>  $horini_mot ,
                'horfin_asig_mot'  =>  $horfin_mot,
                'estado_prog'  =>  0,
                'asig_activo'  =>  true,
                'nom_usu' =>  $login ,
                'nom_clasif'  =>  $nom_clasif,  
                'cod_prov_motorizado'  =>  '99',
                'horas' => $this->convertirnumeros($horini,$horfin) ,
                'dia' =>$dia,
                'mes' => $mes
                );
                $auditoria[] = array(
                    'cod_asig'  =>   $cod_asig  ,
                    'nom_usu' =>  $login ,
                    'id_posicion' =>  1 ,
                    'tipo_registro' =>  "CREACION" ,
                    'cambios_realizados' => "Cod: ".$cod_asig." | Clasificacion: ".$nom_clasif." | Doc: " . $nom_doc." | Ini Doc: ". $horini . " | Fin Doc: ".$horfin." | Indicacion: " . $des_doc . " | Fecha asig: " . $dia_asignacion . " | Turno: " . $turnodetalle . " | Zona: ZONA 01" . " | Conductor: " . "null" . " | Ini Cond: " . $horini_mot. " | Fin Cond: " . $horfin_mot ,
                    'fec_reg' =>  date("Y-m-d"),
                    'hora_reg' =>  date("H:i:s"),
                    'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                    'estado_reg'  => 0
     
                    );
                    $this->ProgramacionModel->save( $prog_doctor,$auditoria);

         echo  json_encode($cod_asig); 
    
  


}
public function exportar()
{       
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('A1', 'Hello World !');
    
    $writer = new Xlsx($spreadsheet);

    $filename = 'name-of-the-generated-file.xlsx';

    $writer->save($filename); // will create and save the file in the root of the project

}
public function get_fecha_servidor()
{
    return  $this->ProgramacionModel->get_hora_servidor();

}
public function guardarconductor()
{
    $horaservidor = substr($this->ProgramacionModel->get_hora_servidor(),11,5 );
    $fechaservidor = substr($this->ProgramacionModel->get_hora_servidor(),0,10 );
    $fechaservidor = substr($fechaservidor,3,2 )."/".substr($fechaservidor,0,2 )."/".substr($fechaservidor,6,4 );

    $Data = json_decode(file_get_contents('php://input'), true);
    $horacliente= substr($Data['hora'],11,5 ); 
    $fechacliente= substr($Data['hora'],0,10 );
 
    $cod_prov_motorizado_b=  $this->session->userdata('proveedor');  //$Data['cod_prov_motorizado_b']; 
    if (strtotime($fechaservidor)>strtotime($fechacliente)   ){
        echo  json_encode("fechainvalida");
    return false;
    }

if ($cod_prov_motorizado_b == "4"){
    if (strtotime($horaservidor)>strtotime("23:30") ||   strtotime($horacliente) > strtotime("23:30") ){
        echo  json_encode("10");
    return false;
    }
}else{
if (strtotime($horaservidor)>strtotime("23:30") ||   strtotime($horacliente) > strtotime("23:59") ){
    echo  json_encode("11");
return false;
}
} 
    $codigosaproveedor= $Data['codigosaproveedor']; 
    $login =  $this->session->userdata('nom_usu'); 

    $resultado = array();
     if ( count($codigosaproveedor) == 0){
        echo  json_encode("No se guardaron datos");     
    }else{
        foreach($codigosaproveedor as $get){
            $idposicion = $this->ProgramacionModel->getidpos_auditoria( $get['cod_asig']);

            $auditoria = array(
                'cod_asig'  =>   $get['cod_asig']  ,
                'nom_usu' =>  $login ,
                'id_posicion' =>  $idposicion ,
                'tipo_registro' =>  "ASIGNACION CONDUCTOR" , 
                'cambios_realizados' => "Cod: ".$get['cod_asig']." |conductor: " .$get['conductor']." |nombreconductor: " . $get['nombreconductor']." |mpos: " .$get['mpos']." |botiquin: " .$get['botiquin']." |tablet: " .$get['tablet']." |maletin: " .$get['maletin'],
                'fec_reg' =>  date("Y-m-d"),
                'hora_reg' =>  date("H:i:s"),
                'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                'estado_reg'  =>  2
                );
            $resultado[ $get['cod_asig']]  =  $this->ProgramacionModel->guardar_datos_conductor($get['cod_asig'],$get['conductor'],$get['nombreconductor'],$get['mpos'],$get['botiquin'],$get['tablet'],$get['maletin'],$auditoria);
            
        }
        echo  json_encode($resultado); 
   
    } 
   
}

public function guardarproveedor()
{

    $Data = json_decode(file_get_contents('php://input'), true);
    $proveedor= $Data['proveedor']; 
    $codigos= $Data['codigos'];
    $fecha_proveedor= $Data['fecpro_asig'];
    $login =  $this->session->userdata('nom_usu'); 

     if ( count($codigos) == 0){
        echo  json_encode("No se guardo proveedor");     
    }else{
     

        foreach($codigos as $get){
           
            $idposicion = $this->ProgramacionModel->getidpos_auditoria( $get);

            $auditoria = array(
                'cod_asig'  =>   $get  ,
                'nom_usu' =>  $login ,
                'id_posicion' =>  $idposicion ,
                'tipo_registro' =>  "ENVIO REMISSE" ,
                'cambios_realizados' => "Cod: ".$get." |cod_prov_motorizado: " . $proveedor,
                'fec_reg' =>  date("Y-m-d"),
                'hora_reg' =>  date("H:i:s"),
                'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                'estado_reg'  =>  2
                );
            $resultado  =  $this->ProgramacionModel->guardar_datos_proveedor($get,$proveedor,$fecha_proveedor,$auditoria);
        }
        echo  json_encode($resultado); 
   
    }
   
}
public function download()
{

    $Data = json_decode(file_get_contents('php://input'), true);
    $tablejson= $Data['tablejson'];

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
  $spreadsheet->getActiveSheet()->getStyle('A1:G1')->applyFromArray($styleArray);
    
  // auto fit column to content
  foreach(range('A', 'G') as $columnID) {
    $spreadsheet->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
  }
// set the names of header cells
    $sheet->setCellValue('A1', 'Fecha');
    $sheet->setCellValue('B1', 'Doctor');
    $sheet->setCellValue('C1', 'Turno');
    $sheet->setCellValue('D1', 'Clasificacion');
    $sheet->setCellValue('E1', 'Horini');
    $sheet->setCellValue('F1', 'Horfin');
    $sheet->setCellValue('G1', 'Descripcion');
   // Add some data
  $x = 2;
  
  foreach($tablejson as $get){
      $sheet->setCellValue('A'.$x, $get['fecha']);
      $sheet->setCellValue('B'.$x, $get['doctor']);
      $sheet->setCellValue('C'.$x, $get['turno']);
      $sheet->setCellValue('D'.$x, $get['clasificacion']);
      $sheet->setCellValue('E'.$x, $get['horini']);
      $sheet->setCellValue('F'.$x, $get['horfin']);
      $sheet->setCellValue('G'.$x, $get['descripcion']);
    $x++;
  }

     
    $writer = new Xlsx($spreadsheet);

    $filename = 'C:\PROGRAMACION_MEDICA\programacion_medica.xlsx'; 

    $writer->save( $filename); 
}


public function enviarCorreo()
{
    $Data = json_decode(file_get_contents('php://input'), true);
    
$email= $Data['email'];
$codigosasinconfirmar= $Data['codigosasinconfirmar'];
$deshabilitados= $Data['deshabilitados'];
//$body= $Data['body'];
$reconfirma= $Data['reconfirma'];
 
 $login =  $this->session->userdata('nom_usu'); 
 $body = $this->ProgramacionModel->getbody();
 if($reconfirma){
    $subject="RECONFIRMACION DE TURNOS";
    $bodycorreo = $body['valor2']; 
    $titulocorreo = $body['valor4']; 

 }else{
    $subject="CONFIRMACION DE TURNOS";
    $bodycorreo = $body['valor1'];
    $titulocorreo = $body['valor3']; 
 
 }
 //var_dump($subject);
 //exit;
$message="Estimado Médico  Asociado la presente es para confirmar que turnos serán los programados en el mes de  “".strftime("%B", strtotime('first day of +1 month'))."” del ".  "“".date("Y")."”
Tener en cuenta que si la demanda se incrementara se estaría reconsiderando los turnos enviados siempre y cuando aún los tengan disponibles.
Por lo antes mencionado se le solicita su apoyo y comprensión";
 $rpta =  $this->sendEmail($email,$titulocorreo,$bodycorreo);
if  ($rpta == "Email send."){
   
    foreach($codigosasinconfirmar as $get){
       
        $idposicion = $this->ProgramacionModel->getidpos_auditoria( $get);

        $auditoria[] = array(
            'cod_asig'  =>   $get  ,
            'nom_usu' =>  $login ,
            'id_posicion' =>  $idposicion ,
            'tipo_registro' =>  "SIN CONFIRMAR" ,
            'cambios_realizados' => "PROGRAMACION SIN CONFIRMAR",
            'fec_reg' =>  date("Y-m-d"),
            'hora_reg' =>  date("H:i:s"),
            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
            'estado_reg'  =>  1
            );
     }
     //$this->ProgramacionModel->update_sinconfirmar($codigosasinconfirmar,$auditoria); 

    
} 
echo $rpta;

}



public function enviardisponibilidad()
{
     
 
 
  $body = $this->ProgramacionModel->getbody();
 
    $bodycorreo = $body['valor6']; 
    $titulocorreo = $body['valor5']; 
 $correos =  $this->ProgramacionModel->getEmails();
 $this->load->library('email');
 ini_set('SMTP', "smtp.gmail.com");
 ini_set('smtp_port', "587");
 ini_set("username","magaly.valderrama@sanna.pe");  
 ini_set("password",'Sanna2022$');
 $config = Array(
   'smtp_crypto' => "tls",
    'protocol' => 'smtp',
   'smtp_host' => 'smtp.gmail.com',
   'smtp_port' => 587,
   'smtp_timeout'=>'360',
   'smtp_user' => 'magaly.valderrama@sanna.pe', 
   'smtp_pass' => 'Sanna2022$', 
   'mailtype' => 'html',
   'charset' => 'UTF-8',
   'wordwrap' => TRUE,
   'bcc_batch_mode' => TRUE,
   'bcc_batch_size'  => 50
 );  
$cantidadcorreos = count($correos);

for ($x = 0; $x < ceil($cantidadcorreos/50); $x++) {
 
    $this->email->clear();
    $this->email->initialize($config);
        $this->email->set_newline("\r\n");
        $this->email->from('magaly.valderrama@sanna.pe');
      //  $this->email->bcc( 'pedrojesusparedes@gmail.com');
    unset($correos2);
       $correos2 =  array_slice( $correos, 50*$x, 50 );
       foreach ($correos2 as $item => $value)
       {
          $lista[] = $value['medico_email'];
         
         //  var_dump($value['medico_email']);
       } 
      
 
      // $this->email->bcc( 'pedro.condori@sanna.pe');

          $new_arr = array_filter(array_map('trim',$lista),'strlen');

        $listadofinal = implode(",", $new_arr);
        $line_out = preg_replace('/[\n\r]+/', '', $listadofinal);

        $this->email->bcc( $line_out);
        $this->email->to('gustavo.bermudez@sanna.pe'); 

 
       $this->email->subject($titulocorreo);
        $this->email->message($bodycorreo );
        if($this->email->send())
      {
       $rpta =  'Email send.';
      }
      else
     {
        $rpta = show_error($this->email->print_debugger());
     } 
if  ($rpta == "Email send."){
   
    
    
} 
echo $rpta;


}
}



 
function sendEmail($email,$subject,$message){
    $this->load->library('email');
    ini_set('SMTP', "smtp.gmail.com");
    ini_set('smtp_port', "587");
    ini_set("username","magaly.valderrama@sanna.pe");  
    ini_set("password",'Sanna2022$');
    $config = Array(
      'smtp_crypto' => "tls",
       'protocol' => 'smtp',
      'smtp_host' => 'smtp.gmail.com',
      'smtp_port' => 587,
      'smtp_timeout'=>'30',
      'smtp_user' => 'magaly.valderrama@sanna.pe', 
      'smtp_pass' => 'Sanna2022$', 
      'mailtype' => 'html', 
      'charset' => 'UTF-8',
      'wordwrap' => TRUE
    ); 
    $this->email->initialize($config);
           $this->email->set_newline("\r\n");
       
          $this->email->from('magaly.valderrama@sanna.pe');
          $this->email->to($email);
          $this->email->cc('gustavo.bermudez@sanna.pe'); 

          $this->email->subject($subject);
           $this->email->message($message );
            $this->email->attach('C:\PROGRAMACION_MEDICA\programacion_medica.xlsx');
          if($this->email->send())
         {
          return 'Email send.';
         }
         else
        {
        return show_error($this->email->print_debugger());
        } 
    
    }

    function sendEmailTest(){
        $email = 'brunosala2013@gmail.com';
        $subject = 'ESTO ES UN PRUEBA';
        $message = 'ESTO ES UNA PRUEBA. BORRAR.';

        $this->load->library('email');
        ini_set('SMTP', "smtp.gmail.com");
        ini_set('smtp_port', "587");
        ini_set("username","magaly.valderrama@sanna.pe");  
        ini_set("password",'Sanna2022$');
        $config = Array(
          'smtp_crypto' => "tls",
           'protocol' => 'smtp',
          'smtp_host' => 'smtp.gmail.com',
          'smtp_port' => 587,
          'smtp_timeout'=>'30',
          'smtp_user' => 'magaly.valderrama@sanna.pe', 
          'smtp_pass' => 'Sanna2022$', 
          'mailtype' => 'html', 
          'charset' => 'UTF-8',
          'wordwrap' => TRUE
        ); 
        $this->email->initialize($config);
               $this->email->set_newline("\r\n");
           
              $this->email->from('magaly.valderrama@sanna.pe');
              $this->email->to($email);
              $this->email->cc('gustavo.bermudez@sanna.pe'); 
    
              $this->email->subject($subject);
               $this->email->message($message );
                $this->email->attach('C:\PROGRAMACION_MEDICA\programacion_medica.xlsx');
              if($this->email->send())
             {
              return 'Email send.';
             }
             else
            {
            return show_error($this->email->print_debugger());
            } 
        
        }
    
    public function crear_direccion() {
        
        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_doc = $Data['cod_doc'];
        $nro_direccion = $Data['nro_direccion'];

        $direccion = $Data['direccion'];
        $distrito = $Data['distrito'];
        $referencia = $Data['referencia'];
        $telefono = $Data['telefono'];
        $telefono2 = $Data['telefono2'];
        
        $direccion = array(
            'cod_doc' => $cod_doc,
            'nro_direccion' =>  $nro_direccion ,
            'direccion' =>  $direccion ,
            'ubigeo_dist' =>  $distrito,
            'telefono'  =>  $telefono, 
            'telefono_ultimo'  =>  $telefono2,
            'referencia'  =>  $referencia
            );
            $afectados = $this->ProgramacionModel->crear_direccion( $direccion);
        echo json_encode($afectados);
        
        
    }


    public function editar_direccion() {
        
        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_doc = $Data['cod_doc'];
        $nro_direccion = $Data['nro_direccion'];

        $direccion = $Data['direccion'];
        $distrito = $Data['distrito'];
        $referencia = $Data['referencia'];
        $telefono = $Data['telefono'];
        $telefono2 = $Data['telefono2'];
        
        $direccion = array(
           
            'direccion' =>  $direccion ,
            'ubigeo_dist' =>  $distrito,
            'telefono'  =>  $telefono, 
            'telefono_ultimo'  =>  $telefono2,
            'referencia'  =>  $referencia
            );
            $afectados = $this->ProgramacionModel->editar_direccion( $direccion,$cod_doc,$nro_direccion);
        echo json_encode($afectados);
        
        
    }
    public function eliminar_direccion(){

        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_doc = $Data['cod_doc'];
        $nro_direccion = $Data['nro_direccion'];
        $afectados = $this->ProgramacionModel->eliminar_direccion( $cod_doc,$nro_direccion);
        echo json_encode($afectados);
    
    }


    public function prefacturacion()
    {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codigos_prefacturacion= $Data['codigos_prefacturacion'];
    
      $codigos_prefact = utf8_converter($this->ProgramacionModel->get_prefacturacion( $codigos_prefacturacion));
      
echo   json_encode($codigos_prefact);
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
      $spreadsheet->getActiveSheet()->getStyle('A1:P1')->applyFromArray($styleArray);
    
      // auto fit column to content
      foreach(range('A', 'P') as $columnID) {
        $spreadsheet->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
      }
    // set the names of header cells
        $sheet->setCellValue('A1', 'Fecha');
        $sheet->setCellValue('B1', 'Doctor');
        $sheet->setCellValue('C1', 'Turno');
        $sheet->setCellValue('D1', 'Clasificacion');
        $sheet->setCellValue('E1', 'Distrito Destino');
        $sheet->setCellValue('F1', 'Horini');
        $sheet->setCellValue('G1', 'Horfin');
        $sheet->setCellValue('H1', 'Hora ultima atencion');
        $sheet->setCellValue('I1', 'Distrito');
        $sheet->setCellValue('J1', 'Proveedor');
        $sheet->setCellValue('K1', 'Conductor');
        $sheet->setCellValue('L1', 'Hora inicio');
        $sheet->setCellValue('M1', 'Hora final');
        $sheet->setCellValue('N1', 'Extension');
        $sheet->setCellValue('O1', 'Hora administrativa');
        $sheet->setCellValue('P1', 'Hora efectiva');


       // Add some data
      $x = 2;
      foreach($codigos_prefact as $get){
          $sheet->setCellValue('A'.$x, $get['fecha']);
          $sheet->setCellValue('B'.$x, $get['doctor']);
          $sheet->setCellValue('C'.$x, $get['turno']);
          $sheet->setCellValue('D'.$x, $get['nom_clasif']);
          $sheet->setCellValue('E'.$x, $get['distrito']);
          $sheet->setCellValue('F'.$x, $get['horini']);
          $sheet->setCellValue('G'.$x, $get['horfin']);
          $sheet->setCellValue('H'.$x, $get['hora_ultima_atencion']);
          $sheet->setCellValue('I'.$x, $get['distrito_destino']);
          $sheet->setCellValue('J'.$x, $get['proveedor']);
          $sheet->setCellValue('K'.$x, $get['conductor']);
          $sheet->setCellValue('L'.$x, $get['hor_ini']);   
          $sheet->setCellValue('M'.$x, $get['hor_fin']);     
          $sheet->setCellValue('N'.$x, $get['extension']);     
          $sheet->setCellValue('O'.$x, $get['hora_administrativa']);     
          $sheet->setCellValue('P'.$x, $get['hora_efectiva']);     

        $x++;
      }
    
         $writer = new Xlsx($spreadsheet);
    
        $filename = 'C:\PROGRAMACION_MEDICA\prefacturacion.xlsx'; 
      //   header('Content-Type:  application/vnd.ms-excel');
       // header('Content-Disposition: attachment;filename="'. $filename .'.xlsx"'); 
    
        //header('Cache-Control: max-age=0');
        //ob_end_clean();
        //$writer->save('php://output');  
        //$filename = 'name-of-the-generated-file.xlsx';
    
        $writer->save( $filename); 
         exec("C:/PROGRAMACION_MEDICA/prefacturacion.xlsx");
    }




    public function validar_conductor() {
        
        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_conductor = $Data['cod_conductor'];
        $cod_doc =  $Data['cod_doc'];
        $fecha_asignacion =  $Data['fecha_asignacion'];
  
            $validacombo = $this->ProgramacionModel->validar_conductor( $cod_doc,$cod_conductor,$fecha_asignacion);
        echo json_encode($validacombo);       
    
    }

    public function cambiar_estado1() {
        $Data = json_decode(file_get_contents('php://input'), true);
        $fecha_inicio = $Data['fecha_inicio'];
        $fecha_fin =  $Data['fecha_fin'];
        $cambiar_estado1 = $this->ProgramacionModel->cambiar_estado1( $fecha_inicio,$fecha_fin);
        echo json_encode($cambiar_estado1);
        //$fecha_asignacion =  $Data['fecha_asignacion'];
    
    }

    public function actualizar_fechas_bdparametros() {
        $Data = json_decode(file_get_contents('php://input'), true);
        $fec_inicio = $Data['fec_inicio'];
        $fecha_cierre =  $Data['fec_cierre'];
        $actualizar_fechas_bdparametros = $this->ProgramacionModel->actualizar_fechas_bdparametros( $fec_inicio,$fecha_cierre);
        echo json_encode($actualizar_fechas_bdparametro);
        //$fecha_asignacion =  $Data['fecha_asignacion'];
    
    }




    public function validar_anios(){
        $user = $this->session->userdata('nom_usu');
        $user = array_slice($user, 2);
        $validacombo = $this->ProgramacionModel->valida_anios($user);
        echo json_encode($validacombo);
    }
    
    

    public function getespecialidades( ) {
        $especialidades = $this->ProgramacionModel->getespecialidades();
        echo  json_encode($especialidades); 
    }

    public function getespecialidades_edit( ) {
        $especialidades = $this->ProgramacionModel->getespecialidades_edit();
        echo  json_encode($especialidades); 
    }











}
