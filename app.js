document.addEventListener("DOMContentLoaded", () => {
  const butterfly = document.querySelector(".butterfly");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  let butterflyLeft = 220;
  let butterflyBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 430;

  function startGame() {
    butterflyBottom -= gravity;
    butterfly.style.bottom = butterflyBottom + "px";
    butterfly.style.left = butterflyLeft + "px";
  }
  let timerButterfly = setInterval(startGame, 20); // calls startGame every 20 milliseconds //

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

  function generateWebs() {
    let websLeft = 500;
    let randomHeight = Math.random() * 60;
    let websBottom = randomHeight;
    const webs = document.createElement("div");
    const topWebs = document.createElement("div");
    if (!isGameOver) {
      webs.classList.add("webs"); // adds class
      topWebs.classList.add("webs");
    }
    gameDisplay.appendChild(webs); // append webs div to game container
    gameDisplay.appendChild(topWebs);
    webs.style.left = websLeft + "px";
    topWebs.style.left = websLeft + "px";
    webs.style.bottom = websBottom + "px";
    topWebs.style.bottom = websBottom + gap + "px";

    function moveWebs() {
      websLeft -= 2;
      webs.style.left = websLeft + "px";

      if (websLeft === -60) {
        clearInterval(timerWebs); // stop the webs timer setinterval from executing
        gameDisplay.removeChild(webs); // remove webs
      }
      if (
        (websLeft > 200 &&
          websLeft < 280 &&
          butterflyLeft === 220 &&
          butterflyBottom < websBottom + 153) ||
        butterflyBottom === 0
      ) {
        gameOver();
        clearInterval(timerWebs);
      }
    }
    let timerWebs = setInterval(moveWebs, 20);
    if (!isGameOver) {
      setTimeout(generateWebs, 3000); // generates webs every 3 seconds
    }
  }
  generateWebs();

  function gameOver() {
    clearInterval(timerButterfly);
    console.log("game over");
    isGameOver = true;
    document.removeEventListener("keyup", control); // remove event listener at keyup
  }
});
