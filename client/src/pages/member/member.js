import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/index"
import API from "../../utils/API"
import "./style.css"
import {useParams, Link} from "react-router-dom"



//create state 
function Member() {

  const {id} = useParams()
  //ignore eslint warnings
/*eslint-disable */

    // hooks
    const [userProfile, setUserProfile] = useState([])


    const [observationData, setObservationData] = useState([])
    function loadPosts(){
      API.getUserObservations(id)
      .then(observations => {
        console.log(observations, "returned from observations call")
        setObservationData(observations.data)
      })
    }
    
    function loadUser() {
      API.findUser(id)
      .then(user => {
        console.log(user, "returned from load user")
          setUserProfile(user)
      })
    }

    useEffect(()=>{
      loadUser() 
      loadPosts()
      console.log(userProfile)
    },[])




    return (
    <div>
      <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
      <div className="wrapper"> 
          <div className="mainImage d-flex justify-content-center align-items-center flex-column">
              <div className="filter">
              <div className="boxHeading">
                  <div className="userProps">
                    { userProfile.length !== 0 ? <img src={`${userProfile.data?.[0]?.profileimage}`} className="observationImage"/> : null}
                  </div>
                  <span className="heading">
                    {userProfile && userProfile !== [] ? <h1>{userProfile.data?.[0]?.username}</h1> : null}
                    <span>Observations: {observationData && observationData!== [] ? <span> {observationData.length} </span> : <span> No Observations Yet</span> }</span>
                    <span>Joined: {userProfile && userProfile !== [] ? <span> {userProfile.data?.[0]?.createdAt.split("T")[0]}</span> : null}</span>
                  </span>
                </div>
              </div>
            </div>
        </div>
      
        <div className="ObservationBlock">

      <div className="ObservationContainer">
        {observationData ? observationData.map (observations=>
          <div className="observation" key={observations._id}>
            
            <div>
              <img src={`${observations.image}`} className="observationImage"/>
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

            </div>

          </div>      
          ):
          <p>No observations yet!</p>
        }
      </div>   
    </div>

      </div>
      <Nav />
    </div>



  )
}

export default Member;
