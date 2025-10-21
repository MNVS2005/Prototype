import React, { useState } from "react";
import axios from "axios";
import api from "./api";

const App = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/usuarios", usuario);
      setMensaje("✅ Usuario creado con éxito!");
      setUsuario({ nombre: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al guardar el usuario");
    }
  };

  return (
    <div>
      <h1>Formulario de Usuario</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={handleChange}
          required
        />
        <input

          type="email"
          name="email"
          placeholder="Email"
          value={usuario.email}
          onChange={handleChange}
          required
        />
        <input
          
          type="password"
          name="password"
          placeholder="Contraseña"
          value={usuario.password}
          onChange={handleChange}
          required
        />
        <button type="submit" >
          Guardar Usuario
        </button>
      </form>
    </div>
  );
};


export default App;
