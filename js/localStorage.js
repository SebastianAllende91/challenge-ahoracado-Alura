var palabras = [
  "HTML",
  "JAVASCRIPT",
  "JAVA",
  "CAFE",
  "MOUSE",
  "TECLADO",
  "MONITOR",
  "PELOTA",
  "ARGENTINA",
];

const setLocalStorage = () => {
  localStorage.setItem("words", JSON.stringify(palabras));
};

//console.log(localStorage.getItem("words"));

if (localStorage.length > 0) {
  localStorage.getItem("words");
  console.log(localStorage.getItem("words"));
} else {
  setLocalStorage();
}
