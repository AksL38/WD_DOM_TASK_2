let data;
let currentPage;

let request = new XMLHttpRequest();
let url = "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json";
request.open("GET", url);
request.onload = () => {
    data = JSON.parse(request.responseText);
    renderTable();
    renderNavigation();
}
request.send();

let table = createDomElement('table', document.body, '', [['style', 'width: 90%; margin: 50px 5%']]);

function createDomElement(elemType, parent, content = '', attributes = []) {
    let elem = document.createElement(elemType);
    attributes.forEach((value) => {
        elem.setAttribute(value[0], value[1]);
    });
    elem.textContent = content;
    parent.append(elem);
    return elem;
}

function renderTable() {
    let header = createDomElement('thead', table, '', [['style', 'color:white; background:#0f6b96']]);
    let headerRow = createDomElement('tr', header)
    createDomElement('th', headerRow, 'ID');
    createDomElement('th', headerRow, 'Name');
    createDomElement('th', headerRow, 'Email');
    let body = createDomElement('tbody', table);
    let light = true;
    for (let j = 0; j < 10; j++) {
        if (light) {
            let bodyRow = createDomElement('tr', body, '', [['style', 'background:#74b3cf']]);
            createDomElement('td', bodyRow);
            createDomElement('td', bodyRow);
            createDomElement('td', bodyRow);
            light = false;
        }
        else {
            let bodyRow = createDomElement('tr', body, '', [['style', 'color:white; background:#33515e']]);
            createDomElement('td', bodyRow);
            createDomElement('td', bodyRow);
            createDomElement('td', bodyRow);
            light = true;
        }
    }
    resetTable(1);
}

function resetTable(pageNum) {
    if (pageNum < 1) pageNum = 1;
    if (pageNum > 10) pageNum = 10;
    currentPage = pageNum;
    let entryNum = pageNum * 10;
    let body = document.querySelector('tbody');
    for (let j = entryNum - 10, k = 0; j < entryNum; j++, k++) {
        resetRow(body.children[k], data[j])
    }
}

function resetRow(row, info) {
    row.children[0].textContent = info['id'];
    row.children[1].textContent = info['name'];
    row.children[2].textContent = info['email'];
}

function renderNavigation() {
    let nav = createDomElement('div', document.body, '', [['style', 'width:100%; text-align:center']]);
    let first = createDomElement('button', nav, "First");
    first.addEventListener('click', () => resetTable(1));
    let previous = createDomElement('button', nav, "Previous");
    previous.addEventListener('click', () => resetTable(currentPage - 1));
    for (let j = 1; j <= 10; j++) {
        let page = createDomElement('button', nav, j);
        page.addEventListener('click', () => resetTable(j));
    }
    let next = createDomElement('button', nav, "Next");
    next.addEventListener('click', () => resetTable(currentPage + 1));
    let last = createDomElement('button', nav, "Last");
    last.addEventListener('click', () => resetTable(10));
    let buttons = document.querySelectorAll('button');
    buttons.forEach((elem) => {
        elem.style.background = '#cf74ca';
    })
}
