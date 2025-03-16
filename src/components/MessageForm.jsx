import { useState } from "react";

const MessageForm = ({ onSendMessage }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSendMessage(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
        Enviar
      </button>
    </form>
  );
};

export default MessageForm;
