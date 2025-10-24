import React, { useState } from "react";
import Userform from "./componetes/Userform";
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
      <Userform userSelected={userSelected} onSuccess={handleSuccess} />
      <Userlist onEdit={setUserSelected} key={reload} />
    </div>
  );
};


export default App;
