`use strict`;
if (window.location.pathname === "/quick-quiz/game.html") {
  //CONSTANTS
  const CORRECT_BONUS = 10;
  const MAX_QUESTIONS = 5;
  let contador = 15;
  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const progressText = document.getElementById("progressText");
  const scoreText = document.getElementById("score");
  const progressBarFull = document.getElementById("progressBarFull");
  const counter = document.getElementById("counter");
  const loader = document.getElementById("loader");
  const game = document.getElementById("game");
  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let questionCounter = 0;
  let availableQuesions = [];
  let questions = [];
  fetch(
    "//opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
          question: loadedQuestion.question,
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );
        answerChoices.forEach((choice, index) => {
          formattedQuestion["choice" + (index + 1)] = choice;
        });
        return formattedQuestion;
      });
      setInterval(set, 1000);
      startGame();
    })

    .catch((err) => {
      console.error(err);
    });

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
  };
  function set() {
    contador--;
    counter.innerHTML = contador;
    if (contador === 0) {
      getNewQuestion();
    }
  }
  getNewQuestion = () => {
    contador = 15;
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      //go to the end page
      return window.location.assign("/quick-quiz/end.html");
    }
    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach((choice) => {
      const number = choice.dataset["number"];
      choice.innerHTML = currentQuestion["choice" + number];
    });
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
      const correct_choice = choices[currentQuestion.answer - 1];
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }

      if (classToApply === "incorrect") {
        correct_choice.classList.add("correct");
      }
      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        correct_choice.classList.remove("correct");
        getNewQuestion();
      }, 1000);
    });
  });
  incrementScore = (num) => {
    score += num;
    scoreText.innerHTML = score;
  };
}
