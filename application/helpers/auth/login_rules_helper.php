<?php

if(!function_exists('getLoginRules')){
    function getLoginRules(){
        return array(
            array(
                'field' => 'usuario',
                'label' => 'usuario',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'El %s es requerido.'
                )
            ),
            array(
                'field' => 'password',
                'label' => 'Contraseña',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'El %s es requerido.'
                )
            ),
          
            
        );
    }
}