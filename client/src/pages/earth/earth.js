import React,  { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Nav from "../../components/Nav"
import "./style.css"
import { connect } from "react-redux";
import API from "../../utils/API"
import { Link } from "react-router-dom"

//ignore eslint warnings
/*eslint-disable */

const MapContainer = ({userId}) => {
  //loading info
  const [observationData, setObservationData] = useState([])
    
    function loadPosts(){
      API.getObservations()
      .then(observations => {
        setObservationData(observations.data)
      })
    }

    useEffect(()=>{
      loadPosts()
    },[])





  // Begin map information  
  const mapStyles = {        
    height: "70vh",
    width: "85%"};


  const [ currentPosition, setCurrentPosition ] = useState({});
  
  const success = position => {
    const userPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude)
    }
    setCurrentPosition(userPosition);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  },[])

  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }
  
  return (
     <LoadScript
       googleMapsApiKey={process.env.REACT_APP_API_KEY}>
         <div className="mappy">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}>
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
              // let location = { 
              //   lat: parseFloat(item.lat),
              //   lng: parseFloat(item.lng) 
              // }
              return (
              <Marker options={{icon: {url: require("../../assets/birbicon.png"), scaledSize: {width: 70, height: 70}}}} key={pin.createdAt} position={pin.location} onClick={() => onSelect(pin)}/>
              )
            })
         }
         {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div className="centerOptions">
              <div>
                <img src={`${selected.image}`} className="observationInfoImage"/>
              </div>
              <p>{selected.comment}</p>
              <p className="boldText">{selected.username}</p>
              
              <Link to={"/post/" + selected.id}>
                <button className="buttonOptions">View Post</button>
          
              </Link>

              
              </div>
            </InfoWindow>
            )
}
     </GoogleMap>
     </div>
     <Nav />
     </LoadScript>
  )
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(MapContainer);