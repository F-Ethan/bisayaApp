import { Link } from "react-router-dom";
import { useState } from "react";
import { HomeIcon, CogIcon } from "@heroicons/react/24/solid";
import ColorGame from "./ColorGame";
import NumbersGame from "./NumbersGame";
import WordImageGame from "./WordImageGame";

function Learn() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const games = [
    { component: ColorGame, name: "Colors" },
    { component: NumbersGame, name: "Numbers" },
    { component: WordImageGame, name: "Words" },
  ];

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
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
      <h1 className="text-3xl font-bold mb-4 text-center">
        Learn Bisaya - {games[currentGameIndex].name}
      </h1>
      <CurrentGame />
      <div className="text-center mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700"
          onClick={handleNextGame}
        >
          Next Game
        </button>
      </div>
    </div>
  );
}

export default Learn;