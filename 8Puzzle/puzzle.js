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

/**
 * Dado un nodo saca su matriz, la dirección y la pieza, con esto intercambia las imagenes
 * y los indez en el html
 * @param {Nodo} nodo Nodo del estado actual
 * @param {Int} size  Orden de la matriz cuadrada
 * @returns 
 */
function intercambiarImagenes2(nodo,size) {

  let mat = nodo.matriz;         //Saca la matriz del nodo, la pieza que se mueve y la dirección
  let pieza = nodo.direccion[0];
  let direccion = nodo.direccion[1];
  let {fila, columna} = encontrarPieza(mat,pieza);  //Busca en que fila y columna se encuentra la pieza
  const imagen1 = document.getElementById(pieza-1); //Obtiene el elemento en el html que corresponde a la pieza
  switch (direccion) {
    case 0: // Sumar 1 a fila (0==Abajo)
      fila += 1;
      break;
    case 1: // Restar 1 a fila (1==arriba)
      fila -= 1;
      break;
    case 2: // Sumar 1 a columna (2==derecha)
      columna += 1;
      break;
    case 3: // Restar 1 a columna (0==izquierda)
      columna -= 1;
      break;
    default:
      console.error("Dirección no válida en el objeto nodo.");
      return;
  }

  const imagen2 = document.getElementById((size*size)-1); //como la ultima ficha siempre es el 0, busca la del orden**2
  const srcImagen1 = imagen1.src; //Obtiene las imagenes
  const srcImagen2 = imagen2.src; 

  imagen1.src = srcImagen2;  //Intercambia las imagenes
  imagen2.src = srcImagen1;


  imagen1.id = (size*size)-1; //Intercambia los id
  imagen2.id = pieza-1;

}
/**
 * Busca en que fila y columna se encuentra un elemento en la matriz del puzzle
 * @param {Array} matriz Matriz del estado del puzzle
 * @param {Int} pieza  Pieza que se desea buscar
 * @returns {Int, Int} Fila, Columna
 */
function encontrarPieza(matriz, pieza) {
  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
      if (matriz[fila][columna] == pieza) {
        return { fila, columna }; 
      }
    }
  }
}
/**
 * En base al grid que se forma de forma automatica y aleatoria lo convierte en una matriz según sus id
 * el id son el numero de de pieza indexado
 * @param {Int} size Orden de la matriz cuadrada
 * @returns {Array} Matriz en base al grid del puzzle
 */
function crearMatriz(size) {
  const contenedor = document.getElementById("container"); //selecciona el container y las img que son las piezas
  const imagenes = contenedor.getElementsByTagName("img"); 

  const matrizImagenes = [];

  for (let i = 0; i < size; i++) {
    const fila = [];
    for (let j = 0; j < size; j++) {
      const index = i * size + j; 
      if(imagenes[index].id==(size*size)-1){  //Si encuentra el elemento que es igual al orden**2, lo pone como 0
        fila.push(0);                         //Ya que siempre la ultima ficha es el cero
      }
      else{
        const numeroID = parseInt(imagenes[index].id)+1;
        fila.push(numeroID);
      }
    }
    matrizImagenes.push(fila);
  }

  return matrizImagenes;
}

//Isaac Jose
function iniciar() {


  
  size = parseInt(document.getElementById('tamanioTablero').value);
 let matriz = crearMatriz(size);
 console.log(matriz)
  let listaNodos = solAlgoritmoA(matriz,size)

  let currentIndex = listaNodos.length-1;
  const interval = setInterval(function() {
   if (currentIndex >= 0) {
     const nodo = listaNodos[currentIndex];
     intercambiarImagenes2(nodo,size);
     currentIndex--;
   } else {
     clearInterval(interval); // Detener el intervalo cuando se hayan procesado todos los nodos
   }
  }, 700);


}

//Algoritmo A*

/**
 * Nodo que almacena estados del puzzle
 */
class Nodo {
  /**
   * 
   * @param {Int} peso Es lo que le cuesta llegar hasta este estado
   * @property {Int} peso Es lo que le cuesta llegar hasta es estado
   * @property {Array} hijos Son las posibles soluciones que nacen
   * @property {Array} direccion Indica la pieza y el movimiento que se debe hacer para llegar hasta él
   * @property {Array} matriz Estado de las piezas del puzzle
   * @property {Nodo} padre  Estado anterior
   */

  constructor(peso) {
    this.peso = peso;       //Es lo que cuesta llegar hasta ahí desde el principio
    this.hijos = [];        //Los movimientos que se pueden hacer a partir del padre
    this.direccion = [];      //(Pieza a mover, direccion(0=arriba,1=abajo,2=derecha,3=izquierda))
    this.matriz=[];           //Como están acomodadas las piezas a ese punto
    this.padre = Nodo;
  }
  /**
   * Conecta el nodo hijo con el nodo padre y guarda toda su información
   * @param {Nodo} padre Nodo Anterior
   * @param {Int} peso El coste de llegar
   * @param {Int} pieza Que pueza se mueve
   * @param {Int} direccion Hacia donde se mueve la pieza
   * @param {Array} matriz La matriz en ese estado
   */
  conectar(padre,peso,pieza,direccion,matriz) {
    this.direccion.push(pieza);           //Numero de pieza
    this.direccion.push(direccion);       //Hacia donde se mueve
    this.matriz = matriz;
    this.peso = peso;
    this.padre = padre;
  }
}


