import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from "react";

const AppContext = createContext();

const Context = ({ children }) => {
  const [home, setHome] = useState(true);
  const [play, setPlay] = useState(false);
  const [result, setResult] = useState(false);
  const [lucky, setLucky] = useState(false);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [amountOfQuestions, setAmountOfQuestions] = useState("");
  const [correctScore, setCorrectScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timePlayed, setTimePlayed] = useState(0);

  const fetchData = useCallback(async () => {
    let API = "";
    if (lucky) {
      API = "https://opentdb.com/api.php?amount=10";
    } else {
      API = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${selectedCategoryId}`;
    }
    const response = await fetch(API);
    const data = await response.json();
    setQuestions(data.results);
  }, [lucky, amountOfQuestions, selectedCategoryId]);

  const fetchCategories = useCallback(async () => {
    const APICategories = "https://opentdb.com/api_category.php";
    const result = await fetch(APICategories);
    const fetchCategories = await result.json();
    setCategories(fetchCategories.trivia_categories);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (play) {
      setStartTime(Date.now());
      fetchData();
    }
    if (result) {
      const endTime = Date.now();
      setTimePlayed(endTime - startTime);
    }
  }, [play, result]);

  const value = {
    questions,
    categories,
    home,
    setHome,
    setPlay,
    play,
    result,
    setResult,
    setSelectedCategoryId,
    setLucky,
    setAmountOfQuestions,
    amountOfQuestions,
    setResult,
    result,
    correctScore,
    setCorrectScore,
    timePlayed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Context;
export const useQuizContext = () => useContext(AppContext);
