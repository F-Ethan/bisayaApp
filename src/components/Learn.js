import { useSelector, useDispatch } from "react-redux";
import { updateProgress, setCurrentGame } from "../store/gameSlice";
import ColorGame from "./ColorGame";
import NumbersGame from "./NumbersGame";
import { Link } from "react-router-dom";

function Learn() {
  const { currentGame } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const games = ["colors", "numbers", "dragDrop"];
  const nextGame = () => {
    const currentIndex = games.indexOf(currentGame);
    const nextIndex = (currentIndex + 1) % games.length;
    dispatch(setCurrentGame(games[nextIndex]));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-100">
      {/* Navigation Buttons in Top-Left */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Link to="/home">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700">
            Home
          </button>
        </Link>
        <Link to="/settings">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-purple-700">
            Settings
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Let's Learn Bisaya!
      </h1>
      {currentGame === "colors" && <ColorGame />}
      {currentGame === "numbers" && <NumbersGame />}
      {currentGame === "dragDrop" && (
        <p className="text-lg">Drag-and-Drop Game (To be implemented)</p>
      )}

      {/* Next Game Button */}
      <div className="mt-6">
        <button
          onClick={nextGame}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-700"
        >
          Next Game
        </button>
      </div>
    </div>
  );
}

export default Learn;
