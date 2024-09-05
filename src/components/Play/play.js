import { useQuizContext } from "../../context/context";
import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import "./play.css";
const Play = () => {
  const {
    questions,
    setHome,
    setPlay,
    amountOfQuestions,
    setResult,
    correctScore,
    setCorrectScore,
    setSelectedCategoryId,
    setAmountOfQuestions,
  } = useQuizContext();

  const [quizState, setQuizState] = useState({
    optionList: [],
    correctAnswer: "",
    askedCount: 1,
  });
  const [quiz, setQuiz] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const showQuestion = (questions) => {
    const { correct_answer, incorrect_answers } = questions;
    const options = [...incorrect_answers];
    options.splice(
      Math.floor(Math.random() * (incorrect_answers.length + 1)),
      0,
      correct_answer
    );

    setQuizState((prevQuizState) => ({
      ...prevQuizState,
      optionList: options,
    }));

    document.getElementById(
      "question"
    ).innerHTML = `${questions.question} <br><span className="category">Category:  ${questions.category}</span> `;
    document.querySelector(".quiz-options").innerHTML = options
      .map((option, index) => `<li>${index + 1}.<span>${option}</span></li>`)
      .join("");

    selectOption(questions);
    console.log(correct_answer);
  };
  function disableIncorrectOptions(optionList, correct_answer) {
    for (const option of optionList) {
      if (option.querySelector("span").innerHTML !== correct_answer) {
        option.classList.add("disabled");
      } else {
        option.classList.add("disabledRight");
      }
    }
  }

  const selectOption = (questions) => {
    const { correct_answer } = questions;
    const optionList = document
      .querySelector(".quiz-options")
      .querySelectorAll("li");

    optionList.forEach((op) => {
      op.addEventListener("click", () => {
        if (op.querySelector("span").innerHTML === correct_answer) {
          setQuizState((prevQuizState) => ({
            ...prevQuizState,

            askedCount: prevQuizState.askedCount + 1,
          }));
          setCorrectScore(correctScore + 1);

          op.classList.add("right");
          disableIncorrectOptions(optionList, correct_answer);
        } else {
          setQuizState((prevQuizState) => ({
            ...prevQuizState,

            askedCount: prevQuizState.askedCount + 1,
          }));
          op.classList.add("wrong");
          disableIncorrectOptions(optionList, correct_answer);
        }
      });
    });
  };

  useEffect(() => {
    console.log(correctScore);
  }, [correctScore]);

  useEffect(() => {
    if (questions.length > 0) {
      if (quizState.askedCount <= questions.length) {
        setTimeout(() => {
          showQuestion(questions[quizState.askedCount - 1]);
          document.getElementById("asked-question").textContent =
            quizState.askedCount;
        }, 1000);
      } else {
        console.log("All questions answered!");
        setPlay(false);
        setResult(true);
        setHome(false);
      }
    }
  }, [quizState.askedCount, questions]);

  const ClickBtnPlayAgain = () => {
    setPlay(false);
    setHome(true);
    setSelectedCategoryId("");
    setAmountOfQuestions("");
    setCorrectScore(0);
  };
  setTimeout(() => {
    setSpinner(false);
    setQuiz(true);
  }, 1005);

  return (
    <div className="play_container">
      {spinner && (
        <div class="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {quiz && (
        <>
          {" "}
          <div className="quiz-head">
            <h1 className="quiz-title"> Quiz Game</h1>
            <div className="quiz-score">
              <span id="asked-question"></span>/
              <span id="total-question">{amountOfQuestions}</span>
            </div>
          </div>
          <div className="quiz-bode">
            <h2 className="quiz-question" id="question"></h2>
            <ul className="quiz-options"></ul>
            <div id="result"></div>
          </div>
          <div className="quiz-footer">
            <Button onClick={ClickBtnPlayAgain} id="play-again">
              Play Again
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Play;
