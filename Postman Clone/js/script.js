// Postman clone

let contentTypeArray = document.querySelectorAll("input[name=contentType]");
let requestTypeArray = document.querySelectorAll("input[name=requestType]");

let parameterBox = document.getElementById("parameterBox");
let jsonBox = document.getElementById("jsonBox");
let contentTypeBox = document.getElementById("contentTypeBox");

contentTypeBox.style.display = "none";
parameterBox.style.display = "none";
jsonBox.style.display = "none";

requestTypeArray.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let value = e.target.value;

    if (value == "GET") {
      contentTypeBox.style.display = "none";
      jsonBox.style.display = "none";
      parameterBox.style.display = "none";
    } else if (value == "POST") {
      contentTypeBox.style.display = "block";

      let contentType = document.querySelector(
        "input[name=contentType]:checked"
      ).value;
      setContentBox(contentType);

      contentTypeArray.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          let value = e.target.value;
          setContentBox(value);
        });
      });
    }
  });
});

function setContentBox(value) {
  if (value == "param") {
    parameterBox.style.display = "block";
    jsonBox.style.display = "none";
  } else if (value == "JSON") {
    jsonBox.style.display = "block";
    parameterBox.style.display = "none";
  }
}

let addParameterButton = document.getElementById("addParameterButton");

let parameterCount = 0;

addParameterButton.addEventListener("click", function () {
  const div = document.createElement("div");

  div.innerHTML = `<div class="row">
                        <div class="col-md-2 offset-md-1">
                            <label for="inputURL" class="col-form-label">Parameter ${
                              parameterCount + 2
                            }</label>
                        </div>
                        <div class="col-md-8">
                            <form class="row g-3">
                            <div class="col-auto">
                                <input type="text" class="form-control" id="inputParameterKey" placeholder="Key ${
                                  parameterCount + 2
                                }">
                            </div>
                            <div class="col-auto">
                                <input type="text" class="form-control" id="inputParameterValue" placeholder="Value ${
                                  parameterCount + 2
                                }">
                            </div>
                            <div class="col-auto">
                                <button type="button" id="minusParameterButton" class="btn btn-primary mb-3">-</button>
                            </div>
                            </form>
                        </div>
                    </div>`;

  parameterCount++;
  parameterBox.appendChild(div);

  let minusParameterButton = document.querySelectorAll("#minusParameterButton");

  minusParameterButton.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      let parentRow = e.target.parentNode.parentNode.parentNode.parentNode;
      parentRow.style.display = "none";
    });
  });
});

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
  let textareaResponse = document.getElementById("textareaResponse");
  textareaResponse.value = "";

  let inputURL = document.getElementById("inputURL").value;
  let requestType = document.querySelector(
    "input[name=requestType]:checked"
  ).value;

  let contentType = document.querySelector(
    "input[name=contentType]:checked"
  ).value;
  let noData = true;
  let data = "";
  if (contentType == "JSON") {
    data = document.getElementById("textareaRequestJSON").value;
    if (data.trim() != "") {
      noData = false;
    }
  } else if (contentType == "param") {
    // data =
    let keys = document.querySelectorAll("#inputParameterKey");
    let values = document.querySelectorAll("#inputParameterValue");

    data = `{`;
    for (let i = 0; i <= parameterCount; i++) {
      if (keys[i].value != "" && values[i].value != "") {
        noData = false;
        data += `"${keys[i].value}":"${values[i].value}",`;
      }
    }
    data = data.slice(0, -1); // removing last ,
    data += `}`;
  }

  let allow = true;
  if (inputURL.trim() == "") {
    alert("URL is empty");
    allow = false;
  } else if (!validateUrl(inputURL)) {
    alert("URL is invalid");
    allow = false;
  }

  if (allow) {

    if (requestType == "GET") {
      textareaResponse.value = "Fetching Response...";
      console.log(inputURL);
      // Proceed GET request
      {
        fetch(inputURL)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            result = JSON.stringify(result, null, 4);
            textareaResponse.value = result;
          })
          .catch((error) => {
            textareaResponse.value = "An error has occured";
          });
      }
    } else if (requestType == "POST") {
      // validate data valiable
      {
        if (noData) {
          alert("Data is empty");
          allow = false;
        }
        try {
          JSON.parse(data)
        } catch (error) {
          alert("Data is invalid");
          allow = false;
        }
      }
      // If everything is OK, proceed POST request
      if (allow) {
        textareaResponse.value = "Fetching Response...";
        fetch(inputURL, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            result = JSON.stringify(result, null, 4);

            textareaResponse.value = result;
          })
          .catch((error) => {
            textareaResponse.value = "An error has occured";
          });
      }
    }
  }
});

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

// GET TEST
// https://reqres.in/api/users/2

// POST Test
// http://dummy.restapiexample.com/api/v1/create
// {"name":"harglgbhh4327485945","salary":"123","age":"23"}
