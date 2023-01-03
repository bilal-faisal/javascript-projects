// Notes Taking site
// with title

const addNoteBtn = document.querySelector(".addNoteBtn");
const zeroNote1 = document.querySelector(".zeroNote1");
const zeroNote2 = document.querySelector(".zeroNote2");
const searchStrBox = document.querySelector("#searchStr");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const notesBoxMain = document.querySelector("#notesBoxMain");
const addTitleTextarea = document.querySelector("#addTitle");
const addTextTextarea = document.querySelector("#addText");

let notesArr;

// in case of no local storage var present
if (localStorage.getItem("notesArr") === null) {
  notesArr = [];
  zeroNote1.style.display = "block";
}
// in case of local storage var present already
else {
  notesArr = JSON.parse(localStorage.getItem("notesArr"));
  if (notesArr.length === 0) {
    zeroNote1.style.display = "block";
  } else {
    showAllNotes();
  }
}

// Event Listeners
addNoteBtn.addEventListener("click", function () {
  let currentNoteTitle = addTitleTextarea.value;
  let currentNotePara = addTextTextarea.value;

  // titlecase conversion
  currentNoteTitle = titleCase(currentNoteTitle);

  if (currentNotePara.trim() != "" && currentNoteTitle.trim() != "") {
    notesArr.push([currentNoteTitle, currentNotePara]);

    addSingleElement(currentNoteTitle, currentNotePara);

    localStorage.setItem("notesArr", JSON.stringify(notesArr));

    addTitleTextarea.value = "";
    addTextTextarea.value = "";
    zeroNote1.style.display = "none";
  }
});

searchStr.addEventListener("input", function () {
  let matchedItems = false;
  zeroNote1.style.display = "none";
  zeroNote2.style.display = "block";
  let searchStr = searchStrBox.value.trim();
  searchStrBox.value = searchStr;

  searchStr = titleCase(searchStr);
  document.querySelectorAll(".note").forEach((el, i) => {
    if (notesArr[i][0].indexOf(searchStr) === -1) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
      matchedItems = true;
    }
  });

  if (matchedItems === true) {
    zeroNote2.style.display = "none";
  }
});

// Functions
function deleteElem(num) {
  document.querySelectorAll(".note").forEach((el) => {
    el.remove();
  });
  console.log(num);
  notesArr.splice(num - 1, 1);
  localStorage.setItem("notesArr", JSON.stringify(notesArr));

  showAllNotes();

  if (notesArr.length === 0) {
    zeroNote1.style.display = "block";
  }
}

function titleCase(str) {
  let arr = str.split(" ");
  let newText = "";
  for (let x of arr) {
    newText += x.charAt(0).toUpperCase() + x.toLowerCase().slice(1) + " ";
  }
  return newText.slice(0, newText.length - 1);
}

function addSingleElement(currentNoteTitle, currentNotePara) {
  let element = document.createElement("div");
  element.className = `col-md-4 col-6 note`;
  element.innerHTML = `<div class='my-3 card noteCard'>
    <div class='card-body'>
        <h5 class='card-title'>${currentNoteTitle}</h5>
        <p class='card-text'>${currentNotePara}</p>
        <button class="btn btn-primary" onclick='deleteElem(${notesArr.length})'>Delete</button>
    </div>
</div>`;
  notesBoxMain.appendChild(element);
}

function showAllNotes() {
  notesArr.forEach((currentNote, i) => {
    let element = document.createElement("div");
    element.className = `col-md-4 col-6 note`;
    element.innerHTML = `<div class='my-3 card noteCard'>
        <div class='card-body'>
            <h5 class='card-title'>${currentNote[0]}</h5>
            <p class='card-text'>${currentNote[1]}</p>
            <button class="btn btn-primary" onclick='deleteElem(${
              i + 1
            })'>Delete</button>
        </div>
    </div>`;
    notesBoxMain.appendChild(element);
  });
}
