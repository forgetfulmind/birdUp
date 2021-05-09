//import React from "react"
import React,  { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Nav from "../../components/Nav"
import "./style.css"
import { connect } from "react-redux";
import API from "../../utils/API"
import {useParams, Link} from "react-router-dom"

//ignore eslint warnings
/*eslint-disable */

//create state 
function Posts({userId}) {
    const [observationData, setObservationData] = useState([])
    
    const {id} = useParams()

    function loadPosts(){
      API.getPost(id)
      .then(observations => {
        setObservationData([observations.data])
      })
    }

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
      }
    useEffect(()=>{
      loadPosts()
     
    },[])

    useEffect(()=>{
        console.log(observationData)
        if (observationData.length > 0){
        let userPosition = {
            lat: parseFloat(observationData[0].lat),
            lng: parseFloat(observationData[0].lng)
          }
          setCurrentPosition(userPosition);
        }
      },[observationData])

      useEffect(()=>{
        console.log(currentPosition)
       
    },[currentPosition])

    // Begin map information  
    const mapStyles = {        
      height: "50vh",
      width: "95%"
    };

    const [ currentPosition, setCurrentPosition ] = useState({});

   
    return (
      <div className='mainContainer'>
        <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        
          {observationData.length > 0 ? observationData.map (observations=> 
          <div key={observations.createdAt} className="single">
            
            <div className='imageDiv'>
              <img src={`${observations.image}`} className="observationImg"/>
            </div>
            
            <div className="data">

            <div className="observationInfo">
              <span><h4>Location: {parseFloat(observations.lat).toFixed('2')}, {parseFloat(observations.lng).toFixed('2')}</h4></span>

              <span><h4>Date: {observations.createdAt.split('T')[0]}</h4></span>

            </div>
            
            <hr />
            <div className="huh">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={currentPosition}
              >
                {
                  observationData.map(item => {
                    let pin = 
                      {
                        username: item.username,
                        createdAt: item.createdAt,
                        image: item.image,
                        id: item._id,
                        comment: item.comment,
                        location: { 
                            lat: parseFloat(item.lat),
                            lng: parseFloat(item.lng) 
                        },
                      }
                    return (
                    <Marker options={{icon: {url: require("../../assets/birbicon.png"), scaledSize: {width: 70, height: 70}}}} key={pin.createdAt} position={pin.location}/>
                    )
                  })
                }
              </GoogleMap>
            </div>
              <div className='commentData'>
                <h4>
                  <Link to={"/member/" + observations.name}>{observations.username}'s </Link>
                  Comments:</h4>
                  {observations.comment ? <p>{observations.comment}</p>  : <p></p>}

              </div>

            </div>
          </div> 
          ):
          <p key={'1'}></p>
          }
          <Nav />
        </LoadScript>
      </div>
    )
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
  };
  
  export default connect(mapStateToProps)(Posts);