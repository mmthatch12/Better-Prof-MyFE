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
import { NONAME } from 'dns';

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
    console.log('list', list)

    let bStyles = {
        textDecoration: 'none'
    }

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Container maxWidth='sm'>
            <Grid container spacing={3}>
                {list.map(student => {
                    return (
                        <Grid key={student.id} item xs>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {student.student}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {student.major}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to='/studentlist/addproject' style={bStyles}><Button size="small">Projects</Button></Link>
                                </CardActions>
                                <CardActions>
                                    <Button size="small">Messages</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default StudentCard