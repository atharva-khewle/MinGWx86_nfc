// import React, { useEffect } from "react";
// import {
//   useHMSStore,
//   useHMSActions,
//   selectHMSMessages,
// } from "@100mslive/react-sdk";
// import Message from "./components/Message";

// export default function Chat() {
//   const hmsActions = useHMSActions(); // Initialize hmsActions
//   const allMessages = useHMSStore(selectHMSMessages); // Get all messages

//   useEffect(() => {
//     console.log(allMessages);
//     const sendMessage = async () => {
//       try {
//         console.log("Attempting to send a broadcast message...");
//         await hmsActions.sendBroadcastMessage("hello everyone!");
//         console.log("Broadcast message sent successfully.");
//       } catch (error) {
//         console.error("Failed to send broadcast message:", error);
//       }
//     };

//     // Call sendMessage when the component mounts
//     sendMessage();

//     // Optionally, you can add a cleanup function if needed
//     return () => {
//       // Perform any necessary cleanup here
//     };
//   }, [hmsActions]); // Make sure to include hmsActions in the dependency array

//   return (
//     <>
//       {allMessages.map((msg) => (
//         <Message key={msg.id} message={msg.text || "No message content"} />
//       ))}
//     </>
//   );
// }
