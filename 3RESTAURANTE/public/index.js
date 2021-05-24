mostrar();
let localMenus = [];

//---------------FUNCIÓN MOSTRAR---------------
function mostrar() {
  fetch("/api/menus")
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? (document.getElementById("feedback").innerHTML =
            "<h3>Ha habido un error</h3>")
        : imprimir(datos),
        (localMenus = datos.contenido);
    });
}
//--------------------------------------------

//---------------FUNCIÓN CREAR---------------
function crear() {
  fetch("/api/nuevoMenu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      numero: document.getElementById("numero").value,
      primerPlato: document.getElementById("primerPlato").value,
      segundoPlato: document.getElementById("segundoPlato").value,
      postre: document.getElementById("postre").value,
      precio: parseFloat(document.getElementById("precio").value),
    }),
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.contenido.insertedCount >= 1
        ? ((document.getElementById("feedback").innerHTML =
            "<h3>Menu añadido correctamente, gracias.</h3>"),
          mostrar())
        : (document.getElementById("feedback").innerHTML =
            "<h3>Se ha producido un error, inténtelo de nuevo./h3>");
    });
}
//--------------------------------------------

//---------------FUNCIÓN EDITAR---------------
function editar(indice) {
  document.getElementById("numero").value = localMenus[indice].numero;
  document.getElementById("primero").value = localMenus[indice].primerPlato;
  document.getElementById("segundo").value =
    localMenus[indice].segundoPlato;
  document.getElementById("postre").value = localMenus[indice].postre;
  document.getElementById("precio").value = localMenus[indice].precio;
}
//--------------------------------------------

//---------------FUNCIÓN EDITAR---------------
function editarFinal() {
  fetch("/api/editarMenu", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      numero: document.getElementById("numero").value,
      primerPlato: document.getElementById("primero").value,
      segundoPlato: document.getElementById("segundo").value,
      postre: document.getElementById("postre").value,
      precio: parseFloat(document.getElementById("precio").value),
    }),
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.contenido.modifiedCount >= 1
        ? ((document.getElementById("feedback").innerHTML =
            "<h3>Menu editado correctamente, gracias.</h3>"),
          mostrar())
        : (document.getElementById("feedback").innerHTML =
            "<h3>Se ha producido un error, inténtelo de nuevo.</h3>");
    });
}
//--------------------------------------------

//---------------FUNCIÓN BORRAR---------------
function borrar(indice) {
  fetch("/api/borrarMenu", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      numero: localMenus[indice].numero,
    }),
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.contenido.deletedCount >= 1
        ? ((document.getElementById("feedback").innerHTML =
            "<h3>Menu editado correctamente, gracias.</h3>"),
          mostrar())
        : (document.getElementById("feedback").innerHTML =
            "<h3>Se ha producido un error, inténtelo de nuevo.</h3>");
    });
}
//--------------------------------------------

//---------------FUNCIONES---------------
function imprimir(datos) {
  let parrafo = "";

  for (let i = 0; i < datos.contenido.length; i++) {
    parrafo += `<tr><td>${datos.contenido[i].numero}</td><td>${datos.contenido[i].primero}</td><td>${datos.contenido[i].segundo}</td><td>${datos.contenido[i].postre}</td><td>${datos.contenido[i].precio}</td><td><button onclick="editar(${i})">Editar</button></td><td><button onclick="borrar(${i})">Borrar</button></td></tr>`;
  }

  document.getElementById(
    "restaurante"
  ).innerHTML = `<table><th>Numero</th><th>Primer Plato</th><th>Segundo Plato</th><th>Postre</th><th>Precio</th>${parrafo}</table>`;
}
//--------------------------------------------