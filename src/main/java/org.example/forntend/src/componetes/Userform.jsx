import React, { useState, useEffect } from "react";


const UserForm = ({ userSelected, onSuccess }) => {
  const [user, setUser] = useState({ nombre: "", surname: "", age: "", dni: "", birthdate: "" });

  useEffect(() => {
    if (userSelected) setUser(userSelected);
  }, [userSelected]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const formData = new FormData();
    formData.append("name", user.name);
    formData.append("surname", user.surname);
    formData.append("dni", user.dni);
    formData.append("birthdate", user.birthdate);
    formData.append("age", user.age);
    await fetch("http://localhost:8080/user", {
      method: "POST",
      body: formData
    });

     const url = user.id ? `http://localhost:8080/user/${user.id}` : "http://localhost:8080/user";
      
     const method = user.id ? "PUT" : "POST";

      await fetch(url, {
        method,
        body: formData,
      });

        setUser({ name: "", surname: "", age: "", dni: "", birthdate: "" });
        if (onSuccess) onSuccess();
        window.location.reload();
      };

  return (
    <div className="p-4">
      <h2>{user.id ? "Edit User" : "New User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name || ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Apellido"
          value={user.surname || ""}
          onChange={handleChange}
          required
        />
        <input
          type="number" min={0}
          name="age"
          placeholder="Edad"
          value={user.age || ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="DNI"
          placeholder="DNI"
          value={user.DNI || ""}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthday"
          placeholder="Fecha de Nacimiento"
          value={user.birthday || ""}
          onChange={handleChange}
          required
        />
        <button type="submit" >
          {user.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
