import React, { useState } from "react";
import axios from "axios"; // ✅ Importamos axios
import { API_URL } from "../config"; // ✅ Usamos tu constante de la URL

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Envía el formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (formData.password !== formData.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setError("");
      setMensaje("");

      const response = await axios.post(`${API_URL}/register`, {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Si todo sale bien
      setMensaje("Registro exitoso. Ahora inicia sesión.");
      setFormData({
        nombre: "",
        email: "",
        password: "",
        confirmarPassword: "",
      });
    } catch (err) {
      console.error(err);
      // ✅ Manejamos errores si el backend devuelve error.response.data
      setError(err.response?.data?.mensaje || "Error en el registro");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}
        {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmarPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmarPassword"
              id="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
