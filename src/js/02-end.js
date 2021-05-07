`use strict`;
if (window.location.pathname === "/end.html") {
  const username = document.getElementById("username");
  const saveScoreBtn = document.getElementById("saveScoreBtn");
  const finalScore = document.getElementById("finalScore");
  const mostRecentScore = localStorage.getItem("mostRecentScore");

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  const MAX_HIGH_SCORES = 5;

  if (finalScore) {
    finalScore.innerHTML = `Score:${mostRecentScore}`;
  }

  username.addEventListener("keydown", () => {
    saveScoreBtn.disabled = false;
    // saveScoreBtn.disabled = !username.value;
  });

  saveHighScore = (e) => {
    e.preventDefault();

    const score = {
      score: mostRecentScore,
      name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
  };
}
