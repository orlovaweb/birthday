import UrlImg1 from './img/1.webp';
import UrlImg2 from './img/2.webp';
import UrlImg3 from './img/3.webp';
import UrlImg4 from './img/4.webp';
import UrlImg5 from './img/5.webp';
import UrlImg6 from './img/6.webp';
import UrlImg7 from './img/7.webp';
import UrlImg8 from './img/8.webp';
import UrlImg9 from './img/9.webp';
import UrlFooterLogo from './img/logo.svg';

const decorImages = document.querySelectorAll('.default-img');
const footerLogo = document.querySelector('.footer__logo img');
footerLogo.src = UrlFooterLogo;
decorImages[0].src = UrlImg1;
decorImages[1].src = UrlImg2;
decorImages[2].src = UrlImg3;
decorImages[3].src = UrlImg4;
decorImages[4].src = UrlImg5;
decorImages[5].src = UrlImg6;
decorImages[6].src = UrlImg7;
decorImages[7].src = UrlImg8;
decorImages[8].src = UrlImg9;
const birthdays = [
  {
    id: 1683309719080,
    name: 'Дима Орлов',
    date: '28.03.1990',
  },
  {
    name: 'Полина Орлова',
    date: '07.02.2013',
    id: 1683309719081
  },
  {
    name: 'Сашка Орлов',
    date: '20.02.2021',
    id: 1683309719082
  },
  {
    name: 'Людмила Орлова',
    date: '25.08.1991',
    id: 1683309719083
  },
  {
    name: 'Дарья Орлова',
    date: '25.08.2003',
    id: 1683309719084
  },
  {
    name: 'Иван Орлов',
    date: '15.01.1980',
    id: 1683309719085
  },
  // {
  //   name: 'Инны Орловой',
  //   date: '21.01',
  // },
  // {
  //   name: 'Вовы Прозорова',
  //   date: '25.01',
  // },
  // {
  //   name: 'Сени Прозорова',
  //   date: '01.02',
  // },
  // {
  //   name: 'Тани Орловой',
  //   date: '12.02',
  // },
  // {
  //   name: 'Даника Орлова',
  //   date: '22.02',
  // },
  // {
  //   name: 'Миры и Юры Орловых',
  //   date: '15.03',
  // },
  // {
  //   name: 'Паши Орлова',
  //   date: '20.03',
  // },
  // {
  //   name: 'Даши Прозоровой',
  //   date: '05.04',
  // },
  // {
  //   name: 'Светланы Юрьевны Орловой',
  //   date: '16.04',
  // },
  // {
  //   name: 'Николая Орлова ',
  //   date: '10.05',
  // },
  // {
  //   name: 'Саша Бугаева',
  //   date: '22.05',
  // },
  // {
  //   name: 'Настюши Орловой',
  //   date: '28.05',
  // },
  // {
  //   name: 'Сони Орловой и Ильи Бугаева',
  //   date: '03.06',
  // },
  // {
  //   name: 'Рады Орловой и Матвея Ротаева',
  //   date: '05.06',
  // },
  // {
  //   name: 'Анечки Орловой',
  //   date: '08.06',
  // },
  // {
  //   name: 'Ульяны Интюк',
  //   date: '14.06',
  // },
  // {
  //   name: 'Саши Орлова',
  //   date: '19.06',
  // },
  // {
  //   name: 'Насти Интюк',
  //   date: '20.06',
  // },
  // {
  //   name: 'Кати Бугаевой',
  //   date: '24.06',
  // },
  // {
  //   name: 'Ванюши Орлова',
  //   date: '01.07',
  // },
  // {
  //   name: 'Леночки Орловой',
  //   date: '11.07',
  // },
  // {
  //   name: 'Яши Прозорова',
  //   date: '15.07',
  // },
  // {
  //   name: 'Ани и Артема Орловых',
  //   date: '24.07',
  // },
  // {
  //   name: 'Светочки Орловой',
  //   date: '05.08',
  // },
  // {
  //   name: 'Лили Орловой',
  //   date: '10.08',
  // },
  // {
  //   name: 'Миши Прозорова',
  //   date: '17.08',
  // },
  // {
  //   name: 'Марины Орловой',
  //   date: '10.09',
  // },
  // {
  //   name: 'Тимоши Орлова',
  //   date: '23.10',
  // },
  // {
  //   name: 'Жанны Орловой',
  //   date: '07.11',
  // },
  // {
  //   name: 'Маши Орловой',
  //   date: '08.11',
  // },
  // {
  //   name: 'Мамы',
  //   date: '17.11',
  // },
  // {
  //   name: 'Миланы Орловой',
  //   date: '20.11',
  // },
  // {
  //   name: 'Варвары Орловой',
  //   date: '22.11',
  // },
  // {
  //   name: 'Адели Орловой',
  //   date: '13.12',
  // },
  // {
  //   name: 'Андрюши Бугаева',
  //   date: '19.12',
  // },
  // {
  //   name: 'Лены Орловой',
  //   date: '13.11',
  // },
];

if (!localStorage.getItem("birthdays")) {
  localStorage.setItem("birthdays", JSON.stringify(birthdays));
}
export const renderBirthdays = () => { return JSON.parse(localStorage.getItem("birthdays")) }