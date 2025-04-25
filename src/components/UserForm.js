import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [learningGoals, setLearningGoals] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserData({ name, age: parseInt(age), learningGoals }));
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Welcome! Enter Your Info
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-lg text-lg"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2 rounded-lg text-lg"
            required
          />
          <input
            type="text"
            placeholder="Learning Goals (e.g., Colors, Numbers)"
            value={learningGoals}
            onChange={(e) => setLearningGoals(e.target.value)}
            className="border p-2 rounded-lg text-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
