
const myLibrary = [];
const title = document.querySelector('#bookTitle');
const author = document.querySelector('#bookAuthor');
const pageNum = document.querySelector('#pagesNumber');
const form = document.querySelector('form');
const readStatus = form.elements["read-status"];
const bookSection = document.querySelector('.bookSection');
const dialog = document.querySelector('#formDialog')
const addMe = document.querySelector('#addMe')

class Books {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;

    }
}

function addBookToLibrary(bookObj) {
    const titlesStore = myLibrary.map((book) => book['title']);
    if (!titlesStore.includes(bookObj['title'])) {
        myLibrary.push(bookObj);
        displayBookAdded(myLibrary[myLibrary.length - 1])
    }
};


function displayBookAdded(lib) {

    // for (let lib of library) {
    const bookAdd = document.createElement('div');
    bookAdd.className = 'book';
    for (let i = 0; i < 3; i++) {
        const p1 = document.createElement('p')
        const dispInfo = Object.entries(lib)[i];
        p1.textContent = dispInfo[0][0].toLocaleUpperCase() + dispInfo[0].slice(1) + ':' + dispInfo[1]
        bookAdd.appendChild(p1)
        bookSection.appendChild(bookAdd)
    }
    const removeBook = document.createElement('button');
    const p2 = document.createElement('p')
    const toggleRead = document.createElement('button')
    toggleRead.textContent = 'Toggle Read'

    removeBook.setAttribute('name', `${myLibrary.length}`)
    removeBook.textContent = 'Del'
    p2.textContent = lib.read

    toggleRead.addEventListener('click', () => {
        lib.read = lib.read == 'Yes' ? 'No' : 'Yes';
        p2.textContent = lib.read;

    })

    const readtoggle = document.createElement('div');
    readtoggle.appendChild(p2);
    readtoggle.appendChild(toggleRead);
    readtoggle.appendChild(removeBook);
    bookAdd.appendChild(readtoggle)

    removeBook.addEventListener('click', () => {
        bookAdd.remove();
        delete myLibrary[removeBook.name - 1]

    })
}


form.addEventListener('submit', (event) => {
    if (title.value && author.value && pageNum.value && readStatus.value) {
        const newBook = new Books(title.value, author.value, pageNum.value, readStatus.value)
        addBookToLibrary(newBook);
        dialog.close();
    }
    else {
        alert('Fill in all details')
    }
    event.preventDefault();
})

addMe.addEventListener('click', () => dialog.showModal())






