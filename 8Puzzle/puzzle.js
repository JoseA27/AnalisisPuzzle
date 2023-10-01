
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
  imprimirMov(pieza,direccion);
  const imagen2 = document.getElementById((size*size)-1); //como la ultima ficha siempre es el 0, busca la del orden**2
  const srcImagen1 = imagen1.src; //Obtiene las imagenes
  const srcImagen2 = imagen2.src; 

  imagen1.src = srcImagen2;  //Intercambia las imagenes
  imagen2.src = srcImagen1;


  imagen1.id = (size*size)-1; //Intercambia los id
  imagen2.id = pieza-1;

}

//Algoritmo A*
function iniciarA() {
  size = parseInt(document.getElementById('tamanioTablero').value);
  let matriz = crearMatriz(size);
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

function imprimirMov(pieza,direccion){
  let texto;
  switch(direccion){
    case 0:
      texto = 'abajo'
      break;
    case 1:
      texto = 'arriba'
      break;
    case 2:
      texto = 'izquierda'
      break;
    case 3:
      texto = 'derecha'
      break;
    default:
      texto = 'abajo'
      break;
  }
  console.log("Pieza "+pieza + " se mueve hacia "+texto);
}

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
      sinSolucion();
      console.log("Puzzle demasiado complejo, no logra resolver");
      return [];
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

function sinSolucion(){
  let fondo = document.getElementById('pantallaFondo');
  let fondoTexto = document.getElementById("textoEmergente");
  fondoTexto.innerHTML = 'Problema muy complejo, no se encontro solucion';
  fondo.style.display = "flex";

  aceptarBtn.addEventListener("click", function(e) {
    e.preventDefault();
    fondo.style.display = "none";
  });
}

//--------------------------------------Backtracking-----------------------------
class NodoArbol {
  constructor(pEstado) {
    this._estado = pEstado;   //Atributo del estado del nodo, en este caso la matriz
    this._hijos = [];
    this._padre = null;      // Agrega atributo para almacenar la direccion del padre de cada nodo
    this._direccion = null; // Agregar atributo para la acción o paso tomado
  }
  // Getter y Setter para el atributo estado
  get estado() {
    return this._estado;
  }
  set estado(nuevoEstado) {
    this._estado = nuevoEstado;
  }
  // Getter y Setter para el atributo hijos
  get hijos() {
    return this._hijos;
  }
  set hijos(nuevosHijos) {
    this._hijos = nuevosHijos;
    if(nuevosHijos != null){
      for (const h of nuevosHijos) {
        h._padre = this
      }
    }
  }
  // Getter y Setter para el atributo padre
  get padre() {
    return this._padre;
  }
  set padre(nuevoPadre) {
    this._padre = nuevoPadre;
  }
  // Getter para el atributo accion
  get direccion() {
    return this._direccion;
  }
  set direccion(nuevoPadre) {
    this._direccion = nuevoPadre;
  }
}
//--------------------------------------------------------------------------------
/**
 * Funcion inicial para empezar a resolver el backtraking utilizando el algoritmo
 * @param {number} size - El tamaño del tablero o matriz que se utilizará en el problema.
 * @returns {array|null} - Una lista de pasos de la solución si se encuentra, o null si no se encuentra una solución.
 */
function iniciarB() {
 size = parseInt(document.getElementById('tamanioTablero').value);
 let matriz = crearMatriz(size);
 
 let solucion = main2(matriz);  // Llama a la función principal para buscar una solución.
 if (solucion != null) {
   // Si se encontró una solución, se almacenarán los pasos en una lista.
   const listaPasos = [];
   let cont = 1;

   // Recorre hacia atrás desde la solución hasta el estado inicial.
   while (solucion.padre !== null) {
     listaPasos.push(solucion);      //Hace push el nodo a la lista de pasos
     const copiaAnterior = solucion;      // Realiza una copia del nodo actual para guardar la dirección.
     solucion = solucion.padre;       // Avanza al nodo padre para continuar retrocediendo.
     direccion = direccionMovimiento(copiaAnterior, solucion);      // Registra la dirección o acción tomada entre los nodos.
   }
   // Muestra los pasos de la solución en orden inverso.
   for (let i = listaPasos.length - 1; i >= 0; i--) {
     const NodoArbol = listaPasos[i];
     console.log("-----Direccion: ", NodoArbol._direccion, "---------PASO: ", cont++, "---------------------------");
     console.log(imprimir(NodoArbol._estado));
   }
   // Devuelve la lista de pasos como una solución.
   let currentIndex = listaPasos.length-1;
   
   const interval = setInterval(function() {
   if (currentIndex >= 0) {
     const nodo = listaPasos[currentIndex];
     intercambiarImagenes1(nodo,size);
     currentIndex--;
   } else {
     clearInterval(interval); // Detener el intervalo cuando se hayan procesado todos los nodos
   }
    }, 700);
  } else {
    // Si no se encuentra una solución, muestra un mensaje y devuelve null.
    sinSolucion();

    return null;
  }
}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
/**
 * Función que determina la dirección del movimiento entre dos estados de un rompecabezas numérico.
 * @param {NodoArbol} NodoArbolAnterior - El nodo anterior que representa un estado.
 * @param {NodoArbol} matrizActual - El nodo actual que representa un estado.
 * @returns {number} - Un valor que representa la dirección del movimiento: 0 (Arriba), 1 (Abajo), 2 (Derecha), 3 (Izquierda) o -1 (Error).
 */
function direccionMovimiento(NodoArbolAnterior, matrizActual) {  
  // Obtener las coordenadas del 0 en ambas matrices usando la función ubiPosCero
  const [filaAnterior, columnaAnterior] = ubiPosCero(NodoArbolAnterior._estado);
  const [filaActual, columnaActual] = ubiPosCero(matrizActual._estado);

  // Determinar la dirección del movimiento
  if (filaActual === filaAnterior - 1 && columnaActual === columnaAnterior) {
    // Si el 0 se movió hacia arriba, establece la dirección como 1 (Arriba)
    NodoArbolAnterior.direccion = [matrizActual._estado[filaAnterior][columnaAnterior], 1];
    return [matrizActual._estado[filaAnterior][columnaAnterior], 1]; // [Pieza, Arriba]
  } else if (filaActual === filaAnterior + 1 && columnaActual === columnaAnterior) {
    // Si el 0 se movió hacia abajo, establece la dirección como 0 (Abajo)
    NodoArbolAnterior.direccion = [matrizActual._estado[filaAnterior][columnaAnterior], 0];
    return [matrizActual._estado[filaAnterior][columnaAnterior], 0]; // [Pieza, Abajo]
  } else if (filaActual === filaAnterior && columnaActual === columnaAnterior - 1) {
    // Si el 0 se movió hacia la derecha, establece la dirección como 3 (Derecha)
    NodoArbolAnterior.direccion = [matrizActual._estado[filaAnterior][columnaAnterior], 3];
    return [matrizActual._estado[filaAnterior][columnaAnterior], 3]; // [Pieza, Derecha]
  } else if (filaActual === filaAnterior && columnaActual === columnaAnterior + 1) {
    // Si el 0 se movió hacia la izquierda, establece la dirección como 2 (Izquierda)
    NodoArbolAnterior.direccion = [matrizActual._estado[filaAnterior][columnaAnterior], 2];
    return [matrizActual._estado[filaAnterior][columnaAnterior], 2]; // [Pieza, Izquierda]
  }
}
//--------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------
/**
 * Función principal para resolver el rompecabezas utilizando el algoritmo de backtracking.
 * @param {array} inicio - La matriz que representa el estado inicial del juego.
 * @returns {NodoArbol|null} - El nodo del árbol que representa la solución encontrada o null si no se encontró una solución.
 */
function main2(inicio) {
  console.log("Matriz que entra al main2 a partir de id:", inicio);// 
  //inicio = [[4,1,3],[2,5,6],[7,0,8]]
  // Crea un objeto NodoArbol a partir de la matriz de inicio.
  const Inicial = new NodoArbol(inicio);

  // Llama a la función 'backtracking' para resolver el juego a partir del estado inicial.
  // El tercer argumento, [], representa una lista de nodos visitados.
  let NodoArbolSolucion = backtracking(Inicial, 0, []);
  // Comprueba si se encontró una solución.
  if (NodoArbolSolucion != null) {
      // Si se encontró una solución, devuelve el nodo que la representa.
      return NodoArbolSolucion;
  } else {
      // Si no se encontró una solución, devuelve null.
      return null;
  }
}

//---------------------------------------------------------------------------------------------------------------
/**
* Función que implementa el algoritmo de backtracking para resolver un juego o rompecabezas.
* @param {NodoArbol} estado - El estado actual del tablero representado como un objeto NodoArbol.
* @param {number} limProfu - El límite de profundidad para controlar la búsqueda.
* @param {array} visitados - Una lista de nodos de árbol visitados para evitar ciclos.
* @returns {NodoArbol|null} - El nodo del árbol que representa la solución encontrada o null si no se encontró una solución.
*/
function backtracking(estado, limProfu, visitados) {  
  // Comprueba si el estado actual es igual a la solución deseada.
  if (matricesSonIguales(estado._estado, generarSolucion(estado._estado.length))) {
      // Si es igual, devuelve el estado actual que representa la solución.
      return estado;
  } else if (limProfu >= 20) {
      // Si se alcanza el límite de profundidad, devuelve null (sin solución).
      return null;
  } else {
      // Busca posibles soluciones desde el estado actual.
      let posiblesSoluciones = buscarSolucion(estado, visitados);

      // Si hay posibles soluciones, realiza una búsqueda recursiva en cada una.
      if (posiblesSoluciones.length !== 0) {
          for (let nuevoEstado of posiblesSoluciones) {
              // Verifica si el nuevo estado ya ha sido visitado.
              let respuesta = backtracking(nuevoEstado, limProfu + 1, visitados);
              // Si se encuentra una respuesta en alguna rama de búsqueda, retórnela.
              if (respuesta !== null) {
                  return respuesta;
              }
          }
      }
      // Si no se encontró una solución en ninguna rama de búsqueda, devuelve null.
      return null;
  }
}
//---------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------
/**
* Función que busca posibles soluciones desde un estado dado del juego.
* @param {NodoArbol} pInicial - El estado inicial del juego representado como un objeto NodoArbol.
* @param {array} pVisitados - Una lista de nodos de árbol visitados para evitar ciclos.
* @returns {array} - Una lista de posibles estados alcanzables desde el estado inicial.
*/
function buscarSolucion(pInicial, pVisitados) {
  // Inicializa un arreglo para almacenar las posibles soluciones.
  const posibles_soluciones = [];

  // Define los movimientos posibles (izquierda, derecha, arriba, abajo) en forma de coordenadas [dx, dy].
  const movimientos = [
      [0, -1], // Mover hacia la izquierda
      [0, 1],  // Mover hacia la derecha
      [-1, 0], // Mover hacia arriba
      [1, 0]   // Mover hacia abajo
  ];
  // Obtiene la dimensión del tablero a partir del estado inicial.
  const tamaño = pInicial._estado.length;
  // Busca la posición del "0" en el tablero.
  const posicion = ubiPosCero(pInicial._estado);
  // Itera sobre los movimientos posibles.
  for (const [dx, dy] of movimientos) {
      // Calcula la nueva posición después del movimiento.
      const [x, y] = [posicion[0] + dx, posicion[1] + dy];
      // Verifica si la posición resultante es válida dentro de los límites del tablero.
      if (x >= 0 && x < tamaño && y >= 0 && y < tamaño) {
          // Crea una copia del estado actual para no alterar el NodoArbol principal.
          const copia = new NodoArbol(clonar(pInicial._estado));
          // Obtiene el valor en la nueva posición.
          const valor = copia._estado[x][y];
          // Actualiza el estado de la copia con el nuevo movimiento.
          copia._estado[posicion[0]][posicion[1]] = valor;
          copia._estado[x][y] = 0;
          // Verifica si el estado ya ha sido visitado para evitar ciclos.
          if (estaEnVisitados(pVisitados, copia) == false) {
              // Marca el estado como visitado agregándolo a la lista de visitados.
              pVisitados.push(pInicial);
              // Crea un hijo del NodoArbol para el nuevo estado.
              const hijo = new NodoArbol(clonar(pInicial._estado));
              // Actualiza el estado del hijo con el nuevo movimiento.
              const valor = hijo._estado[x][y];
              hijo._estado[posicion[0]][posicion[1]] = valor;
              hijo._estado[x][y] = 0;
              // Agrega el estado a la lista de posibles soluciones.
              posibles_soluciones.push(hijo);
              // Establece la relación padre-hijo entre el NodoArbol actual y su hijo.
              hijo.padre = pInicial;
          }
      }
  }
  // Devuelve la lista de posibles soluciones alcanzables desde el estado inicial.
  return posibles_soluciones;
}
//---------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------

/**
* Función que verifica si un estado hijo ya ha sido visitado en la lista de nodos visitados.
* @param {array} pVisitados - Una lista de nodos de árbol visitados.
* @param {NodoArbol} pHijo - El estado hijo que se desea verificar si está en la lista de visitados.
* @returns {boolean} - True si el estado hijo está en la lista de visitados, false en caso contrario.
*/
function estaEnVisitados(pVisitados, pHijo) {
  // Obtiene el estado del hijo.
  const estadoHijo = pHijo._estado;
  // Itera sobre la lista de nodos visitados.
  for (const NodoArbol of pVisitados) {
      // Obtiene el estado del nodo de árbol actual en la lista.
      const estadoNodoArbol = NodoArbol._estado;
      // Compara el contenido de las matrices de estado para verificar si son iguales.
      if (matricesSonIguales(estadoNodoArbol, estadoHijo)) {
          // Si el estado hijo es igual a un estado en la lista de visitados, devuelve true.
          return true;
      }
  }

  // Si no se encuentra ninguna coincidencia, devuelve false.
  return false;
}
//---------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------
/**
* Función que verifica si dos matrices son iguales comparando sus elementos.
* @param {array} matriz1 - La primera matriz a comparar.
* @param {array} matriz2 - La segunda matriz a comparar.
* @returns {boolean} - True si las matrices son iguales, false si son diferentes.
*/
function matricesSonIguales(matriz1, matriz2) {
  // Comprueba si las matrices tienen diferentes longitudes en la dimensión principal.
  if (matriz1.length !== matriz2.length) {
      return false; // Las matrices tienen diferentes longitudes, por lo que no pueden ser iguales
  }
  // Itera sobre las filas de las matrices.
  for (let i = 0; i < matriz1.length; i++) {
      // Comprueba si las filas tienen diferentes longitudes.
      if (matriz1[i].length !== matriz2[i].length) {
          return false; // Las filas de las matrices tienen diferentes longitudes, por lo que no pueden ser iguales
      }
      // Itera sobre los elementos en las mismas posiciones de las filas.
      for (let j = 0; j < matriz1[i].length; j++) {
          // Compara los elementos en las mismas posiciones.
          if (matriz1[i][j] !== matriz2[i][j]) {
              return false; // Los elementos en las mismas posiciones son diferentes, por lo que las matrices no son iguales
          }
      }
  }
  // Si no se encontraron diferencias, las matrices son iguales.
  return true;
}
//---------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------
/**
* Función que crea una copia (clon) de una matriz.
* @param {array} estado - La matriz que se desea clonar.
* @returns {array} - Una nueva matriz que es una copia exacta de la matriz original.
*/
function clonar(estado) {
  // Inicializa una nueva matriz para almacenar la copia.
  const clon = [];
  // Itera sobre las filas de la matriz original.
  for (let i = 0; i < estado.length; i++) {
      // Inicializa una nueva fila en la matriz de copia.
      clon[i] = [];
      // Itera sobre los elementos de la fila actual de la matriz original.
      for (let j = 0; j < estado[i].length; j++) {
          // Copia el valor del elemento de la matriz original al elemento correspondiente de la matriz de copia.
          clon[i][j] = estado[i][j];
      }
  }
  // Devuelve la matriz de copia, que es una copia exacta de la matriz original.
  return clon;
}
//---------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------
/**
* Función que imprime una representación visual de una matriz en la consola.
* @param {array} estado - La matriz que se desea imprimir.
*/
function imprimir(estado) {
  // Itera sobre las filas de la matriz.
  for (let i = 0; i < estado.length; i++) {
      let fila = "";

      // Itera sobre los elementos de la fila actual.
      for (let j = 0; j < estado[i].length; j++) {
          // Concatena cada elemento con corchetes y un espacio en una cadena.
          fila += "[" + estado[i][j] + "] ";
      }
      // Imprime la fila en la consola.
      console.log(fila);
  }
  // Agrega una línea en blanco en la consola para separar los estados.
  console.log("\n");
}
//---------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------
/**
* Función que encuentra la posición del número 0 en una matriz.
* @param {array} estado - La matriz en la que se busca la posición del número 0.
* @returns {array} - Un arreglo que contiene las coordenadas [fila, columna] donde se encuentra el número 0.
*                   Si no se encuentra el número 0, devuelve [-1, -1].
*/
function ubiPosCero(estado) {
  // Inicialmente, establecemos la posición a [-1, -1] para indicar que no se ha encontrado el número 0.
  var posicion = [-1, -1];
  // Recorremos la matriz estado para encontrar la posición del número 0.
  for (let i = 0; i < estado.length; i++) {
      for (let j = 0; j < estado[i].length; j++) {
          if (estado[i][j] === 0) {
              // Cuando se encuentra el número 0, se actualiza la posición y se sale del bucle.
              posicion[0] = i;
              posicion[1] = j;
              break;
          }
      }
  }
  // Devuelve las coordenadas [fila, columna] donde se encuentra el número 0.
  // Si no se encuentra el número 0, devuelve [-1, -1].
  return posicion;
}
//---------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------
/**
* Función que genera una matriz de solución para el rompecabezas numérico del tamaño especificado.
* @param {number} tamaño - El tamaño del rompecabezas (número de filas y columnas).
* @returns {array} - Una matriz que representa una solución válida para el rompecabezas.
*/
function generarSolucion(tamaño) {
  // Inicializa una matriz vacía para almacenar la solución.
  const solucion = [];
  let número = 1;
  // Itera sobre las filas del rompecabezas.
  for (let i = 0; i < tamaño; i++) {
      // Inicializa una fila vacía para cada fila del rompecabezas.
      const fila = [];
      // Itera sobre las columnas del rompecabezas.
      for (let j = 0; j < tamaño; j++) {
          if (número === tamaño * tamaño) {
              // Si se ha alcanzado el último número, agrega un 0 para representar el espacio vacío.
              fila.push(0);
          } else {
              // Agrega el número actual a la fila y luego incrementa el número para el siguiente.
              fila.push(número++);
          }
      }
      // Agrega la fila completa a la matriz de solución.
      solucion.push(fila);
  }
  // Devuelve la matriz de solución, que representa una solución válida para el rompecabezas.
  return solucion;
}
//---------------------------------------------------------------------------------------------------------------
/**
 * Intercambia las imágenes de dos elementos en una matriz de juego y actualiza sus identificadores.
 *
 * @param {Object} nodo - El nodo que contiene información sobre el estado y la dirección de la pieza a mover.
 * @param {number} size - El tamaño de la matriz de juego.
 */
function intercambiarImagenes1(nodo, size) {
  // Extrae la matriz del nodo, la pieza que se mueve y la dirección.
  let mat = nodo._estado;
  let pieza = nodo._direccion[0];
  let direccion = nodo._direccion[1];
  // Encuentra la fila y columna en la que se encuentra la pieza.
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
  imprimirMov(pieza,direccion);
  const imagen2 = document.getElementById((size*size)-1); //como la ultima ficha siempre es el 0, busca la del orden**2
  const srcImagen1 = imagen1.src; //Obtiene las imagenes
  const srcImagen2 = imagen2.src; 

  imagen1.src = srcImagen2;  //Intercambia las imagenes
  imagen2.src = srcImagen1;


  imagen1.id = (size*size)-1; //Intercambia los id
  imagen2.id = pieza-1;

}
//---------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

