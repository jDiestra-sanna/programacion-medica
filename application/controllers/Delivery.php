<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Delivery extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
        $this->load->library(array('ion_auth','form_validation','email','pagination'));
        $this->load->model('DeliveryModel');
        $this->load->model('ModuloModel');
        $this->load->helper('date');
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

		}else if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')) 
		{
        
        	redirect('delivery/medicamento');
        
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
         $data1['idscript'] = "show_visor_medicamento.js";   
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
   
  public function medicamento() {
      
   
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{
                
       if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
        $this->getTemplate($this->load->view('/delivery/medicamento',"",true));

       }  
    }
  }
  public function estructura() {
      
   
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{
                
       if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
        $this->getTemplate($this->load->view('/delivery/generator',"",true));

       }  
    }
  }
  public function tablapadre() {
      
   
    if (!$this->ion_auth->logged_in())
    {
    // the user is not logging in so display the login page
        // set the flash data error message if there is one
 
        $this->_render_page('login','');

    }else{
                
       if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
        $this->getTemplate($this->load->view('/delivery/tablapadre',"",true));

       }  
    }
  }
  public function tablahijo() { 
    if (!$this->ion_auth->logged_in())
    { 
        $this->_render_page('login',''); 
    }else{   
       if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
        $this->getTemplate($this->load->view('/delivery/tablahijo',"",true)); 
       }  
    }
  }
  public function categoria() { 
    if (!$this->ion_auth->logged_in())
    { 
        $this->_render_page('login',''); 
    }else{   
       if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
        $this->getTemplate($this->load->view('/delivery/categoria',"",true)); 
       }  
    }
  }
  public function subcategoria() { 
    if (!$this->ion_auth->logged_in())
    { 
        $this->_render_page('login',''); 
    }else{   
       if ($this->ion_auth->is_admin('DELIVERY - MEDICAMENTO')){				
        $this->getTemplate($this->load->view('/delivery/subcategoria',"",true)); 
       }  
    }
  }
  public function get_imagenes(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];

     $rpta = $this->DeliveryModel->get_imagenes($cod_med,$vista);  
      
     echo   ($rpta); 

  }
  


  public function get_imagenes_costado_pequeno(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_costado_pequeno($cod_med,$vista);   
    echo    ($rpta); 
  }
  public function get_imagenes_costado_mediano(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_costado_mediano($cod_med,$vista);   
    echo    ($rpta); 
  }

  public function get_imagenes_costado_grande(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_costado_grande($cod_med,$vista);   
    echo    ($rpta); 
  }

  
  public function get_imagenes_frontal_pequeno(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_frontal_pequeno($cod_med,$vista);   
    echo    ($rpta); 
  }
  public function get_imagenes_frontal_mediano(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_frontal_mediano($cod_med,$vista);   
    echo    ($rpta); 
  }

  public function get_imagenes_frontal_grande(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_frontal_grande($cod_med,$vista);   
    echo    ($rpta); 
  }

  public function get_imagenes_posterior_pequeno(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_posterior_pequeno($cod_med,$vista);   
    echo    ($rpta); 
  }
  public function get_imagenes_posterior_mediano(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_posterior_mediano($cod_med,$vista);   
    echo    ($rpta); 
  }

  public function get_imagenes_posterior_grande(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_posterior_grande($cod_med,$vista);   
    echo    ($rpta); 
  }

  public function get_imagenes_alta_definicion_costado(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_alta_definicion_costado($cod_med,$vista);   
    echo    ($rpta); 
  }

  public function get_imagenes_alta_definicion_frontal(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];
    $rpta = $this->DeliveryModel->get_imagenes_alta_definicion_frontal($cod_med,$vista);   
    echo    ($rpta); 
  }

  public function get_imagenes_alta_definicion_posterior(){
    set_time_limit(0); 
    ini_set('memory_limit', -1);
    $Data = json_decode(file_get_contents('php://input'), true);
    $param = $Data['parametros'];
    $cod_med = $param['cod_med'];
    $vista = $param['vista'];

     $rpta = $this->DeliveryModel->get_imagenes_alta_definicion_posterior($cod_med,$vista);   
      
     echo    ($rpta); 

  }

  public function save_auditoria(){ 

    $Data = json_decode(file_get_contents('php://input'), true);
    $auditoria = $Data['auditoria'];
     $rpta = $this->DeliveryModel->save_auditoria($auditoria);   
     echo  json_encode($rpta); 

  }
  public function save_auditoriasinimagen(){ 

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_med = $Data['cod_med'];
     $rpta = $this->DeliveryModel->save_auditoriasinimagen($cod_med);   
     echo  json_encode($rpta); 

  }
  public function save_auditoriavalidar(){ 

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_med = $Data['cod_med'];
     $rpta = $this->DeliveryModel->save_auditoriavalidar($cod_med);   
     echo  json_encode($rpta); 

  }
  

  public function save_auditoriareiniciar(){ 

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_med = $Data['cod_med'];
    $rpta = $this->DeliveryModel->save_auditoriareiniciar($cod_med);   
    echo  json_encode($rpta); 

  }
  public function get_medicamentos() {
     
  
    $rpta = $this->DeliveryModel->get_medicamentos();   
    echo  json_encode(utf8_converter($rpta)); 
  }      

  public function get_ecommerce_tablapadre() {
     
  
    $rpta = $this->DeliveryModel->get_ecommerce_tablapadre();   
    echo  json_encode(utf8_converter($rpta)); 
  }      
  
  public function get_ecommerce_tablapadre_fields() {
     
  
    $rpta = $this->DeliveryModel->get_ecommerce_tablapadre_fields();   
    echo  json_encode(utf8_converter($rpta)); 
  }      
  public function get_ecommerce_tablahijo_fields() {
     
  
    $rpta = $this->DeliveryModel->get_ecommerce_tablahijo_fields();   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function get_ecommerce_tablahijo() {
  
    $rpta = $this->DeliveryModel->get_ecommerce_tablahijo();   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function get_ecommerce_tablahijoxpadre() {
    $Data = json_decode(file_get_contents('php://input'), true);
    $sku_padre = $Data['sku_padre'];
    $rpta = $this->DeliveryModel->get_ecommerce_tablahijoxpadre($sku_padre);   
    echo  json_encode(utf8_converter($rpta)); 
  }       
  public function get_ecommerce_categoria_fields() {
     
  
    $rpta = $this->DeliveryModel->get_ecommerce_categoria_fields();   
    echo  json_encode(utf8_converter($rpta)); 
  }      
  public function get_ecommerce_categoria() { 
    $rpta = $this->DeliveryModel->get_ecommerce_categoria();   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function get_ecommerce_id_last_categoria() { 
    $rpta = $this->DeliveryModel->get_ecommerce_id_last_categoria();   
    echo  json_encode($rpta); 
  } 
  public function get_ecommerce_insert_categoria() {  
    $Data = json_decode(file_get_contents('php://input'), true);
    $id = $Data['id'];
    $descripcion = $Data['descripcion'];
    $activo = $Data['activo'];
    $rpta = $this->DeliveryModel->get_ecommerce_insert_categoria($id,$descripcion,$activo);   
    echo  json_encode($rpta); 
  } 
  public function get_ecommerce_update_categoria() {  
    $Data = json_decode(file_get_contents('php://input'), true);
    $id = $Data['id'];
    $descripcion = $Data['descripcion'];
    $activo = $Data['activo'];
    $rpta = $this->DeliveryModel->get_ecommerce_update_categoria($id,$descripcion,$activo);   
    echo  json_encode($rpta); 
  } 
  public function get_ecommerce_subcategoria_fields() {
     
  
    $rpta = $this->DeliveryModel->get_ecommerce_subcategoria_fields();   
    echo  json_encode(utf8_converter($rpta)); 
  }      
  public function get_ecommerce_subcategoria() { 
    $rpta = $this->DeliveryModel->get_ecommerce_subcategoria();   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function get_ecommerce_subcategoriaxidcategoria() { 
    $Data = json_decode(file_get_contents('php://input'), true);
    $idcategoria = $Data['idcategoria'];
    $rpta = $this->DeliveryModel->get_ecommerce_subcategoriaxidcategoria($idcategoria);   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function get_ecommerce_id_last_subcategoria() { 
    $rpta = $this->DeliveryModel->get_ecommerce_id_last_subcategoria();   
    echo  json_encode($rpta); 
  }
  public function get_ecommerce_insert_subcategoria() {  
    $Data = json_decode(file_get_contents('php://input'), true);
    $id = $Data['id'];
    $descripcion = $Data['descripcion'];
    $activo = $Data['activo'];
    $id_categoria = $Data['id_categoria'];

    $rpta = $this->DeliveryModel->get_ecommerce_insert_subcategoria($id,$descripcion,$activo,$id_categoria);   
    echo  json_encode($rpta); 
  } 
  public function get_ecommerce_update_subcategoria() {  
    $Data = json_decode(file_get_contents('php://input'), true);
    $id = $Data['id'];
    $descripcion = $Data['descripcion'];
    $activo = $Data['activo'];
    $id_categoria = $Data['id_categoria'];

    $rpta = $this->DeliveryModel->get_ecommerce_update_subcategoria($id,$descripcion,$activo,$id_categoria);   
    echo  json_encode($rpta); 
  } 
  public function get_presentaciones() { 
    $rpta = $this->DeliveryModel->get_presentaciones();   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function get_auditoria() {

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_med = $Data['cod_med'];
    $rpta = $this->DeliveryModel->get_auditoria($cod_med);   
    echo  json_encode(utf8_converter($rpta)); 
  }  
  public function guardar_medicamentopadre() { 
    $Data = json_decode(file_get_contents('php://input'), true);
     
    $medicamentopadre  = $Data['medicamento'] ;
    
    //$rpta = $this->DeliveryModel->guardar_medicamentohijo($hijos,$codigopadre,$cod_medp,$url_costado_grande,$url_frontal_grande,$url_posterior_grande);   
    $rpta = $this->DeliveryModel->guardar_medicamentopadre($medicamentopadre);   
    echo  json_encode($rpta); 
  }  
  public function guardar_medicamentohijo2() { 
    $Data = json_decode(file_get_contents('php://input'), true);
     
    $medicamentohijo  = $Data['medicamento'] ;
    
    //$rpta = $this->DeliveryModel->guardar_medicamentohijo($hijos,$codigopadre,$cod_medp,$url_costado_grande,$url_frontal_grande,$url_posterior_grande);   
    $rpta = $this->DeliveryModel->guardar_medicamentohijo2($medicamentohijo);   
    echo  json_encode($rpta); 
  }   
  public function guardar_medicamentohijo() { 
    $Data = json_decode(file_get_contents('php://input'), true);
    $sku  = $Data["data"]["sku"] ;
    $sku_padre = $Data["data"]["sku_padre"];  
 
    //$rpta = $this->DeliveryModel->guardar_medicamentohijo($hijos,$codigopadre,$cod_medp,$url_costado_grande,$url_frontal_grande,$url_posterior_grande);   
    $rpta = $this->DeliveryModel->guardar_medicamentohijo($sku_padre,$sku);   
    echo  json_encode($rpta); 
  }  
  
  public function delete_medicamentohijo() { 
    $Data = json_decode(file_get_contents('php://input'), true);
    $sku  = $Data["data"]["sku"] ;
    $sku_padre = $Data["data"]["sku_padre"];     
    $rpta = $this->DeliveryModel->delete_medicamentohijo($sku_padre,$sku);   
    echo  json_encode($rpta); 
  }  
  public function upload() {
     
    
           if(isset($_FILES['cargar_imagen']['name'])){
                  $image_name = $_FILES['cargar_imagen']['name'];
                  $valid_extensions = array("jpg","jpeg","png","JPG","JPEG","PNG");
                  $extension = pathinfo($image_name, PATHINFO_EXTENSION);
                  if(in_array(strtolower($extension), $valid_extensions)){
                    $extension = strtolower($extension);
                      $cod_med = $_POST['cod_med'];
                      $tipo_imagen = $_POST['tipo_imagen'];
                      if($tipo_imagen=='costado_p'){
                        $upload_path = '.\\images\costado\pequeno\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/costado/pequeno/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_costado_pequeno = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='costado_m'){
                        $upload_path = '.\\images\costado\mediano\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/costado/mediano/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_costado_mediano = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='costado_g'){
                        $upload_path = '.\\images\costado\grande\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/costado/grande/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_costado_grande = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='frontal_p'){
                        $upload_path = '.\\images\frontal\pequeno\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/frontal/pequeno/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_frontal_pequeno = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='frontal_m'){
                        $upload_path = '.\\images\frontal\mediano\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/frontal/mediano/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_frontal_mediano = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='frontal_g'){
                        $upload_path = '.\\images\frontal\grande\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/frontal/grande/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_frontal_grande = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='posterior_p'){
                        $upload_path = '.\\images\posterior\pequeno\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/posterior/pequeno/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_posterior_pequeno = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='posterior_m'){
                        $upload_path = '.\\images\posterior\mediano\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/posterior/mediano/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_posterior_pequeno = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='posterior_g'){
                        $upload_path = '.\\images\posterior\grande\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/posterior/grande/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_posterior_grande = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='alta_definicion_c'){
                        $upload_path = '.\\images\alta_definicion\costado\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/alta_definicion/costado/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_alta_definicion_costado = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='alta_definicion_f'){
                        $upload_path = '.\\images\alta_definicion\frontal\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/alta_definicion/frontal/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_alta_definicion_frontal = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }elseif($tipo_imagen=='alta_definicion_p'){
                        $upload_path = '.\\images\alta_definicion\posterior\\' . $cod_med . '.' . $extension;
                        $upload_path1 = '/images/alta_definicion/posterior/' . $cod_med . '.' . $extension;
                        $sql = "update m_medicamentos2 set url_alta_definicion_posterior = '".$upload_path1."' where cod_med='".$cod_med."'";
                      }
                      if(move_uploaded_file($_FILES['cargar_imagen']['tmp_name'], $upload_path)){
                        $message = 'Image Uploaded';
                        $image = $upload_path;
                        $rpta = $this->DeliveryModel->update_url_medicamento($sql);   
                         

                      }else{
                      $message = 'There is an error while uploading image';
                      }
                  }else{
                    $message = 'Only .jpg, .jpeg and .png Image allowed to upload';
                  }
            }else{
            $message = 'Select Image';
            }

            $output = array(
            'message'  => $message,
            'image'   => $image,
            'sql'   => $rpta
            );

            echo json_encode($output);
  }  
  public function get_medicamento() {
     
    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_med = $Data['cod_med'];
    $rpta = $this->DeliveryModel->get_medicamento($cod_med);   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function get_seguimiento() {

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_med = $Data['cod_med'];
    $rpta = $this->DeliveryModel->get_seguimiento($cod_med);   
    echo  json_encode(utf8_converter($rpta)); 
  } 
  public function update() {

    $Data = json_decode(file_get_contents('php://input'), true);
     
    $actualizacion = $Data['actualizacion'];
    $rpta = $this->DeliveryModel->update($actualizacion);   
    echo  json_encode(($rpta)); 
  } 

  public function get_tables() {
      return  $this->DeliveryModel->get_tables();
  
  }
  public function getColumnsByTable(){
    $Data = json_decode(file_get_contents('php://input'), true);
    $table =  $_POST['table'];
    
    echo json_encode( $this->DeliveryModel->getColumnsByTable($table)); 
  }
   
  public function getPrimaryColumnsByTable(){
    $Data = json_decode(file_get_contents('php://input'), true);
    
    $table = $_POST['table'];
    
    echo json_encode( $this->DeliveryModel->getPrimaryColumnsByTable($table)); 
  }
}

  