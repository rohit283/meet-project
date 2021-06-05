import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'

const Login = () => {
    const signIn = () => {
        // clever google login shizz...

        auth.signInWithPopup(provider).catch((err) => alert(err.message))
    }
    return (
        <div className='login' >
            <div className="login__logo">
                <div className="block__bg">
                    <h1>Meets-Platform</h1>
                    <hr/><br/>
                    <p>Channel based platform for text and video conferencing</p>
                </div>
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
