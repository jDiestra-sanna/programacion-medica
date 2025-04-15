<?php
$this->load->database();
$this->load->model('LoginModel');


$result_secret=implode($result_secret);

$user_name = $this->db->query("select user_name from qr_user where two_factor_key = '".$result_secret."'");
$user_name = implode($user_name->row_array());

// $pass = $this->db->query("select pas_usu from m_usuarios where nom_usu='". $user_name."'");
// $pass = trim(implode($pass ->row_array()));


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
        <h5>Doble factor de autenticación  </h5><hr />
            <p class="mt-3">1. Abrir la aplicación de Google Authenticator. 
            <p class="mt-3">2. Ingresar el código de Programación médica y presionar el botón validar.</p>
            <br>
            <div class="row">
                <div class="col-md-4">
                    <form id="activate-second-factor" method="POST" action="<?php echo base_url();  ?>login/login_two_factor" id="formulario">                   
                        <div class="form-group">
                            <label for="code"><h6>Ingrese el código aquí</h6></label>
                            <input type="text" class="form-control" id="code" name="code">
                            <input type="hidden" id="secret" name="secret" value="<?= $result_secret?>"> 
                            <input type="hidden" id="user_name" name="user_name" value="<?= $user_name?>"> 
                            <input type="hidden" id="pass" name="pass" value="<?= $pass?>"> 
                        </div>
                        <button type="submit" class="btn btn-primary">Validar</button>    
                    </form>  
                    <br> 
                    <script>

                    function reset_token() {
                    var datos = {
                        user_name: document.getElementById('user_name').value
                    };

                    fetch("/login/recupera_token", {
                        method: "POST",
                        body: JSON.stringify(datos)
                    })
                        .then(function(response) {
                        if (response.ok) {
                            return location.reload();
                        }
                        throw new Error("Error en la solicitud AJAX: " + response.status);
                        })
                        .then(function(responseText) {
                        console.log(responseText);
                        // Realizar acciones adicionales después de recibir la respuesta del servidor
                        })
                        .catch(function(error) {
                        console.log(error);
                        });
                    }

                    </script>
                    <button onclick="reset_token()" class="btn btn-success">Recuperar código de google</button>
                    <br>  
                    <br>  
                      
                    <form id="activate-second-factor" method="POST" action="<?php echo base_url();  ?>login/logout">                   
                        <button type="submit" class="btn btn-danger">Regresar al login</button>                  
                    </form> 
                    <br>
                    <h8>Si usted tiene alguna duda o problema acerca de esto, puede enviar un correo a drmas.sistemas@sanna.pe </h8>
                </div>
            </div>
        </div>


   
</body>

</html>

