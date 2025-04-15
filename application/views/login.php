<!DOCTYPE html>
<html>
<head>
    <title>Programacion Médica</title>
    <link rel="stylesheet" href="/assets/fonts/stagsans/stagsans.css">
    <link rel="stylesheet" href="/assets/css/custom-sanna.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a81368914c.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="/assets/img/logo.png" />
    <style>
        /* Estilos para el modal */
        .modal {
            display: none; /* Oculto por defecto */
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
            background-color: #fefefe;
            margin: 10% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 300px;
            border-radius: 8px;
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover, .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        .input-modal {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
        }
        .btn-update {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px;
            width: 100%;
            cursor: pointer;
        }
        .btn-update:hover {
            background-color: #45a049;
        }

        .requirement {
            color: red;
        }

        .requirement.met {
            color: green;
            font-weight: bold;
        }


    </style>
</head>
<body>
    <img class="wave" src="/assets/img/fondo.jpg" />
    <div class="container">
        <div class="img"></div>
        <div class="login-content">
		<form id="frmlogin2">
		<img src="/assets/img/avatar.svg">
		<div class="input-div one">
		<div class="i"><i class="fas fa-user"></i></div>
		<div class="div">
			<h5>Usuario</h5>
			<input name="usuario" id="usuario" type="text" class="input" value="<?php echo !isset($usuario) ? '' : $usuario['value']; ?>">
		</div>
	</div>
	<div class="input-div pass">
		<div class="i"><i class="fas fa-lock"></i></div>
		<div class="div">
			<h5>Password</h5>
			<input name="password" id="password" type="password" class="input">
		</div>
	</div>
	<div id="infoMessage"><?php echo !isset($message) ? '' : $message; ?></div>
	<?php echo form_label('Mantener sesion', 'remember'); ?>
	<?php echo form_checkbox('remember', '1', FALSE, 'id="remember"'); ?>
	<!-- Modificación aquí -->
	<input id="btn-ingresar" type="button" class="btn" value="Iniciar sesion" onclick="validarCaducidad()">
</form>


            <br>
        </div>
    </div>


<!-- Modal -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>Actualizar Contraseña</h3>

        <input type="password" placeholder="Contraseña actual" class="input-modal" id="current-password">
        <input type="password" placeholder="Nueva contraseña" class="input-modal" id="new-password" oninput="validarRequisitosContrasena()">

        <div id="password-requirements">
            <p>La contraseña debe cumplir con los siguientes requisitos:</p>
            <ul>
                <li id="length" class="requirement">Mínimo 12 caracteres</li>
                <li id="uppercase" class="requirement">Al menos una letra mayúscula</li>
                <li id="number" class="requirement">Al menos un número</li>
                <li id="special" class="requirement">Al menos un carácter especial (@, $, !, %, *, ?, &)</li>
            </ul>
        </div>

        <button class="btn-update" onclick="updatePassword()">Actualizar</button>
    </div>
</div>






<!-- Modal de Error -->
<div id="errorModal" class="modal">
    <div class="modal-content">
        <h3>Error:</h3>
        <p id="errorMensaje"></p>
    </div>
</div>


<script type="text/javascript">
    const inputs = document.querySelectorAll(".input");

    function addcl() {
        let parent = this.parentNode.parentNode;
        parent.classList.add("focus");
    }

    function remcl() {
        let parent = this.parentNode.parentNode;
        if (this.value === "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach(input => {
        input.addEventListener("focus", addcl);
        input.addEventListener("blur", remcl);
    });


    async function validarCaducidad() {

        const usuario = document.getElementById("usuario").value.toUpperCase();
        const contrasena = document.getElementById("password").value;
        const modal = document.getElementById("myModal");
        console.log("Ejecutando validación de usuario...");

        if (!usuario || !contrasena) {
            mostrarPopup("Las credenciales ingresadas son incorrectas.");
            return;
        }

        try {
            const response = await fetch('/login/validar_usuario/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: usuario, password: contrasena })
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data.result);

            if (data.result === "usuario") {
                console.log("Credenciales correctas");

                const passwordValid = validarContrasena(contrasena);
                if (!passwordValid) {
                    console.log("Contraseña inválida. Mostrando popup para actualizar la contraseña...");
                    modal.style.display = "block"; 
                    return;
                }

                try {
                    const response2 = await fetch('/login/validar_caducidad_contrasena/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ user: usuario, password: contrasena })
                    });

                    if (!response2.ok) {
                        throw new Error(`Error en la solicitud: ${response2.status}`);
                    }

                    const data2 = await response2.json();
                    console.log("Respuesta de caducidad:", data2.caducidad);
                    //redireccion(contrasena); 
                    
                    if (data2.caducidad === true) { 
                        console.log("Contraseña caducada. Mostrando popup...");
                        modal.style.display = "block";
                    } else {
                        redireccion(contrasena);                           
                    }

                } catch (error) {
                    console.error("Error en la verificación de caducidad:", error);
                }

            } else if (data.result === "doctor"){
                redireccion(contrasena);
            }else{
                mostrarPopup("Las credenciales ingresadas son incorrectas.");
            }
        } catch (error) {
            console.error("Error en la verificación del usuario:", error);
        }
    }



    async function redireccion(contrasena){

        const usuario = document.getElementById("usuario").value.toUpperCase();
        
        try {
                const response3 = await fetch('/login/redireccionar/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user: usuario, password: contrasena })
                });

                if (!response3.ok) {
                    throw new Error(`Error en la solicitud: ${response3.status}`);
                }

                const data3 = await response3.json();
                if (data3.status === 'success') {
                    // Redireccionar a la URL especificada en la respuesta
                    console.log("Login exitoso.");

                    window.location.href = data3.url;
                } else{
                    alert(data3.message);
                }
            } catch (error) {
                console.error("Error en la verificación de redireccionamiento:", error);
            }

    }


