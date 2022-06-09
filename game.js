document.addEventListener("click", startGame);
document.getElementById("score").innerHTML = `1. click to start the game`;
let messageCount = 0;
let collideCount = 0;

function startGame() {
  document.removeEventListener("click", startGame);
  document.querySelector("#instruction").innerText = "";
  document.querySelector("#enjoy").innerText =
    "enjoy the video while playing the game :)";
  const butterfly = document.querySelector(".butterfly");
  const gameDisplay = document.querySelector(".game-container");
  const grass = document.querySelector(".grass");
  grass.classList.add("grass-moving");
  grass.classList.remove("grass");

  let butterflyLeft = 231;
  let butterflyBottom = 105;
  let gravityMagnitude = 1;
  let isGameOver = false;
  let gap = 452;
  let score = 0;

  function gravity() {
    butterflyBottom -= gravityMagnitude;
    butterfly.style.bottom = butterflyBottom + "px";
    butterfly.style.left = butterflyLeft + "px";
  }
  let timerGravity = setInterval(gravity, 20); // gravity effect every 20 milliseconds //

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
    // console.log(butterflyBottom);
  }
  document.addEventListener("keyup", control); // "keyup" - when any key is pressed

  function generateWebs() {
    let websLeft = 526;
    let randomHeight = Math.random() * 126;
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
    if (!isGameOver) {
      document.getElementById("score").innerHTML = `Score : ${score}`;
      score++;
      // console.log(score);
    }

    function moveWebs() {
      websLeft -= 2;
      webs.style.left = websLeft + "px";
      topWebs.style.left = websLeft + "px";

      if (websLeft === -63) {
        clearInterval(timerFlight); // stop the webs timer setinterval from executing
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
        if (collideCount === 0) {
          gameOver("Game over!");
          clearInterval(timerFlight);
          collideCount++;
        }
      }
      if (score === 93) {
        gameOver("You win!");
        clearInterval(timerFlight);
      }
    }
    let timerFlight = setInterval(moveWebs, 20);
    if (!isGameOver) {
      setTimeout(generateWebs, 3000); // generates webs every 3 seconds
    }
  }
  generateWebs();

  function gameOver(outcome) {
    clearInterval(timerGravity);
    // console.log("Game Over");
    isGameOver = true;
    document.removeEventListener("keyup", control); // remove event listener at keyup
    grass.classList.add("grass");
    grass.classList.remove("grass-moving");

    if (messageCount === 0) {
      const messageContainer = document.createElement("div");
      const message = document.createElement("p");
      message.innerText = `${outcome} Click on the watch button to watch LOONA's Butterfly MV. Click on the play button to play again.`;
      message.className = "message";
      const watchButton = document.createElement("button");
      watchButton.innerText = "Watch";
      watchButton.setAttribute("id", "watch");
      const playButton = document.createElement("button");
      playButton.innerText = "Play";
      playButton.setAttribute("id", "play");
      messageContainer.append(message);
      messageContainer.append(watchButton);
      messageContainer.append(playButton);
      document.querySelector(".right-panel").append(messageContainer);
      messageCount++;

      function openTab() {
        window.open("https://youtu.be/XEOCbFJjRw0", "_blank");
        document.querySelector("#watch").removeEventListener("click", openTab);
      }

      function refresh() {
        location.reload();
      }
      document.querySelector("#watch").addEventListener("click", openTab);

      document.querySelector("#play").addEventListener("click", refresh);
    }
  }
}
