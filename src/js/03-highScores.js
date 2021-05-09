`use strict`;
if (window.location.pathname === "/quick-quiz/highscores.html") {
  const highScoreList = document.getElementById("highScoresList");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const list = highScores
    .map((score) => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
  highScoreList.innerHTML = list;
}
