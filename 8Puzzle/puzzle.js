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


//Isaac Jose
function iniciar() {/*
  let matriz = crearMatrizDesdeDivs();
    for(i=0;i<matriz.length;i++){
      for(j=0;j<matriz.length;j++){
        console.log( matriz[i][j])
      }
  }*/
  solAlgoritmoA(test,3);
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
      if(parseInt(dataIndex)==9){
        matrizDesdeDivs[fila][columna] = 0;
      }
      else{
        matrizDesdeDivs[fila][columna] = parseInt(dataIndex);
      }
      
    }
  }

  return matrizDesdeDivs;
}
//Algoritmo A*

//Modificar para que la ultima posicion sea un 0
function generarMatrizCuadrada(size){
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
  matrix[size-1][size-1] = 0;
  return matrix;
}

function calcularIncorrectas(matrizCorrecta,matrizJuego,nsize){
  let incongruencias = 1;
  for (let i = 0; i < nsize; i++) {
    for (let j = 0; j < nsize; j++) {
      if(matrizCorrecta[i][j]!=matrizJuego[i][j] && matrizJuego[i][j]!=0){
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


function main(size){
  matriz = generarMatrizCuadrada(size);
  console.log(calcularIncorrectas(matriz, test,size));
}
class Nodo {
  constructor(peso) {
    this.peso = peso;       //Es lo que cuesta llegar hasta ahí desde el principio
    this.hijos = [];     //Los movimientos que se pueden hacer a partir del padre
    this.direccion = [];      //(Pieza a mover, direccion(0=arriba,1=abajo,2=derecha,3=izquierda))
    this.matriz=[];           //Como están acomodadas las piezas a ese punto
    this.padre = Nodo;
  }

  conectar(padre,peso,pieza,direccion,matriz) {
    this.direccion.push(pieza);           //Numero de pieza
    this.direccion.push(direccion);       //Hacia donde se mueve
    this.matriz = matriz;
    this.peso = peso;
    this.padre = padre;
  }


}

function compararMatrices(matriz1, matriz2) {

  if(matriz1.length != matriz2.length) {
    return false;
  }

  for(let i = 0; i < matriz1.length; i++) {
    if(matriz1[i].length != matriz2[i].length) {
      return false;
    }

    for(let j = 0; j < matriz1[i].length; j++) {
      if(matriz1[i][j] != matriz2[i][j]) {
        return false; 
      }
    }
  }

  return true;
}



function solAlgoritmoA(mJuego,size){
  let nmatriz = generarMatrizCuadrada(size);
  let padre = new Nodo(0);
  padre.matriz = mJuego;
  let abiertos = [];
  let cerrados = [];
  let indexPadre = 0;
  abiertos.push(padre);
  while(compararMatrices(nmatriz,padre.matriz)==false){
    listaNuevasMatrices = generarPosiblesMatrices(padre,size);
    /*for (k=0;k<listaNuevasMatrices.length;k++){
      for(i=0;i<size;i++){
      for(j=0;j<size;j++){
         console.log( listaNuevasMatrices[k][0][i][j])
      }
    }

    console.log('-----')
    }*/
    
    for(i=0;i<listaNuevasMatrices.length;i++){
      
      if(compararMatrices(listaNuevasMatrices[i][0],padre.matriz)==false){
        console.log('Generando Nodo: '+i)
        let nodo = new Nodo();
        
        let peso = calcularIncorrectas(nmatriz, listaNuevasMatrices[i][0], size)+padre.peso;
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
    console.log('Cantidad abiertos: '+abiertos.length)
    console.log('Cantidad cerrados: '+cerrados.length)
    
  }
  let listaCamino = [];
  while((padre.peso)!=0){
    let direccion = [];
    direccion.push(padre.pieza);
    direccion.push(padre.direccion);
    listaCamino.push(direccion);
    padre = padre.padre;
  }
  for(i=listaCamino.length-1;i>=0;i--){
    console.log("Pieza: "+listaCamino[i][1][0]+"  ||  Direccion:"+listaCamino[i][1][1]);

  }
}

/**
 * Funcion que copia una matriz de tamanno nxn.
 * @param {Matriz} matrizOriginal Matriz a copiar.
 * @returns {Matriz} Una copia exacta de la matriz ingresada.
 */
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

/**
 * Funcion que obtiene el indice del elemento con menor valor en un arreglo
 * @param {Array<Int>} abiertos Arreglo a procesar
 * @returns {Int} Indice del elemento con menor valor
 */
function determinarMenor(abiertos){
  index = 0;
  menor = 100000000;
  for (let i = 0; i < abiertos.length; i++) {
    if(abiertos[i].peso<menor){
      menor = abiertos[i].peso;
      index = i;
    }
  }
  return index;
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
  //console.log(matriz)
  //Busca donde se encuentra el 0
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(matriz[i][j]==0){
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
 * Funcion que performa el movimiento(jugada) en una matriz
 * @param {Matriz} matriz Matriz en la que se va a realizar la jugada
 * @param {Int} row Fila en donde se ubica el numero a ser movido
 * @param {Int} column Columna en donde se ubica el numero a ser movido
 * @param {Int} rowCero Fila en donde se ubica el cero(espacio en blanco)
 * @param {Int} columnCero Columna en donde se ubica el cero(espacio en blanco)
 * @returns {Matriz} Matriz con el movimiento realizado
 */
function crearMatrizNueva(matriz,row,column, rowCero, columnCero){
  let num = matriz[row][column];
  let nuevaMatriz = copiarMatriz(matriz);
  nuevaMatriz[row][column] = 0;
  nuevaMatriz[rowCero][columnCero] = num;

  return nuevaMatriz;
}

