// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código

$(document).ready(function() {   

    // Asigna un evento de envío al formulario con id 'registerForm'
    $('#signupForm').submit(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Obtiene los valores de los campos de entrada
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        //SE RETIRO LA CONFIRMACIÓN DE LA CLAVE--------------------------------------------------------
       
            
        // Realiza una solicitud AJAX al servidor para registrar un nuevo usuario       
        $.ajax({
            url: '/signup', //SE CAMBIO EL ('/register)
            type: 'POST',
            data: { name: name, email: email, password: password }, 
            //SE CAMBIO EN LA LINEA 19 LOS CAMPOS USERNAME POR (EMAIL)---------------------------------------

            // Función a ejecutar si la solicitud es exitosa
            success: function(response) {
                // Verifica si el usuario se registró correctamente
                if (response.registered) {
                    // Muestra un mensaje de éxito utilizando la librería Swal
                    Swal.fire('Registro exitoso', '¡Usuario registrado correctamente!', 'success').then(() => {
                        // Redirige a la página de inicio de sesión después de que se cierre el mensaje de éxito
                        window.location.href = '/login.html';                    
                    });
                } else {
                    // Muestra un mensaje de error utilizando la librería Swal
                    Swal.fire('Error', 'La creación del usuario fallo', 'error');
                }
            },
            // Función a ejecutar si hay un error en la solicitud
            error: function(xhr, status, error) {
                // Muestra un mensaje de error utilizando la librería Swal
                Swal.fire('Error', 'El usuario ya está registrado.', 'error');
            }
        });
        
    });
//AQUI AGREGUÉ ESTO:
// Asigna un evento de envío al formulario con id 'loginForm'
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario (EVITA QUE LA PAGINA SE RECARGUE)
        // Obtiene los valores de los campos de entrada

        let email = $('#email').val(); //SE CAMBIO EL USERNAME POR (email)
        let password = $('#password').val();

        // Realiza una solicitud POST al servidor con los datos de inicio de sesión
        $.post('/login', {email: email, password: password}, function(response) {
            //SE CAMBIO EN LA LINEA 55 EL USERNAME POR (email)
            // Verifica si el usuario existe en la respuesta del servidor
            if (response.exists) {
                // Redirige a la página de inicio
                window.location.href = '/indexAlex.html'; //SE CAMBIO DEL HOME POR ('/indexAlex';)
            } else {
                // Muestra un mensaje de error utilizando la librería Swal
                Swal.fire('Usuario no encontrado', 'El usuario no existe.', 'error');
            }
        });
    });
});
