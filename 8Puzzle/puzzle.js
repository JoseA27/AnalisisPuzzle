// Funciones para la interfaz 
var imagenSeleccionada = './assets/imagen1.jpg'
var arrayImagenes = []
var matrizImagenes = []
var matrizImagenesDesordenada = []
var arrayImagenesdesordenadas = []
var cantidadImagenes = parseInt(document.getElementById('tamanioTablero').value);

function desordenarArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function desordenarMatriz(matriz) {
  const n = matriz.length;
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

var idSeleccionado = null

const getImageId = (num) => {
  idSeleccionado = num
  console.log(idSeleccionado)
};


function AsignarImagen(imagen) {
  arrayImagenes = []
  matrizImagenes = []
  matrizImagenesDesordenada = []
  arrayImagenesdesordenadas = []
  imagenSeleccionada = imagen
  const file = imagenSeleccionada
  if (file != null) {
    const image = new Image();
    image.src = imagenSeleccionada




    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;
    cantidadImagenes = parseInt(document.getElementById('tamanioTablero').value);
    const squareSize = width / parseInt(cantidadImagenes);


    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);


    let contadorArray = 0
    let encontradoArray = 0
    let encontradoFila = 0
    let contadorFila = 0


    for (let y = 0; y < height; y += squareSize) {
      let tempArray = []
      
      for (let x = 0; x < width; x += squareSize) {
        const num = contadorArray
        if (x + squareSize >= height & y + squareSize >= height) {
          const image2 = new Image();
          image2.src = "./assets/null-square.png"
          image2.setAttribute('id', (num+""))
          image2.setAttribute('onclick', ("getImageNumber("+num+")"))
          const canvas2 = document.createElement('canvas');
          const ctx2 = canvas.getContext('2d');
          canvas2.width = width;
          canvas2.height = height;
          
          // Dibujar la imagen en el canvas
          ctx2.drawImage(image2, 0, 0, width, height);
          arrayImagenes.push(image2);
          tempArray.push(image2)
        } else {
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
      matrizImagenes.push(tempArray)
    }




    arrayImagenesdesordenadas = desordenarArray(arrayImagenes);
    matrizImagenesDesordenada = desordenarMatriz(matrizImagenes);
  }
}

function mostrarImagenes(images) {
  const output = document.getElementById('container');
  output.innerHTML = '';

  images.forEach(function (image) {
    image.forEach(function (image) {
      output.appendChild(image);
    });
  });

  let original = document.getElementById('originalImage')
  original.setAttribute('src', imagenSeleccionada)

  // Obtén una referencia al div contenedor por su ID
  let contenedor = document.getElementById('container');

  // Obtén todas las imágenes dentro del div
  let imagenes = contenedor.getElementsByTagName('img');

  // Itera a través de las imágenes y agrega propiedades CSS a cada una
  for (var i = 0; i < imagenes.length; i++) {
    let imagen = imagenes[i];

    // Agrega propiedades CSS a la imagen
    imagen.style.width = (100 / cantidadImagenes) + "%"; // Cambia el ancho a 200px, por ejemplo
    //imagen.style.height = (100/cantidadImagenes)+""; // Agrega un borde rojo de 2px, por ejemplo
    // Puedes agregar otras propiedades CSS según tus necesidades
  }



}
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

// Función para llenar el array de imágenes con valores aleatorios
const llenarArrayImagenes = () => {
  while (imagenesArr.length < 8) {
    let valorAleatorio = numeroAleatorio();
    if (!imagenesArr.includes(valorAleatorio)) {
      imagenesArr.push(valorAleatorio);
    }
  }
  imagenesArr.push(7); // El valor 9 representa la imagen en blanco
};

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


// Función para manejar el clic en el botón de inicio
botonInicio.addEventListener("click", () => {
  contenedor.classList.remove("hide");
  pantallaCubierta.classList.add("hide");
  contenedor.innerHTML = "";
  AsignarImagen(imagenSeleccionada)
  mostrarImagenes(matrizImagenesDesordenada);
  contadorMovimientos = 0;
  movimientos.innerText = `Movimientos: ${contadorMovimientos}`;
});

// Mostrar la pantalla de cubierta al cargar la ventana
window.onload = () => {
  pantallaCubierta.classList.remove("hide");
  contenedor.classList.add("hide");
};


//Isaac Jose
function iniciar() {/*
  let matriz = crearMatrizDesdeDivs();
    for(i=0;i<matriz.length;i++){
      for(j=0;j<matriz.length;j++){
        console.log( matriz[i][j])
      }
  }*/
  solAlgoritmoA(test, 3);
  console.log('hola');
}

// La función crearMatrizDesdeDivs crea la matriz desde los divs
function crearMatrizDesdeDivs() {
  const matrizDesdeDivs = [];

  for (let fila = 0; fila < 3; fila++) {
    matrizDesdeDivs[fila] = [];
    for (let columna = 0; columna < 3; columna++) {
      const div = document.querySelector(`[data-position="${fila}_${columna}"]`);
      const dataIndex = div.querySelector('img').getAttribute("data-index");
      if (parseInt(dataIndex) == 9) {
        matrizDesdeDivs[fila][columna] = 0;
      }
      else {
        matrizDesdeDivs[fila][columna] = parseInt(dataIndex);
      }

    }
  }

  return matrizDesdeDivs;
}
//Algoritmo A*

//Modificar para que la ultima posicion sea un 0
function generarMatrizCuadrada(size) {
  let matrix = [];
  let num = 1;
  for (let i = 0; i < size; i++) {
    let fila = [];
    for (let j = 0; j < size; j++) {
      fila.push(num);
      num++;
    }
    matrix.push(fila);
  }
  matrix[size - 1][size - 1] = 0;
  return matrix;
}

function calcularIncorrectas(matrizCorrecta, matrizJuego, nsize) {
  let incongruencias = 1;
  for (let i = 0; i < nsize; i++) {
    for (let j = 0; j < nsize; j++) {
      if (matrizCorrecta[i][j] != matrizJuego[i][j] && matrizJuego[i][j] != 0) {
        incongruencias++;
      }
    }
  }
  return incongruencias;
}
var test = [
  [8, 2, 3],
  [4, 5, 6],
  [7, 0, 1]
];


function main(size) {
  matriz = generarMatrizCuadrada(size);
  console.log(calcularIncorrectas(matriz, test, size));
}
class Nodo {
  constructor(peso) {
    this.peso = peso;       //Es lo que cuesta llegar hasta ahí desde el principio
    this.hijos = [];     //Los movimientos que se pueden hacer a partir del padre
    this.direccion = [];      //(Pieza a mover, direccion(0=arriba,1=abajo,2=derecha,3=izquierda))
    this.matriz = [];           //Como están acomodadas las piezas a ese punto
    this.padre = Nodo;
  }

  conectar(padre, peso, pieza, direccion, matriz) {
    this.direccion.push(pieza);           //Numero de pieza
    this.direccion.push(direccion);       //Hacia donde se mueve
    this.matriz = matriz;
    this.peso = peso;
    this.padre = padre;
  }


}

function compararMatrices(matriz1, matriz2) {

  if (matriz1.length != matriz2.length) {
    return false;
  }

  for (let i = 0; i < matriz1.length; i++) {
    if (matriz1[i].length != matriz2[i].length) {
      return false;
    }

    for (let j = 0; j < matriz1[i].length; j++) {
      if (matriz1[i][j] != matriz2[i][j]) {
        return false;
      }
    }
  }

  return true;
}



function solAlgoritmoA(mJuego, size) {
  let nmatriz = generarMatrizCuadrada(size);
  let padre = new Nodo(0);
  padre.matriz = mJuego;
  let abiertos = [];
  let cerrados = [];
  let indexPadre = 0;
  abiertos.push(padre);
  while (compararMatrices(nmatriz, padre.matriz) == false) {
    listaNuevasMatrices = generarPosiblesMatrices(padre, size);
    /*for (k=0;k<listaNuevasMatrices.length;k++){
      for(i=0;i<size;i++){
      for(j=0;j<size;j++){
         console.log( listaNuevasMatrices[k][0][i][j])
      }
    }

    console.log('-----')
    }*/

    for (i = 0; i < listaNuevasMatrices.length; i++) {

      if (compararMatrices(listaNuevasMatrices[i][0], padre.matriz) == false) {
        console.log('Generando Nodo: ' + i)
        let nodo = new Nodo();

        let peso = calcularIncorrectas(nmatriz, listaNuevasMatrices[i][0], size) + padre.peso;
        nodo.conectar(padre, peso, listaNuevasMatrices[i][1], listaNuevasMatrices[i][2], listaNuevasMatrices[i][0]);
        padre.hijos.push(nodo);
        abiertos.push(nodo);

      }
    }

    cerrados.push(padre);
    abiertos.splice(indexPadre, 1);
    indexPadre = determinarMenor(abiertos);
    padre = abiertos[indexPadre];
    console.log(padre.peso)
    console.log('Cantidad abiertos: ' + abiertos.length)
    console.log('Cantidad cerrados: ' + cerrados.length)

  }
  let listaCamino = [];
  while ((padre.peso) != 0) {
    let direccion = [];
    direccion.push(padre.pieza);
    direccion.push(padre.direccion);
    listaCamino.push(direccion);
    padre = padre.padre;
  }
  for (i = listaCamino.length - 1; i >= 0; i--) {
    console.log("Pieza: " + listaCamino[i][1][0] + "  ||  Direccion:" + listaCamino[i][1][1]);

  }
}

function copiarMatriz(matrizOriginal) {
  const copia = [];

  for (let i = 0; i < matrizOriginal.length; i++) {
    copia[i] = [];
    for (let j = 0; j < matrizOriginal[i].length; j++) {
      copia[i][j] = matrizOriginal[i][j];
    }
  }

  return copia;
}


function determinarMenor(abiertos) {
  index = 0;
  menor = 100000000;
  for (let i = 0; i < abiertos.length; i++) {
    if (abiertos[i].peso < menor) {
      menor = abiertos[i].peso;
      index = i;
    }
  }
  return index;
}

function generarPosiblesMatrices(padre, size) {
  let matriz = copiarMatriz(padre.matriz)
  let ubicacionCero = [];
  //console.log(matriz)
  //Busca donde se encuentra el 0
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (matriz[i][j] == 0) {
        ubicacionCero.push(i);
        ubicacionCero.push(j);
        console.log("ENCONTRO 0");
      }
    }
  }
  //console.log('X: '+ubicacionCero[0]+"Y: "+ubicacionCero[1]);
  let listaPosiblesMatrices = [];
  let row = ubicacionCero[0];
  let column = ubicacionCero[1];
  let lista = [];

  if ((row + 1) < size) {
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row + 1, column, ubicacionCero[0], ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row + 1][column]);
    listaPosiblesMatrices.push(0);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];

  }
  if ((row - 1) >= 0) {
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row - 1, column, ubicacionCero[0], ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row - 1][column]);
    listaPosiblesMatrices.push(1);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];

  }
  if ((column + 1) < size) {
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row, column + 1, ubicacionCero[0], ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row][column + 1]);
    listaPosiblesMatrices.push(2);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];

  }
  if ((column - 1) >= 0) {
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row, column - 1, ubicacionCero[0], ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row][column - 1]);
    listaPosiblesMatrices.push(3);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];

  }
  return lista
}

function crearMatrizNueva(matriz, row, column, rowCero, columnCero) {
  let num = matriz[row][column];
  let nuevaMatriz = copiarMatriz(matriz);
  nuevaMatriz[row][column] = 0;
  nuevaMatriz[rowCero][columnCero] = num;

  return nuevaMatriz;
}

