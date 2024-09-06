const BookInformationBtn = document.querySelectorAll(".add-btn");
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancel-btn");
const bookContainer = document.querySelector("#book-container");
const bookForm = document.querySelector("#add-book-form");
const bigButton = document.querySelector(".big-btn");

let count = 0;

let myLibrary = [];

// Book function constructor
function Book(name, author, pages, read, bookId){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookId = bookId;
}




//Create new book instance function
function createBook(){
    let bookTitle = document.querySelector("#Title").value;
    let bookAuthor = document.querySelector("#Author").value;
    let bookPages = document.querySelector("#pages").value;
    let bookRead = document.querySelector("#read").checked;
    let bookId;
        

    let book = new Book(bookTitle, bookAuthor, bookPages, bookRead, bookId);

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
    bookCard.setAttribute("id", `book-${count}`);

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
    addBookInput.setAttribute("class", "read-checkbox");

    let bookRemoveBtn = document.createElement("button");
    bookRemoveBtn.setAttribute("type", "button");
    bookRemoveBtn.setAttribute("class", "remove-btn");
    bookRemoveBtn.textContent = "Remove";

    addBookTitle.textContent = book.name;
    addBookAuthor.textContent = book.author;
    addBookPages.textContent = book.pages + " pages";
    addBookLabel.textContent = "read";
    addBookInput.checked = book.read;
    book.bookId = `book-${count}`;


    [addBookTitle, addBookAuthor, addBookPages, addBookLabel, addBookInput, bookRemoveBtn].forEach((bookElement) => bookCard.appendChild(bookElement));

    bookContainer.appendChild(bookCard);

    
    
}




// Open dialog to enter book information
BookInformationBtn.forEach((btn) => {
    btn.addEventListener('click', () => dialog.showModal());
});

//quit dialog
cancelBtn.addEventListener('click', () => dialog.close());

//Create new book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    dialog.close();
    // newBook = createBook();


    addBookToLibrary(createBook());
    addBookToPage(myLibrary[myLibrary.length - 1]);    
    bigButton.remove();
    
    });


//Remove book
bookContainer.addEventListener('click', e => {
    if(e.target.className === "remove-btn") {
        bookContainer.removeChild(e.target.parentElement);

        myLibrary = myLibrary.filter((book) => book.bookId !== e.target.parentElement.id);
    }
});
