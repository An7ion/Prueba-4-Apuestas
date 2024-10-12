// al cargar la pagina, mostramos las reglas
window.addEventListener('load', function() {
    alert(`¡Bienvenido al juego de cartas!\n\nReglas del juego:\n- Ambos jugadores deben ingresar su nombre y apostar mínimo 500 puntos.\n- Se generará una carta aleatoria del 1 al 13 para cada jugador.\n- El jugador con la carta más alta gana y se lleva la apuesta del otro.\n\nGanancia inicial: 1500 puntos.`);
    mostrarGanancia();
});


// Con estas dos variables son con las que ambos jugadores empezaran sus apuestass
let gananciaJugador1 = 1500;
let gananciaJugador2 = 1500;

// creamos la funcion para generar los numeros aleatorios para las cartas
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 13) + 1;
}

// funcion para mostrar a medida de la partida, las ganancias de los jugadores
function mostrarGanancia() {
    const ganancia1 = document.getElementById('gananciaJugador1');
    const ganancia2 = document.getElementById('gananciaJugador2');

    // mediante las id, actualizamos el contenido obtenido del a funcion
    ganancia1.textContent = `Ganancia actual: ${gananciaJugador1}`;
    ganancia2.textContent = `Ganancia actual: ${gananciaJugador2}`;
}


// darle al boton apostar
document.getElementById('btnJugar').addEventListener('click', function() {
    const nombre1 = document.getElementById('nombrejugador1').value;
    const apuesta1 = parseInt(document.getElementById('apuesta1').value);
    const nombre2 = document.getElementById('nombrejugador2').value;
    const apuesta2 = parseInt(document.getElementById('apuesta2').value);

    // valida que todos los campos eseten rellenos
    if (nombre1 && !isNaN(apuesta1) && apuesta1 >= 500 &&
        nombre2 && !isNaN(apuesta2) && apuesta2 >= 500) {
        
        // los jugadores no pueden apostar mas de lo que tienen
        if (apuesta1 > gananciaJugador1 || apuesta2 > gananciaJugador2) {
            alert('No puedes apostar más de lo que tienes en ganancias.');
            return;
        }
        
        // generamos los numeros para las cartas
        const numcarta1 = generarNumeroAleatorio();
        const numcarta2 = generarNumeroAleatorio();

        // Mostrar las cartas de ambos jugadores en sus respectivos contenedores
        const imgcarta1 = document.createElement('img');
        imgcarta1.src = `cartas/${numcarta1}.png`;
        imgcarta1.classList.add('carta-img');

        const imgcarta2 = document.createElement('img');
        imgcarta2.src = `cartas/${numcarta2}.png`;
        imgcarta2.classList.add('carta-img');

        const divCartaJugador1 = document.getElementById('cartaJugador1');
        const divCartaJugador2 = document.getElementById('cartaJugador2');

        divCartaJugador1.innerHTML = '';
        divCartaJugador1.appendChild(imgcarta1);

        divCartaJugador2.innerHTML = '';
        divCartaJugador2.appendChild(imgcarta2);

        // creamos al ganador y lo mostramos
        const resultado = document.getElementById('resultado');

        if (numcarta1 > numcarta2) {
            resultado.textContent = `¡${nombre1} es el ganador con la carta número ${numcarta1}!`;
        } else if (numcarta2 > numcarta1) {
            resultado.textContent = `¡${nombre2} es el ganador con la carta número ${numcarta2}!`;
        } else {
            resultado.textContent = `Ambos jugadores tienen la misma carta`;
        }

        // Actualizar la ganancia del jugador 1
        if (numcarta1 > numcarta2) {
            gananciaJugador1 += apuesta1; // suma
        } else if (numcarta2 > numcarta1) {
            gananciaJugador1 -= apuesta1; // resta
        }

        // Actualizar la ganancia del jugador 2
        if (numcarta2 > numcarta1) {
            gananciaJugador2 += apuesta2; // suma
        } else if (numcarta1 > numcarta2) {
            gananciaJugador2 -= apuesta2; // resta
        }

        // llamamos a la funcion para mostrar el resultado
        mostrarGanancia();

        // Limpiamos la apuesta después de mostrar resultados
        document.getElementById('apuesta1').value = '';
        document.getElementById('apuesta2').value = '';

        // mostrar el botón "Nueva Apuesta"
        document.getElementById('btnNuevaApuesta').style.display = 'block';
    } else {
        alert('Por favor completa el nombre y asegúrate que la apuesta sea mayor o igual a 500 para ambos jugadores.');
    }
});

// "Nueva Apuesta"
document.getElementById('btnNuevaApuesta').addEventListener('click', function() {
    
    // restaura todo a su valor inicial
    gananciaJugador1 = 1500;
    gananciaJugador2 = 1500;

    mostrarGanancia();

    document.getElementById('resultado').textContent = '';
    document.getElementById('cartaJugador1').innerHTML = '';
    document.getElementById('cartaJugador2').innerHTML = '';
    document.getElementById('nombrejugador1').value = '';
    document.getElementById('apuesta1').value = '';
    document.getElementById('nombrejugador2').value = '';
    document.getElementById('apuesta2').value = '';

    // Ocultar el botón "Nueva Apuesta"
    document.getElementById('btnNuevaApuesta').style.display = 'none';
});
