import React, { useState, useEffect } from "react";

const UserEdit = ({ userSelected, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    dni: "",
    birthdate: "",
    photo: null,
    photoUrl: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/user/${userSelected}`)
      .then(res => res.json())
      .then(data =>
        setFormData({
          name: data.name,
          surname: data.surname,
          age: data.age,
          dni: data.dni,
          birthdate: data.birthdate,
          photo: null,
          photoUrl: data.photoUrl
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("dni", formData.dni);
    data.append("birthdate", formData.birthdate);
    data.append("age", formData.age);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }
    await fetch(`http://localhost:8080/user/${userSelected}`, {
      method: "PUT",
      body: data
    });

    if (onSuccess) onSuccess();
  };

  return (
    <div className="p-4">
      <h2>Edit User</h2>

      {formData.photoUrl && (
        <>
          <p>Current photo:</p>
          <img src={formData.photoUrl} alt="User" width="120" />
        </>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name}
          placeholder="Name" onChange={handleChange} required />
        <input type="text" name="surname" value={formData.surname}
          placeholder="Surname" onChange={handleChange} required />
        <input type="number" name="age" value={formData.age}
          placeholder="Age" onChange={handleChange} required />
        <input type="text" name="dni" value={formData.dni}
          placeholder="DNI" onChange={handleChange} required />
        <input type="date" name="birthdate" value={formData.birthdate}
          placeholder="Birthdate" onChange={handleChange} required />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />

        <br />
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UserEdit;