var counrties = [
  "Исландия",
  "Норвегия",
  "Швеция",
  "Финляндия",
  "Россия",
  "Беларусь",
  "Украина",
  "Эстония",
  "Латвия",
  "Литва",
  "Польша",
  "Молдовия",
  "Румыния",
  "Болгария",
  "Греция",
  "Северная Македония",
  "Албания",
  "Черногория",
  "Косово",
  "Сербия",
  "Босния и герцеговина",
  "Хорватия",
  "Словакия",
  "Словения",
  "Венгрия",
  "Чехия",
  "Австрия",
  "Германия",
  "Франция",
  "Италия",
  "Швейцария",
  "Бельгия",
  "Нидерланды",
  "Люксембург",
  "Франция",
  "Испания",
  "Португалия",
  "Ирландия",
  "Великобритания",
  "Андорра",
  "Кипр",
  "Мальта",
  "Сан-марино",
  "Ватикан",
  "Лихтенштейн",
  "Монако",
];
let countryies_copy = JSON.parse(JSON.stringify(counrties));
let score = document.getElementById("score");
let list = document.getElementById("list");
let input = document.getElementById("input");
input.oninput = function () {
  if (input.value == " ") {
    input.value = "";
  }
  counrties.map((example) => {
    if (input.value.toLowerCase() == example.toLowerCase()) {
      list.textContent += example + "\n";
      counrties = counrties.filter(
        (country) => country !== counrties[counrties.indexOf(example)]
      );
      console.log(counrties);
      score.textContent = 46 - counrties.length + "/46";
      input.value = "";
      if (46 - counrties.length == 46) {
        input.disabled = true;
        input.value = "";
        setTimeout(() => {
          alert("You win");
        }, 500);
        counrties = countryies_copy;
        score.textContent = 46 - counrties.length + "/46";
        list.textContent = "";
        input.disabled = false;
      }
    }
  });
};
