// Таблица
var mainTable = document.getElementsByClassName("main_table")[0];

// Кнопка удаления ряда
var buttonMinusRow = document.getElementsByClassName("minus_row")[0];

// Кнопка удаления колонки
var buttonMinusCol = document.getElementsByClassName("minus_col")[0];

// Кнопка добавления ряда
var buttonPlusRow = document.getElementsByClassName("plus_row")[0];

// Кнопка добавления колонки
var buttonPlusCol = document.getElementsByClassName("plus_col")[0];

// Время скрития кнопок удаления
var timeHiddenButtons;

// Индекс колонки
//  Индекс ряда
var indexCol;
var indexRow;

// Количество рядов
// Количество ячеек в ряде
var countOfRows;
var countChildElement;

// При загрузке страницы создаёт таблицу 4х4
window.onload = function () {
    hiddenMinusButtons();

    for (var i = 0; i < 4; i++) {
        mainTable.appendChild(document.createElement('tr'));

        for (var j = 0; j < 4; j++) {
            document.getElementsByTagName('tr')[i].appendChild(document.createElement('td'));
        }
    }

};

document.onmouseover = function () {
    countOfRows = mainTable.getElementsByTagName('tr').length;
    countChildElement = mainTable.getElementsByTagName('tr')[0].getElementsByTagName('td').length;
}

mainTable.onmouseover = function (event) {
    clearTimeout(timeHiddenButtons);

    visibleMinusButtons();

    var target = event.target;

    // Если не наведено ячейку прекращает функцию
    if (target.tagName != 'TD') return;

    // Запись индекса колонки
    // Запись индекса ряда
    indexCol = target.cellIndex;
    indexRow = target.parentNode.rowIndex;

    buttonMinusCol.style.left = target.offsetLeft + 'px';
    buttonMinusRow.style.top = target.offsetTop + 'px';

};

// Удаляет колонку
buttonMinusCol.onclick = function () {
    countChildElement = mainTable.getElementsByTagName('tr')[0].getElementsByTagName('td').length;

    if (countChildElement != 1) {
        for (var i = 0; i < countOfRows; i++) {
            var elemTD = mainTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[indexCol];
            elemTD.remove();
        }
    }
    hiddenMinusButtons();

    buttonMinusCol.style.left = mainTable.getElementsByTagName('tr')[0].lastElementChild.offsetLeft + 'px';
};

// Удаляет ряд
buttonMinusRow.onclick = function () {
    countOfRows = mainTable.getElementsByTagName('tr').length;

    if (countOfRows != 1) {
        var elemTR = mainTable.getElementsByTagName('tr')[indexRow];
        elemTR.remove();
    }
    hiddenMinusButtons();

    buttonMinusRow.style.top = mainTable.lastElementChild.offsetTop + 'px';
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

// Показывает кнопки удаления
function visibleMinusButtons() {
    if (countOfRows != 1) {
        buttonMinusRow.style.visibility = "visible";
    }
    if (countChildElement != 1) {
        buttonMinusCol.style.visibility = "visible";
    }
};

// Cкрывает кнопки удаления
function hiddenMinusButtons() {
    buttonMinusRow.style.visibility = "hidden";
    buttonMinusCol.style.visibility = "hidden";
}

buttonMinusCol.onmouseover = function () {
    clearTimeout(timeHiddenButtons);
}

buttonMinusCol.onmouseout = function () {
    timeHiddenButtons = setTimeout(hiddenMinusButtons, 100);
}

buttonMinusRow.onmouseover = function () {
    clearTimeout(timeHiddenButtons);
}

buttonMinusRow.onmouseout = function () {
    timeHiddenButtons = setTimeout(hiddenMinusButtons, 100);
}

// Если не наведено на таблицу скривает кнопки удаления
mainTable.onmouseout = function () {
    timeHiddenButtons = setTimeout(hiddenMinusButtons, 100);
}