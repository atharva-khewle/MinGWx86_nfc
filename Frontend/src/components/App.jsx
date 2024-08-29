import "./App.css";
import JoinForm from "./components/JoinForm";
import Navbar from "./components/Navbar";
import VideoConf from "./components/VideoConf";

import { useEffect } from "react";
import Peer from "./components/Peer";
import Conference from "./components/Conference";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Message from "./components/Message";
import { Chat } from "./components/Chat/Chat";
function App() {
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
      )}{" "}
      <Message />
      {/* <Peer /> */}
      {/* <VideoConf /> */}
      {/* <div className="bg-blue-200 max-w-[100%] min-h-[100vh]">
        <Navbar />
        <div>Landing Page</div>
      </div> */}
    </>
  );
}

export default App;
