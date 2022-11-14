import React from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import { useDispatch } from 'react-redux'
import { clickAdd } from '../store/clickSlice'

function Map(props) {
  const MAP_API = process.env.REACT_APP_API_KEY
  const { isLoaded } = useLoadScript({googleMapsApiKey: MAP_API})
  const dispatch = useDispatch()

  const handleClick = e =>{
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    dispatch(clickAdd({
      lat,
      lng
    }))
  }
  
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
      mapContainerClassName="h-full"
      onClick={handleClick}
    >
    </GoogleMap>
  );
}

export default Map
