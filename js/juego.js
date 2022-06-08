// obtenemos las palabras almacenadas para el comienzo del juego
const getLocalStorage = () => {
  palabras = JSON.parse(localStorage.getItem("words"));
};
getLocalStorage();
console.log(palabras);

let tablero = document.getElementById("horca").getContext("2d");
let letras = [];
let palabraCorrecta = "";
let errores = 9;

function dibujarBase() {
  tablero.beginPath();
  tablero.lineWidth = "5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(550, 355);
  tablero.lineTo(850, 355);
  tablero.stroke();
}
dibujarBase();

function dibujarPaloBase() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(700, 3);
  tablero.lineTo(700, 355);
  tablero.stroke();
}

function dibujarPaloTop() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(700, 5);
  tablero.lineTo(878, 5);
  tablero.stroke();
}

function dibujarPaloHead() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(878, 3);
  tablero.lineTo(878, 55);
  tablero.stroke();
}

function dibujarCabeza() {
  tablero.beginPath();
  tablero.arc(878, 85, 30, 0, 2 * 3.14);
  tablero.lineWidth = "4.5";
  tablero.moveTo(878, 3);
  tablero.stroke();
}

function dibujarCuerpo() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(878, 115);
  tablero.lineTo(878, 255);
  tablero.stroke();
}

function dibujarBrazoIzq() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(878, 115);
  tablero.lineTo(846, 175);
  tablero.stroke();
}

function dibujarBrazoDer() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(878, 115);
  tablero.lineTo(910, 175);
  tablero.stroke();
}

function dibujarPiernaIzq() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(878, 254);
  tablero.lineTo(846, 315);
  tablero.stroke();
}

function dibujarPiernaDer() {
  tablero.beginPath();
  tablero.lineWidth = "4.5";
  tablero.strokeStyle = "#0A3871";
  tablero.moveTo(878, 254);
  tablero.lineTo(910, 315);
  tablero.stroke();
}

function elegirPalabraSecreta() {
  var palabra = palabras[Math.floor(Math.random() * palabras.length)];

  palabraSecreta = palabra;

  // console.log(palabra);
  return palabraSecreta;
}

function dibujarLineas() {
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();

  //damos el ancho a la palabra dentro del canvas
  let ancho = 600 / palabraSecreta.length;

  for (let i = 0; i < palabraSecreta.length; i++) {
    tablero.moveTo(500 + ancho * i, 640);
    tablero.lineTo(550 + ancho * i, 640);
  }

  tablero.stroke();
  tablero.closePath();
}

dibujarLineas(elegirPalabraSecreta());

function elegirLetraCorrecta(index) {
  tablero.font = "bold 52px monospace";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#0A3871";

  let ancho = 600 / palabraSecreta.length;

  tablero.fillText(palabraSecreta[index], 505 + ancho * index, 620);
}

function escribirLetraIncorrecta(letra, errorsLeft) {
  tablero.font = "bold 40px monospace";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#0A3871";

  tablero.fillText(letra, 535 + 40 * (10 - errorsLeft), 710, 40);
}

function verificarLetraClicada(key) {
  if (!letras.length) {
    letras.push(key);

    return false;
  } else {
    const a = letras.includes(key);

    if (a)
      Swal.fire({
        icon: "info",
        title: "Cuidado...",
        text: "Letra repetida!",
      });

    letras.push(key);
    return a;
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase();
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) < 0) {
    errores -= 1;

    if (errores == 8) {
      dibujarPaloBase();
    }
    if (errores == 7) {
      dibujarPaloTop();
    }
    if (errores == 6) {
      dibujarPaloHead();
    }
    if (errores == 5) {
      dibujarCabeza();
    }
    if (errores == 4) {
      dibujarCuerpo();
    }
    if (errores == 3) {
      dibujarBrazoIzq();
    }
    if (errores == 2) {
      dibujarBrazoDer();
    }
    if (errores == 1) {
      dibujarPiernaIzq();
    }

    if (errores === 0) {
      dibujarPiernaDer();
      setTimeout(() => {}, 1800);
      Swal.fire({
        icon: "error",
        title: "Finalizado...",
        text: "Haz perdido la partida!",
      });
      setTimeout(() => {
        window.open("../juego.html", "_self");
      }, 2800);
    }
  }
}

//test ganar
function isWinner() {
  // const a = palabraCorrecta.split(""); //divido en un array palabra correcta para comparar la longitud con la palabra secreta
  let b = [...new Set(palabraSecreta)]; //elimino caracteres repetidos y lo transformo en un array para comparar la longitud con la palabra correcta

  return palabraCorrecta.length === b.length;
}

if (window.screen.width < 500) {
  console.log(window.screen.width);
  console.log("Movile");
} else {
  console.log(window.screen.width);
  console.log("Desktop");
}

document.onkeydown = (e) => {
  let letra = e.key.toUpperCase();

  if (/[^a-z]/.test(e.key)) {
    Swal.fire({
      icon: "info",
      title: "Cuidado...",
      text: "Solo debe ingresar letras!",
    });

    return false;
  }

  if (!verificarLetraClicada(e.key)) {
    if (palabraSecreta.includes(letra)) {
      console.log(letra);
      adicionarLetraCorrecta(palabraSecreta.indexOf(letra));
      for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
          elegirLetraCorrecta(i);
        }
      }

      if (isWinner()) {
        Swal.fire({
          icon: "success",
          title: "Felicidades!!",
          text: "Ganaste la partida!",
        });
        setTimeout(() => {
          window.open("../juego.html", "_self");
        }, 2800);
      }
    } else {
      adicionarLetraIncorrecta(letra);
      escribirLetraIncorrecta(letra, errores);
    }
  }
};
