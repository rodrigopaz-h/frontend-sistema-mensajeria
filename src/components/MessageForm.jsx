import { useState } from "react";
import PropTypes from "prop-types";

const MessageForm = ({ onSendMessage, senderId, senderName }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    //Se arma el objeto de mensaje para enviar al backend
    const newMessage = {
      sender_id: senderId,
      sender_name: senderName,
      content: content.trim(),
    };

    onSendMessage(newMessage);

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 px-4">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={!content.trim()}
        className={`px-4 py-2 rounded-2xl text-white transition duration-200 ${
          !content.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Enviar
      </button>
    </form>
  );
};

MessageForm.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  senderId: PropTypes.number.isRequired,
  senderName: PropTypes.string.isRequired,
};

export default MessageForm;
