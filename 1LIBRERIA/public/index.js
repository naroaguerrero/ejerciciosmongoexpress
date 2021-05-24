mostrarLista();

let librosLocal = [];

function mostrarLista() {
  fetch("/api/libros")
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Ha habido un error");
      } else {
        imprimir(datos);
      }
    });
}

function buscar() {
  fetch(`/api/libro/${document.getElementById("buscar").value}`)
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Ha habido un error");
      } else {
        imprimir(datos);
      }
    });
}

function crear() {
  fetch(`/api/nuevoLibro/${document.getElementById("crear").value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Ha habido un error");
      } else {
        document.getElementById(
          "feedback"
        ).innerHTML = `<h3>Se ha añadido el libro: ${datos.contenido.ops[0].titulo}</h3>`;
        mostrarLista();
      }
    });
}

function leido() {
  fetch(`/api/editarLibro/${librosLocal[i].titulo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Ha habido un error");
      } else {
        datos.contenido.result.nModified > 0
          ? feedback("Se ha marcado un libro como leido")
          : feedback("No se ha marcado ningún libro como leido");
        mostrarLista();
      }
    });
}

function borrar(i) {
  fetch(`/api/borrarLibro/${librosLocal[i].titulo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Ha habido un error");
      } else {
        datos.contenido.deletedCount > 0
          ? feedback("Se ha borrado correctamente")
          : feedback("No se ha podido encontrar el libro</h3>");
        mostrarLista();
      }
    });
}

function feedback(mensaje) {
  mensaje === "patata"
    ? (document.getElementById("feedback").innerHTML = "")
    : (document.getElementById("feedback").innerHTML = `<h3>${mensaje}</h3>`),
    setTimeout(feedback("patata"), 4000);
}

function imprimir(datos) {
  librosLocal = datos.contenido;
  let parrafo = "";
  for (let i = 0; i < datos.contenido.length; i++) {
    parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${
      datos.contenido[i].estado ? "leído" : "sin leer"
    }</td><td><button onclick="leido(${i})">Leido</button></td><td><button onclick="borrar(${i})">Borrar</button></td></tr>`;
  }
  document.getElementById(
    "libros"
  ).innerHTML = `<table><th>Título:</th><th>Estado:</th>${parrafo}</table>`;
}