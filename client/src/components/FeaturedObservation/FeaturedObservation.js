import React, { useState, useEffect } from "react";
// import API from "../utils/API";

function FeaturedObservation() {
    // create state 
    return (
    <div className="FeaturedObservation">
        <img src="https://i.imgur.com/vUIeSyY.jpg" className="FeaturedImage"/>
        <div>
            <h2>Common Name</h2>
            <h4>City, State, Country</h4>
            <h4>mm / dd / yyyy</h4>
        </div>
    </div>
  )
}

export default FeaturedObservation