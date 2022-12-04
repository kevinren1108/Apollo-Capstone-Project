import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  DrawingManager,
  Marker,
  Rectangle,
  Polygon,
  InfoWindow,
  Polyline,
} from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { mapClickAdd } from '../store/mapClickSlice';
import "./map.css"

const libraries = ['drawing'];
const MAP_API = process.env.REACT_APP_API_KEY;
const center = { lat: 50.417884, lng: -104.588749 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAP_API,
    libraries: libraries,
  });
  const [map, setMap] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  const [curMarkerPosition, setCurMarkerPosition] = useState({
    lat: 50.417884,
    lng: -104.588749,
  });
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const editMenuState = useSelector((state) => state.editMenuSelected);
  const mapMarkerList = useSelector((state) => state.mapClicked);
  const infoWin = useRef(null);
  let editTool = 'null';
  if (editMenuState.editSelected == 2) {
    editTool = 'marker';
  } else if (editMenuState.editSelected == 1) {
    editTool = 'rectangle';
  }

  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: '3c735604953ece6',
  }));

  const dispatch = useDispatch();

  const onMarkerClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    let position = {
      lat: Number(lat),
      lng: Number(lng),
    };
    console.log('Kevin-Debug-Map.js-36: ', position, e);
    console.log(infoWin.current.state);
    // infoWin.current.state.infoWindow.setPosition(position);
    infoWin.current.open(infoWin.current.state.infoWindow, e);
    setCurMarkerPosition(position);
  };

  const addMarkerCall = (marker) => {
    const lat = marker.position.lat();
    const lng = marker.position.lng();
    const position = {
      lat,
      lng,
    };
    console.log(position);
    dispatch(mapClickAdd(position));
    setCurMarkerPosition(position);
    setIsOpen(true)
    infoWin.current.open(infoWin.current.state.infoWindow);
    console.log(mapMarkerList);
  };

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

  const changeCloseClick = (e) => {
    console.log('close dialog');
  };
  const selectOption = [
    {
      value:"",
      label:"Please Choose waypoint type"
    },
    {
      value:"path",
      label:"Waypoint"
    },
    {
      value:"end",
      label:"Destination"
    }
  ]

  if (!isLoaded) {
    return (
      <div className="p-5 m-5 bg-red-400 rounded-md drop-shadow-sm">
        Loading Google map
      </div>
    );
  }

  return (
    <GoogleMap
      id="google-map-1"
      mapContainerStyle={{ height: '100%'}}
      zoom={17.2}
      center={center}
      options={options}
      mapContainerClassName="h-full"
      onLoad={onLoad}
    >
      {/* <Marker
        onLoad={(marker) => {
          console.log('marker: ', marker);
        }}
        position={center}
        onClick={onMarkerClick}
      ></Marker> */}
      <DrawingManager
        drawingMode={editTool}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            drawingModes: [],
          },
          polygonOptions: {
            fillColor: `#2196F3`,
            strokeColor: `#2196F3`,
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            draggable: true,
            zIndex: 1,
          },
          markerOptions: {
            icon: '',
            visible: false,
          },
        }}
        onMarkerComplete={addMarkerCall}
      />
      {/* new marker  */}
      {mapMarkerList.clickLog.map((marker, index) => {
        const position = { lat: Number(marker[0]), lng: Number(marker[1] * 1) };
        return (
          <Marker
            onLoad={(marker) => {
              console.log('marker: ', marker);
            }}
            key={index}
            position={position}
            onClick={onMarkerClick}
          ></Marker>
        );
      })}
      {/* message dialog */}
      {
        isOpen?(<InfoWindow
          ref={infoWin}
          onLoad={onLoad}
          position={curMarkerPosition}
          options={{ ariaLabel: '' }}
          onCloseClick={changeCloseClick}
        >
          <div style={divStyle}>
            <select style={{outline:'none'}}>
              {
                selectOption.map(item => <option value={item.value}>{item.label}</option>)
              }
            </select>
          </div>
        </InfoWindow>):null
      }
    </GoogleMap>
  );
}

export default Map;
