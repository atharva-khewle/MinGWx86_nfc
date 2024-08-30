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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NmQwMDA2NjMzY2U3NGFiOWJlOTNiYmEiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NmQwMDA3MmQ0ZTliMzJhOGY4MTkwOTQiLCJ1c2VyX2lkIjoiMTljZTdiZDEtOTAyMS00ZTYyLWIxMzYtZjIwMjhkMjgxOTZjIiwiZXhwIjoxNzI0OTk1NDUyLCJqdGkiOiIwYzE3OGExOC0xOTAxLTRjNTAtYTlkYy05YzM0NjVhMTczODMiLCJpYXQiOjE3MjQ5MDkwNTIsImlzcyI6IjY2ZDAwMDY2MzNjZTc0YWI5YmU5M2JiOCIsIm5iZiI6MTcyNDkwOTA1Miwic3ViIjoiYXBpIn0.iwkaN589QeehCgb_6_xUaGDAfxql6S33pmSsYNIylx8";

    try {
      await hmsActions.join({ userName: name, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="join-form">
        <h2>Join Room</h2>
        <div className="input-container">
          <input
            required
            value={inputValues.name}
            onChange={handleInputChange}
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
          />
        </div>
        <div className="input-container">
          <input
            required
            value={inputValues.roomCode}
            onChange={handleInputChange}
            id="room-code"
            type="text"
            name="roomCode"
            placeholder="Room code"
          />
        </div>
        <button className="btn-primary">Join</button>
      </form>
    </div>
  );
}

export default JoinForm;
