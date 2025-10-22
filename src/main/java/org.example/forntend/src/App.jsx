import React, { useState } from "react";
import api from "./api";
import Userform from "./componetes/Userform";
import Userlist from "./componetes/Userlist";

const App = () => {
  const [usuario, setUsuario] = useState({
    name: "",
    surname: "",
    age: "",
    DNI: "",
    birthday: "",
  });

  return (
    <div>
      <h1>Form User</h1>
    <Userform usuario={usuario} setUsuario={setUsuario} />
    <Userlist onEdit={setUsuario} />
      
    </div>
  );
};


export default App;
