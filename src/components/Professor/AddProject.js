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

const defaultProject = {
    project_name: '',
    deadline: '',
    deadline_type: '',
    description: '',
    student_id: ''
}

const AddProject = (props) => {
    const classes = useStyles()
    const id = parseInt(props.match.params.id)
    const [project, setProject] = useState({...defaultProject, student_id: id })

    const handleSubmit = e => {
        e.preventDefault()
        AxiosWithAuth().post(`https://better-professor-backend.herokuapp.com/projects`, project)
            .then(res => {
                console.log(res.data)
                props.history.push(`/studentlist/projectList/${id}`)
            })
            .catch(err => console.log(err.response))
      }

    const handleChange = e => {
        e.preventDefault()
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Project
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="project_name"
                  name="project_name"
                  placeholder='Project Name'
                  value={project.project_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid className={classes.container} item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="deadline"
                  placeholder='Deadline'
                  value={project.deadline}
                  onChange={handleChange}
                  id="deadline"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid className={classes.container} item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="deadline_type"
                  placeholder='Project Type'
                  value={project.deadline_type}
                  onChange={handleChange}
                  id="deadline_type"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid className={classes.container} item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="description"
                  placeholder='Description'
                  value={project.description}
                  onChange={handleChange}
                  id="description"
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
              Add Project
            </Button>
          </form>
        </div>
      </Container>
    )
}


export default AddProject