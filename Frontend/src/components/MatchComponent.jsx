import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./MatchComponent.css"; // Create this CSS file for animations

const MatchComponent = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(true);
  const [matchProfile, setMatchProfile] = useState(null);

  useEffect(() => {
    // Simulate searching with a delay
    const timer = setTimeout(() => {
      // Set the matched profile photo URL
      setMatchProfile("https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2FJash.JPG?alt=media&token=9bdc90ec-805b-46af-a9ce-43d0a66b4b66"); // Replace with actual match photo URL
      setIsSearching(false);
//https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2FJuhi.jpg?alt=media&token=33b59920-a019-458e-a925-4cfda021d74a
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/meet");
      }, 3000); // 3 seconds delay before redirect
    }, 3000); // 3 seconds delay for searching

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen">
      {/* Left side - User Profile */}
      <div className="w-1/2 flex items-center justify-center bg-gray-800">
        <CSSTransition
          in={!isSearching}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2FJuhi.jpg?alt=media&token=33b59920-a019-458e-a925-4cfda021d74a"
            alt="User Profile"
            className="rounded-full w-64 h-64 object-cover shadow-lg"
          />
        </CSSTransition>
      </div>

      {/* Right side - Loading or Match Profile */}
      <div className="w-1/2 flex items-center justify-center bg-gray-700">
        {isSearching ? (
          <div className="text-center text-white">
            <div className="loader mb-4"></div>
            <p className="text-xl">Searching for the perfect match...</p>
          </div>
        ) : (
          <CSSTransition
            in={!isSearching}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <img
              src={matchProfile}
              alt="Matched Profile"
              className="rounded-full w-64 h-64 object-cover shadow-lg"
            />
          </CSSTransition>
        )}
      </div>
    </div>
  );
};

export default MatchComponent;
