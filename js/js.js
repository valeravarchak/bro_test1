// Таблица
var mainTable = document.getElementsByClassName("main_table")[0];

// Кнопка удаления строки
var buttonMinusRow = document.getElementsByClassName("minus_row")[0];

// Кнопка удаления колонки
var buttonMinusCol = document.getElementsByClassName("minus_col")[0];

// Кнопка добавления строки
var buttonPlusRow = document.getElementsByClassName("plus_row")[0];

// Кнопка добавления колонки
var buttonPlusCol = document.getElementsByClassName("plus_col")[0];

// Индекс колонки
var indexCol;

//  Индекс строчки
var indexRow;

// Количество строчек
var countOfRows;

// Количество ячеек в строчке
var countChildElement;


// При загрузке страницы создаёт таблицу 4х4
window.onload = function () {

    for (var i = 0; i < 4; i++) {
        mainTable.appendChild(document.createElement('tr'));

        for (var j = 0; j < 4; j++) {
            document.getElementsByTagName('tr')[i].appendChild(document.createElement('td'));
        }
    }

};

document.onmouseover = function (event) {

    var target = event.target;

// Количество строк
    countOfRows = mainTable.getElementsByTagName('tr').length;

// Количество ячеек в строке
    countChildElement = mainTable.getElementsByTagName('tr')[0].getElementsByTagName('td').length;

// Движение кнопок удаления
    if (target.tagName != 'TD') return;

    indexCol = target.cellIndex;
    indexRow = target.parentNode.rowIndex;

    var offLeft = target.offsetLeft,
        offTop = target.offsetTop;

    buttonMinusCol.style.left = offLeft + 'px';
    buttonMinusRow.style.top = offTop + 'px';

};

// Удаляет колонку
buttonMinusCol.onclick = function () {

    for (var i = 0; i < countOfRows; i++) {
        var elemTD = mainTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[indexCol];
        elemTD.remove();
    }
};

// Удаляет строчку
buttonMinusRow.onclick = function () {

    var elemTR = mainTable.getElementsByTagName('tr')[indexRow];
    elemTR.remove();
};

// Добавляет колонку
buttonPlusCol.onclick = function () {

    for (var i = 0; i < countOfRows; i++) {
        document.getElementsByTagName('tr')[i].appendChild(document.createElement('td'));
    }
};

// Добавляет строчку
buttonPlusRow.onclick = function () {

    mainTable.appendChild(document.createElement('tr'));
    for (var i = 0; i < countChildElement; i++) {
        document.getElementsByTagName('tr')[countOfRows].appendChild(document.createElement('td'));
    }
};


