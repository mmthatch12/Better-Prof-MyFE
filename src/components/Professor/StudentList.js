import React, { useState, useEffect } from 'react'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import StudentCard from './StudentCard'
import StudentListNav from '../Navs/StudentListNav'

const useStyles = makeStyles(() => ({
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-50px 0px 0px -50px' 
  },
}));

const StudentList = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState( false )
  const userId = localStorage.getItem('id')
 
  
  useEffect(() => {
    setIsLoading(true)
      AxiosWithAuth().get(`https://better-professor-backend.herokuapp.com/students/user/${userId}`)
        .then(res => {
            setIsLoading(false)
            props.setList(res.data)
        })
  }, [])
  
  return (
    <>
      <StudentListNav />
      {isLoading ? <CircularProgress className={classes.progress} /> :
      <StudentCard list={props.list} />}
    </>
    
  )
} 

export default StudentList