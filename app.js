document.addEventListener("DOMContentLoaded", () => {
  const butterfly = document.querySelector(".butterfly");
  const gameDisplay = document.querySelector(".game-container");
  const grass = document.querySelector(".grass");

  let butterflyLeft = 231;
  let butterflyBottom = 105;
  let gravity = 2;
  let isGameOver = false;
  let gap = 452;

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
    if (butterflyBottom < 526) {
      butterflyBottom += 53;
    }
    butterfly.style.bottom = butterflyBottom + "px";
    console.log(butterflyBottom);
  }
  document.addEventListener("keyup", control); // "keyup" - when any key is pressed

  function generateWebs() {
    let websLeft = 526;
    let randomHeight = Math.random() * 63;
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
      topWebs.style.left = websLeft + "px";

      if (websLeft === -63) {
        clearInterval(timerWebs); // stop the webs timer setinterval from executing
        gameDisplay.removeChild(webs); // remove webs
        gameDisplay.removeChild(topWebs);
      }
      if (
        (websLeft > 210 &&
          websLeft < 295 &&
          butterflyLeft === 231 &&
          (butterflyBottom < websBottom + 161 ||
            butterflyBottom > websBottom + gap - 210)) ||
        butterflyBottom <= 0
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
