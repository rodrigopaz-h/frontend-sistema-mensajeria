import React from "react";
import PropTypes from "prop-types";

const MessageCard = ({ message, userId }) => {
  const isOwnMessage = message.sender_id === userId;

  const formattedTime = new Date(message.created_at).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`relative max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md ${
          isOwnMessage ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {!isOwnMessage && <p className="font-semibold text-xs mb-1 text-gray-700">{message.sender_name}</p>}

        <p className="whitespace-pre-wrap">{message.content}</p>

        <span className="block text-[10px] text-right text-gray-300 mt-1">{formattedTime}</span>
      </div>
    </div>
  );
};

// PropTypes para validar que los datos sean correctos
MessageCard.propTypes = {
  message: PropTypes.shape({
    sender_id: PropTypes.number.isRequired,
    sender_name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.number.isRequired,
};

export default MessageCard;
