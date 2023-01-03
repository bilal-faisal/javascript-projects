// console.log("Form Validation using Regex");

const name = document.getElementById("name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const submitBtn = document.getElementById("submit");

const nameErrorField = document.getElementById("nameErrorField");
const usernameErrorField = document.getElementById("usernameErrorField");
const emailErrorField = document.getElementById("emailErrorField");
const phoneErrorField = document.getElementById("phoneErrorField");

const alertBox = document.getElementById("alert");
const alertText = document.getElementById("alertText");

let nameError = true;
let usernameError = true;
let emailError = true;
let phoneError = true;

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  validateAllFields();

  if (!nameError && !usernameError && !emailError && !phoneError) {
    alertBox.classList.remove("alert-danger");

    alertText.innerHTML = "<strong>Success!</strong> Form Submitted";
    alertBox.classList.add("alert-success");
    alertBox.classList.add("show");
    setTimeout(() => {
      alertText.innerHTML = "";
      alertBox.classList.remove("show");
    }, 3000);
  } else {
    alertBox.classList.remove("alert-success");
    alertText.innerHTML =
      "<strong>Error!</strong> Incomplete form couldn't be submitted";
    alertBox.classList.add("alert-danger");
    alertBox.classList.add("show");
    setTimeout(() => {
      alertText.innerHTML = "";
      alertBox.classList.remove("show");
    }, 3000);
  }
});

function validateAllFields() {
  validateName();
  validateUsername();
  validateEmail();
  validatePhone();
}

name.addEventListener("blur", validateName);
username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);

function validateName(e) {
  name.classList.remove("is-invalid");

  if (name.value.trim() === "") {
    nameErrorField.innerText = "Name field is mandatory";
    name.classList.add("is-invalid");
    nameError = true;
  } else {
    nameError = false;
    let regex = /^([a-zA-Z ]){3,20}$/;

    let result = regex.test(name.value.trim());
    if (!result) {
      nameError = true;
      nameErrorField.innerText =
        "Name should be alphabets having 3 to 20 characters";
      name.classList.add("is-invalid");
    }
  }
}
function validateUsername(e) {
  username.classList.remove("is-invalid");

  if (username.value.trim() === "") {
    usernameErrorField.innerText = "Username field is mandatory";
    username.classList.add("is-invalid");
    usernameError = true;
  } else {
    usernameError = false;
    let regex = /^([a-zA-Z])([0-9a-zA-Z_\-]){2,14}$/;

    let result = regex.test(username.value);
    if (!result) {
      usernameError = true;
      usernameErrorField.innerText =
        "Username must start with alphabet and have 3 to 15 characters";
      username.classList.add("is-invalid");
    }
  }
}
function validateEmail(e) {
  email.classList.remove("is-invalid");

  if (email.value.trim() === "") {
    emailErrorField.innerText = "Email field is mandatory";
    email.classList.add("is-invalid");
    emailError = true;
  } else {
    emailError = false;
    let regex = /^([a-zA-Z0-9\.\-_]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/;

    let result = regex.test(email.value);
    if (!result) {
      emailError = true;
      emailErrorField.innerText = "Incorrect Email Format";
      email.classList.add("is-invalid");
    }
  }
}
function validatePhone(e) {
  phone.classList.remove("is-invalid");

  if (phone.value.trim() === "") {
    phoneErrorField.innerText = "Phone Number field is mandatory";
    phone.classList.add("is-invalid");
    phoneError = true;
  } else {
    phoneError = false;
    let regex = /^(03)([0-9]){9}$/;

    let result = regex.test(phone.value);
    if (!result) {
      phoneError = true;
      phoneErrorField.innerText = "Phone no format: 03xxxxxxxxx";
      phone.classList.add("is-invalid");
    }
  }
}