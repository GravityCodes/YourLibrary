const BookInformationBtn = document.querySelectorAll(".add-btn");
const dialog = document.querySelector("dialog");

const BookForm = document.querySelector("#add-book-form")

const myLibrary = [];

// Book  function constructor
function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Create new book instance function
function createBook(){
    let bookTitle = document.querySelector("#Title").value;
    let bookAuthor = document.querySelector("#Author").value;
    let bookPages = document.querySelector("#pages").value;
    let bookRead = document.querySelector("read");

    let book = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    return book;
}


//Add new book to library
function addBookToLibrary(book) {
    myLibrary.push(book);
}


// Open dialog to enter book information
BookInformationBtn.forEach((btn) => {
    btn.addEventListener('click', () => dialog.showModal());
});

//Create new book
BookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    dialog.close();
    newBook = createBook();

    addBookToLibrary(newBook);
});

