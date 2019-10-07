import React, { useState, useEffect } from 'react';
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditStudent = (props) => {
    const classes = useStyles()
    const userId = localStorage.getItem('id')
    console.log('props', props)

    const [eStudent, seteStudent] = useState({ student_name: '', major: '', user_id: userId})
    const id = parseInt(props.match.params.id)
    console.log('estudent', eStudent, 'id for student', id)

    useEffect(() => {
        const studentId = props.list ? props.list.find(student => student.id === id) : false
        if(studentId) seteStudent(studentId)
    }, [id])

  const handleSubmit = e => {
    e.preventDefault()
    AxiosWithAuth().put(`https://better-professor-backend.herokuapp.com/students/${id}`, eStudent)
        .then(res => {
            props.setList([...props.list, eStudent])
            props.history.push('/studentlist')
        })
        .catch(err => console.log(err.response))
  }

  const handleChange = e => {
      e.preventDefault()
      seteStudent({ ...eStudent, [e.target.name]: e.target.value})
  }

  const deleteStudent = e => {
    e.preventDefault()
    AxiosWithAuth().delete(`https://better-professor-backend.herokuapp.com/students/${id}`)
      .then(res => {
        console.log(res)
        props.history.push('/studentlist')
      })
      .catch(err => console.log(err.response))
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit {eStudent.student}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={eStudent.student_name}
                id="student_name"
                name="student_name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={eStudent.major}
                name="major"
                type="major"
                onChange={handleChange}
                id="major"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Changes
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={deleteStudent}
          >
            Delete Student
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default EditStudent





