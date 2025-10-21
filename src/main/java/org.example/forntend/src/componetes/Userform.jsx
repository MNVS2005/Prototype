import React, { useState, useEffect } from "react";
import api from "../api";

const UsuarioForm = ({ usuarioSeleccionado, onSuccess }) => {
  const [usuario, setUsuario] = useState({ nombre: "", email: "", password: "" });

  useEffect(() => {
    if (usuarioSeleccionado) setUsuario(usuarioSeleccionado);
  }, [usuarioSeleccionado]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.id) {
      await api.put(`/${usuario.id}`, usuario);
    } else {
      await api.post("/", usuario);
    }

    setUsuario({ nombre: "", email: "", password: "" });
    onSuccess();
  };

  return (
    <div className="p-4">
      <h2>{usuario.id ? "Editar Usuario" : "Nuevo Usuario"}</h2>
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
        <button type="submit">
          {usuario.id ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default UsuarioForm;
