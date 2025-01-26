let draggedElement = null;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;
const initialPositions = new Map(); // Сохраняем начальные координаты каждого элемента

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
  // Инициализация начальных координат для каждого элемента
  if (!initialPositions.has(item)) {
    initialPositions.set(item, { left: 0, top: 0 });
  }

  item.addEventListener("touchstart", (e) => {
    e.preventDefault();

    draggedElement = item;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

    const position = initialPositions.get(item);
    offsetX = position.left;
    offsetY = position.top;

    item.style.cursor = "grabbing";
    item.style.transition = "none";

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  });
});

function onTouchMove(e) {
  e.preventDefault();

  if (!draggedElement) return;

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  // Изменяем позицию элемента относительно стартовой точки
  const newLeft = offsetX + deltaX;
  const newTop = offsetY + deltaY;

  draggedElement.style.transform = `translate(${newLeft}px, ${newTop}px)`;
}

function onTouchEnd() {
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

    // Сохраняем финальные координаты элемента
    const transform = window.getComputedStyle(draggedElement).transform;
    if (transform !== "none") {
      const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
      const newLeft = parseFloat(matrix[4]);
      const newTop = parseFloat(matrix[5]);

      initialPositions.set(draggedElement, { left: newLeft, top: newTop });
    }

    // Завершаем перетаскивание
    draggedElement.style.cursor = "grab";
    draggedElement.style.transition = "transform 0.2s ease";
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
