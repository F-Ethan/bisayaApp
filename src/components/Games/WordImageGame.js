import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../../store/gameSlice";
import words from "../../data/words";

function WordImageGame({ onQuestionAnswered }) {
  const { difficulty, name, volume } = useSelector((state) => state.user);
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
  const [hasGeneratedInitialQuestion, setHasGeneratedInitialQuestion] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(Array(4).fill(false));
  const audioRef = useRef(null);
  const totalQuestions = 5;

  const isSingleQuestionMode = typeof onQuestionAnswered === "function";

  const fallbackWord = {
    name: "Fallback",
    translation: "placeholder",
    image: "/assets/placeholder.png",
    bisaya_sentence: "This is a fallback word.",
    english_sentence: "This is a fallback word.",
    difficulty: 1,
    en_audio: null,
    bis_audio: null,
  };

  // Function to play audio
  const playAudio = (audioFile) => {
    if (audioFile && volume > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      try {
        const audioPath = typeof audioFile === "string" ? audioFile : audioFile.default;
        audioRef.current = new Audio(audioPath);
        audioRef.current.volume = volume / 100;
        audioRef.current.play().catch((error) => console.error("Audio playback error:", error));
      } catch (error) {
        console.error("Error loading audio file:", error);
      }
    }
  };

  // Function to stop any playing audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  // Memoize filtered words to prevent unnecessary recalculations
  const filteredWords = useMemo(() => {
    if (!words || !Array.isArray(words) || words.length === 0) {
      console.error("Words array is empty, undefined, or not an array");
      return [fallbackWord];
    }

    const maxDifficultyForUser = parseInt(maxDifficulty, 10) || 1;
    console.log(`Filtering words for difficulty 1-${maxDifficultyForUser}`);

    let validWords = words
      .filter((word) => {
        const wordDifficulty = parseInt(word.difficulty, 10);
        const isValidDifficulty =
          !isNaN(wordDifficulty) && wordDifficulty >= 1 && wordDifficulty <= maxDifficultyForUser;
        const resolvedImage =
          typeof word.image_filepath === "string"
            ? word.image_filepath
            : word.image_filepath?.default || "/assets/placeholder.png";
        const isValidImage =
          resolvedImage &&
          typeof resolvedImage === "string" &&
          !resolvedImage.startsWith("data:image") &&
          resolvedImage.endsWith(".png");
        return isValidDifficulty && isValidImage;
      })
      .map((word) => ({
        name: word.bis_name || "Unknown",
        translation: word.en_name || "",
        image:
          typeof word.image_filepath === "string"
            ? word.image_filepath
            : word.image_filepath?.default || "/assets/placeholder.png",
        bisaya_sentence: word.bis_sentence || "",
        english_sentence: word.en_sentence || "",
        difficulty: parseInt(word.difficulty, 10),
        en_audio: word.en_audio?.default || word.en_audio || null,
        bis_audio: word.bis_audio?.default || word.bis_audio || null,
      }));

    if (validWords.length === 0) {
      console.warn("No words passed strict image validation, allowing any image path");
      validWords = words
        .filter((word) => {
          const wordDifficulty = parseInt(word.difficulty, 10);
          const isValidDifficulty =
            !isNaN(wordDifficulty) && wordDifficulty >= 1 && wordDifficulty <= maxDifficultyForUser;
          return isValidDifficulty;
        })
        .map((word) => ({
          name: word.bis_name || "Unknown",
          translation: word.en_name || "",
          image:
            typeof word.image_filepath === "string"
              ? word.image_filepath
              : word.image_filepath?.default || "/assets/placeholder.png",
          bisaya_sentence: word.bis_sentence || "",
          english_sentence: word.en_sentence || "",
          difficulty: parseInt(word.difficulty, 10),
          en_audio: word.en_audio?.default || word.en_audio || null,
          bis_audio: word.bis_audio?.default || word.bis_audio || null,
        }));
    }

    console.log(`Filtered words count: ${validWords.length}`);
    return validWords.length > 0 ? validWords : [fallbackWord];
  }, [maxDifficulty]);

  // Preload audio files to reduce playback latency
  useEffect(() => {
    const preloadAudios = () => {
      filteredWords.forEach((word) => {
        if (word.bis_audio) {
          const bisAudio = new Audio(
            typeof word.bis_audio === "string" ? word.bis_audio : word.bis_audio.default
          );
          bisAudio.preload = "auto";
        }
        if (word.en_audio) {
          const enAudio = new Audio(
            typeof word.en_audio === "string" ? word.en_audio : word.en_audio.default
          );
          enAudio.preload = "auto";
        }
      });
    };
    preloadAudios();
  }, [filteredWords]);

  const generateQuestion = useCallback(() => {
    if (filteredWords.length === 0) {
      console.error("No filtered words available");
      setCurrentWord(fallbackWord);
      setOptions([fallbackWord]);
      return;
    }

    const wordIndex = Math.floor(Math.random() * filteredWords.length);
    const correctWord = filteredWords[wordIndex] || fallbackWord;
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
    const shuffledOptions = tempOptions.sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
    setButtonStates(Array(4).fill("neutral"));
    setDisabledButtons(Array(4).fill(false));
    setShowHint(false);
    setUsedHint(false);
    setShowEnglishSentence(false);
    setIsProcessing(false);
    setCurrentWord(correctWord);
    playAudio(correctWord.bis_audio);
    console.log("Generated currentWord:", correctWord.name);
  }, [filteredWords]);

  useEffect(() => {
    if (filteredWords.length > 0 && !hasGeneratedInitialQuestion) {
      generateQuestion();
      setHasGeneratedInitialQuestion(true);
    }
  }, [filteredWords, hasGeneratedInitialQuestion, generateQuestion]);

  const handleAnswerClick = (index, selectedWord, event) => {
    event.preventDefault();
    if (isProcessing || disabledButtons[index] || buttonStates.some((state) => state === "correct")) {
      return;
    }

    setIsProcessing(true);
    playAudio(showEnglishSentence ? selectedWord.en_audio : selectedWord.bis_audio);
    const newButtonStates = [...buttonStates];
    const newDisabledButtons = [...disabledButtons];

    if (selectedWord.name === currentWord.name) {
      newButtonStates[index] = "correct";
      setButtonStates(newButtonStates);
      const newScore = localScore + 1;
      setLocalScore(newScore);
      if (!usedHint && !isSingleQuestionMode) {
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
      setTimeout(() => {
        setButtonStates(Array(4).fill("neutral"));
        setDisabledButtons(Array(4).fill(false));
        if (isSingleQuestionMode) {
          stopAudio();
          console.log("Calling onQuestionAnswered");
          if (typeof onQuestionAnswered === "function") {
            onQuestionAnswered();
          }
          setIsProcessing(false);
          return;
        }
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          generateQuestion();
        } else {
          setShowResult(true);
          dispatch(
            updateProgress({
              game: "words",
              score: newScore,
              completed: true,
              maxDifficulty: maxDifficulty,
            })
          );
        }
        setIsProcessing(false);
      }, 2000);
    } else {
      newButtonStates[index] = "incorrect";
      setButtonStates(newButtonStates);
      if (!isSingleQuestionMode) {
        dispatch(
          updateProgress({
            game: "words",
            score: localScore,
            completed: false,
            streak: 0,
            maxDifficulty: maxDifficulty,
          })
        );
      } else {
        dispatch(
          updateProgress({
            game: "words",
            streak: 0,
            completed: false,
            maxDifficulty: maxDifficulty,
          })
        );
      }
      if (difficulty === "easy") {
        newDisabledButtons[index] = true;
        setDisabledButtons(newDisabledButtons);
        setTimeout(() => {
          newButtonStates[index] = "tried";
          setButtonStates(newButtonStates);
          if (isSingleQuestionMode) {
            stopAudio();
            console.log("Calling onQuestionAnswered (easy mode)");
            if (typeof onQuestionAnswered === "function") {
              onQuestionAnswered();
            }
            setIsProcessing(false);
            return;
          }
          setIsProcessing(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setButtonStates(Array(4).fill("neutral"));
          setDisabledButtons(Array(4).fill(false));
          if (isSingleQuestionMode) {
            stopAudio();
            console.log("Calling onQuestionAnswered (non-easy mode)");
            if (typeof onQuestionAnswered === "function") {
              onQuestionAnswered();
            }
            setIsProcessing(false);
            return;
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
          setIsProcessing(false);
        }, 3000);
      }
    }
  };

  const handleHintClick = () => {
    if (isProcessing) return;
    setShowHint(!showHint);
    if (!showHint) {
      setUsedHint(true);
      playAudio(currentWord.en_audio);
      dispatch(
        updateProgress({
          game: "words",
          score: isSingleQuestionMode ? undefined : localScore,
          completed: false,
          streak: 0,
          maxDifficulty: maxDifficulty,
        })
      );
    }
  };

  const handleTitleClick = () => {
    if (isProcessing) return;
    setShowEnglishSentence(!showEnglishSentence);
    playAudio(showEnglishSentence ? currentWord.bis_audio : currentWord.en_audio);
    if (!usedHint) {
      setUsedHint(true);
      dispatch(
        updateProgress({
          game: "words",
          score: isSingleQuestionMode ? undefined : localScore,
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
    setHasGeneratedInitialQuestion(false);
    setShowEnglishSentence(false);
    setDisabledButtons(Array(4).fill(false));
    stopAudio();
    dispatch(
      updateProgress({
        game: "words",
        score: isSingleQuestionMode ? undefined : 0,
        completed: false,
        maxDifficulty: maxDifficulty,
      })
    );
    generateQuestion();
  };

  if (!currentWord) {
    return <div>Loading...</div>;
  }

  const progressPercentage = (streak / 10) * 100;

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
          .card-tried {
            border: 4px dashed #ef4444 !important;
            opacity: 0.5;
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
          <div className="flex Analysis justification-end mb-4">
            <p className="text-lg">difficulty: {maxDifficulty}</p>
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
                  ${isProcessing || disabledButtons[index] ? "disabled-button" : ""}
                  ${buttonStates[index] === "correct" ? "card-correct" : ""}
                  ${buttonStates[index] === "incorrect" ? "card-incorrect" : ""}
                  ${buttonStates[index] === "tried" ? "card-tried" : ""}
                  ${
                    difficulty === "easy" &&
                    option.name === currentWord.name &&
                    buttonStates[index] === "neutral"
                      ? "border-green-300"
                      : "border-gray-300"
                  }`}
                disabled={isProcessing || disabledButtons[index] || buttonStates.some((state) => state === "correct")}
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
          <div className="mt-6">
            <p className="text-lg text-center mb-2">
              Progress to level {maxDifficulty + 1}: {streak}/10
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <p className="text-xl">
            Your score: {localScore} out of {totalQuestions}
          </p>
          <p className="text-lg">difficulty: {maxDifficulty}</p>
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