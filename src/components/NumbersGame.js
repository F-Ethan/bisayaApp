
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProgress } from '../store/gameSlice';

const bisayaNumbers = [
'Usa', 'Duha', 'Tulo', 'Upat', 'Lima', 'Unom', 'Pito', 'Walo', 'Siyam', 'Napulo',
'Napulog usa', 'Napulog duha', 'Napulog tulo', 'Napulog upat', 'Napulog lima',
'Napulog unom', 'Napulog pito', 'Napulog walo', 'Napulog siyam', 'Kaluhaan',
'Kaluhaan og usa', 'Kaluhaan og duha', 'Kaluhaan og tulo', 'Kaluhaan og upat',
'Kaluhaan og lima', 'Kaluhaan og unom', 'Kaluhaan og pito', 'Kaluhaan og walo',
'Kaluhaan og siyam', 'Katloan'
];

const dotPatterns = {
1: [[50, 50]],
2: [[30, 30], [70, 70]],
3: [[30, 30], [50, 50], [70, 70]],
4: [[30, 30], [30, 70], [70, 30], [70, 70]],
5: [[30, 30], [30, 70], [50, 50], [70, 30], [70, 70]],
6: [[30, 30], [30, 50], [30, 70], [70, 30], [70, 50], [70, 70]],
7: [[30, 30], [30, 50], [30, 70], [50, 50], [70, 30], [70, 50], [70, 70]],
8: [[30, 30], [30, 50], [30, 70], [50, 30], [50, 70], [70, 30], [70, 50], [70, 70]],
9: [[30, 30], [30, 50], [30, 70], [50, 30], [50, 50], [50, 70], [70, 30], [70, 50], [70, 70]],
10: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 30], [40, 70], [60, 20], [60, 40], [60, 60], [60, 80]],
11: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 30], [40, 50], [40, 70], [60, 20], [60, 40], [60, 60], [60, 80]],
12: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80]],
13: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 30], [40, 50], [40, 70], [60, 20], [60, 40], [60, 60], [60, 80], [50, 20], [50, 80]],
14: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80], [50, 30], [50, 70]],
15: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80], [50, 30], [50, 50], [50, 70]],
16: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80], [30, 30], [30, 70], [70, 30], [70, 70]],
17: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80], [30, 30], [30, 70], [70, 30], [70, 70], [50, 50]],
18: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80], [30, 30], [30, 50], [30, 70], [70, 30], [70, 50], [70, 70]],
19: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80], [30, 30], [30, 50], [30, 70], [70, 30], [70, 50], [70, 70], [50, 50]],
20: [[20, 20], [20, 40], [20, 60], [20, 80], [40, 20], [40, 40], [40, 60], [40, 80], [60, 20], [60, 40], [60, 60], [60, 80], [30, 30], [30, 50], [30, 70], [70, 30], [70, 50], [70, 70], [50, 30], [50, 70]]
};

function NumbersGame() {
const { age, volume, difficulty, customMaxNumber } = useSelector((state) => state.user);
const dispatch = useDispatch();
const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [showResult, setShowResult] = useState(false);
const [cardStates, setCardStates] = useState(Array(4).fill({ state: 'neutral', flipped: false }));
const [currentNumber, setCurrentNumber] = useState(1);
const [options, setOptions] = useState([]);
const maxNumber = customMaxNumber || (age <= 3 ? 10 : age === 4 ? 20 : 30);
const totalQuestions = 5;

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
    setCardStates(Array(4).fill({ state: 'neutral', flipped: false }));
};

// Initialize first question
useEffect(() => {
    generateQuestion();
}, []);

const handleCardClick = (index, selectedNumber) => {
    if (cardStates[index].flipped) return;

    const newCardStates = [...cardStates];
    let proceedToNext = false;

    if (selectedNumber === currentNumber) {
    newCardStates[index] = { state: 'correct', flipped: true };
    setScore(score + 1);
    console.log(`Correct! Volume: ${volume}%`);
    proceedToNext = true;
    } else if (difficulty === 'normal') {
    newCardStates[index] = { state: 'incorrect', flipped: true };
    console.log(`Incorrect! Volume: ${volume}%`);
    proceedToNext = true;
    } else {
    newCardStates[index] = { state: 'incorrect', flipped: false };
    console.log(`Try again! Volume: ${volume}%`);
    }

    setCardStates(newCardStates);

    if (proceedToNext) {
    setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        generateQuestion();
        } else {
        setShowResult(true);
        dispatch(
            updateProgress({
            game: 'numbers',
            score: score + (selectedNumber === currentNumber ? 1 : 0),
            completed: true,
            })
        );
        }
    }, 1000);
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
    {!showResult ? (
        <>
        <h2 className="text-2xl mb-4 text-center">
            Unsang kard ang adunay{' '}
            <span className="text-3xl text-blue-500 font-bold">
            {bisayaNumbers[currentNumber - 1]}
            </span>{' '}
            ka tuldok?
            {difficulty === 'easy' && (
            <span className="text-4xl ml-2 font-bold">{currentNumber}</span>
            )}
        </h2>
        <div className="grid grid-cols-2 gap-4">
            {options.map((num, index) => (
            <button
                key={index}
                onClick={() => handleCardClick(index, num)}
                className={`w-32 h-32 rounded-lg shadow-md relative
                ${cardStates[index].state === 'correct' ? 'border-4 border-green-500' : 
                    cardStates[index].state === 'incorrect' ? 'border-4 border-red-500' : 'border-4 border-gray-300'}
                bg-gray-100`}
                style={{
                perspective: '1000px',
                }}
                disabled={cardStates[index].flipped}
            >
                <div
                className="w-full h-full relative"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: cardStates[index].flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.5s',
                }}
                >
                {/* Front (Dots) */}
                <div
                    className="absolute w-full h-full flex items-center justify-center bg-gray-100"
                    style={{
                    backfaceVisibility: 'hidden',
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
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    }}
                >
                    <span className="text-5xl font-bold">{num}</span>
                </div>
                </div>
            </button>
            ))}
        </div>
        </>
    ) : (
        <div className="text-center">
        <h2 className="text-2xl mb-4">Game Over!</h2>
        <p className="text-xl">Your score: {score} out of {totalQuestions}</p>
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

export default NumbersGame;
