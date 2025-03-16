# 📨 Sistema de Mensajería - Versión Mejorada 🚀

Bienvenido/a a la **versión refactorizada y mejorada** de mi proyecto **Sistema de Mensajería**, originalmente desarrollado durante el bootcamp de **Desafío Latam**.  
En esta nueva versión, aplico **buenas prácticas**, tecnologías actuales y un enfoque profesional orientado a la experiencia del usuario y la escalabilidad del sistema.

🔹 **Versión Original (Legacy):** Puedes revisar la versión inicial en la rama [legacy](https://github.com/rodrigopaz-h/d1-sistema-de-mensajeria/tree/legacy).  
🔹 **Versión Mejorada (Main):** Aquí encontrarás nuevas funcionalidades, mejores prácticas y tecnologías modernas.

---

## 🚀 Novedades de la Versión Mejorada

✔️ **Refactorización completa** del código backend (modular y escalable).  
✔️ **Manejo de errores profesional** mediante middlewares y validaciones.  
✔️ **Autenticación segura** con JWT y bcrypt (registro/login de usuarios).  
✔️ **Variables de entorno (.env)** para una configuración más segura y flexible.  
✔️ **Frontend mejorado** con **React**, **Vite** y **TailwindCSS**.  
✔️ **Base de datos relacional** integrada (PostgreSQL en ElephantSQL / Supabase).  
✔️ **Deploy full stack** con backend en Render/Fly.io y frontend en Vercel/Netlify.  
✔️ **Documentación del API** clara y accesible (Postman Docs / Swagger).  
✔️ **Diseño responsive y minimalista** enfocado en la experiencia del usuario.

---

## 🛠️ Tecnologías Utilizadas

### **Backend:**

- Node.js
- Express.js
- PostgreSQL (ElephantSQL / Supabase)
- JWT + bcrypt (Autenticación)
- Dotenv (Variables de entorno)
- CORS, Helmet (Seguridad)
- Morgan (Logs de peticiones)

### **Frontend:**

- React + Vite
- TailwindCSS (Estilos)
- Fetch / Axios (Consumo de API)
- React Router (Navegación)

### **Deploy & Otros:**

- Render / Fly.io (Backend)
- Vercel / Netlify (Frontend)
- Postman / Swagger (Documentación API)
- Git & GitHub (Control de versiones)

---

## 📂 Estructura del Proyecto

```plaintext
/backend
  ├── controllers/
  ├── middlewares/
  ├── models/
  ├── routes/
  ├── utils/
  ├── config/
  ├── app.js
  └── server.js

/frontend
  ├── public/
  ├── src/
      ├── components/
      ├── pages/
      ├── services/
      ├── App.jsx
      └── main.jsx
  ├── package.json
  ├── vite.config.js
  └── tailwind.config.js
```
