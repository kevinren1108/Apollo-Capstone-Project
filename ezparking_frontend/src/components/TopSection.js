import React from 'react'

function TopSection({itemName, itemValue}) {
  return (
    <div className=" bg-[#ffffff] rounded-md drop-shadow p-10 ">  
      <p className=' text-2xl text-gray-400 text-center '>{itemName}</p>
      <p className=' text-4xl font-bold text-center'>{itemValue}</p>
    </div>
  )
}

export default TopSection
