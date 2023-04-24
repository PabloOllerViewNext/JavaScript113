/* Defino el array de las palabras */
const palabras = ["CANGREJO", "CASA", "CIRUELA", "MESA", "VALIENTE", "PANTALLA", "BURBUJA", "COCHE", "MOTO", "HUESO"];

/* Defino la variable de letras */
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* Obtiene el div para imprimir la sopa de letras */
let contenedorLetras = document.getElementById("contenedorLetras");

/* Define el tamaño de la sopa */
const filas = 20;
const columnas = 20;

/* Inicializo la puntuación */
let puntuacion = 0;

/* Inicializar la matriz */
let sopa = [];

function rellenarHuecos() {
    for (let i = 0; i < filas; i++) {
        sopa[i] = [];
        for (let j = 0; j < columnas; j++) {
            sopa[i] = new Array(columnas).fill(" - ");
        }
    }
}
rellenarHuecos()

for (let palabra of palabras) {
    let fila, columna, caracteresRestantes, posicionDisponible, vertical;
    
    do {
        fila = Math.floor(Math.random() * filas);
        columna = Math.floor(Math.random() * columnas);
        caracteresRestantes = palabra.length;
        posicionDisponible = true;
        vertical = Math.random() >= 0.5;

        for (let i = 0; i < palabra.length; i++) {
            let filaActual = vertical ? fila + i : fila;
            let columnaActual = vertical ? columna : columna + i;

            if (filaActual >= filas || columnaActual >= columnas || sopa[filaActual][columnaActual] !== " - " && sopa[filaActual][columnaActual] !== palabra[i]) {
                posicionDisponible = false;
                break;
            }
        }
    } while (!posicionDisponible);

    for (let caracter of palabra) {
        sopa[fila][columna] = caracter;
        if (vertical) {
            fila++;
        } else {
            columna++;
        }
        caracteresRestantes--;
    }
}

function rellenarGuionesDeLetras() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (sopa[i][j] === " - ") {
                let letraAleatoria = alfabeto[Math.floor(Math.random() * alfabeto.length)];
                sopa[i][j] = letraAleatoria;
            }
        }
    }
}
rellenarGuionesDeLetras()

/* Relleno la tabla de los guiones */
function rellenarTabla() {
    let tabla = document.createElement("table");
    for (let i = 0; i < filas; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < columnas; j++) {
            let celda = document.createElement("td");
            celda.textContent = sopa[i][j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    /* Agrega la tabla al div de la sopa de letras */
    contenedorLetras.appendChild(tabla);
}
rellenarTabla()

const inputPalabra = document.getElementById("inputPalabra");
const botonBuscar = document.getElementById("botonBuscar");
const palabrasPuntuadas = new Set();

botonBuscar.addEventListener("click", () => {
    let palabra = inputPalabra.value.toUpperCase();
    let tabla = document.getElementsByTagName("table")[0];

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (sopa[i][j] === palabra[0]) {
                let palabraEncontrada = true;

                /* Verificar en horizontal */
                for (let k = 1; k < palabra.length; k++) {
                    if (j + k >= columnas || sopa[i][j + k] !== palabra[k]) {
                        palabraEncontrada = false;
                        break;
                    }
                }

                if (palabraEncontrada) {
                    /* Verificar si la palabra encontrada está en el array palabras */
                    if (palabras.includes(palabra)) {
                        for (let k = 0; k < palabra.length; k++) {
                            let celda = tabla.rows[i].cells[j + k];
                            celda.classList.add("resaltado");
                        }
                        puntuacion++;
                        palabrasPuntuadas.add(palabra);
                        return;
                    }
                }

                palabraEncontrada = true;

                /* Verificar en vertical */
                for (let k = 1; k < palabra.length; k++) {
                    if (i + k >= filas || sopa[i + k][j] !== palabra[k]) {
                        palabraEncontrada = false;
                        break;
                    }
                }

                if (palabraEncontrada) {
                    /* Verificar si la palabra encontrada está en el array palabras */
                    if (palabras.includes(palabra)) {
                        for (let k = 0; k < palabra.length; k++) {
                            let celda = tabla.rows[i + k].cells[j];
                            celda.classList.add("resaltado");
                        }
                        puntuacion++;
                        palabrasPuntuadas.add(palabra);
                        return;
                    }
                }
            }
        }
        /* Verificar si la palabra ya fue puntuada */
        if (palabrasPuntuadas.size == palabras.length) {
            /* Mensaje de victoria */
            Swal.fire({
                icon: "success",
                title: "¡Felicidades, has completado la sopa de letras!",
                text: "Tu puntuación final es: " + puntuacion,
                showConfirmButton: true,
                confirmButtonText: "Aceptar"
            })
        }
    }

    
    function listaPalabrasFallos() {
        /* Si la palabra no esta en el array de las palabras la añado a una lista */
        let palabraIntroducida = document.getElementById("inputPalabra").value;
        let lista = document.getElementById("miLista");

        for (let i = 0; i < palabras.length; i++) {
            if (palabraIntroducida !== palabras[i]) {
                let li = document.createElement("li");
                li.innerHTML = palabraIntroducida;
                lista.append(li);
                
                if (puntuacion == 0) {
                    puntuacion = 0;
                } else {
                    puntuacion--;
                }
                console.log(puntuacion)
                break;
            }
        }
    }
    listaPalabrasFallos()
    
});