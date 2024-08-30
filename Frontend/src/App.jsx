import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import { Games } from "./Pages/Games";
import { Tournaments } from "./Pages/Tournaments";
import { ProfilePage } from "./Pages/ProfilePage";
import CommunityForum from "./Pages/Community";
import WebCam from "./components/Webcam";
import CameraCapture from "./components/Camera";
import Merch from "./Pages/Merch.jsx";
import FormModal from "./Pages/Signup.jsx";
import MatchComponent from "./components/MatchComponent.jsx";
import Profile from "./Pages/Profile.jsx";
import { useEffect } from "react";

function App() {
// localStorage.setItem("token","66d14e7d7a26cf86968defd3")
let isAuthenticated = localStorage.getItem("token")
useEffect(()=>{
  isAuthenticated="66d14e7d7a26cf86968defd3"
},[isAuthenticated])

  return (
    <Router>
        <Routes>
          <Route path="/" element={ <LandingPage /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/meet" element={ <WebCam /> } />
          <Route path="/cameracapture" element={ <CameraCapture /> } />
          <Route path="/community" element={ <CommunityForum /> } />
          <Route path="/tournaments" element={ <Tournaments />} />
          <Route path="/merch" element={ <Merch />} />
          <Route path="/matchingalgo" element={<MatchComponent />} />
          <Route path="/signup" element={ <FormModal />} />
        </Routes>
    </Router>
  );
}

export default App;
