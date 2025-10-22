import React, { useState, useEffect } from "react";
import api from "../api";

const UsuarioForm = ({ usuarioSeleccionado, onSuccess }) => {
  const [usuario, setUsuario] = useState({ nombre: "", surname: "", age: "", DNI: "", birthday: "" });

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

    setUsuario({ nombre: "", surname: "", age: "", DNI: "", birthday: "" });
    onSuccess();
  };

  return (
    <div className="p-4">
      <h2>{usuario.id ? "Edit User" : "New User"}</h2>
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
          type="text"
          name="surname"
          placeholder="Apellido"
          value={usuario.surname}
          onChange={handleChange}
          required
        />
        <input
          type="number" min={0}
          name="age"
          placeholder="Edad"
          value={usuario.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="DNI"
          placeholder="DNI"
          value={usuario.DNI}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthday"
          placeholder="Fecha de Nacimiento"
          value={usuario.birthday}
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
