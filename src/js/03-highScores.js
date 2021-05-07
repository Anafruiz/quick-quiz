`use strict`;
if (window.location.pathname === "/highscores.html") {
  const highScoreList = document.getElementById("highScoresList");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const list = highScores
    .map((score) => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
  highScoreList.innerHTML = list;
}
