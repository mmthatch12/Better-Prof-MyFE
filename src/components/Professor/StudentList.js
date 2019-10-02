import React, { useState, useEffect } from 'react'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import StudentCard from './StudentCard'

const StudentList = ({ list, setList }) => {
  const userId = localStorage.getItem('id')
 
  
  useEffect(() => {
      AxiosWithAuth().get(`https://better-professor-backend.herokuapp.com/students/user/${userId}`)
        .then(res => {
            console.log(res.data)
            setList(res.data)
        })
  }, [])
  
  return (
    <StudentCard list={list} />
  )
} 

export default StudentList