import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import { Games } from './Pages/Games';
import CommunityForum from './Pages/Community';
import { Tournaments } from './Pages/Tournaments';
import { Merch } from './Pages/Merch';
import { ProfilePage } from './Pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/community" element={<LandingPage />} />
        <Route path="/games" element={<Games></Games>} />
        <Route path="/community" element={<CommunityForum></CommunityForum>} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
