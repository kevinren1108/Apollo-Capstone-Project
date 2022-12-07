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
  let [msgIsOpen, setMsgIsOpen] = useState(false)
  let [pointValue, setPointValue] = useState("select")
  const [curMarkerPosition, setCurMarkerPosition] = useState({
    lat: 50.417884,
    lng: -104.588749,
    type:'waypoint'
  });
  let [clickMarkerPosition,setClickMarkerPosition] = useState({
    lat: 50.417884,
    lng: -104.588749,
  })
  let [markerMsg,setMarkerMsg] = useState([])   
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
    console.log(e)
    setMsgIsOpen(true)
    console.log(mapMarkerList)
    console.log(markerMsg)
    setClickMarkerPosition({
      lat: mapMarkerList.clickLog[e][0],
      lng: mapMarkerList.clickLog[e][1],
      type:markerMsg[e].type
    })

  };
   const addMarkerCall = (marker) => {
    const lat = marker.position.lat();
    const lng = marker.position.lng();
    const position = {
      lat,
      lng,
    };
    dispatch(mapClickAdd(position));
    setCurMarkerPosition(position);
    setPointValue(event.target.value)
    setIsOpen(true)
  };
  const onChangePoint = (event) => {
    setPointValue(event.target.value)
  }
  const save = () => {
    let label = ""
    for(let i in selectOption) {
      if(selectOption[i].value == pointValue) {
        label = selectOption[i].label
      }
    }
    setIsOpen(false)
    setMarkerMsg([...markerMsg,{
      type:label
    }])
  }
  const saveBtnStyle = {
    border: "1px solid #ccc",
    backgroundColor: "rgb(161,188,242)",
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "5px",
    marginLeft: "10px"
  }

  const changeCloseClick = (e) => {
    // console.log('close dialog');
    setIsOpen(false)
  };
  const selectOption = [
    {
      id: 1,
      value: "select",
      label: "Please Choose waypoint type"
    },
    {
      id: 2,
      value: "path",
      label: "Waypoint"
    },
    {
      id: 3,
      value: "end",
      label: "Destination"
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
        let count = 2
        return (
          <Marker
            onLoad={(marker) => {
              console.log('marker: ', marker);
            }}
            zIndex={9999999999999}
            key={index}
            position={position}
            onClick={() => { onMarkerClick(index) }}
            cursor={'pointer'}
          ></Marker>
        );
      })}
      {/* message dialog */}
      {
        isOpen ? (<InfoWindow
          ref={infoWin}
          onLoad={onLoad}
          position={curMarkerPosition}
          options={{ ariaLabel: '' }}
          onCloseClick={changeCloseClick}
        >
          <div>
            <select style={{ outline: 'none' }} value={pointValue} onChange={onChangePoint}>
              {
                selectOption.map(item => <option key={item.id} value={item.value}>{item.label}</option>)
              }
            </select>
            <button style={saveBtnStyle} onClick={save}>Save</button>
          </div>
        </InfoWindow>) : null
      }
      {/* check waypoint type */}
      {
        msgIsOpen ? (<InfoWindow
          onLoad={onLoad}
          position={clickMarkerPosition}
          options={{ ariaLabel: '' }}
          onCloseClick={() => {setMsgIsOpen(false)}}
        >
          <div style={{}}>
            <p>lat: {clickMarkerPosition.lat}</p>
            <p>lng: {clickMarkerPosition.lng}</p>
            <p>Type：{clickMarkerPosition.type}</p>
          </div>
        </InfoWindow>) : null
      }

    </GoogleMap>
  );
}

export default Map;
