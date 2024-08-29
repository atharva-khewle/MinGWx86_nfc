import React, { useEffect } from "react";
import {
  useHMSStore,
  useHMSActions,
  useHMSNotifications,
  selectPeers,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";

const VideoConf = () => {
  const peers = useHMSStore(selectPeers);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const notifications = useHMSNotifications();

  useEffect(() => {
    // Listen to any notifications from the SDK
    notifications.on("peer-joined", (data) => {
      console.log("Peer joined:", data);
    });

    // Cleanup on component unmount
    return () => {
      notifications.off("peer-joined");
    };
  }, [notifications]);

  const joinRoom = async () => {
    await hmsActions.join({
      userName: "Your Name",
      authToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjQ5MDc2NDMsImV4cCI6MTcyNTUxMjQ0MywianRpIjoiMDRhYWE3MzEtMjM0NS00OTkyLWJiNjgtZGEyOTExYTk5ODQyIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MjQ5MDc2NDMsImFjY2Vzc19rZXkiOiI2NmQwMDA2NjMzY2U3NGFiOWJlOTNiYmEifQ.6HNiQB9vsUl26bfyNSu9kNAZI9LzoXu_ZyEpI7HGEX8", // Replace this with a valid token
    });
  };

  const leaveRoom = async () => {
    await hmsActions.leave();
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={joinRoom}>Join Room</button>
      ) : (
        <>
          <button onClick={leaveRoom}>Leave Room</button>
          <div>
            {peers.map((peer) => (
              <div key={peer.id}>
                {peer.name} - {peer.isLocal ? "You" : "Remote"}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoConf;
