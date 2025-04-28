import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../store/gameSlice";
import words from "../data/words";

function WordImageGame({ onQuestionAnswered }) {
  const { difficulty, volume, name } = useSelector((state) => state.user);
  const { score, streak, wordPoolSize } = useSelector((state) => state.game.progress.words);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [localScore, setLocalScore] = useState(score);
  const [showResult, setShowResult] = useState(false);
  const [currentWord, setCurrentWord] = useState(
    words[0] || { name: "Loading...", translation: "", image: "", bisaya_sentence: "", english_sentence: "" }
  );
  const [options, setOptions] = useState([]);
  const [buttonStates, setButtonStates] = useState(Array(4).fill("neutral"));
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [showEnglishSentence, setShowEnglishSentence] = useState(false);
  const totalQuestions = 5;
  const maxWords = words.length || 193;

  useEffect(() => {
    console.log("Words array:", words);
    console.log("Initial currentWord:", currentWord);
    console.log("WordPoolSize:", wordPoolSize);
  }, []);

  const generateQuestion = () => {
    if (!words || words.length === 0) {
      console.error("Words array is empty or undefined");
      setCurrentWord({ name: "Error: No words", translation: "", image: "", bisaya_sentence: "", english_sentence: "" });
      setOptions([]);
      return;
    }

    const validWordPoolSize = Math.max(1, Math.min(wordPoolSize || 10, maxWords));
    const activeWords = words.slice(0, validWordPoolSize);
    const wordIndex = Math.floor(Math.random() * activeWords.length);
    const correctWord = activeWords[wordIndex] || words[0] || {
      name: "Fallback",
      translation: "",
      image: "",
      bisaya_sentence: "",
      english_sentence: "",
    };
    setCurrentWord(correctWord);
    console.log("Generated currentWord:", correctWord);

    const tempOptions = [correctWord];
    const availableWords = activeWords.filter((w) => w.name !== correctWord.name);
    while (tempOptions.length < 4 && availableWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      tempOptions.push(availableWords[randomIndex]);
      availableWords.splice(randomIndex, 1);
    }
    setOptions(tempOptions.sort(() => Math.random() - 0.5));
    setButtonStates(Array(4).fill("neutral"));
    setShowHint(false);
    setUsedHint(false);
    setShowEnglishSentence(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [wordPoolSize]);

  const handleAnswerClick = (index, selectedWord) => {
    if (buttonStates.some((state) => state !== "neutral")) return;

    const newButtonStates = [...buttonStates];
    let proceedToNext = false;

    if (selectedWord.name === currentWord.name) {
      newButtonStates[index] = "correct";
      const newScore = localScore + 1;
      setLocalScore(newScore);
      if (!usedHint) {
        const newStreak = streak + 1;
        let newWordPoolSize = wordPoolSize;
        if (newStreak >= 10 && wordPoolSize < maxWords) {
          newWordPoolSize = Math.min(wordPoolSize + 10, maxWords);
          alert(
            `Great job${name ? ", " + name : ""}! You reached a streak of 10 and unlocked ${newWordPoolSize - wordPoolSize} new words!`
          );
          dispatch(
            updateProgress({
              game: "words",
              score: newScore,
              completed: false,
              streak: 0,
              wordPoolSize: newWordPoolSize,
            })
          );
        } else {
          dispatch(
            updateProgress({
              game: "words",
              score: newScore,
              completed: false,
              streak: newStreak,
              wordPoolSize: newWordPoolSize,
            })
          );
        }
      }
      console.log(`Correct! Volume: ${volume}% (volume for future audio)`);
      proceedToNext = true;
    } else if (difficulty === "normal") {
      newButtonStates[index] = "incorrect";
      dispatch(
        updateProgress({
          game: "words",
          score: localScore,
          completed: false,
          streak: 0,
          wordPoolSize: wordPoolSize,
        })
      );
      console.log(`Incorrect! Volume: ${volume}% (volume for future audio)`);
      proceedToNext = true;
    } else {
      newButtonStates[index] = "incorrect";
      dispatch(
        updateProgress({
          game: "words",
          score: localScore,
          completed: false,
          streak: 0,
          wordPoolSize: wordPoolSize,
        })
      );
      console.log(`Try again! Volume: ${volume}% (volume for future audio)`);
    }

    setButtonStates(newButtonStates);

    if (proceedToNext) {
      setTimeout(() => {
        // Reset button states to neutral before proceeding
        setButtonStates(newButtonStates.map(() => "neutral"));
  
        if (typeof onQuestionAnswered === "function") {
          onQuestionAnswered(); // Call after delay to ensure effects are visible
        }
  
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          generateQuestion();
        } else {
          setShowResult(true);
          dispatch(
            updateProgress({
              game: "colors",
              score: localScore,
              completed: true,
            })
          );
        }
      }, 1000); // 1-second delay for visual feedback
    }
  };

  const handleHintClick = () => {
    setShowHint(!showHint);
    setUsedHint(true);
    dispatch(
      updateProgress({
        game: "words",
        score: localScore,
        completed: false,
        streak: 0,
        wordPoolSize: wordPoolSize,
      })
    );
  };

  const handleTitleClick = () => {
    if (typeof onQuestionAnswered === 'function') {
      onQuestionAnswered(); // Only call if it's a function
    }
    if (!usedHint) {
      setUsedHint(true);
      dispatch(
        updateProgress({
          game: "words",
          score: localScore,
          completed: false,
          streak: 0,
          wordPoolSize: wordPoolSize,
        })
      );
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setLocalScore(0);
    setShowResult(false);
    dispatch(
      updateProgress({
        game: "words",
        score: 0,
        completed: false,
      })
    );
    generateQuestion();
  };

  if (!currentWord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          @keyframes scale {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
          .animate-scale {
            animation: scale 0.3s ease-in-out;
          }
          .clickable-title {
            cursor: pointer;
            transition: color 0.2s;
          }
          .clickable-title:hover {
            color: #2563eb;
          }
          .title-text {
            display: inline-block;
            animation: fadeIn 0.3s ease-in;
            color: ${showEnglishSentence ? '#2563eb' : 'black'};
          }
        `}
      </style>
      {!showResult ? (
        <>
          <h1
            className="text-2xl mb-4 text-center clickable-title"
            onClick={handleTitleClick}
          >
            <span
              key={showEnglishSentence ? 'english' : 'bisaya'}
              className="title-text"
            >
              {showEnglishSentence
                ? currentWord.english_sentence || "No English sentence"
                : currentWord.bisaya_sentence || "No Bisaya sentence"}
            </span>
          </h1>
          <div className="flex justify-between mb-4">
            <p className="text-lg">Streak: {streak}</p>
            <p className="text-lg">Words: {wordPoolSize}</p>
          </div>
          <div className="text-3xl font-bold text-center mb-2">
            {currentWord.name || "Loading..."}
          </div>
          <div className="text-center mb-4">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              onClick={handleHintClick}
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && (
              <p className="text-lg text-gray-600 mt-2">
                Hint: {currentWord.translation || "No hint available"}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {options.map((word, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index, word)}
                className={`p-2 rounded-lg
                  ${
                    buttonStates[index] === "correct"
                      ? "border-4 border-green-500 animate-scale"
                      : buttonStates[index] === "incorrect"
                      ? "border-4 border-red-500 animate-shake"
                      : difficulty === "easy" && word.name === currentWord.name
                      ? "border-4 border-green-300"
                      : "border-4 border-gray-300"
                  }`}
                disabled={
                  buttonStates.some((state) => state !== "neutral") &&
                  difficulty === "normal"
                }
              >
                <img
                  src={word.image || "/assets/placeholder.png"}
                  alt={word.name || "Option"}
                  className="w-24 h-24 object-contain mx-auto"
                />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <p className="text-xl">
            Your score: {localScore} out of {totalQuestions}
          </p>
          <p className="text-lg">Words Unlocked: {wordPoolSize}</p>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-700"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default WordImageGame;