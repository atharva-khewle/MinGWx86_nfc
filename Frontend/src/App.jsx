import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import { Games } from "./Pages/Games";
import { Tournaments } from "./Pages/Tournaments";
import { ProfilePage } from "./Pages/ProfilePage";
import CommunityForum from "./Pages/Community";
import WebCam from "./components/Webcam";
import CameraCapture from "./components/Camera";
import Merch from "./Pages/Merch.jsx"
import {
  useHMSStore,
  useHMSActions,
  selectIsConnectedToRoom,
  HMSRoomProvider,
} from "@100mslive/react-sdk"; // Import HMSRoomProvider

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cameracapture" element={<CameraCapture />} />
        <Route path="/community" element={<CommunityForum />} />
        <Route path="/merch" element={<Merch />} />
      </Routes>
    </Router>
  );
}

export default App;
