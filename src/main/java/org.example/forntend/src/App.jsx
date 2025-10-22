import React, { useState } from "react";
import Userform from "./componetes/Userform";
import Userlist from "./componetes/Userlist";

const App = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    age: "",
    DNI: "",
    birthday: "",
  });

  return (
    <div>
      <h1>Form User</h1>
      <Userform user={user} setUser={setUser} />
      <Userlist onEdit={setUser} />
    </div>
  );
};


export default App;
