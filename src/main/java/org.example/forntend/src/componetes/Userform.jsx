import React, { useState, useEffect } from "react";


const UserForm = ({ userSelected, onSuccess }) => {
  const [user, setUser] = useState({ nombre: "", surname: "", age: "", DNI: "", birthday: "" });

  useEffect(() => {
    if (userSelected) setUser({
      name: userSelected.name || "",
      surname: userSelected.surname || "",
      age: userSelected.age || "",
      DNI: userSelected.DNI || "",
      birthday: userSelected.birthday || "",
      id: userSelected.id || null
    });
  }, [userSelected]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: user.name,
      surname: user.surname,
      age: user.age,
      DNI: user.DNI,
      birthday: user.birthday
    };
    await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    setUser({ name: "", surname: "", age: "", DNI: "", birthday: "" });
    if (onSuccess) onSuccess();
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
