import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { useQuizContext } from "../../context/context";
import Button from "../Button/Button";
import "../Home/home.css";

const Home = () => {
  const {
    setPlay,
    setHome,
    categories,
    setSelectedCategoryId,
    selectedCategoryId,
    setLucky,
    setAmountOfQuestions,
    amountOfQuestions,
  } = useQuizContext();

  const playButtonRef = useRef(null);

  useEffect(() => {
    if (playButtonRef.current) {
      console.log(selectedCategoryId);
      if (amountOfQuestions === "" && selectedCategoryId === undefined) {
        playButtonRef.current.classList.add("disabled");
      } else {
        playButtonRef.current.classList.remove("disabled");
      }
    }
  }, [amountOfQuestions, selectedCategoryId, playButtonRef.current]);
  const clickBtnLucky = () => {
    setLucky(true);
    setPlay(true);
    setHome(false);
    setAmountOfQuestions(10);
  };
  const clickBtnPlay = () => {
    setPlay(true);
    setHome(false);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleAmountOfQuestionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1 || value > 30) {
      alert("Invalid value. Please enter a value between 10 and 30");
    } else {
      setAmountOfQuestions(value);
    }
  };

  return (
    <>
      <div className="quiz-head">
        <h1 className="quiz-title"> Play Quiz Game</h1>
      </div>
      <div className="quiz-bode">
        <h2 className="quiz-question" id="question">
          Choose category
        </h2>
        <select value={selectedCategoryId} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <h2 className="quiz-question" id="question">
          Amount of questions
        </h2>
        <input
          type="number"
          value={amountOfQuestions}
          onChange={handleAmountOfQuestionsChange}
          placeholder="Enter amount of questions"
        />
        <Button ref={playButtonRef} onClick={clickBtnPlay} id="play">
          Play
        </Button>
      </div>
      <div className="quiz-footer">
        <Button onClick={clickBtnLucky}>I'm lucky</Button>
        <span>* this button will generate</span>
        <span>a test of 10 questions on random topics</span>
      </div>
    </>
  );
};

export default Home;
