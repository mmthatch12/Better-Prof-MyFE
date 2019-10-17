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
import CircularProgress from '@material-ui/core/CircularProgress';

import ProjectListNav from '../Navs/ProjectListNav'

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
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-50px 0px 0px -50px' 
      },
  });

const ProjectList = (props) => {
    const classes = useStyles();
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState( false )
    
    let bStyles = {
        textDecoration: 'none'
    }

    const id = parseInt(props.match.params.id)

    useEffect(() => {
        setIsLoading(true)
        AxiosWithAuth().get(`https://better-professor-backend.herokuapp.com/projects/students/${id}`)
            .then(res => {
                setIsLoading(false)
                setProjects(res.data)
                props.setProjectList(res.data)
            })
    }, [])


    return (
        
        <>
            <ProjectListNav id={id} />
            {isLoading ? <CircularProgress className={classes.progress} /> :
            projects.length > 0 ? 
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
            </Container> : 
            <>                
            <Container maxWidth='sm'>
                <Grid container spacing={3}>
                        <Grid item xs>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                    This student does not have any projects. To add a project click on the menu at the top right and select add project.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                </Grid>
            </Container>
        </> 
        } 
        </>
    )
}

export default ProjectList