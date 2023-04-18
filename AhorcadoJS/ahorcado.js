if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("PG") == null) {
        localStorage.setItem("PG", 0);
    }

    const palabras = ["manzana", "dedillo", "delantal", "proteina", "creatina", "perro", "casa", "gato", "ordenador", "libro", "mesa", "silla", "ventana", "puerta", "televisor", "coche", "bicicleta", "telefono", "nube", "sol", "luna", "estrella", "avion", "barco", "pajaro", "pescado", "huevo", "queso", "leche", "pan", "jamon", "patata", "arroz", "spaguetti", "pizza", "hamburguesa", "ensalada", "sandwich", "taza", "vaso", "cuchara", "tenedor", "cuchillo", "plato", "vaso", "botella", "papel", "lapiz", "boligrafo", "cuaderno", "carta", "diario", "revista", "periodico", "reloj", "zapato", "pantalon", "camisa", "chaqueta", "gorro", "bufanda", "guantes", "falda", "vestido", "calcetines", "zapatos", "pantalones", "camiseta", "chaqueta", "sombrero", "gorra", "paraguas", "gafas", "cinturon", "anillo", "collar", "pendientes", "mesa", "silla", "armario", "cajonera", "lampara", "alfombra", "cojin", "cortina", "toalla", "jabon", "champu", "cepillo", "peine", "crema", "locion", "maquillaje", "perfume", "cama", "almohada", "edredon", "cobija", "mantel", "servilleta"];
    const palabra = getPalabraRandom(palabras);
    // numDivs será el número de hijos ( divs ) que se mostrarán en pantalla, dependiendo de la longitud de la palabra recogida. 
    const numDivs = palabra.length;

    var letrasArray = [];

    function getPalabraRandom() {
        var randomIndex = Math.floor(Math.random() * palabras.length);

        return palabras[randomIndex];
    }


    function imprimirLetras() {
        // guardamos los intentos que tendrá el usuario dependiendo de la longitud de la palabra recogida.
        document.getElementById("intentos").innerHTML = Math.round(numDivs * 1.5);

        // creamos un div para cada letra y los metemos en el div "letras".
        for (let i = 0; i < numDivs; i++) {
            var div = document.createElement("div");
            div.innerHTML = palabra[i]
            document.getElementById("letras").appendChild(div);
        }

        // mostramos las partidas ganadas almacenadas en localStorage
        document.querySelector("#PG").innerHTML = localStorage.getItem("PG");
    }


    function checkLetra() {
        var posicionLetra = [];
        var checkAcierto = false;
        var ltr;
        var encontrado = false;
        letra = document.getElementById("letraElegida").value;

        // comprobamos si letraElegida en la palabra, si así es,hacemos push de la posición en la que se encuentra.
        for (var i = 0; i < palabra.length; i++) {
            if (palabra[i] == (letra.toLowerCase())) {
                debugger;
                posicionLetra.push(i);
                checkAcierto = true;
                ltr = i;
                if(!encontrado && letrasArray.indexOf(palabra[i])==-1){
                    letrasArray.push(palabra[i]);
                    encontrado=true;
                    actualizarPuntos(true);
                }
                
            }

        }

        console.log(posicionLetra[0]);
        if (checkAcierto) {
            cambiarLetras(posicionLetra);

            // Seleccionar los divs que tienen la clase .aciertoLetra
            const aciertoLetras = document.querySelectorAll(".aciertoLetra");


            debugger;

            // Comprobar si el contenido del div contiene la letra buscada
            if (posicionLetra.indexOf(ltr) == -1) {
            }


        } else {
            document.getElementById("letrasFalladas").innerHTML += (letra + " - ")

            if (parseInt(document.getElementById("puntosActuales").innerHTML) != 0) {
                actualizarPuntos(checkAcierto);
            }
        }

        // dependiendo de si checkAcierto es true / false, le restaremos un intento en la función getIntentosRestantes()
        getIntentosRestantes(checkAcierto)
        checkAcierto = false;
    }


    function actualizarPuntos(resultado) {
        if (resultado) {
            document.getElementById("puntosActuales").innerHTML = parseInt(document.getElementById("puntosActuales").innerHTML) + 1;
        } else {
            document.getElementById("puntosActuales").innerHTML = parseInt(document.getElementById("puntosActuales").innerHTML) - 1;
        }
    }


    function cambiarLetras(posiciones) {
        divLetras = document.getElementById("letras");

        for (var i = 0; i < posiciones.length; i++) {
            divLetras.children[posiciones[i]].classList.add("aciertoLetra");
        }
    }


    function getIntentosRestantes(checkAcierto) {
        if (!checkAcierto) {
            document.getElementById("intentos").textContent = (parseInt(document.getElementById("intentos").textContent) - 1);
        }

        finPartida();
    }


    function finPartida() {
        if (parseInt(document.getElementById("intentos").textContent) == 0) {
            anunciarPerdedor();
        }

        if (comprobarGanador()) {
            anunciarGanador();
        }
    }


    function comprobarGanador() {
        hijosAcertados = true;

        // comprobamos que todas las letras tengan la clase aciertoLetra, lo cual significa que ha ganado
        div = document.getElementById("letras");
        hijos = div.querySelectorAll("*");
        for (let i = 0; i < hijos.length; i++) {
            if (!hijos[i].classList.contains("aciertoLetra")) {

                hijosAcertados = false;
            }
        }

        return hijosAcertados;
    }


    function anunciarGanador() {
        alert("--- ¡HAS GANADO! ---");
        if (localStorage.getItem("PG") != null) {
            partidas = parseInt(localStorage.getItem("PG"));
            partidas++;
            localStorage.setItem("PG", partidas);
        }
        document.getElementById("dibujo").style.backgroundImage = "url('img/ahorcadoGG.PNG')";
        document.getElementById("btnProbar").disabled = true;
    }


    function anunciarPerdedor() {
        alert("--- ¡HAS PERDIDO! ---");

        divLetras = document.getElementById("letras");
        for (let i = 0; i < divLetras.children.length; i++) {
            divLetras.children[i].classList.add('gameOver');
        }

        document.getElementById("dibujo").style.backgroundImage = "url('img/ahorcadoIn.PNG')";
        document.getElementById("btnProbar").disabled = true;
        document.getElementById("letraElegida").disabled = true;
    }
}