let draggedElement = null;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;

const bucket = document.querySelector(".bucket");
const bucketItems = []; // Массив для хранения элементов в корзине

const button = document.createElement("button");
button.classList.add("button");
button.textContent = "Оплатить корзину";
button.style.display = "none";
document.body.appendChild(button);
button.addEventListener("click", () => {
  window.location.href = "https://lavka.yandex.ru/";
});

// Начало перетаскивания
document.querySelectorAll(".product").forEach((item) => {
  item.addEventListener("touchstart", (e) => {
    e.preventDefault(); // предотвращаем стандартное поведение

    draggedElement = item;
    startX = e.touches[0].clientX; // Используем e.touches[0].clientX для мобильных устройств
    startY = e.touches[0].clientY;

    const transform = window.getComputedStyle(item).transform;
    if (transform !== "none") {
      const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
      offsetX = parseFloat(matrix[4]);
      offsetY = parseFloat(matrix[5]);
    } else {
      offsetX = 0;
      offsetY = 0;
    }

    item.style.cursor = "grabbing";
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  });
});

function onTouchMove(e) {
  e.preventDefault(); // Чтобы избежать прокрутки страницы при перетаскивании

  if (!draggedElement) return;

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  draggedElement.style.transform = `translate(${offsetX + deltaX}px, ${
    offsetY + deltaY
  }px)`;
}

function onTouchEnd() {
  if (draggedElement) {
    // Проверка попадания в корзину
    const bucketRect = bucket.getBoundingClientRect();
    const elementRect = draggedElement.getBoundingClientRect();

    const intersectionX = Math.max(
      0,
      Math.min(bucketRect.right, elementRect.right) -
        Math.max(bucketRect.left, elementRect.left)
    );
    const intersectionY = Math.max(
      0,
      Math.min(bucketRect.bottom, elementRect.bottom) -
        Math.max(bucketRect.top, elementRect.top)
    );
    const intersectionArea = intersectionX * intersectionY;
    const elementArea = elementRect.width * elementRect.height;

    // Если элемент более чем на 80% пересекается с корзиной, добавляем в корзину
    if (intersectionArea / elementArea >= 0.8) {
      if (!bucketItems.includes(draggedElement)) {
        bucketItems.push(draggedElement);
      }
    } else {
      const index = bucketItems.indexOf(draggedElement);
      if (index !== -1) {
        bucketItems.splice(index, 1);
      }
    }

    // Показать кнопку, если 3 элемента в корзине
    if (bucketItems.length >= 3) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }

    // Завершаем перетаскивание
    draggedElement.style.cursor = "grab";
    draggedElement.style.transform = "none"; // Сбросим трансформацию после завершения перетаскивания
    draggedElement = null;

    // Удаляем обработчики событий
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }
}
document.querySelectorAll(".product").forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    draggedElement = item;
    startX = e.clientX;
    startY = e.clientY;

    const transform = window.getComputedStyle(item).transform;
    if (transform !== "none") {
      const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
      offsetX = parseFloat(matrix[4]);
      offsetY = parseFloat(matrix[5]);
    } else {
      offsetX = 0;
      offsetY = 0;
    }

    item.style.cursor = "grabbing";
    document.addEventListener("mousemove", onMouseMove);
  });
});

document.addEventListener("mouseup", (e) => {
  if (draggedElement) {
    const bucketRect = bucket.getBoundingClientRect();
    const elementRect = draggedElement.getBoundingClientRect();

    const intersectionX = Math.max(
      0,
      Math.min(bucketRect.right, elementRect.right) -
        Math.max(bucketRect.left, elementRect.left)
    );
    const intersectionY = Math.max(
      0,
      Math.min(bucketRect.bottom, elementRect.bottom) -
        Math.max(bucketRect.top, elementRect.top)
    );
    const intersectionArea = intersectionX * intersectionY;
    const elementArea = elementRect.width * elementRect.height;

    if (intersectionArea / elementArea >= 0.8) {
      if (!bucketItems.includes(draggedElement)) {
        bucketItems.push(draggedElement);
      }
    } else {
      const index = bucketItems.indexOf(draggedElement);
      if (index !== -1) {
        bucketItems.splice(index, 1);
      }
    }

    if (bucketItems.length >= 3) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
    draggedElement.style.cursor = "grab";
    draggedElement = null;
  }
  document.removeEventListener("mousemove", onMouseMove);
});
function onMouseMove(e) {
  if (draggedElement) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const newX = offsetX + dx;
    const newY = offsetY + dy;
    draggedElement.style.transform = `translate(${newX}px, ${newY}px)`;
  }
}
