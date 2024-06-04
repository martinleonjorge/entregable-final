document.addEventListener("DOMContentLoaded", function() {
  fetch('http://localhost:3000/CRUDRepo/ConsultarUsuarios')
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error));

  function mostrarData(data) {
    let body = "";
    for (var i = 0; i < data.length; i++) {
      body += `<tr>
        <td>${data[i].id_Usuario}</td>
        <td>${data[i].nombre}</td>
        <td>${data[i].correo}</td>
        </tr>`;
    }
    document.getElementById('data').innerHTML = body;
  }
});

