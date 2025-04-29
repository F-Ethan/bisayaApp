import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../../store/gameSlice";
import questionStartAudio from "../../assets/audio/question_start.m4a";
import questionEndAudio from "../../assets/audio/question_end.m4a";
import { bisayaNumbers, dotPatterns, numberAudio } from "../../data/numbers";

function NumbersGame({ onQuestionAnswered }) {
  const { age, volume, difficulty, customMaxNumber } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [cardStates, setCardStates] = useState(
    Array(4).fill({ state: "neutral", flipped: false })
  );
  const [currentNumber, setCurrentNumber] = useState(1);
  const [options, setOptions] = useState([]);
  const maxNumber = customMaxNumber || (age <= 3 ? 10 : age === 4 ? 20 : 30);
  const totalQuestions = 5;
  const currentAudioRef = useRef(null); // Track current audio

  // Play audio with volume control, stopping any current audio
  const playAudio = (audioFile) => {
    return new Promise((resolve) => {
      // Stop any currently playing audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0; // Reset to start
        currentAudioRef.current = null;
      }

      const audio = new Audio(audioFile);
      currentAudioRef.current = audio; // Store new audio instance
      audio.volume = volume / 100; // Convert 0-100 to 0-1
      audio.onended = () => {
        currentAudioRef.current = null; // Clear ref when audio ends
        resolve();
      };
      audio.play().catch((error) => {
        console.error("Audio playback error:", error);
        currentAudioRef.current = null; // Clear ref on error
        resolve(); // Resolve even if error to continue sequence
      });
    });
  };

  // Play question audio sequence
  const playQuestionAudio = async (number) => {
    await playAudio(questionStartAudio); // "Unsang kard ang adunay..."
    if (numberAudio[number]) {
      await playAudio(numberAudio[number]); // e.g., "usa"
    } else {
      console.log(`No number audio for ${number}`);
    }
    await playAudio(questionEndAudio); // "ka tuldok?"
  };

  // Generate new question
  const generateQuestion = () => {
    const number = Math.floor(Math.random() * maxNumber) + 1;
    setCurrentNumber(number);
    const tempOptions = [number];
    while (tempOptions.length < 4) {
      const randomNum = Math.floor(Math.random() * maxNumber) + 1;
      if (!tempOptions.includes(randomNum)) {
        tempOptions.push(randomNum);
      }
    }
    setOptions(tempOptions.sort(() => Math.random() - 0.5));
    setCardStates(Array(4).fill({ state: "neutral", flipped: false }));

    // Play question audio sequence
    playQuestionAudio(number);
  };

  // Initialize first question
  useEffect(() => {
    generateQuestion();
  }, []);

  const handleCardClick = (index, selectedNumber) => {
    if (cardStates[index].flipped) return;

    const newCardStates = [...cardStates];
    let proceedToNext = false;

    // Play number audio on click
    if (numberAudio[selectedNumber]) {
      playAudio(numberAudio[selectedNumber]);
    } else {
      console.log(`No audio for number ${selectedNumber} yet`);
    }

    if (selectedNumber === currentNumber) {
      newCardStates[index] = { state: "correct", flipped: true };
      setScore(score + 1);
      console.log(`Correct! Volume: ${volume}%`);
      proceedToNext = true;
    } else if (difficulty === "normal") {
      newCardStates[index] = { state: "incorrect", flipped: true };
      console.log(`Incorrect! Volume: ${volume}%`);
      proceedToNext = true;
    } else {
      newCardStates[index] = { state: "incorrect", flipped: true }; // Flip to show feedback
      console.log(`Try again! Volume: ${volume}%`);
    }

    setCardStates(newCardStates);

    if (proceedToNext) {
      setTimeout(() => {
        // Reset card states to neutral before proceeding
        setCardStates(newCardStates.map(() => ({ state: "neutral", flipped: false })));

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
              game: "numbers",
              score: score,
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
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
      {!showResult ? (
        <>
          <h1 className="text-2xl mb-6 text-center w-full">
            <button
              onClick={() => playQuestionAudio(currentNumber)}
              className="inline-flex items-center justify-center hover:text-gray-700 focus:outline-none cursor-pointer"
              aria-label="Replay question audio"
            >
              Unsang kard ang adunay{" "}
              <span className="text-3xl text-blue-500 font-bold mx-1">
                {bisayaNumbers[currentNumber - 1]}
              </span>{" "}
              ka tuldok?
              {difficulty === "easy" && (
                <span className="text-4xl ml-2 font-bold">{currentNumber}</span>
              )}
              <span className="ml-2 text-blue-500 hover:text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 4v16a1 1 0 01-1.707.707L5.586 16z"
                  />
                </svg>
              </span>
            </button>
          </h1>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {options.map((num, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index, num)}
                  className={`w-32 h-32 rounded-lg shadow-md relative
                  ${
                    cardStates[index].state === "correct"
                      ? "border-4 border-green-500"
                      : cardStates[index].state === "incorrect"
                      ? "border-4 border-red-500"
                      : "border-4 border-gray-300"
                  }
                  bg-gray-100`}
                  style={{
                    perspective: "1000px",
                  }}
                  disabled={cardStates[index].flipped && difficulty === "normal"}
                >
                  <div
                    className="w-full h-full relative"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: cardStates[index].flipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                      transition: "transform 0.5s",
                    }}
                  >
                    {/* Front (Dots) */}
                    <div
                      className="absolute w-full h-full flex items-center justify-center bg-gray-100"
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        {dotPatterns[num].map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r="5" fill="black" />
                        ))}
                      </svg>
                    </div>
                    {/* Back (Number) */}
                    <div
                      className="absolute w-full h-full flex items-center justify-center bg-gray-100"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <span className="text-5xl font-bold">{num}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <p className="text-xl">
            Your score: {score} out of {totalQuestions}
          </p>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-600"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default NumbersGame;