// Función para validar la contraseña
//PENDIENTE PARAMETRIZAR 
function validarContrasena(contrasena) {
    const longitudValida = contrasena.length >= 12 && contrasena.length <= 15;
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneNumero = /\d/.test(contrasena);
    const tieneCaracterEspecial = /[@$!%*?&]/.test(contrasena);

    return longitudValida && tieneMayuscula && tieneNumero && tieneCaracterEspecial;
}



function validarRequisitosContrasena() {
    const contrasena = document.getElementById("new-password").value;

    // Requisitos individuales
    const longitudValida = contrasena.length >= 12;
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneNumero = /\d/.test(contrasena);
    const tieneCaracterEspecial = /[@$!%*?&]/.test(contrasena);

    // Actualizar los estilos de los requisitos
    document.getElementById("length").classList.toggle("met", longitudValida);
    document.getElementById("uppercase").classList.toggle("met", tieneMayuscula);
    document.getElementById("number").classList.toggle("met", tieneNumero);
    document.getElementById("special").classList.toggle("met", tieneCaracterEspecial);
}





function mostrarPopup(mensaje) {
    const modal = document.getElementById("errorModal");
    const mensajeModal = document.getElementById("errorMensaje"); // Asegúrate de tener un elemento para el mensaje
    if (modal) {
        modal.style.display = "block";
        mensajeModal.innerText = mensaje; // Mostrar mensaje personalizado
        cerrarPopupAutomaticamente(modal);
    }
}

function cerrarPopupAutomaticamente(modal) {
    setTimeout(() => {
        modal.style.display = "none"; // Cerrar el modal
    }, 2500); // 2000 ms = 2 segundos
}

	//Funciones para cerrar modal
  const spanClose = document.getElementsByClassName("close")[0];
  const modal = document.getElementById("myModal"); // Cambiado a "myModal"
  const ErrorModal = document.getElementById("errorModal");

    // Cerrar el modal al hacer clic en la "x"
    spanClose.onclick = function() {
        modal.style.display = "none";
    };

    // Cerrar el modal al hacer clic fuera de él
    window.onclick = function(event) {

        if (event.target == ErrorModal) {
            ErrorModal.style.display = "none";
        }
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Función para actualizar la contraseña
    async function updatePassword() {
        const usuario = document.getElementById("usuario").value.toUpperCase();
        const currentPassword = document.getElementById("current-password").value;
        const newPassword = document.getElementById("new-password").value;

        const response = await fetch('/login/actualizar_contrasena/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: usuario, password: currentPassword, newpassword: newPassword })
        });

        const data = await response.json();
        if (data.status) {
            console.log("Contraseña actualizada correctamente.");
            redireccion(newPassword); 
            //modal.style.display = "none";                                    
            
        } else {
            mostrarPopup("Las credenciales ingresadas son incorrectas.");
        }

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
    }

</script>

</body>
</html>
