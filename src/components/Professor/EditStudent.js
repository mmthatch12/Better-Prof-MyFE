import React from 'react'

const EditStudent = (props) => {
    console.log('props from editstudent', props)
    const id = props.match.params.id
    const studentId = props.list.find(student => student.id === parseInt(id) )

    return (
        <h1>from edit student</h1>
    )
}

export default EditStudent