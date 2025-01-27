import React from 'react'
import { Link } from 'react-router-dom'
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

const StudentCard = ({ list }) => {

    let bStyles = {
        textDecoration: 'none'
    }

    const classes = useStyles();
    

    return (
        <>
            {list.length > 0 ? 
                <Container maxWidth='sm'>
                    <Grid container spacing={3}>
                        {list.map(student => {
                            return (
                                <Grid key={student.id} item xs>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {student.student_name}
                                            </Typography>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {student.major}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`/studentlist/projectList/${student.id}`} style={bStyles}><Button size="small">See Projects</Button></Link>
                                        </CardActions>
                                        <CardActions>
                                            <Link to={`/studentlist/messages/${student.id}`} style={bStyles}><Button size="small">See Messages</Button></Link>
                                        </CardActions>
                                        <CardActions>
                                            <Link to={`/studentlist/edit/${student.id}`} style={bStyles}><Button size="small">Edit Student</Button></Link>
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
                                            You have not yet added any students. To add a student click on the menu at the top right and select add student.
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

export default StudentCard