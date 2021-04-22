import React, { useState, useEffect } from "react";
import Nav from "../Nav/index"
import FeaturedObservation from "../FeaturedObservation/FeaturedObservation"
import style from "./style.css"

function UserPage() {
    // create state using hooks, drop info into placeholder locations
    return (
    <div>
        <div className="UserInfo">
            <img src="https://i.imgur.com/5mji4kq.png" className="UserIcon"/> 
            <div>
                <h2>Username</h2>
                <h4>Observations: 00</h4>
                <h4>Joined: 04.22.21</h4>

                <div className="Bio"> 
                Lorem ipsum blah blah bio probably has a cutoff of like 200 characters or something. 
                </div>
            </div>
        </div>
        <FeaturedObservation />
        <Nav />
    </div>
  )
}

export default UserPage