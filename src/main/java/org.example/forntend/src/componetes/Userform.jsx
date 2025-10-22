import React, { useState, useEffect } from "react";
import api from "../api";

const UserForm = ({ userSelected, onSuccess }) => {
  const [user, setUser] = useState({ nombre: "", surname: "", age: "", DNI: "", birthday: "" });

  useEffect(() => {
    if (userSelected) setUser(userSelected);
  }, [userSelected]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.id) {
      await api.put(`/${user.id}`, user);
    } else {
      await api.post("/", user);
    }

    setUser({ name: "", surname: "", age: "", DNI: "", birthday: "" });
    onSuccess();
  };

  return (
    <div className="p-4">
      <h2>{user.id ? "Edit User" : "New User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={user.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Apellido"
          value={user.surname}
          onChange={handleChange}
          required
        />
        <input
          type="number" min={0}
          name="age"
          placeholder="Edad"
          value={user.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="DNI"
          placeholder="DNI"
          value={user.DNI}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthday"
          placeholder="Fecha de Nacimiento"
          value={user.birthday}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {user.id ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
