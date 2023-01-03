"use strict";

let score_0 = document.querySelector("#score0");
let score_1 = document.querySelector("#score1");
const diceElement = document.querySelector("#dice");
const btn_reset = document.querySelector("#btn-reset");
const btn_dice = document.querySelector("#btn-dice");
const btn_hold = document.querySelector("#btn-hold");
const current_score_p0 = document.querySelector("#current-score-p0");
const current_score_p1 = document.querySelector("#current-score-p1");
const player_1 = document.querySelector(".player-0");
const player_2 = document.querySelector(".player-1");

let currentScore, activePlayer, playing;

function init() {
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score_0.innerText = 0;
  score_1.innerText = 0;
  current_score_p0.innerText = 0;
  current_score_p1.innerText = 0;

  diceElement.classList.add("hidden");
  player_1.classList.remove("player-winner");
  player_2.classList.remove("player-winner");
  player_1.classList.add("active-player");
  player_2.classList.remove("active-player");
}

function switchPlayer() {
  currentScore = 0;
  document.querySelector(
    `#current-score-p${activePlayer}`
  ).innerText = currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player_1.classList.toggle("active-player");
  player_2.classList.toggle("active-player");
}

btn_dice.addEventListener("click", function () {
  if (playing) {
    // Generate a random no
    const diceNo = Math.trunc(Math.random() * 6) + 1;

    // Display Dice
    diceElement.classList.remove("hidden");
    diceElement.src = `images/dice-${diceNo}.png`;

    // Check if 1
    if (diceNo !== 1) {
      // Add to current score
      currentScore += diceNo;
      document.querySelector(
        `#current-score-p${activePlayer}`
      ).innerText = currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

init();

btn_hold.addEventListener("click", function () {
  if (playing) {
    let totalScore =
      +document.querySelector(`#score${activePlayer}`).innerText + currentScore;
    document.querySelector(`#score${activePlayer}`).innerText = totalScore;

    if (totalScore >= 50) {
      playing = false;
      diceElement.classList.add("hidden");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btn_reset.addEventListener("click", init);

// Instructions code

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-modal");
const showBtn = document.querySelector(".show-modal");

function openModal() {
  modal.classList.remove("hidden1");
  overlay.classList.remove("hidden1");
}
function closeModal() {
  modal.classList.add("hidden1");
  overlay.classList.add("hidden1");
}

showBtn.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden1")) {
    closeModal();
  }
});
