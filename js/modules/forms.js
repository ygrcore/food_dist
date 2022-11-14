import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
     // Forms

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  // на каждую форму подвязываем функцию postData, которая будет обработчиком события при отправке
  forms.forEach(item => {
    bindPostData(item);
  });

      // функция отвечающая за постинг данных
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();  // чтобы стр не перезагружалась при нажатии сабмит

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;  
        form.insertAdjacentElement('afterend', statusMessage); // как только отправляем запрос - появляется спиннер

        // const request = new XMLHttpRequest();  // для оправки HTTP-запроса, создается объект
        // request.open('POST', 'server.php'); // настроить запрос: метод, url(путь)

        // request.setRequestHeader('Content-type', 'application/json');

        // специальный объект formData позволяет сформировать данные с формы в формате ключ: значение
        const formData = new FormData(form);  // во внутрь помещаем ту форму, из которой нужно собрать данные

        // трансформация formData в JSON формат
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
                // .then(data => data.text()) // объект в обычный текст
        postData('http://localhost:3000/requests', json)  
        .then((data) => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });

        // request.send(json); //отправка данных на сервер, в скобках указываем тело, т.к. метод POST

        // request.addEventListener('load', () => {
        //   if (request.status === 200) {
        //     console.log(request.response);
        //     showThanksModal(message.success); // запрос обработался - 'Спасибо! Скоро мы с вами свяжемся'
        //     form.reset();
        //     statusMessage.remove();
        //   } else {
        //     showThanksModal(message.failure);
        //   }
        // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal(".modal", modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal(".modal");
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

}

export default forms;