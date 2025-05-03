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
  const [showLicense, setShowLicense] = useState(false); // State for license modal
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

  // Apache License 2.0 text (abridged for brevity; include full text in practice)
  const apacheLicense = `
Apache License, Version 2.0
Copyright © Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[Full text available at: http://www.apache.org/licenses/LICENSE-2.0]
`;

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
        {/* Attribution Section */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Credits</label>
          <p className="text-sm text-gray-600">
            Emoji images provided by Google Noto Emoji, licensed under the Apache
            License 2.0. Copyright © Google Inc. All Rights Reserved.
          </p>
          <button
            onClick={() => setShowLicense(true)}
            className="text-blue-500 text-sm underline hover:text-blue-700"
          >
            View License
          </button>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      {/* License Modal */}
      {showLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-purple-600 mb-4">
              Apache License 2.0
            </h2>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {apacheLicense}
            </pre>
            <button
              onClick={() => setShowLicense(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;