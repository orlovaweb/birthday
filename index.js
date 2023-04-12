import moment from 'moment';
import './main.css';
import UrlImg1 from './img/1.jpg';
import UrlImg2 from './img/2.jpg';
import UrlImg3 from './img/3.jpg';
import UrlImg4 from './img/4.jpg';
import UrlImg5 from './img/5.jpg';
import UrlImg6 from './img/6.jpg';
import UrlImg7 from './img/7.jpg';
import UrlImg8 from './img/8.jpg';
import UrlImg9 from './img/9.jpg';
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

const birthdayOfMyRelatives = [
    {
        name: 'Димы Орлова',
        date: '28.03',
    },
    {
        name: 'Полины Орловой',
        date: '07.02',
    },
    {
        name: 'Сашки Орлова',
        date: '20.02',
    },
    {
        name: 'Люды и Даши Орловой',
        date: '25.08',
    },
    {
        name: 'Вани Орлова',
        date: '15.01',
    },
    {
        name: 'Инны Орловой',
        date: '21.01',
    },
    {
        name: 'Вовы Прозорова',
        date: '25.01',
    },
    {
        name: 'Сени Прозорова',
        date: '01.02',
    },
    {
        name: 'Тани Орловой',
        date: '12.02',
    },
    {
        name: 'Даника Орлова',
        date: '22.02',
    },
    {
        name: 'Миры и Юры Орловых',
        date: '15.03',
    },
    {
        name: 'Паши Орлова',
        date: '20.03',
    },
    {
        name: 'Даши Прозоровой',
        date: '05.04',
    },
    {
        name: 'Светланы Юрьевны Орловой',
        date: '16.04',
    },
    {
        name: 'Николая Орлова ',
        date: '10.05',
    },
    {
        name: 'Саша Бугаева',
        date: '22.05',
    },
    {
        name: 'Настюши Орловой',
        date: '28.05',
    },
    {
        name: 'Сони Орловой и Ильи Бугаева',
        date: '03.06',
    },
    {
        name: 'Рады Орловой и Матвея Ротаева',
        date: '05.06',
    },
    {
        name: 'Анечки Орловой',
        date: '08.06',
    },
    {
        name: 'Ульяны Интюк',
        date: '14.06',
    },
    {
        name: 'Саши Орлова',
        date: '19.06',
    },
    {
        name: 'Насти Интюк',
        date: '20.06',
    },
    {
        name: 'Кати Бугаевой',
        date: '24.06',
    },
    {
        name: 'Ванюши Орлова',
        date: '01.07',
    },
    {
        name: 'Леночки Орловой',
        date: '11.07',
    },
    {
        name: 'Яши Прозорова',
        date: '15.07',
    },
    {
        name: 'Ани и Артема Орловых',
        date: '24.07',
    },
    {
        name: 'Светочки Орловой',
        date: '05.08',
    },
    {
        name: 'Лили Орловой',
        date: '10.08',
    },
    {
        name: 'Миши Прозорова',
        date: '17.08',
    },
    {
        name: 'Марины Орловой',
        date: '10.09',
    },
    {
        name: 'Тимоши Орлова',
        date: '23.10',
    },
    {
        name: 'Жанны Орловой',
        date: '07.11',
    },
    {
        name: 'Маши Орловой',
        date: '08.11',
    },
    {
        name: 'Мамы',
        date: '17.11',
    },
    {
        name: 'Миланы Орловой',
        date: '20.11',
    },
    {
        name: 'Варвары Орловой',
        date: '22.11',
    },
    {
        name: 'Адели Орловой',
        date: '13.12',
    },
    {
        name: 'Андрюши Бугаева',
        date: '19.12',
    },
    {
        name: 'Лены Орловой',
        date: '13.11',
    },
];
// Добавляем id каждому дню рождения
const birthdays = birthdayOfMyRelatives.map((birthday, index) => {
    birthday.id = index;
    return birthday;
});

// Функция по созданию html карточки
const createHtmlCard = (dataCelebrantsId, celebrantsName, celebrantsDate) => {
    const celebrantsItem = document.createElement('div');
    celebrantsItem.className = 'celebrants-item';
    celebrantsItem.dataset.celebrantsId = dataCelebrantsId;

    const celebrantsItemName = document.createElement('div');
    celebrantsItemName.className = 'celebrants-item__name celebrants-item__string';
    celebrantsItemName.textContent = celebrantsName;

    const celebrantsItemDate = document.createElement('div');
    celebrantsItemDate.className = 'celebrants-item__date celebrants-item__string';
    celebrantsItemDate.textContent = celebrantsDate;

    const celebrantsItemDeleteButton = document.createElement('button');
    celebrantsItemDeleteButton.className = 'celebrants-item__delete';
    celebrantsItemDeleteButton.dataset.deleteCelebrantsId = dataCelebrantsId;
    celebrantsItemDeleteButton.title = "Удалить данную карточку";

    celebrantsItem.append(celebrantsItemName, celebrantsItemDate, celebrantsItemDeleteButton);

    return celebrantsItem;
}

