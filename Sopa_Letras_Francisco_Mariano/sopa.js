// const palabras = ["manzana", "autobus", "batido", "portatil", "caballo", "telefono", "mesa", "cartel", "hoja", "sol"];
// const letras = "abcdefghijklmnopqrstuvwxyz";
// const sopaDeLetras = [];
// const COLUMNAS = 20;
// const FILAS = 20;

// function crearTablero() {
//     var tablero = document.getElementById("sopaDeLetras");
//     for (let i = 0; i < FILAS; i++) {
//         var fila = document.createElement("tr");
//         for (let j = 0; j < COLUMNAS; j++) {
//             var celda = document.createElement("td");
//             fila.appendChild(celda);
//         }
//         tablero.appendChild(fila);
//     }

//     insertarPalabrasEnTablero();
// }

// function insertarPalabrasEnTablero() {
//     var tablero = document.getElementById("sopaDeLetras");

//     for (let i = 0; i < palabras.length; i++) {
//         let palabra = palabras[i];
//         // let direccion = Math.floor(Math.random() * 3); // 0 = horizontal, 1 = vertical, 2 = diagonal
//         let direccion = 0; // 0 = horizontal, 1 = vertical, 2 = diagonal
//         var posicionValida = false;



//         do {
            
//             var posiciones = [];
//             posiciones.push(Math.floor(Math.random() * FILAS)); //filaInicial
//             posiciones.push(Math.floor(Math.random() * COLUMNAS)); // columnaInicial

//             if (direccion === 0) { // horizontal
//                 if ((COLUMNAS - posiciones[1] >= palabra.length)) { // si la palabra cabe en la fila
//                     posicionValida = true;

//                     var celdas = [];
//                     var fila = document.querySelector(`tr:nth-child(${posiciones[0]})`);
//                     var columnasFilaEspecifica = fila.querySelectorAll("td");

//                     for (let i = posiciones[1]; i < COLUMNAS; i++) {
//                         celdas.push(columnasFilaEspecifica[i]);
//                     }
//                     debugger;
//                     if (celdasVacias(celdas)) {
//                         meterLetras(tablero, palabra, posiciones)
//                     }
//                 }
//             }
//         } while (!posicionValida)


//         // } else if (direccion === 1) { // vertical
//         //     if (FILAS - posiciones[0] >= palabra.length) { // si la palabra cabe en la columna
//         //         for (let j = 0; j < palabra.length; j++) {
//         //             let letra = palabra.charAt(j);
//         //             let celda = tablero.rows[posiciones[0] + j].cells[posiciones[1]];
//         //             celda.textContent = letra;
//         //         }
//         //     }
//         // } else if (direccion === 2) { // diagonal
//         //     if (FILAS - posiciones[0] >= palabra.length && COLUMNAS - posiciones[1] >= palabra.length) { // si la palabra cabe en la diagonal
//         //         for (let j = 0; j < palabra.length; j++) {
//         //             let letra = palabra.charAt(j);
//         //             let celda = tablero.rows[posiciones[0] + j].cells[posiciones[1] + j];
//         //             celda.textContent = letra;
//         //         }
//         //     }
//     }
// }


// function celdasVacias(celdas) {
//     for (let i = 0; i < celdas.length; i++) {
//         if (celdas[i].innerHTML != "") {
//             return false;
//         }
//     }
//     return true;
// }

// function meterLetras(tablero, palabra, posiciones) {
//     for (let j = 0; j < palabra.length; j++) {
//         let letra = palabra.charAt(j);
//         let celda = tablero.rows[posiciones[0]].cells[posiciones[1] + j];
//         celda.textContent = letra;
//     }
// }



