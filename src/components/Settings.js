import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setVolume, setCustomMaxNumber } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { name, age, learningGoals, volume, customMaxNumber, difficulty } =
    useSelector((state) => state.user);
  const [newName, setNewName] = useState(name);
  const [newAge, setNewAge] = useState(age);
  const [newGoals, setNewGoals] = useState(learningGoals);
  const [newMaxNumber, setNewMaxNumber] = useState(customMaxNumber || "");
  const [newDifficulty, setNewDifficulty] = useState(difficulty);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    dispatch(
      setUserData({
        name: newName,
        age: parseInt(newAge),
        learningGoals: newGoals,
        difficulty: newDifficulty,
      })
    );
    dispatch(setCustomMaxNumber(newMaxNumber ? parseInt(newMaxNumber) : null));
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded-lg text-lg"
        />
        <input
          type="number"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          placeholder="Age"
          className="border p-2 rounded-lg text-lg"
        />
        <input
          type="text"
          value={newGoals}
          onChange={(e) => setNewGoals(e.target.value)}
          placeholder="Learning Goals"
          className="border p-2 rounded-lg text-lg"
        />
        <input
          type="number"
          value={newMaxNumber}
          onChange={(e) => setNewMaxNumber(e.target.value)}
          placeholder="Custom Max Number (e.g., 10, 15, 20)"
          className="border p-2 rounded-lg text-lg"
        />
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Game Difficulty</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setNewDifficulty("easy")}
              className={`px-4 py-2 rounded-lg text-xl ${
                newDifficulty === "easy"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Easy
            </button>
            <button
              type="button"
              onClick={() => setNewDifficulty("normal")}
              className={`px-4 py-2 rounded-lg text-xl ${
                newDifficulty === "normal"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Normal
            </button>
          </div>
        </div>
        <div>
          <label className="text-lg">Volume: {volume}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => dispatch(setVolume(parseInt(e.target.value)))}
            className="w-full"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Settings;
