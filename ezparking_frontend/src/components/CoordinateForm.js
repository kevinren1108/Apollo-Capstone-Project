import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editParkingLotClick,
  editWaypointClick,
} from '../store/editMeunClickSlice';

function CoordinateForm() {
  const state = useSelector((state) => state.mapClicked);
  const editMenuState = useSelector((state) => state.editMenuSelected);
  const dispatch = useDispatch();

  const handleEditParkingLotClick = () => {
    dispatch(editParkingLotClick(1));
  };

  const handleEditWaypointClick = () => {
    dispatch(editWaypointClick(2));
  };

  let parkLotBtnStyle = '';
  let waypointBtnStyle = '';
  if (editMenuState.editSelected == 1) {
    parkLotBtnStyle =
      'bg-white ring rounded-lg text-blue-700 px-1 py-10 my-5 text-center';
    waypointBtnStyle =
      'bg-white drop-shadow rounded-lg text-black-700 px-1 py-10  my-5 text-center';
  } else if (editMenuState.editSelected == 2) {
    parkLotBtnStyle =
      'bg-white drop-shadow rounded-lg text-black-700 px-1 py-10  my-5 text-center';
    waypointBtnStyle =
      'bg-white ring rounded-lg text-blue-700 px-1 py-10 my-5 text-center';
  } else {
    parkLotBtnStyle =
      'bg-white drop-shadow rounded-lg text-black-700 px-1 py-10  my-5 text-center';
    waypointBtnStyle =
      'bg-white drop-shadow rounded-lg text-black-700 px-1 py-10  my-5 text-center';
  }
  const sendReqStyle = {
    border:'1px solid #ccc',
    padding:'5px 10px',
    borderRadius:'5px',
    margin:'30px auto',
    display:'block'
  }
  let sendReq = () => {
    console.log(JSON.stringify(state.sendData))

    // fetch('https://127.0.0.1/',{
    //   method:"post",
    //   headers:{
    //     'Content-Type':'application/json',
    //     "Authorization": "Bearer token"
    //   },
    //   body: JSON.stringify(state.sendData)
      
    // })
    // .then(res => res.json()).then(data=>{
    // console.log(data);
    // }).catch((err)=>{
    // console.log(err);
    // })
  }
  return (
    <div>
      
      <div onClick={handleEditWaypointClick} className={`${waypointBtnStyle}`}>
        Edit Waypoints
      </div>
      
      <button className='sendReq' style={sendReqStyle} onClick={sendReq}>Send Graph</button>
    </div>
  );
}

export default CoordinateForm;
