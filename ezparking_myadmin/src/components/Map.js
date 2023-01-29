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
import { mapClickAdd, markerClick, generateData, waypointUpdate } from '../store/mapClickSlice';
import { updateVehicleCount, updateParkingLotsCount, updateTotalParkingSpotCount, updateInUseCount } from '../store/parkingStatusSlice';
import "./map.css"
import Graph from '../structure/graph';
import { composeSyncValidators } from 'react-admin';

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
    markerID: 0,
    lat: 50.417884,
    lng: -104.588749,
  })
  let [markerMsg, setMarkerMsg] = useState([])
  let [currentpolyLine, setCurrentPolyLine] = useState([])
  let [totalpolyLine, setTotalPolyLine] = useState([])
  let [polyMarker, setPolyMarker] = useState([])
  let [animateMarkerId, setAnimateMarkerId] = useState(-1)

  useEffect(() => {
  
    fetch('https://ezparking114514.com:9195/loadWP').then(response => {
      return response.json()
    }).then(res => {
      
      res.data.sort(function (a, b) {
        return Number(a.name) - Number(b.name)
      })
      
      
      
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
      // console.log("graph",graph)
      // console.log(lineArr)
      setTotalPolyLine(lineArr)
    }).catch(err => {

    },)
  }, [])

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
    
    let transformData = {}
    for(let i = 0; i < postData.length;i++) {
      let arr = Object.entries(postData[i])[0]
      transformData[arr[0]] = arr[1]
    }
    // console.log("postdata", postData)
    dispatch(generateData({
      data: transformData
    }))
    // console.log(graph)
  }, [polyMarker]);


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
      markerID: index,
      lat: lat + 0.0004,
      lng: lng,
      type: markerMsg[index].type
    })
  }

  const onMarkerDragComplete = (e, index) => {
    const position = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          index: index
        }
    graph.vertiecs[index][index].lat = e.latLng.lat()
    graph.vertiecs[index][index].lng = e.latLng.lng()
    dispatch(waypointUpdate(position));
    onRightClick(e)
    
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
    
    setIsOpen(true)
    // console.log(mapMarkerList.clickLog)
  };
  const onChangePoint = (event) => {
    setPointValue(event.target.value)
  }

  const updateWaypoint = (updateIndex, updateType) => {
    if (updateType == "Parking lot") {
      let parkingLotSpots = prompt("Please Entry Avaiable Spots")
      let parkingLotName = prompt("Please Entry Parking LotName")

      const body = JSON.stringify({
        index: updateIndex.toString(),
        newName: parkingLotName,
        newAmount: parkingLotSpots
      })

      console.log(`Parking lot ${updateIndex} update, JSON: ${body}`)

      // const request = new Request('https://ezparking114514.com:9195/updatePLwp', 
      // {
      //   method: 'POST',
      //   body: body,
      //   headers: new Headers({'Content-Type': 'application/json' }),
      // });
      // fetch(request).then(response => 
      //   {
      //     if (response.status < 200 || response.status >= 300) {
      //       console.log(`Update fail with ${response.statusText} as reason`);
      //     }
      //     return response.json();
      //   }).then(response => {
      //       console.log(`Way point ${updateIndex} is Update`)
      //   }).catch(() => {
      //       throw new Error('Login fail, Check your username and password')
      //   }
      // );
    }
 
    else if (updateType == "Destination") {
      let destinationName = prompt("Please Entry Destination Name")

      const body = JSON.stringify({
        index: updateIndex.toString(),
        newName: destinationName
      })

      console.log(`destinationName ${updateIndex} update, JSON: ${body}`)

      // const request = new Request('https://ezparking114514.com:9195/updateDNwp', 
      // {
      //   method: 'POST',
      //   body: body,
      //   headers: new Headers({'Content-Type': 'application/json' }),
      // });
      // fetch(request).then(response => 
      //   {
      //     if (response.status < 200 || response.status >= 300) {
      //       console.log(`Update fail with ${response.statusText} as reason`);
      //     }
      //     return response.json();
      //   }).then(response => {
      //       console.log(`Way point ${updateIndex} is Update`)
      //   }).catch(() => {
      //       throw new Error('Login fail, Check your username and password')
      //   }
      // );

    }
    
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


  const deleteWaypoint = (deleteIndex) => {
    const body = JSON.stringify({"name": deleteIndex.toString() })
    console.log(`Delete index: ${deleteIndex}, JSON: ${body}`)
   

    // const request = new Request('https://ezparking114514.com:9195/deleteWP', 
    // {
    //   method: 'POST',
    //   body: body,
    //   headers: new Headers({'Content-Type': 'application/json' }),
    // });
    // fetch(request).then(response => 
    //   {
    //     if (response.status < 200 || response.status >= 300) {
    //       console.log(`Delete fail with ${response.statusText} as reason`);
    //     }
    //     return response.json();
    //   }).then(response => {
    //       console.log(`Way point ${deleteIndex} is deleted`)
    //   }).catch(() => {
    //       throw new Error('Login fail, Check your username and password')
    //   }
    // );
  }

  
  const saveBtnStyle = {
    border: "1px solid #ccc",
    backgroundColor: "rgb(161, 188, 242)",
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "5px",
    marginLeft: "10px"
  }

  const deleteBtnStyle = {
    border: "1px solid #ccc",
    backgroundColor: "rgb(242, 162, 161)",
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "5px",
    display: "flex",
    marginLeft: "auto",
    marginTop: "10px"
  }

  const updateBtnStyle = {
    border: "1px solid #ccc",
    backgroundColor: "rgb(162, 161, 242)",
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "5px",
    display: "flex",
    marginRight: "auto",
    marginTop: "10px",
    display: "inline"
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
  const prevLength = mapMarkerList.clickLog.length - 1

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
        if(index >= prevLength ){
          return (
            <Marker
              onLoad={marker => {
                  const customIcon = (opts) => Object.assign({
                    path: 'M 0.1 9.7 c 5.3025 0 9.6 -4.2975 9.6 -9.6 S 5.4025 -9.5 0.1 -9.5 S -9.5 -5.2025 -9.5 0.1 S -5.2025 9.7 0.1 9.7 z',
                    fillColor: '#3949ab',
                    fillOpacity: 1,
                    strokeColor: '#000',
                    strokeWeight: 1,
                    scale: 1,
                  }, opts);
  
                  marker.setIcon(customIcon({
                    fillColor: 'green',
                    strokeColor: 'white'
                  }));
  
                }}
              
              animation={(animateMarkerId == index) && window.google.maps.Animation.BOUNCE}
              zIndex={9999999999999}
              // label={index}
              key={index}
              position={position}
              onClick={(e) => { onMarkerClick(e, index) }}
              onDblClick={(e) => { onMarkerDbClick(e, index) }}
              onDragEnd={(e) => {onMarkerDragComplete(e, index) }}
              draggable = {true}
              cursor={'pointer'}
            ></Marker>
          );
        }
        else if(markerMsg[index]["type"][0] == "W"){
          return (
            <Marker
              onLoad={marker => {
                  const customIcon = (opts) => Object.assign({
                    path: 'M 0.1 9.7 c 5.3025 0 9.6 -4.2975 9.6 -9.6 S 5.4025 -9.5 0.1 -9.5 S -9.5 -5.2025 -9.5 0.1 S -5.2025 9.7 0.1 9.7 z',
                    fillColor: '#3949ab',
                    fillOpacity: 1,
                    strokeColor: '#000',
                    strokeWeight: 1,
                    scale: 1,
                  }, opts);
  
                  marker.setIcon(customIcon({
                    fillColor: 'green',
                    strokeColor: 'white'
                  }));
  
                }}
              
              animation={(animateMarkerId == index) && window.google.maps.Animation.BOUNCE}
              zIndex={9999999999999}
              // label={index}
              key={index}
              position={position}
              onClick={(e) => { onMarkerClick(e, index) }}
              onDblClick={(e) => { onMarkerDbClick(e, index) }}
              onDragEnd={(e) => {onMarkerDragComplete(e, index) }}
              draggable = {true}
              cursor={'pointer'}
            ></Marker>
          );
        }
        else if(markerMsg[index]["type"][0] == "P"){
          return (
            <Marker
              onLoad={marker => {
                  const customIcon = (opts) => Object.assign({
                    path: "M -8.3 -9.9 C -10.065 -9.9 -11.5 -8.465 -11.5 -6.7 V 9.3 c 0 1.765 1.435 3.2 3.2 3.2 H 7.7 c 1.765 0 3.2 -1.435 3.2 -3.2 V -6.7 c 0 -1.765 -1.435 -3.2 -3.2 -3.2 H -8.3 z M -1.9 1.3 h 2.4 c 0.885 0 1.6 -0.715 1.6 -1.6 s -0.715 -1.6 -1.6 -1.6 H -1.9 v 3.2 z m 2.4 3.2 H -1.9 v 1.6 c 0 0.885 -0.715 1.6 -1.6 1.6 s -1.6 -0.715 -1.6 -1.6 V 2.9 V -3.1 c 0 -1.105 0.895 -2 2 -2 h 3.6 c 2.65 0 4.8 2.15 4.8 4.8 s -2.15 4.8 -4.8 4.8 z",
                    fillOpacity: 1,
                    strokeWeight: 1,
                    scale: 1,
                  }, opts);
  
                  marker.setIcon(customIcon({
                    fillColor: '#3949ab',
                    strokeColor: 'white'
                  }));
  
                }}

              animation={(animateMarkerId == index) && window.google.maps.Animation.BOUNCE}
              zIndex={9999999999999}
              // label={index}
              key={index}
              position={position}
              onClick={(e) => { onMarkerClick(e, index) }}
              onDblClick={(e) => { onMarkerDbClick(e, index) }}
              onDragEnd={(e) => {onMarkerDragComplete(e, index) }}
              draggable = {true}
              cursor={'pointer'}
            ></Marker>
          );
        }
        else if(markerMsg[index]["type"][0] == "D"){
          return (
            <Marker
              onLoad={marker => {
                  const customIcon = (opts) => Object.assign({
                    path: "m 14.29 -1.225 c 0 0.9 -0.75 1.605 -1.6 1.605 h -1.6 l 0.035 8.01 c 0 0.135 -0.01 0.27 -0.025 0.405 V 9.6 c 0 1.105 -0.895 2 -2 2 H 8.3 c -0.055 0 -0.11 0 -0.165 -0.005 c -0.07 0.005 -0.14 0.005 -0.21 0.005 H 6.3 H 5.1 c -1.105 0 -2 -0.895 -2 -2 V 8.4 V 5.2 c 0 -0.885 -0.715 -1.6 -1.6 -1.6 H -1.7 c -0.885 0 -1.6 0.715 -1.6 1.6 v 3.2 v 1.2 c 0 1.105 -0.895 2 -2 2 H -6.5 H -8.095 c -0.075 0 -0.15 -0.005 -0.225 -0.01 c -0.06 0.005 -0.12 0.01 -0.18 0.01 H -9.3 c -1.105 0 -2 -0.895 -2 -2 V 4 c 0 -0.045 0 -0.095 0.005 -0.14 V 0.38 H -12.9 c -0.9 0 -1.6 -0.7 -1.6 -1.605 c 0 -0.45 0.15 -0.85 0.5 -1.2 L -1.18 -13.6 c 0.35 -0.35 0.75 -0.4 1.1 -0.4 s 0.75 0.1 1.05 0.35 L 13.74 -2.425 c 0.4 0.35 0.6 0.75 0.55 1.2 z",
                    
                    fillOpacity: 1,
                    strokeColor: '#000',
                    strokeWeight: 1,
                    scale: 1,
                  }, opts);
  
                  marker.setIcon(customIcon({
                    fillColor: '#f57f17',
                    strokeColor: 'white'
                  }));
  
                }}
              
              animation={(animateMarkerId == index) && window.google.maps.Animation.BOUNCE}
              zIndex={9999999999999}
              // label={index}
              key={index}
              position={position}
              onClick={(e) => { onMarkerClick(e, index) }}
              onDblClick={(e) => { onMarkerDbClick(e, index) }}
              onDragEnd={(e) => {onMarkerDragComplete(e, index) }}
              draggable = {true}
              cursor={'pointer'}
            ></Marker>
          );
        }
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
        msgIsOpen ? (
        <InfoWindow
          onLoad={onLoad}
          position={clickMarkerPosition}
          options={{ ariaLabel: '' }}
          onCloseClick={() => { setMsgIsOpen(false) }}
        >
          <div >
            <p>Lat: {clickMarkerPosition.lat - 0.0004}</p>
            <p>Lng: {clickMarkerPosition.lng}</p>
            <p>Type: {clickMarkerPosition.type.split("(")[0]}</p>
            {clickMarkerPosition.type[0] == "D"? (<p>{clickMarkerPosition.type.split("(")[1].slice(0,-1)}</p>) :null }
            {clickMarkerPosition.type[0] == "P"? (<p>{clickMarkerPosition.type.split("(")[1].slice(0,-1)}</p>) :null }
            {clickMarkerPosition.type[0] == "P"? (<p>{clickMarkerPosition.type.split("(")[2].slice(0,-1)}</p>) :null }

            <div className="flex justify-between">
              {clickMarkerPosition.type[0] == "W"? null: (<button 
              style={
                updateBtnStyle
                } onClick={
                  () => updateWaypoint(clickMarkerPosition.markerID, clickMarkerPosition.type.split("(")[0])
                }>Update</button>)
              }       
              <button style={deleteBtnStyle} onClick={() => deleteWaypoint(clickMarkerPosition.markerID)}>Delete</button>
            </div>
            
            
            
            
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
