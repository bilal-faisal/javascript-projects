// Store all data to local storage
// Give another column to delete an object
// Add a scrollbar to the view

class Book {
  constructor(book, author, type) {
    this.book = book;
    this.author = author;
    this.type = type;
  }
}
class Display {
  add(Book) {
    let tableBody = document.getElementById("tableBody");
    let str = `<tr>
            <td>${Book.book}</td>
            <td>${Book.author}</td>
            <td>${Book.type}</td>
        </tr>`;
    tableBody.innerHTML += str;
  }

  clear() {
    let addBookForm = document.getElementById("addBookForm");
    addBookForm.reset();
  }
  validate(Book) {
    if (Book.book.length <= 2 || Book.book.length <= 2) {
      return false;
    }
    return true;
  }
  show(type, msg) {
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
  }
}

// EventListener
let addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", addBookFunction);

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

  let display = new Display();

  if (display.validate(book)) {
    display.clear();
    display.add(book);
    display.show("success", "Book has successfully been added");
  } else {
    display.show(
      "warning",
      "Book couldn't be addedd due to incomplete details"
    );
  }
}
