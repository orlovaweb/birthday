# Программа по выводу ближайшего дня рождения
## Первый этап.
Дни рождения задаются массивом объектов в коде. Результат работы программы сообщение с количеством дней до ближайшего дня рождения, 
следующее сообщение - данные следующего именинника.

**Недостатки: нет графического интерфейса, работает только с массивом, заданным в коде**
## Второй этап.
Создан сайт, который в себя включает:
* форма для добавления нового именинника;
* список всех именинников с возможностью удаления карточки именинника;
* кнопку для вывода ближайшего именинника в виде alert().

**Недостатки: не сохраняет заданные данные через интерфейс**
## Третий этап.
Изменения в сайте:
* Результат нахождения именинника выводится непосредственно на сайт в верстку;
* Сайт адаптирован к мобильным устройствам;
* Добавлено модальное окно. При удалении карточки именинника, выходит уточняющее модальное окно;
* При добавлении именинника если есть уже такая запись, конкатенируются имена;
* Валидация имени: можно ввести одно или два слова на русском и английском языке, можно ввести имя с маленькой буквы, в карточку запишется с большой буквы.
* Валидация даты: принимаются даты в формате ДД.ММ. Допустимые значения дня 1-31, месяца 1-12. Если введена дата в формате Д.М, то преобразуется в 0Д.0М, добавляются нули. Валидация происходит по нажатию на кнопку отправки.

**Недостатки: не сохраняет заданные данные через интерфейс**
## Четвертый этап.
Изменения в сайте:
* **Данные о именинниках сохраняются** в LocalStorage. При перезагрузке страницы, при повторном открытии браузера отображаются актуальные сохраненные данные.
* Для облегчения ввода даты, при фокусе поля, всплавает календарь с возможностью выбора даты.
* Изменен формат ввода даты. Дата вводится в формате ДД.ММ.ГГГГ.
* Изменено отображение карточек именинников. Так как сохраняются даты рождения с годом, то нет смысла объединять имена по дате рождения.
* При выводе ближайшего именинника, выводится возраст именинника. Форматирование слова "год, года, лет" соответствует числительному.
* Добавлено всплявающее сообщение при успешном сохранении именинника из данных формы. Сообщение появляется на четыре секунды и исчезает. Есть возможность нажать на крестик, чтобы закрыть сообщение раньше.
* Если выведено сообщение о ближайшем имениннике, добавляя новые данные в список именинников, это сообщение обнуляется.  
* Изменение логики валидации. Можно вводить имя именинника, состоящее из не более пяти слов, слова содержат только буквы латинского и русского алфавита. Проверка происходит сразу, при вводе очередного символа. Дата состоит из 10 символов включая разделители-точки. При попытке ввести одиннадцатый символ, он не дописывается. Проверка правильности даты происходит после ввода десятого символа. Если сменить фокус с более короткой датой, появляется сообщение "Введите полную дату"
* Добавлена favicon, название, описание страницы. Добавлена разметка Open Graph для контроля превью, которое формируется при публикации ссылки на сайт в социальных сетях, мессенджерах.








**Цели:**
1. ~~Добавить свое модальное окно на вывод результата, когда ближайший день рождения~~
2. ~~Добавить модальное окно на удаление~~
3. ~~Валидация формы.~~
4. ~~При добавлении именинника если есть уже такая запись, конкатенировать имена~~
5. ~~Изменить инпут в формате даты??~~
6. Добавить кнопки сортировки по датам, по алфавиту
7. ~~Добавить год рождения, выводить возраст именинника~~
8. ?Возможность редактировать карточку именинника?
9. ~~Добавить название странице и favicon~~
10. Научиться делать маски в input. 
11. ~~Обработка инпутов при смене фокуса, а не отправки формы~~
12. ~~Добавить сообщение при успешном добавлении именинника из данных формы.~~
13. Для именинника, рожденного 29 февраля, в не високосные года поздравлять 1 марта.
