import React, { useState } from 'react';
import { Route } from 'react-router-dom'

import Login from './components/Register & Login/Login'
import Register from './components/Register & Login/Register'
import StudentList from './components/Professor/StudentList'
import ProjectList from './components/Professor/ProjectList'
import Messages from './components/Professor/Messages'
import EditStudent from './components/Professor/EditStudent'
import EditProject from './components/Professor/EditProject'
import AddStudent from './components/Professor/AddStudent'
import AddProject from './components/Professor/AddProject'
import AddMessages from './components/Professor/AddMessages'

function App() {
  const [list, setList] = useState([])
  const [productList, setProjectList] = useState([])
  const [messagesList, setMessagesList] = useState([])

  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route exact path='/studentlist' render={props =>
        <StudentList {...props} list={list} setList={setList} />}
      />
      <Route exact path='/studentlist/projectList/:id' render={props => 
        <ProjectList {...props} productList={productList} list={list} setProjectList={setProjectList} />}
      />
      <Route exact path='/studentlist/editproject/:studid/:projid' render={props => 
        <EditProject {...props} productList={productList} setProjectList={setProjectList} />}
      />
      <Route exact path='/studentlist/messages/:studentId' render={props => 
       <Messages {...props}  list={list} messagesList={messagesList} setMessagesList={setMessagesList} />}
      />
      <Route exact path='/studentlist/edit/:id' render={props => 
       <EditStudent {...props}  list={list} setList={setList} />}
      />
      <Route exact path='/studentlist/addstudent' render={props => 
       <AddStudent {...props}  list={list} setList={setList} />}
      />
      <Route exact path='/studentlist/addproject/:studentId' render={props => 
       <AddProject {...props}  productList={productList} list={list} setProjectList={setProjectList} />}
      />
      <Route exact path='/studentlist/addmessages/:studentId' render={props => 
       <AddMessages {...props} list={list} messagesList={messagesList} setMessagesList={setMessagesList} />}
      />
    </div>
  );
}

export default App;
