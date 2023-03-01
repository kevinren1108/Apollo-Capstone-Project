import React from 'react'

function TopSection({itemName, itemValue}) {
  return (
    <div className="flex justify-center items-center flex-col bg-[#ffffff] rounded-md drop-shadow p-3 h-5/6  ">  
      <p className=' text-2xl text-gray-400 text-center '>{itemName}</p>
      <p className=' text-4xl font-bold text-center'>{itemValue}</p>
    </div>
  )
}

export default TopSection
