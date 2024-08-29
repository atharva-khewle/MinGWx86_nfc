import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState({});
  const [owner] = useState("Shun");  // Hardcoded for demo, make dynamic as needed

  useEffect(() => {
    // Listen for incoming messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Listen for typing indicators
    socket.on("typing", (user) => {
      setIsTyping((prevTyping) => ({ ...prevTyping, [user]: true }));
    });

    socket.on("stop typing", (user) => {
      setIsTyping((prevTyping) => ({ ...prevTyping, [user]: false }));
    });

    return () => {
      socket.off("chat message");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, []);

  const sendMessage = (message) => {
    const msgObj = { owner, message };
    socket.emit("chat message", msgObj);  // Emit message to the server
    setMessages((prevMessages) => [...prevMessages, msgObj]);  // Optimistically add the message
  };

  const handleTyping = () => {
    socket.emit("typing", owner);
  };

  const handleStopTyping = () => {
    socket.emit("stop typing", owner);
  };

  return (
    <div className="chatApp__room">
      <div className="chatApp__conv">
        <div className="chatApp__convTitle">{owner}'s display</div>
        <div className="chatApp__convTimeline">
          {messages.map((msg, index) => (
            <div key={index} className={`chatApp__convMessageItem ${owner === msg.owner ? "right" : "left"}`}>
              <span>{msg.owner}: {msg.message}</span>
            </div>
          ))}
        </div>
        <div className="chatApp__convSendMessage clearfix">
          <TypingIndicator isTyping={isTyping} owner={owner} />
          <input 
            type="text" 
            placeholder="Type a message..." 
            onKeyDown={handleTyping} 
            onKeyUp={handleStopTyping} 
            onBlur={handleStopTyping}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = ({ isTyping, owner }) => {
  const typers = Object.keys(isTyping).filter((user) => isTyping[user] && user !== owner);
  
  if (typers.length > 0) {
    return <div>{typers.join(", ")} is typing...</div>;
  }
  return null;
};

export default ChatRoom;
