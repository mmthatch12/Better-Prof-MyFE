import React from 'react';
import { Route } from 'react-router-dom'

import Login from './components/Register & Login/Login'
import Register from './components/Register & Login/Register'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  );
}

export default App;
