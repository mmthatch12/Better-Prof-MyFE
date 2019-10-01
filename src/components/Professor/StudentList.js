import React, { useState, useEffect } from 'react'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

const StudentList = ({ list, setList }) => {
  const userId = localStorage.getItem('id')
 
  
  useEffect(() => {
      AxiosWithAuth().get(`https://better-professor-backend.herokuapp.com/students/user/${userId}`)
        .then(res => {
            console.log(res.data)
            setList(res.data)
        })
  }, [])

  console.log('list', list)
  
  return (
      <h1>From StudentList</h1>
  )
} 

export default StudentList