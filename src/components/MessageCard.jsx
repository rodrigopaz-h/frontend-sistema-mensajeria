import React from "react";

const MessageCard = ({ message, userId }) => {
  const isOwnMessage = message.senderId === userId;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p className="font-semibold">{message.senderName}</p>
        <p>{message.content}</p>
        <span className="block text-xs text-right text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
