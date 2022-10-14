import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import RM from "./RM";
import SignIn from "./SignIn";

const Main = () => {
  const [token, setToken] = useState();

  if (!token) {
    return <SignIn setToken={setToken} />;
  }
  return (
    <Routes>
      <Route
        path="/RM"
        element={<RM token={token} setToken={setToken} />}
      ></Route>
      <Route
        path="/"
        element={<SignIn token={token} setToken={setToken} />}
      ></Route>
    </Routes>
  );
};

export default Main;
