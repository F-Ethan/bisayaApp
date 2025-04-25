import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../store/gameSlice";

const colors = [
  { name: "Pula", value: "#FF0000" }, // Red
  { name: "Berde", value: "#00FF00" }, // Green
  { name: "Dalag", value: "#FFFF00" }, // Yellow
  { name: "Asul", value: "#0000FF" }, // Blue
];

function ColorGame() {
  const { difficulty, volume } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [options, setOptions] = useState([]);
  const [buttonStates, setButtonStates] = useState(Array(4).fill("neutral")); // neutral, correct, incorrect
  const totalQuestions = 5;

  // Generate new question
  const generateQuestion = () => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const correctColor = colors[colorIndex];
    setCurrentColor(correctColor);

    // Generate 4 unique options, including the correct answer
    const tempOptions = [correctColor.name];
    while (tempOptions.length < 4) {
      const randomColor =
        colors[Math.floor(Math.random() * colors.length)].name;
      if (!tempOptions.includes(randomColor)) {
        tempOptions.push(randomColor);
      }
    }
    setOptions(tempOptions.sort(() => Math.random() - 0.5));
    setButtonStates(Array(4).fill("neutral"));
  };

  // Initialize first question
  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswerClick = (index, selectedColor) => {
    if (buttonStates.some((state) => state !== "neutral")) return;

    const newButtonStates = [...buttonStates];
    let proceedToNext = false;

    if (selectedColor === currentColor.name) {
      newButtonStates[index] = "correct";
      setScore(score + 1);
      console.log(`Correct! Volume: ${volume}% (volume for future audio)`);
      proceedToNext = true;
    } else if (difficulty === "normal") {
      newButtonStates[index] = "incorrect";
      console.log(`Incorrect! Volume: ${volume}% (volume for future audio)`);
      proceedToNext = true;
    } else {
      newButtonStates[index] = "incorrect";
      console.log(`Try again! Volume: ${volume}% (volume for future audio)`);
    }

    setButtonStates(newButtonStates);

    if (proceedToNext) {
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          generateQuestion();
        } else {
          setShowResult(true);
          dispatch(
            updateProgress({
              game: "colors",
              score: score + (selectedColor === currentColor.name ? 1 : 0),
              completed: true,
            })
          );
        }
      }, 1000); // 1-second delay for animation
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
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
            .animate-shake {
              animation: shake 0.3s ease-in-out;
            }
            .animate-scale {
              animation: scale 0.3s ease-in-out;
            }
          `}
      </style>
      {!showResult ? (
        <>
          <h2 className="text-2xl mb-4 text-center">Unsa nga kolor kini?</h2>
          <div
            className="w-32 h-32 mx-auto mb-4"
            style={{ backgroundColor: currentColor.value }}
          />
          <div className="grid grid-cols-2 gap-4">
            {options.map((colorName, index) => {
              const colorObj = colors.find((c) => c.name === colorName);
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
                      difficulty === "easy" ? "1px 1px 1px #000000" : "none",
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
            Your score: {score} out of {totalQuestions}
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
