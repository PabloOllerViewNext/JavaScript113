//Este código está hecho por Pablo Oller Pérez
/*En este codigo vamos a implementar la función extra 
de local storage para almacenar las partidas ganadas*/
if (typeof (Storage) !== "undefined") {
    //Aquí inicializo a 0 las partidas ganadas
    if(localStorage.getItem("partidasGanadas")==null){
        localStorage.setItem("partidasGanadas",0);
    }
    //Aquí definimos las letiables que vamos a necesitar
    /*Array de palabras*/
    let words = ["lapiz", "casa", "perro", "guitarra", "mancuerna", "juego", "pescado", "leche", "vino", "manzana", "celular", "teclado", "tomate", "tren", "taza", "diente", "techo", "gato", "pajaro", "nariz", "ventana", "ojo", "pez", "jabon", "botella", "puerta", "amigo", "hueso", "arbol", "libro", "planta", "huevo", "golpe", "pintura", "agua", "pollo", "mar", "goma", "maquina", "estrella", "piedra", "piso", "banco", "papel", "pan", "aceite", "cerveza", "ciudad", "alumno", "cable", "cuadro", "arena", "cine", "alas", "pasta", "cuerpo", "sol", "reloj", "clavo", "pastel", "chocolate", "cama", "luz", "montaña", "cielo", "arroz", "barco", "bus", "hierro", "bicicleta", "nube", "estudio", "dibujo", "patata", "telefono", "carro", "carne", "carta", "caja", "campana", "corazon", "foto", "trabajo", "pescador", "computadora", "cuchillo", "pelo", "sal", "silla", "risa", "verde", "plato", "cartel", "hermana", "prueba", "maiz", "crema", "sabor", "fuente", "sorpresa"];
    /*Contador de intentos*/
    let cont = 0;
    /*la palabra que vamos a usar en el ahorcado*/
    let palabra = "";
    /*Número de aciertos por partida*/
    let contAciertos = 0;
    /*letiable para comparar los aciertos que
    llevamos con el numero de letras de la palabra*/
    let puntuacion = 0;

    //Aquí pasamos las letras a mayúscula de todas las palabras
    pasarLetrasMayusculas();
    function pasarLetrasMayusculas() {
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].toUpperCase();
        }
    }
    //Aquí generamos la palabra aleatoria
    function RandomWord() {

        palabraAletoria = words[Math.floor(Math.random(100) * 100)];
        palabra = palabraAletoria;
        cont = Math.ceil(palabraAletoria.length * 1.5);
        esconderPalabra(palabraAletoria);
    }
    /*en esta función se esconde la palabra al usuario y se
    inicializan las funciones generadoras*/
    function esconderPalabra(palabraAletoria) {
        palabraEsc = document.getElementById("palabra");
        for (let i = 0; i < palabraAletoria.length; i++) {
            let div = document.createElement("div");
            div.className = "LetraEscondida";
            div.innerHTML = palabraAletoria[i];
            palabraEsc.appendChild(div);
        }
        palabraEsc.className = "escondido"
        generarIntentos();
        generarPuntos();
        generarPartidas();
    }
    //muestra los intentos actuales que tiene el usuario
    function generarIntentos() {
        document.querySelector("#contador").innerText = cont;
    }
    //muestra los puntos actuales que lleva el usuario
    function generarPuntos() {
        document.querySelector("#puntos").innerText = puntuacion;
    }//muestra las partidas ganadas por el usuario
    function generarPartidas() {
        document.querySelector("#PG").innerText = localStorage.getItem("partidasGanadas");
    }

    function generarBotones() {
        botonesAbecedario = document.getElementById("botonesAbecedario");
        //Genera el bucle con el alfabeto en mayúsuclas del codigo ASCII
        for (let letra = 65; letra <= 90; letra++) {
            // Crea cada botón
            let boton = document.createElement("button");
            // Asigna la letra como texto del botón y se le da estilo con Bootstrap
            boton.innerText = String.fromCharCode(letra); boton.className = "btn btn-secondary botonLetra";

            // Se agrega el botón al contenedor
            botonesAbecedario.appendChild(boton);
        }
    }

    /*Aquí le asigno la función a los botones de las letras
    la función de comprobar si está en la palabra*/
    function aniadirFunciones() {
        arrBotonesLetras = document.getElementsByTagName("button");
        for (let i = 0; i < arrBotonesLetras.length; i++) {
            arrBotonesLetras[i].addEventListener("click", comprobarResultado);
        }
    }
    /*En esta función compruebo si la letra elegida 
    está en el array, sino  se le resta un intento o se le suma un punto */
    function comprobarResultado() {
        letra = this.innerHTML;
        let encontrado = false;
        palabraOculta = document.getElementsByClassName("LetraEscondida");
        for (let i = 0; i < palabra.length; i++) {
            if (letra == palabra[i]) {
                contAciertos++;
                palabraOculta[i].style.color = "black";
                this.className = "btn btn-success botonLetra acertada";
                encontrado = true;
            }
        }
        if (encontrado) {
            puntuacion++;
            aciertaTodas();
        }
        if (encontrado == false) {
            cont--;
            if (puntuacion > 0) {
                puntuacion--;
            }

            generarIntentos();
            if (cont == 0) {
                //Esta es la parte en la que pierde el usuario
                //cuando pierde le recarga la página
                alert("No te quedan intentos!!");
                location.reload();
            }
            this.className = "btn btn-danger botonLetra fallada";
        }

        generarPuntos();
        this.disabled = true;
    }
//Cuando gana inicia esta función donde se felicita al usuario
//también almacena la partida y deshabilita los botones
    function aciertaTodas() {

        if (cont >= 0 && contAciertos == palabra.length) {
            alert("HAS GANADO CON LA INCREIBLE PUNTUACIÓN DE " + puntuacion + " PUNTOS !!");
            botonesLetras = document.getElementsByClassName("btn btn-secondary botonLetra");
            let partidas = parseInt(localStorage.getItem("partidasGanadas"));
            partidas++;
            localStorage.setItem("partidasGanadas", partidas);
            document.getElementById("PG").innerText = localStorage.getItem("partidasGanadas");
            for (let i = 0; i < botonesLetras.length; i++) {
                botonesLetras[i].disabled = true;
            }
        }
    }
    
} else {
    //Esto es en caso de que el ordenador no soporte el almacén web
    alert("Su navegador no soporta WebStorage");
}