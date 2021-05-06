import React, { useState, useEffect } from "react";
// import { getObservations } from "../../utils/userObservations"
import style from "./style.css"
import API from "../../utils/API";
import { connect } from "react-redux";
import { FormBtn } from "../Form/index"
import { Link } from "react-router-dom"


function Observations({userId}) {
    
    //create state 
    const [observationData, setObservationData] = useState([])
    
    function loadPosts(){
      API.getUserObservations(userId)
      .then(observations => {
        setObservationData(observations.data)
      })
    }

    useEffect(()=>{
      loadPosts()
    },[])

    function deletePost(id) {
      API.deletePost(id)
        .then(res => loadPosts())
        .catch(err => console.log(err));
    } 

    return (
    <div className="ObservationBlock">

      <div className="ObservationContainer">
        {observationData ? observationData.map (observations=>
          <div className="observation" key={observations._id}>
            
            <div>
              <img src={`/Images/2021${observations.image.split('2021')[1]}`} className="observationImage"/>
            </div>
            
            <div className="observationBody">
              <h4>Location: {parseFloat(observations.lat).toFixed('2')}, {parseFloat(observations.lng).toFixed('2')}</h4>
              <h4>Date: {observations.createdAt.split('T')[0]}</h4>
              {observations.comment ? <p>Comments: {observations.comment}</p> : <p></p>}
            </div>

            <div className="buttons">
              <Link to={"/post/" + observations._id}>
                <button className="button">
                  View Post
                </button>
              </Link>

              <button onClick={()=>deletePost(observations._id)} className="button">
                Delete
              </button>
            </div>

          </div>      
          ):
          <p>No observations yet!</p>
        }
      </div>   
    </div>
  )
}

// export default Observations

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(Observations);