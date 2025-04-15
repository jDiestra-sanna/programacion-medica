<?php
$this->load->database();
$this->load->model('LoginModel');
$this->load->library(['ion_auth', 'form_validation']);
$this->load->library('GoogleAuthenticator');


    $med = $this->db->query("select * from m_doctores where login='". $user_name."'");
    $result_med = $med->row_array();	
    if(!is_null($result_med)){	 
        $pass = $this->db->query("select num_doc_id from m_doctores where login='". $user_name."'");    
        $result_pass = $pass->row_array();						
        $pass = trim(implode($pass ->row_array()));
    }else{
        $pass = $this->db->query("select pas_usu from m_usuarios where nom_usu='". $user_name."'");
        $result_user = $pass->row_array();	
        if(!is_null($result_user)){	 
            $pass = $this->db->query("select pas_usu from m_usuarios where nom_usu='". $user_name."'");   
            $result_pass = $pass->row_array();						
            $pass = trim(implode($pass ->row_array()));

        }
        }

// $pass = $this->db->query("select pas_usu from m_usuarios where nom_usu='". $user_name."'");
// $pass = trim(implode($pass ->row_array()));

// $result_user = $this->db->query("select pas_usu from m_usuarios where nom_usu='". $user_name."'");
// if(!is_null($result_user)){	 
//     $pass = $this->db->query("select pas_usu from m_usuarios where nom_usu='". $user_name."'");         						
//     $pass = trim($pass ->row_array());
// }else{
//     $result_med = $this->db->query("select * from m_doctores where login='". $user_name."'");
//     if(!is_null($result_med)){	 
//         $pass = $this->db->query("select num_doc_id from m_doctores where login='". $user_name."'");         						
//         $pass = trim(implode($pass ->row_array()));
//     }
// }

//generates the secret code
$secret= $this->googleauthenticator->createSecret();
//generates the QR code for the link the user's phone with the service
$qrCodeUrl = $this->googleauthenticator->getQRCodeGoogleUrl('PROGRAMACION MEDICA', $user_name, $secret);
//$qrCodeUrl = implode($this->LoginModel->get_url($qrCodeUrl));
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Segundo factor</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<body>

        <div class="container mt-5">        
            <h5>Activar doble factor de autenticacion</h5><hr/>
            <p>1. Para activar el segundo factor de autenticacion descargue Google Authenticator en su teléfono y escanee el codigo QR</p>
            <img src="<?= $qrCodeUrl ?>" alt="Codigo QR">

            <p class="mt-4">2. Ingrese el codigo generado por Google Authenticator y presione activar doble factor</p>
            <p class="mt-4">OJO: Si este es su segundo intento y ya tiene el código del Google Authenticator, favor de escanearlo otra vez para que se reemplace por el nuevo.</p>

            <div class="row">
                <div class="col-md-4">
                    <form id="activate-second-factor" method="POST" action="<?php echo base_url();  ?>login/login_two_factor" id="formulario">                   
                        <div class="form-group">
                            <label for="code"><h6>Ingrese aquí su código</h6></label>
                            <input type="text" class="form-control" id="code" name="code"> 
                            <input type="hidden" id="secret" name="secret" value="<?= $secret ?>">
                            <input type="hidden" id="user_name" name="user_name" value="<?= $user_name?>"> 
                            <input type="hidden" id="pass" name="pass" value="<?= $pass?>"> 

                        </div>
                        <button type="submit" class="btn btn-primary">Activar doble factor</button>
                    </form>  
                    <br>  
                    <form id="activate-second-factor" method="POST" action="<?php  echo base_url();  ?>login/logout">                   
                        <button type="submit" class="btn btn-danger">Regresar al login</button>                  
                    </form> 
                    <br>
                    <h8>Si usted tiene alguna duda o problema acerca de esto, puede enviar un correo a drmas.sistemas@sanna.pe </h8>

                    
                  
      
                </div>
            </div>
        </div>


   
</body>
</html>

