import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/FormInput";
import { API_URL } from "../config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return "Email no válido";
        break;
      }
      case "password": {
        if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres";
        break;
      }
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMensaje("");
    setErrors({});

    try {
      const { email, password } = formData;
      const response = await axios.post(`${API_URL}/api/login`, { email, password });

      setMensaje("✅ Inicio de sesión exitoso");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setFormData({ email: "", password: "" });

      // Redirige suave al chat después de loguearse correctamente
      setTimeout(() => {
        navigate("/chat");
      }, 1500);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.mensaje || "Error en el inicio de sesión";
      setErrors({ api: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {errors.api && <p className="mb-4 text-red-500 text-center">{errors.api}</p>}
        {mensaje && <p className="mb-4 text-green-500 text-center">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md transition duration-200 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
