<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class AtencionclienteModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();


        $this->load->helper('sf_helper');
         $this->load->library('session');
    }
   

   
    public function generarreporte($fecini,$fecfin){
        set_time_limit(0);
        ini_set('max_execution_time', 0); // 0 = Unlimited
         
        ini_set('memory_limit', '4096M');
      
        $query0 = $this->db->query("select * from f_get_reporte_incidencia('2090-01-01','2090-01-01') ;");
       
        $field_array = $query0->list_fields();   
        //if ($fecini==$fecfin){
           //   $query1  = $this->db->query("select * from  reporte_incidencia where fec_ate >= '".$fecini."';");
        //}else{
              $query1  = $this->db->query("select * from  f_get_reporte_incidencia('".$fecini."','".$fecfin."') ;");
        //}
        $query = utf8_converter( $query1->result_array()); 
        array_unshift($query,  $field_array);
    
        $i=0;
        foreach ($query as $value) {
                $query[$i] = array_values($value);
                $i++;
        }
 
       return  $query;
    
    }
    public function generarreportemadvnr($fecini,$fecfin){
        $query0 = $this->db->query("select * from VW_MAD_VNR limit 1");

        $field_array = $query0->list_fields();
        if ($fecini==$fecfin){
            $query1 = $this->db->query("select * from  VW_MAD_VNR where fec_ate >= '".$fecini."';");
        }else{ 
            $query1 = $this->db->query("select * from  VW_MAD_VNR where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;");
        }
        $data = $query1->result_array(); 

       array_unshift($data,  $field_array);

       return $data; 

   } 
    public function AdataSNC($estado){
                if ($estado == "0"){
                    $sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1'  AND tipo_seg = 'SNC' ";

                }elseif ($estado == "1") {
                    $sqlq = "select * from m_servnoconforme where (tip_serv='PsS' or  tip_serv='Act' or  tip_serv='Adm') and activi = '1'  AND tipo_seg = 'INCIDENCIA' ";

                }elseif ($estado == "2") {
                    $sqlq = "select * from m_servnoconforme where tip_serv='PsS' and activi = '1'  AND tipo_seg = 'DERIVADO' ";

                }elseif ($estado == "5") {
                    $sqlq = "select * from m_servnoconforme where (tip_serv='PsS' or  tip_serv='Act' or  tip_serv='Adm') and activi = '1'  AND tipo_seg = 'CERRADO' ";

                }
        return  $this->db->query($sqlq)->result_array();      
    }

    public function actualizarseguimiento($obs_ser,$txtCodServ,$cod_snc,$fec_ser,$hra_ser,$tipo_registro,$reclamo,$fecha_fin){

        $query = $this->db->query("update  m_segatenciones  set  reclamo='' where cod_ate = ".$txtCodServ." and obs_ser not like ':CERRADO:%'");
        
        if($fecha_fin <> 'NO APLICA'){    
            $query = $this->db->query("update  m_segatenciones  set  cod_snc ='".$cod_snc."', obs_ser = '".strtoupper($obs_ser). "' ,tipo_registro='".$tipo_registro."' ,reclamo='".$reclamo."' ,fec_finalizado='".$fecha_fin."'  where cod_ate = ".$txtCodServ." and fec_ser='".$fec_ser."' and hra_ser='".$hra_ser."'");
        }
        else{    
            $query = $this->db->query("update  m_segatenciones  set  cod_snc ='".$cod_snc."', obs_ser = '".strtoupper($obs_ser). "' ,tipo_registro='".$tipo_registro."' ,reclamo='".$reclamo."' ,fec_finalizado=NULL  where cod_ate = ".$txtCodServ." and fec_ser='".$fec_ser."' and hra_ser='".$hra_ser."'");
        }

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function quitarseguimiento($txtCodServ,$fec_ser,$hra_ser){
        
        $query = $this->db->query("delete from   m_segatenciones    where cod_ate = ".$txtCodServ." and fec_ser='".$fec_ser."' and hra_ser='".$hra_ser."'");

        return ($this->db->affected_rows() >= 0) ? true : false;
    }
    public function generarreporteatenciones($fecini,$fecfin,$porfecha){
        set_time_limit(0);
        ini_set('max_execution_time', 0); // 0 = Unlimited
         
        ini_set('memory_limit', '4096M');


        $consulta = " SELECT DISTINCT ON (ate.cod_ate) ate.fec_ate,
        ate.cm_estado,
        ate.cod_ate,
        ate.feclla_ate,
        ate.horlla_ate,
        COALESCE(ate.num_operacion_ap, ''::character varying) AS numero_ap,
        COALESCE(ate.cod_asig::character varying, ''::bpchar::character varying) AS cod_asig,
        COALESCE(ate.usulla_ate, ''::bpchar) AS usuario_crea,
        COALESCE(ate.tar_ate::character varying, ''::character varying) AS deducible,
        COALESCE(ate.coaseguro::character varying, ''::character varying) AS coaseguro,
        COALESCE(ate.nom_pac, ''::bpchar) AS nom_pac,
        COALESCE(ate.cel_pac, ''::bpchar) AS cel_pac,
        COALESCE(ate.edad_ate::character varying, ''::character varying) AS edad_ate,
        COALESCE(ate.sexo_ate, ''::bpchar) AS sexo_ate,
        COALESCE(ate.pac_vip, ''::character varying) AS pac_vip,
        COALESCE(ate.cm_tiempo::character varying, ''::character varying) AS cm_tiempo,
        COALESCE(seg.obs_ser, ''::text) AS obs_ser,
        COALESCE(seg2.obs_ser, ''::text) AS obs_ser2,
        COALESCE(ate.hor_ate::character varying, ''::character varying) AS hora_defecto,
        COALESCE(ate.usuoplla_ate, ''::bpchar) AS usu_confirma_llegada,
        COALESCE(ate.fecoplla_ate::character varying, ''::character varying) AS fecoplla_ate,
        COALESCE(ate.horoplla_ate::character varying, ''::character varying) AS horoplla_ate,
        COALESCE((ate.fecoplla_ate + ate.horoplla_ate - (ate.feclla_ate + ate.horlla_ate))::character varying, ''::character varying) AS calc_llegada,
        COALESCE(ate.fecdia_ate::character varying, ''::character varying) AS fecha_finate,
        COALESCE(ate.hordia_ate::character varying, ''::character varying) AS hora_finate,
        COALESCE((ate.fecdia_ate + ate.hordia_ate - (ate.fecoplla_ate + ate.horoplla_ate))::character varying, ''::character varying) AS tiempo_casa,
        COALESCE(ate.f_prog, ''::bpchar) AS f_prog,
        COALESCE(ate.nom_doc, ''::character varying) AS nom_doc,
        COALESCE(esp.nom_esp, ''::bpchar) AS nom_esp,
        COALESCE(ate.nom_gru, ''::bpchar) AS nom_gru,
            CASE
                WHEN ate.flg_reprogramada = true THEN 'SI'::text
                ELSE 'NO'::text
            END AS flg_reprogramada,
            CASE
                WHEN ate.flgvnr = true THEN 'SI'::text
                ELSE 'NO'::text
            END AS flgvnr,
        COALESCE(audirpg.obs_audi, ''::character varying) AS obs_audi,
        clasif.nom_clasif,
        COALESCE(dist.zona_cm, ''::character varying) AS zona_cm,
        COALESCE(dist.cod_zona, ''::bpchar) AS subzona,
            CASE
                WHEN ate.cm_flag_vip = true THEN 'SI'::text
                ELSE 'NO'::text
            END AS cm_flag_vip,
        COALESCE(ate.horasgdr_ate::character varying, ''::character varying) AS hora_confirma_datosdr,
        COALESCE(ate.fecasgdr_ate::character varying, ''::character varying) AS fecha_confirma_datosdr,
        COALESCE(ate.usuasgdr_ate, ''::bpchar) AS usu_confirma_datosdr,
        COALESCE(ate.flg_ficha, ''::bpchar) AS flg_ficha,
        COALESCE(ate.dni_titular, ''::character varying) AS dni_titular,
        COALESCE(ate.cod_aut_prestacion, ''::character varying) AS cod_aut_prestacion,
        COALESCE(ate.cod_asegurado, ''::character varying) AS cod_asegurado,
        COALESCE(ate.poliza_asegurado, ''::character varying) AS poliza_asegurado,
        COALESCE(ate.tipo_afiliacion, ''::character varying) AS tipo_afiliacion,
        COALESCE(ate.cod_solgen, ''::character varying) AS cod_solgen,
        COALESCE(mcs.descripcion_categoria, ''::character varying) AS categoria_atencion,
        COALESCE(docid.descripcion_doc_id, ''::character varying) AS tipo_doc_identidad,
        COALESCE(m_pacientesdrmas.num_doc_id, ''::character varying) AS num_doc_id,
        COALESCE(ubi.departamento, ''::character varying) AS departamento,
        COALESCE(ubi.provincia, ''::character varying) AS provincia,
        COALESCE(ubi.distrito, ''::character varying) AS distrito,
            CASE
                WHEN ate.clasificacion_pac = ANY (ARRAY[1, 2, 12, 200, 201, 202, 203, 20, 24, 26, 31, 33]) THEN 'LLAMADA'::character varying
                ELSE COALESCE(mrp.descripcion, ''::character varying)
            END AS agendamiento,
        COALESCE(ate.descrp_zona, ''::character varying) AS descrp_zona,
        COALESCE(ate.fecdrlla_ate::character varying, ''::character varying) AS fecha_confirma_datos,
        COALESCE(ate.hordrlla_ate::character varying, ''::character varying) AS hora_confirma_datos,
        COALESCE(ate.fec_env_sms::character varying, ''::character varying) AS fecha_confirma_mensaje,
        COALESCE(ate.hor_env_sms::character varying, ''::character varying) AS hora_confirma_mensaje,
        COALESCE(ate.fecdia_ate::character varying, ''::character varying) AS fecha_finconsulta_medica,
        COALESCE(ate.hordia_ate::character varying, ''::character varying) AS hora_finconsulta_medica,
        COALESCE(ate.usudia_ate, ''::bpchar) AS usudia_ate,
        COALESCE(audi.fec_reg_audi::character varying, ''::character varying) AS fecha_culminacion,
        COALESCE(audi.hor_reg_audi::character varying, ''::character varying) AS hora_culminacion,
        COALESCE(audi.usu_reg_audi, ''::bpchar) AS usuario_culminacion,
        COALESCE(segculmivalida.fec_ser::character varying, ''::character varying) AS fecha_culminacion_validada,
        COALESCE(segculmivalida.hra_ser::character varying, ''::character varying) AS hora_culminacion_validada,
        COALESCE(segculmivalida.usu_ser, ''::bpchar) AS usuario_culminacion_validada,
            CASE
                WHEN ate.motivo_tipo_prog = 0 THEN 'PROGRAMADA (MEDICO BILINGÜE)'::text
                WHEN ate.motivo_tipo_prog = 1 THEN 'PROGRAMADA (MEDICO MUJER)'::text
                WHEN ate.motivo_tipo_prog = 2 THEN 'PROGRAMADA (MEDICO PERUANO)'::text
                WHEN ate.motivo_tipo_prog = 3 THEN 'PROGRAMADA (SOLICITO MEDICO ESPECIFICO)'::text
                WHEN ate.motivo_tipo_prog = 4 THEN 'PROGRAMADA (FECHA Y HORA)'::text
                ELSE ''::text
            END AS motivo_programacion,
        COALESCE(ate.fecasgdr_ate::character varying, ''::character varying) AS fecha_asignacion_dr,
        COALESCE(ate.horasgdr_ate::character varying, ''::character varying) AS hora_asignacion_dr,
        COALESCE(ate.tipo_ate, ''::character varying) AS condicion,
        COALESCE(ate.for_ate, ''::character varying::bpchar) AS forma_pago,
        (((COALESCE(dir.des_dir, ''::character varying::bpchar)::text || ' '::text) || COALESCE(dir.nro_dir_lote, ''::character varying::bpchar::character varying)::text) || ' '::text) || COALESCE(dir.dir_dpto_interior, ''::character varying::bpchar::character varying)::text AS direccion,
        COALESCE(ate.ref_dir, ''::character varying::bpchar) AS direccion_referencia,
        COALESCE(siteds.nombrecontratante, ''::character varying) AS contratante,
        COALESCE(ate.cm_aseg_producto, ''::character varying) AS producto,
        COALESCE(siteds.codigotitular, ''::character varying) AS codigotitular,
        COALESCE(siteds.codigocobertura, ''::character varying) AS codigocobertura,
        COALESCE(chof.nom_mot, ''::bpchar) AS nom_mot,
        COALESCE(chof.cod_almacen, 0) AS cod_almacen,
        COALESCE(ntbl.descripcion_nut, ''::character varying) AS motivo_anulacion,
        COALESCE(mconoserv.descripcion_conocimiento, ''::character varying) AS conocimiento_servicio,
        COALESCE(audiconf.usu_reg_audi, ''::bpchar) AS usuario_conf_datos_pac
       FROM m_pacientesdrmas
         JOIN mae_documento_identidad docid ON m_pacientesdrmas.id_doc_id = docid.id_doc_id
         JOIN t_tmpllamadas ate ON m_pacientesdrmas.cod_hia = ate.cod_tit
         JOIN m_especialidades esp ON ate.cod_esp = esp.cod_esp
         JOIN m_clasificacion_pac clasif ON ate.clasificacion_pac = clasif.cod_clasif
         LEFT JOIN t_doctorxchofer chof ON ate.cod_asig = chof.cod_asig
         LEFT JOIN h_siteds_documento_autorizacion siteds ON ate.cod_ate = siteds.cod_ate
         LEFT JOIN t_cm_audi_estado audi ON ate.cod_ate = audi.cod_ate AND audi.cm_estado::text = '8'::text
         LEFT JOIN t_cm_audi_estado audirpg ON ate.cod_ate = audirpg.cod_ate AND audirpg.cm_estado::text = '3->RP2'::text
         LEFT JOIN t_cm_audi_estado audiconf ON ate.cod_ate = audiconf.cod_ate AND audiconf.cm_estado::text = '2->3'::text
         LEFT JOIN m_segatenciones seg ON ate.cod_ate = seg.cod_ate AND seg.cod_snc = '542'::bpchar
         LEFT JOIN m_segatenciones seg2 ON ate.cod_ate = seg2.cod_ate AND seg2.cod_snc = '514'::bpchar
         LEFT JOIN m_segatenciones segculmivalida ON ate.cod_ate = segculmivalida.cod_ate AND segculmivalida.obs_ser = 'FICHA VALIDADA'::bpchar::text
         LEFT JOIN mae_medio_registro_prestacion mrp ON ate.id_mrp = mrp.id_mrp
         LEFT JOIN m_direcciones dir ON ate.cod_dir = dir.cod_dir AND m_pacientesdrmas.cod_hia = dir.cod_tit
         LEFT JOIN m_distritos dist ON ate.cod_dis = dist.cod_dis
         LEFT JOIN mae_categoria_servicio_cliente mcs ON ate.cod_categoria_serv_cliente = mcs.cod_categoria_serv_cliente AND ate.cod_gru = mcs.cod_gru
         JOIN mae_ubigeo ubi ON dist.ubigeo_dist::text = ubi.ubigeo::text
         LEFT JOIN mae_motivo_no_tablet ntbl ON ate.cod_no_tlb = ntbl.cod_no_tlb
         LEFT JOIN t_tmpllamadas_conocimiento_servicio atecs ON atecs.cod_ate = ate.cod_ate
         LEFT JOIN mae_conocimiento_servicio mconoserv ON atecs.cod_conocimiento = mconoserv.cod_conocimiento";





        $query0 = $this->db->query("$consulta limit 1");
        
        $field_array = $query0->list_fields();
        if($porfecha == "creacion"){
            if ($fecini==$fecfin){
                $query = $this->db->query(" $consulta where feclla_ate = '".$fecini."';")->result_array();
            }else{
                 $query = $this->db->query(" $consulta where feclla_ate >= '".$fecini."' and feclla_ate<='".$fecfin."' ;")->result_array();
            }
        }else if($porfecha == "atencion"){
            if ($fecini==$fecfin){
                $query = $this->db->query("$consulta where fec_ate = '".$fecini."';")->result_array();
            }else{
                 $query = $this->db->query("$consulta where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;")->result_array();
            }
        }

        //$query = $this->db->query("select * from vw_atencion_completa where cod_ate = 3266961;")->result_array();
        array_unshift($query,  $field_array);

        $i=0;
        foreach ($query as $value) {
                $query[$i] = array_values($value);
                $i++;
        }


       return  $query;
      // exit; 
   
   }
   public function generarreportemadatencion($fecini,$fecfin){
    $query = $this->db->query("select * from  VW_MAD_ATENCION where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;");
   return $query->result_array(); 
    }
    public function generarreportemadpedido($fecini,$fecfin){
        $query = $this->db->query("select * from  VW_MAD_PEDIDO where fec_ate >= '".$fecini."' and fec_ate<='".$fecfin."' ;");
       return $query->result_array(); 
        }
}