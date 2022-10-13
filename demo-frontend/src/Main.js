import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RM from './RM';
import SignIn from './SignIn'

const Main = () => {
  return (
    <Routes>
      <Route path='/RM' element={<RM/>}></Route>
      <Route path='/' element={<SignIn/>}></Route>
    </Routes>
  );
}

export default Main;