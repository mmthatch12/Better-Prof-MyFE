import React, { useState, useEffect } from 'react'
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const defaultProject = { 
    project_name: '',
    deadline: '',
    deadline_type: '',
    description: '',
    student_id: ''
}

const EditProject = (props) => {

    const classes = useStyles()
    const studId = parseInt(props.match.params.studid)
    const id = parseInt(props.match.params.projid)
    const [eProject, setEProject] = useState({ ...defaultProject, student_id: studId })

    useEffect(() => {
        const currProject = props.productList ? props.productList.find(proj => proj.id === id) : false
        if(currProject) setEProject(currProject)
    }, [id])
    
  const handleSubmit = e => {
    e.preventDefault()
    AxiosWithAuth().put(`https://better-professor-backend.herokuapp.com/projects/${id}`, eProject)
        .then(res => {
            console.log(res.data)
            props.setProjectList(res.data)
            props.history.push(`/studentlist/projectList/${studId}`)
        })
        .catch(err => console.log(err.response))
  }

  const handleChange = e => {
      e.preventDefault()
      setEProject({ ...eProject, [e.target.name]: e.target.value})
  }

  const deleteStudent = e => {
    e.preventDefault()
    AxiosWithAuth().delete(`https://better-professor-backend.herokuapp.com/projects/${id}`)
      .then(res => {
        props.history.push(`/studentlist/projectList/${studId}`)
      })
      .catch(err => console.log(err.response))
  }

    return (
      <>
        <EditProjectNav /> 
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Edit {eProject.project_name}
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
                    value={eProject.project_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="deadline"
                    type="datetime-local"
                    value={eProject.deadline}
                    onChange={handleChange}
                    id="deadline"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="deadline_type"
                    value={eProject.deadline_type}
                    type="deadline_type"
                    onChange={handleChange}
                    id="deadline_type"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="description"
                    value={eProject.description}
                    type="description"
                    onChange={handleChange}
                    id="description"
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
                Delete Project
              </Button>
            </form>
          </div>
        </Container>
      </>
    )
}

export default EditProject