<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class ModuloModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();
//553 2727
      //  $this->db = $this->load->database('hipocrates', TRUE);
        $this->load->library('session');
    }
   
    public function Abre_Detalle($query){
  ///    var_dump(iconv('UTF-8', 'LATIN1',$query));exit;
   
    return  $this->db->query(iconv('UTF-8', 'LATIN1',$query) )->result_array();      
      }
       
    public function Abre_Recordset_tablet($query){
      $this->tablet = $this->load->database('tablet', TRUE);
        ///    var_dump(iconv('UTF-8', 'LATIN1',$query));exit;
          return  $this->tablet->query(iconv('UTF-8', 'LATIN1',$query) )->result_array();      
    }

    public function Execute($query){
        ///    var_dump(iconv('UTF-8', 'LATIN1',$query));exit;
          return  $this->db->query(iconv('UTF-8', 'LATIN1',$query) );  
              
    }     
    public function Executetablet($query){
      $this->tablet = $this->load->database('tablet', TRUE);
      ///    var_dump(iconv('UTF-8', 'LATIN1',$query));exit;
        return  $this->tablet->query(iconv('UTF-8', 'LATIN1',$query) );  
            
  }    
    public function Executeinsert($insert){
      $tabla = $insert['tabla'];
      unset($insert['tabla']);
      $array = $insert ;
      foreach(array_keys($insert) as $key){
        if (!is_null($insert[$key])  && !is_bool($insert[$key]) === true)   $array[$key] = iconv('UTF-8','LATIN1', $insert[$key]);
          

    }  
      $this->db->insert($tabla,$array);
      return ($this->db->affected_rows() < 1) ? false : true;
    } 
    public function Executeinserttablet($insert){
      $this->tablet = $this->load->database('tablet', TRUE);

      $tabla = $insert['tabla'];
      unset($insert['tabla']);
      $array = $insert ;
      foreach(array_keys($insert) as $key){
        if (!is_null($insert[$key])  && !is_bool($insert[$key]) === true)   $array[$key] = iconv('UTF-8','LATIN1', $insert[$key]);
          

    }  
      $this->tablet->insert($tabla,$array);
      return ($this->tablet->affected_rows() < 1) ? false : true;
    } 
  public function Executeupdate($update2){
    $login = $this->session->userdata('nom_usu');
    $tabla = $update2["tabla"];
    $id = $update2['id'];
    $valorid = $update2[$id];
    
    if(empty($valorid) || is_null($valorid)){
        return false;
    }
    
    unset($update2['tabla']);
    unset($update2['id']);
    unset($update2[$id]);
    
    if (isset($update2['auditoria']) && $update2['auditoria'] == 'S'){
        $update2["usuario_modificacion"] = $login;
        $array["fecha_modificacion"] = date("Y-m-d H:i:s");
        unset($update2['auditoria']);
    }
    
    foreach(array_keys($update2) as $key){
        if (!is_null($update2[$key]) && !is_bool($update2[$key]) === true){
            $array[$key] = iconv('UTF-8', 'LATIN1', $update2[$key]);
        }
        if (is_bool($update2[$key]) === true){
            $array[$key] = $update2[$key];
        }
        if (is_null($update2[$key])){
            $array[$key] = $update2[$key];
        }
    }
    
    $this->db->where($id, $valorid);
    $this->db->update($tabla, $array);
    
    // Obtener la consulta SQL generada
    $query = $this->db->last_query();
    
    // Mostrar la consulta por consola
    echo "Consulta SQL generada: " . $query;
    
    return ($this->db->affected_rows() < 1) ? false : true;
}
    
    public function CREABEEPER_ATE($Nom , $TXT , $abo) {
      //$nFile = FreeFile;
      //$texto ='';
       $sFile='';
      if (strlen($abo) == 9 ){
        $tb1 = $this->db->query( "SELECT * FROM M_CODIGOS")->row_array();
        $COD_BEP = $tb1['cod_bep'];
        if (is_null($COD_BEP)||empty($COD_BEP)){
          $DACODBEP = 1;
        }else{
            $DACODBEP = $COD_BEP+ 1;
        }

        $this->db->query(iconv('UTF-8', 'LATIN1',"update m_codigos set cod_bep = '".$DACODBEP."' ") );
        
      
          $sFile =  $Nom . "_" . $DACODBEP . ".SER";
      
          $cantidad =  strlen($TXT);
          $loop = intdiv($cantidad, 150);
          for ($i=0; $i < $loop ; $i++) { 
            //$texto =  $texto . substr($TXT,($i*150)+($i!=0?1:0),150).PHP_EOL;
            $texto[$i] = $abo . " " . substr($TXT,$i*150,150).PHP_EOL;
           
          }
          
          if(fmod($cantidad, 150)>0){
            $texto[$loop] =   $abo . " " . substr($TXT, ($loop*150))  ;
          }
          $textofinal =  implode("", $texto);
      }
      file_put_contents('//10.6.16.15/sistemas$/Beepers/Doctores'. $sFile,  $textofinal);
   return $texto;
    }
    public   function  DACODBEP() {
      //Dim DB As Database
       //Set DB = OpenDatabase("N:\Bd.mdb")
     //Set tb = g_db.execute("M_CODIGOS", dbDenyRead)
       //Set TB1 = G_db.Execute("SELECT * FROM M_CODIGOS")
     //TB1.Close
        
         
       /*   $tb1 = $this->db->query( "SELECT * FROM M_CODIGOS")->row_array();
         $COD_BEP = $tb1['cod_bep'];
         if (is_null($COD_BEP)||empty($COD_BEP)){
           $DACODBEP = 1;
         }else{
             $DACODBEP = ((int) (trim($COD_BEP)) )+ 1;
         }

         $this->db->query(iconv('UTF-8', 'LATIN1',"update set cod_bep = '".$DACODBEP."' m_codigos") );
         return $DACODBEP ; */


   }   
    public function BUSCA_COD_EMP($ls_CodGru=0) {
       $rst_emp = $this->db->query( "SELECT * FROM t_grupo_emp WHERE cod_gru = '" . $ls_CodGru . "'")->row_array();
      $cod_emp = $rst_emp['cod_emp'];
      if (is_null($cod_emp)||empty($cod_emp)){
        $BUSCA_COD_EMP = $ls_CodGru;
      }else{
          $BUSCA_COD_EMP = trim($cod_emp);
      }
      return $BUSCA_COD_EMP ;
    }
 
    public function SMS($numero,$pac,$cod_ate){
      $array_sms = array();
      $fecha = $this->db->query("select fecha + interval '24 hour' > current_timestamp horas24 from t_encuesta_dolor_abdominal_sms where cod_ate = '".$cod_ate."' order by correl desc limit 1;")->row_array();
      
      if ( is_null($fecha)){
         $fecha = 't';
      }else{
        $fecha = $fecha["horas24"];
      }  
     
      $sms1fechahora = $this->db->query("select  to_char(CAST(now() as timestamp without time zone), 'YYYY-MM-DD HH24:MI:SS') fechahora")->row_array()["fechahora"];

      if ( $fecha =='f'){
         return "24horas";
      }  
      $context = stream_context_create(array(
          'ssl' => array(
          'verify_peer' => false,
          'verify_peer_name' => false,
          'allow_self_signed' => true
          )
      ));

      $url = "http://api.esmoviles.com/sms/sms.wsdl";

    
      try {
       $client = new SoapClient($url, array('stream_context' => $context) );
       
       $result = $client->smsSendSoap( "DOCTORSAC", "DOCTOR2022*",51, $numero,"Estimada Sr(a) ".$pac.", en caso de continuar con dolor abdominal a pesar del tratamiento, por favor comunicarse al 635 5000 Op5./Op3.","");
       if (substr($result,0,2) == '-1'){
        var_dump($result);
exit();
          return  false;
       }
        $query = $this->db->query("insert into  t_encuesta_dolor_abdominal_sms values (".$cod_ate.",(select coalesce(max(correl),0) + 1  from t_encuesta_dolor_abdominal_sms where cod_ate =".$cod_ate."),'".$sms1fechahora."','".$numero."')");

       return ($this->db->affected_rows() >= 0) ? true : false;
    
      } catch ( SoapFault $e ) {
       return  false;
      }
  }

  public function Visor_SITEDS($cod_ate){
    log_message('info', "Inicio creacion siteds");
     $this->load->helper('sf_helper');
    $querysms = $this->db->query("SELECT ate.cod_ate,  to_char(ate.fec_ate,'YYYY') ||'\\\\'||to_char(ate.fec_ate , 'MM')||'-'||substring(to_char(ate.fec_ate, 'TMMONTH') from 1 for 3)||'\\\\'  AS str_carpeta  , trim(ate.cod_gru) cod_gru, clasif.u_negocio,clasif.cod_clasif, docstds.CodigoAutorizacion, docstds.DocumentoAutorizacion FROM h_SITEDS_documento_autorizacion docstds  INNER JOIN t_tmpllamadas ate ON docstds.cod_ate = ate.cod_ate AND ate.cod_aut_prestacion = docstds.CodigoAutorizacion INNER JOIN m_clasificacion_pac clasif ON ate.clasificacion_pac = clasif.cod_clasif WHERE  docstds.cod_ate = " . $cod_ate )->row_array();
    
    log_message('info', "SELECT ate.cod_ate,  to_char(ate.fec_ate,'YYYY') ||'\\\\'||to_char(ate.fec_ate , 'MM')||'-'||substring(to_char(ate.fec_ate, 'TMMONTH') from 1 for 3)||'\\\\'  AS str_carpeta  , trim(ate.cod_gru) cod_gru, clasif.u_negocio,clasif.cod_clasif, docstds.CodigoAutorizacion, docstds.DocumentoAutorizacion FROM h_SITEDS_documento_autorizacion docstds  INNER JOIN t_tmpllamadas ate ON docstds.cod_ate = ate.cod_ate AND ate.cod_aut_prestacion = docstds.CodigoAutorizacion INNER JOIN m_clasificacion_pac clasif ON ate.clasificacion_pac = clasif.cod_clasif WHERE  docstds.cod_ate = " . $cod_ate);
     
    $str_carpeta = "";
    if (!is_null($querysms)) {
      log_message('info',"dentro". $querysms["u_negocio"]);
 
      switch ($querysms["u_negocio"]){     
          case 1:
          //AGUDO y ESPECIALISTA
            switch ($querysms["cod_gru"] ){
              case "489":
              case "106":
              case "044":    //PACF VIDA, PACF SEG, PACF EPS
                  $str_carpeta = "\\\\10.6.16.15\\Sistemas$\Atenciones Directas Pacifico\\" . $querysms["str_carpeta"];
                  break;
              case "111":                  //FEBAN
                  $str_carpeta = "F:\FEBAN" . $querysms["str_carpeta"];
              break;
            }
          break;
          case 2:
              //CRONICO MAXI, CRONICO POSITIVA
              switch ($querysms["cod_gru"] ){
                  case "489":
                  case "106":
                  case "044":    //PACF VIDA, PACF SEG, PACF EPS;
                      $str_carpeta = "F:\CCS\MAXISALUD\SITEDS\PACIFICO" . $querysms["str_carpeta"];
                      break;
                  case "009":
                  case "545":
                  case "133":    //POSITIVA
                      $str_carpeta = "F:\CCS\MAXISALUD\SITEDS\LA POSITIVA" . $querysms["str_carpeta"];
                      break;
              }
          break;
          case 3:
              switch ($querysms["cod_clasif"] ){
                  case 26:
                      $str_carpeta = "F:\SITEDS CALL MEDICO" . $querysms["str_carpeta"];
                      break;
              }
          break;
      }
    /*   if (is_dir($str_carpeta)) { */
      log_message('info', "documentoautorizacion".$querysms["documentoautorizacion"]);
      $data = base64_decode($querysms["documentoautorizacion"]);
      file_put_contents($str_carpeta.$querysms["cod_ate"]."_".$querysms["codigoautorizacion"].'.pdf',  ($data));
      log_message('info', "Se creo ".$str_carpeta.$querysms["cod_ate"]."_".$querysms["codigoautorizacion"].'.pdf');

      //fopen($str_carpeta."testfile.txt", "w");
       
         
      /* } else {
        try {
        //  $str = exec('start "C:\Windows\System32\cmd.exe" /c "C:\Eureka\htdocs\programacionmedica\siteds.bat"');
        //  shell_exec("MKDIR W:\Ejemplo2");
        system( 'notepad');
          return  "prueba";
        } catch (Exception $e) {
          return $e->getMessage();
        }
      
          return "The directory no exists.";
      } */
     /*  exists = System.IO.Directory.Exists(str_carpeta)
      If exists = False Then
          System.IO.Directory.CreateDirectory(str_carpeta)
      End If */

      //File.WriteAllBytes(str_carpeta & dtb_siteds.Rows(0)("cod_ate") & "_" & dtb_siteds.Rows(0)("CodigoAutorizacion") & ".pdf", Convert.FromBase64String(dtb_siteds.Rows(0)("DocumentoAutorizacion")))
       
    }else{
      log_message('info', "Fuera de consultar");
      //MsgBox("El codigo SITEDS consultado no se ha generado en el sistema Solución Médica; no se puede ver el archivo PDF", MsgBoxStyle.Information, "SOLUCION MEDICA")
    }


 
  }
  public function Visor_SITEDS2($cod_ate){
      
      
        try {
         // $str = exec('start "C:\Windows\System32\cmd.exe" /c "C:\Eureka\htdocs\programacionmedica\siteds.bat"');
          $str =  shell_exec(' cd "C:\Program Files\nodejs\"; node "C:\Eureka\htdocs\formularionutricion\src\solucionmedica.js";');

        //  shell_exec("MKDIR "C:\Eureka\htdocs\programacionmedica\folder");
      
          
        } catch (Exception $e) {
          return $e->getMessage();
        }
      
       
      
        return  "prueba";

 
  }

  public function  REGISTRA_AUDITORIA_LABORATORIO($lsestado , $lsobs , $lscambios, $lcodservlaboratorio){
    $login =  $this->session->userdata('nom_usu');
    $fec_reg  =  date("Y-m-d");
    $hora_reg =   date("H:i:s");
    $this->db->query("INSERT INTO h_auditoria_laboratorio (estado, fec_reg_audi, hor_reg_audi, usu_reg_audi, obs_audi, cambio_audi, cod_serv_laboratorio) " .
   " VALUES ('" . $lsestado . "', '" . $fec_reg . "', '" .  $hora_reg . "', '" . $login . "', '" . $lsobs . "', '" . $lscambios . "', '" . $lcodservlaboratorio . "')");
  }
  public function P_TXT_LAB($VCODSERV_LAB){
    $forma_pago   = '';

    $rs_serv_laboratorio = $this->db->query("select * from vw_datos_servicio_laboratorio Where cod_serv_laboratorio = " . $VCODSERV_LAB);

    if ($rs_serv_laboratorio["for_ate"] == "E" ){
        $forma_pago = "EFECTIVO";
    }else if ($rs_serv_laboratorio["for_ate"] == "C" ){
        $forma_pago = "CREDITO";
    }else if ($rs_serv_laboratorio["for_ate"] == "T" ){
        $forma_pago = "TARJETA";
    }else if ($rs_serv_laboratorio["for_ate"] == "F" ){
        $forma_pago = "TRANSFERENCIA";
    }
/*
    Open "F:\LABORATORIO\" & rs_serv_laboratorio!cod_serv_laboratorio & ".txt" For Output As #1
    Print #1, "NUMERO DE SERVICIO     :   " & Trim(rs_serv_laboratorio!cod_serv_laboratorio)
    Print #1, "FECHA DE SERVICIO      :   " & Format(Trim(rs_serv_laboratorio!fecha_servicio), "dd-mm-yyyy")
    Print #1, "GRUPO                  :   " & Trim(rs_serv_laboratorio!nom_gru)
    /* Dim rs_serv_laboratorio         As New ADODB.Recordset
    Dim rs_serv_laboratorio_pruebas As New ADODB.Recordset
    Dim rst_clasif                  As New ADODB.Recordset

On Error GoTo errorr



Call Abre_Recordset(rst_clasif, "SELECT * from f_clasificacion(" & rs_serv_laboratorio!cod_ate & ")")
If Trim(rst_clasif!f_clasificacion) <> "" Then
    Print #1, "PRODUCTO               :   " & Trim(rst_clasif!f_clasificacion)
Else
    Print #1, "PRODUCTO               :   " & "AGUDO"
End If

Print #1, "PACIENTE               :   " & Trim(rs_serv_laboratorio!nom_pac)
Print #1, "DOCUMENTO IDENTIDAD    :   " & Trim(rs_serv_laboratorio!descripcion_doc_id) & " : " & Trim(rs_serv_laboratorio!num_doc_id)
Print #1, "FECHA NAC.             :   " & Trim(rs_serv_laboratorio!fnac_pac)
Print #1, "EDAD                   :   " & Trim(rs_serv_laboratorio!edad_pac) & "Años"
Print #1, "DIRECCION - DISTRITO   :   " & rs_serv_laboratorio!Direccion & " " & rs_serv_laboratorio!nro_dir_lote & " " & rs_serv_laboratorio!dir_dpto_interior & " - " & rs_serv_laboratorio!des_dis
Print #1, "REFERENCIA             :   " & rs_serv_laboratorio!referencia
Print #1, "TELEFONO MOVIL         :   " & Trim(rs_serv_laboratorio!tlf_celular)
Print #1, "TELEFONO FIJO          :   " & Trim(rs_serv_laboratorio!tlf_dir)
Print #1, "COASEGURO              :   " & rs_serv_laboratorio!tar_ate
Print #1, "FORMA DE PAGO          :   " & forma_pago
Print #1, "NOMBRE DEL MEDICO      :   " & rs_serv_laboratorio!nom_doc
Print #1, "OBSERVACION            :   " & rs_serv_laboratorio!observacion
Print #1, "PRUEBAS                :   " & vbTab

Call Abre_Recordset(rs_serv_laboratorio_pruebas, "select descripcion from t_det_lab_serv_laboratorio where cod_serv_laboratorio = " & VCODSERV_LAB)

If Not rs_serv_laboratorio_pruebas.EOF Then
    Do While Not rs_serv_laboratorio_pruebas.EOF
        Print #1, Space(27) & rs_serv_laboratorio_pruebas!Descripcion & vbTab
        rs_serv_laboratorio_pruebas.MoveNext
    Loop
End If

Close #1
rs_serv_laboratorio_pruebas.Close
 
errorr:
If Err.Number = 76 Then
MsgBox "Error, no se ha encontrado la ruta F:/ LABORATORIO, por favor crear directorio", vbCritical
End If
 */
  }

public function add_test($cod_ser, $des_ser, $cod_ate, $obs_ser, $nombre){
    $this->db->query("insert into m_segatenciones (cod_ate, cod_ser, des_ser, obs_ser, usu_ser, fec_ser, hra_ser) values (".$cod_ate.", '".$cod_ser."', '".$des_ser."', '".$obs_ser."', '".$nombre."', CURRENT_DATE, CURRENT_TIME)");
 }

 public function update_flg_encuesta_dolor_abdominal($cod_ate){
     $this->db->query("UPDATE t_tmpllamadas SET flg_encuesta_dolor_abdominal = true WHERE cod_ate = " . $cod_ate);
 }


}


