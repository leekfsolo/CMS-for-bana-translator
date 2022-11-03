import Home from 'pages/Home';
import React from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Routers;
