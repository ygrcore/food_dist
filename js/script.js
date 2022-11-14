import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import timer from './modules/timer';
import slider from './modules/slider';
import {openModal} from './modules/modal';


window.addEventListener("DOMContentLoaded", () => {
    // таймер на открытие модального окна через отпределенный промежуток времени нахождения на стр. (50 секунд)
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 50000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    calc();
    cards();
    forms('form', modalTimerId);
    modal("[data-modal]", ".modal", modalTimerId);
    timer(".timer", "2023-05-20");
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
