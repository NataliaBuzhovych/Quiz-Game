import React, { useState, useEffect, useContext } from "react";
import { useQuizContext } from "../../context/context";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button/Button";

const Result = () => {
  const {
    setHome,
    setResult,
    setPlay,
    correctScore,
    setCorrectScore,
    setSelectedCategoryId,
    setAmountOfQuestions,
    amountOfQuestions,
    timePlayed,
  } = useQuizContext();

  const clickBtnAgain = () => {
    setHome(true);
    setPlay(false);
    setResult(false);
    setSelectedCategoryId("");
    setAmountOfQuestions("");
    setCorrectScore(0);
  };

  return (
    <>
      <div className="quiz-head">
        <h1 className="quiz-title">Congratulation</h1>
      </div>
      <div className="quiz-bode">
        <h2 className="quiz-question" id="question">
          Your results:
        </h2>
        <h3>
          {correctScore}/{amountOfQuestions}
        </h3>
        <h2 className="quiz-question" id="question">
          Time played:
        </h2>
        <h3> {Math.round(timePlayed / 1000)}seconds</h3>
        <h2>Percentage of correct answers :</h2>
        <h3>{(correctScore * 100) / amountOfQuestions} %</h3>
        <h2 className="quiz-question" id="question"></h2>
      </div>
      <div className="quiz-footer">
        <Button onClick={clickBtnAgain}>Play Again</Button>
      </div>
    </>
  );
};

export default Result;
