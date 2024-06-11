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
    // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    diceDom.style.display = "block";
    diceDom.src = "dice-" + diceNumber + ".png";

    // buusan too ni 1 ees ylgaatai bol idewhitei toglogchiin onoog nemegduulne.
    if (diceNumber !== 1) {
      // 1-ees ylgaatai too buulaa,buusan toog toglogchid nemne.
      roundScore = roundScore + diceNumber;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      // 1 buusan uchir toglogchiin eeljiig ene hesegt solino.
      // ene toglogchiin eeljindee tsugluulsan onoog 0 bolgono.
      // toglogchiin eeljiig solih.
      switchPlayer();
    }
  } else {
    alert("Game Over!,Enter the New Game button");
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
    if (scores[activePlayer] >= 10) {
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
