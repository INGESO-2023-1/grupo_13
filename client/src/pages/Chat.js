import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import "../styles/Chat.css";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { useNavigate } from "react-router-dom";
import Contacts from "./Contacts";

const socket = io("http://localhost:4000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const reciveMessage = (message) => {
      setMessages([...messages, message]);
    };

    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, [messages]);

  return (
    <div className="App">
      <p>{localStorage.getItem("chat-user")}</p>
      <Contacts />
      <ChatMessages messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Chat;
