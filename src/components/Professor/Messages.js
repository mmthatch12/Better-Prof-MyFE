import React, { useState, useEffect } from 'react'

import AxiosWithAuth from '../../utils/AxiosWithAuth'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import MessagesListNav from '../Navs/MessagesListNav'

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

const Messages = (props) => {
    const [messages, setMessages] = useState([])
    let bStyles = {
        textDecoration: 'none'
    }

    const classes = useStyles();

    const id = parseInt(props.match.params.studentId)

    useEffect(() => {
        AxiosWithAuth().get(`https://better-professor-backend.herokuapp.com/messages/students/${id}`)
            .then(res => {
                console.log(res.data)
                setMessages(res.data)
                props.setMessagesList(res.data)
            })
    }, [])


    return (
        
        <>
            <MessagesListNav id={id} />
            {messages.length === 0 ? <h1>This student does not have any messages. To add a message click on the menu at the top right and select add message.</h1> : 
                <Container maxWidth='sm'>
                    <Grid container spacing={3}>
                        {messages.map((message, ind) => {
                            return (
                                <Grid key={ind} item xs>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {message.message}
                                            </Typography>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Project Type: {message.date}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            }
            
        </>
    )
}

export default Messages