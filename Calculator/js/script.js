// Calculator

let screen = document.getElementById("screen");
let screenValue = screen.value;

let buttons = document.querySelectorAll("button");

function validate(e) {
  let allowedChar = "0123456789.+-/xX*cC%()=";
  let char = e.key;

  if (allowedChar.indexOf(char) == -1) {
    return false;
  }

  if (char == "x" || char == "X") {
    char = "*";
    screenValue += char;
    screen.value = screenValue;
    return false;
  }

  if (char == "=") {
    screenValue = eval(screenValue);
    screen.value = screenValue;
    return false;
  }
  
  screenValue += char;
  return true;
}

for (const btn of buttons) {
  btn.addEventListener("click", function () {
    let btnValue = btn.innerText;

    if (btnValue == "C" || btnValue == "c") {
      screenValue = "";
      screen.value = screenValue;
      screen.focus();
    } else if (btnValue == "X") {
      btnValue = "*";
      screenValue += btnValue;
      screen.value = screenValue;
    } else if (btnValue != "=") {
      screenValue += btnValue;
      screen.value = screenValue;
    } else if (btnValue == "=") {

      try{
        screenValue = eval(screenValue);
        screen.value = screenValue;
      }catch(error){
        screen.value = error.name;
      }
    }
  });
}
