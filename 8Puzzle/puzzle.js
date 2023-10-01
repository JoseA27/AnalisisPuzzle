/**
 * Ruta de la imagen seleccionada.
 * @type {string}
 */
var imagenSeleccionada = './assets/imagen1.jpg';

/**
 * Array que contiene las imágenes.
 * @type {Array}
 */
var arrayImagenes = [];

/**
 * Matriz que contiene las imágenes.
 * @type {Array}
 */
var matrizImagenes = [];

/**
 * Matriz de imágenes desordenadas.
 * @type {Array}
 */
var matrizImagenesDesordenada = [];

/**
 * Array de imágenes desordenadas.
 * @type {Array}
 */
var arrayImagenesDesordenadas = [];

/**
 * Cantidad de imágenes a utilizar.
 * @type {number}
 */
var cantidadImagenes = parseInt(document.getElementById('tamanioTablero').value);

/**
 * Función para desordenar un array utilizando el algoritmo de Fisher-Yates.
 *
 * @param {Array} array - El array que se desea desordenar.
 * @returns {Array} - El array desordenado.
 */
function desordenarArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
//
/**
 * Desordena una matriz cuadrada (nxn) manteniendo un elemento fijo en su lugar original.
 *
 * @param {Array<Array>} matriz - La matriz cuadrada a desordenar.
 * @returns {Array<Array>} - La matriz desordenada.
 * @throws {Error} - Se lanza un error si la matriz no es cuadrada.
 */
function desordenarMatriz(matriz) {
    const n = matriz.length;
  
    // Verificar si la matriz es cuadrada
    if (n === 0 || n !== matriz[0].length) {
      throw new Error("La matriz debe ser cuadrada (nxn)");
    }
  
    // Guardar el elemento en la posición [n-1][n-1]
    const elementoFijo = matriz[n - 1][n - 1];
  
    // Crear una lista con todos los elementos de la matriz excepto el elemento fijo
    const elementosDesordenables = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matriz[i][j] !== elementoFijo) {
          elementosDesordenables.push(matriz[i][j]);
        }
      }
    }
  
    // Mezclar los elementos desordenables
    for (let i = elementosDesordenables.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [elementosDesordenables[i], elementosDesordenables[j]] = [elementosDesordenables[j], elementosDesordenables[i]];
    }
  
    // Llenar la matriz con los elementos desordenados y el elemento fijo en su lugar original
    const matrizDesordenada = [];
    let index = 0;
    for (let i = 0; i < n; i++) {
      const fila = [];
      for (let j = 0; j < n; j++) {
        if (matriz[i][j] !== elementoFijo) {
          fila.push(elementosDesordenables[index]);
          index++;
        } else {
          fila.push(elementoFijo);
        }
      }
      matrizDesordenada.push(fila);
    }
  
    return matrizDesordenada;
  }
//
/**
 * ID seleccionado para una imagen.
 * @type {number|null}
 */
var idSeleccionado = null;

/**
 * Establece el ID seleccionado para una imagen y muestra el valor en la consola.
 *
 * @param {number} num - El ID que se desea establecer como seleccionado.
 * @returns {void}
 */
const getImageId = (num) => {
  idSeleccionado = num;
  console.log(idSeleccionado);
};
//
/**
 * Asigna una imagen a la interfaz y realiza operaciones relacionadas con ella.
 *
 * @param {string} imagen - La ruta de la imagen que se desea asignar.
 * @returns {void}
 */
