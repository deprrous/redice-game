/* global variable defination*/

// togloomiig tuluwiig hadgalah huwisagch
var isGameOver;
// idewhitei toglogchiig zaah huwisagch
var activePlayer;
// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];
// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore;

// util DOM
var diceDom = document.querySelector(".dice");

// togloom ehlehed beltgene.
function initGame() {
  //togloom ehlelee gedeg tuluw oruulna.
  isGameOver = false;

  // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;
  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч-iig 0,0 bolgono
  scores = [0, 0];
  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч-iig 0 bolgono
  roundScore = 0;
  // Програм эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // toglogchdiin neriig butsaaj gargah
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// Programmiig ehluuleh
initGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (!isGameOver) {
    var diceDom = document.querySelector(".dice"); // Ensure this points to the correct dice element

    // Display the dice
    diceDom.style.display = "block";

    // Rolling animation function
    function rollDiceAnimation() {
      var randomDice = Math.floor(Math.random() * 6) + 1;
      diceDom.src = "dice-" + randomDice + ".png";
    }

    // Generate the final dice number
    var finalDiceNumber = Math.floor(Math.random() * 6) + 1;

    // Rolling animation: Change the dice image every 100ms for 1 second
    for (let i = 0; i < 10; i++) {
      setTimeout(rollDiceAnimation, i * 100);
    }

    // Set the final dice image after the rolling animation completes
    setTimeout(function () {
      diceDom.src = "dice-" + finalDiceNumber + ".png";

      // Game logic after rolling the dice
      if (finalDiceNumber !== 1) {
        // If the dice roll is not 1, add the result to the current player's round score
        roundScore += finalDiceNumber;
        document.getElementById("current-" + activePlayer).textContent =
          roundScore;
      } else {
        // If the dice roll is 1, switch the player's turn
        switchPlayer();
      }
    }, 1000);
  } else {
    alert("Game Over! Please start a new game.");
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!isGameOver) {
    // ug toglogchiin tsugluulsan eeljiin onoog total onoon deer nemne.
    scores[activePlayer] += roundScore;

    // delgetsend onoog uurchilnu.
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Xojson esehiig shalgah.
    if (scores[activePlayer] >= 100) {
      // togloomiig duussan tuluwt oruulna.
      isGameOver = true;

      // Winnner textiig nerniih ni orond haruulna.
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      //toglogchiin eeljiig solino.
      switchPlayer();
    }
  } else {
    alert("Game Over!,Enter the New Game button");
  }
});

// toglogchiin eeljiig solih function.
function switchPlayer() {
  // ene toglogchiin eeljindee tsugluulsan onoog 0 bolgono.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // toglogchiin eeljiig nogoo toglogchruu shiljuulne.
  // herew idewhitei toglogch ni 0 baiwal 1 bolgo.
  // ugui bol 0 bolgo.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // to transfer red dot
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // shoog tur alga bolgono.
  diceDom.style.display = "none";
}

// Togloomiig shineer ehluuleh buttonii event listener
document.querySelector(".btn-new").addEventListener("click", initGame);
