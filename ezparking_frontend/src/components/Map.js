import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  Marker,
  InfoWindow,
  Polyline,
} from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { mapClickAdd, markerClick, generateData } from '../store/mapClickSlice';
import { updateVehicleCount, updateParkingLotsCount, updateTotalParkingSpotCount, updateInUseCount } from '../store/parkingStatusSlice';
import "./map.css"
import Graph from '../structure/graph';

const libraries = ['drawing'];
const MAP_API = process.env.REACT_APP_API_KEY;
const center = { lat: 50.417884, lng: -104.588749 };
const graph = new Graph()

function Map() {
  const dispatch = useDispatch();
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
    type: 'waypoint'
  });
  let [clickMarkerPosition, setClickMarkerPosition] = useState({
    lat: 50.417884,
    lng: -104.588749,
  })
  let [markerMsg, setMarkerMsg] = useState([])
  let [currentpolyLine, setCurrentPolyLine] = useState([])
  let [totalpolyLine, setTotalPolyLine] = useState([])
  let [polyMarker, setPolyMarker] = useState([])
  let [animateMarkerId, setAnimateMarkerId] = useState(-1)

  useEffect(() => {

    // console.log('polyMarker', polyMarker)
    // console.log("currentpolyLine", currentpolyLine)
    // console.log("totalPolyLine", totalpolyLine)
    // console.log(animateMarkerId)
    if (polyMarker.length > 1) {
      graph.addEdge(polyMarker[polyMarker.length - 2], polyMarker[polyMarker.length - 1]);

    } else {

    }
    let postData = JSON.parse(JSON.stringify(graph.vertiecs))
    postData.forEach(item => {
      for (let k in item) {
        for (let v in graph.edgeList) {
          if (k == v) {
            item[k]['neighbor'] = graph.edgeList[v]
          }
        }
      }
    });
    console.log("postdata", postData)
    dispatch(generateData({
      data: postData
    }))
    // console.log(graph)
  }, [polyMarker]);

  
  useEffect(() => {
    
    fetch('https://ezparking114514.com:9195/loadWP').then(response => {
      return response.json()
    }).then(res => {
      
      res.data.sort(function (a, b) {
        return Number(a.name) - Number(b.name)
      })
      console.log("fetching")
      console.log(res.data)
      
      let markerMsgArr = []
      for (let i = 0; i < res.data.length; i++) {
        const position = {
          lat: res.data[i].lat,
          lng: res.data[i].lng
        }
        dispatch(mapClickAdd(position));
        markerMsgArr.push({
          type: res.data[i].type
        })
      }
      
      setMarkerMsg(markerMsgArr)
      
      for (let i = 0; i < res.data.length; i++) {
        graph.addVerTex(Number(res.data[i].name), {
          lat: res.data[i].lat,
          lng: res.data[i].lng,
          type: res.data[i].type
        });
      }
      let lineArr = []
      
      function getVertexLat(name) {
        for(let i = 0; i < res.data.length;i++) {
          if(name == Number(res.data[i].name)) {
            return {
              lat:res.data[i].lat,
              lng:res.data[i].lng
            }
          }
        }
      }
      for (let i = 0; i < res.data.length; i++) {
        for (let j = 0; j < JSON.parse(res.data[i].neighbor).length; j++) {
          
          graph.addEdge(Number(res.data[i].name), JSON.parse(res.data[i]['neighbor'])[j]);
          const twoPoint = getVertexLat(JSON.parse(res.data[i]['neighbor'])[j])
          lineArr.push([
            {
              lat:res.data[i].lat,
              lng:res.data[i].lng
            },
            {
              lat:twoPoint.lat,
              lng:twoPoint.lng
            }
          ])
        }
      }
      console.log("graph",graph)
      console.log(lineArr)
      setTotalPolyLine(lineArr)


    }).catch(err => {

    })
  }, [])


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



  const onMarkerClick = (e, index) => {
    // console.log(mapMarkerList.clickLog)
    // console.log(markerMsg)
    let lat = e.latLng.lat()
    let lng = e.latLng.lng()
    setMsgIsOpen(true)
    setClickMarkerPosition({
      lat: lat + 0.0004,
      lng: lng,
      type: markerMsg[index].type
    })
  }

  const onMarkerDbClick = (e, index) => {
    // console.log(e,index)

    let lat = e.latLng.lat()
    let lng = e.latLng.lng()

    setMsgIsOpen(true)
    // console.log(mapMarkerList)
    // console.log(markerMsg)

    setClickMarkerPosition({
      lat: lat + 0.0004,
      lng: lng,
      type: markerMsg[index].type
    })

    dispatch(markerClick({
      lat: lat,
      lng: lng,
      id: index
    }))

    // console.log('ssssssss')
    // console.log(polyMarker,polyMarker.length)
    // if(polyMarker.length == 0) {
    //   setAnimateMarkerId([...animateMarkerId,index])
    // }
    setAnimateMarkerId(index)
    graph.addVerTex(index, {
      lat: lat,
      lng: lng,
      type: markerMsg[index].type
    });
    setPolyMarker([...polyMarker, index])

    setCurrentPolyLine([...currentpolyLine, {
      lat: lat,
      lng: lng,
    }])


  };

  const onRightClick = (e) => {
    // console.log("right-click")
    setPolyMarker([])
    setCurrentPolyLine([])
    setTotalPolyLine([...totalpolyLine, currentpolyLine])

    // reset animation
    setAnimateMarkerId(-1)

  }

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
    console.log("event.target.value", event.target.value)
    setIsOpen(true)
    // console.log(mapMarkerList.clickLog)
  };
  const onChangePoint = (event) => {
    setPointValue(event.target.value)
  }
  const save = () => {
    let label = ""
    for (let i in selectOption) {
      if (selectOption[i].value == pointValue) {
        label = selectOption[i].label
      }
    }
    if (label == "") {
      alert("Please Choose Waypoint Type")
      return
    }

    if (label == "Parking lot") {
      let parkingLotSpots = prompt("Please Entry Avaiable Spots")
      label += `(Avaiable Spots: ${parkingLotSpots})`

      dispatch(updateParkingLotsCount(1))
      dispatch(updateTotalParkingSpotCount(parseInt(parkingLotSpots)))
      let parkingLotName = prompt("Please Entry Parking LotName")
      label += `(Parkinglot Name: ${parkingLotName})`
    }
    if (label == "Destination") {
      let pestinationName = prompt("Please Entry Destination Name")
      label += `(Destination Name: ${pestinationName})`
    }
    setIsOpen(false)
    setMarkerMsg([...markerMsg, {
      type: label
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

    setIsOpen(false)
  };
  const selectOption = [
    {
      id: 1,
      value: "select",
      label: "Please Choose Waypoint Type"
    },
    {
      id: 2,
      value: "Way point",
      label: "Way point"
    },
    {
      id: 3,
      value: "Parking lot",
      label: "Parking lot"
    },
    {
      id: 4,
      value: "Destination",
      label: "Destination"
    }
  ]
  const polyLineOptions = {
    strokeColor: 'rgb(103,190,135)',
    strokeOpacity: 0.8,
    strokeWeight: 6,
    fillColor: 'rgb(103,190,135)',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  };
  if (!isLoaded) {
    return (
      <div className="p-5 m-5 bg-red-400 rounded-md drop-shadow-sm">
        Loading Google map
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ height: '100%' }}
      zoom={17.2}
      center={center}
      options={options}
      mapContainerClassName="h-full"
      onLoad={onLoad}
      onRightClick={(e) => { onRightClick(e) }}
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
        return (
          <Marker
            // onLoad={marker => {
            //     const customIcon = (opts) => Object.assign({
            //       path: 'M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z',
            //       fillColor: '#34495e',
            //       fillOpacity: 1,
            //       strokeColor: '#000',
            //       strokeWeight: 1,
            //       scale: 1,
            //     }, opts);

            //     marker.setIcon(customIcon({
            //       fillColor: 'green',
            //       strokeColor: 'white'
            //     }));

            //   }}
            // onMouseDown={}
            animation={(animateMarkerId == index) && window.google.maps.Animation.BOUNCE}
            zIndex={9999999999999}
            // label={index}
            key={index}
            position={position}
            onClick={(e) => { onMarkerClick(e, index) }}
            onDblClick={(e) => { onMarkerDbClick(e, index) }}

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
          onCloseClick={() => { setMsgIsOpen(false) }}
        >
          <div style={{}}>
            <p>Lat: {clickMarkerPosition.lat - 0.0004}</p>
            <p>Lng: {clickMarkerPosition.lng}</p>
            <p>Info: {clickMarkerPosition.type}</p>
          </div>
        </InfoWindow>) : null
      }
      {/* prev edge */}
      {
        totalpolyLine.map((polyline, index) => {
          return (
            <Polyline
              key={index}
              path={polyline}
              options={polyLineOptions}
            />
          )
        })
      }
      {/* new edge */}
      {
        <Polyline
          path={currentpolyLine}
          options={polyLineOptions}
        />
      }

    </GoogleMap>
  );
}

export default Map;
