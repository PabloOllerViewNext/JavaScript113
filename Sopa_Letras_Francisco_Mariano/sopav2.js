// ALT+Z para visualizar el contenido en el tamaño de la ventana de VS.

const palabras = ["manzana", "autobus", "batido", "portatil", "caballo", "telefono", "mesa", "cartel", "hoja", "sol"];
const letras = "abcdefghijklmnopqrstuvwxyz";
const COLUMNAS = 20;
const FILAS = 20;


function crearTablero() {
    var tablero = document.getElementById("sopaDeLetras");

    for (let i = 0; i < FILAS; i++) {
        var fila = document.createElement("tr");

        for (let j = 0; j < COLUMNAS; j++) {
            var celda = document.createElement("td");
            fila.appendChild(celda);
        }

        tablero.appendChild(fila);
    }

    colocarPalabras();
    rellenarHuecos();
}


function colocarPalabras() {
    palabras.forEach(function (palabra) {
        var posicionValida = false;
        var posicion = getPosicionRandom();
        var direccion = getDireccionRandom();

        do {
            if (direccion === 0) { // horizontal, insertamos la palabra en una fila.
                if (cabeEnFila(palabra, posicion)) {
                    insertarPalabra(palabra, posicion, direccion);
                    posicionValida = true;
                }
            }
            else if (direccion === 1) { // vertical, insertamos la palabra en una columna
                if (cabeEnColumna(palabra, posicion)) {
                    insertarPalabra(palabra, posicion, direccion);
                    posicionValida = true;
                }
            }

            // Si no es válida, buscamos otra posición aleatoria
            if (!posicionValida) {
                posicion = getPosicionRandom();
                direccion = getDireccionRandom();
            }
        } while (!posicionValida)
    });
}


function getDireccionRandom() {
    return Math.floor(Math.random() * 2);
}


function getPosicionRandom() {
    var columna = Math.floor(Math.random() * COLUMNAS);
    var fila = Math.floor(Math.random() * FILAS);
    return { fila , columna };
}


function cabeEnFila(palabra, posicion) {
    // recogemos todos las celdas de la fila aleatória.
    var celdas = document.querySelectorAll(`tr:nth-child(${posicion.fila + 1}) td`);

    // comprobamos si la palabra cabe a partir de la celda de inicio aleatória que tenemos.
    if ((FILAS - posicion.columna >= palabra.length)) {
        // si cabe, miramos si las celdas a partir de la celda de inicio aleatória están vacias o no. 
        return comprobarEspacioCeldas(celdas, posicion.columna, palabra)
    } else {
        return false;
    }
}


function cabeEnColumna(palabra, posicion) {
    var celdas = document.querySelectorAll(`tr td:nth-child(${posicion.columna + 1})`);

    if ((COLUMNAS - posicion.fila >= palabra.length)) {
        return comprobarEspacioCeldas(celdas, posicion.fila, palabra)
    } else {
        return false;
    }
}


function comprobarEspacioCeldas(celdas, posicion, palabra) {
    var celdasVacias = 0;
    var cabe = false;

    // recorremos las siguientes celdas a partir de la posición de inicio.
    for (let i = posicion; i < (posicion + palabra.length); i++) {
        // si la casilla está vacía o tiene un carácter que coincida con la letra de la palabra, vamos sumando a celdasVacias hasta que llegue al tamaño de la palabra correspondiente, esto quiere decir que ya cabe.
        if (celdas[i].innerText === "" || celdas[i].innerText === palabra[celdasVacias]) {
            celdasVacias++;
            if (celdasVacias >= (palabra.length)) {
                cabe = true;
                break;
            }
        }
        // si la casilla está ocupada, reseteamos celdasVacias para que vuelva a contar por si cabe después de esta.
        else {
            celdasVacias = 0;
        }
    }

    return cabe;
}


function insertarPalabra(palabra, posicion, direccion) {
    var contador = 0;

    // horizontal
    if (direccion === 0) {
        var fila = document.querySelectorAll(`tr:nth-child(${posicion.fila + 1}) td`);

        // metemos letra a letra en la posición correspondiente.
        for (let i = 0; i < palabra.length; i++) {
            fila[posicion.columna + contador].innerText = palabra[i];
            contador++;
        }
    }

    if (direccion === 1) {
        var columna = document.querySelectorAll(`tr td:nth-child(${posicion.columna + 1})`);

        for (let i = 0; i < palabra.length; i++) {
            columna[posicion.fila + contador].innerText = palabra[i];
            contador++;
        }
    }
}


