const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-600">Página no encontrada</p>
      <a href="/" className="mt-4 text-blue-600 hover:underline">
        Volver al inicio
      </a>
    </div>
  );
};

export default NotFound;
