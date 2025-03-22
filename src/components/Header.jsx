import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center flex-wrap">
      <h1 className="text-xl font-bold flex items-center gap-2">
        📨 <span>Rapaz Chat</span>
      </h1>

      <nav className="flex gap-4 items-center mt-2 sm:mt-0">
        <Link to="/" className="hover:underline transition">
          Inicio
        </Link>

        {!user && (
          <>
            <Link to="/login" className="hover:underline transition">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="hover:underline transition">
              Registrarse
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-sm">👋 Hola, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm"
              aria-label="Cerrar sesión"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
