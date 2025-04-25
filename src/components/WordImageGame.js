
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProgress } from '../store/gameSlice';

const words = [
{ name: 'mansanas', image: '/assets/images/mansanas.png' }, // Apple
{ name: 'silya', image: '/assets/images/silya.png' }, // Chair
{ name: 'sakyanan', image: '/assets/images/sakyanan.png' }, // Car
{ name: 'kahoy', image: '/assets/images/kahoy.png' }, // Tree
{ name: 'bola', image: '/assets/images/bola.png' }, // Ball
];

function WordImageGame() {
const { difficulty, volume } = useSelector((state) => state.user);
const dispatch = useDispatch();
const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [showResult, setShowResult] = useState(false);
const [currentWord, setCurrentWord] = useState(words[0]);
const [options, setOptions] = useState([]);
const [buttonStates, setButtonStates] = useState(Array(4).fill('neutral')); // neutral, correct, incorrect
const totalQuestions = 5;

// Generate new question
const generateQuestion = () => {
    const wordIndex = Math.floor(Math.random() * words.length);
    const correctWord = words[wordIndex];
    setCurrentWord(correctWord);

    // Generate 4 unique options, including the correct answer
    const tempOptions = [correctWord];
    while (tempOptions.length < 4) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    if (!tempOptions.includes(randomWord)) {
        tempOptions.push(randomWord);
    }
    }
    setOptions(tempOptions.sort(() => Math.random() - 0.5));
    setButtonStates(Array(4).fill('neutral'));
};

// Initialize first question
useEffect(() => {
    generateQuestion();
}, []);

const handleAnswerClick = (index, selectedWord) => {
    if (buttonStates.some((state) => state !== 'neutral')) return;

    const newButtonStates = [...buttonStates];
    let proceedToNext = false;

    if (selectedWord.name === currentWord.name) {
    newButtonStates[index] = 'correct';
    setScore(score + 1);
    console.log(`Correct! Volume: ${volume}% (volume for future audio)`);
    proceedToNext = true;
    } else if (difficulty === 'normal') {
    newButtonStates[index] = 'incorrect';
    console.log(`Incorrect! Volume: ${volume}% (volume for future audio)`);
    proceedToNext = true;
    } else {
    newButtonStates[index] = 'incorrect';
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
            game: 'words',
            score: score + (selectedWord.name === currentWord.name ? 1 : 0),
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
        <h2 className="text-2xl mb-4 text-center">Unsa kini?</h2>
        <div className="text-3xl font-bold text-center mb-4">{currentWord.name}</div>
        <div className="grid grid-cols-2 gap-4">
            {options.map((word, index) => (
            <button
                key={index}
                onClick={() => handleAnswerClick(index, word)}
                className={`p-2 rounded-lg
                ${buttonStates[index] === 'correct' ? 'border-4 border-green-500 animate-scale' : 
                    buttonStates[index] === 'incorrect' ? 'border-4 border-red-500 animate-shake' : 
                    difficulty === 'easy' && word.name === currentWord.name ? 'border-4 border-green-300' : 'border-4 border-gray-300'}`}
                disabled={buttonStates.some((state) => state !== 'neutral') && difficulty === 'normal'}
            >
                <img
                src={word.image}
                alt={word.name}
                className="w-24 h-24 object-contain mx-auto"
                />
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

export default WordImageGame;
