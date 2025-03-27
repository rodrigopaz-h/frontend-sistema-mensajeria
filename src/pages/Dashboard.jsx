import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageCard from "../components/MessageCard";
import { API_URL } from "../config";

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Obtener los mensajes al cargar el componente y actualizarlos cada 5 segundos
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = user?.token;
        const res = await axios.get(`${API_URL}/api/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Recargar los mensajes cada 5 segundos
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [user]);

  // Enviar un mensaje
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = user?.token;

      const res = await axios.post(
        `${API_URL}/api/messages`,
        {
          senderId: user.id,
          senderName: user.username,
          content: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Usar la función de actualización para manejar el estado de los mensajes
      setMessages((prevMessages) => [...prevMessages, res.data.message]);
      setNewMessage(""); // Limpiar el campo de entrada después de enviar el mensaje
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 text-xl font-bold">Rapaz Chat</header>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          messages.map((msg) => <MessageCard key={msg.id} message={msg} userId={user.id} />)
        ) : (
          <p className="text-gray-500 text-center">No hay mensajes aún</p>
        )}
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
