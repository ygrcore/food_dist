import {getResource} from '../services/services';

function cards() {
     // Используем classes для карточек

  class CardMenu {
    constructor(image, alt, title, text, price, ...classes) {
      this.image = image;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
      this.classes = classes;
      this.transfer = 27;
      this.convertToUAH();  // сразу применяем конвертацию price
    }
    convertToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const div = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        div.classList.add(this.classes);
      } else {
        this.classes.forEach(className => div.classList.add(className));
      }
      div.innerHTML = `
            <img src=${this.image} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
      const container = document.querySelector(".menu__field .container");
      container.append(div);
    }
  }

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new CardMenu(img, altimg, title, descr, price).render();
      });
    });

  // new CardMenu(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Фитнес"',
  //   `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.
  //    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  //   9,
  //   'menu__item'
  // ).render();

  // new CardMenu(
  //   "img/tabs/elite.jpg",
  //   "elite",
  //   'Меню “Премиум”',
  //   `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
  //   но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
  //   20,
  //   'menu__item'
  // ).render();

  // new CardMenu(
  //   "img/tabs/post.jpg",
  //   "post",
  //   'Меню "Постное"',
  //   `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, 
  //   молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских 
  //   стейков.`,
  //   16,
  //   'menu__item'
  // ).render();

}

export default cards;