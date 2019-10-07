import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AxiosWithAuth from '../../utils/AxiosWithAuth'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const AddProject = (props) => {
    const [projects, setProjects] = useState([])
    let bStyles = {
        textDecoration: 'none'
    }

    const classes = useStyles();

    const id = parseInt(props.match.params.id)

    useEffect(() => {
        AxiosWithAuth().get(`https://better-professor-backend.herokuapp.com/projects/students/${id}`)
            .then(res => {
                console.log(res.data)
                setProjects(res.data)
                props.setProjectList(res.data)
            })
    }, [])

    return (
        <Container maxWidth='sm'>
        <Grid container spacing={3}>
            {projects.map(project => {
                return (
                    <Grid key={project.id} item xs>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {project.project_name}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Project Type: {project.deadline_type}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Due Date: {project.deadline}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Description: {project.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/studentlist/editproject/${id}/${project.id}`} style={bStyles}><Button size="small">Edit Project</Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    </Container>
    )
}

export default AddProject