import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import InvalidCreds from './InvalidCreds'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
 
        mmthatch12 {' '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-50px 0px 0px -50px' 
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [login, setLogin] = useState({ username: '', password: ''})
  const [isLoading, setIsLoading] = useState( false )
  const [error, setError] = useState({})

  const handleSubmit = e => {
      e.preventDefault()
      setIsLoading(true)
    axios.post(`https://better-professor-backend.herokuapp.com/users/login`, login)
        .then(res => {
            const jsonify = res.config.data
            const usernameO = JSON.parse(jsonify)
            localStorage.setItem('user', usernameO.username)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            setIsLoading(false)
            props.history.push('/studentlist')
        })
        .catch(err => {
            setError(err.response)
            setIsLoading(false)
        })
  }

  const handleChange = e => {
      e.preventDefault()
      setLogin({ ...login, [e.target.name]: e.target.value})
  }

  return (
    isLoading ? <CircularProgress className={classes.progress} /> :
    error.status === 401 ? <InvalidCreds /> :
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
          Student Tracker
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                onChange={handleChange}
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                id="password"
                autoComplete="current-password"
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
            Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/register' >
                Don't have an account yet? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}