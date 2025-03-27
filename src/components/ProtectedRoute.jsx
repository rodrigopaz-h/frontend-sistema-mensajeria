import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Función para verificar si el token ha expirado
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decodifica JWT
    const expiry = payload.exp * 1000; // segundos a milisegundos
    return Date.now() > expiry;
  } catch {
    return true; // si falla el decode, es inválido
  }
};

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    // Si no hay token o si el token ha expirado, redirige a login
    return <Navigate to={redirectTo} replace />;
  }

  // Si hay token y no ha expirado, renderiza los componentes hijos
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
