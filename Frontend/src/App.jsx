import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import CommunityForum from './Pages/Community';

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
