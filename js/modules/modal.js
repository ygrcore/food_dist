// функция делает модальное окно видимым, путем добаления и удаления определенных классов
// также уберает таймер на открытие модального окна, если оно уже было открыто ранее, до конца таймера.
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    
  // Modal

const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);

// для каждой кнопки с дата атрибутами устанавливаем обработчик событий на клик,
// вызывает функцию открытия модального окна
modalTrigger.forEach((btn) => {
  btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
});

// обработчик события на клик за пределами модального окна, для закрытия модального окна
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute('data-close') == '') {
    closeModal(modalSelector);
  }
});

// обработчик события на документ, отслеживает нажатие клавиши Esc, и если модальное окно открыто,
// закрывает модальное окно после нажатия клавиши Esc
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal(modalSelector);
  }
});

// функция открывает модальное окно при прокрутке страницы в самый низ экрана
// и удаляет слушатель событий, чтобы не повторялось постоянно
function showModalByScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal(modalSelector, modalTimerId);
    window.removeEventListener("scroll", showModalByScroll);
  }
}

// слушатель события на прокрутку окна, вызывает функцию,
// которая открывает модальное окно при скролле в конец страницы
window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};