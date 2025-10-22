import React, { useEffect, useState } from "react";
import api from "../api";

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await api.get("/");
    setUsers(res.data);
  };

  const eraseUser = async (id) => {
    await api.delete(`/${id}`);
    loadUsers();
  };

  return (
    <div className="p-4">
      <h2>List of Users</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>DNI</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.surname}</td>
              <td>{u.age}</td>
              <td>{u.DNI}</td>
              <td>{u.birthday}</td>
              <td>
                <button onClick={() => onEdit(u)}>Editar</button>
                <button onClick={() => eraseUser(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
