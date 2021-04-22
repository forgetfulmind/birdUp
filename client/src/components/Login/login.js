import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientID = '1021236725065-i7grqilbpg1rtbgs5jod4dp98j96mp37.apps.googleusercontent.com'

function Login(){

    const onSuccess = (res) =>{
        console.log('[Login Success] currentUser:', res.profileObj)
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:', res)
    }

    return(
        <div>
            <GoogleLogin 
                clientId={clientID}
                buttonText="Login"
                icon={false}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login
