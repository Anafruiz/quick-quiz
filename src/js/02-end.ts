"use strict";
if (window.location.pathname === "/end.html") {
    const username_1 =document.getElementById("username")["value"]
    var saveScoreBtn_1 = document.getElementById("saveScoreBtn")["disabled"];
    var finalScore = document.getElementById("finalScore");
    var mostRecentScore_1 = localStorage.getItem("mostRecentScore");
    var highScores_1: Array<any> = JSON.parse(localStorage.getItem("highScores")) || [];
    var clap = document.getElementById("clap");
    var MAX_HIGH_SCORES = 5;
    if (finalScore) {
        finalScore.innerHTML = "Score:" + mostRecentScore_1;
    }
    if (parseFloat(mostRecentScore_1) >= 40) {
        clap.innerHTML = "<img src=\"../assets/images/clap.gif\"/>";
    }
    username_1.addEventListener("keydown", function () {
        saveScoreBtn_1.disabled = false;
        // saveScoreBtn.disabled = !username.value;
    });
    var saveHighScore = function (e) {
        
        e.preventDefault();
        var score = {
            score: mostRecentScore_1,
            name: username_1.value
        };
        highScores_1.push(score);
        highScores_1.sort(function (a, b) { return b.score - a.score; });
        highScores_1.splice(5);
        localStorage.setItem("highScores", JSON.stringify(highScores_1));
        window.location.assign("/");
    };
}
