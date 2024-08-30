import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import "./JoinForm.css";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    roomCode: "",
    roomCode: "",
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, roomCode } = inputValues;

    // use room code to fetch auth token
    const authToken = "YOUR_AUTH_TOKEN"; // replace with actual token

    try {
      await hmsActions.join({ userName: name, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Join Room
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            required
            value={inputValues.name}
            onChange={handleInputChange}
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="room-code"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Room Code
          </label>
          <input
            value={inputValues.roomCode}
            onChange={handleInputChange}
            id="room-code"
            type="text"
            name="roomCode"
            placeholder="Enter room code"
            className="w-full px-4 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default JoinForm;
