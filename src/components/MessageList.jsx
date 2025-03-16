const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col gap-2">
      {messages.length === 0 && <p>No hay mensajes aún.</p>}
      {messages.map((msg) => (
        <div key={msg.id} className="border p-3 rounded shadow bg-gray-50">
          <p className="font-semibold">{msg.username}</p>
          <p>{msg.content}</p>
          <span className="text-xs text-gray-400">{msg.date}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
