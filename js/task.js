/*Разбей задание на несколько подзадач:

Создание и рендер разметки по массиву данных и предоставленному шаблону.
Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
Открытие модального окна по клику на элементе галереи.
Подмена значения атрибута src элемента img.lightbox__image.
Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, 
чтобы при следующем открытии модального окна, пока грузится изображение, 
мы не видели предыдущее.
Дополнительно
Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой 
по работе с событиями.

Закрытие модального окна по клику на div.lightbox__overlay.
Закрытие модального окна по нажатию клавиши ESC.
Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

Разметка элемента галереи
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>*/
import gallery from "./gallery-items.js";
const refs = {
  list: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  bigImg: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay"),
};

function markup(imgs) {
  return imgs
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${index}"
    />
  </a>
</li>`;
    })
    .join("");
}

refs.list.insertAdjacentHTML("afterbegin", markup(gallery));
refs.list.addEventListener("click", openModal);
refs.closeBtn.addEventListener("click", closeModal);
refs.overlay.addEventListener("click", closeModal);
window.addEventListener("keydown", EscPress);

function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.modal.classList.add("is-open");
  refs.bigImg.src = event.target.dataset.source;
  refs.bigImg.alt = event.target.alt;
  // window.addEventListener("keydown", EscPress);
}

function closeModal(event) {
  refs.modal.classList.remove("is-open");
  refs.bigImg.src = "";
  refs.bigImg.alt = "";
  // window.removeEventListener("keydown", EscPress);
}
function EscPress(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}
