import React, { useState, useEffect } from "react";
import JoinForm from "./JoinForm";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Message from "./Message";
import Conference from "./Conference";
import Footer from "./Footer";
import axios from "axios";
import "./Webcam.css";

function WebCam() {
  const [moves, setMoves] = useState([]); // Array to store unique moves
  const [error, setError] = useState(null);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  const fetchLastMove = async () => {
    try {
      const response = await axios.get('https://lichess.org/api/account/playing', {
        headers: {
          'Authorization': 'Bearer lip_JhZZIhiL1Rc7VNsWopQI', // Your token here
          'Accept': 'application/json',
        },
      });

      const data = response.data;

      if (data.nowPlaying && data.nowPlaying.length > 0) {
        const game = data.nowPlaying[0]; // Assume the first game is the one we're interested in
        if (game.lastMove) {
          setMoves(prevMoves => {
            if (prevMoves.includes(game.lastMove)) {
              return prevMoves; // Do not update if the move already exists
            }
            return [...prevMoves, game.lastMove]; // Append new move
          });
          console.log('Last Move:', game.lastMove); // Log the last move
        }
      } else {
        setError('No active games found.');
        console.log('No active games found.');
      }
    } catch (error) {
      setError('Error fetching data.');
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call fetchLastMove immediately and then every 0.7 seconds
    fetchLastMove();
    const interval = setInterval(fetchLastMove, 700); // 0.7 seconds

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <>
      {isConnected ? (
        <>
          <div className="meetuipage flex flex-row bg-gray-900">
            <div className="meetuipage flex flex-row">
              <div className="bablu flex flex-col">
                <Conference />
                <div className="linkdiv">
                  <button
                    className="play-now-btn"
                    onClick={() => window.open('https://smashkarts.io/', '_blank')}
                  >
                    Play Now
                  </button>
                  <button
                    className="play-now-btn mt-4"
                    onClick={() => window.open('https://lichess.org/', '_blank')}
                  >
                    Play Chess
                  </button>
                </div>
                <Footer />
              </div>

              <div className="chat3 bg-gray-950">
                {error && <p className="text-red-500">{error}</p>}
                {moves.length > 0 ? (
                  <ul className="text-white">
                    {moves.map((move, index) => (
                      <li key={index}>Last Move: {move}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white">No moves detected.</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <JoinForm />
      )}
      <Message />
    </>
  );
}

export default WebCam;
