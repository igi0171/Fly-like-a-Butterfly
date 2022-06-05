document.addEventListener("DOMContentLoaded", () => {
  const butterfly = document.querySelector(".butterfly");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  let butterflyLeft = 220;
  let butterflyBottom = 100;
  let gravity = 2;

  function startGame() {
    butterflyBottom -= gravity;
    butterfly.style.bottom = butterflyBottom + "px";
    butterfly.style.left = butterflyLeft + "px";
  }
  let timerId = setInterval(startGame, 20); // calls startGame every 20 milliseconds //
});
