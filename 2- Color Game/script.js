var numSquares = 6;
var colors = [];
var colorPicked;
var square = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var msgDisplay = document.getElementById("messageDisplay");
var h1 = document.querySelector("h1");
var newColorButton = document.getElementById("newColorButton");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < square.length; i++) {
    square[i].addEventListener("click", function () {
      var colorClicked = this.style.backgroundColor;
      if (colorClicked === colorPicked) {
        msgDisplay.textContent = "Correct";
        changeColors(colorClicked);
        h1.style.backgroundColor = colorClicked;
        newColorButton.textContent = "Play Again?";
      } else {
        msgDisplay.textContent = "Try Again";
        this.style.backgroundColor = "#232323";
      }
    });
  }
}

function reset() {
  colors = pickRandomColor(numSquares);
  colorPicked = pick();
  colorDisplay.textContent = colorPicked;
  newColorButton.textContent = "New Colors";
  msgDisplay.textContent = "";
  for (var i = 0; i < square.length; i++) {
    if (colors[i]) {
      square[i].style.display = "block";
      square[i].style.backgroundColor = colors[i];
    } else {
      square[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

newColorButton.addEventListener("click", function () {
  reset();
});

function changeColors(color) {
  for (var i = 0; i < square.length; i++) {
    square[i].style.backgroundColor = color;
  }
}
function pick() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function pickRandomColor(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }

  return arr;
}

function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// easyBtn.addEventListener("click", function(){
//     easyBtn.classList.add("selected");
//     hardBtn.classList.remove("selected");

//     numSquares = 3;
//     colors = pickRandomColor(numSquares);
//     colorPicked = pick();
//     colorDisplay.textContent = colorPicked;

//     for(var i=0; i<square.length;i++){
//         if(colors[i]){
//             square[i].style.backgroundColor = colors[i];
//         }else{
//             square[i].style.display = "none";
//         }
//     }

// })

// hardBtn.addEventListener("click", function(){
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     numSquares = 6;

//     colors = pickRandomColor(numSquares);
//     colorPicked = pick();
//     colorDisplay.textContent = colorPicked;

//     for(var i=0; i<square.length;i++){
//             square[i].style.backgroundColor = colors[i];
//             square[i].style.display = "block";
//     }
// })
