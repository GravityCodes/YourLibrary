const addBookInformationBtn = document.querySelectorAll(".add-btn");
const dialog = document.querySelector("dialog");

const addBookForm = document.querySelector("#add-book-form")

const myLibrary = [];

// Book  function constructor
function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary() {
    
}

// Open dialog to enter book information
addBookInformationBtn.forEach((btn) => {
    btn.addEventListener('click', () => dialog.showModal());
});

//