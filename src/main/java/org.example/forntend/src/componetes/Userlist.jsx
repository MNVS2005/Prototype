import React, { useEffect, useState } from "react";


const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

 useEffect(() => {
  fetch("http://localhost:8080/user")
      .then(res => res.json())
      .then(data => setUsers(data.sort((a,b) => a.name.localeCompare(b.name))));
 
  }, []);
  
  const eraseUser = async (id) => {
  await fetch(`http://localhost:8080/user/${id}`, {
    method: 'DELETE',
  });
  setUsers(users.filter(u => u.id !== id)); // actualiza la lista en memoria
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
              <td>{u.dni}</td>
              <td>{u.birthdate}</td>
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
