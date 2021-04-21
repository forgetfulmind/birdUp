import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientID = 'GRUNGLE_CLIENTID'

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
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px'}}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login
