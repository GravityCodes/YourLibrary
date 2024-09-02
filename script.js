const myLibrary = [];
const addBookBtn = document.querySelectorAll(".add-btn");
const dialog = document.querySelector("dialog")
// Book  function constructor
function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary() {
    
}


addBookBtn.forEach((btn) => {
    btn.addEventListener('click', () => dialog.showModal());
});