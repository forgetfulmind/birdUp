import React,  { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Nav from "../../components/Nav"
import style from "./style.css"
import { connect } from "react-redux";
import API from "../../utils/API"
import { Link } from "react-router-dom"


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
    width: "70%"};

  
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  const locations = [
    {
      name: "Location 1",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      name: "Location 2",
      location: { 
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      name: "Location 3",
      location: { 
        lat: 41.3773,
        lng: 2.1585
      },
    },
    {
      name: "Location 4",
      location: { 
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      name: "Location 5",
      location: { 
        lat: 41.4055,
        lng: 2.1915
      },
    }
  ];

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
              <Marker options={{icon: {url: require("../../assets/bird-1232416_1920.png"), scaledSize: {width: 100, height: 100}}}} key={pin.createdAt} position={pin.location} onClick={() => onSelect(pin)}/>
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
              <div>
              <p>{selected.comment}</p>
              <a href="">{selected.name}</a>
              <Link to={"/post/" + selected.id}>
            <p> View Post </p>
          
          </Link>
              <div>
              <img src={`/Images/2021${selected.image.split('2021')[1]}`} className="observationImage"/>
          </div>
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