import { Link } from "react-router-dom";
import { useState } from "react";
import { HomeIcon, CogIcon } from "@heroicons/react/24/solid";
import ColorGame from "./Games/ColorGame";
import NumbersGame from "./Games/NumbersGame";
import WordImageGame from "./Games/WordImageGame";
import BookGame from "./Games/BookGame";


function Play() {
  const [currentGameIndex, setCurrentGameIndex] = useState(Math.floor(Math.random() * 3));
  const games = [
    { component: ColorGame, name: "Colors" },
    { component: NumbersGame, name: "Numbers" },
    { component: WordImageGame, name: "Words" },
    //{ component: BookGame, name: "Books" },

  ];

  // Select a random game, avoiding immediate repeats
  const selectRandomGame = () => {
    let newIndex = Math.floor(Math.random() * games.length);
    while (newIndex === currentGameIndex) {
      newIndex = Math.floor(Math.random() * games.length);
    }
    setCurrentGameIndex(newIndex);
  };

  // Called when a question is answered
  const handleQuestionAnswered = () => {
    selectRandomGame();
  };

  const CurrentGame = games[currentGameIndex].component;

  return (
    <div className="container mx-auto p-4">
      {/* Navigation Icons */}
      <div className="flex justify-end space-x-4 mb-4">
        <Link to="/Home">
          <HomeIcon
            className="h-10 w-10 text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Go to Home"
          />
        </Link>
        <Link to="/settings">
          <CogIcon
            className="h-10 w-10 text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Go to Settings"
          />
        </Link>
      </div>

      {/* Game Title and Content */}
      
      <CurrentGame onQuestionAnswered={handleQuestionAnswered} />
    </div>
  );
}

export default Play;