/**
 * La función resuelve un puzzle de orden n conm el algoritmo A*
 * @param {Array} mJuego Es la matriz con la posicion de las fichas en el puzzle
 * @param {Int} size Es el tamaño de la matriz, la cual se selecciona en la interfaz
 * @returns {Array} Retorna el camino que tiene que seguir para resolver el puzzle [pieza, direccion]
 *                  Es un Array de Arrays, cada elemento lleva la pieza y la dirección
 */
function solAlgoritmoA(mJuego,size){
  let nmatriz = generarMatrizCuadrada(size);    //Matriz con las piezas en la posicion correctsa
  let padre = new Nodo(0);                      //Estado inicial del puzzle
  padre.matriz = mJuego;
  padre.padre.matriz = null
  let abiertos = [];                            //Lista con los nodos abiertos
  let cerrados = [];                            //Lista con los nodos cerrados
  let indexPadre = 0;
  abiertos.push(padre);
  console.log(padre)
  while(compararMatrices(nmatriz,padre.matriz)==false){
    listaNuevasMatrices = generarPosiblesMatrices(padre,size); //Retorna una lista con todas las posibles jugadas
    
    for(i=0;i<listaNuevasMatrices.length;i++){
      //No puede registrar un movimiento que lo devuelve al estado del padre
      if(compararMatrices(listaNuevasMatrices[i][0],padre.padre.matriz)==false){ 
        let nodo = new Nodo();
        //Calcula el peso para llegar hasta ahí incluyendo el peso del padre
        let peso = calcularIncorrectas(nmatriz, listaNuevasMatrices[i][0], size)+padre.peso; 
        nodo.conectar(padre, peso, listaNuevasMatrices[i][1], listaNuevasMatrices[i][2], listaNuevasMatrices[i][0]);
        padre.hijos.push(nodo);       //Al padre se le agrega un nuevo hijo
        abiertos.push(nodo);          //Agrega a la lista de nodos abiertos

      }
    }

    cerrados.push(padre);             //Se guarda el padre en la lista de cerrados
    abiertos.splice(indexPadre, 1);   //Saca al padre de la lista de abiertos
    indexPadre = determinarMenor(abiertos); //Revisa cual de los abiertos pesa menos
    padre = abiertos[indexPadre];           //Declara el nuevo padre con lo anterior
    console.log(padre.peso)
    console.log('Cantidad abiertos: '+abiertos.length)
    console.log('Cantidad cerrados: '+cerrados.length)
    if(abiertos.length>50000){
      break;
    }
  }
  let listaCamino = [];
  while((padre.peso)!=0){
    let direccion = [];
    listaCamino.push(padre);
    padre = padre.padre;
  }
  return listaCamino
}
/**
 * Funcion que genera un maximo de 3 matrices equivalentes a los 3 movimientos posibles en el juego y los introduce en un arreglo
 * @param {Matriz} padre Matriz de donde provienen las matrices resultantes
 * @param {Int} size Tamanno de las matrices a ser creadas 
 * @returns {Array<Matriz>} Lista de las matrices creadas
 */
function generarPosiblesMatrices(padre,size){
  let matriz = copiarMatriz(padre.matriz)
  let ubicacionCero = [];
  //Busca donde se encuentra el 0 (el espacio vacio)
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(matriz[i][j]==0){
        ubicacionCero.push(i);
        ubicacionCero.push(j);
        //console.log("ENCONTRO 0");
      }
    }
  }

  let listaPosiblesMatrices = []; //Aqui van a ir los movimientos a hacer
  let row = ubicacionCero[0];
  let column = ubicacionCero[1];
  let lista = [];

  //Esta cadena de ifs evita que se hagan movimientos que no son posibles (ej: mover hacia abajo cuando ya se esta en la ultima fila)
  //Dentro de los ifs se crea la crea la matriz con el movimiento
  if((row+1)<size){ 
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row+1,column, ubicacionCero[0],ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row+1][column]);
    listaPosiblesMatrices.push(0);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];
  
  }
  if((row-1)>=0){
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row-1,column, ubicacionCero[0],ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row-1][column]);
    listaPosiblesMatrices.push(1);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];

  }
  if((column+1)<size){
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row,column+1, ubicacionCero[0],ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row][column+1]);
    listaPosiblesMatrices.push(2);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];

  }
  if((column-1)>=0){
    listaPosiblesMatrices.push(crearMatrizNueva(matriz, row,column-1, ubicacionCero[0],ubicacionCero[1]));
    listaPosiblesMatrices.push(matriz[row][column-1]);
    listaPosiblesMatrices.push(3);
    lista.push(listaPosiblesMatrices);
    listaPosiblesMatrices = [];
 
  }
  return lista
}

