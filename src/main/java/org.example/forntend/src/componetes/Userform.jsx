import React, { useState } from "react";

const UserForm = ({ onSuccess }) => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    age: "",
    dni: "",
    birthdate: "",
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUser({ ...user, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", user.name);
    data.append("surname", user.surname);
    data.append("dni", user.dni);
    data.append("birthdate", user.birthdate);
    data.append("age", user.age);
    
    if (user.photo instanceof File) data.append("photo", user.photo);

    await fetch("http://localhost:8080/user", {
      method: "POST",
      body: data
    });

    if (onSuccess) onSuccess();
  };

  return (
    <div className="p-4">
      <h2>New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
        <input type="number" name="age" min={0} placeholder="Age" onChange={handleChange} required />
        <input type="text" name="dni" placeholder="DNI" onChange={handleChange} required />
        <input type="date" name="birthdate" placeholder="Birthdate" onChange={handleChange} required />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;