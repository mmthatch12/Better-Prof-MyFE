import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
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
    submit: {
    margin: theme.spacing(3, 0, 2),
    },
  }))

const InvalidCreds = () => {
    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault()
        window.location.reload()
    }

    return (
        <>                
            <Container maxWidth='sm'>
                <Grid container spacing={3}>
                        <Grid item xs>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                    The username or password you entered is not valid. Please try again.
                                    </Typography>
                                    <Button
                                        onClick={handleSubmit}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Log In
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                </Grid>
            </Container>
        </> 
    )
}

export default InvalidCreds