import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../store/gameSlice";
import colors from "../data/colors";

function ColorGame({ onQuestionAnswered }) {
  const { difficulty, volume } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [options, setOptions] = useState([]);
  const [buttonStates, setButtonStates] = useState(Array(4).fill("neutral"));
  const [showHint, setShowHint] = useState(false);
  const [showEnglishTitle, setShowEnglishTitle] = useState(false);
  const totalQuestions = 5;

  const generateQuestion = () => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const correctColor = colors[colorIndex];
    setCurrentColor(correctColor);

    const tempOptions = [correctColor.color];
    while (tempOptions.length < 4) {
      const randomColor =
        colors[Math.floor(Math.random() * colors.length)].color;
      if (!tempOptions.includes(randomColor)) {
        tempOptions.push(randomColor);
      }
    }
    setOptions(tempOptions.sort(() => Math.random() - 0.5));
    setButtonStates(Array(4).fill("neutral"));
    setShowHint(false);
    setShowEnglishTitle(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswerClick = (index, selectedColor) => {
    if (buttonStates.some((state) => state !== "neutral")) return;

    const newButtonStates = [...buttonStates];
    let proceedToNext = false;

    if (selectedColor === currentColor.color) {
      newButtonStates[index] = "correct";
      const newScore = localScore + 1;
      setLocalScore(newScore);
      proceedToNext = true;
    } else if (difficulty === "normal") {
      newButtonStates[index] = "incorrect";
      proceedToNext = true;
    } else {
      newButtonStates[index] = "incorrect";
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
  };

  const handleTitleClick = () => {
    setShowEnglishTitle(!showEnglishTitle);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setLocalScore(0);
    setShowResult(false);
    dispatch(
      updateProgress({
        game: "colors",
        score: 0,
        completed: false,
      })
    );
    generateQuestion();
  };

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
          color: ${showEnglishTitle ? "#2563eb" : "black"};
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
              key={showEnglishTitle ? "english" : "bisaya"}
              className="title-text"
            >
              {showEnglishTitle
                ? currentColor.english_title || "No English title"
                : currentColor.bisaya_title || "No Bisaya title"}
            </span>
          </h1>
          <div className="text-center mb-4">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              onClick={handleHintClick}
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && (
              <p className="text-lg text-gray-600 mt-2">
                Hint: {currentColor.translation || "No hint available"}
              </p>
            )}
          </div>
          <div className="w-32 h-32 mx-auto mb-4">
            <img
              src={currentColor.image}
              alt={currentColor.translation}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {options.map((colorName, index) => {
              const colorObj = colors.find((c) => c.color === colorName);
              const isLightColor = ["Puti", "Dalag"].includes(colorName);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index, colorName)}
                  className={`p-4 rounded-lg text-xl font-semibold bg-white
                    ${
                      buttonStates[index] === "correct"
                        ? "border-4 border-green-500 animate-scale"
                        : buttonStates[index] === "incorrect"
                        ? "border-4 border-red-500 animate-shake"
                        : "border-4 border-gray-300"
                    }`}
                  style={{
                    color: difficulty === "easy" ? colorObj.value : "#000000",
                    textShadow:
                      difficulty === "easy"
                        ? isLightColor
                          ? "2px 2px 2px #000000"
                          : "1px 1px 1px #000000"
                        : "none",
                  }}
                  disabled={
                    buttonStates.some((state) => state !== "neutral") &&
                    difficulty === "normal"
                  }
                >
                  {colorName}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <p className="text-xl">
            Your score: {localScore} out of {totalQuestions}
          </p>
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

export default ColorGame;
