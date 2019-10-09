import React, { useEffect } from 'react'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import StudentCard from './StudentCard'
import StudentListNav from '../Navs/StudentListNav'

const StudentList = (props) => {
  const userId = localStorage.getItem('id')
 
  
  useEffect(() => {
      AxiosWithAuth().get(`https://better-professor-backend.herokuapp.com/students/user/${userId}`)
        .then(res => {
            console.log(res.data)
            props.setList(res.data)
        })
  }, [])
  
  return (
    <>
      <StudentListNav props={props} />
      <StudentCard list={props.list} />
    </>
    
  )
} 

export default StudentList