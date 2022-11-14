function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
         // Slider

    const slides = document.querySelectorAll(slide),
            slider = document.querySelector(container),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            total = document.querySelector(totalCounter),
            current = document.querySelector(currentCounter),
            slidesWrapper = document.querySelector(wrapper),
            slidesField = document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width; // узнаем ширину дива
        
   let slideIndex = 1; // ориентир нумерации слайдов
   let offset = 0; // отступ - ориентир для смещения слайдов
   
   slidesField.style.width = 100 * slides.length + '%'; // устанавливаем диву ширину всех элементов

   slides.forEach(slide => {
     slide.style.width = width;
   });  // устанавливаем для каждого слайда ширину равное ширине дива в котором они находятся

   slider.style.position = 'relative';
   const indicators = document.createElement('ol'),
         dots = [];

   indicators.classList.add('carousel-indicators');
   indicators.style.cssText = `
     position: absolute;
     right: 0;
     bottom: 0;
     left: 0;
     z-index: 15;
     display: flex;
     justify-content: center;
     margin-right: 15%;
     margin-left: 15%;
     list-style: none;
   `;
   slider.append(indicators);

   for (let i = 0; i < slides.length; i++) {
     const dot = document.createElement('li');
     dot.setAttribute('data-slide-to', i + 1);
     dot.style.cssText = `
       box-sizing: content-box;
       flex: 0 1 auto;
       width: 30px;
       height: 6px;
       margin-right: 3px;
       margin-left: 3px;
       cursor: pointer;
       background-color: #fff;
       background-clip: padding-box;
       border-top: 10px solid transparent;
       border-bottom: 10px solid transparent;
       opacity: .5;
       transition: opacity .6s ease;
     `;
     
     if (i == 0) {
       dot.style.opacity = 1;
     } // для первой точки ставим непрозрачноть 1 
     indicators.append(dot);
     dots.push(dot);

   }

   slidesField.style.display = 'flex';  // слайды в одну полосу
   slidesField.style.transition = '0.5s all';  // добавляем плавности в анимацию
   slidesWrapper.style.overflow = 'hidden'; // ограничить показ элементов внутри дива

   if (slides.length < 10) {
     total.textContent = `0${slides.length}`;
     current.textContent = `0${slideIndex}`;  // при загрузки стр счетчик слайдов будет стоять с 1го
   } else {
     total.textContent = slides.length;
     current.textContent = slideIndex;        // при загрузки стр счетчик слайдов будет стоять с 1го
   }

   next.addEventListener('click', () => {
     if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
       offset = 0;
     } else {
       offset += +width.slice(0, width.length - 2);
     }

     slidesField.style.transform = `translateX(-${offset}px)`;

     if (slideIndex == slides.length) {
       slideIndex = 1;
     } else {
       slideIndex++;
     }

     if (slideIndex < 10) {
       current.textContent = `0${slideIndex}`;
     } else {
       current.textContent = slideIndex;
     }

     dots.forEach(dot => dot.style.opacity = '.5');
     dots[slideIndex - 1].style.opacity = '1';

   });

   prev.addEventListener('click', () => {
     if (offset == 0) {
       offset = +width.slice(0, width.length - 2) * (slides.length - 1);
     } else {
       offset -= +width.slice(0, width.length - 2);
     }

     slidesField.style.transform = `translateX(-${offset}px)`;

     if (slideIndex == 1) {
       slideIndex = slides.length;
     } else {
       slideIndex--;
     }

     if (slideIndex < 10) {
       current.textContent = `0${slideIndex}`;
     } else {
       current.textContent = slideIndex;
     }

     dots.forEach(dot => dot.style.opacity = '.5');
     dots[slideIndex - 1].style.opacity = '1';

   });

             // для каждой точки устанавливаем обработчик события
   dots.forEach(dot =>{
     dot.addEventListener('click', (e) => {
       const slideTo = e.target.getAttribute('data-slide-to'); // получаем значение атрибута для точки при нажатии

       slideIndex = slideTo;
       offset = +width.slice(0, width.length - 2) * (slideTo - 1); // устанавливаем сдвиг на ширину элемента
       slidesField.style.transform = `translateX(-${offset}px)`;  // применяем сдвиг

       if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
       } else {
         current.textContent = slideIndex;
       }             //  изменяем значения в счетчике

       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = '1';    // добавляем непрозрачность нажатой точке
     });
   });


   // showSlides(slideIndex);

   // if (slides.length < 10){
   //   total.textContent = `0${slides.length}`;
   // } else {
   //   total.textContent = slides.length;
   // }

   // function showSlides(n) {
   //     if (n > slides.length) {
   //       slideIndex = 1;
   //     }
   //     if (n < 1) {
   //       slideIndex = slides.length;
   //     }

   //     slides.forEach((item) => item.style.display = 'none');

   //     slides[slideIndex - 1].style.display = 'block'; 

   //     if (slideIndex < 10){
   //       current.textContent = `0${slideIndex}`;
   //     } else {
   //       current.textContent = slideIndex;
   //     }
   // }

   // function plusSlides(n) {
   //     showSlides(slideIndex += n);
   // }

   // prev.addEventListener('click', function(){
   //     plusSlides(-1);
   // });

   // next.addEventListener('click', function(){
   //     plusSlides(1);
   // });
}

export default slider;