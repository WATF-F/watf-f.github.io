import { main } from "./game_logic.js";

let container = document.querySelector(".container");
let content = document.querySelector(".content");
let elemcount = document.getElementById("elementcount");
let transitioncount = document.getElementById("transitioncount");
let notransit = document.getElementById("notransit");
let buttonstart = document.getElementById("start");
let hide = document.getElementById("hide");
let time = document.querySelector(".time");
let button = document.createElement("input");
button.type = "button";
button.value = "Запустить";
button.style.display = "none";
button.classList.add("go");
content.append(button);
button.addEventListener("click", () => {
  let disnon = document.querySelectorAll(".elem>p");
  for (let i = 0; i < disnon.length; i++) {
    disnon[i].style.display = "none";
  }
});
notransit.addEventListener("click", (e) => {
  if (notransit.checked) {
    transitioncount.disabled = true;
    transitioncount.value = "";
    button.style.display = "inline";
  } else {
    transitioncount.disabled = false;
    button.style.display = "none";
  }
});
buttonstart.addEventListener("click", (e) => {
  main(e, elemcount, transitioncount, notransit, container, hide, time);
});
