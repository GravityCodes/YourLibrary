const BookInformationBtn = document.querySelectorAll(".add-btn");
const dialog = document.querySelector("dialog");

const bookContainer = document.querySelector("#book-container");
const bookForm = document.querySelector("#add-book-form");
let count = 0;

const myLibrary = [];

// Book function constructor
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
    let bookRead = document.querySelector("#read").checked;

    let book = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    return book;
}


//Add new book to library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

//Add book to page

function addBookToPage(book) {
    ++count;
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    let addBookTitle = document.createElement("p");
    addBookTitle.setAttribute("class", "book-title");

    let addBookAuthor = document.createElement("p");
    addBookAuthor.setAttribute("class", "book-author");

    let addBookPages = document.createElement("p");
    addBookPages.setAttribute("class", "book-pages");

    let addBookLabel = document.createElement("label");
    addBookLabel.setAttribute("for", `book-read${count}`);
    addBookLabel.setAttribute("class", "book-label-read");
    
    let addBookInput = document.createElement("input");
    addBookInput.setAttribute("type", "checkbox");
    addBookInput.setAttribute("name", "read");
    addBookInput.setAttribute("id", `book-read${count}`);


    addBookTitle.textContent = book.name;
    addBookAuthor.textContent = book.author;
    addBookPages.textContent = book.pages + " pages";
    addBookLabel.textContent = "read";
    addBookInput.checked = book.read;

    [addBookTitle, addBookAuthor, addBookPages, addBookLabel, addBookInput].forEach((book) => bookCard.appendChild(book));

    bookContainer.appendChild(bookCard);
}


// Open dialog to enter book information
BookInformationBtn.forEach((btn) => {
    btn.addEventListener('click', () => dialog.showModal());
});

//Create new book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    dialog.close();
    // newBook = createBook();

    

    addBookToLibrary(createBook());
    addBookToPage(myLibrary[myLibrary.length - 1]);

});

