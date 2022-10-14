import React from 'react';
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import RM from './RM';
import SignIn from './SignIn'
import Register from './Register'

const Main = () => {
const [token, setToken] = useState();

if(!token) {
    return <SignIn setToken={setToken} />
  }
  return (
    <Routes>
      <Route path='/RM' element={<RM/>}></Route>
      <Route path='/' element={<SignIn/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
    </Routes>
  );
}

export default Main;