import React from 'react'
import { GoogleLogout } from 'react-google-login'

const clientID = '1021236725065-i7grqilbpg1rtbgs5jod4dp98j96mp37.apps.googleusercontent.com'

function Logout(){
    const onSuccess = () =>{
        alert('Logout made successfully')
    }

    return(
        <div>
            <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            >
            </GoogleLogout>
        </div>
    )

}

export default Logout