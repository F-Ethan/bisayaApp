import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../../store/gameSlice";
import words from "../../data/words";

function WordImageGame({ onQuestionAnswered }) {
  const { difficulty, volume, name } = useSelector((state) => state.user);
  const { score, streak, maxDifficulty } = useSelector((state) => state.game.progress.words);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [localScore, setLocalScore] = useState(score);
  const [showResult, setShowResult] = useState(false);
  const [currentWord, setCurrentWord] = useState(
    words[0]
      ? {
          name: words[0].name_in_bisaya || "Loading...",
          translation: words[0].image_name || "",
          image: words[0].filename_path || "/assets/placeholder.png",
          bisaya_sentence: words[0].sentence_in_bisaya || "",
          english_sentence: words[0].sentence || "",
        }
      : {
          name: "Loading...",
          translation: "",
          image: "/assets/placeholder.png",
          bisaya_sentence: "",
          english_sentence: "",
        }
  );
  const [options, setOptions] = useState([]);
  const [buttonStates, setButtonStates] = useState(Array(4).fill("neutral"));
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [showEnglishSentence, setShowEnglishSentence] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalQuestions = 5;
  const maxWords = words.length || 193;

  const fallbackWord = {
    name: "Fallback",
    translation: "placeholder",
    image: "/assets/placeholder.png",
    bisaya_sentence: "This is a fallback word.",
    english_sentence: "This is a fallback word.",
  };

  useEffect(() => {
    console.log("Words array length:", words.length);
    console.log("Initial currentWord:", currentWord);
    console.log("MaxDifficulty:", maxDifficulty);
    console.log("Sample filename_path:", words[0]?.filename_path);
  }, [currentWord, maxDifficulty]);

  const generateQuestion = useCallback(() => {
    if (!words || words.length === 0) {
      console.error("Words array is empty or undefined");
      setCurrentWord(fallbackWord);
      setOptions([fallbackWord]);
      return;
    }

    const filteredWords = [];
    const activeWords = words
      .filter((word) => {
        const wordDifficulty = parseInt(word.difficulty, 10);
        const isValidDifficulty = !isNaN(wordDifficulty) && wordDifficulty <= maxDifficulty;
        let resolvedImage = word.filename_path;
        try {
          resolvedImage = typeof word.filename_path === "string" ? word.filename_path : word.filename_path.default || "/assets/placeholder.png";
        } catch (e) {
          console.warn(`Failed to resolve filename_path for ${word.name_in_bisaya}:`, e);
          resolvedImage = "/assets/placeholder.png";
        }
        const isValidImage =
          resolvedImage &&
          typeof resolvedImage === "string" &&
          !resolvedImage.startsWith("data:image") &&
          resolvedImage !== "/assets/placeholder.png";
        const isValid = isValidDifficulty && isValidImage;
        if (!isValid) {
          filteredWords.push({
            name: word.name_in_bisaya,
            difficulty: word.difficulty,
            isValidDifficulty,
            filename_path: resolvedImage,
            isValidImage,
          });
        }
        return isValid;
      });

    if (filteredWords.length > 0) {
      console.warn("Filtered out words:", filteredWords);
    }
    console.log(`Active words count for difficulty <= ${maxDifficulty}:`, activeWords.length);

    if (activeWords.length === 0) {
      console.error(`No valid words found for difficulty <= ${maxDifficulty}. Falling back to any valid image.`);
      const fallbackActiveWords = words
        .filter((word) => {
          let resolvedImage = word.filename_path;
          try {
            resolvedImage = typeof word.filename_path === "string" ? word.filename_path : word.filename_path.default || "/assets/placeholder.png";
          } catch (e) {
            resolvedImage = "/assets/placeholder.png";
          }
          return resolvedImage && typeof resolvedImage === "string" && !resolvedImage.startsWith("data:image");
        });
      if (fallbackActiveWords.length === 0) {
        console.error("No words with valid images found. Using fallback word.");
        setCurrentWord(fallbackWord);
        setOptions([fallbackWord]);
        dispatch(
          updateProgress({
            game: "words",
            score: localScore,
            completed: false,
            streak: 0,
            maxDifficulty: 1,
          })
        );
        return;
      }
      const wordIndex = Math.floor(Math.random() * fallbackActiveWords.length);
      const correctWord = fallbackActiveWords[wordIndex] || fallbackWord;
      const mappedCorrectWord = {
        name: correctWord.name_in_bisaya || "Fallback",
        translation: correctWord.image_name || "",
        image: correctWord.filename_path || "/assets/placeholder.png",
        bisaya_sentence: correctWord.sentence_in_bisaya || "",
        english_sentence: correctWord.sentence || "",
      };
      setCurrentWord(mappedCorrectWord);
      console.log("Generated fallback currentWord:", mappedCorrectWord);
      const tempOptions = [mappedCorrectWord];
      const availableWords = fallbackActiveWords.filter((w) => w.name_in_bisaya !== correctWord.name_in_bisaya);
      while (tempOptions.length < 4 && availableWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const option = availableWords[randomIndex];
        tempOptions.push({
          name: option.name_in_bisaya || "Option",
          translation: option.image_name || "",
          image: option.filename_path || "/assets/placeholder.png",
          bisaya_sentence: option.sentence_in_bisaya || "",
          english_sentence: option.sentence || "",
        });
        availableWords.splice(randomIndex, 1);
      }
      while (tempOptions.length < 4) {
        tempOptions.push(fallbackWord);
      }
      setOptions(tempOptions.sort(() => Math.random() - 0.5));
    } else {
      const wordIndex = Math.floor(Math.random() * activeWords.length);
      const correctWord = activeWords[wordIndex] || fallbackWord;
      const mappedCorrectWord = {
        name: correctWord.name_in_bisaya || "Fallback",
        translation: correctWord.image_name || "",
        image: correctWord.filename_path || "/assets/placeholder.png",
        bisaya_sentence: correctWord.sentence_in_bisaya || "",
        english_sentence: correctWord.sentence || "",
      };
      setCurrentWord(mappedCorrectWord);
      console.log("Generated currentWord:", mappedCorrectWord);

      const tempOptions = [mappedCorrectWord];
      const availableWords = activeWords.filter((w) => w.name_in_bisaya !== correctWord.name_in_bisaya);
      while (tempOptions.length < 4 && availableWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const option = availableWords[randomIndex];
        tempOptions.push({
          name: option.name_in_bisaya || "Option",
          translation: option.image_name || "",
          image: option.filename_path || "/assets/placeholder.png",
          bisaya_sentence: option.sentence_in_bisaya || "",
          english_sentence: option.sentence || "",
        });
        availableWords.splice(randomIndex, 1);
      }
      while (tempOptions.length < 4) {
        tempOptions.push(fallbackWord);
      }
      setOptions(tempOptions.sort(() => Math.random() - 0.5));
    }

    setButtonStates(Array(4).fill("neutral"));
    setShowHint(false);
    setUsedHint(false);
    setShowEnglishSentence(false);
    setIsProcessing(false);
  }, [maxDifficulty, dispatch, localScore, maxWords]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion, maxDifficulty]);

  const handleAnswerClick = (index, selectedWord, event) => {
    event.preventDefault();
    if (isProcessing || buttonStates.some((state) => state !== "neutral")) {
      console.log("Click ignored: isProcessing or buttons not neutral");
      return;
    }

    console.log(`handleAnswerClick triggered: index=${index}, word=${selectedWord.name}`);

    setIsProcessing(true);
    const newButtonStates = [...buttonStates];

    if (selectedWord.name === currentWord.name) {
      newButtonStates[index] = "correct";
      const newScore = localScore + 1;
      setLocalScore(newScore);
      if (!usedHint) {
        const newStreak = streak + 1;
        let newMaxDifficulty = maxDifficulty;
        if (newStreak >= 10) {
          newMaxDifficulty = maxDifficulty + 1;
          alert(
            `Great job${name ? ", " + name : ""}! You reached a streak of 10 and unlocked level ${newMaxDifficulty}!`
          );
          dispatch(
            updateProgress({
              game: "words",
              score: newScore,
              completed: false,
              streak: 0,
              maxDifficulty: newMaxDifficulty,
            })
          );
        } else {
          dispatch(
            updateProgress({
              game: "words",
              score: newScore,
              completed: false,
              streak: newStreak,
              maxDifficulty: newMaxDifficulty,
            })
          );
        }
      }
      console.log(`Correct! Volume: ${volume}% (volume for future audio)`);
    } else {
      newButtonStates[index] = "incorrect";
      dispatch(
        updateProgress({
          game: "words",
          score: localScore,
          completed: false,
          streak: 0,
          maxDifficulty: maxDifficulty,
        })
      );
      console.log(difficulty === "normal" ? `Incorrect!` : `Try again! Volume: ${volume}% (volume for future audio)`);
    }

    setButtonStates(newButtonStates);

    setTimeout(() => {
      setButtonStates(Array(4).fill("neutral"));
      if (typeof onQuestionAnswered === "function") {
        onQuestionAnswered();
      }
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        generateQuestion();
      } else {
        setShowResult(true);
        dispatch(
          updateProgress({
            game: "words",
            score: localScore,
            completed: true,
            maxDifficulty: maxDifficulty,
          })
        );
      }
    }, 1000);
  };

  const handleHintClick = () => {
    if (isProcessing) return;
    setShowHint(!showHint);
    setUsedHint(true);
    dispatch(
      updateProgress({
        game: "words",
        score: localScore,
        completed: false,
        streak: 0,
        maxDifficulty: maxDifficulty,
      })
    );
  };

  const handleTitleClick = () => {
    if (isProcessing) return;
    console.log("Title clicked, showEnglishSentence:", showEnglishSentence);
    setShowEnglishSentence(!showEnglishSentence);
    if (!usedHint) {
      setUsedHint(true);
      dispatch(
        updateProgress({
          game: "words",
          score: localScore,
          completed: false,
          streak: 0,
          maxDifficulty: maxDifficulty,
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
        maxDifficulty: maxDifficulty,
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
            color: ${showEnglishSentence ? "#2563eb" : "black"};
          }
          .disabled-button {
            touch-action: none;
          }
        `}
      </style>
      {!showResult ? (
        <>
          <h1 className="text-2xl mb-4 text-center clickable-title" onClick={handleTitleClick}>
            <span key={showEnglishSentence ? "english" : "bisaya"} className="title-text">
              {showEnglishSentence
                ? currentWord.english_sentence || "No English sentence"
                : currentWord.bisaya_sentence || "No Bisaya sentence"}
            </span>
          </h1>
          <div className="flex justify-between mb-4">
            <p className="text-lg">Streak: {streak}</p>
            <p className="text-lg">Difficulty: Up to {maxDifficulty}</p>
          </div>
          <div className="text-3xl font-bold text-center mb-2">{currentWord.name || "Loading..."}</div>
          <div className="text-center mb-4">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              onClick={handleHintClick}
              disabled={isProcessing}
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && (
              <p className="text-lg text-gray-600 mt-2">
                {currentWord.translation || "No hint available"}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={(e) => handleAnswerClick(index, option, e)}
                className={`p-2 rounded-lg ${isProcessing ? "disabled-button" : ""} ${
                  buttonStates[index] === "correct"
                    ? "border-4 border-green-500 animate-scale"
                    : buttonStates[index] === "incorrect"
                    ? "border-4 border-red-500 animate-shake"
                    : difficulty === "easy" && option.name === currentWord.name
                    ? "border-4 border-green-300"
                    : "border-4 border-gray-300"
                }`}
                disabled={isProcessing || buttonStates.some((state) => state !== "neutral")}
              >
                <img
                  src={option.image || "/assets/placeholder.png"}
                  alt={option.name || "Option"}
                  className="w-24 h-24 object-contain mx-auto"
                  onError={(e) => {
                    console.error(`Failed to load image for ${option.name}:`, option.image, option);
                    e.target.src = "/assets/placeholder.png";
                  }}
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
          <p className="text-lg">Level {maxDifficulty}</p>
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