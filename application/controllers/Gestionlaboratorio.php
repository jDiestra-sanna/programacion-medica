<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
 
class Gestionlaboratorio extends CI_Controller {

     public function __construct(){
        parent::__construct();
         $this->load->library('session');
         $this->load->library('pagination');
         $this->load->helper(array('email'));
        $this->load->library(array('ion_auth','form_validation','email','pagination'));
        $this->load->helper(array('maestros/sede_rules','string'));
        $this->load->model('GestionlaboratorioModel');
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
        public function examenes($rowno = 0){
       
		 
 
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

        public function cambios($rowno = 0){
       
		 
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
                        
              if ($this->ion_auth->is_admin('GESTION EXAMENES - CAMBIOS')){				
                     $this->getTemplate($this->load->view('/laboratorio/cambios',array('d' => "{}"),true));

                } 
            }
        }
        
        public function reporte_registro_snc($rowno = 0){
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
                        
                if ($this->ion_auth->is_admin('GESTION EXAMENES - CAMBIOS')){				
                     $this->getTemplate($this->load->view('/laboratorio/reporte_registro_snc',array('d' => "{}"),true));

                } 
            }
        }
        public function snc($rowno = 0){
 
            $d = "{}"; 
            if (!$this->ion_auth->logged_in())
            {
            // the user is not logging in so display the login page
                // set the flash data error message if there is one
         
                $this->_render_page('login','');
    
            }else{
                        
            if ($this->ion_auth->is_admin('GESTION EXAMENES - CAMBIOS')){				
                    $sncs = $this->GestionlaboratorioModel->getsncs();
                    $this->getTemplate($this->load->view('/laboratorio/snc', array('body' => utf8_converter($sncs)),true));
                } 
            }
        }
    public function getTemplate($view){
         $data1['idscript'] = "show_gestionlaboratorio.js";
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

    public function cargar_servnoconforme(){ 
   
        $Data = json_decode(file_get_contents('php://input'), true);
        $cmbservicio = $Data['cmbservicio'];
        $s_tipo_seg = $Data['s_tipo_seg'];
    
        $reporte = utf8_converter($this->GestionlaboratorioModel->cargar_servnoconforme($cmbservicio,$s_tipo_seg) ) ;
        echo   json_encode($reporte);

    }
    public function generarreporteregistro_snc( ) {
        set_time_limit( 0); 
        ini_set('memory_limit', '2048M');
        $Data = json_decode(file_get_contents('php://input'), true);
        $fecinicio = $Data['fecinicio'];
        $fecfinal = $Data['fecfinal'];
        $tipo = $Data['tipo'];
        $cmbservicio = $Data['cmbservicio'];
        $Check1 = $Data['Check1'];
        $DBDes_snc = $Data['DBDes_snc'];

        $reporte = utf8_converter($this->GestionlaboratorioModel->generarreporteregistro_snc($fecinicio,$fecfinal,$tipo,$cmbservicio,$Check1,$DBDes_snc) ) ;
        echo   json_encode($reporte);
         
      }
  public function busquedaHorario($rowno=0) {
    $config['base_url'] = base_url().'/gestionlaboratorio/busquedaHorario';
    $config['total_rows'] = 200;
    $config['per_page'] = 100;
    $this->pagination->initialize($config);

    $Data = json_decode(file_get_contents('php://input'), true);
    $filtro = $Data['filtro'];
    $estado_ekg =$Data['estado_ekg'];
    $clasificacion_serv = $Data['clasificacion_serv'];
    $fec_inicial = $Data['fec_inicial'];
    $fec_final = $Data['fec_final'];
    $finalizadas =$Data['finalizadas'];
    $cbo_opcion2 =$Data['cbo_opcion2'];
    $flebotomista =$Data['flebotomista'];
    $txt_PacDrAseg =$Data['txt_PacDrAseg'];
    $cbo_estado =$Data['cbo_estado'];
    $cbo_clasif =$Data['cbo_clasif'];
    $cbo_tipo =$Data['cbo_tipo'];
    $cbo_programa =$Data['cbo_programa'];
    $Txt_cod_prueba =$Data['Txt_cod_prueba'];
    $cbo_estados =$Data['cbo_estados'];
    $dni =$Data['dni'];
    $atencion =$Data['atencion'];

    $ls_dni ="";
    $ls_atencion ="";

    $ls_SQLCond = "";
    if ($filtro == "12"){
         
                $cond_ekg_estado = " AND a.estado = '" . $estado_ekg . "' ";
                if  ($clasificacion_serv != "TODOS") {
                   $cond_ekg_estado = $cond_ekg_estado . " AND  f_clasificacion(a.cod_ate) like '" .$clasificacion_serv. "%' ";
                }
  
        if (!is_null($fec_inicial)) {
            $ls_RangFecha = " AND a.fecha_servicio between '" . $fec_inicial . "' and '".  $fec_final . "' ";
        }else{
            $ls_RangFecha = " AND a.fecha_servicio = '" . $fec_final . "' ";
        }
        if (!empty($dni)){
            $ls_dni = " AND pac.num_doc_id = '" . $dni . "' ";
        } 
         
        if (!empty($atencion)){
            $ls_atencion = " AND a.cod_ate = '" . $atencion . "' ";
        } 
         
        $ls_SQLCond = " WHERE a.cod_clasif in (1,2,11,200,201,202,203) AND a.cod_servicios = 3 " . $ls_RangFecha . $ls_dni.$ls_atencion. $cond_ekg_estado . " ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
            
        $ls_SQLaux = "SELECT a.estado, a.tipo,a.clasificacion, a.cod_serv_laboratorio, a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada, a.hora_coordinada, a.cod_servicios,clasif.tipo_operacion_precisa,pac.num_doc_id ".
                "FROM t_cab_lab_serv_laboratorio a  join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif  LEFT JOIN m_pacientesdrmas pac ON a.cod_tit = pac.cod_hia  left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis left join m_doctores dr ON a.cod_doc = dr.cod_doc left join m_grupos gru on a.cod_gru = gru.cod_gru ";
                
    }else{
        
                if (!$finalizadas){
                            
                    $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, pac.nom_com nom_pac, d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada, a.hora_coordinada, a.cod_servicios,clasif.tipo_operacion_precisa,pac.num_doc_id from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif LEFT JOIN m_pacientesdrmas pac ON a.cod_tit = pac.cod_hia  left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis left join m_doctores dr ON a.cod_doc = dr.cod_doc left join m_grupos gru on a.cod_gru = gru.cod_gru WHERE a.estado not in ('6', 'R6', 'C') ";
                    
                    if ($filtro == "2") {
                        
                        if (!is_null($fec_inicial)) {
                            $ls_RangFecha = " AND a.fecha_coordinada between '" .$fec_inicial. "' and '" .$fec_final. "' ";
                        }else{
                            $ls_RangFecha = " AND a.fecha_coordinada <= '" .$fec_final. "' ";
                        }
                    }else{
                        if(!is_null($fec_inicial)) {
                            $ls_RangFecha = " AND a.fecha_servicio between '" .$fec_inicial. "' and '" .$fec_final. "' ";
                        }else{
                            $ls_RangFecha = " AND a.fecha_servicio <= '" .$fec_final. "' ";
                        }
                     
                    }
                    if (!empty($dni)){

                    $ls_dni = " AND pac.num_doc_id = '" . $dni . "' ";
                    }
                    if (!empty($atencion)){
                        $ls_atencion = " AND a.cod_ate = '" . $atencion . "' ";
                    } 
                    switch (trim($filtro)) {
                        
                        Case "0":
                            switch($cbo_opcion2){
                                Case "0":
                                    $ls_opc2 = " AND a.cod_servicios = 1 ";
                                break;
                                Case "1":
                                    $ls_opc2 = " AND a.cod_servicios = 2 ";
                                break;
                                Case "2":
                                    $ls_opc2 = " AND a.cod_servicios = 3 ";
                                break;
                                Case "3":
                                    $ls_opc2 = " AND a.cod_servicios = 4 ";
                                break;
                                Case "4":
                                    $ls_opc2 = " AND a.cod_servicios = 7 ";
                                break;

                            }
                            $ls_SQLaux = $ls_SQLaux . $ls_opc2 . $ls_RangFecha. $ls_dni.$ls_atencion;
                        break;
                        Case "3":
                            $ls_SQLaux = $ls_SQLaux . " and pac.nom_com like '" . Trim($txt_PacDrAseg) . "%'" . $ls_RangFecha. $ls_dni.$ls_atencion;
                        break;
                        Case "4":
                            $ls_SQLaux = $ls_SQLaux . " and dr.nom_doc like '" . Trim($txt_PacDrAseg) . "%'" . $ls_RangFecha. $ls_dni.$ls_atencion;
                        break;  
                        Case "5":
                            $ls_SQLaux = $ls_SQLaux . " and gru.nom_gru like '" . Trim($txt_PacDrAseg) . "%'" . $ls_RangFecha. $ls_dni.$ls_atencion;
                        break;  
                        Case "6":
                            $ls_SQLaux = $ls_SQLaux . " AND a.estado in ('" . str_replace(",", "','",Trim($cbo_estado)) . "') " . $ls_RangFecha. $ls_dni.$ls_atencion;
                      /*       var_dump($ls_SQLaux);
                            exit; */
                        break;
                        Case "7":
                            $ls_SQLaux = $ls_SQLaux . " AND a.clasificacion = '" . Trim($cbo_clasif) . "'" . $ls_RangFecha. $ls_dni.$ls_atencion;
                        break; 
                        Case "8":
                            $ls_SQLaux = $ls_SQLaux . " and d.des_dis like '" . Trim($txt_PacDrAseg) . "%'" . $ls_RangFecha. $ls_dni.$ls_atencion;
                        break; 
                        Case "1":
                            $ls_SQLaux = $ls_SQLaux . $ls_RangFecha. $ls_dni.$ls_atencion . " AND a.cod_servicios <> 3 ";
                        break;
                        Case "10":
                            $ls_SQLaux = $ls_SQLaux . " AND a.tipo= '" . Trim($cbo_tipo) . "'" . $ls_RangFecha. $ls_dni.$ls_atencion;
                        break; 
                        Case "11":
                            $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate,case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, pac.nom_com nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada, a.hora_coordinada, a.cod_servicios,clasif.tipo_operacion_precisa,pac.num_doc_id  from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif  LEFT JOIN m_pacientesdrmas pac ON a.cod_tit = pac.cod_hia left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis ";
                            $ls_SQLaux = $ls_SQLaux . " WHERE a.cod_serv_laboratorio = " .  $Txt_cod_prueba;
                        break;
                        Case "9":
                           switch ($cbo_programa) {
                                Case "0":
                                    $ls_SQLaux = $ls_SQLaux . " AND a.cod_servicios <> 3 " . $ls_RangFecha. $ls_dni.$ls_atencion;
                                break;
                                Case "3":
                                    $ls_SQLaux = $ls_SQLaux . " AND a.cod_servicios <> 3 AND (clasif.nom_clasif like 'CRONICO%' OR clasif.nom_clasif like 'MAXISALUD%') " . $ls_RangFecha. $ls_dni.$ls_atencion;
                                break;
                                Case "1":
                                    $ls_SQLaux = $ls_SQLaux . " AND a.cod_servicios <> 3 AND (clasif.nom_clasif like 'AGUDO%') " . $ls_RangFecha. $ls_dni.$ls_atencion;
                                break;
                                Case "2":
                                    $ls_SQLaux = $ls_SQLaux . " AND a.cod_servicios <> 3 AND (clasif.nom_clasif like 'ESPECIALISTA%') " . $ls_RangFecha. $ls_dni.$ls_atencion;
                                break;
                                Case "4":
                                    $ls_SQLaux = $ls_SQLaux . " AND a.cod_servicios <> 3 AND (clasif.nom_clasif like 'AUTO COVID%') " . $ls_RangFecha. $ls_dni.$ls_atencion;
                                break;
                                Case "6":
                                    $ls_SQLaux = $ls_SQLaux . " AND a.cod_servicios <> 3 AND (clasif.nom_clasif like 'DR. ONLINE%') " . $ls_RangFecha. $ls_dni.$ls_atencion;
                                break;
                                Case "5":
                                    $ls_SQLaux = $ls_SQLaux . " AND a.cod_servicios <> 3 AND (clasif.nom_clasif like 'ASEGURABILIDAD%') " . $ls_RangFecha. $ls_dni.$ls_atencion;
                                break;
                            }
                        break;
                        Case "2":
                            $ls_SQLaux = $ls_SQLaux . " AND cod_resp_muestra = '" .$flebotomista. "' " . $ls_RangFecha. $ls_dni.$ls_atencion;
                            $flg_export = True;
                        break;
                       
                    }

                   if (trim($filtro) == "2") {
                       $ls_SQLaux =   $ls_SQLaux . " ORDER BY a.fecha_coordinada ASC, a.hora_coordinada ASC";
                   }else{
                       $ls_SQLaux =   $ls_SQLaux . " ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                   }
                    
                    
                }else{//sin check finalizadas
                    if (!empty($dni)){
                    $ls_dni = " AND pac.num_doc_id = '" . $dni . "' ";
                    }
                    if (!empty($atencion)){
                        $ls_atencion = " AND a.cod_ate = '" . $atencion . "' ";
                    } 
                    if ($cbo_estados = "6") {
                        if ($filtro == "1") {
                            $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else  clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado in ('6','R6') " ;
                            $ls_SQLaux = $ls_SQLaux . " AND a.fecha_servicio <= current_date ORDER BY a.fecha_servicio desc,a.estado ASC";
                            
                        }elseif ($filtro ==  "3") {
                            
                            if (!is_null($fec_inicial)) {
                                $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado in ('6', 'R6') " ;
                                $ls_SQLaux = $ls_SQLaux . "and a.nom_pac like '" . trim($txt_PacDrAseg) . "%' AND a.fecha_servicio>='" . $fec_inicial . $ls_dni.$ls_atencion."' and a.fecha_servicio<= '" . $fec_final . "' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                            }else{
                                $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a  join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado in ('6', 'R6') " ;
                                $ls_SQLaux = $ls_SQLaux .  "and a.nom_pac like '" . trim($txt_PacDrAseg) . "%' AND a.fecha_servicio<= '" .  $fec_final. $ls_dni.$ls_atencion. "' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                            }
                        }elseif ($filtro ==  "10")  {
                            $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a  join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado in ('6', 'R6') " ;
                            $ls_SQLaux = $ls_SQLaux . "and a.tipo= '" . trim($cbo_tipo) . "' AND a.fecha_servicio<= '" . $fec_final . $ls_dni.$ls_atencion ."' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                        
                        }elseif ( $filtro == "9") {
                            $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado  in ('6', 'R6') ";
                            
                            if (!is_null($fec_inicial) ){
                                $ls_SQLaux = $ls_SQLaux . " AND a.fecha_servicio between '" . $fec_inicial ."' AND '"  . $fec_final. $ls_dni.$ls_atencion.   "' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                            }else{
                                $ls_SQLaux = $ls_SQLaux . " AND a.fecha_servicio = '" . $fec_final .  $ls_dni.$ls_atencion.  "' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                            }
                            
                        }elseif ( $filtro = "11") {
                            $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis WHERE a.estado in ('6','R6') AND a.cod_serv_laboratorio = ". $Txt_cod_prueba . " ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                        }
            
                        //Call Abre_Detalle(Adata5, ls_SQLaux5);
                        
                    
                    }elseif ($cbo_estados == "C" ){
                      
                        if ($filtro == "1") {
                            $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada ,a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado ='C' " ;
                            $ls_SQLaux = $ls_SQLaux .  $ls_dni.$ls_atencion. " AND a.fecha_servicio <=  current_date ORDER BY a.fecha_servicio ASC,a.estado ASC";
                        }elseif ($filtro == "3") {
                            if (!is_null($fec_inicial)) {
                                $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada,a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado ='C' " ;
                                $ls_SQLaux = $ls_SQLaux . $ls_dni.$ls_atencion.  "and a.nom_pac like '" . trim($txt_PacDrAseg) . "%' AND a.fecha_servicio>='".$fec_inicial. "' and a.fecha_servicio<= '" .$fec_final."' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                            }else{
                                $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado ='C' " ;
                                $ls_SQLaux = $ls_SQLaux .  $ls_dni.$ls_atencion."and a.nom_pac like '" . trim($txt_PacDrAseg) . "%' AND a.fecha_servicio<= '".$fec_final. "' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                            }
                        }elseif ($filtro == "9")  {
                            $ls_SQLaux = "select a.estado,a.tipo,a.clasificacion,a.cod_serv_laboratorio,a.cod_ate, case g.cod_gru when  '002' then 'DOCTORMAS' else clasif.nom_clasif end, a.nom_pac,d.des_dis,a.fecha_creacion,a.hora_creacion,a.fecha_servicio,a.fecha_maxima,a.fecha_coordinada , a.hora_coordinada, a.cod_servicios from t_cab_lab_serv_laboratorio a join m_grupos  g on a.cod_gru = g.cod_gru INNER JOIN m_clasificacion_pac clasif ON a.cod_clasif = clasif.cod_clasif left join m_lab_laboratorios c on a.cod_laboratorios=c.cod_laboratorios left join m_distritos d on a.cod_dis=d.cod_dis where a.estado  ='C' " ;
                            $ls_SQLaux = $ls_SQLaux .  $ls_dni.$ls_atencion.  " AND a.fecha_servicio<= '" .$fec_final. "' ORDER BY a.fecha_servicio desc, a.estado ASC, fecha_maxima ASC";
                        }else{
                            //MsgBox "Seleccione las opciones por Fecha de servicio o Paciente"
                             
                            //Exit Sub
                        }
                         
                      
                       
                    }
                
                    
                }
    }   

    //$horarios = $this->GestionlaboratorioModel->get_busquedaexamenes($ls_SQLaux .$ls_SQLCond);   
      //// Row per page
      $rowperpage = 100;
    
      // Row position
      if($rowno != 0){
        $rowno = ($rowno-1) * $rowperpage;
      }
   
      // All records count
      $allcount = $this->GestionlaboratorioModel->getrecordCount($ls_SQLaux .$ls_SQLCond);
      
      // Get records
      $ordenes = $this->GestionlaboratorioModel->get_busquedaexamenes($ls_SQLaux.$ls_SQLCond,$rowno,$rowperpage);
      $d=utf8_converter($ordenes);

      // Pagination Configuration
      $config['base_url'] = base_url().'gestionlaboratorio/busquedaHorario';
      $config['use_page_numbers'] = TRUE;
      $config['total_rows'] = $allcount;
      $config['per_page'] = $rowperpage;
      $config['first_link'] = 'Primero';
      $config['num_links'] = 15;
      $config['last_link'] = 'Ultimo';



      
      // Initialize
      $this->pagination->initialize($config);
  
      // Initialize $data Array
      $data['pagination'] = $this->pagination->create_links();
      $data['result'] = $d;
      $data['row'] = $rowno;
      $data['ls_SQLCond'] = $ls_SQLCond;
      $data['ls_SQLaux'] = $ls_SQLaux.$ls_SQLCond;

      echo json_encode($data);
    //echo  json_encode($d); 

  }
  public function getclasificacionserv() {
      
 
    $clasificacionserv = $this->GestionlaboratorioModel->getclasificacionserv( );   
    $d=utf8_converter($clasificacionserv);
    echo  json_encode($d); 



  } 

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

  public function get_pruebas() {
     $Data = json_decode(file_get_contents('php://input'), true);
    $cod_serv_laboratorio = $Data['cod_serv_laboratorio'];
    $documento = $Data['documento'];
    $operacionprecisa = $Data['operacionprecisa'];
 
       $resultado = $this->GestionlaboratorioModel->get_pruebas($cod_serv_laboratorio,$documento,$operacionprecisa); 
    echo  json_encode(utf8_converter($resultado)); 
    }


    public function cambiarestado() {
        //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
          //add the header here
        //   header('Content-Type: application/json');
        //   echo json_encode( $arr );
    
           $Data = json_decode(file_get_contents('php://input'), true);
          
        $orden = $Data['orden'];
       
        $ordenresult = $this->GestionlaboratorioModel->cambiarestado($orden);   
        
        echo  json_encode($ordenresult); 
    } 
    public function cambiarclasif() {
        //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
          //add the header here
        //   header('Content-Type: application/json');
        //   echo json_encode( $arr );
    
           $Data = json_decode(file_get_contents('php://input'), true);
          
        $orden = $Data['orden'];
        $clasif = $Data['clasif'];

        $ordenresult = $this->GestionlaboratorioModel->cambiarclasif($orden,$clasif);   
        
        echo  json_encode($ordenresult); 
    }
    public function get_pacientedrmas( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $paciente = $Data['paciente'];
        $pacientes = $this->GestionlaboratorioModel->get_pacientedrmas($paciente);   
         echo  json_encode(utf8_converter($pacientes)); 
      }

      public function actualizaratepaciente( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $codatepaciente = $Data['codatepaciente'];
        $cod_tit = $Data['cod_tit'];

         $rpta = $this->GestionlaboratorioModel->actualizaratepaciente($codatepaciente,$cod_tit);   
        echo  json_encode($rpta); 
      } 
    public function asociarorden() {
        //   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);    
          //add the header here
        //   header('Content-Type: application/json');
        //   echo json_encode( $arr );
    
           $Data = json_decode(file_get_contents('php://input'), true);
          
        $orden = $Data['orden'];
        $atencion = $Data['atencion'];

        $asocia = $this->GestionlaboratorioModel->asociarorden($orden,$atencion);   
        
        echo  json_encode($asocia); 
    } 
    public function cambiar_estado_orden() {
        
           $Data = json_decode(file_get_contents('php://input'), true);
          
        $cod_serv_laboratorio = $Data['cod_serv_laboratorio'];
        $cambio_estado = $Data['cambio_estado'];

        $ordenresult = $this->GestionlaboratorioModel->cambiar_estado_orden($cod_serv_laboratorio,$cambio_estado);   
        
        echo  json_encode($ordenresult); 
    }
    

    public function get_flebotomistasxproveedor(){

        $Data = json_decode(file_get_contents('php://input'), true);
          
        $proveedorflebotomista = $Data['proveedorflebotomista'];
       
        $flebotomistas = $this->GestionlaboratorioModel->get_flebotomistasxproveedor($proveedorflebotomista);   
    
        echo  json_encode(utf8_converter($flebotomistas)); 

    } 
    public function get_conductoresxremisse(){

        $Data = json_decode(file_get_contents('php://input'), true);
          
        $proveedorconductor = $Data['proveedorconductor'];
       
        $conductores = $this->GestionlaboratorioModel->get_conductoresxremisse($proveedorconductor);   
    
        echo  json_encode(utf8_converter($conductores)); 

    }
    
    public function actualizarproveedorremisse(){

        $Data = json_decode(file_get_contents('php://input'), true);
          
        $codmot = $Data['codmot'];
        $cod_serv_laboratorio = $Data['cod_serv_laboratorio'];

        $respuesta = $this->GestionlaboratorioModel->actualizarproveedorremisse($codmot,$cod_serv_laboratorio);   
    
        echo  json_encode( $respuesta); 

    }
    public function actualizarproveedorlaboratorio(){

        $Data = json_decode(file_get_contents('php://input'), true);
          
        $codlaboratorio = $Data['codlaboratorio'];
        $cod_serv_laboratorio = $Data['cod_serv_laboratorio'];

        $respuesta = $this->GestionlaboratorioModel->actualizarproveedorlaboratorio($codlaboratorio,$cod_serv_laboratorio);   
    
        echo  json_encode( $respuesta); 

    }
    public function actualizarproveedorlaboratorio_flebotomista(){

        $Data = json_decode(file_get_contents('php://input'), true);
          
        $codlaboratorio = $Data['codlaboratorio'];
        $codflebotomista = $Data['codflebotomista'];
        $nomflebotomista = $Data['nomflebotomista'];
        $cod_serv_laboratorio = $Data['cod_serv_laboratorio'];

        $respuesta = $this->GestionlaboratorioModel->actualizarproveedorlaboratorio_flebotomista($codlaboratorio,$codflebotomista,$nomflebotomista,$cod_serv_laboratorio);   
    
        echo  json_encode( $respuesta); 

    }
    public function get_proveedores_laboratorio(){

       
        $proveedoreslaboratorio = $this->GestionlaboratorioModel->get_proveedores_laboratorio();   
    
        echo  json_encode(utf8_converter($proveedoreslaboratorio)); 

    }

    
    public function get_proveedores_remisse(){

       
        $proveedoresremisse = $this->GestionlaboratorioModel->get_proveedores_remisse();   
    
        echo  json_encode(utf8_converter($proveedoresremisse)); 

    }
    public function Adata_pruebas( ) {
    

        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_servicio = $Data['cod_servicio'];
        $txt_prueba = $Data['txt_prueba'];
        $Adata_pruebas = $this->GestionlaboratorioModel->Adata_pruebas($txt_prueba,$cod_servicio);   
         echo  json_encode(utf8_converter($Adata_pruebas)); 
      }
      public function getpruebas( ) {
    
 
        $Adata_pruebas = $this->GestionlaboratorioModel->getpruebas();   
         echo  json_encode(utf8_converter($Adata_pruebas)); 
      }
      public function get_flebotomistas( ) {
    
        $Adata_pruebas = $this->GestionlaboratorioModel->get_flebotomistas();   
         echo  json_encode(utf8_converter($Adata_pruebas)); 
      }
      public function prueba($offset = 0){
   
 

        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
        {
        // the user is not logging in so display the login page
            // set the flash data error message if there is one
     
            $this->_render_page('login','');

        }else{
           if ($this->ion_auth->is_admin('GESTION EXAMENES - PRUEBAS') ){	
            $pruebas = $this->GestionlaboratorioModel->getpruebas();
           $this->getTemplate($this->load->view('/laboratorio/prueba', array('body' => utf8_converter($pruebas)),true));
           }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - SUPERVISOR - MALETIN')){				
            redirect('/admin/mantenimiento/maletin', 'refresh'); 
           } else if ($this->ion_auth->is_admin()) {
                $this->getTemplate($this->load->view('/admin/horario',array('d' => "{}"),true));
            }else if($this->ion_auth->is_admin('PROGRAMACION MEDICA - DOCTOR'))  {
                redirect('horarios', 'refresh');
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - COORDINADOR') ){				
              redirect('/admin/mantenimiento/maletin', 'refresh'); 
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - PROVEEDOR')){				
                redirect('proveedor/horarios', 'refresh');
            }else if ($this->ion_auth->is_admin('PROGRAMACION MEDICA - MIGRACION')){				
                redirect('migracion/horarios', 'refresh');
            } else if ($this->ion_auth->is_admin('GESTION EXAMENES - LABORATORIO')){				
                 $this->getTemplate($this->load->view('/laboratorio/examenes', '',true));
    } 
        }
    }
    public function flebotomista($offset = 0){
   
 

        $d = "{}"; 
        if (!$this->ion_auth->logged_in())
        {
        // the user is not logging in so display the login page
            // set the flash data error message if there is one
     
            $this->_render_page('login','');

        }else{
           if ($this->ion_auth->is_admin('GESTION EXAMENES - FLEBOTOMISTA')){				
            $pruebas = $this->GestionlaboratorioModel->get_flebotomistas();
            $this->getTemplate($this->load->view('/laboratorio/flebotomista', array('body' => utf8_converter($pruebas)),true)); 
            } 
        }
    }
      public function AdataSNC() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $query = $Data['query'];
        $AdataSNC = $this->GestionlaboratorioModel->AdataSNC($query);   
         echo  json_encode(utf8_converter($AdataSNC)); 
      }
      public function Execute(){
        $Data = json_decode(file_get_contents('php://input'), true);
        $query = $Data['query'];
        $execute = $this->GestionlaboratorioModel->AdataSNC($query);   
        echo  json_encode($execute); 
    
      }
      public function AdataSeg() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $query = $Data['query'];
        $AdataSeg = $this->GestionlaboratorioModel->AdataSeg($query);   
         echo  json_encode(utf8_converter($AdataSeg)); 
      }
      public function lrs_Servicio() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $query = $Data['query'];
         $queryalterno = $Data['queryalterno'];

        $lrs_Servicio = $this->GestionlaboratorioModel->lrs_Servicio($query,$queryalterno);   
         echo  json_encode(utf8_converter($lrs_Servicio)); 
      }
      
      public function lrs_ServAso() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $query = $Data['query'];
        $lrs_ServAso = $this->GestionlaboratorioModel->lrs_ServAso($query);   
         echo  json_encode(utf8_converter($lrs_ServAso)); 
      }
      public function Adata_pruebas_detalle() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $cod_serv_laboratorio = $Data['cod_serv_laboratorio'];
        $Adata_pruebas_detalle = $this->GestionlaboratorioModel->Adata_pruebas_detalle($cod_serv_laboratorio);   
         echo  json_encode(utf8_converter($Adata_pruebas_detalle)); 
      }
      
      public function Adata_Auditoria() {

        $Data = json_decode(file_get_contents('php://input'), true);
         $cod_serv_laboratorio = $Data['cod_serv_laboratorio'];
        $Adata_Auditoria = $this->GestionlaboratorioModel->Adata_Auditoria($cod_serv_laboratorio);   
         echo  json_encode(utf8_converter($Adata_Auditoria)); 
      }


      
      public function rs_servicio( ) {
    

        $Data = json_decode(file_get_contents('php://input'), true);
        $Txt_codservlaboratorio = $Data['Txt_codservlaboratorio'];
         $rs_servicio = $this->GestionlaboratorioModel->rs_servicio($Txt_codservlaboratorio);   
         echo  json_encode(utf8_converter($rs_servicio)); 
      }
      public function Adata_clasif( ) {

        $Data = json_decode(file_get_contents('php://input'), true);
      
        $Adata_clasif = $this->GestionlaboratorioModel->Adata_clasif();   
         echo  json_encode(utf8_converter($Adata_clasif)); 
      }    
      public function AData_Distrito( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
      
        $AData_Distrito = $this->GestionlaboratorioModel->AData_Distrito();   
         echo  json_encode(utf8_converter($AData_Distrito)); 
      }   
      
      public function Adata_direccion( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_tit = $Data['cod_tit'];

        $Adata_direccion = $this->GestionlaboratorioModel->Adata_direccion( $cod_tit);   
         echo  json_encode(utf8_converter($Adata_direccion)); 
      }   
      
      public function exportarekg( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $cond = $Data['cond'];

        $Adata_EKG = $this->GestionlaboratorioModel->Adata_EKG( $cond);   
         echo  json_encode(utf8_converter($Adata_EKG)); 
      }   
    public function rs_laboratorio( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $Txt_CodAte = $Data['Txt_CodAte'];
        $rs_laboratorio = $this->GestionlaboratorioModel->rs_laboratorio($Txt_CodAte);   
         echo  json_encode(utf8_converter($rs_laboratorio)); 
      }
      public function rs_laboratorio2( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_tit = $Data['cod_tit'];
        $cod_dir = $Data['cod_dir'];
        $rs_laboratorio2 = $this->GestionlaboratorioModel->rs_laboratorio2($cod_tit,$cod_dir);   
         echo  json_encode(utf8_converter($rs_laboratorio2)); 
      }
      public function lrs_direccion( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $cod_tit = $Data['cod_tit'];
        $cod_dir = $Data['cod_dir'];

        $lrs_direccion = $this->GestionlaboratorioModel->lrs_direccion($cod_tit,$cod_dir);   
         echo  json_encode(utf8_converter($lrs_direccion)); 
      }
      public function Dolar( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
  
        $Dolar = $this->GestionlaboratorioModel->Dolar();   
         echo  json_encode(utf8_converter($Dolar)); 
      }
      public function rs_grupofactor( ) {
    
        $Data = json_decode(file_get_contents('php://input'), true);
        $Txt_codgru = $Data['Txt_codgru'];
        $rs_grupofactor = $this->GestionlaboratorioModel->rs_grupofactor($Txt_codgru);   
         echo  json_encode(utf8_converter($rs_grupofactor)); 
      }
  public function busquedapacientesinasoc($rowno=0) {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    $TxtBucNoPac = $Data['TxtBucNoPac'];
    $pacientes = $this->GestionlaboratorioModel->get_busquedapacientesinasoc($TxtBucNoPac);   
     echo  json_encode(utf8_converter($pacientes)); 
  }
  public function busquedapacienteOptCoAte() {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    $Txt_Busq_Cod_Ate = $Data['Txt_Busq_Cod_Ate'];
    $pacientes = $this->GestionlaboratorioModel->get_busquedapacienteOptCoAte($Txt_Busq_Cod_Ate);   
     echo  json_encode(utf8_converter($pacientes)); 
  }
  public function busquedapacienteOptPac() {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    $Txt_Busq_Pac = $Data['Txt_Busq_Pac'];
    $pacientes = $this->GestionlaboratorioModel->get_busquedapacienteOptPac($Txt_Busq_Pac);   
     echo  json_encode(utf8_converter($pacientes)); 
  }
  public function busquedaliquidado() {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_ate = $Data['cod_ate'];
    $liquidado = $this->GestionlaboratorioModel->get_busquedaliquidado($cod_ate);   
     echo  json_encode(utf8_converter($liquidado)); 
  }
  public function t_tmp_lab() {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_ate = $Data['cod_ate'];
    $liquidado = $this->GestionlaboratorioModel->t_tmp_lab($cod_ate);   
     echo  json_encode(utf8_converter($liquidado)); 
  }
  
  public function get_codigodireccion() {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    $cod_ate = $Data['cod_ate'];
    $liquidado = $this->GestionlaboratorioModel->get_busquedacoddir($cod_ate);   
     echo  json_encode(utf8_converter($liquidado)); 
  }
  public function Correlativo_Serv_Laboratorio() {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    //$cod_ate = $Data['cod_ate'];
    $codigo_cab = $this->GestionlaboratorioModel->Correlativo_Serv_Laboratorio();   
     echo  json_encode(utf8_converter($codigo_cab)); 
  }
  public function busquedadireccion($rowno=0) {
    

    $Data = json_decode(file_get_contents('php://input'), true);
    $Txt_CodTit = trim($Data['Txt_CodTit']);
    $direcciones = $this->GestionlaboratorioModel->get_busquedadireccion($Txt_CodTit);   
     echo  json_encode(utf8_converter($direcciones)); 
  }
  public function agregarprueba( ) {
     
    $Data = json_decode(file_get_contents('php://input'), true);
    $codigo = $Data['codigo'];
    $prueba = $Data['prueba'];
    $unidad = $Data['unidad'];
    $clasificacion = $Data['clasificacion'];
    $prueba = $this->GestionlaboratorioModel->agregarprueba($codigo,$prueba,$unidad,$clasificacion);   
    echo  json_encode($prueba); 
  } 
  
  public function agregarflebotomista( ) {
     
    $Data = json_decode(file_get_contents('php://input'), true);
    $codigoflebotomista = $Data['codigoflebotomista'];
    $apellidosflebotomista = $Data['apellidosflebotomista'];
    $telefonoflebotomista = $Data['telefonoflebotomista'];
    $proveedorflebotomista = $Data['proveedorflebotomista'];
     $flebotomista = $this->GestionlaboratorioModel->agregarflebotomista($codigoflebotomista,$apellidosflebotomista,$telefonoflebotomista,$proveedorflebotomista);   
    echo  json_encode($flebotomista); 
  } 



  public function agregarsnc( ) {
     
    $Data = json_decode(file_get_contents('php://input'), true);
 
    $codigo = $Data['codigo'];
    $tiposervicio = $Data['tiposervicio'];
    $descripcion = $Data['descripcion'];
    $tipo = $Data['tipo'];
    $tiposeguimiento = $Data['tiposeguimiento'];

    $prueba = $this->GestionlaboratorioModel->agregarsnc($codigo,$tiposervicio,$descripcion,$tipo,$tiposeguimiento);   
    echo  json_encode($prueba); 
  } 
  

  public function asignar_proveedor( ) {
     
    $Data = json_decode(file_get_contents('php://input'), true);
    

    $prueba = $this->GestionlaboratorioModel->asignar_proveedor($Data);   
    echo  json_encode($prueba); 
  } 
}

  