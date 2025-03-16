import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">📨 Rapaz Chat</h1>
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <Link to="/login" className="hover:underline">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="hover:underline">
          Registrarse
        </Link>
      </nav>
    </header>
  );
};

export default Header;
