<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class DeliveryModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();



         $this->load->library('session');
    }
   

   
    public function get_medicamentos(){
           $this->sap = $this->load->database('sap', TRUE);
        $query = $this->db->query("select '' stockdisponible,trim(medi.cod_med) cod_med,trim(medi.des_med) des_med,trim(medi.cod_lab) cod_lab,trim(coalesce(medi.cod_presentacion,'')) presenta_med,
        (case when audi.estado = 0 then 'POR VALIDAR'   when audi.estado = 1 then 'OBSERVADO'  when audi.estado = 2 then 'SIN IMAGEN'  when audi.estado = 3 then 'VALIDADO' else 'POR VALIDAR' end ) des_estado,
         coalesce(audi.estado,0) estado, coalesce(u_syp_dfam,'') u_syp_dfam,coalesce(u_syp_dsfam,'') u_syp_dsfam,audi.fecha fecha_actualizacion,audi.usuario, case when(audi.error_nombre_laboratorio) = true then 'SI' else 'NO' end error_nombre_laboratorio,case when(audi.nombre_duplicado) = true then 'SI' else 'NO' end nombre_duplicado,case when audi.costado_p = 0 then 'POR VALIDAR' when audi.costado_p  = 1 then 'OBSERVADO' when audi.costado_p  = 2 then 'SIN IMAGEN' when audi.costado_p = 3 then 'VALIDADO' else 'POR VALIDAR' end costado_pequeno,case when audi.costado_m = 0 then 'POR VALIDAR' when audi.costado_m  = 1 then 'OBSERVADO' when audi.costado_m  = 2 then 'SIN IMAGEN' when audi.costado_m = 3 then 'VALIDADO' else 'POR VALIDAR' end costado_mediano,case when audi.costado_g = 0 then 'POR VALIDAR' when audi.costado_g  = 1 then 'OBSERVADO' when audi.costado_g  = 2 then 'SIN IMAGEN' when audi.costado_g = 3 then 'VALIDADO' else 'POR VALIDAR' end costado_grande,case when audi.frontal_p = 0 then 'POR VALIDAR' when audi.frontal_p  = 1 then 'OBSERVADO' when audi.frontal_p  = 2 then 'SIN IMAGEN' when audi.frontal_p = 3 then 'VALIDADO' else 'POR VALIDAR' end frontal_pequeno,case when audi.frontal_m = 0 then 'POR VALIDAR' when audi.frontal_m  = 1 then 'OBSERVADO' when audi.frontal_m  = 2 then 'SIN IMAGEN' when audi.frontal_m = 3 then 'VALIDADO' else 'POR VALIDAR' end frontal_mediano,case when audi.frontal_g = 0 then 'POR VALIDAR' when audi.frontal_g  = 1 then 'OBSERVADO' when audi.frontal_g  = 2 then 'SIN IMAGEN' when audi.frontal_g = 3 then 'VALIDADO' else 'POR VALIDAR' end frontal_grande,case when audi.posterior_p = 0 then 'POR VALIDAR' when audi.posterior_p  = 1 then 'OBSERVADO' when audi.posterior_p  = 2 then 'SIN IMAGEN' when audi.posterior_p = 3 then 'VALIDADO' else 'POR VALIDAR' end posterior_pequeno,case when audi.posterior_m = 0 then 'POR VALIDAR' when audi.posterior_m  = 1 then 'OBSERVADO' when audi.posterior_m  = 2 then 'SIN IMAGEN' when audi.posterior_m = 3 then 'VALIDADO' else 'POR VALIDAR' end posterior_mediano,case when audi.posterior_g = 0 then 'POR VALIDAR' when audi.posterior_g  = 1 then 'OBSERVADO' when audi.posterior_g  = 2 then 'SIN IMAGEN' when audi.posterior_g = 3 then 'VALIDADO' else 'POR VALIDAR' end posterior_grande,case when audi.alta_definicion_p = 0 then 'POR VALIDAR' when audi.alta_definicion_p  = 1 then 'OBSERVADO' when audi.alta_definicion_p  = 2 then 'SIN IMAGEN' when audi.alta_definicion_p = 3 then 'VALIDADO' else 'POR VALIDAR' end alta_definicion_posterior,case when audi.alta_definicion_f = 0 then 'POR VALIDAR' when audi.alta_definicion_f  = 1 then 'OBSERVADO' when audi.alta_definicion_f  = 2 then 'SIN IMAGEN' when audi.alta_definicion_f = 3 then 'VALIDADO' else 'POR VALIDAR' end alta_definicion_frontal,case when audi.alta_definicion_c = 0 then 'POR VALIDAR' when audi.alta_definicion_c  = 1 then 'OBSERVADO' when audi.alta_definicion_c  = 2 then 'SIN IMAGEN' when audi.alta_definicion_c = 3 then 'VALIDADO' else 'POR VALIDAR' end alta_definicion_costado,whscode codigoalmacen
         from m_medicamentos2 medi left join t_aud_medicamento_visor audi  on medi.cod_med = audi.cod_med  and   audi.fecha = (select max(fecha) from t_aud_medicamento_visor audit where   audi.vigente =true and audit.cod_med =  audi.cod_med and audi.vigente =true   ) 
         where   activi=true  ");
        $medicamentos_sm = $query->result_array();
        foreach($medicamentos_sm as $x => $val) {
   
            $stockdisponiblesap = $this->sap->query("select TO_INTEGER(\"OnHand\"-\"IsCommited\"+\"OnOrder\") as stockdisponible from B1H_DOCT_PROD.oitw   where   \"ItemCode\" = '".$val["cod_med"]."' and \"WhsCode\" = '".$val["codigoalmacen"]."'")->row_array() ;
            if (is_null($stockdisponiblesap)){
                
            }else{

            //var_dump($medicamentos_sm[$x]["stockdisponible"]);exit();     
            $medicamentos_sm[$x]["stockdisponible"] = $stockdisponiblesap["STOCKDISPONIBLE"];
            }
           
           
        }
        
        return $medicamentos_sm;
    }
    public function get_ecommerce_tablapadre(){
        
     $query = $this->db->query("select 'S'||substring(trim(m.cod_med) from 1 ) sku_padre, coalesce(ep.marketplace_id,'') marketplace_id, coalesce(trim(m.des_med),'') item_title, coalesce(ep.item_url,'https://200.48.199.90:8094'||m.url_costado_grande) item_url, coalesce(ep.item_url2,'https://200.48.199.90:8094'||m.url_frontal_grande) item_url2, coalesce(ep.ubicable,1) ubicable, coalesce(ep.descrip_corta,'') descrip_corta, coalesce(cast(ep.item_rlvn_ordr as varchar),'') item_rlvn_ordr, coalesce(ep.categoria1,'') categoria1, coalesce(ep.subcategoria1,'') subcategoria1, coalesce(ep.categoria2,'') categoria2, coalesce(ep.subcategoria2,'') subcategoria2, coalesce(ep.categoria3,'') categoria3, coalesce(ep.subcategoria3,'') subcategoria3, coalesce(ep.categoria4,'') categoria4, coalesce(ep.subcategoria4,'') subcategoria4, coalesce(ep.categoria5,'') categoria5, coalesce(ep.subcategoria5,'') subcategoria5, coalesce(ep.atributo1_titulo,'') atributo1_titulo, coalesce(ep.atributo1_valor,'') atributo1_valor, coalesce(ep.atributo2_titulo,'') atributo2_titulo, coalesce(ep.atributo2_valor,'') atributo2_valor, coalesce(ep.atributo3_titulo,'') atributo3_titulo, coalesce(ep.atributo3_valor,'') atributo3_valor, coalesce(ep.atributo4_titulo,'') atributo4_titulo, coalesce(ep.atributo4_valor,'') atributo4_valor, coalesce(ep.atributo5_titulo,'') atributo5_titulo, coalesce(ep.atributo5_valor,'') atributo5_valor, coalesce(ep.tags_busqueda,'') tags_busqueda, coalesce(ep.tags_promociones,'') tags_promociones, coalesce(ep.tags_widget,'') tags_widget, coalesce(ep.descripcion1_titulo,'') descripcion1_titulo, coalesce(ep.descripcion1_detalle,'') descripcion1_detalle, coalesce(ep.descripcion2_titulo,'') descripcion2_titulo, coalesce(ep.descripcion2_detalle,'') descripcion2_detalle, coalesce(ep.descripcion3_titulo,'') descripcion3_titulo, coalesce(ep.descripcion3_detalle,'') descripcion3_detalle, coalesce(ep.descripcion4_titulo,'') descripcion4_titulo, coalesce(ep.descripcion4_detalle,'') descripcion4_detalle, coalesce(ep.descripcion5_titulo,'') descripcion5_titulo, coalesce(ep.descripcion5_detalle,'') descripcion5_detalle, coalesce(trim(m.des_med),'') seo_titulo, coalesce(ep.seo_palabras_claves,'') seo_palabras_claves, coalesce(ep.seo_descripcion ,'') seo_descripcion from m_medicamentos2 m left join ecommerce_medicamentos_padre ep on trim(m.cod_med) = substr(ep.sku_padre,2)  where activi = true  ");
     $medicamentos_sm = $query->result_array();
     
     
     return $medicamentos_sm;
    }
    
    public function get_ecommerce_tablahijo(){
        
        $query = $this->db->query("select  * from ecommerce_medicamentos_hijo ");
        $medicamentos_sm = $query->result_array();
        
        
        return $medicamentos_sm;
       }
       public function get_ecommerce_tablahijoxpadre($sku_padre){
        
        $query = $this->db->query("select  * from ecommerce_medicamentos_hijo where sku_padre ='".$sku_padre."'");
        $medicamentos_sm = $query->result_array();
        
        
        return $medicamentos_sm;
       }
 public function get_ecommerce_tablapadre_fields(){
     
    $query = $this->db->query("SELECT table_schema, table_name, column_name,case when trim(is_nullable)='NO' then '#f7ba00' else '#1cc50d' end color FROM information_schema.columns WHERE   table_name = 'ecommerce_medicamentos_padre'  ;");
    $field_array = $query->result_array();
    return $field_array;
}
public function get_ecommerce_tablahijo_fields(){ 
    $query = $this->db->query("SELECT table_schema, table_name, column_name,case when trim(is_nullable)='NO' then '#f7ba00' else '#1cc50d' end color FROM information_schema.columns WHERE   table_name = 'ecommerce_medicamentos_hijo'  ;");
    $field_array = $query->result_array(); 
    return $field_array;
}
public function guardar_medicamentopadre($medicamento){ 
    if( $medicamento['item_rlvn_ordr'] == ''){
        $medicamento['item_rlvn_ordr'] = 'null';
    }else{

    }
        $query = $this->db->query(iconv('UTF-8', 'LATIN1',"select * from  f_insert_ecommerce_medicamentos_padre('".$medicamento['sku_padre']."','".$medicamento['marketplace_id']."','".$medicamento['item_title']."','".$medicamento['item_url']."','".$medicamento['item_url2']."',".$medicamento['ubicable'].",'".$medicamento['descrip_corta']."',".$medicamento['item_rlvn_ordr'].",'".$medicamento['categoria1']."','".$medicamento['subcategoria1']."','".$medicamento['categoria2']."','".$medicamento['subcategoria2']."','".$medicamento['categoria3']."','".$medicamento['subcategoria3']."','".$medicamento['categoria4']."','".$medicamento['subcategoria4']."','".$medicamento['categoria5']."','".$medicamento['subcategoria5']."','".$medicamento['atributo1_titulo']."','".$medicamento['atributo1_valor']."','".$medicamento['atributo2_titulo']."','".$medicamento['atributo2_valor']."','".$medicamento['atributo3_titulo']."','".$medicamento['atributo3_valor']."','".$medicamento['atributo4_titulo']."','".$medicamento['atributo4_valor']."','".$medicamento['atributo5_titulo']."','".$medicamento['atributo5_valor']."','".$medicamento['tags_busqueda']."','".$medicamento['tags_promociones']."','".$medicamento['tags_widget']."','".$medicamento['descripcion1_titulo']."','".$medicamento['descripcion1_detalle']."','".$medicamento['descripcion2_titulo']."','".$medicamento['descripcion2_detalle']."','".$medicamento['descripcion3_titulo']."','".$medicamento['descripcion3_detalle']."','".$medicamento['descripcion4_titulo']."','".$medicamento['descripcion4_detalle']."','".$medicamento['descripcion5_titulo']."','".$medicamento['descripcion5_detalle']."','".$medicamento['seo_titulo']."','".$medicamento['seo_palabras_claves']."','".$medicamento['seo_descripcion']."')"));
    
    return ($this->db->affected_rows() >= 0) ? true : false;
}
public function guardar_medicamentohijo($sku_padre,$sku){ 
    
    $query = $this->db->query("select  url_costado_grande,url_frontal_grande,url_posterior_grande from m_medicamentos2 where trim(cod_med) ='".ltrim($sku_padre, 'S')."'");
    $urls = $query->row_array();
    
    if(is_null($urls['url_costado_grande'])){
        $url_costado_grande  =  'null';
    }else{
        $url_costado_grande = 'https://200.48.199.90:8094'.$urls['url_costado_grande'];
    }
    if(is_null($urls['url_frontal_grande'])){
        $url_frontal_grande  =  'null';
    }else{
        $url_frontal_grande = 'https://200.48.199.90:8094'.$urls['url_frontal_grande'];
    }
    if(is_null($urls['url_posterior_grande'])){
        $url_posterior_grande  =  'null';
    } else{
        $url_posterior_grande = 'https://200.48.199.90:8094'.$urls['url_posterior_grande'];
    }
    if( substr( $sku, -1) == 'C' ){
        $presentacion = "Caja" ;    
    }else{
        $presentacion = "Blister" ;    
    }
    $query = $this->db->query(iconv('UTF-8', 'LATIN1',"insert into ecommerce_medicamentos_hijo(sku_padre,sku,url1_imagen_sku,url2_imagen_sku,url3_imagen_sku,atributo1_titulo,atributo1_valor,atributo2_titulo,atributo2_valor,price,sale_price,cantidad,peso)
    values('$sku_padre','$sku','$url_costado_grande','$url_frontal_grande','$url_posterior_grande','Presentacion','$presentacion','','',0,0,0,1)"));
 
    return ($this->db->affected_rows() >= 0) ? true : false;
}
public function delete_medicamentohijo($sku_padre,$sku){  
    $query = $this->db->query("delete from ecommerce_medicamentos_hijo where sku_padre = '".$sku_padre."' and sku='".$sku."'");
    return ($this->db->affected_rows() >= 0) ? true : false;
}

public function guardar_medicamentohijo2($medicamento){ 
    if( $medicamento['price'] == ''){
        $medicamento['price'] = 'null';
    }else{

    }
    if( $medicamento['sale_price'] == ''){
        $medicamento['sale_price'] = 'null';
    }else{

    }
    if( $medicamento['cantidad'] == ''){
        $medicamento['cantidad'] = 'null';
    }else{

    }
    if( $medicamento['peso'] == ''){
        $medicamento['peso'] = 'null';
    }else{

    }
    if( $medicamento['adicional1'] == ''){
        $medicamento['adicional1'] = 'null';
    }else{

    }
        $query = $this->db->query(iconv('UTF-8', 'LATIN1',"select * from  f_insert_ecommerce_medicamentos_hijo('".$medicamento['sku_padre']."','".$medicamento['sku']."','".$medicamento['url1_imagen_sku']."','".$medicamento['url2_imagen_sku']."','".$medicamento['url3_imagen_sku']."','".$medicamento['url4_imagen_sku']."','".$medicamento['url5_imagen_sku']."','".$medicamento['url6_imagen_sku']."',".$medicamento['price'].",".$medicamento['sale_price'].",".$medicamento['cantidad'].",".$medicamento['peso'].",'".$medicamento['atributo1_titulo']."','".$medicamento['atributo1_valor']."','".$medicamento['atributo2_titulo']."','".$medicamento['atributo2_valor']."','".$medicamento['atributo3_titulo']."','".$medicamento['atributo3_valor']."',".$medicamento['adicional1'].")"));
    
    return ($this->db->affected_rows() >= 0) ? true : false;
}
public function get_ecommerce_categoria_fields(){       
    $query = $this->db->query("select * from ecommerce_categoria  ");
    $categoria = $query->list_fields();  
    return $categoria;
}
public function get_ecommerce_categoria(){       
    $query = $this->db->query("select id,descripcion,case when activo = true then 'ACTIVO' else 'INACTIVO' end activo from ecommerce_categoria order by id");
    $categoria = $query->result_array();
    return $categoria;
}
public function get_ecommerce_insert_categoria($id,$descripcion,$activo){       
    $this->db->query("insert into ecommerce_categoria values (".$id.",'".strtoupper(iconv('UTF-8', 'LATIN1',$descripcion))."',".$activo.")");
   
    return ($this->db->affected_rows() >= 0) ? true : false; 
}
public function get_ecommerce_update_categoria($id,$descripcion,$activo){       
    $this->db->query("update ecommerce_categoria set descripcion='".strtoupper(iconv('UTF-8', 'LATIN1',$descripcion))."',activo=".$activo." where id=".$id.";");
    return ($this->db->affected_rows() >= 0) ? true : false; 
}
public function get_ecommerce_insert_subcategoria($id,$descripcion,$activo,$id_categoria){       
    $this->db->query("insert into ecommerce_sub_categoria values (".$id.",'".strtoupper(iconv('UTF-8', 'LATIN1',$descripcion))."',".$activo.",".$id_categoria.")"); 
    return ($this->db->affected_rows() >= 0) ? true : false; 
}
public function get_ecommerce_update_subcategoria($id,$descripcion,$activo,$id_categoria){       
    $this->db->query("update ecommerce_sub_categoria set descripcion='".strtoupper(iconv('UTF-8', 'LATIN1',$descripcion))."',activo=".$activo.",id_categoria=".$id_categoria." where id=".$id.";");
    return ($this->db->affected_rows() >= 0) ? true : false; 
}
/* 
public function get_ecommerce_update_categoria(){       
    $query = $this->db->query("select id,descripcion,case when activo = true then 'ACTIVO' else 'INACTIVO' end activo from ecommerce_categoria order by id");
    $categoria = $query->result_array();
    return $categoria;
} */
public function get_ecommerce_id_last_categoria(){       
    $query = $this->db->query("select (coalesce(max(id),0) + 1)  as id from ecommerce_categoria ");
    $categoria = $query->row_array();
    return $categoria["id"];
}
public function get_ecommerce_subcategoria_fields(){
        
    $query = $this->db->query("select * from ecommerce_sub_categoria  ");
    $categoria = $query->list_fields();
    
    
    return $categoria;
} 
public function get_ecommerce_id_last_subcategoria(){       
    $query = $this->db->query("select (coalesce(max(id),0) + 1)  as id from ecommerce_sub_categoria ");
    $categoria = $query->row_array();
    return $categoria["id"];
}
public function get_presentaciones(){ 
    $this->tablet2 = $this->load->database('tablet', TRUE);
    $query = $this->tablet2->query("select * from presentacionmedicamento");
    $presentaciones = $query->result_array(); 
    return $presentaciones;
}
public function get_ecommerce_subcategoria(){ 
    $query = $this->db->query("select s.id,s.descripcion,case when s.activo = true then 'ACTIVO' else 'INACTIVO' end activo,c.descripcion categoria,s.id_categoria
    from ecommerce_sub_categoria s left join ecommerce_categoria c on s.id_categoria = c.id order by id ");
    $categoria = $query->result_array(); 
    return $categoria;
}
public function get_ecommerce_subcategoriaxidcategoria($idcategoria){ 
    $query = $this->db->query("select s.id,s.descripcion,case when s.activo = true then 'ACTIVO' else 'INACTIVO' end activo,c.descripcion categoria,s.id_categoria
    from ecommerce_sub_categoria s left join ecommerce_categoria c on s.id_categoria = c.id where c.id = ".$idcategoria." order by id ");
    $categoria = $query->result_array(); 
    return $categoria;
}
    public function get_medicamento($cod_med){
        $login = trim($this->session->userdata('nom_usu'));
        $selectmed = $this->db->query("select t_aud_medicamento_visor.*,url_costado_pequeno,url_costado_mediano,url_costado_grande,url_frontal_pequeno,url_frontal_mediano,url_frontal_grande,url_posterior_pequeno,url_posterior_mediano,url_posterior_grande,url_alta_definicion_costado,url_alta_definicion_frontal,url_alta_definicion_posterior from t_aud_medicamento_visor    join m_medicamentos2 on t_aud_medicamento_visor.cod_med = m_medicamentos2.cod_med where t_aud_medicamento_visor.cod_med ='".$cod_med."' and t_aud_medicamento_visor.vigente = true and t_aud_medicamento_visor.nro_registro = (select max(nro_registro) from t_aud_medicamento_visor  where cod_med ='".$cod_med."')");
        $count =  $selectmed->num_rows();
        if($count==0){
            $query = $this->db->query("insert into t_aud_medicamento_visor(cod_med,estado,descripcion,fecha,usuario,error_nombre_laboratorio,nombre_duplicado,nro_registro,vigente,posterior_g,posterior_m,posterior_p,frontal_g,frontal_m,frontal_p,costado_g,costado_m,costado_p,alta_definicion_c,alta_definicion_f,alta_definicion_p) values ('".$cod_med."',0,'POR VALIDAR',current_timestamp,'".$login."',false,false,(select coalesce(max(nro_registro),0)+1  from t_aud_medicamento_visor where cod_med='".$cod_med."'),true,0,0,0,0,0,0,0,0,0,0,0,0)");
            //$selectmed = $this->db->query("select * from t_aud_medicamento_visor visor where cod_med ='".$cod_med."' and vigente = true and estado = (select max(estado) from t_aud_medicamento_visor  where cod_med ='".$cod_med."')");
            $selectmedresult = $this->db->query("select t_aud_medicamento_visor.*,url_costado_pequeno,url_costado_mediano,url_costado_grande,url_frontal_pequeno,url_frontal_mediano,url_frontal_grande,url_posterior_pequeno,url_posterior_mediano,url_posterior_grande,url_alta_definicion_costado,url_alta_definicion_frontal,url_alta_definicion_posterior  from t_aud_medicamento_visor    join m_medicamentos2 on t_aud_medicamento_visor.cod_med = m_medicamentos2.cod_med where t_aud_medicamento_visor.cod_med ='".$cod_med."' and t_aud_medicamento_visor.vigente = true and t_aud_medicamento_visor.nro_registro = (select max(nro_registro) from t_aud_medicamento_visor  where cod_med ='".$cod_med."')")->row_array();
            $selectmedresult["error_nombre_laboratorio"]  = boolval($selectmedresult["error_nombre_laboratorio"]=='t'?true:false );
            $selectmedresult['nombre_duplicado']  = boolval($selectmedresult['nombre_duplicado']=='t'?true:false );
            $selectmedresult['vigente']  = boolval($selectmedresult['vigente']=='t'?true:false );
        }else{
        
        $selectmedresult = $selectmed->row_array();
        $selectmedresult["error_nombre_laboratorio"]  = boolval($selectmedresult["error_nombre_laboratorio"]=='t'?true:false );
        $selectmedresult['nombre_duplicado']  = boolval($selectmedresult['nombre_duplicado']=='t'?true:false );
        $selectmedresult['vigente']  = boolval($selectmedresult['vigente']=='t'?true:false );
        
        } 
        return $selectmedresult;
    }
    public function get_imagenes($cod_med,$vista){
        $imagenes = array(); 
         
        $base64 = "";
        if($vista=='costado_pequeño'){
        $urlquery = $this->db->query("select url_costado_pequeno  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
        $url_costado_pequeno = $urlquery["url_costado_pequeno"];
        $pequeño =glob(".".str_replace("/","\\",$url_costado_pequeno));
        
                if (count($pequeño)>0){
                $path =  $pequeño[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                //$imagenes['costado_pequeño'] = $base64 ;
                }else{
                    $pequeño =glob('.\images\costado\pequeno\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($pequeño)>0){
                    $path =  $pequeño[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }
        }
        if($vista=='costado_mediano'){   
        $urlquery = $this->db->query("select url_costado_mediano  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
        $url_costado_mediano = $urlquery["url_costado_mediano"];
        $mediano =glob(".".str_replace("/","\\",$url_costado_pequeno));
                if (count($mediano)>0){
                    $path =  $mediano[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                    //$imagenes['costado_mediano'] = $base64 ;
                }else{
                    $mediano =glob('.\images\costado\mediano\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($mediano)>0){
                    $path =  $mediano[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }
        }
        if($vista=='costado_grande'){
            $urlquery = $this->db->query("select url_costado_grande  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_costado_grande = $urlquery["url_costado_grande"];
            $grande =glob(".".str_replace("/","\\",$url_costado_grande));
                if (count($grande)>0){
                $path =  $grande[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                //$imagenes['costado_grande'] = $base64 ;
                }else{
                    $grande =glob('.\images\costado\grande\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($grande)>0){
                    $path =  $grande[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }
        }
        if($vista=='frontal_pequeño'){
            $urlquery = $this->db->query("select url_frontal_pequeno  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_frontal_pequeno = $urlquery["url_frontal_pequeno"];
            $pequeño =glob(".".str_replace("/","\\",$url_frontal_pequeno));
                if (count($pequeño)>0){
                    $path =  $pequeño[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                    //$imagenes['frontal_pequeño'] = $base64 ;
                }else{
                    $pequeño =glob('.\images\frontal\pequeno\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($pequeño)>0){
                    $path =  $pequeño[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }
        }
        if($vista=='frontal_mediano'){
            $urlquery = $this->db->query("select url_frontal_mediano  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_frontal_mediano = $urlquery["url_frontal_mediano"];
            $mediano =glob(".".str_replace("/","\\",$url_frontal_mediano));
                if (count($mediano)>0){
                    $path =  $mediano[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                    //$imagenes['frontal_mediano'] = $base64 ;
                }else{
                    $mediano =glob('.\images\frontal\mediano\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($mediano)>0){
                    $path =  $mediano[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }
        }
        if($vista=='frontal_grande'){
            $urlquery = $this->db->query("select url_frontal_grande  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_frontal_grande = $urlquery["url_frontal_grande"];
            $grande =glob(".".str_replace("/","\\",$url_frontal_grande));          
               if (count($grande)>0){
                    $path =  $grande[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                    //$imagenes['frontal_grande'] = $base64 ;
               }else{
                    $grande =glob('.\images\frontal\grande\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($grande)>0){
                    $path =  $grande[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
               }   
        }

        if($vista=='posterior_pequeño'){
            $urlquery = $this->db->query("select url_posterior_pequeno  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_posterior_pequeno = $urlquery["url_posterior_pequeno"];
            $pequeño =glob(".".str_replace("/","\\",$url_posterior_pequeno));  
            
            if (count($pequeño)>0){
            $path =  $pequeño[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
            //$imagenes['posterior_pequeño'] = $base64 ;
            }else{
                $pequeño =glob('.\images\posterior\pequeno\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                if (count($pequeño)>0){
                $path =  $pequeño[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 =   base64_encode( $data); 
                }
            }   
        }
        if($vista=='posterior_mediano'){
            $urlquery = $this->db->query("select url_posterior_mediano  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_posterior_mediano = $urlquery["url_posterior_mediano"];
            $mediano =glob(".".str_replace("/","\\",$url_posterior_mediano));  
            if (count($mediano)>0){
                $path =  $mediano[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                //$imagenes['posterior_mediano'] = $base64 ;
            }else{
                    $mediano =glob('.\images\posterior\mediano\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($mediano)>0){
                    $path =  $mediano[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
            }  
        }
        if($vista=='posterior_grande'){
            $urlquery = $this->db->query("select url_posterior_grande  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_posterior_grande = $urlquery["url_posterior_grande"];
            $grande =glob(".".str_replace("/","\\",$url_posterior_grande));  
            if (count($grande)>0){
                $path =  $grande[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                //$imagenes['posterior_grande'] = $base64 ;
                }else{
                    $grande =glob('.\images\posterior\grande\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($grande)>0){
                    $path =  $grande[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }  
        }
         if($vista=='alta_definicion_costado'){
            $urlquery = $this->db->query("select url_alta_definicion_costado  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_alta_definicion_costado = $urlquery["url_alta_definicion_costado"];
            $costado =glob(".".str_replace("/","\\",$url_alta_definicion_costado));  
            if (count($costado)>0){
                $path =  $costado[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                //$imagenes['alta_definicion_costado'] = $base64 ;
                }else{
                    $costado =glob('.\images\alta_definicion\costado\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($costado)>0){
                    $path =  $costado[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }  
        }
         if($vista=='alta_definicion_frontal'){
            $urlquery = $this->db->query("select url_alta_definicion_frontal  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_alta_definicion_frontal = $urlquery["url_alta_definicion_frontal"];
            $frontal =glob(".".str_replace("/","\\",$url_alta_definicion_frontal));  
            if (count($frontal)>0){
                $path =  $frontal[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                // $imagenes['alta_definicion_frontal'] = $base64 ;
                }else{
                    $frontal =glob('.\images\alta_definicion\frontal\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($frontal)>0){
                    $path =  $frontal[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                }  
         }
          if($vista=='alta_definicion_posterior'){
            $urlquery = $this->db->query("select url_alta_definicion_posterior  from m_medicamentos2 where cod_med ='".$cod_med."'")->row_array();
            $url_alta_definicion_posterior = $urlquery["url_alta_definicion_posterior"];
            $posterior =glob(".".str_replace("/","\\",$url_alta_definicion_posterior)); 
            if (count($posterior)>0){
                $path =  $posterior[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data); 
                //$imagenes['alta_definicion_posterior'] = $base64 ;
                }else{
                    $posterior =glob('.\images\alta_definicion\posterior\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                    if (count($posterior)>0){
                    $path =  $posterior[0];
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $base64 =   base64_encode( $data); 
                    }
                } 
          }
         return $base64 ;
    }
    public function get_imagenes_costado_pequeno($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='costado_pequeño'){
            $grande =glob('.\images\costado\pequeño\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }
    public function get_imagenes_costado_mediano($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='costado_mediano'){
            $grande =glob('.\images\costado\mediano\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            }
          }
         return $base64 ;
    }
    public function get_imagenes_costado_grande($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='costado_grande'){
            $grande =glob('.\images\costado\grande\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }
    
    public function get_imagenes_frontal_pequeno($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='frontal_pequeño'){
            $grande =glob('.\images\frontal\pequeño\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }
    public function get_imagenes_frontal_mediano($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='frontal_mediano'){
            $grande =glob('.\images\frontal\mediano\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            }
          }
         return $base64 ;
    }
    public function get_imagenes_frontal_grande($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='frontal_grande'){
            $grande =glob('.\images\frontal\grande\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }else{
                $grande =glob('.\images\frontal\grande\\'.$cod_med.'*.[jJ][pP][eE][gG]');
                if (count($grande)>0){
                $path =  $grande[0];
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 =   base64_encode( $data); 
                }
            }
          }
         return $base64 ;
    }
    public function get_imagenes_posterior_pequeno($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='posterior_pequeño'){
            $grande =glob('.\images\posterior\pequeño\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }
    public function get_imagenes_posterior_mediano($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='posterior_mediano'){
            $grande =glob('.\images\posterior\mediano\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }
    public function get_imagenes_posterior_grande($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='posterior_grande'){
            $grande =glob('.\images\posterior\grande\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }
    public function get_imagenes_alta_definicion_costado($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='alta_definicion_costado'){
            $grande =glob('.\images\alta_definicion\costado\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }
    public function get_imagenes_alta_definicion_frontal($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='alta_definicion_frontal'){
            $grande =glob('.\images\alta_definicion\frontal\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          }
         return $base64 ;
    }

    public function get_imagenes_alta_definicion_posterior($cod_med,$vista){
        $imagenes = array(); 
        $base64 = '';
        if($vista=='alta_definicion_posterior'){
            $grande =glob('.\images\alta_definicion\posterior\\'.$cod_med.'*.[jJ][pP][gG]');
            if (count($grande)>0){
            $path =  $grande[0];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 =   base64_encode( $data); 
            //$imagenes['alta_definicion_posterior'] = $base64 ;
            }
          } 
         return $base64 ;
    }
    public function save_auditoria($auditoria){
        $login = trim($this->session->userdata('nom_usu'));
      $query2 = $this->db->query("insert into t_aud_medicamento_visor(cod_med,estado,descripcion,fecha,usuario,posterior_g,posterior_m,posterior_p,frontal_g,frontal_m,frontal_p,costado_g,costado_m,costado_p,error_nombre_laboratorio,nombre_duplicado,alta_definicion_c, nro_registro,vigente,comentarios,alta_definicion_f,alta_definicion_p) values ('".$auditoria['cod_med']."',".$auditoria['estado'].",'".$auditoria['des_estado']."',current_timestamp,'".$login."',".$auditoria['posterior_g'].",".$auditoria['posterior_m'].",".$auditoria['posterior_p'].",".$auditoria['frontal_g'].",".$auditoria['frontal_m'].",".$auditoria['frontal_p'].",".$auditoria['costado_g'].",".$auditoria['costado_m'].",".$auditoria['costado_p'].",".(boolval($auditoria['error_nombre_laboratorio']) ? 'true' : 'false').",".(boolval($auditoria['nombre_duplicado']) ? 'true' : 'false').",".$auditoria['alta_definicion_c'].",(select max(nro_registro)+1  from t_aud_medicamento_visor where cod_med='".$auditoria['cod_med']."'),true,'".strtoupper(trim($auditoria['comentarios']))."',".$auditoria['alta_definicion_f'].",".$auditoria['alta_definicion_p'].")");
      return ($this->db->affected_rows() >= 0) ? true : false;
    }  
    public function save_auditoriasinimagen($cod_med){
        $login = trim($this->session->userdata('nom_usu'));    
          $query2 = $this->db->query("insert into t_aud_medicamento_visor(cod_med,estado,descripcion,fecha,usuario, nro_registro,vigente) values ('".$cod_med."',2,'SIN IMAGEN',current_timestamp,'".$login."',(select max(nro_registro)+1  from t_aud_medicamento_visor where cod_med='".$cod_med."'),true)");
      return ($this->db->affected_rows() >= 0) ? true : false;
    }  
    public function save_auditoriavalidar($cod_med){
        $login = trim($this->session->userdata('nom_usu'));
              $query2 = $this->db->query("insert into t_aud_medicamento_visor(cod_med,estado,descripcion,fecha,usuario, nro_registro,vigente) values ('".$cod_med."',3,'VALIDADO',current_timestamp,'".$login."',(select max(nro_registro)+1  from t_aud_medicamento_visor where cod_med='".$cod_med."'),true)");
      return ($this->db->affected_rows() >= 0) ? true : false;
    }  
    public function save_auditoriareiniciar($cod_med){
        $login = trim($this->session->userdata('nom_usu'));    
        $this->db->query("update  t_aud_medicamento_visor set vigente = false where cod_med = '".$cod_med."'");
      $this->db->query("insert into t_aud_medicamento_visor(cod_med,estado,descripcion,fecha,usuario, nro_registro,vigente) values ('".$cod_med."',0,'POR VALIDAR - REINICIADO',current_timestamp,'".$login."',(select max(nro_registro)+1  from t_aud_medicamento_visor where cod_med='".$cod_med."'),true)");
      return ($this->db->affected_rows() >= 0) ? true : false;
    }  
    public function update_url_medicamento($sql){
           $this->db->query($sql);
       return ($this->db->affected_rows() >= 0) ? true : false;
    }  
    
    
    public function get_seguimiento($cod_med){
        $query = $this->db->query("select nro_registro,cod_med,estado,descripcion,fecha,usuario from t_aud_medicamento_visor visor where  cod_med = '".$cod_med."'   order by nro_registro asc ");
        return $query->result_array();
    }  

    public function get_auditoria($cod_med){
        $query = $this->db->query("select cod_med,estado,descripcion,fecha,usuario,posterior_g,posterior_m,posterior_p,frontal_g,frontal_m,frontal_p,costado_g,costado_m,costado_p,error_nombre_laboratorio,nombre_duplicado,alta_definicion_c, nro_registro,comentarios,alta_definicion_f,alta_definicion_p from t_aud_medicamento_visor visor where  cod_med = '".$cod_med."' and vigente = true and estado = 1   order by nro_registro asc ")->row_array();
         
        foreach ($query as $key => $value) {
            if ($value == 't'){
                $query[$key] = true;
            }elseif ($value == 'f'){
                $query[$key] = false;
            }
            
        }
        return $query;
    }
    
    public function update($actualizacion){
        $login = trim($this->session->userdata('nom_usu'));    
        
        $cambios = "";
        if($actualizacion['error_nombre_laboratorio'] || $actualizacion['nombre_duplicado']){
            if($actualizacion['error_nombre_laboratorio']){
                $this->db->query("update  m_medicamentos2 set cod_lab = '".strtoupper(trim($actualizacion['laboratorio']))."' where cod_med = '".$actualizacion['cod_med']."'");
                $cambios = 'LAB:'.$actualizacion['laboratorio'];
            }
            if($actualizacion['nombre_duplicado']){
                 $this->db->query("update  m_medicamentos2 set des_med = '".strtoupper(trim($actualizacion['nombre_medicamento']))."' where cod_med = '".$actualizacion['cod_med']."'");
                 $cambios = $cambios.'DESCRIPCION:'.$actualizacion['nombre_medicamento'];

            }
        }
        if(empty($cambios)){

        }else{
            $this->db->query("insert into t_aud_medicamento(cod_med,nom_usu,id_posicion,tipo_registro,cambios_realizados, fec_reg,hora_reg,estado_reg,ip_reg) values ('".$actualizacion['cod_med']."','".$login."',(select coalesce(max(id_posicion),0)+1  from t_aud_medicamento where cod_med='".$actualizacion['cod_med']."'),'ACTUALIZACION','".$cambios."',cast(now() as date),current_time,1,'".$_SERVER['REMOTE_ADDR']."')");
        }
        $this->db->query("insert into t_aud_medicamento_visor(cod_med,estado,descripcion,fecha,usuario, nro_registro,vigente,posterior_g,posterior_m,posterior_p,frontal_g,frontal_m,frontal_p,costado_g,costado_m,costado_p,error_nombre_laboratorio,nombre_duplicado,alta_definicion_c, alta_definicion_f,alta_definicion_p) values ('".$actualizacion['cod_med']."',3,'VALIDADO',current_timestamp,'".$login."',(select max(nro_registro)+1  from t_aud_medicamento_visor where cod_med='".$actualizacion['cod_med']."'),true,true,true,true,true,true,true,true,true,true,true,true,true,true,true)");
        return ($this->db->affected_rows() >= 0) ? true : false;
    }  
    public function get_tables(){
        $query = $this->db->query("SELECT table_name FROM information_schema.tables where table_name in ('ecommerce_medicamentos_padre','ecommerce_medicamentos_hijo');");
    
        return $query->result_array(); 
        
    }
    
    public function getColumnsByTable($tabla){    
		//$_POST = $this->sanitize($_FPOST); 
		
		 
		
		$result = $this->db->query("SELECT column_name ,data_type ,is_nullable,character_maximum_length, replace(coalesce(REGEXP_REPLACE(column_default, '::.*', ''),'')  , '''', '') column_default  FROM information_schema.columns  WHERE   table_name   = '".$tabla."'")->result_array();
		$pkResult =  $this->db->query("select  kc.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kc on kc.table_name = tc.table_name and kc.table_schema = tc.table_schema and kc.constraint_name = tc.constraint_name where tc.constraint_type = 'PRIMARY KEY'  and kc.ordinal_position is not null  and tc.table_name  = '".$tabla."'")->result_array();
        

		$columnsListHtml = '<ul class="list-group">';

        foreach ($result as $column) { 
            
            $disabled = ( $column == trim((isset($pkResult['column_name'])?$pkResult['column_name']:'')))? 'disabled' : '';
			$columnsListHtml .='<li class="list-group-item list-group-item-action justify-content-between   align-items-center"><div class="row">
								<input type="text" name="column[]" id="column" class="form-control" value="'.  $column["column_name"].'" placeholder="" maxlength="70" hidden>
								
								<div class="col-md-2">
									 
										<label for="name" class="form-label font-weight-bold">Campo:</label>
										<input type="text" name="name[]" id="name" class="form-control" value="'. $column["column_name"].'" placeholder="" maxlength="70" required>
									 
								</div>	
								<div class="col-md-2">
								 
										<label for="iType" class="form-label font-weight-bold">Tipo Campo:</label>
										<select class="form-control" name="iType[]" id="iType">
											<option value="1" '.(strpos($column["data_type"], 'var') !== false ? 'selected="selected"' : "").'>Texto</option>
											<option value="2" '.(strpos($column["data_type"], 'int') !== false ? 'selected="selected"' : "").'>Número entero</option>
                                            <option value="3" '.(strpos($column["data_type"], 'double') !== false ? 'selected="selected"' : "").'>Número decimal</option>
											<option value="4" '.(strpos($column["data_type"], 'date') !== false ? 'selected="selected"' : "").'>Fecha</option>
										</select>
									 
								</div>									
								<div class="col-md-2">
								 
										<label for="maxlength" class="form-label font-weight-bold">Maximo caracteres:</label>
										<input type="number" name="maxlength[]" id="maxlength" class="form-control" value="'. $column["character_maximum_length"].'" placeholder="" number="true" maxlength="50">
									 
								</div>							
								<div class="col-md-2">
									 
										<label for="required" class="form-label font-weight-bold">Obligatorio:</label>
										<select class="form-control" name="required[]" id="required" required>
											<option value="1" '.(strpos($column["is_nullable"], 'NO') !== false ? 'selected="selected"' : "").'>SI</option>
											<option value="0" '.(strpos($column["is_nullable"], 'YES') !== false ? 'selected="selected"' : "").'>NO</option>
										</select>
									 
								</div>	
                                <div class="col-md-2">
								 
                                <label for="label" class="form-label font-weight-bold">Valor por defecto:</label>
                                <input type="text" name="label[]" id="label" class="form-control" value="'.$column["column_default"].'" placeholder="" maxlength="70" required>
                             
                                </div>	
								 								
							</div>
							</li>';
		}
		die  ($columnsListHtml.'</ul>');
	}

    public function getPrimaryColumnsByTable($tabla){    
	  
		 
		
		$result = $this->db->query("select  kc.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kc on kc.table_name = tc.table_name and kc.table_schema = tc.table_schema and kc.constraint_name = tc.constraint_name where tc.constraint_type = 'PRIMARY KEY'  and kc.ordinal_position is not null  and tc.table_name  = '".$tabla."'")->result_array();

		$primaryColumnsListHtml = '';
        foreach ($result as $column) { 
			$primaryColumnsListHtml .= '<option value="' .trim($column['column_name']).'">' . trim($column['column_name']).'</option>';
		}

		die ($primaryColumnsListHtml);
	}
	



}