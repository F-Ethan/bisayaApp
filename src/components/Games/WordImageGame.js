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
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [buttonStates, setButtonStates] = useState(Array(4).fill("neutral"));
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [showEnglishSentence, setShowEnglishSentence] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const totalQuestions = 5;

  const fallbackWord = {
    name: "Fallback",
    translation: "placeholder",
    image: "/assets/placeholder.png",
    bisaya_sentence: "This is a fallback word.",
    english_sentence: "This is a fallback word.",
    difficulty: 1,
  };

  // Initialize filtered words based on maxDifficulty
  useEffect(() => {
    console.log("Words array:", words);
    console.log("User difficulty (initial):", difficulty);
    console.log("Current maxDifficulty:", maxDifficulty);
    if (!words || !Array.isArray(words) || words.length === 0) {
      console.error("Words array is empty, undefined, or not an array");
      setFilteredWords([fallbackWord]);
      return;
    }

    const maxDifficultyForUser = parseInt(maxDifficulty, 10) || 1; // Default to 1 if maxDifficulty is invalid
    console.log(`Filtering words for difficulty 1-${maxDifficultyForUser}`);

    // First attempt: strict image validation
    let validWords = words
      .filter((word) => {
        const wordDifficulty = parseInt(word.difficulty, 10);
        const isValidDifficulty = !isNaN(wordDifficulty) && wordDifficulty >= 1 && wordDifficulty <= maxDifficultyForUser;
        const resolvedImage = typeof word.filename_path === "string"
          ? word.filename_path
          : word.filename_path?.default || "/assets/placeholder.png";
        const isValidImage = resolvedImage &&
          typeof resolvedImage === "string" &&
          !resolvedImage.startsWith("data:image");
        console.log(`Word: ${word.name_in_bisaya}, Difficulty: ${wordDifficulty}, Image: ${resolvedImage}, Valid: ${isValidDifficulty && isValidImage}`);
        return isValidDifficulty && isValidImage;
      })
      .map((word) => ({
        name: word.name_in_bisaya || "Unknown",
        translation: word.image_name || "",
        image: typeof word.filename_path === "string"
          ? word.filename_path
          : word.filename_path?.default || "/assets/placeholder.png",
        bisaya_sentence: word.sentence_in_bisaya || "",
        english_sentence: word.sentence || "",
        difficulty: parseInt(word.difficulty, 10),
      }));

    // If no words pass strict image validation, relax image check
    if (validWords.length === 0) {
      console.warn("No words passed strict image validation, relaxing image check");
      validWords = words
        .filter((word) => {
          const wordDifficulty = parseInt(word.difficulty, 10);
          const isValidDifficulty = !isNaN(wordDifficulty) && wordDifficulty >= 1 && wordDifficulty <= maxDifficultyForUser;
          const resolvedImage = typeof word.filename_path === "string"
            ? word.filename_path
            : word.filename_path?.default || "/assets/placeholder.png";
          console.log(`Relaxed check - Word: ${word.name_in_bisaya}, Difficulty: ${wordDifficulty}, Image: ${resolvedImage}`);
          return isValidDifficulty;
        })
        .map((word) => ({
          name: word.name_in_bisaya || "Unknown",
          translation: word.image_name || "",
          image: typeof word.filename_path === "string"
            ? word.filename_path
            : word.filename_path?.default || "/assets/placeholder.png",
          bisaya_sentence: word.sentence_in_bisaya || "",
          english_sentence: word.sentence || "",
          difficulty: parseInt(word.difficulty, 10),
        }));
    }

    console.log(`Filtered words count (difficulty 1-${maxDifficultyForUser}): ${validWords.length}`);
    console.log("Filtered words:", validWords);
    setFilteredWords(validWords.length > 0 ? validWords : [fallbackWord]);
  }, [maxDifficulty]);

  const generateQuestion = useCallback(() => {
    if (filteredWords.length === 0) {
      console.error("No filtered words available");
      setCurrentWord(fallbackWord);
      setOptions([fallbackWord]);
      return;
    }

    const wordIndex = Math.floor(Math.random() * filteredWords.length);
    const correctWord = filteredWords[wordIndex] || fallbackWord;
    setCurrentWord(correctWord);
    console.log("Generated currentWord:", correctWord);

    const tempOptions = [correctWord];
    const availableWords = filteredWords.filter((w) => w.name !== correctWord.name);
    while (tempOptions.length < 4 && availableWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      tempOptions.push(availableWords[randomIndex]);
      availableWords.splice(randomIndex, 1);
    }
    while (tempOptions.length < 4) {
      tempOptions.push(fallbackWord);
    }
    setOptions(tempOptions.sort(() => Math.random() - 0.5));
    setButtonStates(Array(4).fill("neutral"));
    setShowHint(false);
    setUsedHint(false);
    setShowEnglishSentence(false);
    setIsProcessing(false);
  }, [filteredWords]);

  useEffect(() => {
    if (filteredWords.length > 0) {
      generateQuestion();
    }
  }, [generateQuestion, filteredWords]);

  const handleAnswerClick = (index, selectedWord, event) => {
    event.preventDefault();
    if (isProcessing || buttonStates.some((state) => state !== "neutral")) {
      return;
    }

    setIsProcessing(true);
    const newButtonStates = Array(4).fill("neutral");
    newButtonStates[index] = selectedWord.name === currentWord.name ? "correct" : "incorrect";
    setButtonStates(newButtonStates);

    if (selectedWord.name === currentWord.name) {
      const newScore = localScore + 1;
      setLocalScore(newScore);
      if (!usedHint) {
        const newStreak = streak + 1;
        let newMaxDifficulty = maxDifficulty;
        if (newStreak >= 10) {
          newMaxDifficulty = maxDifficulty + 1; // Increment maxDifficulty
          alert(`Great job${name ? ", " + name : ""}! You reached a streak of 10 and unlocked level ${newMaxDifficulty}!`);
          dispatch(updateProgress({
            game: "words",
            score: newScore,
            completed: false,
            streak: 0, // Reset streak after reaching 10
            maxDifficulty: newMaxDifficulty,
          }));
        } else {
          dispatch(updateProgress({
            game: "words",
            score: newScore,
            completed: false,
            streak: newStreak,
            maxDifficulty: newMaxDifficulty,
          }));
        }
      }
    } else {
      dispatch(updateProgress({
        game: "words",
        score: localScore,
        completed: false,
        streak: 0,
        maxDifficulty: maxDifficulty,
      }));
    }

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
        dispatch(updateProgress({
          game: "words",
          score: localScore,
          completed: true,
          maxDifficulty: maxDifficulty,
        }));
      }
      setIsProcessing(false);
    }, 800);
  };

  const handleHintClick = () => {
    if (isProcessing) return;
    setShowHint(!showHint);
    setUsedHint(true);
    dispatch(updateProgress({
      game: "words",
      score: localScore,
      completed: false,
      streak: 0,
      maxDifficulty: maxDifficulty,
    }));
  };

  const handleTitleClick = () => {
    if (isProcessing) return;
    setShowEnglishSentence(!showEnglishSentence);
    if (!usedHint) {
      setUsedHint(true);
      dispatch(updateProgress({
        game: "words",
        score: localScore,
        completed: false,
        streak: 0,
        maxDifficulty: maxDifficulty,
      }));
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setLocalScore(0);
    setShowResult(false);
    dispatch(updateProgress({
      game: "words",
      score: 0,
      completed: false,
      maxDifficulty: maxDifficulty,
    }));
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
            50% { transform: scale(1.05); }
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
            opacity: 0.7;
            cursor: not-allowed;
          }
          .card-correct {
            border-color: #22c55e !important;
            animation: scale 0.3s ease-in-out;
          }
          .card-incorrect {
            border-color: #ef4444 !important;
            animation: shake 0.3s ease-in-out;
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
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
                className={`p-2 rounded-lg border-4 transition-all duration-200
                  ${isProcessing ? "disabled-button" : ""}
                  ${buttonStates[index] === "correct" ? "card-correct" : ""}
                  ${buttonStates[index] === "incorrect" ? "card-incorrect" : ""}
                  ${difficulty === "easy" && option.name === currentWord.name && buttonStates[index] === "neutral" ? "border-green-300" : "border-gray-300"}
                `}
                disabled={isProcessing || buttonStates.some((state) => state !== "neutral")}
              >
                <img
                  src={option.image || "/assets/placeholder.png"}
                  alt={option.name || "Option"}
                  className="w-24 h-24 object-contain mx-auto"
                  onError={(e) => {
                    console.error(`Failed to load image for ${option.name}:`, option.image);
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