/**
 * Funcion que realiza el movimiento(jugada) en una matriz
 * @param {Matriz} matriz Matriz en la que se va a realizar la jugada
 * @param {Int} row Fila en donde se ubica el numero a ser movido
 * @param {Int} column Columna en donde se ubica el numero a ser movido
 * @param {Int} rowCero Fila en donde se ubica el cero(espacio en blanco)
 * @param {Int} columnCero Columna en donde se ubica el cero(espacio en blanco)
 * @returns {Matriz} Matriz con el movimiento realizado
 */
function crearMatrizNueva(matriz,row,column, rowCero, columnCero){
  let num = matriz[row][column]; //Se guarda provisonalmente el numero que va a cambiar por el cero
  let nuevaMatriz = copiarMatriz(matriz); //Se copia la matriz que se tenia
  nuevaMatriz[row][column] = 0;
  nuevaMatriz[rowCero][columnCero] = num; //Se intercambian el cero por el numero
  
  return nuevaMatriz;
}
var test = [
  [8, 2, 3],
  [4, 5, 6],
  [7, 0, 1]
];

/**
 * Es la heuristica del A*, calcula la cantidad de piezas en el lugar incorrecto
 * Para asi determinar cual es el mejor camino a tomar
 * @param {Array} matrizCorrecta Matriz con todas las piezas en su lugar correcto
 * @param {Array} matrizJuego Matriz con la cual se está jugando
 * @param {Int} nsize El orden de la matriz
 * @returns {Int} Incongruencias, cantidad de piezas en el lugar incorrecto
 */
function calcularIncorrectas(matrizCorrecta,matrizJuego,nsize){
  let incongruencias = 1;       //Siempre va a costar 1 hacer cualquier movimiento
  for (let i = 0; i < nsize; i++) {
    for (let j = 0; j < nsize; j++) {
      //Si los elementos de ambas matrices no coinciden aumenta en 1 las incongruencias
      if(matrizCorrecta[i][j]!=matrizJuego[i][j] && matrizJuego[i][j]!=0){
        incongruencias++;
      }
    }
  }
  return incongruencias;
}

/**
 * Dado el orden seleccionado en la interfaz se genera una matriz cuadrada con todas las posiciones
 * en la ubicación correcta, y el último elemento siempre es un 0.
 * @param {Int} size El orden de la matriz
 * @returns Matriz, con todos
 */
function generarMatrizCuadrada(size){
  let matrix = [];
  let num = 1;
for (let i = 0; i < size; i++) {
  let fila = []; //Ingresa una fila vacia
  for (let j = 0; j < size; j++) {
    fila.push(num); //Se llena la fila vacia con los numeros correspondientes
    num++;
  }
  matrix.push(fila);
  }
  matrix[size-1][size-1] = 0; //El ultimo elemento siempre debe ser 0
  return matrix;
}

/**
 * Compara si dos matrices, que son Arrays de Arrays, son iguales
 * @param {Array} matriz1
 * @param {Array} matriz2 
 * @returns {Boolean}
 */
function compararMatrices(matriz1, matriz2) {
  //Si es nula retorna false 
  if(matriz2==null){
    return false;
  }
  for(let i = 0; i < matriz1.length; i++) {
    for(let j = 0; j < matriz1[i].length; j++) {    //Compara 1 a 1 los elementos de ambas matrices
      if(matriz1[i][j] != matriz2[i][j]) {
        return false; 

      }
    }
  }
  console.log('CUMPLE')
  return true;
}

/**
 * Funcion que copia una matriz de tamanno nxn.
 * @param {Matriz} matrizOriginal Matriz a copiar.
 * @returns {Matriz} Una copia exacta de la matriz ingresada.
 */
function copiarMatriz(matrizOriginal) {
  const copia = [];

  for (let i = 0; i < matrizOriginal.length; i++) { //Se recorren los elementos y se van copiando
    copia[i] = [];
    for (let j = 0; j < matrizOriginal[i].length; j++) {
      copia[i][j] = matrizOriginal[i][j]; 
    }
  }

  return copia;
}

/**
 * Funcion que obtiene el indice del elemento con menor valor en un arreglo
 * @param {Array<Int>} abiertos Arreglo a procesar
 * @returns {Int} Indice del elemento con menor valor
 */
function determinarMenor(abiertos){
  index = 0;
  menor = 100000000;
  for (let i = 0; i < abiertos.length; i++) { //Se recorre elemento por elemento y se va guardando el menor de todos
    if(abiertos[i].peso<menor){
      menor = abiertos[i].peso;
      index = i;
    }
  }
  return index; //Se retorna la posicion en la que esta
}

