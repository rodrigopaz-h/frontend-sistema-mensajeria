import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/chat"); // Redirige a /chat
    }, 3000); // Redirige en 3 segundos

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600">¡Bienvenido, {user}!</h2>
        <p className="mt-4 text-gray-600">Tu cuenta ha sido creada con éxito.</p>
        <p className="mt-2 text-gray-500">Te redirigiremos al chat...</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
