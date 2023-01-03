// Store all data to local storage
// Give another column to delete an object
// Add a scrollbar to the view

// Constructor
function Book(book, author, type) {
  this.book = book;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {}

// Adding methods to display prototype
Display.prototype.add = function (Book) {
  let tableBody = document.getElementById("tableBody");
  let str = `<tr>
      <td>${Book.book}</td>
      <td>${Book.author}</td>
      <td>${Book.type}</td>
  </tr>`;
  tableBody.innerHTML += str;
};

Display.prototype.clear = function () {
  let addBookForm = document.getElementById("addBookForm");
  addBookForm.reset();
};

Display.prototype.validate = function (Book) {
  if (Book.book.length <= 2 || Book.book.length <= 2) {
    return false;
  }
  return true;
};
Display.prototype.show = function (type, msg) {
  let showMsgDiv = document.getElementById("showMsgDiv");
  let msgHeading;
  if (type === "success") {
    msgHeading = "Success";
  } else {
    msgHeading = "Error";
  }
  let str = `
  <div class="alert alert-${type} alert-dismissible fade show" role="alert"> 
      <center><span><strong>${msgHeading}</strong>: ${msg}</span></center>
  </div>`;
  showMsgDiv.innerHTML = str;

  setTimeout(() => {
    showMsgDiv.innerHTML = "";
  }, 3000);
};

// EventListener
let addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", addBookFunction);

let notesArr;
if (localStorage.getItem("notesArr") === null) {
  notesArr = [];
  showZeroMsg();
} else {
  notesArr = JSON.parse(localStorage.getItem("notesArr"));
  if (notesArr.length === 0) {
    showZeroMsg();
  } else {
    showAllNotes();
  }
}

function addBookFunction(e) {
  e.preventDefault();

  let bookName = document.getElementById("bookName").value;
  let authorName = document.getElementById("authorName").value;
  let type;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(bookName, authorName, type);
  console.log(book);

  notesArr.push(book);
  localStorage.setItem("notesArr", JSON.stringify(notesArr));

  let display = new Display();

  if (display.validate(book)) {
    display.clear();
    display.add(book);
    display.show("success", "Book has successfully been added");

    if (document.getElementById("zeroNote")) {
      removeZeroMsg();
    }
  } else {
    display.show(
      "warning",
      "Book couldn't be addedd due to incomplete details"
    );
  }
}

function showAllNotes() {
  let tableBody = document.getElementById("tableBody");
  notesArr.forEach((currentNote, i) => {
    let element = document.createElement("tr");

    element.innerHTML = `<tr>
    <td>${currentNote.book}</td>
    <td>${currentNote.author}</td>
    <td>${currentNote.type}</td>
</tr>`;
    tableBody.appendChild(element);
  });
}

function showZeroMsg() {
  let tableBody = document.getElementById("tableBody");
  let str = `
  <tr id="zeroNote">
      <th colspan="3">No Notes Available</th>
  </tr>`;
  tableBody.innerHTML = str;
}
function removeZeroMsg() {
  document.getElementById("zeroNote").remove();
}
