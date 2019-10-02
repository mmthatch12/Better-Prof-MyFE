import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const StudentCard = (props) => {
    console.log('props', props)

    return (
        <Container maxWidth='sm'>
            <Grid container spacing={3}>
                <Grid item xs>
                    <h1>Student 1</h1>
                </Grid>
            </Grid>
        </Container>
    )
}

export default StudentCard