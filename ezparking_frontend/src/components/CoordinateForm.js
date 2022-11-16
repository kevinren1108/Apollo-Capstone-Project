import React from 'react'
import { useSelector } from 'react-redux'


function CoordinateForm() {
  const state = useSelector((state) => state.clicked)
  return (
    <div>
      <div className=" bg-white ring rounded-lg text-blue-700 px-1 py-10 text-center">
        Edit Parking Lots
      </div>
      <div className=" bg-white drop-shadow rounded-lg text-black-700 px-1 py-10 my-5 text-center">
        Edit Parking Lots
      </div>
      <table className=" table-fixed drop-shadow  border-collapse border mt-4 w-full ">
        <thead>
          <tr>
            <th className=" w-1/3 border ">ID</th>
            <th className=" w-1/3 border ">Lat</th>
            <th className=" w-1/3 border ">Lng</th>
          </tr>
        </thead>
        <tbody>
          { 
            state.clickLog.map((k, v) => 
              <tr>
                <td className="border " key={k[0]+1} >{v}</td>
                <td className="border " key={k[0]+2} >{k[0]}</td>
                <td className="border " key={k[0]+3} >{k[1]}</td>
              </tr>  
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default CoordinateForm
