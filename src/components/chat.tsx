import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Chat.css";

interface ChatProps {
  param: Driver[] | Circuit[];
}

const Chat: React.FC<ChatProps> = ({ param }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { user: userMessage, bot: "" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          params: param,
        }),
      });
      const data = await response.json();
      const modelResponse = data.model_response; // Recuperar únicamente el parámetro model_response
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].bot = modelResponse;
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].bot =
          "Error: Unable to fetch response.";
        return updatedMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {!isOpen && (
        <div className="chat-icon" onClick={toggleChat}>
          💬
        </div>
      )}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Chat with AI</h3>
            <button onClick={toggleChat} className="close-button">
              ✖
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                <div className="user-message">
                  <strong>You:</strong>
                  <ReactMarkdown>{msg.user}</ReactMarkdown>
                </div>
                {msg.bot && (
                  <div className="bot-message">
                    <strong>AI:</strong>
                    <ReactMarkdown>{msg.bot}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="loading">AI is typing...</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface Driver {
  driverId: number;
  driverRef: string;
  number: number;
  code: string;
  forename: string;
  surname: string;
  nationality: string;
  currentConstructor: string;
}

interface Circuit {
  circuitId: number;
  name: string;
  country: string;
}

export default Chat;
