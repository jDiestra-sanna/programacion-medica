<?php

function myfunction($num)
{
  return(($num));
}
function get_combo($tbl,$id,$nm,$add_opt,$nm2=''){

$ci = &get_instance();
$data = $ci->db->get($tbl)->result_array();
$res = array();
$res = $add_opt;

foreach ($data as $v) {
if(empty($nm2)){
	$res[$v[$id]]  =  $v[$nm];
}else{
	$res[$v[$id]]  =  $v[$nm].'-'. $v[$nm2];
}


}


return $res;


}

function get_combo_query_full($tbl,$id,$nm,$nm2=''){
	 
	$ci = &get_instance();

	$data = $ci->db->query($tbl)->result_array();
	$res = array();
 
	
	foreach ($data as $v) {
	if(empty($nm2)){
		$res[$v[$id]]  =  $v[$nm];
	}else{
		$res[$v[$id]]  =  $v[$nm].'-'. $v[$nm2];
	}
	
	
	}
	
	
	return $res;
	
	
	}



function get_combo_query($tbl,$id,$nm,$add_opt,$nm2=''){
	 
	$ci = &get_instance();

	$data = $ci->db->query($tbl)->result_array();
	$res = array();
	$res = $add_opt;
	
	foreach ($data as $v) {
	if(empty($nm2)){
		$res[ trim($v[$id])]  =  trim($v[$nm]);
	}else{
		$res[ trim($v[$id])]  =  trim($v[$nm]).'-'. $v[$nm2];
	}
	
	
	}
	
	
	return utf8_converter($res);
	
	
	}
	function transfer0x00( $str){
        if($str !=null && $str.indexOf(0x00) > -1){
            $str = $str.replace('0x00',' ');
        }
        return $str;
    }


	function utf8_converter($array)
	{       
			array_walk_recursive($array, function(&$item, $key){
				if(!mb_detect_encoding($item, 'utf-8', true)){
				$item =   utf8_encode($item); 
			}
			//$item =  iconv('Windows-1251', 'UTF-8', $item); 
			});
	
	return $array;
	}

	
	function obtenerturno($hora_inicio_dig,$hora_fin_dig){

		if((int) $hora_fin_dig == 0){
			$hora_fin_dig  = 24;
		}
		if ( (int) $hora_inicio_dig >=6 && (int) $hora_fin_dig <= 15){
			$turno = 'M';
		} 
		if ( (int) $hora_inicio_dig >=6 && (int) $hora_fin_dig <= 24){
			$turno = 'M';
		} 
		if ( (int) $hora_inicio_dig >=13 && (int) $hora_fin_dig <= 24 ) {
			$turno = 'T';
		} 
		if ( (int) $hora_inicio_dig >=0 && (int) $hora_fin_dig <= 6){
			$turno = 'Z';
		} 
		return  $turno;

	}


	
 


