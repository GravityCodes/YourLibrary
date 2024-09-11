/*
****************** OLD CODE ************************************ 
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
**********************************************************************************************
*/

/* New Code using ES6 Classes */

class Book {
    //Static property to keep track of book id.
    static id = 1

    constructor(name, author, pages, isRead) {
        this.id = Book.id++
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    getIsRead = () => this.read;
    changeRead = () => this.read = !this.read;
}

const libraryController = (function (){
    
    let library = [];

    function addNewBook(name,author,pages,isRead){
        return library.push(new Book(name, author, pages, isRead));
    }

    function removeBookById(id) {
        index = library.findIndex(book => book.id === id);
        library.splice(index, 1);
    }

    function getLatestBook () {return library.at(-1)};

    function changeBookReadStatusById (id) {
        index = library.findIndex(book => book.id === id);
        library.at(index).changeRead();
     }

    return {addNewBook, library, removeBookById, getLatestBook, changeBookReadStatusById}
})();

const screenController = (function () {
    const $openDialog = document.querySelectorAll(".add-btn");
    const $dialog = document.querySelector("dialog");
    const dialogCancelBtn = "cancel-btn";
    const $bookContainer = document.querySelector("#book-container");
    const $bigButton = document.querySelector(".big-btn");
    const library = libraryController;

    function createBookCard(name, author, pages, isRead, Id) {

        let bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");
        bookCard.setAttribute("id", `book-${Id}`);
    
        let addBookTitle = document.createElement("p");
        addBookTitle.setAttribute("class", "book-title");
    
        let addBookAuthor = document.createElement("p");
        addBookAuthor.setAttribute("class", "book-author");
    
        let addBookPages = document.createElement("p");
        addBookPages.setAttribute("class", "book-pages");
    
        let addBookLabel = document.createElement("label");
        addBookLabel.setAttribute("for", `book-read${Id}`);
        addBookLabel.setAttribute("class", "book-label-read");
        
        let addBookInput = document.createElement("input");
        addBookInput.setAttribute("type", "checkbox");
        addBookInput.setAttribute("name", "read");
        addBookInput.setAttribute("id", `book-read${Id}`);
        addBookInput.setAttribute("class", "read-checkbox");
    
        let bookRemoveBtn = document.createElement("button");
        bookRemoveBtn.setAttribute("type", "button");
        bookRemoveBtn.setAttribute("class", "remove-btn");
        bookRemoveBtn.textContent = "Remove";
    
        addBookTitle.textContent = name;
        addBookAuthor.textContent = author;
        addBookPages.textContent = pages + " pages";
        addBookLabel.textContent = "read";
        addBookInput.checked = isRead;
    
        [addBookTitle, addBookAuthor, addBookPages, addBookLabel, addBookInput, bookRemoveBtn].forEach((bookElement) => bookCard.appendChild(bookElement));
    
        $bookContainer.appendChild(bookCard);
    }

    function removeBigButton () {
        $bigButton.parentElement.removeChild($bigButton);
    }

    function closeDialog (e) {
        if(e.target.id === dialogCancelBtn){
            $dialog.close();
        }
    }
    $dialog.addEventListener('click', closeDialog);

    function formSubmitHandler (e) {
        e.preventDefault();

        // Turn the values from the form
        // into variables for easy use.
        let name = e.target[1].value;
        let author = e.target[2].value;
        let pages = e.target[3].value;
        let isRead = e.target[4].checked;

        //Add new book to the library and screen
        library.addNewBook(name, author,pages,isRead);
        createBookCard(name, author, pages, isRead, library.getLatestBook().id);
        
        removeBigButton();
        $dialog.close()
    }
    $dialog.addEventListener('submit', formSubmitHandler);


    function openDialog() {
        $dialog.showModal();
    }
    $openDialog.forEach((btn) => btn.addEventListener('click', openDialog));


    function bookContainerHandler(e) {
        bookId = e.srcElement.parentElement.id;

        if(e.target.textContent === "Remove"){
           library.removeBookById(bookId);
           $bookContainer.removeChild(e.srcElement.parentElement);
        }
        else if(e.target.className === "read-checkbox") {
            library.changeBookReadStatusById(bookId);
        }
        else {
            return false;
        }
        
    }
    $bookContainer.addEventListener('click', bookContainerHandler);

})();