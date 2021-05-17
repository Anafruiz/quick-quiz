"use strict";
if (window.location.pathname === "/highscores.html") {
    var highScoreList = document.getElementById("highScoresList");
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var list = highScores
        .map(function (score) {
        return "<li class=\"high-score\">" + score.name + " - " + score.score + "</li>";
    })
        .join("");
    highScoreList.innerHTML = list;
}
