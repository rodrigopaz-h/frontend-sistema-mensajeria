import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

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
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.token || isTokenExpired(user.token)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
