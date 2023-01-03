let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let form = document.querySelector("form");

function showError(input, message) {
  const formPorion = input.parentElement;
  formPorion.className = "formportion error";
  const msg = formPorion.querySelector("span");
  msg.innerText = message;
}
function showSuccess(input) {
  const formPorion = input.parentElement;
  formPorion.className = "formportion success";
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (username.value === "") {
    showError(username, "*Username Field can't be empty");
  } else {
    showSuccess(username);
  }

  if (email.value === "") {
    showError(email, "*Email Field can't be empty");
  } else if (!validateEmail(email.value)) {
    showError(email, "*Email is Invalid");
  } else {
    showSuccess(email);
  }

  if (password.value === "") {
    showError(password, "*Password Field can't be empty");
  } else {
    showSuccess(password);
  }

  if (password2.value === "") {
    showError(password2, "*Password Confirmation is required");
  } else {
    showSuccess(password2);
  }
});
