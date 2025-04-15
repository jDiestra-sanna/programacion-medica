<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class ProgramacionModel extends CI_Model {

	
	public function __construct()
    {
        parent::__construct();
	    $this->load->database();
//553 2727
       // $this->db = $this->load->database('hipocrates', TRUE);
        $this->load->library('session');
    }
	
    public function save($prog_doctor,$auditoria){
        $this->db->trans_start();
       
        //$this->db->insert('t_horarios',$horarios); 
        $this->db->insert_batch('t_prog_doctorxturno',$prog_doctor);   
        $this->db->insert_batch('t_aud_agente',$auditoria);   

        $this->db->trans_complete();
        return !$this->db->trans_status() ? false : true;
        
    }


    function crear_direccion($direccion) {
        $this->db->insert('m_direcciones_doctor',$direccion);
        return ($this->db->affected_rows() != 1) ? false : true;
    }
    function eliminar_direccion($cod_doc,   $nro_direccion) {
        $this->db->query("delete from m_direcciones_doctor where cod_doc='".trim($cod_doc)."' and nro_direccion=".$nro_direccion);
        return ($this->db->affected_rows() != 1) ? false : true;
    }
    function editar_direccion($direccion,$cod_doc,$nro_direccion) {
   
       if ((isset($cod_doc)||!empty(trim($cod_doc)))&&(isset($nro_direccion)||!empty(trim($nro_direccion)))){
        $this->db->update('m_direcciones_doctor',$direccion ,array('cod_doc' => $cod_doc,'nro_direccion' => $nro_direccion));
        return ($this->db->affected_rows() != 1) ? false : true;
       }
    }
    //PAPU 27/09/23 se agrega una condición más para que cuente el año actual y no muestre de años pasados
    public function gethorarios($cod_doc = 0,$mes){
        
       // $query = $this->db->query("select cod_doc,string_agg(horas, ',') horas,dia,des_doc,nom_clasif,cod_esp from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc ."' and t_prog_doctorxturno.mes = ".$mes." group by cod_doc ,dia,des_doc,nom_clasif,cod_esp");
       if ($mes <> 1){
        $query = $this->db->query("select cod_asig,cod_doc,horas,dia,des_doc,nom_clasif,cod_esp  from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc ."' and t_prog_doctorxturno.mes = ".$mes. "AND DATE_TRUNC('year', to_timestamp(fecini_asig::text, 'YYYY')) = DATE_TRUNC('year', current_date)");
       }else{
        $query = $this->db->query("select cod_asig,cod_doc,horas,dia,des_doc,nom_clasif,cod_esp  from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc ."' and t_prog_doctorxturno.mes = ".$mes. "AND DATE_TRUNC('year', to_timestamp(fecini_asig::text, 'YYYY')) > DATE_TRUNC('year', current_date)");
       }

       return $query->result_array(); 
    
    }
     //PAPU 27/09/23 se agrega una condición más para que cuente el año actual y no muestre de años pasados
    public function gethorariosestados($cod_doc = 0,$mes){
        
        if ($mes <> 1){
        $query = $this->db->query("select cod_doc, horas,dia,des_doc,nom_clasif,cod_esp,estado_prog from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc ."' and t_prog_doctorxturno.mes = ".$mes."AND DATE_TRUNC('year', to_timestamp(fecini_asig::text, 'YYYY')) = DATE_TRUNC('year', current_date) order by dia");
        }else{
        $query = $this->db->query("select cod_doc, horas,dia,des_doc,nom_clasif,cod_esp,estado_prog from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc ."' and t_prog_doctorxturno.mes = ".$mes."AND DATE_TRUNC('year', to_timestamp(fecini_asig::text, 'YYYY')) > DATE_TRUNC('year', current_date) order by dia");
        } 
        
        return $query->result_array(); 
    
    }
    public function getasignacion_doctor($cod_doc = 0){
        
        $query = $this->db->query("select cod_doc,nom_doc,des_doc,turno,cod_esp,zona,estado_prog,nom_clasif,con_mpos,cod_botiquin,recojo from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc ."' and t_prog_doctorxturno.mes = ".date('m'));
    
        return $query->row_array(); 
    
    }
    public function get_especialidades(){
        
        $query = $this->db->query("select cod_esp, nom_esp from  m_especialidades ");
    
        return $query->result_array(); 
    
    }
    public function getEmails(){
        
        $query = $this->db->query("select  trim(medico_email)   medico_email from m_doctores where  flg_envio_disponibilidad = true  and activi = true   ");
    
        return $query->result_array(); 
    
    } 
    public function actualizaremailflgenvio($login,$email,$flg_envio){
        
        $query = $this->db->query("update m_doctores set  medico_email = '".$email . "',flg_envio_disponibilidad = true =".$flg_envio. " where    login ='".$login."'");
    
       
        return ($this->db->affected_rows() < 1) ? false : true;
    }


    public function getbody(){
        
        $query = $this->db->query("select valor1,valor2,valor3,valor4,valor5,valor6 from  m_parametro where id_param = 3");
     
        return $query->row_array(); 
    
    }
    
    public function get_emails_medicos(){
        
        $query = $this->db->query("select  login, nom_doc,medico_email, flg_envio_disponibilidad,beeper_doc,cmp_doc from m_doctores  join m_espcxdoctor on  trim(m_doctores.cod_doc) =  trim(m_espcxdoctor.cod_doc)  join m_especialidades on  trim(m_espcxdoctor.cod_esp) =  trim(m_especialidades.cod_esp)  where     m_doctores.activi = true   and m_espcxdoctor.cod_esp in ('005','006','010','026','012','009')   order by flg_envio_disponibilidad desc");
     
        return $query->result_array(); 
    
    }
    public function updatebody($body,$body2,$tituloconfirma,$tituloreconfirma,$titulodisponibilidad,$cuerpodisponibilidad){
        
        $query = $this->db->query("update m_parametro set valor1 = '$body' ,valor2 = '$body2',valor3 = '$tituloconfirma',valor4 = '$tituloreconfirma',valor5 ='$titulodisponibilidad',valor6='$cuerpodisponibilidad'   where id_param = 3");
        return ($this->db->affected_rows() < 1) ? "No se confirmo" : true;
    }
    public function get_doctorxespecialidad($cod_esp = 0){
        
        $query = $this->db->query("select d.cod_doc,d.nom_doc from m_doctores d join m_espcxdoctor exd  on d.cod_doc =  exd.cod_doc join m_especialidades e on exd.cod_esp = e.cod_esp where e.cod_esp in ('". $cod_esp ."') and d.activi = true order by nom_doc");
    
        return $query->result_array(); 
    
    }
    
    public function get_doctorxespecialidadxproveedor($cod_esp = 0,$nom_proveedor){
        
        $query = $this->db->query("select d.cod_doc,d.nom_doc from m_doctores d join m_espcxdoctor exd  on d.cod_doc =  exd.cod_doc join m_especialidades e on exd.cod_esp = e.cod_esp inner join m_proveedor_medico pm on  d.cod_prov_medico =  pm.cod_prov_medico where e.cod_esp in ('". $cod_esp ."') and d.cod_prov_medico =  ".$nom_proveedor."  and d.activi = true order by nom_doc");
    
        return $query->result_array(); 
    
    }
    public function get_botiquinxespecialidad($cod_esp2 = 0){
        
        $query = $this->db->query("select distinct MA.COD_ALMACEN  ,ma.cod_almacen || '  ' || ma.descp_almacen botiquin  from mae_almacen ma inner join i_almacen_especialidad ae on ma.cod_almacen = ae.cod_almacen where cod_esp in ('".$cod_esp2."') order by 1 asc");
    
        return $query->result_array(); 
    
    }
    public function get_proveedores($nom_proveedor){        
        $query = $this->db->query("select cod_prov_motorizado,descripcion from m_proveedor_motorizado where activo=true and descripcion like '%".$nom_proveedor."%' or cod_prov_motorizado = 99");
    
        return $query->result_array(); 
    }
    public function get_doctoresxambulancia(){
        
        $query = $this->db->query("select rtrim(d.COD_DOC)||'-'||rtrim(e.cod_esp) as COD_DOC ,ltrim(d.NOM_DOC) ||'-' || e.nom_esp as NOM_DOC 
        from m_doctores  d
        inner join  m_espcxdoctor  ed on (d.cod_doc=ed.cod_doc) 
        inner join m_especialidades e on (ed.cod_esp=e.cod_esp)
        where  d.COD_DOC IN ('5604','6113','6178','7552','7046') and d.activi = true order by 2 asc");
    
        return $query->result_array(); 
    }
    public function get_conductores_proveedor($cod_proveedor = 0){
        
        $query = $this->db->query("select TRIM(cod_mot) cod_mot ,TRIM(nom_mot)nom_mot  from m_motorizados where activi =true and cod_prov_motorizado=" . $cod_proveedor."   order by nom_mot asc ");
    
        return $query->result_array(); 
    
    }

    
    public function consultarestado($cod_doc3 = 0,$mes){
        $query = $this->db->query("select estado_prog  from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc3 ."' and t_prog_doctorxturno.mes = ".$mes." and t_prog_doctorxturno.estado_prog = '2'");
        $cont=  $query->num_rows();
        if ($cont > 0){
           return  (int)  ($query->row_array())['estado_prog'];
        }        
        $query = $this->db->query("select estado_prog  from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc3 ."' and t_prog_doctorxturno.mes = ".$mes." and t_prog_doctorxturno.estado_prog = '1'");
        $cont =  $query->num_rows();
        if ($cont > 0){
           return  (int) ($query->row_array())['estado_prog'];
        }
        return 0;

    }
    public function getidpos_auditoria($cod_asig = 0){
        $query = $this->db->query("select  max( id_posicion) +1  as id_posicion from t_aud_agente where cod_asig =". $cod_asig);
        $idaud = $query->row_array();
        if (!is_null($idaud['id_posicion'])){
           return  (int)  $idaud['id_posicion'];
        }        

        return 1;

    }
    public function existehorario($cod_doc3 = 0,$mes,$dia,$turno){
        
        $query = $this->db->query("select cod_asig  from t_prog_doctorxturno  where t_prog_doctorxturno.cod_doc = '". $cod_doc3 ."' and t_prog_doctorxturno.mes = ".$mes."and t_prog_doctorxturno.dia = ".$dia." and t_prog_doctorxturno.turno='".$turno."'");
        $codigo = $query->row_array();
        if ($query->num_rows() > 0){
            return $codigo['cod_asig']; 
        }else{
            return null;
        }
    }

   public function getlastid(){
        $query = $this->db->query('SELECT cod_asig FROM t_prog_doctorxturno ORDER BY cod_asig   DESC  limit 1 ');
        if ($query->num_rows() > 0)
        {
          $prog_doctorxturno = $query->result();
          $next_id = $prog_doctorxturno[0]->cod_asig + 1;
        }else{
            $next_id = 1;
        }
    return $next_id;
    }

    
  
    public function update($prog_doctor,$prog_doctor_actualiza,$codigos_actualizados,$auditoria  ){
        $dias =  $this->session->userdata('dia');
      
        $cod_doctor = $this->session->userdata('user_id');
        $codigos1 = $this->gethorarios($cod_doctor,date('m')==12?1:date('m')+1);
        $codigos_actuales  =array_column($codigos1,'cod_asig');
       
        if (!isset($cod_doctor) || is_null($cod_doctor) || empty($cod_doctor)){
             return false;
        }
        $codigoseliminados = array_diff($codigos_actuales, $codigos_actualizados);
        
     
        $this->db->trans_start();
         if (count($prog_doctor)>0){
            $this->db->insert_batch('t_prog_doctorxturno',$prog_doctor);   

         }
        if (count($prog_doctor_actualiza)>0){
        $this->db->update_batch('t_prog_doctorxturno',$prog_doctor_actualiza,'cod_asig');   
        }
        if (count($prog_doctor)>0||count($prog_doctor_actualiza)>0){
         $this->db->insert_batch('t_aud_agente',$auditoria);   
        }

        if (count($codigoseliminados) != 0 ){
                $this->db->where('cod_doc',$cod_doctor );
                $this->db->where('mes', date('m')==12?1:date('m')+1);
                $this->db->where_in('cod_asig', $codigoseliminados);
                $this->db->delete('t_prog_doctorxturno');
            
       $login =  $this->session->userdata('nom_usu'); 

              
                foreach($codigoseliminados as $key=>$value) {
                    $idposicion = $this->ProgramacionModel->getidpos_auditoria( $value);

                    $auditoriaeliminados[] = array(
                        'cod_asig'  =>   $value  ,
                        'nom_usu' =>  $login ,
                        'id_posicion' =>  $idposicion ,
                        'tipo_registro' =>  "ELIMINACION" ,
                        'cambios_realizados' => "ELIMINACION",
                        'fec_reg' =>  date("Y-m-d"),
                        'hora_reg' =>  date("H:i:s"),
                        'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
                        'estado_reg'  => 0
                        );
                }
                $this->db->insert_batch('t_aud_agente',$auditoriaeliminados);   
        }

       
        $this->db->trans_complete();
        return !$this->db->trans_status() ? false : true;
    }
    public function update_sinconfirmar($codigossinconfirmar,$auditoria){
      
       $filtro="";  
       $updated_data = array(
        'estado_prog' => '1'
       );
       $this->db->where_in('cod_asig', $codigossinconfirmar);
       $this->db->update('t_prog_doctorxturno',$updated_data);
       if (count($auditoria)>0){
        $this->db->insert_batch('t_aud_agente',$auditoria);   
       }
    }
    public function update_deshabilitados($codigossinconfirmar){
      
        $filtro="";  
        $updated_data = array(
         'asig_activo' =>  false
        );
        $this->db->where_in('cod_asig', $codigossinconfirmar);
        $this->db->update('t_prog_doctorxturno',$updated_data);
     }

     public function get_busquedaHorarioremisse($proveedor,$fec_inicial,$filtroremisse){
       
       $filtro="";  
       if ($filtroremisse == "1"){
        return  $this->db->query("select t_dxc.cod_asig as codigo,t_dxc.nom_doc  as Doctor,t_dxc.nom_clasif as clasificacion,t_dxc.turno,t_dxc.lugar_recojo||'/'||(select des_dis from  m_distritos where ubigeo_dist = trim(t_dxc.ubigeo_dist_recojo)) lugar_recojo,t_dxc.lugar_termino||'/'||(select des_dis from 
         m_distritos where ubigeo_dist =trim(t_dxc.ubigeo_dist_termino)) lugar_termino,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni,to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin,t_dxc.cod_mot,t_dxc.nom_mot as Conductor,
         case when t_dxc.con_mpos = false then 'No' else 'Si' end Con_Mpos,t_dxc.cod_botiquin as botiquin, nro_tablet,nro_maletin,t_dxc.cod_esp,t_dxc.cod_doc ,moto.login ,e.nom_esp
           from t_prog_doctorxturno t_dxc  inner join m_doctores mdoc on (t_dxc.cod_doc= mdoc.cod_doc)  inner join m_motorizados moto on (t_dxc.cod_mot= moto.cod_mot)
           inner join m_especialidades e on t_dxc.cod_esp = e.cod_esp
             where  t_dxc.fecini_asig = '" . $fec_inicial . "' and estado_prog in ('2','1') and t_dxc.cod_prov_motorizado = ".$proveedor.
             " and (t_dxc.cod_mot is not null and t_dxc.cod_mot != '099' and con_mpos is not null and cod_botiquin is not null and (nro_tablet is not null and nro_tablet != '')) 
             order by t_dxc.horini_asig_doc asc")->result_array();

       }elseif ($filtroremisse == "2"){ 
        return  $this->db->query("select t_dxc.cod_asig as codigo,t_dxc.nom_doc  as Doctor,t_dxc.nom_clasif as clasificacion,t_dxc.turno,t_dxc.lugar_recojo||'/'||(select des_dis from  m_distritos where ubigeo_dist = trim(t_dxc.ubigeo_dist_recojo)) lugar_recojo,t_dxc.lugar_termino||'/'||(select des_dis from 
         m_distritos where ubigeo_dist = trim(t_dxc.ubigeo_dist_termino)) lugar_termino,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni,to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin,t_dxc.cod_mot,t_dxc.nom_mot as Conductor,case when t_dxc.con_mpos = false then 'No' else 'Si' end Con_Mpos,
         t_dxc.cod_botiquin as botiquin, nro_tablet,nro_maletin,t_dxc.cod_esp ,t_dxc.cod_doc ,moto.login  as login ,e.nom_esp
         from t_prog_doctorxturno t_dxc  inner join m_doctores mdoc on (t_dxc.cod_doc= mdoc.cod_doc) left  join m_motorizados moto on (t_dxc.cod_mot= moto.cod_mot) inner join m_especialidades e on t_dxc.cod_esp = e.cod_esp
         where  t_dxc.fecini_asig = '" . $fec_inicial . "' and estado_prog in ('2','1') and 
         t_dxc.cod_prov_motorizado = ".$proveedor." and (t_dxc.cod_mot is  null or t_dxc.cod_mot ='' or    cod_botiquin is  null    or nro_tablet='' or nro_tablet is  null ) order by t_dxc.horini_asig_doc asc")->result_array();
       }else{
        return  $this->db->query("select t_dxc.cod_asig as codigo,t_dxc.nom_doc  as Doctor,t_dxc.nom_clasif as clasificacion,t_dxc.turno,t_dxc.lugar_recojo||'/'||(select des_dis from  m_distritos where ubigeo_dist = trim(t_dxc.ubigeo_dist_recojo)) lugar_recojo,t_dxc.lugar_termino||'/'||(select des_dis from 
        m_distritos where ubigeo_dist = trim(t_dxc.ubigeo_dist_termino)) lugar_termino,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni,to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin,t_dxc.cod_mot,t_dxc.nom_mot as Conductor,case when t_dxc.con_mpos = false then 'No' else 'Si' end Con_Mpos,
        t_dxc.cod_botiquin as botiquin, nro_tablet,nro_maletin,t_dxc.cod_esp ,t_dxc.cod_doc ,moto.login  as login ,e.nom_esp
        from t_prog_doctorxturno t_dxc  inner join m_doctores mdoc on (t_dxc.cod_doc= mdoc.cod_doc) left  join m_motorizados moto on (t_dxc.cod_mot= moto.cod_mot) inner join m_especialidades e on t_dxc.cod_esp = e.cod_esp
        where  t_dxc.fecini_asig = '" . $fec_inicial . "' and estado_prog in ('2','1') and 
        t_dxc.cod_prov_motorizado = ".$proveedor." and (t_dxc.cod_mot is  null or t_dxc.cod_mot ='' or    cod_botiquin is  null    or nro_tablet='' or nro_tablet is  null or  nro_maletin is  null  ) order by t_dxc.horini_asig_doc asc")->result_array();
    


       }
    
    }
 
 
    public function enviar_sms($codigosenviarsms,$idposicion){
        $asignacion =  $this->db->query("select  m_motorizados.beeper_mot, m_motorizados.nom_mot,lugar_recojo,lugar_termino,t_prog_doctorxturno.nom_doc , m_doctores.beeper_doc,to_char(horini_asig_doc,'HH24:MI') horini, to_char(horfin_asig_doc,'HH24:MI') horfin  from    t_prog_doctorxturno
        join  m_motorizados  on  t_prog_doctorxturno.cod_mot = m_motorizados.cod_mot join m_doctores on   t_prog_doctorxturno.cod_doc = m_doctores.cod_doc    where cod_asig =".$codigosenviarsms)->row_array();
       
        $lugar_recojo = $asignacion['lugar_recojo'];
        $lugar_termino = $asignacion['lugar_termino'];
        $beeper_mot = $asignacion['beeper_mot'];
        $nom_doc = $asignacion['nom_doc'];
        $beeper_doc = $asignacion['beeper_doc'];
        $horini_asig_doc = $asignacion['horini'];
        $horfin_asig_doc = $asignacion['horfin'];
        $nom_mot = $asignacion['nom_mot'];

         
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
         
         $result = $client->smsSendSoap( "DOCTORSAC", "DOCTOR2021*",51, $beeper_mot,$nom_doc ." ".$beeper_doc." RECOGER ". $lugar_recojo." DEJAR ".$lugar_termino." HORARIO: ".$horini_asig_doc." ".$horfin_asig_doc,"");
         if (substr($result,0,2) == '-1'){
            return  "<span style = 'color:red;'>".$codigosenviarsms.": No enviado </span>".$beeper_mot.$result;
         }
          
         $this->db->query("update t_prog_doctorxturno set flg_sms = true where cod_asig =".$codigosenviarsms);
         $login =  $this->session->userdata('nom_usu'); 

         $auditoria = array(
            'cod_asig'  =>   $codigosenviarsms  ,
            'nom_usu' =>  $login ,
            'id_posicion' =>  $idposicion ,
            'tipo_registro' =>  "SMS ENVIADO" ,
            'cambios_realizados' => "ENVIO DE SMS: ".$nom_doc ."  ".$beeper_doc." RECOGER ". $lugar_recojo." DEJAR ".$lugar_termino." HORARIO: ".$horini_asig_doc." ".$horfin_asig_doc." El mensaje fue enviado al: ".$beeper_mot." de ".$nom_mot,
            'fec_reg' =>  date("Y-m-d"),
            'hora_reg' =>  date("H:i:s"),
            'ip_reg'  =>  $_SERVER['REMOTE_ADDR'],
            'estado_reg'  =>  1
            );
         $this->db->insert('t_aud_agente',$auditoria);
         return "<span style = 'color:blue;'>".$codigosenviarsms.": Enviado </span>".$beeper_mot;
        } catch ( SoapFault $e ) {
            
         return  "<span style = 'color:red;'>".$codigosenviarsms.": No enviado </span>".$beeper_mot.$e->getMessage();
        }
    }

    public function migrar_sm($codigosenviarsms,$auditoria){
        if(count($auditoria)<1){
            return  "No se migro";
        }
        $asignacion =  $this->db->query("select   t_prog_doctorxturno.cod_asig ,m_motorizados.cod_mot, m_motorizados.nom_mot,t_prog_doctorxturno.horini_asig_doc,t_prog_doctorxturno.horfin_asig_doc,t_prog_doctorxturno.nom_doc , m_doctores.cod_doc ,t_prog_doctorxturno.fecini_asig,t_prog_doctorxturno.horini_asig_mot , t_prog_doctorxturno.horfin_asig_mot,t_prog_doctorxturno.cod_botiquin,t_prog_doctorxturno.con_mpos , t_prog_doctorxturno.nro_tablet from    t_prog_doctorxturno
        join  m_motorizados  on  t_prog_doctorxturno.cod_mot = m_motorizados.cod_mot join m_doctores on   t_prog_doctorxturno.cod_doc = m_doctores.cod_doc    where cod_asig =".$codigosenviarsms)->row_array();
       
        $cod_doc = $asignacion['cod_doc'];
        $nom_doc = $asignacion['nom_doc'];
        $cod_mot = $asignacion['cod_mot'];
        $nom_mot = $asignacion['nom_mot'];
        $con_mpos = $asignacion['con_mpos'];
        $nro_tablet = $asignacion['nro_tablet'];
        $cod_asig = $asignacion['cod_asig'];
        $fec_ini_asig = $asignacion['fecini_asig'];
        $hor_ini_asig_doc = $asignacion['horini_asig_doc'];
        $hor_fin_asig_doc = $asignacion['horfin_asig_doc'];
        $cod_almacen = $asignacion['cod_botiquin'];
        $login =  $this->session->userdata('nom_usu'); 
                if( is_null($nro_tablet) || empty($nro_tablet)){
                    $con_tablet = "false";
                }else{
                    $con_tablet = "true";
                }
                if( $con_mpos=="t"){
                    $con_mpos = "true";
                }else{
                    $con_mpos = "false";
                }
                if(is_null($cod_almacen)){
                    //$cod_almacen = "null";
                    $cod_almacen = 0;
                }
            

      /*   $cod_asig_doctorxchofer_existe =  $this->db->query("select * from t_doctorxchofer chof where cod_doc='" .$cod_doc . "' and chof.fecini_asig = '". $fec_ini_asig.  
         "' and extract(EPOCH FROM (cast('" . $fec_ini_asig ."' as date) + cast('".$hor_ini_asig_doc ."' as time) -  interval '5 hour ') ) <=  extract(EPOCH FROM (chof.fecini_asig + chof.horini_asig  ))
           and extract(EPOCH FROM (cast('" . $fec_ini_asig ."' as date) + cast('".$hor_ini_asig_doc ."' as time)  +  interval '6 hour ') ) >= extract(EPOCH FROM ( chof.fecini_asig +chof.horini_asig))
        and extract(EPOCH FROM (case when cast('".$hor_ini_asig_doc ."' as time) >'00:00:00' and cast('".$hor_fin_asig_doc."' as time) >='00:00:00' and cast('".$hor_fin_asig_doc."' as time) <='06:00:00' then  cast('". $fec_ini_asig . "' as date) + interval '1 day' else  cast('". $fec_ini_asig ."' as date)  end +  cast('".$hor_fin_asig_doc."' as time) -  interval '6 hour ') ) <=  extract(EPOCH FROM (chof.fecfin_asig + chof.horfin_asig))
        and extract(EPOCH FROM (case when cast('".$hor_ini_asig_doc ."' as time) >'00:00:00' and cast('".$hor_fin_asig_doc."' as time) >='00:00:00' and cast('".$hor_fin_asig_doc."' as time) <='06:00:00' then  cast('". $fec_ini_asig ."' as date) + interval '1 day' else  cast('". $fec_ini_asig ."' as date)  end +  cast('".$hor_fin_asig_doc."' as time) +  interval '5 hour ') ) >= extract(EPOCH FROM ( chof.fecfin_asig + chof.horfin_asig))"
        ." and anulada is null")->num_rows(); */
		
		
        $cod_asig_doctorxchofer_existe =  $this->db->query("select * from t_doctorxchofer chof where cod_asig_prog = ".$cod_asig."  and asig_activo=true and anulada is null")->num_rows();

        if ($cod_asig_doctorxchofer_existe>=1){
            if (strtotime($hor_ini_asig_doc) >= strtotime("00:00") && strtotime($hor_fin_asig_doc) >= strtotime("00:00") &&  strtotime($hor_fin_asig_doc) <= strtotime("06:00") ){
                $fec_fin_asig = date("d/m/Y",  strtotime($fec_ini_asig. " +1 days"));
            }else {
                $fec_fin_asig = $fec_ini_asig;
            }
            
            $this->db->query("update t_doctorxchofer   set con_tablet = ".$con_tablet."  ,usureg_fin='".$login."', cod_doc='".$cod_doc."',nom_doc='".$nom_doc."',cod_mot='".$cod_mot."',nom_mot='".$nom_mot."',fecini_asig='".$fec_ini_asig.
            "',horini_asig='".$hor_ini_asig_doc."',
            fecfin_asig='".$fec_fin_asig."',horfin_asig='".$hor_fin_asig_doc."',cod_almacen=".$cod_almacen." ,con_mpos=".$con_mpos.
            " where  cod_asig_prog = ".$cod_asig." and anulada is null ");
        }else{//
            if (strtotime($hor_ini_asig_doc) >= strtotime("00:00") && strtotime($hor_fin_asig_doc) >= strtotime("00:00") &&  strtotime($hor_fin_asig_doc) <= strtotime("06:00") ){
                    $fec_fin_asig = date("d/m/Y",  strtotime($fec_ini_asig. " +1 days"));
            }else {
                $fec_fin_asig = $fec_ini_asig;
             }
            
             $this->db->query("insert into t_doctorxchofer (cod_asig,cod_doc,nom_doc,cod_mot,nom_mot, fecini_asig,horini_asig,fecfin_asig,horfin_asig,asig_unegocio,cod_almacen,cod_asig_prog,usu_asig,usufin_asig,usureg_ini,fecreg_ini,horreg_ini,con_tablet,asig_activo,con_mpos) values ((SELECT  coalesce(max(cod_asig),1)+1  FROM t_doctorxchofer),'".$cod_doc."','".$nom_doc."','".$cod_mot."','".$nom_mot."','".$fec_ini_asig."','".$hor_ini_asig_doc."','". $fec_fin_asig."','".$hor_fin_asig_doc."',1,".$cod_almacen.",".$codigosenviarsms.",'".$login."','".$login."','".$login."','".date("Y-m-d")."','".date("H:i:s")."',".$con_tablet.",true".",'".$con_mpos."')");
			
	   }
 
   
        $this->tablet2 = $this->load->database('tablet', TRUE);
        $rst_movil = $this->tablet2->query( "select id from usuario    where usuario_SM = '".trim($cod_mot)."'")->row_array();
        $VID_COND = $rst_movil['id'];
        
        $rst_movil = $this->tablet2->query("select  id FROM usuario WHERE usuario_SM = '".trim($cod_doc). "'")->row_array();
        $VID_MED = $rst_movil['id'];
        
      
         
        
        //Si existe la combinación Conductor+Medico, capturo el código de Combo,
        //sino, creo un nuevo ComboAsignación.
        
        $rst_movil = $this->tablet2->query("SELECT * FROM combo_asignacion where id_conductor = " . $VID_COND . " AND id_medico = " . $VID_MED);
        
        if ($rst_movil->num_rows() >=1)  {
           //si existe el combo se actualiza
            //G_db_tablet.Execute ("UPDATE combo_asignacion SET fecha_hora_incio = current_timestamp, sesion_activa =  1 WHERE cod_comboasignacion = " . rst_movil->row_array()['cod_comboasignacion']);
            
        }else{
            $this->tablet2->query("Insert combo_asignacion (cod_comboasignacion, cod_unidad, id_conductor, id_medico, id_enfermero, fecha_hora_incio,sesion_activa) Values((Select ISNULL(MAX(cod_comboasignacion),0) + 1 FROM combo_asignacion), 
            null, " . $VID_COND . ", " . $VID_MED . ", null,  GETDATE(),1)");
        }
          
        $this->db->insert('t_aud_agente',$auditoria);
        return ($this->db->affected_rows() != 1) ? "No se migro" : "Se migro";
     
    }
    
    public function get_prefacturacion($codigos_prefacturacion){
        set_time_limit(0);
        $in = implode(",", $codigos_prefacturacion);
        $query = $this->db->query("(select fecha,doctor, turno,nom_clasif,prefacturacion.des_doc,horini,horfin,cod_ate,prefacturacion.hora_ultima_atencion,distrito,proveedor,conductor,hor_ini,hor_fin,extension,
        hora_administrativa,
        extract(EPOCH FROM (case when horini  >'00:00' and horfin  >='00:00' and horfin <='06:00' then TO_DATE(fecha ,'dd-MM-yyyy' ) + interval '1 day' else  TO_DATE(fecha ,'dd-MM-yyyy' )  end +  cast(horfin as time ) ) ) /3600-extract(epoch   from  cast(fecha as date )+  cast(horini as time )  )/3600 - extension hora_efectiva,
        extract(EPOCH FROM (case when horini  >'00:00' and horfin  >='00:00' and horfin <='06:00' then TO_DATE(fecha ,'dd-MM-yyyy' ) + interval '1 day' else  TO_DATE(fecha ,'dd-MM-yyyy' )  end +  cast(horfin as time ) ) ) /3600-extract(epoch   from  cast(fecha as date )+  cast(horini as time )  )/3600
         from  
        (select distinct llama.cod_ate,llama.cod_asig,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,t_dxc.nom_doc  as Doctor,t_dxc.turno, t_dxc.nom_clasif,t_dxc.DES_DOC,llama.des_dis as distrito_destino,
        to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni, to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin,(audi.hor_reg_audi) as hora_ultima_atencion ,
        llama.des_dis as distrito,moto.descripcion as proveedor,t_dxc.nom_mot as Conductor,to_char(t_dxc.horini_asig_mot,'HH24:MI')as Hor_ini,to_char(t_dxc.horfin_asig_mot,'HH24:MI') as hor_fin,0 as extension,'01:00' as hora_administrativa,
        0 as hora_efectiva from t_prog_doctorxturno t_dxc 
        join m_proveedor_motorizado  moto on  t_dxc.cod_prov_motorizado = moto.cod_prov_motorizado and (moto.cod_prov_motorizado=1 or moto.cod_prov_motorizado = 5  or moto.cod_prov_motorizado = 20)   
        join t_doctorxchofer chof on  t_dxc.fecini_asig = chof.fecini_asig 
         and t_dxc.cod_doc = chof.cod_doc and anulada is null
         and t_dxc.cod_asig = chof.cod_asig_prog
         join t_tmpllamadas llama on chof.cod_asig = llama.cod_asig and llama.cm_estado  in ('8','V') 
         join t_cm_audi_estado audi on audi.cod_ate = llama.cod_ate  and (audi.fec_reg_audi = chof.fecfin_asig or audi.fec_reg_audi = chof.fecini_asig)
         and (trim(audi.obs_audi) = 'CONSULTA MEDICA FINALIZADA AUTOMATICAMENTE'  or  trim(audi.obs_audi) = 'FIN DE LA CONSULTA MEDICA' or trim(audi.obs_audi) = 'VISITA NO REALIZADA' )
         where    t_dxc.cod_asig in (".$in."))   prefacturacion ,   
         (select llama.cod_asig,   max(fec_reg_audi + audi.hor_reg_audi) as hora_ultima_atencion   
          from t_prog_doctorxturno t_dxc   
          join m_proveedor_motorizado  moto on  t_dxc.cod_prov_motorizado = moto.cod_prov_motorizado and (moto.cod_prov_motorizado=1 or moto.cod_prov_motorizado = 5 or moto.cod_prov_motorizado = 20) 
          left join t_doctorxchofer chof on  t_dxc.fecini_asig = chof.fecini_asig and t_dxc.cod_doc = chof.cod_doc  and anulada is null
          and t_dxc.cod_asig = chof.cod_asig_prog
          left join t_tmpllamadas llama on chof.cod_asig = llama.cod_asig and llama.cm_estado in ('8','V') 
          left join t_cm_audi_estado audi on audi.cod_ate = llama.cod_ate  and (audi.fec_reg_audi = chof.fecfin_asig or audi.fec_reg_audi = chof.fecini_asig)
          and (trim(audi.obs_audi) = 'CONSULTA MEDICA FINALIZADA AUTOMATICAMENTE' or  trim(audi.obs_audi) = 'FIN DE LA CONSULTA MEDICA' or trim(audi.obs_audi) = 'VISITA NO REALIZADA' )
          where    t_dxc.cod_asig in (".$in.")
          group by llama.cod_asig )  prefacturacion1 where prefacturacion.cod_asig = prefacturacion1.cod_asig 
          and prefacturacion.hora_ultima_atencion = cast(prefacturacion1.hora_ultima_atencion as time)  order by turno  )
      
          union 

          select fecha,doctor, turno,nom_clasif,des_doc,horini,horfin,cast(cod_ate as int ),cast(hora_ultima_atencion as  time without time zone),distrito,proveedor,conductor,hor_ini,hor_fin,extension,
                  hora_administrativa,
                  extract(EPOCH FROM (case when  horini >'00:00' and horfin  >='00:00' and horfin <='06:00' then TO_DATE(fecha ,'dd-MM-yyyy' ) + interval '1 day' else  TO_DATE(fecha ,'dd-MM-yyyy' )  end +  cast(horfin as time ) ) ) /3600-extract(epoch   from  cast(fecha as date )+  cast(horini as time )  )/3600 - extension hora_efectiva,
                  extract(EPOCH FROM (case when horini  >'00:00' and horfin  >='00:00' and horfin <='06:00' then TO_DATE(fecha ,'dd-MM-yyyy' ) + interval '1 day' else  TO_DATE(fecha ,'dd-MM-yyyy' )  end +  cast(horfin as time ) ) ) /3600-extract(epoch   from  cast(fecha as date )+  cast(horini as time )  )/3600 
                  from 
                  (select distinct null cod_ate ,null cod_asig,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,t_dxc.nom_doc  as Doctor,t_dxc.turno, t_dxc.nom_clasif,t_dxc.des_doc,'' as distrito_destino,
                  to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni, to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin, null as hora_ultima_atencion ,
                  '' as distrito,moto.descripcion as proveedor,t_dxc.nom_mot as Conductor,to_char(t_dxc.horini_asig_mot,'HH24:MI')as Hor_ini,to_char(t_dxc.horfin_asig_mot,'HH24:MI') as hor_fin,0 as extension,'01:00' as hora_administrativa,
                  0 as hora_efectiva from t_prog_doctorxturno t_dxc 
                  join m_proveedor_motorizado  moto on  t_dxc.cod_prov_motorizado = moto.cod_prov_motorizado and (moto.cod_prov_motorizado=1 or moto.cod_prov_motorizado = 5 or moto.cod_prov_motorizado = 20)   
                  left join t_doctorxchofer chof on   (t_dxc.fecini_asig= chof.fecfin_asig or t_dxc.fecini_asig = chof.fecini_asig) and anulada is null
                   and t_dxc.cod_doc = chof.cod_doc 
                   
                   where      EXISTS (
                     SELECT  *
                     FROM   t_tmpllamadas llama
                     WHERE  chof.cod_asig = llama.cod_asig and llama.cm_estado not  in ('8','V') 
                     )  
                    and    t_dxc.cod_asig in (".$in."))   prefacturacion2 order by turno ");
         
        return $query->result_array(); 
    
    }
    public function cancelarprogramacion($codigocancelar,$auditoria){
        if(count($auditoria)<1){
            return  "No se cancelo";
        } 

        $asignacion =  $this->db->query("select   m_motorizados.cod_mot, m_motorizados.nom_mot,t_prog_doctorxturno.horini_asig_doc,t_prog_doctorxturno.horfin_asig_doc,t_prog_doctorxturno.nom_doc ,
         m_doctores.cod_doc ,t_prog_doctorxturno.fecini_asig,t_prog_doctorxturno.horini_asig_mot , t_prog_doctorxturno.horfin_asig_mot,t_prog_doctorxturno.cod_botiquin,t_prog_doctorxturno.con_mpos , 
         t_prog_doctorxturno.nro_tablet from    t_prog_doctorxturno join  m_motorizados  on  t_prog_doctorxturno.cod_mot = m_motorizados.cod_mot join m_doctores on   t_prog_doctorxturno.cod_doc = m_doctores.cod_doc   
         where cod_asig =".$codigocancelar)->row_array();
       

            $this->db->query("update t_prog_doctorxturno set asig_activo=false,estado_prog='C'  where cod_asig=" .$codigocancelar. "");

            $this->tablet2 = $this->load->database('tablet', TRUE);

            
        $this->db->insert('t_aud_agente',$auditoria);
        return ($this->db->affected_rows() != 1) ? 0 : 1;

    }
      //  For i = 1 To MSFGrid_DrChofer.rows - 1
           // With MSFGrid_DrChofer
              //  If .TextMatrix(i, 0) = Chr(251) Then  'marcado para anular la asignacion Doctor y Chofer
                    
                    //'MSFGrid_DrChofer.TextMatrix(i, 2)  'login_medico
                   // 'MSFGrid_DrChofer.TextMatrix(i, 5)  'login_conductor
                    
                    //validar si el combo a anular tiene al menos una atencion asignada
                    //si es asi el combo no se anula
                    
                /*     $str_CodDoc = Trim(MSFGrid_DrChofer.TextMatrix(MSFGrid_DrChofer.Row, 1))
                    $str_CodMot = Trim(MSFGrid_DrChofer.TextMatrix(MSFGrid_DrChofer.Row, 4))
                    
                    if ( $this->session->userdata('nom_usu') != "SISTEMAS")  {
                        $lrs_DrxChf = $this->db->query("SELECT cod_ate FROM t_tmpllamadas WHERE cod_asig in (SELECT cod_asig FROM t_doctorxchofer WHERE asig_activo = true AND cod_doc = '" . $str_CodDoc . "' AND cod_mot = '" . $str_CodMot . "')");
                        if ($lrs_DrxChf->num_rows()>=1) {
                            $b_anular = false;
                        }else{
                            $b_anular = true;
                            $anulacion_realizada = true;
                        }
                    }else{
                        $b_anular = true;
                        $anulacion_realizada = true;
                    }
                    
                    if ($b_anular == true)  {
 
                         $rst_consulta = $this->tablet2->query("SELECT ate.cod_atencion FROM atencion ate INNER JOIN combo_asignacion cbo ON ate.cod_comboasignacion = cbo.cod_comboasignacion
                          INNER JOIN usuario cond ON cbo.id_conductor = cond.id INNER JOIN usuario med ON cbo.id_medico = med.id 
                          WHERE ate.cod_estado < 9 AND cond.login = '" . MSFGrid_DrChofer.TextMatrix(i, 5) . "' AND med.login = '" .  MSFGrid_DrChofer.TextMatrix(i, 2) . "'");
                        
                        if Not rst_consulta.EOF {
                            rst_consulta.MoveFirst
                            Do While Not rst_consulta.EOF
                                Call REINGRESAR_ATE_TABLET(rst_consulta!cod_atencion)
                                G_db.Execute ("UPDATE t_tmpllamadas SET cod_estado = 2, flg_registrar_ate_tablet = true WHERE cod_ate = " & rst_consulta!cod_atencion)
                                rst_consulta.MoveNext
                            Loop
                        }
                        
                        Call Abre_Detalle(Adata_AsigDrChofer, "SELECT * FROM t_doctorxchofer WHERE cod_doc = '" & Trim(.TextMatrix(i, 1)) & "' AND cod_mot = '" & Trim(.TextMatrix(i, 4)) & "' AND asig_activo = true")
                        
                        With Adata_AsigDrChofer.Recordset
                            !fecreg_fin = Format(Date, "yyyy-mm-dd")
                            !horreg_fin = Format(Time, "HH:MM")
                            !usureg_fin = Usuario
                            !asig_activo = False
                            !anulada = True
                            .Update
                            .Close
    
                            Call P_FINALIZA_COMBO_TABLET(str_CodMot, str_CodDoc, "", "")
                            
                        End With
                    } 
                //End If
            //End With
        //Next
       
        
        li_marcado = 0
        If anulacion_realizada = True Then
            MsgBox "Se anularon las asignaciones marcadas", vbInformation, "Sistema operaciones"
        Else
            MsgBox "No se anularon los combos por que tienen atenciones asociadas, extienda o disminuya los tiempos del combo", vbInformation, "Sistema operaciones"
        End If
        
*/





     
   
    
    public function get_busquedaHorarioProveedor($especialidades,$estado,$nom_doc,$turno,$clasif,$fec_inicial,$fec_final,$nom_prov){
        // SELECT *
        // FROM usuarios 
        // JOIN medicos 
        //     ON usuarios.id = medicos.id_usuario
        // WHERE usuarios.id = $id LIMIT 1
       
       // $sede = $this->db->get_where('AF_MA_SEDE',array('AF_MA_SEDE.SE_ID' => $id),1);
       //$especialidades = '005';
       $filtro="";  
       
       $multiLinestring = "select t_dxc.cod_asig as codigo,t_dxc.nom_doc  as Doctor,mp.nom_pais as nacionalidad,((current_date - mdoc.fec_nac)/365) edad  , t_dxc.turno,t_dxc.cod_esp,t_dxc.cod_botiquin as botiquin,t_dxc.nom_clasif as clasificacion,esp.nom_esp as especialidad,t_dxc.des_doc as descripcion,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni,to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin,t_dxc.nom_mot as Conductor,case when t_dxc.con_mpos = false then 'No' else 'Si' end Con_Mpos,to_char(t_dxc.horini_asig_mot,'HH24:MI') as Hor_ini,to_char(t_dxc.horfin_asig_mot,'HH24:MI') as hor_fin,t_dxc.estado_prog as estado ,t_dxc.cod_doc,t_dxc.cod_mot ,nro_tablet,nro_maletin,mdoc.medico_email,t_dxc.lugar_recojo,lugar_termino,cod_prov_motorizado,flg_sms,ubigeo_dist_recojo,ubigeo_dist_termino from t_prog_doctorxturno t_dxc inner join m_especialidades esp on (t_dxc.cod_esp=esp.cod_esp) inner join m_doctores mdoc on (t_dxc.cod_doc= mdoc.cod_doc) inner join mae_pais mp on (mdoc.id_pais= mp.id_pais) inner join m_proveedor_medico pm on  mdoc.cod_prov_medico =  pm.cod_prov_medico where t_dxc.cod_esp=esp.cod_esp AND t_dxc.cod_esp in(" . $especialidades ;
       $multiLinestring .= ")   AND TURNO in (" . $turno . ") and t_dxc.fecini_asig between '" . $fec_inicial . "' and '" . $fec_final . "' and t_dxc.nom_doc like '%" . strtoupper($nom_doc) . "%' and pm.cod_prov_medico =" .$nom_prov ."  and estado_prog in (" . $estado . ") and " . $clasif . " order by  t_dxc.fecini_asig asc,  t_dxc.horini_asig_doc  asc" ;
      
       //$multiLinestring .= ")   AND TURNO in (" . $turno . ") and t_dxc.fecini_asig between '" . $fec_inicial . "' and '" . $fec_final . "' and t_dxc.nom_doc like '%" . strtoupper($nom_doc) . "%' and t_dxc.cod_prov_medico =" .$nom_prov ."  and estado_prog in (" . $estado . ") and " . $clasif . " order by  t_dxc.fecini_asig asc,  t_dxc.horini_asig_doc  asc" ;
       //$multiLinestring .= ")   AND TURNO in (" . $turno . ") and t_dxc.fecini_asig between '" . $fec_inicial . "' and '" . $fec_final . "' and t_dxc.nom_doc like '%" . strtoupper($nom_doc) . "%' and pm.cod_prov_medico = 53  and estado_prog in (" . $estado . ") and " . $clasif . " order by  t_dxc.fecini_asig asc,  t_dxc.horini_asig_doc  asc" ;
       //echo "<script>alert('test.');</script>";


       return  $this->db->query( $multiLinestring )->result_array();
    
    }
    public function get_busquedaHorario($especialidades,$estado,$nom_doc,$turno,$clasif,$fec_inicial,$fec_final,$proveedor){
        // SELECT *
        // FROM usuarios 
        // JOIN medicos 
        //     ON usuarios.id = medicos.id_usuario
        // WHERE usuarios.id = $id LIMIT 1
       
       // $sede = $this->db->get_where('AF_MA_SEDE',array('AF_MA_SEDE.SE_ID' => $id),1);
       
       $filtro="";  
       
        //$multiLinestring = "select t_dxc.cod_asig as codigo,t_dxc.nom_doc  as Doctor,mp.nom_pais as nacionalidad,((current_date - mdoc.fec_nac)/365) edad  , t_dxc.turno,t_dxc.cod_esp,t_dxc.cod_botiquin as botiquin,t_dxc.nom_clasif as clasificacion, t_dxc.des_doc as descripcion,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni,to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin,t_dxc.nom_mot as Conductor,case when t_dxc.con_mpos = false then 'No' else 'Si' end Con_Mpos,to_char(t_dxc.horini_asig_mot,'HH24:MI') as Hor_ini,to_char(t_dxc.horfin_asig_mot,'HH24:MI') as hor_fin,t_dxc.estado_prog as estado ,t_dxc.cod_doc,t_dxc.cod_mot ,nro_tablet,nro_maletin,mdoc.medico_email,t_dxc.lugar_recojo,lugar_termino,t_dxc.cod_prov_motorizado,flg_sms,ubigeo_dist_recojo,ubigeo_dist_termino,ind_doc,pm.descripcion nom_motorizado from t_prog_doctorxturno t_dxc inner join m_especialidades esp on (t_dxc.cod_esp=esp.cod_esp) inner join m_doctores mdoc on (t_dxc.cod_doc= mdoc.cod_doc) inner join m_proveedor_motorizado pm on t_dxc.cod_prov_motorizado = pm.cod_prov_motorizado inner join mae_pais mp on (mdoc.id_pais= mp.id_pais) where t_dxc.cod_esp=esp.cod_esp AND t_dxc.cod_esp in(" . $especialidades ;
        //$multiLinestring .= ")   AND TURNO in (" . $turno . ")       and t_dxc.fecini_asig between '" . $fec_inicial . "' and '" . $fec_final . "' and t_dxc.nom_doc like '%" . strtoupper($nom_doc) . "%'  and estado_prog in (" . $estado .") ".   (($proveedor==0) ? "" : ($proveedor==99 ? " and (t_dxc.cod_prov_motorizado = null or t_dxc.cod_prov_motorizado =99 )" : " and t_dxc.cod_prov_motorizado = " . $proveedor) ).    " and ". $clasif . " order by  t_dxc.fecini_asig asc,  t_dxc.horini_asig_doc  asc" ;
       
       $multiLinestring = "select t_dxc.cod_asig as codigo,t_dxc.nom_doc  as Doctor,mp.nom_pais as nacionalidad,((current_date - mdoc.fec_nac)/365) edad  , t_dxc.turno,t_dxc.cod_esp,t_dxc.cod_botiquin as botiquin,t_dxc.nom_clasif as clasificacion,esp.nom_esp as especialidad, t_dxc.des_doc as descripcion,to_char(t_dxc.fecini_asig,'dd-MM-yyyy') AS FECHA,to_char(t_dxc.horini_asig_doc,'HH24:MI') as HorIni,to_char(t_dxc.horfin_asig_doc,'HH24:MI') as HorFin,t_dxc.nom_mot as Conductor,case when t_dxc.con_mpos = false then 'No' else 'Si' end Con_Mpos,to_char(t_dxc.horini_asig_mot,'HH24:MI') as Hor_ini,to_char(t_dxc.horfin_asig_mot,'HH24:MI') as hor_fin,t_dxc.estado_prog as estado ,t_dxc.cod_doc,t_dxc.cod_mot ,nro_tablet,nro_maletin,mdoc.medico_email,t_dxc.lugar_recojo,lugar_termino,t_dxc.cod_prov_motorizado,flg_sms,ubigeo_dist_recojo,ubigeo_dist_termino,ind_doc,pm.descripcion nom_motorizado from t_prog_doctorxturno t_dxc inner join m_especialidades esp on (t_dxc.cod_esp=esp.cod_esp) inner join m_doctores mdoc on (t_dxc.cod_doc= mdoc.cod_doc) inner join m_proveedor_motorizado pm on t_dxc.cod_prov_motorizado = pm.cod_prov_motorizado inner join mae_pais mp on (mdoc.id_pais= mp.id_pais) where t_dxc.cod_esp=esp.cod_esp AND t_dxc.cod_esp in(" . $especialidades ;
       $multiLinestring .= ")   AND TURNO in (" . $turno . ")       and t_dxc.fecini_asig between '" . $fec_inicial . "' and '" . $fec_final . "' and t_dxc.nom_doc like '%" . strtoupper($nom_doc) . "%'  and estado_prog in (" . $estado .") ".   (($proveedor==0) ? "" : ($proveedor==99 ? " and (t_dxc.cod_prov_motorizado = null or t_dxc.cod_prov_motorizado =99 )" : " and t_dxc.cod_prov_motorizado = " . $proveedor) ).    " and ". $clasif . " order by  t_dxc.fecini_asig asc,  t_dxc.horini_asig_doc  asc" ;
          
          
   return  $this->db->query( $multiLinestring )->result_array();
    
    }


    public function getespecialidades(){
        $query = $this->db->query("SELECT*FROM VW_ESPECIALIDADES");
        return $query->result_array(); 
    } 
    


    public function get_seguimiento($cod_asig){
       
       
       return  $this->db->query("select COD_ASIG , NOM_USU AS USUARIO,TIPO_REGISTRO AS EVENTO  , CAMBIOS_REALIZADOS AS REGISTRO, to_char(FEC_REG, 'DD/MM/YYYY') AS FECHA,HORA_REG AS HORA  FROM T_AUD_AGENTE WHERE  cod_asig=" .$cod_asig. "ORDER BY ID_POSICION ASC")->result_array();
    
    }
    public function get_direcciones($cod_doc = 0){
        $this->db->query("SET CLIENT_ENCODING TO 'utf8';");

        $query = $this->db->query("select d.cod_doc  ,d.nro_direccion  ,d.direccion  ,  d.ubigeo_dist  ,d.telefono,d.referencia  ,d.telefono_ultimo   , m.des_dis from m_direcciones_doctor  d join m_distritos m on  d.ubigeo_dist = m.ubigeo_dist where cod_doc = '". trim($cod_doc)."' order by d.nro_direccion asc"     );
    
        return $query->result_array(); 
    
    }
    public function get_totaldirecciones($cod_doc = 0){
        
        $query = $this->db->query("select array_agg(nro_direccion order by nro_direccion) as direcciones  from m_direcciones_doctor where cod_doc = '". trim($cod_doc)."'" );
    
        return $query->result_array(); 
    
    }
    public function confirmar_asignacion($codigoasignacionaconfirmar = 0,$lugarecojo='', $lugartermino='',$ubigeo_recojo='',$ubigeo_termino='',$auditoria,$des_doc,$ind_doc){
        if(count($auditoria)<1){
            return  "No se confirmo";
        }
       
        
        $query = $this->db->query("update t_prog_doctorxturno set estado_prog = 2,des_doc = '". strtoupper(trim($des_doc))."',ind_doc = '".strtoupper(trim($ind_doc))."' ,lugar_recojo=".($lugarecojo==''?'null':"'".$lugarecojo."'").",lugar_termino =".($lugartermino==''?'null':"'".$lugartermino."'").",ubigeo_dist_recojo=".($ubigeo_recojo==''?'null':"'".$ubigeo_recojo."'").",ubigeo_dist_termino=".($ubigeo_termino==''?'null':"'".$ubigeo_termino."'")." where  t_prog_doctorxturno.cod_asig = ".$codigoasignacionaconfirmar);

        $this->db->insert('t_aud_agente',$auditoria);
        return ($this->db->affected_rows() != 1) ? "No se confirmo" : true;
     
    }
    public function desconfirmar_asignacion($codigoasignacionaconfirmar = 0,$auditoriadesconf){
        if(count($auditoriadesconf)<1){
            return  "No se desconfirmo";
        }
        $query = $this->db->query("update t_prog_doctorxturno set estado_prog = 1,ubigeo_dist_recojo=null,ubigeo_dist_termino = null,lugar_recojo = null, lugar_termino = null where  t_prog_doctorxturno.cod_asig = ".$codigoasignacionaconfirmar);
       
        $this->db->insert('t_aud_agente',$auditoriadesconf);
        return ($this->db->affected_rows() != 1) ? "No se desconfirmo" : true;
    
    }
    public function guardar_datos_confirmacion($codigoasignacionaconfirmar = 0,$especialidad='',$nom_clasif='',$medico='',$nom_medico,$horini='',$horfin='',$botiquin='',$tablet='',$maletin='',$fec_asignacion='',$turnodetalle='',$des_doc='',$ind_doc='',$lugarecojo='',$ubigeo_recojo='',$lugartermino='',$ubigeo_termino='',$cod_prov_motorizado='',$cod_mot='',$nom_mot='',$mpos='',$horini_mot='',$horfin_mot='',$auditoriaconf){

        if(count($auditoriaconf)<1){
            return  "No se guardo";
        }
        $query = $this->db->query("update t_prog_doctorxturno set cod_esp='".$especialidad."', nom_clasif='".$nom_clasif."',cod_doc= '".$medico."',nom_doc= '".$nom_medico."', horini_asig_doc='".$horini."',horfin_asig_doc='".$horfin."',cod_botiquin=".$botiquin.", nro_tablet=".$tablet.",nro_maletin='".$maletin."',fecini_asig='".$fec_asignacion."',turno='".$turnodetalle."',des_doc = 'RECOJO '||(select des_dis from  m_distritos where ubigeo_dist ='". trim($ubigeo_recojo)."')||'/TERMINO '||(select des_dis from  m_distritos where ubigeo_dist ='". trim($ubigeo_termino)."') ,  ubigeo_dist_recojo='".$ubigeo_recojo."',ubigeo_dist_termino='".$ubigeo_termino."',con_mpos='".$mpos."',horini_asig_mot='".$horini_mot."',horfin_asig_mot='".$horfin_mot."', lugar_recojo='".$lugarecojo."',lugar_termino ='".$lugartermino."',cod_prov_motorizado=". $cod_prov_motorizado .",cod_mot='".$cod_mot ."',nom_mot='".$nom_mot."' where  t_prog_doctorxturno.cod_asig = ".$codigoasignacionaconfirmar);
    
        $this->db->insert('t_aud_agente',$auditoriaconf);
        return ($this->db->affected_rows() != 1) ? "No se guardo" : true;
     
    }
   
    public function test_insert($codigoasignacionaconfirmar,$especialidad,$nom_clasif,$medico,$nom_medico,$horin,$horfin,$botiquin,$tablet,$maletin,$fec_asignacion,$turnodetalle,$des_doc,$ind_doc,$lugarecojo,$ubigeo_recojo,$lugartermino,$ubigeo_termino,$cod_prov_motorizado,$cod_mot,$nom_mot,$mpos,$horini_mot,$horfin_mot,$auditoriaconf){

        if(count($auditoriaconf)<1){
            return  "No se guardo";
        }
        
        $query = $this->db->query("update t_prog_doctorxturno set cod_esp='".$especialidad."', nom_clasif='".$nom_clasif."' ,cod_doc= '".$medico."', nom_doc= '".$nom_medico."', horini_asig_doc='".$horin."' ,horfin_asig_doc='".$horfin."', cod_botiquin=".$botiquin.", nro_tablet='".$tablet."',nro_maletin='".$maletin."',fecini_asig='".$fec_asignacion."',turno='".$turnodetalle."', des_doc = '".$des_doc."', con_mpos='".$mpos."', cod_mot='".$cod_mot ."',nom_mot='".$nom_mot."' where  t_prog_doctorxturno.cod_asig = ".$codigoasignacionaconfirmar);

        $this->db->insert('t_aud_agente',$auditoriaconf);
        return ($this->db->affected_rows() != 1) ? "No se guardo" : true;

        //$this->db->query("insert into tb_solodeprueba (nombre, fecha_registro, hora_registro) values ('".$tablet."', CURRENT_DATE, CURRENT_TIME)");
        //$this->db->query("update t_prog_doctorxturno set cod_esp='".$especialidad."', nom_clasif='".$nom_clasif."',cod_doc= '".$medico."',nom_doc= '".$nom_medico."', horini_asig_doc='".$horini."',horfin_asig_doc='".$horfin."',cod_botiquin=".$botiquin.", nro_tablet=".$tablet.",nro_maletin='".$maletin."',fecini_asig='".$fec_asignacion."',turno='".$turnodetalle."',des_doc = 'RECOJO '||(select des_dis from  m_distritos where ubigeo_dist ='". trim($ubigeo_recojo)."')||'/TERMINO '||(select des_dis from  m_distritos where ubigeo_dist ='". trim($ubigeo_termino)."') ,  ubigeo_dist_recojo='".$ubigeo_recojo."',ubigeo_dist_termino='".$ubigeo_termino."',con_mpos='".$mpos."',horini_asig_mot='".$horini_mot."',horfin_asig_mot='".$horfin_mot."', lugar_recojo='".$lugarecojo."',lugar_termino ='".$lugartermino."',cod_prov_motorizado=". $cod_prov_motorizado .",cod_mot='".$cod_mot ."',nom_mot='".$nom_mot."' where  t_prog_doctorxturno.cod_asig = ".$codigoasignacionaconfirmar);
        //$this->db->query("update t_prog_doctorxturno set cod_esp='".$especialidad."', nom_clasif='".$nom_clasif."',cod_doc= '".$medico."',nom_doc= '".$nom_medico."', horini_asig_doc='".$horini."' where  t_prog_doctorxturno.cod_asig = ".$codigoasignacionaconfirmar);
    } 

    public function guardar_datos_proveedor($codigo_asignacion = 0,$cod_proveedor,$fecha_proveedor,$auditoriaprov){
        
        if(count($auditoriaprov)<1){
            return  "No se guardo proveedor";
        }
        $query = $this->db->query("update t_prog_doctorxturno set cod_mot = null,nom_mot =null, cod_prov_motorizado=". $cod_proveedor ." , fecpro_asig = '" . $fecha_proveedor  .  "' where  t_prog_doctorxturno.cod_asig = ".$codigo_asignacion);
    
        $this->db->insert('t_aud_agente',$auditoriaprov);
        return ($this->db->affected_rows() != 1) ? "No se guardo proveedor" : true;
    
    }
    public function get_hora_servidor(){
      
        $query = $this->db->query("SELECT to_char(NOW(),'dd/mm/yyyy HH24:MM') hora");
    
        return $query->row_array()['hora']; 

    }
    public function guardar_datos_conductor($codigo_asignacion = 0,$conductor,$nombreconductor,$mpos,$botiquin,$tablet,$maletin,$auditoriacond){
        if(count($auditoriacond)<1){
            return  "No se guardo proveedor";
        }
        
        $query = $this->db->query("SELECT cod_mot  from  m_motorizados where login= '".$conductor."'");
    
        $cod_mot = trim($query->row_array()['cod_mot']); 

         if ($mpos=="1"){
        $mposf = "false";
        $con_mpos = false;
        }else{
            $mposf = "true";
            $con_mpos = true;
        }
        $fechasyhoras  = $this->db->query("select  fecini_asig,horini_asig_doc,horfin_asig_doc,cod_mot,con_mpos,cod_botiquin,nro_tablet,nro_maletin   from t_prog_doctorxturno where  t_prog_doctorxturno.cod_asig = ".trim($codigo_asignacion))->row_array()  ;
         $rangohoras  = $this->db->query("select  fecini_asig,horini_asig_doc,horfin_asig_doc   from t_prog_doctorxturno where  t_prog_doctorxturno.fecini_asig = '".$fechasyhoras['fecini_asig']."' and t_prog_doctorxturno.cod_mot = '". $cod_mot."' and t_prog_doctorxturno.estado_prog <>'C'  ")->result_array()  ;
        foreach ($rangohoras as $key => $value) {
            $programacionconductor  = $this->db->query("select horas  from generate_series('".$value['fecini_asig']." ".$value['horini_asig_doc']."'::timestamp,'".$value['fecini_asig']." ".$value['horfin_asig_doc']."'::timestamp,'0.5h') horas       where '".$fechasyhoras['fecini_asig']." ".$fechasyhoras['horini_asig_doc']."' = horas or  '".$fechasyhoras['fecini_asig']." ".$fechasyhoras['horfin_asig_doc']."' = horas ;     " )->row_array()  ;
            if(!is_null($programacionconductor)){
               // $query = $this->db->query("update t_prog_doctorxturno set  cod_mot=null,nom_mot=null, con_mpos = null, cod_botiquin=null,nro_tablet=null ,nro_maletin=null where  t_prog_doctorxturno.cod_asig = ".$codigo_asignacion);
                    if($cod_mot  == trim($fechasyhoras['cod_mot']) ){
                        if( $con_mpos  == $fechasyhoras['con_mpos']  && $botiquin  == trim($fechasyhoras['cod_botiquin'])     &&  $tablet  == trim($fechasyhoras['nro_tablet'])      &&       $maletin  == trim($fechasyhoras['nro_maletin'])       ){
                            return true;
                        }else{
                                
                        }
                      
                    }else{
                    return false;
                    }
            }
        }
        

       /*  if (! is_null($codigosegus_existe)){
      
          throw new Exception('Conductor ya esta programado.');
         
        } */

        $query = $this->db->query("update t_prog_doctorxturno set  cod_mot='". $cod_mot ."',nom_mot='" .$nombreconductor. "', con_mpos = " . $mposf  .  ", cod_botiquin=".$botiquin.",nro_tablet='".$tablet."' ,nro_maletin='". $maletin ."' where  t_prog_doctorxturno.cod_asig = ".$codigo_asignacion);
    
        $this->db->insert('t_aud_agente',$auditoriacond);
        return ($this->db->affected_rows() != 1) ? false : true;
    
       // return $query ; 
    
    }

    public function valida_guardar_datos_conductor($codigo_asignacion = 0,$conductor,$nombreconductor,$mpos,$botiquin,$tablet,$maletin){
         
        
        $query = $this->db->query("SELECT cod_mot  from  m_motorizados where cod_mot= '".$conductor."'");
    
        $cod_mot = trim($query->row_array()['cod_mot']); 

        if ($mpos=="1"){
            $mposf = "false";
            $con_mpos = false;
        }else{
            $mposf = "true";
            $con_mpos = true;
        }
        $fechasyhoras  = $this->db->query("select  fecini_asig,horini_asig_doc,horfin_asig_doc,cod_mot,con_mpos,cod_botiquin,nro_tablet,nro_maletin   from t_prog_doctorxturno where  t_prog_doctorxturno.cod_asig = ".trim($codigo_asignacion))->row_array()  ;
         $rangohoras  = $this->db->query("select  fecini_asig,horini_asig_doc,horfin_asig_doc   from t_prog_doctorxturno where  t_prog_doctorxturno.fecini_asig = '".$fechasyhoras['fecini_asig']."' and t_prog_doctorxturno.cod_mot = '". $cod_mot."'")->result_array()  ;
        // var_dump($rangohoras);exit;
        foreach ($rangohoras as $key => $value) {
            $programacionconductor  = $this->db->query("select horas  from generate_series('".$value['fecini_asig']." ".$value['horini_asig_doc']."'::timestamp,'".$value['fecini_asig']." ".$value['horfin_asig_doc']."'::timestamp,'0.5h') horas       where '".$fechasyhoras['fecini_asig']." ".$fechasyhoras['horini_asig_doc']."' = horas or  '".$fechasyhoras['fecini_asig']." ".$fechasyhoras['horfin_asig_doc']."' = horas ;     " )->row_array()  ;
            // var_dump("select horas  from generate_series('".$value['fecini_asig']." ".$value['horini_asig_doc']."'::timestamp,'".$value['fecini_asig']." ".$value['horfin_asig_doc']."'::timestamp,'0.5h') horas       where '".$fechasyhoras['fecini_asig']." ".$fechasyhoras['horini_asig_doc']."' = horas or  '".$fechasyhoras['fecini_asig']." ".$fechasyhoras['horfin_asig_doc']."' = horas ;     ");exit;
            if(!is_null($programacionconductor)){
               // $query = $this->db->query("update t_prog_doctorxturno set  cod_mot=null,nom_mot=null, con_mpos = null, cod_botiquin=null,nro_tablet=null ,nro_maletin=null where  t_prog_doctorxturno.cod_asig = ".$codigo_asignacion);
                    if($cod_mot  == trim($conductor) ){
                        //if( $con_mpos  == $fechasyhoras['con_mpos']  && $botiquin  == trim($fechasyhoras['cod_botiquin'])     &&  $tablet  == trim($fechasyhoras['nro_tablet'])      &&       $maletin  == trim($fechasyhoras['nro_maletin'])       ){
                              return true;
                        //}else{
                         //     return false;     
                        //}
                      
                    }else{
                        return false; //puede ser por true
                    }
            } 
        }
        return true;

       /*  if (! is_null($codigosegus_existe)){
      
          throw new Exception('Conductor ya esta programado.');
         
        } */
 
    
    }
    public function get_programacion($codigo){
         $query = $this->db->query("select  * from t_prog_doctorxturno  where cod_asig=".$codigo) ;
    
        return $query->row_array(); 
    }
    public function validar_conductor($cod_doc,$cod_conductor,$fecha_asignacion){
        $msj = "";
        //doctor
        $query = $this->db->query("SELECT (fecfin_asig + horfin_asig - '00:01:00'::interval) fhfin_asig, * FROM t_doctorxchofer WHERE anulada is null and cod_doc = '".$cod_doc ."' ORDER BY cod_asig DESC limit 1");
        $result_doctor =  $query->row_array(); 
        if(is_null($result_doctor)){
            $fecha_asig_doctor = 0;

        }else{
            $lb_asig_activo_dr = $result_doctor['asig_activo'];
            $fecha_asig_doctor =  $result_doctor['fhfin_asig'];
            $fechaini_asig_doctor =  $result_doctor['fecini_asig'];
            $horaini_asig_doctor =  $result_doctor['horini_asig'];
            $horafin_asig_doctor =  $result_doctor['horfin_asig'];
        }


         //conductor
         $query2 = $this->db->query("SELECT (fecfin_asig + horfin_asig - '00:01:00'::interval) fhfin_asig, * FROM t_doctorxchofer WHERE anulada is null and cod_mot = '".$cod_conductor ."' ORDER BY cod_asig DESC limit 1");
         $result_chofer =  $query2->row_array(); 
         if(is_null($result_chofer)){
             $fecha_asig_chofer = 0;
 
         }else{
            $lb_asig_activo_chofer = $result_doctor['asig_activo'];
             $fecha_asig_chofer =  $result_chofer['fhfin_asig'];
             $fechaini_asig_chofer =  $result_doctor['fecini_asig'];
             $horaini_asig_chofer =  $result_doctor['horini_asig'];
             $horafin_asig_chofer =  $result_doctor['horfin_asig'];
         }
 
   
        if ($fecha_asig_doctor >= $fecha_asig_chofer ){
                    if ($fecha_asig_doctor >= $fecha_asignacion ){
                        If ($lb_asig_activo_dr == True) {
                            $msj = "Ya se realizó la asignación y se encuentra activa, por favor actualizar el listado";
                        }else{
                            $msj =  "Error, Fecha de inicio incorrecta, es menor o igual que la hora final de asignación anterior\n Asignacion anterior de doctor fue desde: " .
                            $fechaini_asig_doctor. " " . $horaini_asig_doctor . " hasta " .$fecha_asig_doctor." ".$horafin_asig_doctor;
                        }
                        return $msj;
                    }
        }else{
                    If ($fecha_asig_chofer >= $fecha_asignacion ){  
                        If ($lb_asig_activo_chofer == True ) {
                            $msj = "Ya se realizó la asignación y se encuentra activa, por favor actualizar el listado";
                        }else{
                            $msj =  "Error, Fecha de inicio incorrecta, es menor o igual que la hora final de asignación anterior\n Asignacion anterior de conductor fue desde: " .
                            $fechaini_asig_chofer. " " . $horaini_asig_chofer . " hasta " .$fecha_asig_chofer." ".$horafin_asig_chofer;
                        }
                        return $msj;
                    }
        } 
     
    } 


    public function cambiar_estado1($fecha_inicio,$fecha_fin) {
        $this->db->query("UPDATE t_prog_doctorxturno SET estado_prog='1' where estado_prog='0' AND fecini_asig between '".$fecha_inicio."' AND '".$fecha_fin."';");
        return ($this->db->affected_rows() != 1) ? false : true;

    }

    
    public function actualizar_fechas_bdparametros($fecha_inicio,$fecha_fin) {
        $this->db->query("UPDATE m_parametros_bd SET fecha_val = '".$fecha_inicio."' WHERE id_parm in (45);");
        $this->db->query("UPDATE m_parametros_bd SET fecha_val = '".$fecha_fin."' WHERE id_parm in (44);");
        return ($this->db->affected_rows() != 1) ? false : true;

    }
   

    public function eliminar_turnos($nom_usu,$fecha_inicio,$fecha_fin) {
        $this->db->query("DELETE FROM t_prog_doctorxturno where cod_doc='".$nom_usu."' AND fecini_asig between '".$fecha_inicio."' AND '".$fecha_fin."';");
        return ($this->db->affected_rows() != 1) ? false : true;
    }

    public function valida_anios(){
        $query = $this->db->query("SELECT DISTINCT EXTRACT(YEAR FROM fecini_asig) AS anio FROM t_prog_doctorxturno WHERE cod_doc = '".$user."' AND EXTRACT(YEAR FROM fecini_asig)<DATE_PART('year', CURRENT_DATE)");
        if ($query->num_rows() > 0)
        {
            echo "CONFORME!!";
        }else{
            echo "ERROR";
        }
    }

    public function getespecialidades_edit(){
        $query = $this->db->query("select*from vw_especialidades_editar");
        if ($query->num_rows() > 0)
        {
            echo "CONFORME!!";
        }else{
            echo "ERROR";
        }
    }


}