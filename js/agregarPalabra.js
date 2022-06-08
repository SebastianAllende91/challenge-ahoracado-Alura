const fieldText = document.querySelector(".new-word");
const buttton = document.getElementById("add-word");

//obtenemos las palabras almacenadas para el comienzo del juego
const getLocalStorage = () => {
  palabras = JSON.parse(localStorage.getItem("words"));
};
getLocalStorage();

console.log(palabras);

// Agregamos la palabra ingresada por el usuario al array predeterminado
function addWords() {
  const word = fieldText.value.toUpperCase().trim();
  let WordValid = validateWord(word);
  if (WordValid) {
    palabras.push(word);
    setLocalStorage();
    fieldText.value = "";
    console.log({ palabras, word });
  }
}

buttton.onclick = () => {
  addWords();
};

// Validamos que se pueda agreagr la palabra
function validateWord(word) {
  if (word.length === 0) {
    setTimeout(() => {}, 1800);
    Swal.fire({
      icon: "info",
      title: "Proceso Fallido...",
      text: "No has ingresado ninguna palabra!",
    });
    fieldText.focus();
    return false;
  }

  if (/^[a-zA-Z ]*$/.test(word) === false) {
    setTimeout(() => {}, 1800);
    Swal.fire({
      icon: "info",
      title: "Proceso Fallido...",
      text: "No se permiten numeros ni caracteres especiales!",
    });
    fieldText.value = "";
    fieldText.focus();
    return false;
  }

  if (palabras.includes(word)) {
    setTimeout(() => {}, 1800);
    Swal.fire({
      icon: "info",
      title: "Proceso Fallido...",
      text: "La palabra ya se encuentra agregada!",
    });
    fieldText.value = "";
    fieldText.focus();
    return false;
  }

  if (word.length >= 3 && word.length <= 9) {
    setTimeout(() => {
      window.open("../juego.html", "_self");
    }, 2800);
    Swal.fire({
      icon: "success",
      title: "Proceso Exitoso...",
      text: "Palabra agregada correctamente!",
    });
    return true;
  }

  if (word.length < 3) {
    setTimeout(() => {}, 1800);
    Swal.fire({
      icon: "error",
      title: "Proceso Faliido...",
      text: "Cantidad de Letras Invalidas!",
    });
    fieldText.value = "";
    fieldText.focus();
    return false;
  }
}
