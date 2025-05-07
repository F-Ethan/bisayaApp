import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../../store/gameSlice";
import { colors, colors_title } from "../../data/colors";

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
  const [showEnglish, setShowEnglish] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState("");
  const [disabledUntilAudio, setDisabledUntilAudio] = useState(Array(4).fill(true));
  const audioRef = useRef(null);
  const timeoutRefs = useRef([]);
  const totalQuestions = 5;

  const playAudio = (audioFile) => {
    if (audioFile && volume > 0) {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Create new audio instance
      audioRef.current = new Audio(audioFile);
      audioRef.current.volume = volume / 100;
      audioRef.current.play().catch((error) => console.error("Audio playback error:", error));
    }
  };

  const clearTimeouts = () => {
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current = [];
  };

  const readOptions = async (currentOptions) => {
    if (difficulty === "easy") {
      setDisabledUntilAudio(Array(4).fill(true)); // Disable all buttons initially

      // Helper function to play audio and wait for it to finish
      const playAudioAndWait = (audioFile, index = -1) => {
        return new Promise((resolve) => {
          if (!audioFile || volume === 0) {
            resolve();
            return;
          }

          const audio = new Audio(audioFile);
          audio.volume = volume / 100;

          // Wait for the audio to be ready to play
          audio.addEventListener(
            "canplaythrough",
            () => {
              if (index >= 0) {
                // Only update button states for option buttons, not title
                setButtonStates((prev) =>
                  prev.map((state, i) => (i === index ? "highlight" : "neutral"))
                );
                setDisabledUntilAudio((prev) =>
                  prev.map((val, i) => (i === index ? false : val))
                );
              }
              audio.play().catch((error) => {
                console.error("Audio playback error:", error);
                resolve(); // Resolve even if playback fails to avoid hanging
              });
            },
            { once: true }
          );

          // Resolve when the audio finishes playing
          audio.addEventListener("ended", () => {
            resolve();
          }, { once: true });

          // Handle errors during loading
          audio.addEventListener(
            "error",
            () => {
              console.error("Audio loading error:", audio.error);
              resolve(); // Resolve to continue the sequence
            },
            { once: true }
          );
        });
      };

      // Play title audio first
      await playAudioAndWait(showEnglish ? colors_title[0].en_audio : colors_title[0].bis_audio);

      // Play each option audio sequentially
      for (let index = 0; index < currentOptions.length; index++) {
        const colorObj = currentOptions[index];
        await playAudioAndWait(showEnglish ? colorObj.en_audio : colorObj.bis_audio, index);
      }

      // Reset button states after all audios have played
      setButtonStates(Array(4).fill("neutral"));
      setDisabledUntilAudio(Array(4).fill(false)); // Enable all buttons after reading
    } else {
      setDisabledUntilAudio(Array(4).fill(false)); // Enable all buttons in normal mode
    }
  };

  const generateQuestion = () => {
    // Select a random correct color
    const colorIndex = Math.floor(Math.random() * colors.length);
    const correctColor = colors[colorIndex];
    setCurrentColor(correctColor);

    // Select three unique additional colors
    const tempOptions = [correctColor];
    const availableColors = colors.filter(
      (color) => color.bis_color !== correctColor.bis_color
    );
    while (tempOptions.length < 4 && availableColors.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const randomColor = availableColors[randomIndex];
      tempOptions.push(randomColor);
      availableColors.splice(randomIndex, 1); // Remove used color to ensure uniqueness
    }

    // Create a stable copy of options and shuffle
    const shuffledOptions = [...tempOptions].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
    setButtonStates(Array(4).fill("neutral"));
    setShowHint(false);
    setSelectedColorName(""); // Reset selected color name
    clearTimeouts(); // Clear any existing timeouts
    readOptions(shuffledOptions); // Call readOptions directly
  };

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const handleAnswerClick = (index, selectedColor) => {
    if (
      buttonStates[index] === "tried" ||
      disabledUntilAudio[index] ||
      buttonStates.some((state) => state === "correct" || state === "correct-no-border")
    )
      return;

    playAudio(showEnglish ? selectedColor.en_audio : selectedColor.bis_audio);
    setSelectedColorName(selectedColor.en_color); // Display English color name

    const newButtonStates = [...buttonStates];

    if (selectedColor.bis_color === currentColor.bis_color) {
      newButtonStates[index] = difficulty === "easy" ? "correct-no-border" : "correct";
      const newScore = localScore + 1;
      setLocalScore(newScore);
      setButtonStates(newButtonStates);
      clearTimeouts(); // Stop reading remaining options
      setDisabledUntilAudio(Array(4).fill(false)); // Enable all buttons
      setTimeout(() => {
        setButtonStates(newButtonStates.map(() => "neutral"));
        setSelectedColorName(""); // Clear selected color name
        if (typeof onQuestionAnswered === "function") {
          onQuestionAnswered();
        }

        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
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
      }, 1000);
    } else {
      newButtonStates[index] = "incorrect";
      setButtonStates(newButtonStates);
      setTimeout(() => {
        setButtonStates((prev) =>
          prev.map((state, i) => (i === index ? "tried" : state))
        );
        setSelectedColorName(""); // Clear selected color name
      }, 1000);
      if (difficulty === "normal") {
        setTimeout(() => {
          setButtonStates(newButtonStates.map(() => "neutral"));
          setSelectedColorName(""); // Clear selected color name
          if (typeof onQuestionAnswered === "function") {
            onQuestionAnswered();
          }

          if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
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
        }, 1000);
      }
    }
  };

  const handleHintClick = () => {
    setShowHint(!showHint);
    if (!showHint) {
      playAudio(currentColor.en_audio);
    }
  };

  const handleTitleClick = () => {
    setShowEnglish(!showEnglish);
    playAudio(showEnglish ? colors_title[0].bis_audio : colors_title[0].en_audio);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setLocalScore(0);
    setShowResult(false);
    setShowEnglish(false);
    setSelectedColorName("");
    clearTimeouts();
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
          color: ${showEnglish ? "#2563eb" : "black"};
        }
        .highlight {
          border: 4px solid #2563eb !important;
          animation: scale 0.3s ease-in-out;
        }
        .correct-no-border {
          background-color: #d4edda !important;
          animation: scale 0.3s ease-in-out;
        }
        .tried {
          border: 4px dashed red !important;
        }
        .selected-color {
          animation: fadeIn 0.3s ease-in;
          color: #2563eb;
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
              key={showEnglish ? "english" : "bisaya"}
              className="title-text"
            >
              {showEnglish ? colors_title[0].bis_title : colors_title[0].en_title}
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
                {currentColor.translation || "No hint available"}
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
          {selectedColorName && (
            <p className="text-lg text-center mb-4 selected-color">
              You selected: {selectedColorName}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {options.map((colorObj, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index, colorObj)}
                className={`p-4 rounded-lg text-xl font-medium bg-white
                  ${
                    buttonStates[index] === "correct"
                      ? "border-4 border-green-500 animate-scale"
                      : buttonStates[index] === "incorrect"
                      ? "border-4 border-red-500 animate-shake"
                      : buttonStates[index] === "highlight"
                      ? "highlight"
                      : buttonStates[index] === "correct-no-border"
                      ? "correct-no-border"
                      : buttonStates[index] === "tried"
                      ? "tried"
                      : "border-4 border-gray-300"
                  }`}
                style={{
                  color:
                    buttonStates[index] === "correct" ||
                    buttonStates[index] === "incorrect" ||
                    buttonStates[index] === "correct-no-border" ||
                    buttonStates[index] === "tried"
                      ? colorObj.value
                      : "#000000",
                }}
                disabled={
                  buttonStates[index] === "tried" ||
                  disabledUntilAudio[index] ||
                  buttonStates.some((state) => state === "correct" || state === "correct-no-border")
                }
              >
                {showEnglish ? colorObj.en_color : colorObj.bis_color}
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