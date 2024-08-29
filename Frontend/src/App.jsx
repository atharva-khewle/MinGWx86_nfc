import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import { Games } from "./Pages/Games";
// import CommunityForum from './Pages/Community';
import { Tournaments } from "./Pages/Tournaments";
import { Merch } from "./Pages/Merch";
import { ProfilePage } from "./Pages/ProfilePage";
import CommunityForum from "./Pages/Community";
import WebCam from "./components/Webcam";
import CameraCapture from "./components/Camera";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/community" element={<CommunityForum />} />
      </Routes>
    </Router>
  );
}

export default App;
