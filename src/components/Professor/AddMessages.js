import React, { useState } from 'react'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import EditProjectNav from '../Navs/EditProjectNav'

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

const defaultMessage = {
    message: '',
    date: '',
    student_id: ''
}

const AddMessages = (props) => {
    const classes = useStyles()
    const id = props.match.params.studentId
    const [message, setMessage] = useState({...defaultMessage, student_id: id })

    const handleSubmit = e => {
        e.preventDefault()
        AxiosWithAuth().post(`https://better-professor-backend.herokuapp.com/messages`, message)
            .then(res => {
                console.log(res.data)
                props.history.push(`/studentlist/messages/${id}`)
            })
            .catch(err => console.log(err.response))
      }

    const handleChange = e => {
        e.preventDefault()
        setMessage({ ...message, [e.target.name]: e.target.value})
    }

    return (
      <>
        <EditProjectNav /> 
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add Message
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="message"
                    name="message"
                    placeholder='Message'
                    value={message.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid className={classes.container} item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="date"
                    placeholder='Date'
                    value={message.date}
                    onChange={handleChange}
                    type="datetime-local"
                    id="date"
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
                Add Message
              </Button>
            </form>
          </div>
        </Container>
      </>
    )
}


export default AddMessages