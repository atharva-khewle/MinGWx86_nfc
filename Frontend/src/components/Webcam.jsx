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
      <Header />
      {isConnected ? (
        <>
          <Conference />
          <Footer />
          <Chat />
        </>
      ) : (
        <JoinForm />
      )}
      <Message />
    </>
  );
}

export default WebCam;
