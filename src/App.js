import { useState } from 'react';
const colors = [
       { name: 'Pula', hex: '#FF0000', english: 'Red' },
       { name: 'Asul', hex: '#0000FF', english: 'Blue' },
       { name: 'Dalag', hex: '#FFFF00', english: 'Yellow' },
       { name: 'Berde', hex: '#008000', english: 'Green' },
     ];

     function App() {
       const [currentQuestion, setCurrentQuestion] = useState(0);
       const [score, setScore] = useState(0);
       const [showResult, setShowResult] = useState(false);

       const currentColor = colors[currentQuestion];
       const options = colors.sort(() => Math.random() - 0.5).slice(0, 3);

       const handleAnswer = (selected) => {
         if (selected.name === currentColor.name) {
           setScore(score + 1);
           console.log('Correct!'); // Replace with audio later
         }
         if (currentQuestion < colors.length - 1) {
           setCurrentQuestion(currentQuestion + 1);
         } else {
           setShowResult(true);
         }
       };

       const resetGame = () => {
         setCurrentQuestion(0);
         setScore(0);
         setShowResult(false);
       };

       return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
           <h1 className="text-4xl font-bold text-purple-600 mb-8">Bisaya Colors</h1>
           {!showResult ? (
             <div className="bg-white p-6 rounded-lg shadow-lg">
               <h2 className="text-2xl mb-4">Unsang kolor ang {currentColor.name}?</h2>
               <div className="flex justify-center mb-4">
                 <div
                   className="w-32 h-32 rounded-full"
                   style={{ backgroundColor: currentColor.hex }}
                 ></div>
               </div>
               <div className="grid grid-cols-3 gap-4">
                 {options.map((option) => (
                   <button
                     key={option.name}
                     className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700"
                     onClick={() => handleAnswer(option)}
                   >
                     {option.name}
                   </button>
                 ))}
               </div>
             </div>
           ) : (
             <div className="bg-white p-6 rounded-lg shadow-lg text-center">
               <h2 className="text-2xl mb-4">Game Over!</h2>
               <p className="text-xl">Your score: {score} out of {colors.length}</p>
               <button
                 className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-700"
                 onClick={resetGame}
               >
                 Play Again
               </button>
             </div>
           )}
           <div className="mt-8">
             <p className="text-lg">Drag-and-Drop Game (To be implemented)</p>
           </div>
         </div>
       );
     }

     export default App;
  