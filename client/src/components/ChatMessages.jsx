import React from "react";

function ChatMessages({ messages }) {
  return (
    <div className="ChatMessages">

      {messages.map((message) => (
          <p className={`ChatMsg ${message.from === "Me" ? "MyMsg" : "TheirMsg"}`}>{message.from}: {message.body}</p>
      ))}
    </div>
  );
}

export default ChatMessages;
