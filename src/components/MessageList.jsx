import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MessageList = ({ messages, userId }) => {
  const containerRef = useRef(null);

  // Hace scroll automático al final cuando llegan mensajes nuevos
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-3 p-4 overflow-y-auto h-[400px] bg-white rounded-2xl shadow-inner"
    >
      {messages.length === 0 ? (
        <p className="text-center text-gray-400">No hay mensajes aún.</p>
      ) : (
        messages.map((msg) => {
          const isOwnMessage = msg.sender_id === userId;

          return (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-2 rounded-lg shadow text-sm ${
                isOwnMessage ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              {!isOwnMessage && <p className="font-semibold mb-1 text-xs">{msg.sender_name}</p>}
              <p>{msg.content}</p>
              <span className="block text-[10px] text-right text-gray-400 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      sender_id: PropTypes.number.isRequired,
      sender_name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  userId: PropTypes.number.isRequired,
};

export default MessageList;
