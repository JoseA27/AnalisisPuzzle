// backtracking.js
const Nodo = require('./Nodo.js');

function main(){
    const tamaño = 3
    //const inicio = generarTableroAleatorio(tamaño);
    //const solucion = generarSolucion(tamaño);

    //console.log("Tablero generado: ",imprimir(inicio))
    //console.log("Tablero solucion: ",imprimir(solucion))

    //Ejemplo 1
    //inicio = [[1,2,3],[4,5,6],[7,0,8]]
     //solucion = [[1,2,3],[4,5,6],[7,8,0]]
    //EJEMPLO 2
      inicio = [[4,1,3],
                [2,6,8],
                [7,5,0]]
    //EJEMPLO 3
    // inicio = [[7, 8, 5, 4],
    //          [6, 0, 2, 1],
    //          [3, 9, 11, 12],
    //          [13, 10, 14, 15]]

    
    const Inicial = new Nodo(inicio); 
    NodoSolucion = backtracking(Inicial, 0, []);

    if(NodoSolucion != null){
        console.log("Se encontro solucion")
        const listaPasos = [];
        cont = 1
        while (NodoSolucion !== null) {
            listaPasos.push(NodoSolucion);
            NodoSolucion = NodoSolucion.direccion;
        }
        for (let i = listaPasos.length - 1; i >= 0; i--) {
            const nodo = listaPasos[i];
            console.log("--------------PASO: ", cont++, "---------------------------");
            console.log(imprimir(nodo._estado));
        }
    }
    else{
        console.log("No se encontro solucion")
    }
}

function backtracking(estado, limProfu, visitados) {  
    if (matricesSonIguales(estado._estado, generarSolucion(estado._estado.length))) {
      return estado;
    } else if (limProfu >= 10) { //Limite de profundidad 
      return null
    } else {
      let posiblesSoluciones = buscarSolucion(estado, visitados);
      if (posiblesSoluciones.length !== 0) {
        for (let nuevoEstado of posiblesSoluciones) {
            // Verificar si el nuevo estado ya ha sido visitado
            let respuesta = backtracking(nuevoEstado, limProfu + 1, visitados);
            // Si encontró la respuesta, retórnela
            if (respuesta !== null) {
                return respuesta;
            }
        }
      }
      return null;
    }
}
  
function buscarSolucion(pInicial, pVisitados) {
    const posibles_soluciones = [];
    const movimientos = [
        [0, -1], // Mover hacia la izquierda
        [0, 1],  // Mover hacia la derecha
        [-1, 0], // Mover hacia arriba
        [1, 0]   // Mover hacia abajo
    ];

    const tamaño = pInicial._estado.length; // Obtener la dimensión del tablero
    const posicion = ubiPosCero(pInicial._estado); // Buscar dónde está el cero en el tablero

    for (const [dx, dy] of movimientos) {
        const [x, y] = [posicion[0] + dx, posicion[1] + dy]; // Asignar el movimiento a las variables "x" y "y"
        if (x >= 0 && x < tamaño && y >= 0 && y < tamaño) {// Verificar si la posición resultante es válida
            const copia = new Nodo(clonar(pInicial._estado)); // Método clonar para no alterar el nodo principal
            const valor = copia._estado[x][y];               // Al valor le asigno el nuevo movimiento
            copia._estado[posicion[0]][posicion[1]] = valor; // Al nodo hijo le asigno el valor según su posición
            copia._estado[x][y] = 0;
            if (estaEnVisitados(pVisitados, copia) == false) {
                // Para el nuevo estado, prueba solución
                pVisitados.push(pInicial);
                const hijo = new Nodo(clonar(pInicial._estado)); // Método clonar para no alterar el nodo principal
                const valor = hijo._estado[x][y];               // Al valor le asigno el nuevo movimiento
                hijo._estado[posicion[0]][posicion[1]] = valor; // Al nodo hijo le asigno el valor según su posición
                hijo._estado[x][y] = 0;                         // Al nodo hijo le asigno el cero según su posición
                posibles_soluciones.push(hijo);
                hijo.direccion = pInicial;
            }
        }
    }
    return posibles_soluciones;
}

function estaEnVisitados(pVisitados, pHijo) {
    const estadoHijo = pHijo._estado;
    
    for (const nodo of pVisitados) {
        const estadoNodo = nodo._estado;
        
        // Compara el contenido de las matrices estado
        if (matricesSonIguales(estadoNodo, estadoHijo)) {
            return true;
        }
    }
    return false;
}

function matricesSonIguales(matriz1, matriz2) {
    if (matriz1.length !== matriz2.length) {
        return false; // Las matrices tienen diferentes longitudes, por lo que no pueden ser iguales
    }

    for (let i = 0; i < matriz1.length; i++) {
        if (matriz1[i].length !== matriz2[i].length) {
            return false; // Las filas de las matrices tienen diferentes longitudes, por lo que no pueden ser iguales
        }

        for (let j = 0; j < matriz1[i].length; j++) {
            if (matriz1[i][j] !== matriz2[i][j]) {
                return false; // Los elementos en las mismas posiciones son diferentes, por lo que las matrices no son iguales
            }
        }
    }

    return true; // Si no se encontraron diferencias, las matrices son iguales
}

function clonar(estado) {
    const clon = [];
    for (let i = 0; i < estado.length; i++) {
        clon[i] = [];
        for (let j = 0; j < estado[i].length; j++) {
            clon[i][j] = estado[i][j];
        }
    }
    return clon;
}


function imprimir(estado) {
    for (let i = 0; i < estado.length; i++) {
        let row = "";
        for (let j = 0; j < estado[i].length; j++) {
            row += "[" + estado[i][j] + "] ";
        }
        console.log(row);
    }
    console.log("\n"); // Agrega una línea en blanco para separar los estados
}



function ubiPosCero(estado) {
    var posicion = [-1, -1]; // Inicialmente, establecemos la posición a [-1, -1] para indicar que no se ha encontrado el 0.

    // Recorremos la matriz estado para encontrar la posición del número 0.
    for (let i = 0; i < estado.length; i++) {
        for (let j = 0; j < estado[i].length; j++) {
            if (estado[i][j] === 0) {
                posicion[0] = i;
                posicion[1] = j;
                break; // Se encontró el 0, así que salimos del bucle.
            }
        }
    }

    return posicion;
}

function generarTableroAleatorio(tamaño) {
    const elementos = tamaño * tamaño;
    const numeros = Array.from({ length: elementos }, (_, i) => i);
    const tablero = [];

    for (let i = 0; i < tamaño; i++) {
        const fila = [];
        for (let j = 0; j < tamaño; j++) {
            const índice = Math.floor(Math.random() * numeros.length);
            fila.push(numeros.splice(índice, 1)[0]);
        }
        tablero.push(fila);
    }

    return tablero;
}

function generarSolucion(tamaño) {
    const solucion = [];
    let número = 1;

    for (let i = 0; i < tamaño; i++) {
        const fila = [];
        for (let j = 0; j < tamaño; j++) {
            if (número === tamaño * tamaño) {
                fila.push(0);
            } else {
                fila.push(número++);
            }
        }
        solucion.push(fila);
    }
    return solucion;
}
//Se llama al programa principal
main()