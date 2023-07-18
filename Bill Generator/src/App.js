import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Form from './Form';
import Invoice from './invoice';
import { useLocation } from 'react-router-dom';

const App = () => {
  return (
<BrowserRouter>
<Routes>
  <Route exact path='/' element={<Form/>}/>
  <Route exact path='/invoice' element={<Invoice/>}/>
</Routes>
</BrowserRouter>
  );
};

export default App;
