import React from 'react'
import { useSelector } from 'react-redux'


function CoordinateForm() {
  const state = useSelector((state) => state.clicked)
  
  return (
    <div>
      <label className=" text-3xl text-white ">
        Coordinates
      </label>
      <table className=" table-fixed border-collapse border border-white mt-4">
        <thead>
          <tr>
            <th className=" w-1/3 border text-white border-white ">Lng</th>
            <th className=" w-1/3 border text-white border-white ">Lat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border text-white border-white">{state.clickLog.click[0].toString().slice(0,10)}</td>
            <td className="border text-white border-white ">{state.clickLog.click[1].toString().slice(0,10)}</td>
          </tr>       
        </tbody>
      </table>
    </div>
  )
}

export default CoordinateForm
