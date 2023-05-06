import moment from 'moment';
import './main.css';

import "./module";

import { renderBirthdays } from './module';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

//подключаем air-datepicker к дате из формы ввода именинника
new AirDatepicker("#celebrantDate");
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

// Функция создания errorMessage
const generateErrorMessage = (message, flag) => {
    const labelForInput = document.querySelector(`.label-for__input__${flag}`);
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message-block';
    errorMessage.innerText = message;
    labelForInput.append(errorMessage);
}

//функция по обновлению имени html карточки
// const updateHtmlCardOfCelebrant = (index) => {
//     const celebrantsHtmlCardArray = document.querySelectorAll('.celebrants-item');
//     const celebrantsItemName = celebrantsHtmlCardArray[index].querySelector('.celebrants-item__name');
//     celebrantsItemName.textContent = birthdays[index].name;
// }

//создаем задачи на основе birthdays
const celebrantsList = document.querySelector('.celebrants-list');
birthdays.forEach(birthday => {
    const newBirthdayCard = createHtmlCard(birthday.id, birthday.name, birthday.date);
    celebrantsList.append(newBirthdayCard);
});

const addCelebrantBoxForm = document.querySelector('.add-celebrant-box__form');

//создаем задачу из данных формы
// const dateArrayOfBirthdays = birthdays.map(celebrant => celebrant.date);

addCelebrantBoxForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { target } = event;
    const errorMessageArray = document.querySelectorAll('.error-message-block');
    errorMessageArray.forEach(message => {
        message?.remove();
    });

    const inputNameRaw = target.celebrantName.value.trim();
    const inputDateRaw = target.celebrantDate.value.trim();
    const inputDate = inputDateRaw.slice(0, 5);
    const inputYear = inputDateRaw.slice(6, 10);
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
    const isValidDate = moment(inputDateRaw, "DD.MM.YYYY", true).isValid();

    // console.log(inputYear);
    if (!isValidDate) {
        generateErrorMessage("Ввели некорректную дату.", 2);
    }
    // let isValidDate = true;
    // const regExpDate = /^([0-2][1-9]|[0-3][0-1]|[1-9])\.([0]\d|[1][0-2]|\d)$/;
    // let mediateDate = inputDateRaw;
    // let resultInputDate = inputDateRaw;
    // if (regExpDate.test(inputDateRaw)) {
    //     const stringValueArray = regExpDate.exec(inputDateRaw);
    //     if (/^(\d)\.\d+$/.test(inputDateRaw)) {
    //         mediateDate = '0' + inputDateRaw;
    //     }
    //     if (/^\d+\.(\d)$/.test(mediateDate)) {
    //         const index = mediateDate.search(/(?<=\.\d)/);
    //         resultInputDate = mediateDate.slice(0, index - 1) + `0${stringValueArray[2]}`;
    //     } else {
    //         resultInputDate = mediateDate;
    //     }
    // } else {
    // generateErrorMessage("Ввели некорректную дату.", 2);
    //     isValidDate = false;
    // }
    // const inputDate = resultInputDate;

    if (isValidDate && isValidName) {
        const newId = new Date().getTime();
        birthdays.push({ id: newId, name: inputName, date: inputDateRaw });
        // console.log(birthdays);
        // dateArrayOfBirthdays.push(inputDate);
        //Проверяем, есть ли запись с такой датой.  Если есть, конкатенируем имена. Если нет, просто создаем новый объект.
        // if (dateArrayOfBirthdays.includes(inputDate)) {
        //     birthdays.forEach((celebrant, index) => {
        //         if (celebrant.date === inputDate) {
        //             celebrant.name = celebrant.name + ' и ' + inputName;
        //             updateHtmlCardOfCelebrant(index);
        //         }
        //     });
        // }
        // else {
        const newHtmlCard = createHtmlCard(newId, inputName, inputDateRaw);
        celebrantsList.append(newHtmlCard);
        // }
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
    // dateArrayOfBirthdays.splice(indexOfDeleteCelebrantsItem, 1);
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
    // console.log(birthdayArray);

    let indexOfNearestBirthday = 0;
    let nearestBirthday = birthdayArray[indexOfNearestBirthday];
    let minTimeToNextBirthday = nearestBirthday.getTime() - Date.now();

    let isTodayBirthday = false;
    birthdayArray.forEach((birthday, index) => {
        let currentTimeToNextBirthday = birthday.getTime() - Date.now();
        // ****можно упростить вложенность, нужен ли indexOfNearestBirthday?
        // if (currentTimeToNextBirthday < 0) {
        //     isTodayBirthday = true;
        //     nearestBirthday = birthday;
        //     minTimeToNextBirthday = currentTimeToNextBirthday;
        //     indexOfNearestBirthday = index;
        // } else if (currentTimeToNextBirthday < minTimeToNextBirthday) {
        //     nearestBirthday = birthday;
        //     minTimeToNextBirthday = currentTimeToNextBirthday;
        //     indexOfNearestBirthday = index;
        // }
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
    console.log(celebrantArray);
    // const celebrant = birthdays[indexOfNearestBirthday];
    return {
        isTodayBirthday,
        celebrantArray,
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
//Функция форматирования слова "лет" в зависимости от числительного
const renderAge = (count) => {
    const lastOne = count % 10;
    if (count > 4 && count < 21) return "лет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "года";
    if (lastOne === 1) return "год";
    return "лет";
}
const getCelebrantsNames = (celebrantArray) => {
    console.log(celebrantArray)
    let message = "";
    const currentYear = new Date().getFullYear();
    celebrantArray.forEach((celebrant, index) => {
        const birthdayYear = Number(celebrant.date.slice(6));
        const age = currentYear - birthdayYear;
        if (index === 0) {
            message += celebrant.name + " (" + age + renderAge(age) + " )";
        } else {
            message += ", " + celebrant.name + " (" + age + renderAge(age) + " )";
        }
    })
    return message;
}
const getCelebrantsDate = (date) => {
    let message = date.slice(0, 2);
    const month = date.slice(3, 5);
    switch (month) {
        case "01":
            message += " января";
            break;
        case "02":
            message += " февраля";
            break;
        case "03":
            message += " марта";
            break;
        case "04":
            message += " апреля";
            break;
        case "05":
            message += " мая";
            break;
        case "06":
            message += " июня";
            break;
        case "07":
            message += " июля";
            break;
        case "08":
            message += " августа";
            break;
        case "09":
            message += " сентября";
            break;
        case "10":
            message += " октября";
            break;
        case "11":
            message += " ноября";
            break;
        case "12":
            message += " декабря";
            break;
        default:
            break;
    }
    message += " " + new Date().getFullYear();
    return message;
};
//Функция вывода найденного ближайшего дня рождения
const outputNextBirthday = (isTodayBirthday, celebrants, minTimeToNextBirthday) => {
    if (isTodayBirthday) {

        createHtmlMessage(`Сегодня, ${getCelebrantsDate(celebrants[0].date)}, празднует день рождения ${getCelebrantsNames(celebrants)}!`);
    }
    else {
        const daysToNextBirthday = Math.round(minTimeToNextBirthday / 1000 / 60 / 60 / 24);
        if (daysToNextBirthday) {
            createHtmlMessage(`Осталось ${daysToNextBirthday} ${renderPhrase(daysToNextBirthday)} до ближайшего дня рождения.\n Именинник(и): ${getCelebrantsNames(celebrants)}. Дата ${getCelebrantsDate(celebrants[0].date)}.`);
        } else {
            createHtmlMessage(`Cледующий день рождения уже завтра! Именинник(и) ${getCelebrantsNames(celebrants)}!`);
        }
    }
}


const checkButton = document.querySelector('.check-button');
checkButton.addEventListener('click', () => {
    const { isTodayBirthday, celebrantArray, minTimeToNextBirthday } = getNextBirthday(birthdays);
    console.log(celebrantArray);
    outputNextBirthday(isTodayBirthday, celebrantArray, minTimeToNextBirthday);
})
