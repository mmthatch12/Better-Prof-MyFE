import React, { useState, useEffect } from 'react'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import StudentCard from './StudentCard'
import StudentListNav from '../Navs/StudentListNav'
import { classes } from 'istanbul-lib-coverage';

const useStyles = makeStyles(() => ({
  progress: {
    margin: '50vh', 
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
            console.log(res.data)
            props.setList(res.data)
        })
  }, [])
  
  return (
    <>
      <StudentListNav />
      {isLoading ? <CircularProgress className={classes.progress} /> :
      <StudentCard list={props.list} setStudId={props.setStudId} />}
    </>
    
  )
} 

export default StudentList