function AsignarImagen(imagen) {
    // Limpiar los arrays y variables relacionados con las imágenes
    arrayImagenes = [];
    matrizImagenes = [];
    matrizImagenesDesordenada = [];
    arrayImagenesdesordenadas = [];
    imagenSeleccionada = imagen;
  
    // Cargar la imagen
    const file = imagenSeleccionada;
  
    if (file != null) {
      const image = new Image();
      image.src = imagenSeleccionada;
  
      // Crear un canvas para trabajar con la imagen
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = image.width;
      const height = image.height;
      cantidadImagenes = parseInt(document.getElementById('tamanioTablero').value);
      const squareSize = width / parseInt(cantidadImagenes);
  
      canvas.width = width;
      canvas.height = height;
  
      ctx.drawImage(image, 0, 0, width, height);
  
      // Inicializar contadores
      let contadorArray = 0;
      let contadorFila = 0;
  
      // Iterar a través de la imagen para dividirla en cuadrados
      for (let y = 0; y < height; y += squareSize) {
        let tempArray = [];
        
        for (let x = 0; x < width; x += squareSize) {
          const num = contadorArray;
          
          if (x + squareSize >= height & y + squareSize >= height) {
            // Crear una imagen en blanco para cuadrados fuera del límite de la imagen original
            const image2 = new Image();
            image2.src = "./assets/null-square.png"
            image2.setAttribute('id', (num+""))
            image2.setAttribute('onclick', ("getImageNumber("+num+")"))
            const canvas2 = document.createElement('canvas');
            const ctx2 = canvas2.getContext('2d');
            canvas2.width = width;
            canvas2.height = height;
            
            // Dibujar la imagen en el canvas
            ctx2.drawImage(image2, 0, 0, width, height);
            arrayImagenes.push(image2);
            tempArray.push(image2)
          } else {
            // Crear cuadrados de la imagen original
            const squareCanvas = document.createElement('canvas');
            const squareCtx = squareCanvas.getContext('2d');
            squareCanvas.width = squareSize;
            squareCanvas.height = squareSize;
            squareCtx.drawImage(canvas, x, y, squareSize, squareSize, 0, 0, squareSize, squareSize);
  
            const squareImage = new Image();
            squareImage.src = squareCanvas.toDataURL('image/jpeg');
            squareImage.setAttribute('id', (num+""))
            squareImage.setAttribute('onclick', ("getImageNumber("+num+")"))
            arrayImagenes.push(squareImage);
            tempArray.push(squareImage)
          }
          contadorArray++;
        }
        contadorFila++;
        matrizImagenes.push(tempArray);
      }
  
      // Desordenar los arrays de imágenes y matrices de imágenes
      arrayImagenesdesordenadas = desordenarArray(arrayImagenes);
      matrizImagenesDesordenada = desordenarMatriz(matrizImagenes);
    }
  }
//
/**
 * Muestra las imágenes en el contenedor HTML y ajusta las propiedades CSS de cada imagen.
 *
 * @param {Array<Array<HTMLImageElement>>} images - Un array de arrays de elementos HTML de imagen para mostrar.
 * @returns {void}
 */
function mostrarImagenes(images) {
    // Obtén una referencia al elemento contenedor por su ID
    const output = document.getElementById('container');
    output.innerHTML = '';
  
    // Itera a través de los arrays de imágenes y agrega cada imagen al contenedor
    images.forEach(function (imageArray) {
      imageArray.forEach(function (image) {
        output.appendChild(image);
      });
    });
  
    // Obtén una referencia a la imagen original y establece su atributo 'src'
    let original = document.getElementById('originalImage')
    original.setAttribute('src', imagenSeleccionada);
  
    // Obtén una referencia al div contenedor por su ID
    let contenedor = document.getElementById('container');
  
    // Obtén todas las imágenes dentro del div
    let imagenes = contenedor.getElementsByTagName('img');
  
    // Itera a través de las imágenes y ajusta propiedades CSS
    for (var i = 0; i < imagenes.length; i++) {
      let imagen = imagenes[i];
  
      // Ajusta las propiedades CSS de la imagen (por ejemplo, el ancho)
      imagen.style.width = (100 / cantidadImagenes) + "%"; // Cambia el ancho según el número de imágenes
      // Puedes agregar otras propiedades CSS según tus necesidades
    }
  }
//
/**
 * Elemento que muestra el número de movimientos.
 * @type {HTMLElement}
 */
