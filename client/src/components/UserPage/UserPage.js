import React, { useState, useEffect } from "react";
import Nav from "../Nav/index"
import FeaturedObservation from "../FeaturedObservation/FeaturedObservation"
import style from "./style.css"

function UserPage() {
    // create state using hooks, drop info into placeholder locations
    return (
    <div className="wrapper"> 
      <div className="mainImage d-flex justify-content-center align-items-center flex-column">
        <div className="filter">
         <div className="boxHeading">
            <h1 className="heading">
                Username
            </h1>
            <div className="userProps">
                <p>Joined 02.21.21</p>
                <p>00 Observations </p>
            </div>
          </div>
        </div>
        <div className="search">
        </div>
      </div>
        <Nav />
    </div>
  )
}

export default UserPage