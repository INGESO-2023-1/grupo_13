import React from "react";

function ChatMessages({ messages }) {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.from}: {message.body}</p>
        </div>
      ))}
    </>
  );
}

export default ChatMessages;