const movimientos = document.getElementById("moves");

/**
 * Contenedor de las imágenes.
 * @type {HTMLElement}
 */
const contenedor = document.querySelector(".container");

/**
 * Botón para iniciar el juego.
 * @type {HTMLButtonElement}
 */
const botonInicio = document.getElementById("start-button");

/**
 * Pantalla de cubierta del juego.
 * @type {HTMLElement}
 */
const pantallaCubierta = document.querySelector(".cover-screen");

/**
 * Resultado del juego.
 * @type {HTMLElement}
 */
const resultado = document.getElementById("result");

/**
 * Elemento actualmente seleccionado.
 * @type {string}
 */
let elementoActual = "";

/**
 * Contador de movimientos.
 * @type {number}
 */
let contadorMovimientos;

/**
 * Array para almacenar las imágenes.
 * @type {Array}
 */
let imagenesArr = [];

/**
 * Determina si el dispositivo es táctil.
 *
 * @returns {boolean} - `true` si el dispositivo es táctil, `false` en caso contrario.
 */
const esDispositivoTactil = () => {
  try {
    // Intentamos crear un evento táctil (fallará en dispositivos de escritorio y lanzará un error)
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};
//
/**
 * Genera un número aleatorio entre 1 y 8 (inclusive).
 *
 * @returns {number} - Número aleatorio generado.
 */
const numeroAleatorio = () => Math.floor(Math.random() * 8) + 1;

/**
 * Obtiene las coordenadas de fila y columna a partir del atributo "data-position" de un elemento.
 *
 * @param {HTMLElement} elemento - El elemento del cual se desea obtener las coordenadas.
 * @returns {Array<number>} - Un array que contiene las coordenadas [fila, columna].
 */
const obtenerCoordenadas = (elemento) => {
  const [fila, columna] = elemento.getAttribute("data-position").split("_");
  return [parseInt(fila), parseInt(columna)];
};
//
/**
 * Llena el array de imágenes con valores aleatorios del 1 al 8, incluyendo una imagen en blanco.
 *
 * @returns {void}
 */
const llenarArrayImagenes = () => {
    while (imagenesArr.length < 8) {
      let valorAleatorio = numeroAleatorio();
      if (!imagenesArr.includes(valorAleatorio)) {
        imagenesArr.push(valorAleatorio);
      }
    }
    imagenesArr.push(7); // El valor 7 representa la imagen en blanco
  };
//
// Comprobar si se ha alcanzado la condición de victoria (todas las imágenes en orden)
if (imagenesArr.join("") == "123456789") {
    setTimeout(() => {
      // Cuando el juego termina, mostrar la pantalla de cubierta nuevamente
      pantallaCubierta.classList.remove("hide");
      contenedor.classList.add("hide");
      resultado.innerText = `Total de Movimientos: ${contadorMovimientos}`;
      botonInicio.innerText = "Reiniciar Juego";
    }, 1000);
  }
  
  // Incrementar el contador de movimientos y mostrarlo en la interfaz
  contadorMovimientos += 1;
  movimientos.innerText = `Movimientos: ${contadorMovimientos}`;
//
/**
 * Función que se ejecuta al hacer clic en el botón de inicio.
 * Restablece el juego y muestra las imágenes desordenadas.
 *
 * @returns {void}
 */
botonInicio.addEventListener("click", () => {
    contenedor.classList.remove("hide");
    pantallaCubierta.classList.add("hide");
    contenedor.innerHTML = "";
    AsignarImagen(imagenSeleccionada);
    mostrarImagenes(matrizImagenesDesordenada);
    contadorMovimientos = 0;
    movimientos.innerText = `Movimientos: ${contadorMovimientos}`;
  });
  
  /**
   * Muestra la pantalla de cubierta al cargar la ventana del juego.
   *
   * @returns {void}
   */
  window.onload = () => {
    pantallaCubierta.classList.remove("hide");
    contenedor.classList.add("hide");
  };
  
