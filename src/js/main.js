"use strict";
const startButton = document.querySelector(".start-btn");
const nextButton = document.querySelector(".next-btn");
const questionContainerElement = document.querySelector(".question--container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;
let ask = "";
function startGame(ask) {
  startButton.classList.add("hide");
  shuffledQuestions = ask.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(ask) {
  questionElement.innerHTML = ask.question;
  const button = document.createElement("button");
  // let htmlCode = "";
  // for (let promoIndex = 0; promoIndex < ask.length; promoIndex++) {
  //   console.log(ask[promoIndex].incorrect_answers);

  //   htmlCode = `${ask[promoIndex].incorrect_answers}`;
  // }

  // console.log(htmlCode);
  // for (let i = 0; i < htmlCode.length; i++) {
  //   console.log(i);
  // }
  button.innerHTML = ask.correct_answer;
  button.classList.add("btn");
  if (ask.correct_answer) {
    button.dataset.correct = ask.correct_answer;
  }
  button.addEventListener("click", selectAnswer);
  answerButtonsElement.appendChild(button);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
fetch("https://opentdb.com/api.php?amount=50&difficulty=easy")
  .then((data) => data.json())
  .then((data) => {
    ask = data.results;
    console.log(ask);
    showQuestion(ask);
    startGame(ask);
  });
