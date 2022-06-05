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

  function control(e) {
    if (e.keyCode === 32) {
      // if event key is spacebar - spacebar keycode is 32
      fly();
    }
  }

  function fly() {
    if (butterflyBottom < 500) {
      butterflyBottom += 50;
    }
    butterfly.style.bottom = butterflyBottom + "px";
    console.log(butterflyBottom);
  }
  document.addEventListener("keyup", control); // "keyup" - when any key is pressed
});
