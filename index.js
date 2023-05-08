import moment from 'moment';
import './main.css';

import "./module";

import { renderBirthdays } from './module';
import AirDatepicker from 'air-datepicker';
import Parallax from 'parallax-js'
import 'air-datepicker/air-datepicker.css';

// подключаем parallax-js
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
    relativeInput: true
});
//подключаем air-datepicker к дате из формы ввода именинника
new AirDatepicker("#celebrantDate", {
    autoClose: true
});
//получаем всех именинников
const birthdays = renderBirthdays();
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
//создаем задачи на основе birthdays
const celebrantsList = document.querySelector('.celebrants-list');
birthdays.forEach(birthday => {
    const newBirthdayCard = createHtmlCard(birthday.id, birthday.name, birthday.date);
    celebrantsList.append(newBirthdayCard);
});

// Функция создания errorMessage
const generateErrorMessage = (message, flag) => {
    const labelForInput = document.querySelector(`.label-for__input__${flag}`);
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message-block';
    errorMessage.innerText = message;
    labelForInput.append(errorMessage);
}

const addCelebrantBoxForm = document.querySelector('.add-celebrant-box__form');

//создаем задачу из данных формы
let inputName = "";
let isValidName = false;
let isValidDate = false;

//ф-я валидации имени
const checkNameInputOnValidation = (inputNameRaw) => {
    const regExpNameUpperStart = /^(([А-ЯA-Z][а-яa-z]+ [А-ЯA-Z][а-яa-z]+)|([А-ЯA-Z][а-яa-z]+))$/;
    const regExpName = /^(?:([A-Za-zа-яА-я]+) ([A-Za-zа-яА-я]+))|([A-Za-zа-яА-я]+)$/;
    let resultInputName = inputNameRaw;

    if (!inputNameRaw) {
        generateErrorMessage("Заполните имя", 1);
        isValidName = false;
    }
    else {
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
            isValidName = true;
        } else {
            generateErrorMessage("Ввели некорректное имя.", 1);
            isValidName = false;
        }
    }
    inputName = resultInputName;
    return isValidName;

}
const checkDateInputOnValidation = (inputDateRaw) => {
    if (!inputDateRaw) {
        generateErrorMessage("Заполните дату", 2);
        isValidDate = false;
    }
    else {

        isValidDate = moment(inputDateRaw, "DD.MM.YYYY", true).isValid();
        if (!isValidDate) {
            generateErrorMessage("Ввели некорректную дату.", 2);
            isValidDate = false;
        }
    }
    return isValidDate;
}
//валидация ввода имени
const inputNameField = addCelebrantBoxForm.querySelector('.input-name');
inputNameField.addEventListener('input', (event) => {
    const { target } = event;
    const { value } = target;
    const labelForInput = document.querySelector('.label-for__input__1');
    const errorMessage = labelForInput.querySelector('.error-message-block');
    errorMessage?.remove();
    isValidName = checkNameInputOnValidation(value);
})
// //валидация ввода даты
const inputDateField = addCelebrantBoxForm.querySelector(".input-date");
inputDateField.addEventListener('change', (event) => {
    const { target } = event;
    const { value } = target;
    const labelForInput = document.querySelector('.label-for__input__2');
    const errorMessage = labelForInput.querySelector('.error-message-block');
    errorMessage?.remove();
    isValidDate = checkDateInputOnValidation(value);
})


addCelebrantBoxForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { target } = event;
    const errorMessageArray = document.querySelectorAll('.error-message-block');
    errorMessageArray.forEach(message => {
        message?.remove();
    });

    const inputDate = target.celebrantDate.value.trim();
    if (inputDate) {
        isValidDate = true;
    }
    // заполнение 
    if (isValidDate && isValidName) {
        const newId = new Date().getTime();
        birthdays.push({ id: newId, name: inputName, date: inputDate });
        const newHtmlCard = createHtmlCard(newId, inputName, inputDate);
        celebrantsList.append(newHtmlCard);
        localStorage.setItem("birthdays", JSON.stringify(birthdays));
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
    localStorage.setItem("birthdays", JSON.stringify(birthdays));
    modalOverlay.classList.add('modal-overlay_hidden');
});

