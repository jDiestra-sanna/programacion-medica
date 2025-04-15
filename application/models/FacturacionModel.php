<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class FacturacionModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();
//553 2727
      //  $this->db = $this->load->database('hipocrates', TRUE);
        $this->load->library('session');
    }
   
    public function registrarempleado($empleado){
        
          $this->db->insert('mae_empleado',$empleado);
        return ($this->db->affected_rows() != 1) ? false : true;
    
    } 
    function deleterecords(){
        $query="delete from h_facturacion_masiva";
        $this->db->query($query);
    }
 
    function saverecords($serie,$correlativo,$id_project,$tipo_project,$fecha_emision,$moneda,$tipo_cambio,$cod_cliente,$afecta_igv,$centro_costo,$periodo, $descripcion_item,$multiglosa,$tarifa_item,$copago_fijo,$copago_variable)
	{
        $descripcion_item2 = iconv('UTF-8', 'LATIN1',$descripcion_item) ;
        
		$query="insert into h_facturacion_masiva values('$serie',$correlativo,'$id_project',$tipo_project,'$fecha_emision','$moneda',$tipo_cambio,'$cod_cliente','$afecta_igv','$centro_costo','$periodo','$descripcion_item2','$multiglosa',$tarifa_item,$copago_fijo,$copago_variable,'true')";
		$this->db->query($query);
    }
    function fecharecepcion($facturas,$usumod)
	{
       
		$query1="UPDATE M_ReGVENTAS SET RECCLI_FAC=FALSE,MARCA_FAC=null,responsable_pago = 'AUTOMATICO',FECRECCLI_FAC=null,USURECCLI_FAC = '".$usumod."' WHERE cod_doc in (".$facturas.")";
        $this->db->query($query1);
		$query2="UPDATE h_comprobante SET flg_frecp_sap = false where  serie_comprobante || '-' || correl_comprobante  in (".$facturas.")";
        $this->db->query($query2);
        return ($this->db->affected_rows() < 1) ? false : true;
    }  

    

    public function get_CE($serie,$numero){
        
        $context = stream_context_create(array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
    ));
  
           // $url = "http://egestor.ubl21.efacturacion.pe/WS_TCI/Service.asmx?WSDL";
    
           $url = "http://10.6.16.9/WS_TCI/Service.asmx?WSDL";
    if (substr($serie,0,1)=='B'){
        $tipocomprobante = "03";
    }else{
        $tipocomprobante = "01";

    }
        try {
         $client = new SoapClient($url, array('stream_context' => $context) );
        // var_dump ($client->__getTypes());
       // $age = array("IndicadorComprobante"=>1, "Serie"=>$serie, "Numero"=>$numero,"TipoComprobante"=>"03","Ruc"=>"20251011461");
        $age = array("oENPeticion"=>array("IndicadorComprobante"=>1, "Serie"=>$serie, "Numero"=>$numero,"TipoComprobante"=>$tipocomprobante,"Ruc"=>"20251011461"),"Cadena"=>"");

     
         $result = $client->Obtener_PDF($age);
        //var_dump($result);
      /*    $myfile = fopen($result->Obtener_PDFResult->NombrePDF, "w") or die("Unable to open file!");
         $txt =  $result->Obtener_PDFResult->ArchivoPDF;
         fwrite($myfile, $txt); 
         fclose($myfile); */


         return (base64_encode ($result->Obtener_PDFResult->ArchivoPDF ));
        } catch ( SoapFault $e ) {
            
         return  $e->getMessage()+"";
        }
    }

    public function get_XML($a,$b){
        set_time_limit(0);
        ini_set('memory_limit', -1);
        $facturas  = "FC01-6";
        $msj ="";  $i=0;
        $facturasarray = explode(",", $facturas);
        
        $context = stream_context_create(array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
    ));
  
           // $url = "http://egestor.ubl21.efacturacion.pe/WS_TCI/Service.asmx?WSDL";
    
           $url = "http://10.6.16.9/WS_TCI/Service.asmx?WSDL";
           
    
        try {
         $client = new SoapClient($url, array('stream_context' => $context) );
    
         foreach($facturasarray as $factura){
            $facturasend = explode("-", trim($factura));
            $serie = $facturasend[0];  
            $numero = $facturasend[1];  
                if (substr($serie,0,1)=='B'){
                    $tipocomprobante = "03";
                }else{
                    $tipocomprobante = "01";
                }
            $age = array("oENPeticion"=>array("IndicadorComprobante"=>1, "Serie"=>$serie, "Numero"=>$numero,"TipoComprobante"=>$tipocomprobante,"Ruc"=>"20251011461"),"Cadena"=>"");
 
          $result = $client->Obtener_XML($age);
         // var_dump($result);
          $cadena = $result->Cadena;
         if (  empty($cadena)){
            sleep(3);
            $myfile = fopen($result->Obtener_XMLResult->NombreXML, "w") or die("Unable to open file!");
            $txt =  $result->Obtener_XMLResult->ArchivoXML;
            fwrite($myfile, $txt); 
            fclose($myfile);
            $msj = $msj.( ($result->Obtener_XMLResult->cadena)) ."\n";
             
         }else{

            $msj = $msj.$cadena." ".$serie."-".$numero."\n";
            
        
         } 
        }
         return  $msj;
        } catch ( SoapFault $e ) {
            
         return  $e->getMessage()+"";
        }
    }
 
}