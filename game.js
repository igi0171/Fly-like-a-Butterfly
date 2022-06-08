document.addEventListener("click", startGame);
document.getElementById("score").innerHTML = `click to play`;
let messageCount = 0;
let butterflyLoona = new Audio("/song/butterfly.mp3");

function startGame() {
  document.removeEventListener("click", startGame);
  document.querySelector("#instruction").innerText = "";
  const butterfly = document.querySelector(".butterfly");
  const gameDisplay = document.querySelector(".game-container");
  const grass = document.querySelector(".grass");
  grass.classList.add("grass-moving");
  grass.classList.remove("grass");
  butterflyLoona.play();

  let butterflyLeft = 231;
  let butterflyBottom = 105;
  let gravityMagnitude = 2;
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
        gameOver("Game over");
        clearInterval(timerFlight);
      }
      if (butterflyLoona.currentTime >= 237.707) {
        gameOver("You win");
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
    butterflyLoona.pause();
    butterflyLoona.currentTime = 0;
    document.querySelector("#original").innerText = "";
    document.querySelector("#english-translation").innerText = "";

    if (messageCount === 0) {
      const messageContainer = document.createElement("div");
      const message = document.createElement("p");
      message.innerText = `${outcome}. Click on the watch button to watch LOONA's performance of Butterfly on Queendom 2. Click on the play button to play again.`;
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
    }

    function openTab() {
      window.open("https://youtu.be/aXaHB4gGAys", "_blank");
      document.querySelector("#watch").removeEventListener("click", openTab);
    }

    function refresh() {
      location.reload();
    }
    document.querySelector("#watch").addEventListener("click", openTab);

    document.querySelector("#play").addEventListener("click", refresh);
  }

  function lyrics() {
    switch (true) {
      case butterflyLoona.currentTime >= 9 && butterflyLoona.currentTime < 14:
        document.querySelector("#original").innerText =
          "속삭여 줄래 넌 날 깨우는 Déjà vu";
        document.querySelector("#english-translation").innerText =
          "Will you whisper to me? You are the Déjà vu that wakes me up";
        document.querySelector("#lyrics").className = "yves";
        break;
      case butterflyLoona.currentTime >= 14 && butterflyLoona.currentTime < 18:
        document.querySelector("#original").innerText = "Now, is it you now?";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "olivia-hye";
        break;
      case butterflyLoona.currentTime >= 18 && butterflyLoona.currentTime < 23:
        document.querySelector("#original").innerText =
          "피어날 듯해 날개 달린 신기루";
        document.querySelector("#english-translation").innerText =
          "The winged mirage looks like it's going to bloom";
        document.querySelector("#lyrics").className = "kim-lip";
        break;
      case butterflyLoona.currentTime >= 23 && butterflyLoona.currentTime < 26:
        document.querySelector("#original").innerText = "How? Is it true now?";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "olivia-hye";
        break;
      case butterflyLoona.currentTime >= 26 && butterflyLoona.currentTime < 30:
        document.querySelector("#original").innerText = "날 감싸 안아주는 Wind";
        document.querySelector("#english-translation").innerText =
          "The Wind that embraces me";
        document.querySelector("#lyrics").className = "heejin";
        break;
      case butterflyLoona.currentTime >= 30 &&
        butterflyLoona.currentTime < 32.5:
        document.querySelector("#original").innerText = "새로 깨어나는 느낌";
        document.querySelector("#english-translation").innerText =
          "The feeling of being newly awakened";
        document.querySelector("#lyrics").className = "jinsoul";
        break;
      case butterflyLoona.currentTime >= 32.5 &&
        butterflyLoona.currentTime < 35:
        document.querySelector("#original").innerText =
          "나를 채워가는 눈빛 (You)";
        document.querySelector("#english-translation").innerText =
          "Your eyes that fill me up";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 35.5 &&
        butterflyLoona.currentTime < 39:
        document.querySelector("#original").innerText = "어쩌면 꿈인 것 같아";
        document.querySelector("#english-translation").innerText =
          "Maybe it was a dream";
        document.querySelector("#lyrics").className = "haseul";
        break;
      case butterflyLoona.currentTime >= 39 && butterflyLoona.currentTime < 43:
        document.querySelector("#original").innerText =
          "이 순간 Dreams, Dreams may come true";
        document.querySelector("#english-translation").innerText =
          "At this moment, Dreams, Dreams may come true";
        document.querySelector("#lyrics").className = "chuu";
        break;
      case butterflyLoona.currentTime >= 44 && butterflyLoona.currentTime < 47:
        document.querySelector("#original").innerText =
          "넌 마치 Fly like a Butterfly";
        document.querySelector("#english-translation").innerText =
          "You Fly like a Butterfly";
        document.querySelector("#lyrics").className = "hyunjin";
        break;
      case butterflyLoona.currentTime >= 47 && butterflyLoona.currentTime < 51:
        document.querySelector("#original").innerText =
          "날 멀리 데려갈 Wings Wings";
        document.querySelector("#english-translation").innerText =
          "Take me far away Wings Wings";
        document.querySelector("#lyrics").className = "gowon";
        break;
      case butterflyLoona.currentTime >= 53 && butterflyLoona.currentTime < 56:
        document.querySelector("#original").innerText =
          "이대로 Fly like a Butterfly";
        document.querySelector("#english-translation").innerText =
          "Just like this, Fly like a Butterfly";
        document.querySelector("#lyrics").className = "jinsoul";
        break;
      case butterflyLoona.currentTime >= 56 && butterflyLoona.currentTime < 61:
        document.querySelector("#original").innerText =
          "귓가엔 바람 소리 Wing Wing Wing";
        document.querySelector("#english-translation").innerText =
          "The sound of the wind in my ears, Wing Wing Wing";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 69 && butterflyLoona.currentTime < 72:
        document.querySelector("#original").innerText = "Fly like a Butterfly";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 76 && butterflyLoona.currentTime < 78:
        document.querySelector("#original").innerText = "난 닿을 듯해";
        document.querySelector("#english-translation").innerText =
          "I feel like I can reach you";
        document.querySelector("#lyrics").className = "heejin";
        break;
      case butterflyLoona.currentTime >= 78 &&
        butterflyLoona.currentTime < 80.5:
        document.querySelector("#original").innerText =
          "I better be around you";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "kim-lip";
        break;
      case butterflyLoona.currentTime >= 80.5 &&
        butterflyLoona.currentTime < 83:
        document.querySelector("#original").innerText = "Fly like a Butterfly";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "haseul";
        break;
      case butterflyLoona.currentTime >= 85 && butterflyLoona.currentTime < 87:
        document.querySelector("#original").innerText = "Fly like a Butterfly";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "yves";
        break;
      case butterflyLoona.currentTime >= 87 && butterflyLoona.currentTime < 90:
        document.querySelector("#original").innerText =
          "I better be around you";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "jinsoul";
        break;
      case butterflyLoona.currentTime >= 90 && butterflyLoona.currentTime < 95:
        document.querySelector("#original").innerText =
          "아찔해져 가 내 주위 모든 것이 Blue";
        document.querySelector("#english-translation").innerText =
          "I'm getting dizzy, everything around me Blue";
        document.querySelector("#lyrics").className = "olivia-hye";
        break;
      case butterflyLoona.currentTime >= 95 && butterflyLoona.currentTime < 98:
        document.querySelector("#original").innerText = "Now, with you you now";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "vivi";
        break;
      case butterflyLoona.currentTime >= 99 && butterflyLoona.currentTime < 104:
        document.querySelector("#original").innerText =
          "접힌 종이 달 그 사이를 맴돌 듯";
        document.querySelector("#english-translation").innerText =
          "Like a folded paper moon hovering in between";
        document.querySelector("#lyrics").className = "haseul";
        break;
      case butterflyLoona.currentTime >= 105 &&
        butterflyLoona.currentTime < 107.5:
        document.querySelector("#original").innerText =
          "I better be around you";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "yeojin";
        break;
      case butterflyLoona.currentTime >= 107.5 &&
        butterflyLoona.currentTime < 111.5:
        document.querySelector("#original").innerText =
          "시작은 작은 날개짓 이제 내 맘의 Hurricane";
        document.querySelector("#english-translation").innerText =
          "Started with small flaps of wings, now the Hurricane in my heart";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 111.5 &&
        butterflyLoona.currentTime < 114:
        document.querySelector("#original").innerText =
          "Been Been there never Been Been there";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 114 &&
        butterflyLoona.currentTime < 116.5:
        document.querySelector("#original").innerText = "세계가 점점 작아져 가";
        document.querySelector("#english-translation").innerText =
          "The World is getting smaller";
        document.querySelector("#lyrics").className = "heejin";
        break;
      case butterflyLoona.currentTime >= 116.5 &&
        butterflyLoona.currentTime < 120:
        document.querySelector("#original").innerText =
          "데려가줘 Way too far 새로워져";
        document.querySelector("#english-translation").innerText =
          "Take me away Way too far It's becoming new";
        document.querySelector("#lyrics").className = "olivia-hye";
        break;
      case butterflyLoona.currentTime >= 120 &&
        butterflyLoona.currentTime < 124:
        document.querySelector("#original").innerText =
          "이 순간 Dreams, Dreams may come true";
        document.querySelector("#english-translation").innerText =
          "At this moment, Dreams, Dreams may come true";
        document.querySelector("#lyrics").className = "kim-lip";
        break;
      case butterflyLoona.currentTime >= 124.5 &&
        butterflyLoona.currentTime < 127.5:
        document.querySelector("#original").innerText =
          "넌 마치 Fly like a Butterfly";
        document.querySelector("#english-translation").innerText =
          "You Fly like a Butterfly";
        document.querySelector("#lyrics").className = "yves";
        break;
      case butterflyLoona.currentTime >= 127.5 &&
        butterflyLoona.currentTime < 132:
        document.querySelector("#original").innerText =
          "날 멀리 데려갈 Wings Wings";
        document.querySelector("#english-translation").innerText =
          "Take me far away Wings Wings";
        document.querySelector("#lyrics").className = "chuu";
        break;
      case butterflyLoona.currentTime >= 133.5 &&
        butterflyLoona.currentTime < 136.5:
        document.querySelector("#original").innerText =
          "이대로 Fly like a Butterfly";
        document.querySelector("#english-translation").innerText =
          "Just like this, Fly like a Butterfly";
        document.querySelector("#lyrics").className = "hyunjin";
        break;
      case butterflyLoona.currentTime >= 136.5 &&
        butterflyLoona.currentTime < 142:
        document.querySelector("#original").innerText =
          "귓가엔 바람 소리 Wing Wing Wing";
        document.querySelector("#english-translation").innerText =
          "The sound of the wind in my ears, Wing Wing Wing";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 142.5 &&
        butterflyLoona.currentTime < 144:
        document.querySelector("#original").innerText = "이대로";
        document.querySelector("#english-translation").innerText =
          "Just like this";
        document.querySelector("#lyrics").className = "choerry";
        break;
      case butterflyLoona.currentTime >= 150 &&
        butterflyLoona.currentTime < 153:
        document.querySelector("#original").innerText = "Fly like a Butterfly";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "yves";
        break;
      case butterflyLoona.currentTime >= 157 &&
        butterflyLoona.currentTime < 159:
        document.querySelector("#original").innerText = "난 닿을 듯해";
        document.querySelector("#english-translation").innerText =
          "I feel like I can reach you";
        document.querySelector("#lyrics").className = "heejin";
        break;
      case butterflyLoona.currentTime >= 159 &&
        butterflyLoona.currentTime < 161.5:
        document.querySelector("#original").innerText =
          "I better be around you";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "kim-lip";
        break;
      case butterflyLoona.currentTime >= 161.5 &&
        butterflyLoona.currentTime < 166:
        document.querySelector("#original").innerText =
          "Fly like a Butterfly 저 끝까지";
        document.querySelector("#english-translation").innerText =
          "Fly like a Butterfly to that end";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 166 &&
        butterflyLoona.currentTime < 170:
        document.querySelector("#original").innerText =
          "Fly like a Butterfly 더 멀리까지";
        document.querySelector("#english-translation").innerText =
          "Fly like a Butterfly further";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 170.5 &&
        butterflyLoona.currentTime < 175:
        document.querySelector("#original").innerText =
          "Fly like a Butterfly 저 끝까지";
        document.querySelector("#english-translation").innerText =
          "Fly like a Butterfly to that end";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 175 &&
        butterflyLoona.currentTime < 176.5:
        document.querySelector("#original").innerText = "Fly like a Butterfly";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "chuu";
        break;
      case butterflyLoona.currentTime >= 176.5 &&
        butterflyLoona.currentTime < 180:
        document.querySelector("#original").innerText =
          "I better be around you";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "jinsoul";
        break;
      case butterflyLoona.currentTime >= 180 &&
        butterflyLoona.currentTime < 182.5:
        document.querySelector("#original").innerText =
          "구름 위의 싱크로나이즈";
        document.querySelector("#english-translation").innerText =
          "The synchronization on the clouds";
        document.querySelector("#lyrics").className = "gowon";
        break;
      case butterflyLoona.currentTime >= 182.5 &&
        butterflyLoona.currentTime < 183.5:
        document.querySelector("#original").innerText = "새로운 이 느낌";
        document.querySelector("#english-translation").innerText =
          "This new feeling";
        document.querySelector("#lyrics").className = "hyunjin";
        break;
      case butterflyLoona.currentTime >= 183.5 &&
        butterflyLoona.currentTime < 187:
        document.querySelector("#original").innerText =
          "Bling, bling, shine like a starlight";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "yves";
        break;
      case butterflyLoona.currentTime >= 187.5 &&
        butterflyLoona.currentTime < 189.5:
        document.querySelector("#original").innerText = "숨이 멎을 듯한 Time";
        document.querySelector("#english-translation").innerText =
          "Breathtaking Time";
        document.querySelector("#lyrics").className = "heejin";
        break;
      case butterflyLoona.currentTime >= 189.5 &&
        butterflyLoona.currentTime < 192:
        document.querySelector("#original").innerText = "점점 완벽해져 가";
        document.querySelector("#english-translation").innerText =
          "It's gradually getting perfect";
        document.querySelector("#lyrics").className = "vivi";
        break;
      case butterflyLoona.currentTime >= 192 &&
        butterflyLoona.currentTime < 195:
        document.querySelector("#original").innerText = "Let me fly right now";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "choerry";
        break;
      case butterflyLoona.currentTime >= 196 &&
        butterflyLoona.currentTime < 200:
        document.querySelector("#original").innerText =
          "넌 마치 Fly like a Butterfly (Fly Butterfly)";
        document.querySelector("#english-translation").innerText =
          "You Fly like a Butterfly (Fly Butterfly)";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 200 &&
        butterflyLoona.currentTime < 205:
        document.querySelector("#original").innerText =
          "더 높이 날아가줘 Wings Wings (날아가 Wings)";
        document.querySelector("#english-translation").innerText =
          "Fly higher Wings Wings (Fly Wings)";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 205 &&
        butterflyLoona.currentTime < 208:
        document.querySelector("#original").innerText =
          "이대로 Fly like a Butterfly (Butterfly)";
        document.querySelector("#english-translation").innerText =
          "Just like this Fly like a Butterfly (Butterly)";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 208 &&
        butterflyLoona.currentTime < 213:
        document.querySelector("#original").innerText =
          "스치는 바람 소리 Wing Wing Wing (바람 소리 Wing)";
        document.querySelector("#english-translation").innerText =
          "Sound of the passing wind Wing Wing Wing (Sound of the wind Wing)";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 213 &&
        butterflyLoona.currentTime < 215:
        document.querySelector("#original").innerText =
          "I better be around you";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "haseul";
        break;
      case butterflyLoona.currentTime >= 215 &&
        butterflyLoona.currentTime < 217.5:
        document.querySelector("#original").innerText =
          "Fly like a Butterfly 저 끝까지 (세계 끝까지)";
        document.querySelector("#english-translation").innerText =
          "Fly like a Butterfly to that end (To the end of the world)";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 217.5 &&
        butterflyLoona.currentTime < 223.5:
        document.querySelector("#original").innerText =
          "날 멀리 데려갈 Wings Wings 더 멀리까지";
        document.querySelector("#english-translation").innerText =
          "Take me far away Wings Wings further";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 223.5 &&
        butterflyLoona.currentTime < 225.5:
        document.querySelector("#original").innerText =
          "이대로 Fly like a Butterfly";
        document.querySelector("#english-translation").innerText =
          "Just like this Fly like a Butterfly";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 225.5 &&
        butterflyLoona.currentTime < 229:
        document.querySelector("#original").innerText =
          "귓가엔 바람 소리 (끝까지)";
        document.querySelector("#english-translation").innerText =
          "The sound of the wind in my ears (To the end)";
        document.querySelector("#lyrics").className = "more-than-one";
        break;
      case butterflyLoona.currentTime >= 229 &&
        butterflyLoona.currentTime < 230.5:
        document.querySelector("#original").innerText = "난 닿을 듯해";
        document.querySelector("#english-translation").innerText =
          "I feel like I can reach you";
        document.querySelector("#lyrics").className = "vivi";
        break;
      case butterflyLoona.currentTime >= 230.5 &&
        butterflyLoona.currentTime < 235:
        document.querySelector("#original").innerText =
          "I better be around you";
        document.querySelector("#english-translation").innerText = "";
        document.querySelector("#lyrics").className = "choerry";
        break;
      default:
        document.querySelector("#original").innerText = "";
        document.querySelector("#english-translation").innerText = "";
    }
  }
  let timerLyrics = setInterval(lyrics, 500);
}
