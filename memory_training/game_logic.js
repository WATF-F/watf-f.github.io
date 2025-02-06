let TimeOut;
export function main(
  e,
  elemcount,
  transitioncount,
  notransit,
  container,
  hide,
  time
) {
  console.log(time);
  const count_false_item = document.getElementById("countfalse");
  count_false_item.textContent = "";
  if (TimeOut) {
    clearTimeout(TimeOut);
  }
  e.disabled = false;
  if (!elemcount.value) {
    alert("Заполните поле количества элементов");
    e.preventDefault();
    return;
  }
  if (!notransit.checked && !transitioncount.value) {
    check(e);
    e.preventDefault();
    return;
  }
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  // генерация элементов
  for (let i = 0; i < elemcount.value; i++) {
    let elem = document.createElement("div");
    let elem_child = document.createElement("p");
    elem_child.innerText = i + 1;
    elem.append(elem_child);
    elem.classList.add(`elem`);
    container.append(elem);
    e.preventDefault();
  }
  // перемешиваем элементы
  let elements = Array.from(container.children);
  elements.sort(() => Math.random() - 0.5);
  container.innerHTML = "";
  elements.forEach((element) => container.appendChild(element));
  // вешаем события на элементы
  let listik = [];
  let elem = document.querySelectorAll(".elem");
  elem.forEach((el) => {
    listik.push(el.firstChild.textContent);
  });
  if (notransit.checked) {
    different_game(hide, listik, elem, container, time);
    return;
  } else {
    // рабочая версия со временем
    TimeOut = setTimeout(() => {
      let disnon = document.querySelectorAll(".elem>p");
      for (let i = 0; i < disnon.length; i++) {
        disnon[i].style.display = "none";
      }
      console.log(time);
      game(hide, listik, elem, container, time);
    }, transitioncount.value * 1000);
  }
  e.disabled = true;
}
// слушает событие если нужно для проверки заполнения поля
function check(e) {
  alert("Заполните время за которое хотите запомнить");
  e.preventDefault();
  return;
}
function game(hide, list_item, elem, container, time) {
  let time_start = Date.now();
  let time_interval = setInterval(() => {
    time.textContent = Math.abs(Date.now() - time_start) / 1000;
  }, 100);
  const count_false_item = document.getElementById("countfalse");
  let count_false = 0;
  count_false_item.textContent = "";
  count_false_item.textContent = `Количество ошибок: ${count_false}`;
  list_item = list_item.sort((a, b) => a - b); //Сортируем массив первый и последний раз
  hide.textContent = list_item[0];
  elem.forEach((el) => {
    el.addEventListener("click", () => {
      if (hide.textContent == el.textContent) {
        list_item = list_item.filter((item) => item !== el.textContent); // провераем совпадает ли нажатый элемент с тем что мы ищем
        hide.textContent = list_item[0]; //присваиваем новое значение тому что ищем
        console.log(list_item);
        el.style.background = "green"; //Присваиваем полю зелёный цвет это означает что игрок угадал где находиться элемент
        el.style.border = "none";
      } else if (el.style.background == "green") {
      } else {
        count_false += 1;
        count_false_item.textContent = `Количество ошибок: ${count_false}`;
      }
      if (list_item == 0) {
        clearInterval(time_interval);
        let end_time = Date.now();
        let time_arg = `Секунд: ${Math.abs(time_start - end_time) / 1000}`;
        time.textContent = time_arg;
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      return list_item; //возвращаем новый список чтобы потом получить его на входе функции
    });
  });
}
function different_game(hide, listik, elem, container, time) {
  let go_element = document.querySelector(".go");
  go_element.addEventListener("click", () => {
    let disnon = document.querySelectorAll(".elem>p");
    for (let i = 0; i < disnon.length; i++) {
      disnon[i].style.display = "none";
    }
    game(hide, listik, elem, container, time);
  });
}
