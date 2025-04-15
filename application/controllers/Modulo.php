 <?php
defined('BASEPATH') OR exit('No direct script access allowed');
  
class Modulo extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
          $this->load->model('ModuloModel');
          $this->load->library(array('ion_auth'));
          $this->load->helper('sf_helper');
         date_default_timezone_set("America/Lima");
        setlocale(LC_TIME, 'spanish');
    }
     
  public function permite_ingreso($codigo = 0){
      
    $Data = json_decode(file_get_contents('php://input'), true);
    $codigo = $Data['codigo'];
    echo json_encode($this->ion_auth->is_admincodigo($codigo));
		   
  }     
    public function Abre_Detalle() {
 
        $Data = json_decode( file_get_contents('php://input'), true);
         $query =   $Data['query'] ;
     
        $Abre_Detalle = $this->ModuloModel->Abre_Detalle($query);   
         echo  json_encode(utf8_converter($Abre_Detalle)); 
      }
    public function Abre_Recordset_tablet(){
      $Data = json_decode( file_get_contents('php://input'), true);
      $query =   $Data['query'] ;
     
      $Abre_Recordset_tablet = $this->ModuloModel->Abre_Recordset_tablet($query);   
       echo  json_encode(utf8_converter($Abre_Recordset_tablet)); 
      
    }

     public function ENVIAR_MAIL(){
      $this->load->library('email');
 /*      ini_set('SMTP', "smtp.gmail.com");
      ini_set('smtp_port', "587");
      ini_set("username","magaly.valderrama@sanna.pe");  
      ini_set("password",'rodrigo180904'); */

      $Data = json_decode( file_get_contents('php://input'), true);
      $s_User =   $Data['s_User'] ;
      $s_PassWord =   $Data['s_PassWord'] ;
      $s_Asunto =   $Data['s_Asunto'] ;
      $s_to =   $Data['s_to'] ;
      $s_cc =   $Data['s_cc'] ;
      $s_body =   $Data['s_body'] ;

 
      $config = Array(
        'smtp_crypto' => "tls",
        'protocol' => 'smtp',
        'smtp_host' => 'smtp.gmail.com',
        'smtp_port' => 587,
        'smtp_timeout'=>'30',
        'smtp_user' => $s_User, 
        'smtp_pass' => $s_PassWord, 
        'mailtype' => 'html', 
        'charset' => 'UTF-8',
        'wordwrap' => TRUE
      ); 
      $this->email->initialize($config);
            $this->email->set_newline("\r\n");
        
            $this->email->from($s_User);
            $this->email->to($s_to);
            $this->email->cc($s_cc); 

            $this->email->subject($s_Asunto);
            $this->email->message($s_body );
            //$this->email->attach('C:\PROGRAMACION_MEDICA\programacion_medica.xlsx');
            if($this->email->send())
          {
            return true;//'Correo enviado.';
          }
          else
          {
          return show_error($this->email->print_debugger());
          } 
      
      }

      public function enviar_solicitud(){
        $this->load->library('email');
     
        ini_set('SMTP', "smtp.gmail.com");
        ini_set('smtp_port', "587");
        ini_set("username","magaly.valderrama@sanna.pe");  
        ini_set("password",'rodrigo180904'); 

        $s_User =   'drmas.epidemiologia.central@sanna.pe' ;
        $s_PassWord =   'Sanna2023';
        //$s_Asunto =   'OMITIR CORREO DE PRUEBA';
        //$s_to =   'drmas.cronicos@sanna.pe';
        $s_to =   'drmas.cronicos@sanna.pe';
        $Data = json_decode( file_get_contents('php://input'), true);

        $Text = $Data['Text'] ; 
        $txtantecedentes =  $Data['txtantecedentes'] ; 
        $txtsintoma =  $Data['txtsintoma'] ; 
        $txtfisico =  $Data['txtfisico'] ; 
        $txtdiagnostico =  $Data['txtdiagnostico'] ; 
        $txtmedicamento =  $Data['txtmedicamento'] ; 
        $txtexa_aux =  $Data['txtexa_aux'] ; 
        $paciente =  $Data['paciente'] ; 
        $seguro =  $Data['seguro'] ; 

        $config = Array(
          'smtp_crypto' => "tls",
          'protocol' => 'smtp',
          'smtp_host' => 'smtp.gmail.com',
          'smtp_port' => 587,
          'smtp_timeout'=>'30',
          'smtp_user' => $s_User, 
          'smtp_pass' => $s_PassWord, 
          'mailtype' => 'html', 
          'charset' => 'UTF-8',
          'wordwrap' => TRUE
        ); 

              $this->email->initialize($config);   
              // Establecer la cadena de nueva línea 
              $this->email->set_newline("\r\n"); 
              // Configurar el correo electrónico 
              $this->email->from($s_User);
              $this->email->to($s_to);  
              $this->email->subject("SOLICITUD DE DR+ CRONICOS // $paciente");
              // Agregar saltos de línea al mensaje 
              $this->email->set_mailtype('html');
              $message = '<html><body>';
              $message .= '<p>Estimados DR+ Crónicos, por favor tomar contacto con el paciente, actualmente recibe seguimiento de salud por cuadro Dx. Dolor Abdominal, paciente refiere que no cuenta con la información del programa dado sus antecedentes, su apoyo para la atención correspondiente.</p>'; 
              $message .= '<p>Aseguradora:'.$seguro.'<p>';
              $message .= '<p>HISTORIA CLINICA:<p>';
              $message .= '<textarea style ="width:100%" rows=20 >' .$Text.$txtantecedentes.$txtsintoma.$txtfisico.$txtdiagnostico.$txtmedicamento.$txtexa_aux. '</textarea>';
              $message .= '<p>Gracias<p>';
              $message .= '</body></html>';
              $this->email->message($message);  
              // Enviar el correo electrónico 

              //$this->email->attach('C:\PROGRAMACION_MEDICA\programacion_medica.xlsx');
              if($this->email->send())
            {
              return true;//'Correo enviado.';
            }
            else
            {
            return show_error($this->email->print_debugger());
            } 
        
        }

        public function guardarsnc(){
		
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
          $prueba = $this->ModuloModel->add_test($cod_ser, $des_ser, $cod_ate, $obs_ser, $nombre);   
          json_encode($prueba); 
      
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
      function get_session() {
        echo json_encode($this->session->userdata('nom_usu'));
      } 

      public function Execute() {
 
        $Data = json_decode( file_get_contents('php://input'), true);
         $query =   $Data['query'] ;
     
        $Execute = $this->ModuloModel->Execute($query);   
         echo  json_encode(($Execute)); 
      }
      public function Executetablet() {
 
        $Data = json_decode( file_get_contents('php://input'), true);
         $query =   $Data['query'] ;
     
        $Execute = $this->ModuloModel->Executetablet($query);   
         echo  json_encode(($Execute)); 
      }
      public function Executeinsert() {
 
        $insert = json_decode( file_get_contents('php://input'), true);
          
        $Executeinsert = $this->ModuloModel->Executeinsert($insert);   
         echo  json_encode(($Executeinsert)); 
      } 
      public function Executeinserttablet() {
 
        $insert = json_decode( file_get_contents('php://input'), true);
          
        $Executeinserttablet = $this->ModuloModel->Executeinserttablet($insert);   
         echo  json_encode(($Executeinserttablet)); 
      } 
      
      public function CREABEEPER_ATE() {
 
        $beeper = json_decode( file_get_contents('php://input'), true); 
        $Nom = $beeper['Nom'] ;
        $TXT = $beeper['TXT'] ;
        $abo = $beeper['abo'] ;
        $result = $this->ModuloModel->CREABEEPER_ATE($Nom,$TXT,$abo);   
        echo  json_encode($result); 
      }
      public function Executeupdate() {
 
        $update = json_decode( file_get_contents('php://input'), true);
         
     
        $Executeupdate = $this->ModuloModel->Executeupdate($update);   
        echo  json_encode(($Executeupdate)); 
      }
      //eliminar
      public function Adata2($rowno=0) {
  
        $Data = json_decode(file_get_contents('php://input'), true);
        $query =  $Data['query']; 
        $data = utf8_converter($this->ModuloModel->Adata2($query) ) ;
        echo   json_encode($data);
             
      }
      public function BUSCA_COD_EMP($ls_CodGru=0) {
        $Data = json_decode(file_get_contents('php://input'), true);
        $ls_CodGru =  $Data['ls_CodGru']; 
        $data =  ($this->ModuloModel->BUSCA_COD_EMP($ls_CodGru) ) ;
        echo   json_encode($data);
    
      }

      public function  P_GUARDA_SEGUIMIENTO( ){
    
      $data = json_decode( file_get_contents('php://input'), true);
      $insert['cod_ate'] =  $data['cod_ate'];
      $insert['obs_ser'] =  $data['obs_ser'];
      $insert['cod_ser'] =  "1";
      $insert['des_ser'] =  $data['des_ser'];  
      $insert['usu_ser'] =  $this->session->userdata('nom_usu');
      $insert['fec_ser'] =  date("Y-m-d");  
      $insert['hra_ser'] =  date("H:i:s");  
      
      if ($data['cod_snc'] != "" ){
        $insert['cod_snc'] = $data['cod_snc']; 
      }   
      $insert['tabla'] =  "m_segatenciones";

      $Executeinsert = $this->ModuloModel->Executeinsert($insert);   
       echo  json_encode(($Executeinsert)); 
      }

      public function  REGISTRA_CM_AUDITORIA(){
      $data = json_decode( file_get_contents('php://input'), true);
      $ll_cod_ate =  $data['ll_cod_ate'];
      $ls_estado =  $data['ls_estado'];
      $ls_cambios =  $data['ls_cambios'];
      $ls_obs =  $data['ls_obs'];

 
      $rs_audi = $this->ModuloModel->Abre_Detalle("SELECT * FROM t_cm_audi_estado WHERE cod_ate = " . $ll_cod_ate . " ORDER BY audi_orden DESC");   

       
      if (count($rs_audi)==0){
          $l_orden_audi = 1;
          $lv_dif_auditoria = date("Y-m-d H:i:s");   
          
      }else{
          $l_orden_audi = $rs_audi[0]['audi_orden'] + 1;
          $lv_fecha =   ($rs_audi[0]['fec_reg_audi']);
          $lv_hora =    ($rs_audi[0]['hor_reg_audi']);
          $lv_dif_auditoria =  $lv_fecha .' '. $lv_hora ;
          
          if (array_key_exists("1",$rs_audi)){
            $lv_dif_auditoria1 =      (new DateTime($rs_audi[1]['fec_reg_audi'].' '.$rs_audi[1]['hor_reg_audi']))->diff(new DateTime($lv_dif_auditoria));
            
          }else{
            
          }
   
      }
      
      $query ="INSERT INTO t_cm_audi_estado ( cod_ate, cm_estado, fec_reg_audi, hor_reg_audi, usu_reg_audi, obs_audi, cambio_audi, audi_orden) VALUES (" . $ll_cod_ate . ", '" . $ls_estado . "', '" . date("Y-m-d") . "', '" . date("H:i:s") . "', '" . $this->session->userdata('nom_usu') . "', '" . substr($ls_obs, 0, 49) . "', '" . $ls_cambios . "', " . $l_orden_audi  . ")";
 
      $Execute = $this->ModuloModel->Execute($query);   
      echo  json_encode(($Execute)); 
     
      
      
     }

    public function   DACODATE() {
     
    $cod_ate =  ($this->ModuloModel->Abre_Detalle("SELECT cod_ate FROM M_CODIGOS") )['0']['cod_ate'] ;
    $cod_ate = $cod_ate + 1;
    if ($cod_ate == 999999){
      $cod_ate = $cod_ate + 1;
    }
    
    $this->ModuloModel->Execute("UPDATE M_CODIGOS SET COD_ate='" . $cod_ate . "' ") ;

    echo json_encode($cod_ate);
    }


    public function   Correlativo_Serv_Laboratorio() {
     
      $codigo =  ($this->ModuloModel->Abre_Detalle("SELECT codigo FROM m_cod_servicios  where id='3'") )['0']['codigo'] ;
      $codigo = $codigo + 1;
      if (is_null($codigo)){
        $codigo = $codigo + 1;
      }
      
      $this->ModuloModel->Execute("UPDATE m_cod_servicios SET codigo='" . $codigo . "' where id='3' ") ;
  
      echo json_encode($codigo);
      }
    public function CalculaCambioActual() {
      $dolar =  ($this->ModuloModel->Abre_Detalle("SELECT * FROM OPE_R_TIPODECAMBIO_D order by fec_cam desc limit 1") )['0']['tip_cam'] ;
   
    echo json_encode($dolar);
    }

    public function SMS() {
        $Data = json_decode(file_get_contents('php://input'), true);
        $numero = $Data['numero'];
        $pac = $Data['pac'];
        $cod_ate = $Data['cod_ate'];
        $resultado = $this->ModuloModel->SMS( $numero,$pac,$cod_ate); 
        echo  json_encode($resultado); 
    }
    public function Visor_SITEDS() {
      $Data = json_decode(file_get_contents('php://input'), true);
      $cod_ate = $Data['cod_ate'];
      $resultado = $this->ModuloModel->Visor_SITEDS( $cod_ate); 
      echo  json_encode($resultado); 
    }
    public function Visor_SITEDS2() {
      $Data = json_decode(file_get_contents('php://input'), true);
      $cod_ate = $Data['cod_ate'];
      $resultado = $this->ModuloModel->Visor_SITEDS2( $cod_ate); 
      echo  json_encode($resultado); 
    }

    public function update_flg_encuesta_dolor_abdominal(){
      $Data = json_decode(file_get_contents('php://input'), true);
      $cod_ate = $Data['cod_ate'];
      $booleano = $Data['booleano'];
      $resultado = $this->ModuloModel->ModuloModel->update_flg_encuesta_dolor_abdominal($cod_ate);
      echo  json_encode($resultado); 
    }

}
  



  