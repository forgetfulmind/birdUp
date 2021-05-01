//import React from "react"
import { Col, Row, Container } from "../../components/Grid";
import React,  { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Nav from "../../components/Nav"
import style from "./style.css"
import { connect } from "react-redux";
import API from "../../utils/API"
import {useParams} from "react-router-dom"


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
    height: "70vh",
    width: "70%"};

    const [ currentPosition, setCurrentPosition ] = useState({});
  
//   const success = position => {
//     const userPosition = {
//       lat: parseFloat(position.coords.latitude),
//       lng: parseFloat(position.coords.longitude)
//     }
//     setCurrentPosition(userPosition);
//   };
  
 
   

    
    return (
        <div>
            <LoadScript
       googleMapsApiKey={process.env.REACT_APP_API_KEY}>
       
        {observationData.length > 0 ? observationData.map (observations=> 
        <div key={observations.createdAt}>
        <Container>
            <Row>
                <Col size='md-6'>
                <div>
              <img src={`/Images/2021${observations.image.split('2021')[1]}`} className="observationImage"/>
          </div>
                </Col>
                <Col size='md-6'>
                    <div className='observeData'>
                    <h4>Location: {parseFloat(observations.lat).toFixed('2')}, {parseFloat(observations.lng).toFixed('2')}</h4>
                    <h4>Date: {observations.createdAt.split('T')[0]}</h4>
                    {observations.comment ? <p>Comments: {observations.comment}</p> : <p></p>}
                    </div>
                    <div className='Map'>
                    <div className="mappy">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}>
         {
            observationData.map(item => {
              let pin = 
                {
                  createdAt: item.createdAt,
                  location: { 
                      lat: parseFloat(item.lat),
                      lng: parseFloat(item.lng) 
                  },
                }
              return (
              <Marker key={pin.createdAt} position={pin.location}/>
              )
            })
         }
        
     </GoogleMap>
     </div>

                    </div>
                </Col>
            </Row>
        </Container>
        </div> ):
        <p key={'1'}></p>
        }
        <Nav></Nav>
        </LoadScript>
        </div>
    )
//return(<div></div>)
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
  };
  
  export default connect(mapStateToProps)(Posts);