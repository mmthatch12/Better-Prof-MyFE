import React, { useState } from 'react';
import { Route } from 'react-router-dom'

import Login from './components/Register & Login/Login'
import Register from './components/Register & Login/Register'
import StudentList from './components/Professor/StudentList'
import AddProject from './components/Professor/AddProject'
import Messages from './components/Professor/Messages'
import EditStudent from './components/Professor/EditStudent'


function App() {
  const [list, setList] = useState([])

  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route exact path='/studentlist' render={props =>
        <StudentList {...props} list={list} setList={setList} />}
      />
      <Route exact path='/studentlist/addproject' render={props => 
        <AddProject {...props} list={list} setList={setList} />}
      />
      <Route exact path='/studentlist/messages' render={props => 
       <Messages {...props}  list={list} />}
      />
      <Route exact path='/studentlist/edit/:id' render={props => 
       <EditStudent {...props}  list={list} />}
      />
    </div>
  );
}

export default App;
