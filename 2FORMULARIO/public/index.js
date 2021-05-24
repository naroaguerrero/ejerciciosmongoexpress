mostrar();

//---------------FUNCIÓN BUSCAR---------------
function buscar() {
  fetch(`/api/serie/?titulo=${document.getElementById("titulo").value}`)
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? (document.getElementById(
            "feedback"
          ).innerHTML = `<h3>Ha habido un error</h3>`)
        : imprimir(datos);
    });
}
//--------------------------------------------

//---------------FUNCIÓN AÑADIR---------------
function anyadir() {
  fetch("/api/nuevaSerie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: document.getElementById("tituloNuevo").value,
      plataforma: document.getElementById("plataformaNuevo").value,
      nota: parseInt(document.getElementById("notaNuevo").value),
    }),
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.contenido.insertedCount >= 1
        ? ((document.getElementById(
            "feedback"
          ).innerHTML = `<h3>Se ha grabado correctamente</h3>`),
          mostrar())
        : (document.getElementById(
            "feedback"
          ).innerHTML = `<h3>Ha habido un error</h3>`);
    });
}
//--------------------------------------------

//---------------FUNCIÓN MOSTRAR---------------
function mostrar() {
  fetch(`/api/series`)
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? (document.getElementById(
            "feedback"
          ).innerHTML = `<h3>Ha habido un error</h3>`)
        : imprimir(datos);
    });
}
//--------------------------------------------

//---------------FUNCIONES---------------
function imprimir(datos) {
  let parrafo = "";

  for (let i = 0; i < datos.contenido.length; i++) {
    parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${datos.contenido[i].plataforma}</td><td>${datos.contenido[i].nota}</td></tr>`;
  }

  document.getElementById(
    "series"
  ).innerHTML = `<table><th>Título</th><th>Plataforma</th><th>Nota</th>${parrafo}</table>`;
}
//--------------------------------------------