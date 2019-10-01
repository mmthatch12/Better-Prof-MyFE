import React, { useState } from 'react';
import { Route } from 'react-router-dom'

import Login from './components/Register & Login/Login'
import Register from './components/Register & Login/Register'
import StudentList from './components/Professor/StudentList'

function App() {
  const [list, setList] = useState([])

  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/studentlist/user/:id' render={props =>
        <StudentList {...props} list={list} setList={setList} />}
      />
    </div>
  );
}

export default App;
