import { again } from "./again.js";
import { counrties } from "./list-countries.js";
window.addEventListener("DOMContentLoaded", () => {
  score.textContent =
    countryies_copy.length - counrties.length + "/" + countryies_copy.length;
});
let score = document.getElementById("score");
let countryies_copy = [...counrties];
let list = document.getElementById("list");
let input = document.getElementById("input");
input.oninput = function () {
  if (input.value == " ") {
    input.value = "";
  }
  countryies_copy.map((example) => {
    if (input.value.toLowerCase() == example.toLowerCase()) {
      list.textContent += example + "\n";
      countryies_copy = countryies_copy.filter(
        (country) =>
          country !== countryies_copy[countryies_copy.indexOf(example)]
      );
      score.textContent =
        counrties.length - countryies_copy.length + "/" + counrties.length;
      input.value = "";
      let response = again(countryies_copy, counrties);
      if (response.result) {
        input.disabled = true;
        input.value = response.value;
        list.textContent = response.list;
        countryies_copy = response.copy;
        score.textContent = response.score;
        input.disabled = false;
      }
    }
  });
};
