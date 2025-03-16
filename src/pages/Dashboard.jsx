import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Bienvenido, {user?.username || "Usuario"}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Panel de Control</h2>

        <div className="flex gap-6">
          <Link
            to="/chat"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-md transition duration-200 text-lg"
          >
            Ir al Chat
          </Link>

          {/* Botón para futuros módulos */}
          {/* <Link
            to="/perfil"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl shadow-md transition duration-200 text-lg"
          >
            Ver Perfil
          </Link> */}
        </div>
      </main>

      {/* Footer opcional */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Rapaz Chat. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Dashboard;
