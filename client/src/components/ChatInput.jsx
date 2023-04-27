import React from "react";

function ChatInput({ message, setMessage, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={e => setMessage(e.target.value)} value={message} />
      <button>Send</button>
    </form>
  );
}

export default ChatInput;