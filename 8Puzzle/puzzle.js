// Referencias Iniciales
const movimientos = document.getElementById("moves"); // Elemento que muestra el número de movimientos
const contenedor = document.querySelector(".container"); // Contenedor de las imágenes
const botonInicio = document.getElementById("start-button"); // Botón para iniciar el juego
const pantallaCubierta = document.querySelector(".cover-screen"); // Pantalla de cubierta
const resultado = document.getElementById("result"); // Resultado del juego
let elementoActual = ""; // Elemento actualmente seleccionado
let contadorMovimientos, // Contador de movimientos
  imagenesArr = []; // Array para almacenar las imágenes

// Función para detectar si el dispositivo es táctil
const esDispositivoTactil = () => {
  try {
    // Intentamos crear un evento táctil (fallará en dispositivos de escritorio y lanzará un error)
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

// Función para generar un número aleatorio para seleccionar una imagen
const numeroAleatorio = () => Math.floor(Math.random() * 8) + 1;

// Función para obtener las coordenadas de fila y columna a partir del atributo "data-position"
const obtenerCoordenadas = (elemento) => {
  const [fila, columna] = elemento.getAttribute("data-position").split("_");
  return [parseInt(fila), parseInt(columna)];
};

// Función para verificar si dos imágenes están adyacentes
const verificarAdyacente = (fila1, fila2, col1, col2) => {
  if (fila1 == fila2) {
    // Izquierda/derecha
    if (col2 == col1 - 1 || col2 == col1 + 1) {
      return true;
    }
  } else if (col1 == col2) {
    // Arriba/abajo
    if (fila2 == fila1 - 1 || fila2 == fila1 + 1) {
      return true;
    }
  }
  return false;
};

// Función para llenar el array de imágenes con valores aleatorios
const llenarArrayImagenes = () => {
  while (imagenesArr.length < 8) {
    let valorAleatorio = numeroAleatorio();
    if (!imagenesArr.includes(valorAleatorio)) {
      imagenesArr.push(valorAleatorio);
    }
  }
  imagenesArr.push(9); // El valor 9 representa la imagen en blanco
};

// Función para generar la cuadrícula de imágenes
const generarCuadricula = () => {
  let contador = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = document.createElement("div");
      div.setAttribute("data-position", `${i}_${j}`);
      div.addEventListener("click", seleccionarImagen);
      div.classList.add("contenedor-de-imagen");
      div.innerHTML = `<img src="image_part_00${
        imagenesArr[contador]
      }.png" class="imagen ${
        imagenesArr[contador] == 9 ? "objetivo" : ""
      }" data-index="${imagenesArr[contador]}"/>`;
      contador += 1;
      contenedor.appendChild(div);
    }
  }
};

// Función para manejar el clic en una imagen
const seleccionarImagen = (e) => {
  e.preventDefault();
  // Establecer el elemento actual
  elementoActual = e.target;
  // Elemento objetivo (imagen en blanco)
  let elementoObjetivo = document.querySelector(".objetivo");
  let padreActual = elementoActual.parentElement;
  let padreObjetivo = elementoObjetivo.parentElement;

  // Obtener las coordenadas de fila y columna para ambos elementos
  const [fila1, col1] = obtenerCoordenadas(padreActual);
  const [fila2, col2] = obtenerCoordenadas(padreObjetivo);

  if (verificarAdyacente(fila1, fila2, col1, col2)) {
    // Intercambiar las imágenes
    elementoActual.remove();
    elementoObjetivo.remove();

    // Obtener los índices de las imágenes (para manipular el array más tarde)
    let indiceActual = parseInt(elementoActual.getAttribute("data-index"));
    let indiceObjetivo = parseInt(elementoObjetivo.getAttribute("data-index"));

    // Intercambiar los índices de las imágenes
    elementoActual.setAttribute("data-index", indiceObjetivo);
    elementoObjetivo.setAttribute("data-index", indiceActual);

    // Intercambiar las imágenes en los padres
    padreActual.appendChild(elementoObjetivo);
    padreObjetivo.appendChild(elementoActual);

    // Intercambiar los elementos en el array
    let indiceArrActual = imagenesArr.indexOf(indiceActual);
    let indiceArrObjetivo = imagenesArr.indexOf(indiceObjetivo);
    [imagenesArr[indiceArrActual], imagenesArr[indiceArrObjetivo]] = [
      imagenesArr[indiceArrObjetivo],
      imagenesArr[indiceArrActual],
    ];

    // Condición de victoria
    if (imagenesArr.join("") == "123456789") {
      setTimeout(() => {
        // Cuando el juego termina, mostrar la pantalla de cubierta nuevamente
        pantallaCubierta.classList.remove("hide");
        contenedor.classList.add("hide");
        resultado.innerText = `Total de Movimientos: ${contadorMovimientos}`;
        botonInicio.innerText = "Reiniciar Juego";
      }, 1000);
    }
    // Incrementar el contador de movimientos y mostrarlo
    contadorMovimientos += 1;
    movimientos.innerText = `Movimientos: ${contadorMovimientos}`;
  }
};

// Función para manejar el clic en el botón de inicio
botonInicio.addEventListener("click", () => {
  contenedor.classList.remove("hide");
  pantallaCubierta.classList.add("hide");
  contenedor.innerHTML = "";
  imagenesArr = [];
  llenarArrayImagenes();
  generarCuadricula();
  contadorMovimientos = 0;
  movimientos.innerText = `Movimientos: ${contadorMovimientos}`;
});

// Mostrar la pantalla de cubierta al cargar la ventana
window.onload = () => {
  pantallaCubierta.classList.remove("hide");
  contenedor.classList.add("hide");
};
