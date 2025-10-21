import React, { useEffect, useState } from "react";
import api from "../api";

const UsuarioList = ({ onEdit }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await api.get("/");
    setUsuarios(res.data);
  };

  const eliminarUsuario = async (id) => {
    await api.delete(`/${id}`);
    cargarUsuarios();
  };

  return (
    <div className="p-4">
      <h2>Lista de Usuarios</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => onEdit(u)}>Editar</button>
                <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;