//Функция подсчета ближайшего дня рождения
const getNextBirthday = (birthdays) => {
    //Получаем массив с датами этого года
    const birthdayArray = birthdays.map((person, index) => {
        const personDate = person.date.split('.');
        const personDay = +personDate[0];
        const personMonth = +personDate[1];
        const personYear = new Date().getFullYear();
        let fullBithday = new Date(personYear, personMonth - 1, personDay);
        if ((Date.now() - fullBithday.getTime()) > 86400000) {
            fullBithday = new Date(personYear + 1, personMonth - 1, personDay);
        }

        return fullBithday;
    });

    let indexOfNearestBirthday = 0;
    let nearestBirthday = birthdayArray[indexOfNearestBirthday];
    let minTimeToNextBirthday = nearestBirthday.getTime() - Date.now();

    let isTodayBirthday = false;
    birthdayArray.forEach((birthday, index) => {
        let currentTimeToNextBirthday = birthday.getTime() - Date.now();
        if (currentTimeToNextBirthday < minTimeToNextBirthday) {
            nearestBirthday = birthday;
            minTimeToNextBirthday = currentTimeToNextBirthday;
            indexOfNearestBirthday = index;
            if (currentTimeToNextBirthday < 0) {
                isTodayBirthday = true;
            }
        }
    });
    const celebrantArray = [];
    birthdayArray.forEach((birthday, index) => {
        if (moment(birthday).isSame(nearestBirthday)) {
            celebrantArray.push(birthdays[index])
        };
    });
    return {
        isTodayBirthday,
        celebrantArray,
        minTimeToNextBirthday,
        nearestBirthday
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
    const lastTwo = count % 100;
    if (count > 4 && count < 21) return "дней";
    if (lastTwo > 4 && lastTwo < 21) return "дней";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "дня";
    if (lastOne === 1) return "день";
    return "дней";
}

//Функция форматирования слова "лет" в зависимости от числительного
const renderAge = (count) => {
    const lastOne = count % 10;
    if (count > 4 && count < 21) return "лет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "года";
    if (lastOne === 1) return "год";
    return "лет";
}
const getCelebrantsNames = (celebrantArray, date) => {
    let message = "";
    const currentYear = date.getFullYear();
    celebrantArray.forEach((celebrant, index) => {
        const birthdayYear = Number(celebrant.date.slice(6));
        const age = currentYear - birthdayYear;
        if (index === 0) {
            message += celebrant.name + " (" + age + " " + renderAge(age) + " )";
        } else {
            message += ", " + celebrant.name + " (" + age + " " + renderAge(age) + " )";
        }
    })
    return message;
}
const getCelebrantsDate = (date) => {
    let message = date.getDate().toString();
    const month = date.getMonth();
    switch (month) {
        case 0:
            message += " января";
            break;
        case 1:
            message += " февраля";
            break;
        case 2:
            message += " марта";
            break;
        case 3:
            message += " апреля";
            break;
        case 4:
            message += " мая";
            break;
        case 5:
            message += " июня";
            break;
        case 6:
            message += " июля";
            break;
        case 7:
            message += " августа";
            break;
        case 8:
            message += " сентября";
            break;
        case 9:
            message += " октября";
            break;
        case 10:
            message += " ноября";
            break;
        case 11:
            message += " декабря";
            break;
        default:
            break;
    }
    message += " " + date.getFullYear();
    return message;
};
//Функция вывода найденного ближайшего дня рождения
const outputNextBirthday = (isTodayBirthday, celebrants, minTimeToNextBirthday, nearestBirthday) => {
    if (isTodayBirthday) {

        createHtmlMessage(`Сегодня, ${getCelebrantsDate(nearestBirthday)}, празднует день рождения ${getCelebrantsNames(celebrants, nearestBirthday)}!`);
    }
    else {
        const daysToNextBirthday = Math.round(minTimeToNextBirthday / 1000 / 60 / 60 / 24);
        if (daysToNextBirthday) {
            createHtmlMessage(`Осталось ${daysToNextBirthday} ${renderPhrase(daysToNextBirthday)} до ближайшего дня рождения.\n Именинник(и): ${getCelebrantsNames(celebrants, nearestBirthday)}. Дата ${getCelebrantsDate(nearestBirthday)}.`);
        } else {
            createHtmlMessage(`Cледующий день рождения уже завтра! Именинник(и) ${getCelebrantsNames(celebrants, nearestBirthday)}!`);
        }
    }
}


const checkButton = document.querySelector('.check-button');
checkButton.addEventListener('click', () => {
    const { isTodayBirthday, celebrantArray, minTimeToNextBirthday, nearestBirthday } = getNextBirthday(birthdays);
    outputNextBirthday(isTodayBirthday, celebrantArray, minTimeToNextBirthday, nearestBirthday);
})