// Функция создания errorMessage
const generateErrorMessage = (message, flag) => {
    const labelForInput = document.querySelector(`.label-for__input__${flag}`);
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message-block';
    errorMessage.innerText = message;
    labelForInput.append(errorMessage);
}

//функция по обновлению имени html карточки
const updateHtmlCardOfCelebrant = (index) => {
    const celebrantsHtmlCardArray = document.querySelectorAll('.celebrants-item');
    const celebrantsItemName = celebrantsHtmlCardArray[index].querySelector('.celebrants-item__name');
    celebrantsItemName.textContent = birthdays[index].name;
}

//создаем задачи на основе birthdays
const celebrantsList = document.querySelector('.celebrants-list');
birthdays.forEach(birthday => {
    const newBirthdayCard = createHtmlCard(birthday.id, birthday.name, birthday.date);
    celebrantsList.append(newBirthdayCard);
});

const addCelebrantBoxForm = document.querySelector('.add-celebrant-box__form');

//создаем задачу из данных формы
const dateArrayOfBirthdays = birthdays.map(celebrant => celebrant.date);

addCelebrantBoxForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { target } = event;
    const errorMessageArray = document.querySelectorAll('.error-message-block');
    errorMessageArray.forEach(message => {
        message?.remove();
    });

    const inputNameRaw = target.celebrantName.value.trim();
    const inputDateRaw = target.celebrantDate.value.trim();
    // сырая вводимая дата, дальше обрабатываем на корректность ввода, 
    // включая, при вводе 1.10 -> 01.10; 1.1 -> 01.01

    //Валидация имени
    let isValidName = true;
    const regExpNameUpperStart = /^(([А-ЯA-Z][а-яa-z]+ [А-ЯA-Z][а-яa-z]+)|([А-ЯA-Z][а-яa-z]+))$/;
    const regExpName = /^(?:([A-Za-zа-яА-я]+) ([A-Za-zа-яА-я]+))|([A-Za-zа-яА-я]+)$/;
    let resultInputName = inputNameRaw;
    if (regExpName.test(inputNameRaw)) {
        const nameArray = regExpName.exec(inputNameRaw);
        if (!regExpNameUpperStart.test(inputNameRaw)) {
            if (nameArray[3]) {
                const firstLetter = nameArray[3][0].toUpperCase();
                resultInputName = firstLetter + inputNameRaw.slice(1);
            } else {
                const firstLetter1 = nameArray[1][0].toUpperCase();
                const firstLetter2 = nameArray[2][0].toUpperCase();
                resultInputName = firstLetter1 + nameArray[1].slice(1) + ' ' + firstLetter2 + nameArray[2].slice(1);
            }
        }
    } else {
        generateErrorMessage("Ввели некорректное имя.", 1);
        isValidName = false;
    }
    const inputName = resultInputName;

    //Валидация даты
    let isValidDate = true;
    const regExpDate = /^([0-2][1-9]|[0-3][0-1]|[1-9])\.([0]\d|[1][0-2]|\d)$/;
    let mediateDate = inputDateRaw;
    let resultInputDate = inputDateRaw;
    if (regExpDate.test(inputDateRaw)) {
        const stringValueArray = regExpDate.exec(inputDateRaw);
        if (/^(\d)\.\d+$/.test(inputDateRaw)) {
            mediateDate = '0' + inputDateRaw;
        }
        if (/^\d+\.(\d)$/.test(mediateDate)) {
            const index = mediateDate.search(/(?<=\.\d)/);
            resultInputDate = mediateDate.slice(0, index - 1) + `0${stringValueArray[2]}`;
        } else {
            resultInputDate = mediateDate;
        }
    } else {
        generateErrorMessage("Ввели некорректную дату.", 2);
        isValidDate = false;
    }
    const inputDate = resultInputDate;

    if (isValidDate && isValidName) {
        //Проверяем, есть ли запись с такой датой.  Если есть, конкатенируем имена. Если нет, просто создаем новый объект.
        if (dateArrayOfBirthdays.includes(inputDate)) {
            birthdays.forEach((celebrant, index) => {
                if (celebrant.date === inputDate) {
                    celebrant.name = celebrant.name + ' и ' + inputName;
                    updateHtmlCardOfCelebrant(index);
                }
            });
        }
        else {
            const newId = birthdays.length;
            const newHtmlCard = createHtmlCard(newId, inputName, inputDate);
            birthdays.push({ id: newId, name: inputName, date: inputDate });
            dateArrayOfBirthdays.push(inputDate);
            celebrantsList.append(newHtmlCard);
        }
        addCelebrantBoxForm.reset();
    }
});

