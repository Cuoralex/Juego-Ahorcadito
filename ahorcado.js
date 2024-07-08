const palabras = ["python", "javascript", "hangman", "programming", "developer", "algorithm", "function", "variable", "constant"];

let palabra = "";
let oculto = "";
let intentos = 0;
let letrasAdivinadas = new Set();
let nombreJugador = "";
let correoJugador = "";
let monedas = 0;

function iniciarJuego() {
    nombreJugador = document.getElementById("nombre").value;
    correoJugador = document.getElementById("correo").value;
    if (!nombreJugador || !correoJugador) {
        alert("Por favor, ingresa tu nombre y correo.");
        return;
    }
    document.getElementById("nombre-jugador").innerText = " Hola "+`Nombre: ${nombreJugador}`+", empecemos a jugar";
    document.getElementById("monedas").innerText = `Monedas: ${monedas}`;
    reiniciarJuego();
}

function reiniciarJuego() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    oculto = "_".repeat(palabra.length);
    intentos = 6;
    letrasAdivinadas.clear();
    document.getElementById("letras-ocultas").innerText = oculto.split("").join(" ");
    document.getElementById("intentos-restantes").innerText = `Intentos: ${intentos}`;
    document.querySelectorAll(".parte-muneco").forEach(parte => parte.style.display = "none");
    document.getElementById("hangman").style.display = "block"; // Mostrar la horca al inicio
    guardarSesion();
}

function verificarLetra() {
    const letra = document.getElementById("letra").value.toLowerCase();
    if (letrasAdivinadas.has(letra) || !letra) {
        alert("Ya has adivinado esa letra o no has ingresado ninguna.");
        return;
    }
    letrasAdivinadas.add(letra);
    if (palabra.includes(letra)) {
        let nuevoOculto = "";
        for (let i = 0; i < palabra.length; i++) {
            nuevoOculto += palabra[i] === letra ? letra : oculto[i];
        }
        oculto = nuevoOculto;
        document.getElementById("letras-ocultas").innerText = oculto.split("").join(" ");
        if (!oculto.includes("_")) {
            monedas += 5;
            alert(`¡Felicidades! Has adivinado la palabra '${palabra}'.`);
            reiniciarJuego();
        }
    } else {
        intentos--;
        document.getElementById("intentos-restantes").innerText = `Intentos: ${intentos}`;
        dibujarParteMuneco();
        if (intentos === 0) {
            alert(`Has perdido. La palabra era '${palabra}'.`);
            reiniciarJuego();
        }
    }
    guardarSesion();
}

function dibujarParteMuneco() {
    const partes = ["cabeza", "cuerpo", "brazo-izq", "brazo-der", "pierna-izq", "pierna-der"];
    const erroresPermitidos = 6;
    const partesAMostrar = erroresPermitidos - intentos - 1; // Mostrar la parte correspondiente al número de intentos restantes
    if (partesAMostrar >= 0 && partesAMostrar < partes.length) {
        document.getElementById(partes[partesAMostrar]).style.display = "block";
    }
}

function guardarSesion() {
    const sesion = {
        nombreJugador,
        correoJugador,
        monedas,
        palabra,
        oculto,
        intentos,
        letrasAdivinadas: Array.from(letrasAdivinadas)
    };
    localStorage.setItem("ahorcado_sesion", JSON.stringify(sesion));
}

function cargarSesion() {
    const sesion = JSON.parse(localStorage.getItem("ahorcado_sesion"));
    if (sesion) {
        nombreJugador = sesion.nombreJugador;
        correoJugador = sesion.correoJugador;
        monedas = sesion.monedas;
        palabra = sesion.palabra;
        oculto = sesion.oculto;
        intentos = sesion.intentos;
        letrasAdivinadas = new Set(sesion.letrasAdivinadas);
        document.getElementById("nombre-jugador").innerText = `Nombre: ${nombreJugador}`;
        document.getElementById("correo-jugador").innerText = `Correo: ${correoJugador}`;
        document.getElementById("monedas").innerText = `Monedas: ${monedas}`;
        document.getElementById("letras-ocultas").innerText = oculto.split("").join(" ");
        document.getElementById("intentos-restantes").innerText = `Intentos: ${intentos}`;
        document.querySelectorAll(".parte-muneco").forEach(parte => parte.style.display = "none");
        document.getElementById("hangman").style.display = "block"; // Mostrar la horca al cargar la sesión
        const partesAMostrar = palabra.length + 3 - intentos;
        for (let i = 0; i < partesAMostrar && i < partes.length; i++) {
            document.getElementById(partes[i]).style.display = "block";
        }
    }
}

window.onload = cargarSesion;
