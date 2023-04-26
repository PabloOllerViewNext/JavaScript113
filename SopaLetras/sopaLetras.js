//Este código está hecho por Pablo Oller Pérez
/*En este codigo vamos a implementar la función extra 
de local storage para almacenar las partidas ganadas*/
if (typeof (Storage) !== "undefined") {
    //Aquí inicializo a 0 las partidas ganadas
    if (localStorage.getItem("partidasGanadasSL") == null) {
        localStorage.setItem("partidasGanadasSL", 0);
    }
    const palabras = [
        "PANTALLA",
        "RELOJERIA",
        "CAMALEON",
        "TERRITORIO",
        "PAVIMENTO",
        "AGUACERO",
        "RODAMIENTO",
        "SARTEN",
        "CANGURO",
        "EMPANADA"
    ];

    let contadorPG = 0;
    let puntuacion = 0;
    let contIntentos = 15;

    const palabrasEncontradas = [];
    let tabla = document.createElement("table");
    let matriz = [];
    function inicializarMatriz() {
        for (let f = 0; f < 20; f++) {
            matriz[f] = [];
            for (let c = 0; c < 20; c++) {
                matriz[f][c] = "";
            }
        }
    }
    function generarTabla() {
        generarIntentos();
        generarPuntos();
        generarPartidas();
        inicializarMatriz();
        palabras.forEach(palabra => {

            colocarPalabras(palabra);
        });
        rellenarMatriz();
        for (let i = 0; i < 20; i++) {
            let filas = document.createElement("tr");
            for (let j = 0; j < 20; j++) {
                let contenido = matriz[i][j];
                let celda = document.createElement("td");
                celda.innerHTML = contenido;
                filas.append(celda);
            }
            tabla.appendChild(filas);
        }
        document.getElementById("matriz").appendChild(tabla);

    }
    function generarNumeroAleatorio() {
        fila = Math.floor(Math.random() * 20);
        columna = Math.floor(Math.random() * 20);
        return { fila, columna };
    }

    //muestra los intentos actuales que tiene el usuario
    function generarIntentos() {
        document.querySelector("#contador").innerText = contIntentos;
    }
    //muestra los puntos actuales que lleva el usuario
    function generarPuntos() {
        document.querySelector("#puntos").innerText = puntuacion;
    }//muestra las partidas ganadas por el usuario
    function generarPartidas() {
        document.querySelector("#PG").innerText = localStorage.getItem("partidasGanadasSL");
    }

    function generarCaracterAleatorio() {
        let num = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
        return String.fromCharCode(num);
    }

    function colocarPalabras(palabra) {
        let orientacion = "";
        let pos = 0;
        do {
            pos = generarNumeroAleatorio();
            orientacion = posicionValida(pos, palabra)
        } while (orientacion == "CANT");
        meterEnTabla(palabra, pos, orientacion);
    }

    function posicionValida(pos, palabra) {
        let celdaVacia = 0;
        let horizontal = false;
        let tamanioHorizontal = 20 - pos.columna;
        let tamanioVertical = 20 - pos.fila;

        if (palabra.length <= tamanioHorizontal) {
            for (let c = pos.columna; c < palabra.length + pos.columna; c++) {
                if (matriz[pos.fila][c] == "") {
                    celdaVacia++;
                    horizontal = true;
                } else {
                    horizontal = false;
                    celdaVacia = 0;
                }
            }
        } else if (palabra.length <= tamanioVertical) {
            for (let f = pos.fila; f < palabra.length + pos.fila; f++) {
                if (matriz[f][pos.columna] == "") {
                    celdaVacia++;
                } else {
                    celdaVacia = 0;
                }
            }
        } else {
            return "CANT";
        }
        if (celdaVacia >= palabra.length && !horizontal) {
            return "vertical";
        } else if (celdaVacia >= palabra.length && horizontal) {
            return "horizontal";
        } else {
            return "CANT";
        }
    }

    function meterEnTabla(palabra, pos, orientacion) {

        let cont = 0;
        if (orientacion == "horizontal") {
            for (let c = pos.columna; c < palabra.length + pos.columna; c++) {
                matriz[pos.fila][c] = palabra[cont];
                cont++;
            }
        } else {
            for (let f = pos.fila; f < palabra.length + pos.fila; f++) {
                matriz[f][pos.columna] = palabra[cont];
                cont++;
            }
        }
    }
    function rellenarMatriz() {
        for (f = 0; f < 20; f++) {
            for (c = 0; c < 20; c++) {
                if (matriz[f][c] == "") {
                    matriz[f][c] = generarCaracterAleatorio();
                }
            }
        }
    }

    function buscar() {
        let buscador = document.querySelector("#buscador");

        if (palabras.includes(buscador.value.toUpperCase())) {
            if (!palabrasEncontradas.includes(buscador.value.toUpperCase())) {
                palabrasEncontradas.push(buscador.value.toUpperCase());
                document.getElementById("palabrasAcertadas").innerHTML += buscador.value + "<br>";
                puntuacion++;
                generarPuntos();
                seleccionarPalabra(buscador.value.toUpperCase());
                aciertaTodas()
            }
        } else {
            document.getElementById("palabrasFalladas").innerHTML = buscador.value + "<br>";
            if (puntuacion > 0) {
                puntuacion--
                generarPuntos();
            }

            contIntentos--;
            generarIntentos();
            if (contIntentos == 0) {
                //Esta es la parte en la que pierde el usuario
                //cuando pierde le recarga la página
                alert("No te quedan intentos!!");
                location.reload();
            }
            this.className = "btn btn-danger botonLetra fallada";

        }
        buscador.value = "";
    }
    function seleccionarPalabra(palabra) {
        filas = document.querySelectorAll("tr");
        celdas = document.querySelectorAll("td");
        debugger;
        var palabraInput = palabra;
        var palabraBuscada = palabraInput.toLowerCase();



        let cont = 0;


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

                                tabla.rows[i].cells[j + l].classList.add("encontrada");
                                document.getElementById("buscador").value = "";

                            }

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

                                tabla.rows[i + l].cells[j].classList.add("encontrada");
                                document.getElementById("buscador").value = "";

                            }

                            return;

                        }

                    }

                }

            }

        }
    }

    function aciertaTodas() {

        if (contIntentos >= 0 && palabrasEncontradas.length == palabras.length) {
            alert("HAS GANADO CON LA INCREIBLE PUNTUACIÓN DE " + puntuacion + " PUNTOS !!");
            let partidas = parseInt(localStorage.getItem("partidasGanadasSL"));
            partidas++;
            localStorage.setItem("partidasGanadasSL", partidas);
            document.getElementById("PG").innerText = localStorage.getItem("partidasGanadasSL");
            document.getElementById("SearchButton").disabled = true;
        }
    }
} else {
    //Esto es en caso de que el ordenador no soporte el almacén web
    alert("Su navegador no soporta WebStorage");
}