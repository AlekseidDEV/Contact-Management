## Contact-Management

### Запуск проекта
```
git clone https://github.com/AlekseidDEV/Contact-Management.git

cd Contact-Management

npm i

npm run serve
```

### Используемые библиотеки
<ul>
    <li>Vue Router</li>
    <li>Pinia</li>
    <li>Tailwinds</li>
    <li>Axios</li>
</ul>

### Структура папок с компонентами

```
project-root/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ContactForm.vue
│   │   │   ├── SearchBar.vue
│   │   │   └── ...
│   │   ├── ContactItem.vue
│   │   ├── ContactList.vue
│   │   └── ...
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ItemDetail.vue
│   │   └── ...
├── README.md
└── ...
```
<hr>
<i>Комметарий:</i> привык работать с такой структурой. Компоненты из папки
Views самые верхние по уровню, строятся на основе компонентов из папки components, а сами строительные блоки
строяться из более мелких и не очень компонентов из папки ui.
<hr>

<i>Примечание:</i> дабы в компонетах верхнего уровня как таковой логики не было, я поместил туда запрос фейковых данных
, что бы не засорять основную логику строительных компонентов. Использовал библиотеку Axios. Использую ее во всех проектах,
поэтому решил воспользоваться и здесь.
<hr>

<i>Работа с хранилищем Pinia:</i> 
внутри хранилища есть все методы, для манипуляции контактами в списке: Удаление, редактирование, добавление, Сортировка.
Так же есть методы которые записывают данные в LocaStorage и получают их оттуда записывая в state. Два раздельных геттера для
получения обычных данных и фильтрованных.
<hr>
<i>ComponentList:</i> - по большей части компонент работает с флагами, для переключения режимов
или отображения разных кусков верстки. Значения флагов, индексы отправляются уже в хранилище при вызове действий, а геттеры уже возращают информацию на рендер.

<i>ContactForm:</i> принимает пропс. Если флаг редактирования активен, контакт редактируется, если нет, то происходит обычное добавление.
Проверка полей. Регуляркой проверяются поля email и phone. Есть emit для закрытие модалки по крестику.

<i>SearchBar:</i> связываю переменную с инпутом, и вызываю действие из хранилища для фильтрации по имени.
<strong>Внимание!</strong> - поле ввода реагирует на событие <b>keyup.enter</b> (Можно реализовать на событие input), но я выбрал первый вариант.
Когда поиск активируется, и флаг принимает статут true, в список загружаются уже "фильтрованные данные"

<i>ContactItem:</i> получаю данные из параметров route, получаю нужный контакт из store. Так же добавил возможным редактировать и удалить контакт.
<hr>
<i>TypeScript:</i> все объявления interface были вынесены в специальную попку models.
<hr>
<i>Jest:</i> написал два простых теста, первый на отрисовку компонента, второй на проверку начальных данных при рендере странницы











