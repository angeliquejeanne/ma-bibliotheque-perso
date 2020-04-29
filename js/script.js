    // SELECTING THE ELEMENT

// Form Add Book Section
const form = document.querySelector("#add-book");
const bookInput = document.querySelector("#book-input");
// List of book Section
const bookLists = document.querySelector("#book-list ul");
// Filter Section
const filter = document.querySelector("#search-books input[type=text]");
// Clear ALl
const clearAll = document.querySelector("#clear-all span");


// EVENT LISTENER CONTROLLER
loadEventListener();
function loadEventListener() {
  // Adding the book into ul
  form.addEventListener("submit", addBook);
  // Delete the book using delegation
  bookLists.addEventListener("click", deleteBook);
  // LineThrough
  bookLists.addEventListener("click", lineThroughs);
  // Filter Section
  filter.addEventListener("keyup", filterBooks);
  // Clear All Book
  clearAll.addEventListener("click", clearAllBook);
  // Get book from local storage
  document.addEventListener("DOMContentLoaded", getBooks);
}

// Get book from local storage
function getBooks() {
  let books;
  // Check local storage
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.forEach(function(book) {
    // Create the element li
    const li = document.createElement("li");
    const bookName = document.createElement("span");
    const deleteBtn = document.createElement("span");

    // Add class name
    li.classList.add("listss");
    bookName.classList.add("book-name");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-delete");

    // Add content to the element
    bookName.textContent = book;
    deleteBtn.textContent = "Delete";

    // Append the element to the li
    li.appendChild(bookName);
    li.appendChild(deleteBtn);

    // Append the li into ul
    bookLists.appendChild(li);
  });
}

// ADD BOOK FUNCTION

function addBook(e) {
  // check the input
  if (bookInput.value === "") {
    alert("Please Add Your Book");
  } else {
    console.log(bookInput.value);
    // Create the element li
    const li = document.createElement("li");
    const bookName = document.createElement("span");
    const deleteBtn = document.createElement("span");

    // Add class name
    li.classList.add("listss");
    bookName.classList.add("book-name");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-delete");

    // Add content to the element
    bookName.textContent = bookInput.value;
    deleteBtn.textContent = "Delete";

    // Append the element to the li
    li.appendChild(bookName);
    li.appendChild(deleteBtn);

    // Append the li into ul
    bookLists.appendChild(li);

    // Store input in LS
    storeBookInLocalStorage(bookInput.value);

    // Clear Back The Input
    bookInput.value = "";

    clearAll.style.display = "inline-block";

    // Prevent Default Behaviour of Form
    e.preventDefault();
  }
}

// Store In Local Storage
function storeBookInLocalStorage(book) {
  let books;
  // Check local storage
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  // Push the book into books array
  books.push(book);
  // set the value of books into json
  localStorage.setItem("books", JSON.stringify(books));
}

// LineThrough
function lineThroughs(e) {
  if (e.target.classList.contains("listss")) {
    if (
      e.target.firstElementChild.style.textDecorationLine === "line-through"
    ) {
      e.target.firstElementChild.style.textDecorationLine = "none";
      e.target.firstElementChild.style.color = "black";
      e.target.style.background = "white";
    } else {
      e.target.firstElementChild.style.textDecorationLine = "line-through";
      e.target.firstElementChild.style.color = "#b8b8b8";
      e.target.style.background = "#f4f4f4";
    }
  }
}

// Delete the books
function deleteBook(e) {
  //  target the buttons
  if (e.target.classList.contains("btn-delete")) {
    // Remove the parent element of button which is li
    if (
      confirm("This action will remove your book completely. Are You Sure ?")
    ) {
      e.target.parentElement.remove();

      // Remove from the local storage too
      removeBookFromLocalStorage(e.target.previousSibling);
    }
  }
}

function removeBookFromLocalStorage(bookItem) {
  let books;
  // Check local storage
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  books.forEach(function(book, index) {
    if (bookItem.textContent === book) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
}

// FILTER THE BOOKS

function filterBooks(e) {
  // Take the value from the input and convert into lower case
  const words = e.target.value.toLowerCase();
  // Get the book list
  const books = document.querySelectorAll("#book-list li");
  // Loop Through each book li
  books.forEach(function(book) {
    const booksText = book.firstElementChild.textContent;
    //  Compare the booksText content with words
    if (booksText.toLowerCase().indexOf(words) != -1) {
      book.style.display = "flex";
    } else {
      book.style.display = "none";
    }
  });
}

// CLEAR ALL BOOK
function clearAllBook() {
  bookLists.innerHTML = "";
  clearAll.style.display = "none";

  // clear all from ls
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}
