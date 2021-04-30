import React, { useState, useEffect } from "react";
import { getObservations } from "../../utils/userObservations"
import style from "./style.css"
// import API from "../utils/API";

function Observations() {
    
    //create state 
    const [observationData, setObservationData] = useState([])

    useEffect(()=>{
      let mounted = true
      getObservations()
      .then(observations => {
        if(mounted){
          setObservationData(observations)
        }
      })
    }, [])

    return (
    <div className="ObservationBlock">
      <h2>Username's Observations</h2>

      <div className="ObservationContainer">
      {observationData.map(observations=>
        <div className="observation">
          <div>
              <img src={observations.imgSrc} className="observationImage"/>
          </div>
          <div className="observationBody">
            <h2>Common Name: {observations.commonName}</h2>
            <h4>Location: {observations.location}</h4>
            <h4>Date: {observations.date}</h4>
          </div>
        </div>      
        )}
      </div>   
    </div>
  )
}

export default Observations