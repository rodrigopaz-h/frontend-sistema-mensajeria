import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MessageCard from "../components/MessageCard";
import { API_URL } from "../config";

const Chat = () => {
  const navigate = useNavigate();

  // Obtener valores desde localStorage al inicio
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Si no hay usuario, redirige al login
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [navigate, user, token]);

  // Cargar mensajes al inicio y cada 5 segundos
  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Error al cargar mensajes:", err);
        if (err.response?.status === 401) {
          handleLogout(); // Si hay un error 401 (no autorizado), cerrar sesión
        }
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [token]);

  // Manejo de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  // Enviar mensaje
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const messageToSend = {
      senderId: user.id,
      senderName: user.nombre,
      content: newMessage,
    };

    try {
      const response = await axios.post(`${API_URL}/api/messages`, messageToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages([...messages, response.data]); // Agregar mensaje
      setNewMessage("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 text-xl font-bold flex justify-between items-center">
        Rapaz Chat
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
          Cerrar sesión
        </button>
      </header>

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
