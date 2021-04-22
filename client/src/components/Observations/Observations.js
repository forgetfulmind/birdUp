import React, { useState, useEffect } from "react";
import style from "./style.css"
// import API from "../utils/API";

function Observations() {
    // create state 
    return (
    <div>
      <h2>Username's Observations</h2>
        <div className="observation">
        {/* map over user's observations starting at div class observation */}
            <div>
                <img src="https://i.imgur.com/vUIeSyY.jpg" className="observationImage"/>
            </div>
            <div className="observationBody">
                <h2>Common Name</h2>
                <h4>City, State, Country</h4>
                <h4>mm / dd / yyyy</h4>
            </div>
        </div>
    </div>
  )
}

export default Observations