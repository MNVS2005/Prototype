import React, { useState } from "react";
import UserForm from "./componetes/Userform";
import UserEdit from "./componetes/UserEdit";
import Userlist from "./componetes/Userlist";
import "./App.css";

const App = () => {
  const [userSelected, setUserSelected] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSuccess = () => {
    // Refresca la lista y limpia el usuario seleccionado
    setReload(!reload);
    setUserSelected(null);
  };


  return (
    <div>
      <h1>Form User</h1>
      {!userSelected ? (
        <UserForm onSuccess={handleSuccess} />
      ) : (
        <UserEdit userId={userSelected} onSuccess={handleSuccess} onCancel={() => setUserSelected(null)} />
      )}
      <Userlist onEdit={setUserSelected} key={reload} />
    </div>
  );
};


export default App;
