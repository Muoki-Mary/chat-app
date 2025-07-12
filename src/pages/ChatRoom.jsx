import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatRoom.css";

const ChatRoom = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const newMessage = { user: username, text: input };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="chatroom-wrapper">
      <div className="chatroom-header">
        <h3>Chat Room</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="chatroom-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === username ? "own" : ""}`}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form className="chatroom-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
