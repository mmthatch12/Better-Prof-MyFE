import React, { useState } from 'react';
import axios from 'axios'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
    const userId = localStorage.getItem('id')
    const classes = useStyles();
    const [student, setStudent] = useState({ student_name: '', major: '', user_id: userId})
    const id = props.match.params.id
    console.log('student', student)
    const studentId = props.list.find(student => student.id === parseInt(id))

//   const handleSubmit = e => {
//       e.preventDefault()
//     axios.post(`https://better-professor-backend.herokuapp.com/users/login`, login)
//         .then(res => {
//             localStorage.setItem('token', res.data.token)
//             localStorage.setItem('id', res.data.id)
//             props.history.push('/studentlist')
//         })
//         .catch(err => {
//             console.log(err.response)
//         })
//   }

//   const handleChange = e => {
//       e.preventDefault()
//       setLogin({ ...login, [e.target.name]: e.target.value})
//   }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="student_name"
                label="Student Name"
                name="student_name"
                autoComplete="student_name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="major"
                label="Major"
                type="major"
                id="major"
                autoComplete="major"
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
        </form>
      </div>
    </Container>
  );
}

export default EditStudent


// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }



