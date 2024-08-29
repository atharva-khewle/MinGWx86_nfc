import React, { useState, useRef } from "react";
import { Box, Button, Flex, Input, Text } from "@100mslive/roomkit-react";

// Basic Chat Header Component
const ChatHeader = () => (
  <Flex
    css={{ p: "$4", bg: "$primary", color: "$on_primary" }}
    align="center"
    justify="between"
  >
    <Text variant="lg">Chat</Text>
  </Flex>
);

// Basic Chat Footer Component
const ChatFooter = ({ onSend, message, setMessage }) => (
  <Flex
    css={{ p: "$4", bg: "$surface_bright", alignItems: "center" }}
    align="center"
    justify="between"
  >
    <Input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message"
      css={{ flex: 1, mr: "$2" }}
    />
    <Button onClick={onSend}>Send</Button>
  </Flex>
);

// Main Chat Component
export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const listRef = useRef(null);

  // Simulate user information (in a real app, this would come from your authentication system)
  const currentUser = "User1"; // Replace with dynamic user data

  const handleSend = () => {
    if (message.trim()) {
      // Add a new message with the sender's information
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: currentUser },
      ]);
      setMessage(""); // Clear the input field
    }
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Flex direction="column" css={{ height: "100%" }}>
      <ChatHeader />
      <Box
        ref={listRef}
        css={{
          flex: 1,
          p: "$4",
          overflowY: "auto",
          bg: "$surface_light",
        }}
      >
        {messages.map((msg, index) => (
          <Text key={index} css={{ mb: "$2" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </Text>
        ))}
      </Box>
      <ChatFooter
        onSend={handleSend}
        message={message}
        setMessage={setMessage}
      />
    </Flex>
  );
};
