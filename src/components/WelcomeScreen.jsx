import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  // Obtener el usuario del localStorage
  const user = JSON.parse(localStorage.getItem("user")) ?? { nombre: "usuario" };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.nombre) {
        navigate("/chat"); // Redirige solo si el usuario existe
      } else {
        navigate("/login"); // Si no hay usuario, redirige al login
      }
    }, 3000); // Redirige en 3 segundos

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, [navigate, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600">¡Bienvenido, {user.nombre}!</h2>
        <p className="mt-4 text-gray-600">Tu cuenta ha sido creada con éxito.</p>
        <p className="mt-2 text-gray-500">Te redirigiremos al chat...</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