function rellenarHuecos() {
    var tabla = document.getElementById("sopaDeLetras");
    var celdas = tabla.querySelectorAll("td");

    // recorremos todas las celdas de la tabla. Si está vacia, rellenamos con una letra aleatória.
    for (let i = 0; i < celdas.length; i++) {
        if (celdas[i].innerText === "") {
            var letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
            celdas[i].innerText = letraAleatoria;
        }
    }
}


var contadorAciertos = 0;
var palabrasAcertadas = [];
function addAcierto(palabra) {
    // si no ha encontrado la palabra todavía, procedemos a trabajar con ella.
    if (!palabrasAcertadas.find(elemento => elemento === palabra)) {
        // añadimos la palabra a la lista de aciertos
        listaAcierto = document.getElementById("palabrasAcierto");
        palabraAcierto = document.createElement("li");
        palabraAcierto.innerText = palabra;
        listaAcierto.appendChild(palabraAcierto);

        // sumamos +1 a los puntos
        document.getElementById("puntos").innerHTML = parseInt(document.getElementById("puntos").innerHTML) + 1;

        contadorAciertos++;

        // guardamos las palabrasacertadas
        palabrasAcertadas.push(palabra);

        if (palabrasAcertadas.length == 10) {
            alert(" --- ¡HAS GANADO! ---")
            document.getElementById("palabraInput").disabled = true;
        }
    }

    document.getElementById("palabraInput").value = "";
}


function addError(palabra) {
    // añadimos la palabra erronea a la lista de palabrasErroneas
    listaError = document.getElementById("palabrasErroneas");
    palabraError = document.createElement("li");
    palabraError.innerText = palabra.value;
    listaError.appendChild(palabraError);

    // sumamos +1 al número de intentos erroneos
    document.getElementById("intentosFallidos").innerHTML = parseInt(document.getElementById("intentosFallidos").innerHTML) + 1;

    // restamos uno a los puntos actuales
    if (parseInt(document.getElementById("puntos").innerHTML) != 0) {
        document.getElementById("puntos").innerHTML = parseInt(document.getElementById("puntos").innerHTML) - 1;
    }
}


// buscamos la palaba en la sopa de letras al pulsar - Intro dentro del input. 
document.addEventListener("DOMContentLoaded", function () {
    var palabraInput = document.getElementById("palabraInput");

    palabraInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var tabla = document.getElementById("sopaDeLetras");
            var palabraBuscada = palabraInput.value.trim().toLowerCase();

            for (let i = 0; i < tabla.rows.length; i++) {
                for (let j = 0; j < tabla.rows[i].cells.length; j++) {
                    var celda = tabla.rows[i].cells[j];
                    var letra = celda.innerHTML.toLowerCase();

                    // Buscar palabras en sentido horizontal
                    for (let k = 0; k < palabras.length; k++) {
                        var palabra = palabras[k].toLowerCase();
                        if (letra === palabra[0]) {
                            var palabraEncontrada = true;
                            for (let l = 1; l < palabra.length; l++) {
                                if (j + l >= tabla.rows[i].cells.length || tabla.rows[i].cells[j + l].innerHTML.toLowerCase() !== palabra[l]) {
                                    palabraEncontrada = false;
                                    break;
                                }
                            }
                            if (palabraEncontrada && palabra === palabraBuscada) {
                                for (let l = 0; l < palabra.length; l++) {
                                    tabla.rows[i].cells[j + l].classList.add("acierto");
                                }
                                addAcierto(palabra);
                                return;
                            }
                        }
                    }

                    // Buscar palabras en sentido vertical
                    for (let k = 0; k < palabras.length; k++) {
                        var palabra = palabras[k].toLowerCase();
                        if (letra === palabra[0]) {
                            var palabraEncontrada = true;
                            for (let l = 1; l < palabra.length; l++) {
                                if (i + l >= tabla.rows.length || tabla.rows[i + l].cells[j].innerHTML.toLowerCase() !== palabra[l]) {
                                    palabraEncontrada = false;
                                    break;
                                }
                            }
                            if (palabraEncontrada && palabra === palabraBuscada) {
                                for (let l = 0; l < palabra.length; l++) {
                                    tabla.rows[i + l].cells[j].classList.add("acierto");
                                }
                                addAcierto(palabra);
                                return;
                            }
                        }
                    }
                }
            }
            if (!palabraEncontrada) {
                addError(palabraInput);
            }

            palabraInput.value = "";
        }
    });
});