import { useState } from "react";
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