//Вешаем обработчик событий на родителя tasksList, чтобы отслеживать нажатия кнопок Удалить
let deleteCelebrantsId;
const modalOverlay = document.querySelector('.modal-overlay');
const cancelButton = document.querySelector('.delete-modal__cancel-button');
const confirmButton = document.querySelector('.delete-modal__confirm-button');
celebrantsList.addEventListener('click', (event) => {
    const isDeleteButton = event.target.closest('.celebrants-item__delete');
    deleteCelebrantsId = event.target.dataset.deleteCelebrantsId;
    if (isDeleteButton) {
        modalOverlay.classList.remove('modal-overlay_hidden');
    };
});
cancelButton.addEventListener('click', (event) => {
    modalOverlay.classList.add('modal-overlay_hidden');
});
modalOverlay.addEventListener('click', (event) => {
    modalOverlay.classList.add('modal-overlay_hidden');
});
confirmButton.addEventListener('click', (event) => {
    const celebrantsItemToDelete = document.querySelector(`[data-celebrants-id = '${deleteCelebrantsId}']`);
    celebrantsItemToDelete.remove();
    const indexOfDeleteCelebrantsItem = birthdays.findIndex((birthday, index) => {
        return birthdays[index].id == deleteCelebrantsId;
    });
    birthdays.splice(indexOfDeleteCelebrantsItem, 1);
    modalOverlay.classList.add('modal-overlay_hidden');
});

//Функция подсчета ближайшего дня рождения
const getNextBirthday = (birthdayOfMyRelatives) => {
    //Получаем массив с датами этого года
    const birthdayArray = birthdayOfMyRelatives.map((people, index) => {
        const peopleDate = people.date.split('.');
        const peopleDay = +peopleDate[0];
        const peopleMonth = +peopleDate[1];
        const peopleYear = new Date().getFullYear();
        let fullBithday = new Date(peopleYear, peopleMonth - 1, peopleDay);
        if ((Date.now() - fullBithday.getTime()) > 86400000) {
            fullBithday = new Date(peopleYear + 1, peopleMonth - 1, peopleDay);
        }

        return fullBithday;
    });

    let indexOfNearestBirthday = 0;
    let nearestBirthday = birthdayArray[indexOfNearestBirthday];
    let minTimeToNextBirthday = nearestBirthday.getTime() - Date.now();

    let isTodayBirthday = false;
    birthdayArray.forEach((birthday, index) => {
        let currentTimeToNextBirthday = birthday.getTime() - Date.now();
        if (currentTimeToNextBirthday < 0) {
            isTodayBirthday = true;
            nearestBirthday = birthday;
            minTimeToNextBirthday = currentTimeToNextBirthday;
            indexOfNearestBirthday = index;
        } else if (currentTimeToNextBirthday < minTimeToNextBirthday) {
            nearestBirthday = birthday;
            minTimeToNextBirthday = currentTimeToNextBirthday;
            indexOfNearestBirthday = index;
        }
    });

    const celebrant = birthdayOfMyRelatives[indexOfNearestBirthday];
    return {
        isTodayBirthday,
        celebrant,
        minTimeToNextBirthday
    }
}
//Функция генерации сообщения в html
const createHtmlMessage = (message) => {
    const aboutBirthdayWrapper = document.querySelector('.about-birthday__wrapper');
    aboutBirthdayWrapper.innerHTML = '';
    const messageAboutBirthday = document.createElement('div');
    messageAboutBirthday.className = 'about-birthday';
    messageAboutBirthday.textContent = message;
    aboutBirthdayWrapper.append(messageAboutBirthday);
}
//Функция форматирования слова "день" в зависимости от числительного
const renderPhrase = (count) => {
    const lastOne = count % 10;
    if (count > 4 && count < 21) return "дней";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "дня";
    if (lastOne === 1) return "день";
    return "дней";
}
//Функция вывода найденного ближайшего дня рождения
const outputNextBirthday = (isTodayBirthday, celebrant, minTimeToNextBirthday) => {
    if (isTodayBirthday) {

        createHtmlMessage(`Сегодня  день рождения у ${celebrant.name}!`);
    }
    else {
        const daysToNextBirthday = Math.round(minTimeToNextBirthday / 1000 / 60 / 60 / 24);
        if (daysToNextBirthday) {
            createHtmlMessage(`Осталось ${daysToNextBirthday} ${renderPhrase(daysToNextBirthday)} до дня рождения\n${celebrant.name} (дата ${celebrant.date}) `);
        } else {
            createHtmlMessage(`Cледующий день рождения уже завтра! У ${celebrant.name}!`);
        }
    }
}


const checkButton = document.querySelector('.check-button');
checkButton.addEventListener('click', () => {
    const { isTodayBirthday, celebrant, minTimeToNextBirthday } = getNextBirthday(birthdays);
    outputNextBirthday(isTodayBirthday, celebrant, minTimeToNextBirthday);
})
