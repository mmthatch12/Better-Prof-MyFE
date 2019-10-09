import React, { useState } from 'react'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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

const defaultStudent = {
    student_name: '',
    major: '',
    user_id: ''
}

const AddProject = (props) => {
    const classes = useStyles()
    const id = localStorage.getItem('id')
    const [student, setStudent] = useState({...defaultStudent, user_id: id })

    const handleSubmit = e => {
        e.preventDefault()
        AxiosWithAuth().post(`https://better-professor-backend.herokuapp.com/students`, student)
            .then(res => {
                console.log(res.data)
                props.history.push(`/studentlist`)
            })
            .catch(err => console.log(err.response))
      }

    const handleChange = e => {
        e.preventDefault()
        setStudent({ ...student, [e.target.name]: e.target.value})
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Student
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="student_name"
                  name="student_name"
                  placeholder='Student Name'
                  value={student.student_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid className={classes.container} item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="major"
                  placeholder='Major'
                  value={student.major}
                  onChange={handleChange}
                  id="major"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
              Add Student
            </Button>
          </form>
        </div>
      </Container>
    )
}


export default AddProject