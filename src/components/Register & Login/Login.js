import React from 'react'
import { Link } from 'react-router-dom'

const Login  = () => {
    return (
        <div>
            <h1>From Login</h1>
            <Link to='/register'>Sign Up!</Link>
        </div>
    )
}

export default Login