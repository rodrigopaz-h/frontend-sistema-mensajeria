import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      navigate("/chat"); // redirige automáticamente
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow p-6 text-center">
        <h1 className="text-3xl mb-4">Bienvenido al Sistema de Mensajería 📨</h1>
        <h1 className="text-3xl font-bold mb-4">Rapaz Chat</h1>
        <p className="text-lg mb-6">Comparte mensajes de forma rápida y sencilla.</p>

        <div className="flex gap-4">
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Registrarse
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
