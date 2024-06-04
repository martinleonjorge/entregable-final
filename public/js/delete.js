document.addEventListener("DOMContentLoaded", function() {
  const deleteForm = document.getElementById('delete-form');

  deleteForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const id_Usuario = document.getElementById('id_Usuario').value;

    fetch(`http://localhost:3000/CRUDRepo/EliminarUsuario/${id_Usuario}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo eliminar la persona');
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario Eliminado',
        text: data.message
      })
      .then(() => {
        // Redireccionar a otra página, recargar la página, etc.
        //AQUI REDIRECCIONA AL ADMINISTRADOR CUANDO YA ELIMINÓ AL USUARIO------------
        deleteForm.reset();
        window.location.href ='/admin.html';
        
    });
      
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    });
  });
});