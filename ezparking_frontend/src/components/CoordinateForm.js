import React, { useState } from 'react'

function CoordinateForm() {
  const [input, setInput] = useState('')

  return (
    <div>
      <label className=" text-3xl text-white ">
        Coordinates
      </label>
      <table className=" table-fixed border-collapse border border-black text-white mt-4">
        <thead>
          <tr>
            <th className=" w-1/3 border border-black ">Clicks</th>
            <th className=" w-1/3 border border-black ">Lng</th>
            <th className=" w-1/3 border border-black ">Lat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black ">1</td>
            <td className="border border-black">50.4181</td>
            <td className="border border-black ">-104.5888</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )
}

export default CoordinateForm
