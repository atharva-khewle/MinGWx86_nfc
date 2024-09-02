import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import "./JoinForm.css";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
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
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NmQwMDA2NjMzY2U3NGFiOWJlOTNiYmEiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NmQ1ODM0ZGI5ZTkwYjNhYzZhOTI0ZjEiLCJ1c2VyX2lkIjoiNDFkMTQwOTktMjhjNi00NmVmLThjNTItYzY1ZmYyODUyM2ZjIiwiZXhwIjoxNzI1MzU1MjE0LCJqdGkiOiI4MmNhM2M2YS1kZWVhLTQ2YjQtYTg4ZS1lYzU1MTVkYTQwYTAiLCJpYXQiOjE3MjUyNjg4MTQsImlzcyI6IjY2ZDAwMDY2MzNjZTc0YWI5YmU5M2JiOCIsIm5iZiI6MTcyNTI2ODgxNCwic3ViIjoiYXBpIn0.abrgn_7XzRqqFC3zGflkPJptugqCtzJRWxkFNgQjXiQ"; //auth token

    try {
      await hmsActions.join({ userName: name, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-white">
          Join Room
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-400"
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
            className="w-full px-4 py-2 text-sm text-gray-200 placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="room-code"
            className="block mb-2 text-sm font-medium text-gray-400"
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
            className="w-full px-4 py-2 text-sm text-gray-200 placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md "
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 "
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default JoinForm;
