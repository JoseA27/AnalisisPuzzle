// backtracking.js
//Exporta la clase de NodoArbol 
import {NodoArbol} from './Nodo.js'

//---------------------------------------------------------------------------------------------------------------
/**
 * Función principal para resolver el rompecabezas utilizando el algoritmo de backtracking.
 * @param {array} inicio - La matriz que representa el estado inicial del juego.
 * @returns {NodoArbol|null} - El nodo del árbol que representa la solución encontrada o null si no se encontró una solución.
 */
function main2(inicio) {
    
    console.log("Matriz que entra al main2 a partir de id:", inicio);// 
    inicio = [[4, 1, 3], [2, 5, 6], [7, 0, 8]];    // 
    console.log("Matriz Predeterminada:", inicio);// 
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

//Exporta las funciones necesarias a utilziar
export {main2, backtracking,buscarSolucion,estaEnVisitados, matricesSonIguales, clonar,generarSolucion, imprimir,ubiPosCero}