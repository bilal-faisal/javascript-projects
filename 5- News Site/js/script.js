let newsContainer = document.getElementById("accordionExample");

let xhr = new XMLHttpRequest();

xhr.open(
  "GET",
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=20880544a88b4c8fab28698c931d4409",
  true
);

xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    console.log(articles);

    let str = "";

    for (const i in articles) {
      let news = `
            <div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
              <button id="button${i}" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
              <b>News ${+i + 1}:</b>&nbsp; ${articles[i].title}
              </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
              <div class="accordion-body" style="background-color:#F5F9FF">

              ${articles[i].description}
              </div>
            </div>
          </div>`;

      str += news;
    }

    newsContainer.innerHTML = str;

    var element1 = document.getElementById("button0");
    element1.classList.remove("collapsed");
    var element2 = document.getElementById("collapse0");
    element2.classList.add("show");
  } else {
    newsContainer.innerHTML = "Sorry!  Some error occured. Couldn't load news";
    console.log("Some error occured");
  }
};

xhr.send();
