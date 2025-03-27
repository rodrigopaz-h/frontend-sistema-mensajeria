import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/chat"), 3000); // Redirige al chat después de 3 segundos
    return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">¡Bienvenido, {user}!</h1>
      <p className="text-gray-600 mt-2">Redirigiendo al chat...</p>
    </div>
  );
};

export default WelcomeScreen;
