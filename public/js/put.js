document.addEventListener("DOMContentLoaded", function() {
    const updateForm = document.getElementById('update-form');
  
    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const id_UsuarioInput = document.getElementById('id_Usuario');
        const nombreInput = document.getElementById('nombre');
        const correoInput = document.getElementById("correo");
    
        if (id_UsuarioInput && nombreInput && correoInput) {
            const id_Usuario = id_UsuarioInput.value;
            const nombre = nombreInput.value;
            const correo = correoInput.value;

            console.log("Id_Usuario: " + id_Usuario );
            console.log("nombre: " + nombre );
            console.log("correo: " + correo );
    
            // Realizar la solicitud de actualización al servidor
            fetch(`http://localhost:3000/CRUDRepo/ActualizarUsuario/${id_Usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, correo })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo actualizar el usuario');
                }
                return response.json();
            })
            .then(data => {
                // Utilizando SweetAlert2 para mostrar un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: data.message
                }).then(() => {
                    // Redireccionar a otra página, recargar la página, etc.
                    //AQUI REDIRECCIONA AL ADMINISTRADOR CUANDO YA ACTUALIZÓ AL USUARIO------------
                    updateForm.reset();
                    window.location.href ='/admin.html';
                    
                });
            })
            .catch(error => {
                console.error('Error al actualizar el usuario:', error);
                // Utilizando SweetAlert2 para mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Ocurrió un error al intentar actualizar el usuario'
                });
            });
        } else {
            console.error('No se pudo encontrar el elemento id_Usuario nombre o correo en el DOM');
            // Utilizando SweetAlert2 para mostrar un mensaje de error
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ocurrió un error al intentar actualizar el usuario'
            });
        }
    });
});