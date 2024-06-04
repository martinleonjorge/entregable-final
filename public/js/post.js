// Petición POST para agregar datos
document.addEventListener("DOMContentLoaded", function() {
    const addForm = document.getElementById('add-form');

    addForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;       
        const correo = document.getElementById('correo').value;
        const clave = document.getElementById('clave').value;

        fetch('http://localhost:3000/CRUDRepo/AgregarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre, correo, clave})
        })
        .then(response => {
            if(!response.ok){
                throw new Error('No se pudo agregar el usuario');
            }
            return response.json();
        })
        .then(data=>{
            Swal.fire({
                icon: 'success',
                title: 'Usuario Agregado Exitosamente',
                text: data.message
            });
            addForm.reset();
        })
        .catch(error=> {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar los datos del Usuario',
                text: error.message
            });
        });
    });
});