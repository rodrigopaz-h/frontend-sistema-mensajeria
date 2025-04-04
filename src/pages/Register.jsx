import React, { useState } from "react";
import axios from "axios";
import FormInput from "../components/FormInput";
import { API_URL } from "../config";
import WelcomeScreen from "../components/WelcomeScreen";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [usuarioNombre, setUsuarioNombre] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "nombre":
        if (!value.trim()) return "El nombre es requerido";
        break;
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Email no válido";
        break;
      }
      case "password":
        if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres";
        break;
      case "confirmarPassword":
        if (value !== formData.password) return "Las contraseñas no coinciden";
        break;
      default:
        return "";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setErrors({});

      console.log("📤 Enviando datos al backend:", {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      });

      const response = await axios.post(`${API_URL}/api/register`, {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data; // Suponiendo que el token y el usuario se retornan en la respuesta

      // Guarda el token y el usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUsuarioNombre(formData.nombre);
      setRegistroExitoso(true); // Cambiar a true para mostrar la pantalla de bienvenida
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.mensaje || "Error en el registro";
      setErrors({ api: errorMsg });
    }
  };

  if (registroExitoso) {
    return <WelcomeScreen user={usuarioNombre} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>

        {errors.api && <p className="mb-4 text-red-500 text-center">{errors.api}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            error={errors.nombre}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
            autoComplete="email"
            error={errors.email}
          />

          <FormInput
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            error={errors.password}
          />

          <FormInput
            label="Confirmar Contraseña"
            type="password"
            name="confirmarPassword"
            value={formData.confirmarPassword}
            onChange={handleChange}
            placeholder="Repite la contraseña"
            autoComplete="new-password"
            error={errors.confirmarPassword}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
