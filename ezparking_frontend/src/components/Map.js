import React from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api"

function Map() {
  const MAP_API = process.env.REACT_APP_API_KEY
  const { isLoaded } = useLoadScript({googleMapsApiKey: MAP_API})

  if (!isLoaded){
    return (
      <div className="bg-red-400 rounded-md drop-shadow-sm p-5 m-5">
        Loading Google map
      </div>
    )
  }

  return (
    <GoogleMap 
      zoom={16} 
      center={{lat: 50.417884, lng:-104.588749}}
      mapContainerClassName="h-96"
      onClick={ e => {
        handleClick(e)
      }}
    >
    </GoogleMap>
  );
}

function handleClick(e) {
  console.log(e.latLng.lat())
  console.log(e.latLng.lng())
}

export default Map
