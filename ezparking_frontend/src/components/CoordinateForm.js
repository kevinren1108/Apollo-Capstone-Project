import React from 'react'
import { useSelector } from 'react-redux'


function CoordinateForm() {
  const state = useSelector((state) => state.clicked)
  return (
    <div>
      <label className=" text-3xl text-white ">
        Coordinates
      </label>
      <div className='text-white'>
        {
          state.clickLog.length === 0 ? "This table will record the clicked coordinates on map " : ""
        }
      </div>
      <table className=" table-fixed border-collapse border border-white mt-4">
        <thead>
          <tr>
            <th className=" w-1/3 border text-white border-white ">ID</th>
            <th className=" w-1/3 border text-white border-white ">Lat</th>
            <th className=" w-1/3 border text-white border-white ">Lng</th>
            

          </tr>
        </thead>
        <tbody>
          { 
            state.clickLog.map((k, v) => 
              <tr>
                <td className="border text-white border-white" key={k[0]+1} >{v}</td>
                <td className="border text-white border-white" key={k[0]+2} >{k[0]}</td>
                <td className="border text-white border-white" key={k[0]+3} >{k[1]}</td>
              </tr>  
            )
          }
              
        </tbody>
      </table>
    </div>
  )
}

export default CoordinateForm
