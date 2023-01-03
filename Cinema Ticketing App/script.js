"use strict";
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".price");
const movieSelect = document.getElementById("movie");
let ticketPrice = Number(movieSelect.value);

populatedUI();
// Pull data to local storage to build UI
function populatedUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedSeats();
});

function updateSelectedSeats() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const countSelectedSeats = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((singleSeat) =>
    [...seats].indexOf(singleSeat)
  );

  //   const seatsIndex = [...selectedSeats].map(function (singleSeat) {
  //     return [...seats].indexOf(singleSeat);
  //   });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = countSelectedSeats;
  total.innerText = ticketPrice * countSelectedSeats;
}

// func to save selested movie and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeats();
});

// calculate initial no of seats and total price
updateSelectedSeats();
