import React from "react";
import JoinForm from "./JoinForm";
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Message from "./Message";
import { Chat } from "./Chat/Chat";
import Conference from "./Conference";
import Footer from "./Footer";
import Header from "./Header"; // Ensure you have imported Header
import ChatRoom from "./Chat/Chat2";
import "./Webcam.css"

function WebCam() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

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
        <div className="meetuipage flex flex-row">

        <div className="meetuipage flex flex-row">
    <div className="bablu flex flex-col">
        <Conference />
        <div class="linkdiv">
    <button class="play-now-btn" onclick="window.open('https://smashkarts.io/', '_blank')">
        Play Now
    </button>
</div>


        <Footer />
    </div>
    
    <div className="chat3">
        lmaooooooooo
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
