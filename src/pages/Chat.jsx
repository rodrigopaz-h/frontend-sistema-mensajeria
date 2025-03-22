import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageCard from "../components/MessageCard";
import { API_URL } from "../config";

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/messages`);
        setMessages(response.data);
      } catch (err) {
        console.error("Error al cargar mensajes:", err);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const messageToSend = {
      senderId: user.id,
      senderName: user.username,
      content: newMessage,
    };

    try {
      const response = await axios.post(`${API_URL}/api/messages`, messageToSend);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 text-xl font-bold">Rapaz Chat</header>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <MessageCard key={msg.id} message={msg} userId={user.id} />
        ))}
      </div>

      <div className="p-4 bg-white flex gap-2 border-t">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded px-4 py-2 focus:outline-none"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
