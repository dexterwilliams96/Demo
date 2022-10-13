import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RM from './RM';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<RM/>}></Route>
    </Routes>
  );
}

export default Main;