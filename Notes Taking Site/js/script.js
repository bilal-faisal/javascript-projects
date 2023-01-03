// Notes Taking site
// without

const addNoteBtn = document.querySelector(".addNoteBtn");

let notes = document.querySelector("#notes");
let notesArr;

function deleteElem(num) {
  document.querySelectorAll(`.note`).forEach((el) => {
    el.remove();
  });
  console.log(num);
  notesArr.splice(num - 1, 1);
  localStorage.setItem("notesArr", JSON.stringify(notesArr));

  notesArr.forEach((currentNote, i) => {
    let element = document.createElement("div");
    element.className = `col-md-4 col-6 Note-${i + 1} note`;
    element.innerHTML = `<div class='my-3 card noteCard'>
      <div class='card-body'>
          <h5 class='card-title'>Note ${i + 1}</h5>
          <p class='card-text'>${currentNote}</p>
          <button class="btn btn-primary" onclick='deleteElem(${
            i + 1
          })'>Delete</button>
      </div>
  </div>`;
    notes.appendChild(element);
  });
}

if (localStorage.getItem("notesArr") === null) {
  notesArr = [];
  localStorage.setItem("notesArr", JSON.stringify(notesArr));
  console.log("ab ayaa");
} else {
  console.log("phle se tha");
  notesArr = JSON.parse(localStorage.getItem("notesArr"));

  notesArr.forEach((currentNote, i) => {
    let element = document.createElement("div");
    element.className = `col-md-4 col-6 Note-${i + 1} note`;
    element.innerHTML = `<div class='my-3 card noteCard'>
    <div class='card-body'>
        <h5 class='card-title'>Note ${i + 1}</h5>
        <p class='card-text'>${currentNote}</p>
        <button class="btn btn-primary" onclick='deleteElem(${
          i + 1
        })'>Delete</button>
    </div>
</div>`;
    notes.appendChild(element);
  });
}

addNoteBtn.addEventListener("click", function () {
  let currentNote = document.querySelector("#addText").value;
  if (currentNote.trim() != "") {
    notesArr.push(currentNote);
    let element = document.createElement("div");
    element.className = `col-md-4 col-6 Note-${notesArr.length} note`;
    element.innerHTML = `<div class='my-3 card noteCard'>
    <div class='card-body'>
        <h5 class='card-title'>Note ${notesArr.length}</h5>
        <p class='card-text'>${currentNote}</p>
        <button class="btn btn-primary" onclick='deleteElem(${notesArr.length})'>Delete</button>
    </div>
</div>`;
    notes.appendChild(element);

    localStorage.setItem("notesArr", JSON.stringify(notesArr));

    document.querySelector("textarea#addText").value = "";
  }
});

const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
searchBtn.addEventListener("click", function () {
  let searchStr = document.querySelector("#searchStr").value.trim();
  document.querySelector("#searchStr").value = searchStr;
  if (searchStr != "") {
    searchBtn.style.display = "none";
    clearBtn.style.display = "block";
    document.querySelector("#searchStr").setAttribute("disabled", "true");

    document.querySelectorAll(`.note`).forEach((el, i) => {
      if (notesArr[i].indexOf(searchStr) === -1) {
        el.style.display = "none";
      }
    });
  }
});

clearBtn.addEventListener("click", function () {
  document.querySelector("#searchStr").value = "";

  searchBtn.style.display = "block";
  clearBtn.style.display = "none";

  document.querySelectorAll(`.note`).forEach((el, i) => {
    el.style.display = "block";
  });
  document.querySelector("#searchStr").removeAttribute("disabled", "true");
});
