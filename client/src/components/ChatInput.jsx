import React from "react";

function ChatInput({ message, setMessage, handleSubmit }) {
  return (
    <form className="ChatInput" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
