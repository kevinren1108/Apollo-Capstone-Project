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

  return (
    <div>
      <h1>{}</h1>
      <div onClick={handleEditParkingLotClick} className={`${parkLotBtnStyle}`}>
        Edit Parking Lots
      </div>
      <div onClick={handleEditWaypointClick} className={`${waypointBtnStyle}`}>
        Edit Waypoints
      </div>
      <table className="w-full mt-4 border border-collapse table-fixed drop-shadow">
        <thead>
          <tr>
            <th className="w-1/3 border ">ID</th>
            <th className="w-1/3 border ">Lat</th>
            <th className="w-1/3 border ">Lng</th>
          </tr>
        </thead>
        <tbody>
          {state.clickLog.map((k, v) => (
            <tr key={v}>
              <td key={v + 1} className="border ">
                {v}
              </td>
              <td key={v + 2} className="border ">
                {k[0].toFixed(3)}
              </td>
              <td key={v + 3} className="border ">
                {k[1].toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoordinateForm;
