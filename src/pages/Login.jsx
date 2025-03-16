export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Ingresar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
