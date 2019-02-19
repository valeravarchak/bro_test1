
// Таблица
const MAIN_TABLE = document.getElementsByClassName("main_table")[0];

// Кнопка удаления ряда
// Кнопка удаления колонки
const MINUS_ROW = document.getElementsByClassName("minus_row")[0];
const MINUS_COL = document.getElementsByClassName("minus_col")[0];

// Блок в котором находятся таблица и кнопки
const CONTENT = document.getElementsByClassName("content")[0];

// Кнопка добавления ряда
// Кнопка добавления колонки
const PLUS_ROW = document.getElementsByClassName("plus_row")[0];
const PLUS_COL = document.getElementsByClassName("plus_col")[0];

// Время скрития кнопок удаления
let timeHiddenButtons;

// Индекс колонки
//  Индекс ряда
let indexCol;
let indexRow;

// При загрузке страницы создаёт таблицу 4х4
window.onload = () => {
    hiddenMinusButtons();

    for (let i = 0; i < 4; i++) {
        let insRow = MAIN_TABLE.insertRow(i);

        for (let j = 0; j < 4; j++) {
            insRow.insertCell(j);
        }
    }

};

// Показывает кнопки удаления
visibleMinusButtons = () => {
    if (MAIN_TABLE.rows.length !== 1) {
        MINUS_ROW.style.visibility = "visible";
    }
    if (MAIN_TABLE.rows[0].cells.length !== 1) {
        MINUS_COL.style.visibility = "visible";
    }
};

// Cкрывает кнопки удаления
hiddenMinusButtons = () => {
    MINUS_ROW.style.visibility = 'hidden';
    MINUS_COL.style.visibility = 'hidden';
};


MAIN_TABLE.onmouseover = (event) => {
    clearTimeout(timeHiddenButtons);

    visibleMinusButtons();

    let target = event.target;

    // Если не наведено ячейку прекращает функцию
    if (target.tagName !== 'TD') return;

    // Запись индекса колонки
    // Запись индекса ряда
    indexCol = target.cellIndex;
    indexRow = target.parentNode.rowIndex;

    MINUS_COL.style.left = `${target.offsetLeft}px`;
    MINUS_ROW.style.top = `${target.offsetTop}px`;

};

// Добавляет колонку
PLUS_COL.onclick = () => {

    for (let col of MAIN_TABLE.rows) {
        col.insertCell();
    }
};

// Добавляет строчку
PLUS_ROW.onclick = () => {
    MAIN_TABLE.insertRow();
    for (let row of MAIN_TABLE.rows[0].cells) {
        MAIN_TABLE.rows[MAIN_TABLE.rows.length - 1].insertCell(row);
    }
};

// Удаляет колонку
MINUS_COL.onclick = () => {

    if (MAIN_TABLE.rows[0].cells.length !== 1) {
        for (let col of MAIN_TABLE.rows) {
            col.deleteCell(indexCol);
        }

        MINUS_COL.style.left = `${MAIN_TABLE.rows[0].lastElementChild.offsetLeft}px`;
        hiddenMinusButtons();
    }
};

// Удаляет ряд
MINUS_ROW.onclick = () => {

    if (MAIN_TABLE.rows.length !== 1) {
        MAIN_TABLE.deleteRow(indexRow);

        MINUS_ROW.style.top = `${MAIN_TABLE.rows[MAIN_TABLE.rows.length - 1].offsetTop}px`;
        hiddenMinusButtons();
    }
};


// Если не наведено на таблицу скривает кнопки удаления
CONTENT.onmouseout = () => {
    timeHiddenButtons = setTimeout(hiddenMinusButtons, 1000);
};

CONTENT.onmouseover = (event) => {

    let target = event.target

    if (target.classList[1] !== "minus") return;

    clearTimeout(timeHiddenButtons);
};